import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// 支持的编程语言类型
type SupportedLanguage = 'cpp' | 'python' | 'java';

// 测试点结果类型
interface TestCaseResult {
  testCaseId: number;
  status: 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'OLE' | 'CE';
  timeUsed: number;
  memoryUsed: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  errorMessage?: string;
}

// 评测结果类型
interface EvaluateResult {
  success: boolean;
  results: TestCaseResult[];
  summary: {
    totalTestCases: number;
    passedTestCases: number;
    score: number;
    maxTimeUsed: number;
    maxMemoryUsed: number;
  };
  compileError?: string;
}

// 时间限制（毫秒）
const TIME_LIMIT = 1000;
// 空间限制（MB）
const MEMORY_LIMIT = 128;

// 比较输出（去除行尾空格和多余空行）
function compareOutputs(expected: string, actual: string): boolean {
  const normalize = (str: string) => {
    return str
      .trim()
      .split('\n')
      .map(line => line.trimRight())
      .filter(line => line !== '')
      .join('\n');
  };
  return normalize(expected) === normalize(actual);
}

// 编译器配置
interface CompilerConfig {
  sourceExtension: string;
  compileCommand?: (sourcePath: string, outputPath: string) => string;
  runCommand: (executablePath: string, inputPath: string, outputPath: string, timeLimit: number, memoryLimit: number) => string;
  needsCompile: boolean;
  getOutputPath: (baseName: string, workDir: string) => string;
  cleanup: (baseName: string, workDir: string) => Promise<void>;
}

const compilerConfigs: Record<SupportedLanguage, CompilerConfig> = {
  cpp: {
    sourceExtension: '.cpp',
    compileCommand: (sourcePath, outputPath) => 
      `g++ -std=c++17 -O2 -o ${outputPath} ${sourcePath} 2>&1`,
    runCommand: (executablePath, inputPath, outputPath, timeLimit, memoryLimit) =>
      `ulimit -v $(( ${memoryLimit} * 1024 )) && timeout ${timeLimit / 1000}s ${executablePath} < ${inputPath} > ${outputPath} 2>&1`,
    needsCompile: true,
    getOutputPath: (baseName) => `/tmp/${baseName}`,
    cleanup: async (baseName) => {
      const sourcePath = `/tmp/${baseName}.cpp`;
      const executablePath = `/tmp/${baseName}`;
      const cleanupPromises: Promise<void>[] = [];
      if (existsSync(sourcePath)) {
        cleanupPromises.push(unlink(sourcePath));
      }
      if (existsSync(executablePath)) {
        cleanupPromises.push(unlink(executablePath));
      }
      await Promise.all(cleanupPromises).catch(() => {});
    },
  },
  python: {
    sourceExtension: '.py',
    runCommand: (executablePath, inputPath, outputPath, timeLimit, memoryLimit) =>
      `ulimit -v $(( ${memoryLimit} * 1024 )) && timeout ${timeLimit / 1000}s python3 ${executablePath} < ${inputPath} > ${outputPath} 2>&1`,
    needsCompile: false,
    getOutputPath: (baseName) => `/tmp/${baseName}.py`,
    cleanup: async (baseName) => {
      const sourcePath = `/tmp/${baseName}.py`;
      if (existsSync(sourcePath)) {
        await unlink(sourcePath).catch(() => {});
      }
    },
  },
  java: {
    sourceExtension: '.java',
    compileCommand: (sourcePath, _outputPath) => 
      `cd /tmp && javac ${sourcePath.split('/').pop()} 2>&1`,
    runCommand: (executablePath, inputPath, outputPath, timeLimit, memoryLimit) =>
      `ulimit -v $(( ${memoryLimit} * 1024 )) && timeout ${timeLimit / 1000}s java -cp ${executablePath} Main < ${inputPath} > ${outputPath} 2>&1`,
    needsCompile: true,
    getOutputPath: (baseName) => `/tmp/${baseName}`,
    cleanup: async (baseName) => {
      const sourcePath = `/tmp/${baseName}.java`;
      const classPath = '/tmp/Main.class';
      const cleanupPromises: Promise<void>[] = [];
      if (existsSync(sourcePath)) {
        cleanupPromises.push(unlink(sourcePath));
      }
      if (existsSync(classPath)) {
        cleanupPromises.push(unlink(classPath));
      }
      await Promise.all(cleanupPromises).catch(() => {});
    },
  },
};

// 编译代码
async function compileCode(
  language: SupportedLanguage,
  sourcePath: string,
  outputPath: string
): Promise<{ success: boolean; error?: string }> {
  const config = compilerConfigs[language];
  
  if (!config.needsCompile || !config.compileCommand) {
    return { success: true };
  }

  try {
    const { stdout, stderr } = await execAsync(
      config.compileCommand(sourcePath, outputPath),
      { timeout: 30000 }
    );

    // 对于某些编译器，即使有输出也可能成功
    const compileOutput = stderr || stdout;
    
    // 检查是否有错误关键字
    if (compileOutput && (
      compileOutput.includes('error:') ||
      compileOutput.includes('编译失败') ||
      compileOutput.includes('Exception')
    )) {
      return { success: false, error: compileOutput };
    }

    return { success: true };
  } catch (error: any) {
    const errorOutput = error.stderr || error.stdout || error.message;
    return { success: false, error: errorOutput };
  }
}

// 运行单个测试用例
async function runTestCase(
  language: SupportedLanguage,
  baseName: string,
  testCase: { input: string; expectedOutput: string },
  testCaseIndex: number,
  timeLimit: number,
  memoryLimit: number
): Promise<TestCaseResult> {
  const config = compilerConfigs[language];
  const executablePath = config.getOutputPath(baseName, '/tmp');
  const inputPath = `/tmp/${baseName}_input_${testCaseIndex}.txt`;
  const outputPath = `/tmp/${baseName}_output_${testCaseIndex}.txt`;

  // 写入输入文件
  await writeFile(inputPath, testCase.input || '', 'utf-8');

  let startTime = 0;
  try {
    startTime = Date.now();
    await execAsync(
      config.runCommand(executablePath, inputPath, outputPath, timeLimit, memoryLimit),
      { timeout: timeLimit + 1000 }
    );
    const endTime = Date.now();
    const timeUsed = endTime - startTime;

    // 读取输出
    const actualOutput = (await readFile(outputPath, 'utf-8')).trim();
    const expectedOutput = testCase.expectedOutput.trim();

    // 检查输出长度（OLE：Output Limit Exceeded）
    if (actualOutput.length > 1000000) {
      return {
        testCaseId: testCaseIndex + 1,
        status: 'OLE',
        timeUsed: 0,
        memoryUsed: 0,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: actualOutput.substring(0, 1000) + '\n... (output too long)',
      };
    }

    // 检查答案正确性
    if (compareOutputs(expectedOutput, actualOutput)) {
      return {
        testCaseId: testCaseIndex + 1,
        status: 'AC',
        timeUsed,
        memoryUsed: 0,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput,
      };
    } else {
      return {
        testCaseId: testCaseIndex + 1,
        status: 'WA',
        timeUsed,
        memoryUsed: 0,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput,
      };
    }
  } catch (execError: any) {
    const endTime = Date.now();
    const timeUsed = endTime - startTime;

    // 处理超时
    if (execError.killed || execError.signal === 'SIGTERM' || execError.signal === 'SIGKILL') {
      return {
        testCaseId: testCaseIndex + 1,
        status: 'TLE',
        timeUsed: timeLimit,
        memoryUsed: 0,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: '',
      };
    }

    // 处理内存超限
    if (execError.stderr && execError.stderr.includes('Cannot allocate memory')) {
      return {
        testCaseId: testCaseIndex + 1,
        status: 'MLE',
        timeUsed: 0,
        memoryUsed: memoryLimit,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: '',
      };
    }

    // 处理运行时错误
    return {
      testCaseId: testCaseIndex + 1,
      status: 'RE',
      timeUsed,
      memoryUsed: 0,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: execError.stderr || execError.message || '',
      errorMessage: execError.stderr || execError.message,
    };
  } finally {
    // 清理临时文件
    try {
      const cleanupPromises: Promise<void>[] = [];
      if (existsSync(inputPath)) {
        cleanupPromises.push(unlink(inputPath));
      }
      if (existsSync(outputPath)) {
        cleanupPromises.push(unlink(outputPath));
      }
      await Promise.all(cleanupPromises).catch(() => {});
    } catch (cleanupError) {
      console.error('清理临时文件失败:', cleanupError);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      code, 
      testCases, 
      timeLimit = TIME_LIMIT, 
      memoryLimit = MEMORY_LIMIT,
      language = 'cpp'
    } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: '代码不能为空' },
        { status: 400 }
      );
    }

    if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: '测试用例不能为空' },
        { status: 400 }
      );
    }

    // 验证语言参数
    const supportedLanguages: SupportedLanguage[] = ['cpp', 'python', 'java'];
    const lang = (language as string).toLowerCase();
    if (!supportedLanguages.includes(lang as SupportedLanguage)) {
      return NextResponse.json(
        { error: `不支持的语言: ${language}。支持的语言: ${supportedLanguages.join(', ')}` },
        { status: 400 }
      );
    }
    const selectedLang = lang as SupportedLanguage;

    // 生成唯一的文件名
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const baseName = `eval_${timestamp}_${random}`;
    const config = compilerConfigs[selectedLang];
    const sourcePath = `/tmp/${baseName}${config.sourceExtension}`;
    const outputPath = config.getOutputPath(baseName, '/tmp');

    // 处理 Java 源代码 - 需要确保类名为 Main
    let processedCode = code;
    if (selectedLang === 'java') {
      // 如果代码中没有 public class Main，需要处理
      const classMatch = code.match(/public\s+class\s+(\w+)/);
      if (classMatch && classMatch[1] !== 'Main') {
        // 替换类名为 Main
        processedCode = code.replace(/public\s+class\s+\w+/, 'public class Main');
      } else if (!code.includes('public class Main') && !code.includes('class Main')) {
        // 如果没有类定义，包装成 Main 类
        processedCode = `public class Main {
    public static void main(String[] args) {
        ${code}
    }
}`;
      }
    }

    // 写入源代码文件
    await writeFile(sourcePath, processedCode, 'utf-8');

    // 编译代码（如果需要）
    if (config.needsCompile) {
      const compileResult = await compileCode(selectedLang, sourcePath, outputPath);
      if (!compileResult.success) {
        await config.cleanup(baseName, '/tmp').catch(() => {});
        return NextResponse.json({
          success: false,
          compileError: compileResult.error,
        });
      }
    }

    const results: TestCaseResult[] = [];
    let passedCount = 0;

    // 逐个测试点测试
    for (let i = 0; i < testCases.length; i++) {
      const result = await runTestCase(
        selectedLang,
        baseName,
        testCases[i],
        i,
        timeLimit,
        memoryLimit
      );
      
      if (result.status === 'AC') {
        passedCount++;
      }
      
      results.push(result);
    }

    // 清理编译文件
    await config.cleanup(baseName, '/tmp').catch(() => {});

    // 计算汇总信息
    const maxTimeUsed = Math.max(...results.map(r => r.timeUsed));
    const maxMemoryUsed = Math.max(...results.map(r => r.memoryUsed));
    const score = Math.round((passedCount / testCases.length) * 100);

    const evaluateResult: EvaluateResult = {
      success: true,
      results,
      summary: {
        totalTestCases: testCases.length,
        passedTestCases: passedCount,
        score,
        maxTimeUsed,
        maxMemoryUsed,
      },
    };

    return NextResponse.json(evaluateResult);
  } catch (error: any) {
    console.error('Evaluate API Error:', error);
    return NextResponse.json(
      {
        error: error.message || '服务器内部错误',
        success: false,
      },
      { status: 500 }
    );
  }
}

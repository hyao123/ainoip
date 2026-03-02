import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, readFile, access } from 'fs/promises';
import { existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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

// 获取内存使用（MB）
async function getMemoryUsage(pid: number): Promise<number> {
  try {
    const { stdout } = await execAsync(`ps -o rss= -p ${pid}`);
    const memoryKB = parseInt(stdout.trim());
    return Math.round(memoryKB / 1024); // 转换为MB
  } catch {
    return 0;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, testCases, timeLimit = TIME_LIMIT, memoryLimit = MEMORY_LIMIT } = await request.json();

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

    // 生成唯一的文件名
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const baseName = `eval_${timestamp}_${random}`;
    const sourcePath = `/tmp/${baseName}.cpp`;
    const executablePath = `/tmp/${baseName}`;

    // 写入源代码文件
    await writeFile(sourcePath, code, 'utf-8');

    // 编译代码
    const { stdout: compileStdout, stderr: compileStderr } = await execAsync(
      `g++ -std=c++17 -O2 -o ${executablePath} ${sourcePath} 2>&1`,
      {
        timeout: 10000,
      }
    );

    if (compileStderr && !compileStdout) {
      await Promise.all([
        existsSync(sourcePath) && unlink(sourcePath),
      ]);
      return NextResponse.json({
        success: false,
        compileError: compileStderr,
      });
    }

    const results: TestCaseResult[] = [];
    let passedCount = 0;

    // 逐个测试点测试
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const inputPath = `/tmp/${baseName}_input_${i}.txt`;
      const outputPath = `/tmp/${baseName}_output_${i}.txt`;

      // 写入输入文件
      await writeFile(inputPath, testCase.input || '', 'utf-8');

      let startTime = 0;
      try {
        // 运行程序，带时间和内存限制
        startTime = Date.now();
        const { stdout, stderr } = await execAsync(
          `ulimit -v $(( ${memoryLimit} * 1024 )) && timeout ${timeLimit / 1000}s ${executablePath} < ${inputPath} > ${outputPath} 2>&1`,
          {
            timeout: timeLimit + 1000, // 服务器超时比限制多1秒
          }
        );
        const endTime = Date.now();
        const timeUsed = endTime - startTime;

        // 读取输出
        const actualOutput = (await readFile(outputPath, 'utf-8')).trim();
        const expectedOutput = testCase.expectedOutput.trim();

        // 检查输出长度（OLE：Output Limit Exceeded）
        if (actualOutput.length > 1000000) {
          results.push({
            testCaseId: i + 1,
            status: 'OLE',
            timeUsed: 0,
            memoryUsed: 0,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: actualOutput.substring(0, 1000) + '\n... (output too long)',
          });
        }
        // 检查答案正确性
        else if (compareOutputs(expectedOutput, actualOutput)) {
          passedCount++;
          results.push({
            testCaseId: i + 1,
            status: 'AC',
            timeUsed,
            memoryUsed: 0, // 简化处理
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput,
          });
        } else {
          results.push({
            testCaseId: i + 1,
            status: 'WA',
            timeUsed,
            memoryUsed: 0,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput,
          });
        }
      } catch (execError: any) {
        const endTime = Date.now();
        const timeUsed = endTime - startTime;

        // 处理超时
        if (execError.killed || execError.signal === 'SIGTERM' || execError.signal === 'SIGKILL') {
          results.push({
            testCaseId: i + 1,
            status: 'TLE',
            timeUsed: timeLimit,
            memoryUsed: 0,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: '',
          });
        }
        // 处理内存超限
        else if (execError.stderr && execError.stderr.includes('Cannot allocate memory')) {
          results.push({
            testCaseId: i + 1,
            status: 'MLE',
            timeUsed: 0,
            memoryUsed: memoryLimit,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: '',
          });
        }
        // 处理运行时错误
        else {
          results.push({
            testCaseId: i + 1,
            status: 'RE',
            timeUsed,
            memoryUsed: 0,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: execError.stderr || execError.message || '',
            errorMessage: execError.stderr || execError.message,
          });
        }
      } finally {
        // 清理临时文件
        try {
          await Promise.all([
            existsSync(inputPath) && unlink(inputPath),
            existsSync(outputPath) && unlink(outputPath),
          ]);
        } catch (cleanupError) {
          console.error('清理临时文件失败:', cleanupError);
        }
      }
    }

    // 清理编译文件
    await Promise.all([
      existsSync(sourcePath) && unlink(sourcePath),
      existsSync(executablePath) && unlink(executablePath),
    ]);

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

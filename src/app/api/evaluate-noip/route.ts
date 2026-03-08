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
  inputFile?: string;
  outputFile?: string;
}

// 从代码中解析freopen的输入输出文件名
function parseFreopenFilenames(code: string): { inputFile: string | null; outputFile: string | null } {
  const inputFilePattern = /freopen\s*\(\s*"([^"]+)"\s*,\s*"[r]"\s*,\s*stdin\s*\)/;
  const outputFilePattern = /freopen\s*\(\s*"([^"]+)"\s*,\s*"[w]"\s*,\s*stdout\s*\)/;

  const inputMatch = code.match(inputFilePattern);
  const outputMatch = code.match(outputFilePattern);

  return {
    inputFile: inputMatch ? inputMatch[1] : null,
    outputFile: outputMatch ? outputMatch[1] : null,
  };
}

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

export async function POST(request: NextRequest) {
  try {
    const { code, testCases, timeLimit = 1000, memoryLimit = 128 } = await request.json();

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

    // 解析freopen文件名
    const { inputFile, outputFile } = parseFreopenFilenames(code);

    if (!inputFile || !outputFile) {
      return NextResponse.json({
        success: false,
        compileError: '未找到标准的freopen语句。请确保代码中包含:\nfreopen("xxx.in", "r", stdin);\nfreopen("xxx.out", "w", stdout);',
      });
    }

    // 生成唯一的文件名
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const baseName = `noip_${timestamp}_${random}`;
    const workDir = `/tmp/${baseName}`;
    const sourcePath = `${workDir}/solution.cpp`;
    const executablePath = `${workDir}/solution`;

    // 创建工作目录
    await execAsync(`mkdir -p ${workDir}`);

    // 写入源代码文件
    await writeFile(sourcePath, code, 'utf-8');

    // 编译代码
    try {
      const { stdout: compileStdout, stderr: compileStderr } = await execAsync(
        `g++ -std=c++17 -O2 -o ${executablePath} ${sourcePath} 2>&1`,
        {
          timeout: 10000,
        }
      );

      if (compileStderr && compileStderr.includes('error')) {
        await execAsync(`rm -rf ${workDir}`);
        return NextResponse.json({
          success: false,
          compileError: compileStderr,
          inputFile,
          outputFile,
        });
      }
    } catch (compileError: any) {
      await execAsync(`rm -rf ${workDir}`);
      return NextResponse.json({
        success: false,
        compileError: compileError.message || '编译失败',
        inputFile,
        outputFile,
      });
    }

    const results: TestCaseResult[] = [];
    let passedCount = 0;

    // 逐个测试点测试
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const testInputFile = `${workDir}/${inputFile}`;
      const testOutputFile = `${workDir}/${outputFile}`;

      // 写入输入文件（NOIP格式）
      await writeFile(testInputFile, testCase.input || '', 'utf-8');

      // 删除可能存在的输出文件
      if (existsSync(testOutputFile)) {
        await unlink(testOutputFile);
      }

      let startTime = 0;
      try {
        // 运行程序（NOIP方式：程序通过freopen读写文件）
        startTime = Date.now();
        await execAsync(
          `cd ${workDir} && ulimit -v $(( ${memoryLimit} * 1024 )) && timeout ${timeLimit / 1000}s ./solution`,
          {
            timeout: timeLimit + 1000, // 服务器超时比限制多1秒
          }
        );
        const endTime = Date.now();
        const timeUsed = endTime - startTime;

        // 读取输出文件
        let actualOutput = '';
        if (existsSync(testOutputFile)) {
          actualOutput = (await readFile(testOutputFile, 'utf-8')).trim();
        } else {
          // 如果没有生成输出文件，可能是程序没有正确执行freopen
          actualOutput = '';
        }

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
            actualOutput: actualOutput.substring(0, 1000) + '\n... (输出过长)',
          });
        }
        // 检查答案正确性
        else if (compareOutputs(expectedOutput, actualOutput)) {
          passedCount++;
          results.push({
            testCaseId: i + 1,
            status: 'AC',
            timeUsed,
            memoryUsed: 0,
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

        // 尝试读取可能存在的输出文件
        let actualOutput = '';
        try {
          if (existsSync(testOutputFile)) {
            actualOutput = (await readFile(testOutputFile, 'utf-8')).trim();
          }
        } catch {
          // 忽略读取错误
        }

        // 处理超时
        if (execError.killed || execError.signal === 'SIGTERM' || execError.signal === 'SIGKILL') {
          results.push({
            testCaseId: i + 1,
            status: 'TLE',
            timeUsed: timeLimit,
            memoryUsed: 0,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput,
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
            actualOutput,
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
            actualOutput: actualOutput || execError.stderr || execError.message || '',
            errorMessage: execError.stderr || execError.message,
          });
        }
      } finally {
        // 清理当前测试点的输入输出文件
        try {
          if (existsSync(testInputFile)) await unlink(testInputFile);
          if (existsSync(testOutputFile)) await unlink(testOutputFile);
        } catch {
          // 忽略清理错误
        }
      }
    }

    // 清理工作目录
    await execAsync(`rm -rf ${workDir}`);

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
      inputFile,
      outputFile,
    };

    return NextResponse.json(evaluateResult);
  } catch (error: any) {
    console.error('NOIP Evaluate API Error:', error);
    return NextResponse.json(
      {
        error: error.message || '服务器内部错误',
        success: false,
      },
      { status: 500 }
    );
  }
}

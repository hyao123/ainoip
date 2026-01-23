import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { code, input } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: '代码不能为空' },
        { status: 400 }
      );
    }

    // 生成唯一的文件名
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const baseName = `temp_${timestamp}_${random}`;
    const sourcePath = `/tmp/${baseName}.cpp`;
    const executablePath = `/tmp/${baseName}`;
    const inputPath = `/tmp/${baseName}.txt`;

    // 写入源代码文件
    await writeFile(sourcePath, code, 'utf-8');

    // 写入输入文件
    await writeFile(inputPath, input || '', 'utf-8');

    try {
      // 编译代码
      const { stdout: compileStdout, stderr: compileStderr } = await execAsync(
        `g++ -std=c++17 -O2 -o ${executablePath} ${sourcePath} 2>&1`,
        {
          timeout: 10000, // 10秒编译超时
        }
      );

      if (compileStderr && !compileStdout) {
        // 如果有编译错误，清理文件并返回错误
        await Promise.all([
          existsSync(sourcePath) && unlink(sourcePath),
          existsSync(inputPath) && unlink(inputPath),
        ]);
        return NextResponse.json({
          error: '编译错误',
          details: compileStderr,
        });
      }

      // 运行程序
      const { stdout, stderr } = await execAsync(
        `cat ${inputPath} | timeout 5s ${executablePath} 2>&1`,
        {
          timeout: 10000, // 10秒运行超时
        }
      );

      // 清理临时文件
      await Promise.all([
        existsSync(sourcePath) && unlink(sourcePath),
        existsSync(executablePath) && unlink(executablePath),
        existsSync(inputPath) && unlink(inputPath),
      ]);

      return NextResponse.json({
        output: stdout || stderr || '',
        success: true,
      });
    } catch (execError: any) {
      // 清理临时文件
      try {
        await Promise.all([
          existsSync(sourcePath) && unlink(sourcePath),
          existsSync(executablePath) && unlink(executablePath),
          existsSync(inputPath) && unlink(inputPath),
        ]);
      } catch (cleanupError) {
        console.error('清理临时文件失败:', cleanupError);
      }

      // 处理超时错误
      if (execError.killed && execError.signal === 'SIGTERM') {
        return NextResponse.json({
          error: '运行超时（最大运行时间：5秒）',
          success: false,
        });
      }

      return NextResponse.json({
        error: execError.stderr || execError.message || '运行错误',
        success: false,
      });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: error.message || '服务器内部错误',
        success: false,
      },
      { status: 500 }
    );
  }
}

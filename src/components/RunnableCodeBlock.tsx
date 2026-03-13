'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2, CheckCircle2, XCircle, Terminal, Copy, Check } from 'lucide-react';

interface RunnableCodeBlockProps {
  code: string;
  title?: string;
  description?: string;
  input?: string;
  expectedOutput?: string;
  language?: string;
}

// 解析代码中的输出语句，用于匹配输出行
function parseOutputLines(code: string, output: string): { lineNum: number; code: string; output: string | null }[] {
  const codeLines = code.split('\n');
  const outputLines = output.split('\n').filter(line => line.trim() !== '');
  const result: { lineNum: number; code: string; output: string | null }[] = [];
  
  let outputIndex = 0;
  
  codeLines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // 检测输出语句
    const isOutputLine = 
      trimmedLine.includes('cout') || 
      trimmedLine.includes('printf') ||
      trimmedLine.includes('print(');
    
    // 如果是输出语句，尝试匹配输出
    if (isOutputLine && outputIndex < outputLines.length) {
      result.push({
        lineNum: index + 1,
        code: line,
        output: outputLines[outputIndex]
      });
      // 只有当这行代码真的会产生输出时才移动索引
      // 简单判断：如果有 << 或 (，就认为会产生输出
      if (trimmedLine.includes('<<') || trimmedLine.includes('(')) {
        outputIndex++;
      }
    } else {
      result.push({
        lineNum: index + 1,
        code: line,
        output: null
      });
    }
  });
  
  return result;
}

export function RunnableCodeBlock({ 
  code, 
  title, 
  description, 
  input = '', 
  expectedOutput,
  language = 'cpp'
}: RunnableCodeBlockProps) {
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLineMapping, setShowLineMapping] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setError('');
    setOutput('');
    
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          input,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        if (data.details) {
          setError(prev => prev + '\n' + data.details);
        }
      } else {
        setOutput(data.output || '(无输出)');
        setShowLineMapping(true);
      }
    } catch (err: any) {
      setError(err.message || '运行失败');
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = code.split('\n');
  const mappedLines = showLineMapping ? parseOutputLines(code, output) : null;

  return (
    <div className="rounded-lg overflow-hidden border border-slate-200">
      {/* 标题栏 */}
      {(title || description) && (
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
          {title && <div className="font-medium text-sm text-slate-800">{title}</div>}
          {description && <div className="text-xs text-slate-500 mt-0.5">{description}</div>}
        </div>
      )}
      
      {/* 代码区域 */}
      <div className="relative">
        <div className="absolute right-2 top-2 flex gap-2 z-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={copyCode}
            className="h-7 px-2 text-xs bg-slate-700 hover:bg-slate-600 text-white"
          >
            {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
            {copied ? '已复制' : '复制'}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={runCode}
            disabled={isRunning}
            className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                运行中...
              </>
            ) : (
              <>
                <Play className="h-3 w-3 mr-1" />
                运行
              </>
            )}
          </Button>
        </div>
        
        <div className="bg-slate-900 p-4 overflow-x-auto">
          <pre className="text-sm text-slate-100 font-mono">
            <code>
              {codeLines.map((line, index) => {
                const hasOutput = mappedLines?.[index]?.output;
                return (
                  <div 
                    key={index} 
                    className={`flex ${hasOutput ? 'bg-green-900/30 -mx-4 px-4' : ''}`}
                  >
                    <span className="text-slate-500 w-8 text-right mr-4 select-none shrink-0">
                      {index + 1}
                    </span>
                    <span className="flex-1">{line}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>

      {/* 输出区域 */}
      {(output || error) && (
        <div className="border-t border-slate-200">
          <div className={`flex items-center gap-2 px-4 py-2 ${error ? 'bg-red-50' : 'bg-green-50'}`}>
            <Terminal className="h-4 w-4" />
            <span className="text-sm font-medium">{error ? '错误信息' : '运行结果'}</span>
            {!error && expectedOutput && (
              <span className="ml-auto flex items-center gap-1 text-xs">
                {output.trim() === expectedOutput.trim() ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">输出正确</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-orange-500">输出与预期不同</span>
                  </>
                )}
              </span>
            )}
          </div>
          
          <div className={`p-4 font-mono text-sm ${error ? 'bg-red-50 text-red-800' : 'bg-slate-50 text-slate-800'}`}>
            {error ? (
              <pre className="whitespace-pre-wrap">{error}</pre>
            ) : showLineMapping && mappedLines ? (
              <div className="space-y-1">
                {mappedLines.filter(l => l.output).map((line, index) => (
                  <div key={index} className="flex items-start gap-3 py-1 border-b border-slate-100 last:border-0">
                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">
                      第{line.lineNum}行
                    </span>
                    <span className="text-slate-700 flex-1">{line.output}</span>
                  </div>
                ))}
                {mappedLines.filter(l => l.output).length === 0 && (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                )}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap">{output}</pre>
            )}
          </div>
        </div>
      )}

      {/* 输入提示 */}
      {input && (
        <div className="border-t border-slate-200 bg-blue-50 px-4 py-2">
          <div className="text-xs text-blue-600 mb-1">程序输入：</div>
          <pre className="text-sm text-slate-700 font-mono">{input}</pre>
        </div>
      )}

      {/* 预期输出对比 */}
      {expectedOutput && output && !error && (
        <div className="border-t border-slate-200 p-4">
          <div className="text-xs text-slate-500 mb-2">预期输出对比：</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-slate-600 mb-1">你的输出</div>
              <pre className="bg-slate-100 p-2 rounded text-sm font-mono">{output}</pre>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-600 mb-1">预期输出</div>
              <pre className="bg-slate-100 p-2 rounded text-sm font-mono">{expectedOutput}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

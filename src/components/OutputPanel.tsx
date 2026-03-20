'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AIErrorExplanation } from '@/components/AIErrorExplanation';
import { AlertCircle, CheckCircle2, Terminal, Clock, XCircle, Sparkles, Brain } from 'lucide-react';

interface OutputPanelProps {
  value: string;
  error?: string;
  title?: string;
  executionTime?: number;
  expectedOutput?: string;
  code?: string;
  testInput?: string;
}

export function OutputPanel({ 
  value, 
  error, 
  title = '运行结果', 
  executionTime, 
  expectedOutput,
  code = '',
  testInput = '',
}: OutputPanelProps) {
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const checkResult = expectedOutput && value ? expectedOutput.trim() === value.trim() : null;

  // 确定错误类型
  const getErrorType = (): 'WA' | 'TLE' | 'RE' | 'CE' | 'PE' | 'MLE' => {
    if (error) {
      if (error.includes('time') || error.includes('timeout') || error.includes('超时')) return 'TLE';
      if (error.includes('memory') || error.includes('内存')) return 'MLE';
      if (error.includes('compile') || error.includes('编译')) return 'CE';
      return 'RE';
    }
    if (checkResult === false) return 'WA';
    return 'WA';
  };

  const hasError = error || checkResult === false;

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/50">
      {/* 标题栏 */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-slate-100 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {executionTime !== undefined && executionTime > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 rounded">
              <Clock className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {executionTime}ms
              </span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 dark:bg-red-900/20 rounded">
              <XCircle className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs font-medium text-red-600 dark:text-red-400">运行失败</span>
            </div>
          )}
          {value && !error && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">运行成功</span>
            </div>
          )}
          {checkResult !== null && !error && (
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${
              checkResult 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-amber-50 dark:bg-amber-900/20'
            }`}>
              {checkResult ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span className={`text-xs font-medium ${
                checkResult 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-amber-600 dark:text-amber-400'
              }`}>
                {checkResult ? '测试通过' : '输出不符'}
              </span>
            </div>
          )}
          
          {/* AI 错误解析按钮 */}
          {hasError && (
            <Sheet open={showAIExplanation} onOpenChange={setShowAIExplanation}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 gap-1 text-[10px] bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30"
                >
                  <Brain className="h-3 w-3 text-purple-500" />
                  <span className="text-purple-600 dark:text-purple-400">AI解析</span>
                  <Sparkles className="h-2.5 w-2.5 text-pink-400" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>AI 错误解析</SheetTitle>
                </SheetHeader>
                <AIErrorExplanation
                  errorType={getErrorType()}
                  code={code}
                  actualOutput={value}
                  expectedOutput={expectedOutput}
                  testInput={testInput}
                />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      {/* 输出内容 */}
      {error ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                  发生错误
                </p>
                <pre className="text-xs text-red-600 dark:text-red-500 font-mono whitespace-pre-wrap break-all">
                  {error}
                </pre>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="flex-1 relative overflow-hidden">
          <div
            className="absolute inset-0 overflow-auto p-4 font-mono text-xs leading-6"
            style={{
              fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", "Monaco", "Courier New", monospace',
            }}
          >
            {value ? (
              <div>
                <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-all">
                  {value}
                </pre>
                {expectedOutput && !error && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                      期望输出:
                    </p>
                    <pre className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap break-all">
                      {expectedOutput}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                <p className="text-sm">运行结果将显示在这里...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

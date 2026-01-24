'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Terminal } from 'lucide-react';

interface OutputPanelProps {
  value: string;
  error?: string;
  title?: string;
}

export function OutputPanel({ value, error, title = '运行结果' }: OutputPanelProps) {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/50">
      {/* 标题栏 */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-slate-100 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</span>
        </div>
        {error && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 dark:bg-red-900/20 rounded">
            <AlertCircle className="h-3.5 w-3.5 text-red-500" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">编译/运行错误</span>
          </div>
        )}
        {value && !error && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">运行成功</span>
          </div>
        )}
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
                <p className="text-xs text-red-600 dark:text-red-500 font-mono whitespace-pre-wrap break-all">
                  {error}
                </p>
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
              <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-all">
                {value}
              </pre>
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

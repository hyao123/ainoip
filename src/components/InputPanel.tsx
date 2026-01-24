'use client';

import { Textarea } from '@/components/ui/textarea';
import { Terminal } from 'lucide-react';

interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
}

export function InputPanel({
  value,
  onChange,
  placeholder = '输入测试数据...',
  title = '测试输入'
}: InputPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* 标题栏 */}
      <div className="flex items-center border-b px-4 py-2 bg-slate-50 dark:bg-slate-800/50">
        <Terminal className="h-4 w-4 text-slate-500 mr-2" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</span>
      </div>

      {/* 输入区域 */}
      <div className="flex-1 relative overflow-hidden">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full resize-none rounded-none border-0 bg-transparent font-mono text-xs leading-6 focus-visible:ring-0 focus-visible:outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600"
          placeholder={placeholder}
          spellCheck={false}
          style={{
            fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", "Monaco", "Courier New", monospace',
            padding: '1rem',
          }}
        />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  language?: string;
  className?: string;
  onRunCode?: () => void;
}

export function CodeEditor({
  value,
  onChange,
  placeholder = '// 在此编写你的代码...',
  language = 'C++ 17',
  className = '',
  onRunCode
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    // 计算行数
    const lines = value.split('\n').length;
    setLineCount(lines);

    // 同步滚动
    const handleScroll = () => {
      if (lineNumbersRef.current && textareaRef.current) {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('scroll', handleScroll);
      return () => textarea.removeEventListener('scroll', handleScroll);
    }
  }, [value]);

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textareaRef.current?.selectionStart || 0;
      const end = textareaRef.current?.selectionEnd || 0;
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      onChange(newValue);
      // 恢复光标位置
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter 运行代码
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      onRunCode?.();
    }
  };

  return (
    <div className={`relative flex h-full bg-slate-900 ${className}`}>
      {/* 行号区域 */}
      <div
        ref={lineNumbersRef}
        className="flex-shrink-0 w-12 bg-slate-950 pt-4 pr-2 text-right select-none overflow-hidden"
      >
        <div className="text-xs font-mono leading-6 text-slate-500">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="hover:text-slate-300 transition-colors">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* 编辑器区域 */}
      <div className="flex-1 relative overflow-hidden">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleTab}
          onKeyUp={handleKeyDown}
          className="h-full resize-none rounded-none border-0 bg-transparent font-mono text-sm leading-6 focus-visible:ring-0 focus-visible:outline-none text-slate-200 placeholder:text-slate-600 selection:bg-blue-500/30"
          placeholder={placeholder}
          spellCheck={false}
          style={{
            fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", "Monaco", "Courier New", monospace',
            padding: '1rem 1rem 1rem 0.5rem',
            tabSize: 4,
          }}
        />

        {/* 提示快捷键 */}
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-slate-700/50">
            <kbd className="text-[10px] font-medium text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">
              Tab
            </kbd>
            <span className="text-[10px] text-slate-500">缩进</span>
            <span className="text-slate-700">|</span>
            <kbd className="text-[10px] font-medium text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">
              Ctrl
            </kbd>
            <span className="text-slate-700">+</span>
            <kbd className="text-[10px] font-medium text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">
              Enter
            </kbd>
            <span className="text-[10px] text-slate-500">运行</span>
          </div>
        </div>
      </div>
    </div>
  );
}

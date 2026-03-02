'use client';

import { Card } from '@/components/ui/card';
import { Keyboard } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutsHelpProps {
  onClose: () => void;
}

export function ShortcutsHelp({ onClose }: ShortcutsHelpProps) {
  const shortcuts: Shortcut[] = [
    { keys: ['Ctrl', 'Enter'], description: '运行代码' },
    { keys: ['Tab'], description: '插入4个空格' },
    { keys: ['Ctrl', 'A'], description: '全选' },
    { keys: ['Ctrl', 'C'], description: '复制' },
    { keys: ['Ctrl', 'V'], description: '粘贴' },
    { keys: ['Ctrl', 'Z'], description: '撤销' },
    { keys: ['Ctrl', 'Y'], description: '重做' },
    { keys: ['Ctrl', 'S'], description: '查看答案' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card 
        className="bg-white dark:bg-slate-900 max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <Keyboard className="h-5 w-5 text-slate-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            快捷键帮助
          </h3>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <div key={keyIndex}>
                    <kbd className="px-2 py-1 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 shadow-sm">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="mx-1 text-slate-400">+</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          点击任意处关闭
        </button>
      </Card>
    </div>
  );
}

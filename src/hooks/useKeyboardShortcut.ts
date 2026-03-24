'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description?: string;
}

/**
 * 自定义 Hook：处理键盘快捷键
 * @param shortcuts 快捷键配置数组
 * @param enabled 是否启用
 */
export function useKeyboardShortcut(
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // 如果焦点在输入框中，不触发快捷键（除非是 Escape）
      const target = event.target as HTMLElement;
      const isInputting =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey;
        const metaMatch = shortcut.metaKey ? event.metaKey : !event.metaKey;
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.altKey ? event.altKey : !event.altKey;

        // 对于 Escape 键，即使在输入框中也触发
        if (shortcut.key.toLowerCase() === 'escape' && keyMatch) {
          event.preventDefault();
          shortcut.callback();
          return;
        }

        // 对于其他快捷键，如果在输入框中则跳过
        if (isInputting) continue;

        if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.callback();
          return;
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, enabled]);
}

/**
 * 预定义的快捷键配置
 */
export const shortcuts = {
  // 全局搜索 (Cmd/Ctrl + K)
  globalSearch: {
    key: 'k',
    metaKey: true,
    description: '全局搜索',
  },
  // 运行代码 (Cmd/Ctrl + Enter)
  runCode: {
    key: 'Enter',
    metaKey: true,
    description: '运行代码',
  },
  // 保存 (Cmd/Ctrl + S)
  save: {
    key: 's',
    metaKey: true,
    description: '保存',
  },
  // 关闭弹窗 (Escape)
  close: {
    key: 'Escape',
    description: '关闭',
  },
  // 切换标签页
  nextTab: {
    key: 'Tab',
    ctrlKey: true,
    description: '下一个标签页',
  },
  // 帮助 (Cmd/Ctrl + /)
  help: {
    key: '/',
    metaKey: true,
    description: '帮助',
  },
};

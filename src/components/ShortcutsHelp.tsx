'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Keyboard, 
  X, 
  Play, 
  Save, 
  Copy, 
  RotateCcw,
  Search,
  HelpCircle,
  Code2,
  FileCode,
  Zap,
  MessageCircle,
} from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
  icon?: React.ReactNode;
  category?: string;
}

interface ShortcutsHelpProps {
  onClose: () => void;
}

const shortcuts: Shortcut[] = [
  // 运行相关
  { keys: ['Ctrl', 'Enter'], description: '运行代码', icon: <Play className="h-3.5 w-3.5 text-green-500" />, category: '运行' },
  { keys: ['Ctrl', 'Shift', 'Enter'], description: '评测代码', icon: <Zap className="h-3.5 w-3.5 text-blue-500" />, category: '运行' },
  { keys: ['Ctrl', 'S'], description: '查看答案', icon: <Code2 className="h-3.5 w-3.5 text-purple-500" />, category: '运行' },
  
  // 编辑相关
  { keys: ['Tab'], description: '插入缩进', icon: <FileCode className="h-3.5 w-3.5 text-slate-500" />, category: '编辑' },
  { keys: ['Ctrl', 'Z'], description: '撤销', icon: <RotateCcw className="h-3.5 w-3.5 text-orange-500" />, category: '编辑' },
  { keys: ['Ctrl', 'Y'], description: '重做', icon: <RotateCcw className="h-3.5 w-3.5 text-orange-500" />, category: '编辑' },
  { keys: ['Ctrl', 'C'], description: '复制', icon: <Copy className="h-3.5 w-3.5 text-blue-500" />, category: '编辑' },
  { keys: ['Ctrl', 'V'], description: '粘贴', icon: <Copy className="h-3.5 w-3.5 text-blue-500" />, category: '编辑' },
  { keys: ['Ctrl', 'A'], description: '全选', icon: <FileCode className="h-3.5 w-3.5 text-slate-500" />, category: '编辑' },
  
  // 导航相关
  { keys: ['Ctrl', '/'], description: '显示快捷键', icon: <HelpCircle className="h-3.5 w-3.5 text-yellow-500" />, category: '导航' },
  { keys: ['Ctrl', 'K'], description: '搜索题目', icon: <Search className="h-3.5 w-3.5 text-pink-500" />, category: '导航' },
];

// 按类别分组
const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
  const category = shortcut.category || '其他';
  if (!acc[category]) acc[category] = [];
  acc[category].push(shortcut);
  return acc;
}, {} as Record<string, Shortcut[]>);

export function ShortcutsHelp({ onClose }: ShortcutsHelpProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 入场动画
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-white dark:bg-slate-900 max-w-lg w-full overflow-hidden shadow-2xl border-0">
              {/* 头部 */}
              <div className="px-6 py-4 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Keyboard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                      快捷键帮助
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      使用快捷键提高效率
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* 内容 */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {Object.entries(groupedShortcuts).map(([category, items]) => (
                  <div key={category} className="mb-4 last:mb-0">
                    <Badge variant="secondary" className="mb-2 text-[10px] font-medium">
                      {category}
                    </Badge>
                    <div className="space-y-1">
                      {items.map((shortcut, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            {shortcut.icon}
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {shortcut.description}
                            </span>
                          </div>
                          <div className="flex gap-1 items-center">
                            {shortcut.keys.map((key, keyIndex) => (
                              <span key={keyIndex} className="flex items-center">
                                <kbd className="px-2 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 shadow-sm group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
                                  {key}
                                </kbd>
                                {keyIndex < shortcut.keys.length - 1 && (
                                  <span className="mx-0.5 text-slate-400 text-xs">+</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部提示 */}
              <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  按 <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-700 border rounded">Esc</kbd> 或点击外部关闭
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { problems, type Problem, type DifficultyLevel } from '@/lib/problems';
import { knowledgePoints, getKnowledgeById } from '@/lib/knowledge-map';
import {
  Search,
  Code2,
  BookOpen,
  Map,
  Trophy,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProblem?: (problem: Problem) => void;
  onSelectKnowledge?: (id: number) => void;
  currentTab?: string;
  onNavigateTab?: (tab: string) => void;
}

interface SearchResult {
  type: 'problem' | 'knowledge' | 'action';
  id: number | string;
  title: string;
  description?: string;
  tags?: string[];
  difficulty?: DifficultyLevel;
  category?: string;
  icon: React.ReactNode;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  advanced: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  expert: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

const difficultyLabels: Record<DifficultyLevel, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '困难',
  expert: '专家',
};

const quickActions = [
  { id: 'problems', title: '题库', icon: <Code2 className="w-4 h-4" />, tab: 'problems' },
  { id: 'knowledge', title: '知识地图', icon: <Map className="w-4 h-4" />, tab: 'knowledge' },
  { id: 'learning', title: '学习路径', icon: <BookOpen className="w-4 h-4" />, tab: 'learning' },
  { id: 'demos', title: '算法演示', icon: <Sparkles className="w-4 h-4" />, tab: 'demos' },
  { id: 'user', title: '用户中心', icon: <Trophy className="w-4 h-4" />, tab: 'user' },
  { id: 'cheatsheet', title: '速查表', icon: <BookOpen className="w-4 h-4" />, tab: 'cheatsheet' },
  { id: 'mistakes', title: '常见错误', icon: <Star className="w-4 h-4" />, tab: 'mistakes' },
];

export function GlobalSearch({
  open,
  onOpenChange,
  onSelectProblem,
  onSelectKnowledge,
  currentTab,
  onNavigateTab,
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // 搜索结果
  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) {
      // 显示快速操作
      return quickActions.map(action => ({
        type: 'action' as const,
        id: action.id,
        title: action.title,
        icon: action.icon,
      }));
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // 搜索题目
    const problemResults = problems
      .filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.titleEn?.toLowerCase().includes(lowerQuery) ||
        p.tags?.some(t => t.toLowerCase().includes(lowerQuery)) ||
        p.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8)
      .map(p => ({
        type: 'problem' as const,
        id: p.id,
        title: p.title,
        description: p.description.slice(0, 80) + (p.description.length > 80 ? '...' : ''),
        tags: p.tags?.slice(0, 3),
        difficulty: p.difficulty,
        category: p.category,
        icon: <Code2 className="w-4 h-4" />,
      }));

    searchResults.push(...problemResults);

    // 搜索知识点
    const knowledgeResults = knowledgePoints
      .filter(k => 
        k.title.toLowerCase().includes(lowerQuery) ||
        k.brief?.toLowerCase().includes(lowerQuery) ||
        k.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map(k => ({
        type: 'knowledge' as const,
        id: k.id,
        title: k.title,
        description: k.brief,
        category: k.category,
        icon: <BookOpen className="w-4 h-4" />,
      }));

    searchResults.push(...knowledgeResults);

    return searchResults;
  }, [query]);

  // 重置选中索引
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // 键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        onOpenChange(false);
        break;
    }
  }, [results, selectedIndex, onOpenChange]);

  // 选择结果
  const handleSelect = (result: SearchResult) => {
    onOpenChange(false);
    setQuery('');

    switch (result.type) {
      case 'problem':
        onSelectProblem?.(problems.find(p => p.id === result.id)!);
        break;
      case 'knowledge':
        onSelectKnowledge?.(result.id as number);
        break;
      case 'action':
        onNavigateTab?.(result.id as string);
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-xl top-[20%] translate-y-0">
        {/* 搜索输入 */}
        <div className="flex items-center border-b px-4">
          <Search className="w-4 h-4 text-muted-foreground mr-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索题目、知识点... (按 ESC 关闭)"
            className="border-0 focus-visible:ring-0 px-0 h-12"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* 搜索结果 */}
        <ScrollArea className="max-h-[400px]">
          {results.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>未找到相关内容</p>
            </div>
          ) : (
            <div className="py-2">
              {!query.trim() && (
                <div className="px-4 py-2 text-xs text-muted-foreground font-medium">
                  快速导航
                </div>
              )}
              {results.map((result, index) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors',
                    index === selectedIndex
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted/50'
                  )}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                    result.type === 'problem' && 'bg-primary/10 text-primary',
                    result.type === 'knowledge' && 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                    result.type === 'action' && 'bg-muted'
                  )}>
                    {result.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{result.title}</span>
                      {result.difficulty && (
                        <Badge variant="secondary" className={cn('text-xs', difficultyColors[result.difficulty])}>
                          {difficultyLabels[result.difficulty]}
                        </Badge>
                      )}
                    </div>
                    {result.description && (
                      <p className="text-sm text-muted-foreground truncate">
                        {result.description}
                      </p>
                    )}
                    {result.tags && result.tags.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {result.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* 底部提示 */}
        <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 font-mono text-[10px]">↑</kbd>
              <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 font-mono text-[10px]">↓</kbd>
              导航
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 font-mono text-[10px]">Enter</kbd>
              选择
            </span>
          </div>
          <span className="text-muted-foreground/60">
            共 {problems.length} 道题目 · {knowledgePoints.length} 个知识点
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

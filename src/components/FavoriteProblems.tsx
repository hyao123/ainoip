'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getUserLearningData,
  toggleFavorite,
  type FavoriteProblem,
} from '@/lib/user-learning-data';
import {
  Star,
  Trash2,
  RefreshCw,
  Clock,
  BookOpen,
  Filter,
} from 'lucide-react';

interface FavoriteProblemsProps {
  onSelectProblem?: (problemId: number) => void;
}

const difficultyConfig = {
  easy: { label: '简单', color: 'bg-green-100 text-green-800 border-green-200' },
  medium: { label: '中等', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  hard: { label: '困难', color: 'bg-red-100 text-red-800 border-red-200' },
};

export function FavoriteProblems({ onSelectProblem }: FavoriteProblemsProps) {
  const [data, setData] = useState(getUserLearningData);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'difficulty'>('recent');

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = new Set(data.favoriteProblems.map(f => f.category));
    return ['all', ...Array.from(cats)];
  }, [data.favoriteProblems]);

  // 过滤和排序
  const filteredProblems = useMemo(() => {
    let problems = [...data.favoriteProblems];

    // 分类过滤
    if (categoryFilter !== 'all') {
      problems = problems.filter(p => p.category === categoryFilter);
    }

    // 难度过滤
    if (difficultyFilter !== 'all') {
      problems = problems.filter(p => p.difficulty === difficultyFilter);
    }

    // 排序
    if (sortBy === 'recent') {
      problems.sort((a, b) => b.addedAt - a.addedAt);
    } else if (sortBy === 'difficulty') {
      const order = { hard: 0, medium: 1, easy: 2 };
      problems.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    }

    return problems;
  }, [data.favoriteProblems, categoryFilter, difficultyFilter, sortBy]);

  const handleRemove = (problemId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(problemId, '', '', 'easy'); // 简化调用
    setData(getUserLearningData());
  };

  const refreshData = () => {
    setData(getUserLearningData());
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部标题栏 */}
      <div className="px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">收藏夹</span>
            <Badge variant="secondary" className="text-xs">
              {data.favoriteProblems.length} 题
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 过滤器 */}
      <div className="px-4 py-2 border-b flex items-center gap-2 flex-wrap">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-24 h-8 text-xs">
            <SelectValue placeholder="分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            {categories.filter(c => c !== 'all').map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-20 h-8 text-xs">
            <SelectValue placeholder="难度" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="easy">简单</SelectItem>
            <SelectItem value="medium">中等</SelectItem>
            <SelectItem value="hard">困难</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-24 h-8 text-xs">
            <SelectValue placeholder="排序" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">最近添加</SelectItem>
            <SelectItem value="difficulty">难度优先</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 收藏列表 */}
      <ScrollArea className="flex-1 p-4">
        {filteredProblems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Star className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              {data.favoriteProblems.length === 0 ? '还没有收藏题目' : '没有符合条件的题目'}
            </h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              点击题目旁边的星星收藏感兴趣的题目
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProblems.map(problem => (
              <Card
                key={problem.problemId}
                className="p-3 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => onSelectProblem?.(problem.problemId)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <h4 className="font-medium">{problem.problemTitle}</h4>
                      <Badge variant="outline" className={difficultyConfig[problem.difficulty].color}>
                        {difficultyConfig[problem.difficulty].label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {problem.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        收藏于 {formatDate(problem.addedAt)}
                      </span>
                    </div>
                    {problem.note && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                        备注: {problem.note}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={(e) => handleRemove(problem.problemId, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  problems,
  getCategories,
  getYears,
  getAllTags,
  filterProblems,
  getProblemById,
  difficultyConfig,
  sourceConfig,
  categoryConfig,
  type Problem,
  type DifficultyLevel,
  type ProblemSource,
} from '@/lib/problems';
import {
  Search,
  Star,
  StarOff,
  Filter,
  X,
  BookOpen,
  Clock,
  Database,
  RefreshCw,
  Layers,
} from 'lucide-react';

interface ProblemBankPageProps {
  onSelectProblem?: (problem: Problem) => void;
}

// 将新的难度等级映射到旧的难度等级
export function mapDifficulty(difficulty: DifficultyLevel): 'easy' | 'medium' | 'hard' {
  switch (difficulty) {
    case 'beginner':
      return 'easy';
    case 'intermediate':
      return 'medium';
    case 'advanced':
    case 'expert':
      return 'hard';
    default:
      return 'easy';
  }
}

// localStorage key
const FAVORITES_KEY = 'noip_favorites';

export function ProblemBankPage({ onSelectProblem }: ProblemBankPageProps) {
  // 筛选状态
  const [filters, setFilters] = useState<{
    difficulty?: DifficultyLevel;
    category?: string;
    source?: ProblemSource;
    year?: string;
    tag?: string;
    search: string;
  }>({ search: '' });

  // 收藏状态
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // 加载收藏数据
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        setFavorites(new Set(JSON.parse(saved)));
      }
    } catch (e) {
      console.error('Failed to load favorites:', e);
    }
  }, []);

  // 保存收藏数据
  const saveFavorites = (newFavorites: Set<number>) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...newFavorites]));
  };

  // 切换收藏
  const toggleFavorite = (problemId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(problemId)) {
      newFavorites.delete(problemId);
    } else {
      newFavorites.add(problemId);
    }
    saveFavorites(newFavorites);
  };

  // 清除所有筛选
  const clearFilters = () => {
    setFilters({ search: '' });
  };

  // 是否有激活的筛选
  const hasActiveFilters = filters.difficulty || filters.category || filters.source || filters.year || filters.tag || filters.search;

  // 获取下拉选项
  const categories = getCategories();
  const years = getYears();
  const tags = getAllTags();

  // 筛选后的题目
  const filteredProblems = useMemo(() => {
    return filterProblems({
      difficulty: filters.difficulty,
      category: filters.category,
      source: filters.source,
      year: filters.year,
      tag: filters.tag,
      search: filters.search,
    });
  }, [filters]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 头部 - 紧凑 */}
      <div className="px-3 py-2 border-b bg-gradient-to-r from-blue-50/80 to-indigo-50/80 flex-shrink-0">
        {/* 标题行 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-sm">智能题库</span>
            <Badge variant="secondary" className="text-[10px] h-5">
              {filteredProblems.length}/{problems.length}
            </Badge>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-[10px] h-6 px-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              清除
            </Button>
          )}
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="搜索题目..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-8 h-8 text-xs"
          />
        </div>

        {/* 筛选器 - 紧凑两行 */}
        <div className="flex flex-wrap gap-1.5">
          <Select
            value={filters.difficulty || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, difficulty: v === 'all' ? undefined : v as DifficultyLevel }))}
          >
            <SelectTrigger className="w-16 h-7 text-[10px]">
              <SelectValue placeholder="难度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {Object.entries(difficultyConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.category || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, category: v === 'all' ? undefined : v }))}
          >
            <SelectTrigger className="w-20 h-7 text-[10px]">
              <SelectValue placeholder="分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.source || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, source: v === 'all' ? undefined : v as ProblemSource }))}
          >
            <SelectTrigger className="w-18 h-7 text-[10px]">
              <SelectValue placeholder="来源" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {Object.entries(sourceConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.year || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, year: v === 'all' ? undefined : v }))}
          >
            <SelectTrigger className="w-16 h-7 text-[10px]">
              <SelectValue placeholder="年份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.tag || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, tag: v === 'all' ? undefined : v }))}
          >
            <SelectTrigger className="w-18 h-7 text-[10px]">
              <SelectValue placeholder="标签" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部标签</SelectItem>
              {tags.slice(0, 15).map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 激活的筛选标签 */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {filters.difficulty && (
              <Badge variant="secondary" className="text-[10px] h-5 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, difficulty: undefined }))}>
                {difficultyConfig[filters.difficulty].label}
                <X className="h-2.5 w-2.5 ml-1" />
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="text-[10px] h-5 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}>
                {filters.category}
                <X className="h-2.5 w-2.5 ml-1" />
              </Badge>
            )}
            {filters.source && (
              <Badge variant="secondary" className="text-[10px] h-5 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, source: undefined }))}>
                {sourceConfig[filters.source].label}
                <X className="h-2.5 w-2.5 ml-1" />
              </Badge>
            )}
            {filters.year && (
              <Badge variant="secondary" className="text-[10px] h-5 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, year: undefined }))}>
                {filters.year}
                <X className="h-2.5 w-2.5 ml-1" />
              </Badge>
            )}
            {filters.tag && (
              <Badge variant="secondary" className="text-[10px] h-5 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, tag: undefined }))}>
                {filters.tag}
                <X className="h-2.5 w-2.5 ml-1" />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* 题目列表 - 紧凑 */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1.5">
          {filteredProblems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Filter className="h-10 w-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">没有找到符合条件的题目</p>
              <Button variant="link" size="sm" onClick={clearFilters} className="mt-1 h-7 text-xs">
                清除筛选
              </Button>
            </div>
          ) : (
            filteredProblems.map(problem => (
              <Card
                key={problem.id}
                className="p-2.5 cursor-pointer transition-all hover:shadow-md hover:border-primary/30 border"
                onClick={() => onSelectProblem?.(problem)}
              >
                <div className="flex items-start gap-2">
                  {/* 左侧：信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-medium text-sm truncate max-w-[180px]">{problem.title}</span>
                      <Badge className={`${difficultyConfig[problem.difficulty].bgColor} text-[10px] h-4 px-1`}>
                        {difficultyConfig[problem.difficulty].label}
                      </Badge>
                      {problem.year && (
                        <Badge variant="outline" className="text-[10px] h-4 px-1">{problem.year}</Badge>
                      )}
                      {favorites.has(problem.id) && (
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Badge variant="secondary" className="text-[10px] h-4 px-1">
                        {problem.category}
                      </Badge>
                      {problem.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] h-4 px-1">{tag}</Badge>
                      ))}
                      {problem.tags.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">+{problem.tags.length - 2}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* 右侧：收藏按钮 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => toggleFavorite(problem.id, e)}
                    className="h-6 w-6 p-0 shrink-0"
                  >
                    {favorites.has(problem.id) ? (
                      <StarOff className="h-3.5 w-3.5 text-yellow-500" />
                    ) : (
                      <Star className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

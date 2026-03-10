'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
  getSimilarProblems,
  recommendByTags,
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
  ChevronRight,
  BookOpen,
  Clock,
  Database,
  Lightbulb,
  RefreshCw,
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

  // 选中的题目（用于显示推荐）
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

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
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...newFavorites]));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  };

  // 切换收藏
  const toggleFavorite = (problemId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const newFavorites = new Set(favorites);
    if (newFavorites.has(problemId)) {
      newFavorites.delete(problemId);
    } else {
      newFavorites.add(problemId);
    }
    saveFavorites(newFavorites);
  };

  // 筛选后的题目
  const filteredProblems = useMemo(() => {
    return filterProblems(filters);
  }, [filters]);

  // 相似题目推荐
  const similarProblems = useMemo(() => {
    if (!selectedProblem) return [];
    return getSimilarProblems(selectedProblem.id);
  }, [selectedProblem]);

  // 基于标签的推荐
  const tagRecommendations = useMemo(() => {
    if (!selectedProblem) return [];
    return recommendByTags(selectedProblem.tags, selectedProblem.id);
  }, [selectedProblem]);

  // 清除筛选
  const clearFilters = () => {
    setFilters({ search: '' });
  };

  // 检查是否有激活的筛选
  const hasActiveFilters = filters.difficulty || filters.category || filters.source || filters.year || filters.tag || filters.search;

  // 分类列表
  const categories = getCategories();
  const years = getYears();
  const tags = getAllTags();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 头部 */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">智能题库</h2>
            <Badge variant="secondary" className="text-xs">
              {filteredProblems.length} / {problems.length} 题
            </Badge>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              清除筛选
            </Button>
          )}
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索题目名称、描述..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-9"
          />
        </div>

        {/* 筛选器 */}
        <div className="flex flex-wrap gap-2">
          {/* 难度筛选 */}
          <Select
            value={filters.difficulty || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, difficulty: v === 'all' ? undefined : v as DifficultyLevel }))}
          >
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue placeholder="难度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部难度</SelectItem>
              {Object.entries(difficultyConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 分类筛选 */}
          <Select
            value={filters.category || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, category: v === 'all' ? undefined : v }))}
          >
            <SelectTrigger className="w-28 h-8 text-xs">
              <SelectValue placeholder="分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {categoryConfig[cat]?.icon || ''} {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 来源筛选 */}
          <Select
            value={filters.source || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, source: v === 'all' ? undefined : v as ProblemSource }))}
          >
            <SelectTrigger className="w-28 h-8 text-xs">
              <SelectValue placeholder="来源" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部来源</SelectItem>
              {Object.entries(sourceConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 年份筛选 */}
          <Select
            value={filters.year || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, year: v === 'all' ? undefined : v }))}
          >
            <SelectTrigger className="w-20 h-8 text-xs">
              <SelectValue placeholder="年份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部年份</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 标签筛选 */}
          <Select
            value={filters.tag || 'all'}
            onValueChange={(v) => setFilters(prev => ({ ...prev, tag: v === 'all' ? undefined : v }))}
          >
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue placeholder="知识点" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部标签</SelectItem>
              {tags.slice(0, 20).map(tag => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 激活的筛选标签 */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.difficulty && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, difficulty: undefined }))}
              >
                难度: {difficultyConfig[filters.difficulty].label}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {filters.category && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
              >
                分类: {filters.category}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {filters.source && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, source: undefined }))}
              >
                来源: {sourceConfig[filters.source].label}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {filters.year && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, year: undefined }))}
              >
                年份: {filters.year}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {filters.tag && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, tag: undefined }))}
              >
                标签: {filters.tag}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* 主内容区 */}
      <div className="flex-1 min-h-0 flex">
        {/* 题目列表 */}
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Filter className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>没有找到符合条件的题目</p>
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  清除筛选
                </Button>
              </div>
            ) : (
              filteredProblems.map(problem => (
                <Card
                  key={problem.id}
                  className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedProblem?.id === problem.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    setSelectedProblem(problem);
                    onSelectProblem?.(problem);
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900 truncate">
                          {problem.title}
                        </span>
                        <Badge className={difficultyConfig[problem.difficulty].bgColor}>
                          {difficultyConfig[problem.difficulty].label}
                        </Badge>
                        {problem.year && (
                          <Badge variant="outline" className="text-xs">
                            {problem.year}
                          </Badge>
                        )}
                        {favorites.has(problem.id) && (
                          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {problem.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {categoryConfig[problem.category]?.icon} {problem.category}
                        </Badge>
                        {problem.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {problem.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{problem.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => toggleFavorite(problem.id, e)}
                      className="flex-shrink-0"
                    >
                      {favorites.has(problem.id) ? (
                        <StarOff className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Star className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        {/* 相似题目推荐面板 */}
        {selectedProblem && (similarProblems.length > 0 || tagRecommendations.length > 0) && (
          <div className="w-64 border-l bg-gray-50 flex-shrink-0">
            <ScrollArea className="h-full">
              <div className="p-3 space-y-4">
                {/* 直接关联的相似题目 */}
                {similarProblems.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-orange-500" />
                      <h3 className="font-semibold text-sm">相似题目</h3>
                    </div>
                    <div className="space-y-2">
                      {similarProblems.map(p => (
                        <Card
                          key={p.id}
                          className="p-2 cursor-pointer hover:bg-white transition-colors"
                          onClick={() => {
                            setSelectedProblem(p);
                            onSelectProblem?.(p);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate flex-1">
                              {p.title}
                            </span>
                            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge className={`${difficultyConfig[p.difficulty].bgColor} text-xs`}>
                              {difficultyConfig[p.difficulty].label}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* 基于标签推荐 */}
                {tagRecommendations.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-blue-500" />
                      <h3 className="font-semibold text-sm">相关推荐</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      基于知识点标签: {selectedProblem.tags.slice(0, 2).join(', ')}
                    </p>
                    <div className="space-y-2">
                      {tagRecommendations.map(p => (
                        <Card
                          key={p.id}
                          className="p-2 cursor-pointer hover:bg-white transition-colors"
                          onClick={() => {
                            setSelectedProblem(p);
                            onSelectProblem?.(p);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate flex-1">
                              {p.title}
                            </span>
                            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          </div>
                          <div className="flex items-center gap-1 mt-1 flex-wrap">
                            <Badge className={`${difficultyConfig[p.difficulty].bgColor} text-xs`}>
                              {difficultyConfig[p.difficulty].label}
                            </Badge>
                            {p.tags.filter(t => selectedProblem.tags.includes(t)).map(t => (
                              <Badge key={t} variant="outline" className="text-xs text-blue-600 border-blue-300">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* 底部收藏栏 */}
      {favorites.size > 0 && (
        <div className="px-4 py-2 border-t bg-yellow-50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">已收藏 {favorites.size} 题</span>
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-1">
                {[...favorites].slice(0, 10).map(id => {
                  const p = getProblemById(id);
                  if (!p) return null;
                  return (
                    <Badge
                      key={id}
                      variant="secondary"
                      className="text-xs cursor-pointer hover:bg-yellow-200"
                      onClick={() => {
                        setSelectedProblem(p);
                        onSelectProblem?.(p);
                      }}
                    >
                      {p.id}
                    </Badge>
                  );
                })}
                {favorites.size > 10 && (
                  <span className="text-xs text-gray-500">+{favorites.size - 10}</span>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => saveFavorites(new Set())}
              className="text-xs"
            >
              清空收藏
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

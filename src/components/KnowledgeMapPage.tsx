'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  knowledgePoints,
  categories,
  searchKnowledgePoints,
  type KnowledgePoint,
} from '@/lib/knowledge-map';
import {
  BookOpen,
  Search,
  ChevronRight,
  ChevronDown,
  Clock,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';

interface KnowledgeMapPageProps {
  onStartProblem?: (problemId: number) => void;
}

// 难度配置
const difficultyConfig: Record<string, { color: string; bgColor: string; label: string }> = {
  basic: { color: 'text-green-600', bgColor: 'bg-green-50', label: '基础' },
  intermediate: { color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: '进阶' },
  advanced: { color: 'text-orange-600', bgColor: 'bg-orange-50', label: '高级' },
  competition: { color: 'text-red-600', bgColor: 'bg-red-50', label: '竞赛' },
};

export function KnowledgeMapPage({ onStartProblem }: KnowledgeMapPageProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [bookmarkedPoints, setBookmarkedPoints] = useState<Set<number>>(new Set());
  const [viewedPoints, setViewedPoints] = useState<Set<number>>(new Set());

  // 搜索和过滤
  const filteredPoints = useMemo(() => {
    let points = knowledgePoints;

    if (searchQuery) {
      points = searchKnowledgePoints(searchQuery);
    }

    if (selectedCategory) {
      points = points.filter(p => p.category === selectedCategory);
    }

    if (selectedDifficulty) {
      points = points.filter(p => p.difficulty === selectedDifficulty);
    }

    return points;
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  // 按分类分组
  const groupedPoints = useMemo(() => {
    const groups: Record<string, KnowledgePoint[]> = {};
    filteredPoints.forEach(point => {
      if (!groups[point.category]) {
        groups[point.category] = [];
      }
      groups[point.category].push(point);
    });
    return groups;
  }, [filteredPoints]);

  // 切换收藏
  const toggleBookmark = (pointId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarks = new Set(bookmarkedPoints);
    if (newBookmarks.has(pointId)) {
      newBookmarks.delete(pointId);
    } else {
      newBookmarks.add(pointId);
    }
    setBookmarkedPoints(newBookmarks);
  };

  // 跳转到知识点详情页
  const goToDetail = (point: KnowledgePoint) => {
    setViewedPoints(prev => new Set([...prev, point.id]));
    router.push(`/knowledge/${point.slug}?from=map`);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 顶部标题栏 */}
      <div className="px-6 py-4 border-b shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              知识地图
            </h1>
            <p className="text-sm text-muted-foreground">系统化的知识点讲解库，帮你理解每个算法</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1">
              <Bookmark className="h-3 w-3" />
              {bookmarkedPoints.size} 已收藏
            </Badge>
            <Badge variant="outline" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {viewedPoints.size} / {knowledgePoints.length} 已学
            </Badge>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索知识点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* 难度筛选 */}
          <div className="flex items-center gap-1">
            {Object.entries(difficultyConfig).map(([key, config]) => (
              <Button
                key={key}
                variant={selectedDifficulty === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDifficulty(selectedDifficulty === key ? null : key)}
                className="h-8"
              >
                {config.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：分类导航 */}
        <aside className="w-64 border-r bg-muted/10 shrink-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-1">
              <Button
                variant={selectedCategory === null ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(null)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                全部知识点
              </Button>

              <Separator className="my-2" />

              {categories.map((category) => {
                const pointCount = knowledgePoints.filter(p => p.category === category.id).length;
                const viewedCount = viewedPoints.size > 0
                  ? knowledgePoints.filter(p => p.category === category.id && viewedPoints.has(p.id)).length
                  : 0;

                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{viewedCount}/{pointCount}</span>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* 中间：知识点列表 */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {Object.entries(groupedPoints).map(([categoryId, points]) => {
                const category = categories.find(c => c.id === categoryId);
                const isExpanded = expandedCategory === categoryId;

                return (
                  <div key={categoryId}>
                    {/* 分类标题 */}
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : categoryId)}
                      className="flex items-center gap-2 w-full text-left mb-3"
                    >
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                      <span className="text-lg font-medium">{category?.icon} {category?.name}</span>
                      <Badge variant="secondary" className="text-xs">{points.length}</Badge>
                    </button>

                    {/* 知识点卡片网格 */}
                    <div className="grid grid-cols-2 gap-4">
                      {points.map((point) => {
                        const diffConfig = difficultyConfig[point.difficulty];
                        const isViewed = viewedPoints.has(point.id);
                        const isBookmarked = bookmarkedPoints.has(point.id);

                        return (
                          <Card
                            key={point.id}
                            className={`cursor-pointer hover:shadow-md transition-all hover:border-primary/50 ${
                              isViewed ? 'border-green-200 bg-green-50/30' : ''
                            }`}
                            onClick={() => goToDetail(point)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{point.icon}</span>
                                  <h3 className="font-medium">{point.title}</h3>
                                </div>
                                <button
                                  onClick={(e) => toggleBookmark(point.id, e)}
                                  className="p-1 hover:bg-muted rounded"
                                >
                                  {isBookmarked ? (
                                    <BookmarkCheck className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Bookmark className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </button>
                              </div>

                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {point.brief}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${diffConfig.bgColor} ${diffConfig.color} border-0`} variant="outline">
                                    {diffConfig.label}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {point.readTime}分钟
                                  </span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

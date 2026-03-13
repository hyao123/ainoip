'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  knowledgePoints,
  categories,
  getKnowledgePointById,
  getKnowledgePointBySlug,
  searchKnowledgePoints,
  type KnowledgePoint,
} from '@/lib/knowledge-map';
import {
  BookOpen,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  Code,
  FileText,
  Video,
  Clock,
  Star,
  CheckCircle2,
  Circle,
  ArrowRight,
  Play,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';

interface KnowledgeMapPageProps {
  onStartProblem?: (problemId: number) => void;
  initialPointId?: number;
  initialPointSlug?: string;
}

// 难度配置
const difficultyConfig: Record<string, { color: string; bgColor: string; label: string }> = {
  basic: { color: 'text-green-600', bgColor: 'bg-green-50', label: '基础' },
  intermediate: { color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: '进阶' },
  advanced: { color: 'text-orange-600', bgColor: 'bg-orange-50', label: '高级' },
  competition: { color: 'text-red-600', bgColor: 'bg-red-50', label: '竞赛' },
};

export function KnowledgeMapPage({ onStartProblem, initialPointId, initialPointSlug }: KnowledgeMapPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<KnowledgePoint | null>(null);
  const [bookmarkedPoints, setBookmarkedPoints] = useState<Set<number>>(new Set());
  const [viewedPoints, setViewedPoints] = useState<Set<number>>(new Set());

  // 当 initialPointId 或 initialPointSlug 变化时自动打开对应知识点
  useEffect(() => {
    let point: KnowledgePoint | undefined;
    
    if (initialPointId) {
      point = getKnowledgePointById(initialPointId);
    } else if (initialPointSlug) {
      point = getKnowledgePointBySlug(initialPointSlug);
    }
    
    if (point) {
      setSelectedPoint(point);
      setViewedPoints(prev => new Set([...prev, point!.id]));
    }
  }, [initialPointId, initialPointSlug]);

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
  const toggleBookmark = (pointId: number) => {
    const newBookmarks = new Set(bookmarkedPoints);
    if (newBookmarks.has(pointId)) {
      newBookmarks.delete(pointId);
    } else {
      newBookmarks.add(pointId);
    }
    setBookmarkedPoints(newBookmarks);
  };

  // 标记已读
  const markAsViewed = (pointId: number) => {
    setViewedPoints(new Set([...viewedPoints, pointId]));
  };

  // 查看详情
  const viewPoint = (point: KnowledgePoint) => {
    setSelectedPoint(point);
    markAsViewed(point.id);
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
                            className={`cursor-pointer hover:shadow-md transition-shadow ${
                              isViewed ? 'border-green-200 bg-green-50/30' : ''
                            }`}
                            onClick={() => viewPoint(point)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{point.icon}</span>
                                  <h3 className="font-medium">{point.title}</h3>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark(point.id);
                                  }}
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
                                {isViewed && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
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

      {/* 知识点详情弹窗 */}
      <Dialog open={!!selectedPoint} onOpenChange={() => setSelectedPoint(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          {selectedPoint && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedPoint.icon}</span>
                  <div>
                    <DialogTitle className="text-xl">{selectedPoint.title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`${difficultyConfig[selectedPoint.difficulty].bgColor} ${difficultyConfig[selectedPoint.difficulty].color} border-0`}>
                        {difficultyConfig[selectedPoint.difficulty].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />{selectedPoint.readTime}分钟
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* 适合小朋友理解的模块 */}
                {selectedPoint.kidFriendly && (
                  <>
                    {/* 生活类比 */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-blue-700">
                        <span className="text-lg">💡</span>
                        想象一下
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                        {selectedPoint.kidFriendly.analogy}
                      </p>
                    </div>

                    {/* 形象化描述 */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-teal-50 border border-green-100">
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-green-700">
                        <span className="text-lg">🎨</span>
                        可视化理解
                      </h4>
                      <pre className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono bg-white/50 p-3 rounded-lg">
                        {selectedPoint.kidFriendly.visualization}
                      </pre>
                    </div>

                    {/* 为什么要学 */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100">
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-yellow-700">
                        <span className="text-lg">🎯</span>
                        为什么学这个？
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {selectedPoint.kidFriendly.whyLearn}
                      </p>
                    </div>
                  </>
                )}

                <Separator />

                {/* 简介 */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    概述
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedPoint.description}
                  </p>
                </div>

                <Separator />

                {/* 核心内容 */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    核心内容
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedPoint.content.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm p-2 rounded-lg bg-slate-50">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 详细代码示例 */}
                {selectedPoint.codeExamples && selectedPoint.codeExamples.length > 0 && (
                  <>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Code className="h-4 w-4 text-purple-500" />
                        代码示例
                      </h4>
                      <div className="space-y-4">
                        {selectedPoint.codeExamples.map((example, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="bg-slate-100 px-4 py-2 border-b">
                              <div className="font-medium text-sm">{example.title}</div>
                              <div className="text-xs text-muted-foreground">{example.description}</div>
                            </div>
                            <div className="bg-slate-900 p-4 overflow-x-auto">
                              <pre className="text-sm text-slate-100 font-mono whitespace-pre">
                                <code>{example.code}</code>
                              </pre>
                            </div>
                            {example.explanation && example.explanation.length > 0 && (
                              <div className="bg-slate-50 px-4 py-3">
                                <div className="text-xs font-medium text-slate-600 mb-2">💡 代码解释：</div>
                                <ul className="space-y-1">
                                  {example.explanation.map((exp, i) => (
                                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                                      <span className="text-blue-500 mt-0.5">•</span>
                                      {exp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* 兼容旧版单个代码示例 */}
                {!selectedPoint.codeExamples && selectedPoint.codeExample && (
                  <>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Code className="h-4 w-4 text-purple-500" />
                        代码示例
                      </h4>
                      <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-slate-100 font-mono">
                          <code>{selectedPoint.codeExample}</code>
                        </pre>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* 常见错误 */}
                {selectedPoint.commonMistakes && selectedPoint.commonMistakes.length > 0 && (
                  <>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2 text-red-600">
                        <span className="text-lg">⚠️</span>
                        常见错误
                      </h4>
                      <div className="space-y-3">
                        {selectedPoint.commonMistakes.map((mistake, index) => (
                          <div key={index} className="p-3 rounded-lg bg-red-50 border border-red-100">
                            <div className="flex items-start gap-2 mb-2">
                              <span className="text-red-500 text-sm">❌</span>
                              <div className="text-sm font-medium text-red-700">{mistake.mistake}</div>
                            </div>
                            <div className="text-xs text-red-600 mb-2 ml-6">
                              原因：{mistake.why}
                            </div>
                            <div className="flex items-start gap-2 ml-6 p-2 bg-green-50 rounded text-green-700">
                              <span className="text-xs">✅</span>
                              <span className="text-xs">{mistake.correctWay}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* 小测验 */}
                {selectedPoint.quiz && (
                  <>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100">
                      <h4 className="font-medium mb-3 flex items-center gap-2 text-indigo-700">
                        <span className="text-lg">📝</span>
                        小测验
                      </h4>
                      <p className="text-sm text-slate-700 mb-3">{selectedPoint.quiz.question}</p>
                      <div className="space-y-2">
                        {selectedPoint.quiz.options.map((option, index) => (
                          <div 
                            key={index}
                            className="p-2 rounded-lg bg-white border border-slate-200 text-sm cursor-pointer hover:bg-slate-50 transition-colors"
                          >
                            <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </div>
                        ))}
                      </div>
                      <details className="mt-3">
                        <summary className="text-xs text-indigo-600 cursor-pointer hover:text-indigo-800">
                          查看答案
                        </summary>
                        <div className="mt-2 p-2 bg-white rounded-lg text-sm">
                          <div className="font-medium text-green-600 mb-1">
                            正确答案：{String.fromCharCode(65 + selectedPoint.quiz.answer)}
                          </div>
                          <div className="text-slate-600">{selectedPoint.quiz.explanation}</div>
                        </div>
                      </details>
                    </div>
                    <Separator />
                  </>
                )}

                {/* 前置知识 */}
                {selectedPoint.prerequisites.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-orange-500" />
                      前置知识
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPoint.prerequisites.map((preId) => {
                        const prePoint = getKnowledgePointById(preId);
                        if (!prePoint) return null;
                        return (
                          <Button
                            key={preId}
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPoint(prePoint)}
                            className="gap-2"
                          >
                            <span>{prePoint.icon}</span>
                            {prePoint.title}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 推荐练习 */}
                {selectedPoint.recommendedProblems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      推荐练习
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedPoint.recommendedProblems.map((problemId, index) => (
                        <Button
                          key={problemId}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onStartProblem?.(problemId);
                            setSelectedPoint(null);
                          }}
                          className="justify-start gap-2"
                        >
                          <Play className="h-3 w-3" />
                          题目 #{problemId}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 视频教程 */}
                {selectedPoint.videoUrl && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Video className="h-4 w-4 text-red-500" />
                      视频教程
                    </h4>
                    <a
                      href={selectedPoint.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      观看视频讲解
                    </a>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => toggleBookmark(selectedPoint.id)}
                    className="gap-2"
                  >
                    {bookmarkedPoints.has(selectedPoint.id) ? (
                      <>
                        <BookmarkCheck className="h-4 w-4" />
                        已收藏
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" />
                        收藏
                      </>
                    )}
                  </Button>

                  {selectedPoint.recommendedProblems[0] && (
                    <Button onClick={() => {
                      onStartProblem?.(selectedPoint.recommendedProblems[0]);
                      setSelectedPoint(null);
                    }}>
                      开始练习
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  getUserLearningData,
  type WrongProblemRecord,
  type SubmissionRecord,
} from '@/lib/user-learning-data';
import type { DifficultyLevel } from '@/lib/problems';
import {
  BookX,
  Clock,
  RefreshCw,
  Filter,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Code,
  Calendar,
  TrendingUp,
  Target,
  AlertTriangle,
} from 'lucide-react';

interface WrongProblemBookProps {
  onSelectProblem?: (problemId: number) => void;
}

const difficultyConfig: Record<DifficultyLevel, { label: string; color: string }> = {
  beginner: { label: '入门', color: 'bg-green-100 text-green-800 border-green-200' },
  intermediate: { label: '提高', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  advanced: { label: '省选', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  expert: { label: 'NOI', color: 'bg-red-100 text-red-800 border-red-200' },
};

const resultConfig: Record<string, { label: string; color: string }> = {
  AC: { label: '通过', color: 'text-green-600' },
  WA: { label: '答案错误', color: 'text-red-600' },
  TLE: { label: '超时', color: 'text-orange-600' },
  MLE: { label: '超内存', color: 'text-purple-600' },
  RE: { label: '运行错误', color: 'text-red-600' },
  CE: { label: '编译错误', color: 'text-yellow-600' },
  PE: { label: '格式错误', color: 'text-blue-600' },
  SE: { label: '系统错误', color: 'text-gray-600' },
};

export function WrongProblemBook({ onSelectProblem }: WrongProblemBookProps) {
  const [data, setData] = useState(getUserLearningData);
  const [filter, setFilter] = useState<'all' | 'reviewed' | 'unreviewed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'count' | 'difficulty'>('recent');
  const [selectedProblem, setSelectedProblem] = useState<WrongProblemRecord | null>(null);

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = new Set(data.wrongProblems.map(w => w.category));
    return ['all', ...Array.from(cats)];
  }, [data.wrongProblems]);

  // 过滤和排序
  const filteredProblems = useMemo(() => {
    let problems = [...data.wrongProblems];

    // 状态过滤
    if (filter === 'reviewed') {
      problems = problems.filter(p => p.reviewed);
    } else if (filter === 'unreviewed') {
      problems = problems.filter(p => !p.reviewed);
    }

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
      problems.sort((a, b) => b.lastWrongTime - a.lastWrongTime);
    } else if (sortBy === 'count') {
      problems.sort((a, b) => b.wrongCount - a.wrongCount);
    } else if (sortBy === 'difficulty') {
      const order: Record<DifficultyLevel, number> = { expert: 0, advanced: 1, intermediate: 2, beginner: 3 };
      problems.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    }

    return problems;
  }, [data.wrongProblems, filter, categoryFilter, difficultyFilter, sortBy]);

  // 统计信息
  const stats = useMemo(() => {
    const total = data.wrongProblems.length;
    const reviewed = data.wrongProblems.filter(p => p.reviewed).length;
    const unreviewed = total - reviewed;
    
    const categoryStats: Record<string, number> = {};
    data.wrongProblems.forEach(p => {
      categoryStats[p.category] = (categoryStats[p.category] || 0) + 1;
    });

    return { total, reviewed, unreviewed, categoryStats };
  }, [data.wrongProblems]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return '今天';
    } else if (days === 1) {
      return '昨天';
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  const refreshData = () => {
    setData(getUserLearningData());
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部统计栏 */}
      <div className="px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookX className="h-5 w-5 text-red-500" />
            <span className="font-semibold">错题本</span>
          </div>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <Card className="p-2 bg-red-50 border-red-200">
            <div className="text-xl font-bold text-red-600">{stats.total}</div>
            <div className="text-xs text-muted-foreground">错题总数</div>
          </Card>
          <Card className="p-2 bg-yellow-50 border-yellow-200">
            <div className="text-xl font-bold text-yellow-600">{stats.unreviewed}</div>
            <div className="text-xs text-muted-foreground">待复习</div>
          </Card>
          <Card className="p-2 bg-green-50 border-green-200">
            <div className="text-xl font-bold text-green-600">{stats.reviewed}</div>
            <div className="text-xs text-muted-foreground">已复习</div>
          </Card>
        </div>
      </div>

      {/* 过滤器 */}
      <div className="px-4 py-2 border-b flex items-center gap-2 flex-wrap">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="h-8">
            <TabsTrigger value="all" className="text-xs px-3">全部</TabsTrigger>
            <TabsTrigger value="unreviewed" className="text-xs px-3">待复习</TabsTrigger>
            <TabsTrigger value="reviewed" className="text-xs px-3">已复习</TabsTrigger>
          </TabsList>
        </Tabs>

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
            <SelectItem value="recent">最近错误</SelectItem>
            <SelectItem value="count">错误次数</SelectItem>
            <SelectItem value="difficulty">难度优先</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 错题列表 */}
      <ScrollArea className="flex-1 p-4">
        {filteredProblems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              {filter === 'all' ? '还没有错题记录' : '没有符合条件的错题'}
            </h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              继续加油，保持正确率！
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProblems.map(problem => (
              <Card
                key={problem.problemId}
                className={`p-3 cursor-pointer hover:border-primary/50 transition-colors ${
                  problem.reviewed ? 'opacity-80' : ''
                }`}
                onClick={() => setSelectedProblem(problem)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{problem.problemTitle}</h4>
                      <Badge variant="outline" className={difficultyConfig[problem.difficulty].color}>
                        {difficultyConfig[problem.difficulty].label}
                      </Badge>
                      {problem.reviewed && (
                        <Badge variant="secondary" className="text-xs">
                          已复习
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{problem.category}</span>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>错{problem.wrongCount}次</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(problem.lastWrongTime)}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProblem?.(problem.problemId);
                    }}
                  >
                    重新练习
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* 详情对话框 */}
      <Dialog open={!!selectedProblem} onOpenChange={() => setSelectedProblem(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          {selectedProblem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  {selectedProblem.problemTitle}
                </DialogTitle>
                <DialogDescription>
                  错误次数: {selectedProblem.wrongCount} · 分类: {selectedProblem.category}
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4 mt-4">
                  {/* 错误统计 */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-3 text-center bg-red-50 border-red-200">
                      <div className="text-2xl font-bold text-red-600">{selectedProblem.wrongCount}</div>
                      <div className="text-xs text-muted-foreground">错误次数</div>
                    </Card>
                    <Card className="p-3 text-center bg-blue-50 border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{selectedProblem.reviewedCount}</div>
                      <div className="text-xs text-muted-foreground">复习次数</div>
                    </Card>
                    <Card className="p-3 text-center bg-gray-50 border-gray-200">
                      <div className="text-2xl font-bold text-gray-600">
                        {formatDate(selectedProblem.lastWrongTime)}
                      </div>
                      <div className="text-xs text-muted-foreground">最近错误</div>
                    </Card>
                  </div>

                  {/* 最后一次提交 */}
                  {selectedProblem.lastSubmission && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        最后一次提交
                      </h4>
                      <Card className="p-3 bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={resultConfig[selectedProblem.lastSubmission.result]?.color || ''}>
                              {resultConfig[selectedProblem.lastSubmission.result]?.label || selectedProblem.lastSubmission.result}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {selectedProblem.lastSubmission.language.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>
                              {selectedProblem.lastSubmission.testCasesPassed}/
                              {selectedProblem.lastSubmission.totalTestCases} 通过
                            </span>
                          </div>
                        </div>
                        <pre className="text-xs bg-background p-2 rounded overflow-x-auto max-h-40">
                          {selectedProblem.lastSubmission.code}
                        </pre>
                      </Card>
                    </div>
                  )}

                  {/* 学习建议 */}
                  <Card className="p-3 bg-yellow-50 border-yellow-200">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">学习建议</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedProblem.wrongCount >= 3 ? (
                            <>
                              这道题你已经错了{selectedProblem.wrongCount}次，建议：
                              <br />1. 仔细审题，确保理解题意
                              <br />2. 画图分析，理清思路
                              <br />3. 参考相关知识点讲解
                              <br />4. 从简单用例开始调试
                            </>
                          ) : (
                            <>
                              建议复习相关知识点，然后重新尝试解决这道题目。
                              注意检查边界条件和特殊用例。
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>

              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <Button variant="outline" onClick={() => setSelectedProblem(null)}>
                  关闭
                </Button>
                <Button onClick={() => {
                  onSelectProblem?.(selectedProblem.problemId);
                  setSelectedProblem(null);
                }}>
                  重新练习
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

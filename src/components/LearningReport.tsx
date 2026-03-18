'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  getUserLearningData,
  type SubmissionRecord,
} from '@/lib/user-learning-data';
import { problems } from '@/lib/problems';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  Flame,
  Zap,
  Trophy,
  Brain,
  LineChart,
  PieChart,
  Activity,
  Award,
  Star,
  RefreshCw,
} from 'lucide-react';

interface LearningReportProps {
  onSelectProblem?: (problemId: number) => void;
}

// 知识点分类
const KNOWLEDGE_CATEGORIES = [
  { id: 'basics', name: '基础语法', tags: ['输入输出', '变量', '运算符', '条件语句', '循环'] },
  { id: 'arrays', name: '数组与字符串', tags: ['数组', '字符串'] },
  { id: 'functions', name: '函数与递归', tags: ['函数', '递归'] },
  { id: 'algorithms', name: '基础算法', tags: ['排序', '二分查找', '枚举', '模拟', '贪心', '分治'] },
  { id: 'datastructures', name: '数据结构', tags: ['栈', '队列', '数据结构'] },
  { id: 'dp', name: '动态规划', tags: ['动态规划', '背包问题'] },
  { id: 'search', name: '搜索', tags: ['搜索-DFS', '搜索-BFS'] },
  { id: 'numbertheory', name: '数论', tags: ['数论-GCD', '数论-质数', '数论-快速幂', '前缀和', '差分', '位运算'] },
  { id: 'graph', name: '图论', tags: ['图论', '图论-最短路', '图论-生成树'] },
];

export function LearningReport({ onSelectProblem }: LearningReportProps) {
  const [data, setData] = useState(getUserLearningData);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  // 根据时间范围过滤数据
  const filteredSubmissions = useMemo(() => {
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    let cutoff = 0;
    if (timeRange === 'week') {
      cutoff = now - 7 * dayInMs;
    } else if (timeRange === 'month') {
      cutoff = now - 30 * dayInMs;
    }
    
    return data.submissions.filter(s => s.timestamp >= cutoff);
  }, [data.submissions, timeRange]);

  // 计算核心统计
  const coreStats = useMemo(() => {
    const total = filteredSubmissions.length;
    const accepted = filteredSubmissions.filter(s => s.result === 'AC').length;
    const uniqueSolved = new Set(filteredSubmissions.filter(s => s.result === 'AC').map(s => s.problemId)).size;
    const avgTime = filteredSubmissions.length > 0
      ? Math.round(filteredSubmissions.reduce((sum, s) => sum + (s.executionTime || 0), 0) / filteredSubmissions.length)
      : 0;
    
    // 计算平均正确率趋势
    const days: Record<string, { total: number; accepted: number }> = {};
    filteredSubmissions.forEach(s => {
      const day = new Date(s.timestamp).toISOString().split('T')[0];
      if (!days[day]) days[day] = { total: 0, accepted: 0 };
      days[day].total++;
      if (s.result === 'AC') days[day].accepted++;
    });

    const dailyAccuracy = Object.entries(days).map(([date, stats]) => ({
      date,
      accuracy: stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0,
      submissions: stats.total,
    })).sort((a, b) => a.date.localeCompare(b.date));

    return {
      total,
      accepted,
      accuracy: total > 0 ? Math.round((accepted / total) * 100) : 0,
      uniqueSolved,
      avgTime,
      dailyAccuracy,
    };
  }, [filteredSubmissions]);

  // 计算知识点掌握度
  const knowledgeMastery = useMemo(() => {
    const mastery: Record<string, { total: number; solved: number; name: string }> = {};
    
    // 初始化所有知识点
    KNOWLEDGE_CATEGORIES.forEach(cat => {
      mastery[cat.id] = { total: 0, solved: 0, name: cat.name };
    });

    // 统计每个标签的完成情况
    const tagStats: Record<string, { total: number; solved: number }> = {};
    
    problems.forEach(p => {
      p.tags.forEach(tag => {
        if (!tagStats[tag]) tagStats[tag] = { total: 0, solved: 0 };
        tagStats[tag].total++;
        
        // 检查是否已解决
        const isSolved = data.submissions.some(
          s => s.problemId === p.id && s.result === 'AC'
        );
        if (isSolved) {
          tagStats[tag].solved++;
        }
      });
    });

    // 汇总到知识点分类
    KNOWLEDGE_CATEGORIES.forEach(cat => {
      let total = 0;
      let solved = 0;
      cat.tags.forEach(tag => {
        if (tagStats[tag]) {
          total += tagStats[tag].total;
          solved += tagStats[tag].solved;
        }
      });
      mastery[cat.id] = {
        total: total || 1,
        solved,
        name: cat.name,
      };
    });

    return Object.entries(mastery).map(([id, stats]) => ({
      id,
      name: stats.name,
      total: stats.total,
      solved: stats.solved,
      mastery: Math.round((stats.solved / stats.total) * 100),
    }));
  }, [data.submissions]);

  // 难度分布
  const difficultyDistribution = useMemo(() => {
    const dist = { beginner: { total: 0, solved: 0 }, intermediate: { total: 0, solved: 0 }, advanced: { total: 0, solved: 0 }, expert: { total: 0, solved: 0 } };
    
    problems.forEach(p => {
      const diff = p.difficulty as keyof typeof dist;
      if (dist[diff]) {
        dist[diff].total++;
        const isSolved = data.submissions.some(s => s.problemId === p.id && s.result === 'AC');
        if (isSolved) dist[diff].solved++;
      }
    });

    return [
      { name: '入门', solved: dist.beginner.solved, total: dist.beginner.total, color: 'bg-green-500' },
      { name: '提高', solved: dist.intermediate.solved, total: dist.intermediate.total, color: 'bg-blue-500' },
      { name: '省选', solved: dist.advanced.solved, total: dist.advanced.total, color: 'bg-orange-500' },
      { name: 'NOI', solved: dist.expert.solved, total: dist.expert.total, color: 'bg-red-500' },
    ];
  }, [data.submissions]);

  // 最近活动
  const recentActivity = useMemo(() => {
    return data.submissions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);
  }, [data.submissions]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    
    if (days === 0) {
      return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
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
      {/* 顶部工具栏 */}
      <div className="px-4 py-2 border-b bg-muted/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">学习报告</span>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
            <SelectTrigger className="w-24 h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">近7天</SelectItem>
              <SelectItem value="month">近30天</SelectItem>
              <SelectItem value="all">全部</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={refreshData} className="h-7 w-7 p-0">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* 核心指标卡片 */}
          <div className="grid grid-cols-4 gap-3">
            <Card className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-muted-foreground">正确率</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{coreStats.accuracy}%</div>
              <div className="text-xs text-muted-foreground">{coreStats.accepted}/{coreStats.total} 次</div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">已解决</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{coreStats.uniqueSolved}</div>
              <div className="text-xs text-muted-foreground">道题目</div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-xs text-muted-foreground">连续学习</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{data.stats.streak}</div>
              <div className="text-xs text-muted-foreground">天 (最长{data.stats.maxStreak})</div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-purple-500" />
                <span className="text-xs text-muted-foreground">平均耗时</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{coreStats.avgTime}</div>
              <div className="text-xs text-muted-foreground">ms</div>
            </Card>
          </div>

          {/* 知识点掌握度 */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">知识点掌握度</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {knowledgeMastery.map(item => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium">{item.mastery}%</span>
                  </div>
                  <Progress 
                    value={item.mastery} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {item.solved}/{item.total} 题
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 难度分布 */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <PieChart className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">难度分布</span>
            </div>
            <div className="space-y-3">
              {difficultyDistribution.map(item => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.solved}/{item.total} 题</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.total > 0 ? (item.solved / item.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 正确率趋势 */}
          {coreStats.dailyAccuracy.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">正确率趋势</span>
              </div>
              <div className="h-32 flex items-end gap-1">
                {coreStats.dailyAccuracy.slice(-14).map((day, index) => (
                  <div 
                    key={day.date}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div 
                      className="w-full bg-green-500/80 rounded-t transition-all duration-300 hover:bg-green-500"
                      style={{ height: `${day.accuracy}%`, minHeight: '4px' }}
                      title={`${day.date}: ${day.accuracy}% (${day.submissions}次提交)`}
                    />
                    {index % 2 === 0 && (
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(day.date).getDate()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* 最近活动 */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">最近活动</span>
            </div>
            <div className="space-y-2">
              {recentActivity.length > 0 ? recentActivity.map(sub => (
                <div 
                  key={sub.id} 
                  className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-muted/50 cursor-pointer"
                  onClick={() => onSelectProblem?.(sub.problemId)}
                >
                  <div className="flex items-center gap-2">
                    {sub.result === 'AC' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm truncate max-w-[150px]">{sub.problemTitle}</span>
                    <Badge variant="outline" className="text-xs">
                      {sub.result}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(sub.timestamp)}</span>
                </div>
              )) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  暂无学习记录，开始刷题吧！
                </div>
              )}
            </div>
          </Card>

          {/* 成就进度 */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">成就进度</span>
              <Badge variant="secondary" className="ml-auto">
                {data.achievements.filter(a => a.unlocked).length}/{data.achievements.length}
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {data.achievements.slice(0, 8).map(ach => (
                <div 
                  key={ach.id}
                  className={`p-2 rounded-lg text-center transition-all ${
                    ach.unlocked 
                      ? 'bg-amber-50 border border-amber-200' 
                      : 'bg-muted/50 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{ach.icon}</div>
                  <div className="text-xs font-medium truncate">{ach.name}</div>
                  {ach.unlocked && (
                    <Star className="h-3 w-3 text-amber-500 mx-auto mt-1" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}

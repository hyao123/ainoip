'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  problems,
  type Problem,
  type DifficultyLevel,
} from '@/lib/problems';
import {
  getUserLearningData,
  getUserPointsAndHints,
  type SubmissionRecord,
} from '@/lib/user-learning-data';
import {
  Trophy,
  Flame,
  Target,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Code2,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatisticsDashboardProps {
  className?: string;
}

const difficultyConfig: Record<DifficultyLevel, { label: string; color: string; bg: string }> = {
  beginner: { label: '入门', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
  intermediate: { label: '进阶', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
  advanced: { label: '困难', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10' },
  expert: { label: '专家', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10' },
};

export function StatisticsDashboard({ className }: StatisticsDashboardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 统计数据
  const stats = useMemo(() => {
    const userData = getUserLearningData();
    const submissions: SubmissionRecord[] = userData.submissions;
    const pointsData = getUserPointsAndHints();
    const favorites = userData.favoriteProblems;

    // 按题目分组
    const problemSubmissions = new Map<number, SubmissionRecord[]>();
    submissions.forEach((s: SubmissionRecord) => {
      const existing = problemSubmissions.get(s.problemId) || [];
      existing.push(s);
      problemSubmissions.set(s.problemId, existing);
    });

    // 已解决的题目
    const solvedProblems = new Set<number>();
    problemSubmissions.forEach((subs: SubmissionRecord[], problemId: number) => {
      if (subs.some((s: SubmissionRecord) => s.result === 'AC')) {
        solvedProblems.add(problemId);
      }
    });

    // 尝试过的题目
    const attemptedProblems = new Set(problemSubmissions.keys());

    // 按难度统计
    const byDifficulty: Record<DifficultyLevel, { total: number; solved: number }> = {
      beginner: { total: 0, solved: 0 },
      intermediate: { total: 0, solved: 0 },
      advanced: { total: 0, solved: 0 },
      expert: { total: 0, solved: 0 },
    };

    problems.forEach(p => {
      byDifficulty[p.difficulty].total++;
      if (solvedProblems.has(p.id)) {
        byDifficulty[p.difficulty].solved++;
      }
    });

    // 按分类统计
    const byCategory = new Map<string, { total: number; solved: number }>();
    problems.forEach(p => {
      const existing = byCategory.get(p.category) || { total: 0, solved: 0 };
      existing.total++;
      if (solvedProblems.has(p.id)) {
        existing.solved++;
      }
      byCategory.set(p.category, existing);
    });

    // 最近7天提交
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentSubmissions = submissions.filter((s: SubmissionRecord) => s.timestamp >= sevenDaysAgo);

    // 连续刷题天数
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dayStart = checkDate.getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;
      const hasSubmission = submissions.some((s: SubmissionRecord) => s.timestamp >= dayStart && s.timestamp < dayEnd);
      if (hasSubmission) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    // 通过率
    const totalAttempts = submissions.length;
    const acCount = submissions.filter((s: SubmissionRecord) => s.result === 'AC').length;
    const acceptRate = totalAttempts > 0 ? Math.round((acCount / totalAttempts) * 100) : 0;

    return {
      totalProblems: problems.length,
      solvedCount: solvedProblems.size,
      attemptedCount: attemptedProblems.size,
      favoritesCount: favorites.length,
      points: pointsData.points,
      hintsAvailable: pointsData.dailyHintsRemaining,
      byDifficulty,
      byCategory: Array.from(byCategory.entries()).sort((a, b) => b[1].total - a[1].total),
      recentSubmissions: recentSubmissions.length,
      streak,
      acceptRate,
      totalAttempts,
      acCount,
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-muted rounded" />
            <div className="h-24 bg-muted rounded" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* 核心统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.solvedCount}</p>
              <p className="text-sm text-muted-foreground">已解决</p>
            </div>
          </div>
          <Progress
            value={(stats.solvedCount / stats.totalProblems) * 100}
            className="mt-3 h-1.5"
          />
          <p className="text-xs text-muted-foreground mt-1">
            完成率 {Math.round((stats.solvedCount / stats.totalProblems) * 100)}%
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.streak}</p>
              <p className="text-sm text-muted-foreground">连续天数</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            最近7天: {stats.recentSubmissions} 次提交
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.acceptRate}%</p>
              <p className="text-sm text-muted-foreground">通过率</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {stats.acCount} / {stats.totalAttempts} 次提交通过
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.points}</p>
              <p className="text-sm text-muted-foreground">积分</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            可用提示: {stats.hintsAvailable} 次
          </p>
        </Card>
      </div>

      {/* 难度分布 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          难度分布
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.entries(stats.byDifficulty) as [DifficultyLevel, { total: number; solved: number }][]).map(([diff, data]) => (
            <div key={diff} className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge className={cn(difficultyConfig[diff].bg, difficultyConfig[diff].color)}>
                  {difficultyConfig[diff].label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {data.solved}/{data.total}
                </span>
              </div>
              <Progress
                value={data.total > 0 ? (data.solved / data.total) * 100 : 0}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* 分类统计 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          分类进度
        </h3>
        <ScrollArea className="h-[200px]">
          <div className="space-y-3">
            {stats.byCategory.map(([category, data]) => (
              <div key={category} className="flex items-center gap-3">
                <div className="w-24 text-sm font-medium truncate">{category}</div>
                <Progress
                  value={data.total > 0 ? (data.solved / data.total) * 100 : 0}
                  className="flex-1 h-2"
                />
                <div className="w-16 text-sm text-muted-foreground text-right">
                  {data.solved}/{data.total}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}

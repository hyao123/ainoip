'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar,
  Flame,
  Clock,
  ChevronRight,
  Target,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Star,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import { 
  getTodayDailyProblem, 
  getDailyProblemsHistory,
  type DailyProblem 
} from '@/lib/daily-problem';
import { problems } from '@/lib/problems';
import type { Problem } from '@/lib/problems';

interface DailyProblemCardProps {
  onStartProblem?: (problem: Problem) => void;
  compact?: boolean;
}

export function DailyProblemCard({ onStartProblem, compact = false }: DailyProblemCardProps) {
  const [dailyProblem, setDailyProblem] = useState<DailyProblem | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const daily = getTodayDailyProblem();
    setDailyProblem(daily);
    
    const relatedProblem = problems.find(p => p.id === daily.problemId);
    if (relatedProblem) {
      setProblem(relatedProblem);
    }
    
    // 从localStorage读取连续天数
    const savedStreak = localStorage.getItem('dailyProblemStreak');
    const lastDate = localStorage.getItem('dailyProblemLastDate');
    const today = new Date().toDateString();
    
    if (lastDate === today) {
      setCompleted(true);
      setStreak(savedStreak ? parseInt(savedStreak) : 0);
    } else if (lastDate === new Date(Date.now() - 86400000).toDateString()) {
      // 连续天数
      setStreak(savedStreak ? parseInt(savedStreak) + 1 : 1);
    } else {
      setStreak(1);
    }
  }, []);

  const handleStartProblem = () => {
    if (problem && onStartProblem) {
      // 记录今天已练习
      localStorage.setItem('dailyProblemLastDate', new Date().toDateString());
      localStorage.setItem('dailyProblemStreak', streak.toString());
      setCompleted(true);
      onStartProblem(problem);
    }
  };

  if (!dailyProblem || !problem) {
    return null;
  }

  const difficultyConfig = {
    beginner: { label: '入门', color: 'bg-green-100 text-green-800 border-green-200' },
    intermediate: { label: '进阶', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    advanced: { label: '高级', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    expert: { label: '专家', color: 'bg-red-100 text-red-800 border-red-200' },
  };

  const diffConfig = difficultyConfig[problem.difficulty as keyof typeof difficultyConfig] || difficultyConfig.beginner;

  if (compact) {
    return (
      <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Calendar className="h-5 w-5 text-primary" />
                {streak > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] flex items-center justify-center text-[9px] font-bold bg-orange-500 text-white rounded-full">
                    {streak}
                  </span>
                )}
              </div>
              <span className="font-semibold text-sm">每日一题</span>
            </div>
            {completed ? (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                已完成
              </Badge>
            ) : (
              <Button size="sm" onClick={handleStartProblem} className="h-7 text-xs">
                开始练习
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{problem.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {dailyProblem.reason}
              </p>
            </div>
            <Badge variant="outline" className={`text-[10px] shrink-0 ${diffConfig.color}`}>
              {diffConfig.label}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="h-5 w-5 text-primary" />
              {streak > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-[10px] font-bold bg-orange-500 text-white rounded-full px-1">
                  {streak}
                </span>
              )}
            </div>
            <CardTitle className="text-base">每日一题</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <div className="flex items-center gap-1 text-xs text-orange-600">
                <Flame className="h-4 w-4" />
                <span>{streak}天连续</span>
              </div>
            )}
            {completed && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                今日已完成
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="text-xs mt-1">
          {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 题目信息 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{problem.title}</h3>
            <Badge variant="outline" className={diffConfig.color}>
              {diffConfig.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{dailyProblem.reason}</p>
        </div>

        {/* 相关知识点 */}
        <div className="flex flex-wrap gap-1">
          {dailyProblem.relatedKnowledge.map((knowledge, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              {knowledge}
            </Badge>
          ))}
        </div>

        <Separator />

        {/* 解题提示 */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-sm font-medium">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span>解题提示</span>
          </div>
          <ul className="space-y-1">
            {dailyProblem.tips.map((tip, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* 题目统计 */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-primary">{problem.timeLimit || 1000}</div>
            <div className="text-xs text-muted-foreground">时间限制(ms)</div>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-primary">{problem.memoryLimit || 128}</div>
            <div className="text-xs text-muted-foreground">内存限制(MB)</div>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-primary">{problem.testCases?.length || 0}</div>
            <div className="text-xs text-muted-foreground">测试点</div>
          </div>
        </div>

        {/* 开始按钮 */}
        <Button 
          className="w-full" 
          onClick={handleStartProblem}
          disabled={completed}
        >
          {completed ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              今日已完成
            </>
          ) : (
            <>
              <Target className="h-4 w-4 mr-2" />
              开始练习
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

// 历史每日一题组件
interface DailyProblemHistoryProps {
  onStartProblem?: (problem: Problem) => void;
}

export function DailyProblemHistory({ onStartProblem }: DailyProblemHistoryProps) {
  const [history, setHistory] = useState<DailyProblem[]>([]);

  useEffect(() => {
    const problems = getDailyProblemsHistory(7);
    setHistory(problems);
  }, []);

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Clock className="h-4 w-4" />
          历史每日一题
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64">
          <div className="divide-y divide-border">
            {history.map((daily, index) => {
              const problem = problems.find(p => p.id === daily.problemId);
              if (!problem) return null;
              
              return (
                <div 
                  key={daily.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onStartProblem?.(problem)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{problem.title}</p>
                      <p className="text-xs text-muted-foreground">{daily.date}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

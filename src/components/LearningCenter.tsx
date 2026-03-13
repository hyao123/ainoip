'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Play,
  MessageCircle,
  Calendar,
  Star,
  Zap,
  Trophy,
  Target,
  ChevronRight,
  Sparkles,
  Flame,
  Map,
  Clock,
  CheckCircle2,
  Award,
  TrendingUp,
  Lightbulb,
  Rocket,
  Compass,
  Video,
} from 'lucide-react';
import { DailyProblemCard } from '@/components/DailyProblemCard';
import { VideoTutorialsPanel } from '@/components/VideoTutorialsPanel';
import { AlgorithmAnimationPanel } from '@/components/AlgorithmAnimation';
import { SolutionCommunity } from '@/components/SolutionCommunity';
import {
  dailyLearningPath,
  getDayLesson,
  learningPhases,
  type DayLesson,
} from '@/lib/daily-learning-path';

interface LearningCenterProps {
  onStartProblem?: (problemId: number) => void;
  onNavigate?: (view: 'practice' | 'map' | 'user') => void;
}

// 阶段配置
const phaseConfig: Record<string, { color: string; bgColor: string; borderColor: string; icon: string }> = {
  foundation: {
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    icon: '🌱',
  },
  basic: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    icon: '🌿',
  },
  intermediate: {
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    icon: '🌳',
  },
  advanced: {
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    icon: '🏔️',
  },
  competition: {
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800',
    icon: '🏆',
  },
};

export function LearningCenter({ onStartProblem, onNavigate }: LearningCenterProps) {
  const [activeSection, setActiveSection] = useState<'home' | 'videos' | 'animation' | 'solutions'>('home');
  
  // 学习状态（从localStorage读取）
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [streakDays, setStreakDays] = useState(7);

  // 初始化学习状态
  useEffect(() => {
    const savedCurrentDay = localStorage.getItem('noip_current_day');
    const savedCompletedDays = localStorage.getItem('noip_completed_days');
    const savedStreak = localStorage.getItem('noip_streak_days');
    
    if (savedCurrentDay) setCurrentDay(parseInt(savedCurrentDay));
    if (savedCompletedDays) setCompletedDays(new Set(JSON.parse(savedCompletedDays)));
    if (savedStreak) setStreakDays(parseInt(savedStreak));
  }, []);

  // 获取今日学习内容
  const todayLesson = getDayLesson(currentDay);
  const todayConfig = todayLesson ? phaseConfig[todayLesson.phase] : phaseConfig.foundation;

  // 计算进度
  const totalDays = dailyLearningPath.length;
  const completedCount = completedDays.size;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  // 当前阶段
  const currentPhase = learningPhases.find(p => p.id === todayLesson?.phase);

  // 标记今日完成
  const markTodayComplete = () => {
    const newCompleted = new Set([...completedDays, currentDay]);
    setCompletedDays(newCompleted);
    localStorage.setItem('noip_completed_days', JSON.stringify([...newCompleted]));
    localStorage.setItem('noip_current_day', String(currentDay + 1));
    setCurrentDay(currentDay + 1);
  };

  // 首页视图
  if (activeSection === 'home') {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* 顶部欢迎区 */}
        <div className="p-6 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border-b">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  {todayConfig.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">Day {currentDay}</h1>
                    <Badge variant="outline" className={todayConfig.color}>
                      {todayLesson?.phaseName}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {todayLesson?.title || '开始你的学习之旅'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-600">
                  <Flame className="h-4 w-4" />
                  <span className="text-sm font-medium">{streakDays}天连续</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="max-w-5xl mx-auto p-6 space-y-6">
            
            {/* 今日学习卡片 */}
            {todayLesson && (
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold">今日学习内容</h2>
                      </div>
                      <h3 className="text-lg font-medium mb-2">{todayLesson.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {todayLesson.description}
                      </p>
                      
                      {/* 学习目标 */}
                      <div className="space-y-2 mb-4">
                        <div className="text-sm font-medium">学习目标</div>
                        <div className="flex flex-wrap gap-2">
                          {todayLesson.objectives.slice(0, 3).map((obj, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              {obj}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 底部信息 */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {todayLesson.estimatedMinutes}分钟
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {todayLesson.practiceProblems.length}题练习
                        </div>
                        {todayLesson.challengeProblem && (
                          <div className="flex items-center gap-1 text-yellow-600">
                            <Star className="h-4 w-4" />
                            挑战题
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      <Button
                        onClick={() => todayLesson.practiceProblems[0] && onStartProblem?.(todayLesson.practiceProblems[0])}
                      >
                        开始学习
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={markTodayComplete}
                        disabled={completedDays.has(currentDay)}
                      >
                        {completedDays.has(currentDay) ? '今日已完成' : '标记完成'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 两列布局 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 左列：学习任务 */}
              <div className="space-y-6">
                {/* 今日练习题 */}
                {todayLesson && todayLesson.practiceProblems.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-500" />
                        今日练习
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {todayLesson.practiceProblems.map((problemId, index) => (
                        <button
                          key={problemId}
                          onClick={() => onStartProblem?.(problemId)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm">题目 #{problemId}</span>
                          <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                        </button>
                      ))}
                      {todayLesson.challengeProblem && (
                        <button
                          onClick={() => onStartProblem?.(todayLesson.challengeProblem!)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg border border-yellow-300 bg-yellow-50 hover:bg-yellow-100 transition-colors text-left"
                        >
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm text-yellow-700">挑战题 #{todayLesson.challengeProblem}</span>
                          <ChevronRight className="h-4 w-4 ml-auto text-yellow-500" />
                        </button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* 每日一题 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-500" />
                      每日一题
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DailyProblemCard 
                      onStartProblem={(problem) => onStartProblem?.(problem.id)} 
                      compact 
                    />
                  </CardContent>
                </Card>
              </div>

              {/* 右列：学习辅助 */}
              <div className="space-y-4">
                {/* 学习进度 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">总体进度</span>
                      <span className="text-sm text-muted-foreground">{completedCount}/{totalDays}天</span>
                    </div>
                    <Progress value={progressPercent} className="h-2 mb-3" />
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => onNavigate?.('map')}
                    >
                      <Map className="h-4 w-4 mr-2" />
                      查看完整学习路径
                    </Button>
                  </CardContent>
                </Card>

                {/* 学习辅助入口 */}
                <div className="grid grid-cols-3 gap-3">
                  <Card 
                    className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setActiveSection('videos')}
                  >
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mx-auto mb-2">
                        <Video className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="text-xs font-medium">视频教程</div>
                    </div>
                  </Card>

                  <Card 
                    className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setActiveSection('animation')}
                  >
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="text-xs font-medium">算法动画</div>
                    </div>
                  </Card>

                  <Card 
                    className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setActiveSection('solutions')}
                  >
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto mb-2">
                        <MessageCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="text-xs font-medium">题解社区</div>
                    </div>
                  </Card>
                </div>

                {/* 快捷跳转 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">快捷入口</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between"
                      onClick={() => onNavigate?.('map')}
                    >
                      <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-primary" />
                        <span>基础评估</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between"
                      onClick={() => onNavigate?.('practice')}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span>练习题库</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between"
                      onClick={() => onNavigate?.('user')}
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>个人中心</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  // 其他视图（视频/动画/题解）
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b">
        <Button variant="ghost" size="sm" onClick={() => setActiveSection('home')} className="gap-2">
          <ChevronRight className="h-4 w-4 rotate-180" />
          返回首页
        </Button>
      </div>
      <div className="flex-1 overflow-hidden">
        {activeSection === 'videos' && <VideoTutorialsPanel />}
        {activeSection === 'animation' && <AlgorithmAnimationPanel />}
        {activeSection === 'solutions' && <SolutionCommunity />}
      </div>
    </div>
  );
}

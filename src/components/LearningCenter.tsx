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
  Circle,
  Lock,
  Award,
  TrendingUp,
  Lightbulb,
  Rocket,
} from 'lucide-react';
import { DailyProblemCard } from '@/components/DailyProblemCard';
import { VideoTutorialsPanel } from '@/components/VideoTutorialsPanel';
import { AlgorithmAnimationPanel } from '@/components/AlgorithmAnimation';
import { SolutionCommunity } from '@/components/SolutionCommunity';

interface LearningCenterProps {
  onStartProblem?: (problemId: number) => void;
  onNavigate?: (view: 'practice' | 'map' | 'user') => void;
}

// 学习进度数据
interface LearningProgress {
  completedTopics: number;
  totalTopics: number;
  streakDays: number;
  totalProblems: number;
  correctRate: number;
  currentLevel: string;
  nextLevel: string;
  expProgress: number;
  expToNext: number;
}

// 今日任务
interface TodayTask {
  id: string;
  type: 'review' | 'learn' | 'practice';
  title: string;
  description: string;
  problemId?: number;
  topicId?: string;
  completed: boolean;
  reward: number;
}

// 成就徽章
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: string;
}

// 推荐学习
interface Recommendation {
  id: string;
  type: 'topic' | 'problem' | 'video';
  title: string;
  reason: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function LearningCenter({ onStartProblem, onNavigate }: LearningCenterProps) {
  const [activeSection, setActiveSection] = useState<'home' | 'videos' | 'animation' | 'solutions'>('home');

  // 模拟学习进度数据
  const learningProgress: LearningProgress = {
    completedTopics: 12,
    totalTopics: 45,
    streakDays: 7,
    totalProblems: 42,
    correctRate: 85,
    currentLevel: '普及组',
    nextLevel: '提高组',
    expProgress: 1200,
    expToNext: 2000,
  };

  // 今日任务
  const todayTasks: TodayTask[] = [
    {
      id: '1',
      type: 'review',
      title: '复习：冒泡排序',
      description: '巩固昨天学习的排序算法',
      problemId: 15,
      completed: false,
      reward: 10,
    },
    {
      id: '2',
      type: 'learn',
      title: '新知识：快速排序',
      description: '学习更高效的排序算法',
      topicId: 'quick-sort',
      completed: false,
      reward: 20,
    },
    {
      id: '3',
      type: 'practice',
      title: '练习：排序算法应用',
      description: '完成3道排序相关题目',
      problemId: 18,
      completed: true,
      reward: 15,
    },
  ];

  // 成就徽章
  const achievements: Achievement[] = [
    {
      id: '1',
      name: '初露锋芒',
      description: '完成第一道题目',
      icon: <Star className="h-5 w-5" />,
      unlocked: true,
      unlockedAt: '2024-01-15',
    },
    {
      id: '2',
      name: '坚持不懈',
      description: '连续学习7天',
      icon: <Flame className="h-5 w-5" />,
      unlocked: true,
      unlockedAt: '2024-01-20',
    },
    {
      id: '3',
      name: '排序大师',
      description: '掌握所有排序算法',
      icon: <Award className="h-5 w-5" />,
      unlocked: false,
    },
    {
      id: '4',
      name: '百题斩',
      description: '完成100道题目',
      icon: <Trophy className="h-5 w-5" />,
      unlocked: false,
    },
  ];

  // 推荐学习
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'topic',
      title: '二分查找',
      reason: '基于你已掌握的排序算法',
      difficulty: 'easy',
    },
    {
      id: '2',
      type: 'problem',
      title: '快速排序练习',
      reason: '巩固新学的排序算法',
      difficulty: 'medium',
    },
    {
      id: '3',
      type: 'video',
      title: '动态规划入门',
      reason: '下一个推荐学习方向',
      difficulty: 'medium',
    },
  ];

  const getTaskIcon = (type: TodayTask['type']) => {
    switch (type) {
      case 'review':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'learn':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'practice':
        return <Target className="h-4 w-4 text-green-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  // 首页视图
  if (activeSection === 'home') {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* 顶部欢迎区 */}
        <div className="p-6 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border-b">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Rocket className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">欢迎回来，小选手！</h1>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    继续你的NOIP学习之旅，今天也要加油哦！
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-sm">
                  <Flame className="h-4 w-4 text-orange-500" />
                  连续 {learningProgress.streakDays} 天
                </Badge>
                <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  {learningProgress.currentLevel}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* 学习进度概览 */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">知识点进度</p>
                      <p className="text-2xl font-bold mt-1">
                        {learningProgress.completedTopics}/{learningProgress.totalTopics}
                      </p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-500/50" />
                  </div>
                  <Progress 
                    value={(learningProgress.completedTopics / learningProgress.totalTopics) * 100} 
                    className="h-1.5 mt-3" 
                  />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">完成题目</p>
                      <p className="text-2xl font-bold mt-1">{learningProgress.totalProblems}</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500/50" />
                  </div>
                  <p className="text-xs text-green-500 mt-3">+5 本周新增</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">正确率</p>
                      <p className="text-2xl font-bold mt-1">{learningProgress.correctRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-500/50" />
                  </div>
                  <p className="text-xs text-yellow-500 mt-3">超出平均水平</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">经验值</p>
                      <p className="text-2xl font-bold mt-1">{learningProgress.expProgress}</p>
                    </div>
                    <Sparkles className="h-8 w-8 text-purple-500/50" />
                  </div>
                  <Progress 
                    value={(learningProgress.expProgress / learningProgress.expToNext) * 100} 
                    className="h-1.5 mt-3" 
                  />
                  <p className="text-xs text-purple-500 mt-1">距离 {learningProgress.nextLevel} 还需 {learningProgress.expToNext - learningProgress.expProgress} EXP</p>
                </CardContent>
              </Card>
            </div>

            {/* 主内容区 */}
            <div className="grid grid-cols-3 gap-6">
              {/* 今日任务 */}
              <Card className="col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    今日学习任务
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                        task.completed 
                          ? 'bg-muted/30 border-muted' 
                          : 'bg-background border-border hover:border-primary/50 cursor-pointer'
                      }`}
                      onClick={() => !task.completed && task.problemId && onStartProblem?.(task.problemId)}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        task.completed ? 'bg-green-500/10' : 'bg-primary/10'
                      }`}>
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          getTaskIcon(task.type)
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-medium text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h4>
                          <Badge variant="outline" className="text-[10px] h-5">
                            +{task.reward} EXP
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                      </div>
                      {!task.completed && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 成就展示 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    我的成就
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border text-center ${
                          achievement.unlocked
                            ? 'bg-yellow-500/5 border-yellow-500/20'
                            : 'bg-muted/30 border-muted opacity-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${
                          achievement.unlocked ? 'bg-yellow-500/20 text-yellow-500' : 'bg-muted text-muted-foreground'
                        }`}>
                          {achievement.icon}
                        </div>
                        <p className="text-xs font-medium mt-2">{achievement.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                          {achievement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 推荐学习 & 每日一题 */}
            <div className="grid grid-cols-3 gap-6">
              {/* 推荐学习 */}
              <Card className="col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    为你推荐
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-4 rounded-lg border bg-background hover:border-primary/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-[10px]">
                            {rec.type === 'topic' ? '知识点' : rec.type === 'problem' ? '练习题' : '视频'}
                          </Badge>
                          <span className={`text-xs ${getDifficultyColor(rec.difficulty)}`}>
                            {rec.difficulty === 'easy' ? '入门' : rec.difficulty === 'medium' ? '普及' : '提高'}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 每日一题 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
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

            {/* 快捷入口 */}
            <div className="grid grid-cols-4 gap-4">
              <Card 
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onNavigate?.('map')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Map className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">知识地图</h4>
                    <p className="text-xs text-muted-foreground">120天学习路径</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setActiveSection('videos')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Play className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">视频教程</h4>
                    <p className="text-xs text-muted-foreground">26+ 精选视频</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setActiveSection('animation')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">算法动画</h4>
                    <p className="text-xs text-muted-foreground">可视化学习</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onNavigate?.('practice')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">开始练习</h4>
                    <p className="text-xs text-muted-foreground">70+ 精选题目</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  // 其他视图
  return (
    <div className="h-full flex flex-col bg-background">
      {/* 返回按钮 */}
      <div className="p-4 border-b">
        <Button variant="ghost" size="sm" onClick={() => setActiveSection('home')} className="gap-2">
          <ChevronRight className="h-4 w-4 rotate-180" />
          返回首页
        </Button>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-hidden">
        {activeSection === 'videos' && <VideoTutorialsPanel />}
        {activeSection === 'animation' && <AlgorithmAnimationPanel />}
        {activeSection === 'solutions' && <SolutionCommunity />}
      </div>
    </div>
  );
}

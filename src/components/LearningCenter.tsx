'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
} from 'lucide-react';
import { DailyProblemCard, DailyProblemHistory } from '@/components/DailyProblemCard';
import { VideoTutorialsPanel, FeaturedVideos } from '@/components/VideoTutorialsPanel';
import { AlgorithmAnimationPanel } from '@/components/AlgorithmAnimation';
import { SolutionCommunity } from '@/components/SolutionCommunity';
import { LearningPathPage } from '@/components/LearningPathPage';

interface LearningCenterProps {
  onStartProblem?: (problemId: number) => void;
}

type LearningTab = 'daily' | 'videos' | 'animation' | 'solutions' | 'path';

export function LearningCenter({ onStartProblem }: LearningCenterProps) {
  const [activeTab, setActiveTab] = useState<LearningTab>('daily');

  const tabConfig: Record<LearningTab, { label: string; icon: React.ReactNode; description: string }> = {
    daily: {
      label: '每日一题',
      icon: <Calendar className="h-4 w-4" />,
      description: '精选每日练习题',
    },
    videos: {
      label: '视频教程',
      icon: <Play className="h-4 w-4" />,
      description: '知识点视频讲解',
    },
    animation: {
      label: '算法动画',
      icon: <Zap className="h-4 w-4" />,
      description: '算法可视化演示',
    },
    solutions: {
      label: '题解社区',
      icon: <MessageCircle className="h-4 w-4" />,
      description: '优质题解分享',
    },
    path: {
      label: '学习路径',
      icon: <Target className="h-4 w-4" />,
      description: '个性化学习规划',
    },
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 标题栏 */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">学习中心</h2>
            <p className="text-xs text-muted-foreground">系统化学习，高效提升</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
            AI辅助学习
          </Badge>
        </div>
      </div>

      {/* 主标签页 */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as LearningTab)} className="flex-1 flex flex-col">
          <div className="px-4 pt-3 border-b">
            <TabsList className="w-full grid grid-cols-5 h-10">
              {Object.entries(tabConfig).map(([key, config]) => (
                <TabsTrigger key={key} value={key} className="text-xs gap-1">
                  {config.icon}
                  <span className="hidden sm:inline">{config.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* 每日一题 */}
          <TabsContent value="daily" className="flex-1 m-0 overflow-hidden">
            <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
              <div className="lg:col-span-2 space-y-4">
                <DailyProblemCard onStartProblem={(problem) => onStartProblem?.(problem.id)} />
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      学习成就
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-2xl font-bold text-primary">7</div>
                        <div className="text-xs text-muted-foreground">连续天数</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-2xl font-bold text-green-500">42</div>
                        <div className="text-xs text-muted-foreground">已完成题目</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-2xl font-bold text-blue-500">85%</div>
                        <div className="text-xs text-muted-foreground">正确率</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <DailyProblemHistory onStartProblem={(problem) => onStartProblem?.(problem.id)} />
                <FeaturedVideos />
              </div>
            </div>
          </TabsContent>

          {/* 视频教程 */}
          <TabsContent value="videos" className="flex-1 m-0 overflow-hidden">
            <VideoTutorialsPanel />
          </TabsContent>

          {/* 算法动画 */}
          <TabsContent value="animation" className="flex-1 m-0 overflow-hidden">
            <AlgorithmAnimationPanel />
          </TabsContent>

          {/* 题解社区 */}
          <TabsContent value="solutions" className="flex-1 m-0 overflow-hidden">
            <SolutionCommunity />
          </TabsContent>

          {/* 学习路径 */}
          <TabsContent value="path" className="flex-1 m-0 overflow-hidden">
            <LearningPathPage onStartProblem={onStartProblem} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

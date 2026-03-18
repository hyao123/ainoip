'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WrongProblemBook } from '@/components/WrongProblemBook';
import { LearningRecord } from '@/components/LearningRecord';
import { LearningReport } from '@/components/LearningReport';
import { FavoriteProblems } from '@/components/FavoriteProblems';
import { AchievementSystem } from '@/components/AchievementSystem';
import { getUserLearningData } from '@/lib/user-learning-data';
import {
  BookX,
  History,
  Star,
  Trophy,
  User,
  Flame,
  Target,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

interface UserCenterPageProps {
  onSelectProblem?: (problemId: number) => void;
}

export function UserCenterPage({ onSelectProblem }: UserCenterPageProps) {
  const [activeTab, setActiveTab] = useState('report');
  const data = getUserLearningData();

  // 计算快速统计
  const quickStats = {
    streak: data.stats.streak,
    solved: data.stats.solvedProblems,
    wrong: data.wrongProblems.length,
    favorites: data.favoriteProblems.length,
    achievements: data.achievements.filter(a => a.unlocked).length,
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 顶部用户信息 - 紧凑设计 */}
      <div className="px-5 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shrink-0">
        <div className="flex items-center justify-between">
          {/* 左侧：用户信息 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold">我的学习中心</h1>
              <p className="text-xs text-white/70">记录学习历程，见证成长足迹</p>
            </div>
          </div>

          {/* 右侧：快速统计 - 横向排列 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <Flame className="h-4 w-4 text-orange-300" />
              <span className="text-sm font-bold">{quickStats.streak}</span>
              <span className="text-xs text-white/60">天</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <Target className="h-4 w-4 text-green-300" />
              <span className="text-sm font-bold">{quickStats.solved}</span>
              <span className="text-xs text-white/60">题</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <BookX className="h-4 w-4 text-red-300" />
              <span className="text-sm font-bold">{quickStats.wrong}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <Star className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-bold">{quickStats.favorites}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <Trophy className="h-4 w-4 text-amber-300" />
              <span className="text-sm font-bold">{quickStats.achievements}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab导航和内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <div className="border-b px-4 bg-muted/30 shrink-0">
          <TabsList className="h-11">
            <TabsTrigger value="report" className="gap-1.5 data-[state=active]:text-primary">
              <BarChart3 className="h-4 w-4" />
              学习报告
            </TabsTrigger>
            <TabsTrigger value="record" className="gap-1.5 data-[state=active]:text-primary">
              <History className="h-4 w-4" />
              学习记录
            </TabsTrigger>
            <TabsTrigger value="wrong" className="gap-1.5 data-[state=active]:text-red-500">
              <BookX className="h-4 w-4" />
              错题本
            </TabsTrigger>
            <TabsTrigger value="favorite" className="gap-1.5 data-[state=active]:text-yellow-500">
              <Star className="h-4 w-4" />
              收藏夹
            </TabsTrigger>
            <TabsTrigger value="achievement" className="gap-1.5 data-[state=active]:text-orange-500">
              <Trophy className="h-4 w-4" />
              成就
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab内容 */}
        <TabsContent value="report" className="m-0 flex-1 min-h-0 overflow-hidden">
          <LearningReport onSelectProblem={onSelectProblem} />
        </TabsContent>
        <TabsContent value="record" className="m-0 flex-1 min-h-0 overflow-hidden">
          <LearningRecord onSelectProblem={onSelectProblem} />
        </TabsContent>
        <TabsContent value="wrong" className="m-0 flex-1 min-h-0 overflow-hidden">
          <WrongProblemBook onSelectProblem={onSelectProblem} />
        </TabsContent>
        <TabsContent value="favorite" className="m-0 flex-1 min-h-0 overflow-hidden">
          <FavoriteProblems onSelectProblem={onSelectProblem} />
        </TabsContent>
        <TabsContent value="achievement" className="m-0 flex-1 min-h-0 overflow-hidden">
          <AchievementSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
}

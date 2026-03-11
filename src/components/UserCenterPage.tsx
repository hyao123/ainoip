'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WrongProblemBook } from '@/components/WrongProblemBook';
import { LearningRecord } from '@/components/LearningRecord';
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
} from 'lucide-react';

interface UserCenterPageProps {
  onSelectProblem?: (problemId: number) => void;
}

export function UserCenterPage({ onSelectProblem }: UserCenterPageProps) {
  const [activeTab, setActiveTab] = useState('record');
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
      {/* 顶部用户信息 */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">我的学习中心</h1>
            <p className="text-sm text-white/80">记录学习历程，见证成长足迹</p>
          </div>
        </div>

        {/* 快速统计 */}
        <div className="grid grid-cols-5 gap-2">
          <div className="bg-white/10 rounded-lg p-2 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-1">
              <Flame className="h-4 w-4 text-orange-300" />
              <span className="text-lg font-bold">{quickStats.streak}</span>
            </div>
            <div className="text-[10px] text-white/70">连续天数</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-1">
              <Target className="h-4 w-4 text-green-300" />
              <span className="text-lg font-bold">{quickStats.solved}</span>
            </div>
            <div className="text-[10px] text-white/70">已解题目</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-1">
              <BookX className="h-4 w-4 text-red-300" />
              <span className="text-lg font-bold">{quickStats.wrong}</span>
            </div>
            <div className="text-[10px] text-white/70">错题数</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 text-yellow-300" />
              <span className="text-lg font-bold">{quickStats.favorites}</span>
            </div>
            <div className="text-[10px] text-white/70">收藏数</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-300" />
              <span className="text-lg font-bold">{quickStats.achievements}</span>
            </div>
            <div className="text-[10px] text-white/70">成就数</div>
          </div>
        </div>
      </div>

      {/* Tab导航 */}
      <div className="border-b px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-12">
            <TabsTrigger value="record" className="gap-1 data-[state=active]:text-primary">
              <History className="h-4 w-4" />
              学习记录
            </TabsTrigger>
            <TabsTrigger value="wrong" className="gap-1 data-[state=active]:text-red-500">
              <BookX className="h-4 w-4" />
              错题本
            </TabsTrigger>
            <TabsTrigger value="favorite" className="gap-1 data-[state=active]:text-yellow-500">
              <Star className="h-4 w-4" />
              收藏夹
            </TabsTrigger>
            <TabsTrigger value="achievement" className="gap-1 data-[state=active]:text-orange-500">
              <Trophy className="h-4 w-4" />
              成就
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tab内容 */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <TabsContent value="record" className="m-0 h-full">
          <LearningRecord onSelectProblem={onSelectProblem} />
        </TabsContent>
        <TabsContent value="wrong" className="m-0 h-full">
          <WrongProblemBook onSelectProblem={onSelectProblem} />
        </TabsContent>
        <TabsContent value="favorite" className="m-0 h-full">
          <FavoriteProblems onSelectProblem={onSelectProblem} />
        </TabsContent>
        <TabsContent value="achievement" className="m-0 h-full">
          <AchievementSystem />
        </TabsContent>
      </div>
    </div>
  );
}

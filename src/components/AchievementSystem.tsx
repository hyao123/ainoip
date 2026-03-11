'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getUserLearningData,
  type Achievement,
} from '@/lib/user-learning-data';
import {
  Trophy,
  Lock,
  CheckCircle,
  Flame,
  Target,
  Star,
  Clock,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface AchievementSystemProps {
  onAchievementClick?: (achievement: Achievement) => void;
}

const categoryConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  streak: { label: '连续学习', icon: <Flame className="h-4 w-4" />, color: 'from-orange-500 to-red-500' },
  problems: { label: '解题成就', icon: <Target className="h-4 w-4" />, color: 'from-blue-500 to-cyan-500' },
  accuracy: { label: '正确率', icon: <Star className="h-4 w-4" />, color: 'from-green-500 to-emerald-500' },
  time: { label: '时间成就', icon: <Clock className="h-4 w-4" />, color: 'from-purple-500 to-pink-500' },
  special: { label: '特殊成就', icon: <Sparkles className="h-4 w-4" />, color: 'from-yellow-500 to-orange-500' },
};

export function AchievementSystem({ onAchievementClick }: AchievementSystemProps) {
  const [data, setData] = useState(getUserLearningData);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // 统计信息
  const stats = useMemo(() => {
    const total = data.achievements.length;
    const unlocked = data.achievements.filter(a => a.unlocked).length;
    const recentUnlocked = data.achievements
      .filter(a => a.unlocked && a.unlockedAt)
      .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
      .slice(0, 5);

    return { total, unlocked, recentUnlocked, progress: Math.round((unlocked / total) * 100) };
  }, [data.achievements]);

  // 过滤成就
  const filteredAchievements = useMemo(() => {
    if (activeCategory === 'all') {
      return data.achievements;
    }
    return data.achievements.filter(a => a.category === activeCategory);
  }, [data.achievements, activeCategory]);

  // 按类别分组
  const achievementsByCategory = useMemo(() => {
    const grouped: Record<string, Achievement[]> = {};
    data.achievements.forEach(a => {
      if (!grouped[a.category]) {
        grouped[a.category] = [];
      }
      grouped[a.category].push(a);
    });
    return grouped;
  }, [data.achievements]);

  const refreshData = () => {
    setData(getUserLearningData());
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部统计栏 */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="font-semibold">成就系统</h2>
              <p className="text-xs text-muted-foreground">记录你的学习里程碑</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* 总进度 */}
        <Card className="p-3 bg-white/60 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              已解锁 {stats.unlocked} / {stats.total}
            </span>
            <span className="text-sm text-primary font-bold">{stats.progress}%</span>
          </div>
          <Progress value={stats.progress} className="h-2" />
        </Card>
      </div>

      {/* 最近解锁 */}
      {stats.recentUnlocked.length > 0 && (
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            最近解锁
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {stats.recentUnlocked.map(achievement => (
              <Card
                key={achievement.id}
                className="p-2 flex-shrink-0 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onAchievementClick?.(achievement)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <div className="text-sm font-medium">{achievement.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {achievement.unlockedAt && formatDate(achievement.unlockedAt)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 分类过滤 */}
      <div className="px-4 py-2 border-b">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="h-8 flex-wrap">
            <TabsTrigger value="all" className="text-xs">全部</TabsTrigger>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <TabsTrigger key={key} value={key} className="text-xs gap-1">
                {config.icon}
                {config.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 成就列表 */}
      <ScrollArea className="flex-1 p-4">
        {activeCategory === 'all' ? (
          // 按类别分组显示
          <div className="space-y-6">
            {Object.entries(achievementsByCategory).map(([category, achievements]) => {
              const config = categoryConfig[category];
              const unlocked = achievements.filter(a => a.unlocked).length;
              
              return (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-1.5 rounded bg-gradient-to-r ${config.color} text-white`}>
                      {config.icon}
                    </div>
                    <h3 className="font-semibold">{config.label}</h3>
                    <Badge variant="outline" className="text-xs">
                      {unlocked}/{achievements.length}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {achievements.map(achievement => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        onClick={() => onAchievementClick?.(achievement)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // 单类别显示
          <div className="grid grid-cols-2 gap-2">
            {filteredAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClick={() => onAchievementClick?.(achievement)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

// 成就卡片组件
function AchievementCard({ 
  achievement, 
  onClick 
}: { 
  achievement: Achievement; 
  onClick?: () => void;
}) {
  const progressPercent = Math.min(100, (achievement.progress / achievement.requirement) * 100);
  
  return (
    <Card
      className={`p-3 cursor-pointer transition-all hover:shadow-md ${
        achievement.unlocked
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
          : 'bg-muted/30 border-muted'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <span className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h4 className={`font-medium text-sm truncate ${achievement.unlocked ? '' : 'text-muted-foreground'}`}>
              {achievement.name}
            </h4>
            {achievement.unlocked && (
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-[10px] text-muted-foreground line-clamp-2">
            {achievement.description}
          </p>
          
          {/* 进度条 */}
          {!achievement.unlocked && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                <span>{achievement.progress}/{achievement.requirement}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-1" />
            </div>
          )}
          
          {/* 解锁时间 */}
          {achievement.unlocked && achievement.unlockedAt && (
            <div className="text-[10px] text-muted-foreground mt-1">
              解锁于 {new Date(achievement.unlockedAt).toLocaleDateString('zh-CN')}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Target, 
  Clock, 
  Flame, 
  TrendingUp, 
  Award,
  Zap,
  Calendar,
  CheckCircle2,
  BookOpen,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

// 学习目标配置
interface LearningGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  color: string;
  deadline?: string;
}

interface WeeklyProgress {
  day: string;
  date: string;
  completed: number;
  target: number;
  problems: { id: number; title: string; difficulty: string }[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  unlocked: boolean;
  color: string;
}

export function LearningProgressDashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  // 学习目标数据
  const goals: LearningGoal[] = [
    { id: '1', name: '每日解题', target: 5, current: 4, unit: '题', color: 'bg-blue-500' },
    { id: '2', name: '正确率', target: 80, current: 72, unit: '%', color: 'bg-green-500' },
    { id: '3', name: '学习时长', target: 120, current: 95, unit: '分钟', color: 'bg-purple-500' },
    { id: '4', name: '周连续', target: 7, current: 5, unit: '天', color: 'bg-orange-500' },
  ];

  // 本周进度数据
  const weeklyProgress: WeeklyProgress[] = [
    { day: '周一', date: '04-07', completed: 5, target: 5, problems: [
      { id: 1, title: '两数之和', difficulty: 'easy' },
      { id: 2, title: '有效括号', difficulty: 'easy' },
      { id: 277, title: 'LeetCode Hot 1', difficulty: 'easy' },
      { id: 278, title: 'LeetCode Hot 2', difficulty: 'medium' },
      { id: 296, title: 'LeetCode Hot 20', difficulty: 'easy' },
    ]},
    { day: '周二', date: '04-08', completed: 3, target: 5, problems: [
      { id: 3, title: '合并两个有序链表', difficulty: 'medium' },
      { id: 279, title: 'LeetCode Hot 3', difficulty: 'medium' },
      { id: 280, title: 'LeetCode Hot 4', difficulty: 'hard' },
    ]},
    { day: '周三', date: '04-09', completed: 6, target: 5, problems: [
      { id: 4, title: '最大子数组和', difficulty: 'medium' },
      { id: 281, title: 'LeetCode Hot 5', difficulty: 'medium' },
      { id: 282, title: 'LeetCode Hot 6', difficulty: 'medium' },
      { id: 283, title: 'LeetCode Hot 7', difficulty: 'easy' },
      { id: 284, title: 'LeetCode Hot 8', difficulty: 'medium' },
      { id: 285, title: 'LeetCode Hot 9', difficulty: 'easy' },
    ]},
    { day: '周四', date: '04-10', completed: 4, target: 5, problems: [
      { id: 5, title: '二叉树层序遍历', difficulty: 'medium' },
      { id: 286, title: 'LeetCode Hot 10', difficulty: 'hard' },
      { id: 287, title: 'LeetCode Hot 11', difficulty: 'medium' },
      { id: 288, title: 'LeetCode Hot 12', difficulty: 'medium' },
    ]},
    { day: '周五', date: '04-11', completed: 2, target: 5, problems: [
      { id: 289, title: 'LeetCode Hot 13', difficulty: 'easy' },
      { id: 290, title: 'LeetCode Hot 14', difficulty: 'easy' },
    ]},
    { day: '周六', date: '04-12', completed: 0, target: 5, problems: []},
    { day: '周日', date: '04-13', completed: 1, target: 5, problems: [
      { id: 291, title: 'LeetCode Hot 15', difficulty: 'medium' },
    ]},
  ];

  // 成就数据
  const achievements: Achievement[] = [
    { id: '1', name: '初露锋芒', description: '连续学习3天', icon: '🔥', progress: 5, target: 7, unlocked: false, color: 'orange' },
    { id: '2', name: '题海战术', description: '解决100道题目', icon: '📚', progress: 45, target: 100, unlocked: false, color: 'blue' },
    { id: '3', name: '精准射手', description: '总体正确率达到80%', icon: '🎯', progress: 72, target: 80, unlocked: false, color: 'green' },
    { id: '4', name: '初战告捷', description: '首次AC', icon: '🎉', progress: 1, target: 1, unlocked: true, color: 'yellow' },
    { id: '5', name: '挑战自我', description: '首次解决困难题目', icon: '⚔️', progress: 0, target: 1, unlocked: false, color: 'red' },
    { id: '6', name: '错题克星', description: '复习并解决10道错题', icon: '📖', progress: 3, target: 10, unlocked: false, color: 'purple' },
  ];

  // 统计数据
  const stats = useMemo(() => {
    const totalCompleted = weeklyProgress.reduce((sum, d) => sum + d.completed, 0);
    const totalTarget = weeklyProgress.reduce((sum, d) => sum + d.target, 0);
    const avgAccuracy = 72;
    const streak = 5;
    const totalTime = 315; // 分钟
    const rank = 128; // 全球排名
    const totalUsers = 15420;

    return { totalCompleted, totalTarget, avgAccuracy, streak, totalTime, rank, totalUsers };
  }, [weeklyProgress]);

  // 计算完成度
  const completionRate = Math.round((stats.totalCompleted / stats.totalTarget) * 100);

  return (
    <div className="space-y-6">
      {/* 顶部统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="本周完成"
          value={`${stats.totalCompleted}/${stats.totalTarget}`}
          subtitle={`完成度 ${completionRate}%`}
          icon={<Target className="h-5 w-5" />}
          progress={completionRate}
          color="blue"
        />
        <StatCard
          title="当前连续"
          value={`${stats.streak}天`}
          subtitle="今日还需完成 1 题"
          icon={<Flame className="h-5 w-5" />}
          color="orange"
        />
        <StatCard
          title="平均正确率"
          value={`${stats.avgAccuracy}%`}
          subtitle="较上周 +5%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={5}
          color="green"
        />
        <StatCard
          title="全球排名"
          value={`#${stats.rank}`}
          subtitle={`共 ${(stats.totalUsers / 1000).toFixed(1)}K 用户`}
          icon={<Award className="h-5 w-5" />}
          color="purple"
        />
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：每日进度 */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                本周学习进度
              </CardTitle>
              <CardDescription>每日目标 5 道题</CardDescription>
            </div>
            <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
              <TabsList className="h-8">
                <TabsTrigger value="week" className="text-xs px-2">本周</TabsTrigger>
                <TabsTrigger value="month" className="text-xs px-2">本月</TabsTrigger>
                <TabsTrigger value="all" className="text-xs px-2">全部</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {/* 每日进度条 */}
            <div className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        day.completed >= day.target 
                          ? 'bg-green-500 text-white' 
                          : day.completed > 0 
                            ? 'bg-yellow-500 text-white'
                            : 'bg-muted'
                      }`}>
                        {day.completed >= day.target ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          day.day.slice(-1)
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{day.day}</p>
                        <p className="text-xs text-muted-foreground">{day.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {day.completed}/{day.target}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {day.problems.length > 0 
                          ? day.problems.map(p => p.title.split(' ')[0]).slice(0, 2).join(', ')
                          : '暂无解题'}
                      </p>
                    </div>
                  </div>
                  <div className="ml-13">
                    <Progress 
                      value={(day.completed / day.target) * 100} 
                      className="h-2"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 总体进度 */}
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">本周总体进度</p>
                <p className="text-xs text-muted-foreground">
                  {stats.totalCompleted} / {stats.totalTarget} 题
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{completionRate}%</div>
                <Progress value={completionRate} className="w-32 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 右侧：成就和目标 */}
        <div className="space-y-6">
          {/* 今日目标 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-orange-500" />
                今日目标
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.slice(0, 2).map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{goal.name}</span>
                    <span className="text-muted-foreground">
                      {goal.current}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                    <span className={`absolute right-1 top-1/2 -translate-y-1/2 text-xs font-medium ${
                      goal.current >= goal.target ? 'text-green-600' : ''
                    }`}>
                      {Math.round((goal.current / goal.target) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
              
              {goals[0].current < goals[0].target && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    再完成 <span className="font-medium text-foreground">{goals[0].target - goals[0].current}</span> 道题即可完成今日目标
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">推荐：LeetCode Hot 22</Badge>
                    <Badge variant="outline" className="text-xs">中等难度</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 成就进度 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="h-5 w-5 text-yellow-500" />
                成就进度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.slice(0, 4).map(achievement => (
                  <div key={achievement.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{achievement.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{achievement.name}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.unlocked ? (
                        <Badge className="bg-yellow-500">已解锁</Badge>
                      ) : (
                        <Badge variant="outline">
                          {Math.round((achievement.progress / achievement.target) * 100)}%
                        </Badge>
                      )}
                    </div>
                    {!achievement.unlocked && (
                      <Progress 
                        value={(achievement.progress / achievement.target) * 100} 
                        className="h-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 学习时间分布 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-blue-500" />
                学习时段
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '09:00-12:00', count: 8, color: 'bg-blue-500' },
                  { time: '14:00-18:00', count: 12, color: 'bg-green-500' },
                  { time: '20:00-22:00', count: 6, color: 'bg-purple-500' },
                ].map((slot, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-24">{slot.time}</span>
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${slot.color} transition-all`}
                        style={{ width: `${(slot.count / 12) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium w-8">{slot.count}题</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                最佳学习时段：下午 14:00-18:00
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部：详细统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniStat icon={<BookOpen className="h-4 w-4" />} label="累计学习" value="45天" />
        <MiniStat icon={<CheckCircle2 className="h-4 w-4" />} label="解题总数" value="156题" />
        <MiniStat icon={<TrendingUp className="h-4 w-4" />} label="本月增长" value="+23%" />
        <MiniStat icon={<Flame className="h-4 w-4" />} label="最长连续" value="12天" />
      </div>
    </div>
  );
}

// 统计卡片组件
function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  progress, 
  trend,
  color 
}: { 
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  progress?: number;
  trend?: number;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-600',
    green: 'bg-green-500/10 text-green-600',
    orange: 'bg-orange-500/10 text-orange-600',
    purple: 'bg-purple-500/10 text-purple-600',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          {trend !== undefined && (
            <Badge variant="outline" className="text-green-600">
              +{trend}%
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {progress !== undefined && (
          <Progress value={progress} className="h-2 mt-3" />
        )}
      </CardContent>
    </Card>
  );
}

// 迷你统计组件
function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

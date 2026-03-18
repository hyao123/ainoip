'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Flame, 
  Calendar, 
  Trophy, 
  Target, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Clock,
  Star,
  Zap,
  TrendingUp
} from 'lucide-react';
import { 
  getDailyPracticeData, 
  getTodayDailyPractice,
  generateTodayDailyPractice,
  getDailyPracticeStats,
  getWeeklyCalendar,
  getRecentDailyPractices,
  type DailyPracticeRecord 
} from '@/lib/daily-practice';
import { getProblemById, difficultyConfig, type Problem } from '@/lib/problems';
import { getUserLearningData } from '@/lib/user-learning-data';
import { motion, AnimatePresence } from 'framer-motion';

interface DailyPracticeProps {
  onStartProblem?: (problemId: number) => void;
}

export function DailyPractice({ onStartProblem }: DailyPracticeProps) {
  const [todayPractice, setTodayPractice] = useState<DailyPracticeRecord | null>(null);
  const [stats, setStats] = useState(getDailyPracticeStats());
  const [weeklyCalendar, setWeeklyCalendar] = useState<Array<{
    date: string;
    dayOfWeek: number;
    dayName: string;
    hasRecord: boolean;
    completed: boolean;
  }>>([]);
  const [recentPractices, setRecentPractices] = useState<DailyPracticeRecord[]>([]);
  const [problem, setProblem] = useState<Problem | undefined>();

  useEffect(() => {
    const userData = getUserLearningData();
    const solvedIds = userData.submissions
      .filter(s => s.result === 'AC')
      .map(s => s.problemId);
    const wrongIds = userData.wrongProblems.map(w => w.problemId);
    
    // 生成或获取今日每日一练
    let todayRecord = getTodayDailyPractice();
    if (!todayRecord) {
      todayRecord = generateTodayDailyPractice(solvedIds, wrongIds);
    }
    
    setTodayPractice(todayRecord);
    setStats(getDailyPracticeStats());
    setWeeklyCalendar(getWeeklyCalendar());
    setRecentPractices(getRecentDailyPractices(7));
    
    // 获取题目详情
    if (todayRecord) {
      setProblem(getProblemById(todayRecord.problemId));
    }
  }, []);

  const handleStartPractice = () => {
    if (todayPractice && onStartProblem) {
      onStartProblem(todayPractice.problemId);
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig];
    return (
      <Badge variant="outline" className={config?.bgColor || 'bg-gray-100'}>
        {config?.label || difficulty}
      </Badge>
    );
  };

  const calendar = useMemo(() => weeklyCalendar, [weeklyCalendar]);

  return (
    <div className="space-y-6">
      {/* 今日挑战卡片 */}
      <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">今日挑战</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('zh-CN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold text-orange-500">
                {stats.currentStreak}
              </span>
              <span className="text-sm text-muted-foreground">天连续</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {todayPractice && problem ? (
            <div className="space-y-4">
              {/* 题目信息 */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-background/50 border">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">#{problem.id}</span>
                    {getDifficultyBadge(problem.difficulty)}
                    <Badge variant="secondary">{problem.category}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{problem.title}</h3>
                  {problem.titleEn && (
                    <p className="text-sm text-muted-foreground">{problem.titleEn}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {problem.timeLimit && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {problem.timeLimit}ms
                      </span>
                    )}
                    {problem.memoryLimit && (
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {problem.memoryLimit}MB
                      </span>
                    )}
                    {problem.tags && problem.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {todayPractice.completed ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                    <span className="text-sm font-medium text-green-600">已完成</span>
                  </div>
                ) : (
                  <Button 
                    onClick={handleStartPractice}
                    className="gap-2"
                  >
                    开始挑战
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {/* 连续打卡提示 */}
              {stats.currentStreak > 0 && !todayPractice.completed && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400">
                  <Flame className="w-5 h-5" />
                  <span className="text-sm">
                    已连续打卡 <strong>{stats.currentStreak}</strong> 天，继续加油保持连胜！
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              加载中...
            </div>
          )}
        </CardContent>
      </Card>

      {/* 本周打卡日历 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            本周打卡
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            {calendar.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-sm text-muted-foreground">{day.dayName}</span>
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${day.completed 
                      ? 'bg-green-500 text-white' 
                      : day.hasRecord 
                        ? 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400' 
                        : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {day.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : day.hasRecord ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{new Date(day.date).getDate()}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completedDays}</p>
                <p className="text-sm text-muted-foreground">已完成</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.maxStreak}</p>
                <p className="text-sm text-muted-foreground">最长连续</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
                <p className="text-sm text-muted-foreground">完成率</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalDays}</p>
                <p className="text-sm text-muted-foreground">总天数</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近记录 */}
      {recentPractices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              最近记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPractices.map((record, index) => (
                <motion.div
                  key={record.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {record.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{record.problemTitle}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString('zh-CN', {
                          month: 'short',
                          day: 'numeric'
                        })}
                        {' · '}
                        {difficultyConfig[record.difficulty]?.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {record.completed && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        第{record.streakDay}天
                      </Badge>
                    )}
                    <Badge variant="secondary">{record.category}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  dailySchedule,
  learningPhases,
  getDailyTask,
  getProgressStats,
  type DailyTask,
  type LearningPhase,
} from '@/lib/learning-schedule';
import { getProblemById, difficultyConfig } from '@/lib/problems';
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  Clock,
  Target,
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  Trophy,
  Flame,
  Star,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LearningSchedulePageProps {
  completedDays?: number[];
  onDaySelect?: (day: number) => void;
  onProblemSelect?: (problemId: number) => void;
}

const phaseColors: Record<string, string> = {
  '基础语法入门': 'bg-blue-500',
  '数组与字符串': 'bg-purple-500',
  '基础算法': 'bg-green-500',
  '搜索算法': 'bg-orange-500',
  '动态规划入门': 'bg-red-500',
  '数据结构': 'bg-cyan-500',
  '综合训练': 'bg-yellow-500',
};

const phaseBgColors: Record<string, string> = {
  '基础语法入门': 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
  '数组与字符串': 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800',
  '基础算法': 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800',
  '搜索算法': 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800',
  '动态规划入门': 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800',
  '数据结构': 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800',
  '综合训练': 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800',
};

export function LearningSchedulePage({
  completedDays = [],
  onDaySelect,
  onProblemSelect,
}: LearningSchedulePageProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const completedSet = useMemo(() => new Set(completedDays), [completedDays]);

  const stats = useMemo(() => getProgressStats(completedDays), [completedDays]);
  const currentDay = useMemo(() => {
    if (completedDays.length === 0) return 1;
    return Math.min(Math.max(...completedDays) + 1, 70);
  }, [completedDays]);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    onDaySelect?.(day);
  };

  const selectedTask = selectedDay ? getDailyTask(selectedDay) : null;

  // 获取某天的状态
  const getDayStatus = (day: number): 'completed' | 'current' | 'available' | 'locked' => {
    if (completedSet.has(day)) return 'completed';
    if (day === currentDay) return 'current';
    if (day < currentDay) return 'available';
    return 'locked';
  };

  // 渲染日历格子
  const renderCalendarGrid = () => {
    const weeks = [];
    for (let week = 0; week < 10; week++) {
      const days = [];
      for (let day = 1; day <= 7; day++) {
        const dayNumber = week * 7 + day;
        if (dayNumber > 70) break;
        
        const status = getDayStatus(dayNumber);
        const task = getDailyTask(dayNumber);
        
        days.push(
          <motion.div
            key={dayNumber}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: week * 0.05 + day * 0.02 }}
            onClick={() => status !== 'locked' && handleDayClick(dayNumber)}
            className={`
              relative w-full aspect-square rounded-lg flex flex-col items-center justify-center
              cursor-pointer transition-all duration-200 border-2
              ${status === 'completed' 
                ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 hover:shadow-md' 
                : status === 'current'
                  ? 'bg-primary/10 border-primary hover:shadow-lg ring-2 ring-primary/30'
                  : status === 'available'
                    ? 'bg-muted/50 border-muted-foreground/20 hover:border-primary/50 hover:bg-muted'
                    : 'bg-muted/30 border-muted-foreground/10 opacity-50 cursor-not-allowed'
              }
            `}
          >
            <span className={`text-lg font-bold ${
              status === 'completed' ? 'text-green-600 dark:text-green-400' : ''
            }`}>
              {dayNumber}
            </span>
            {task && (
              <div className={`absolute bottom-1 left-1 right-1 h-1 rounded-full ${
                phaseColors[task.phase] || 'bg-gray-400'
              }`} />
            )}
            {status === 'completed' && (
              <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-background rounded-full" />
            )}
            {status === 'current' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-primary-foreground" />
              </div>
            )}
          </motion.div>
        );
      }
      weeks.push(
        <div key={week} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
    }
    return weeks;
  };

  // 渲染阶段进度
  const renderPhaseProgress = () => {
    return (
      <div className="space-y-3">
        {learningPhases.map((phase, index) => {
          const phaseCompleted = completedDays.filter(d => d >= phase.startDay && d <= phase.endDay).length;
          const phaseTotal = phase.endDay - phase.startDay + 1;
          const progress = Math.round((phaseCompleted / phaseTotal) * 100);
          const isActive = stats.currentPhase.id === phase.id;
          
          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                isActive ? phaseBgColors[phase.name] + ' border-2' : 'bg-card'
              }`}
              onClick={() => setSelectedPhase(phase.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${phaseColors[phase.name]}`} />
                  <span className="font-medium text-sm">{phase.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Day {phase.startDay}-{phase.endDay}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {phaseCompleted}/{phaseTotal}
                  </Badge>
                </div>
              </div>
              <Progress value={progress} className="h-1.5" />
              {isActive && (
                <p className="text-xs text-muted-foreground mt-2">{phase.description}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 顶部标题和统计 */}
      <div className="px-5 py-4 bg-gradient-to-r from-primary/10 via-background to-primary/5 border-b shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold">70天学习计划</h1>
              <p className="text-sm text-muted-foreground">
                NOIP普及组系统学习路径
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {completedDays.length}/70
              </div>
              <div className="text-xs text-muted-foreground">已完成</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-500 flex items-center gap-1">
                <Flame className="w-5 h-5" />
                {completedDays.length > 0 ? Math.max(...completedDays) : 0}
              </div>
              <div className="text-xs text-muted-foreground">连续天数</div>
            </div>
          </div>
        </div>
        
        {/* 总进度条 */}
        <div className="mt-4">
          <Progress 
            value={(completedDays.length / 70) * 100} 
            className="h-2"
          />
          <p className="text-xs text-muted-foreground mt-1 text-center">
            当前阶段：{stats.currentPhase.name}（{stats.phaseProgress}%）
          </p>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden flex">
        {/* 左侧：日历视图 */}
        <div className="flex-1 p-4 overflow-auto">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">学习日历</CardTitle>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span>已完成</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-primary" />
                    <span>当前</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-muted" />
                    <span>未解锁</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 星期标题 */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-muted-foreground font-medium">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* 日历格子 */}
              <div className="space-y-2">
                {renderCalendarGrid()}
              </div>
              
              {/* 阶段颜色图例 */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">学习阶段</p>
                <div className="flex flex-wrap gap-2">
                  {learningPhases.map(phase => (
                    <div key={phase.id} className="flex items-center gap-1 text-xs">
                      <div className={`w-2 h-2 rounded-full ${phaseColors[phase.name]}`} />
                      <span className="text-muted-foreground">{phase.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：阶段进度 */}
        <div className="w-80 border-l p-4 overflow-auto bg-muted/30 shrink-0">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            学习阶段
          </h3>
          {renderPhaseProgress()}
          
          {/* 今日任务 */}
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                今日任务
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const todayTask = getDailyTask(currentDay);
                if (!todayTask) return <p className="text-muted-foreground text-sm">暂无任务</p>;
                
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Day {currentDay}</span>
                      <Badge className={phaseColors[todayTask.phase] + ' text-white'}>
                        {todayTask.phase}
                      </Badge>
                    </div>
                    <p className="text-sm">{todayTask.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{todayTask.estimatedHours}小时</span>
                      <span>·</span>
                      <span>{todayTask.problems.length}道题</span>
                    </div>
                    <Button 
                      className="w-full mt-2" 
                      size="sm"
                      onClick={() => handleDayClick(currentDay)}
                    >
                      开始学习
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 日期详情对话框 */}
      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
          {selectedTask && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Day {selectedDay}</Badge>
                  <Badge className={phaseColors[selectedTask.phase] + ' text-white'}>
                    {selectedTask.phase}
                  </Badge>
                </div>
                <DialogTitle className="text-xl">{selectedTask.title}</DialogTitle>
                <DialogDescription>
                  {selectedTask.objectives.join(' · ')}
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-6 mt-4">
                  {/* 学习主题 */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      学习主题
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.topics.map((topic, i) => (
                        <Badge key={i} variant="secondary">{topic}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* 学习目标 */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      学习目标
                    </h4>
                    <ul className="space-y-1">
                      {selectedTask.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 推荐题目 */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" />
                      推荐题目 ({selectedTask.problems.length}道)
                    </h4>
                    <div className="space-y-2">
                      {selectedTask.problems.map(problemId => {
                        const problem = getProblemById(problemId);
                        if (!problem) return null;
                        
                        return (
                          <Card
                            key={problemId}
                            className="p-3 cursor-pointer hover:border-primary/50 transition-colors"
                            onClick={() => {
                              onProblemSelect?.(problemId);
                              setSelectedDay(null);
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium">#{problem.id}</span>
                                  <Badge 
                                    variant="outline" 
                                    className={difficultyConfig[problem.difficulty]?.bgColor}
                                  >
                                    {difficultyConfig[problem.difficulty]?.label}
                                  </Badge>
                                </div>
                                <p className="text-sm">{problem.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  {problem.tags.slice(0, 3).map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* 学习提示 */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      学习提示
                    </h4>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <ul className="space-y-1">
                        {selectedTask.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 学习时长 */}
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">预计学习时长</span>
                    </div>
                    <span className="font-bold">{selectedTask.estimatedHours} 小时</span>
                  </div>
                </div>
              </ScrollArea>

              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDay(Math.max(1, selectedDay! - 1))}
                  disabled={selectedDay! <= 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  上一天
                </Button>
                <Button
                  onClick={() => setSelectedDay(Math.min(70, selectedDay! + 1))}
                  disabled={selectedDay! >= 70}
                >
                  下一天
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

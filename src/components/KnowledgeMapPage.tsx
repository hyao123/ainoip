'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  dailyLearningPath,
  learningPhases,
  getDayLesson,
  assessmentQuestions,
  suggestStartDay,
  type DayLesson,
  type LearningPhase,
  type AssessmentQuestion,
} from '@/lib/daily-learning-path';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Play,
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  Target,
  Trophy,
  Rocket,
  Clock,
  Star,
  Zap,
  Map,
  Compass,
  Award,
  BarChart3,
  Sparkles,
  Lightbulb,
  CheckCircle,
  XCircle,
  Calendar,
  Flag,
  Eye,
} from 'lucide-react';

interface KnowledgeMapPageProps {
  onStartProblem?: (problemId: number) => void;
}

// 阶段配置
const phaseConfig: Record<string, { color: string; bgColor: string; borderColor: string; icon: string; description: string }> = {
  foundation: {
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    icon: '🌱',
    description: '从零开始，掌握C++基础语法',
  },
  basic: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    icon: '🌿',
    description: '掌握基本算法思想和数据结构',
  },
  intermediate: {
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    icon: '🌳',
    description: '深入算法学习，攻克普及组',
  },
  advanced: {
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    icon: '🏔️',
    description: '掌握高级算法，冲击提高组',
  },
  competition: {
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800',
    icon: '🏆',
    description: '真题训练，模拟比赛',
  },
};

export function KnowledgeMapPage({ onStartProblem }: KnowledgeMapPageProps) {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [expandedPhase, setExpandedPhase] = useState<string | null>('foundation');
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState<number[]>([]);
  const [assessmentFinished, setAssessmentFinished] = useState(false);
  const [suggestedStartDay, setSuggestedStartDay] = useState<number | null>(null);

  // 初始化状态
  useEffect(() => {
    const savedCurrentDay = localStorage.getItem('noip_current_day');
    const savedCompletedDays = localStorage.getItem('noip_completed_days');
    
    if (savedCurrentDay) setCurrentDay(parseInt(savedCurrentDay));
    if (savedCompletedDays) setCompletedDays(new Set(JSON.parse(savedCompletedDays)));
  }, []);

  // 当前天的课程
  const currentLesson = getDayLesson(currentDay);

  // 计算进度
  const totalDays = dailyLearningPath.length;
  const completedCount = completedDays.size;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  // 标记完成
  const markDayComplete = (day: number) => {
    const newCompleted = new Set([...completedDays, day]);
    setCompletedDays(newCompleted);
    localStorage.setItem('noip_completed_days', JSON.stringify([...newCompleted]));
  };

  // 处理评估答案
  const handleAssessmentAnswer = (answerIndex: number) => {
    const newAnswers = [...assessmentAnswers, answerIndex];
    setAssessmentAnswers(newAnswers);

    if (assessmentStep < assessmentQuestions.length - 1) {
      setAssessmentStep(assessmentStep + 1);
    } else {
      let correctCount = 0;
      newAnswers.forEach((answer, index) => {
        if (answer === assessmentQuestions[index].correctAnswer) {
          correctCount++;
        }
      });
      const suggested = suggestStartDay(correctCount, assessmentQuestions.length);
      setSuggestedStartDay(suggested);
      setAssessmentFinished(true);
    }
  };

  // 从建议的天数开始学习
  const startFromSuggestedDay = () => {
    if (suggestedStartDay) {
      setCurrentDay(suggestedStartDay);
      localStorage.setItem('noip_current_day', String(suggestedStartDay));
      setShowAssessment(false);
      setAssessmentStep(0);
      setAssessmentAnswers([]);
      setAssessmentFinished(false);
    }
  };

  // 跳转到指定天
  const jumpToDay = (day: number) => {
    if (day >= 1 && day <= totalDays) {
      setCurrentDay(day);
      localStorage.setItem('noip_current_day', String(day));
    }
  };

  // 切换阶段展开
  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 顶部标题栏 */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-transparent shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Map className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">知识地图</h1>
              <p className="text-sm text-muted-foreground">规划你的学习路径</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 总体进度 */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
              <div className="text-center">
                <div className="text-lg font-bold">{completedCount}</div>
                <div className="text-xs text-muted-foreground">已完成</div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center">
                <div className="text-lg font-bold">{progressPercent}%</div>
                <div className="text-xs text-muted-foreground">进度</div>
              </div>
            </div>

            {/* 基础评估按钮 */}
            <Dialog open={showAssessment} onOpenChange={setShowAssessment}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Compass className="h-4 w-4" />
                  基础评估
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    基础评估
                  </DialogTitle>
                  <DialogDescription>
                    回答几个问题，我们会为你推荐合适的起始学习位置
                  </DialogDescription>
                </DialogHeader>

                {!assessmentFinished ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={((assessmentStep + 1) / assessmentQuestions.length) * 100} 
                        className="flex-1 h-2" 
                      />
                      <span className="text-sm text-muted-foreground">
                        {assessmentStep + 1}/{assessmentQuestions.length}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="text-lg font-medium">
                        {assessmentQuestions[assessmentStep].question}
                      </div>

                      <div className="space-y-2">
                        {assessmentQuestions[assessmentStep].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-3"
                            onClick={() => handleAssessmentAnswer(index)}
                          >
                            <span className="w-6 h-6 rounded-full border mr-3 flex items-center justify-center text-xs font-medium">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 py-4">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <Lightbulb className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">评估完成！</h3>
                        <p className="text-muted-foreground mt-1">
                          你答对了 {assessmentAnswers.filter((a, i) => a === assessmentQuestions[i].correctAnswer).length}/{assessmentQuestions.length} 题
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                      <div className="text-sm font-medium">建议起始学习位置</div>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-primary">
                          Day {suggestedStartDay}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getDayLesson(suggestedStartDay!)?.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setShowAssessment(false);
                          setAssessmentStep(0);
                          setAssessmentAnswers([]);
                          setAssessmentFinished(false);
                        }}
                      >
                        重新评估
                      </Button>
                      <Button className="flex-1" onClick={startFromSuggestedDay}>
                        从这里开始
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：阶段导航 */}
        <aside className="w-72 border-r bg-muted/10 shrink-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {/* 快速跳转 */}
              <div className="mb-4">
                <div className="text-xs font-medium text-muted-foreground mb-2">快速跳转</div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={1}
                    max={totalDays}
                    value={currentDay}
                    onChange={(e) => jumpToDay(parseInt(e.target.value) || 1)}
                    className="flex-1 px-2 py-1.5 text-sm border rounded-md"
                  />
                  <span className="text-xs text-muted-foreground px-1">/ {totalDays}</span>
                </div>
              </div>

              <Separator className="my-3" />

              {/* 阶段列表 */}
              <div className="text-xs font-medium text-muted-foreground mb-2">
                学习阶段
              </div>
              {learningPhases.map((phase) => {
                const config = phaseConfig[phase.id];
                const phaseDays = dailyLearningPath.filter(d => d.phase === phase.id);
                const completedInPhase = phaseDays.filter(d => completedDays.has(d.day)).length;
                const isCurrentPhase = currentLesson?.phase === phase.id;
                const isExpanded = expandedPhase === phase.id;

                return (
                  <div key={phase.id}>
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        isCurrentPhase
                          ? `${config.bgColor} ${config.borderColor} border-2`
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{config.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm ${isCurrentPhase ? config.color : ''}`}>
                            {phase.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Day {phase.startDay}-{phase.endDay}
                          </div>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                      <div className="mt-2">
                        <Progress 
                          value={(completedInPhase / phaseDays.length) * 100}
                          className="h-1"
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {completedInPhase}/{phaseDays.length} 已完成
                        </div>
                      </div>
                    </button>

                    {/* 展开的课程列表 */}
                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l pl-3">
                        {phaseDays.slice(0, 7).map((lesson) => {
                          const isCompleted = completedDays.has(lesson.day);
                          const isCurrent = currentDay === lesson.day;

                          return (
                            <button
                              key={lesson.day}
                              onClick={() => jumpToDay(lesson.day)}
                              className={`w-full flex items-center gap-2 p-2 rounded text-xs transition-colors ${
                                isCurrent ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                isCompleted ? 'bg-green-500 text-white' : 'bg-muted'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle2 className="h-3 w-3" />
                                ) : (
                                  <span className="text-[10px]">{lesson.day}</span>
                                )}
                              </div>
                              <span className="truncate">{lesson.title}</span>
                            </button>
                          );
                        })}
                        {phaseDays.length > 7 && (
                          <div className="text-xs text-muted-foreground p-2">
                            还有 {phaseDays.length - 7} 天...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* 中间：学习路径详情 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* 当前学习位置 */}
              {currentLesson && (
                <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* 天数标识 */}
                      <div className="flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold ${phaseConfig[currentLesson.phase].bgColor} ${phaseConfig[currentLesson.phase].color}`}>
                          {currentLesson.day}
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">Day</span>
                      </div>

                      {/* 内容 */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={phaseConfig[currentLesson.phase].color}>
                            {currentLesson.phaseName}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {phaseConfig[currentLesson.phase].description}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{currentLesson.title}</h2>
                        <p className="text-muted-foreground mb-4">
                          {currentLesson.description}
                        </p>

                        {/* 学习目标 */}
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">学习目标</div>
                          <div className="grid grid-cols-2 gap-2">
                            {currentLesson.objectives.map((obj, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                <span className="text-muted-foreground">{obj}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 知识点标签 */}
                        <div className="flex flex-wrap gap-2">
                          {currentLesson.topics.map((topic) => (
                            <Badge key={topic.id} variant="secondary" className="text-xs">
                              {topic.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 操作区 */}
                      <div className="flex flex-col gap-2">
                        <div className="text-sm text-muted-foreground text-center mb-2">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {currentLesson.estimatedMinutes}分钟
                        </div>
                        <Button
                          onClick={() => currentLesson.practiceProblems[0] && onStartProblem?.(currentLesson.practiceProblems[0])}
                        >
                          开始学习
                        </Button>
                        <Button
                          variant="outline"
                          disabled={completedDays.has(currentLesson.day)}
                          onClick={() => markDayComplete(currentLesson.day)}
                        >
                          {completedDays.has(currentLesson.day) ? '已完成' : '标记完成'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 今日练习题 */}
              {currentLesson && currentLesson.practiceProblems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      练习题
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {currentLesson.practiceProblems.map((problemId, index) => (
                        <button
                          key={problemId}
                          onClick={() => onStartProblem?.(problemId)}
                          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">题目 #{problemId}</div>
                            <div className="text-xs text-muted-foreground">点击开始练习</div>
                          </div>
                        </button>
                      ))}
                      {currentLesson.challengeProblem && (
                        <button
                          onClick={() => onStartProblem?.(currentLesson.challengeProblem!)}
                          className="flex items-center gap-3 p-3 rounded-lg border-2 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 transition-colors text-left"
                        >
                          <Star className="h-8 w-8 text-yellow-500" />
                          <div className="flex-1">
                            <div className="font-medium text-sm text-yellow-700">挑战题 #{currentLesson.challengeProblem}</div>
                            <div className="text-xs text-yellow-600">挑战自我</div>
                          </div>
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 导航按钮 */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  disabled={currentDay <= 1}
                  onClick={() => jumpToDay(currentDay - 1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  上一天
                </Button>
                <div className="text-sm text-muted-foreground">
                  Day {currentDay} / {totalDays}
                </div>
                <Button
                  variant="outline"
                  disabled={currentDay >= totalDays}
                  onClick={() => jumpToDay(currentDay + 1)}
                >
                  下一天
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* 右侧：阶段概览 */}
        <aside className="w-64 border-l bg-muted/10 shrink-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div className="text-xs font-medium text-muted-foreground">
                学习阶段概览
              </div>

              {learningPhases.map((phase) => {
                const config = phaseConfig[phase.id];
                const phaseDays = dailyLearningPath.filter(d => d.phase === phase.id);
                const completedInPhase = phaseDays.filter(d => completedDays.has(d.day)).length;
                const isCurrentPhase = currentLesson?.phase === phase.id;

                return (
                  <Card 
                    key={phase.id}
                    className={`${isCurrentPhase ? config.borderColor + ' border-2' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{config.icon}</span>
                        <div className={`font-medium ${isCurrentPhase ? config.color : ''}`}>
                          {phase.name}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Day {phase.startDay} - {phase.endDay}
                      </div>
                      <Progress 
                        value={(completedInPhase / phaseDays.length) * 100}
                        className="h-1.5 mb-1"
                      />
                      <div className="text-xs text-muted-foreground">
                        {completedInPhase}/{phaseDays.length} 天
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* 总览 */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{progressPercent}%</div>
                    <div className="text-xs text-muted-foreground">总体完成度</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      已完成 {completedCount} / {totalDays} 天
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
}

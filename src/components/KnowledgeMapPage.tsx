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
} from 'lucide-react';

interface KnowledgeMapPageProps {
  onStartProblem?: (problemId: number) => void;
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

export function KnowledgeMapPage({ onStartProblem }: KnowledgeMapPageProps) {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState<number[]>([]);
  const [assessmentFinished, setAssessmentFinished] = useState(false);
  const [suggestedStartDay, setSuggestedStartDay] = useState<number | null>(null);

  // 当前天的课程
  const currentLesson = getDayLesson(currentDay);

  // 计算进度
  const totalDays = dailyLearningPath.length;
  const completedCount = completedDays.size;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  // 标记完成
  const markDayComplete = (day: number) => {
    setCompletedDays(prev => new Set([...prev, day]));
  };

  // 处理评估答案
  const handleAssessmentAnswer = (answerIndex: number) => {
    const newAnswers = [...assessmentAnswers, answerIndex];
    setAssessmentAnswers(newAnswers);

    if (assessmentStep < assessmentQuestions.length - 1) {
      setAssessmentStep(assessmentStep + 1);
    } else {
      // 评估完成，计算建议起始天数
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
      setShowAssessment(false);
      // 重置评估状态
      setAssessmentStep(0);
      setAssessmentAnswers([]);
      setAssessmentFinished(false);
    }
  };

  // 跳转到指定天
  const jumpToDay = (day: number) => {
    if (day >= 1 && day <= totalDays) {
      setCurrentDay(day);
    }
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
              <p className="text-sm text-muted-foreground">120天从零到NOIP高手</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 学习进度 */}
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
                    {/* 进度 */}
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={((assessmentStep + 1) / assessmentQuestions.length) * 100} 
                        className="flex-1 h-2" 
                      />
                      <span className="text-sm text-muted-foreground">
                        {assessmentStep + 1}/{assessmentQuestions.length}
                      </span>
                    </div>

                    {/* 问题 */}
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
                    {/* 评估结果 */}
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
                      <Button
                        className="flex-1"
                        onClick={startFromSuggestedDay}
                      >
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
        <aside className="w-64 border-r bg-muted/20 shrink-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              <div className="text-xs font-medium text-muted-foreground px-2 mb-3">
                学习阶段
              </div>
              {learningPhases.map((phase) => {
                const config = phaseConfig[phase.id];
                const phaseDays = dailyLearningPath.filter(d => d.phase === phase.id);
                const completedInPhase = phaseDays.filter(d => completedDays.has(d.day)).length;
                const isCurrentPhase = currentLesson?.phase === phase.id;

                return (
                  <button
                    key={phase.id}
                    onClick={() => jumpToDay(phase.startDay)}
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
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* 中间：学习路径时间线 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-6">
              {/* 快速跳转 */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">快速跳转：</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={1}
                    max={totalDays}
                    value={currentDay}
                    onChange={(e) => jumpToDay(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 text-sm border rounded-md text-center"
                  />
                  <span className="text-sm text-muted-foreground">/ {totalDays} 天</span>
                </div>
              </div>

              {/* 学习路径展示 */}
              <div className="space-y-4">
                {dailyLearningPath.map((lesson) => {
                  const config = phaseConfig[lesson.phase];
                  const isCompleted = completedDays.has(lesson.day);
                  const isCurrent = currentDay === lesson.day;

                  // 只显示当前天附近的内容
                  const showDetail = Math.abs(lesson.day - currentDay) <= 2;

                  if (!showDetail) {
                    // 紧凑模式
                    return (
                      <div
                        key={lesson.day}
                        onClick={() => jumpToDay(lesson.day)}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                          isCurrent ? `${config.bgColor} border ${config.borderColor}` : 'hover:bg-muted'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          isCompleted ? 'bg-green-500 text-white' : isCurrent ? `${config.bgColor} ${config.color}` : 'bg-muted'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : lesson.day}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{lesson.title}</div>
                        </div>
                      </div>
                    );
                  }

                  // 详细模式
                  return (
                    <Card
                      key={lesson.day}
                      className={`transition-all ${
                        isCurrent ? `ring-2 ring-primary ${config.bgColor}` : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* 天数标识 */}
                          <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                              isCompleted ? 'bg-green-500 text-white' : `${config.bgColor} ${config.color}`
                            }`}>
                              {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : lesson.day}
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">Day</span>
                          </div>

                          {/* 内容 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{lesson.title}</h3>
                              <Badge variant="outline" className={config.color}>
                                {lesson.phaseName}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {lesson.description}
                            </p>

                            {/* 知识点 */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {lesson.topics.map((topic) => (
                                <Badge key={topic.id} variant="secondary" className="text-xs">
                                  {topic.name}
                                </Badge>
                              ))}
                            </div>

                            {/* 底部信息 */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.estimatedMinutes}分钟
                                </div>
                                <div className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  {lesson.practiceProblems.length}题练习
                                </div>
                                {lesson.challengeProblem && (
                                  <div className="flex items-center gap-1 text-yellow-600">
                                    <Star className="h-3 w-3" />
                                    挑战题
                                  </div>
                                )}
                              </div>

                              {isCurrent && (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    if (lesson.practiceProblems[0]) {
                                      onStartProblem?.(lesson.practiceProblems[0]);
                                    }
                                    markDayComplete(lesson.day);
                                  }}
                                >
                                  开始学习
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* 右侧：当日详情 */}
        {currentLesson && (
          <aside className="w-80 border-l bg-muted/20 shrink-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                {/* 当日标题 */}
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-primary mb-1">
                    Day {currentLesson.day}
                  </div>
                  <div className="text-lg font-medium">{currentLesson.title}</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge variant="outline" className={phaseConfig[currentLesson.phase].color}>
                      {currentLesson.phaseName}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* 学习目标 */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    学习目标
                  </h4>
                  <ul className="space-y-2">
                    {currentLesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 知识点 */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    知识点
                  </h4>
                  <div className="space-y-2">
                    {currentLesson.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between p-2 rounded bg-muted/50"
                      >
                        <span className="text-sm">{topic.name}</span>
                        {topic.importance === 'required' && (
                          <Badge variant="default" className="text-xs">必学</Badge>
                        )}
                        {topic.importance === 'recommended' && (
                          <Badge variant="outline" className="text-xs">推荐</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 练习题 */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    练习题
                  </h4>
                  <div className="space-y-2">
                    {currentLesson.practiceProblems.map((problemId, index) => (
                      <Button
                        key={problemId}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => onStartProblem?.(problemId)}
                      >
                        <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center mr-2">
                          {index + 1}
                        </span>
                        题目 #{problemId}
                      </Button>
                    ))}
                    {currentLesson.challengeProblem && (
                      <Button
                        variant="outline"
                        className="w-full justify-start border-yellow-300 text-yellow-600"
                        onClick={() => onStartProblem?.(currentLesson.challengeProblem!)}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        挑战题 #{currentLesson.challengeProblem}
                      </Button>
                    )}
                  </div>
                </div>

                {/* 预计时间 */}
                <Card className="bg-muted/30">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">预计学习时间</span>
                      </div>
                      <span className="font-medium">{currentLesson.estimatedMinutes} 分钟</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 标记完成 */}
                <Button
                  className="w-full"
                  variant={completedDays.has(currentLesson.day) ? "outline" : "default"}
                  onClick={() => markDayComplete(currentLesson.day)}
                  disabled={completedDays.has(currentLesson.day)}
                >
                  {completedDays.has(currentLesson.day) ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      已完成
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      标记为已完成
                    </>
                  )}
                </Button>

                {/* 导航按钮 */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={currentDay <= 1}
                    onClick={() => jumpToDay(currentDay - 1)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    上一天
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={currentDay >= totalDays}
                    onClick={() => jumpToDay(currentDay + 1)}
                  >
                    下一天
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </aside>
        )}
      </div>
    </div>
  );
}

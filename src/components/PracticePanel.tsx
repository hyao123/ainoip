'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SESSION_TEMPLATES,
  createSession,
  submitProblem,
  type PracticeSession,
  type SessionTemplate,
} from '@/lib/practice-session';
import { problems as allProblems, type Problem, type DifficultyLevel, difficultyConfig } from '@/lib/problems';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Trophy,
  Timer,
  Zap,
  Brain,
  Dumbbell,
  Calendar,
} from 'lucide-react';

interface PracticePanelProps {
  problems?: Problem[];
  onSelectProblem?: (problem: Problem) => void;
  completedProblems?: Set<number>;
}

// 练习图标映射
const templateIcons: Record<string, React.ReactNode> = {
  '快速练习': <Zap className="h-4 w-4" />,
  '每日挑战': <Calendar className="h-4 w-4" />,
  '分类突破': <Target className="h-4 w-4" />,
  '持久战': <Brain className="h-4 w-4" />,
  '完美通关': <Trophy className="h-4 w-4" />,
  '弱项强化': <Dumbbell className="h-4 w-4" />,
};

// 难度颜色映射
function getDifficultyColor(level: DifficultyLevel): string {
  return difficultyConfig[level]?.bgColor || 'bg-gray-100';
}

export function PracticePanel({
  problems = allProblems,
  onSelectProblem,
  completedProblems = new Set(),
}: PracticePanelProps) {
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('quick-practice');
  const [isPaused, setIsPaused] = useState(false);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedProblemIds, setSelectedProblemIds] = useState<number[]>([]);

  // 获取模板列表
  const templates = SESSION_TEMPLATES;

  // 当前选中的模板
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];

  // 开始练习
  const startSession = () => {
    const newSession = createSession(selectedTemplate);
    
    // 根据模板选择题目
    let filteredProblems = [...problems];
    
    if (selectedTemplate.problemFilter?.categories) {
      filteredProblems = filteredProblems.filter(
        p => selectedTemplate.problemFilter?.categories?.includes(p.category)
      );
    }
    
    if (selectedTemplate.problemFilter?.difficulties) {
      filteredProblems = filteredProblems.filter(
        p => selectedTemplate.problemFilter?.difficulties?.includes(p.difficulty)
      );
    }
    
    // 随机选择题目
    const shuffled = filteredProblems.sort(() => Math.random() - 0.5);
    const targetCount = selectedTemplate.goals.find(g => g.type === 'problems')?.target || 5;
    const selectedIds = shuffled.slice(0, targetCount).map(p => p.id);
    
    setSelectedProblemIds(selectedIds);
    setCurrentProblemIndex(0);
    setSession(newSession);
    setIsPaused(false);
  };

  // 暂停/继续
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // 结束练习
  const endSession = () => {
    setSession(null);
    setIsPaused(false);
    setSelectedProblemIds([]);
    setCurrentProblemIndex(0);
  };

  // 标记题目完成
  const markProblemComplete = (problemId: number, correct: boolean) => {
    if (!session) return;
    
    const updated = submitProblem(session, problemId, correct ? 'AC' : 'WA');
    setSession(updated);
    
    // 移动到下一题
    if (currentProblemIndex < selectedProblemIds.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    }
  };

  // 获取当前题目
  const currentProblem = useMemo(() => {
    if (!session || selectedProblemIds.length === 0) return null;
    return problems.find(p => p.id === selectedProblemIds[currentProblemIndex]);
  }, [session, problems, selectedProblemIds, currentProblemIndex]);

  // 计算进度
  const progress = session ? (currentProblemIndex / selectedProblemIds.length) * 100 : 0;

  // 计算统计
  const stats = useMemo(() => {
    if (!session) return null;
    return {
      solved: session.stats.solvedProblems,
      total: selectedProblemIds.length,
      accuracy: session.stats.totalProblems > 0
        ? Math.round((session.stats.solvedProblems / session.stats.totalProblems) * 100)
        : 0,
    };
  }, [session, selectedProblemIds.length]);

  if (!session) {
    // 选择练习模式
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Dumbbell className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">练习模式</span>
        </div>

        <div className="space-y-3">
          <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="选择练习模式" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  <div className="flex items-center gap-2">
                    {templateIcons[template.name]}
                    <span>{template.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({template.goals.find(g => g.type === 'problems')?.target || 0}题)
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 模板详情 */}
          {selectedTemplate && (
            <Card className="p-3 bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                {templateIcons[selectedTemplate.name]}
                <span className="font-medium text-sm">{selectedTemplate.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {selectedTemplate.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {selectedTemplate.goals.find(g => g.type === 'problems')?.target || 0} 道题
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {selectedTemplate.duration ? `${selectedTemplate.duration}分钟` : '不限时'}
                </span>
              </div>
            </Card>
          )}

          <Button onClick={startSession} className="w-full">
            <Play className="h-4 w-4 mr-2" />
            开始练习
          </Button>
        </div>
      </Card>
    );
  }

  // 练习进行中
  return (
    <div className="space-y-4">
      {/* 进度卡片 */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">
              {selectedTemplate.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePause}
              className="h-7 w-7 p-0"
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={endSession}
              className="h-7 w-7 p-0 text-destructive"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 进度条 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>进度 {currentProblemIndex + 1}/{selectedProblemIds.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* 统计 */}
        {stats && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="text-lg font-bold text-green-600">{stats.solved}</div>
              <div className="text-[10px] text-muted-foreground">已正确</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="text-lg font-bold text-blue-600">{stats.accuracy}%</div>
              <div className="text-[10px] text-muted-foreground">正确率</div>
            </div>
          </div>
        )}
      </Card>

      {/* 当前题目 */}
      {currentProblem && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm">{currentProblem.title}</span>
            <Badge className={`${getDifficultyColor(currentProblem.difficulty)} text-xs`}>
              {difficultyConfig[currentProblem.difficulty]?.label}
            </Badge>
          </div>
          <Badge variant="secondary" className="text-xs">
            {currentProblem.category}
          </Badge>

          {/* 操作按钮 */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={() => markProblemComplete(currentProblem.id, true)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              正确
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => markProblemComplete(currentProblem.id, false)}
            >
              <XCircle className="h-4 w-4 mr-1" />
              错误
            </Button>
          </div>

          <Button
            variant="link"
            size="sm"
            className="w-full mt-2"
            onClick={() => onSelectProblem?.(currentProblem)}
          >
            查看题目详情
          </Button>
        </Card>
      )}

      {/* 已完成题目 */}
      {session.problems.length > 0 && (
        <Card className="p-4">
          <div className="text-xs text-muted-foreground mb-2">已完成</div>
          <div className="flex flex-wrap gap-1">
            {session.problems.map(cp => {
              const prob = problems.find(p => p.id === cp.problemId);
              return (
                <Badge
                  key={cp.problemId}
                  variant="outline"
                  className={`text-[10px] h-5 ${
                    cp.result === 'AC'
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : cp.result === 'WA'
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  {cp.result === 'AC' ? '✓' : cp.result === 'WA' ? '✗' : '○'} {prob?.title || `题目${cp.problemId}`}
                </Badge>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

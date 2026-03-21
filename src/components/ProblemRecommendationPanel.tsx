'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  analyzeProblem,
  type ProblemAnalysis,
} from '@/lib/problem-analyzer';
import {
  problems,
  difficultyConfig,
  type Problem,
  type DifficultyLevel,
} from '@/lib/problems';
import {
  Lightbulb,
  Target,
  Clock,
  TrendingUp,
  ChevronRight,
  Zap,
  Brain,
  Route,
} from 'lucide-react';

interface ProblemRecommendationPanelProps {
  currentProblem: Problem;
  allProblems?: Problem[];
  onSelectProblem?: (problem: Problem) => void;
  completedProblems?: Set<number>;
}

// 难度颜色映射
function getDifficultyColor(level: DifficultyLevel): string {
  return difficultyConfig[level]?.bgColor || 'bg-gray-100';
}

// 获取学习建议
function getLearningSuggestions(analysis: ProblemAnalysis): string {
  const suggestions: string[] = [];
  
  if (analysis.difficulty.overall <= 3) {
    suggestions.push('这是一道入门级题目，适合熟悉基础概念。');
  } else if (analysis.difficulty.overall <= 6) {
    suggestions.push('这是一道中等难度题目，需要掌握核心算法思想。');
  } else {
    suggestions.push('这是一道挑战性题目，建议先巩固前置知识。');
  }
  
  if (analysis.requiredSkills.length > 0) {
    suggestions.push(`需要掌握：${analysis.requiredSkills.slice(0, 3).join('、')}`);
  }
  
  if (analysis.prerequisites.length > 0) {
    suggestions.push(`建议先完成前置题目巩固基础。`);
  }
  
  return suggestions.join(' ');
}

export function ProblemRecommendationPanel({
  currentProblem,
  allProblems = problems,
  onSelectProblem,
  completedProblems = new Set(),
}: ProblemRecommendationPanelProps) {
  // 分析当前题目
  const analysis = useMemo(
    () => analyzeProblem(currentProblem),
    [currentProblem]
  );

  // 获取前置题目列表
  const prerequisiteProblemList = useMemo(() => {
    return analysis.prerequisites
      .map(id => allProblems.find(p => p.id === id))
      .filter((p): p is Problem => p !== undefined)
      .slice(0, 3);
  }, [analysis.prerequisites, allProblems]);

  // 获取后续题目列表
  const nextProblemList = useMemo(() => {
    return analysis.nextProblems
      .map(id => allProblems.find(p => p.id === id))
      .filter((p): p is Problem => p !== undefined)
      .slice(0, 3);
  }, [analysis.nextProblems, allProblems]);

  // 获取同分类推荐题目
  const relatedProblems = useMemo(() => {
    return allProblems
      .filter(p => p.category === currentProblem.category && p.id !== currentProblem.id)
      .slice(0, 3)
      .map(p => ({
        problem: p,
        reason: '同分类推荐',
      }));
  }, [allProblems, currentProblem]);

  return (
    <div className="space-y-4">
      {/* 题目分析卡片 */}
      <Card className="p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">智能分析</span>
        </div>

        <div className="space-y-3">
          {/* 难度分析 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Target className="h-3 w-3" />
              难度评估
            </span>
            <div className="flex items-center gap-2">
              <Badge className={`${getDifficultyColor(currentProblem.difficulty)} text-xs`}>
                {difficultyConfig[currentProblem.difficulty]?.label || currentProblem.difficulty}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {analysis.timeEstimate} 分钟
              </span>
            </div>
          </div>

          {/* 所需技能 */}
          <div>
            <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
              <Zap className="h-3 w-3" />
              所需技能
            </span>
            <div className="flex flex-wrap gap-1">
              {analysis.requiredSkills.map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-[10px] h-5">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* 学习建议 */}
          <div className="bg-white/50 dark:bg-black/20 rounded-lg p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Lightbulb className="h-3 w-3 text-yellow-500" />
              <span className="text-xs font-medium">学习建议</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {getLearningSuggestions(analysis)}
            </p>
          </div>
        </div>
      </Card>

      {/* 推荐题目 */}
      {relatedProblems.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Route className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">相关推荐</span>
          </div>

          <div className="space-y-2">
            {relatedProblems.map(rec => (
              <div
                key={rec.problem.id}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onSelectProblem?.(rec.problem)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {rec.problem.title}
                    </span>
                    <Badge className={`${getDifficultyColor(rec.problem.difficulty)} text-[10px] h-4 px-1`}>
                      {difficultyConfig[rec.problem.difficulty]?.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge variant="secondary" className="text-[10px] h-4 px-1">
                      {rec.problem.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {rec.reason}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 学习路径 */}
      <Card className="p-4 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-sm">学习路径</span>
        </div>

        <div className="space-y-2">
          {/* 前置题目 */}
          {prerequisiteProblemList.length > 0 && (
            <div>
              <span className="text-xs text-muted-foreground mb-1.5 block">
                📚 建议先学习
              </span>
              <div className="flex flex-wrap gap-1">
                {prerequisiteProblemList.map(prob => {
                  const isCompleted = completedProblems.has(prob.id);
                  return (
                    <Badge
                      key={prob.id}
                      variant={isCompleted ? 'default' : 'outline'}
                      className={`text-[10px] h-5 cursor-pointer ${
                        isCompleted ? 'bg-green-500' : ''
                      }`}
                      onClick={() => onSelectProblem?.(prob)}
                    >
                      {isCompleted && '✓ '}
                      {prob.title}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* 后续题目 */}
          {nextProblemList.length > 0 && (
            <div>
              <span className="text-xs text-muted-foreground mb-1.5 block">
                🎯 下一步挑战
              </span>
              <div className="flex flex-wrap gap-1">
                {nextProblemList.map(prob => {
                  const isCompleted = completedProblems.has(prob.id);
                  return (
                    <Badge
                      key={prob.id}
                      variant="outline"
                      className="text-[10px] h-5 cursor-pointer hover:bg-primary/10"
                      onClick={() => onSelectProblem?.(prob)}
                    >
                      {prob.title}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

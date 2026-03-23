'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Lightbulb,
  Wrench,
  Code,
  ChevronRight,
  Sparkles,
  Target,
  TrendingDown,
  BookOpen,
  Zap,
  Lock,
  Unlock,
  RefreshCw,
  Video,
  ExternalLink,
} from 'lucide-react';
import {
  type ProblemHints,
  type HintLevel,
  type Hint,
  HINT_CONFIG,
  getHintLevelStyle,
  calculateScoreWithHints,
} from '@/lib/hints';

interface ProgressiveHintProps {
  problemId: number;
  problemHints?: ProblemHints;
  onHintUsed?: (level: HintLevel) => void;
  onSelectRelatedProblem?: (problemId: number) => void;
  userPoints?: number;
  dailyHintsRemaining?: number;
}

const levelIcons = {
  1: Lightbulb,
  2: Wrench,
  3: Code,
};

export function ProgressiveHint({
  problemId,
  problemHints,
  onHintUsed,
  onSelectRelatedProblem,
  userPoints = 100,
  dailyHintsRemaining = 5,
}: ProgressiveHintProps) {
  const [usedLevels, setUsedLevels] = useState<HintLevel[]>([]);
  const [currentLevel, setCurrentLevel] = useState<HintLevel | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  // 获取当前应该显示的提示
  const getCurrentHint = (): Hint | null => {
    if (!problemHints || usedLevels.length === 0) return null;
    const maxUsedLevel = Math.max(...usedLevels) as HintLevel;
    return problemHints.hints[maxUsedLevel - 1];
  };

  // 获取下一个可解锁的提示等级
  const getNextLevel = (): HintLevel | null => {
    if (!problemHints) return null;
    if (usedLevels.length === 0) return 1;
    const maxUsed = Math.max(...usedLevels) as HintLevel;
    if (maxUsed >= 3) return null;
    return (maxUsed + 1) as HintLevel;
  };

  // 解锁下一级提示
  const unlockNextHint = () => {
    const nextLevel = getNextLevel();
    if (!nextLevel || !problemHints) return;

    const hint = problemHints.hints[nextLevel - 1];
    
    // 检查积分是否足够
    if (userPoints < hint.cost) {
      return;
    }

    // 检查每日次数
    if (dailyHintsRemaining <= 0) {
      return;
    }

    setIsRevealing(true);
    
    setTimeout(() => {
      setUsedLevels(prev => [...prev, nextLevel]);
      setCurrentLevel(nextLevel);
      setIsRevealing(false);
      onHintUsed?.(nextLevel);
    }, 500);
  };

  // 计算当前得分影响
  const scorePenalty = usedLevels.reduce((sum, level) => {
    return sum + HINT_CONFIG.levels[level].scorePenalty;
  }, 0);

  // 下一个提示
  const nextLevel = getNextLevel();
  const nextHint = nextLevel && problemHints ? problemHints.hints[nextLevel - 1] : null;

  const currentHint = getCurrentHint();

  if (!problemHints) {
    return (
      <Card className="p-4 border-dashed">
        <div className="text-center text-muted-foreground">
          <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">该题目暂无提示</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 头部状态栏 */}
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">渐进式提示</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>{userPoints} 积分</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5 text-blue-500" />
            <span>今日 {dailyHintsRemaining} 次</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 提示进度指示器 */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((level) => {
              const isUsed = usedLevels.includes(level as HintLevel);
              const style = getHintLevelStyle(level as HintLevel);
              const Icon = levelIcons[level as HintLevel];
              
              return (
                <div
                  key={level}
                  className={`flex-1 h-12 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                    isUsed
                      ? `${style.bgColor} ${style.borderColor}`
                      : 'bg-muted/50 border-muted'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isUsed ? style.color : 'text-muted-foreground/50'}`} />
                  <span className={`text-xs font-medium ${isUsed ? style.color : 'text-muted-foreground/50'}`}>
                    Lv.{level}
                  </span>
                  {isUsed ? (
                    <Unlock className="h-3 w-3 text-green-500" />
                  ) : (
                    <Lock className="h-3 w-3 text-muted-foreground/30" />
                  )}
                </div>
              );
            })}
          </div>

          {/* 得分影响提示 */}
          {usedLevels.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <TrendingDown className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-amber-700 dark:text-amber-400">
                已使用 {usedLevels.length} 次提示，得分影响 -{scorePenalty}%
              </span>
            </motion.div>
          )}

          {/* 已解锁的提示内容 */}
          <AnimatePresence mode="popLayout">
            {usedLevels.map((level) => {
              const hint = problemHints.hints[level - 1];
              const style = getHintLevelStyle(level);
              const Icon = levelIcons[level];
              
              return (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`p-4 ${style.bgColor} border ${style.borderColor}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${style.bgColor}`}>
                        <Icon className={`h-5 w-5 ${style.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`font-medium text-sm ${style.color}`}>
                            {hint.title}
                          </span>
                          <Badge variant="outline" className="text-[10px] h-5">
                            -{hint.scorePenalty}%
                          </Badge>
                        </div>
                        <pre className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed font-mono">
                          {hint.content}
                        </pre>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* 解锁下一级提示按钮 */}
          {nextHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 border-dashed border-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {levelIcons[nextLevel as 1 | 2 | 3] && 
                        (() => {
                          const Icon = levelIcons[nextLevel as 1 | 2 | 3];
                          return <Icon className="h-5 w-5 text-muted-foreground" />;
                        })()
                      }
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {HINT_CONFIG.levels[nextLevel as 1 | 2 | 3].title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {HINT_CONFIG.levels[nextLevel as 1 | 2 | 3].description}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={unlockNextHint}
                    disabled={
                      isRevealing ||
                      userPoints < nextHint.cost ||
                      dailyHintsRemaining <= 0
                    }
                    size="sm"
                    className="gap-2"
                  >
                    {isRevealing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                        解锁中...
                      </>
                    ) : (
                      <>
                        <ChevronRight className="h-4 w-4" />
                        解锁提示
                        <Badge variant="secondary" className="ml-1 text-[10px] h-5">
                          -{nextHint.cost} 积分
                        </Badge>
                      </>
                    )}
                  </Button>
                </div>
                
                {/* 警告信息 */}
                {(userPoints < nextHint.cost || dailyHintsRemaining <= 0) && (
                  <div className="mt-3 text-xs text-destructive">
                    {userPoints < nextHint.cost && '⚠️ 积分不足'}
                    {dailyHintsRemaining <= 0 && '⚠️ 今日提示次数已用完'}
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {/* 全部提示已解锁 */}
          {!nextHint && usedLevels.length === 3 && (
            <Card className="p-4 bg-green-500/10 border-green-500/20">
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  已获取全部提示
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  建议先尝试自己实现，实在不行再查看完整答案
                </p>
              </div>
            </Card>
          )}

          {/* 推荐跳板题目 */}
          {problemHints.relatedProblems && problemHints.relatedProblems.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">推荐先练习</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {problemHints.relatedProblems.map((pid) => (
                  <Button
                    key={pid}
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectRelatedProblem?.(pid)}
                    className="text-xs"
                  >
                    题目 {pid}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 关键概念标签 */}
          {problemHints.keyConcepts && problemHints.keyConcepts.length > 0 && (
            <div className="mt-4">
              <div className="text-xs text-muted-foreground mb-2">涉及知识点：</div>
              <div className="flex flex-wrap gap-1">
                {problemHints.keyConcepts.map((concept) => (
                  <Badge key={concept} variant="secondary" className="text-[10px]">
                    {concept}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 视频教程链接 */}
          {problemHints.videoLink?.bilibili && (
            <div className="mt-4 pt-4 border-t">
              <a
                href={`https://www.bilibili.com/video/${problemHints.videoLink.bilibili}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg hover:from-pink-600 hover:to-orange-500 transition-all text-sm font-medium"
              >
                <Video className="h-4 w-4" />
                观看视频教程
                <ExternalLink className="h-3 w-3" />
              </a>
              {problemHints.videoLink.title && (
                <span className="ml-3 text-sm text-muted-foreground">
                  {problemHints.videoLink.title}
                </span>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';

interface ProblemNavigationProps<T extends { id: number; title: string; category?: string }> {
  currentProblemId: number;
  problems: T[];
  onNavigate: (problem: T) => void;
  onShowList?: () => void;
}

export function ProblemNavigation<T extends { id: number; title: string; category?: string }>({
  currentProblemId,
  problems,
  onNavigate,
  onShowList,
}: ProblemNavigationProps<T>) {
  const currentIndex = problems.findIndex(p => p.id === currentProblemId);
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem = currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  return (
    <div className="flex items-center gap-1">
      {/* 上一题 */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={!prevProblem}
              onClick={() => prevProblem && onNavigate(prevProblem)}
              className="h-7 px-2 text-xs gap-1"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              上一题
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            {prevProblem ? (
              <div className="text-xs">
                <p className="font-medium">{prevProblem.title}</p>
                {prevProblem.category && <p className="text-muted-foreground">{prevProblem.category}</p>}
              </div>
            ) : (
              <p className="text-xs">已经是第一题了</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* 进度指示 */}
      <Badge variant="secondary" className="text-[10px] h-5 px-1.5 mx-1">
        {currentIndex + 1} / {problems.length}
      </Badge>

      {/* 下一题 */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={!nextProblem}
              onClick={() => nextProblem && onNavigate(nextProblem)}
              className="h-7 px-2 text-xs gap-1"
            >
              下一题
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            {nextProblem ? (
              <div className="text-xs">
                <p className="font-medium">{nextProblem.title}</p>
                {nextProblem.category && <p className="text-muted-foreground">{nextProblem.category}</p>}
              </div>
            ) : (
              <p className="text-xs">已经是最后一题了</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* 题目列表按钮 */}
      {onShowList && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onShowList}
          className="h-7 w-7 p-0 ml-1"
        >
          <List className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}

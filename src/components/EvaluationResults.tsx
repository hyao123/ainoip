'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, XCircle, CheckCircle, Clock, MemoryStick, AlertTriangle, FileOutput, FileCode } from 'lucide-react';

export interface TestCaseResult {
  testCaseId: number;
  status: 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'OLE' | 'CE';
  timeUsed: number;
  memoryUsed: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  errorMessage?: string;
}

export interface EvaluateSummary {
  totalTestCases: number;
  passedTestCases: number;
  score: number;
  maxTimeUsed: number;
  maxMemoryUsed: number;
}

interface EvaluationResultsProps {
  results: TestCaseResult[];
  summary: EvaluateSummary;
  compileError?: string;
  onClose?: () => void;
}

const statusConfig = {
  AC: {
    label: '通过',
    color: 'bg-green-500 text-white',
    icon: CheckCircle,
    bgColor: 'bg-green-50 dark:bg-green-950',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  WA: {
    label: '答案错误',
    color: 'bg-red-500 text-white',
    icon: XCircle,
    bgColor: 'bg-red-50 dark:bg-red-950',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  TLE: {
    label: '超时',
    color: 'bg-yellow-500 text-white',
    icon: Clock,
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  MLE: {
    label: '内存超限',
    color: 'bg-orange-500 text-white',
    icon: MemoryStick,
    bgColor: 'bg-orange-50 dark:bg-orange-950',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
  RE: {
    label: '运行时错误',
    color: 'bg-red-600 text-white',
    icon: AlertTriangle,
    bgColor: 'bg-red-50 dark:bg-red-950',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  OLE: {
    label: '输出超限',
    color: 'bg-purple-500 text-white',
    icon: FileOutput,
    bgColor: 'bg-purple-50 dark:bg-purple-950',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  CE: {
    label: '编译错误',
    color: 'bg-red-500 text-white',
    icon: FileCode,
    bgColor: 'bg-red-50 dark:bg-red-950',
    borderColor: 'border-red-200 dark:border-red-800',
  },
};

export function EvaluationResults({
  results,
  summary,
  compileError,
  onClose,
}: EvaluationResultsProps) {
  const [expandedCases, setExpandedCases] = React.useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedCases(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedCases(new Set(results.map(r => r.testCaseId)));
  };

  const collapseAll = () => {
    setExpandedCases(new Set());
  };

  if (compileError) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between border-b bg-red-50 dark:bg-red-950 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-red-500" />
            <span className="font-semibold text-red-700 dark:text-red-300">编译错误</span>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              关闭
            </Button>
          )}
        </div>
        <ScrollArea className="flex-1 p-4">
          <Card className="p-4 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950">
            <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono">
              {compileError}
            </pre>
          </Card>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 汇总信息 */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">总分:</span>
            <span className={`text-2xl font-bold ${summary.score === 100 ? 'text-green-500' : summary.score > 0 ? 'text-yellow-500' : 'text-red-500'}`}>
              {summary.score}
            </span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">{summary.passedTestCases}</span>
            <span className="text-sm text-muted-foreground">/ {summary.totalTestCases} 通过</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{summary.maxTimeUsed}</span>
            <span className="text-sm text-muted-foreground">ms</span>
          </div>
          <div className="flex items-center gap-2">
            <MemoryStick className="h-4 w-4 text-purple-500" />
            <span className="text-sm">{summary.maxMemoryUsed}</span>
            <span className="text-sm text-muted-foreground">MB</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={expandAll}>
            全部展开
          </Button>
          <Button variant="ghost" size="sm" onClick={collapseAll}>
            全部收起
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              关闭
            </Button>
          )}
        </div>
      </div>

      {/* 测试点列表 */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {results.map((result) => {
            const config = statusConfig[result.status];
            const StatusIcon = config.icon;
            const isExpanded = expandedCases.has(result.testCaseId);

            return (
              <Card
                key={result.testCaseId}
                className={`overflow-hidden ${config.bgColor} ${config.borderColor}`}
              >
                <div
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => toggleExpand(result.testCaseId)}
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className="h-5 w-5" />
                    <div className="flex items-center gap-2">
                      <span className="font-medium">测试点 #{result.testCaseId}</span>
                      <Badge className={config.color}>{config.label}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{result.timeUsed}ms</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MemoryStick className="h-3 w-3" />
                      <span>{result.memoryUsed}MB</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border px-4 py-3 space-y-4">
                    {result.errorMessage && (
                      <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
                        <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
                          错误信息
                        </p>
                        <pre className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap font-mono">
                          {result.errorMessage}
                        </pre>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium mb-2">输入数据</p>
                      <Card className="p-3">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                          {result.input || '(空)'}
                        </pre>
                      </Card>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">期望输出</p>
                      <Card className="p-3">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                          {result.expectedOutput || '(空)'}
                        </pre>
                      </Card>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">实际输出</p>
                      <Card
                        className={`p-3 ${
                          result.status === 'AC'
                            ? 'bg-green-50 dark:bg-green-950'
                            : 'bg-red-50 dark:bg-red-950'
                        }`}
                      >
                        <pre
                          className={`text-sm whitespace-pre-wrap font-mono ${
                            result.status === 'AC'
                              ? 'text-green-700 dark:text-green-300'
                              : 'text-red-700 dark:text-red-300'
                          }`}
                        >
                          {result.actualOutput || '(空)'}
                        </pre>
                      </Card>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TestCaseResult,
  EvaluateSummary,
} from '@/components/EvaluationResults';
import {
  ChevronDown,
  ChevronUp,
  XCircle,
  CheckCircle,
  Clock,
  MemoryStick,
  AlertTriangle,
  FileOutput,
  FileCode,
  BarChart3,
  Timer,
  Database,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Code,
  FileText,
} from 'lucide-react';

interface DetailedEvaluationResultsProps {
  results: TestCaseResult[];
  summary: EvaluateSummary;
  compileError?: string;
  code?: string;
  timeLimit?: number;
  memoryLimit?: number;
  onClose?: () => void;
}

const statusConfig = {
  AC: { label: '通过', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-300', icon: CheckCircle },
  WA: { label: '答案错误', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-300', icon: XCircle },
  TLE: { label: '超时', color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-300', icon: Clock },
  MLE: { label: '内存超限', color: 'text-orange-600', bgColor: 'bg-orange-100', borderColor: 'border-orange-300', icon: MemoryStick },
  RE: { label: '运行错误', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-300', icon: AlertTriangle },
  OLE: { label: '输出超限', color: 'text-purple-600', bgColor: 'bg-purple-100', borderColor: 'border-purple-300', icon: FileOutput },
  CE: { label: '编译错误', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-300', icon: FileCode },
};

export function DetailedEvaluationResults({
  results,
  summary,
  compileError,
  code = '',
  timeLimit = 1000,
  memoryLimit = 128,
  onClose,
}: DetailedEvaluationResultsProps) {
  const [expandedCases, setExpandedCases] = React.useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = React.useState<'detail' | 'analysis'>('detail');

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

  // 分析测试结果
  const analysis = React.useMemo(() => {
    const statusCount: Record<string, number> = {};
    results.forEach(r => {
      statusCount[r.status] = (statusCount[r.status] || 0) + 1;
    });

    const avgTime = results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.timeUsed, 0) / results.length)
      : 0;
    const avgMemory = results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.memoryUsed, 0) / results.length)
      : 0;

    const maxTime = Math.max(...results.map(r => r.timeUsed), 0);
    const maxMemory = Math.max(...results.map(r => r.memoryUsed), 0);

    // 时间分布
    const timeDistribution = results.map(r => ({
      id: r.testCaseId,
      time: r.timeUsed,
      status: r.status,
    }));

    // 内存分布
    const memoryDistribution = results.map(r => ({
      id: r.testCaseId,
      memory: r.memoryUsed,
      status: r.status,
    }));

    // 错误类型分析
    const errorAnalysis: string[] = [];
    if (statusCount['TLE'] > 0) {
      errorAnalysis.push('存在超时测试点，建议优化算法时间复杂度');
    }
    if (statusCount['MLE'] > 0) {
      errorAnalysis.push('存在内存超限，建议减少数据结构空间占用');
    }
    if (statusCount['RE'] > 0) {
      errorAnalysis.push('存在运行错误，检查数组越界、除零、空指针等问题');
    }
    if (statusCount['WA'] > 0) {
      errorAnalysis.push('存在答案错误，检查边界条件、特殊输入处理');
    }

    return {
      statusCount,
      avgTime,
      avgMemory,
      maxTime,
      maxMemory,
      timeDistribution,
      memoryDistribution,
      errorAnalysis,
    };
  }, [results]);

  if (compileError) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between border-b bg-red-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-red-500" />
            <span className="font-semibold text-red-700">编译错误</span>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              关闭
            </Button>
          )}
        </div>
        <ScrollArea className="flex-1 p-4">
          <Card className="p-4 border-red-200 bg-red-50">
            <pre className="text-sm text-red-700 whitespace-pre-wrap font-mono">
              {compileError}
            </pre>
          </Card>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 汇总信息栏 */}
      <div className="border-b bg-muted/30 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">总分:</span>
              <span className={`text-3xl font-bold ${
                summary.score === 100 ? 'text-green-500' : 
                summary.score >= 60 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {summary.score}
              </span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{summary.passedTestCases}</span>
              <span className="text-sm text-muted-foreground">/ {summary.totalTestCases} 通过</span>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              关闭
            </Button>
          )}
        </div>

        {/* 状态分布 */}
        <div className="flex items-center gap-2 flex-wrap">
          {Object.entries(analysis.statusCount).map(([status, count]) => {
            const config = statusConfig[status as keyof typeof statusConfig];
            if (!config) return null;
            return (
              <Badge key={status} variant="outline" className={`${config.bgColor} ${config.color}`}>
                {config.label} × {count}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Tab切换 */}
      <div className="border-b px-4 bg-muted/20 shrink-0">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="h-9">
            <TabsTrigger value="detail" className="text-xs gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              测试详情
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              性能分析
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 内容区 */}
      <ScrollArea className="flex-1">
        {activeTab === 'detail' ? (
          <div className="space-y-2 p-4">
            {results.map((result) => {
              const config = statusConfig[result.status];
              const StatusIcon = config.icon;
              const isExpanded = expandedCases.has(result.testCaseId);

              return (
                <Card
                  key={result.testCaseId}
                  className={`overflow-hidden ${config.bgColor} border ${config.borderColor}`}
                >
                  {/* 测试点头部 */}
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-black/5"
                    onClick={() => toggleExpand(result.testCaseId)}
                  >
                    <div className="flex items-center gap-3">
                      <StatusIcon className={`h-5 w-5 ${config.color}`} />
                      <span className="font-medium">测试点 #{result.testCaseId}</span>
                      <Badge variant="outline" className={config.color}>
                        {config.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className={result.timeUsed > timeLimit * 0.8 ? 'text-orange-600 font-medium' : ''}>
                          {result.timeUsed}ms
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Database className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className={result.memoryUsed > memoryLimit * 0.8 ? 'text-orange-600 font-medium' : ''}>
                          {result.memoryUsed}MB
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* 展开详情 */}
                  {isExpanded && (
                    <div className="border-t p-3 space-y-3 bg-white/50">
                      {/* 输入 */}
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">输入</div>
                        <Card className="p-2 bg-muted/50 font-mono text-sm whitespace-pre-wrap">
                          {result.input || '(空)'}
                        </Card>
                      </div>

                      {/* 预期输出 */}
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">预期输出</div>
                        <Card className="p-2 bg-muted/50 font-mono text-sm whitespace-pre-wrap">
                          {result.expectedOutput || '(空)'}
                        </Card>
                      </div>

                      {/* 实际输出 */}
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">实际输出</div>
                        <Card className={`p-2 font-mono text-sm whitespace-pre-wrap ${
                          result.status === 'WA' ? 'bg-red-50 border-red-200' : 'bg-muted/50'
                        }`}>
                          {result.actualOutput || '(空)'}
                        </Card>
                      </div>

                      {/* 错误信息 */}
                      {result.errorMessage && (
                        <div>
                          <div className="text-xs font-medium text-red-600 mb-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            错误信息
                          </div>
                          <Card className="p-2 bg-red-50 border-red-200 text-red-700 font-mono text-sm whitespace-pre-wrap">
                            {result.errorMessage}
                          </Card>
                        </div>
                      )}

                      {/* 时间/内存进度条 */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">时间消耗</div>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={Math.min(100, (result.timeUsed / timeLimit) * 100)} 
                              className="flex-1 h-2"
                            />
                            <span className="text-xs text-muted-foreground">
                              {result.timeUsed}/{timeLimit}ms
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">内存消耗</div>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={Math.min(100, (result.memoryUsed / memoryLimit) * 100)} 
                              className="flex-1 h-2"
                            />
                            <span className="text-xs text-muted-foreground">
                              {result.memoryUsed}/{memoryLimit}MB
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* 性能概览 */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="font-medium">性能概览</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysis.avgTime}</div>
                  <div className="text-xs text-muted-foreground">平均时间 (ms)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysis.avgMemory}</div>
                  <div className="text-xs text-muted-foreground">平均内存 (MB)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{analysis.maxTime}</div>
                  <div className="text-xs text-muted-foreground">最大时间 (ms)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{analysis.maxMemory}</div>
                  <div className="text-xs text-muted-foreground">最大内存 (MB)</div>
                </div>
              </div>
            </Card>

            {/* 时间分布图 */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Timer className="h-4 w-4 text-primary" />
                <span className="font-medium">时间分布</span>
              </div>
              <div className="h-24 flex items-end gap-1">
                {analysis.timeDistribution.map(item => {
                  const heightPercent = timeLimit > 0 ? Math.min(100, (item.time / timeLimit) * 100) : 0;
                  const colorClass = item.status === 'AC' ? 'bg-green-500' : 
                                     item.status === 'TLE' ? 'bg-red-500' : 
                                     item.status === 'WA' ? 'bg-yellow-500' : 'bg-gray-400';
                  return (
                    <div 
                      key={item.id}
                      className={`flex-1 ${colorClass} rounded-t transition-all hover:opacity-80`}
                      style={{ height: `${Math.max(4, heightPercent)}%` }}
                      title={`#${item.id}: ${item.time}ms`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>测试点 1</span>
                <span>时间限制: {timeLimit}ms</span>
                <span>测试点 {results.length}</span>
              </div>
            </Card>

            {/* 内存分布图 */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-4 w-4 text-primary" />
                <span className="font-medium">内存分布</span>
              </div>
              <div className="h-24 flex items-end gap-1">
                {analysis.memoryDistribution.map(item => {
                  const heightPercent = memoryLimit > 0 ? Math.min(100, (item.memory / memoryLimit) * 100) : 0;
                  const colorClass = item.status === 'AC' ? 'bg-green-500' : 
                                     item.status === 'MLE' ? 'bg-red-500' : 
                                     item.status === 'WA' ? 'bg-yellow-500' : 'bg-gray-400';
                  return (
                    <div 
                      key={item.id}
                      className={`flex-1 ${colorClass} rounded-t transition-all hover:opacity-80`}
                      style={{ height: `${Math.max(4, heightPercent)}%` }}
                      title={`#${item.id}: ${item.memory}MB`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>测试点 1</span>
                <span>内存限制: {memoryLimit}MB</span>
                <span>测试点 {results.length}</span>
              </div>
            </Card>

            {/* 错误分析与建议 */}
            {analysis.errorAnalysis.length > 0 && (
              <Card className="p-4 border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  <span className="font-medium text-amber-700">错误分析与建议</span>
                </div>
                <ul className="space-y-2">
                  {analysis.errorAnalysis.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                      <span className="text-amber-500 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

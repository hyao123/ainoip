'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  AlertCircle,
  AlertTriangle,
  Bug,
  ChevronDown,
  ChevronRight,
  Clock,
  Code,
  FileWarning,
  Lightbulb,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
  Layers,
} from 'lucide-react';
import { useState } from 'react';
import {
  type ErrorDiagnosis,
  type ErrorType,
  type OutputDiff,
  type ErrorPattern,
  type ComplexityAnalysis,
  diagnoseError,
} from '@/lib/error-diagnosis';
import type { TestCaseResult } from './EvaluationResults';

interface ErrorDiagnosisPanelProps {
  result: TestCaseResult;
  code: string;
  testInput?: string;
  expectedOutput?: string;
  actualOutput?: string;
  inputSize?: number;
}

// 错误类型配置
const errorTypeConfig: Record<ErrorType, { label: string; color: string; bgColor: string; icon: typeof AlertCircle }> = {
  WA: { label: '答案错误', color: 'text-red-500', bgColor: 'bg-red-500/10', icon: AlertCircle },
  TLE: { label: '超时', color: 'text-orange-500', bgColor: 'bg-orange-500/10', icon: Clock },
  MLE: { label: '超内存', color: 'text-purple-500', bgColor: 'bg-purple-500/10', icon: Layers },
  RE: { label: '运行错误', color: 'text-red-600', bgColor: 'bg-red-600/10', icon: FileWarning },
  CE: { label: '编译错误', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', icon: Code },
  PE: { label: '格式错误', color: 'text-blue-500', bgColor: 'bg-blue-500/10', icon: AlertTriangle },
};

export function ErrorDiagnosisPanel({
  result,
  code,
  testInput,
  expectedOutput,
  actualOutput,
  inputSize,
}: ErrorDiagnosisPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary', 'patterns']));
  
  // 只对错误结果进行诊断
  if (result.status === 'AC') {
    return null;
  }
  
  const errorType = result.status as ErrorType;
  const diagnosis = diagnoseError(
    errorType,
    code,
    actualOutput || result.actualOutput,
    expectedOutput,
    testInput,
    inputSize
  );
  
  const config = errorTypeConfig[errorType];
  const Icon = config.icon;
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center gap-2 shrink-0">
        <Bug className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">智能错误诊断</span>
        <Badge className={`${config.bgColor} ${config.color} text-[10px] h-5`}>
          {config.label}
        </Badge>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 错误摘要 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg ${config.bgColor} border`}
          >
            <div className="flex items-start gap-2">
              <Icon className={`h-5 w-5 ${config.color} shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${config.color}`}>诊断结果</div>
                <div className="text-xs text-muted-foreground mt-1">{diagnosis.summary}</div>
              </div>
            </div>
          </motion.div>
          
          {/* 输出差异 */}
          {diagnosis.diffs && diagnosis.diffs.length > 0 && (
            <Collapsible
              open={expandedSections.has('diffs')}
              onOpenChange={() => toggleSection('diffs')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full py-2">
                {expandedSections.has('diffs') ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <Target className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">输出差异</span>
                <Badge variant="secondary" className="text-[10px] h-5">
                  {diagnosis.diffs.length} 处
                </Badge>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 space-y-2">
                  {diagnosis.diffs.slice(0, 5).map((diff, index) => (
                    <OutputDiffCard key={index} diff={diff} />
                  ))}
                  {diagnosis.diffs.length > 5 && (
                    <div className="text-xs text-muted-foreground text-center py-2">
                      还有 {diagnosis.diffs.length - 5} 处差异...
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
          
          {/* 时间复杂度分析 */}
          {diagnosis.complexity && (
            <Collapsible
              open={expandedSections.has('complexity')}
              onOpenChange={() => toggleSection('complexity')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full py-2">
                {expandedSections.has('complexity') ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">时间复杂度分析</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ComplexityCard complexity={diagnosis.complexity} />
              </CollapsibleContent>
            </Collapsible>
          )}
          
          {/* 检测到的错误模式 */}
          {diagnosis.patterns && diagnosis.patterns.length > 0 && (
            <Collapsible
              open={expandedSections.has('patterns')}
              onOpenChange={() => toggleSection('patterns')}
            >
              <CollapsibleTrigger className="flex items-center gap-2 w-full py-2">
                {expandedSections.has('patterns') ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">可能的问题</span>
                <Badge variant="secondary" className="text-[10px] h-5">
                  {diagnosis.patterns.length} 个
                </Badge>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 space-y-2">
                  {diagnosis.patterns.map((pattern, index) => (
                    <ErrorPatternCard key={index} pattern={pattern} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
          
          {/* 调试步骤 */}
          <Collapsible
            open={expandedSections.has('debug')}
            onOpenChange={() => toggleSection('debug')}
          >
            <CollapsibleTrigger className="flex items-center gap-2 w-full py-2">
              {expandedSections.has('debug') ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">调试步骤</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="p-3 mt-2">
                <div className="space-y-2">
                  {diagnosis.debugSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                      <span className="text-primary font-mono">{step.charAt(0)}</span>
                      <span className="text-muted-foreground">{step.substring(2)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>
          
          {/* 相关知识点 */}
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">相关知识点：</span>
            {diagnosis.relatedConcepts.map((concept, index) => (
              <Badge key={index} variant="outline" className="text-[10px] h-5">
                {concept}
              </Badge>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// 输出差异卡片
function OutputDiffCard({ diff }: { diff: OutputDiff }) {
  return (
    <Card className="p-2.5 text-xs">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="text-[10px] h-5">
          行 {diff.line}
        </Badge>
        <span className="text-muted-foreground">列 {diff.column}</span>
        <Badge variant="secondary" className="text-[10px] h-5 ml-auto">
          {diff.type === 'char' ? '字符差异' : 
           diff.type === 'extra' ? '多余内容' : 
           diff.type === 'missing' ? '缺少内容' : '行差异'}
        </Badge>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-green-600 w-12 shrink-0">期望:</span>
          <code className="flex-1 bg-green-500/10 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-mono text-[11px]">
            {diff.expected || '(空)'}
          </code>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-600 w-12 shrink-0">实际:</span>
          <code className="flex-1 bg-red-500/10 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded font-mono text-[11px]">
            {diff.actual || '(空)'}
          </code>
        </div>
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground">
        {diff.message}
      </div>
    </Card>
  );
}

// 错误模式卡片
function ErrorPatternCard({ pattern }: { pattern: ErrorPattern }) {
  const [showDetails, setShowDetails] = useState(false);
  
  const severityConfig = {
    high: { color: 'text-red-500', bgColor: 'bg-red-500/10' },
    medium: { color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    low: { color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  };
  
  const severity = severityConfig[pattern.severity];
  
  return (
    <Card className={`p-3 ${severity.bgColor} border`}>
      <div className="flex items-start gap-2">
        <span className="text-base">{pattern.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-medium text-sm ${severity.color}`}>
              {pattern.name}
            </span>
            <Badge variant="outline" className={`text-[10px] h-5 ${severity.color}`}>
              {pattern.severity === 'high' ? '高优先级' : 
               pattern.severity === 'medium' ? '中优先级' : '低优先级'}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{pattern.description}</p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="h-6 px-2 text-xs mt-2"
          >
            {showDetails ? '收起详情' : '查看详情'}
            <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </Button>
          
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 pt-2 border-t space-y-2">
                  <div>
                    <div className="text-[11px] font-medium text-muted-foreground mb-1">可能原因：</div>
                    <ul className="text-[11px] text-muted-foreground space-y-0.5">
                      {pattern.possibleCauses.map((cause, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-primary">•</span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-muted-foreground mb-1">修复建议：</div>
                    <ul className="text-[11px] text-muted-foreground space-y-0.5">
                      {pattern.suggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <ArrowRight className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}

// 时间复杂度卡片
function ComplexityCard({ complexity }: { complexity: ComplexityAnalysis }) {
  const isEfficient = complexity.operations < 1e8;
  
  return (
    <Card className="p-3 mt-2">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-muted-foreground text-[10px]">当前复杂度</div>
          <div className="font-mono font-medium text-orange-500">
            {complexity.estimatedComplexity}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-[10px]">期望复杂度</div>
          <div className="font-mono font-medium text-green-500">
            {complexity.expectedComplexity}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-[10px]">预估操作次数</div>
          <div className={`font-mono font-medium ${isEfficient ? 'text-green-500' : 'text-red-500'}`}>
            {complexity.operations.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-[10px]">性能瓶颈</div>
          <div className="font-medium text-muted-foreground">
            {complexity.bottleneck}
          </div>
        </div>
      </div>
      
      {complexity.suggestions.length > 0 && (
        <div className="mt-3 pt-2 border-t">
          <div className="text-[10px] font-medium text-muted-foreground mb-1">优化建议：</div>
          <ul className="text-[11px] text-muted-foreground space-y-0.5">
            {complexity.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-1">
                <ArrowRight className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

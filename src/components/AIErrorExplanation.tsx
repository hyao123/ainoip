'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  diagnoseError,
  compareOutputs,
  type ErrorType,
  type ErrorDiagnosis,
  type ErrorPattern,
  type OutputDiff,
} from '@/lib/error-diagnosis';
import {
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Bug,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  BookOpen,
  Target,
  Zap,
  Brain,
  MessageCircle,
} from 'lucide-react';

interface AIErrorExplanationProps {
  errorType?: ErrorType;
  code?: string;
  actualOutput?: string;
  expectedOutput?: string;
  testInput?: string;
  onFix?: (suggestion: string) => void;
}

// 错误类型的友好描述
const errorTypeFriendly: Record<ErrorType, { name: string; emoji: string; color: string; description: string }> = {
  WA: { 
    name: '答案错误', 
    emoji: '❌', 
    color: 'text-red-500',
    description: '程序的输出结果和期望的不一样'
  },
  TLE: { 
    name: '运行超时', 
    emoji: '⏰', 
    color: 'text-orange-500',
    description: '程序运行时间太长了'
  },
  MLE: { 
    name: '内存超限', 
    emoji: '💾', 
    color: 'text-purple-500',
    description: '程序用了太多内存'
  },
  RE: { 
    name: '运行时错误', 
    emoji: '💥', 
    color: 'text-red-600',
    description: '程序运行时崩溃了'
  },
  CE: { 
    name: '编译错误', 
    emoji: '🔧', 
    color: 'text-yellow-500',
    description: '代码有语法问题，无法运行'
  },
  PE: { 
    name: '格式错误', 
    emoji: '📝', 
    color: 'text-blue-500',
    description: '输出格式不符合要求'
  },
};

// 生成适合小朋友理解的类比
function getKidFriendlyAnalogy(pattern: ErrorPattern): string {
  const analogies: Record<string, string> = {
    'potential-array-overflow': 
      '就像你有一个只有10个格子的书架，但你却想放第11本书。电脑的数组也是这样，下标必须在范围内才行！',
    'integer-overflow': 
      '想象一个只能显示4位数字的计算器，当你算出9999+1时，它会变成0000！int类型也有这样的限制，超过21亿就会"溢出"。',
    'boundary-condition':
      '就像跑步时忘记踩刹车线就停下来了，或者跑过头了。程序也需要在正确的位置停止！',
    'uninitialized-variable':
      '就像你拿出一个新笔记本但没写名字，别人就不知道是谁的。变量也需要一个"名字"（初始值），否则电脑不知道里面该是什么。',
    'inefficient-recursion':
      '就像你要算第100层楼梯有多少种走法，每次都从头开始算，而不是记住之前算过的结果。这样要算超级超级多次！',
    'nested-loops':
      '就像套娃一样，一层套一层。如果套太多层，要打开的时间就会变得超级长！',
    'slow-io':
      '就像你在用小勺子舀水，而别人用水管。cin/cout虽然方便，但在处理大量数据时会变慢。',
    'runtime-error':
      '程序就像一个小机器人，它遇到了不知道该怎么处理的情况，就"死机"了。可能是访问了不存在的内存，或者做了除以0这样不可能的运算。',
    'memory-exceeded':
      '就像你的书包只能装10本书，但你非要塞进去20本。电脑给程序的内存也是有限的！',
    'compile-error':
      '就像你写的作文里有错别字和语法错误，老师看不懂你在说什么。电脑也一样，如果代码不符合语法规则，它就没法理解你的意思。',
    'trailing-space':
      '就像你在纸上写答案，本来应该写"42"，你却写成了"42   "，多出来的空格让电脑觉得答案不对！',
    'missing-newline':
      '就像写作文忘记换行了，电脑期望每行结束后有一个"回车"，但你的程序忘了。',
    'extra-newline':
      '就像老师说只要交一张纸，你却多交了一张空白的。额外的空行会让电脑觉得答案格式不对。',
  };
  
  return analogies[pattern.type] || pattern.description;
}

// 生成调试小贴士
function getDebugTip(errorType: ErrorType): string[] {
  const tips: Record<ErrorType, string[]> = {
    WA: [
      '💡 先用样例数据测试，确保能通过样例',
      '💡 想想有没有特殊情况（比如0、负数、最大值）',
      '💡 用print大法：在关键位置输出变量值，看看是否符合预期',
      '💡 检查循环边界：是从0还是1开始？是<还是<=？',
    ],
    TLE: [
      '💡 数一数有几层循环嵌套，每层循环多少次？',
      '💡 如果有递归，想想有没有重复计算？可以加"记忆化"',
      '💡 大量输入输出时，试试关闭cin/cout同步',
      '💡 想想有没有更聪明的算法，不要硬算',
    ],
    MLE: [
      '💡 检查数组大小，是不是开太大了？',
      '💡 能不能用"滚动数组"减少空间？',
      '💡 有没有存了很多不需要的数据？',
    ],
    RE: [
      '💡 检查所有数组访问，下标会不会越界？',
      '💡 有没有除以0的可能？',
      '💡 递归是不是太深了？',
    ],
    CE: [
      '💡 仔细看错误提示，它会告诉你是哪一行有问题',
      '💡 检查括号是不是配对？分号是不是漏了？',
      '💡 变量名有没有拼写错误？',
    ],
    PE: [
      '💡 检查输出末尾有没有多余的空格或换行',
      '💡 用肉眼对比你的输出和期望输出，看看哪里不一样',
      '💡 注意题目要求的格式，比如空格、换行的位置',
    ],
  };
  
  return tips[errorType] || [];
}

export function AIErrorExplanation({
  errorType = 'WA',
  code = '',
  actualOutput = '',
  expectedOutput = '',
  testInput = '',
  onFix,
}: AIErrorExplanationProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['diagnosis']));
  const [copiedTip, setCopiedTip] = useState<string | null>(null);

  // 获取诊断结果
  const diagnosis = diagnoseError(
    errorType,
    code,
    actualOutput,
    expectedOutput,
    testInput
  );

  // 输出差异
  const diffs = actualOutput && expectedOutput 
    ? compareOutputs(expectedOutput, actualOutput) 
    : [];

  // 切换展开状态
  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  // 复制建议
  const copyTip = async (tip: string) => {
    await navigator.clipboard.writeText(tip);
    setCopiedTip(tip);
    setTimeout(() => setCopiedTip(null), 2000);
  };

  const errorInfo = errorTypeFriendly[errorType];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900">
      {/* 头部 */}
      <div className="px-4 py-3 border-b bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          <span className="font-semibold text-sm">AI 错误解析</span>
          <Badge variant="secondary" className="text-[10px]">
            <Sparkles className="h-3 w-3 mr-1" />
            智能分析
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 错误类型卡片 */}
          <Card className="border-2 border-dashed">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{errorInfo.emoji}</div>
                <div>
                  <h3 className={`font-bold text-lg ${errorInfo.color}`}>
                    {errorInfo.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {errorInfo.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 简单解释 */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <MessageCircle className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-purple-700 dark:text-purple-300 mb-1">
                    用简单的话说...
                  </h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400 leading-relaxed">
                    {diagnosis.summary}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 输出差异（如果是WA） */}
          {errorType === 'WA' && diffs.length > 0 && (
            <Collapsible
              open={expandedSections.has('diffs')}
              onOpenChange={() => toggleSection('diffs')}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 h-auto"
                >
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-red-500" />
                    <span className="font-semibold text-sm">输出差异对比</span>
                    <Badge variant="destructive" className="text-[10px]">
                      {diffs.length} 处不同
                    </Badge>
                  </div>
                  {expandedSections.has('diffs') ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-2 mt-2 pl-6">
                  {diffs.slice(0, 5).map((diff, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-xs"
                    >
                      <p className="font-medium text-red-700 dark:text-red-300">
                        {diff.message}
                      </p>
                      <div className="mt-1 flex gap-2">
                        <div className="flex-1">
                          <span className="text-muted-foreground">期望：</span>
                          <code className="bg-green-100 dark:bg-green-900/30 px-1 rounded">
                            {diff.expected || '(空)'}
                          </code>
                        </div>
                        <div className="flex-1">
                          <span className="text-muted-foreground">实际：</span>
                          <code className="bg-red-100 dark:bg-red-900/30 px-1 rounded">
                            {diff.actual || '(空)'}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                  {diffs.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center">
                      还有 {diffs.length - 5} 处差异...
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* 可能的问题 */}
          {diagnosis.patterns && diagnosis.patterns.length > 0 && (
            <Collapsible
              open={expandedSections.has('patterns')}
              onOpenChange={() => toggleSection('patterns')}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 h-auto"
                >
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold text-sm">可能的问题</span>
                    <Badge variant="outline" className="text-[10px]">
                      {diagnosis.patterns.length} 个
                    </Badge>
                  </div>
                  {expandedSections.has('patterns') ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-3 mt-2">
                  {diagnosis.patterns.map((pattern, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <div className={`h-1 ${
                        pattern.severity === 'high' ? 'bg-red-500' :
                        pattern.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                      }`} />
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{pattern.icon}</span>
                          <span className="font-semibold text-sm">{pattern.name}</span>
                          <Badge 
                            variant={pattern.severity === 'high' ? 'destructive' : 'secondary'}
                            className="text-[10px]"
                          >
                            {pattern.severity === 'high' ? '高优先级' : 
                             pattern.severity === 'medium' ? '中优先级' : '低优先级'}
                          </Badge>
                        </div>
                        
                        {/* 类比解释 */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mb-2">
                          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                            🎯 {getKidFriendlyAnalogy(pattern)}
                          </p>
                        </div>

                        {/* 原因 */}
                        <div className="mb-2">
                          <p className="text-[10px] font-medium text-muted-foreground mb-1">
                            可能的原因：
                          </p>
                          <ul className="text-xs text-muted-foreground space-y-0.5">
                            {pattern.possibleCauses.slice(0, 3).map((cause, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-orange-500">•</span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 建议 */}
                        <div>
                          <p className="text-[10px] font-medium text-muted-foreground mb-1">
                            试试这样改：
                          </p>
                          <ul className="text-xs space-y-0.5">
                            {pattern.suggestions.slice(0, 3).map((suggestion, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-green-500">✓</span>
                                <span className="text-green-700 dark:text-green-400">{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* 调试小贴士 */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-green-500" />
                调试小贴士
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-2">
                {getDebugTip(errorType).map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-white/50 dark:bg-black/10 rounded group cursor-pointer hover:bg-white dark:hover:bg-black/20 transition-colors"
                    onClick={() => copyTip(tip)}
                  >
                    <span className="text-xs flex-1">{tip}</span>
                    {copiedTip === tip ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 相关知识点 */}
          {diagnosis.relatedConcepts.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs text-muted-foreground">相关知识点：</span>
              {diagnosis.relatedConcepts.map((concept, idx) => (
                <Badge key={idx} variant="outline" className="text-[10px]">
                  <BookOpen className="h-2.5 w-2.5 mr-1" />
                  {concept}
                </Badge>
              ))}
            </div>
          )}

          {/* 调试步骤 */}
          <Collapsible
            open={expandedSections.has('steps')}
            onOpenChange={() => toggleSection('steps')}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-2 h-auto"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold text-sm">调试步骤</span>
                </div>
                {expandedSections.has('steps') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 mt-2 pl-6">
                {diagnosis.debugSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                      {idx + 1}
                    </Badge>
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </div>
  );
}

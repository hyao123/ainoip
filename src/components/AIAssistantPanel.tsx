'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Lightbulb,
  Code2,
  Bug,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Copy,
  Check,
  RefreshCw,
  X,
} from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  category: string;
}

interface EvaluationResult {
  testCaseId: number;
  status: 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'OLE' | 'CE';
  input: string;
  expectedOutput: string;
  actualOutput: string;
  timeUsed: number;
  errorMessage?: string;
}

interface AIAssistantPanelProps {
  problem: Problem;
  code: string;
  evaluationResults: EvaluationResult[] | null;
}

type AIAssistType = 'hint' | 'analyze' | 'debug';

export function AIAssistantPanel({
  problem,
  code,
  evaluationResults,
}: AIAssistantPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentType, setCurrentType] = useState<AIAssistType | null>(null);
  const [hintLevel, setHintLevel] = useState(1);
  const [response, setResponse] = useState('');
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 获取难度对应的badge样式
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // 获取难度中文名
  const getDifficultyName = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '入门';
      case 'medium':
        return '普及';
      case 'hard':
        return '提高';
      default:
        return difficulty;
    }
  };

  // 流式请求AI辅助
  const fetchAIAssist = useCallback(async (type: AIAssistType, level: number = 1) => {
    if (isLoading) return;

    // 验证条件
    if (type === 'analyze' && !code.trim()) {
      alert('请先编写代码');
      return;
    }
    if (type === 'debug') {
      if (!code.trim()) {
        alert('请先编写代码');
        return;
      }
      if (!evaluationResults || evaluationResults.length === 0) {
        alert('请先运行评测');
        return;
      }
      const hasFailed = evaluationResults.some(r => r.status !== 'AC');
      if (!hasFailed) {
        alert('评测已全部通过，无需调试');
        return;
      }
    }

    setIsLoading(true);
    setCurrentType(type);
    setResponse('');
    setIsExpanded(true);

    try {
      const res = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          problem: {
            title: problem.title,
            description: problem.description,
            inputFormat: problem.inputFormat,
            outputFormat: problem.outputFormat,
            sampleInput: problem.sampleInput,
            sampleOutput: problem.sampleOutput,
            difficulty: getDifficultyName(problem.difficulty),
            category: problem.category,
          },
          code,
          evaluationResults,
          hintLevel: level,
        }),
      });

      if (!res.ok) {
        throw new Error('请求失败');
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error('无法读取响应');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                setResponse(prev => prev + data.content);
              }
              if (data.error) {
                setResponse(`错误: ${data.error}`);
              }
            } catch {
              // 忽略解析错误
            }
          }
        }
      }
    } catch (error: any) {
      setResponse(`请求失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [code, evaluationResults, isLoading, problem]);

  // 复制响应内容
  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 清空响应
  const handleClear = () => {
    setResponse('');
    setCurrentType(null);
    setHintLevel(1);
  };

  // 获取按钮配置
  const buttons = [
    {
      type: 'hint' as AIAssistType,
      icon: Lightbulb,
      label: 'AI提示',
      description: '获取解题思路提示',
      color: 'text-yellow-600 hover:bg-yellow-50',
    },
    {
      type: 'analyze' as AIAssistType,
      icon: Code2,
      label: '代码分析',
      description: '分析代码质量和优化建议',
      color: 'text-blue-600 hover:bg-blue-50',
    },
    {
      type: 'debug' as AIAssistType,
      icon: Bug,
      label: '错因分析',
      description: '诊断评测错误原因',
      color: 'text-red-600 hover:bg-red-50',
    },
  ];

  // 滚动到底部
  useEffect(() => {
    if (scrollRef.current && response) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [response]);

  return (
    <div className="border-t bg-gradient-to-r from-purple-50/50 to-blue-50/50">
      {/* 折叠/展开按钮 */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <span className="font-semibold text-purple-700">AI 助教</span>
          <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
            Beta
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-7 px-2"
        >
          {isExpanded ? (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              收起
            </>
          ) : (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              展开
            </>
          )}
        </Button>
      </div>

      {/* 展开内容 */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {/* 功能按钮 */}
          <div className="flex items-center gap-2 mb-3">
            {buttons.map((btn) => {
              const Icon = btn.icon;
              const isActive = currentType === btn.type;
              const isDisabled = isLoading && !isActive;
              
              return (
                <Button
                  key={btn.type}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (btn.type === 'hint') {
                      fetchAIAssist('hint', hintLevel);
                    } else {
                      fetchAIAssist(btn.type);
                    }
                  }}
                  disabled={isDisabled}
                  className={`gap-2 ${!isActive && btn.color}`}
                  title={btn.description}
                >
                  <Icon className="h-4 w-4" />
                  {btn.label}
                </Button>
              );
            })}
            
            {/* 提示级别选择器 */}
            {currentType === 'hint' && (
              <div className="flex items-center gap-1 ml-2">
                <span className="text-xs text-muted-foreground">提示级别:</span>
                {[1, 2, 3].map((level) => (
                  <Button
                    key={level}
                    variant={hintLevel === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setHintLevel(level);
                      if (!isLoading) {
                        fetchAIAssist('hint', level);
                      }
                    }}
                    disabled={isLoading}
                    className="h-7 w-7 p-0 text-xs"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* 提示级别说明 */}
          {currentType === 'hint' && (
            <div className="text-xs text-muted-foreground mb-3 px-2 py-1.5 bg-muted/50 rounded">
              💡 提示级别说明：1=方向性提示 | 2=算法提示 | 3=详细思路
            </div>
          )}

          {/* AI响应区域 */}
          <Card className="border-purple-100 bg-white/80">
            <ScrollArea className="h-[300px]" ref={scrollRef}>
              <div className="p-4">
                {isLoading && !response ? (
                  <div className="flex items-center justify-center h-[200px]">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>AI 正在思考中...</span>
                    </div>
                  </div>
                ) : response ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {response}
                    </pre>
                    {isLoading && (
                      <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-1" />
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                    <Sparkles className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm">点击上方按钮获取AI辅助</p>
                    <p className="text-xs mt-1">AI提示 · 代码分析 · 错因诊断</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* 工具栏 */}
            {response && (
              <div className="flex items-center justify-end gap-2 px-4 py-2 border-t bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 px-2 text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1 text-green-600" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      复制
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-7 px-2 text-xs"
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  清空
                </Button>
              </div>
            )}
          </Card>

          {/* 底部提示 */}
          <p className="text-xs text-muted-foreground mt-2 text-center">
            ⚠️ AI建议仅供参考，请结合自己的思考理解
          </p>
        </div>
      )}
    </div>
  );
}

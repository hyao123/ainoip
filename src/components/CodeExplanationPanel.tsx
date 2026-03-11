'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Code2, 
  BookOpen, 
  GitBranch, 
  Clock, 
  Database, 
  Lightbulb,
  AlertCircle,
  ChevronRight,
  FileCode,
  Zap,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import {
  generateLineExplanations,
  analyzeComplexity,
  analyzeCodeStructure,
  detectMissingHeaders,
  type LineExplanation,
} from '@/lib/code-explainer';

interface CodeExplanationPanelProps {
  code: string;
  selectedCode?: string;
  language: 'cpp' | 'python';
  onClose?: () => void;
}

type ExplanationMode = 'selection' | 'line-by-line' | 'complexity' | 'headers';

export function CodeExplanationPanel({
  code,
  selectedCode,
  language,
}: CodeExplanationPanelProps) {
  const [activeMode, setActiveMode] = useState<ExplanationMode>('selection');
  const [lineExplanations, setLineExplanations] = useState<LineExplanation[]>([]);
  const [complexityInfo, setComplexityInfo] = useState<{ time: string; space: string; bottlenecks: string[] } | null>(null);
  const [structureInfo, setStructureInfo] = useState<{ functions: string[]; loops: { type: string; line: number }[]; conditions: { type: string; line: number }[]; variables: string[] } | null>(null);
  const [headersInfo, setHeadersInfo] = useState<{ required: string[]; missing: string[] } | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // 分析代码
  useEffect(() => {
    if (code) {
      // 生成逐行解释
      const explanations = generateLineExplanations(code);
      setLineExplanations(explanations);
      
      // 分析复杂度
      const complexity = analyzeComplexity(code);
      setComplexityInfo(complexity);
      
      // 分析结构
      const structure = analyzeCodeStructure(code);
      setStructureInfo(structure);
      
      // 检测头文件
      if (language === 'cpp') {
        const headers = detectMissingHeaders(code);
        setHeadersInfo(headers);
      }
    }
  }, [code, language]);

  // AI 解释选中的代码
  const explainWithAI = async () => {
    const codeToExplain = selectedCode || code;
    if (!codeToExplain.trim()) {
      setAiExplanation('请先选择要解释的代码');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/explain-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeToExplain,
          language,
          mode: activeMode,
        }),
      });
      
      const data = await response.json();
      if (data.explanation) {
        setAiExplanation(data.explanation);
      } else {
        setAiExplanation('解释生成失败，请重试');
      }
    } catch (error) {
      console.error('AI explanation error:', error);
      // 使用本地分析作为后备
      setAiExplanation(generateLocalExplanation(codeToExplain, language));
    } finally {
      setIsLoading(false);
    }
  };

  // 本地生成基础解释（作为后备）
  const generateLocalExplanation = (code: string, lang: string): string => {
    const structure = analyzeCodeStructure(code);
    const complexity = analyzeComplexity(code);
    
    let explanation = `## 代码分析\n\n`;
    
    if (structure.functions.length > 0) {
      explanation += `**函数**: ${structure.functions.join(', ')}\n\n`;
    }
    
    if (structure.loops.length > 0) {
      explanation += `**循环**: 发现 ${structure.loops.length} 个循环结构\n`;
      structure.loops.forEach(loop => {
        explanation += `  - 第${loop.line}行: ${loop.type}循环\n`;
      });
      explanation += '\n';
    }
    
    if (structure.conditions.length > 0) {
      explanation += `**条件分支**: 发现 ${structure.conditions.length} 个条件判断\n`;
      structure.conditions.forEach(cond => {
        explanation += `  - 第${cond.line}行: ${cond.type}语句\n`;
      });
      explanation += '\n';
    }
    
    explanation += `**时间复杂度**: ${complexity.time}\n`;
    explanation += `**空间复杂度**: ${complexity.space}\n`;
    
    return explanation;
  };

  // 生成逐行注释
  const generateLineComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/generate-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
        }),
      });
      
      const data = await response.json();
      if (data.commentedCode) {
        setAiExplanation(`\`\`\`${language}\n${data.commentedCode}\n\`\`\``);
      } else {
        // 使用本地生成的注释作为后备
        const localComments = generateLocalLineComments(code);
        setAiExplanation(`\`\`\`${language}\n${localComments}\n\`\`\``);
      }
    } catch (error) {
      console.error('Generate comments error:', error);
      const localComments = generateLocalLineComments(code);
      setAiExplanation(`\`\`\`${language}\n${localComments}\n\`\`\``);
    } finally {
      setIsLoading(false);
    }
  };

  // 本地生成逐行注释（作为后备）
  const generateLocalLineComments = (code: string): string => {
    const lines = code.split('\n');
    const explanations = generateLineExplanations(code);
    
    return lines.map((line, i) => {
      const exp = explanations[i];
      // 如果不是注释行，添加注释
      if (exp && exp.type !== 'comment' && line.trim()) {
        // 在行尾添加注释
        const comment = ` // ${exp.explanation}`;
        return line + comment;
      }
      return line;
    }).join('\n');
  };

  // 复制内容
  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 获取行类型颜色
  const getLineTypeColor = (type: LineExplanation['type']): string => {
    switch (type) {
      case 'declaration': return 'text-blue-500';
      case 'initialization': return 'text-green-500';
      case 'loop': return 'text-orange-500';
      case 'condition': return 'text-purple-500';
      case 'operation': return 'text-gray-500';
      case 'function': return 'text-cyan-500';
      case 'io': return 'text-yellow-500';
      case 'comment': return 'text-gray-400';
      default: return 'text-gray-500';
    }
  };

  // 获取行类型背景色
  const getLineTypeBg = (type: LineExplanation['type']): string => {
    switch (type) {
      case 'declaration': return 'bg-blue-500/10';
      case 'initialization': return 'bg-green-500/10';
      case 'loop': return 'bg-orange-500/10';
      case 'condition': return 'bg-purple-500/10';
      case 'operation': return 'bg-gray-500/10';
      case 'function': return 'bg-cyan-500/10';
      case 'io': return 'bg-yellow-500/10';
      default: return 'bg-transparent';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 标题栏 */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">代码解释器</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {language === 'cpp' ? 'C++' : 'Python'}
          </Badge>
        </div>
      </div>

      {/* 模式选择 */}
      <div className="px-3 pt-2">
        <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as ExplanationMode)}>
          <TabsList className="w-full grid grid-cols-4 h-8">
            <TabsTrigger value="selection" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI解释
            </TabsTrigger>
            <TabsTrigger value="line-by-line" className="text-xs">
              <FileCode className="h-3 w-3 mr-1" />
              逐行
            </TabsTrigger>
            <TabsTrigger value="complexity" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              复杂度
            </TabsTrigger>
            <TabsTrigger value="headers" className="text-xs">
              <Code2 className="h-3 w-3 mr-1" />
              头文件
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 内容区域 */}
      <ScrollArea className="flex-1 p-3">
        {/* AI解释模式 */}
        {activeMode === 'selection' && (
          <div className="space-y-3">
            {selectedCode && (
              <Card className="bg-muted/50">
                <CardHeader className="py-2 px-3">
                  <CardTitle className="text-xs flex items-center gap-2">
                    <Code2 className="h-3 w-3" />
                    选中的代码
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3">
                  <pre className="text-xs font-mono whitespace-pre-wrap text-muted-foreground max-h-32 overflow-auto">
                    {selectedCode}
                  </pre>
                </CardContent>
              </Card>
            )}
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1"
                onClick={explainWithAI}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3 mr-1" />
                )}
                解释代码
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={generateLineComments}
                disabled={isLoading}
              >
                生成注释
              </Button>
            </div>

            {aiExplanation && (
              <Card>
                <CardContent className="py-3 px-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">解释结果</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => handleCopy(aiExplanation)}
                    >
                      {copied ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                    {aiExplanation.split('\n').map((line, i) => (
                      <p key={i} className="my-1">{line}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* 逐行解释模式 */}
        {activeMode === 'line-by-line' && (
          <div className="space-y-1">
            {lineExplanations.map((exp, index) => (
              <div 
                key={index}
                className={`flex items-start gap-2 p-2 rounded-md ${getLineTypeBg(exp.type)}`}
              >
                <span className="text-xs font-mono text-muted-foreground w-8 text-right shrink-0">
                  {exp.lineNumber}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-[10px] h-5 shrink-0 ${getLineTypeColor(exp.type)}`}
                >
                  {exp.type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <code className="text-xs font-mono block truncate">
                    {exp.code || '(空行)'}
                  </code>
                  <span className="text-xs text-muted-foreground block mt-1">
                    {exp.explanation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 复杂度分析模式 */}
        {activeMode === 'complexity' && complexityInfo && structureInfo && (
          <div className="space-y-4">
            {/* 复杂度卡片 */}
            <Card>
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-xs flex items-center gap-2">
                  <Clock className="h-3 w-3 text-orange-500" />
                  时间复杂度
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <div className="text-lg font-bold text-orange-500">
                  {complexityInfo.time}
                </div>
                {complexityInfo.bottlenecks.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {complexityInfo.bottlenecks.map((bottleneck, i) => (
                      <div key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        {bottleneck}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-xs flex items-center gap-2">
                  <Database className="h-3 w-3 text-blue-500" />
                  空间复杂度
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <div className="text-lg font-bold text-blue-500">
                  {complexityInfo.space}
                </div>
              </CardContent>
            </Card>

            {/* 代码结构 */}
            <Card>
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-xs flex items-center gap-2">
                  <GitBranch className="h-3 w-3 text-purple-500" />
                  代码结构分析
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3 space-y-3">
                {structureInfo.functions.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground">函数:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {structureInfo.functions.map((fn, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {fn}()
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {structureInfo.loops.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground">循环结构:</span>
                    <div className="space-y-1 mt-1">
                      {structureInfo.loops.map((loop, i) => (
                        <div key={i} className="text-xs flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {loop.type}
                          </Badge>
                          <span className="text-muted-foreground">
                            第 {loop.line} 行
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {structureInfo.conditions.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground">条件分支:</span>
                    <div className="space-y-1 mt-1">
                      {structureInfo.conditions.map((cond, i) => (
                        <div key={i} className="text-xs flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {cond.type}
                          </Badge>
                          <span className="text-muted-foreground">
                            第 {cond.line} 行
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {structureInfo.variables.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground">变量声明:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {structureInfo.variables.slice(0, 10).map((v, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {v}
                        </Badge>
                      ))}
                      {structureInfo.variables.length > 10 && (
                        <Badge variant="outline" className="text-xs">
                          +{structureInfo.variables.length - 10} 更多
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 优化建议 */}
            <Card>
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-xs flex items-center gap-2">
                  <Lightbulb className="h-3 w-3 text-yellow-500" />
                  优化建议
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <div className="space-y-2">
                  {complexityInfo.time.includes('n²') && (
                    <div className="text-xs flex items-start gap-2 p-2 bg-yellow-500/10 rounded">
                      <AlertCircle className="h-3 w-3 text-yellow-500 shrink-0 mt-0.5" />
                      <span>检测到嵌套循环，考虑优化算法或使用更高效的数据结构</span>
                    </div>
                  )}
                  {complexityInfo.bottlenecks.some(b => b.includes('递归')) && (
                    <div className="text-xs flex items-start gap-2 p-2 bg-blue-500/10 rounded">
                      <AlertCircle className="h-3 w-3 text-blue-500 shrink-0 mt-0.5" />
                      <span>包含递归调用，注意栈溢出风险，可考虑改为迭代实现</span>
                    </div>
                  )}
                  {complexityInfo.space.includes('大数组') && (
                    <div className="text-xs flex items-start gap-2 p-2 bg-purple-500/10 rounded">
                      <AlertCircle className="h-3 w-3 text-purple-500 shrink-0 mt-0.5" />
                      <span>使用大数组，注意内存限制，可考虑滚动数组优化</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 头文件检测模式 */}
        {activeMode === 'headers' && headersInfo && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-xs flex items-center gap-2">
                  <Code2 className="h-3 w-3 text-green-500" />
                  已包含的头文件
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <div className="space-y-1">
                  {headersInfo.required.filter(h => !headersInfo.missing.includes(h)).map((header, i) => (
                    <div key={i} className="text-xs font-mono flex items-center gap-2 p-1 bg-green-500/10 rounded">
                      <Check className="h-3 w-3 text-green-500" />
                      {header}
                    </div>
                  ))}
                  {headersInfo.required.filter(h => !headersInfo.missing.includes(h)).length === 0 && (
                    <span className="text-xs text-muted-foreground">暂无检测到的头文件</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {headersInfo.missing.length > 0 && (
              <Card className="border-orange-500/50">
                <CardHeader className="py-2 px-3">
                  <CardTitle className="text-xs flex items-center gap-2 text-orange-500">
                    <AlertCircle className="h-3 w-3" />
                    可能缺失的头文件
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3 space-y-2">
                  {headersInfo.missing.map((header, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <code className="text-xs font-mono text-orange-500">{header}</code>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 text-xs"
                        onClick={() => handleCopy(header)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        复制
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                提示：系统自动检测代码中使用的库函数，并提示可能缺失的头文件。请根据实际情况添加。
              </p>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

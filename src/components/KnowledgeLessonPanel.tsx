'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { KnowledgeLesson } from '@/lib/knowledge-lessons';
import type { KnowledgeNode } from '@/lib/learning-path';
import {
  BookOpen,
  Code,
  Lightbulb,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  FileText,
  Target,
  Play,
} from 'lucide-react';

interface KnowledgeLessonPanelProps {
  lesson: KnowledgeLesson;
  knowledgeNode: KnowledgeNode;
  isCompleted: boolean;
  onClose: () => void;
  onMarkCompleted: () => void;
  onStartProblem: (problemId: string) => void;
  getProblemTitle: (id: string) => string;
  getProblemDifficulty: (id: string) => 'easy' | 'medium' | 'hard';
}

// 简单的Markdown解析器 - 将Markdown转换为React元素
function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';
  let codeKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 代码块处理
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // 结束代码块
        elements.push(
          <div key={`code-${codeKey}`} className="my-4 overflow-hidden rounded-lg">
            <SyntaxHighlighter
              language={codeLanguage || 'text'}
              style={oneDark}
              PreTag="div"
              className="m-0 text-sm"
            >
              {codeContent.trim()}
            </SyntaxHighlighter>
          </div>
        );
        codeContent = '';
        codeLanguage = '';
        codeKey++;
        inCodeBlock = false;
      } else {
        // 开始代码块
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // 空行
    if (!line.trim()) {
      continue;
    }

    // 标题
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-800">
          {line.slice(3)}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-gray-800">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // 列表项
    if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={i} className="ml-4 text-gray-700 leading-relaxed">
          {parseInlineFormatting(line.slice(2))}
        </li>
      );
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '');
      elements.push(
        <li key={i} className="ml-4 text-gray-700 leading-relaxed list-decimal">
          {parseInlineFormatting(text)}
        </li>
      );
      continue;
    }

    // 表格处理
    if (line.startsWith('|')) {
      // 收集表格行
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      i--; // 回退一行
      
      if (tableLines.length >= 2) {
        const headerCells = tableLines[0].split('|').filter(c => c.trim());
        const rows = tableLines.slice(2).map(row => 
          row.split('|').filter(c => c.trim())
        );
        
        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {headerCells.map((cell, idx) => (
                    <th key={idx} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-gray-300 px-4 py-2">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 普通段落
    elements.push(
      <p key={i} className="text-gray-700 leading-relaxed my-2">
        {parseInlineFormatting(line)}
      </p>
    );
  }

  return <>{elements}</>;
}

// 解析行内格式（粗体、代码等）
function parseInlineFormatting(text: string): React.ReactNode {
  // 处理行内代码
  const parts = text.split(/(`[^`]+`)/);
  
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-blue-600">
          {part.slice(1, -1)}
        </code>
      );
    }
    
    // 处理粗体
    const boldParts = part.split(/(\*\*[^*]+\*\*)/);
    if (boldParts.length > 1) {
      return boldParts.map((bp, bpIndex) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${index}-${bpIndex}`}>{bp.slice(2, -2)}</strong>;
        }
        return bp;
      });
    }
    
    return part;
  });
}

export function KnowledgeLessonPanel({
  lesson,
  knowledgeNode,
  isCompleted,
  onClose,
  onMarkCompleted,
  onStartProblem,
  getProblemTitle,
  getProblemDifficulty,
}: KnowledgeLessonPanelProps) {
  const [activeTab, setActiveTab] = useState<'lesson' | 'code' | 'tips'>('lesson');

  // 难度配置
  const difficultyConfig = {
    easy: { label: '简单', color: 'bg-green-100 text-green-800' },
    medium: { label: '中等', color: 'bg-yellow-100 text-yellow-800' },
    hard: { label: '困难', color: 'bg-red-100 text-red-800' },
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      {/* 头部 */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-800">{knowledgeNode.name}</h1>
                {isCompleted && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    已掌握
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">{knowledgeNode.category}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            返回知识点
          </Button>
        </div>
      </div>

      {/* Tab导航 */}
      <div className="px-6 py-3 border-b flex-shrink-0">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="lesson" className="gap-2">
              <BookOpen className="h-4 w-4" />
              讲解
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2">
              <Code className="h-4 w-4" />
              代码示例
            </TabsTrigger>
            <TabsTrigger value="tips" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              要点
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Tabs value={activeTab} className="h-full flex flex-col">
          {/* 讲解Tab */}
          <TabsContent value="lesson" className="m-0 flex-1 min-h-0 overflow-hidden data-[state=active]:flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 pb-8">
              <div className="prose prose-sm max-w-none">
                <SimpleMarkdown content={lesson.content} />
              </div>
            </div>
          </TabsContent>

          {/* 代码示例Tab */}
          <TabsContent value="code" className="m-0 flex-1 min-h-0 overflow-hidden data-[state=active]:flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 pb-8 space-y-6">
              {lesson.codeExamples.map((example, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{example.title}</span>
                      <Badge variant="outline" className="text-xs">C++</Badge>
                    </div>
                  </div>
                  <div className="p-0">
                    <SyntaxHighlighter
                      language="cpp"
                      style={oneDark}
                      PreTag="div"
                      className="m-0 text-sm"
                    >
                      {example.code}
                    </SyntaxHighlighter>
                  </div>
                  {example.explanation && (
                    <div className="px-4 py-2 bg-blue-50 text-sm text-gray-600 border-t">
                      💡 {example.explanation}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 要点Tab */}
          <TabsContent value="tips" className="m-0 flex-1 min-h-0 overflow-hidden data-[state=active]:flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 pb-8 space-y-6">
              {/* 关键要点 */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold text-lg">关键要点</h3>
                </div>
                <ul className="space-y-2">
                  {lesson.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* 常见错误 */}
              <Card className="p-4 border-orange-200 bg-orange-50">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold text-lg text-orange-800">常见错误</h3>
                </div>
                <ul className="space-y-2">
                  {lesson.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Circle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* 学习建议 */}
              <Card className="p-4 border-blue-200 bg-blue-50">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold text-lg text-blue-800">学习建议</h3>
                </div>
                <ul className="space-y-2">
                  {lesson.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* 练习题目 */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold text-lg">练习题目</h3>
                </div>
                <div className="space-y-2">
                  {knowledgeNode.problems.map((problemId) => (
                    <div
                      key={problemId}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => onStartProblem(String(problemId))}
                    >
                      <div className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">{getProblemTitle(String(problemId))}</span>
                      </div>
                      <Badge className={difficultyConfig[getProblemDifficulty(String(problemId))].color}>
                        {difficultyConfig[getProblemDifficulty(String(problemId))].label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部操作栏 */}
      <div className="px-6 py-4 border-t bg-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            返回知识点列表
          </Button>
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <Badge className="bg-green-100 text-green-800 border-green-200 py-2 px-4">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                已掌握此知识点
              </Badge>
            ) : (
              <Button
                onClick={onMarkCompleted}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                标记为已掌握
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  BookOpen, 
  Code, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2,
  Play,
  ChevronRight,
  FileCode
} from 'lucide-react';
import type { KnowledgeLesson } from '@/lib/knowledge-lessons';

interface KnowledgeLessonPanelProps {
  lesson: KnowledgeLesson | null;
  onClose: () => void;
  onStartProblem?: (problemId: number) => void;
  getProblemTitle?: (id: number) => string;
  getProblemDifficulty?: (id: number) => 'easy' | 'medium' | 'hard';
}

export function KnowledgeLessonPanel({
  lesson,
  onClose,
  onStartProblem,
  getProblemTitle,
  getProblemDifficulty
}: KnowledgeLessonPanelProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'examples' | 'tips'>('content');

  if (!lesson) return null;

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getDifficultyLabel = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return '简单';
      case 'medium': return '中等';
      case 'hard': return '困难';
    }
  };

  return (
    <Card className="h-full bg-[#1a1a2e] border-[#2a2a4a] flex flex-col overflow-hidden rounded-none border-0">
      <CardHeader className="flex-shrink-0 border-b border-[#2a2a4a] py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-xl text-white">{lesson.title}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Tab 切换 */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('content')}
            className={`h-9 px-4 text-sm ${
              activeTab === 'content' 
                ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            讲解
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('examples')}
            className={`h-9 px-4 text-sm ${
              activeTab === 'examples' 
                ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Code className="h-4 w-4 mr-2" />
            代码示例
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('tips')}
            className={`h-9 px-4 text-sm ${
              activeTab === 'tips' 
                ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            要点
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full w-full">
          <div className="p-6 space-y-6 pb-12">
            {activeTab === 'content' && (
              <>
                {/* Markdown 内容渲染 */}
                <div className="prose prose-invert prose-sm max-w-none">
                  <div 
                    className="text-gray-300 leading-relaxed space-y-3"
                    dangerouslySetInnerHTML={{ 
                      __html: lesson.content
                        .replace(/## (.*)/g, '<h2 class="text-lg font-semibold text-white mt-4 mb-2">$1</h2>')
                        .replace(/### (.*)/g, '<h3 class="text-base font-medium text-white mt-3 mb-2">$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                        .replace(/`([^`]+)`/g, '<code class="bg-[#2a2a4a] px-1.5 py-0.5 rounded text-blue-300 text-sm">$1</code>')
                        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-[#0d1117] rounded-lg p-3 my-3 overflow-x-auto"><code class="text-sm text-gray-300">$2</code></pre>')
                        .replace(/\n\n/g, '</p><p class="mb-2">')
                        .replace(/^(.+)$/gm, '<p class="mb-2">$1</p>')
                        .replace(/\| (.+) \|/g, (match) => {
                          return `<div class="overflow-x-auto my-3"><table class="min-w-full border-collapse"><tr>${
                            match.split('|').filter(s => s.trim()).map(cell => 
                              `<td class="border border-[#2a2a4a] px-3 py-2 text-gray-300">${cell.trim()}</td>`
                            ).join('')
                          }</tr></table></div>`;
                        })
                    }}
                  />
                </div>

                {/* 相关练习题目 */}
                {lesson.relatedProblems.length > 0 && (
                  <>
                    <Separator className="bg-[#2a2a4a]" />
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <FileCode className="h-5 w-5 text-purple-400" />
                        <span className="text-base font-medium text-white">相关练习题目</span>
                      </div>
                      <div className="space-y-3">
                        {lesson.relatedProblems.map(problemId => (
                          <div 
                            key={problemId}
                            className="flex items-center justify-between p-4 rounded-lg bg-[#0d1117] border border-[#2a2a4a] hover:border-[#3a3a5a] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Badge className={`${getDifficultyColor(
                                getProblemDifficulty?.(problemId) || 'easy'
                              )} text-sm`}>
                                {getDifficultyLabel(getProblemDifficulty?.(problemId) || 'easy')}
                              </Badge>
                              <span className="text-gray-300">
                                {getProblemTitle?.(problemId) || `题目 ${problemId}`}
                              </span>
                            </div>
                            {onStartProblem && (
                              <Button
                                size="sm"
                                onClick={() => onStartProblem(problemId)}
                                className="h-8 px-4 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              >
                                <Play className="h-4 w-4 mr-2" />
                                开始练习
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-6">
                {lesson.codeExamples.map((example, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-sm">
                        示例 {index + 1}
                      </Badge>
                      <span className="text-base font-medium text-white">{example.title}</span>
                    </div>
                    <pre className="bg-[#0d1117] rounded-lg p-4 overflow-x-auto border border-[#2a2a4a]">
                      <code className="text-sm text-gray-300 font-mono whitespace-pre leading-relaxed">
                        {example.code}
                      </code>
                    </pre>
                    <p className="text-sm text-gray-400 bg-[#1e1e3a] rounded-lg p-4 border-l-2 border-blue-500">
                      {example.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-6">
                {/* 关键要点 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-base font-medium text-white">关键要点</span>
                  </div>
                  <ul className="space-y-3">
                    {lesson.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                        <ChevronRight className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-[#2a2a4a]" />

                {/* 常见错误 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <span className="text-base font-medium text-white">常见错误</span>
                  </div>
                  <ul className="space-y-3">
                    {lesson.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                        <ChevronRight className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-[#2a2a4a]" />

                {/* 学习建议 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-400" />
                    <span className="text-base font-medium text-white">学习建议</span>
                  </div>
                  <ul className="space-y-3">
                    {lesson.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                        <ChevronRight className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  EvaluationResults,
  TestCaseResult,
  EvaluateSummary,
} from '@/components/EvaluationResults';
import {
  Play,
  Plus,
  Trash2,
  Clock,
  MemoryStick,
  FileText,
  TestTube2,
} from 'lucide-react';

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
}

interface EvaluationPanelProps {
  code: string;
  defaultTestCases?: TestCase[];
  timeLimit?: number;
  memoryLimit?: number;
}

export function EvaluationPanel({
  code,
  defaultTestCases = [],
  timeLimit = 1000,
  memoryLimit = 128,
}: EvaluationPanelProps) {
  const [testCases, setTestCases] = useState<TestCase[]>(
    defaultTestCases.length > 0
      ? defaultTestCases
      : [{ id: 1, input: '', expectedOutput: '' }]
  );
  const [editingTestCase, setEditingTestCase] = useState<number | null>(null);
  const [newInput, setNewInput] = useState('');
  const [newExpectedOutput, setNewExpectedOutput] = useState('');

  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestCaseResult[] | null>(null);
  const [summary, setSummary] = useState<EvaluateSummary | null>(null);
  const [compileError, setCompileError] = useState<string | null>(null);

  const [customTimeLimit, setCustomTimeLimit] = useState(timeLimit);
  const [customMemoryLimit, setCustomMemoryLimit] = useState(memoryLimit);

  const handleAddTestCase = () => {
    const newId = Math.max(...testCases.map(tc => tc.id), 0) + 1;
    setTestCases([...testCases, { id: newId, input: '', expectedOutput: '' }]);
    setEditingTestCase(newId);
    setNewInput('');
    setNewExpectedOutput('');
  };

  const handleDeleteTestCase = (id: number) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
    if (editingTestCase === id) {
      setEditingTestCase(null);
    }
  };

  const handleSaveTestCase = (id: number) => {
    setTestCases(
      testCases.map(tc =>
        tc.id === id
          ? { id, input: newInput, expectedOutput: newExpectedOutput }
          : tc
      )
    );
    setEditingTestCase(null);
  };

  const handleEditTestCase = (testCase: TestCase) => {
    setEditingTestCase(testCase.id);
    setNewInput(testCase.input);
    setNewExpectedOutput(testCase.expectedOutput);
  };

  const handleRunEvaluation = async () => {
    if (!code.trim()) {
      alert('请先编写代码');
      return;
    }

    const validTestCases = testCases.filter(
      tc => tc.input.trim() !== '' || tc.expectedOutput.trim() !== ''
    );

    if (validTestCases.length === 0) {
      alert('请至少添加一个有效的测试用例');
      return;
    }

    setIsRunning(true);
    setResults(null);
    setSummary(null);
    setCompileError(null);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          testCases: validTestCases,
          timeLimit: customTimeLimit,
          memoryLimit: customMemoryLimit,
        }),
      });

      const data = await response.json();

      if (data.compileError) {
        setCompileError(data.compileError);
      } else if (data.success) {
        setResults(data.results);
        setSummary(data.summary);
      } else {
        alert('评测失败: ' + (data.error || '未知错误'));
      }
    } catch (err) {
      alert('评测请求失败: ' + err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCloseResults = () => {
    setResults(null);
    setSummary(null);
    setCompileError(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TestTube2 className="h-5 w-5 text-primary" />
            <span className="font-semibold">评测系统</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1">
              <Label htmlFor="timeLimit" className="text-sm">
                时间限制
              </Label>
              <Input
                id="timeLimit"
                type="number"
                value={customTimeLimit}
                onChange={(e) => setCustomTimeLimit(Number(e.target.value))}
                className="w-20 h-7 text-sm"
                min={100}
                step={100}
              />
              <span className="text-xs text-muted-foreground">ms</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1">
              <Label htmlFor="memoryLimit" className="text-sm">
                内存限制
              </Label>
              <Input
                id="memoryLimit"
                type="number"
                value={customMemoryLimit}
                onChange={(e) => setCustomMemoryLimit(Number(e.target.value))}
                className="w-20 h-7 text-sm"
                min={16}
                step={16}
              />
              <span className="text-xs text-muted-foreground">MB</span>
            </div>
          </div>
        </div>
        <Button
          onClick={handleRunEvaluation}
          disabled={isRunning}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          {isRunning ? '评测中...' : '开始评测'}
        </Button>
      </div>

      {/* 主内容区 */}
      <Tabs defaultValue="testcases" className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList>
            <TabsTrigger value="testcases" className="gap-2">
              <FileText className="h-4 w-4" />
              测试用例
              <Badge variant="secondary">{testCases.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2" disabled={!results && !compileError}>
              <TestTube2 className="h-4 w-4" />
              评测结果
              {summary && (
                <Badge
                  variant={summary.score === 100 ? 'default' : summary.score > 0 ? 'secondary' : 'destructive'}
                >
                  {summary.score}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="testcases" className="flex-1 m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  共 {testCases.length} 个测试用例
                </span>
                <Button size="sm" variant="outline" onClick={handleAddTestCase} className="gap-2">
                  <Plus className="h-4 w-4" />
                  添加测试用例
                </Button>
              </div>

              {testCases.map((testCase) => {
                const isEditing = editingTestCase === testCase.id;
                const input = isEditing ? newInput : testCase.input;
                const expectedOutput = isEditing ? newExpectedOutput : testCase.expectedOutput;

                return (
                  <Card key={testCase.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">测试点 #{testCase.id}</Badge>
                        {testCase.input.trim() === '' && testCase.expectedOutput.trim() === '' && (
                          <Badge variant="secondary">空</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <Button
                            size="sm"
                            onClick={() => handleSaveTestCase(testCase.id)}
                            className="gap-1"
                          >
                            保存
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditTestCase(testCase)}
                            className="gap-1"
                          >
                            编辑
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteTestCase(testCase.id)}
                          className="gap-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">输入数据</Label>
                        {isEditing ? (
                          <Textarea
                            value={input}
                            onChange={(e) => setNewInput(e.target.value)}
                            placeholder="输入测试数据..."
                            className="font-mono text-sm mt-1 min-h-[80px]"
                          />
                        ) : (
                          <Card className="p-3 mt-1 bg-muted/30">
                            <pre className="text-sm font-mono whitespace-pre-wrap">
                              {input || '(空)'}
                            </pre>
                          </Card>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm">期望输出</Label>
                        {isEditing ? (
                          <Textarea
                            value={expectedOutput}
                            onChange={(e) => setNewExpectedOutput(e.target.value)}
                            placeholder="输入期望输出..."
                            className="font-mono text-sm mt-1 min-h-[80px]"
                          />
                        ) : (
                          <Card className="p-3 mt-1 bg-muted/30">
                            <pre className="text-sm font-mono whitespace-pre-wrap">
                              {expectedOutput || '(空)'}
                            </pre>
                          </Card>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}

              {testCases.length === 0 && (
                <Card className="p-12 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    还没有测试用例
                  </p>
                  <Button onClick={handleAddTestCase} className="gap-2">
                    <Plus className="h-4 w-4" />
                    添加第一个测试用例
                  </Button>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="results" className="flex-1 m-0 p-0">
          {results && summary && (
            <EvaluationResults
              results={results}
              summary={summary}
              compileError={compileError || undefined}
              onClose={handleCloseResults}
            />
          )}
          {!results && !compileError && (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">
                点击"开始评测"按钮查看结果
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

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
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Upload,
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

  const handleExportTestCases = () => {
    const dataStr = JSON.stringify(testCases, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-cases-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportTestCases = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const importedTestCases = JSON.parse(text) as TestCase[];
        
        if (!Array.isArray(importedTestCases)) {
          alert('测试用例格式错误：必须是数组');
          return;
        }

        // 验证每个测试用例的格式
        const validTestCases = importedTestCases.filter(tc => {
          const hasRequiredFields = typeof tc.id === 'number' &&
                                     typeof tc.input === 'string' &&
                                     typeof tc.expectedOutput === 'string';
          if (!hasRequiredFields) {
            console.warn('测试用例格式错误，已跳过:', tc);
          }
          return hasRequiredFields;
        });

        if (validTestCases.length === 0) {
          alert('没有找到有效的测试用例');
          return;
        }

        // 更新 ID 以避免冲突
        const maxId = Math.max(...testCases.map(tc => tc.id), 0);
        const testCasesWithNewIds = validTestCases.map((tc, index) => ({
          ...tc,
          id: maxId + index + 1
        }));

        setTestCases([...testCases, ...testCasesWithNewIds]);
        alert(`成功导入 ${testCasesWithNewIds.length} 个测试用例`);
      } catch (err) {
        alert('导入失败：文件格式错误');
        console.error(err);
      }
    };
    input.click();
  };

  const handleCopyTestCase = (testCase: TestCase) => {
    const maxId = Math.max(...testCases.map(tc => tc.id), 0);
    const newTestCase: TestCase = {
      ...testCase,
      id: maxId + 1
    };
    setTestCases([...testCases, newTestCase]);
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
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleExportTestCases}
                    className="gap-1 h-7"
                    disabled={testCases.length === 0}
                  >
                    <Download className="h-3.5 w-3.5" />
                    导出
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleImportTestCases}
                    className="gap-1 h-7"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    导入
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddTestCase}
                    className="gap-2 h-7"
                  >
                    <Plus className="h-4 w-4" />
                    添加测试用例
                  </Button>
                </div>
              </div>

              {testCases.map((testCase, index) => {
                const isEditing = editingTestCase === testCase.id;
                const input = isEditing ? newInput : testCase.input;
                const expectedOutput = isEditing ? newExpectedOutput : testCase.expectedOutput;

                // 生成输入和输出的预览
                const inputPreview = input.slice(0, 50) + (input.length > 50 ? '...' : '');
                const outputPreview = expectedOutput.slice(0, 50) + (expectedOutput.length > 50 ? '...' : '');
                const isEmpty = testCase.input.trim() === '' && testCase.expectedOutput.trim() === '';

                return (
                  <Card key={testCase.id} className={`overflow-hidden ${isEmpty ? 'border-dashed' : ''}`}>
                    {/* 测试用例头部 */}
                    <div 
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => {
                        if (!isEditing) {
                          handleEditTestCase(testCase);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">测试点 #{testCase.id}</span>
                            {isEmpty && <Badge variant="secondary" className="text-xs">空</Badge>}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">
                              输入: <span className="font-mono">{inputPreview || '(空)'}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                              输出: <span className="font-mono">{outputPreview || '(空)'}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveTestCase(testCase.id);
                              }}
                              className="gap-1 h-7"
                            >
                              保存
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTestCase(null);
                              }}
                              className="gap-1 h-7"
                            >
                              取消
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyTestCase(testCase);
                              }}
                              className="gap-1 h-7 px-2"
                              title="复制测试用例"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditTestCase(testCase);
                              }}
                              className="gap-1 h-7"
                            >
                              编辑
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTestCase(testCase.id);
                              }}
                              className="gap-1 text-red-500 hover:text-red-700 h-7 px-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 编辑模式下的详细内容 */}
                    {isEditing && (
                      <div className="border-t bg-muted/20 p-4 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">输入数据</Label>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setNewInput('')}
                              className="text-xs h-6"
                            >
                              清空
                            </Button>
                          </div>
                          <Textarea
                            value={input}
                            onChange={(e) => setNewInput(e.target.value)}
                            placeholder="输入测试数据..."
                            className="font-mono text-sm min-h-[100px] resize-none"
                            rows={4}
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">期望输出</Label>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setNewExpectedOutput('')}
                              className="text-xs h-6"
                            >
                              清空
                            </Button>
                          </div>
                          <Textarea
                            value={expectedOutput}
                            onChange={(e) => setNewExpectedOutput(e.target.value)}
                            placeholder="输入期望输出..."
                            className="font-mono text-sm min-h-[100px] resize-none"
                            rows={4}
                          />
                        </div>
                      </div>
                    )}
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

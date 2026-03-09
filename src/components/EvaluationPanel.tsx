'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
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
  Edit3,
  Maximize2,
  FileCode,
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
  onResultsChange?: (results: TestCaseResult[] | null, summary: EvaluateSummary | null) => void;
}

export function EvaluationPanel({
  code,
  defaultTestCases = [],
  timeLimit = 1000,
  memoryLimit = 128,
  onResultsChange,
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

  // 当评测结果变化时通知父组件
  useEffect(() => {
    if (onResultsChange) {
      onResultsChange(results, summary);
    }
  }, [results, summary, onResultsChange]);

  // 注释掉freopen语句（用于标准评测）
  const commentOutFreopen = (sourceCode: string): string => {
    const lines = sourceCode.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      // 匹配 freopen(...) 语句
      if (trimmed.startsWith('freopen(') && (trimmed.includes('"r"') || trimmed.includes('"w"'))) {
        // 如果已经注释，保持不变
        if (trimmed.startsWith('//')) {
          return line;
        }
        // 添加注释
        return line.replace(trimmed, '// ' + trimmed);
      }
      // 匹配 fclose(stdin) 和 fclose(stdout)
      if (trimmed === 'fclose(stdin);' || trimmed === 'fclose(stdout);') {
        if (trimmed.startsWith('//')) {
          return line;
        }
        return line.replace(trimmed, '// ' + trimmed);
      }
      return line;
    });
    return processedLines.join('\n');
  };

  // 取消freopen语句的注释（用于NOIP评测）
  const uncommentFreopen = (sourceCode: string): string => {
    const lines = sourceCode.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      // 匹配被注释的 freopen(...) 语句
      if (trimmed.startsWith('//') && trimmed.includes('freopen(')) {
        // 移除注释
        return line.replace(/\/\/\s*/, '');
      }
      // 匹配被注释的 fclose 语句
      if (trimmed.startsWith('//') && (trimmed.includes('fclose(stdin)') || trimmed.includes('fclose(stdout)'))) {
        return line.replace(/\/\/\s*/, '');
      }
      return line;
    });
    return processedLines.join('\n');
  };

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

    // 标准评测：自动注释掉freopen语句
    const processedCode = commentOutFreopen(code);

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
          code: processedCode,
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

  // NOIP文件格式评测
  const handleNoipEvaluation = async () => {
    if (!code.trim()) {
      alert('请先编写代码');
      return;
    }

    // NOIP评测：自动取消freopen语句的注释
    const processedCode = uncommentFreopen(code);

    // 检查是否包含freopen语句
    if (!processedCode.includes('freopen')) {
      alert('NOIP评测需要代码中包含freopen语句\n示例:\nfreopen("xxx.in", "r", stdin);\nfreopen("xxx.out", "w", stdout);');
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
      const response = await fetch('/api/evaluate-noip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: processedCode,
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
        alert('NOIP评测失败: ' + (data.error || '未知错误'));
      }
    } catch (err) {
      alert('NOIP评测请求失败: ' + err);
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
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRunEvaluation}
            disabled={isRunning}
            variant="outline"
            className="gap-2"
          >
            <Play className="h-4 w-4" />
            {isRunning ? '评测中...' : '标准评测'}
          </Button>
          <Button
            onClick={handleNoipEvaluation}
            disabled={isRunning}
            className="gap-2"
          >
            <FileCode className="h-4 w-4" />
            {isRunning ? '评测中...' : 'NOIP评测'}
          </Button>
        </div>
      </div>

      {/* 主内容区 */}
      <Tabs defaultValue="testcases" className="flex-1 flex flex-col min-h-0">
        <div className="border-b px-4 flex-shrink-0">
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

        <TabsContent value="testcases" className="flex-1 m-0 p-0 min-h-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-3">
              {/* 工具栏 */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b flex-shrink-0">
                <span className="text-xs text-muted-foreground">
                  共 {testCases.length} 个测试用例
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleExportTestCases}
                    className="gap-1 h-7"
                    disabled={testCases.length === 0}
                    title="导出测试用例"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleImportTestCases}
                    className="gap-1 h-7"
                    title="导入测试用例"
                  >
                    <Upload className="h-3.5 w-3.5" />
                  </Button>
                  <Separator orientation="vertical" className="h-5 mx-1" />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddTestCase}
                    className="gap-1 h-7"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    添加
                  </Button>
                </div>
              </div>

              {/* 测试用例列表 - 使用紧凑设计 */}
              <div className="space-y-2">
                {testCases.map((testCase, index) => {
                  // 生成输入和输出的预览
                  const inputPreview = testCase.input.slice(0, 30) + (testCase.input.length > 30 ? '...' : '');
                  const outputPreview = testCase.expectedOutput.slice(0, 30) + (testCase.expectedOutput.length > 30 ? '...' : '');
                  const isEmpty = testCase.input.trim() === '' && testCase.expectedOutput.trim() === '';

                  return (
                    <Card 
                      key={testCase.id} 
                      className={`overflow-hidden hover:shadow-sm transition-shadow flex-shrink-0 ${isEmpty ? 'border-dashed bg-muted/30' : ''}`}
                    >
                      <div className="flex items-center gap-2 p-2">
                        {/* 序号 */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-[11px] font-bold flex-shrink-0">
                          {index + 1}
                        </div>

                        {/* 内容预览 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium truncate">#{testCase.id}</span>
                            {isEmpty && <Badge variant="secondary" className="text-[10px] px-1 h-4">空</Badge>}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[120px]">
                              {inputPreview || '(空)'}
                            </span>
                            <span className="text-[10px] text-muted-foreground">→</span>
                            <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[120px]">
                              {outputPreview || '(空)'}
                            </span>
                          </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyTestCase(testCase)}
                            className="gap-1 h-6 w-6 p-0"
                            title="复制"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditTestCase(testCase)}
                            className="gap-1 h-6 w-6 p-0"
                            title="编辑"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteTestCase(testCase.id)}
                            className="gap-1 h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            title="删除"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}

                {testCases.length === 0 && (
                  <Card className="p-8 text-center">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      还没有测试用例
                    </p>
                    <Button onClick={handleAddTestCase} size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      添加第一个测试用例
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="results" className="flex-1 m-0 p-0 min-h-0 overflow-hidden">
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

      {/* 编辑测试用例对话框 */}
      <Dialog open={editingTestCase !== null} onOpenChange={(open) => !open && setEditingTestCase(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingTestCase ? `编辑测试用例 #${editingTestCase}` : '编辑测试用例'}
            </DialogTitle>
            <DialogDescription>
              编辑测试用例的输入数据和期望输出。修改后点击保存即可更新。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">输入数据</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setNewInput('')}
                  className="text-xs h-7"
                >
                  清空
                </Button>
              </div>
              <Textarea
                value={newInput}
                onChange={(e) => setNewInput(e.target.value)}
                placeholder="输入测试数据..."
                className="font-mono text-sm min-h-[120px]"
                rows={5}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">期望输出</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setNewExpectedOutput('')}
                  className="text-xs h-7"
                >
                  清空
                </Button>
              </div>
              <Textarea
                value={newExpectedOutput}
                onChange={(e) => setNewExpectedOutput(e.target.value)}
                placeholder="输入期望输出..."
                className="font-mono text-sm min-h-[120px]"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingTestCase(null)}
            >
              取消
            </Button>
            <Button
              onClick={() => editingTestCase && handleSaveTestCase(editingTestCase)}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

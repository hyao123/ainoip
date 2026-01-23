'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Code2, ListChecks, AlertCircle } from 'lucide-react';

// 题目数据类型
interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  defaultCode: string;
}

// 预设题目
const problems: Problem[] = [
  {
    id: 1,
    title: 'A + B 问题',
    difficulty: 'easy',
    description: '输入两个整数，输出它们的和。',
    inputFormat: '输入包含两个整数 a, b，用空格分隔。',
    outputFormat: '输出一个整数，表示 a + b 的值。',
    sampleInput: '1 2',
    sampleOutput: '3',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}'
  },
  {
    id: 2,
    title: '斐波那契数列',
    difficulty: 'easy',
    description: '求斐波那契数列的第 n 项。斐波那契数列定义为：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) (n≥2)。',
    inputFormat: '输入一个整数 n，表示要求的项数。',
    outputFormat: '输出斐波那契数列的第 n 项。',
    sampleInput: '5',
    sampleOutput: '5',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    if (n == 0) {\n        cout << 0 << endl;\n        return 0;\n    }\n    if (n == 1) {\n        cout << 1 << endl;\n        return 0;\n    }\n    \n    int a = 0, b = 1, c;\n    for (int i = 2; i <= n; i++) {\n        c = a + b;\n        a = b;\n        b = c;\n    }\n    cout << b << endl;\n    return 0;\n}'
  },
  {
    id: 3,
    title: '最大公约数',
    difficulty: 'medium',
    description: '求两个正整数的最大公约数（GCD）。',
    inputFormat: '输入两个正整数 a, b，用空格分隔。',
    outputFormat: '输出一个整数，表示 a 和 b 的最大公约数。',
    sampleInput: '12 18',
    sampleOutput: '6',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint gcd(int a, int b) {\n    while (b) {\n        int t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << gcd(a, b) << endl;\n    return 0;\n}'
  },
  {
    id: 4,
    title: '快速排序',
    difficulty: 'hard',
    description: '实现快速排序算法，对给定的数组进行升序排序。',
    inputFormat: '第一行输入 n，表示数组长度；第二行输入 n 个整数，用空格分隔。',
    outputFormat: '输出排序后的数组，用空格分隔。',
    sampleInput: '5\n3 1 4 1 5',
    sampleOutput: '1 1 3 4 5',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nvoid quickSort(int arr[], int left, int right) {\n    if (left >= right) return;\n    \n    int pivot = arr[(left + right) / 2];\n    int i = left, j = right;\n    \n    while (i <= j) {\n        while (arr[i] < pivot) i++;\n        while (arr[j] > pivot) j--;\n        if (i <= j) {\n            swap(arr[i], arr[j]);\n            i++;\n            j--;\n        }\n    }\n    \n    quickSort(arr, left, j);\n    quickSort(arr, i, right);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    int arr[10005];\n    \n    for (int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n    \n    quickSort(arr, 0, n - 1);\n    \n    for (int i = 0; i < n; i++) {\n        cout << arr[i];\n        if (i < n - 1) cout << " ";\n    }\n    cout << endl;\n    return 0;\n}'
  }
];

export default function Home() {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(problems[0]);
  const [code, setCode] = useState('#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在此编写你的代码\n    \n    return 0;\n}');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
    setCode('#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在此编写你的代码\n    \n    return 0;\n}');
    setInput(problem.sampleInput);
    setOutput('');
    setError('');
    setShowSolution(false);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setCode(selectedProblem.defaultCode);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');

    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          input: input || selectedProblem.sampleInput,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      setError('运行失败，请检查代码是否正确');
    } finally {
      setIsRunning(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/10 text-green-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'hard':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '入门';
      case 'medium':
        return '普及';
      case 'hard':
        return '提高';
      default:
        return '未知';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* 左侧边栏 - 题目列表 */}
      <aside className="w-64 border-r bg-muted/30">
        <div className="flex h-16 items-center border-b px-4">
          <Code2 className="mr-2 h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold">NOIP 算法题库</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-1 p-2">
            {problems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => handleProblemSelect(problem)}
                className={`w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent ${
                  selectedProblem.id === problem.id ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium">{problem.title}</span>
                  <span
                    className={`ml-2 rounded px-1.5 py-0.5 text-[10px] ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {getDifficultyText(problem.difficulty)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* 主内容区 */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{selectedProblem.title}</h2>
            <Separator orientation="vertical" className="h-6" />
            <span
              className={`rounded px-2 py-1 text-xs ${getDifficultyColor(
                selectedProblem.difficulty
              )}`}
            >
              {getDifficultyText(selectedProblem.difficulty)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {!showSolution && (
              <Button
                onClick={handleShowSolution}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Code2 className="h-4 w-4" />
                查看答案
              </Button>
            )}
            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              {isRunning ? '运行中...' : '运行代码'}
            </Button>
          </div>
        </header>

        {/* 内容区域 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 题目描述区 */}
          <div className="w-[450px] border-r overflow-hidden">
            <ScrollArea className="h-full px-6 py-4">
              <div className="prose prose-sm dark:prose-invert">
                <h3 className="text-base font-semibold">题目描述</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedProblem.description}
                </p>

                <h3 className="mt-4 text-base font-semibold">输入格式</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedProblem.inputFormat}
                </p>

                <h3 className="mt-4 text-base font-semibold">输出格式</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedProblem.outputFormat}
                </p>

                <Tabs defaultValue="input" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="input" className="gap-2">
                      <ListChecks className="h-4 w-4" />
                      样例输入
                    </TabsTrigger>
                    <TabsTrigger value="output" className="gap-2">
                      <Code2 className="h-4 w-4" />
                      样例输出
                    </TabsTrigger>
                    <TabsTrigger value="solution" className="gap-2">
                      <Code2 className="h-4 w-4" />
                      参考答案
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="input">
                    <Card className="p-4">
                      <pre className="text-sm text-muted-foreground">
                        {selectedProblem.sampleInput}
                      </pre>
                    </Card>
                  </TabsContent>
                  <TabsContent value="output">
                    <Card className="p-4">
                      <pre className="text-sm text-muted-foreground">
                        {selectedProblem.sampleOutput}
                      </pre>
                    </Card>
                  </TabsContent>
                  <TabsContent value="solution">
                    {showSolution ? (
                      <Card className="p-4">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {selectedProblem.defaultCode}
                        </pre>
                      </Card>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8">
                        <p className="text-sm text-muted-foreground">先试试自己解决问题吧！</p>
                        <Button onClick={handleShowSolution} variant="outline" size="sm">
                          查看答案
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </div>

          {/* 代码编辑器和测试区 */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* 代码编辑器 */}
            <div className="flex-1 border-b">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="text-sm font-medium">main.cpp</span>
                <span className="text-xs text-muted-foreground">C++ 17</span>
              </div>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-full resize-none rounded-none border-0 font-mono text-sm focus-visible:ring-0"
                placeholder="// 在此编写你的代码..."
                spellCheck={false}
              />
            </div>

            {/* 测试输入输出 */}
            <div className="h-1/3 flex">
              {/* 输入 */}
              <div className="w-1/2 border-r">
                <div className="flex items-center border-b px-4 py-2">
                  <span className="text-sm font-medium">测试输入</span>
                </div>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-[calc(100%-3rem)] resize-none rounded-none border-0 font-mono text-xs focus-visible:ring-0"
                  placeholder="输入测试数据..."
                  spellCheck={false}
                />
              </div>

              {/* 输出 */}
              <div className="w-1/2">
                <div className="flex items-center border-b px-4 py-2">
                  <span className="text-sm font-medium">运行结果</span>
                </div>
                {error ? (
                  <div className="flex h-[calc(100%-3rem)] items-center justify-center bg-destructive/10 p-4">
                    <div className="flex items-start gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4 mt-0.5" />
                      <span className="text-xs">{error}</span>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    value={output}
                    readOnly
                    className="h-[calc(100%-3rem)] resize-none rounded-none border-0 bg-muted/30 font-mono text-xs focus-visible:ring-0"
                    placeholder="运行结果将显示在这里..."
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

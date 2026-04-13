'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Code2, ListChecks, ChevronDown, ChevronRight, Keyboard, HelpCircle, TestTube2, X, Target, BookOpen, Database, User, Sparkles, Map, Compass, Trophy, Flame, Rocket, Zap, Settings, BookMarked, AlertTriangle, Search, BarChart3 } from 'lucide-react';
import { SmartCodeEditor, type EditorSettings, type EditorLanguage } from '@/components/SmartCodeEditor';
import { InputPanel } from '@/components/InputPanel';
import { OutputPanel } from '@/components/OutputPanel';
import { NOIPTemplateHint } from '@/components/NOIPTemplateHint';
import { TestCasesPanel } from '@/components/TestCasesPanel';
import { ShortcutsHelp } from '@/components/ShortcutsHelp';
import { EvaluationPanel } from '@/components/EvaluationPanel';
import { AIAssistantPanel } from '@/components/AIAssistantPanel';
import { KnowledgeMapPage } from '@/components/KnowledgeMapPage';
import { LearningPathView } from '@/components/LearningPathView';

import { UserCenterPage } from '@/components/UserCenterPage';
import { AlgorithmDemoPage } from '@/components/AlgorithmDemoPage';
import { CheatSheetPage } from '@/components/CheatSheetPage';
import { CommonMistakesPage } from '@/components/CommonMistakesPage';
import { AnalyticsPage } from '@/components/AnalyticsPage';
import { AILogoWithText } from '@/components/AILogo';
import { ProgressiveHint } from '@/components/ProgressiveHint';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SuccessCelebration } from '@/components/SuccessCelebration';
import { ProblemNavigation } from '@/components/ProblemNavigation';
import { GlobalSearch } from '@/components/GlobalSearch';
import { StatisticsDashboard } from '@/components/StatisticsDashboard';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import type { TestCaseResult, EvaluateSummary } from '@/components/EvaluationResults';

import { ProblemBankPage, mapDifficulty } from '@/components/ProblemBankPage';
import type { Problem as BankProblem, DifficultyLevel } from '@/lib/problems';
import { getProblemById, problems as allProblems } from '@/lib/problems';
import { getProblemHints, generateGenericHints, type ProblemHints, type HintLevel } from '@/lib/hints';
import { addSubmission, getUserPointsAndHints, useHint, getProblemHintUsage } from '@/lib/user-learning-data';
import { getKnowledgeById } from '@/lib/knowledge-map';

// 测试用例类型
interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
}

// 题目数据类型 - 使用 lib/problems 中的类型
type Problem = BankProblem;

// 分类类型
interface Category {
  name: string;
  icon: string;
  problems: Problem[];
}

// 预设题目 - 按分类和年份组织

// 按分类和难度组织题目（按从易到难排序）- 使用完整题库
const categories: Category[] = [
  {
    name: '语法基础',
    icon: '📖',
    problems: allProblems.filter(p => p.category === '语法基础').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '基础算法',
    icon: '📚',
    problems: allProblems.filter(p => p.category === '基础算法').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '字符串处理',
    icon: '📝',
    problems: allProblems.filter(p => p.category === '字符串处理').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '数论',
    icon: '🔢',
    problems: allProblems.filter(p => p.category === '数论').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '模拟',
    icon: '🎮',
    problems: allProblems.filter(p => p.category === '模拟').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '动态规划',
    icon: '💡',
    problems: allProblems.filter(p => p.category === '动态规划').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '图论',
    icon: '🕸️',
    problems: allProblems.filter(p => p.category === '图论').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '搜索',
    icon: '🔎',
    problems: allProblems.filter(p => p.category === '搜索').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '数据结构',
    icon: '🏗️',
    problems: allProblems.filter(p => p.category === '数据结构').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
  {
    name: '贪心',
    icon: '🎯',
    problems: allProblems.filter(p => p.category === '贪心').sort((a, b) => {
      const diffMap: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'easy': 1, 'medium': 2, 'hard': 3 };
      return (diffMap[a.difficulty] || 5) - (diffMap[b.difficulty] || 5);
    })
  },
];

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedProblem, setSelectedProblem] = useState<Problem>(allProblems[0]);
  const [code, setCode] = useState('#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在此编写你的代码\n    \n    return 0;\n}');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState<TestCaseResult[] | null>(null);
  const [evaluationSummary, setEvaluationSummary] = useState<EvaluateSummary | null>(null);
  const [currentView, setCurrentView] = useState<'practice' | 'learning' | 'bank' | 'user' | 'map' | 'algorithm' | 'cheatsheet' | 'mistakes' | 'analytics'>('learning');
  const [initialKnowledgeSlug, setInitialKnowledgeSlug] = useState<string | undefined>(undefined);
  const [expectedOutput, setExpectedOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories.map(c => c.name)));
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [showTestPanel, setShowTestPanel] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'test' | 'output'>('input');
  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    theme: 'vs-dark',
    language: 'cpp',
    fontSize: 14,
  });
  
  // 渐进式提示系统状态
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [userPoints, setUserPoints] = useState(100);
  const [dailyHintsRemaining, setDailyHintsRemaining] = useState(5);
  const [usedHintLevels, setUsedHintLevels] = useState<HintLevel[]>([]);
  
  // 全局搜索状态
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  
  // 键盘快捷键
  useKeyboardShortcut([
    {
      key: 'k',
      metaKey: true,
      callback: () => setShowGlobalSearch(true),
      description: '全局搜索',
    },
    {
      key: 'Escape',
      callback: () => {
        setShowGlobalSearch(false);
        setShowShortcutsHelp(false);
      },
      description: '关闭弹窗',
    },
  ]);
  
  // 根据 URL 参数设置当前视图
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam && ['practice', 'learning', 'bank', 'user', 'map', 'algorithm'].includes(viewParam)) {
      setCurrentView(viewParam as 'practice' | 'learning' | 'bank' | 'user' | 'map' | 'algorithm');
    }
    
    // 处理 problem 参数，自动选择指定题目
    const problemParam = searchParams.get('problem');
    if (problemParam) {
      const problemId = parseInt(problemParam);
      const problem = getProblemById(problemId);
      if (problem) {
        handleBankProblemSelect(problem);
      }
    }
  }, [searchParams]);

  // 初始化用户积分和提示次数
  useEffect(() => {
    const { points, hintsUsedToday, dailyHintsRemaining: remaining } = getUserPointsAndHints();
    setUserPoints(points);
    setDailyHintsRemaining(remaining);
  }, []);

  // 当选择新题目时，加载该题目的提示使用记录
  useEffect(() => {
    const usedLevels = getProblemHintUsage(selectedProblem.id) as HintLevel[];
    setUsedHintLevels(usedLevels);
  }, [selectedProblem.id]);

  // 获取当前题目的提示数据
  const problemHints: ProblemHints | undefined = getProblemHints(selectedProblem.id) || 
    generateGenericHints(
      selectedProblem.id,
      selectedProblem.title,
      selectedProblem.category,
      selectedProblem.difficulty,
      selectedProblem.defaultCode
    );

  // 处理提示使用
  const handleHintUsed = (level: HintLevel) => {
    const result = useHint(selectedProblem.id, level, problemHints?.hints[level - 1]?.cost || 5);
    if (result.success) {
      setUserPoints(result.points);
      setDailyHintsRemaining(5 - result.hintsUsedToday);
      setUsedHintLevels(prev => [...prev, level]);
    }
  };

  // 初始化样例输入和期望输出
  useEffect(() => {
    setInput(selectedProblem.sampleInput);
    setExpectedOutput(selectedProblem.sampleOutput);
  }, [selectedProblem]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
    setCode('#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在此编写你的代码\n    \n    return 0;\n}');
    setInput(problem.sampleInput);
    setExpectedOutput(problem.sampleOutput);
    setOutput('');
    setError('');
    setShowSolution(false);
    setShowEvaluation(false);
  };

  // 从智能题库选择题目时的处理函数
  const handleBankProblemSelect = (bankProblem: BankProblem) => {
    // 直接使用BankProblem，因为Problem现在是BankProblem的别名
    handleProblemSelect(bankProblem);
    // 切换到练习视图以显示题目详情
    setCurrentView('practice');
  };

  // 从学习路径页面跳转到题目练习
  const handleStartProblemById = (problemId: number) => {
    const bankProblem = getProblemById(problemId);
    if (bankProblem) {
      handleBankProblemSelect(bankProblem);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setCode(selectedProblem.defaultCode);
  };

  const handleRunCode = async (testInput?: string) => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setActiveTab('output');

    const startTime = Date.now();

    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          input: testInput || input || selectedProblem.sampleInput,
        }),
      });

      const data = await response.json();
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);

      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data.output || '');
      }
    } catch (err) {
      setError('运行失败，请检查代码是否正确');
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTest = (testInput: string, testExpectedOutput: string) => {
    setExpectedOutput(testExpectedOutput);
    setActiveTab('output');
    handleRunCode(testInput);
  };

  const getDifficultyColor = (difficulty: string) => {
    // 支持 beginner/intermediate/advanced/expert 和 easy/medium/hard 两种难度系统
    switch (difficulty) {
      case 'easy':
      case 'beginner':
        return 'bg-green-500/10 text-green-500';
      case 'medium':
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'hard':
      case 'advanced':
        return 'bg-orange-500/10 text-orange-500';
      case 'expert':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    // 支持 beginner/intermediate/advanced/expert 和 easy/medium/hard 两种难度系统
    switch (difficulty) {
      case 'easy':
      case 'beginner':
        return '入门';
      case 'medium':
      case 'intermediate':
        return '提高';
      case 'hard':
      case 'advanced':
        return '省选';
      case 'expert':
        return 'NOI';
      default:
        return '未知';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* 顶部导航栏 - 纯导航 */}
      <header className="h-12 border-b bg-background flex items-center justify-between px-4 shrink-0">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setCurrentView('learning')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'learning'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Rocket className="h-4 w-4" />
            学习路径
          </button>
          <button
            onClick={() => setCurrentView('map')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'map'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            知识地图
          </button>
          <button
            onClick={() => setCurrentView('practice')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'practice'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Target className="h-4 w-4" />
            练习题库
          </button>
          <button
            onClick={() => setCurrentView('algorithm')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'algorithm'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Zap className="h-4 w-4" />
            算法演示
          </button>
          <button
            onClick={() => setCurrentView('cheatsheet')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'cheatsheet'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <BookMarked className="h-4 w-4" />
            速查表
          </button>
          <button
            onClick={() => setCurrentView('mistakes')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'mistakes'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            常见错误
          </button>
          <button
            onClick={() => setCurrentView('analytics')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'analytics'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            数据分析
          </button>
          <button
            onClick={() => setCurrentView('user')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'user'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Flame className="h-4 w-4" />
            个人中心
          </button>
        </nav>
        
        {/* 右侧工具栏 */}
        <div className="flex items-center gap-1">
          {/* 全局搜索按钮 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowGlobalSearch(true)}
            className="h-8 px-3 gap-2 text-muted-foreground hover:text-foreground"
            title="全局搜索 (⌘K)"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline text-xs">搜索</span>
            <kbd className="hidden md:inline-flex h-4 items-center gap-0.5 rounded border bg-muted px-1 font-mono text-[10px]">
              ⌘K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowShortcutsHelp(true)}
            className="h-8 w-8 p-0"
            title="快捷键帮助"
          >
            <Keyboard className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* 下方内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧边栏 - 仅在题库练习和智能题库时显示 */}
        {(currentView === 'practice' || currentView === 'bank') && (
          <aside className="w-72 border-r bg-muted/30 flex flex-col shrink-0">
            {/* 左侧边栏标题 - AI风格Logo */}
            <div className="h-12 border-b bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 flex items-center px-3 shrink-0">
              <AILogoWithText size="default" />
            </div>
            
            {currentView === 'practice' ? (
              <ScrollArea className="flex-1">
                <div className="space-y-0.5 p-1.5">
                  {categories.map((category) => (
                    <div key={category.name}>
                      {/* 分类标题 */}
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left font-medium hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{category.icon}</span>
                          <span className="text-xs">{category.name}</span>
                          <span className="text-[10px] text-muted-foreground">
                            ({category.problems.length})
                          </span>
                        </div>
                        {expandedCategories.has(category.name) ? (
                          <ChevronDown className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        )}
                      </button>

                      {/* 分类下的题目列表 */}
                      {expandedCategories.has(category.name) && (
                        <div className="ml-1 mt-0.5 space-y-0.5">
                          {category.problems.map((problem) => (
                            <button
                              key={problem.id}
                              onClick={() => handleProblemSelect(problem)}
                              className={`w-full rounded-md px-2.5 py-1.5 text-left transition-colors hover:bg-accent ${
                                selectedProblem.id === problem.id ? 'bg-accent' : ''
                              }`}
                            >
                              <div className="flex flex-col gap-0.5">
                                <div className="flex items-start justify-between">
                                  <span className="text-xs font-medium truncate flex-1">{problem.title}</span>
                                  <span
                                    className={`ml-1.5 shrink-0 rounded px-1 py-0.5 text-[9px] ${getDifficultyColor(
                                      problem.difficulty
                                    )}`}
                                  >
                                    {getDifficultyText(problem.difficulty)}
                                  </span>
                                </div>
                                {problem.year && (
                                  <span className="text-[10px] text-muted-foreground">
                                    NOIP {problem.year}
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <ProblemBankPage onSelectProblem={handleBankProblemSelect} />
            )}
          </aside>
        )}

        {/* 主内容区 */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {currentView === 'learning' ? (
            <LearningPathView 
              onStartProblem={(problemId) => handleStartProblemById(problemId)}
              onNavigate={(view) => setCurrentView(view)}
              onNavigateToKnowledge={(slug) => setInitialKnowledgeSlug(slug)}
            />
          ) : currentView === 'map' ? (
            <KnowledgeMapPage 
              onStartProblem={(problemId) => handleStartProblemById(problemId)}
            />
          ) : currentView === 'user' ? (
            <UserCenterPage onSelectProblem={handleStartProblemById} />
          ) : currentView === 'algorithm' ? (
            <AlgorithmDemoPage />
          ) : currentView === 'cheatsheet' ? (
            <CheatSheetPage />
          ) : currentView === 'analytics' ? (
            <AnalyticsPage />
          ) : currentView === 'mistakes' ? (
            <CommonMistakesPage />
          ) : (
            <>
              {/* 顶部导航栏 - 紧凑 */}
              <header className="flex h-12 items-center justify-between border-b px-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-semibold truncate max-w-[200px]">{selectedProblem.title}</h2>
                  <Separator orientation="vertical" className="h-5" />
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] ${getDifficultyColor(
                      selectedProblem.difficulty
                    )}`}
                  >
                    {getDifficultyText(selectedProblem.difficulty)}
                  </span>
                  
                  {/* 题目导航 */}
                  {currentView === 'practice' && (
                    <ProblemNavigation
                      currentProblemId={selectedProblem.id}
                      problems={categories.flatMap(c => c.problems)}
                      onNavigate={(problem) => handleProblemSelect(problem)}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!showEvaluation && (
                    <>
                      <Button
                        onClick={() => setShowEvaluation(true)}
                        variant="outline"
                        size="sm"
                        className="gap-1.5 h-7 text-xs"
                      >
                        <TestTube2 className="h-3.5 w-3.5" />
                        评测
                      </Button>
                      <Button
                        onClick={handleShowSolution}
                        variant="outline"
                        size="sm"
                        className="gap-1.5 h-7 text-xs"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        答案
                      </Button>
                      <Button
                        onClick={() => handleRunCode()}
                        disabled={isRunning}
                        className="gap-1.5 h-7 text-xs"
                      >
                        <Play className="h-3.5 w-3.5" />
                        {isRunning ? '运行中...' : '运行'}
                      </Button>
                    </>
                  )}
                  {showEvaluation && (
                    <Button
                      onClick={() => setShowEvaluation(false)}
                      variant="outline"
                      size="sm"
                      className="gap-1.5 h-7 text-xs"
                    >
                      <X className="h-3.5 w-3.5" />
                      关闭
                    </Button>
                  )}
                </div>
              </header>

              {/* 内容区域 */}
              <div className="flex flex-1 overflow-hidden">
          {/* 题目描述区 - 紧凑 */}
          <div className="w-[380px] border-r overflow-hidden">
            <ScrollArea className="h-full px-4 py-3">
              <div className="prose prose-sm dark:prose-invert prose-headings:mb-2 prose-headings:mt-3 prose-p:my-1.5">
                <h3 className="text-sm font-semibold">题目描述</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {selectedProblem.description}
                </p>

                <h3 className="text-sm font-semibold">输入格式</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {selectedProblem.inputFormat}
                </p>

                <h3 className="text-sm font-semibold">输出格式</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {selectedProblem.outputFormat}
                </p>

                {/* NOIP 模板提示 */}
                <div className="mt-4">
                  <NOIPTemplateHint />
                </div>

                <Tabs defaultValue="input" className="mt-4">
                  <TabsList className="h-8">
                    <TabsTrigger value="input" className="gap-1.5 text-xs h-7">
                      <ListChecks className="h-3 w-3" />
                      样例输入
                    </TabsTrigger>
                    <TabsTrigger value="output" className="gap-1.5 text-xs h-7">
                      <Code2 className="h-3 w-3" />
                      样例输出
                    </TabsTrigger>
                    <TabsTrigger value="hints" className="gap-1.5 text-xs h-7">
                      <Sparkles className="h-3 w-3" />
                      智能提示
                      <span className="ml-1 rounded-full bg-primary/20 px-1.5 text-[9px]">
                        {dailyHintsRemaining}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="solution" className="gap-1.5 text-xs h-7">
                      <Code2 className="h-3 w-3" />
                      参考答案
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="input">
                    <Card className="p-3">
                      <pre className="text-xs text-muted-foreground">
                        {selectedProblem.sampleInput}
                      </pre>
                    </Card>
                  </TabsContent>
                  <TabsContent value="output">
                    <Card className="p-3">
                      <pre className="text-xs text-muted-foreground">
                        {selectedProblem.sampleOutput}
                      </pre>
                    </Card>
                  </TabsContent>
                  <TabsContent value="hints" className="mt-2">
                    <ProgressiveHint
                      problemId={selectedProblem.id}
                      problemHints={problemHints}
                      onHintUsed={handleHintUsed}
                      userPoints={userPoints}
                      dailyHintsRemaining={dailyHintsRemaining}
                    />
                  </TabsContent>
                  <TabsContent value="solution">
                    {showSolution ? (
                      <Card className="p-3">
                        <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                          {selectedProblem.defaultCode}
                        </pre>
                      </Card>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6">
                        <p className="text-xs text-muted-foreground">先试试自己解决问题吧！</p>
                        <p className="text-[10px] text-muted-foreground/70">建议先使用"智能提示"获取思路</p>
                        <Button onClick={handleShowSolution} variant="outline" size="sm" className="h-7 text-xs mt-1">
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
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 代码编辑器 */}
            <div className="flex-[2] flex flex-col overflow-hidden border-b">
              <SmartCodeEditor
                value={code}
                onChange={setCode}
                language={editorSettings.language}
                theme={editorSettings.theme}
                onRunCode={() => !isRunning && handleRunCode()}
                onSettingsChange={setEditorSettings}
              />
            </div>

            {/* 测试输入输出 或 评测系统 */}
            {showEvaluation ? (
              <div className="flex flex-col h-[45%] min-h-[280px] border-t border-border">
                <div className="flex-1 min-h-0">
                  <EvaluationPanel
                    code={code}
                    language={editorSettings.language}
                    defaultTestCases={selectedProblem.testCases}
                    timeLimit={selectedProblem.timeLimit || 1000}
                    memoryLimit={selectedProblem.memoryLimit || 128}
                    onResultsChange={(results, summary) => {
                      setEvaluationResults(results);
                      setEvaluationSummary(summary);
                      
                      // 记录提交结果到用户学习数据
                      if (summary && results && results.length > 0) {
                        const passedCount = results.filter(r => r.status === 'AC').length;
                        // 根据通过率判断结果
                        const result: 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE' | 'SE' = 
                          passedCount === results.length ? 'AC' : 
                          results.some(r => r.status === 'TLE') ? 'TLE' :
                          results.some(r => r.status === 'MLE') ? 'MLE' :
                          results.some(r => r.status === 'RE') ? 'RE' :
                          results.some(r => r.status === 'CE') ? 'CE' : 'WA';
                        
                        // 全部通过时显示庆祝动画
                        if (passedCount === results.length) {
                          setShowSuccess(true);
                        }
                        
                        addSubmission(
                          selectedProblem.id,
                          selectedProblem.title,
                          selectedProblem.category,
                          selectedProblem.difficulty,
                          code,
                          editorSettings.language,
                          result,
                          passedCount,
                          results.length
                        );
                      }
                    }}
                  />
                </div>
                {/* AI 助教面板 */}
                <AIAssistantPanel
                  problem={selectedProblem}
                  code={code}
                  evaluationResults={evaluationResults}
                />
              </div>
            ) : (
              <div className="flex-1 min-h-[180px] flex border-t border-border">
                {/* 输入 */}
                <div className="w-1/2 border-r border-border">
                  <InputPanel
                    value={input}
                    onChange={setInput}
                    placeholder="输入测试数据..."
                    title="测试输入"
                  />
                </div>

                {/* 输出 */}
                <div className="w-1/2">
                  <OutputPanel
                    value={output}
                    error={error}
                    title="运行结果"
                    expectedOutput={expectedOutput}
                    executionTime={executionTime}
                  />
                </div>
              </div>
            )}
              </div>
            </div>
            </>
          )}
        </main>
      </div>
      
      {/* 快捷键帮助 */}
      {showShortcutsHelp && (
        <ShortcutsHelp onClose={() => setShowShortcutsHelp(false)} />
      )}
      
      {/* 全局搜索 */}
      <GlobalSearch
        open={showGlobalSearch}
        onOpenChange={setShowGlobalSearch}
        onSelectProblem={(problem) => {
          handleBankProblemSelect(problem);
          setCurrentView('practice');
        }}
        onSelectKnowledge={(id) => {
          const knowledge = getKnowledgeById(id);
          if (knowledge) {
            setInitialKnowledgeSlug(knowledge.slug);
            setCurrentView('map');
          }
        }}
        currentTab={currentView}
        onNavigateTab={(tab) => setCurrentView(tab as typeof currentView)}
      />
      
      {/* 成功庆祝动画 */}
      <SuccessCelebration 
        show={showSuccess} 
        onComplete={() => setShowSuccess(false)}
      />
    </div>
  );
}

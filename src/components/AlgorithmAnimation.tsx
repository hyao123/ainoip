'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Settings,
  ChevronRight,
  ChevronLeft,
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from 'lucide-react';

// 算法类型
type AlgorithmType = 'bubble-sort' | 'quick-sort' | 'binary-search' | 'dp-knapsack';

// 算法配置
const algorithmConfig: Record<AlgorithmType, { name: string; description: string; category: string }> = {
  'bubble-sort': { name: '冒泡排序', description: '通过相邻元素比较和交换，逐步将最大元素"冒泡"到末尾', category: '排序算法' },
  'quick-sort': { name: '快速排序', description: '选择基准元素，将数组分为两部分，递归排序', category: '排序算法' },
  'binary-search': { name: '二分查找', description: '在有序数组中，每次将搜索范围缩小一半', category: '搜索算法' },
  'dp-knapsack': { name: '背包问题', description: '动态规划解决01背包问题', category: '动态规划' },
};

// 通用动画步骤
interface AnimationStep {
  type: 'compare' | 'swap' | 'highlight' | 'sorted' | 'found' | 'check' | 'update';
  indices: number[];
  description: string;
  values?: number[];
}

// 冒泡排序动画
function generateBubbleSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const n = arr.length;
  const a = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1], description: `比较 a[${j}]=${a[j]} 和 a[${j + 1}]=${a[j + 1]}` });
      
      if (a[j] > a[j + 1]) {
        steps.push({ type: 'swap', indices: [j, j + 1], description: `交换 ${a[j]} 和 ${a[j + 1]}` });
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
    steps.push({ type: 'sorted', indices: [n - i - 1], description: `位置 ${n - i - 1} 已排序` });
  }
  steps.push({ type: 'sorted', indices: [0], description: '排序完成' });
  
  return steps;
}

// 快速排序动画
function generateQuickSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const a = [...arr];
  const sorted: Set<number> = new Set();
  
  function quickSort(low: number, high: number) {
    if (low >= high) return;
    
    const pivot = a[high];
    steps.push({ type: 'highlight', indices: [high], description: `选择基准元素 a[${high}]=${pivot}` });
    
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high], description: `比较 a[${j}]=${a[j]} 和基准 ${pivot}` });
      
      if (a[j] <= pivot) {
        i++;
        if (i !== j) {
          steps.push({ type: 'swap', indices: [i, j], description: `交换 a[${i}] 和 a[${j}]` });
          [a[i], a[j]] = [a[j], a[i]];
        }
      }
    }
    
    if (i + 1 !== high) {
      steps.push({ type: 'swap', indices: [i + 1, high], description: `将基准放到正确位置` });
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
    }
    
    sorted.add(i + 1);
    steps.push({ type: 'sorted', indices: [i + 1], description: `位置 ${i + 1} 已排序` });
    
    quickSort(low, i);
    quickSort(i + 2, high);
  }
  
  quickSort(0, a.length - 1);
  steps.push({ type: 'sorted', indices: Array.from({ length: a.length }, (_, i) => i), description: '排序完成' });
  
  return steps;
}

// 二分查找动画
function generateBinarySearchSteps(arr: number[], target: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const a = [...arr].sort((x, y) => x - y);
  
  steps.push({ type: 'highlight', indices: [], description: `在有序数组中查找目标值 ${target}` });
  
  let low = 0, high = a.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    steps.push({ type: 'check', indices: [mid], description: `检查中间位置 a[${mid}]=${a[mid]}` });
    
    if (a[mid] === target) {
      steps.push({ type: 'found', indices: [mid], description: `找到目标值 ${target} 在位置 ${mid}` });
      return steps;
    } else if (a[mid] < target) {
      steps.push({ type: 'compare', indices: [mid], description: `${a[mid]} < ${target}，在右半部分继续查找` });
      low = mid + 1;
    } else {
      steps.push({ type: 'compare', indices: [mid], description: `${a[mid]} > ${target}，在左半部分继续查找` });
      high = mid - 1;
    }
  }
  
  steps.push({ type: 'highlight', indices: [], description: `未找到目标值 ${target}` });
  
  return steps;
}

// 背包问题动画
function generateKnapsackSteps(weights: number[], values: number[], capacity: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const n = weights.length;
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  steps.push({ type: 'highlight', indices: [0], description: `背包容量: ${capacity}，物品数量: ${n}` });
  
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= capacity; j++) {
      steps.push({ type: 'check', indices: [i, j], description: `考虑物品 ${i}，背包容量 ${j}` });
      
      if (j < weights[i - 1]) {
        dp[i][j] = dp[i - 1][j];
        steps.push({ type: 'update', indices: [i, j], values: [dp[i][j]], description: `容量不足，dp[${i}][${j}] = dp[${i - 1}][${j}] = ${dp[i][j]}` });
      } else {
        const take = dp[i - 1][j - weights[i - 1]] + values[i - 1];
        const notTake = dp[i - 1][j];
        dp[i][j] = Math.max(take, notTake);
        steps.push({ type: 'update', indices: [i, j], values: [dp[i][j]], description: `dp[${i}][${j}] = max(${take}, ${notTake}) = ${dp[i][j]}` });
      }
    }
  }
  
  steps.push({ type: 'found', indices: [n, capacity], description: `最大价值: ${dp[n][capacity]}` });
  
  return steps;
}

// 算法动画演示组件
interface AlgorithmVisualizerProps {
  type: AlgorithmType;
}

export function AlgorithmVisualizer({ type }: AlgorithmVisualizerProps) {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [target, setTarget] = useState<number>(5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化数组
  useEffect(() => {
    generateNewArray();
  }, [type]);

  // 生成新数组
  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 20) + 1);
    setArray(newArray);
    setCurrentStep(0);
    setIsPlaying(false);
    
    // 生成对应的动画步骤
    let newSteps: AnimationStep[] = [];
    switch (type) {
      case 'bubble-sort':
        newSteps = generateBubbleSortSteps(newArray);
        break;
      case 'quick-sort':
        newSteps = generateQuickSortSteps(newArray);
        break;
      case 'binary-search':
        newSteps = generateBinarySearchSteps(newArray, target);
        break;
      case 'dp-knapsack':
        const weights = newArray.slice(0, 5);
        const values = newArray.slice(5, 10);
        newSteps = generateKnapsackSteps(weights, values, 15);
        break;
    }
    setSteps(newSteps);
  };

  // 播放动画
  useEffect(() => {
    if (isPlaying && currentStep < steps.length) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length) {
      setIsPlaying(false);
    }
    
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  // 控制函数
  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleStep = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // 获取元素样式
  const getElementStyle = (index: number): string => {
    const step = steps[currentStep - 1];
    if (!step) return '';
    
    if (step.type === 'sorted' && step.indices.includes(index)) return 'bg-green-500';
    if (step.type === 'compare' && step.indices.includes(index)) return 'bg-yellow-500';
    if (step.type === 'swap' && step.indices.includes(index)) return 'bg-red-500';
    if (step.type === 'highlight' && step.indices.includes(index)) return 'bg-purple-500';
    if (step.type === 'found' && step.indices.includes(index)) return 'bg-green-600 ring-2 ring-green-300';
    if (step.type === 'check' && step.indices.includes(index)) return 'bg-blue-500';
    
    return 'bg-primary';
  };

  const config = algorithmConfig[type];
  const currentStepData = steps[currentStep - 1];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              {config.name}
            </CardTitle>
            <CardDescription className="text-xs mt-1">{config.description}</CardDescription>
          </div>
          <Badge variant="outline">{config.category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* 数组可视化 */}
        <div className="flex-1 min-h-[200px] flex items-end justify-center gap-1 p-4 bg-muted/30 rounded-lg">
          {array.map((value, index) => (
            <div
              key={index}
              className={`flex flex-col items-center transition-all duration-200 ${getElementStyle(index)}`}
            >
              <div
                className="w-8 rounded-t text-white text-xs font-bold flex items-center justify-center transition-all duration-200"
                style={{ height: `${value * 8}px` }}
              >
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{index}</div>
            </div>
          ))}
        </div>

        {/* 当前步骤说明 */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="text-xs">
              步骤 {currentStep}/{steps.length}
            </Badge>
            <span className="text-muted-foreground">
              {currentStepData?.description || '点击播放开始演示'}
            </span>
          </div>
        </div>

        <Separator />

        {/* 控制面板 */}
        <div className="space-y-3">
          {/* 速度控制 */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-12">速度:</span>
            <Slider
              value={[1000 - speed]}
              onValueChange={(v) => setSpeed(1000 - v[0])}
              max={900}
              step={100}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-16">{speed}ms</span>
          </div>

          {/* 播放控制按钮 */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleStep('prev')} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handlePlay} disabled={currentStep >= steps.length}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleStep('next')} disabled={currentStep >= steps.length}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={generateNewArray}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 图例 */}
        <div className="flex flex-wrap gap-3 justify-center text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-primary rounded" />
            <span>未处理</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-500 rounded" />
            <span>比较中</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span>交换中</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span>检查中</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span>已排序</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 算法选择面板
export function AlgorithmAnimationPanel() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble-sort');
  
  return (
    <div className="h-full flex flex-col">
      {/* 算法选择 */}
      <div className="p-3 border-b">
        <Tabs value={selectedAlgorithm} onValueChange={(v) => setSelectedAlgorithm(v as AlgorithmType)}>
          <TabsList className="w-full grid grid-cols-4 h-9">
            <TabsTrigger value="bubble-sort" className="text-xs">冒泡排序</TabsTrigger>
            <TabsTrigger value="quick-sort" className="text-xs">快速排序</TabsTrigger>
            <TabsTrigger value="binary-search" className="text-xs">二分查找</TabsTrigger>
            <TabsTrigger value="dp-knapsack" className="text-xs">背包问题</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* 动画演示 */}
      <div className="flex-1 p-3">
        <AlgorithmVisualizer type={selectedAlgorithm} />
      </div>
    </div>
  );
}

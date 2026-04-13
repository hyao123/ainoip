'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlgorithmVisualization } from '@/components/AlgorithmVisualization';
import { 
  ArrowUpDown, 
  Search, 
  Zap,
  BookOpen,
  Database,
  Network,
  Grid3X3
} from 'lucide-react';

interface Algorithm {
  id: string;
  name: string;
  nameEn: string;
  category: 'sort' | 'search' | 'graph' | 'dp' | 'data-structure';
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  stable: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  features: string[];
}

const algorithms: Algorithm[] = [
  // 排序算法
  {
    id: 'bubble',
    name: '冒泡排序',
    nameEn: 'Bubble Sort',
    category: 'sort',
    description: '通过重复交换相邻的逆序元素，将最大元素"冒泡"到数组末端。简单直观，适合入门学习。',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: true,
    difficulty: 'easy',
    features: ['原地排序', '稳定排序', '适合小数据集'],
  },
  {
    id: 'selection',
    name: '选择排序',
    nameEn: 'Selection Sort',
    category: 'sort',
    description: '每次从未排序部分选择最小元素，放到已排序部分的末尾。',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: false,
    difficulty: 'easy',
    features: ['原地排序', '不稳定排序', '交换次数少'],
  },
  {
    id: 'insertion',
    name: '插入排序',
    nameEn: 'Insertion Sort',
    category: 'sort',
    description: '将元素插入到已排序序列的正确位置，类似整理扑克牌。',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: true,
    difficulty: 'easy',
    features: ['原地排序', '稳定排序', '对近乎有序的数组高效'],
  },
  {
    id: 'quick',
    name: '快速排序',
    nameEn: 'Quick Sort',
    category: 'sort',
    description: '选择基准元素，将数组分为小于和大于基准的两部分，递归排序。实际应用中最快的排序算法之一。',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    stable: false,
    difficulty: 'medium',
    features: ['分治思想', '原地排序', '平均性能最优'],
  },
  {
    id: 'merge',
    name: '归并排序',
    nameEn: 'Merge Sort',
    category: 'sort',
    description: '将数组分成两半，递归排序后合并。时间复杂度稳定，适合链表排序和外部排序。',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    stable: true,
    difficulty: 'medium',
    features: ['分治思想', '稳定排序', '适合大数据集'],
  },
  // 搜索算法
  {
    id: 'binary',
    name: '二分查找',
    nameEn: 'Binary Search',
    category: 'search',
    description: '在有序数组中，每次将搜索范围缩小一半。高效的查找算法，是许多高级算法的基础。',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    stable: true,
    difficulty: 'easy',
    features: ['有序数组', '对数时间', '经典算法'],
  },
  // 图论算法
  {
    id: 'dfs',
    name: 'DFS遍历',
    nameEn: 'Depth-First Search',
    category: 'graph',
    description: '深度优先搜索，沿着一条路径走到底再回溯，用于遍历或搜索图。',
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)',
    stable: true,
    difficulty: 'medium',
    features: ['递归实现', '路径搜索', '连通性判断'],
  },
  {
    id: 'bfs',
    name: 'BFS遍历',
    nameEn: 'Breadth-First Search',
    category: 'graph',
    description: '广度优先搜索，按层次遍历图，常用于最短路径问题。',
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)',
    stable: true,
    difficulty: 'medium',
    features: ['队列实现', '最短路径', '层次遍历'],
  },
  // 动态规划
  {
    id: 'dp-lis',
    name: '最长递增子序列',
    nameEn: 'Longest Increasing Subsequence',
    category: 'dp',
    description: '求序列中最长的严格递增子序列的长度，经典动态规划问题。',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n)',
    stable: true,
    difficulty: 'medium',
    features: ['动态规划', '子序列问题', '可优化到O(n log n)'],
  },
  {
    id: 'dp-knapsack',
    name: '背包问题',
    nameEn: 'Knapsack Problem',
    category: 'dp',
    description: '在有限容量下选择物品使总价值最大，经典的01背包问题。',
    timeComplexity: 'O(nW)',
    spaceComplexity: 'O(nW)',
    stable: true,
    difficulty: 'medium',
    features: ['动态规划', '组合优化', '空间可优化'],
  },
  {
    id: 'dp-climb',
    name: '爬楼梯',
    nameEn: 'Climbing Stairs',
    category: 'dp',
    description: '每次可爬1或2阶，求到达顶部的方案数，经典入门DP问题。',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    stable: true,
    difficulty: 'easy',
    features: ['动态规划', '斐波那契变种', '空间可优化到O(1)'],
  },
  // 数据结构
  {
    id: 'stack',
    name: '栈',
    nameEn: 'Stack',
    category: 'data-structure',
    description: '后进先出(LIFO)的数据结构，支持入栈和出栈操作。',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    stable: true,
    difficulty: 'easy',
    features: ['LIFO', '单调栈', '表达式求值'],
  },
  {
    id: 'queue',
    name: '队列',
    nameEn: 'Queue',
    category: 'data-structure',
    description: '先进先出(FIFO)的数据结构，支持入队和出队操作。',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    stable: true,
    difficulty: 'easy',
    features: ['FIFO', 'BFS基础', '任务调度'],
  },
  {
    id: 'heap',
    name: '堆',
    nameEn: 'Heap',
    category: 'data-structure',
    description: '完全二叉树结构，支持快速获取最值，常用于优先队列。',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    stable: false,
    difficulty: 'medium',
    features: ['优先队列', '堆排序', 'TopK问题'],
  },
  {
    id: 'dp-dijkstra',
    name: 'Dijkstra最短路径',
    nameEn: "Dijkstra's Algorithm",
    category: 'graph',
    description: '贪心算法求单源最短路径，每次选择未访问的最小距离节点。',
    timeComplexity: 'O((V+E) log V)',
    spaceComplexity: 'O(V)',
    stable: true,
    difficulty: 'hard',
    features: ['贪心算法', '最短路径', '加权图'],
  },
];

const categoryConfig = {
  sort: { name: '排序算法', icon: ArrowUpDown, color: 'text-blue-500' },
  search: { name: '搜索算法', icon: Search, color: 'text-green-500' },
  graph: { name: '图论算法', icon: Network, color: 'text-purple-500' },
  dp: { name: '动态规划', icon: Grid3X3, color: 'text-orange-500' },
  'data-structure': { name: '数据结构', icon: Database, color: 'text-cyan-500' },
};

export function AlgorithmDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('sort');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('bubble');
  
  const filteredAlgorithms = algorithms.filter(a => a.category === selectedCategory);
  const currentAlgorithm = algorithms.find(a => a.id === selectedAlgorithm) || algorithms[0];
  const currentCategory = categoryConfig[currentAlgorithm.category];
  const CategoryIcon = currentCategory.icon;
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 顶部标题 */}
      <div className="px-5 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold">算法动画演示</h1>
            <p className="text-xs text-white/70">可视化理解算法执行过程</p>
          </div>
        </div>
      </div>
      
      {/* 内容区 */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* 分类选择 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon;
            const count = algorithms.filter(a => a.category === key).length;
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                className="gap-2 shrink-0"
                onClick={() => {
                  setSelectedCategory(key);
                  const firstAlgo = algorithms.find(a => a.category === key);
                  if (firstAlgo) setSelectedAlgorithm(firstAlgo.id);
                }}
              >
                <Icon className="h-4 w-4" />
                {config.name}
                <Badge variant="secondary" className="ml-1 text-xs">{count}</Badge>
              </Button>
            );
          })}
        </div>

        {/* 算法选择卡片 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredAlgorithms.map((algo) => (
            <Card
              key={algo.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedAlgorithm === algo.id 
                  ? 'ring-2 ring-primary border-primary' 
                  : ''
              }`}
              onClick={() => setSelectedAlgorithm(algo.id)}
            >
              <CardHeader className="pb-2 pt-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{algo.name}</CardTitle>
                  <CategoryIcon className={`h-4 w-4 ${currentCategory.color}`} />
                </div>
                <CardDescription className="text-xs">{algo.nameEn}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {algo.timeComplexity}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {algo.difficulty === 'easy' ? '入门' : algo.difficulty === 'medium' ? '中等' : '困难'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {algo.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* 算法详情和可视化 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                算法详解
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">{currentAlgorithm.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {currentAlgorithm.description}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">时间复杂度</span>
                  <code className="bg-muted px-2 py-0.5 rounded text-xs">
                    {currentAlgorithm.timeComplexity}
                  </code>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">空间复杂度</span>
                  <code className="bg-muted px-2 py-0.5 rounded text-xs">
                    {currentAlgorithm.spaceComplexity}
                  </code>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">稳定性</span>
                  <Badge variant={currentAlgorithm.stable ? 'default' : 'secondary'} className="text-xs">
                    {currentAlgorithm.stable ? '稳定' : '不稳定'}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-2">特点</h5>
                <div className="flex flex-wrap gap-2">
                  {currentAlgorithm.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 可视化区域 */}
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <AlgorithmVisualization
                key={selectedAlgorithm}
                title={currentAlgorithm.name}
                description={currentAlgorithm.description}
                algorithm={selectedAlgorithm as 'bubble' | 'quick' | 'merge' | 'binary' | 'dfs' | 'bfs' | 'selection' | 'insertion' | 'heap' | 'dp-lis' | 'dp-knapsack' | 'dp-climb' | 'dp-dijkstra'}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

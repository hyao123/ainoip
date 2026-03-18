'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlgorithmVisualization } from '@/components/AlgorithmVisualization';
import { 
  ArrowUpDown, 
  Search, 
  GitBranch, 
  Layers,
  Zap,
  BookOpen
} from 'lucide-react';

interface Algorithm {
  id: string;
  name: string;
  nameEn: string;
  category: 'sort' | 'search';
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  stable: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  features: string[];
}

const algorithms: Algorithm[] = [
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
];

export function AlgorithmDemoPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('bubble');
  
  const currentAlgorithm = algorithms.find(a => a.id === selectedAlgorithm) || algorithms[0];
  
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
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* 算法选择 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {algorithms.map((algo) => (
            <Card
              key={algo.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedAlgorithm === algo.id 
                  ? 'ring-2 ring-primary border-primary' 
                  : ''
              }`}
              onClick={() => setSelectedAlgorithm(algo.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{algo.name}</CardTitle>
                  {algo.category === 'sort' ? (
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Search className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <CardDescription className="text-xs">{algo.nameEn}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
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
        
        {/* 算法详情 */}
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
                algorithm={selectedAlgorithm as 'bubble' | 'quick' | 'merge' | 'binary'}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

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
type AlgorithmType = 
  // 排序算法
  | 'bubble-sort' | 'quick-sort' | 'selection-sort' | 'insertion-sort' | 'merge-sort' | 'heap-sort'
  // 搜索算法
  | 'binary-search' | 'linear-search'
  // 图论算法
  | 'dfs' | 'bfs' | 'dijkstra'
  // 数据结构
  | 'stack' | 'queue' | 'heap' | 'union-find'
  // 动态规划
  | 'dp-knapsack' | 'dp-lis' | 'dp-climb'
  // 其他算法
  | 'two-pointer' | 'sliding-window';

// 算法配置
const algorithmConfig: Record<AlgorithmType, { name: string; description: string; category: string }> = {
  // 排序算法
  'bubble-sort': { name: '冒泡排序', description: '通过相邻元素比较和交换，逐步将最大元素"冒泡"到末尾', category: '排序算法' },
  'quick-sort': { name: '快速排序', description: '选择基准元素，将数组分为两部分，递归排序', category: '排序算法' },
  'selection-sort': { name: '选择排序', description: '每次选择最小元素放到已排序序列末尾', category: '排序算法' },
  'insertion-sort': { name: '插入排序', description: '将元素插入到已排序序列的正确位置', category: '排序算法' },
  'merge-sort': { name: '归并排序', description: '分治思想，将数组分成子数组排序后合并', category: '排序算法' },
  'heap-sort': { name: '堆排序', description: '利用堆的性质进行排序', category: '排序算法' },
  // 搜索算法
  'binary-search': { name: '二分查找', description: '在有序数组中，每次将搜索范围缩小一半', category: '搜索算法' },
  'linear-search': { name: '线性查找', description: '从头到尾依次查找目标元素', category: '搜索算法' },
  // 图论算法
  'dfs': { name: 'DFS遍历', description: '深度优先搜索，沿着一条路径走到底再回溯', category: '图论算法' },
  'bfs': { name: 'BFS遍历', description: '广度优先搜索，按层次逐层遍历', category: '图论算法' },
  'dijkstra': { name: 'Dijkstra最短路', description: '求单源最短路径，适用于非负权图', category: '图论算法' },
  // 数据结构
  'stack': { name: '栈操作', description: '后进先出(LIFO)的数据结构', category: '数据结构' },
  'queue': { name: '队列操作', description: '先进先出(FIFO)的数据结构', category: '数据结构' },
  'heap': { name: '堆操作', description: '维护堆的性质，支持插入和删除最值', category: '数据结构' },
  'union-find': { name: '并查集', description: '支持合并和查找集合的数据结构', category: '数据结构' },
  // 动态规划
  'dp-knapsack': { name: '背包问题', description: '动态规划解决01背包问题', category: '动态规划' },
  'dp-lis': { name: '最长递增子序列', description: '求最长严格递增子序列的长度', category: '动态规划' },
  'dp-climb': { name: '爬楼梯', description: '每次可爬1或2阶，求到达顶部的方案数', category: '动态规划' },
  // 其他算法
  'two-pointer': { name: '双指针', description: '两个指针从两端向中间移动，解决区间问题', category: '双指针' },
  'sliding-window': { name: '滑动窗口', description: '维护一个窗口在数组上滑动，解决子数组问题', category: '滑动窗口' },
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

// ========== 新增算法动画步骤生成函数 ==========

// 选择排序动画
function generateSelectionSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const n = arr.length;
  const a = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ type: 'highlight', indices: [i], description: `寻找位置 ${i} 的最小元素` });
    
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: 'compare', indices: [minIdx, j], description: `比较 a[${minIdx}]=${a[minIdx]} 和 a[${j}]=${a[j]}` });
      
      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({ type: 'highlight', indices: [minIdx], description: `发现更小元素，更新最小位置为 ${minIdx}` });
      }
    }
    
    if (minIdx !== i) {
      steps.push({ type: 'swap', indices: [i, minIdx], description: `交换 ${a[i]} 和 ${a[minIdx]}` });
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
    
    steps.push({ type: 'sorted', indices: [i], description: `位置 ${i} 已排序` });
  }
  steps.push({ type: 'sorted', indices: [n - 1], description: '排序完成' });
  
  return steps;
}

// 插入排序动画
function generateInsertionSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const n = arr.length;
  const a = [...arr];
  
  steps.push({ type: 'sorted', indices: [0], description: `首个元素已排序` });
  
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    
    steps.push({ type: 'highlight', indices: [i], description: `插入元素 ${key}` });
    
    while (j >= 0 && a[j] > key) {
      steps.push({ type: 'compare', indices: [j, j + 1], description: `${a[j]} > ${key}，后移` });
      a[j + 1] = a[j];
      steps.push({ type: 'swap', indices: [j, j + 1], description: `将 ${a[j]} 后移一位` });
      j--;
    }
    
    a[j + 1] = key;
    steps.push({ type: 'sorted', indices: Array.from({ length: i + 1 }, (_, k) => k), description: `元素 ${key} 插入到位置 ${j + 1}` });
  }
  
  return steps;
}

// 归并排序动画
function generateMergeSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const a = [...arr];
  
  function mergeSort(left: number, right: number, depth: number = 0): void {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    steps.push({ type: 'highlight', indices: Array.from({ length: right - left + 1 }, (_, i) => left + i), description: `分割 [${left}..${right}]` });
    
    mergeSort(left, mid, depth + 1);
    mergeSort(mid + 1, right, depth + 1);
    
    // 合并
    const temp: number[] = [];
    let i = left, j = mid + 1;
    
    steps.push({ type: 'compare', indices: [left, mid + 1], description: `合并 [${left}..${mid}] 和 [${mid + 1}..${right}]` });
    
    while (i <= mid && j <= right) {
      if (a[i] <= a[j]) {
        temp.push(a[i++]);
      } else {
        temp.push(a[j++]);
      }
    }
    
    while (i <= mid) temp.push(a[i++]);
    while (j <= right) temp.push(a[j++]);
    
    for (let k = 0; k < temp.length; k++) {
      a[left + k] = temp[k];
    }
    
    steps.push({ type: 'sorted', indices: Array.from({ length: right - left + 1 }, (_, k) => left + k), description: `合并完成 [${left}..${right}]` });
  }
  
  steps.push({ type: 'highlight', indices: Array.from({ length: a.length }, (_, i) => i), description: '开始归并排序' });
  mergeSort(0, a.length - 1);
  steps.push({ type: 'sorted', indices: Array.from({ length: a.length }, (_, i) => i), description: '排序完成' });
  
  return steps;
}

// 堆排序动画
function generateHeapSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const n = arr.length;
  const a = [...arr];
  
  // 堆化函数
  function heapify(size: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;
    
    if (largest !== i) {
      steps.push({ type: 'compare', indices: [i, largest], description: `父节点 ${a[i]} 小于子节点 ${a[largest]}，交换` });
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ type: 'swap', indices: [i, largest], description: `交换完成` });
      heapify(size, largest);
    }
  }
  
  // 建堆
  steps.push({ type: 'highlight', indices: Array.from({ length: n }, (_, i) => i), description: '开始建堆' });
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  
  steps.push({ type: 'highlight', indices: [0], description: '堆建立完成，开始排序' });
  
  // 排序
  for (let i = n - 1; i > 0; i--) {
    steps.push({ type: 'swap', indices: [0, i], description: `将堆顶 ${a[0]} 移到位置 ${i}` });
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({ type: 'sorted', indices: [i], description: `位置 ${i} 已排序` });
    heapify(i, 0);
  }
  
  steps.push({ type: 'sorted', indices: [0], description: '排序完成' });
  
  return steps;
}

// 线性查找动画
function generateLinearSearchSteps(arr: number[], target: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const a = [...arr];
  
  steps.push({ type: 'highlight', indices: [], description: `查找目标值 ${target}` });
  
  for (let i = 0; i < a.length; i++) {
    steps.push({ type: 'check', indices: [i], description: `检查位置 ${i}，值为 ${a[i]}` });
    
    if (a[i] === target) {
      steps.push({ type: 'found', indices: [i], description: `找到目标值 ${target} 在位置 ${i}` });
      return steps;
    }
    
    steps.push({ type: 'compare', indices: [i], description: `${a[i]} ≠ ${target}，继续查找` });
  }
  
  steps.push({ type: 'highlight', indices: [], description: `未找到目标值 ${target}` });
  
  return steps;
}

// DFS遍历动画（图的邻接矩阵）
function generateDFSSteps(nodes: number, edges: [number, number][]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  
  // 构建邻接表
  const adj: number[][] = Array.from({ length: nodes }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  
  const visited: boolean[] = Array(nodes).fill(false);
  const visitedNodes: number[] = [];
  
  function dfs(node: number): void {
    visited[node] = true;
    visitedNodes.push(node);
    steps.push({ type: 'highlight', indices: [node], description: `访问节点 ${node}` });
    steps.push({ type: 'check', indices: [...visitedNodes], description: `当前访问: ${visitedNodes.join(' → ')}` });
    
    for (const neighbor of adj[node].sort((a, b) => a - b)) {
      if (!visited[neighbor]) {
        steps.push({ type: 'compare', indices: [node, neighbor], description: `从 ${node} 探索邻居 ${neighbor}` });
        dfs(neighbor);
      }
    }
    
    steps.push({ type: 'sorted', indices: [node], description: `节点 ${node} 处理完成，回溯` });
  }
  
  steps.push({ type: 'highlight', indices: [], description: `开始DFS遍历，共 ${nodes} 个节点` });
  dfs(0);
  steps.push({ type: 'found', indices: visitedNodes, description: `DFS遍历完成: ${visitedNodes.join(' → ')}` });
  
  return steps;
}

// BFS遍历动画
function generateBFSSteps(nodes: number, edges: [number, number][]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  
  // 构建邻接表
  const adj: number[][] = Array.from({ length: nodes }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  
  const visited: boolean[] = Array(nodes).fill(false);
  const visitedNodes: number[] = [];
  const queue: number[] = [0];
  visited[0] = true;
  
  steps.push({ type: 'highlight', indices: [], description: `开始BFS遍历，共 ${nodes} 个节点` });
  steps.push({ type: 'check', indices: [0], description: `起始节点 0 入队` });
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    visitedNodes.push(node);
    
    steps.push({ type: 'highlight', indices: [node], description: `访问节点 ${node}` });
    steps.push({ type: 'check', indices: [...visitedNodes], description: `当前访问: ${visitedNodes.join(' → ')}` });
    
    for (const neighbor of adj[node].sort((a, b) => a - b)) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
        steps.push({ type: 'compare', indices: [node, neighbor], description: `节点 ${neighbor} 入队` });
      }
    }
    
    steps.push({ type: 'sorted', indices: [node], description: `节点 ${node} 处理完成` });
  }
  
  steps.push({ type: 'found', indices: visitedNodes, description: `BFS遍历完成: ${visitedNodes.join(' → ')}` });
  
  return steps;
}

// Dijkstra最短路动画
function generateDijkstraSteps(nodes: number, edges: [number, number, number][]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  
  // 构建邻接表
  const adj: [number, number][][] = Array.from({ length: nodes }, () => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }
  
  const dist: number[] = Array(nodes).fill(Infinity);
  const visited: boolean[] = Array(nodes).fill(false);
  dist[0] = 0;
  
  steps.push({ type: 'highlight', indices: [0], description: `从节点 0 开始，初始距离 [0, ∞, ∞, ...]` });
  
  for (let i = 0; i < nodes; i++) {
    // 找最小距离节点
    let minNode = -1;
    for (let j = 0; j < nodes; j++) {
      if (!visited[j] && (minNode === -1 || dist[j] < dist[minNode])) {
        minNode = j;
      }
    }
    
    if (minNode === -1 || dist[minNode] === Infinity) break;
    
    visited[minNode] = true;
    steps.push({ type: 'check', indices: [minNode], description: `选择距离最小的未访问节点 ${minNode}，距离 ${dist[minNode]}` });
    
    // 更新邻居
    for (const [neighbor, weight] of adj[minNode]) {
      if (!visited[neighbor]) {
        const newDist = dist[minNode] + weight;
        steps.push({ type: 'compare', indices: [minNode, neighbor], description: `检查边 ${minNode}→${neighbor}，权重 ${weight}` });
        
        if (newDist < dist[neighbor]) {
          dist[neighbor] = newDist;
          steps.push({ type: 'update', indices: [neighbor], values: [newDist], description: `更新 dist[${neighbor}] = ${newDist}` });
        }
      }
    }
    
    steps.push({ type: 'sorted', indices: [minNode], description: `节点 ${minNode} 已确定最短路` });
  }
  
  steps.push({ type: 'found', indices: Array.from({ length: nodes }, (_, i) => i), description: `最短距离: [${dist.join(', ')}]` });
  
  return steps;
}

// 栈操作动画
function generateStackSteps(): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const stack: number[] = [];
  
  steps.push({ type: 'highlight', indices: [], description: '初始空栈' });
  
  // 入栈操作
  for (let i = 1; i <= 3; i++) {
    stack.push(i);
    steps.push({ type: 'update', indices: [...stack], values: [...stack], description: `元素 ${i} 入栈，栈: [${stack.join(', ')}]` });
  }
  
  // 出栈操作
  while (stack.length > 0) {
    const top = stack.pop();
    steps.push({ type: 'compare', indices: [stack.length], description: `栈顶元素 ${top} 出栈` });
    steps.push({ type: 'update', indices: [...stack], values: [...stack], description: `栈: [${stack.join(', ')}]` });
  }
  
  steps.push({ type: 'found', indices: [], description: '栈已空' });
  
  return steps;
}

// 队列操作动画
function generateQueueSteps(): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const queue: number[] = [];
  
  steps.push({ type: 'highlight', indices: [], description: '初始空队列' });
  
  // 入队操作
  for (let i = 1; i <= 3; i++) {
    queue.push(i);
    steps.push({ type: 'update', indices: [...queue], values: [...queue], description: `元素 ${i} 入队，队列: [${queue.join(', ')}]` });
  }
  
  // 出队操作
  while (queue.length > 0) {
    const front = queue.shift();
    steps.push({ type: 'compare', indices: [0], description: `队首元素 ${front} 出队` });
    steps.push({ type: 'update', indices: [...queue], values: [...queue], description: `队列: [${queue.join(', ')}]` });
  }
  
  steps.push({ type: 'found', indices: [], description: '队列已空' });
  
  return steps;
}

// 堆操作动画
function generateHeapSteps(): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const heap: number[] = [];
  
  // 插入元素
  const values = [5, 3, 8, 1, 2];
  
  steps.push({ type: 'highlight', indices: [], description: '初始空堆（最小堆）' });
  
  for (const val of values) {
    heap.push(val);
    let i = heap.length - 1;
    
    // 上浮
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent] > heap[i]) {
        steps.push({ type: 'compare', indices: [parent, i], description: `父节点 ${heap[parent]} > 子节点 ${heap[i]}，交换` });
        [heap[parent], heap[i]] = [heap[i], heap[parent]];
        i = parent;
      } else break;
    }
    
    steps.push({ type: 'update', indices: [...heap], values: [...heap], description: `插入 ${val}，堆: [${heap.join(', ')}]` });
  }
  
  // 删除堆顶
  steps.push({ type: 'highlight', indices: [0], description: `删除堆顶 ${heap[0]}` });
  heap[0] = heap.pop()!;
  
  // 下沉
  let i = 0;
  while (true) {
    let minIdx = i;
    const left = 2 * i + 1, right = 2 * i + 2;
    
    if (left < heap.length && heap[left] < heap[minIdx]) minIdx = left;
    if (right < heap.length && heap[right] < heap[minIdx]) minIdx = right;
    
    if (minIdx !== i) {
      steps.push({ type: 'swap', indices: [i, minIdx], description: `下沉: 交换 ${heap[i]} 和 ${heap[minIdx]}` });
      [heap[i], heap[minIdx]] = [heap[minIdx], heap[i]];
      i = minIdx;
    } else break;
  }
  
  steps.push({ type: 'found', indices: [...heap], values: [...heap], description: `删除后堆: [${heap.join(', ')}]` });
  
  return steps;
}

// 并查集动画
function generateUnionFindSteps(): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const n = 5;
  const parent: number[] = Array.from({ length: n }, (_, i) => i);
  
  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }
  
  steps.push({ type: 'highlight', indices: Array.from({ length: n }, (_, i) => i), description: `初始：每个节点自成一个集合` });
  
  // 合并操作
  const unions: [number, number][] = [[0, 1], [2, 3], [0, 2]];
  
  for (const [a, b] of unions) {
    steps.push({ type: 'compare', indices: [a, b], description: `合并节点 ${a} 和 ${b}` });
    
    const rootA = find(a), rootB = find(b);
    if (rootA !== rootB) {
      parent[rootA] = rootB;
      steps.push({ type: 'update', indices: Array.from({ length: n }, (_, i) => i), values: [...parent], description: `合并完成，parent: [${parent.join(', ')}]` });
    }
  }
  
  // 查询操作
  steps.push({ type: 'check', indices: [1, 3], description: `查询节点 1 和 3 是否同属一个集合` });
  const same = find(1) === find(3);
  steps.push({ type: 'found', indices: [1, 3], description: `结果: ${same ? '是，属于同一集合' : '否，属于不同集合'}` });
  
  return steps;
}

// LIS（最长递增子序列）动画
function generateLISSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const n = arr.length;
  const dp: number[] = Array(n).fill(1);
  
  steps.push({ type: 'highlight', indices: [], description: `求数组 [${arr.join(', ')}] 的最长递增子序列` });
  
  for (let i = 1; i < n; i++) {
    steps.push({ type: 'check', indices: [i], description: `处理位置 ${i}，值 ${arr[i]}` });
    
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        steps.push({ type: 'compare', indices: [j, i], description: `${arr[j]} < ${arr[i]}，dp[${i}] = max(${dp[i]}, ${dp[j] + 1})` });
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    
    steps.push({ type: 'update', indices: [i], values: [dp[i]], description: `dp[${i}] = ${dp[i]}` });
  }
  
  const maxLen = Math.max(...dp);
  steps.push({ type: 'found', indices: [], description: `最长递增子序列长度: ${maxLen}` });
  
  return steps;
}

// 爬楼梯动画
function generateClimbStairsSteps(n: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const dp: number[] = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  
  steps.push({ type: 'highlight', indices: [0, 1], description: `爬楼梯问题：n = ${n}，每次可爬1或2阶` });
  steps.push({ type: 'update', indices: [0, 1], values: [1, 1], description: `dp[0] = 1, dp[1] = 1` });
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({ type: 'check', indices: [i], description: `到达第 ${i} 阶：从 ${i - 1} 阶爬1步 + 从 ${i - 2} 阶爬2步` });
    steps.push({ type: 'update', indices: [i], values: [dp[i]], description: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}` });
  }
  
  steps.push({ type: 'found', indices: [n], description: `到达顶部的方法数: ${dp[n]}` });
  
  return steps;
}

// 双指针动画
function generateTwoPointerSteps(arr: number[], target: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const a = [...arr].sort((x, y) => x - y);
  let left = 0, right = a.length - 1;
  
  steps.push({ type: 'highlight', indices: [], description: `在有序数组中找两数之和为 ${target}` });
  
  while (left < right) {
    const sum = a[left] + a[right];
    steps.push({ type: 'compare', indices: [left, right], description: `left=${left}(${a[left]}), right=${right}(${a[right]}), sum=${sum}` });
    
    if (sum === target) {
      steps.push({ type: 'found', indices: [left, right], description: `找到: ${a[left]} + ${a[right]} = ${target}` });
      return steps;
    } else if (sum < target) {
      steps.push({ type: 'update', indices: [left], description: `${sum} < ${target}，左指针右移` });
      left++;
    } else {
      steps.push({ type: 'update', indices: [right], description: `${sum} > ${target}，右指针左移` });
      right--;
    }
  }
  
  steps.push({ type: 'found', indices: [], description: `未找到和为 ${target} 的两个数` });
  
  return steps;
}

// 滑动窗口动画
function generateSlidingWindowSteps(arr: number[], k: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const n = arr.length;
  let sum = 0, maxSum = 0;
  
  steps.push({ type: 'highlight', indices: [], description: `求长度为 ${k} 的子数组最大和` });
  
  // 初始化窗口
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  maxSum = sum;
  steps.push({ type: 'check', indices: Array.from({ length: k }, (_, i) => i), description: `初始窗口 [0..${k - 1}]，和 = ${sum}` });
  
  // 滑动窗口
  for (let i = k; i < n; i++) {
    sum = sum - arr[i - k] + arr[i];
    
    if (sum > maxSum) {
      maxSum = sum;
      steps.push({ type: 'update', indices: Array.from({ length: k }, (_, j) => i - k + 1 + j), description: `窗口 [${i - k + 1}..${i}]，和 = ${sum}（新最大）` });
    } else {
      steps.push({ type: 'compare', indices: Array.from({ length: k }, (_, j) => i - k + 1 + j), description: `窗口 [${i - k + 1}..${i}]，和 = ${sum}` });
    }
  }
  
  steps.push({ type: 'found', indices: [], description: `最大子数组和: ${maxSum}` });
  
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
    
    // 排序算法
    if (type === 'bubble-sort') {
      newSteps = generateBubbleSortSteps(newArray);
    } else if (type === 'quick-sort') {
      newSteps = generateQuickSortSteps(newArray);
    } else if (type === 'selection-sort') {
      newSteps = generateSelectionSortSteps(newArray);
    } else if (type === 'insertion-sort') {
      newSteps = generateInsertionSortSteps(newArray);
    } else if (type === 'merge-sort') {
      newSteps = generateMergeSortSteps(newArray);
    } else if (type === 'heap-sort') {
      newSteps = generateHeapSortSteps(newArray);
    }
    // 搜索算法
    else if (type === 'binary-search') {
      newSteps = generateBinarySearchSteps(newArray, target);
    } else if (type === 'linear-search') {
      newSteps = generateLinearSearchSteps(newArray, target);
    }
    // 图论算法
    else if (type === 'dfs') {
      const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
      newSteps = generateDFSSteps(7, edges);
    } else if (type === 'bfs') {
      const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
      newSteps = generateBFSSteps(7, edges);
    } else if (type === 'dijkstra') {
      const edges: [number, number, number][] = [[0, 1, 4], [0, 2, 2], [1, 2, 1], [1, 3, 5], [2, 3, 8], [2, 4, 10], [3, 4, 2]];
      newSteps = generateDijkstraSteps(5, edges);
    }
    // 数据结构
    else if (type === 'stack') {
      newSteps = generateStackSteps();
    } else if (type === 'queue') {
      newSteps = generateQueueSteps();
    } else if (type === 'heap') {
      newSteps = generateHeapSteps();
    } else if (type === 'union-find') {
      newSteps = generateUnionFindSteps();
    }
    // 动态规划
    else if (type === 'dp-knapsack') {
      const weights = newArray.slice(0, 5);
      const values = newArray.slice(5, 10);
      newSteps = generateKnapsackSteps(weights, values, 15);
    } else if (type === 'dp-lis') {
      newSteps = generateLISSteps(newArray);
    } else if (type === 'dp-climb') {
      newSteps = generateClimbStairsSteps(10);
    }
    // 其他算法
    else if (type === 'two-pointer') {
      newSteps = generateTwoPointerSteps(newArray, target * 3);
    } else if (type === 'sliding-window') {
      newSteps = generateSlidingWindowSteps(newArray, 3);
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

// 算法分类
const algorithmCategories = [
  {
    name: '排序算法',
    algorithms: [
      { type: 'bubble-sort' as AlgorithmType, name: '冒泡排序' },
      { type: 'selection-sort' as AlgorithmType, name: '选择排序' },
      { type: 'insertion-sort' as AlgorithmType, name: '插入排序' },
      { type: 'quick-sort' as AlgorithmType, name: '快速排序' },
      { type: 'merge-sort' as AlgorithmType, name: '归并排序' },
      { type: 'heap-sort' as AlgorithmType, name: '堆排序' },
    ],
  },
  {
    name: '搜索算法',
    algorithms: [
      { type: 'linear-search' as AlgorithmType, name: '线性查找' },
      { type: 'binary-search' as AlgorithmType, name: '二分查找' },
    ],
  },
  {
    name: '图论算法',
    algorithms: [
      { type: 'dfs' as AlgorithmType, name: 'DFS遍历' },
      { type: 'bfs' as AlgorithmType, name: 'BFS遍历' },
      { type: 'dijkstra' as AlgorithmType, name: 'Dijkstra' },
    ],
  },
  {
    name: '数据结构',
    algorithms: [
      { type: 'stack' as AlgorithmType, name: '栈' },
      { type: 'queue' as AlgorithmType, name: '队列' },
      { type: 'heap' as AlgorithmType, name: '堆' },
      { type: 'union-find' as AlgorithmType, name: '并查集' },
    ],
  },
  {
    name: '动态规划',
    algorithms: [
      { type: 'dp-climb' as AlgorithmType, name: '爬楼梯' },
      { type: 'dp-lis' as AlgorithmType, name: 'LIS' },
      { type: 'dp-knapsack' as AlgorithmType, name: '背包问题' },
    ],
  },
  {
    name: '其他算法',
    algorithms: [
      { type: 'two-pointer' as AlgorithmType, name: '双指针' },
      { type: 'sliding-window' as AlgorithmType, name: '滑动窗口' },
    ],
  },
];

// 算法选择面板
export function AlgorithmAnimationPanel() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble-sort');
  const [selectedCategory, setSelectedCategory] = useState(0);
  
  const currentCategory = algorithmCategories[selectedCategory];
  
  return (
    <div className="h-full flex flex-col">
      {/* 分类选择 */}
      <div className="p-2 border-b bg-muted/30">
        <div className="flex gap-1 overflow-x-auto">
          {algorithmCategories.map((cat, idx) => (
            <Button
              key={cat.name}
              variant={selectedCategory === idx ? "default" : "ghost"}
              size="sm"
              className="text-xs whitespace-nowrap"
              onClick={() => {
                setSelectedCategory(idx);
                setSelectedAlgorithm(cat.algorithms[0].type);
              }}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* 算法选择 */}
      <div className="p-2 border-b">
        <div className="flex flex-wrap gap-1">
          {currentCategory.algorithms.map((alg) => (
            <Button
              key={alg.type}
              variant={selectedAlgorithm === alg.type ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setSelectedAlgorithm(alg.type)}
            >
              {alg.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* 动画演示 */}
      <div className="flex-1 p-3 overflow-auto">
        <AlgorithmVisualizer type={selectedAlgorithm} />
      </div>
    </div>
  );
}

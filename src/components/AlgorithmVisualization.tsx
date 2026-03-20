'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  StepForward,
  StepBack,
  Settings,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 算法步骤类型
export interface AlgorithmStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  highlight?: number[];
  description: string;
  codeHighlight?: number; // 代码行号
}

// 动画状态类型
export type AnimationState = 'idle' | 'playing' | 'paused' | 'finished';

interface AlgorithmVisualizationProps {
  title: string;
  description: string;
  algorithm: 'bubble' | 'quick' | 'merge' | 'binary' | 'dfs' | 'bfs' | 'selection' | 'insertion' | 'heap';
  initialArray?: number[];
}

// 冒泡排序步骤生成器
function* bubbleSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];
  
  yield {
    array: [...array],
    description: '开始冒泡排序，比较相邻元素并交换',
    codeHighlight: 1,
  };
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        sorted: [...sorted],
        description: `比较 ${array[j]} 和 ${array[j + 1]}`,
        codeHighlight: 3,
      };
      
      if (array[j] > array[j + 1]) {
        yield {
          array: [...array],
          swapping: [j, j + 1],
          sorted: [...sorted],
          description: `${array[j]} > ${array[j + 1]}，交换位置`,
          codeHighlight: 4,
        };
        
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        
        yield {
          array: [...array],
          comparing: [j, j + 1],
          sorted: [...sorted],
          description: `交换完成`,
          codeHighlight: 5,
        };
      } else {
        yield {
          array: [...array],
          comparing: [j, j + 1],
          sorted: [...sorted],
          description: `${array[j]} ≤ ${array[j + 1]}，无需交换`,
          codeHighlight: 6,
        };
      }
    }
    sorted.unshift(n - i - 1);
  }
  sorted.unshift(0);
  
  yield {
    array: [...array],
    sorted: sorted,
    description: '排序完成！',
    codeHighlight: 10,
  };
}

// 快速排序步骤生成器
function* quickSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const sorted: Set<number> = new Set();
  
  function* partition(low: number, high: number): Generator<AlgorithmStep, number> {
    const pivot = array[high];
    
    yield {
      array: [...array],
      pivot: high,
      sorted: [...sorted],
      description: `选择基准元素：${pivot}（位置 ${high}）`,
      codeHighlight: 3,
    };
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      yield {
        array: [...array],
        comparing: [j],
        pivot: high,
        sorted: [...sorted],
        description: `比较 ${array[j]} 与基准 ${pivot}`,
        codeHighlight: 5,
      };
      
      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          yield {
            array: [...array],
            swapping: [i, j],
            pivot: high,
            sorted: [...sorted],
            description: `${array[j]} < ${pivot}，交换到左侧`,
            codeHighlight: 7,
          };
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    }
    
    if (i + 1 !== high) {
      yield {
        array: [...array],
        swapping: [i + 1, high],
        sorted: [...sorted],
        description: `将基准 ${pivot} 放到正确位置 ${i + 1}`,
        codeHighlight: 9,
      };
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
    }
    
    sorted.add(i + 1);
    yield {
      array: [...array],
      highlight: [i + 1],
      sorted: [...sorted],
      description: `基准 ${pivot} 已就位`,
      codeHighlight: 10,
    };
    
    return i + 1;
  }
  
  function* quickSort(low: number, high: number): Generator<AlgorithmStep> {
    if (low < high) {
      const gen = partition(low, high);
      let result = gen.next();
      while (!result.done) {
        yield result.value;
        result = gen.next();
      }
      const pi = result.value;
      
      yield* quickSort(low, pi - 1);
      yield* quickSort(pi + 1, high);
    } else if (low === high) {
      sorted.add(low);
    }
  }
  
  yield {
    array: [...array],
    description: '开始快速排序',
    codeHighlight: 1,
  };
  
  yield* quickSort(0, array.length - 1);
  
  yield {
    array: [...array],
    sorted: array.map((_, i) => i),
    description: '排序完成！',
    codeHighlight: 15,
  };
}

// 归并排序步骤生成器
function* mergeSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  
  function* mergeSort(left: number, right: number): Generator<AlgorithmStep> {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    
    yield {
      array: [...array],
      highlight: Array.from({ length: mid - left + 1 }, (_, i) => left + i),
      description: `分割：处理 [${left}..${mid}]`,
      codeHighlight: 4,
    };
    
    yield* mergeSort(left, mid);
    
    yield {
      array: [...array],
      highlight: Array.from({ length: right - mid }, (_, i) => mid + 1 + i),
      description: `分割：处理 [${mid + 1}..${right}]`,
      codeHighlight: 5,
    };
    
    yield* mergeSort(mid + 1, right);
    
    // 合并
    yield* merge(left, mid, right);
  }
  
  function* merge(left: number, mid: number, right: number): Generator<AlgorithmStep> {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    yield {
      array: [...array],
      comparing: [left, mid + 1],
      description: `合并：[${left}..${mid}] 和 [${mid + 1}..${right}]`,
      codeHighlight: 8,
    };
    
    while (i < leftArr.length && j < rightArr.length) {
      yield {
        array: [...array],
        comparing: [left + i, mid + 1 + j],
        description: `比较 ${leftArr[i]} 和 ${rightArr[j]}`,
        codeHighlight: 12,
      };
      
      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }
      k++;
      
      yield {
        array: [...array],
        highlight: Array.from({ length: k - left }, (_, idx) => left + idx),
        description: `放置较小元素`,
        codeHighlight: 13,
      };
    }
    
    while (i < leftArr.length) {
      array[k] = leftArr[i];
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      array[k] = rightArr[j];
      j++;
      k++;
    }
    
    yield {
      array: [...array],
      highlight: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      description: `合并完成：[${left}..${right}]`,
      codeHighlight: 18,
    };
  }
  
  yield {
    array: [...array],
    description: '开始归并排序',
    codeHighlight: 1,
  };
  
  yield* mergeSort(0, array.length - 1);
  
  yield {
    array: [...array],
    sorted: array.map((_, i) => i),
    description: '排序完成！',
    codeHighlight: 22,
  };
}

// 二分查找步骤生成器
function* binarySearchSteps(arr: number[], target: number): Generator<AlgorithmStep> {
  const array = [...arr].sort((a, b) => a - b);
  let left = 0;
  let right = array.length - 1;
  
  yield {
    array: [...array],
    description: `在有序数组中查找 ${target}`,
    codeHighlight: 1,
  };
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    yield {
      array: [...array],
      comparing: [mid],
      highlight: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      description: `中间位置 ${mid}，值 ${array[mid]}`,
      codeHighlight: 4,
    };
    
    if (array[mid] === target) {
      yield {
        array: [...array],
        comparing: [mid],
        description: `找到目标 ${target}，位置 ${mid}`,
        codeHighlight: 6,
      };
      return;
    } else if (array[mid] < target) {
      yield {
        array: [...array],
        highlight: Array.from({ length: right - mid }, (_, i) => mid + 1 + i),
        description: `${array[mid]} < ${target}，搜索右半部分`,
        codeHighlight: 8,
      };
      left = mid + 1;
    } else {
      yield {
        array: [...array],
        highlight: Array.from({ length: mid - left }, (_, i) => left + i),
        description: `${array[mid]} > ${target}，搜索左半部分`,
        codeHighlight: 10,
      };
      right = mid - 1;
    }
  }
  
  yield {
    array: [...array],
    description: `未找到目标 ${target}`,
    codeHighlight: 14,
  };
}

// 选择排序步骤生成器
function* selectionSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];
  
  yield {
    array: [...array],
    description: '开始选择排序',
    codeHighlight: 1,
  };
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    yield {
      array: [...array],
      highlight: [i],
      sorted: [...sorted],
      description: `寻找位置 ${i} 的最小元素`,
      codeHighlight: 3,
    };
    
    for (let j = i + 1; j < n; j++) {
      yield {
        array: [...array],
        comparing: [minIdx, j],
        sorted: [...sorted],
        description: `比较 ${array[minIdx]} 和 ${array[j]}`,
        codeHighlight: 5,
      };
      
      if (array[j] < array[minIdx]) {
        minIdx = j;
        yield {
          array: [...array],
          highlight: [minIdx],
          sorted: [...sorted],
          description: `发现更小元素 ${array[minIdx]}`,
          codeHighlight: 6,
        };
      }
    }
    
    if (minIdx !== i) {
      yield {
        array: [...array],
        swapping: [i, minIdx],
        sorted: [...sorted],
        description: `交换 ${array[i]} 和 ${array[minIdx]}`,
        codeHighlight: 8,
      };
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
    
    sorted.push(i);
    yield {
      array: [...array],
      sorted: [...sorted],
      description: `位置 ${i} 已排序`,
      codeHighlight: 10,
    };
  }
  sorted.push(n - 1);
  
  yield {
    array: [...array],
    sorted: sorted,
    description: '排序完成！',
    codeHighlight: 12,
  };
}

// 插入排序步骤生成器
function* insertionSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [0];
  
  yield {
    array: [...array],
    sorted: [0],
    description: '开始插入排序，首个元素已排序',
    codeHighlight: 1,
  };
  
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    
    yield {
      array: [...array],
      highlight: [i],
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `插入元素 ${key}`,
      codeHighlight: 3,
    };
    
    while (j >= 0 && array[j] > key) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => k).filter(k => k < j),
        description: `${array[j]} > ${key}，后移`,
        codeHighlight: 5,
      };
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = key;
    sorted.push(i);
    
    yield {
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `插入 ${key} 到位置 ${j + 1}`,
      codeHighlight: 8,
    };
  }
  
  yield {
    array: [...array],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: '排序完成！',
    codeHighlight: 10,
  };
}

// 堆排序步骤生成器
function* heapSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];
  
  function* heapify(size: number, i: number): Generator<AlgorithmStep> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < size && array[left] > array[largest]) largest = left;
    if (right < size && array[right] > array[largest]) largest = right;
    
    if (largest !== i) {
      yield {
        array: [...array],
        swapping: [i, largest],
        sorted: [...sorted],
        description: `交换 ${array[i]} 和 ${array[largest]}`,
        codeHighlight: 5,
      };
      [array[i], array[largest]] = [array[largest], array[i]];
      yield* heapify(size, largest);
    }
  }
  
  yield {
    array: [...array],
    description: '开始堆排序，先建立最大堆',
    codeHighlight: 1,
  };
  
  // 建堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }
  
  yield {
    array: [...array],
    description: '最大堆建立完成',
    codeHighlight: 8,
  };
  
  // 排序
  for (let i = n - 1; i > 0; i--) {
    yield {
      array: [...array],
      swapping: [0, i],
      sorted: [...sorted],
      description: `将堆顶 ${array[0]} 移到位置 ${i}`,
      codeHighlight: 10,
    };
    [array[0], array[i]] = [array[i], array[0]];
    sorted.unshift(i);
    
    yield {
      array: [...array],
      sorted: [...sorted],
      description: `位置 ${i} 已排序`,
      codeHighlight: 12,
    };
    
    yield* heapify(i, 0);
  }
  
  sorted.unshift(0);
  yield {
    array: [...array],
    sorted: sorted,
    description: '排序完成！',
    codeHighlight: 15,
  };
}

// DFS遍历步骤生成器
function* dfsSteps(nodes: number, edges: [number, number][]): Generator<AlgorithmStep> {
  // 构建邻接表
  const adj: number[][] = Array.from({ length: nodes }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  
  const array = Array.from({ length: nodes }, (_, i) => i);
  const visited: boolean[] = Array(nodes).fill(false);
  const visitedNodes: number[] = [];
  
  function* dfs(node: number): Generator<AlgorithmStep> {
    visited[node] = true;
    visitedNodes.push(node);
    
    yield {
      array: [...array],
      highlight: [node],
      sorted: [...visitedNodes],
      description: `访问节点 ${node}`,
      codeHighlight: 3,
    };
    
    for (const neighbor of adj[node].sort((a, b) => a - b)) {
      if (!visited[neighbor]) {
        yield {
          array: [...array],
          comparing: [node, neighbor],
          sorted: [...visitedNodes],
          description: `从 ${node} 探索邻居 ${neighbor}`,
          codeHighlight: 5,
        };
        yield* dfs(neighbor);
      }
    }
    
    yield {
      array: [...array],
      sorted: [...visitedNodes],
      description: `节点 ${node} 处理完成，回溯`,
      codeHighlight: 8,
    };
  }
  
  yield {
    array: [...array],
    description: `开始DFS遍历，共 ${nodes} 个节点`,
    codeHighlight: 1,
  };
  
  yield* dfs(0);
  
  yield {
    array: [...array],
    sorted: visitedNodes,
    description: `DFS遍历完成: ${visitedNodes.join(' → ')}`,
    codeHighlight: 12,
  };
}

// BFS遍历步骤生成器
function* bfsSteps(nodes: number, edges: [number, number][]): Generator<AlgorithmStep> {
  // 构建邻接表
  const adj: number[][] = Array.from({ length: nodes }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  
  const array = Array.from({ length: nodes }, (_, i) => i);
  const visited: boolean[] = Array(nodes).fill(false);
  const visitedNodes: number[] = [];
  const queue: number[] = [0];
  visited[0] = true;
  
  yield {
    array: [...array],
    highlight: [0],
    description: `开始BFS遍历，起始节点 0 入队`,
    codeHighlight: 1,
  };
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    visitedNodes.push(node);
    
    yield {
      array: [...array],
      highlight: [node],
      sorted: [...visitedNodes],
      description: `访问节点 ${node}`,
      codeHighlight: 4,
    };
    
    for (const neighbor of adj[node].sort((a, b) => a - b)) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
        yield {
          array: [...array],
          comparing: [node, neighbor],
          sorted: [...visitedNodes],
          description: `节点 ${neighbor} 入队`,
          codeHighlight: 6,
        };
      }
    }
    
    yield {
      array: [...array],
      sorted: [...visitedNodes],
      description: `节点 ${node} 处理完成`,
      codeHighlight: 9,
    };
  }
  
  yield {
    array: [...array],
    sorted: visitedNodes,
    description: `BFS遍历完成: ${visitedNodes.join(' → ')}`,
    codeHighlight: 12,
  };
}

// 获取算法步骤
function getAlgorithmSteps(algorithm: string, array: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  let generator: Generator<AlgorithmStep>;
  
  // 定义图的边（用于DFS和BFS）
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
  const nodes = 7;
  
  switch (algorithm) {
    case 'bubble':
      generator = bubbleSortSteps(array);
      break;
    case 'quick':
      generator = quickSortSteps(array);
      break;
    case 'merge':
      generator = mergeSortSteps(array);
      break;
    case 'binary':
      generator = binarySearchSteps(array, 5);
      break;
    case 'selection':
      generator = selectionSortSteps(array);
      break;
    case 'insertion':
      generator = insertionSortSteps(array);
      break;
    case 'heap':
      generator = heapSortSteps(array);
      break;
    case 'dfs':
      generator = dfsSteps(nodes, edges);
      break;
    case 'bfs':
      generator = bfsSteps(nodes, edges);
      break;
    default:
      generator = bubbleSortSteps(array);
  }
  
  for (const step of generator) {
    steps.push(step);
  }
  
  return steps;
}

// 获取算法代码
function getAlgorithmCode(algorithm: string): string {
  const codes: Record<string, string> = {
    bubble: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`,
    quick: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i+1], arr[high]);
        int pi = i + 1;
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    merge: `void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;
    
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void merge(int arr[], int l, int m, int r) {
    int leftArr[] = arr[l..m];
    int rightArr[] = arr[m+1..r];
    
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j])
            arr[k++] = leftArr[i++];
        else
            arr[k++] = rightArr[j++];
    }
    // 复制剩余元素
}`,
    binary: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    
    return -1;
}`,
    selection: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        if (minIdx != i)
            swap(arr[i], arr[minIdx]);
    }
}`,
    insertion: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}`,
    heap: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2*i + 1;
    int right = 2*i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n/2-1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n-1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
    dfs: `void DFS(int u, vector<int> adj[], bool visited[]) {
    visited[u] = true;
    cout << u << " ";
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            DFS(v, adj, visited);
        }
    }
}`,
    bfs: `void BFS(int start, vector<int> adj[], bool visited[]) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
  };
  
  return codes[algorithm] || codes.bubble;
}

export function AlgorithmVisualization({ 
  title, 
  description, 
  algorithm,
  initialArray = [64, 34, 25, 12, 22, 11, 90, 45, 33, 88]
}: AlgorithmVisualizationProps) {
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [state, setState] = useState<AnimationState>('idle');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // 初始化步骤
  useEffect(() => {
    const newSteps = getAlgorithmSteps(algorithm, initialArray);
    setSteps(newSteps);
    setCurrentStep(0);
    setState('idle');
  }, [algorithm, initialArray]);
  
  // 播放动画
  useEffect(() => {
    if (state === 'playing') {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setState('finished');
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state, speed, steps.length]);
  
  const handlePlay = () => {
    if (state === 'finished') {
      setCurrentStep(0);
    }
    setState('playing');
  };
  
  const handlePause = () => {
    setState('paused');
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setState('idle');
  };
  
  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setState('paused');
    }
  };
  
  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setState('paused');
    }
  };
  
  const currentData = steps[currentStep];
  const maxValue = Math.max(...initialArray);
  
  return (
    <div className="space-y-6">
      {/* 标题和描述 */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Badge variant="outline" className="text-sm">
          步骤 {currentStep + 1} / {steps.length}
        </Badge>
      </div>
      
      {/* 控制面板 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            {/* 播放控制 */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                disabled={currentStep === 0 && state === 'idle'}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleStepBack}
                disabled={currentStep === 0}
              >
                <StepBack className="h-4 w-4" />
              </Button>
              
              {state === 'playing' ? (
                <Button size="icon" onClick={handlePause}>
                  <Pause className="h-4 w-4" />
                </Button>
              ) : (
                <Button size="icon" onClick={handlePlay}>
                  <Play className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleStepForward}
                disabled={currentStep >= steps.length - 1}
              >
                <StepForward className="h-4 w-4" />
              </Button>
            </div>
            
            {/* 速度控制 */}
            <div className="flex items-center gap-4 flex-1 max-w-xs">
              <span className="text-sm text-muted-foreground whitespace-nowrap">速度</span>
              <input
                type="range"
                min={100}
                max={1000}
                step={100}
                value={1100 - speed}
                onChange={(e) => setSpeed(1100 - parseInt(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm text-muted-foreground w-12">
                {Math.round(1100 / speed)}x
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 可视化区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 数组可视化 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">数组可视化</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center gap-1 px-4">
              {currentData?.array.map((value, index) => {
                const isComparing = currentData.comparing?.includes(index);
                const isSwapping = currentData.swapping?.includes(index);
                const isSorted = currentData.sorted?.includes(index);
                const isPivot = currentData.pivot === index;
                const isHighlight = currentData.highlight?.includes(index);
                
                return (
                  <motion.div
                    key={`${index}-${value}`}
                    initial={false}
                    animate={{
                      height: `${(value / maxValue) * 100}%`,
                      backgroundColor: isSwapping 
                        ? '#ef4444' 
                        : isComparing 
                          ? '#f59e0b' 
                          : isPivot 
                            ? '#8b5cf6'
                            : isSorted 
                              ? '#22c55e' 
                              : isHighlight 
                                ? '#3b82f6'
                                : '#64748b',
                      scale: isComparing || isSwapping ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-8 rounded-t-md flex flex-col items-center justify-end relative"
                  >
                    <span className="absolute -top-6 text-xs font-medium text-foreground">
                      {value}
                    </span>
                    <span className="text-xs text-white/80 mb-1">
                      {index}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            
            {/* 图例 */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-500" />
                <span className="text-sm">比较中</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500" />
                <span className="text-sm">交换中</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500" />
                <span className="text-sm">已排序</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-500" />
                <span className="text-sm">基准元素</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-500" />
                <span className="text-sm">当前范围</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 代码展示 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">算法代码</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
              <code>
                {getAlgorithmCode(algorithm).split('\n').map((line, index) => (
                  <div 
                    key={index} 
                    className={`px-2 ${
                      currentData?.codeHighlight && index + 1 === currentData.codeHighlight
                        ? 'bg-yellow-200 dark:bg-yellow-900/30 -mx-2'
                        : ''
                    }`}
                  >
                    <span className="text-muted-foreground select-none mr-4 inline-block w-6">
                      {index + 1}
                    </span>
                    {line}
                  </div>
                ))}
              </code>
            </pre>
          </CardContent>
        </Card>
      </div>
      
      {/* 当前步骤说明 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-sm">
              {currentData?.description || '点击播放开始演示'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

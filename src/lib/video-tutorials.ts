/**
 * 视频教程数据结构
 */

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  knowledgePoints: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // 分钟
  videoId: string; // B站视频BV号
  thumbnail?: string;
  author: string;
  views: number;
  likes: number;
  tags: string[];
}

export interface VideoCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const videoCategories: VideoCategory[] = [
  { id: 'basics', name: '基础语法', icon: '📝', description: 'C++基础语法入门' },
  { id: 'data-structure', name: '数据结构', icon: '🏗️', description: '数组、链表、树、图等' },
  { id: 'algorithm', name: '算法基础', icon: '⚡', description: '排序、搜索、递归等' },
  { id: 'dp', name: '动态规划', icon: '📊', description: 'DP入门到进阶' },
  { id: 'graph', name: '图论', icon: '🕸️', description: '图的遍历、最短路、生成树' },
  { id: 'number-theory', name: '数论', icon: '🔢', description: 'GCD、素数、快速幂' },
  { id: 'string', name: '字符串', icon: '🔤', description: '字符串匹配、处理' },
  { id: 'competition', name: '竞赛技巧', icon: '🏆', description: 'NOIP/NOI专题' },
];

// 视频教程列表（使用示例B站视频ID）
export const videoTutorials: VideoTutorial[] = [
  // 基础语法
  {
    id: 'v1',
    title: 'C++基础入门：变量与数据类型',
    description: '从零开始学习C++，讲解变量定义、数据类型、输入输出等基础知识',
    category: 'basics',
    knowledgePoints: ['变量定义', '数据类型', '输入输出'],
    difficulty: 'beginner',
    duration: 15,
    videoId: 'BV1xxx1', // 示例ID
    author: '算法学院',
    views: 12500,
    likes: 856,
    tags: ['C++', '入门', '基础'],
  },
  {
    id: 'v2',
    title: 'C++条件语句与循环',
    description: '详细讲解if-else、switch、for、while等流程控制语句',
    category: 'basics',
    knowledgePoints: ['条件语句', '循环', '流程控制'],
    difficulty: 'beginner',
    duration: 20,
    videoId: 'BV1xxx2',
    author: '算法学院',
    views: 10200,
    likes: 723,
    tags: ['C++', '条件', '循环'],
  },
  {
    id: 'v3',
    title: 'C++数组与字符串',
    description: '一维数组、二维数组、字符串处理详解',
    category: 'basics',
    knowledgePoints: ['数组', '字符串', '遍历'],
    difficulty: 'beginner',
    duration: 25,
    videoId: 'BV1xxx3',
    author: '算法学院',
    views: 9800,
    likes: 612,
    tags: ['C++', '数组', '字符串'],
  },
  
  // 数据结构
  {
    id: 'v4',
    title: '数据结构入门：数组与链表',
    description: '理解数组与链表的区别，掌握基本操作',
    category: 'data-structure',
    knowledgePoints: ['数组', '链表', '时间复杂度'],
    difficulty: 'beginner',
    duration: 30,
    videoId: 'BV1ds411w7hZ',
    author: '数据结构专题',
    views: 15600,
    likes: 1120,
    tags: ['数据结构', '数组', '链表'],
  },
  {
    id: 'v5',
    title: '栈与队列详解',
    description: '栈的后进先出、队列的先进先出特性及经典应用',
    category: 'data-structure',
    knowledgePoints: ['栈', '队列', 'STL'],
    difficulty: 'intermediate',
    duration: 35,
    videoId: 'BV1ds411w7hZ',
    author: '数据结构专题',
    views: 13200,
    likes: 890,
    tags: ['数据结构', '栈', '队列'],
  },
  {
    id: 'v6',
    title: '二叉树基础与遍历',
    description: '二叉树的概念、前中后序遍历、层序遍历',
    category: 'data-structure',
    knowledgePoints: ['二叉树', '递归遍历', '层序遍历'],
    difficulty: 'intermediate',
    duration: 40,
    videoId: 'BV1ds411w7hZ',
    author: '数据结构专题',
    views: 18900,
    likes: 1560,
    tags: ['数据结构', '二叉树', '遍历'],
  },
  {
    id: 'v7',
    title: '线段树入门',
    description: '线段树的原理与实现，区间查询与修改',
    category: 'data-structure',
    knowledgePoints: ['线段树', '区间查询', '懒标记'],
    difficulty: 'advanced',
    duration: 50,
    videoId: 'BV1ds411w7hZ',
    author: '数据结构专题',
    views: 22100,
    likes: 1890,
    tags: ['数据结构', '线段树', '高级'],
  },
  
  // 算法基础
  {
    id: 'v8',
    title: '排序算法详解（上）',
    description: '冒泡排序、选择排序、插入排序的原理与实现',
    category: 'algorithm',
    knowledgePoints: ['冒泡排序', '选择排序', '插入排序'],
    difficulty: 'beginner',
    duration: 35,
    videoId: 'BV1ds411w7hZ',
    author: '算法专题',
    views: 25600,
    likes: 2100,
    tags: ['算法', '排序', '入门'],
  },
  {
    id: 'v9',
    title: '排序算法详解（下）',
    description: '快速排序、归并排序、堆排序的原理与实现',
    category: 'algorithm',
    knowledgePoints: ['快速排序', '归并排序', '堆排序'],
    difficulty: 'intermediate',
    duration: 45,
    videoId: 'BV1ds411w7hZ',
    author: '算法专题',
    views: 23400,
    likes: 1980,
    tags: ['算法', '排序', '进阶'],
  },
  {
    id: 'v10',
    title: '二分查找与二分答案',
    description: '二分查找的原理、实现及二分答案的应用',
    category: 'algorithm',
    knowledgePoints: ['二分查找', '二分答案', '边界处理'],
    difficulty: 'intermediate',
    duration: 40,
    videoId: 'BV1ds411w7hZ',
    author: '算法专题',
    views: 19800,
    likes: 1650,
    tags: ['算法', '二分', '查找'],
  },
  {
    id: 'v11',
    title: '递归与分治',
    description: '递归的原理、分治思想及经典例题',
    category: 'algorithm',
    knowledgePoints: ['递归', '分治', '汉诺塔'],
    difficulty: 'intermediate',
    duration: 35,
    videoId: 'BV1ds411w7hZ',
    author: '算法专题',
    views: 17500,
    likes: 1420,
    tags: ['算法', '递归', '分治'],
  },
  
  // 动态规划
  {
    id: 'v12',
    title: '动态规划入门：斐波那契数列',
    description: '理解DP的状态定义和状态转移方程',
    category: 'dp',
    knowledgePoints: ['DP入门', '状态定义', '状态转移'],
    difficulty: 'beginner',
    duration: 30,
    videoId: 'BV1ds411w7hZ',
    author: 'DP专题',
    views: 32100,
    likes: 2780,
    tags: ['DP', '入门', '斐波那契'],
  },
  {
    id: 'v13',
    title: '背包问题专题（一）：01背包',
    description: '01背包的状态定义、转移方程和空间优化',
    category: 'dp',
    knowledgePoints: ['01背包', '空间优化', 'DP'],
    difficulty: 'intermediate',
    duration: 45,
    videoId: 'BV1ds411w7hZ',
    author: 'DP专题',
    views: 28900,
    likes: 2450,
    tags: ['DP', '背包问题', '进阶'],
  },
  {
    id: 'v14',
    title: '背包问题专题（二）：完全背包与多重背包',
    description: '完全背包和多重背包的解法',
    category: 'dp',
    knowledgePoints: ['完全背包', '多重背包', '二进制优化'],
    difficulty: 'advanced',
    duration: 50,
    videoId: 'BV1ds411w7hZ',
    author: 'DP专题',
    views: 21500,
    likes: 1820,
    tags: ['DP', '背包问题', '高级'],
  },
  {
    id: 'v15',
    title: 'LIS与LCS问题',
    description: '最长上升子序列和最长公共子序列的DP解法',
    category: 'dp',
    knowledgePoints: ['LIS', 'LCS', 'DP优化'],
    difficulty: 'intermediate',
    duration: 40,
    videoId: 'BV1ds411w7hZ',
    author: 'DP专题',
    views: 19800,
    likes: 1650,
    tags: ['DP', 'LIS', 'LCS'],
  },
  
  // 图论
  {
    id: 'v16',
    title: '图的存储与遍历',
    description: '邻接矩阵、邻接表、DFS与BFS遍历',
    category: 'graph',
    knowledgePoints: ['图的存储', 'DFS', 'BFS'],
    difficulty: 'intermediate',
    duration: 45,
    videoId: 'BV1ds411w7hZ',
    author: '图论专题',
    views: 24500,
    likes: 2100,
    tags: ['图论', 'DFS', 'BFS'],
  },
  {
    id: 'v17',
    title: '最短路算法（一）：Dijkstra',
    description: 'Dijkstra算法的原理、实现与优化',
    category: 'graph',
    knowledgePoints: ['Dijkstra', '最短路', '优先队列'],
    difficulty: 'intermediate',
    duration: 40,
    videoId: 'BV1ds411w7hZ',
    author: '图论专题',
    views: 26800,
    likes: 2340,
    tags: ['图论', '最短路', 'Dijkstra'],
  },
  {
    id: 'v18',
    title: '最短路算法（二）：SPFA与Floyd',
    description: 'SPFA处理负权边，Floyd全源最短路',
    category: 'graph',
    knowledgePoints: ['SPFA', 'Floyd', '负权边'],
    difficulty: 'advanced',
    duration: 50,
    videoId: 'BV1ds411w7hZ',
    author: '图论专题',
    views: 22100,
    likes: 1890,
    tags: ['图论', '最短路', '高级'],
  },
  {
    id: 'v19',
    title: '最小生成树：Kruskal与Prim',
    description: '两种最小生成树算法的原理与实现',
    category: 'graph',
    knowledgePoints: ['最小生成树', 'Kruskal', 'Prim'],
    difficulty: 'intermediate',
    duration: 45,
    videoId: 'BV1ds411w7hZ',
    author: '图论专题',
    views: 23400,
    likes: 2010,
    tags: ['图论', '最小生成树', '进阶'],
  },
  
  // 数论
  {
    id: 'v20',
    title: 'GCD与LCM',
    description: '最大公约数和最小公倍数的计算与应用',
    category: 'number-theory',
    knowledgePoints: ['GCD', 'LCM', '欧几里得'],
    difficulty: 'beginner',
    duration: 25,
    videoId: 'BV1ds411w7hZ',
    author: '数论专题',
    views: 18900,
    likes: 1560,
    tags: ['数论', 'GCD', '入门'],
  },
  {
    id: 'v21',
    title: '素数筛法：埃氏筛与欧拉筛',
    description: '两种素数筛法的原理与时间复杂度分析',
    category: 'number-theory',
    knowledgePoints: ['素数', '埃氏筛', '欧拉筛'],
    difficulty: 'intermediate',
    duration: 35,
    videoId: 'BV1ds411w7hZ',
    author: '数论专题',
    views: 21200,
    likes: 1780,
    tags: ['数论', '素数', '筛法'],
  },
  {
    id: 'v22',
    title: '快速幂与矩阵快速幂',
    description: '快速幂的原理、实现及矩阵快速幂应用',
    category: 'number-theory',
    knowledgePoints: ['快速幂', '矩阵快速幂', '模运算'],
    difficulty: 'intermediate',
    duration: 40,
    videoId: 'BV1ds411w7hZ',
    author: '数论专题',
    views: 24500,
    likes: 2120,
    tags: ['数论', '快速幂', '进阶'],
  },
  
  // 字符串
  {
    id: 'v23',
    title: '字符串哈希',
    description: '字符串哈希的原理与应用',
    category: 'string',
    knowledgePoints: ['字符串哈希', '哈希碰撞', '子串匹配'],
    difficulty: 'intermediate',
    duration: 35,
    videoId: 'BV1ds411w7hZ',
    author: '字符串专题',
    views: 16700,
    likes: 1380,
    tags: ['字符串', '哈希', '进阶'],
  },
  {
    id: 'v24',
    title: 'KMP算法详解',
    description: 'KMP字符串匹配算法的原理与实现',
    category: 'string',
    knowledgePoints: ['KMP', '字符串匹配', 'next数组'],
    difficulty: 'advanced',
    duration: 45,
    videoId: 'BV1ds411w7hZ',
    author: '字符串专题',
    views: 19800,
    likes: 1650,
    tags: ['字符串', 'KMP', '高级'],
  },
  
  // 竞赛技巧
  {
    id: 'v25',
    title: 'NOIP备考指南',
    description: 'NOIP竞赛的备考策略与注意事项',
    category: 'competition',
    knowledgePoints: ['NOIP', '备考', '策略'],
    difficulty: 'intermediate',
    duration: 30,
    videoId: 'BV1ds411w7hZ',
    author: '竞赛专题',
    views: 35600,
    likes: 3120,
    tags: ['竞赛', 'NOIP', '备考'],
  },
  {
    id: 'v26',
    title: '常见错误与调试技巧',
    description: '竞赛中常见的错误类型及调试方法',
    category: 'competition',
    knowledgePoints: ['调试', '常见错误', '技巧'],
    difficulty: 'beginner',
    duration: 25,
    videoId: 'BV1ds411w7hZ',
    author: '竞赛专题',
    views: 28900,
    likes: 2450,
    tags: ['竞赛', '调试', '技巧'],
  },
];

// 按分类获取视频
export function getVideosByCategory(category: string): VideoTutorial[] {
  return videoTutorials.filter(v => v.category === category);
}

// 搜索视频
export function searchVideos(keyword: string): VideoTutorial[] {
  const lower = keyword.toLowerCase();
  return videoTutorials.filter(v => 
    v.title.toLowerCase().includes(lower) ||
    v.description.toLowerCase().includes(lower) ||
    v.tags.some(tag => tag.toLowerCase().includes(lower)) ||
    v.knowledgePoints.some(kp => kp.toLowerCase().includes(lower))
  );
}

// 获取推荐视频
export function getRecommendedVideos(difficulty?: string, limit: number = 6): VideoTutorial[] {
  let filtered = videoTutorials;
  if (difficulty) {
    filtered = videoTutorials.filter(v => v.difficulty === difficulty);
  }
  return filtered.slice(0, limit);
}

// 知识点可视化和视频资源配置
// 包含动图演示URL和B站视频讲解链接

export interface VisualizationResource {
  knowledgeId: number;
  knowledgeSlug: string;
  // 可视化动图
  gifUrl?: string;
  // 可视化网站链接（如VisuAlgo）
  visualizerUrl?: string;
  // B站视频链接
  bilibiliUrl?: string;
  // 视频BV号
  bvNumber?: string;
  // 视频章节时间点
  videoSections?: {
    title: string;
    time: string; // 如 "00:30" 表示30秒
  }[];
  // 视频标题
  videoTitle?: string;
  // 视频作者
  videoAuthor?: string;
}

// 知识点可视化和视频资源数据
export const visualizationResources: VisualizationResource[] = [
  // ==================== 基础语法 ====================
  {
    knowledgeId: 1,
    knowledgeSlug: 'intro-cpp',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1ux411d75J',
    bvNumber: 'BV1ux411d75J',
    videoTitle: 'C++入门教程',
    videoAuthor: '黑马程序员',
    videoSections: [
      { title: '课程介绍', time: '00:00' },
      { title: 'C++历史', time: '05:30' },
      { title: '开发环境', time: '15:00' },
    ],
  },
  {
    knowledgeId: 2,
    knowledgeSlug: 'hello-world',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1ux411d75J',
    bvNumber: 'BV1ux411d75J',
    videoTitle: 'C++入门教程 - Hello World',
    videoAuthor: '黑马程序员',
    videoSections: [
      { title: '第一个程序', time: '20:00' },
      { title: '代码详解', time: '25:00' },
    ],
  },
  
  // ==================== 循环语句 ====================
  {
    knowledgeId: 19,
    knowledgeSlug: 'for-loop',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/basics/for-loop/animation.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1JQ4y1p7jX',
    bvNumber: 'BV1JQ4y1p7jX',
    videoTitle: 'C++循环语句详解',
    videoAuthor: '翁恺C语言程序设计',
    videoSections: [
      { title: 'for循环语法', time: '00:00' },
      { title: '循环执行过程', time: '10:00' },
      { title: '循环变量', time: '20:00' },
      { title: '嵌套循环', time: '30:00' },
    ],
  },
  {
    knowledgeId: 22,
    knowledgeSlug: 'while-loop',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/basics/while-loop/animation.gif',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1JQ4y1p7jX',
    bvNumber: 'BV1JQ4y1p7jX',
    videoTitle: 'C++循环语句详解 - while循环',
    videoAuthor: '翁恺C语言程序设计',
    videoSections: [
      { title: 'while循环语法', time: '40:00' },
      { title: 'do-while循环', time: '50:00' },
    ],
  },
  {
    knowledgeId: 25,
    knowledgeSlug: 'nested-loops',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/basics/nested-loop/animation.gif',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1JQ4y1p7jX',
    bvNumber: 'BV1JQ4y1p7jX',
    videoTitle: 'C++嵌套循环详解',
    videoAuthor: '翁恺C语言程序设计',
    videoSections: [
      { title: '嵌套循环原理', time: '30:00' },
      { title: '打印图形', time: '35:00' },
    ],
  },
  
  // ==================== 数组 ====================
  {
    knowledgeId: 27,
    knowledgeSlug: 'array-intro',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/basics/array/animation.gif',
    visualizerUrl: 'https://visualgo.net/zh/array',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bA411b7p4',
    bvNumber: 'BV1bA411b7p4',
    videoTitle: 'C++数组详解',
    videoAuthor: '黑马程序员',
    videoSections: [
      { title: '数组概念', time: '00:00' },
      { title: '数组声明', time: '10:00' },
      { title: '数组访问', time: '20:00' },
    ],
  },
  {
    knowledgeId: 33,
    knowledgeSlug: '2d-array',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/basics/2d-array/animation.gif',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bA411b7p4',
    bvNumber: 'BV1bA411b7p4',
    videoTitle: 'C++二维数组详解',
    videoAuthor: '黑马程序员',
    videoSections: [
      { title: '二维数组概念', time: '40:00' },
      { title: '二维数组遍历', time: '50:00' },
    ],
  },
  
  // ==================== 排序算法 ====================
  {
    knowledgeId: 38,
    knowledgeSlug: 'sort-intro',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/sorting/bubble-sort/animation.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Eb41177d1',
    bvNumber: 'BV1Eb41177d1',
    videoTitle: '十大经典排序算法',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: '排序概述', time: '00:00' },
      { title: '排序分类', time: '05:00' },
    ],
  },
  {
    knowledgeId: 39,
    knowledgeSlug: 'bubble-sort',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting?slide=1',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Eb41177d1',
    bvNumber: 'BV1Eb41177d1',
    videoTitle: '冒泡排序详解',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: '冒泡排序原理', time: '02:00' },
      { title: '动画演示', time: '05:00' },
      { title: '代码实现', time: '10:00' },
      { title: '时间复杂度', time: '15:00' },
    ],
  },
  {
    knowledgeId: 40,
    knowledgeSlug: 'stl-sort',
    visualizerUrl: 'https://visualgo.net/zh/sorting?slide=10',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Eb41177d1',
    bvNumber: 'BV1Eb41177d1',
    videoTitle: 'STL sort函数使用',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: 'STL sort介绍', time: '45:00' },
      { title: '自定义比较', time: '50:00' },
    ],
  },
  
  // ==================== 搜索算法 ====================
  {
    knowledgeId: 43,
    knowledgeSlug: 'binary-search',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg',
    visualizerUrl: 'https://visualgo.net/zh/bst',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Pt411B7qW',
    bvNumber: 'BV1Pt411B7qW',
    videoTitle: '二分查找详解',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: '二分查找原理', time: '00:00' },
      { title: '动画演示', time: '05:00' },
      { title: '代码实现', time: '10:00' },
      { title: '边界问题', time: '20:00' },
    ],
  },
  
  // ==================== 字符串处理 ====================
  {
    knowledgeId: 44,
    knowledgeSlug: 'string-intro',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bA411b7p4',
    bvNumber: 'BV1bA411b7p4',
    videoTitle: 'C++字符串详解',
    videoAuthor: '黑马程序员',
    videoSections: [
      { title: '字符串概念', time: '60:00' },
      { title: 'string类使用', time: '70:00' },
    ],
  },
  {
    knowledgeId: 45,
    knowledgeSlug: 'string-ops',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bA411b7p4',
    bvNumber: 'BV1bA411b7p4',
    videoTitle: 'C++字符串操作',
    videoAuthor: '黑马程序员',
    videoSections: [
      { title: '字符串拼接', time: '75:00' },
      { title: '子串操作', time: '80:00' },
    ],
  },
  
  // ==================== 递归 ====================
  {
    knowledgeId: 47,
    knowledgeSlug: 'recursion-intro',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/basics/recursion/animation.gif',
    visualizerUrl: 'https://visualgo.net/zh/recursion',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Zt411o7gC',
    bvNumber: 'BV1Zt411o7gC',
    videoTitle: '递归算法详解',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: '递归概念', time: '00:00' },
      { title: '递归要素', time: '05:00' },
      { title: '经典案例', time: '15:00' },
      { title: '递归vs循环', time: '30:00' },
    ],
  },
  {
    knowledgeId: 48,
    knowledgeSlug: 'recursion-examples',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Tower_of_Hanoi.gif',
    visualizerUrl: 'https://visualgo.net/zh/recursion',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Zt411o7gC',
    bvNumber: 'BV1Zt411o7gC',
    videoTitle: '递归经典案例',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: '斐波那契数列', time: '15:00' },
      { title: '汉诺塔问题', time: '25:00' },
    ],
  },
  
  // ==================== 动态规划 ====================
  {
    knowledgeId: 49,
    knowledgeSlug: 'dp-intro',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/dynamic-programming/basics/animation.gif',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bb411e7j5',
    bvNumber: 'BV1bb411e7j5',
    videoTitle: '动态规划入门',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: 'DP概念', time: '00:00' },
      { title: '重叠子问题', time: '10:00' },
      { title: '最优子结构', time: '20:00' },
      { title: '状态转移', time: '30:00' },
    ],
  },
  {
    knowledgeId: 50,
    knowledgeSlug: 'dp-climbing-stairs',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/dynamic-programming/climbing-stairs/animation.gif',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bb411e7j5',
    bvNumber: 'BV1bb411e7j5',
    videoTitle: '爬楼梯问题',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: '问题描述', time: '40:00' },
      { title: '状态定义', time: '45:00' },
      { title: '状态转移', time: '50:00' },
    ],
  },
  {
    knowledgeId: 51,
    knowledgeSlug: 'dp-knapsack',
    gifUrl: 'https://cdn.jsdelivr.net/gh/algorithm-visualizer/trust-server@master/public/algorithms/dynamic-programming/knapsack/animation.gif',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Fv411m7Mz',
    bvNumber: 'BV1Fv411m7Mz',
    videoTitle: '背包问题九讲',
    videoAuthor: '崔添翼',
    videoSections: [
      { title: '背包问题介绍', time: '00:00' },
      { title: '状态定义', time: '10:00' },
      { title: '状态转移方程', time: '20:00' },
      { title: '空间优化', time: '40:00' },
    ],
  },
  
  // ==================== 图论 ====================
  {
    knowledgeId: 52,
    knowledgeSlug: 'graph-intro',
    visualizerUrl: 'https://visualgo.net/zh/graphds',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Kx411f7bL',
    bvNumber: 'BV1Kx411f7bL',
    videoTitle: '图论基础',
    videoAuthor: '青岛大学-王卓',
    videoSections: [
      { title: '图的概念', time: '00:00' },
      { title: '图的表示', time: '20:00' },
      { title: '图的遍历', time: '40:00' },
    ],
  },
  {
    knowledgeId: 53,
    knowledgeSlug: 'bfs',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif',
    visualizerUrl: 'https://visualgo.net/zh/dfsbfs',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Kx411f7bL',
    bvNumber: 'BV1Kx411f7bL',
    videoTitle: 'BFS广度优先搜索',
    videoAuthor: '青岛大学-王卓',
    videoSections: [
      { title: 'BFS原理', time: '45:00' },
      { title: 'BFS实现', time: '55:00' },
      { title: 'BFS应用', time: '70:00' },
    ],
  },
  {
    knowledgeId: 54,
    knowledgeSlug: 'dfs',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif',
    visualizerUrl: 'https://visualgo.net/zh/dfsbfs',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Kx411f7bL',
    bvNumber: 'BV1Kx411f7bL',
    videoTitle: 'DFS深度优先搜索',
    videoAuthor: '青岛大学-王卓',
    videoSections: [
      { title: 'DFS原理', time: '60:00' },
      { title: 'DFS实现', time: '70:00' },
      { title: 'DFS应用', time: '85:00' },
    ],
  },
  
  // ==================== 数学基础 ====================
  {
    knowledgeId: 55,
    knowledgeSlug: 'gcd-lcm',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1tZ4y1M71R',
    bvNumber: 'BV1tZ4y1M71R',
    videoTitle: 'GCD和LCM详解',
    videoAuthor: '李永乐老师',
    videoSections: [
      { title: '最大公约数', time: '00:00' },
      { title: '辗转相除法', time: '10:00' },
      { title: '最小公倍数', time: '25:00' },
    ],
  },
  {
    knowledgeId: 56,
    knowledgeSlug: 'prime',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Tb411j7uB',
    bvNumber: 'BV1Tb411j7uB',
    videoTitle: '素数与筛法',
    videoAuthor: '李永乐老师',
    videoSections: [
      { title: '素数概念', time: '00:00' },
      { title: '埃氏筛法', time: '15:00' },
      { title: '欧拉筛', time: '30:00' },
    ],
  },
  
  // ==================== 复杂度 ====================
  {
    knowledgeId: 57,
    knowledgeSlug: 'complexity-intro',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1nJ411V7pf',
    bvNumber: 'BV1nJ411V7pf',
    videoTitle: '算法复杂度分析',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: '时间复杂度概念', time: '00:00' },
      { title: '大O表示法', time: '10:00' },
      { title: '常见复杂度', time: '20:00' },
      { title: '复杂度计算', time: '30:00' },
    ],
  },
  
  // ==================== 贪心算法 ====================
  {
    knowledgeId: 59,
    knowledgeSlug: 'greedy-intro',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1SE411j7By',
    bvNumber: 'BV1SE411j7By',
    videoTitle: '贪心算法详解',
    videoAuthor: '正月点灯笼',
    videoSections: [
      { title: '贪心概念', time: '00:00' },
      { title: '贪心证明', time: '15:00' },
      { title: '典型例题', time: '30:00' },
    ],
  },
];

// 根据知识点ID获取可视化资源
export function getVisualizationResource(knowledgeId: number): VisualizationResource | undefined {
  return visualizationResources.find(r => r.knowledgeId === knowledgeId);
}

// 根据slug获取可视化资源
export function getVisualizationResourceBySlug(slug: string): VisualizationResource | undefined {
  return visualizationResources.find(r => r.knowledgeSlug === slug);
}

// 获取所有带视频的知识点
export function getKnowledgeWithVideos(): VisualizationResource[] {
  return visualizationResources.filter(r => r.bilibiliUrl);
}

// 获取所有带可视化工具的知识点
export function getKnowledgeWithVisualizers(): VisualizationResource[] {
  return visualizationResources.filter(r => r.visualizerUrl);
}

// 生成B站嵌入播放器URL
export function getBilibiliEmbedUrl(bvNumber: string): string {
  // B站嵌入播放器格式
  return `https://player.bilibili.com/player.html?bvid=${bvNumber}&high_quality=1&danmaku=0`;
}

// 生成带时间戳的B站视频链接
export function getBilibiliUrlWithTime(bvNumber: string, timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  return `https://www.bilibili.com/video/${bvNumber}?t=${timeStr}`;
}

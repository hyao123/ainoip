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
    videoTitle: 'C++入门教程',
    videoAuthor: '黑马程序员',
  },
  {
    knowledgeId: 2,
    knowledgeSlug: 'hello-world',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1ux411d75J',
    videoTitle: 'C++入门教程 - Hello World',
    videoAuthor: '黑马程序员',
  },
  
  // ==================== 循环语句 ====================
  {
    knowledgeId: 19,
    knowledgeSlug: 'for-loop',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/06/For-loop-diagram.png',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1JQ4y1p7jX',
    videoTitle: 'C++循环语句详解',
    videoAuthor: '翁恺C语言程序设计',
  },
  {
    knowledgeId: 22,
    knowledgeSlug: 'while-loop',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1JQ4y1p7jX',
    videoTitle: 'C++循环语句详解 - while循环',
    videoAuthor: '翁恺C语言程序设计',
  },
  {
    knowledgeId: 25,
    knowledgeSlug: 'nested-loops',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1JQ4y1p7jX',
    videoTitle: 'C++嵌套循环详解',
    videoAuthor: '翁恺C语言程序设计',
  },
  
  // ==================== 数组 ====================
  {
    knowledgeId: 27,
    knowledgeSlug: 'array-intro',
    visualizerUrl: 'https://visualgo.net/zh/array',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bA411b7p4',
    videoTitle: 'C++数组详解',
    videoAuthor: '黑马程序员',
  },
  {
    knowledgeId: 33,
    knowledgeSlug: '2d-array',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bA411b7p4',
    videoTitle: 'C++二维数组详解',
    videoAuthor: '黑马程序员',
  },
  
  // ==================== 排序算法 ====================
  {
    knowledgeId: 38,
    knowledgeSlug: 'sort-intro',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Eb41177d1',
    videoTitle: '十大经典排序算法',
    videoAuthor: '正月点灯笼',
  },
  {
    knowledgeId: 39,
    knowledgeSlug: 'bubble-sort',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting?slide=1',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Eb41177d1',
    videoTitle: '冒泡排序详解',
    videoAuthor: '正月点灯笼',
  },
  {
    knowledgeId: 40,
    knowledgeSlug: 'stl-sort',
    visualizerUrl: 'https://visualgo.net/zh/sorting?slide=10',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Eb41177d1',
    videoTitle: 'STL sort函数使用',
    videoAuthor: '正月点灯笼',
  },
  
  // ==================== 搜索算法 ====================
  {
    knowledgeId: 43,
    knowledgeSlug: 'binary-search',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg',
    visualizerUrl: 'https://visualgo.net/zh/bst',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Pt411B7qW',
    videoTitle: '二分查找详解',
    videoAuthor: '正月点灯笼',
  },
  
  // ==================== 字符串处理 ====================
  {
    knowledgeId: 44,
    knowledgeSlug: 'string-intro',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bA411b7p4',
    videoTitle: 'C++字符串详解',
    videoAuthor: '黑马程序员',
  },
  {
    knowledgeId: 45,
    knowledgeSlug: 'string-ops',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bA411b7p4',
    videoTitle: 'C++字符串操作',
    videoAuthor: '黑马程序员',
  },
  
  // ==================== 递归 ====================
  {
    knowledgeId: 47,
    knowledgeSlug: 'recursion-intro',
    visualizerUrl: 'https://visualgo.net/zh/recursion',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Zt411o7gC',
    videoTitle: '递归算法详解',
    videoAuthor: '正月点灯笼',
  },
  {
    knowledgeId: 48,
    knowledgeSlug: 'recursion-examples',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Tower_of_Hanoi.gif',
    visualizerUrl: 'https://visualgo.net/zh/recursion',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Zt411o7gC',
    videoTitle: '递归经典案例 - 汉诺塔',
    videoAuthor: '正月点灯笼',
  },
  
  // ==================== 动态规划 ====================
  {
    knowledgeId: 49,
    knowledgeSlug: 'dp-intro',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bb411e7j5',
    videoTitle: '动态规划入门',
    videoAuthor: '正月点灯笼',
  },
  {
    knowledgeId: 50,
    knowledgeSlug: 'dp-climbing-stairs',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1bb411e7j5',
    videoTitle: '爬楼梯问题',
    videoAuthor: '正月点灯笼',
  },
  {
    knowledgeId: 51,
    knowledgeSlug: 'dp-knapsack',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Fv411m7Mz',
    videoTitle: '背包问题九讲',
    videoAuthor: '崔添翼',
  },
  
  // ==================== 图论 ====================
  {
    knowledgeId: 52,
    knowledgeSlug: 'graph-intro',
    visualizerUrl: 'https://visualgo.net/zh/graphds',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Kx411f7bL',
    videoTitle: '图论基础',
    videoAuthor: '青岛大学-王卓',
  },
  {
    knowledgeId: 53,
    knowledgeSlug: 'bfs',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif',
    visualizerUrl: 'https://visualgo.net/zh/dfsbfs',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Kx411f7bL',
    videoTitle: 'BFS广度优先搜索',
    videoAuthor: '青岛大学-王卓',
  },
  {
    knowledgeId: 54,
    knowledgeSlug: 'dfs',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif',
    visualizerUrl: 'https://visualgo.net/zh/dfsbfs',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Kx411f7bL',
    videoTitle: 'DFS深度优先搜索',
    videoAuthor: '青岛大学-王卓',
  },
  
  // ==================== 数学基础 ====================
  {
    knowledgeId: 55,
    knowledgeSlug: 'gcd-lcm',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1tZ4y1M71R',
    videoTitle: 'GCD和LCM详解',
    videoAuthor: '李永乐老师',
  },
  {
    knowledgeId: 56,
    knowledgeSlug: 'prime',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1Tb411j7uB',
    videoTitle: '素数与筛法',
    videoAuthor: '李永乐老师',
  },
  
  // ==================== 复杂度 ====================
  {
    knowledgeId: 57,
    knowledgeSlug: 'complexity-intro',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1nJ411V7pf',
    videoTitle: '算法复杂度分析',
    videoAuthor: '正月点灯笼',
  },
  
  // ==================== 贪心算法 ====================
  {
    knowledgeId: 59,
    knowledgeSlug: 'greedy-intro',
    bilibiliUrl: 'https://www.bilibili.com/video/BV1SE411j7By',
    videoTitle: '贪心算法详解',
    videoAuthor: '正月点灯笼',
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

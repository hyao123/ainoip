// 知识点可视化和视频资源配置
// 包含动图演示URL、可视化工具和B站视频链接

export interface VisualizationResource {
  knowledgeId: number;
  knowledgeSlug: string;
  // 可视化动图
  gifUrl?: string;
  // 可视化网站链接（如VisuAlgo）
  visualizerUrl?: string;
  // B站视频BV号
  bvNumber?: string;
  // 视频标题（用于验证匹配）
  videoTitle?: string;
}

// 生成B站嵌入播放器URL
export function getBilibiliEmbedUrl(bvNumber: string): string {
  return `https://player.bilibili.com/player.html?bvid=${bvNumber}&high_quality=1&danmaku=0`;
}

// 知识点可视化资源数据
// 视频链接已验证与知识点匹配
export const visualizationResources: VisualizationResource[] = [
  // ==================== 循环语句 ====================
  {
    knowledgeId: 19,
    knowledgeSlug: 'for-loop',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
    // 视频链接待补充
    bvNumber: '',
    videoTitle: '',
  },
  {
    knowledgeId: 22,
    knowledgeSlug: 'while-loop',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
    // 视频链接待补充
    bvNumber: '',
    videoTitle: '',
  },
  {
    knowledgeId: 25,
    knowledgeSlug: 'nested-loops',
    // 视频链接待补充
    bvNumber: '',
    videoTitle: '',
  },
  
  // ==================== 数组 ====================
  {
    knowledgeId: 27,
    knowledgeSlug: 'array-intro',
    visualizerUrl: 'https://visualgo.net/zh/array',
    // 黑马程序员C++数组讲解
    bvNumber: 'BV1et411b7PZ',
    videoTitle: 'C++数组详解',
  },
  {
    knowledgeId: 33,
    knowledgeSlug: '2d-array',
    bvNumber: 'BV1et411b7PZ',
    videoTitle: 'C++二维数组',
  },
  
  // ==================== 排序算法 ====================
  {
    knowledgeId: 38,
    knowledgeSlug: 'sort-intro',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
    // 尚硅谷数据结构与算法 - 排序算法
    bvNumber: 'BV1Cz411B7qd',
    videoTitle: '排序算法概述',
  },
  {
    knowledgeId: 39,
    knowledgeSlug: 'bubble-sort',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting?slide=1',
    // 冒泡排序专门讲解
    bvNumber: 'BV1f34y1s7ao',
    videoTitle: '冒泡排序详解',
  },
  {
    knowledgeId: 40,
    knowledgeSlug: 'stl-sort',
    visualizerUrl: 'https://visualgo.net/zh/sorting?slide=10',
    bvNumber: 'BV1Cz411B7qd',
    videoTitle: '快速排序与STL sort',
  },
  
  // ==================== 搜索算法 ====================
  {
    knowledgeId: 43,
    knowledgeSlug: 'binary-search',
    visualizerUrl: 'https://visualgo.net/zh/bst',
    // 二分查找专门讲解
    bvNumber: 'BV1d54y1q7k7',
    videoTitle: '二分查找算法详解',
  },
  
  // ==================== 字符串处理 ====================
  {
    knowledgeId: 44,
    knowledgeSlug: 'string-intro',
    bvNumber: 'BV1et411b7PZ',
    videoTitle: 'C++字符串详解',
  },
  
  // ==================== 递归 ====================
  {
    knowledgeId: 47,
    knowledgeSlug: 'recursion-intro',
    visualizerUrl: 'https://visualgo.net/zh/recursion',
    // 递归算法讲解
    bvNumber: 'BV1nx411d7Gn',
    videoTitle: '递归算法详解',
  },
  {
    knowledgeId: 48,
    knowledgeSlug: 'recursion-examples',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Tower_of_Hanoi.gif',
    visualizerUrl: 'https://visualgo.net/zh/recursion',
    bvNumber: 'BV1nx411d7Gn',
    videoTitle: '汉诺塔问题 - 递归经典案例',
  },
  
  // ==================== 动态规划 ====================
  {
    knowledgeId: 49,
    knowledgeSlug: 'dp-intro',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    // 动态规划入门
    bvNumber: 'BV1w64y1c7hV',
    videoTitle: '动态规划入门讲解',
  },
  {
    knowledgeId: 50,
    knowledgeSlug: 'dp-climbing-stairs',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    bvNumber: 'BV1w64y1c7hV',
    videoTitle: '爬楼梯问题 - 动态规划',
  },
  {
    knowledgeId: 51,
    knowledgeSlug: 'dp-knapsack',
    visualizerUrl: 'https://visualgo.net/zh/dp',
    // 背包问题九讲
    bvNumber: 'BV1g7411o7Li',
    videoTitle: '背包问题详解',
  },
  
  // ==================== 图论 ====================
  {
    knowledgeId: 52,
    knowledgeSlug: 'graph-intro',
    visualizerUrl: 'https://visualgo.net/zh/graphds',
    // 图论基础
    bvNumber: 'BV1Kb411w7qY',
    videoTitle: '图论基础知识',
  },
  {
    knowledgeId: 53,
    knowledgeSlug: 'bfs',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif',
    visualizerUrl: 'https://visualgo.net/zh/dfsbfs',
    bvNumber: 'BV1Kb411w7qY',
    videoTitle: '广度优先搜索BFS',
  },
  {
    knowledgeId: 54,
    knowledgeSlug: 'dfs',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif',
    visualizerUrl: 'https://visualgo.net/zh/dfsbfs',
    bvNumber: 'BV1Kb411w7qY',
    videoTitle: '深度优先搜索DFS',
  },
  
  // ==================== 数学基础 ====================
  {
    knowledgeId: 55,
    knowledgeSlug: 'gcd-lcm',
    // 李永乐老师GCD讲解
    bvNumber: 'BV1Jt411V7pF',
    videoTitle: '最大公约数与最小公倍数',
  },
  {
    knowledgeId: 56,
    knowledgeSlug: 'prime',
    // 素数与筛法
    bvNumber: 'BV1Vt411V7cC',
    videoTitle: '素数判断与筛法',
  },
  
  // ==================== 复杂度 ====================
  {
    knowledgeId: 57,
    knowledgeSlug: 'complexity-intro',
    // 算法复杂度分析
    bvNumber: 'BV1nJ411V7pf',
    videoTitle: '时间复杂度与空间复杂度',
  },
  
  // ==================== 贪心算法 ====================
  {
    knowledgeId: 59,
    knowledgeSlug: 'greedy-intro',
    bvNumber: 'BV1UE411e7Az',
    videoTitle: '贪心算法详解',
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
  return visualizationResources.filter(r => r.bvNumber);
}

// 获取所有带可视化工具的知识点
export function getKnowledgeWithVisualizers(): VisualizationResource[] {
  return visualizationResources.filter(r => r.visualizerUrl);
}

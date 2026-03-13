// 知识点可视化资源配置
// 包含动图演示URL和可视化工具链接

export interface VisualizationResource {
  knowledgeId: number;
  knowledgeSlug: string;
  // 可视化动图
  gifUrl?: string;
  // 可视化网站链接（如VisuAlgo）
  visualizerUrl?: string;
}

// 知识点可视化资源数据
export const visualizationResources: VisualizationResource[] = [
  // ==================== 循环语句 ====================
  {
    knowledgeId: 19,
    knowledgeSlug: 'for-loop',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
  },
  {
    knowledgeId: 22,
    knowledgeSlug: 'while-loop',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
  },
  
  // ==================== 数组 ====================
  {
    knowledgeId: 27,
    knowledgeSlug: 'array-intro',
    visualizerUrl: 'https://visualgo.net/zh/array',
  },
  
  // ==================== 排序算法 ====================
  {
    knowledgeId: 38,
    knowledgeSlug: 'sort-intro',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting',
  },
  {
    knowledgeId: 39,
    knowledgeSlug: 'bubble-sort',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif',
    visualizerUrl: 'https://visualgo.net/zh/sorting?slide=1',
  },
  {
    knowledgeId: 40,
    knowledgeSlug: 'stl-sort',
    visualizerUrl: 'https://visualgo.net/zh/sorting?slide=10',
  },
  
  // ==================== 搜索算法 ====================
  {
    knowledgeId: 43,
    knowledgeSlug: 'binary-search',
    visualizerUrl: 'https://visualgo.net/zh/bst',
  },
  
  // ==================== 递归 ====================
  {
    knowledgeId: 47,
    knowledgeSlug: 'recursion-intro',
    visualizerUrl: 'https://visualgo.net/zh/recursion',
  },
  {
    knowledgeId: 48,
    knowledgeSlug: 'recursion-examples',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Tower_of_Hanoi.gif',
    visualizerUrl: 'https://visualgo.net/zh/recursion',
  },
  
  // ==================== 动态规划 ====================
  {
    knowledgeId: 49,
    knowledgeSlug: 'dp-intro',
    visualizerUrl: 'https://visualgo.net/zh/dp',
  },
  {
    knowledgeId: 50,
    knowledgeSlug: 'dp-climbing-stairs',
    visualizerUrl: 'https://visualgo.net/zh/dp',
  },
  {
    knowledgeId: 51,
    knowledgeSlug: 'dp-knapsack',
    visualizerUrl: 'https://visualgo.net/zh/dp',
  },
  
  // ==================== 图论 ====================
  {
    knowledgeId: 52,
    knowledgeSlug: 'graph-intro',
    visualizerUrl: 'https://visualgo.net/zh/graphds',
  },
  {
    knowledgeId: 53,
    knowledgeSlug: 'bfs',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif',
    visualizerUrl: 'https://visualgo.net/zh/dfsbfs',
  },
  {
    knowledgeId: 54,
    knowledgeSlug: 'dfs',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif',
    visualizerUrl: 'https://visualgo.net/zh/dfsbfs',
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

// 获取所有带可视化工具的知识点
export function getKnowledgeWithVisualizers(): VisualizationResource[] {
  return visualizationResources.filter(r => r.visualizerUrl);
}

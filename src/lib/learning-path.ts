// 知识点类型定义
export interface KnowledgeNode {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[]; // 前置知识点ID
  problems: number[]; // 相关题目ID
  estimatedHours: number; // 预计学习时长（小时）
  importance: number; // 重要程度 1-5
  tags: string[];
}

// 学习目标类型
export type LearningGoal = 'popularity' | 'improvement' | 'provincial' | 'national';

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  goal: LearningGoal;
  targetAudience: string;
  duration: string; // 预计完成时间
  stages: LearningStage[];
}

export interface LearningStage {
  id: string;
  name: string;
  description: string;
  order: number;
  knowledgeNodes: string[]; // 知识点ID列表
  requiredProblems: number; // 需要完成的题目数量
  tips: string[];
}

// 用户学习进度类型
export interface UserProgress {
  nodeId: string;
  status: 'locked' | 'available' | 'learning' | 'completed';
  completedProblems: number[];
  masteryLevel: number; // 0-100 掌握程度
  lastPracticeTime?: string;
  notes: string;
}

// 知识点体系
export const knowledgeTree: KnowledgeNode[] = [
  // ========== 基础篇 ==========
  {
    id: 'basics-io',
    name: '输入输出',
    category: '基础算法',
    description: '掌握C++标准输入输出，包括cin/cout和scanf/printf的使用',
    difficulty: 'beginner',
    prerequisites: [],
    problems: [1, 19, 20], // A+B问题, Hello World, 输出图形
    estimatedHours: 2,
    importance: 5,
    tags: ['入门', '基础语法'],
  },
  {
    id: 'basics-variables',
    name: '变量与数据类型',
    category: '基础算法',
    description: '理解基本数据类型（int, long long, double等）及其范围',
    difficulty: 'beginner',
    prerequisites: ['basics-io'],
    problems: [1, 3, 21], // A+B问题, 阶乘（涉及long long）, 数据范围测试
    estimatedHours: 3,
    importance: 5,
    tags: ['入门', '基础语法'],
  },
  {
    id: 'basics-operators',
    name: '运算符与表达式',
    category: '基础算法',
    description: '掌握算术运算、比较运算、逻辑运算等基本运算符',
    difficulty: 'beginner',
    prerequisites: ['basics-variables'],
    problems: [22, 23, 26], // 四则运算, 求平均值, 最大值
    estimatedHours: 2,
    importance: 4,
    tags: ['入门', '基础语法'],
  },
  {
    id: 'basics-conditional',
    name: '条件判断',
    category: '基础算法',
    description: '掌握if-else语句，理解分支结构',
    difficulty: 'beginner',
    prerequisites: ['basics-operators'],
    problems: [24, 25, 26], // 判断奇偶, 成绩等级, 最大值
    estimatedHours: 2,
    importance: 4,
    tags: ['入门', '控制结构'],
  },
  {
    id: 'basics-loops',
    name: '循环结构',
    category: '基础算法',
    description: '掌握for、while、do-while循环，理解循环控制',
    difficulty: 'beginner',
    prerequisites: ['basics-conditional'],
    problems: [2, 3, 27, 28], // 斐波那契、阶乘、求和、九九乘法表
    estimatedHours: 4,
    importance: 5,
    tags: ['入门', '控制结构'],
  },
  {
    id: 'basics-arrays',
    name: '数组',
    category: '基础算法',
    description: '掌握一维数组和二维数组的定义与使用',
    difficulty: 'beginner',
    prerequisites: ['basics-loops'],
    problems: [30, 31, 32], // 数组求和, 数组逆序, 数组查找
    estimatedHours: 4,
    importance: 5,
    tags: ['入门', '数据结构基础'],
  },

  // ========== 进阶篇 ==========
  {
    id: 'string-basics',
    name: '字符串基础',
    category: '字符串处理',
    description: '掌握string类型的基本操作，字符串输入输出',
    difficulty: 'beginner',
    prerequisites: ['basics-arrays'],
    problems: [33, 34, 35], // 字符串长度, 字符串拼接, 字母大小写转换
    estimatedHours: 3,
    importance: 4,
    tags: ['字符串', '基础'],
  },
  {
    id: 'string-processing',
    name: '字符串处理',
    category: '字符串处理',
    description: '字符串的遍历、查找、替换、分割等操作',
    difficulty: 'intermediate',
    prerequisites: ['string-basics'],
    problems: [35, 36, 37], // 字母大小写转换, 回文字符串, 字符串统计
    estimatedHours: 4,
    importance: 4,
    tags: ['字符串', '模拟'],
  },
  {
    id: 'number-theory-basics',
    name: '数论基础',
    category: '数论',
    description: '掌握整除、余数、最大公约数、最小公倍数等概念',
    difficulty: 'intermediate',
    prerequisites: ['basics-loops'],
    problems: [38, 41, 42], // 素数判断, 最大公约数, 最小公倍数
    estimatedHours: 4,
    importance: 5,
    tags: ['数论', '基础'],
  },
  {
    id: 'prime-numbers',
    name: '素数与质数',
    category: '数论',
    description: '素数判定、素数筛法（埃氏筛、欧拉筛）',
    difficulty: 'intermediate',
    prerequisites: ['number-theory-basics'],
    problems: [38, 39, 40], // 素数判断, 素数筛法, 质因数分解
    estimatedHours: 4,
    importance: 4,
    tags: ['数论', '筛法'],
  },
  {
    id: 'gcd-lcm',
    name: 'GCD与LCM',
    category: '数论',
    description: '最大公约数、最小公倍数的计算与应用',
    difficulty: 'intermediate',
    prerequisites: ['number-theory-basics'],
    problems: [41, 42, 43], // 最大公约数, 最小公倍数, 快速幂
    estimatedHours: 3,
    importance: 4,
    tags: ['数论', 'GCD'],
  },
  {
    id: 'simulation',
    name: '模拟算法',
    category: '模拟',
    description: '按题目要求直接模拟过程，注重细节处理',
    difficulty: 'beginner',
    prerequisites: ['basics-loops', 'basics-arrays'],
    problems: [29, 70, 72], // 数字统计, 日期计算, 高精度加法
    estimatedHours: 5,
    importance: 4,
    tags: ['模拟', '基础'],
  },
  {
    id: 'sorting-basics',
    name: '排序算法',
    category: '排序与查找',
    description: '掌握常见排序算法：冒泡、选择、插入、快速排序',
    difficulty: 'intermediate',
    prerequisites: ['basics-arrays'],
    problems: [44, 45, 46], // 冒泡排序, 选择排序, 快速排序
    estimatedHours: 5,
    importance: 5,
    tags: ['排序', '算法'],
  },
  {
    id: 'binary-search',
    name: '二分查找',
    category: '排序与查找',
    description: '二分查找原理与应用，二分答案',
    difficulty: 'intermediate',
    prerequisites: ['sorting-basics'],
    problems: [47, 48, 32], // 二分查找, 二分答案, 数组查找
    estimatedHours: 4,
    importance: 5,
    tags: ['查找', '二分'],
  },
  {
    id: 'recursion',
    name: '递归思想',
    category: '递归与分治',
    description: '理解递归的概念，掌握递归的编写方法',
    difficulty: 'intermediate',
    prerequisites: ['basics-loops'],
    problems: [2, 49, 50], // 斐波那契, 阶乘, 汉诺塔
    estimatedHours: 4,
    importance: 5,
    tags: ['递归', '基础思想'],
  },
  {
    id: 'divide-conquer',
    name: '分治算法',
    category: '递归与分治',
    description: '分治思想：分解、解决、合并',
    difficulty: 'advanced',
    prerequisites: ['recursion'],
    problems: [46, 50, 51], // 快速排序, 汉诺塔, 归并排序
    estimatedHours: 5,
    importance: 4,
    tags: ['分治', '递归'],
  },
  {
    id: 'greedy-basics',
    name: '贪心算法',
    category: '贪心算法',
    description: '贪心思想：局部最优达到全局最优',
    difficulty: 'intermediate',
    prerequisites: ['sorting-basics'],
    problems: [52, 53, 17], // 排队接水, 活动选择, 接水问题
    estimatedHours: 5,
    importance: 4,
    tags: ['贪心', '算法思想'],
  },
  {
    id: 'search-dfs',
    name: '深度优先搜索(DFS)',
    category: '搜索算法',
    description: 'DFS的基本概念与实现，递归实现与栈实现',
    difficulty: 'intermediate',
    prerequisites: ['recursion'],
    problems: [54, 55, 64], // 全排列, N皇后, 图的DFS遍历
    estimatedHours: 6,
    importance: 5,
    tags: ['搜索', 'DFS'],
  },
  {
    id: 'search-bfs',
    name: '广度优先搜索(BFS)',
    category: '搜索算法',
    description: 'BFS的基本概念与实现，队列的使用',
    difficulty: 'intermediate',
    prerequisites: ['basics-arrays'],
    problems: [56, 65, 64], // 迷宫问题, 图的BFS遍历, 图的DFS遍历
    estimatedHours: 6,
    importance: 5,
    tags: ['搜索', 'BFS'],
  },
  {
    id: 'dp-intro',
    name: '动态规划入门',
    category: '动态规划',
    description: '理解DP的基本概念：状态、转移、边界',
    difficulty: 'intermediate',
    prerequisites: ['recursion', 'basics-arrays'],
    problems: [2, 57, 58], // 斐波那契, 爬楼梯, 背包问题
    estimatedHours: 6,
    importance: 5,
    tags: ['动态规划', '入门'],
  },
  {
    id: 'dp-classic',
    name: '经典DP模型',
    category: '动态规划',
    description: '背包问题、最长公共子序列、最长递增子序列等',
    difficulty: 'advanced',
    prerequisites: ['dp-intro'],
    problems: [58, 59, 57], // 背包问题, 最长递增子序列, 爬楼梯
    estimatedHours: 8,
    importance: 5,
    tags: ['动态规划', '经典模型'],
  },
  {
    id: 'graph-basics',
    name: '图论基础',
    category: '图论',
    description: '图的基本概念，邻接矩阵与邻接表',
    difficulty: 'intermediate',
    prerequisites: ['basics-arrays'],
    problems: [63, 64, 65], // 图的邻接表存储, 图的DFS遍历, 图的BFS遍历
    estimatedHours: 4,
    importance: 4,
    tags: ['图论', '基础'],
  },
  {
    id: 'graph-traversal',
    name: '图的遍历',
    category: '图论',
    description: '图的DFS和BFS遍历',
    difficulty: 'intermediate',
    prerequisites: ['graph-basics', 'search-dfs', 'search-bfs'],
    problems: [64, 65, 63], // 图的DFS遍历, 图的BFS遍历, 图的邻接表存储
    estimatedHours: 4,
    importance: 4,
    tags: ['图论', '遍历'],
  },
  {
    id: 'shortest-path',
    name: '最短路径',
    category: '图论',
    description: 'Dijkstra、Floyd、SPFA等最短路径算法',
    difficulty: 'advanced',
    prerequisites: ['graph-basics'],
    problems: [66, 65, 64], // 最短路径Dijkstra, 图的BFS遍历, 图的DFS遍历
    estimatedHours: 6,
    importance: 5,
    tags: ['图论', '最短路'],
  },
  {
    id: 'ds-stack-queue',
    name: '栈与队列',
    category: '数据结构',
    description: '栈和队列的基本概念与实现',
    difficulty: 'beginner',
    prerequisites: ['basics-arrays'],
    problems: [60, 61, 62], // 栈的基本操作, 队列的基本操作, 括号匹配
    estimatedHours: 3,
    importance: 4,
    tags: ['数据结构', '栈', '队列'],
  },
  {
    id: 'ds-linked-list',
    name: '链表',
    category: '数据结构',
    description: '链表的基本概念与实现',
    difficulty: 'intermediate',
    prerequisites: ['basics-arrays'],
    problems: [31, 32, 30], // 数组逆序, 数组查找, 数组求和（用数组模拟链表）
    estimatedHours: 3,
    importance: 3,
    tags: ['数据结构', '链表'],
  },
  {
    id: 'ds-tree',
    name: '树与二叉树',
    category: '数据结构',
    description: '树的基本概念，二叉树的遍历',
    difficulty: 'intermediate',
    prerequisites: ['recursion', 'ds-stack-queue'],
    problems: [64, 55, 54], // 图的DFS遍历, N皇后, 全排列（理解递归树结构）
    estimatedHours: 5,
    importance: 5,
    tags: ['数据结构', '树'],
  },
  {
    id: 'bitwise-basics',
    name: '位运算基础',
    category: '位运算',
    description: '与、或、非、异或运算，位运算技巧',
    difficulty: 'intermediate',
    prerequisites: ['basics-operators'],
    problems: [67, 68, 69], // 二进制转换, 统计1的个数, 异或应用
    estimatedHours: 3,
    importance: 3,
    tags: ['位运算', '技巧'],
  },
];

// 学习路径定义
export const learningPaths: LearningPath[] = [
  {
    id: 'popularity-group',
    name: '普及组学习路径',
    description: '面向NOIP普及组参赛选手，打好算法基础',
    goal: 'popularity',
    targetAudience: '初学者，目标普及组一、二等奖',
    duration: '3-6个月',
    stages: [
      {
        id: 'pop-stage-1',
        name: '基础语法入门',
        description: '掌握C++基本语法和编程基础',
        order: 1,
        knowledgeNodes: ['basics-io', 'basics-variables', 'basics-operators', 'basics-conditional', 'basics-loops'],
        requiredProblems: 20,
        tips: ['多练习输入输出', '注意数据范围', '养成良好的代码风格'],
      },
      {
        id: 'pop-stage-2',
        name: '数组与字符串',
        description: '掌握数组和字符串的基本操作',
        order: 2,
        knowledgeNodes: ['basics-arrays', 'string-basics', 'string-processing'],
        requiredProblems: 15,
        tips: ['注意数组越界', '字符串处理要细心'],
      },
      {
        id: 'pop-stage-3',
        name: '基础算法',
        description: '掌握模拟、排序、查找等基础算法',
        order: 3,
        knowledgeNodes: ['simulation', 'sorting-basics', 'binary-search', 'number-theory-basics'],
        requiredProblems: 25,
        tips: ['模拟题注意细节', '二分要注意边界'],
      },
      {
        id: 'pop-stage-4',
        name: '递归与搜索',
        description: '理解递归思想，掌握DFS和BFS',
        order: 4,
        knowledgeNodes: ['recursion', 'search-dfs', 'search-bfs'],
        requiredProblems: 20,
        tips: ['递归注意终止条件', '搜索注意剪枝'],
      },
    ],
  },
  {
    id: 'improvement-group',
    name: '提高组学习路径',
    description: '面向NOIP提高组参赛选手，深入算法学习',
    goal: 'improvement',
    targetAudience: '有基础，目标提高组一、二等奖',
    duration: '6-12个月',
    stages: [
      {
        id: 'imp-stage-1',
        name: '巩固基础',
        description: '巩固普及组所有知识点',
        order: 1,
        knowledgeNodes: ['basics-io', 'basics-variables', 'basics-operators', 'basics-conditional', 'basics-loops', 'basics-arrays', 'string-basics', 'simulation', 'sorting-basics', 'recursion'],
        requiredProblems: 50,
        tips: ['做难题巩固基础', '关注时间复杂度'],
      },
      {
        id: 'imp-stage-2',
        name: '动态规划',
        description: '深入理解动态规划，掌握经典模型',
        order: 2,
        knowledgeNodes: ['dp-intro', 'dp-classic'],
        requiredProblems: 30,
        tips: ['理解状态转移', '多画状态转移图'],
      },
      {
        id: 'imp-stage-3',
        name: '数据结构进阶',
        description: '掌握栈、队列、树等数据结构',
        order: 3,
        knowledgeNodes: ['ds-stack-queue', 'ds-tree'],
        requiredProblems: 25,
        tips: ['理解数据结构的本质', '多实现几遍'],
      },
      {
        id: 'imp-stage-4',
        name: '图论算法',
        description: '掌握图的基本算法',
        order: 4,
        knowledgeNodes: ['graph-basics', 'graph-traversal', 'shortest-path'],
        requiredProblems: 25,
        tips: ['注意图的存储方式', '理解算法原理'],
      },
      {
        id: 'imp-stage-5',
        name: '高级算法',
        description: '贪心、分治、数论进阶',
        order: 5,
        knowledgeNodes: ['greedy-basics', 'divide-conquer', 'prime-numbers', 'gcd-lcm', 'bitwise-basics'],
        requiredProblems: 30,
        tips: ['贪心要证明正确性', '数论多练习'],
      },
    ],
  },
  {
    id: 'provincial-group',
    name: '省选学习路径',
    description: '面向省选参赛选手，学习高级算法',
    goal: 'provincial',
    targetAudience: '提高组获奖，目标省选',
    duration: '12-24个月',
    stages: [
      {
        id: 'pro-stage-1',
        name: '巩固提高组',
        description: '熟练掌握提高组所有知识点',
        order: 1,
        knowledgeNodes: ['dp-intro', 'dp-classic', 'graph-basics', 'graph-traversal', 'shortest-path'],
        requiredProblems: 80,
        tips: ['追求满分', '注意边界情况'],
      },
      {
        id: 'pro-stage-2',
        name: '高级数据结构',
        description: '线段树、树状数组、平衡树等',
        order: 2,
        knowledgeNodes: ['ds-tree'],
        requiredProblems: 40,
        tips: ['理解原理', '熟练实现'],
      },
      {
        id: 'pro-stage-3',
        name: '高级DP',
        description: '状态压缩DP、树形DP、斜率优化等',
        order: 3,
        knowledgeNodes: ['dp-classic'],
        requiredProblems: 40,
        tips: ['注意状态设计', '优化时空复杂度'],
      },
    ],
  },
];

// 获取知识点的依赖关系图
export function getKnowledgeGraph(): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  knowledgeTree.forEach(node => {
    graph.set(node.id, node.prerequisites);
  });
  return graph;
}

// 计算知识点的解锁状态
export function calculateNodeStatus(
  nodeId: string,
  completedNodes: Set<string>
): 'locked' | 'available' | 'learning' | 'completed' {
  const node = knowledgeTree.find(n => n.id === nodeId);
  if (!node) return 'locked';

  if (completedNodes.has(nodeId)) return 'completed';

  const allPrerequisitesMet = node.prerequisites.every(p => completedNodes.has(p));
  if (!allPrerequisitesMet) return 'locked';

  return 'available';
}

// 获取推荐学习的知识点
export function getRecommendedNodes(completedNodes: Set<string>): KnowledgeNode[] {
  const recommendations: KnowledgeNode[] = [];

  knowledgeTree.forEach(node => {
    const status = calculateNodeStatus(node.id, completedNodes);
    if (status === 'available') {
      recommendations.push(node);
    }
  });

  // 按重要程度排序
  return recommendations.sort((a, b) => b.importance - a.importance);
}

// 获取知识点分类统计
export function getCategoryStats() {
  const categoryMap = new Map<string, KnowledgeNode[]>();

  knowledgeTree.forEach(node => {
    if (!categoryMap.has(node.category)) {
      categoryMap.set(node.category, []);
    }
    categoryMap.get(node.category)!.push(node);
  });

  return Array.from(categoryMap.entries()).map(([name, nodes]) => ({
    name,
    count: nodes.length,
    nodes,
  }));
}

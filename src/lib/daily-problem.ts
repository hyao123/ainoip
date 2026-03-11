/**
 * 每日一题数据结构和管理
 */

import { problems } from './problems';

export interface DailyProblem {
  id: number;
  problemId: number;
  date: string; // YYYY-MM-DD
  reason: string; // 推荐理由
  tips: string[]; // 解题提示
  relatedKnowledge: string[]; // 相关知识点
}

// 预设的每日一题（一个月的精选题目）
export const dailyProblems: DailyProblem[] = [
  {
    id: 1,
    problemId: 1,
    date: '2024-01-01',
    reason: '入门经典：A+B问题是编程竞赛的第一课，帮助熟悉输入输出格式',
    tips: ['注意输入输出的格式', '使用cin/cout或scanf/printf'],
    relatedKnowledge: ['基础输入输出', '变量定义'],
  },
  {
    id: 2,
    problemId: 5,
    date: '2024-01-02',
    reason: '循环结构练习：打印图案是培养循环思维的好题目',
    tips: ['观察行数与列数的关系', '注意空格和星号的位置'],
    relatedKnowledge: ['for循环', '嵌套循环'],
  },
  {
    id: 3,
    problemId: 11,
    date: '2024-01-03',
    reason: '数组入门：数组元素的查找和统计是基础中的基础',
    tips: ['使用数组存储数据', '遍历数组统计结果'],
    relatedKnowledge: ['一维数组', '遍历'],
  },
  {
    id: 4,
    problemId: 15,
    date: '2024-01-04',
    reason: '排序算法：快速排序是竞赛中最常用的排序方法',
    tips: ['理解分治思想', '掌握递归写法'],
    relatedKnowledge: ['排序算法', '递归'],
  },
  {
    id: 5,
    problemId: 20,
    date: '2024-01-05',
    reason: '二分查找：高效查找算法，时间复杂度O(log n)',
    tips: ['注意边界条件', '避免死循环'],
    relatedKnowledge: ['二分查找', '时间复杂度'],
  },
  {
    id: 6,
    problemId: 25,
    date: '2024-01-06',
    reason: '递归入门：理解递归的关键是找到基准情况和递推关系',
    tips: ['明确基准情况', '确保递归能够终止'],
    relatedKnowledge: ['递归', '函数'],
  },
  {
    id: 7,
    problemId: 30,
    date: '2024-01-07',
    reason: '动态规划基础：斐波那契数列是DP的经典入门题',
    tips: ['定义状态', '写出状态转移方程'],
    relatedKnowledge: ['动态规划', '状态转移'],
  },
  {
    id: 8,
    problemId: 35,
    date: '2024-01-08',
    reason: 'DFS入门：深度优先搜索是图论算法的基础',
    tips: ['使用递归或栈实现', '注意标记已访问节点'],
    relatedKnowledge: ['DFS', '图的遍历'],
  },
  {
    id: 9,
    problemId: 40,
    date: '2024-01-09',
    reason: 'BFS入门：广度优先搜索适用于最短路径问题',
    tips: ['使用队列实现', '层序遍历的思想'],
    relatedKnowledge: ['BFS', '队列', '最短路径'],
  },
  {
    id: 10,
    problemId: 45,
    date: '2024-01-10',
    reason: '贪心算法：理解局部最优和全局最优的关系',
    tips: ['证明贪心策略的正确性', '选择合适的贪心标准'],
    relatedKnowledge: ['贪心算法', '最优子结构'],
  },
  {
    id: 11,
    problemId: 50,
    date: '2024-01-11',
    reason: '背包问题入门：01背包是DP的经典应用',
    tips: ['定义状态dp[i][j]', '理解空间优化'],
    relatedKnowledge: ['动态规划', '背包问题'],
  },
  {
    id: 12,
    problemId: 55,
    date: '2024-01-12',
    reason: '数论入门：最大公约数和最小公倍数',
    tips: ['使用欧几里得算法', '理解辗转相除原理'],
    relatedKnowledge: ['数论', 'GCD', 'LCM'],
  },
  {
    id: 13,
    problemId: 60,
    date: '2024-01-13',
    reason: '字符串处理：KMP算法是字符串匹配的经典算法',
    tips: ['理解next数组的含义', '掌握预处理过程'],
    relatedKnowledge: ['字符串', 'KMP算法'],
  },
  {
    id: 14,
    problemId: 65,
    date: '2024-01-14',
    reason: '并查集入门：高效处理连通性问题',
    tips: ['理解路径压缩', '掌握按秩合并'],
    relatedKnowledge: ['并查集', '连通性'],
  },
  {
    id: 15,
    problemId: 70,
    date: '2024-01-15',
    reason: '线段树入门：区间查询和修改的高效数据结构',
    tips: ['理解懒标记', '掌握pushDown操作'],
    relatedKnowledge: ['线段树', '区间查询'],
  },
];

// 获取今日每日一题
export function getTodayDailyProblem(): DailyProblem {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // 查找今天的题目
  let daily = dailyProblems.find(d => d.date === dateStr);
  
  // 如果今天没有预设，根据日期生成
  if (!daily) {
    // 使用日期作为种子选择题目
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % dailyProblems.length;
    daily = dailyProblems[index];
  }
  
  return daily;
}

// 获取历史每日一题
export function getDailyProblemsHistory(limit: number = 7): DailyProblem[] {
  return dailyProblems.slice(0, limit);
}

// 获取每日一题对应的题目详情
export function getDailyProblemDetail(daily: DailyProblem) {
  const problem = problems.find(p => p.id === daily.problemId);
  return problem ? { ...daily, problem } : null;
}

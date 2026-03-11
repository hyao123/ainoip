/**
 * 题解社区数据结构
 */

export interface SolutionAuthor {
  id: string;
  name: string;
  avatar?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  rating: number;
}

export interface SolutionComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Solution {
  id: string;
  problemId: number;
  problemTitle: string;
  author: SolutionAuthor;
  title: string;
  content: string;
  code: string;
  language: 'cpp' | 'python';
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
  likes: number;
  views: number;
  comments: SolutionComment[];
  createdAt: string;
  updatedAt: string;
  isOfficial: boolean;
  isFeatured: boolean;
}

// 模拟题解数据
export const solutions: Solution[] = [
  {
    id: 's1',
    problemId: 1,
    problemTitle: 'A+B问题',
    author: {
      id: 'u1',
      name: '算法大师',
      level: 'expert',
      rating: 2560,
    },
    title: 'A+B问题 - 最基础的输入输出练习',
    content: `## 题目分析

这是一道最基础的编程题目，主要考察：
1. 基本的输入输出操作
2. 变量的定义和使用
3. 简单的算术运算

## 解题思路

1. 定义两个整型变量存储输入的两个数
2. 使用标准输入读取这两个数
3. 计算它们的和并输出

## 注意事项

- 注意输入格式，两个数之间用空格分隔
- 输出结果后需要换行
- 数据范围在 int 类型范围内，无需特殊处理`,
    code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`,
    language: 'cpp',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    tags: ['入门', '输入输出', '基础'],
    likes: 256,
    views: 3520,
    comments: [
      {
        id: 'c1',
        authorId: 'u2',
        authorName: '初学者小明',
        content: '讲解得很清楚，入门必看！',
        createdAt: '2024-01-15',
        likes: 12,
      },
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    isOfficial: true,
    isFeatured: true,
  },
  {
    id: 's2',
    problemId: 5,
    problemTitle: '打印图案',
    author: {
      id: 'u2',
      name: '代码小王子',
      level: 'advanced',
      rating: 1890,
    },
    title: '打印图案 - 嵌套循环的典型应用',
    content: `## 题目分析

这道题考察嵌套循环的使用，需要：
1. 外层循环控制行数
2. 内层循环控制每行的字符输出
3. 观察行号与空格、星号数量的关系

## 解题思路

假设要打印 n 行图案：
- 第 i 行需要打印 n-i 个空格
- 然后打印 2*i-1 个星号
- 最后换行

## 关键代码

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    // 打印空格
    for (int j = 1; j <= n - i; j++) cout << " ";
    // 打印星号
    for (int j = 1; j <= 2 * i - 1; j++) cout << "*";
    cout << endl;
}
\`\`\``,
    code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        // 打印前导空格
        for (int j = 1; j <= n - i; j++) {
            cout << " ";
        }
        // 打印星号
        for (int j = 1; j <= 2 * i - 1; j++) {
            cout << "*";
        }
        cout << endl;
    }
    
    return 0;
}`,
    language: 'cpp',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['循环', '图案打印', '入门'],
    likes: 189,
    views: 2890,
    comments: [],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    isOfficial: false,
    isFeatured: true,
  },
  {
    id: 's3',
    problemId: 30,
    problemTitle: '斐波那契数列',
    author: {
      id: 'u1',
      name: '算法大师',
      level: 'expert',
      rating: 2560,
    },
    title: '斐波那契数列的三种解法对比',
    content: `## 题目分析

斐波那契数列是学习递归和动态规划的经典例题。本文介绍三种解法：
1. 递归解法（不推荐）
2. 记忆化递归
3. 动态规划

## 解法一：递归

\`\`\`cpp
int fib(int n) {
    if (n <= 2) return 1;
    return fib(n-1) + fib(n-2);  // 时间复杂度 O(2^n)
}
\`\`\`

问题：存在大量重复计算，效率极低。

## 解法二：记忆化递归

\`\`\`cpp
int memo[100];
int fib(int n) {
    if (n <= 2) return 1;
    if (memo[n]) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);  // 时间复杂度 O(n)
}
\`\`\`

## 解法三：动态规划（推荐）

参见完整代码。`,
    code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // 边界情况
    if (n <= 2) {
        cout << 1 << endl;
        return 0;
    }
    
    // DP解法
    long long a = 1, b = 1, c;
    for (int i = 3; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    
    cout << c << endl;
    return 0;
}`,
    language: 'cpp',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['动态规划', '斐波那契', '递归'],
    likes: 425,
    views: 5620,
    comments: [
      {
        id: 'c2',
        authorId: 'u3',
        authorName: 'DP学习者',
        content: '三种解法对比非常清晰，学到了！',
        createdAt: '2024-01-18',
        likes: 34,
      },
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    isOfficial: true,
    isFeatured: true,
  },
  {
    id: 's4',
    problemId: 45,
    problemTitle: '背包问题',
    author: {
      id: 'u3',
      name: 'DP爱好者',
      level: 'advanced',
      rating: 2100,
    },
    title: '01背包详解 - 从入门到精通',
    content: `## 前言

01背包是动态规划最经典的问题之一，理解它对学习DP至关重要。

## 状态定义

设 dp[i][j] 表示前 i 个物品，背包容量为 j 时能获得的最大价值。

## 状态转移

对于第 i 个物品，有两种选择：
1. 不选：dp[i][j] = dp[i-1][j]
2. 选（前提是 j >= w[i]）：dp[i][j] = dp[i-1][j-w[i]] + v[i]

取两者的最大值。

## 空间优化

可以优化到一维数组，注意要逆序遍历。`,
    code: `#include <iostream>
using namespace std;

const int MAXN = 1005;
int dp[MAXN];
int w[MAXN], v[MAXN];

int main() {
    int n, W;
    cin >> n >> W;
    
    for (int i = 1; i <= n; i++) {
        cin >> w[i] >> v[i];
    }
    
    // 空间优化版本的01背包
    for (int i = 1; i <= n; i++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    
    cout << dp[W] << endl;
    return 0;
}`,
    language: 'cpp',
    timeComplexity: 'O(n*W)',
    spaceComplexity: 'O(W)',
    tags: ['动态规划', '背包问题', '空间优化'],
    likes: 567,
    views: 8920,
    comments: [],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    isOfficial: false,
    isFeatured: true,
  },
];

// 获取题解列表
export function getSolutions(problemId?: number): Solution[] {
  if (problemId) {
    return solutions.filter(s => s.problemId === problemId);
  }
  return solutions;
}

// 获取精选题解
export function getFeaturedSolutions(): Solution[] {
  return solutions.filter(s => s.isFeatured);
}

// 搜索题解
export function searchSolutions(keyword: string): Solution[] {
  const lower = keyword.toLowerCase();
  return solutions.filter(s => 
    s.title.toLowerCase().includes(lower) ||
    s.content.toLowerCase().includes(lower) ||
    s.tags.some(tag => tag.toLowerCase().includes(lower)) ||
    s.problemTitle.toLowerCase().includes(lower)
  );
}

// 点赞题解（模拟）
export function likeSolution(solutionId: string): Solution | undefined {
  const solution = solutions.find(s => s.id === solutionId);
  if (solution) {
    solution.likes++;
  }
  return solution;
}

// 添加评论（模拟）
export function addComment(solutionId: string, authorName: string, content: string): Solution | undefined {
  const solution = solutions.find(s => s.id === solutionId);
  if (solution) {
    solution.comments.push({
      id: `c${Date.now()}`,
      authorId: 'currentUser',
      authorName,
      content,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
    });
  }
  return solution;
}

/**
 * 渐进式提示系统
 * 提供三级提示梯度，帮助学生学习而不直接给答案
 */

// 提示等级
export type HintLevel = 1 | 2 | 3;

// 单个提示
export interface Hint {
  level: HintLevel;
  title: string;        // 提示标题，如"思路方向"、"关键算法"
  content: string;      // 提示内容
  cost: number;         // 消耗积分
  scorePenalty: number; // 对最终评分的影响（百分比）
}

// 题目的提示配置
export interface ProblemHints {
  problemId: number;
  hints: [Hint, Hint, Hint]; // 固定三级提示
  relatedProblems?: number[]; // 推荐的跳板题目
  keyConcepts?: string[];     // 关键概念标签
  videoLink?: {
    bilibili?: string;        // B站视频BV号
    title?: string;           // 视频标题
  };
}

// 用户提示使用记录
export interface HintUsageRecord {
  problemId: number;
  levelsUsed: HintLevel[];    // 已使用的提示等级
  timestamp: number;
}

// 提示配置
export const HINT_CONFIG = {
  // 各级提示的默认配置
  levels: {
    1: {
      title: '💡 思路方向',
      description: '指明解题方向，不涉及具体实现',
      cost: 5,
      scorePenalty: 5,
    },
    2: {
      title: '🔧 关键算法',
      description: '揭示核心算法或数据结构',
      cost: 10,
      scorePenalty: 15,
    },
    3: {
      title: '📝 代码片段',
      description: '展示关键代码实现',
      cost: 20,
      scorePenalty: 30,
    },
  },
  // 每日免费提示次数
  dailyFreeHints: 5,
  // 基础积分
  basePoints: 100,
};

// 获取提示等级对应的图标和颜色
export function getHintLevelStyle(level: HintLevel) {
  switch (level) {
    case 1:
      return {
        icon: '💡',
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
      };
    case 2:
      return {
        icon: '🔧',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
      };
    case 3:
      return {
        icon: '📝',
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
      };
  }
}

// 计算使用提示后的得分
export function calculateScoreWithHints(
  baseScore: number,
  hintsUsed: HintLevel[]
): number {
  const totalPenalty = hintsUsed.reduce((sum, level) => {
    return sum + HINT_CONFIG.levels[level].scorePenalty;
  }, 0);
  
  return Math.max(0, baseScore - totalPenalty);
}

// 题目提示数据库
const PROBLEM_HINTS_MAP: Record<number, ProblemHints> = {
  // A+B问题
  1: {
    problemId: 1,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '这是一道最基础的输入输出题目。你需要：\n1. 读取两个整数\n2. 计算它们的和\n3. 输出结果\n\n注意NOIP比赛要求使用文件输入输出。',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '使用标准输入输出流：\n• cin/cout 或 scanf/printf\n• freopen() 重定向文件\n\n文件命名规则：题目名.in 和 题目名.out',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: '// 文件重定向\nfreopen("ab.in", "r", stdin);\nfreopen("ab.out", "w", stdout);\n\n// 读取并计算\nint a, b;\ncin >> a >> b;\ncout << a + b << endl;',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [2, 3],
    keyConcepts: ['输入输出', '文件操作', '基础运算'],
  },

  // 斐波那契数列
  2: {
    problemId: 2,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '斐波那契数列：F(n) = F(n-1) + F(n-2)\n\n两种方法：\n• 递归（简单但效率低）\n• 递推（效率高）\n\n注意边界条件：F(0)=0, F(1)=1',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '推荐使用递推方法：\n• 用两个变量保存前两项\n• 循环计算，时间复杂度O(n)\n\n递归方法会超时，因为有很多重复计算',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: 'int a = 0, b = 1, c;\nfor (int i = 2; i <= n; i++) {\n    c = a + b;\n    a = b;\n    b = c;\n}\ncout << b << endl;',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [1, 3],
    keyConcepts: ['递推', '递归', '动态规划基础'],
  },

  // 阶乘计算
  3: {
    problemId: 3,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '阶乘定义：n! = 1×2×3×...×n\n\n注意事项：\n• 0! = 1（特殊定义）\n• n≤20 时结果在long long范围内',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '使用循环累乘：\n• 初始值 ans = 1\n• 每次乘以当前数字\n• 使用 long long 防止溢出',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: 'long long ans = 1;\nfor (int i = 2; i <= n; i++) {\n    ans *= i;\n}\ncout << ans << endl;',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [2],
    keyConcepts: ['循环', '大数处理', 'long long'],
  },

  // 最大公约数
  4: {
    problemId: 4,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '最大公约数(GCD)的常用算法：\n• 辗转相除法（欧几里得算法）\n• 更相减损术\n\nGCD性质：gcd(a, b) = gcd(b, a mod b)',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '辗转相除法：\n• 当b=0时，gcd(a,0)=a\n• 否则 gcd(a,b) = gcd(b, a%b)\n• 递归或迭代实现都可以\n\n也可以直接用 __gcd(a, b)',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: 'int gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\n\n// 或直接使用\nint g = __gcd(a, b);',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [5, 6],
    keyConcepts: ['GCD', '欧几里得算法', '数论基础'],
    videoLink: {
      bilibili: 'BV1tV411W7Mz',
      title: 'GCD最大公约数详解',
    },
  },

  // 判断素数
  47: {
    problemId: 47,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '素数定义：大于1且只能被1和自身整除的正整数\n\n判断方法：\n• 试除法：检查2到√n之间是否有因子\n• 特殊情况：0和1不是素数',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '试除法优化：\n• 只需检查到 √n\n• 可以先排除偶数\n• 时间复杂度 O(√n)\n\n对于多个数的素数判断，用筛法更高效',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: 'bool isPrime(int n) {\n    if (n < 2) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [71, 72],
    keyConcepts: ['素数', '试除法', '数论'],
    videoLink: {
      bilibili: 'BV1VJ411t7bz',
      title: '素数判断与筛法',
    },
  },

  // 二分查找
  23: {
    problemId: 23,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '二分查找前提：数组必须有序\n\n核心思想：\n• 每次将搜索范围缩小一半\n• 时间复杂度 O(log n)\n• 注意边界条件',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '二分查找框架：\n• left = 0, right = n - 1\n• mid = (left + right) / 2\n• 比较a[mid]与target\n• 更新left或right\n\n注意死循环问题',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: 'int left = 0, right = n - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (a[mid] == target) return mid;\n    else if (a[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}\nreturn -1;',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [77, 78],
    keyConcepts: ['二分查找', '有序数组', '搜索'],
    videoLink: {
      bilibili: 'BV1d54y1q7k7',
      title: '二分查找详解',
    },
  },

  // N皇后问题
  32: {
    problemId: 32,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: 'N皇后问题：在n×n棋盘放置n个皇后，互不攻击\n\n约束条件：\n• 同一行不能有两个皇后\n• 同一列不能有两个皇后\n• 同一对角线不能有两个皇后',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '使用DFS回溯：\n• 逐行放置皇后\n• 用数组记录列占用、对角线占用\n• 对角线可以用 i+j 和 i-j 标识\n• 放置后标记，回溯时清除',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: 'int col[N], diag1[2*N], diag2[2*N];\nvoid dfs(int row) {\n    if (row > n) { ans++; return; }\n    for (int c = 1; c <= n; c++) {\n        if (!col[c] && !diag1[row+c] && !diag2[row-c+n]) {\n            col[c] = diag1[row+c] = diag2[row-c+n] = 1;\n            dfs(row + 1);\n            col[c] = diag1[row+c] = diag2[row-c+n] = 0;\n        }\n    }\n}',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [33, 86],
    keyConcepts: ['DFS', '回溯', '状态压缩'],
    videoLink: {
      bilibili: 'BV1bK411s7Vn',
      title: 'N皇后问题详解',
    },
  },

  // 全排列
  33: {
    problemId: 33,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '全排列：输出1到n的所有排列方式\n\n排列数量：n! 种\n\n方法：\n• DFS回溯\n• 使用STL的next_permutation',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '方法1 - DFS：\n• 用used数组标记已使用的数\n• 递归生成排列\n\n方法2 - STL：\n• 初始化数组为1,2,...,n\n• 循环调用next_permutation',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: '// STL方法\nint a[10] = {1,2,3,4,5,6,7,8,9};\ndo {\n    for (int i = 0; i < n; i++)\n        cout << a[i] << " ";\n    cout << endl;\n} while (next_permutation(a, a + n));',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [32],
    keyConcepts: ['全排列', 'DFS', 'STL'],
    videoLink: {
      bilibili: 'BV1dx411U7TJ',
      title: '全排列算法详解',
    },
  },

  // 栈的应用 - 括号匹配
  35: {
    problemId: 35,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '括号匹配：检查括号是否正确配对\n\n核心数据结构：栈\n\n规则：\n• 遇到左括号入栈\n• 遇到右括号检查栈顶',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '栈的应用：\n• 左括号直接入栈\n• 右括号检查是否与栈顶匹配\n• 匹配则出栈，不匹配则失败\n• 最后栈必须为空',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: 'stack<char> st;\nfor (char c : s) {\n    if (c == \'(\' || c == \'[\' || c == \'{\')\n        st.push(c);\n    else {\n        if (st.empty()) return false;\n        char top = st.top();\n        if (!match(top, c)) return false;\n        st.pop();\n    }\n}\nreturn st.empty();',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [36],
    keyConcepts: ['栈', '括号匹配', '数据结构'],
    videoLink: {
      bilibili: 'BV1eZ4y1p7Ae',
      title: '栈的应用-括号匹配',
    },
  },

  // 队列 - 约瑟夫问题
  36: {
    problemId: 36,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: '约瑟夫问题：n人围圈，数到k出列\n\n模拟思路：\n• 使用队列模拟循环\n• 数到k的人出列\n• 其余人重新入队',
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: '队列模拟：\n• 前k-1个人出队后重新入队\n• 第k个人只出队不入队\n• 循环直到队列为空',
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: 'queue<int> q;\nfor (int i = 1; i <= n; i++) q.push(i);\nwhile (!q.empty()) {\n    for (int i = 1; i < k; i++) {\n        q.push(q.front());\n        q.pop();\n    }\n    cout << q.front() << " ";\n    q.pop();\n}',
        cost: 20,
        scorePenalty: 30,
      },
    ],
    relatedProblems: [35],
    keyConcepts: ['队列', '模拟', '数据结构'],
    videoLink: {
      bilibili: 'BV1FJ411p7CJ',
      title: '约瑟夫问题详解',
    },
  },
};

// 获取题目的提示
export function getProblemHints(problemId: number): ProblemHints | undefined {
  return PROBLEM_HINTS_MAP[problemId];
}

// 生成通用提示（当没有预设提示时）
export function generateGenericHints(
  problemId: number,
  title: string,
  category: string,
  difficulty: string,
  defaultCode: string
): ProblemHints {
  const categoryHints: Record<string, { algorithm: string; concepts: string[] }> = {
    '基础算法': {
      algorithm: '基础算法通常涉及循环、条件判断、数组操作等基本技能',
      concepts: ['循环', '条件判断', '数组'],
    },
    '字符串处理': {
      algorithm: '字符串问题常用方法：遍历、比较、拼接、查找替换',
      concepts: ['字符串遍历', '字符比较', '字符串函数'],
    },
    '数论': {
      algorithm: '数论问题常涉及：素数判断、最大公约数、同余运算',
      concepts: ['素数', 'GCD/LCM', '同余'],
    },
    '模拟': {
      algorithm: '模拟题关键是仔细读题，按步骤实现题目描述的过程',
      concepts: ['模拟', '状态管理', '边界处理'],
    },
    '递归与分治': {
      algorithm: '递归需要：递归边界、递归式、避免重复计算',
      concepts: ['递归边界', '分治思想', '记忆化'],
    },
    '动态规划': {
      algorithm: 'DP核心：定义状态、找出转移方程、确定边界条件',
      concepts: ['状态定义', '转移方程', '边界条件'],
    },
    '图论': {
      algorithm: '图论问题常用：DFS/BFS遍历、最短路、最小生成树',
      concepts: ['图的遍历', '最短路', '连通性'],
    },
    '数据结构': {
      algorithm: '选择合适的数据结构：数组、链表、栈、队列、树',
      concepts: ['数据结构选择', '时间复杂度', '空间复杂度'],
    },
    '贪心算法': {
      algorithm: '贪心关键是找到正确的贪心策略，并证明其正确性',
      concepts: ['贪心策略', '局部最优', '正确性证明'],
    },
    '搜索': {
      algorithm: '搜索包括DFS和BFS，关键是剪枝优化和状态表示',
      concepts: ['DFS', 'BFS', '剪枝'],
    },
  };

  const info = categoryHints[category] || categoryHints['基础算法'];

  return {
    problemId,
    hints: [
      {
        level: 1,
        title: '💡 思路方向',
        content: `题目：${title}\n分类：${category}\n\n${info.algorithm}\n\n建议先理解题目要求，画出简单的示例，分析规律。`,
        cost: 5,
        scorePenalty: 5,
      },
      {
        level: 2,
        title: '🔧 关键算法',
        content: `核心知识点：\n${info.concepts.map(c => `• ${c}`).join('\n')}\n\n难度：${difficulty}\n建议从简单情况入手，逐步推广到一般情况。`,
        cost: 10,
        scorePenalty: 15,
      },
      {
        level: 3,
        title: '📝 代码片段',
        content: `参考代码框架：\n\n${defaultCode.substring(0, 200)}${defaultCode.length > 200 ? '\n...' : ''}`,
        cost: 20,
        scorePenalty: 30,
      },
    ],
    keyConcepts: info.concepts,
  };
}

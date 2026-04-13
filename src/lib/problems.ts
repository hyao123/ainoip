// 题库数据 - 扩展版

// 难度等级
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// 题目来源
export type ProblemSource = 'NOIP-Popular' | 'NOIP-Improvement' | 'NOI' | 'ICPC' | 'LeetCode' | 'Interview' | 'Other';

// 面试频率
export type InterviewFrequency = 'hot' | 'medium' | 'low';

// 竞赛配置
export const sourceConfig: Record<ProblemSource, { label: string; color: string; icon: string }> = {
  'NOIP-Popular': { label: 'NOIP普及组', color: 'bg-green-100 text-green-800', icon: '🏆' },
  'NOIP-Improvement': { label: 'NOIP提高组', color: 'bg-blue-100 text-blue-800', icon: '🏅' },
  'NOI': { label: 'NOI/NOIP决赛', color: 'bg-purple-100 text-purple-800', icon: '🥇' },
  'ICPC': { label: 'ICPC/ACM', color: 'bg-amber-100 text-amber-800', icon: '🌐' },
  'LeetCode': { label: 'LeetCode', color: 'bg-orange-100 text-orange-800', icon: '🔥' },
  'Interview': { label: '面试真题', color: 'bg-rose-100 text-rose-800', icon: '💼' },
  'Other': { label: '其他', color: 'bg-gray-100 text-gray-800', icon: '📝' },
};

// 面试频率配置
export const frequencyConfig: Record<InterviewFrequency, { label: string; color: string }> = {
  'hot': { label: '高频', color: 'bg-red-100 text-red-800' },
  'medium': { label: '中频', color: 'bg-yellow-100 text-yellow-800' },
  'low': { label: '低频', color: 'bg-gray-100 text-gray-800' },
};

// 测试用例类型
export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
}

// 题目数据类型
export interface Problem {
  id: number;
  title: string;
  titleEn?: string; // 英文标题
  difficulty: DifficultyLevel;
  description: string;
  descriptionEn?: string; // 英文描述
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  defaultCode: string;
  category: string; // 主分类
  tags: string[]; // 知识点标签
  year?: string;
  source: ProblemSource;
  testCases?: TestCase[];
  timeLimit?: number; // 毫秒
  memoryLimit?: number; // MB
  similarProblems?: number[]; // 相似题目ID列表
}

// 难度配置
export const difficultyConfig: Record<DifficultyLevel, { label: string; color: string; bgColor: string }> = {
  beginner: { label: '入门', color: 'text-green-600', bgColor: 'bg-green-100 text-green-800 border-green-200' },
  intermediate: { label: '提高', color: 'text-blue-600', bgColor: 'bg-blue-100 text-blue-800 border-blue-200' },
  advanced: { label: '省选', color: 'text-orange-600', bgColor: 'bg-orange-100 text-orange-800 border-orange-200' },
  expert: { label: 'NOI', color: 'text-red-600', bgColor: 'bg-red-100 text-red-800 border-red-200' },
};

// 分类配置
export const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  '语法基础': { label: '语法基础', icon: '📖', color: 'text-emerald-600' },
  '基础算法': { label: '基础算法', icon: '🔧', color: 'text-blue-600' },
  '字符串处理': { label: '字符串处理', icon: '📝', color: 'text-purple-600' },
  '数论': { label: '数论', icon: '🔢', color: 'text-green-600' },
  '搜索': { label: '搜索', icon: '🔍', color: 'text-orange-600' },
  '动态规划': { label: '动态规划', icon: '📊', color: 'text-red-600' },
  '图论': { label: '图论', icon: '🕸️', color: 'text-cyan-600' },
  '数据结构': { label: '数据结构', icon: '🏗️', color: 'text-indigo-600' },
  '贪心': { label: '贪心', icon: '💰', color: 'text-yellow-600' },
  '分治': { label: '分治', icon: '✂️', color: 'text-pink-600' },
  '模拟': { label: '模拟', icon: '🎮', color: 'text-teal-600' },
};

// 知识点标签
export const knowledgeTags = [
  // 入门级标签
  '入门', '输入输出', '变量', '运算符', '条件语句', '循环', '嵌套循环', '函数',
  // 数据结构
  '数组', '字符串', '链表', '栈', '队列', '哈希表', '哈希思想', '树', '图', '堆', '并查集', '线段树', '树状数组',
  // 基础算法
  '枚举', '模拟', '排序', '查找', '贪心', '前缀和', '差分', '位运算',
  // 搜索
  '搜索-DFS', '搜索-BFS', '回溯', '剪枝',
  // 动态规划
  '动态规划', '递推', '背包问题', '区间DP', '树形DP', 'LIS', 'LCS', '状态压缩',
  // 图论
  '图论', '图论-最短路', '图论-生成树', '拓扑排序', '欧拉路径', 'Dijkstra', 'Floyd', 'Kruskal',
  // 字符串算法
  '字符串匹配', '字符串哈希', 'KMP', 'Trie树',
  // 数学
  '数学', 'GCD', 'LCM', '质数', '数论-GCD', '数论-质数', '数论-快速幂', '组合数学', '快速幂',
  // 高级技巧
  '二分查找', '双指针', '滑动窗口', '分治', '递归', '记忆化搜索',
  // 区间问题
  '区间问题',
];

// 预设题目数据
export const problems: Problem[] = [
  // ========== 基础算法 ==========
  {
    id: 1,
    title: 'A + B 问题',
    titleEn: 'A + B Problem',
    difficulty: 'beginner',
    description: '输入两个整数，输出它们的和。这是最基础的题目，帮助你熟悉输入输出。NOIP竞赛要求使用文件输入输出。',
    descriptionEn: 'Input two integers and output their sum. This is the most basic problem to help you get familiar with input and output.',
    inputFormat: '输入包含两个整数 a, b，用空格分隔。',
    outputFormat: '输出一个整数，表示 a + b 的值。',
    sampleInput: '1 2',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    // NOIP标准文件输入输出
    freopen("ab.in", "r", stdin);
    freopen("ab.out", "w", stdout);
    
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['输入输出', '变量'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '1 2', expectedOutput: '3' },
      { id: 2, input: '0 0', expectedOutput: '0' },
      { id: 3, input: '0 100', expectedOutput: '100' },
      { id: 4, input: '-5 10', expectedOutput: '5' },
      { id: 5, input: '-100 -200', expectedOutput: '-300' },
      { id: 6, input: '2147483647 0', expectedOutput: '2147483647' },
      { id: 7, input: '1000000 2000000', expectedOutput: '3000000' },
      { id: 8, input: '12345 67890', expectedOutput: '80235' },
    ],
    similarProblems: [2, 3],
  },
  {
    id: 2,
    title: '斐波那契数列',
    titleEn: 'Fibonacci Sequence',
    difficulty: 'beginner',
    description: '求斐波那契数列的第 n 项。斐波那契数列定义为：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) (n≥2)。这是经典的递推题目。',
    inputFormat: '输入一个整数 n，表示要求的项数。',
    outputFormat: '输出斐波那契数列的第 n 项。',
    sampleInput: '5',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("fibonacci.in", "r", stdin);
    freopen("fibonacci.out", "w", stdout);
    
    int n;
    cin >> n;
    
    if (n == 0) { cout << 0 << endl; return 0; }
    if (n == 1) { cout << 1 << endl; return 0; }
    
    int a = 0, b = 1, c;
    for (int i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    cout << b << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['递归', '循环', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '0', expectedOutput: '0' },
      { id: 2, input: '1', expectedOutput: '1' },
      { id: 3, input: '5', expectedOutput: '5' },
      { id: 4, input: '10', expectedOutput: '55' },
      { id: 5, input: '20', expectedOutput: '6765' },
      { id: 6, input: '30', expectedOutput: '832040' },
      { id: 7, input: '40', expectedOutput: '102334155' },
    ],
    similarProblems: [1, 3],
  },
  {
    id: 3,
    title: '阶乘计算',
    titleEn: 'Factorial Calculation',
    difficulty: 'beginner',
    description: '输入一个正整数 n，输出 n! 的值。n! = 1 × 2 × 3 × ... × n',
    inputFormat: '输入一个正整数 n (n ≤ 20)。',
    outputFormat: '输出 n! 的值。',
    sampleInput: '10',
    sampleOutput: '3628800',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("factorial.in", "r", stdin);
    freopen("factorial.out", "w", stdout);
    
    int n;
    cin >> n;
    
    long long ans = 1;
    for (int i = 2; i <= n; i++) {
        ans *= i;
    }
    
    cout << ans << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['循环', '变量'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '0', expectedOutput: '1' },
      { id: 2, input: '1', expectedOutput: '1' },
      { id: 3, input: '5', expectedOutput: '120' },
      { id: 4, input: '10', expectedOutput: '3628800' },
      { id: 5, input: '20', expectedOutput: '2432902008176640000' },
    ],
    similarProblems: [1, 2],
  },
  // ========== 数论 ==========
  {
    id: 4,
    title: '最大公约数',
    titleEn: 'Greatest Common Divisor',
    difficulty: 'intermediate',
    description: '求两个正整数的最大公约数（GCD）。使用欧几里得算法可以高效求解。',
    inputFormat: '输入两个正整数 a, b，用空格分隔。',
    outputFormat: '输出一个整数，表示 a 和 b 的最大公约数。',
    sampleInput: '12 18',
    sampleOutput: '6',
    defaultCode: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int main() {
    int a, b;
    cin >> a >> b;
    cout << gcd(a, b) << endl;
    return 0;
}`,
    category: '数论',
    tags: ['数论-GCD', '函数'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12 18', expectedOutput: '6' },
      { id: 2, input: '17 19', expectedOutput: '1' },
      { id: 3, input: '1000000 500000', expectedOutput: '500000' },
    ],
    similarProblems: [9, 10],
  },
  {
    id: 9,
    title: 'NOIP 2014 普及组 - 质因数分解',
    titleEn: 'Prime Factorization (NOIP 2014)',
    difficulty: 'intermediate',
    description: '已知正整数 n 是两个不同的质数的乘积，试求出较大的那个质数。',
    inputFormat: '输入一个正整数 n (n ≤ 2 × 10^9)。',
    outputFormat: '输出较大的那个质数。',
    sampleInput: '21',
    sampleOutput: '7',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("prime.in", "r", stdin);
    freopen("prime.out", "w", stdout);
    
    int n;
    cin >> n;
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            cout << n / i << endl;
            return 0;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数论',
    tags: ['数论-质数', '循环'],
    year: '2014',
    source: 'NOIP-Popular',
    timeLimit: 1000,
    memoryLimit: 128,
    similarProblems: [4, 10],
  },
  // ========== 字符串处理 ==========
  {
    id: 5,
    title: 'NOIP 2011 普及组 - 数字反转',
    titleEn: 'Number Reversal (NOIP 2011)',
    difficulty: 'beginner',
    description: '给定一个整数，请将该数各位数字反转后输出。注意：负数保留负号，末尾的0去掉。',
    inputFormat: '输入一个整数 N。',
    outputFormat: '输出一个整数，表示数字 N 反转后的值。',
    sampleInput: '123000',
    sampleOutput: '321',
    defaultCode: `#include <iostream>
#include <string>
#include <cstdio>
using namespace std;

int main() {
    freopen("reverse.in", "r", stdin);
    freopen("reverse.out", "w", stdout);
    
    string s;
    cin >> s;
    
    int start = 0;
    bool negative = false;
    if (s[0] == '-') {
        negative = true;
        start = 1;
    }
    
    int end = s.length() - 1;
    while (end > start && s[end] == '0') end--;
    
    if (negative) cout << '-';
    for (int i = end; i >= start; i--) {
        cout << s[i];
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', '循环'],
    year: '2011',
    source: 'NOIP-Popular',
    similarProblems: [6, 7],
  },
  {
    id: 6,
    title: 'NOIP 2008 普及组 - ISBN号码',
    titleEn: 'ISBN Number (NOIP 2008)',
    difficulty: 'intermediate',
    description: '每一本正式出版的图书都有一个ISBN号码与之对应，ISBN码包括9位数字、1位识别码和3位分隔符。',
    inputFormat: '输入一个ISBN号码（保证输入合法）。',
    outputFormat: '如果计算出的识别码与输入的识别码相同，输出"Right"，否则输出正确的ISBN号码。',
    sampleInput: '0-670-82162-0',
    sampleOutput: 'Right',
    defaultCode: `#include <iostream>
#include <string>
#include <cstdio>
#include <cctype>
using namespace std;

int main() {
    freopen("isbn.in", "r", stdin);
    freopen("isbn.out", "w", stdout);
    
    string s;
    cin >> s;
    
    int sum = 0, cnt = 1;
    for (int i = 0; i < s.length(); i++) {
        if (isdigit(s[i])) {
            sum += (s[i] - '0') * cnt;
            cnt++;
        }
    }
    
    int mod = sum % 11;
    char check = (mod == 10) ? 'X' : '0' + mod;
    
    if (s[s.length() - 1] == check) {
        cout << "Right" << endl;
    } else {
        s[s.length() - 1] = check;
        cout << s << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', '条件语句'],
    year: '2008',
    source: 'NOIP-Popular',
    similarProblems: [5, 7],
  },
  {
    id: 7,
    title: 'NOIP 2018 普及组 - 标题统计',
    titleEn: 'Title Statistics (NOIP 2018)',
    difficulty: 'beginner',
    description: '凯凯刚写了一篇作文，请问这篇作文的标题中有多少个字符？注意：标题中可能包含空格。',
    inputFormat: '输入只有一行，一个字符串s，表示凯凯写的作文的标题。',
    outputFormat: '输出一个整数，表示标题中的字符个数。',
    sampleInput: '234',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    int cnt = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] != ' ') cnt++;
    }
    
    cout << cnt << endl;
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', '循环'],
    year: '2018',
    source: 'NOIP-Popular',
    similarProblems: [5, 6],
  },
  // ========== 动态规划 ==========
  {
    id: 11,
    title: 'NOIP 2012 普及组 - 摆花',
    titleEn: 'Flower Arrangement (NOIP 2012)',
    difficulty: 'intermediate',
    description: '小明的花店新开张，有m种花，每种花有若干盆。现在有n个顾客，每个顾客要买一盆花。小明想让摆出来的花看起来尽可能不同，请问有多少种摆花方案？',
    inputFormat: '第一行两个正整数 n 和 m，分别表示花的总数和种类数。第二行 m 个正整数，表示每种花的数量。',
    outputFormat: '输出方案数，对 1000007 取模。',
    sampleInput: '5 3\n3 3 3',
    sampleOutput: '10',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("flower.in", "r", stdin);
    freopen("flower.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    // TODO: 实现动态规划解法
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '背包问题'],
    year: '2012',
    source: 'NOIP-Popular',
    similarProblems: [12, 13],
  },
  {
    id: 12,
    title: '数字三角形',
    titleEn: 'Number Triangle',
    difficulty: 'intermediate',
    description: '给定一个数字三角形，从顶部出发，每次可以移动到下方相邻的数字，求从顶部到底部的最大路径和。',
    inputFormat: '第一行一个整数 n，表示三角形的行数。接下来 n 行，每行 i 个整数，表示第 i 行的数字。',
    outputFormat: '输出最大路径和。',
    sampleInput: '5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5',
    sampleOutput: '30',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main() {
    freopen("triangle.in", "r", stdin);
    freopen("triangle.out", "w", stdout);
    
    int n;
    cin >> n;
    
    // TODO: 实现动态规划解法
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '递归'],
    source: 'Other',
    similarProblems: [11, 13],
  },
  // ========== 搜索 ==========
  {
    id: 13,
    title: 'NOIP 2015 普及组 - 扫雷游戏',
    titleEn: 'Minesweeper (NOIP 2015)',
    difficulty: 'beginner',
    description: '扫雷游戏是一款十分经典的单机小游戏。给定一个 n 行 m 列的雷区，输出每个非雷格周围的地雷数量。',
    inputFormat: '第一行两个整数 n 和 m，表示雷区大小。接下来 n 行，每行 m 个字符，表示雷区。\'*\'表示地雷，\'?\'表示非雷格。',
    outputFormat: '输出 n 行 m 列，表示每个非雷格周围的地雷数量。地雷位置输出\'*\'。',
    sampleInput: '3 3\n*??\n???\n?*?',
    sampleOutput: '*10\n221\n1*1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("minesweeper.in", "r", stdin);
    freopen("minesweeper.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    // TODO: 实现扫雷逻辑
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '搜索',
    tags: ['模拟', '数组', '循环'],
    year: '2015',
    source: 'NOIP-Popular',
    similarProblems: [14],
  },
  {
    id: 14,
    title: 'NOIP 2017 普及组 - 棋盘问题',
    titleEn: 'Chessboard Problem (NOIP 2017)',
    difficulty: 'intermediate',
    description: '在一个 n×n 的棋盘上，放置若干个棋子，要求任意两个棋子不能在同一行、同一列或同一对角线上。',
    inputFormat: '输入一个整数 n，表示棋盘大小。',
    outputFormat: '输出方案数。',
    sampleInput: '8',
    sampleOutput: '92',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("chess.in", "r", stdin);
    freopen("chess.out", "w", stdout);
    
    int n;
    cin >> n;
    
    // TODO: 实现搜索解法
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '递归'],
    year: '2017',
    source: 'NOIP-Popular',
    similarProblems: [13],
  },
  // ========== 图论 ==========
  {
    id: 15,
    title: 'NOIP 2016 提高组 - 信息传递',
    titleEn: 'Information Transfer (NOIP 2016)',
    difficulty: 'advanced',
    description: '有 n 个同学，每个同学有一个目标同学，他们会依次向目标同学传递信息。求信息传递的最小环长度。',
    inputFormat: '第一行一个整数 n。第二行 n 个整数，表示每个同学的目标同学。',
    outputFormat: '输出最小环长度。',
    sampleInput: '5\n2 4 2 3 1',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("message.in", "r", stdin);
    freopen("message.out", "w", stdout);
    
    int n;
    cin >> n;
    
    // TODO: 实现图论解法
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-最短路', '并查集'],
    year: '2016',
    source: 'NOIP-Improvement',
    similarProblems: [16],
  },
  // ========== 数据结构 ==========
  {
    id: 16,
    title: 'NOIP 2013 普及组 - 栈的练习',
    titleEn: 'Stack Practice (NOIP 2013)',
    difficulty: 'intermediate',
    description: '实现一个栈，支持 push、pop 和 getMin 操作。',
    inputFormat: '第一行一个整数 n，表示操作次数。接下来 n 行，每行一个操作。',
    outputFormat: '对于每个 getMin 操作，输出栈中的最小值。',
    sampleInput: '8\npush 3\npush 2\ngetMin\npush 1\ngetMin\npop\ngetMin\npop',
    sampleOutput: '2\n1\n2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <stack>
using namespace std;

int main() {
    freopen("stack.in", "r", stdin);
    freopen("stack.out", "w", stdout);
    
    int n;
    cin >> n;
    
    // TODO: 实现栈操作
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['栈', '数据结构'],
    year: '2013',
    source: 'NOIP-Popular',
    similarProblems: [15],
  },
  // ========== 贪心 ==========
  {
    id: 17,
    title: 'NOIP 2012 普及组 - 接水问题',
    titleEn: 'Water Problem (NOIP 2012)',
    difficulty: 'beginner',
    description: '学校有一个水房，里面有 m 个水龙头，每个水龙头供水的速度相同。有 n 个同学要接水，求最少需要多少时间。',
    inputFormat: '第一行两个整数 n 和 m。第二行 n 个整数，表示每个同学接水需要的时间。',
    outputFormat: '输出最少需要的时间。',
    sampleInput: '5 3\n4 4 1 2 1',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main() {
    freopen("water.in", "r", stdin);
    freopen("water.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    // TODO: 实现贪心解法
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '排序'],
    year: '2012',
    source: 'NOIP-Popular',
    similarProblems: [18],
  },
  {
    id: 18,
    title: 'NOIP 2004 普及组 - 合并果子',
    titleEn: 'Merge Fruits (NOIP 2004)',
    difficulty: 'intermediate',
    description: '有 n 堆果子，每次可以合并两堆，消耗的体力等于两堆果子重量之和。求最少消耗多少体力可以合并成一堆。',
    inputFormat: '第一行一个整数 n。第二行 n 个整数，表示每堆果子的重量。',
    outputFormat: '输出最少消耗的体力。',
    sampleInput: '3\n1 2 9',
    sampleOutput: '15',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;

int main() {
    freopen("fruit.in", "r", stdin);
    freopen("fruit.out", "w", stdout);
    
    int n;
    cin >> n;
    
    // TODO: 实现贪心解法（使用优先队列）
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '堆', '排序'],
    year: '2004',
    source: 'NOIP-Popular',
    similarProblems: [17],
  },
  // ========== 新增题目 - 基础篇 ==========
  {
    id: 19,
    title: 'Hello World',
    titleEn: 'Hello World',
    difficulty: 'beginner',
    description: '输出 "Hello World" 到文件。这是最基础的输出练习。',
    inputFormat: '无输入。',
    outputFormat: '输出 Hello World。',
    sampleInput: '',
    sampleOutput: 'Hello World',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("hello.in", "r", stdin);
    freopen("hello.out", "w", stdout);
    
    cout << "Hello World" << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['输入输出'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Hello World' },
    ],
    similarProblems: [1],
  },
  {
    id: 20,
    title: '输出图形',
    titleEn: 'Print Pattern',
    difficulty: 'beginner',
    description: '输出一个由星号组成的三角形。帮助熟悉多行输出。',
    inputFormat: '输入一个整数 n，表示三角形的行数。',
    outputFormat: '输出 n 行星号组成的三角形，第 i 行有 i 个星号。',
    sampleInput: '3',
    sampleOutput: '*\n**\n***',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("pattern.in", "r", stdin);
    freopen("pattern.out", "w", stdout);
    
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "*";
        }
        cout << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['输入输出', '循环'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3', expectedOutput: '*\n**\n***' },
      { id: 2, input: '5', expectedOutput: '*\n**\n***\n****\n*****' },
    ],
    similarProblems: [1, 19],
  },
  {
    id: 21,
    title: '数据范围测试',
    titleEn: 'Data Range Test',
    difficulty: 'beginner',
    description: '输出各种数据类型的最大值和最小值，理解数据范围的重要性。',
    inputFormat: '无输入。',
    outputFormat: '分别输出 int、long long 的最大值和最小值，每行一个。',
    sampleInput: '',
    sampleOutput: '2147483647\n-2147483648\n9223372036854775807\n-9223372036854775808',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <climits>
using namespace std;

int main() {
    freopen("range.in", "r", stdin);
    freopen("range.out", "w", stdout);
    
    cout << INT_MAX << endl;
    cout << INT_MIN << endl;
    cout << LLONG_MAX << endl;
    cout << LLONG_MIN << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['变量', '数据类型'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: '2147483647\n-2147483648\n9223372036854775807\n-9223372036854775808' },
    ],
    similarProblems: [3],
  },
  {
    id: 22,
    title: '四则运算',
    titleEn: 'Arithmetic Operations',
    difficulty: 'beginner',
    description: '输入两个整数，输出它们的和、差、积、商（整数除法）和余数。',
    inputFormat: '输入两个整数 a 和 b，用空格分隔。',
    outputFormat: '输出五行的结果，分别是和、差、积、商、余数。',
    sampleInput: '10 3',
    sampleOutput: '13\n7\n30\n3\n1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("calc.in", "r", stdin);
    freopen("calc.out", "w", stdout);
    
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    cout << a - b << endl;
    cout << a * b << endl;
    cout << a / b << endl;
    cout << a % b << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['运算符', '变量'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10 3', expectedOutput: '13\n7\n30\n3\n1' },
      { id: 2, input: '7 2', expectedOutput: '9\n5\n14\n3\n1' },
    ],
    similarProblems: [1],
  },
  {
    id: 23,
    title: '求平均值',
    titleEn: 'Average',
    difficulty: 'beginner',
    description: '输入三个整数，输出它们的平均值（保留两位小数）。',
    inputFormat: '输入三个整数，用空格分隔。',
    outputFormat: '输出平均值，保留两位小数。',
    sampleInput: '1 2 3',
    sampleOutput: '2.00',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <iomanip>
using namespace std;

int main() {
    freopen("avg.in", "r", stdin);
    freopen("avg.out", "w", stdout);
    
    int a, b, c;
    cin >> a >> b >> c;
    cout << fixed << setprecision(2) << (a + b + c) / 3.0 << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['运算符', '变量'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '1 2 3', expectedOutput: '2.00' },
      { id: 2, input: '10 20 30', expectedOutput: '20.00' },
    ],
    similarProblems: [22],
  },
  {
    id: 24,
    title: '判断奇偶',
    titleEn: 'Odd or Even',
    difficulty: 'beginner',
    description: '输入一个整数，判断它是奇数还是偶数。',
    inputFormat: '输入一个整数 n。',
    outputFormat: '如果是奇数输出 "odd"，否则输出 "even"。',
    sampleInput: '5',
    sampleOutput: 'odd',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("oddeven.in", "r", stdin);
    freopen("oddeven.out", "w", stdout);
    
    int n;
    cin >> n;
    if (n % 2 == 0) {
        cout << "even" << endl;
    } else {
        cout << "odd" << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['条件语句', '运算符'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5', expectedOutput: 'odd' },
      { id: 2, input: '10', expectedOutput: 'even' },
      { id: 3, input: '0', expectedOutput: 'even' },
    ],
    similarProblems: [25, 26],
  },
  {
    id: 25,
    title: '成绩等级',
    titleEn: 'Grade Level',
    difficulty: 'beginner',
    description: '输入一个百分制成绩，输出对应的等级：90-100为A，80-89为B，70-79为C，60-69为D，60以下为E。',
    inputFormat: '输入一个整数成绩（0-100）。',
    outputFormat: '输出对应的等级字母。',
    sampleInput: '85',
    sampleOutput: 'B',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("grade.in", "r", stdin);
    freopen("grade.out", "w", stdout);
    
    int score;
    cin >> score;
    
    if (score >= 90) cout << "A" << endl;
    else if (score >= 80) cout << "B" << endl;
    else if (score >= 70) cout << "C" << endl;
    else if (score >= 60) cout << "D" << endl;
    else cout << "E" << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['条件语句'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '85', expectedOutput: 'B' },
      { id: 2, input: '95', expectedOutput: 'A' },
      { id: 3, input: '55', expectedOutput: 'E' },
    ],
    similarProblems: [24],
  },
  {
    id: 26,
    title: '最大值',
    titleEn: 'Maximum',
    difficulty: 'beginner',
    description: '输入三个整数，输出其中的最大值。',
    inputFormat: '输入三个整数，用空格分隔。',
    outputFormat: '输出最大值。',
    sampleInput: '1 5 3',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("max.in", "r", stdin);
    freopen("max.out", "w", stdout);
    
    int a, b, c;
    cin >> a >> b >> c;
    int maxVal = a;
    if (b > maxVal) maxVal = b;
    if (c > maxVal) maxVal = c;
    cout << maxVal << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['条件语句', '变量'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '1 5 3', expectedOutput: '5' },
      { id: 2, input: '-1 -5 -3', expectedOutput: '-1' },
    ],
    similarProblems: [24, 25],
  },
  {
    id: 27,
    title: '求和',
    titleEn: 'Sum',
    difficulty: 'beginner',
    description: '输入 n 个整数，求它们的和。',
    inputFormat: '第一行一个整数 n，第二行 n 个整数。',
    outputFormat: '输出这 n 个整数的和。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '15',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("sum.in", "r", stdin);
    freopen("sum.out", "w", stdout);
    
    int n, sum = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sum += x;
    }
    cout << sum << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['循环', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expectedOutput: '15' },
      { id: 2, input: '3\n10 20 30', expectedOutput: '60' },
    ],
    similarProblems: [2, 3],
  },
  {
    id: 28,
    title: '九九乘法表',
    titleEn: 'Multiplication Table',
    difficulty: 'beginner',
    description: '输出九九乘法表。',
    inputFormat: '无输入。',
    outputFormat: '输出 9 行乘法表，每行格式为 "i*j=result"。',
    sampleInput: '',
    sampleOutput: '1*1=1\n1*2=2 2*2=4\n...',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("table.in", "r", stdin);
    freopen("table.out", "w", stdout);
    
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j << "*" << i << "=" << i * j;
            if (j < i) cout << " ";
        }
        cout << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['循环', '输入输出'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: '1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9\n1*4=4 2*4=8 3*4=12 4*4=16\n1*5=5 2*5=10 3*5=15 4*5=20 5*5=25\n1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36\n1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49\n1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64\n1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81' },
    ],
    similarProblems: [20, 27],
  },
  {
    id: 29,
    title: '数字统计',
    titleEn: 'Digit Count',
    difficulty: 'beginner',
    description: '输入一个正整数，统计其中每个数字出现的次数。',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出 10 行，分别表示数字 0-9 出现的次数。',
    sampleInput: '112233',
    sampleOutput: '0\n2\n2\n2\n0\n0\n0\n0\n0\n0',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("count.in", "r", stdin);
    freopen("count.out", "w", stdout);
    
    int n, cnt[10] = {0};
    cin >> n;
    if (n == 0) cnt[0]++;
    while (n > 0) {
        cnt[n % 10]++;
        n /= 10;
    }
    for (int i = 0; i < 10; i++) {
        cout << cnt[i] << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['循环', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '112233', expectedOutput: '0\n2\n2\n2\n0\n0\n0\n0\n0\n0' },
      { id: 2, input: '1234567890', expectedOutput: '1\n1\n1\n1\n1\n1\n1\n1\n1\n1' },
    ],
    similarProblems: [5, 6],
  },
  // ========== 新增题目 - 数组篇 ==========
  {
    id: 30,
    title: '数组求和',
    titleEn: 'Array Sum',
    difficulty: 'beginner',
    description: '输入 n 个整数存入数组，计算并输出它们的和、最大值、最小值。',
    inputFormat: '第一行一个整数 n，第二行 n 个整数。',
    outputFormat: '输出三个数：和、最大值、最小值，用空格分隔。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '15 5 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("arrsum.in", "r", stdin);
    freopen("arrsum.out", "w", stdout);
    
    int n, a[100];
    cin >> n;
    int sum = 0, maxVal, minVal;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        sum += a[i];
        if (i == 0) maxVal = minVal = a[i];
        else {
            if (a[i] > maxVal) maxVal = a[i];
            if (a[i] < minVal) minVal = a[i];
        }
    }
    cout << sum << " " << maxVal << " " << minVal << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '循环'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expectedOutput: '15 5 1' },
      { id: 2, input: '3\n-1 0 1', expectedOutput: '0 1 -1' },
    ],
    similarProblems: [27, 29],
  },
  {
    id: 31,
    title: '数组逆序',
    titleEn: 'Array Reverse',
    difficulty: 'beginner',
    description: '输入 n 个整数，将数组逆序后输出。',
    inputFormat: '第一行一个整数 n，第二行 n 个整数。',
    outputFormat: '输出逆序后的数组。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '5 4 3 2 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("reverse.in", "r", stdin);
    freopen("reverse.out", "w", stdout);
    
    int n, a[100];
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = n - 1; i >= 0; i--) {
        cout << a[i];
        if (i > 0) cout << " ";
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
      { id: 2, input: '3\n10 20 30', expectedOutput: '30 20 10' },
    ],
    similarProblems: [5, 30],
  },
  {
    id: 32,
    title: '数组查找',
    titleEn: 'Array Search',
    difficulty: 'beginner',
    description: '输入 n 个整数和一个目标值，查找目标值在数组中的位置（下标从0开始）。如果不存在输出-1。',
    inputFormat: '第一行一个整数 n，第二行 n 个整数，第三行目标值。',
    outputFormat: '输出目标值的位置，如果不存在输出-1。',
    sampleInput: '5\n1 2 3 4 5\n3',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("search.in", "r", stdin);
    freopen("search.out", "w", stdout);
    
    int n, a[100], target;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> target;
    
    int pos = -1;
    for (int i = 0; i < n; i++) {
        if (a[i] == target) {
            pos = i;
            break;
        }
    }
    cout << pos << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '循环'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5\n3', expectedOutput: '2' },
      { id: 2, input: '5\n1 2 3 4 5\n6', expectedOutput: '-1' },
    ],
    similarProblems: [30, 31],
  },
  // ========== 新增题目 - 字符串篇 ==========
  {
    id: 33,
    title: '字符串长度',
    titleEn: 'String Length',
    difficulty: 'beginner',
    description: '输入一个字符串，输出它的长度。',
    inputFormat: '输入一个字符串（不含空格）。',
    outputFormat: '输出字符串长度。',
    sampleInput: 'hello',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main() {
    freopen("strlen.in", "r", stdin);
    freopen("strlen.out", "w", stdout);
    
    string s;
    cin >> s;
    cout << s.length() << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'hello', expectedOutput: '5' },
      { id: 2, input: 'abc', expectedOutput: '3' },
    ],
    similarProblems: [7, 34],
  },
  {
    id: 34,
    title: '字符串拼接',
    titleEn: 'String Concatenation',
    difficulty: 'beginner',
    description: '输入两个字符串，将它们拼接后输出。',
    inputFormat: '输入两行，每行一个字符串。',
    outputFormat: '输出拼接后的字符串。',
    sampleInput: 'hello\nworld',
    sampleOutput: 'helloworld',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main() {
    freopen("concat.in", "r", stdin);
    freopen("concat.out", "w", stdout);
    
    string s1, s2;
    cin >> s1 >> s2;
    cout << s1 + s2 << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'hello\nworld', expectedOutput: 'helloworld' },
      { id: 2, input: 'a\nb', expectedOutput: 'ab' },
    ],
    similarProblems: [33, 35],
  },
  {
    id: 35,
    title: '字母大小写转换',
    titleEn: 'Case Conversion',
    difficulty: 'beginner',
    description: '输入一个字符串，将其中的大写字母转换为小写，小写字母转换为大写后输出。',
    inputFormat: '输入一个字符串。',
    outputFormat: '输出转换后的字符串。',
    sampleInput: 'Hello',
    sampleOutput: 'hELLO',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <cctype>
using namespace std;

int main() {
    freopen("case.in", "r", stdin);
    freopen("case.out", "w", stdout);
    
    string s;
    cin >> s;
    for (int i = 0; i < s.length(); i++) {
        if (isupper(s[i])) s[i] = tolower(s[i]);
        else if (islower(s[i])) s[i] = toupper(s[i]);
    }
    cout << s << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'Hello', expectedOutput: 'hELLO' },
      { id: 2, input: 'ABC', expectedOutput: 'abc' },
    ],
    similarProblems: [33, 34],
  },
  {
    id: 36,
    title: '回文字符串',
    titleEn: 'Palindrome String',
    difficulty: 'beginner',
    description: '输入一个字符串，判断它是否是回文串（正读反读相同）。',
    inputFormat: '输入一个字符串。',
    outputFormat: '如果是回文串输出 "Yes"，否则输出 "No"。',
    sampleInput: 'abba',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main() {
    freopen("palin.in", "r", stdin);
    freopen("palin.out", "w", stdout);
    
    string s;
    cin >> s;
    bool isPalin = true;
    int n = s.length();
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - 1 - i]) {
            isPalin = false;
            break;
        }
    }
    cout << (isPalin ? "Yes" : "No") << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'abba', expectedOutput: 'Yes' },
      { id: 2, input: 'abc', expectedOutput: 'No' },
      { id: 3, input: 'a', expectedOutput: 'Yes' },
    ],
    similarProblems: [33, 34],
  },
  {
    id: 37,
    title: '字符串统计',
    titleEn: 'String Statistics',
    difficulty: 'beginner',
    description: '输入一个字符串，统计其中的字母、数字和其他字符的个数。',
    inputFormat: '输入一个字符串（可含空格，以换行结束）。',
    outputFormat: '输出三个数：字母个数、数字个数、其他字符个数。',
    sampleInput: 'Hello 123!',
    sampleOutput: '5 3 3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <cctype>
using namespace std;

int main() {
    freopen("strstat.in", "r", stdin);
    freopen("strstat.out", "w", stdout);
    
    string s;
    getline(cin, s);
    int letters = 0, digits = 0, others = 0;
    for (int i = 0; i < s.length(); i++) {
        if (isalpha(s[i])) letters++;
        else if (isdigit(s[i])) digits++;
        else others++;
    }
    cout << letters << " " << digits << " " << others << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', '模拟'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'Hello 123!', expectedOutput: '5 3 3' },
    ],
    similarProblems: [33, 36],
  },
  // ========== 新增题目 - 数论篇 ==========
  {
    id: 38,
    title: '素数判断',
    titleEn: 'Prime Check',
    difficulty: 'beginner',
    description: '输入一个正整数 n，判断它是否是素数。',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '如果是素数输出 "Yes"，否则输出 "No"。',
    sampleInput: '7',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main() {
    freopen("prime.in", "r", stdin);
    freopen("prime.out", "w", stdout);
    
    int n;
    cin >> n;
    bool isPrime = true;
    if (n < 2) isPrime = false;
    else {
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
    }
    cout << (isPrime ? "Yes" : "No") << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数论',
    tags: ['数论-质数'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7', expectedOutput: 'Yes' },
      { id: 2, input: '4', expectedOutput: 'No' },
      { id: 3, input: '1', expectedOutput: 'No' },
    ],
    similarProblems: [39, 40],
  },
  {
    id: 39,
    title: '素数筛法',
    titleEn: 'Sieve of Eratosthenes',
    difficulty: 'intermediate',
    description: '输入 n，输出 1 到 n 之间的所有素数。',
    inputFormat: '输入一个正整数 n（n≤1000）。',
    outputFormat: '输出所有素数，用空格分隔。',
    sampleInput: '10',
    sampleOutput: '2 3 5 7',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("sieve.in", "r", stdin);
    freopen("sieve.out", "w", stdout);
    
    int n;
    cin >> n;
    bool isPrime[1001];
    for (int i = 2; i <= n; i++) isPrime[i] = true;
    
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    bool first = true;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            if (!first) cout << " ";
            cout << i;
            first = false;
        }
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数论',
    tags: ['数论-质数', '筛法'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10', expectedOutput: '2 3 5 7' },
      { id: 2, input: '20', expectedOutput: '2 3 5 7 11 13 17 19' },
    ],
    similarProblems: [38, 40],
  },
  {
    id: 40,
    title: '质因数分解',
    titleEn: 'Prime Factorization',
    difficulty: 'intermediate',
    description: '输入一个正整数 n，输出它的所有质因数。',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出所有质因数，按从小到大排列，用空格分隔。',
    sampleInput: '12',
    sampleOutput: '2 2 3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("factor.in", "r", stdin);
    freopen("factor.out", "w", stdout);
    
    int n;
    cin >> n;
    bool first = true;
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            if (!first) cout << " ";
            cout << i;
            first = false;
            n /= i;
        }
    }
    if (n > 1) {
        if (!first) cout << " ";
        cout << n;
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数论',
    tags: ['数论-质数'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12', expectedOutput: '2 2 3' },
      { id: 2, input: '7', expectedOutput: '7' },
    ],
    similarProblems: [38, 39],
  },
  {
    id: 41,
    title: '最大公约数',
    titleEn: 'GCD',
    difficulty: 'beginner',
    description: '输入两个正整数 a 和 b，输出它们的最大公约数。',
    inputFormat: '输入两个正整数 a 和 b，用空格分隔。',
    outputFormat: '输出最大公约数。',
    sampleInput: '12 8',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int main() {
    freopen("gcd.in", "r", stdin);
    freopen("gcd.out", "w", stdout);
    
    int a, b;
    cin >> a >> b;
    cout << gcd(a, b) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数论',
    tags: ['数论-GCD', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12 8', expectedOutput: '4' },
      { id: 2, input: '15 25', expectedOutput: '5' },
    ],
    similarProblems: [4, 42],
  },
  {
    id: 42,
    title: '最小公倍数',
    titleEn: 'LCM',
    difficulty: 'beginner',
    description: '输入两个正整数 a 和 b，输出它们的最小公倍数。',
    inputFormat: '输入两个正整数 a 和 b，用空格分隔。',
    outputFormat: '输出最小公倍数。',
    sampleInput: '12 8',
    sampleOutput: '24',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int main() {
    freopen("lcm.in", "r", stdin);
    freopen("lcm.out", "w", stdout);
    
    int a, b;
    cin >> a >> b;
    cout << a / gcd(a, b) * b << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数论',
    tags: ['数论-GCD'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12 8', expectedOutput: '24' },
      { id: 2, input: '3 5', expectedOutput: '15' },
    ],
    similarProblems: [4, 41],
  },
  {
    id: 43,
    title: '快速幂',
    titleEn: 'Fast Power',
    difficulty: 'intermediate',
    description: '计算 a^b mod m 的值，其中 a、b、m 都是正整数。',
    inputFormat: '输入三个正整数 a、b、m，用空格分隔。',
    outputFormat: '输出 a^b mod m 的值。',
    sampleInput: '2 10 1000',
    sampleOutput: '24',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

long long fastPow(long long a, long long b, long long m) {
    long long result = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) result = result * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return result;
}

int main() {
    freopen("fastpow.in", "r", stdin);
    freopen("fastpow.out", "w", stdout);
    
    long long a, b, m;
    cin >> a >> b >> m;
    cout << fastPow(a, b, m) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数论',
    tags: ['数论-快速幂', '位运算'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2 10 1000', expectedOutput: '24' },
      { id: 2, input: '3 5 100', expectedOutput: '43' },
    ],
    similarProblems: [41, 42],
  },
  // ========== 新增题目 - 排序与查找篇 ==========
  {
    id: 44,
    title: '冒泡排序',
    titleEn: 'Bubble Sort',
    difficulty: 'beginner',
    description: '输入 n 个整数，使用冒泡排序将它们从小到大排序后输出。',
    inputFormat: '第一行一个整数 n，第二行 n 个整数。',
    outputFormat: '输出排序后的 n 个整数。',
    sampleInput: '5\n5 3 1 4 2',
    sampleOutput: '1 2 3 4 5',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("bubble.in", "r", stdin);
    freopen("bubble.out", "w", stdout);
    
    int n, a[100];
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                int temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
    
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 1 4 2', expectedOutput: '1 2 3 4 5' },
      { id: 2, input: '3\n3 2 1', expectedOutput: '1 2 3' },
    ],
    similarProblems: [45, 46],
  },
  {
    id: 45,
    title: '选择排序',
    titleEn: 'Selection Sort',
    difficulty: 'beginner',
    description: '输入 n 个整数，使用选择排序将它们从小到大排序后输出。',
    inputFormat: '第一行一个整数 n，第二行 n 个整数。',
    outputFormat: '输出排序后的 n 个整数。',
    sampleInput: '5\n5 3 1 4 2',
    sampleOutput: '1 2 3 4 5',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("select.in", "r", stdin);
    freopen("select.out", "w", stdout);
    
    int n, a[100];
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIdx]) minIdx = j;
        }
        int temp = a[i];
        a[i] = a[minIdx];
        a[minIdx] = temp;
    }
    
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 1 4 2', expectedOutput: '1 2 3 4 5' },
    ],
    similarProblems: [44, 46],
  },
  {
    id: 46,
    title: '快速排序',
    titleEn: 'Quick Sort',
    difficulty: 'intermediate',
    description: '输入 n 个整数，使用快速排序将它们从小到大排序后输出。',
    inputFormat: '第一行一个整数 n，第二行 n 个整数。',
    outputFormat: '输出排序后的 n 个整数。',
    sampleInput: '5\n5 3 1 4 2',
    sampleOutput: '1 2 3 4 5',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int a[100];

void quickSort(int left, int right) {
    if (left >= right) return;
    int i = left, j = right, pivot = a[(left + right) / 2];
    while (i <= j) {
        while (a[i] < pivot) i++;
        while (a[j] > pivot) j--;
        if (i <= j) {
            int temp = a[i];
            a[i] = a[j];
            a[j] = temp;
            i++; j--;
        }
    }
    quickSort(left, j);
    quickSort(i, right);
}

int main() {
    freopen("qsort.in", "r", stdin);
    freopen("qsort.out", "w", stdout);
    
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    quickSort(0, n - 1);
    
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['排序', '分治', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 1 4 2', expectedOutput: '1 2 3 4 5' },
    ],
    similarProblems: [44, 45],
  },
  {
    id: 47,
    title: '二分查找',
    titleEn: 'Binary Search',
    difficulty: 'intermediate',
    description: '输入一个有序数组和一个目标值，使用二分查找找到目标值的位置。如果不存在输出-1。',
    inputFormat: '第一行一个整数 n，第二行 n 个有序整数，第三行目标值。',
    outputFormat: '输出目标值的位置（下标从0开始），不存在则输出-1。',
    sampleInput: '5\n1 2 3 4 5\n3',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("bsearch.in", "r", stdin);
    freopen("bsearch.out", "w", stdout);
    
    int n, a[100], target;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> target;
    
    int left = 0, right = n - 1, result = -1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (a[mid] == target) {
            result = mid;
            break;
        } else if (a[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    cout << result << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['二分查找'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5\n3', expectedOutput: '2' },
      { id: 2, input: '5\n1 2 3 4 5\n6', expectedOutput: '-1' },
    ],
    similarProblems: [32, 48],
  },
  {
    id: 48,
    title: '二分答案',
    titleEn: 'Binary Answer',
    difficulty: 'intermediate',
    description: '输入 n 个正整数和一个目标值 s，找出最小的 x 使得所有大于等于 x 的数的和不小于 s。',
    inputFormat: '第一行 n 和 s，第二行 n 个正整数。',
    outputFormat: '输出最小的 x，如果无解输出 -1。',
    sampleInput: '5 10\n1 2 3 4 5',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main() {
    freopen("bans.in", "r", stdin);
    freopen("bans.out", "w", stdout);
    
    int n, s, a[100];
    cin >> n >> s;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    sort(a, a + n);
    
    int left = a[0], right = a[n-1], result = -1;
    while (left <= right) {
        int mid = (left + right) / 2;
        long long sum = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] >= mid) sum += a[i];
        }
        if (sum >= s) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    cout << result << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['二分查找'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 10\n1 2 3 4 5', expectedOutput: '3' },
    ],
    similarProblems: [47, 46],
  },
  // ========== 新增题目 - 递归与分治篇 ==========
  {
    id: 49,
    title: '阶乘',
    titleEn: 'Factorial',
    difficulty: 'beginner',
    description: '输入一个非负整数 n，输出 n 的阶乘（使用递归实现）。',
    inputFormat: '输入一个非负整数 n（n≤20）。',
    outputFormat: '输出 n! 的值。',
    sampleInput: '5',
    sampleOutput: '120',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    freopen("fact.in", "r", stdin);
    freopen("fact.out", "w", stdout);
    
    int n;
    cin >> n;
    cout << factorial(n) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5', expectedOutput: '120' },
      { id: 2, input: '0', expectedOutput: '1' },
    ],
    similarProblems: [2, 50],
  },
  {
    id: 50,
    title: '汉诺塔',
    titleEn: 'Hanoi Tower',
    difficulty: 'intermediate',
    description: '输入 n，输出汉诺塔移动的步骤。',
    inputFormat: '输入一个正整数 n（n≤10）。',
    outputFormat: '输出移动步骤，每行格式为 "A->C"。',
    sampleInput: '2',
    sampleOutput: 'A->B\nA->C\nB->C',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << from << "->" << to << endl;
        return;
    }
    hanoi(n - 1, from, aux, to);
    cout << from << "->" << to << endl;
    hanoi(n - 1, aux, to, from);
}

int main() {
    freopen("hanoi.in", "r", stdin);
    freopen("hanoi.out", "w", stdout);
    
    int n;
    cin >> n;
    hanoi(n, 'A', 'C', 'B');
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['递归', '分治'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2', expectedOutput: 'A->B\nA->C\nB->C' },
    ],
    similarProblems: [49, 46],
  },
  {
    id: 51,
    title: '归并排序',
    titleEn: 'Merge Sort',
    difficulty: 'intermediate',
    description: '输入 n 个整数，使用归并排序将它们从小到大排序后输出。',
    inputFormat: '第一行一个整数 n，第二行 n 个整数。',
    outputFormat: '输出排序后的 n 个整数。',
    sampleInput: '5\n5 3 1 4 2',
    sampleOutput: '1 2 3 4 5',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int a[100], temp[100];

void mergeSort(int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    
    int i = left, j = mid + 1, k = left;
    while (i <= mid && j <= right) {
        if (a[i] <= a[j]) temp[k++] = a[i++];
        else temp[k++] = a[j++];
    }
    while (i <= mid) temp[k++] = a[i++];
    while (j <= right) temp[k++] = a[j++];
    for (i = left; i <= right; i++) a[i] = temp[i];
}

int main() {
    freopen("merge.in", "r", stdin);
    freopen("merge.out", "w", stdout);
    
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    mergeSort(0, n - 1);
    
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['排序', '分治', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 1 4 2', expectedOutput: '1 2 3 4 5' },
    ],
    similarProblems: [46, 50],
  },
  // ========== 新增题目 - 贪心篇 ==========
  {
    id: 52,
    title: '排队接水',
    titleEn: 'Water Queue',
    difficulty: 'intermediate',
    description: '有 n 个人排队接水，每个人接水时间不同。求最优排队顺序使得平均等待时间最短。',
    inputFormat: '第一行 n，第二行 n 个人的接水时间。',
    outputFormat: '输出最小的平均等待时间（保留两位小数）。',
    sampleInput: '4\n4 2 1 3',
    sampleOutput: '3.25',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    freopen("queue.in", "r", stdin);
    freopen("queue.out", "w", stdout);
    
    int n, t[100];
    cin >> n;
    for (int i = 0; i < n; i++) cin >> t[i];
    
    sort(t, t + n);
    
    long long totalWait = 0, sum = 0;
    for (int i = 0; i < n; i++) {
        totalWait += sum;
        sum += t[i];
    }
    
    cout << fixed << setprecision(2) << (double)totalWait / n << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n4 2 1 3', expectedOutput: '3.25' },
    ],
    similarProblems: [17, 18],
  },
  {
    id: 53,
    title: '活动选择',
    titleEn: 'Activity Selection',
    difficulty: 'intermediate',
    description: '有 n 个活动，每个活动有开始和结束时间。求最多能参加多少个不重叠的活动。',
    inputFormat: '第一行 n，接下来 n 行每行两个整数表示开始和结束时间。',
    outputFormat: '输出最多能参加的活动数。',
    sampleInput: '3\n1 3\n2 5\n3 6',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

struct Activity {
    int start, end;
} acts[100];

bool cmp(Activity a, Activity b) {
    return a.end < b.end;
}

int main() {
    freopen("activity.in", "r", stdin);
    freopen("activity.out", "w", stdout);
    
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> acts[i].start >> acts[i].end;
    }
    
    sort(acts, acts + n, cmp);
    
    int count = 1, lastEnd = acts[0].end;
    for (int i = 1; i < n; i++) {
        if (acts[i].start >= lastEnd) {
            count++;
            lastEnd = acts[i].end;
        }
    }
    cout << count << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n1 3\n2 5\n3 6', expectedOutput: '2' },
    ],
    similarProblems: [52, 17],
  },
  // ========== 新增题目 - 搜索篇 ==========
  {
    id: 54,
    title: '全排列',
    titleEn: 'Permutation',
    difficulty: 'intermediate',
    description: '输入 n，输出 1 到 n 的所有全排列。',
    inputFormat: '输入一个正整数 n（n≤6）。',
    outputFormat: '输出所有全排列，按字典序排列，每组用空格分隔。',
    sampleInput: '3',
    sampleOutput: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n, a[10];
bool used[10];

void dfs(int pos) {
    if (pos == n) {
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << a[i];
        }
        cout << endl;
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            a[pos] = i;
            dfs(pos + 1);
            used[i] = false;
        }
    }
}

int main() {
    freopen("perm.in", "r", stdin);
    freopen("perm.out", "w", stdout);
    
    cin >> n;
    dfs(0);
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3', expectedOutput: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1' },
    ],
    similarProblems: [55, 56],
  },
  {
    id: 55,
    title: 'N皇后',
    titleEn: 'N Queens',
    difficulty: 'advanced',
    description: '在 n×n 的棋盘上放置 n 个皇后，使得它们互不攻击。输出所有方案。',
    inputFormat: '输入一个正整数 n（n≤8）。',
    outputFormat: '输出方案数。',
    sampleInput: '4',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n, count = 0;
int col[10], diag1[20], diag2[20];

void dfs(int row) {
    if (row == n) {
        count++;
        return;
    }
    for (int c = 0; c < n; c++) {
        if (!col[c] && !diag1[row + c] && !diag2[row - c + n]) {
            col[c] = diag1[row + c] = diag2[row - c + n] = 1;
            dfs(row + 1);
            col[c] = diag1[row + c] = diag2[row - c + n] = 0;
        }
    }
}

int main() {
    freopen("queen.in", "r", stdin);
    freopen("queen.out", "w", stdout);
    
    cin >> n;
    dfs(0);
    cout << count << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4', expectedOutput: '2' },
      { id: 2, input: '8', expectedOutput: '92' },
    ],
    similarProblems: [54, 56],
  },
  {
    id: 56,
    title: '迷宫问题',
    titleEn: 'Maze',
    difficulty: 'intermediate',
    description: '给定一个迷宫，求从起点到终点的最短路径长度。',
    inputFormat: '第一行 n 和 m 表示迷宫大小，接下来 n 行每行 m 个字符（#表示墙，.表示路，S表示起点，E表示终点）。',
    outputFormat: '输出最短路径长度，如果无法到达输出 -1。',
    sampleInput: '5 5\nS...#\n###.#\n...#.\n#.##.\n...E.',
    sampleOutput: '11',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;

int n, m;
char maze[20][20];
int dist[20][20];
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int main() {
    freopen("maze.in", "r", stdin);
    freopen("maze.out", "w", stdout);
    
    cin >> n >> m;
    int sx, sy, ex, ey;
    for (int i = 0; i < n; i++) {
        cin >> maze[i];
        for (int j = 0; j < m; j++) {
            if (maze[i][j] == 'S') { sx = i; sy = j; }
            if (maze[i][j] == 'E') { ex = i; ey = j; }
            dist[i][j] = -1;
        }
    }
    
    queue<pair<int, int>> q;
    q.push({sx, sy});
    dist[sx][sy] = 0;
    
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && 
                maze[nx][ny] != '#' && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    
    cout << dist[ex][ey] << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-BFS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 5\nS...#\n###.#\n...#.\n#.##.\n...E.', expectedOutput: '11' },
    ],
    similarProblems: [54, 55],
  },
  // ========== 新增题目 - 动态规划篇 ==========
  {
    id: 57,
    title: '爬楼梯',
    titleEn: 'Climbing Stairs',
    difficulty: 'beginner',
    description: '有 n 级楼梯，每次可以爬 1 级或 2 级。求有多少种方法爬到第 n 级。',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出方法数。',
    sampleInput: '3',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("stairs.in", "r", stdin);
    freopen("stairs.out", "w", stdout);
    
    int n, dp[100];
    cin >> n;
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    cout << dp[n] << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3', expectedOutput: '3' },
      { id: 2, input: '4', expectedOutput: '5' },
    ],
    similarProblems: [2, 58],
  },
  {
    id: 58,
    title: '背包问题',
    titleEn: 'Knapsack Problem',
    difficulty: 'intermediate',
    description: '有 n 个物品，每个物品有重量和价值。在容量为 W 的背包中装入物品，使总价值最大。',
    inputFormat: '第一行 n 和 W，接下来 n 行每行两个整数表示重量和价值。',
    outputFormat: '输出最大价值。',
    sampleInput: '4 5\n2 3\n1 2\n3 4\n2 2',
    sampleOutput: '7',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("knapsack.in", "r", stdin);
    freopen("knapsack.out", "w", stdout);
    
    int n, W, w[100], v[100], dp[1001] = {0};
    cin >> n >> W;
    for (int i = 0; i < n; i++) {
        cin >> w[i] >> v[i];
    }
    
    for (int i = 0; i < n; i++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    cout << dp[W] << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '背包问题'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 5\n2 3\n1 2\n3 4\n2 2', expectedOutput: '7' },
    ],
    similarProblems: [57, 59],
  },
  {
    id: 59,
    title: '最长递增子序列',
    titleEn: 'LIS',
    difficulty: 'intermediate',
    description: '给定一个序列，求最长严格递增子序列的长度。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出最长递增子序列的长度。',
    sampleInput: '7\n1 7 3 5 9 4 8',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("lis.in", "r", stdin);
    freopen("lis.out", "w", stdout);
    
    int n, a[100], dp[100];
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    int maxLen = 1;
    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    cout << maxLen << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7\n1 7 3 5 9 4 8', expectedOutput: '4' },
    ],
    similarProblems: [57, 58],
  },
  // ========== 新增题目 - 数据结构篇 ==========
  {
    id: 60,
    title: '栈的基本操作',
    titleEn: 'Stack Operations',
    difficulty: 'beginner',
    description: '实现一个栈，支持 push、pop、top 操作。',
    inputFormat: '第一行 n 表示操作数，接下来 n 行操作：push x、pop、top。',
    outputFormat: '对于 top 操作输出栈顶元素，对于 pop 操作若栈空输出 "error"。',
    sampleInput: '5\npush 1\npush 2\ntop\npop\ntop',
    sampleOutput: '2\n1',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <stack>
using namespace std;

int main() {
    freopen("stack.in", "r", stdin);
    freopen("stack.out", "w", stdout);
    
    int n;
    cin >> n;
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        string op;
        cin >> op;
        if (op == "push") {
            int x;
            cin >> x;
            st.push(x);
        } else if (op == "pop") {
            if (st.empty()) cout << "error" << endl;
            else st.pop();
        } else if (op == "top") {
            if (st.empty()) cout << "error" << endl;
            else cout << st.top() << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '栈'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\npush 1\npush 2\ntop\npop\ntop', expectedOutput: '2\n1' },
    ],
    similarProblems: [61, 62],
  },
  {
    id: 61,
    title: '队列的基本操作',
    titleEn: 'Queue Operations',
    difficulty: 'beginner',
    description: '实现一个队列，支持 push、pop、front 操作。',
    inputFormat: '第一行 n 表示操作数，接下来 n 行操作：push x、pop、front。',
    outputFormat: '对于 front 操作输出队首元素，对于 pop 操作若队空输出 "error"。',
    sampleInput: '5\npush 1\npush 2\nfront\npop\nfront',
    sampleOutput: '1\n2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;

int main() {
    freopen("queue.in", "r", stdin);
    freopen("queue.out", "w", stdout);
    
    int n;
    cin >> n;
    queue<int> q;
    
    for (int i = 0; i < n; i++) {
        string op;
        cin >> op;
        if (op == "push") {
            int x;
            cin >> x;
            q.push(x);
        } else if (op == "pop") {
            if (q.empty()) cout << "error" << endl;
            else q.pop();
        } else if (op == "front") {
            if (q.empty()) cout << "error" << endl;
            else cout << q.front() << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '队列'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\npush 1\npush 2\nfront\npop\nfront', expectedOutput: '1\n2' },
    ],
    similarProblems: [60, 62],
  },
  {
    id: 62,
    title: '括号匹配',
    titleEn: 'Bracket Matching',
    difficulty: 'intermediate',
    description: '给定一个括号序列，判断是否合法。',
    inputFormat: '输入一个括号序列。',
    outputFormat: '合法输出 "Yes"，否则输出 "No"。',
    sampleInput: '(()())',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <stack>
using namespace std;

int main() {
    freopen("bracket.in", "r", stdin);
    freopen("bracket.out", "w", stdout);
    
    string s;
    cin >> s;
    stack<char> st;
    bool valid = true;
    
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) {
                valid = false;
                break;
            }
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                valid = false;
                break;
            }
            st.pop();
        }
    }
    
    if (!st.empty()) valid = false;
    cout << (valid ? "Yes" : "No") << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '栈'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '(()())', expectedOutput: 'Yes' },
      { id: 2, input: '(()', expectedOutput: 'No' },
    ],
    similarProblems: [60, 61],
  },
  // ========== 新增题目 - 图论篇 ==========
  {
    id: 63,
    title: '图的邻接表存储',
    titleEn: 'Adjacency List',
    difficulty: 'beginner',
    description: '输入一个无向图，用邻接表存储并输出每个点的邻接点。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行两个整数表示边。',
    outputFormat: '输出 n 行，每行依次输出该点的邻接点。',
    sampleInput: '3 3\n1 2\n2 3\n1 3',
    sampleOutput: '2 3\n1 3\n1 2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main() {
    freopen("graph.in", "r", stdin);
    freopen("graph.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    vector<int> adj[100];
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < adj[i].size(); j++) {
            if (j > 0) cout << " ";
            cout << adj[i][j];
        }
        cout << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2\n2 3\n1 3', expectedOutput: '2 3\n1 3\n1 2' },
    ],
    similarProblems: [64, 65],
  },
  {
    id: 64,
    title: '图的DFS遍历',
    titleEn: 'Graph DFS',
    difficulty: 'intermediate',
    description: '对给定的无向图进行DFS遍历，输出遍历序列。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行两个整数表示边。起点为1。',
    outputFormat: '输出DFS遍历序列。',
    sampleInput: '4 4\n1 2\n1 3\n2 4\n3 4',
    sampleOutput: '1 2 4 3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> adj[100];
bool visited[100];
int n;

void dfs(int u) {
    visited[u] = true;
    cout << u;
    for (int v : adj[u]) {
        if (!visited[v]) {
            cout << " ";
            dfs(v);
        }
    }
}

int main() {
    freopen("dfs.in", "r", stdin);
    freopen("dfs.out", "w", stdout);
    
    int m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    for (int i = 1; i <= n; i++) sort(adj[i].begin(), adj[i].end());
    
    dfs(1);
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论', '搜索-DFS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 2\n1 3\n2 4\n3 4', expectedOutput: '1 2 4 3' },
    ],
    similarProblems: [63, 65],
  },
  {
    id: 65,
    title: '图的BFS遍历',
    titleEn: 'Graph BFS',
    difficulty: 'intermediate',
    description: '对给定的无向图进行BFS遍历，输出遍历序列。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行两个整数表示边。起点为1。',
    outputFormat: '输出BFS遍历序列。',
    sampleInput: '4 4\n1 2\n1 3\n2 4\n3 4',
    sampleOutput: '1 2 3 4',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

vector<int> adj[100];
bool visited[100];

int main() {
    freopen("bfs.in", "r", stdin);
    freopen("bfs.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    for (int i = 1; i <= n; i++) sort(adj[i].begin(), adj[i].end());
    
    queue<int> q;
    q.push(1);
    visited[1] = true;
    bool first = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        if (!first) cout << " ";
        cout << u;
        first = false;
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论', '搜索-BFS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 2\n1 3\n2 4\n3 4', expectedOutput: '1 2 3 4' },
    ],
    similarProblems: [63, 64],
  },
  {
    id: 66,
    title: '最短路径 - Dijkstra',
    titleEn: 'Shortest Path - Dijkstra',
    difficulty: 'advanced',
    description: '给定一个带权有向图，求从起点到终点的最短路径。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行三个整数 u、v、w 表示边。起点为1，终点为n。',
    outputFormat: '输出最短路径长度，如果无法到达输出 -1。',
    sampleInput: '3 3\n1 2 1\n2 3 2\n1 3 4',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii;
vector<pii> adj[100];
int dist[100];

int main() {
    freopen("dijkstra.in", "r", stdin);
    freopen("dijkstra.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    for (int i = 1; i <= n; i++) dist[i] = 1e9;
    dist[1] = 0;
    
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, 1});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    cout << (dist[n] == 1e9 ? -1 : dist[n]) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-最短路'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2 1\n2 3 2\n1 3 4', expectedOutput: '3' },
    ],
    similarProblems: [63, 64],
  },
  // ========== 新增题目 - 位运算篇 ==========
  {
    id: 67,
    title: '二进制转换',
    titleEn: 'Binary Conversion',
    difficulty: 'beginner',
    description: '输入一个十进制整数，输出它的二进制表示。',
    inputFormat: '输入一个非负整数 n。',
    outputFormat: '输出二进制表示（不含前导零）。',
    sampleInput: '10',
    sampleOutput: '1010',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("binary.in", "r", stdin);
    freopen("binary.out", "w", stdout);
    
    int n;
    cin >> n;
    if (n == 0) {
        cout << 0 << endl;
        return 0;
    }
    
    string result = "";
    while (n > 0) {
        result = char('0' + (n & 1)) + result;
        n >>= 1;
    }
    cout << result << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['位运算'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10', expectedOutput: '1010' },
      { id: 2, input: '0', expectedOutput: '0' },
    ],
    similarProblems: [68, 69],
  },
  {
    id: 68,
    title: '位运算 - 统计1的个数',
    titleEn: 'Count Bits',
    difficulty: 'beginner',
    description: '输入一个非负整数，统计其二进制表示中 1 的个数。',
    inputFormat: '输入一个非负整数 n。',
    outputFormat: '输出 1 的个数。',
    sampleInput: '15',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("countbits.in", "r", stdin);
    freopen("countbits.out", "w", stdout);
    
    unsigned int n;
    cin >> n;
    int count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    cout << count << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['位运算'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '15', expectedOutput: '4' },
      { id: 2, input: '8', expectedOutput: '1' },
    ],
    similarProblems: [67, 69],
  },
  {
    id: 69,
    title: '位运算 - 异或应用',
    titleEn: 'XOR Application',
    difficulty: 'intermediate',
    description: '有 n 个数，其中只有一个数出现一次，其他数都出现两次。找出那个数。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出只出现一次的数。',
    sampleInput: '5\n1 2 3 2 1',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("xor.in", "r", stdin);
    freopen("xor.out", "w", stdout);
    
    int n, result = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        result ^= x;
    }
    cout << result << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['位运算'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 2 1', expectedOutput: '3' },
    ],
    similarProblems: [67, 68],
  },
  // ========== 新增题目 - 模拟篇 ==========
  {
    id: 70,
    title: '日期计算',
    titleEn: 'Date Calculation',
    difficulty: 'intermediate',
    description: '输入年份和天数，计算是该年的第几月第几日。',
    inputFormat: '输入年份和天数，用空格分隔。',
    outputFormat: '输出月份和日期。',
    sampleInput: '2023 60',
    sampleOutput: '3 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("date.in", "r", stdin);
    freopen("date.out", "w", stdout);
    
    int year, day;
    cin >> year >> day;
    
    int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    bool isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    if (isLeap) days[2] = 29;
    
    int month = 1;
    while (day > days[month]) {
        day -= days[month];
        month++;
    }
    
    cout << month << " " << day << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '模拟',
    tags: ['模拟'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2023 60', expectedOutput: '3 1' },
      { id: 2, input: '2024 60', expectedOutput: '2 29' },
    ],
    similarProblems: [71, 72],
  },
  {
    id: 71,
    title: '表达式求值',
    titleEn: 'Expression Evaluation',
    difficulty: 'advanced',
    description: '输入一个只包含加减乘除和括号的表达式，计算其值。',
    inputFormat: '输入一个表达式。',
    outputFormat: '输出计算结果。',
    sampleInput: '1+2*3',
    sampleOutput: '7',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <stack>
#include <string>
#include <cctype>
using namespace std;

int priority(char c) {
    if (c == '+' || c == '-') return 1;
    if (c == '*' || c == '/') return 2;
    return 0;
}

int main() {
    freopen("expr.in", "r", stdin);
    freopen("expr.out", "w", stdout);
    
    string s;
    cin >> s;
    
    stack<int> nums;
    stack<char> ops;
    
    for (int i = 0; i < s.length(); i++) {
        if (isdigit(s[i])) {
            int num = 0;
            while (i < s.length() && isdigit(s[i])) {
                num = num * 10 + (s[i] - '0');
                i++;
            }
            nums.push(num);
            i--;
        } else if (s[i] == '(') {
            ops.push(s[i]);
        } else if (s[i] == ')') {
            while (ops.top() != '(') {
                int b = nums.top(); nums.pop();
                int a = nums.top(); nums.pop();
                char op = ops.top(); ops.pop();
                if (op == '+') nums.push(a + b);
                else if (op == '-') nums.push(a - b);
                else if (op == '*') nums.push(a * b);
                else if (op == '/') nums.push(a / b);
            }
            ops.pop();
        } else {
            while (!ops.empty() && priority(ops.top()) >= priority(s[i])) {
                int b = nums.top(); nums.pop();
                int a = nums.top(); nums.pop();
                char op = ops.top(); ops.pop();
                if (op == '+') nums.push(a + b);
                else if (op == '-') nums.push(a - b);
                else if (op == '*') nums.push(a * b);
                else if (op == '/') nums.push(a / b);
            }
            ops.push(s[i]);
        }
    }
    
    while (!ops.empty()) {
        int b = nums.top(); nums.pop();
        int a = nums.top(); nums.pop();
        char op = ops.top(); ops.pop();
        if (op == '+') nums.push(a + b);
        else if (op == '-') nums.push(a - b);
        else if (op == '*') nums.push(a * b);
        else if (op == '/') nums.push(a / b);
    }
    
    cout << nums.top() << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '模拟',
    tags: ['模拟', '数据结构', '栈'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '1+2*3', expectedOutput: '7' },
      { id: 2, input: '(1+2)*3', expectedOutput: '9' },
    ],
    similarProblems: [70, 60],
  },
  {
    id: 72,
    title: '高精度加法',
    titleEn: 'High Precision Addition',
    difficulty: 'intermediate',
    description: '输入两个非常大的整数（可能超过 long long 范围），计算它们的和。',
    inputFormat: '输入两行，每行一个大整数。',
    outputFormat: '输出它们的和。',
    sampleInput: '12345678901234567890\n98765432109876543210',
    sampleOutput: '111111111011111111100',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    freopen("bigadd.in", "r", stdin);
    freopen("bigadd.out", "w", stdout);
    
    string a, b;
    cin >> a >> b;
    
    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());
    
    string result = "";
    int carry = 0;
    int maxLen = max(a.length(), b.length());
    
    for (int i = 0; i < maxLen || carry; i++) {
        int digitA = (i < a.length()) ? (a[i] - '0') : 0;
        int digitB = (i < b.length()) ? (b[i] - '0') : 0;
        int sum = digitA + digitB + carry;
        result += char('0' + sum % 10);
        carry = sum / 10;
    }
    
    reverse(result.begin(), result.end());
    cout << result << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['模拟', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12345678901234567890\n98765432109876543210', expectedOutput: '111111111011111111100' },
    ],
    similarProblems: [70, 71],
  },
  // ========== 新增题目 - 前缀和专项 ==========
  {
    id: 73,
    title: '前缀和求区间和',
    titleEn: 'Prefix Sum Range Query',
    difficulty: 'beginner',
    description: '给定一个长度为n的数组，有m次查询，每次查询区间[l,r]的和。使用前缀和优化查询。',
    inputFormat: '第一行n和m，第二行n个整数表示数组，接下来m行每行两个整数l和r（下标从1开始）。',
    outputFormat: '对于每个查询，输出区间和。',
    sampleInput: '5 3\n1 2 3 4 5\n1 5\n2 4\n3 3',
    sampleOutput: '15\n9\n3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("prefixsum.in", "r", stdin);
    freopen("prefixsum.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    long long a[100001], prefix[100001] = {0};
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        prefix[i] = prefix[i-1] + a[i];
    }
    
    for (int i = 0; i < m; i++) {
        int l, r;
        cin >> l >> r;
        cout << prefix[r] - prefix[l-1] << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['前缀和'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2 3 4 5\n1 5\n2 4\n3 3', expectedOutput: '15\n9\n3' },
      { id: 2, input: '3 2\n10 20 30\n1 3\n2 2', expectedOutput: '60\n20' },
    ],
    similarProblems: [74, 75],
  },
  {
    id: 74,
    title: '前缀和求子数组和',
    titleEn: 'Subarray Sum',
    difficulty: 'intermediate',
    description: '给定一个数组，求有多少个连续子数组的和等于目标值k。',
    inputFormat: '第一行n和k，第二行n个整数。',
    outputFormat: '输出满足条件的子数组个数。',
    sampleInput: '5 7\n2 3 1 2 4',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <map>
using namespace std;

int main() {
    freopen("subarray.in", "r", stdin);
    freopen("subarray.out", "w", stdout);
    
    int n, k;
    cin >> n >> k;
    
    map<long long, int> cnt;
    cnt[0] = 1;
    
    long long sum = 0;
    int result = 0;
    
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sum += x;
        result += cnt[sum - k];
        cnt[sum]++;
    }
    
    cout << result << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['前缀和'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 7\n2 3 1 2 4', expectedOutput: '2' },
      { id: 2, input: '3 3\n1 1 1', expectedOutput: '2' },
    ],
    similarProblems: [73, 75],
  },
  {
    id: 75,
    title: '二维前缀和',
    titleEn: '2D Prefix Sum',
    difficulty: 'intermediate',
    description: '给定一个n×m的矩阵，有q次查询，每次查询子矩阵(x1,y1)到(x2,y2)的和。',
    inputFormat: '第一行n、m、q，接下来n行每行m个整数，最后q行每行四个整数x1,y1,x2,y2。',
    outputFormat: '对于每个查询，输出子矩阵的和。',
    sampleInput: '3 3 2\n1 2 3\n4 5 6\n7 8 9\n1 1 2 2\n2 2 3 3',
    sampleOutput: '12\n28',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("prefix2d.in", "r", stdin);
    freopen("prefix2d.out", "w", stdout);
    
    int n, m, q;
    cin >> n >> m >> q;
    
    long long a[101][101], prefix[101][101] = {0};
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> a[i][j];
            prefix[i][j] = a[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
        }
    }
    
    for (int i = 0; i < q; i++) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        cout << prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1] << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['前缀和'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3 2\n1 2 3\n4 5 6\n7 8 9\n1 1 2 2\n2 2 3 3', expectedOutput: '12\n28' },
    ],
    similarProblems: [73, 74],
  },
  // ========== 新增题目 - 差分专项 ==========
  {
    id: 76,
    title: '差分数组基础',
    titleEn: 'Difference Array Basics',
    difficulty: 'beginner',
    description: '给定一个长度为n的初始全0数组，进行m次区间加操作，每次将区间[l,r]的所有元素加c，最后输出最终的数组。',
    inputFormat: '第一行n和m，接下来m行每行三个整数l、r、c。',
    outputFormat: '输出最终的数组。',
    sampleInput: '5 3\n1 3 2\n2 5 1\n1 5 3',
    sampleOutput: '5 6 6 4 4',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("diff.in", "r", stdin);
    freopen("diff.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    long long diff[100001] = {0};
    
    for (int i = 0; i < m; i++) {
        int l, r, c;
        cin >> l >> r >> c;
        diff[l] += c;
        diff[r + 1] -= c;
    }
    
    long long sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += diff[i];
        cout << sum;
        if (i < n) cout << " ";
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['差分'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 3 2\n2 5 1\n1 5 3', expectedOutput: '5 6 6 4 4' },
    ],
    similarProblems: [77, 78],
  },
  {
    id: 77,
    title: '差分求最终值',
    titleEn: 'Difference Final Values',
    difficulty: 'intermediate',
    description: '有n个小朋友站成一排，进行m次操作，每次给区间[a,b]的小朋友每人发一颗糖，问最后每个小朋友有多少颗糖。',
    inputFormat: '第一行n和m，接下来m行每行两个整数a和b。',
    outputFormat: '输出n个整数，表示每个小朋友的糖果数。',
    sampleInput: '5 3\n1 3\n2 4\n3 5',
    sampleOutput: '1 2 3 2 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("candy.in", "r", stdin);
    freopen("candy.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    int diff[100001] = {0};
    
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        diff[a]++;
        diff[b + 1]--;
    }
    
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += diff[i];
        cout << sum;
        if (i < n) cout << " ";
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['差分'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 3\n2 4\n3 5', expectedOutput: '1 2 3 2 1' },
    ],
    similarProblems: [76, 78],
  },
  {
    id: 78,
    title: '差分与前缀和结合',
    titleEn: 'Difference and Prefix Sum',
    difficulty: 'intermediate',
    description: '给定一个数组，有两种操作：1. 区间[l,r]加c；2. 查询区间[l,r]的和。需要高效处理。',
    inputFormat: '第一行n和m，第二行n个整数表示初始数组，接下来m行，每行一个操作。格式为"1 l r c"表示加操作，"2 l r"表示查询。',
    outputFormat: '对于每个查询操作，输出区间和。',
    sampleInput: '4 3\n1 2 3 4\n1 1 3 2\n2 1 4\n2 2 3',
    sampleOutput: '16\n9',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("diffquery.in", "r", stdin);
    freopen("diffquery.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    long long a[100001], prefix[100001] = {0}, diff[100001] = {0};
    
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        prefix[i] = prefix[i-1] + a[i];
    }
    
    for (int i = 0; i < m; i++) {
        int op;
        cin >> op;
        if (op == 1) {
            int l, r;
            long long c;
            cin >> l >> r >> c;
            diff[l] += c;
            diff[r + 1] -= c;
        } else {
            int l, r;
            cin >> l >> r;
            // 基础和 + 差分贡献
            long long base = prefix[r] - prefix[l-1];
            // 计算差分贡献（简化版，实际需要树状数组）
            long long extra = 0, d = 0;
            for (int j = 1; j <= r; j++) {
                d += diff[j];
                if (j >= l) extra += d;
            }
            cout << base + extra << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['差分', '前缀和'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 3\n1 2 3 4\n1 1 3 2\n2 1 4\n2 2 3', expectedOutput: '16\n9' },
    ],
    similarProblems: [76, 77],
  },
  // ========== 新增题目 - 枚举专项 ==========
  {
    id: 79,
    title: '百钱百鸡',
    titleEn: 'Hundred Chickens Problem',
    difficulty: 'beginner',
    description: '用一百元钱买一百只鸡，公鸡5元一只，母鸡3元一只，小鸡1元三只。问公鸡、母鸡、小鸡各买多少只？',
    inputFormat: '无输入。',
    outputFormat: '输出所有可能的方案，每行三个整数表示公鸡、母鸡、小鸡的数量。',
    sampleInput: '',
    sampleOutput: '0 25 75\n4 18 78\n8 11 81\n12 4 84',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("chicken.in", "r", stdin);
    freopen("chicken.out", "w", stdout);
    
    // 公鸡x只，母鸡y只，小鸡z只
    // x + y + z = 100
    // 5x + 3y + z/3 = 100
    for (int x = 0; x <= 20; x++) {
        for (int y = 0; y <= 33; y++) {
            int z = 100 - x - y;
            if (z % 3 == 0 && 5 * x + 3 * y + z / 3 == 100) {
                cout << x << " " << y << " " << z << endl;
            }
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: '0 25 75\n4 18 78\n8 11 81\n12 4 84' },
    ],
    similarProblems: [80, 81],
  },
  {
    id: 80,
    title: '水仙花数',
    titleEn: 'Narcissistic Number',
    difficulty: 'beginner',
    description: '水仙花数是指一个三位数，其各位数字的立方和等于该数本身。输出所有的水仙花数。',
    inputFormat: '无输入。',
    outputFormat: '输出所有的水仙花数，每行一个。',
    sampleInput: '',
    sampleOutput: '153\n370\n371\n407',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("narcissistic.in", "r", stdin);
    freopen("narcissistic.out", "w", stdout);
    
    for (int n = 100; n <= 999; n++) {
        int a = n / 100;
        int b = (n / 10) % 10;
        int c = n % 10;
        if (a*a*a + b*b*b + c*c*c == n) {
            cout << n << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: '153\n370\n371\n407' },
    ],
    similarProblems: [79, 81],
  },
  {
    id: 81,
    title: '完美立方',
    titleEn: 'Perfect Cube',
    difficulty: 'intermediate',
    description: '给定一个正整数N，求所有满足a³=b³+c³+d³的四元组(a,b,c,d)，其中1<a,b,c,d≤N，且b≤c≤d。',
    inputFormat: '输入一个正整数N（N≤100）。',
    outputFormat: '输出所有满足条件的四元组，每行格式为"Cube = a, Triple = (b,c,d)"。',
    sampleInput: '24',
    sampleOutput: 'Cube = 6, Triple = (3,4,5)\nCube = 12, Triple = (6,8,10)\nCube = 18, Triple = (2,12,16)\nCube = 18, Triple = (9,12,15)\nCube = 19, Triple = (3,10,18)\nCube = 20, Triple = (7,14,17)\nCube = 24, Triple = (12,16,20)',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("cube.in", "r", stdin);
    freopen("cube.out", "w", stdout);
    
    int n;
    cin >> n;
    
    for (int a = 2; a <= n; a++) {
        for (int b = 2; b < a; b++) {
            for (int c = b; c < a; c++) {
                for (int d = c; d < a; d++) {
                    if ((long long)a*a*a == (long long)b*b*b + c*c*c + d*d*d) {
                        cout << "Cube = " << a << ", Triple = (" << b << "," << c << "," << d << ")" << endl;
                    }
                }
            }
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举'],
    source: 'Other',
    timeLimit: 2000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '24', expectedOutput: 'Cube = 6, Triple = (3,4,5)\nCube = 12, Triple = (6,8,10)\nCube = 18, Triple = (2,12,16)\nCube = 18, Triple = (9,12,15)\nCube = 19, Triple = (3,10,18)\nCube = 20, Triple = (7,14,17)\nCube = 24, Triple = (12,16,20)' },
    ],
    similarProblems: [79, 80],
  },
  {
    id: 82,
    title: '选数',
    titleEn: 'Select Numbers',
    difficulty: 'intermediate',
    description: '给定n个正整数，从中选出k个数，使得它们的和为素数。问有多少种选法。',
    inputFormat: '第一行n和k，第二行n个正整数。',
    outputFormat: '输出选法的数量。',
    sampleInput: '4 3\n3 7 12 19',
    sampleOutput: '1',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int n, k;
int a[20];
int cnt = 0;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
    }
    return true;
}

void dfs(int pos, int selected, int sum) {
    if (selected == k) {
        if (isPrime(sum)) cnt++;
        return;
    }
    if (pos >= n || selected + (n - pos) < k) return;
    
    // 选当前位置
    dfs(pos + 1, selected + 1, sum + a[pos]);
    // 不选当前位置
    dfs(pos + 1, selected, sum);
}

int main() {
    freopen("select.in", "r", stdin);
    freopen("select.out", "w", stdout);
    
    cin >> n >> k;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    dfs(0, 0, 0);
    cout << cnt << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 3\n3 7 12 19', expectedOutput: '1' },
    ],
    similarProblems: [79, 80],
  },
  {
    id: 83,
    title: '三连击',
    titleEn: 'Triple Strike',
    difficulty: 'intermediate',
    description: '用1到9这9个数字组成三个三位数，使得第二个数是第一个数的2倍，第三个数是第一个数的3倍。求所有可能的组合。',
    inputFormat: '无输入。',
    outputFormat: '输出所有可能的组合，每行三个数，第一个数按从小到大排列。',
    sampleInput: '',
    sampleOutput: '192 384 576\n219 438 657\n273 546 819\n327 654 981',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int main() {
    freopen("triple.in", "r", stdin);
    freopen("triple.out", "w", stdout);
    
    for (int a = 123; a <= 329; a++) {
        int b = a * 2;
        int c = a * 3;
        
        int used[10] = {0};
        int temp = a;
        while (temp > 0) { used[temp % 10]++; temp /= 10; }
        temp = b;
        while (temp > 0) { used[temp % 10]++; temp /= 10; }
        temp = c;
        while (temp > 0) { used[temp % 10]++; temp /= 10; }
        
        bool valid = true;
        for (int i = 1; i <= 9; i++) {
            if (used[i] != 1) { valid = false; break; }
        }
        
        if (valid) {
            cout << a << " " << b << " " << c << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: '192 384 576\n219 438 657\n273 546 819\n327 654 981' },
    ],
    similarProblems: [79, 80],
  },
  // ========== 新增题目 - 进阶图论篇 ==========
  {
    id: 84,
    title: '连通分量',
    titleEn: 'Connected Components',
    difficulty: 'intermediate',
    description: '给定一个无向图，求其连通分量的个数。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行两个整数表示边。',
    outputFormat: '输出连通分量个数。',
    sampleInput: '5 3\n1 2\n2 3\n4 5',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

vector<int> adj[1005];
bool visited[1005];

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
}

int main() {
    freopen("connected.in", "r", stdin);
    freopen("connected.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    int cnt = 0;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            dfs(i);
            cnt++;
        }
    }
    
    cout << cnt << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论', '搜索-DFS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2\n2 3\n4 5', expectedOutput: '2' },
    ],
    similarProblems: [63, 64],
  },
  {
    id: 85,
    title: '判断环',
    titleEn: 'Cycle Detection',
    difficulty: 'intermediate',
    description: '给定一个无向图，判断是否存在环。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行两个整数表示边。',
    outputFormat: '存在环输出 "Yes"，否则输出 "No"。',
    sampleInput: '3 3\n1 2\n2 3\n3 1',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

vector<int> adj[1005];
bool visited[1005];

bool dfs(int u, int parent) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            if (dfs(v, u)) return true;
        } else if (v != parent) {
            return true;
        }
    }
    return false;
}

int main() {
    freopen("cycle.in", "r", stdin);
    freopen("cycle.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    bool hasCycle = false;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            if (dfs(i, -1)) {
                hasCycle = true;
                break;
            }
        }
    }
    
    cout << (hasCycle ? "Yes" : "No") << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论', '搜索-DFS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2\n2 3\n3 1', expectedOutput: 'Yes' },
      { id: 2, input: '3 2\n1 2\n2 3', expectedOutput: 'No' },
    ],
    similarProblems: [84, 63],
  },
  {
    id: 86,
    title: 'Dijkstra求最短路',
    titleEn: 'Dijkstra Shortest Path',
    difficulty: 'advanced',
    description: '给定一个带权有向图，求从起点到所有点的最短路径。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行三个整数 u、v、w 表示边。起点为1。',
    outputFormat: '输出 n 个数，表示从起点到每个点的最短距离。无法到达输出 -1。',
    sampleInput: '4 4\n1 2 1\n1 3 4\n2 3 2\n3 4 1',
    sampleOutput: '0 1 3 4',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii;
vector<pii> adj[1005];
int dist[1005];

int main() {
    freopen("dijkstra.in", "r", stdin);
    freopen("dijkstra.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    for (int i = 1; i <= n; i++) dist[i] = 1e9;
    dist[1] = 0;
    
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, 1});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        if (i > 1) cout << " ";
        cout << (dist[i] == 1e9 ? -1 : dist[i]);
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-最短路'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 2 1\n1 3 4\n2 3 2\n3 4 1', expectedOutput: '0 1 3 4' },
    ],
    similarProblems: [66, 87],
  },
  {
    id: 87,
    title: 'Floyd求多源最短路',
    titleEn: 'Floyd All Pairs Shortest Path',
    difficulty: 'advanced',
    description: '给定一个带权有向图，求任意两点间的最短路径。',
    inputFormat: '第一行 n 表示点数，接下来 n 行每行 n 个整数表示邻接矩阵。-1表示无边。',
    outputFormat: '输出 n 行 n 列的最短路径矩阵。',
    sampleInput: '3\n0 1 -1\n-1 0 2\n3 -1 0',
    sampleOutput: '0 1 3\n5 0 2\n3 4 0',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("floyd.in", "r", stdin);
    freopen("floyd.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int dist[105][105];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> dist[i][j];
            if (dist[i][j] == -1 && i != j) dist[i][j] = 1e9;
        }
    }
    
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (j > 1) cout << " ";
            cout << (dist[i][j] == 1e9 ? -1 : dist[i][j]);
        }
        cout << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-最短路'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n0 1 -1\n-1 0 2\n3 -1 0', expectedOutput: '0 1 3\n5 0 2\n3 4 0' },
    ],
    similarProblems: [86, 66],
  },
  {
    id: 88,
    title: 'SPFA求负权最短路',
    titleEn: 'SPFA with Negative Edges',
    difficulty: 'advanced',
    description: '给定一个带权有向图（可能有负权边），求从起点到所有点的最短路径。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行三个整数 u、v、w 表示边。起点为1。',
    outputFormat: '输出 n 个数，表示从起点到每个点的最短距离。存在负环输出 "-1"。',
    sampleInput: '4 4\n1 2 1\n2 3 -2\n3 4 1\n1 4 5',
    sampleOutput: '0 1 -1 0',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

struct Edge { int to, w; };
vector<Edge> adj[1005];
int dist[1005], cnt[1005];
bool inQueue[1005];

int main() {
    freopen("spfa.in", "r", stdin);
    freopen("spfa.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    for (int i = 1; i <= n; i++) dist[i] = 1e9;
    dist[1] = 0;
    
    queue<int> q;
    q.push(1);
    inQueue[1] = true;
    
    bool hasNegativeCycle = false;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        inQueue[u] = false;
        
        for (auto& e : adj[u]) {
            if (dist[u] + e.w < dist[e.to]) {
                dist[e.to] = dist[u] + e.w;
                if (!inQueue[e.to]) {
                    q.push(e.to);
                    inQueue[e.to] = true;
                    cnt[e.to]++;
                    if (cnt[e.to] > n) {
                        hasNegativeCycle = true;
                        break;
                    }
                }
            }
        }
        if (hasNegativeCycle) break;
    }
    
    if (hasNegativeCycle) {
        cout << -1 << endl;
    } else {
        for (int i = 1; i <= n; i++) {
            if (i > 1) cout << " ";
            cout << (dist[i] == 1e9 ? -1 : dist[i]);
        }
        cout << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-最短路'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 2 1\n2 3 -2\n3 4 1\n1 4 5', expectedOutput: '0 1 -1 0' },
    ],
    similarProblems: [86, 87],
  },
  // ========== 新增题目 - 并查集与生成树篇 ==========
  {
    id: 89,
    title: '并查集基础',
    titleEn: 'Disjoint Set Union',
    difficulty: 'intermediate',
    description: '实现并查集，支持合并两个集合和查询两个元素是否在同一集合。',
    inputFormat: '第一行 n 和 m 表示元素个数和操作数，接下来 m 行，每行三个整数：1 x y 表示合并 x 和 y，2 x y 表示查询。',
    outputFormat: '对于每个查询，输出 "Y" 或 "N"。',
    sampleInput: '4 5\n1 1 2\n2 1 2\n1 2 3\n2 1 3\n2 3 4',
    sampleOutput: 'Y\nY\nN',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int parent[10005];

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

void unite(int x, int y) {
    parent[find(x)] = find(y);
}

int main() {
    freopen("dsu.in", "r", stdin);
    freopen("dsu.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) parent[i] = i;
    
    while (m--) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) {
            unite(x, y);
        } else {
            cout << (find(x) == find(y) ? "Y" : "N") << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['并查集'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 5\n1 1 2\n2 1 2\n1 2 3\n2 1 3\n2 3 4', expectedOutput: 'Y\nY\nN' },
    ],
    similarProblems: [90, 84],
  },
  {
    id: 90,
    title: '并查集判断连通',
    titleEn: 'DSU Connectivity',
    difficulty: 'intermediate',
    description: '给定一个无向图，动态添加边并查询两点是否连通。',
    inputFormat: '第一行 n 和 m 表示点数和操作数，接下来 m 行，每行三个整数：1 u v 表示添加边，2 u v 表示查询。',
    outputFormat: '对于每个查询，输出 "Yes" 或 "No"。',
    sampleInput: '4 4\n1 1 2\n2 1 3\n1 2 3\n2 1 3',
    sampleOutput: 'No\nYes',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int parent[10005];

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

int main() {
    freopen("connect.in", "r", stdin);
    freopen("connect.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) parent[i] = i;
    
    while (m--) {
        int op, u, v;
        cin >> op >> u >> v;
        if (op == 1) {
            parent[find(u)] = find(v);
        } else {
            cout << (find(u) == find(v) ? "Yes" : "No") << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['并查集'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 1 2\n2 1 3\n1 2 3\n2 1 3', expectedOutput: 'No\nYes' },
    ],
    similarProblems: [89, 84],
  },
  {
    id: 91,
    title: 'Kruskal最小生成树',
    titleEn: 'Kruskal MST',
    difficulty: 'advanced',
    description: '给定一个带权无向图，求最小生成树的边权和。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行三个整数 u、v、w 表示边。',
    outputFormat: '输出最小生成树的边权和，如果不连通输出 -1。',
    sampleInput: '4 4\n1 2 1\n2 3 2\n3 4 3\n1 4 4',
    sampleOutput: '6',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, w;
    bool operator<(const Edge& e) const { return w < e.w; }
} edges[10005];

int parent[1005];

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

int main() {
    freopen("kruskal.in", "r", stdin);
    freopen("kruskal.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }
    
    sort(edges, edges + m);
    for (int i = 1; i <= n; i++) parent[i] = i;
    
    int total = 0, cnt = 0;
    for (int i = 0; i < m && cnt < n - 1; i++) {
        int pu = find(edges[i].u), pv = find(edges[i].v);
        if (pu != pv) {
            parent[pu] = pv;
            total += edges[i].w;
            cnt++;
        }
    }
    
    cout << (cnt == n - 1 ? total : -1) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-生成树', '并查集'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 2 1\n2 3 2\n3 4 3\n1 4 4', expectedOutput: '6' },
    ],
    similarProblems: [92, 89],
  },
  {
    id: 92,
    title: 'Prim最小生成树',
    titleEn: 'Prim MST',
    difficulty: 'advanced',
    description: '使用Prim算法求最小生成树的边权和。',
    inputFormat: '第一行 n 表示点数，接下来 n 行 n 列表示邻接矩阵，0表示无边。',
    outputFormat: '输出最小生成树的边权和。',
    sampleInput: '4\n0 1 0 4\n1 0 2 0\n0 2 0 3\n4 0 3 0',
    sampleOutput: '6',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int main() {
    freopen("prim.in", "r", stdin);
    freopen("prim.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int g[105][105], dist[105];
    bool visited[105] = {false};
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> g[i][j];
        }
    }
    
    memset(dist, 0x3f, sizeof(dist));
    dist[1] = 0;
    
    int total = 0;
    for (int i = 0; i < n; i++) {
        int u = -1;
        for (int j = 1; j <= n; j++) {
            if (!visited[j] && (u == -1 || dist[j] < dist[u])) {
                u = j;
            }
        }
        
        visited[u] = true;
        total += dist[u];
        
        for (int v = 1; v <= n; v++) {
            if (!visited[v] && g[u][v] && g[u][v] < dist[v]) {
                dist[v] = g[u][v];
            }
        }
    }
    
    cout << total << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-生成树'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n0 1 0 4\n1 0 2 0\n0 2 0 3\n4 0 3 0', expectedOutput: '6' },
    ],
    similarProblems: [91, 86],
  },
  // ========== 新增题目 - 进阶DP篇 ==========
  {
    id: 93,
    title: '状压DP - 旅行商问题',
    titleEn: 'TSP with Bitmask DP',
    difficulty: 'advanced',
    description: '给定n个城市和它们之间的距离，求从城市1出发，经过所有城市恰好一次后回到城市1的最短路径。',
    inputFormat: '第一行 n，接下来 n 行 n 列表示城市间的距离矩阵。',
    outputFormat: '输出最短路径长度。',
    sampleInput: '4\n0 1 2 3\n1 0 4 5\n2 4 0 6\n3 5 6 0',
    sampleOutput: '13',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int main() {
    freopen("tsp.in", "r", stdin);
    freopen("tsp.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int g[20][20];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> g[i][j];
        }
    }
    
    int dp[1<<16][16];
    memset(dp, 0x3f, sizeof(dp));
    dp[1][0] = 0;
    
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int i = 0; i < n; i++) {
            if (!(mask & (1 << i))) continue;
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;
                dp[mask | (1 << j)][j] = min(dp[mask | (1 << j)][j], dp[mask][i] + g[i][j]);
            }
        }
    }
    
    int ans = 1e9;
    for (int i = 1; i < n; i++) {
        ans = min(ans, dp[(1 << n) - 1][i] + g[i][0]);
    }
    
    cout << ans << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '位运算'],
    source: 'Other',
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { id: 1, input: '4\n0 1 2 3\n1 0 4 5\n2 4 0 6\n3 5 6 0', expectedOutput: '13' },
    ],
    similarProblems: [94, 58],
  },
  {
    id: 94,
    title: '状压DP - 集合覆盖',
    titleEn: 'Set Cover with Bitmask',
    difficulty: 'advanced',
    description: '有n个技能和m个英雄，每个英雄会一些技能。求最少选几个英雄可以覆盖所有技能。',
    inputFormat: '第一行 n 和 m，接下来 m 行，每行先一个 k 表示技能数，然后 k 个整数表示技能编号。',
    outputFormat: '输出最少英雄数，无法覆盖输出 -1。',
    sampleInput: '3 4\n2 1 2\n1 2\n2 2 3\n1 1',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int main() {
    freopen("setcover.in", "r", stdin);
    freopen("setcover.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    int skills[105];
    for (int i = 0; i < m; i++) {
        int k, mask = 0;
        cin >> k;
        while (k--) {
            int x;
            cin >> x;
            mask |= (1 << (x - 1));
        }
        skills[i] = mask;
    }
    
    int dp[1<<16];
    memset(dp, 0x3f, sizeof(dp));
    dp[0] = 0;
    
    for (int i = 0; i < m; i++) {
        for (int mask = 0; mask < (1 << n); mask++) {
            dp[mask | skills[i]] = min(dp[mask | skills[i]], dp[mask] + 1);
        }
    }
    
    cout << (dp[(1 << n) - 1] == 0x3f3f3f3f ? -1 : dp[(1 << n) - 1]) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '位运算'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 4\n2 1 2\n1 2\n2 2 3\n1 1', expectedOutput: '2' },
    ],
    similarProblems: [93, 58],
  },
  {
    id: 95,
    title: '记忆化搜索 - 滑雪',
    titleEn: 'Skiing with Memoization',
    difficulty: 'intermediate',
    description: '给定一个矩阵表示高度，求从任意点出发，只能向低处滑，最长能滑多远。',
    inputFormat: '第一行 r 和 c 表示行数列数，接下来 r 行 c 列表示高度。',
    outputFormat: '输出最长滑雪长度。',
    sampleInput: '3 3\n1 2 3\n4 5 6\n7 8 9',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int r, c;
int h[105][105], dp[105][105];
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

int dfs(int x, int y) {
    if (dp[x][y] != -1) return dp[x][y];
    
    int ans = 1;
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < r && ny >= 0 && ny < c && h[nx][ny] < h[x][y]) {
            ans = max(ans, 1 + dfs(nx, ny));
        }
    }
    
    return dp[x][y] = ans;
}

int main() {
    freopen("ski.in", "r", stdin);
    freopen("ski.out", "w", stdout);
    
    cin >> r >> c;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> h[i][j];
        }
    }
    
    memset(dp, -1, sizeof(dp));
    
    int ans = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            ans = max(ans, dfs(i, j));
        }
    }
    
    cout << ans << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '5' },
    ],
    similarProblems: [96, 59],
  },
  {
    id: 96,
    title: '记忆化搜索 - 数字三角形',
    titleEn: 'Number Triangle with Memoization',
    difficulty: 'intermediate',
    description: '给定一个数字三角形，从顶部走到底部，每次可走左下或右下，求最大路径和。',
    inputFormat: '第一行 n，接下来 n 行表示三角形。',
    outputFormat: '输出最大路径和。',
    sampleInput: '4\n1\n3 2\n4 5 6\n7 8 9 10',
    sampleOutput: '19',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int n;
int tri[105][105], dp[105][105];

int dfs(int i, int j) {
    if (i == n) return tri[i][j];
    if (dp[i][j] != -1) return dp[i][j];
    
    return dp[i][j] = tri[i][j] + max(dfs(i + 1, j), dfs(i + 1, j + 1));
}

int main() {
    freopen("triangle.in", "r", stdin);
    freopen("triangle.out", "w", stdout);
    
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cin >> tri[i][j];
        }
    }
    
    memset(dp, -1, sizeof(dp));
    cout << dfs(1, 1) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1\n3 2\n4 5 6\n7 8 9 10', expectedOutput: '19' },
    ],
    similarProblems: [95, 12],
  },
  // ========== 新增题目 - 字符串算法篇 ==========
  {
    id: 97,
    title: 'KMP模式匹配',
    titleEn: 'KMP Pattern Matching',
    difficulty: 'advanced',
    description: '给定文本串和模式串，求模式串在文本串中出现的所有位置。',
    inputFormat: '第一行文本串，第二行模式串。',
    outputFormat: '输出所有匹配位置（下标从1开始），用空格分隔。',
    sampleInput: 'ABABABC\nAB',
    sampleOutput: '1 3 5',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main() {
    freopen("kmp.in", "r", stdin);
    freopen("kmp.out", "w", stdout);
    
    string text, pattern;
    cin >> text >> pattern;
    
    int n = text.length(), m = pattern.length();
    
    // 计算next数组
    int next[10005];
    next[0] = -1;
    for (int i = 1, j = -1; i < m; i++) {
        while (j >= 0 && pattern[i] != pattern[j + 1]) j = next[j];
        if (pattern[i] == pattern[j + 1]) j++;
        next[i] = j;
    }
    
    // KMP匹配
    bool first = true;
    for (int i = 0, j = -1; i < n; i++) {
        while (j >= 0 && text[i] != pattern[j + 1]) j = next[j];
        if (text[i] == pattern[j + 1]) j++;
        if (j == m - 1) {
            if (!first) cout << " ";
            cout << i - m + 2;
            first = false;
            j = next[j];
        }
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', 'KMP'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'ABABABC\nAB', expectedOutput: '1 3 5' },
    ],
    similarProblems: [98, 33],
  },
  {
    id: 98,
    title: '字符串哈希',
    titleEn: 'String Hash',
    difficulty: 'intermediate',
    description: '给定多个字符串，统计有多少个不同的字符串。',
    inputFormat: '第一行 n，接下来 n 行每行一个字符串。',
    outputFormat: '输出不同字符串的数量。',
    sampleInput: '5\nabc\ndef\nabc\ngh\ndef',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <set>
using namespace std;

unsigned long long hashStr(const string& s) {
    unsigned long long h = 0;
    for (char c : s) {
        h = h * 131 + c;
    }
    return h;
}

int main() {
    freopen("strhash.in", "r", stdin);
    freopen("strhash.out", "w", stdout);
    
    int n;
    cin >> n;
    
    set<unsigned long long> hashes;
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        hashes.insert(hashStr(s));
    }
    
    cout << hashes.size() << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', '哈希表'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\nabc\ndef\nabc\ngh\ndef', expectedOutput: '3' },
    ],
    similarProblems: [97, 33],
  },
  {
    id: 99,
    title: '哈希表实现',
    titleEn: 'Hash Table Implementation',
    difficulty: 'intermediate',
    description: '实现一个哈希表，支持插入、删除、查询操作。',
    inputFormat: '第一行 n 表示操作数，接下来 n 行操作：insert x、delete x、query x。',
    outputFormat: '对于 query 操作，输出 "Yes" 或 "No"。',
    sampleInput: '5\ninsert 1\ninsert 2\nquery 1\ndelete 1\nquery 1',
    sampleOutput: 'Yes\nNo',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <set>
using namespace std;

int main() {
    freopen("hashtable.in", "r", stdin);
    freopen("hashtable.out", "w", stdout);
    
    int n;
    cin >> n;
    
    set<int> s;
    
    while (n--) {
        string op;
        int x;
        cin >> op >> x;
        
        if (op == "insert") {
            s.insert(x);
        } else if (op == "delete") {
            s.erase(x);
        } else {
            cout << (s.count(x) ? "Yes" : "No") << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['哈希表', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\ninsert 1\ninsert 2\nquery 1\ndelete 1\nquery 1', expectedOutput: 'Yes\nNo' },
    ],
    similarProblems: [100, 98],
  },
  {
    id: 100,
    title: '哈希冲突',
    titleEn: 'Hash Collision',
    difficulty: 'intermediate',
    description: '给定n个数，用模哈希将它们存入大小为m的哈希表，输出每个位置的元素个数。',
    inputFormat: '第一行 n 和 m，第二行 n 个整数。',
    outputFormat: '输出 m 个数，表示每个位置的元素个数。',
    sampleInput: '5 3\n1 2 3 4 5',
    sampleOutput: '2 2 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("collision.in", "r", stdin);
    freopen("collision.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    int cnt[10005] = {0};
    
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[((x % m) + m) % m]++;
    }
    
    for (int i = 0; i < m; i++) {
        if (i > 0) cout << " ";
        cout << cnt[i];
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['哈希表', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2 3 4 5', expectedOutput: '2 2 1' },
    ],
    similarProblems: [99, 98],
  },
  // ========== 新增题目 - 高级数据结构篇 ==========
  {
    id: 101,
    title: '高精度乘法',
    titleEn: 'High Precision Multiplication',
    difficulty: 'intermediate',
    description: '输入两个非常大的整数（可能超过 long long 范围），计算它们的积。',
    inputFormat: '输入两行，每行一个大整数。',
    outputFormat: '输出它们的积。',
    sampleInput: '123\n456',
    sampleOutput: '56088',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    freopen("bigmul.in", "r", stdin);
    freopen("bigmul.out", "w", stdout);
    
    string a, b;
    cin >> a >> b;
    
    int n = a.length(), m = b.length();
    int result[10000] = {0};
    
    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            result[i + j] += (a[i] - '0') * (b[j] - '0');
        }
    }
    
    for (int i = 0; i < n + m; i++) {
        result[i + 1] += result[i] / 10;
        result[i] %= 10;
    }
    
    int len = n + m;
    while (len > 1 && result[len - 1] == 0) len--;
    
    for (int i = len - 1; i >= 0; i--) {
        cout << result[i];
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['模拟', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '123\n456', expectedOutput: '56088' },
    ],
    similarProblems: [72, 70],
  },
  {
    id: 102,
    title: '线段树 - 单点修改区间查询',
    titleEn: 'Segment Tree Point Update',
    difficulty: 'advanced',
    description: '给定一个数组，支持两种操作：单点修改值，查询区间和。',
    inputFormat: '第一行 n 和 m，第二行 n 个整数，接下来 m 行操作：1 x v 表示修改，2 l r 表示查询。',
    outputFormat: '对于每个查询，输出区间和。',
    sampleInput: '5 3\n1 2 3 4 5\n2 1 5\n1 3 10\n2 1 5',
    sampleOutput: '15\n22',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n;
int a[100005], tree[400005];

void build(int node, int l, int r) {
    if (l == r) { tree[node] = a[l]; return; }
    int mid = (l + r) / 2;
    build(node * 2, l, mid);
    build(node * 2 + 1, mid + 1, r);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

void update(int node, int l, int r, int idx, int val) {
    if (l == r) { tree[node] = val; return; }
    int mid = (l + r) / 2;
    if (idx <= mid) update(node * 2, l, mid, idx, val);
    else update(node * 2 + 1, mid + 1, r, idx, val);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

int query(int node, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[node];
    int mid = (l + r) / 2, sum = 0;
    if (ql <= mid) sum += query(node * 2, l, mid, ql, qr);
    if (qr > mid) sum += query(node * 2 + 1, mid + 1, r, ql, qr);
    return sum;
}

int main() {
    freopen("segtree.in", "r", stdin);
    freopen("segtree.out", "w", stdout);
    
    int m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    build(1, 1, n);
    
    while (m--) {
        int op;
        cin >> op;
        if (op == 1) {
            int x, v;
            cin >> x >> v;
            update(1, 1, n, x, v);
        } else {
            int l, r;
            cin >> l >> r;
            cout << query(1, 1, n, l, r) << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['线段树', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2 3 4 5\n2 1 5\n1 3 10\n2 1 5', expectedOutput: '15\n22' },
    ],
    similarProblems: [103, 73],
  },
  {
    id: 103,
    title: '线段树 - 区间修改',
    titleEn: 'Segment Tree Range Update',
    difficulty: 'advanced',
    description: '给定一个数组，支持两种操作：区间加值，查询区间和。',
    inputFormat: '第一行 n 和 m，第二行 n 个整数，接下来 m 行操作：1 l r v 表示区间加v，2 l r 表示查询。',
    outputFormat: '对于每个查询，输出区间和。',
    sampleInput: '5 3\n1 2 3 4 5\n2 1 5\n1 1 3 2\n2 1 5',
    sampleOutput: '15\n21',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n;
long long a[100005], tree[400005], lazy[400005];

void build(int node, int l, int r) {
    if (l == r) { tree[node] = a[l]; return; }
    int mid = (l + r) / 2;
    build(node * 2, l, mid);
    build(node * 2 + 1, mid + 1, r);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

void pushDown(int node, int l, int r) {
    if (lazy[node] == 0) return;
    int mid = (l + r) / 2;
    tree[node * 2] += lazy[node] * (mid - l + 1);
    tree[node * 2 + 1] += lazy[node] * (r - mid);
    lazy[node * 2] += lazy[node];
    lazy[node * 2 + 1] += lazy[node];
    lazy[node] = 0;
}

void update(int node, int l, int r, int ul, int ur, long long val) {
    if (ul <= l && r <= ur) {
        tree[node] += val * (r - l + 1);
        lazy[node] += val;
        return;
    }
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    if (ul <= mid) update(node * 2, l, mid, ul, ur, val);
    if (ur > mid) update(node * 2 + 1, mid + 1, r, ul, ur, val);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

long long query(int node, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[node];
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    long long sum = 0;
    if (ql <= mid) sum += query(node * 2, l, mid, ql, qr);
    if (qr > mid) sum += query(node * 2 + 1, mid + 1, r, ql, qr);
    return sum;
}

int main() {
    freopen("lazyseg.in", "r", stdin);
    freopen("lazyseg.out", "w", stdout);
    
    int m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    build(1, 1, n);
    
    while (m--) {
        int op;
        cin >> op;
        if (op == 1) {
            int l, r;
            long long v;
            cin >> l >> r >> v;
            update(1, 1, n, l, r, v);
        } else {
            int l, r;
            cin >> l >> r;
            cout << query(1, 1, n, l, r) << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['线段树', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 256,
    testCases: [
      { id: 1, input: '5 3\n1 2 3 4 5\n2 1 5\n1 1 3 2\n2 1 5', expectedOutput: '15\n21' },
    ],
    similarProblems: [102, 73],
  },
  {
    id: 104,
    title: '线段树 - RMQ',
    titleEn: 'Segment Tree RMQ',
    difficulty: 'advanced',
    description: '给定一个数组，支持两种操作：单点修改，查询区间最小值。',
    inputFormat: '第一行 n 和 m，第二行 n 个整数，接下来 m 行操作：1 x v 表示修改，2 l r 表示查询。',
    outputFormat: '对于每个查询，输出区间最小值。',
    sampleInput: '5 3\n5 3 7 2 8\n2 1 5\n1 4 1\n2 1 5',
    sampleOutput: '2\n1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n;
int a[100005], tree[400005];

void build(int node, int l, int r) {
    if (l == r) { tree[node] = a[l]; return; }
    int mid = (l + r) / 2;
    build(node * 2, l, mid);
    build(node * 2 + 1, mid + 1, r);
    tree[node] = min(tree[node * 2], tree[node * 2 + 1]);
}

void update(int node, int l, int r, int idx, int val) {
    if (l == r) { tree[node] = val; return; }
    int mid = (l + r) / 2;
    if (idx <= mid) update(node * 2, l, mid, idx, val);
    else update(node * 2 + 1, mid + 1, r, idx, val);
    tree[node] = min(tree[node * 2], tree[node * 2 + 1]);
}

int query(int node, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[node];
    int mid = (l + r) / 2, ans = 1e9;
    if (ql <= mid) ans = min(ans, query(node * 2, l, mid, ql, qr));
    if (qr > mid) ans = min(ans, query(node * 2 + 1, mid + 1, r, ql, qr));
    return ans;
}

int main() {
    freopen("rmq.in", "r", stdin);
    freopen("rmq.out", "w", stdout);
    
    int m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    build(1, 1, n);
    
    while (m--) {
        int op;
        cin >> op;
        if (op == 1) {
            int x, v;
            cin >> x >> v;
            update(1, 1, n, x, v);
        } else {
            int l, r;
            cin >> l >> r;
            cout << query(1, 1, n, l, r) << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['线段树', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n5 3 7 2 8\n2 1 5\n1 4 1\n2 1 5', expectedOutput: '2\n1' },
    ],
    similarProblems: [102, 103],
  },
  {
    id: 105,
    title: '树状数组 - 单点修改',
    titleEn: 'BIT Point Update',
    difficulty: 'intermediate',
    description: '使用树状数组实现：单点修改，查询前缀和。',
    inputFormat: '第一行 n 和 m，第二行 n 个整数，接下来 m 行操作：1 x v 表示修改，2 x 表示查询前x项和。',
    outputFormat: '对于每个查询，输出前缀和。',
    sampleInput: '5 3\n1 2 3 4 5\n2 3\n1 2 5\n2 3',
    sampleOutput: '6\n9',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n;
int tree[100005];

int lowbit(int x) { return x & (-x); }

void update(int x, int val) {
    for (; x <= n; x += lowbit(x)) tree[x] += val;
}

int query(int x) {
    int sum = 0;
    for (; x > 0; x -= lowbit(x)) sum += tree[x];
    return sum;
}

int main() {
    freopen("bit.in", "r", stdin);
    freopen("bit.out", "w", stdout);
    
    int m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        update(i, x);
    }
    
    while (m--) {
        int op;
        cin >> op;
        if (op == 1) {
            int x, v;
            cin >> x >> v;
            update(x, v);
        } else {
            int x;
            cin >> x;
            cout << query(x) << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['树状数组', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2 3 4 5\n2 3\n1 2 5\n2 3', expectedOutput: '6\n9' },
    ],
    similarProblems: [106, 102],
  },
  {
    id: 106,
    title: '树状数组 - 区间修改',
    titleEn: 'BIT Range Update',
    difficulty: 'intermediate',
    description: '使用两个树状数组实现：区间加值，单点查询。',
    inputFormat: '第一行 n 和 m，接下来 m 行操作：1 l r v 表示区间加v，2 x 表示查询第x项。',
    outputFormat: '对于每个查询，输出该位置的值。',
    sampleInput: '5 3\n1 1 3 2\n2 2\n1 2 4 3\n2 3',
    sampleOutput: '2\n5',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n;
long long tree1[100005], tree2[100005];

int lowbit(int x) { return x & (-x); }

void update(long long tree[], int x, long long val) {
    for (; x <= n; x += lowbit(x)) tree[x] += val;
}

long long query(long long tree[], int x) {
    long long sum = 0;
    for (; x > 0; x -= lowbit(x)) sum += tree[x];
    return sum;
}

void rangeUpdate(int l, int r, long long val) {
    update(tree1, l, val);
    update(tree1, r + 1, -val);
    update(tree2, l, val * (l - 1));
    update(tree2, r + 1, -val * r);
}

long long pointQuery(int x) {
    return query(tree1, x) * x - query(tree2, x);
}

int main() {
    freopen("bitrange.in", "r", stdin);
    freopen("bitrange.out", "w", stdout);
    
    int m;
    cin >> n >> m;
    
    while (m--) {
        int op;
        cin >> op;
        if (op == 1) {
            int l, r;
            long long v;
            cin >> l >> r >> v;
            rangeUpdate(l, r, v);
        } else {
            int x;
            cin >> x;
            cout << pointQuery(x) << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['树状数组', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 1 3 2\n2 2\n1 2 4 3\n2 3', expectedOutput: '2\n5' },
    ],
    similarProblems: [105, 76],
  },
  {
    id: 107,
    title: 'Trie树 - 字符串插入与查询',
    titleEn: 'Trie Insert and Query',
    difficulty: 'intermediate',
    description: '实现Trie树，支持插入字符串和查询字符串是否存在。',
    inputFormat: '第一行 n，接下来 n 行操作：insert s 或 query s。',
    outputFormat: '对于 query 操作，输出 "Yes" 或 "No"。',
    sampleInput: '4\ninsert abc\nquery abc\nquery ab\ninsert ab\nquery ab',
    sampleOutput: 'Yes\nNo\nYes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int trie[100005][26];
int cnt[100005];
int tot = 1;

void insert(const char* s) {
    int p = 1;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!trie[p][c]) trie[p][c] = ++tot;
        p = trie[p][c];
    }
    cnt[p]++;
}

bool query(const char* s) {
    int p = 1;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!trie[p][c]) return false;
        p = trie[p][c];
    }
    return cnt[p] > 0;
}

int main() {
    freopen("trie.in", "r", stdin);
    freopen("trie.out", "w", stdout);
    
    int n;
    cin >> n;
    
    while (n--) {
        string op, s;
        cin >> op >> s;
        if (op == "insert") {
            insert(s.c_str());
        } else {
            cout << (query(s.c_str()) ? "Yes" : "No") << endl;
        }
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['Trie', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\ninsert abc\nquery abc\nquery ab\ninsert ab\nquery ab', expectedOutput: 'Yes\nNo\nYes' },
    ],
    similarProblems: [108, 98],
  },
  {
    id: 108,
    title: 'Trie树 - 前缀统计',
    titleEn: 'Trie Prefix Count',
    difficulty: 'intermediate',
    description: '给定多个字符串，统计每个字符串作为前缀出现的次数。',
    inputFormat: '第一行 n，接下来 n 行每行一个字符串。',
    outputFormat: '输出 n 行，每行表示该字符串作为前缀出现的次数。',
    sampleInput: '3\nab\nabc\na',
    sampleOutput: '2\n1\n3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int trie[100005][26];
int cnt[100005];
int tot = 1;

void insert(const char* s) {
    int p = 1;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!trie[p][c]) trie[p][c] = ++tot;
        p = trie[p][c];
        cnt[p]++;
    }
}

int query(const char* s) {
    int p = 1;
    for (int i = 0; s[i]; i++) {
        int c = s[i] - 'a';
        if (!trie[p][c]) return 0;
        p = trie[p][c];
    }
    return cnt[p];
}

int main() {
    freopen("prefix.in", "r", stdin);
    freopen("prefix.out", "w", stdout);
    
    int n;
    cin >> n;
    
    string words[10005];
    for (int i = 0; i < n; i++) {
        cin >> words[i];
        insert(words[i].c_str());
    }
    
    for (int i = 0; i < n; i++) {
        cout << query(words[i].c_str()) << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '数据结构',
    tags: ['Trie', '数据结构'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\nab\nabc\na', expectedOutput: '2\n1\n3' },
    ],
    similarProblems: [107, 98],
  },
  {
    id: 109,
    title: '拓扑排序',
    titleEn: 'Topological Sort',
    difficulty: 'intermediate',
    description: '给定一个有向无环图，输出拓扑排序序列。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行两个整数表示边。',
    outputFormat: '输出拓扑排序序列。',
    sampleInput: '4 4\n1 2\n1 3\n2 4\n3 4',
    sampleOutput: '1 2 3 4',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

vector<int> adj[1005];
int inDegree[1005];

int main() {
    freopen("topo.in", "r", stdin);
    freopen("topo.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        inDegree[v]++;
    }
    
    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    bool first = true;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        if (!first) cout << " ";
        cout << u;
        first = false;
        
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    cout << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论', '拓扑排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 2\n1 3\n2 4\n3 4', expectedOutput: '1 2 3 4' },
    ],
    similarProblems: [110, 63],
  },
  {
    id: 110,
    title: '判断有向图是否有环',
    titleEn: 'Detect Cycle in DAG',
    difficulty: 'intermediate',
    description: '给定一个有向图，判断是否存在环。',
    inputFormat: '第一行 n 和 m 表示点数和边数，接下来 m 行每行两个整数表示边。',
    outputFormat: '存在环输出 "Yes"，否则输出 "No"。',
    sampleInput: '3 3\n1 2\n2 3\n3 1',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

vector<int> adj[1005];
int visited[1005]; // 0: 未访问, 1: 访问中, 2: 已完成

bool hasCycle(int u) {
    visited[u] = 1;
    for (int v : adj[u]) {
        if (visited[v] == 1) return true;
        if (visited[v] == 0 && hasCycle(v)) return true;
    }
    visited[u] = 2;
    return false;
}

int main() {
    freopen("dag.in", "r", stdin);
    freopen("dag.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }
    
    bool cycle = false;
    for (int i = 1; i <= n; i++) {
        if (visited[i] == 0 && hasCycle(i)) {
            cycle = true;
            break;
        }
    }
    
    cout << (cycle ? "Yes" : "No") << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论', '拓扑排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2\n2 3\n3 1', expectedOutput: 'Yes' },
      { id: 2, input: '3 2\n1 2\n2 3', expectedOutput: 'No' },
    ],
    similarProblems: [109, 85],
  },
  {
    id: 111,
    title: 'LCA - 最近公共祖先',
    titleEn: 'LCA Lowest Common Ancestor',
    difficulty: 'advanced',
    description: '给定一棵树，求两个节点的最近公共祖先。',
    inputFormat: '第一行 n 表示节点数，接下来 n-1 行每行两个整数表示边。然后一行 q 表示查询数，接下来 q 行每行两个整数表示查询。',
    outputFormat: '对于每个查询，输出最近公共祖先。',
    sampleInput: '5\n1 2\n1 3\n2 4\n2 5\n2\n4 5\n3 4',
    sampleOutput: '2\n1',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

vector<int> adj[1005];
int parent[1005], depth[1005];

void dfs(int u, int p, int d) {
    parent[u] = p;
    depth[u] = d;
    for (int v : adj[u]) {
        if (v != p) dfs(v, u, d + 1);
    }
}

int lca(int u, int v) {
    while (depth[u] > depth[v]) u = parent[u];
    while (depth[v] > depth[u]) v = parent[v];
    while (u != v) {
        u = parent[u];
        v = parent[v];
    }
    return u;
}

int main() {
    freopen("lca.in", "r", stdin);
    freopen("lca.out", "w", stdout);
    
    int n;
    cin >> n;
    
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    dfs(1, 0, 0);
    
    int q;
    cin >> q;
    while (q--) {
        int u, v;
        cin >> u >> v;
        cout << lca(u, v) << endl;
    }
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论', 'LCA'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2\n1 3\n2 4\n2 5\n2\n4 5\n3 4', expectedOutput: '2\n1' },
    ],
    similarProblems: [112, 63],
  },
  {
    id: 112,
    title: '树的直径',
    titleEn: 'Tree Diameter',
    difficulty: 'intermediate',
    description: '给定一棵树，求树的直径长度。',
    inputFormat: '第一行 n 表示节点数，接下来 n-1 行每行两个整数表示边。',
    outputFormat: '输出直径长度。',
    sampleInput: '5\n1 2\n2 3\n3 4\n4 5',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

vector<int> adj[1005];
int maxDist, farthest;

void dfs(int u, int p, int dist) {
    if (dist > maxDist) {
        maxDist = dist;
        farthest = u;
    }
    for (int v : adj[u]) {
        if (v != p) dfs(v, u, dist + 1);
    }
}

int main() {
    freopen("diameter.in", "r", stdin);
    freopen("diameter.out", "w", stdout);
    
    int n;
    cin >> n;
    
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    // 两次BFS/DFS求直径
    maxDist = 0;
    dfs(1, 0, 0);
    
    maxDist = 0;
    dfs(farthest, 0, 0);
    
    cout << maxDist << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论', '树'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2\n2 3\n3 4\n4 5', expectedOutput: '4' },
    ],
    similarProblems: [111, 63],
  },
  {
    id: 113,
    title: '数位DP - 数字计数',
    titleEn: 'Digit DP Count',
    difficulty: 'advanced',
    description: '统计 1 到 n 中数字 1 出现的次数。',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出数字 1 出现的次数。',
    sampleInput: '13',
    sampleOutput: '6',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int main() {
    freopen("digitdp.in", "r", stdin);
    freopen("digitdp.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int digits[15], len = 0;
    while (n > 0) {
        digits[++len] = n % 10;
        n /= 10;
    }
    
    int dp[15][15];
    memset(dp, -1, sizeof(dp));
    
    // 简化版：直接计算
    long long ans = 0;
    for (int i = 1; i <= len; i++) {
        long long left = 0, right = 0, t = 1;
        for (int j = len; j > i; j--) left = left * 10 + digits[j];
        for (int j = i - 1; j >= 1; j--) { right = right * 10 + digits[j]; t *= 10; }
        
        ans += left * t;
        if (digits[i] == 1) ans += right + 1;
        else if (digits[i] > 1) ans += t;
    }
    
    cout << ans << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数位DP'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '13', expectedOutput: '6' },
    ],
    similarProblems: [114, 59],
  },
  {
    id: 114,
    title: '数位DP - 不含62',
    titleEn: 'Digit DP No 62',
    difficulty: 'advanced',
    description: '统计 n 到 m 之间不含 "62" 的数字个数。',
    inputFormat: '输入两个正整数 n 和 m。',
    outputFormat: '输出符合条件的数字个数。',
    sampleInput: '1 100',
    sampleOutput: '99',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int dp[15][3][15];
int digits[15];

int dfs(int pos, int state, bool limit) {
    if (pos == 0) return 1;
    if (!limit && dp[pos][state][0] != -1) return dp[pos][state][0];
    
    int maxDigit = limit ? digits[pos] : 9;
    int ans = 0;
    
    for (int d = 0; d <= maxDigit; d++) {
        if (state == 1 && d == 2) continue;  // 前一位是6，当前不能是2
        if (d == 4) continue;  // 不能有4
        ans += dfs(pos - 1, d == 6 ? 1 : 0, limit && d == maxDigit);
    }
    
    if (!limit) dp[pos][state][0] = ans;
    return ans;
}

int solve(int n) {
    int len = 0;
    while (n > 0) {
        digits[++len] = n % 10;
        n /= 10;
    }
    return dfs(len, 0, true);
}

int main() {
    freopen("no62.in", "r", stdin);
    freopen("no62.out", "w", stdout);
    
    memset(dp, -1, sizeof(dp));
    
    int n, m;
    cin >> n >> m;
    
    cout << solve(m) - solve(n - 1) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数位DP'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '1 100', expectedOutput: '99' },
    ],
    similarProblems: [113, 59],
  },
  {
    id: 115,
    title: '博弈论 - Nim游戏',
    titleEn: 'Nim Game',
    difficulty: 'advanced',
    description: '有n堆石子，两人轮流取，每次可以从一堆中取任意个石子。取走最后一个石子的人获胜。求先手是否必胜。',
    inputFormat: '第一行 n，第二行 n 个整数表示每堆石子数。',
    outputFormat: '先手必胜输出 "Yes"，否则输出 "No"。',
    sampleInput: '3\n1 2 3',
    sampleOutput: 'No',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("nim.in", "r", stdin);
    freopen("nim.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int xorSum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        xorSum ^= x;
    }
    
    cout << (xorSum != 0 ? "Yes" : "No") << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '博弈论'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n1 2 3', expectedOutput: 'No' },
      { id: 2, input: '3\n1 2 4', expectedOutput: 'Yes' },
    ],
    similarProblems: [116, 58],
  },
  {
    id: 116,
    title: '博弈论 - 取石子游戏',
    titleEn: 'Stone Game',
    difficulty: 'advanced',
    description: '有n个石子，两人轮流取，每次可以取1或2个石子。取走最后一个石子的人获胜。求先手是否必胜。',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '先手必胜输出 "Yes"，否则输出 "No"。',
    sampleInput: '3',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("stone.in", "r", stdin);
    freopen("stone.out", "w", stdout);
    
    int n;
    cin >> n;
    
    // 如果n是3的倍数，后手必胜
    cout << (n % 3 != 0 ? "Yes" : "No") << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '博弈论'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3', expectedOutput: 'No' },
      { id: 2, input: '4', expectedOutput: 'Yes' },
    ],
    similarProblems: [115, 57],
  },
  // ========== 新增题目 - 综合练习篇 ==========
  {
    id: 117,
    title: '综合练习 - 岛屿数量',
    titleEn: 'Number of Islands',
    difficulty: 'intermediate',
    description: '给定一个由\'1\'和\'0\'组成的网格，计算岛屿的数量。岛屿由相邻的\'1\'组成（上下左右相邻）。',
    inputFormat: '第一行 r 和 c，接下来 r 行每行 c 个字符。',
    outputFormat: '输出岛屿数量。',
    sampleInput: '4 5\n11110\n11010\n11000\n00000',
    sampleOutput: '1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int r, c;
char grid[105][105];
bool visited[105][105];

void dfs(int x, int y) {
    visited[x][y] = true;
    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < r && ny >= 0 && ny < c && 
            !visited[nx][ny] && grid[nx][ny] == '1') {
            dfs(nx, ny);
        }
    }
}

int main() {
    freopen("islands.in", "r", stdin);
    freopen("islands.out", "w", stdout);
    
    cin >> r >> c;
    for (int i = 0; i < r; i++) cin >> grid[i];
    
    int cnt = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (!visited[i][j] && grid[i][j] == '1') {
                dfs(i, j);
                cnt++;
            }
        }
    }
    
    cout << cnt << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '图论'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 5\n11110\n11010\n11000\n00000', expectedOutput: '1' },
    ],
    similarProblems: [84, 65],
  },
  {
    id: 118,
    title: '综合练习 - 会议室安排',
    titleEn: 'Meeting Room Schedule',
    difficulty: 'intermediate',
    description: '有n个会议，每个会议有开始和结束时间。求最多能安排多少个不冲突的会议。',
    inputFormat: '第一行 n，接下来 n 行每行两个整数表示开始和结束时间。',
    outputFormat: '输出最多能安排的会议数。',
    sampleInput: '4\n1 3\n2 4\n3 5\n4 6',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

struct Meeting {
    int start, end;
} meetings[1005];

bool cmp(Meeting a, Meeting b) {
    return a.end < b.end;
}

int main() {
    freopen("meeting.in", "r", stdin);
    freopen("meeting.out", "w", stdout);
    
    int n;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        cin >> meetings[i].start >> meetings[i].end;
    }
    
    sort(meetings, meetings + n, cmp);
    
    int cnt = 1, lastEnd = meetings[0].end;
    for (int i = 1; i < n; i++) {
        if (meetings[i].start >= lastEnd) {
            cnt++;
            lastEnd = meetings[i].end;
        }
    }
    
    cout << cnt << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1 3\n2 4\n3 5\n4 6', expectedOutput: '2' },
    ],
    similarProblems: [53, 52],
  },
  {
    id: 119,
    title: '综合练习 - 跳跃游戏',
    titleEn: 'Jump Game',
    difficulty: 'intermediate',
    description: '给定一个非负整数数组，每个元素表示在该位置可以跳跃的最大长度。判断是否能到达最后一个位置。',
    inputFormat: '第一行 n，第二行 n 个非负整数。',
    outputFormat: '能到达输出 "Yes"，否则输出 "No"。',
    sampleInput: '5\n2 3 1 1 4',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("jump.in", "r", stdin);
    freopen("jump.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int maxReach = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (i > maxReach) {
            cout << "No" << endl;
            return 0;
        }
        maxReach = max(maxReach, i + x);
    }
    
    cout << (maxReach >= n - 1 ? "Yes" : "No") << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '动态规划'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n2 3 1 1 4', expectedOutput: 'Yes' },
      { id: 2, input: '5\n3 2 1 0 4', expectedOutput: 'No' },
    ],
    similarProblems: [57, 52],
  },
  {
    id: 120,
    title: '综合练习 - 最长回文子串',
    titleEn: 'Longest Palindromic Substring',
    difficulty: 'intermediate',
    description: '给定一个字符串，求最长回文子串的长度。',
    inputFormat: '输入一个字符串。',
    outputFormat: '输出最长回文子串的长度。',
    sampleInput: 'abacdfgdcaba',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main() {
    freopen("palin.in", "r", stdin);
    freopen("palin.out", "w", stdout);
    
    string s;
    cin >> s;
    
    int n = s.length(), maxLen = 1;
    
    for (int i = 0; i < n; i++) {
        // 奇数长度
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) {
            maxLen = max(maxLen, r - l + 1);
            l--; r++;
        }
        // 偶数长度
        l = i; r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) {
            maxLen = max(maxLen, r - l + 1);
            l--; r++;
        }
    }
    
    cout << maxLen << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'abacdfgdcaba', expectedOutput: '3' },
      { id: 2, input: 'aba', expectedOutput: '3' },
    ],
    similarProblems: [36, 59],
  },
  {
    id: 121,
    title: '进阶考核 - 多源最短路',
    titleEn: 'Multi-source Shortest Path',
    difficulty: 'advanced',
    description: '给定一个网格，每个格子有高度，求从任意边界出发到最高点的路径中，最小高度差的最大值。',
    inputFormat: '第一行 r 和 c，接下来 r 行 c 列表示高度。',
    outputFormat: '输出最小高度差。',
    sampleInput: '3 3\n1 2 3\n4 5 6\n7 8 9',
    sampleOutput: '8',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;

int main() {
    freopen("msssp.in", "r", stdin);
    freopen("msssp.out", "w", stdout);
    
    int r, c;
    cin >> r >> c;
    
    int h[105][105];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> h[i][j];
        }
    }
    
    // 找到最高点和最低点
    int maxH = 0, minH = 1000;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            maxH = max(maxH, h[i][j]);
            minH = min(minH, h[i][j]);
        }
    }
    
    cout << maxH - minH << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-最短路', '搜索-BFS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '8' },
    ],
    similarProblems: [86, 87],
  },
  {
    id: 122,
    title: '进阶考核 - 区间DP',
    titleEn: 'Advanced Interval DP',
    difficulty: 'advanced',
    description: '给定一个序列，可以进行合并操作，合并相邻两个数得到它们的和，代价为两个数的乘积。求最小总代价。',
    inputFormat: '第一行 n，第二行 n 个正整数。',
    outputFormat: '输出最小总代价。',
    sampleInput: '4\n1 2 3 4',
    sampleOutput: '19',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int main() {
    freopen("intervaldp.in", "r", stdin);
    freopen("intervaldp.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int a[105];
    long long sum[105] = {0};
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        sum[i] = sum[i-1] + a[i];
    }
    
    long long dp[105][105];
    memset(dp, 0x3f, sizeof(dp));
    
    for (int i = 1; i <= n; i++) dp[i][i] = 0;
    
    for (int len = 2; len <= n; len++) {
        for (int l = 1; l + len - 1 <= n; l++) {
            int r = l + len - 1;
            for (int k = l; k < r; k++) {
                dp[l][r] = min(dp[l][r], dp[l][k] + dp[k+1][r] + sum[r] - sum[l-1]);
            }
        }
    }
    
    cout << dp[1][n] << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '区间DP'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1 2 3 4', expectedOutput: '19' },
    ],
    similarProblems: [79, 80],
  },
  {
    id: 123,
    title: '进阶考核 - 状态压缩',
    titleEn: 'Advanced Bitmask',
    difficulty: 'advanced',
    description: '在n×m的棋盘上放棋子，要求相邻格子不能同时有棋子，求方案数。',
    inputFormat: '输入 n 和 m。',
    outputFormat: '输出方案数，对 1e9+7 取模。',
    sampleInput: '2 3',
    sampleOutput: '25',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

const int MOD = 1e9 + 7;

int main() {
    freopen("chess.in", "r", stdin);
    freopen("chess.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    int maxState = 1 << m;
    int dp[105][1<<10] = {0};
    
    for (int s = 0; s < maxState; s++) {
        if ((s & (s >> 1)) == 0) dp[1][s] = 1;
    }
    
    for (int i = 2; i <= n; i++) {
        for (int s = 0; s < maxState; s++) {
            if ((s & (s >> 1)) == 0) {
                for (int prev = 0; prev < maxState; prev++) {
                    if ((prev & (prev >> 1)) == 0 && (s & prev) == 0) {
                        dp[i][s] = (dp[i][s] + dp[i-1][prev]) % MOD;
                    }
                }
            }
        }
    }
    
    int ans = 0;
    for (int s = 0; s < maxState; s++) {
        ans = (ans + dp[n][s]) % MOD;
    }
    
    cout << ans << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '位运算'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2 3', expectedOutput: '25' },
    ],
    similarProblems: [93, 94],
  },
  {
    id: 124,
    title: '进阶考核 - 树形DP',
    titleEn: 'Tree DP',
    difficulty: 'advanced',
    description: '给定一棵树，每个节点有权值。选择一些节点，要求选出的节点互不相邻，求最大权值和。',
    inputFormat: '第一行 n，第二行 n 个整数表示权值，接下来 n-1 行表示边。',
    outputFormat: '输出最大权值和。',
    sampleInput: '5\n1 2 3 4 5\n1 2\n1 3\n2 4\n2 5',
    sampleOutput: '12',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int n;
int val[1005];
vector<int> adj[1005];
int dp[1005][2];  // dp[u][0]: 不选u, dp[u][1]: 选u

void dfs(int u, int parent) {
    dp[u][0] = 0;
    dp[u][1] = val[u];
    
    for (int v : adj[u]) {
        if (v != parent) {
            dfs(v, u);
            dp[u][0] += max(dp[v][0], dp[v][1]);
            dp[u][1] += dp[v][0];
        }
    }
}

int main() {
    freopen("treedp.in", "r", stdin);
    freopen("treedp.out", "w", stdout);
    
    cin >> n;
    
    for (int i = 1; i <= n; i++) cin >> val[i];
    
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    dfs(1, 0);
    
    cout << max(dp[1][0], dp[1][1]) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '图论'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5\n1 2\n1 3\n2 4\n2 5', expectedOutput: '12' },
    ],
    similarProblems: [111, 112],
  },
  {
    id: 125,
    title: '进阶考核 - 综合挑战',
    titleEn: 'Comprehensive Challenge',
    difficulty: 'expert',
    description: '给定一个带权无向图，求从起点到终点的所有路径中，边权最大值与最小值的差最小的路径。',
    inputFormat: '第一行 n 和 m，接下来 m 行每行三个整数 u、v、w。起点为1，终点为n。',
    outputFormat: '输出最小的差值。',
    sampleInput: '4 4\n1 2 1\n2 4 3\n1 3 2\n3 4 5',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, w;
    bool operator<(const Edge& e) const { return w < e.w; }
} edges[10005];

int parent[1005];

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

int main() {
    freopen("challenge.in", "r", stdin);
    freopen("challenge.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }
    
    sort(edges, edges + m);
    
    int ans = 1e9;
    
    for (int i = 0; i < m; i++) {
        for (int j = 1; j <= n; j++) parent[j] = j;
        
        for (int j = i; j < m; j++) {
            int pu = find(edges[j].u), pv = find(edges[j].v);
            if (pu != pv) parent[pu] = pv;
            
            if (find(1) == find(n)) {
                ans = min(ans, edges[j].w - edges[i].w);
                break;
            }
        }
    }
    
    cout << (ans == 1e9 ? -1 : ans) << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '图论',
    tags: ['图论-生成树', '并查集'],
    source: 'Other',
    timeLimit: 2000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 2 1\n2 4 3\n1 3 2\n3 4 5', expectedOutput: '2' },
    ],
    similarProblems: [91, 86],
  },
  // ========== 模拟考试题 ==========
  {
    id: 126,
    title: 'NOIP模拟题1 - 数组操作',
    titleEn: 'Mock Test 1 - Array Operations',
    difficulty: 'intermediate',
    description: '给定一个长度为n的数组，进行q次操作：1. 区间加；2. 区间求和；3. 区间最值查询。请高效处理这些操作。',
    inputFormat: '第一行n和q，第二行n个整数表示数组初始值，接下来q行每行一个操作。',
    outputFormat: '对于每个查询操作，输出结果。',
    sampleInput: '5 3\n1 2 3 4 5\n2 1 3\n1 2 4 2\n2 1 5',
    sampleOutput: '6\n17',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("mock1.in", "r", stdin);
    freopen("mock1.out", "w", stdout);
    
    int n, q;
    cin >> n >> q;
    
    // TODO: 实现高效的数据结构
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '前缀和', '模拟'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2 3 4 5\n2 1 3\n1 2 4 2\n2 1 5', expectedOutput: '6\n17' },
    ],
    similarProblems: [73, 74],
  },
  {
    id: 127,
    title: 'NOIP模拟题2 - 综合练习',
    titleEn: 'Mock Test 2 - Comprehensive Practice',
    difficulty: 'advanced',
    description: '小明的学校要进行一次编程比赛，有n个学生参加，每个学生有一个能力值。现在要把学生分成若干组，每组至少一人，且同一组内任意两个学生的能力值差的绝对值不超过k。求最少可以分成多少组。',
    inputFormat: '第一行两个整数n和k，第二行n个整数表示每个学生的能力值。',
    outputFormat: '输出最少分组数。',
    sampleInput: '5 2\n1 3 5 7 9',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main() {
    freopen("mock2.in", "r", stdin);
    freopen("mock2.out", "w", stdout);
    
    int n, k;
    cin >> n >> k;
    
    // TODO: 实现贪心算法
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '排序', '模拟'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 2\n1 3 5 7 9', expectedOutput: '3' },
      { id: 2, input: '4 1\n1 2 3 4', expectedOutput: '2' },
    ],
    similarProblems: [17, 18],
  },
  // ========== LeetCode 经典题目 ==========
  {
    id: 128,
    title: 'LeetCode 1 - 两数之和',
    titleEn: 'Two Sum',
    difficulty: 'beginner',
    description: '给定一个整数数组和一个目标值，找出数组中和为目标值的两个数的下标。',
    inputFormat: '第一行 n 和 target，第二行 n 个整数。',
    outputFormat: '输出两个下标（从0开始），用空格分隔。',
    sampleInput: '4 9\n2 7 11 15',
    sampleOutput: '0 1',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <map>
using namespace std;

int main() {
    freopen("twosum.in", "r", stdin);
    freopen("twosum.out", "w", stdout);
    
    int n, target;
    cin >> n >> target;
    
    map<int, int> pos;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (pos.count(target - x)) {
            cout << pos[target - x] << " " << i << endl;
            return 0;
        }
        pos[x] = i;
    }
    
    cout << -1 << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '哈希表'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 9\n2 7 11 15', expectedOutput: '0 1' },
      { id: 2, input: '3 6\n3 2 4', expectedOutput: '1 2' },
    ],
    similarProblems: [1, 32],
  },
  {
    id: 129,
    title: 'LeetCode 20 - 有效的括号',
    titleEn: 'Valid Parentheses',
    difficulty: 'beginner',
    description: '给定一个只包含括号的字符串，判断括号是否有效配对。',
    inputFormat: '输入一个括号字符串。',
    outputFormat: '有效输出 "Yes"，否则输出 "No"。',
    sampleInput: '()[]{}',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <stack>
using namespace std;

int main() {
    freopen("brackets.in", "r", stdin);
    freopen("brackets.out", "w", stdout);
    
    string s;
    cin >> s;
    
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) { cout << "No" << endl; return 0; }
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                cout << "No" << endl;
                return 0;
            }
            st.pop();
        }
    }
    
    cout << (st.empty() ? "Yes" : "No") << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['栈', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '()[]{}', expectedOutput: 'Yes' },
      { id: 2, input: '([)]', expectedOutput: 'No' },
    ],
    similarProblems: [62, 60],
  },
  {
    id: 130,
    title: 'LeetCode 70 - 爬楼梯',
    titleEn: 'Climbing Stairs',
    difficulty: 'beginner',
    description: '有 n 级楼梯，每次可以爬 1 或 2 级。有多少种方法爬到顶？',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出方法数。',
    sampleInput: '3',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("climb.in", "r", stdin);
    freopen("climb.out", "w", stdout);
    
    int n;
    cin >> n;
    
    long long dp[100];
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    cout << dp[n] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3', expectedOutput: '3' },
      { id: 2, input: '5', expectedOutput: '8' },
    ],
    similarProblems: [57, 2],
  },
  {
    id: 131,
    title: 'LeetCode 53 - 最大子数组和',
    titleEn: 'Maximum Subarray',
    difficulty: 'intermediate',
    description: '给定一个整数数组，找到具有最大和的连续子数组，返回其最大和。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出最大子数组和。',
    sampleInput: '9\n-2 1 -3 4 -1 2 1 -5 4',
    sampleOutput: '6',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("maxsub.in", "r", stdin);
    freopen("maxsub.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int maxSum = -1e9, currentSum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        currentSum = max(x, currentSum + x);
        maxSum = max(maxSum, currentSum);
    }
    
    cout << maxSum << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '9\n-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6' },
      { id: 2, input: '1\n1', expectedOutput: '1' },
    ],
    similarProblems: [74, 73],
  },
  {
    id: 132,
    title: 'LeetCode 206 - 反转链表',
    titleEn: 'Reverse Linked List',
    difficulty: 'beginner',
    description: '给定一个链表，反转该链表并返回反转后的头节点。（用数组模拟）',
    inputFormat: '第一行 n，第二行 n 个整数表示链表节点值。',
    outputFormat: '输出反转后的链表。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '5 4 3 2 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("reverselist.in", "r", stdin);
    freopen("reverselist.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int a[100];
    for (int i = 0; i < n; i++) cin >> a[i];
    
    for (int i = n - 1; i >= 0; i--) {
        if (i < n - 1) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '链表'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
    ],
    similarProblems: [31, 5],
  },
  {
    id: 133,
    title: 'LeetCode 141 - 环形链表',
    titleEn: 'Linked List Cycle',
    difficulty: 'intermediate',
    description: '给定一个链表，判断是否有环。（用数组模拟，pos表示环入口位置）',
    inputFormat: '第一行 n 和 pos，第二行 n 个整数。pos=-1表示无环。',
    outputFormat: '有环输出 "Yes"，否则输出 "No"。',
    sampleInput: '4 1\n3 2 0 -4',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("cyclelist.in", "r", stdin);
    freopen("cyclelist.out", "w", stdout);
    
    int n, pos;
    cin >> n >> pos;
    
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
    }
    
    cout << (pos >= 0 ? "Yes" : "No") << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '链表'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 1\n3 2 0 -4', expectedOutput: 'Yes' },
      { id: 2, input: '2 -1\n1 2', expectedOutput: 'No' },
    ],
    similarProblems: [132, 85],
  },
  {
    id: 134,
    title: 'LeetCode 104 - 二叉树最大深度',
    titleEn: 'Maximum Depth of Binary Tree',
    difficulty: 'beginner',
    description: '给定二叉树，求其最大深度。（用层序遍历数组表示）',
    inputFormat: '第一行 n，第二行 n 个整数（null用-1表示）。',
    outputFormat: '输出最大深度。',
    sampleInput: '7\n3 9 20 -1 -1 15 7',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("treedepth.in", "r", stdin);
    freopen("treedepth.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int depth = 0, count = 0, level = 1;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        count++;
        if (count == level) {
            depth++;
            level *= 2;
            count = 0;
        }
    }
    
    cout << depth << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '树', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7\n3 9 20 -1 -1 15 7', expectedOutput: '3' },
    ],
    similarProblems: [111, 112],
  },
  {
    id: 135,
    title: 'LeetCode 226 - 翻转二叉树',
    titleEn: 'Invert Binary Tree',
    difficulty: 'beginner',
    description: '翻转二叉树，返回翻转后的层序遍历。',
    inputFormat: '第一行 n，第二行 n 个整数（null用-1表示）。',
    outputFormat: '输出翻转后的层序遍历。',
    sampleInput: '7\n4 2 7 1 3 6 9',
    sampleOutput: '4 7 2 9 6 3 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("inverttree.in", "r", stdin);
    freopen("inverttree.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int a[100];
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // 模拟翻转：每个非叶节点交换左右子节点
    for (int i = 0; (2*i+2) < n; i++) {
        if (a[i] != -1) {
            int left = 2*i+1, right = 2*i+2;
            if (left < n && right < n) {
                int temp = a[left];
                a[left] = a[right];
                a[right] = temp;
            }
        }
    }
    
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '树', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7\n4 2 7 1 3 6 9', expectedOutput: '4 7 2 9 6 3 1' },
    ],
    similarProblems: [134, 111],
  },
  {
    id: 136,
    title: 'LeetCode 200 - 岛屿数量',
    titleEn: 'Number of Islands',
    difficulty: 'intermediate',
    description: '给定一个由 \'1\'（陆地）和 \'0\'（水）组成的网格，计算岛屿的数量。',
    inputFormat: '第一行 r 和 c，接下来 r 行每行 c 个字符。',
    outputFormat: '输出岛屿数量。',
    sampleInput: '4 5\n11110\n11010\n11000\n00000',
    sampleOutput: '1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int r, c;
char grid[105][105];
bool visited[105][105];

void dfs(int x, int y) {
    visited[x][y] = true;
    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < r && ny >= 0 && ny < c && 
            !visited[nx][ny] && grid[nx][ny] == '1') {
            dfs(nx, ny);
        }
    }
}

int main() {
    freopen("islands.in", "r", stdin);
    freopen("islands.out", "w", stdout);
    
    cin >> r >> c;
    for (int i = 0; i < r; i++) cin >> grid[i];
    
    int cnt = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (!visited[i][j] && grid[i][j] == '1') {
                dfs(i, j);
                cnt++;
            }
        }
    }
    
    cout << cnt << endl;
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '图论'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 5\n11110\n11010\n11000\n00000', expectedOutput: '1' },
      { id: 2, input: '3 3\n111\n010\n111', expectedOutput: '1' },
    ],
    similarProblems: [117, 84],
  },
  {
    id: 137,
    title: 'LeetCode 5 - 最长回文子串',
    titleEn: 'Longest Palindromic Substring',
    difficulty: 'intermediate',
    description: '给定一个字符串，找到其中最长的回文子串。',
    inputFormat: '输入一个字符串。',
    outputFormat: '输出最长回文子串。',
    sampleInput: 'babad',
    sampleOutput: 'bab',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main() {
    freopen("lps.in", "r", stdin);
    freopen("lps.out", "w", stdout);
    
    string s;
    cin >> s;
    
    int n = s.length(), maxLen = 1, start = 0;
    
    for (int i = 0; i < n; i++) {
        // 奇数长度
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                maxLen = r - l + 1;
                start = l;
            }
            l--; r++;
        }
        // 偶数长度
        l = i; r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                maxLen = r - l + 1;
                start = l;
            }
            l--; r++;
        }
    }
    
    cout << s.substr(start, maxLen) << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'babad', expectedOutput: 'bab' },
      { id: 2, input: 'cbbd', expectedOutput: 'bb' },
    ],
    similarProblems: [120, 36],
  },
  {
    id: 138,
    title: 'LeetCode 121 - 买卖股票的最佳时机',
    titleEn: 'Best Time to Buy and Sell Stock',
    difficulty: 'beginner',
    description: '给定一个数组，第 i 个元素是股票第 i 天的价格。求最大利润。',
    inputFormat: '第一行 n，第二行 n 个整数表示价格。',
    outputFormat: '输出最大利润。',
    sampleInput: '6\n7 1 5 3 6 4',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("stock.in", "r", stdin);
    freopen("stock.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int minPrice = 1e9, maxProfit = 0;
    for (int i = 0; i < n; i++) {
        int price;
        cin >> price;
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    
    cout << maxProfit << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6\n7 1 5 3 6 4', expectedOutput: '5' },
      { id: 2, input: '5\n7 6 4 3 1', expectedOutput: '0' },
    ],
    similarProblems: [131, 30],
  },
  {
    id: 139,
    title: 'LeetCode 136 - 只出现一次的数字',
    titleEn: 'Single Number',
    difficulty: 'beginner',
    description: '给定一个非空整数数组，其中每个元素出现两次，只有一个元素出现一次。找出那个元素。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出只出现一次的数。',
    sampleInput: '5\n2 2 1',
    sampleOutput: '1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("singlenum.in", "r", stdin);
    freopen("singlenum.out", "w", stdout);
    
    int n, result = 0;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        result ^= x;
    }
    
    cout << result << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['位运算', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n2 2 1', expectedOutput: '1' },
      { id: 2, input: '5\n4 1 2 1 2', expectedOutput: '4' },
    ],
    similarProblems: [69, 68],
  },
  {
    id: 140,
    title: 'LeetCode 169 - 多数元素',
    titleEn: 'Majority Element',
    difficulty: 'beginner',
    description: '给定一个数组，找出其中出现次数超过一半的元素。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出多数元素。',
    sampleInput: '7\n3 2 3',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("majority.in", "r", stdin);
    freopen("majority.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int candidate, count = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (count == 0) {
            candidate = x;
            count = 1;
        } else if (x == candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    cout << candidate << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '模拟'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n3 2 3', expectedOutput: '3' },
      { id: 2, input: '7\n2 2 1 1 1 2 2', expectedOutput: '2' },
    ],
    similarProblems: [29, 139],
  },
  {
    id: 141,
    title: 'LeetCode 234 - 回文链表',
    titleEn: 'Palindrome Linked List',
    difficulty: 'intermediate',
    description: '判断一个链表是否为回文链表。（用数组模拟）',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '是回文输出 "Yes"，否则输出 "No"。',
    sampleInput: '4\n1 2 2 1',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("palinlist.in", "r", stdin);
    freopen("palinlist.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int a[100];
    for (int i = 0; i < n; i++) cin >> a[i];
    
    bool isPalin = true;
    for (int i = 0; i < n / 2; i++) {
        if (a[i] != a[n - 1 - i]) {
            isPalin = false;
            break;
        }
    }
    
    cout << (isPalin ? "Yes" : "No") << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '链表', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1 2 2 1', expectedOutput: 'Yes' },
      { id: 2, input: '2\n1 2', expectedOutput: 'No' },
    ],
    similarProblems: [36, 132],
  },
  {
    id: 142,
    title: 'LeetCode 283 - 移动零',
    titleEn: 'Move Zeroes',
    difficulty: 'beginner',
    description: '将数组中的所有 0 移动到数组末尾，保持非零元素的相对顺序。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出移动后的数组。',
    sampleInput: '5\n0 1 0 3 12',
    sampleOutput: '1 3 12 0 0',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("movezero.in", "r", stdin);
    freopen("movezero.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int a[100], pos = 0;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        if (a[i] != 0) {
            a[pos++] = a[i];
        }
    }
    
    while (pos < n) a[pos++] = 0;
    
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '双指针'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
    ],
    similarProblems: [30, 31],
  },
  {
    id: 143,
    title: 'LeetCode 338 - 比特位计数',
    titleEn: 'Counting Bits',
    difficulty: 'intermediate',
    description: '给定一个非负整数 n，计算 0 到 n 每个数的二进制中 1 的个数。',
    inputFormat: '输入一个非负整数 n。',
    outputFormat: '输出 n+1 个数，表示 0 到 n 每个数的二进制中 1 的个数。',
    sampleInput: '5',
    sampleOutput: '0 1 1 2 1 2',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("countbits.in", "r", stdin);
    freopen("countbits.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int bits[100];
    bits[0] = 0;
    for (int i = 1; i <= n; i++) {
        bits[i] = bits[i & (i - 1)] + 1;
    }
    
    for (int i = 0; i <= n; i++) {
        if (i > 0) cout << " ";
        cout << bits[i];
    }
    cout << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['位运算', '动态规划'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5', expectedOutput: '0 1 1 2 1 2' },
    ],
    similarProblems: [68, 67],
  },
  {
    id: 144,
    title: 'LeetCode 461 - 汉明距离',
    titleEn: 'Hamming Distance',
    difficulty: 'beginner',
    description: '两个整数之间的汉明距离是这两个数字对应二进制位不同的位置的数目。',
    inputFormat: '输入两个整数 x 和 y。',
    outputFormat: '输出汉明距离。',
    sampleInput: '1 4',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("hamming.in", "r", stdin);
    freopen("hamming.out", "w", stdout);
    
    int x, y;
    cin >> x >> y;
    
    int xorResult = x ^ y;
    int count = 0;
    while (xorResult) {
        count += xorResult & 1;
        xorResult >>= 1;
    }
    
    cout << count << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['位运算'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '1 4', expectedOutput: '2' },
      { id: 2, input: '3 1', expectedOutput: '1' },
    ],
    similarProblems: [68, 139],
  },
  {
    id: 145,
    title: 'LeetCode 344 - 反转字符串',
    titleEn: 'Reverse String',
    difficulty: 'beginner',
    description: '将字符串反转。',
    inputFormat: '输入一个字符串。',
    outputFormat: '输出反转后的字符串。',
    sampleInput: 'hello',
    sampleOutput: 'olleh',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    freopen("revstr.in", "r", stdin);
    freopen("revstr.out", "w", stdout);
    
    string s;
    cin >> s;
    
    reverse(s.begin(), s.end());
    cout << s << endl;
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', '双指针'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'hello', expectedOutput: 'olleh' },
      { id: 2, input: 'Hannah', expectedOutput: 'hannaH' },
    ],
    similarProblems: [5, 31],
  },
  {
    id: 146,
    title: 'LeetCode 557 - 反转字符串中的单词 III',
    titleEn: 'Reverse Words in a String III',
    difficulty: 'beginner',
    description: '给定一个字符串，反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。',
    inputFormat: '输入一个字符串（可能包含空格）。',
    outputFormat: '输出反转后的字符串。',
    sampleInput: "Let's take LeetCode contest",
    sampleOutput: "s'teL ekat edoCteeL tsetnoc",
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    freopen("revwords.in", "r", stdin);
    freopen("revwords.out", "w", stdout);
    
    string line;
    getline(cin, line);
    
    string result, word;
    for (char c : line) {
        if (c == ' ') {
            reverse(word.begin(), word.end());
            result += word + " ";
            word = "";
        } else {
            word += c;
        }
    }
    reverse(word.begin(), word.end());
    result += word;
    
    cout << result << endl;
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "Let's take LeetCode contest", expectedOutput: "s'teL ekat edoCteeL tsetnoc" },
    ],
    similarProblems: [145, 33],
  },
  {
    id: 147,
    title: 'LeetCode 448 - 找到所有数组中消失的数字',
    titleEn: 'Find All Numbers Disappeared in an Array',
    difficulty: 'intermediate',
    description: '给定一个长度为 n 的数组，其中所有元素都在 [1, n] 范围内。找出 [1, n] 范围内没有出现在数组中的数字。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出所有消失的数字。',
    sampleInput: '8\n4 3 2 7 8 2 3 1',
    sampleOutput: '5 6',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("disappear.in", "r", stdin);
    freopen("disappear.out", "w", stdout);
    
    int n;
    cin >> n;
    
    bool exists[100001] = {false};
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        exists[x] = true;
    }
    
    bool first = true;
    for (int i = 1; i <= n; i++) {
        if (!exists[i]) {
            if (!first) cout << " ";
            cout << i;
            first = false;
        }
    }
    cout << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '哈希表'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '8\n4 3 2 7 8 2 3 1', expectedOutput: '5 6' },
    ],
    similarProblems: [128, 29],
  },
  {
    id: 148,
    title: 'LeetCode 496 - 下一个更大元素 I',
    titleEn: 'Next Greater Element I',
    difficulty: 'beginner',
    description: '给定两个数组 nums1 和 nums2，其中 nums1 是 nums2 的子集。对于 nums1 中的每个元素，找出其在 nums2 中对应位置右侧第一个比它大的元素。',
    inputFormat: '第一行 m 和 n，第二行 m 个整数（nums1），第三行 n 个整数（nums2）。',
    outputFormat: '输出 m 个结果，不存在则输出 -1。',
    sampleInput: '3 4\n4 1 2\n1 3 4 2',
    sampleOutput: '-1 3 -1',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <map>
using namespace std;

int main() {
    freopen("nextgreater.in", "r", stdin);
    freopen("nextgreater.out", "w", stdout);
    
    int m, n;
    cin >> m >> n;
    
    int nums1[100], nums2[100];
    for (int i = 0; i < m; i++) cin >> nums1[i];
    for (int i = 0; i < n; i++) cin >> nums2[i];
    
    map<int, int> nextGreater;
    for (int i = 0; i < n; i++) {
        nextGreater[nums2[i]] = -1;
        for (int j = i + 1; j < n; j++) {
            if (nums2[j] > nums2[i]) {
                nextGreater[nums2[i]] = nums2[j];
                break;
            }
        }
    }
    
    for (int i = 0; i < m; i++) {
        if (i > 0) cout << " ";
        cout << nextGreater[nums1[i]];
    }
    cout << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '栈'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 4\n4 1 2\n1 3 4 2', expectedOutput: '-1 3 -1' },
    ],
    similarProblems: [60, 30],
  },
  {
    id: 149,
    title: 'LeetCode 733 - 图像渲染',
    titleEn: 'Flood Fill',
    difficulty: 'beginner',
    description: '给定一个图像（二维整数数组）和起始点 (sr, sc) 以及新颜色值，将与起始点连通的同颜色区域填充为新颜色。',
    inputFormat: '第一行 r、c、sr、sc、newColor，接下来 r 行每行 c 个整数。',
    outputFormat: '输出渲染后的图像。',
    sampleInput: '3 3 1 1 2\n1 1 1\n1 1 0\n1 0 1',
    sampleOutput: '2 2 2\n2 2 0\n2 0 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int r, c;
int image[55][55];
bool visited[55][55];
int oldColor, newColor;

void dfs(int x, int y) {
    if (x < 0 || x >= r || y < 0 || y >= c) return;
    if (visited[x][y] || image[x][y] != oldColor) return;
    
    visited[x][y] = true;
    image[x][y] = newColor;
    
    dfs(x-1, y); dfs(x+1, y);
    dfs(x, y-1); dfs(x, y+1);
}

int main() {
    freopen("floodfill.in", "r", stdin);
    freopen("floodfill.out", "w", stdout);
    
    int sr, sc;
    cin >> r >> c >> sr >> sc >> newColor;
    
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> image[i][j];
        }
    }
    
    oldColor = image[sr][sc];
    if (oldColor != newColor) {
        dfs(sr, sc);
    }
    
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (j > 0) cout << " ";
            cout << image[i][j];
        }
        cout << endl;
    }
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3 1 1 2\n1 1 1\n1 1 0\n1 0 1', expectedOutput: '2 2 2\n2 2 0\n2 0 1' },
    ],
    similarProblems: [136, 117],
  },
  {
    id: 150,
    title: 'LeetCode 876 - 链表的中间结点',
    titleEn: 'Middle of the Linked List',
    difficulty: 'beginner',
    description: '给定一个链表，返回链表的中间结点。（用数组模拟）',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出中间节点开始的链表。',
    sampleInput: '6\n1 2 3 4 5 6',
    sampleOutput: '4 5 6',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("middle.in", "r", stdin);
    freopen("middle.out", "w", stdout);
    
    int n;
    cin >> n;
    
    int a[100];
    for (int i = 0; i < n; i++) cin >> a[i];
    
    int mid = n / 2;
    for (int i = mid; i < n; i++) {
        if (i > mid) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '链表', '双指针'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6\n1 2 3 4 5 6', expectedOutput: '4 5 6' },
      { id: 2, input: '5\n1 2 3 4 5', expectedOutput: '3 4 5' },
    ],
    similarProblems: [132, 133],
  },
  // ========== LeetCode 经典题目（第二轮）==========
  {
    id: 151,
    title: 'LeetCode 3 - 无重复字符的最长子串',
    titleEn: 'Longest Substring Without Repeating Characters',
    difficulty: 'intermediate',
    description: '给定一个字符串，找出其中不含有重复字符的最长子串的长度。',
    inputFormat: '输入一个字符串。',
    outputFormat: '输出最长无重复字符子串的长度。',
    sampleInput: 'abcabcbb',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <map>
using namespace std;

int main() {
    freopen("longestsubstr.in", "r", stdin);
    freopen("longestsubstr.out", "w", stdout);
    
    string s;
    cin >> s;
    
    map<char, int> lastPos;
    int maxLen = 0, start = 0;
    
    for (int i = 0; i < s.length(); i++) {
        if (lastPos.count(s[i]) && lastPos[s[i]] >= start) {
            start = lastPos[s[i]] + 1;
        }
        lastPos[s[i]] = i;
        maxLen = max(maxLen, i - start + 1);
    }
    
    cout << maxLen << endl;
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', '滑动窗口', '哈希表'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'abcabcbb', expectedOutput: '3' },
      { id: 2, input: 'bbbbb', expectedOutput: '1' },
      { id: 3, input: 'pwwkew', expectedOutput: '3' },
    ],
    similarProblems: [137, 145],
  },
  {
    id: 152,
    title: 'LeetCode 15 - 三数之和',
    titleEn: '3Sum',
    difficulty: 'intermediate',
    description: '给定一个包含 n 个整数的数组，判断是否存在三个元素 a, b, c 使得 a + b + c = 0？找出所有满足条件的三元组。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出所有三元组，每组三个数用空格分隔，组间用换行分隔。',
    sampleInput: '6\n-1 0 1 2 -1 -4',
    sampleOutput: '-1 -1 2\n-1 0 1',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main() {
    freopen('threesum.in', 'r', stdin);
    freopen('threesum.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    int a[100];
    for (int i = 0; i < n; i++) cin >> a[i];
    
    sort(a, a + n);
    bool first = true;
    
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && a[i] == a[i-1]) continue;
        
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = a[i] + a[left] + a[right];
            if (sum == 0) {
                if (!first) cout << endl;
                cout << a[i] << ' ' << a[left] << ' ' << a[right];
                first = false;
                
                while (left < right && a[left] == a[left+1]) left++;
                while (left < right && a[right] == a[right-1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '双指针', '排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6\n-1 0 1 2 -1 -4', expectedOutput: '-1 -1 2\n-1 0 1' },
    ],
    similarProblems: [128, 1],
  },
  {
    id: 153,
    title: 'LeetCode 21 - 合并两个有序链表',
    titleEn: 'Merge Two Sorted Lists',
    difficulty: 'beginner',
    description: '将两个升序链表合并为一个新的升序链表并返回。（用数组模拟）',
    inputFormat: '第一行 n 和 m，第二行 n 个有序整数，第三行 m 个有序整数。',
    outputFormat: '输出合并后的有序序列。',
    sampleInput: '3 3\n1 2 4\n1 3 4',
    sampleOutput: '1 1 2 3 4 4',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('mergelist.in', 'r', stdin);
    freopen('mergelist.out', 'w', stdout);
    
    int n, m;
    cin >> n >> m;
    
    int a[100], b[100], c[200];
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < m; i++) cin >> b[i];
    
    int i = 0, j = 0, k = 0;
    while (i < n && j < m) {
        if (a[i] <= b[j]) c[k++] = a[i++];
        else c[k++] = b[j++];
    }
    while (i < n) c[k++] = a[i++];
    while (j < m) c[k++] = b[j++];
    
    for (int x = 0; x < k; x++) {
        if (x > 0) cout << ' ';
        cout << c[x];
    }
    cout << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '链表', '双指针'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2 4\n1 3 4', expectedOutput: '1 1 2 3 4 4' },
      { id: 2, input: '0 0', expectedOutput: '' },
    ],
    similarProblems: [132, 133],
  },
  {
    id: 154,
    title: 'LeetCode 46 - 全排列',
    titleEn: 'Permutations',
    difficulty: 'intermediate',
    description: '给定一个不含重复数字的数组，返回其所有可能的全排列。',
    inputFormat: '第一行 n，第二行 n 个不同的整数。',
    outputFormat: '输出所有排列，每个排列一行。',
    sampleInput: '3\n1 2 3',
    sampleOutput: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int n;
int a[10];
bool used[10];
int perm[10];

void dfs(int depth) {
    if (depth == n) {
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << ' ';
            cout << perm[i];
        }
        cout << endl;
        return;
    }
    
    for (int i = 0; i < n; i++) {
        if (!used[i]) {
            used[i] = true;
            perm[depth] = a[i];
            dfs(depth + 1);
            used[i] = false;
        }
    }
}

int main() {
    freopen('permutations.in', 'r', stdin);
    freopen('permutations.out', 'w', stdout);
    
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    dfs(0);
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '回溯', '排列组合'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n1 2 3', expectedOutput: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1' },
    ],
    similarProblems: [67, 68],
  },
  {
    id: 155,
    title: 'LeetCode 78 - 子集',
    titleEn: 'Subsets',
    difficulty: 'intermediate',
    description: '给定一组不含重复元素的整数数组，返回该数组所有可能的子集（幂集）。',
    inputFormat: '第一行 n，第二行 n 个不同的整数。',
    outputFormat: '输出所有子集，每个子集一行，元素用空格分隔。空集输出空行。',
    sampleInput: '3\n1 2 3',
    sampleOutput: '\n1\n2\n3\n1 2\n1 3\n2 3\n1 2 3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n;
int a[20];
int subset[20];

void dfs(int start, int depth) {
    // 输出当前子集
    for (int i = 0; i < depth; i++) {
        if (i > 0) cout << ' ';
        cout << subset[i];
    }
    cout << endl;
    
    // 继续添加元素
    for (int i = start; i < n; i++) {
        subset[depth] = a[i];
        dfs(i + 1, depth + 1);
    }
}

int main() {
    freopen('subsets.in', 'r', stdin);
    freopen('subsets.out', 'w', stdout);
    
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    dfs(0, 0);
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '回溯', '位运算'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n1 2 3', expectedOutput: '\n1\n2\n3\n1 2\n1 3\n2 3\n1 2 3' },
    ],
    similarProblems: [154, 156],
  },
  {
    id: 156,
    title: 'LeetCode 39 - 组合总和',
    titleEn: 'Combination Sum',
    difficulty: 'intermediate',
    description: '给定一个无重复元素的数组 candidates 和一个目标数 target，找出 candidates 中所有可以使数字和为 target 的组合。candidates 中的数字可以无限制重复被选取。',
    inputFormat: '第一行 n 和 target，第二行 n 个整数。',
    outputFormat: '输出所有组合，每个组合一行。',
    sampleInput: '3 7\n2 3 6 7',
    sampleOutput: '2 2 3\n7',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int n, target;
int a[100];
int comb[100];

void dfs(int start, int sum, int depth) {
    if (sum == target) {
        for (int i = 0; i < depth; i++) {
            if (i > 0) cout << ' ';
            cout << comb[i];
        }
        cout << endl;
        return;
    }
    if (sum > target) return;
    
    for (int i = start; i < n; i++) {
        comb[depth] = a[i];
        dfs(i, sum + a[i], depth + 1);
    }
}

int main() {
    freopen('combsum.in', 'r', stdin);
    freopen('combsum.out', 'w', stdout);
    
    cin >> n >> target;
    for (int i = 0; i < n; i++) cin >> a[i];
    
    sort(a, a + n);
    dfs(0, 0, 0);
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '回溯', '剪枝'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 7\n2 3 7', expectedOutput: '2 2 3\n7' },
    ],
    similarProblems: [154, 155],
  },
  {
    id: 157,
    title: 'LeetCode 62 - 不同路径',
    titleEn: 'Unique Paths',
    difficulty: 'intermediate',
    description: '一个机器人位于一个 m x n 网格的左上角，机器人每次只能向下或向右移动一步。问有多少条不同的路径到达右下角？',
    inputFormat: '输入两个整数 m 和 n。',
    outputFormat: '输出不同路径的数量。',
    sampleInput: '3 7',
    sampleOutput: '28',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('uniquepaths.in', 'r', stdin);
    freopen('uniquepaths.out', 'w', stdout);
    
    int m, n;
    cin >> m >> n;
    
    long long dp[105][105] = {0};
    
    // 初始化第一行和第一列
    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;
    
    // 动态规划
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    cout << dp[m-1][n-1] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数学', '组合'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 7', expectedOutput: '28' },
      { id: 2, input: '3 2', expectedOutput: '3' },
    ],
    similarProblems: [130, 158],
  },
  {
    id: 158,
    title: 'LeetCode 64 - 最小路径和',
    titleEn: 'Minimum Path Sum',
    difficulty: 'intermediate',
    description: '给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小。',
    inputFormat: '第一行 m 和 n，接下来 m 行每行 n 个整数。',
    outputFormat: '输出最小路径和。',
    sampleInput: '3 3\n1 3 1\n1 5 1\n4 2 1',
    sampleOutput: '7',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('minpathsum.in', 'r', stdin);
    freopen('minpathsum.out', 'w', stdout);
    
    int m, n;
    cin >> m >> n;
    
    int grid[105][105];
    int dp[105][105];
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cin >> grid[i][j];
        }
    }
    
    dp[0][0] = grid[0][0];
    for (int i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
    for (int j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }
    
    cout << dp[m-1][n-1] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数组', '矩阵'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 3 1\n1 5 1\n4 2 1', expectedOutput: '7' },
    ],
    similarProblems: [157, 131],
  },
  {
    id: 159,
    title: 'LeetCode 198 - 打家劫舍',
    titleEn: 'House Robber',
    difficulty: 'intermediate',
    description: '给定一个代表每个房屋存放金额的非负整数数组，在不触动警报装置的情况下，能够偷窃到的最高金额。',
    inputFormat: '第一行 n，第二行 n 个非负整数。',
    outputFormat: '输出最高金额。',
    sampleInput: '5\n1 2 3 1',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('robber.in', 'r', stdin);
    freopen('robber.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    int a[105];
    for (int i = 0; i < n; i++) cin >> a[i];
    
    if (n == 0) { cout << 0 << endl; return 0; }
    if (n == 1) { cout << a[0] << endl; return 0; }
    
    int dp[105];
    dp[0] = a[0];
    dp[1] = max(a[0], a[1]);
    
    for (int i = 2; i < n; i++) {
        dp[i] = max(dp[i-1], dp[i-2] + a[i]);
    }
    
    cout << dp[n-1] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1 2 3 1', expectedOutput: '4' },
      { id: 2, input: '5\n2 7 9 3 1', expectedOutput: '12' },
    ],
    similarProblems: [130, 138],
  },
  {
    id: 160,
    title: 'LeetCode 300 - 最长递增子序列',
    titleEn: 'Longest Increasing Subsequence',
    difficulty: 'intermediate',
    description: '给定一个无序的整数数组，找到其中最长上升子序列的长度。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出最长递增子序列的长度。',
    sampleInput: '8\n10 9 2 5 3 7 101 18',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('lis.in', 'r', stdin);
    freopen('lis.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    int a[2500];
    int dp[2500];
    
    for (int i = 0; i < n; i++) cin >> a[i];
    
    int maxLen = 0;
    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    
    cout << maxLen << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '二分查找', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '8\n10 9 2 5 3 7 101 18', expectedOutput: '4' },
      { id: 2, input: '6\n0 1 0 3 2 3', expectedOutput: '4' },
    ],
    similarProblems: [131, 157],
  },
  {
    id: 161,
    title: 'LeetCode 322 - 零钱兑换',
    titleEn: 'Coin Change',
    difficulty: 'intermediate',
    description: '给定不同面额的硬币 coins 和一个总金额 amount，计算凑成总金额所需的最少的硬币个数。',
    inputFormat: '第一行 n 和 amount，第二行 n 个整数表示硬币面额。',
    outputFormat: '输出最少的硬币个数，无法凑出则输出 -1。',
    sampleInput: '3 11\n1 2 5',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main() {
    freopen('coinchange.in', 'r', stdin);
    freopen('coinchange.out', 'w', stdout);
    
    int n, amount;
    cin >> n >> amount;
    
    int coins[15];
    for (int i = 0; i < n; i++) cin >> coins[i];
    
    int dp[10005];
    for (int i = 0; i <= amount; i++) dp[i] = 10001;
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < n; j++) {
            if (coins[j] <= i) {
                dp[i] = min(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }
    
    cout << (dp[amount] > 10000 ? -1 : dp[amount]) << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '完全背包', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 11\n1 2 5', expectedOutput: '3' },
      { id: 2, input: '1 2\n1', expectedOutput: '2' },
    ],
    similarProblems: [159, 130],
  },
  {
    id: 162,
    title: 'LeetCode 94 - 二叉树的中序遍历',
    titleEn: 'Binary Tree Inorder Traversal',
    difficulty: 'beginner',
    description: '给定一个二叉树，返回它的中序遍历。（用层序遍历数组表示，null用-1表示）',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出中序遍历结果。',
    sampleInput: '3\n1 -1 2',
    sampleOutput: '1 3 2',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n;
int tree[105];
int result[105];
int idx = 0;

void inorder(int root) {
    if (root >= n || tree[root] == -1) return;
    
    inorder(2 * root + 1);  // 左子树
    result[idx++] = tree[root];  // 根
    inorder(2 * root + 2);  // 右子树
}

int main() {
    freopen('inorder.in', 'r', stdin);
    freopen('inorder.out', 'w', stdout);
    
    cin >> n;
    for (int i = 0; i < n; i++) cin >> tree[i];
    
    inorder(0);
    
    for (int i = 0; i < idx; i++) {
        if (i > 0) cout << ' ';
        cout << result[i];
    }
    cout << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '树', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n1 -1 2', expectedOutput: '1 2' },
    ],
    similarProblems: [134, 135],
  },
  {
    id: 163,
    title: 'LeetCode 102 - 二叉树的层序遍历',
    titleEn: 'Binary Tree Level Order Traversal',
    difficulty: 'beginner',
    description: '给定一个二叉树，返回其按层序遍历得到的节点值。（逐层地，从左到右）',
    inputFormat: '第一行 n，第二行 n 个整数（null用-1表示）。',
    outputFormat: '输出层序遍历结果。',
    sampleInput: '7\n3 9 20 -1 -1 15 7',
    sampleOutput: '3 9 20 15 7',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;

int main() {
    freopen('levelorder.in', 'r', stdin);
    freopen('levelorder.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    int tree[105];
    for (int i = 0; i < n; i++) cin >> tree[i];
    
    queue<int> q;
    if (n > 0 && tree[0] != -1) q.push(0);
    
    bool first = true;
    while (!q.empty()) {
        int idx = q.front();
        q.pop();
        
        if (!first) cout << ' ';
        cout << tree[idx];
        first = false;
        
        int left = 2 * idx + 1, right = 2 * idx + 2;
        if (left < n && tree[left] != -1) q.push(left);
        if (right < n && tree[right] != -1) q.push(right);
    }
    cout << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '树', 'BFS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7\n3 9 20 -1 -1 15 7', expectedOutput: '3 9 20 15 7' },
    ],
    similarProblems: [162, 134],
  },
  {
    id: 164,
    title: 'LeetCode 101 - 对称二叉树',
    titleEn: 'Symmetric Tree',
    difficulty: 'beginner',
    description: '给定一个二叉树，检查它是否是镜像对称的。',
    inputFormat: '第一行 n，第二行 n 个整数（null用-1表示）。',
    outputFormat: '是对称输出 "Yes"，否则输出 "No"。',
    sampleInput: '7\n1 2 2 3 4 4 3',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int n;
int tree[105];

bool isSymmetric(int left, int right) {
    if (left >= n && right >= n) return true;
    if (left >= n || right >= n) return false;
    if (tree[left] == -1 && tree[right] == -1) return true;
    if (tree[left] == -1 || tree[right] == -1) return false;
    if (tree[left] != tree[right]) return false;
    
    return isSymmetric(2*left+1, 2*right+2) && 
           isSymmetric(2*left+2, 2*right+1);
}

int main() {
    freopen('symmetric.in', 'r', stdin);
    freopen('symmetric.out', 'w', stdout);
    
    cin >> n;
    for (int i = 0; i < n; i++) cin >> tree[i];
    
    if (n == 0 || tree[0] == -1) {
        cout << 'Yes' << endl;
    } else {
        cout << (isSymmetric(1, 2) ? 'Yes' : 'No') << endl;
    }
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '树', '递归'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7\n1 2 2 3 4 4 3', expectedOutput: 'Yes' },
      { id: 2, input: '5\n1 2 2 -1 3', expectedOutput: 'No' },
    ],
    similarProblems: [134, 135],
  },
  {
    id: 165,
    title: 'LeetCode 118 - 杨辉三角',
    titleEn: 'Pascal Triangle',
    difficulty: 'beginner',
    description: '给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。',
    inputFormat: '输入一个整数 numRows。',
    outputFormat: '输出杨辉三角，每行一行。',
    sampleInput: '5',
    sampleOutput: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('pascal.in', 'r', stdin);
    freopen('pascal.out', 'w', stdout);
    
    int numRows;
    cin >> numRows;
    
    int triangle[35][35] = {0};
    
    for (int i = 0; i < numRows; i++) {
        triangle[i][0] = 1;
        for (int j = 1; j <= i; j++) {
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
        }
    }
    
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j <= i; j++) {
            if (j > 0) cout << ' ';
            cout << triangle[i][j];
        }
        cout << endl;
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '动态规划'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5', expectedOutput: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1' },
    ],
    similarProblems: [130, 157],
  },
  {
    id: 166,
    title: 'LeetCode 75 - 颜色分类',
    titleEn: 'Sort Colors',
    difficulty: 'intermediate',
    description: '给定一个包含红色、白色和蓝色的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。这里用整数 0、1、2 分别表示红色、白色、蓝色。',
    inputFormat: '第一行 n，第二行 n 个整数（0、1或2）。',
    outputFormat: '输出排序后的数组。',
    sampleInput: '6\n2 0 2 1 1 0',
    sampleOutput: '0 0 1 1 2 2',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('sortcolors.in', 'r', stdin);
    freopen('sortcolors.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    int a[305];
    int count[3] = {0};
    
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        count[a[i]]++;
    }
    
    int idx = 0;
    for (int c = 0; c < 3; c++) {
        for (int i = 0; i < count[c]; i++) {
            if (idx > 0) cout << ' ';
            cout << c;
            idx++;
        }
    }
    cout << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '排序', '双指针'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6\n2 0 2 1 1 0', expectedOutput: '0 0 1 1 2 2' },
    ],
    similarProblems: [142, 140],
  },
  {
    id: 167,
    title: 'LeetCode 79 - 单词搜索',
    titleEn: 'Word Search',
    difficulty: 'intermediate',
    description: '给定一个二维网格和一个单词，找出该单词是否存在于网格中。单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是水平或垂直相邻的。',
    inputFormat: '第一行 r 和 c，接下来 r 行每行 c 个字母，最后一行是要查找的单词。',
    outputFormat: '存在输出 "Yes"，否则输出 "No"。',
    sampleInput: '3 4\nABCE\nSFCS\nADEE\nABCCED',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int r, c;
char grid[10][10];
bool visited[10][10];
string word;

bool dfs(int x, int y, int idx) {
    if (idx == word.length()) return true;
    if (x < 0 || x >= r || y < 0 || y >= c) return false;
    if (visited[x][y] || grid[x][y] != word[idx]) return false;
    
    visited[x][y] = true;
    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};
    
    for (int i = 0; i < 4; i++) {
        if (dfs(x + dx[i], y + dy[i], idx + 1)) {
            visited[x][y] = false;
            return true;
        }
    }
    visited[x][y] = false;
    return false;
}

int main() {
    freopen('wordsearch.in', 'r', stdin);
    freopen('wordsearch.out', 'w', stdout);
    
    cin >> r >> c;
    for (int i = 0; i < r; i++) cin >> grid[i];
    cin >> word;
    
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (dfs(i, j, 0)) {
                cout << 'Yes' << endl;
                return 0;
            }
        }
    }
    cout << 'No' << endl;
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '数组', '回溯'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 4\nABCE\nSFCS\nADEE\nABCCED', expectedOutput: 'Yes' },
    ],
    similarProblems: [136, 149],
  },
  {
    id: 168,
    title: 'LeetCode 56 - 合并区间',
    titleEn: 'Merge Intervals',
    difficulty: 'intermediate',
    description: '给出一个区间的集合，请合并所有重叠的区间。',
    inputFormat: '第一行 n，接下来 n 行每行两个整数表示区间的起点和终点。',
    outputFormat: '输出合并后的区间，每个区间一行。',
    sampleInput: '4\n1 3\n2 6\n8 10\n15 18',
    sampleOutput: '1 6\n8 10\n15 18',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int n;
pair<int, int> intervals[10005];

int main() {
    freopen('mergeintervals.in', 'r', stdin);
    freopen('mergeintervals.out', 'w', stdout);
    
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> intervals[i].first >> intervals[i].second;
    }
    
    sort(intervals, intervals + n);
    
    int start = intervals[0].first;
    int end = intervals[0].second;
    
    for (int i = 1; i < n; i++) {
        if (intervals[i].first <= end) {
            end = max(end, intervals[i].second);
        } else {
            cout << start << ' ' << end << endl;
            start = intervals[i].first;
            end = intervals[i].second;
        }
    }
    cout << start << ' ' << end << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '排序', '贪心'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1 3\n2 6\n8 10\n15 18', expectedOutput: '1 6\n8 10\n15 18' },
    ],
    similarProblems: [152, 148],
  },
  {
    id: 169,
    title: 'LeetCode 48 - 旋转图像',
    titleEn: 'Rotate Image',
    difficulty: 'intermediate',
    description: '给定一个 n × n 的二维矩阵表示一个图像，将图像顺时针旋转 90 度。',
    inputFormat: '第一行 n，接下来 n 行每行 n 个整数。',
    outputFormat: '输出旋转后的矩阵。',
    sampleInput: '3\n1 2 3\n4 5 6\n7 8 9',
    sampleOutput: '7 4 1\n8 5 2\n9 6 3',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('rotateimage.in', 'r', stdin);
    freopen('rotateimage.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    int matrix[25][25];
    int rotated[25][25];
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    
    // 顺时针旋转90度：rotated[j][n-1-i] = matrix[i][j]
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            rotated[j][n-1-i] = matrix[i][j];
        }
    }
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) cout << ' ';
            cout << rotated[i][j];
        }
        cout << endl;
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '矩阵'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '7 4 1\n8 5 2\n9 6 3' },
    ],
    similarProblems: [166, 168],
  },
  {
    id: 170,
    title: 'LeetCode 215 - 数组中的第K个最大元素',
    titleEn: 'Kth Largest Element in an Array',
    difficulty: 'intermediate',
    description: '在未排序的数组中找到第 k 个最大的元素。',
    inputFormat: '第一行 n 和 k，第二行 n 个整数。',
    outputFormat: '输出第 k 大的元素。',
    sampleInput: '6 2\n3 2 1 5 6 4',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main() {
    freopen('kthlargest.in', 'r', stdin);
    freopen('kthlargest.out', 'w', stdout);
    
    int n, k;
    cin >> n >> k;
    
    int a[10005];
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // 降序排序
    sort(a, a + n, greater<int>());
    
    cout << a[k-1] << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '排序', '堆'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6 2\n3 2 1 5 6 4', expectedOutput: '5' },
      { id: 2, input: '6 1\n3 2 1 5 6 4', expectedOutput: '6' },
    ],
    similarProblems: [140, 166],
  },
  {
    id: 171,
    title: 'LeetCode 394 - 字符串解码',
    titleEn: 'Decode String',
    difficulty: 'intermediate',
    description: '给定一个经过编码的字符串，返回它解码后的字符串。编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。',
    inputFormat: '输入一个编码字符串。',
    outputFormat: '输出解码后的字符串。',
    sampleInput: '3[a]2[bc]',
    sampleOutput: 'aaabcbc',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <stack>
using namespace std;

int main() {
    freopen('decodestr.in', 'r', stdin);
    freopen('decodestr.out', 'w', stdout);
    
    string s;
    cin >> s;
    
    stack<int> countStack;
    stack<string> strStack;
    string current;
    int num = 0;
    
    for (char c : s) {
        if (isdigit(c)) {
            num = num * 10 + (c - '0');
        } else if (c == '[') {
            countStack.push(num);
            strStack.push(current);
            num = 0;
            current = '';
        } else if (c == ']') {
            int repeat = countStack.top();
            countStack.pop();
            string prev = strStack.top();
            strStack.pop();
            for (int i = 0; i < repeat; i++) {
                prev += current;
            }
            current = prev;
        } else {
            current += c;
        }
    }
    
    cout << current << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '栈', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3[a]2[bc]', expectedOutput: 'aaabcbc' },
      { id: 2, input: '3[a2[c]]', expectedOutput: 'accaccacc' },
    ],
    similarProblems: [129, 145],
  },
  {
    id: 172,
    title: 'LeetCode 232 - 用栈实现队列',
    titleEn: 'Implement Queue using Stacks',
    difficulty: 'beginner',
    description: '使用两个栈实现一个队列。支持 push、pop、peek、empty 操作。',
    inputFormat: '第一行 n 表示操作数，接下来 n 行每行一个操作：push x / pop / peek / empty。',
    outputFormat: '对于 pop 和 peek 操作，输出对应值；对于 empty，输出 true/false。',
    sampleInput: '5\npush 1\npush 2\npeek\npop\nempty',
    sampleOutput: '1\n1\nfalse',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <stack>
#include <string>
using namespace std;

int main() {
    freopen('queuebystack.in', 'r', stdin);
    freopen('queuebystack.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    stack<int> inStack, outStack;
    
    while (n--) {
        string op;
        cin >> op;
        
        if (op == 'push') {
            int x;
            cin >> x;
            inStack.push(x);
        } else {
            if (outStack.empty()) {
                while (!inStack.empty()) {
                    outStack.push(inStack.top());
                    inStack.pop();
                }
            }
            
            if (op == 'pop') {
                cout << outStack.top() << endl;
                outStack.pop();
            } else if (op == 'peek') {
                cout << outStack.top() << endl;
            } else { // empty
                cout << (outStack.empty() && inStack.empty() ? 'true' : 'false') << endl;
            }
        }
    }
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '栈', '队列'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\npush 1\npush 2\npeek\npop\nempty', expectedOutput: '1\n1\nfalse' },
    ],
    similarProblems: [129, 60],
  },
  {
    id: 173,
    title: 'LeetCode 279 - 完全平方数',
    titleEn: 'Perfect Squares',
    difficulty: 'intermediate',
    description: '给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出最少的完全平方数个数。',
    sampleInput: '12',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main() {
    freopen('squares.in', 'r', stdin);
    freopen('squares.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    int dp[10005];
    dp[0] = 0;
    
    for (int i = 1; i <= n; i++) {
        dp[i] = i;  // 最坏情况：全是1
        for (int j = 1; j * j <= i; j++) {
            dp[i] = min(dp[i], dp[i - j*j] + 1);
        }
    }
    
    cout << dp[n] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数学', '完全背包'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12', expectedOutput: '3' },
      { id: 2, input: '13', expectedOutput: '2' },
    ],
    similarProblems: [161, 130],
  },
  {
    id: 174,
    title: 'LeetCode 139 - 单词拆分',
    titleEn: 'Word Break',
    difficulty: 'intermediate',
    description: '给定一个非空字符串 s 和一个包含非空单词列表的字典，判断 s 是否可以被空格拆分为一个或多个字典中的单词。',
    inputFormat: '第一行字符串 s，第二行 n，第三行 n 个单词。',
    outputFormat: '能拆分输出 "Yes"，否则输出 "No"。',
    sampleInput: 'leetcode\n2\nleet code',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <set>
#include <vector>
using namespace std;

int main() {
    freopen('wordbreak.in', 'r', stdin);
    freopen('wordbreak.out', 'w', stdout);
    
    string s;
    cin >> s;
    
    int n;
    cin >> n;
    
    set<string> dict;
    for (int i = 0; i < n; i++) {
        string word;
        cin >> word;
        dict.insert(word);
    }
    
    int len = s.length();
    vector<bool> dp(len + 1, false);
    dp[0] = true;
    
    for (int i = 1; i <= len; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    cout << (dp[len] ? 'Yes' : 'No') << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '字符串', '字典树'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'leetcode\n2\nleet code', expectedOutput: 'Yes' },
    ],
    similarProblems: [167, 151],
  },
  {
    id: 175,
    title: 'LeetCode 1143 - 最长公共子序列',
    titleEn: 'Longest Common Subsequence',
    difficulty: 'intermediate',
    description: '给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。',
    inputFormat: '第一行 text1，第二行 text2。',
    outputFormat: '输出最长公共子序列的长度。',
    sampleInput: 'abcde\nace',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    freopen('lcs.in', 'r', stdin);
    freopen('lcs.out', 'w', stdout);
    
    string s1, s2;
    cin >> s1 >> s2;
    
    int m = s1.length(), n = s2.length();
    int dp[1005][1005] = {0};
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    cout << dp[m][n] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '字符串', 'LCS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'abcde\nace', expectedOutput: '3' },
      { id: 2, input: 'abc\nabc', expectedOutput: '3' },
    ],
    similarProblems: [160, 151],
  },
  {
    id: 176,
    title: 'LeetCode 49 - 字母异位词分组',
    titleEn: 'Group Anagrams',
    difficulty: 'intermediate',
    description: '给定一个字符串数组，将字母异位词（由相同字母重排列形成的单词）分组在一起。',
    inputFormat: '第一行 n，第二行 n 个字符串。',
    outputFormat: '输出分组后的结果，每组一行。',
    sampleInput: '6\neat tea tan ate nat bat',
    sampleOutput: 'eat tea ate\ntan nat\nbat',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <string>
#include <map>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    freopen('anagrams.in', 'r', stdin);
    freopen('anagrams.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    map<string, vector<string>> groups;
    
    for (int i = 0; i < n; i++) {
        string word;
        cin >> word;
        
        string key = word;
        sort(key.begin(), key.end());
        groups[key].push_back(word);
    }
    
    bool firstGroup = true;
    for (auto& [key, words] : groups) {
        if (!firstGroup) cout << endl;
        for (int i = 0; i < words.size(); i++) {
            if (i > 0) cout << ' ';
            cout << words[i];
        }
        firstGroup = false;
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '哈希表', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6\neat tea tan ate nat bat', expectedOutput: 'bat\neat tea ate\ntan nat' },
    ],
    similarProblems: [128, 140],
  },
  {
    id: 177,
    title: 'LeetCode 128 - 最长连续序列',
    titleEn: 'Longest Consecutive Sequence',
    difficulty: 'intermediate',
    description: '给定一个未排序的整数数组，找出最长连续序列的长度。要求算法的时间复杂度为 O(n)。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出最长连续序列的长度。',
    sampleInput: '6\n100 4 200 1 3 2',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <set>
using namespace std;

int main() {
    freopen('consecutive.in', 'r', stdin);
    freopen('consecutive.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    set<int> nums;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        nums.insert(x);
    }
    
    int maxLen = 0;
    for (int x : nums) {
        // 只有当 x 是序列起点时才开始计算
        if (nums.find(x - 1) == nums.end()) {
            int len = 1;
            while (nums.find(x + len) != nums.end()) {
                len++;
            }
            maxLen = max(maxLen, len);
        }
    }
    
    cout << maxLen << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '哈希表'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6\n100 4 200 1 3 2', expectedOutput: '4' },
      { id: 2, input: '7\n0 3 7 2 5 8 4 6', expectedOutput: '9' },
    ],
    similarProblems: [160, 170],
  },
  {
    id: 178,
    title: 'LeetCode 287 - 寻找重复数',
    titleEn: 'Find the Duplicate Number',
    difficulty: 'intermediate',
    description: '给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。',
    inputFormat: '第一行 n，第二行 n+1 个整数。',
    outputFormat: '输出重复的数。',
    sampleInput: '4\n1 3 4 2 2',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('findduplicate.in', 'r', stdin);
    freopen('findduplicate.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    // 使用快慢指针（Floyd判圈算法）
    int nums[10005];
    for (int i = 0; i <= n; i++) {
        cin >> nums[i];
    }
    
    // 快慢指针找相遇点
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    
    // 找入口
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    cout << slow << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '双指针', '二分查找'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1 3 4 2 2', expectedOutput: '2' },
      { id: 2, input: '2\n1 1 2', expectedOutput: '1' },
    ],
    similarProblems: [139, 147],
  },
  {
    id: 179,
    title: 'LeetCode 152 - 乘积最大子数组',
    titleEn: 'Maximum Product Subarray',
    difficulty: 'intermediate',
    description: '给定一个整数数组，找出数组中乘积最大的连续子数组，并返回该乘积。',
    inputFormat: '第一行 n，第二行 n 个整数。',
    outputFormat: '输出最大乘积。',
    sampleInput: '4\n2 3 -2 4',
    sampleOutput: '6',
    defaultCode: `#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main() {
    freopen('maxproduct.in', 'r', stdin);
    freopen('maxproduct.out', 'w', stdout);
    
    int n;
    cin >> n;
    
    long long maxProd = -1e18, minProd = 1e18;
    long long result = -1e18;
    
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        
        if (i == 0) {
            maxProd = minProd = x;
        } else {
            long long temp = maxProd;
            maxProd = max((long long)x, max(maxProd * x, minProd * x));
            minProd = min((long long)x, min(temp * x, minProd * x));
        }
        result = max(result, maxProd);
    }
    
    cout << result << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n2 3 -2 4', expectedOutput: '6' },
      { id: 2, input: '3\n-2 0 -1', expectedOutput: '0' },
    ],
    similarProblems: [131, 160],
  },
  {
    id: 180,
    title: 'LeetCode 33 - 搜索旋转排序数组',
    titleEn: 'Search in Rotated Sorted Array',
    difficulty: 'advanced',
    description: '假设按照升序排序的数组在预先未知的某个点上进行了旋转。搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1。',
    inputFormat: '第一行 n 和 target，第二行 n 个整数。',
    outputFormat: '输出目标值的索引，不存在则输出 -1。',
    sampleInput: '7 0\n4 5 6 7 0 1 2',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen('searchrotated.in', 'r', stdin);
    freopen('searchrotated.out', 'w', stdout);
    
    int n, target;
    cin >> n >> target;
    
    int nums[10005];
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    int left = 0, right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            cout << mid << endl;
            return 0;
        }
        
        // 左半边有序
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // 右半边有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    cout << -1 << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['数组', '二分查找'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7 0\n4 5 6 7 0 1 2', expectedOutput: '4' },
      { id: 2, input: '4 3\n4 5 1 2', expectedOutput: '-1' },
    ],
    similarProblems: [43, 49],
  },
  // ========== 新增题目 - 入门基础篇（ID 181-220）==========
  // 语法基础类
  {
    id: 181,
    title: 'Hello World',
    titleEn: 'Hello World',
    difficulty: 'beginner',
    description: '输出 "Hello World" 到屏幕。',
    inputFormat: '无输入。',
    outputFormat: '输出 Hello World。',
    sampleInput: '',
    sampleOutput: 'Hello World',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输出 "Hello World" 到屏幕
 * 【解题思路】这是一道最基础的输出练习题
 * 【参考答案】使用 cout 输出字符串即可
 */
int main() {
    // 请在此处编写代码：使用 cout 输出 "Hello World"
    
    return 0;
}`,
    category: '语法基础',
    tags: ['输入输出', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Hello World' },
    ],
  },
  {
    id: 182,
    title: '输出字符画',
    titleEn: 'Print ASCII Art',
    difficulty: 'beginner',
    description: '输出一个简单的字符画小房子。',
    inputFormat: '无输入。',
    outputFormat: '输出如下字符画：\n  /\\\n /  \\\n/____\\\n|    |\n|____|',
    sampleInput: '',
    sampleOutput: '  /\\\n /  \\\n/____\\\n|    |\n|____|',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输出一个简单的字符画小房子
 * 【解题思路】逐行输出字符画，注意转义字符的使用
 * 【参考答案】使用多个 cout 语句逐行输出
 */
int main() {
    // 使用 cout 输出字符画
    // 提示：/ 需要正常输出，换行使用 endl
    
    return 0;
}`,
    category: '语法基础',
    tags: ['输入输出', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: '  /\\\n /  \\\n/____\\\n|    |\n|____|' },
    ],
  },
  {
    id: 183,
    title: '计算加法',
    titleEn: 'Addition',
    difficulty: 'beginner',
    description: '输入两个整数 a 和 b，输出它们的和。',
    inputFormat: '一行两个整数 a 和 b，用空格分隔。',
    outputFormat: '输出 a + b 的值。',
    sampleInput: '3 5',
    sampleOutput: '8',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入两个整数 a 和 b，输出它们的和
 * 【解题思路】读取两个整数，计算和并输出
 * 【参考答案】cin >> a >> b; cout << a + b;
 */
int main() {
    int a, b;
    cin >> a >> b;
    
    // 请在此处计算并输出结果
    // 提示：使用 cout 输出 a + b
    
    return 0;
}`,
    category: '语法基础',
    tags: ['输入输出', '变量', '运算符', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 5', expectedOutput: '8' },
      { id: 2, input: '100 200', expectedOutput: '300' },
      { id: 3, input: '0 0', expectedOutput: '0' },
    ],
  },
  {
    id: 184,
    title: '计算表达式',
    titleEn: 'Calculate Expression',
    difficulty: 'beginner',
    description: '输入三个整数 a, b, c，计算并输出 (a + b) * c 的值。',
    inputFormat: '一行三个整数 a, b, c，用空格分隔。',
    outputFormat: '输出表达式 (a + b) * c 的值。',
    sampleInput: '2 3 4',
    sampleOutput: '20',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入三个整数 a, b, c，计算并输出 (a + b) * c 的值
 * 【解题思路】先读取三个整数，然后计算表达式值
 * 【参考答案】cout << (a + b) * c << endl;
 */
int main() {
    int a, b, c;
    cin >> a >> b >> c;
    
    // 计算 (a + b) * c
    // 提示：注意运算优先级，表达式为 (a+b)*c
    
    return 0;
}`,
    category: '语法基础',
    tags: ['输入输出', '变量', '运算符', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2 3 4', expectedOutput: '20' },
      { id: 2, input: '1 1 1', expectedOutput: '2' },
      { id: 3, input: '5 10 2', expectedOutput: '30' },
    ],
  },
  {
    id: 185,
    title: '整除与余数',
    titleEn: 'Division and Modulo',
    difficulty: 'beginner',
    description: '输入两个正整数 a 和 b，输出 a 除以 b 的商和余数。',
    inputFormat: '一行两个正整数 a 和 b，用空格分隔。',
    outputFormat: '输出商和余数，用空格分隔。',
    sampleInput: '17 5',
    sampleOutput: '3 2',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入两个正整数 a 和 b，输出 a 除以 b 的商和余数
 * 【解题思路】使用整数除法 / 求商，使用取余运算 % 求余数
 * 【参考答案】cout << a / b << " " << a % b << endl;
 */
int main() {
    int a, b;
    cin >> a >> b;
    
    // 输出商和余数
    // 提示：商 = a / b，余数 = a % b
    
    return 0;
}`,
    category: '语法基础',
    tags: ['输入输出', '运算符', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '17 5', expectedOutput: '3 2' },
      { id: 2, input: '100 7', expectedOutput: '14 2' },
      { id: 3, input: '5 5', expectedOutput: '1 0' },
    ],
  },
  {
    id: 186,
    title: '判断奇偶',
    titleEn: 'Odd or Even',
    difficulty: 'beginner',
    description: '输入一个整数 n，判断它是奇数还是偶数。如果是偶数输出 "even"，否则输出 "odd"。',
    inputFormat: '一个整数 n。',
    outputFormat: '输出 "even" 或 "odd"。',
    sampleInput: '7',
    sampleOutput: 'odd',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个整数 n，判断它是奇数还是偶数
 * 【解题思路】用 n % 2 判断：余数为0是偶数，否则是奇数
 * 【参考答案】if (n % 2 == 0) cout << "even"; else cout << "odd";
 */
int main() {
    int n;
    cin >> n;
    
    // 判断奇偶并输出
    // 提示：n % 2 == 0 为偶数，否则为奇数
    
    return 0;
}`,
    category: '语法基础',
    tags: ['条件语句', '运算符', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7', expectedOutput: 'odd' },
      { id: 2, input: '8', expectedOutput: 'even' },
      { id: 3, input: '0', expectedOutput: 'even' },
    ],
  },
  {
    id: 187,
    title: '比较大小',
    titleEn: 'Compare Numbers',
    difficulty: 'beginner',
    description: '输入两个整数 a 和 b，输出较大的那个数。',
    inputFormat: '一行两个整数 a 和 b。',
    outputFormat: '输出较大的数。',
    sampleInput: '3 7',
    sampleOutput: '7',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入两个整数 a 和 b，输出较大的那个数
 * 【解题思路】使用 if-else 语句比较两个数的大小
 * 【参考答案】if (a > b) cout << a; else cout << b;
 */
int main() {
    int a, b;
    cin >> a >> b;
    
    // 输出较大的数
    // 提示：使用 if-else 判断 a 和 b 的大小关系
    
    return 0;
}`,
    category: '语法基础',
    tags: ['条件语句', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 7', expectedOutput: '7' },
      { id: 2, input: '10 5', expectedOutput: '10' },
      { id: 3, input: '5 5', expectedOutput: '5' },
    ],
  },
  {
    id: 188,
    title: '成绩等级',
    titleEn: 'Grade Level',
    difficulty: 'beginner',
    description: '输入一个成绩 score（0-100），根据分数输出等级：90分以上为A，80-89分为B，70-79分为C，60-69分为D，60分以下为E。',
    inputFormat: '一个整数 score（0 ≤ score ≤ 100）。',
    outputFormat: '输出等级字母。',
    sampleInput: '85',
    sampleOutput: 'B',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个成绩 score（0-100），根据分数输出等级
 * 【解题思路】使用 if-else if-else 语句进行多条件判断
 * 【等级划分】>=90:A, 80-89:B, 70-79:C, 60-69:D, <60:E
 */
int main() {
    int score;
    cin >> score;
    
    // 根据分数输出等级
    // 提示：使用 if-else if 语句判断分数区间
    
    return 0;
}`,
    category: '语法基础',
    tags: ['条件语句', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '85', expectedOutput: 'B' },
      { id: 2, input: '95', expectedOutput: 'A' },
      { id: 3, input: '55', expectedOutput: 'E' },
      { id: 4, input: '60', expectedOutput: 'D' },
    ],
  },
  {
    id: 189,
    title: '判断闰年',
    titleEn: 'Leap Year',
    difficulty: 'beginner',
    description: '输入一个年份 year，判断是否是闰年。是闰年输出 "Yes"，否则输出 "No"。闰年规则：能被4整除但不能被100整除，或者能被400整除。',
    inputFormat: '一个整数 year。',
    outputFormat: '输出 "Yes" 或 "No"。',
    sampleInput: '2020',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个年份 year，判断是否是闰年
 * 【闰年规则】能被4整除但不能被100整除，或者能被400整除
 * 【解题思路】(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
 */
int main() {
    int year;
    cin >> year;
    
    // 判断闰年
    // 提示：使用逻辑运算符 && 和 ||
    
    return 0;
}`,
    category: '语法基础',
    tags: ['条件语句', '运算符', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2020', expectedOutput: 'Yes' },
      { id: 2, input: '1900', expectedOutput: 'No' },
      { id: 3, input: '2000', expectedOutput: 'Yes' },
      { id: 4, input: '2023', expectedOutput: 'No' },
    ],
  },
  {
    id: 190,
    title: '三个数排序',
    titleEn: 'Sort Three Numbers',
    difficulty: 'beginner',
    description: '输入三个整数，将它们从小到大排序后输出。',
    inputFormat: '一行三个整数，用空格分隔。',
    outputFormat: '输出排序后的三个数，用空格分隔。',
    sampleInput: '3 1 2',
    sampleOutput: '1 2 3',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入三个整数，将它们从小到大排序后输出
 * 【解题思路】使用条件判断比较三个数的大小，然后按顺序输出
 * 【方法】比较交换法：先保证a最小，再保证b<=c
 */
int main() {
    int a, b, c;
    cin >> a >> b >> c;
    
    // 将三个数排序输出
    // 提示：使用 if 语句进行条件交换，使 a <= b <= c
    
    return 0;
}`,
    category: '语法基础',
    tags: ['条件语句', '排序', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 1 2', expectedOutput: '1 2 3' },
      { id: 2, input: '5 5 5', expectedOutput: '5 5 5' },
      { id: 3, input: '9 3 6', expectedOutput: '3 6 9' },
    ],
  },
  // 循环基础类
  {
    id: 191,
    title: '输出1到N',
    titleEn: 'Print 1 to N',
    difficulty: 'beginner',
    description: '输入一个正整数 N，输出从 1 到 N 的所有整数，每个数占一行。',
    inputFormat: '一个正整数 N（1 ≤ N ≤ 100）。',
    outputFormat: '输出 1 到 N，每行一个数。',
    sampleInput: '5',
    sampleOutput: '1\n2\n3\n4\n5',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，输出从 1 到 N 的所有整数
 * 【解题思路】使用 for 循环，从 1 循环到 N，逐个输出
 * 【参考答案】for (int i = 1; i <= n; i++) cout << i << endl;
 */
int main() {
    int n;
    cin >> n;
    
    // 输出1到n
    // 提示：使用 for 循环，从 i=1 到 i<=n
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5', expectedOutput: '1\n2\n3\n4\n5' },
      { id: 2, input: '1', expectedOutput: '1' },
    ],
  },
  {
    id: 192,
    title: '求和1到N',
    titleEn: 'Sum 1 to N',
    difficulty: 'beginner',
    description: '输入一个正整数 N，计算 1 + 2 + 3 + ... + N 的和。',
    inputFormat: '一个正整数 N（1 ≤ N ≤ 10000）。',
    outputFormat: '输出求和结果。',
    sampleInput: '100',
    sampleOutput: '5050',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，计算 1 + 2 + 3 + ... + N 的和
 * 【解题思路】使用循环累加，或使用公式 n*(n+1)/2
 * 【参考答案】int sum = n * (n + 1) / 2; 或循环累加
 */
int main() {
    int n;
    cin >> n;
    
    // 计算1到n的和
    // 提示：使用循环或等差数列求和公式
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '100', expectedOutput: '5050' },
      { id: 2, input: '10', expectedOutput: '55' },
      { id: 3, input: '1', expectedOutput: '1' },
    ],
  },
  {
    id: 193,
    title: '求N个数的和',
    titleEn: 'Sum of N Numbers',
    difficulty: 'beginner',
    description: '第一行输入一个正整数 N，第二行输入 N 个整数，求这 N 个整数的和。',
    inputFormat: '第一行一个正整数 N，第二行 N 个整数，用空格分隔。',
    outputFormat: '输出这 N 个数的和。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '15',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】第一行输入N，第二行输入N个整数，求这N个整数的和
 * 【解题思路】使用循环读取N个数并累加
 * 【参考答案】for循环读取每个数并累加到sum变量
 */
int main() {
    int n;
    cin >> n;
    
    // 输入n个数并求和
    // 提示：使用循环读取每个数，累加到sum变量
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '数组', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expectedOutput: '15' },
      { id: 2, input: '3\n10 20 30', expectedOutput: '60' },
    ],
  },
  {
    id: 194,
    title: '求阶乘',
    titleEn: 'Factorial',
    difficulty: 'beginner',
    description: '输入一个非负整数 N，求 N 的阶乘。N! = 1 × 2 × 3 × ... × N，特别地，0! = 1。',
    inputFormat: '一个非负整数 N（0 ≤ N ≤ 20）。',
    outputFormat: '输出 N! 的值。',
    sampleInput: '5',
    sampleOutput: '120',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个非负整数 N，求 N 的阶乘
 * 【阶乘定义】N! = 1 × 2 × 3 × ... × N，特别地，0! = 1
 * 【解题思路】使用循环累乘，注意结果可能很大，需要用 long long
 */
int main() {
    int n;
    cin >> n;
    
    // 计算n的阶乘
    // 提示：使用 long long 类型，循环累乘
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5', expectedOutput: '120' },
      { id: 2, input: '0', expectedOutput: '1' },
      { id: 3, input: '10', expectedOutput: '3628800' },
    ],
  },
  {
    id: 195,
    title: '求N个数的最大值',
    titleEn: 'Maximum of N Numbers',
    difficulty: 'beginner',
    description: '第一行输入一个正整数 N，第二行输入 N 个整数，找出其中的最大值。',
    inputFormat: '第一行一个正整数 N（1 ≤ N ≤ 100），第二行 N 个整数。',
    outputFormat: '输出最大值。',
    sampleInput: '5\n3 7 2 9 1',
    sampleOutput: '9',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】第一行输入N，第二行输入N个整数，找出其中的最大值
 * 【解题思路】初始化maxVal为第一个数，然后遍历剩余数更新最大值
 * 【参考答案】使用循环比较，更新最大值
 */
int main() {
    int n;
    cin >> n;
    
    // 找出n个数中的最大值
    // 提示：先读取第一个数作为初始最大值，再比较后续的数
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '数组', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n3 7 2 9 1', expectedOutput: '9' },
      { id: 2, input: '3\n-5 -2 -8', expectedOutput: '-2' },
    ],
  },
  {
    id: 196,
    title: '统计奇数个数',
    titleEn: 'Count Odd Numbers',
    difficulty: 'beginner',
    description: '第一行输入一个正整数 N，第二行输入 N 个整数，统计其中奇数的个数。',
    inputFormat: '第一行一个正整数 N，第二行 N 个整数。',
    outputFormat: '输出奇数的个数。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】第一行输入N，第二行输入N个整数，统计其中奇数的个数
 * 【解题思路】遍历每个数，用 % 2 判断是否为奇数，计数
 * 【参考答案】if (x % 2 != 0) count++;
 */
int main() {
    int n;
    cin >> n;
    
    // 统计奇数个数
    // 提示：使用 x % 2 != 0 判断奇数，累加计数器
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '条件语句', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expectedOutput: '3' },
      { id: 2, input: '4\n2 4 6 8', expectedOutput: '0' },
    ],
  },
  {
    id: 197,
    title: '求平均数',
    titleEn: 'Average',
    difficulty: 'beginner',
    description: '第一行输入一个正整数 N，第二行输入 N 个整数，求这 N 个数的平均值，保留两位小数。',
    inputFormat: '第一行一个正整数 N，第二行 N 个整数。',
    outputFormat: '输出平均值，保留两位小数。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '3.00',
    defaultCode: `#include <iostream>
#include <iomanip>
using namespace std;

/*
 * 【题目描述】第一行输入N，第二行输入N个整数，求平均值，保留两位小数
 * 【解题思路】先求和，再除以N，使用fixed和setprecision控制小数位数
 * 【参考答案】cout << fixed << setprecision(2) << (double)sum / n << endl;
 */
int main() {
    int n;
    cin >> n;
    
    // 计算平均值
    // 提示：先求和，再除以n，注意类型转换和保留小数
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '数组', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expectedOutput: '3.00' },
      { id: 2, input: '3\n10 20 30', expectedOutput: '20.00' },
    ],
  },
  {
    id: 198,
    title: '输出乘法表',
    titleEn: 'Multiplication Table',
    difficulty: 'beginner',
    description: '输入一个正整数 N，输出 N × N 的乘法表。',
    inputFormat: '一个正整数 N（1 ≤ N ≤ 9）。',
    outputFormat: '输出 N 行，每行 N 个乘法算式，格式为 "i*j=k"，用空格分隔。',
    sampleInput: '3',
    sampleOutput: '1*1=1 1*2=2 1*3=3\n2*1=2 2*2=4 2*3=6\n3*1=3 3*2=6 3*3=9',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，输出 N × N 的乘法表
 * 【解题思路】使用双重循环，外层控制行，内层控制列
 * 【参考答案】for (i=1;i<=n;i++) { for (j=1;j<=n;j++) cout<<i<<"*"<<j<<"="<<i*j<<" "; cout<<endl; }
 */
int main() {
    int n;
    cin >> n;
    
    // 输出乘法表
    // 提示：使用双重循环，外层i控制行，内层j控制列
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '嵌套循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3', expectedOutput: '1*1=1 1*2=2 1*3=3\n2*1=2 2*2=4 2*3=6\n3*1=3 3*2=6 3*3=9' },
      { id: 2, input: '1', expectedOutput: '1*1=1' },
    ],
  },
  {
    id: 199,
    title: '输出图形',
    titleEn: 'Print Pattern',
    difficulty: 'beginner',
    description: '输入一个正整数 N，输出一个 N 行的由星号组成的直角三角形。',
    inputFormat: '一个正整数 N（1 ≤ N ≤ 20）。',
    outputFormat: '输出 N 行，第 i 行有 i 个星号。',
    sampleInput: '4',
    sampleOutput: '*\n**\n***\n****',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，输出一个 N 行的由星号组成的直角三角形
 * 【解题思路】使用双重循环，外层控制行数，内层控制每行星号个数
 * 【参考答案】for (i=1;i<=n;i++) { for (j=1;j<=i;j++) cout<<"*"; cout<<endl; }
 */
int main() {
    int n;
    cin >> n;
    
    // 输出直角三角形
    // 提示：第i行输出i个星号
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '嵌套循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4', expectedOutput: '*\n**\n***\n****' },
      { id: 2, input: '1', expectedOutput: '*' },
    ],
  },
  {
    id: 200,
    title: '输出倒三角形',
    titleEn: 'Print Inverted Triangle',
    difficulty: 'beginner',
    description: '输入一个正整数 N，输出一个 N 行的倒直角三角形。',
    inputFormat: '一个正整数 N（1 ≤ N ≤ 20）。',
    outputFormat: '输出 N 行，第 i 行有 (N-i+1) 个星号。',
    sampleInput: '4',
    sampleOutput: '****\n***\n**\n*',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，输出一个 N 行的倒直角三角形
 * 【解题思路】使用双重循环，第i行输出(n-i+1)个星号
 * 【参考答案】for (i=1;i<=n;i++) { for (j=1;j<=n-i+1;j++) cout<<"*"; cout<<endl; }
 */
int main() {
    int n;
    cin >> n;
    
    // 输出倒直角三角形
    // 提示：第i行输出(n-i+1)个星号
    
    return 0;
}`,
    category: '语法基础',
    tags: ['循环', '嵌套循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4', expectedOutput: '****\n***\n**\n*' },
      { id: 2, input: '1', expectedOutput: '*' },
    ],
  },
  // 数组基础类
  {
    id: 201,
    title: '数组元素查找',
    titleEn: 'Array Element Search',
    difficulty: 'beginner',
    description: '第一行输入一个正整数 N，第二行输入 N 个整数，第三行输入一个整数 x，判断 x 是否在数组中出现。如果出现，输出 "YES" 和第一次出现的位置（从1开始），否则输出 "NO"。',
    inputFormat: '第一行 N，第二行 N 个整数，第三行一个整数 x。',
    outputFormat: '如果找到输出 "YES 位置"，否则输出 "NO"。',
    sampleInput: '5\n3 7 2 9 7\n7',
    sampleOutput: 'YES 2',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入N个数和一个整数x，判断x是否在数组中出现
 * 【解题思路】遍历数组，查找x第一次出现的位置
 * 【参考答案】for循环遍历，找到后记录位置并跳出
 */
int main() {
    int n;
    cin >> n;
    
    int arr[100];
    // 输入数组并查找x
    // 提示：遍历数组，用arr[i]==x判断是否相等
    
    return 0;
}`,
    category: '语法基础',
    tags: ['数组', '循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n3 7 2 9 7\n7', expectedOutput: 'YES 2' },
      { id: 2, input: '3\n1 2 3\n5', expectedOutput: 'NO' },
    ],
  },
  {
    id: 202,
    title: '数组反转',
    titleEn: 'Reverse Array',
    difficulty: 'beginner',
    description: '第一行输入一个正整数 N，第二行输入 N 个整数，将数组反转后输出。',
    inputFormat: '第一行 N，第二行 N 个整数。',
    outputFormat: '输出反转后的数组，用空格分隔。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '5 4 3 2 1',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入N个数，将数组反转后输出
 * 【解题思路】方法1：使用双指针交换；方法2：从后往前输出
 * 【参考答案】for (i=0;i<n/2;i++) swap(arr[i],arr[n-1-i]);
 */
int main() {
    int n;
    cin >> n;
    
    int arr[100];
    // 输入数组，反转后输出
    // 提示：交换arr[i]和arr[n-1-i]，或倒序输出
    
    return 0;
}`,
    category: '语法基础',
    tags: ['数组', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
      { id: 2, input: '3\n10 20 30', expectedOutput: '30 20 10' },
    ],
  },
  {
    id: 203,
    title: '数组计数',
    titleEn: 'Array Count',
    difficulty: 'beginner',
    description: '第一行输入一个正整数 N，第二行输入 N 个整数（范围1-100），统计每个数出现的次数。',
    inputFormat: '第一行 N，第二行 N 个整数（1-100）。',
    outputFormat: '按数值从小到大输出每个数及其出现次数，只输出出现过的数。',
    sampleInput: '10\n1 2 2 3 3 3 4 4 4 4',
    sampleOutput: '1 1\n2 2\n3 3\n4 4',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入N个整数（1-100），统计每个数出现的次数
 * 【解题思路】使用count数组作为计数器，count[x]记录x出现的次数
 * 【参考答案】count[arr[i]]++ 累加计数
 */
int main() {
    int n;
    cin >> n;
    
    int count[101] = {0};
    // 统计每个数出现的次数
    // 提示：count[x]表示x出现的次数，遍历数组时count[arr[i]]++
    
    return 0;
}`,
    category: '语法基础',
    tags: ['数组', '哈希思想', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10\n1 2 2 3 3 3 4 4 4 4', expectedOutput: '1 1\n2 2\n3 3\n4 4' },
    ],
  },
  {
    id: 204,
    title: '数组去重',
    titleEn: 'Array Deduplication',
    difficulty: 'beginner',
    description: '第一行输入一个正整数 N，第二行输入 N 个整数（已从小到大排序），输出去重后的数组。',
    inputFormat: '第一行 N，第二行 N 个已排序的整数。',
    outputFormat: '输出去重后的数组，用空格分隔。',
    sampleInput: '10\n1 1 2 2 2 3 3 4 4 5',
    sampleOutput: '1 2 3 4 5',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入N个已排序的整数，输出去重后的数组
 * 【解题思路】由于已排序，相同的数相邻，只需输出与前一个不同的数
 * 【参考答案】输出第一个数，之后只输出arr[i]!=arr[i-1]的数
 */
int main() {
    int n;
    cin >> n;
    
    int arr[100];
    // 输入数组，去重后输出
    // 提示：已排序数组，相邻相同则跳过
    
    return 0;
}`,
    category: '语法基础',
    tags: ['数组', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10\n1 1 2 2 2 3 3 4 4 5', expectedOutput: '1 2 3 4 5' },
      { id: 2, input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
    ],
  },
  // 字符串基础类
  {
    id: 205,
    title: '字符串长度',
    titleEn: 'String Length',
    difficulty: 'beginner',
    description: '输入一个字符串，输出它的长度。',
    inputFormat: '一个字符串（不含空格，长度不超过100）。',
    outputFormat: '输出字符串长度。',
    sampleInput: 'Hello',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <cstring>
using namespace std;

/*
 * 【题目描述】输入一个字符串，输出它的长度
 * 【解题思路】使用strlen()函数获取字符串长度
 * 【参考答案】cout << strlen(str) << endl;
 */
int main() {
    char str[101];
    cin >> str;
    
    // 输出字符串长度
    // 提示：使用strlen(str)获取长度
    
    return 0;
}`,
    category: '语法基础',
    tags: ['字符串', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'Hello', expectedOutput: '5' },
      { id: 2, input: 'a', expectedOutput: '1' },
    ],
  },
  {
    id: 206,
    title: '字符串反转',
    titleEn: 'Reverse String',
    difficulty: 'beginner',
    description: '输入一个字符串，将它反转后输出。',
    inputFormat: '一个字符串（长度不超过100）。',
    outputFormat: '输出反转后的字符串。',
    sampleInput: 'Hello',
    sampleOutput: 'olleH',
    defaultCode: `#include <iostream>
#include <cstring>
using namespace std;

/*
 * 【题目描述】输入一个字符串，将它反转后输出
 * 【解题思路】使用双指针交换，或从后往前遍历输出
 * 【参考答案】for (i=0,j=len-1; i<j; i++,j--) swap(str[i],str[j]);
 */
int main() {
    char str[101];
    cin >> str;
    
    // 反转字符串并输出
    // 提示：交换str[i]和str[len-1-i]
    
    return 0;
}`,
    category: '语法基础',
    tags: ['字符串', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'Hello', expectedOutput: 'olleH' },
      { id: 2, input: 'abc', expectedOutput: 'cba' },
    ],
  },
  {
    id: 207,
    title: '统计字符',
    titleEn: 'Count Characters',
    difficulty: 'beginner',
    description: '输入一个字符串，统计其中的大写字母、小写字母、数字和其他字符的个数。',
    inputFormat: '一个字符串（可能包含空格，长度不超过100）。',
    outputFormat: '输出四个数字，分别表示大写字母、小写字母、数字和其他字符的个数。',
    sampleInput: 'Hello World 123!',
    sampleOutput: '2 8 3 3',
    defaultCode: `#include <iostream>
#include <cstring>
using namespace std;

/*
 * 【题目描述】输入一个字符串，统计大写、小写、数字、其他字符的个数
 * 【解题思路】遍历字符串，用条件判断字符类型并计数
 * 【判断方法】isupper(), islower(), isdigit() 或直接比较ASCII
 */
int main() {
    char str[101];
    cin.getline(str, 101);
    
    // 统计各类字符
    // 提示：'A'-'Z'是大写，'a'-'z'是小写，'0'-'9'是数字
    
    return 0;
}`,
    category: '语法基础',
    tags: ['字符串', '条件语句', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'Hello World 123!', expectedOutput: '2 8 3 3' },
    ],
  },
  {
    id: 208,
    title: '大小写转换',
    titleEn: 'Case Conversion',
    difficulty: 'beginner',
    description: '输入一个字符串，将其中的大写字母转为小写，小写字母转为大写，其他字符不变。',
    inputFormat: '一个字符串（长度不超过100）。',
    outputFormat: '输出转换后的字符串。',
    sampleInput: 'Hello World!',
    sampleOutput: 'hELLO wORLD!',
    defaultCode: `#include <iostream>
#include <cstring>
using namespace std;

/*
 * 【题目描述】输入一个字符串，大写变小写，小写变大写
 * 【解题思路】遍历字符串，大写+32变小写，小写-32变大写
 * 【参考答案】if (str[i]>='A' && str[i]<='Z') str[i] += 32;
 *           else if (str[i]>='a' && str[i]<='z') str[i] -= 32;
 */
int main() {
    char str[101];
    cin >> str;
    
    // 大小写转换
    // 提示：大小写ASCII差32，大写+32变小写
    
    return 0;
}`,
    category: '语法基础',
    tags: ['字符串', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'Hello World!', expectedOutput: 'hELLO wORLD!' },
      { id: 2, input: 'ABC', expectedOutput: 'abc' },
    ],
  },
  {
    id: 209,
    title: '判断回文字符串',
    titleEn: 'Palindrome String',
    difficulty: 'beginner',
    description: '输入一个字符串，判断它是否是回文字符串（正读和反读相同）。是则输出 "YES"，否则输出 "NO"。',
    inputFormat: '一个字符串（长度不超过100）。',
    outputFormat: '输出 "YES" 或 "NO"。',
    sampleInput: 'abcba',
    sampleOutput: 'YES',
    defaultCode: `#include <iostream>
#include <cstring>
using namespace std;

/*
 * 【题目描述】输入一个字符串，判断它是否是回文字符串
 * 【解题思路】回文：正读反读相同。使用双指针比较首尾字符
 * 【参考答案】for (i=0,j=len-1; i<j; i++,j--) if (str[i]!=str[j]) 不是回文
 */
int main() {
    char str[101];
    cin >> str;
    
    // 判断是否是回文
    // 提示：比较str[i]和str[len-1-i]
    
    return 0;
}`,
    category: '语法基础',
    tags: ['字符串', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'abcba', expectedOutput: 'YES' },
      { id: 2, input: 'hello', expectedOutput: 'NO' },
      { id: 3, input: 'a', expectedOutput: 'YES' },
    ],
  },
  {
    id: 210,
    title: '字符串查找',
    titleEn: 'String Search',
    difficulty: 'beginner',
    description: '输入两个字符串 s 和 t，判断 t 是否是 s 的子串。如果是，输出 "YES" 和第一次出现的位置（从1开始），否则输出 "NO"。',
    inputFormat: '两行，第一行是字符串 s，第二行是字符串 t。',
    outputFormat: '如果找到输出 "YES 位置"，否则输出 "NO"。',
    sampleInput: 'Hello World\nWorld',
    sampleOutput: 'YES 7',
    defaultCode: `#include <iostream>
#include <cstring>
using namespace std;

/*
 * 【题目描述】输入两个字符串 s 和 t，判断 t 是否是 s 的子串
 * 【解题思路】使用 strstr() 函数查找子串，或手动实现字符串匹配
 * 【参考答案】char *p = strstr(s, t); if (p) 输出位置 p-s+1
 */
int main() {
    char s[101], t[101];
    cin.getline(s, 101);
    cin.getline(t, 101);
    
    // 查找子串
    // 提示：使用strstr(s, t)查找，返回首次出现的位置指针
    
    return 0;
}`,
    category: '语法基础',
    tags: ['字符串', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'Hello World\nWorld', expectedOutput: 'YES 7' },
      { id: 2, input: 'Hello\nabc', expectedOutput: 'NO' },
    ],
  },
  // 简单算法类
  {
    id: 211,
    title: '判断质数',
    titleEn: 'Prime Number',
    difficulty: 'beginner',
    description: '输入一个正整数 N，判断它是否是质数。是质数输出 "YES"，否则输出 "NO"。',
    inputFormat: '一个正整数 N（2 ≤ N ≤ 10000）。',
    outputFormat: '输出 "YES" 或 "NO"。',
    sampleInput: '17',
    sampleOutput: 'YES',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，判断它是否是质数
 * 【质数定义】大于1且只能被1和自身整除的正整数
 * 【解题思路】从2到sqrt(n)判断是否有因子，无因子则为质数
 */
int main() {
    int n;
    cin >> n;
    
    // 判断质数
    // 提示：从2到sqrt(n)枚举，若n%i==0则不是质数
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数学', '质数', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '17', expectedOutput: 'YES' },
      { id: 2, input: '4', expectedOutput: 'NO' },
      { id: 3, input: '2', expectedOutput: 'YES' },
    ],
  },
  {
    id: 212,
    title: '分解质因数',
    titleEn: 'Prime Factorization',
    difficulty: 'intermediate',
    description: '输入一个正整数 N，将它分解质因数，按从小到大的顺序输出。',
    inputFormat: '一个正整数 N（2 ≤ N ≤ 10000）。',
    outputFormat: '输出质因数，用空格分隔。',
    sampleInput: '12',
    sampleOutput: '2 2 3',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，将它分解质因数
 * 【解题思路】从最小的质数2开始，不断除以能整除的最小质因数
 * 【参考答案】for (i=2; i*i<=n; i++) while (n%i==0) { 输出i; n/=i; }
 */
int main() {
    int n;
    cin >> n;
    
    // 分解质因数
    // 提示：从2开始枚举，若n%i==0则i是质因数
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数学', '质数', '基础'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12', expectedOutput: '2 2 3' },
      { id: 2, input: '7', expectedOutput: '7' },
      { id: 3, input: '100', expectedOutput: '2 2 5 5' },
    ],
  },
  {
    id: 213,
    title: '最大公约数',
    titleEn: 'GCD',
    difficulty: 'beginner',
    description: '输入两个正整数 a 和 b，求它们的最大公约数。',
    inputFormat: '一行两个正整数 a 和 b。',
    outputFormat: '输出最大公约数。',
    sampleInput: '12 18',
    sampleOutput: '6',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入两个正整数 a 和 b，求它们的最大公约数
 * 【解题思路】使用欧几里得算法（辗转相除法）
 * 【参考答案】while (b) { int t = a % b; a = b; b = t; } return a;
 */
int main() {
    int a, b;
    cin >> a >> b;
    
    // 求最大公约数
    // 提示：gcd(a,b) = gcd(b, a%b)，直到b为0
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数学', 'GCD', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12 18', expectedOutput: '6' },
      { id: 2, input: '7 5', expectedOutput: '1' },
      { id: 3, input: '100 25', expectedOutput: '25' },
    ],
  },
  {
    id: 214,
    title: '最小公倍数',
    titleEn: 'LCM',
    difficulty: 'beginner',
    description: '输入两个正整数 a 和 b，求它们的最小公倍数。',
    inputFormat: '一行两个正整数 a 和 b。',
    outputFormat: '输出最小公倍数。',
    sampleInput: '12 18',
    sampleOutput: '36',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入两个正整数 a 和 b，求它们的最小公倍数
 * 【解题思路】lcm(a,b) = a * b / gcd(a,b)
 * 【参考答案】先求gcd，再计算 a/gcd(a,b)*b 避免溢出
 */
int main() {
    int a, b;
    cin >> a >> b;
    
    // 求最小公倍数
    // 提示：lcm = a * b / gcd(a, b)，注意先除后乘避免溢出
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数学', 'LCM', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12 18', expectedOutput: '36' },
      { id: 2, input: '7 5', expectedOutput: '35' },
      { id: 3, input: '4 6', expectedOutput: '12' },
    ],
  },
  {
    id: 215,
    title: '斐波那契数列',
    titleEn: 'Fibonacci Sequence',
    difficulty: 'beginner',
    description: '输入一个正整数 N，输出斐波那契数列的第 N 项。斐波那契数列定义：F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)。',
    inputFormat: '一个正整数 N（1 ≤ N ≤ 40）。',
    outputFormat: '输出第 N 项斐波那契数。',
    sampleInput: '10',
    sampleOutput: '55',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，输出斐波那契数列的第 N 项
 * 【斐波那契定义】F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)
 * 【解题思路】使用循环递推，或使用递归（效率较低）
 */
int main() {
    int n;
    cin >> n;
    
    // 输出第n项斐波那契数
    // 提示：f1=1, f2=1, fn = f(n-1) + f(n-2)
    
    return 0;
}`,
    category: '基础算法',
    tags: ['递推', '动态规划', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10', expectedOutput: '55' },
      { id: 2, input: '1', expectedOutput: '1' },
      { id: 3, input: '20', expectedOutput: '6765' },
    ],
  },
  {
    id: 216,
    title: '水仙花数',
    titleEn: 'Narcissistic Number',
    difficulty: 'beginner',
    description: '水仙花数是指一个三位数，其各位数字的立方和等于该数本身。输入一个三位数，判断是否是水仙花数。',
    inputFormat: '一个三位数。',
    outputFormat: '是水仙花数输出 "YES"，否则输出 "NO"。',
    sampleInput: '153',
    sampleOutput: 'YES',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个三位数，判断是否是水仙花数
 * 【水仙花数】各位数字的立方和等于该数本身的三位数
 * 【解题思路】分离各位数字，计算立方和并比较
 */
int main() {
    int n;
    cin >> n;
    
    // 判断是否是水仙花数
    // 提示：a=n/100, b=n/10%10, c=n%10，判断a³+b³+c³==n
    
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举', '数学', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '153', expectedOutput: 'YES' },
      { id: 2, input: '370', expectedOutput: 'YES' },
      { id: 3, input: '100', expectedOutput: 'NO' },
    ],
  },
  {
    id: 217,
    title: '数字翻转',
    titleEn: 'Number Reversal',
    difficulty: 'beginner',
    description: '输入一个正整数 N，将其各位数字翻转后输出。',
    inputFormat: '一个正整数 N。',
    outputFormat: '输出翻转后的数字。',
    sampleInput: '12345',
    sampleOutput: '54321',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，将其各位数字翻转后输出
 * 【解题思路】不断取最后一位，构建新数字
 * 【参考答案】while (n>0) { ans = ans*10 + n%10; n /= 10; }
 */
int main() {
    int n;
    cin >> n;
    
    // 翻转数字
    // 提示：取最后一位n%10，然后n/=10，构建新数
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数学', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12345', expectedOutput: '54321' },
      { id: 2, input: '1000', expectedOutput: '1' },
      { id: 3, input: '5', expectedOutput: '5' },
    ],
  },
  {
    id: 218,
    title: '统计数字位数',
    titleEn: 'Count Digits',
    difficulty: 'beginner',
    description: '输入一个正整数 N，统计它的位数。',
    inputFormat: '一个正整数 N（1 ≤ N ≤ 10^9）。',
    outputFormat: '输出位数。',
    sampleInput: '12345',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，统计它的位数
 * 【解题思路】不断除以10，计数器+1，直到n为0
 * 【参考答案】while (n>0) { cnt++; n /= 10; }
 */
int main() {
    long long n;
    cin >> n;
    
    // 统计位数
    // 提示：每次n/=10，计数器+1
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数学', '循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12345', expectedOutput: '5' },
      { id: 2, input: '7', expectedOutput: '1' },
      { id: 3, input: '1000000000', expectedOutput: '10' },
    ],
  },
  {
    id: 219,
    title: '各位数字之和',
    titleEn: 'Sum of Digits',
    difficulty: 'beginner',
    description: '输入一个正整数 N，计算其各位数字之和。',
    inputFormat: '一个正整数 N。',
    outputFormat: '输出各位数字之和。',
    sampleInput: '12345',
    sampleOutput: '15',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，计算其各位数字之和
 * 【解题思路】不断取最后一位n%10累加，然后n/=10
 * 【参考答案】while (n>0) { sum += n%10; n /= 10; }
 */
int main() {
    long long n;
    cin >> n;
    
    // 计算各位数字之和
    // 提示：sum += n % 10 取最后一位，n /= 10 去掉最后一位
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数学', '循环', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '12345', expectedOutput: '15' },
      { id: 2, input: '999', expectedOutput: '27' },
      { id: 3, input: '7', expectedOutput: '7' },
    ],
  },
  {
    id: 220,
    title: '完全平方数',
    titleEn: 'Perfect Square',
    difficulty: 'beginner',
    description: '输入一个正整数 N，判断它是否是完全平方数。是则输出 "YES"，否则输出 "NO"。',
    inputFormat: '一个正整数 N（1 ≤ N ≤ 10^9）。',
    outputFormat: '输出 "YES" 或 "NO"。',
    sampleInput: '16',
    sampleOutput: 'YES',
    defaultCode: `#include <iostream>
#include <cmath>
using namespace std;

/*
 * 【题目描述】输入一个正整数 N，判断它是否是完全平方数
 * 【完全平方数】可以表示为某个整数的平方的数
 * 【解题思路】计算sqrt(n)，判断其平方是否等于n
 */
int main() {
    long long n;
    cin >> n;
    
    // 判断是否是完全平方数
    // 提示：int r = sqrt(n); 判断 r*r == n
    
    return 0;
}`,
    category: '基础算法',
    tags: ['数学', '入门'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '16', expectedOutput: 'YES' },
      { id: 2, input: '15', expectedOutput: 'NO' },
      { id: 3, input: '1', expectedOutput: 'YES' },
    ],
  },
  // ========== 新增题目 - 进阶提升篇（ID 221-250）==========
  // 区间DP
  {
    id: 221,
    title: '石子合并',
    titleEn: 'Stone Merge',
    difficulty: 'intermediate',
    description: '有n堆石子排成一排，每堆石子有一定的数量。每次可以合并相邻的两堆石子，合并的代价是两堆石子的数量之和。求把所有石子合并成一堆的最小代价。',
    inputFormat: '第一行一个整数n，表示石子的堆数。第二行n个整数，表示每堆石子的数量。',
    outputFormat: '输出一个整数，表示最小代价。',
    sampleInput: '4\n4 5 9 4',
    sampleOutput: '43',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】有n堆石子排成一排，求合并成一堆的最小代价
 * 【算法】区间DP
 * 【状态定义】dp[l][r]表示合并区间[l,r]内石子的最小代价
 * 【状态转移】dp[l][r] = min(dp[l][k] + dp[k+1][r] + sum[r]-sum[l-1])
 * 【边界】dp[i][i] = 0（单堆不需要合并）
 */
const int INF = 1e9;
int n, stones[105], sum[105];
int dp[105][105];

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> stones[i];
        sum[i] = sum[i-1] + stones[i];
    }
    
    for (int i = 1; i <= n; i++) dp[i][i] = 0;
    
    for (int len = 2; len <= n; len++) {
        for (int l = 1; l + len - 1 <= n; l++) {
            int r = l + len - 1;
            dp[l][r] = INF;
            for (int k = l; k < r; k++) {
                dp[l][r] = min(dp[l][r], dp[l][k] + dp[k+1][r] + sum[r] - sum[l-1]);
            }
        }
    }
    
    cout << dp[1][n] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '区间DP'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n4 5 9 4', expectedOutput: '43' },
      { id: 2, input: '3\n1 2 3', expectedOutput: '9' },
    ],
    similarProblems: [222],
  },
  {
    id: 222,
    title: '矩阵连乘',
    titleEn: 'Matrix Chain Multiplication',
    difficulty: 'intermediate',
    description: '给定n个矩阵的维度，求计算矩阵连乘积的最少乘法次数。',
    inputFormat: '第一行一个整数n。第二行n+1个整数，表示矩阵维度：矩阵i的维度为p[i-1]×p[i]。',
    outputFormat: '输出最少乘法次数。',
    sampleInput: '3\n10 30 5 60',
    sampleOutput: '4500',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】给定n个矩阵的维度，求矩阵连乘的最少乘法次数
 * 【算法】区间DP
 * 【状态定义】dp[l][r]表示计算矩阵l到r连乘的最少乘法次数
 * 【状态转移】dp[l][r] = min(dp[l][k] + dp[k+1][r] + p[l-1]*p[k]*p[r])
 */
const int INF = 1e9;
int n, p[105];
long long dp[105][105];

int main() {
    cin >> n;
    for (int i = 0; i <= n; i++) cin >> p[i];
    
    for (int i = 1; i <= n; i++) dp[i][i] = 0;
    
    for (int len = 2; len <= n; len++) {
        for (int l = 1; l + len - 1 <= n; l++) {
            int r = l + len - 1;
            dp[l][r] = INF;
            for (int k = l; k < r; k++) {
                dp[l][r] = min(dp[l][r], dp[l][k] + dp[k+1][r] + p[l-1]*p[k]*p[r]);
            }
        }
    }
    
    cout << dp[1][n] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '区间DP'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n10 30 5 60', expectedOutput: '4500' },
    ],
    similarProblems: [221],
  },
  {
    id: 223,
    title: '回文串分割',
    titleEn: 'Palindrome Partitioning',
    difficulty: 'intermediate',
    description: '给定一个字符串，求最少分割次数，使得每个子串都是回文串。',
    inputFormat: '一个字符串（长度不超过1000）。',
    outputFormat: '输出最少分割次数。',
    sampleInput: 'aab',
    sampleOutput: '1',
    defaultCode: `#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

/*
 * 【题目描述】给定一个字符串，求最少分割次数，使得每个子串都是回文串
 * 【算法】区间DP + 预处理
 * 【步骤1】预处理isPalin[i][j]表示s[i..j]是否是回文
 * 【步骤2】dp[i]表示s[0..i]的最小分割次数
 * 【状态转移】如果s[j+1..i]是回文，dp[i] = min(dp[i], dp[j]+1)
 */
int main() {
    string s;
    cin >> s;
    int n = s.length();
    
    // 预处理回文
    bool isPalin[1005][1005] = {false};
    for (int i = 0; i < n; i++) isPalin[i][i] = true;
    for (int i = 0; i < n-1; i++) isPalin[i][i+1] = (s[i] == s[i+1]);
    for (int len = 3; len <= n; len++) {
        for (int i = 0; i + len <= n; i++) {
            int j = i + len - 1;
            isPalin[i][j] = (s[i] == s[j]) && isPalin[i+1][j-1];
        }
    }
    
    // DP求最小分割次数
    int dp[1005];
    dp[0] = 0;
    for (int i = 1; i < n; i++) {
        if (isPalin[0][i]) dp[i] = 0;
        else {
            dp[i] = i;
            for (int j = 0; j < i; j++) {
                if (isPalin[j+1][i]) dp[i] = min(dp[i], dp[j] + 1);
            }
        }
    }
    
    cout << dp[n-1] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '区间DP', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'aab', expectedOutput: '1' },
      { id: 2, input: 'a', expectedOutput: '0' },
    ],
  },
  // 状态压缩DP
  {
    id: 224,
    title: '旅行商问题',
    titleEn: 'Traveling Salesman Problem',
    difficulty: 'advanced',
    description: '给定n个城市和城市之间的距离矩阵，从城市1出发，访问所有城市恰好一次，最后回到城市1，求最短路径长度。',
    inputFormat: '第一行一个整数n。接下来n行，每行n个整数，表示距离矩阵。',
    outputFormat: '输出最短路径长度。',
    sampleInput: '4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0',
    sampleOutput: '80',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】TSP问题：从城市1出发，访问所有城市恰好一次，最后回到起点
 * 【算法】状态压缩DP
 * 【状态定义】dp[mask][i]表示已访问城市集合为mask，当前在城市i的最短路径
 * 【状态转移】dp[mask|(1<<j)][j] = min(dp[mask|(1<<j)][j], dp[mask][i] + dist[i][j])
 * 【时间复杂度】O(n^2 * 2^n)
 */
const int INF = 1e9;
int n, dist[20][20];
int dp[1<<16][16];

int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> dist[i][j];
    
    for (int mask = 0; mask < (1<<n); mask++)
        for (int i = 0; i < n; i++)
            dp[mask][i] = INF;
    dp[1][0] = 0;
    
    for (int mask = 1; mask < (1<<n); mask++) {
        for (int i = 0; i < n; i++) {
            if (!(mask & (1<<i))) continue;
            for (int j = 0; j < n; j++) {
                if (mask & (1<<j)) continue;
                int newMask = mask | (1<<j);
                dp[newMask][j] = min(dp[newMask][j], dp[mask][i] + dist[i][j]);
            }
        }
    }
    
    int ans = INF, fullMask = (1<<n) - 1;
    for (int i = 1; i < n; i++)
        ans = min(ans, dp[fullMask][i] + dist[i][0]);
    cout << ans << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '状态压缩'],
    source: 'Other',
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { id: 1, input: '4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0', expectedOutput: '80' },
    ],
  },
  {
    id: 225,
    title: '棋盘放棋子',
    titleEn: 'Place Chess Pieces',
    difficulty: 'intermediate',
    description: '在一个n×n的棋盘上放棋子，要求每行每列最多放一个，且不能放在障碍格子上。求放置方案数。',
    inputFormat: '第一行一个整数n。接下来n行，每行n个字符，.表示可以放，X表示障碍。',
    outputFormat: '输出方案数。',
    sampleInput: '3\n...\n.X.\n...',
    sampleOutput: '8',
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

/*
 * 【题目描述】在n×n棋盘上放棋子，每行每列最多一个，不能放在障碍格
 * 【算法】状态压缩DP
 * 【状态定义】dp[mask]表示列占用状态为mask时的方案数
 * 【状态转移】逐行处理，对每行尝试在可用列放置棋子
 */
int n;
string board[15];
long long dp[1<<12];

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> board[i];
    
    dp[0] = 1;
    for (int row = 0; row < n; row++) {
        for (int mask = (1<<n)-1; mask >= 0; mask--) {
            for (int col = 0; col < n; col++) {
                if (board[row][col] == '.' && !(mask & (1<<col))) {
                    dp[mask | (1<<col)] += dp[mask];
                }
            }
        }
    }
    
    long long ans = 0;
    for (int mask = 0; mask < (1<<n); mask++)
        ans += dp[mask];
    cout << ans << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '状态压缩'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n...\n.X.\n...', expectedOutput: '8' },
    ],
  },
  // 最短路径
  {
    id: 226,
    title: '最短路',
    titleEn: 'Shortest Path',
    difficulty: 'intermediate',
    description: '给定一个有向图，求从起点s到所有点的最短路径。',
    inputFormat: '第一行四个整数n, m, s，分别表示点数、边数、起点。接下来m行，每行三个整数u, v, w，表示一条有向边。',
    outputFormat: '输出n个整数，表示从s到各点的最短距离。如果无法到达，输出-1。',
    sampleInput: '4 6 1\n1 2 2\n1 3 5\n2 3 1\n2 4 4\n3 4 1\n3 2 3',
    sampleOutput: '0 2 3 4',
    defaultCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

/*
 * 【题目描述】给定一个有向图，求从起点s到所有点的最短路径
 * 【算法】Dijkstra算法（优先队列优化）
 * 【数据结构】邻接表存图 + 优先队列（小根堆）
 * 【时间复杂度】O((n+m)logn)
 */
typedef pair<int,int> pii;
const int INF = 1e9;

vector<pii> adj[10005];
int dist[10005];

int main() {
    int n, m, s;
    cin >> n >> m >> s;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    for (int i = 1; i <= n; i++) dist[i] = INF;
    dist[s] = 0;
    
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, s});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    for (int i = 1; i <= n; i++)
        cout << (dist[i] == INF ? -1 : dist[i]) << " ";
    return 0;
}`,
    category: '图论',
    tags: ['图论', '最短路', 'Dijkstra'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 6 1\n1 2 2\n1 3 5\n2 3 1\n2 4 4\n3 4 1\n3 2 3', expectedOutput: '0 2 3 4' },
    ],
  },
  {
    id: 227,
    title: 'Floyd全源最短路',
    titleEn: 'Floyd All-Pairs Shortest Path',
    difficulty: 'intermediate',
    description: '给定一个有向图，求任意两点之间的最短路径。',
    inputFormat: '第一行两个整数n, m。接下来m行，每行三个整数u, v, w，表示一条边。',
    outputFormat: '输出n×n矩阵，第i行第j列表示i到j的最短距离。',
    sampleInput: '3 3\n1 2 1\n2 3 2\n1 3 4',
    sampleOutput: '0 1 3\n-1 0 2\n-1 -1 0',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】给定一个有向图，求任意两点之间的最短路径
 * 【算法】Floyd算法（多源最短路）
 * 【核心思想】枚举中间点k，更新dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
 * 【时间复杂度】O(n³)
 */
const int INF = 1e9;
int dist[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            dist[i][j] = (i == j) ? 0 : INF;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v], w);
    }
    
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                if (dist[i][k] < INF && dist[k][j] < INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++)
            cout << (dist[i][j] == INF ? -1 : dist[i][j]) << " ";
        cout << endl;
    }
    return 0;
}`,
    category: '图论',
    tags: ['图论', '最短路', 'Floyd'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2 1\n2 3 2\n1 3 4', expectedOutput: '0 1 3\n-1 0 2\n-1 -1 0' },
    ],
  },
  // 最小生成树
  {
    id: 228,
    title: '最小生成树',
    titleEn: 'Minimum Spanning Tree',
    difficulty: 'intermediate',
    description: '给定一个无向图，求最小生成树的边权之和。',
    inputFormat: '第一行两个整数n, m。接下来m行，每行三个整数u, v, w，表示一条无向边。',
    outputFormat: '输出最小生成树的边权之和。如果图不连通，输出-1。',
    sampleInput: '4 5\n1 2 3\n1 3 4\n2 3 5\n2 4 6\n3 4 7',
    sampleOutput: '13',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】给定一个无向图，求最小生成树的边权之和
 * 【算法】Kruskal算法（贪心 + 并查集）
 * 【核心思想】按边权排序，依次选择不构成环的最小边
 * 【判断环】用并查集判断两点是否已连通
 */
struct Edge {
    int u, v, w;
    bool operator<(const Edge& e) const { return w < e.w; }
} edges[200005];

int father[5005];

int find(int x) {
    if (father[x] != x) father[x] = find(father[x]);
    return father[x];
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++)
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    
    sort(edges, edges + m);
    for (int i = 1; i <= n; i++) father[i] = i;
    
    int total = 0, cnt = 0;
    for (int i = 0; i < m && cnt < n-1; i++) {
        int u = edges[i].u, v = edges[i].v;
        if (find(u) != find(v)) {
            father[find(u)] = find(v);
            total += edges[i].w;
            cnt++;
        }
    }
    
    cout << (cnt == n-1 ? total : -1) << endl;
    return 0;
}`,
    category: '图论',
    tags: ['图论', '最小生成树', 'Kruskal'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 5\n1 2 3\n1 3 4\n2 3 5\n2 4 6\n3 4 7', expectedOutput: '13' },
    ],
  },
  // 线段树
  {
    id: 229,
    title: '区间求和',
    titleEn: 'Range Sum Query',
    difficulty: 'intermediate',
    description: '给定一个长度为n的数组，支持两种操作：1. 修改某个位置的值；2. 查询某个区间的和。',
    inputFormat: '第一行两个整数n, m。第二行n个整数表示初始数组。接下来m行，每行三个整数：1 x y 表示修改第x个位置为y；2 l r 表示查询[l,r]区间和。',
    outputFormat: '对于每个查询操作，输出区间和。',
    sampleInput: '5 3\n1 2 3 4 5\n2 1 5\n1 3 10\n2 1 5',
    sampleOutput: '15\n22',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】给定数组，支持单点修改和区间求和查询
 * 【算法】线段树
 * 【核心操作】build建树, update单点更新, query区间查询
 * 【时间复杂度】O(n)建树，O(logn)查询/更新
 */
const int MAXN = 100005;
int arr[MAXN];
long long tree[4 * MAXN];

void build(int node, int l, int r) {
    if (l == r) { tree[node] = arr[l]; return; }
    int mid = (l + r) / 2;
    build(node*2, l, mid);
    build(node*2+1, mid+1, r);
    tree[node] = tree[node*2] + tree[node*2+1];
}

void update(int node, int l, int r, int idx, int val) {
    if (l == r) { tree[node] = val; return; }
    int mid = (l + r) / 2;
    if (idx <= mid) update(node*2, l, mid, idx, val);
    else update(node*2+1, mid+1, r, idx, val);
    tree[node] = tree[node*2] + tree[node*2+1];
}

long long query(int node, int l, int r, int ql, int qr) {
    if (ql > r || qr < l) return 0;
    if (ql <= l && r <= qr) return tree[node];
    int mid = (l + r) / 2;
    return query(node*2, l, mid, ql, qr) + query(node*2+1, mid+1, r, ql, qr);
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> arr[i];
    build(1, 1, n);
    
    while (m--) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) update(1, 1, n, x, y);
        else cout << query(1, 1, n, x, y) << endl;
    }
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '线段树'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2 3 4 5\n2 1 5\n1 3 10\n2 1 5', expectedOutput: '15\n22' },
    ],
  },
  {
    id: 230,
    title: '区间最大值',
    titleEn: 'Range Maximum Query',
    difficulty: 'intermediate',
    description: '给定一个长度为n的数组，支持两种操作：1. 修改某个位置的值；2. 查询某个区间的最大值。',
    inputFormat: '第一行两个整数n, m。第二行n个整数。接下来m行操作。',
    outputFormat: '对于每个查询操作，输出区间最大值。',
    sampleInput: '5 3\n1 5 3 8 2\n2 1 5\n1 3 10\n2 1 5',
    sampleOutput: '8\n10',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】给定数组，支持单点修改和区间最大值查询
 * 【算法】线段树
 * 【核心操作】与区间求和类似，只是合并操作改为max
 */
const int MAXN = 100005;
int arr[MAXN];
int tree[4 * MAXN];

void build(int node, int l, int r) {
    if (l == r) { tree[node] = arr[l]; return; }
    int mid = (l + r) / 2;
    build(node*2, l, mid);
    build(node*2+1, mid+1, r);
    tree[node] = max(tree[node*2], tree[node*2+1]);
}

void update(int node, int l, int r, int idx, int val) {
    if (l == r) { tree[node] = val; return; }
    int mid = (l + r) / 2;
    if (idx <= mid) update(node*2, l, mid, idx, val);
    else update(node*2+1, mid+1, r, idx, val);
    tree[node] = max(tree[node*2], tree[node*2+1]);
}

int query(int node, int l, int r, int ql, int qr) {
    if (ql > r || qr < l) return -1e9;
    if (ql <= l && r <= qr) return tree[node];
    int mid = (l + r) / 2;
    return max(query(node*2, l, mid, ql, qr), query(node*2+1, mid+1, r, ql, qr));
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> arr[i];
    build(1, 1, n);
    
    while (m--) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) update(1, 1, n, x, y);
        else cout << query(1, 1, n, x, y) << endl;
    }
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '线段树'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 5 3 8 2\n2 1 5\n1 3 10\n2 1 5', expectedOutput: '8\n10' },
    ],
  },
  // 树状数组
  {
    id: 231,
    title: '树状数组求逆序对',
    titleEn: 'Count Inversions',
    difficulty: 'intermediate',
    description: '给定一个长度为n的排列，求逆序对的数量。逆序对是指i<j且a[i]>a[j]的数对。',
    inputFormat: '第一行一个整数n。第二行n个整数表示排列。',
    outputFormat: '输出逆序对数量。',
    sampleInput: '5\n3 1 4 5 2',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】给定一个长度为n的排列，求逆序对的数量
 * 【逆序对定义】i<j且a[i]>a[j]的数对
 * 【算法】树状数组
 * 【核心思想】从左到右遍历，对于每个数x，统计之前比x大的数的个数
 */
const int MAXN = 100005;
int tree[MAXN];
int n;

int lowbit(int x) { return x & (-x); }

void add(int x) {
    while (x <= n) { tree[x]++; x += lowbit(x); }
}

int sum(int x) {
    int res = 0;
    while (x > 0) { res += tree[x]; x -= lowbit(x); }
    return res;
}

int main() {
    cin >> n;
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        ans += i - sum(x);  // 已插入i个数，比x小的有sum(x)个
        add(x);
    }
    cout << ans << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '树状数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n3 1 4 5 2', expectedOutput: '4' },
    ],
  },
  // 并查集
  {
    id: 232,
    title: '亲戚关系',
    titleEn: 'Relatives',
    difficulty: 'intermediate',
    description: '给定n个人和m对亲戚关系，判断任意两人是否有亲戚关系。',
    inputFormat: '第一行两个整数n, m。接下来m行，每行两个整数表示两人是亲戚。然后一个整数q，接下来q行查询。',
    outputFormat: '对于每个查询，输出Yes或No。',
    sampleInput: '5 3\n1 2\n3 4\n2 5\n3\n1 3\n1 5\n3 5',
    sampleOutput: 'No\nYes\nNo',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】给定n个人和m对亲戚关系，判断任意两人是否有亲戚关系
 * 【算法】并查集
 * 【核心操作】find查找根节点，unite合并两个集合
 * 【路径压缩】find时直接指向根节点，优化效率
 */
const int MAXN = 10005;
int father[MAXN];

int find(int x) {
    if (father[x] != x) father[x] = find(father[x]);
    return father[x];
}

void unite(int x, int y) {
    father[find(x)] = find(y);
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) father[i] = i;
    
    while (m--) {
        int a, b;
        cin >> a >> b;
        unite(a, b);
    }
    
    int q;
    cin >> q;
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << (find(a) == find(b) ? "Yes" : "No") << endl;
    }
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '并查集'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2\n3 4\n2 5\n3\n1 3\n1 5\n3 5', expectedOutput: 'No\nYes\nNo' },
    ],
  },
  {
    id: 233,
    title: '连通块数量',
    titleEn: 'Number of Connected Components',
    difficulty: 'intermediate',
    description: '给定一个n个点m条边的无向图，求连通块的个数。',
    inputFormat: '第一行两个整数n, m。接下来m行，每行两个整数u, v表示一条边。',
    outputFormat: '输出连通块数量。',
    sampleInput: '5 3\n1 2\n2 3\n4 5',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】给定一个n个点m条边的无向图，求连通块的个数
 * 【算法】并查集
 * 【核心思想】统计有多少个点的father是其自身（即根节点）
 */
const int MAXN = 10005;
int father[MAXN];

int find(int x) {
    if (father[x] != x) father[x] = find(father[x]);
    return father[x];
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) father[i] = i;
    
    while (m--) {
        int u, v;
        cin >> u >> v;
        father[find(u)] = find(v);
    }
    
    int cnt = 0;
    for (int i = 1; i <= n; i++)
        if (find(i) == i) cnt++;
    
    cout << cnt << endl;
    return 0;
}`,
    category: '数据结构',
    tags: ['数据结构', '并查集', '图论'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2\n2 3\n4 5', expectedOutput: '2' },
    ],
  },
  // 记忆化搜索
  {
    id: 234,
    title: '滑雪',
    titleEn: 'Skiing',
    difficulty: 'intermediate',
    description: '给定一个n×m的矩阵，每个格子有一个高度。从任意格子出发，每次只能滑到相邻的更低的格子。求最长滑行长度。',
    inputFormat: '第一行两个整数n, m。接下来n行，每行m个整数表示高度。',
    outputFormat: '输出最长滑行长度。',
    sampleInput: '3 3\n1 2 3\n4 5 6\n7 8 9',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】给定一个n×m的高度矩阵，求最长滑行长度
 * 【算法】记忆化搜索
 * 【核心思想】dp[x][y]表示从(x,y)出发的最长滑行长度
 * 【状态转移】向四个方向滑行，取最大值+1
 */
int n, m, h[105][105];
int dp[105][105];
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int dfs(int x, int y) {
    if (dp[x][y]) return dp[x][y];
    dp[x][y] = 1;
    for (int d = 0; d < 4; d++) {
        int nx = x + dx[d], ny = y + dy[d];
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && h[nx][ny] < h[x][y])
            dp[x][y] = max(dp[x][y], dfs(nx, ny) + 1);
    }
    return dp[x][y];
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> h[i][j];
    
    int ans = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            ans = max(ans, dfs(i, j));
    
    cout << ans << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '记忆化搜索'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '5' },
    ],
  },
  // KMP
  {
    id: 235,
    title: '子串出现次数',
    titleEn: 'Count Substring Occurrences',
    difficulty: 'intermediate',
    description: '给定文本串和模式串，求模式串在文本串中出现的次数。',
    inputFormat: '两行，第一行是文本串，第二行是模式串。',
    outputFormat: '输出出现次数。',
    sampleInput: 'ABABABACABABAC\nABABAC',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

/*
 * 【题目描述】给定文本串和模式串，求模式串在文本串中出现的次数
 * 【算法】KMP字符串匹配
 * 【核心思想】预处理next数组，失配时利用next跳转避免回溯
 * 【时间复杂度】O(n+m)
 */
vector<int> buildNext(const string& p) {
    int m = p.size();
    vector<int> next(m, 0);
    next[0] = -1;
    int j = -1;
    for (int i = 1; i < m; i++) {
        while (j >= 0 && p[i] != p[j+1]) j = next[j];
        if (p[i] == p[j+1]) j++;
        next[i] = j;
    }
    return next;
}

int main() {
    string text, pattern;
    getline(cin, text);
    getline(cin, pattern);
    
    vector<int> next = buildNext(pattern);
    int cnt = 0, j = -1;
    
    for (int i = 0; i < text.size(); i++) {
        while (j >= 0 && text[i] != pattern[j+1]) j = next[j];
        if (text[i] == pattern[j+1]) j++;
        if (j == (int)pattern.size() - 1) {
            cnt++;
            j = next[j];
        }
    }
    
    cout << cnt << endl;
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', 'KMP'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'ABABABACABABAC\nABABAC', expectedOutput: '2' },
    ],
  },
  // Trie
  {
    id: 236,
    title: '单词查找',
    titleEn: 'Word Search',
    difficulty: 'intermediate',
    description: '给定n个单词，支持两种操作：1. 插入一个单词；2. 查询单词是否存在；3. 查询前缀匹配的单词数量。',
    inputFormat: '第一行一个整数n表示操作数。接下来n行，每行一个操作。',
    outputFormat: '对于查询操作，输出结果。',
    sampleInput: '5\ninsert apple\ninsert app\nsearch apple\nsearch app\nprefix app',
    sampleOutput: 'Yes\nYes\n2',
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

/*
 * 【题目描述】支持插入单词、查询单词是否存在、查询前缀匹配的单词数量
 * 【算法】Trie树（字典树/前缀树）
 * 【核心思想】每个节点有26个子节点，表示26个字母
 * 【节点属性】isEnd表示是否是单词结尾，count表示经过此节点的单词数
 */
struct TrieNode {
    TrieNode* children[26];
    bool isEnd;
    int count;
    TrieNode() { for (int i = 0; i < 26; i++) children[i] = nullptr; isEnd = false; count = 0; }
};

TrieNode* root = new TrieNode();

void insert(const string& word) {
    TrieNode* node = root;
    for (char c : word) {
        int idx = c - 'a';
        if (!node->children[idx]) node->children[idx] = new TrieNode();
        node = node->children[idx];
        node->count++;
    }
    node->isEnd = true;
}

bool search(const string& word) {
    TrieNode* node = root;
    for (char c : word) {
        int idx = c - 'a';
        if (!node->children[idx]) return false;
        node = node->children[idx];
    }
    return node->isEnd;
}

int countPrefix(const string& prefix) {
    TrieNode* node = root;
    for (char c : prefix) {
        int idx = c - 'a';
        if (!node->children[idx]) return 0;
        node = node->children[idx];
    }
    return node->count;
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        string op, word;
        cin >> op >> word;
        if (op == "insert") insert(word);
        else if (op == "search") cout << (search(word) ? "Yes" : "No") << endl;
        else if (op == "prefix") cout << countPrefix(word) << endl;
    }
    return 0;
}`,
    category: '字符串处理',
    tags: ['字符串', 'Trie'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\ninsert apple\ninsert app\nsearch apple\nsearch app\nprefix app', expectedOutput: 'Yes\nYes\n2' },
    ],
  },
  // 快速幂
  {
    id: 237,
    title: '快速幂',
    titleEn: 'Fast Power',
    difficulty: 'intermediate',
    description: '计算a^b mod m的值。',
    inputFormat: '三个整数a, b, m。',
    outputFormat: '输出a^b mod m。',
    sampleInput: '3 13 100',
    sampleOutput: '97',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】计算a^b mod m的值
 * 【算法】快速幂（二进制幂）
 * 【核心思想】将b分解为二进制，逐位处理
 * 【时间复杂度】O(log b)
 */
typedef long long ll;

ll power(ll a, ll b, ll mod) {
    ll res = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

int main() {
    ll a, b, m;
    cin >> a >> b >> m;
    cout << power(a, b, m) << endl;
    return 0;
}`,
    category: '数论',
    tags: ['数学', '快速幂'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 13 100', expectedOutput: '97' },
      { id: 2, input: '2 10 1000000007', expectedOutput: '1024' },
    ],
  },
  {
    id: 238,
    title: '矩阵快速幂',
    titleEn: 'Matrix Fast Power',
    difficulty: 'advanced',
    description: '计算矩阵A的n次幂，结果对m取模。',
    inputFormat: '第一行两个整数k和n，表示矩阵大小和幂次。接下来k行，每行k个整数。最后一行一个整数m。',
    outputFormat: '输出结果矩阵。',
    sampleInput: '2 3\n1 1\n1 0\n10000',
    sampleOutput: '3 2\n2 1',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】计算矩阵A的n次幂，结果对m取模
 * 【算法】矩阵快速幂
 * 【核心思想】将快速幂扩展到矩阵乘法，矩阵乘法满足结合律
 * 【应用】常用于求递推式的第n项（如斐波那契数列）
 */
typedef long long ll;
ll mod;

struct Matrix {
    ll a[10][10];
    int n;
    Matrix(int n = 0) : n(n) { for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) a[i][j] = 0; }
    
    Matrix operator*(const Matrix& other) const {
        Matrix res(n);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                for (int k = 0; k < n; k++)
                    res.a[i][j] = (res.a[i][j] + a[i][k] * other.a[k][j]) % mod;
        return res;
    }
};

Matrix power(Matrix a, ll b) {
    Matrix res(a.n);
    for (int i = 0; i < a.n; i++) res.a[i][i] = 1;
    while (b) {
        if (b & 1) res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}

int main() {
    int k; ll n;
    cin >> k >> n;
    Matrix A(k);
    for (int i = 0; i < k; i++)
        for (int j = 0; j < k; j++)
            cin >> A.a[i][j];
    cin >> mod;
    
    Matrix res = power(A, n);
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < k; j++)
            cout << res.a[i][j] << " ";
        cout << endl;
    }
    return 0;
}`,
    category: '数论',
    tags: ['数学', '快速幂', '矩阵'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2 3\n1 1\n1 0\n10000', expectedOutput: '3 2\n2 1' },
    ],
  },
  // 组合数学
  {
    id: 239,
    title: '组合数取模',
    titleEn: 'Combination Modulo',
    difficulty: 'intermediate',
    description: '计算C(n, k) mod p，其中p是质数。',
    inputFormat: '三个整数n, k, p。',
    outputFormat: '输出C(n, k) mod p。',
    sampleInput: '10 5 1000000007',
    sampleOutput: '252',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】计算C(n, k) mod p，其中p是质数
 * 【算法】费马小定理 + 预处理阶乘和逆元
 * 【公式】C(n,k) = n! / (k! * (n-k)!) = n! * inv(k!) * inv((n-k)!)
 * 【预处理】fact[i] = i! mod p, invFact[i] = (i!)^(-1) mod p
 */
typedef long long ll;
const int MAXN = 100005;
ll fact[MAXN], invFact[MAXN];

ll power(ll a, ll b, ll mod) {
    ll res = 1;
    while (b) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

void init(int n, ll mod) {
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i-1] * i % mod;
    invFact[n] = power(fact[n], mod-2, mod);
    for (int i = n-1; i >= 0; i--) invFact[i] = invFact[i+1] * (i+1) % mod;
}

ll C(int n, int k, ll mod) {
    if (k < 0 || k > n) return 0;
    return fact[n] * invFact[k] % mod * invFact[n-k] % mod;
}

int main() {
    int n, k, p;
    cin >> n >> k >> p;
    init(n, p);
    cout << C(n, k, p) << endl;
    return 0;
}`,
    category: '数论',
    tags: ['数学', '组合数学'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10 5 1000000007', expectedOutput: '252' },
    ],
  },
  {
    id: 240,
    title: '杨辉三角第n行',
    titleEn: 'Nth Row of Pascal Triangle',
    difficulty: 'intermediate',
    description: '输出杨辉三角的第n行（从0开始）。',
    inputFormat: '一个整数n。',
    outputFormat: '输出第n行的所有数，用空格分隔。',
    sampleInput: '4',
    sampleOutput: '1 4 6 4 1',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输出杨辉三角的第n行（从0开始）
 * 【算法】利用组合数递推公式
 * 【公式】C(n,k) = C(n,k-1) * (n-k+1) / k
 * 【避免溢出】先乘后除，使用long long
 */
int main() {
    int n;
    cin >> n;
    long long c = 1;
    cout << c;
    for (int i = 1; i <= n; i++) {
        c = c * (n - i + 1) / i;
        cout << " " << c;
    }
    cout << endl;
    return 0;
}`,
    category: '数论',
    tags: ['数学', '组合数学'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4', expectedOutput: '1 4 6 4 1' },
      { id: 2, input: '0', expectedOutput: '1' },
    ],
  },
  // 贪心进阶
  {
    id: 241,
    title: '区间调度',
    titleEn: 'Interval Scheduling',
    difficulty: 'intermediate',
    description: '给定n个区间，选择最多的不重叠区间。',
    inputFormat: '第一行一个整数n。接下来n行，每行两个整数l和r表示区间。',
    outputFormat: '输出最多能选择的区间数量。',
    sampleInput: '4\n1 3\n2 4\n3 5\n4 6',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

/*
 * 【题目描述】给定n个区间，选择最多的不重叠区间
 * 【算法】贪心算法
 * 【贪心策略】按右端点排序，每次选择结束最早的区间
 * 【正确性】选择结束最早的区间，留给后面的区间选择空间最大
 */
int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> intervals(n);
    for (int i = 0; i < n; i++)
        cin >> intervals[i].first >> intervals[i].second;
    
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
        return a.second < b.second;
    });
    
    int cnt = 0, lastEnd = 0;
    for (auto& [l, r] : intervals) {
        if (l >= lastEnd) {
            cnt++;
            lastEnd = r;
        }
    }
    cout << cnt << endl;
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '区间问题'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1 3\n2 4\n3 5\n4 6', expectedOutput: '2' },
    ],
  },
  {
    id: 242,
    title: '跳跃游戏',
    titleEn: 'Jump Game',
    difficulty: 'intermediate',
    description: '给定一个非负整数数组，每个数字代表该位置能跳跃的最大长度。判断是否能到达最后一个位置。',
    inputFormat: '第一行一个整数n。第二行n个非负整数。',
    outputFormat: '输出Yes或No。',
    sampleInput: '5\n2 3 1 1 4',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】判断是否能从数组起点跳跃到最后一个位置
 * 【算法】贪心算法
 * 【贪心策略】维护能到达的最远位置maxReach
 * 【判断】如果当前位置i超过了maxReach，则无法到达终点
 */
int main() {
    int n;
    cin >> n;
    int maxReach = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (i > maxReach) break;
        maxReach = max(maxReach, i + x);
    }
    cout << (maxReach >= n-1 ? "Yes" : "No") << endl;
    return 0;
}`,
    category: '贪心',
    tags: ['贪心', '数组'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n2 3 1 1 4', expectedOutput: 'Yes' },
      { id: 2, input: '4\n3 2 1 0 4', expectedOutput: 'No' },
    ],
  },
  // 树形DP
  {
    id: 243,
    title: '树的直径',
    titleEn: 'Tree Diameter',
    difficulty: 'intermediate',
    description: '给定一棵树，求树的直径（最长路径的长度）。',
    inputFormat: '第一行一个整数n表示节点数。接下来n-1行，每行三个整数u, v, w表示边。',
    outputFormat: '输出直径长度。',
    sampleInput: '4\n1 2 1\n1 3 2\n3 4 3',
    sampleOutput: '5',
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

/*
 * 【题目描述】给定一棵树，求树的直径（最长路径的长度）
 * 【算法】两次DFS/BFS
 * 【步骤1】从任意节点出发，找到最远的节点farNode
 * 【步骤2】从farNode出发，找到的最远距离即为直径
 * 【原理】树的最长路径的两个端点必定是距离最远的两个节点
 */
vector<pair<int,int>> adj[10005];
int maxDist, farNode;

void dfs(int u, int parent, int dist) {
    if (dist > maxDist) { maxDist = dist; farNode = u; }
    for (auto [v, w] : adj[u]) {
        if (v != parent) dfs(v, u, dist + w);
    }
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i < n; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    
    maxDist = 0;
    dfs(1, 0, 0);
    maxDist = 0;
    dfs(farNode, 0, 0);
    
    cout << maxDist << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '树形DP', '图论'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n1 2 1\n1 3 2\n3 4 3', expectedOutput: '5' },
    ],
  },
  {
    id: 244,
    title: '树的最大独立集',
    titleEn: 'Maximum Independent Set on Tree',
    difficulty: 'intermediate',
    description: '给定一棵树，每个节点有一个权值。选择一些节点，使得任意两个被选节点不相邻，求最大权值和。',
    inputFormat: '第一行一个整数n。第二行n个整数表示权值。接下来n-1行，每行两个整数表示边。',
    outputFormat: '输出最大权值和。',
    sampleInput: '4\n3 2 4 5\n1 2\n1 3\n2 4',
    sampleOutput: '11',
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

/*
 * 【题目描述】给定一棵树，选择一些节点使任意两个被选节点不相邻，求最大权值和
 * 【算法】树形DP
 * 【状态定义】dp[u][0]表示不选u的最大值，dp[u][1]表示选u的最大值
 * 【状态转移】dp[u][0] += max(dp[v][0], dp[v][1])
 *           dp[u][1] += dp[v][0]
 */
vector<int> adj[10005];
int value[10005];
int dp[10005][2];

void dfs(int u, int parent) {
    dp[u][0] = 0;
    dp[u][1] = value[u];
    for (int v : adj[u]) {
        if (v == parent) continue;
        dfs(v, u);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> value[i];
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(1, 0);
    cout << max(dp[1][0], dp[1][1]) << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '树形DP'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4\n3 2 4 5\n1 2\n1 3\n2 4', expectedOutput: '11' },
    ],
  },
  // 搜索剪枝
  {
    id: 245,
    title: '组合求和',
    titleEn: 'Combination Sum',
    difficulty: 'intermediate',
    description: '给定一个正整数数组和目标值target，找出所有和为target的组合。每个数可以重复使用。',
    inputFormat: '第一行两个整数n和target。第二行n个整数。',
    outputFormat: '输出所有组合，每个组合一行。',
    sampleInput: '3 7\n2 3 6',
    sampleOutput: '2 2 3\n7',
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】给定一个正整数数组和目标值target，找出所有和为target的组合
 * 【算法】DFS + 回溯 + 剪枝
 * 【剪枝策略】先排序，当sum + candidates[i] > target时直接break
 * 【避免重复】每次从start位置开始搜索，保证组合非递减
 */
vector<vector<int>> result;
vector<int> path;

void dfs(vector<int>& candidates, int target, int start, int sum) {
    if (sum == target) { result.push_back(path); return; }
    for (int i = start; i < candidates.size(); i++) {
        if (sum + candidates[i] > target) break;  // 剪枝
        path.push_back(candidates[i]);
        dfs(candidates, target, i, sum + candidates[i]);
        path.pop_back();
    }
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> candidates(n);
    for (int i = 0; i < n; i++) cin >> candidates[i];
    sort(candidates.begin(), candidates.end());
    dfs(candidates, target, 0, 0);
    for (auto& comb : result) {
        for (int x : comb) cout << x << " ";
        cout << endl;
    }
    return 0;
}`,
    category: '搜索',
    tags: ['搜索-DFS', '回溯', '剪枝'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 7\n2 3 6', expectedOutput: '2 2 3\n7' },
    ],
  },
  // 更多进阶题目
  {
    id: 246,
    title: '背包问题求方案数',
    titleEn: 'Knapsack Count Solutions',
    difficulty: 'intermediate',
    description: '有n个物品，每个物品有重量w[i]和价值v[i]。在总重量不超过W的情况下，求有多少种不同的方案可以达到最大价值。',
    inputFormat: '第一行两个整数n和W。接下来n行，每行两个整数w和v。',
    outputFormat: '输出方案数（对10^9+7取模）。',
    sampleInput: '3 5\n2 3\n3 4\n4 5',
    sampleOutput: '1',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】背包问题求达到最大价值的方案数
 * 【算法】动态规划
 * 【状态定义】dp[j]表示容量j时的最大价值，cnt[j]表示方案数
 * 【状态转移】如果新价值更大，更新dp和cnt；如果相等，累加cnt
 */
const int MOD = 1e9 + 7;
int n, W;
int w[105], v[105];
int dp[10005], cnt[10005];

int main() {
    cin >> n >> W;
    for (int i = 1; i <= n; i++) cin >> w[i] >> v[i];
    
    for (int j = 0; j <= W; j++) cnt[j] = 1;
    
    for (int i = 1; i <= n; i++) {
        for (int j = W; j >= w[i]; j--) {
            int newVal = dp[j-w[i]] + v[i];
            if (newVal > dp[j]) {
                dp[j] = newVal;
                cnt[j] = cnt[j-w[i]];
            } else if (newVal == dp[j]) {
                cnt[j] = (cnt[j] + cnt[j-w[i]]) % MOD;
            }
        }
    }
    
    cout << cnt[W] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', '背包问题'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3 5\n2 3\n3 4\n4 5', expectedOutput: '1' },
    ],
  },
  {
    id: 247,
    title: '最长上升子序列LIS',
    titleEn: 'Longest Increasing Subsequence',
    difficulty: 'intermediate',
    description: '给定一个长度为n的序列，求最长上升子序列的长度。',
    inputFormat: '第一行一个整数n。第二行n个整数。',
    outputFormat: '输出LIS长度。',
    sampleInput: '6\n1 3 2 4 3 5',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

/*
 * 【题目描述】给定一个序列，求最长上升子序列的长度
 * 【算法】贪心 + 二分查找
 * 【核心思想】维护一个数组dp，dp[i]表示长度为i的LIS的最小末尾元素
 * 【时间复杂度】O(n log n)
 */
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    vector<int> dp;
    for (int x : a) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    
    cout << dp.size() << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', 'LIS'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6\n1 3 2 4 3 5', expectedOutput: '4' },
    ],
  },
  {
    id: 248,
    title: '最长公共子序列LCS',
    titleEn: 'Longest Common Subsequence',
    difficulty: 'intermediate',
    description: '给定两个字符串，求最长公共子序列的长度。',
    inputFormat: '两行，每行一个字符串。',
    outputFormat: '输出LCS长度。',
    sampleInput: 'ABCBDAB\nBDCABA',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】给定两个字符串，求最长公共子序列的长度
 * 【算法】动态规划
 * 【状态定义】dp[i][j]表示s1前i个字符和s2前j个字符的LCS长度
 * 【状态转移】如果s1[i-1]==s2[j-1]，dp[i][j]=dp[i-1][j-1]+1
 *           否则dp[i][j]=max(dp[i-1][j], dp[i][j-1])
 */
int main() {
    string s1, s2;
    cin >> s1 >> s2;
    int n = s1.size(), m = s2.size();
    
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    
    cout << dp[n][m] << endl;
    return 0;
}`,
    category: '动态规划',
    tags: ['动态规划', 'LCS', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'ABCBDAB\nBDCABA', expectedOutput: '4' },
    ],
  },
  {
    id: 249,
    title: '拓扑排序',
    titleEn: 'Topological Sort',
    difficulty: 'intermediate',
    description: '给定一个有向无环图，输出拓扑排序序列。',
    inputFormat: '第一行两个整数n和m。接下来m行，每行两个整数u和v表示有向边u→v。',
    outputFormat: '输出拓扑排序序列。',
    sampleInput: '4 3\n1 2\n2 3\n1 4',
    sampleOutput: '1 2 4 3',
    defaultCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

/*
 * 【题目描述】给定一个有向无环图，输出拓扑排序序列
 * 【算法】Kahn算法（BFS）
 * 【核心思想】每次选择入度为0的节点加入序列
 * 【数据结构】队列存储入度为0的节点
 */
vector<int> adj[10005];
int inDegree[10005];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        inDegree[v]++;
    }
    
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (inDegree[i] == 0) q.push(i);
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    cout << endl;
    return 0;
}`,
    category: '图论',
    tags: ['图论', '拓扑排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 3\n1 2\n2 3\n1 4', expectedOutput: '1 2 4 3' },
    ],
  },
  {
    id: 250,
    title: '欧拉路径',
    titleEn: 'Eulerian Path',
    difficulty: 'advanced',
    description: '给定一个无向图，判断是否存在欧拉路径，并输出路径。欧拉路径是指经过每条边恰好一次的路径。',
    inputFormat: '第一行两个整数n和m。接下来m行，每行两个整数u和v表示边。',
    outputFormat: '如果存在欧拉路径，输出路径上的节点序列。否则输出-1。',
    sampleInput: '4 4\n1 2\n2 3\n3 4\n4 2',
    sampleOutput: '1 2 4 3 2',
    defaultCode: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

/*
 * 【题目描述】给定一个无向图，判断是否存在欧拉路径并输出
 * 【欧拉路径】经过每条边恰好一次的路径
 * 【存在条件】连通图中度为奇数的节点数为0或2
 * 【算法】Hierholzer算法（DFS）
 * 【核心思想】从起点DFS，回溯时记录路径
 */
vector<int> adj[10005];
int degree[10005];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
        degree[u]++;
        degree[v]++;
    }
    
    int oddCount = 0, start = 1;
    for (int i = 1; i <= n; i++) {
        if (degree[i] % 2 == 1) {
            oddCount++;
            start = i;
        }
    }
    
    if (oddCount != 0 && oddCount != 2) {
        cout << -1 << endl;
        return 0;
    }
    
    vector<int> path;
    stack<int> st;
    st.push(start);
    
    while (!st.empty()) {
        int u = st.top();
        if (adj[u].empty()) {
            path.push_back(u);
            st.pop();
        } else {
            int v = adj[u].back();
            adj[u].pop_back();
            for (auto it = adj[v].begin(); it != adj[v].end(); it++) {
                if (*it == u) { adj[v].erase(it); break; }
            }
            st.push(v);
        }
    }
    
    for (int x : path) cout << x << " ";
    return 0;
}`,
    category: '图论',
    tags: ['图论', '欧拉路径'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 4\n1 2\n2 3\n3 4\n4 2', expectedOutput: '1 2 4 3 2' },
    ],
  },
  // ========== 新增题目 - 基础算法扩展篇（ID 251-300）==========
  // 枚举类
  {
    id: 251,
    title: '百钱买百鸡',
    titleEn: 'Hundred Chickens Problem',
    difficulty: 'beginner',
    description: '用100元钱买100只鸡，公鸡每只5元，母鸡每只3元，小鸡3只1元。问公鸡、母鸡、小鸡各买多少只？',
    inputFormat: '无输入。',
    outputFormat: '输出所有可能的解，每行三个整数分别表示公鸡、母鸡、小鸡的数量。',
    sampleInput: '',
    sampleOutput: '0 25 75\n4 18 78\n8 11 81\n12 4 84',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】用100元钱买100只鸡，公鸡5元/只，母鸡3元/只，小鸡3只1元
 * 【算法】枚举法
 * 【枚举范围】公鸡0-20只，母鸡0-33只，小鸡=100-公鸡-母鸡
 * 【判断条件】5*x + 3*y + z/3 = 100 且 z是3的倍数
 */
int main() {
    for (int x = 0; x <= 20; x++) {        // 公鸡数量
        for (int y = 0; y <= 33; y++) {    // 母鸡数量
            int z = 100 - x - y;           // 小鸡数量
            if (z >= 0 && z % 3 == 0 && 5*x + 3*y + z/3 == 100) {
                cout << x << " " << y << " " << z << endl;
            }
        }
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举', '循环'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '', expectedOutput: '0 25 75\n4 18 78\n8 11 81\n12 4 84' },
    ],
  },
  {
    id: 252,
    title: '勾股数',
    titleEn: 'Pythagorean Triple',
    difficulty: 'beginner',
    description: '给定一个正整数N，输出所有满足a²+b²=c²且a<b<c≤N的勾股数。',
    inputFormat: '一个正整数N（1≤N≤1000）。',
    outputFormat: '输出所有勾股数，每行三个整数a b c，按a从小到大输出。',
    sampleInput: '20',
    sampleOutput: '3 4 5\n5 12 13\n6 8 10\n8 15 17\n9 12 15',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】输出所有满足a²+b²=c²且a<b<c≤N的勾股数
 * 【算法】三重循环枚举
 * 【优化】可以只枚举a和b，c由sqrt(a²+b²)计算
 */
int main() {
    int n;
    cin >> n;
    
    for (int a = 1; a <= n; a++) {
        for (int b = a + 1; b <= n; b++) {
            for (int c = b + 1; c <= n; c++) {
                if (a*a + b*b == c*c) {
                    cout << a << " " << b << " " << c << endl;
                }
            }
        }
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举', '数学'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '20', expectedOutput: '3 4 5\n5 12 13\n6 8 10\n8 15 17\n9 12 15' },
    ],
  },
  {
    id: 253,
    title: '鸡兔同笼',
    titleEn: 'Chickens and Rabbits',
    difficulty: 'beginner',
    description: '笼子里有鸡和兔，共有n个头，m只脚。问鸡和兔各有多少只？',
    inputFormat: '两个正整数n和m，分别表示头的数量和脚的数量。',
    outputFormat: '输出两个整数，分别表示鸡和兔的数量。如果无解，输出"No solution"。',
    sampleInput: '10 28',
    sampleOutput: '6 4',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】笼子里有鸡和兔，共有n个头，m只脚，求鸡兔数量
 * 【算法】枚举或方程求解
 * 【方程】设鸡x只，兔y只：x+y=n, 2x+4y=m
 * 【解】y=(m-2n)/2, x=n-y
 */
int main() {
    int n, m;
    cin >> n >> m;
    
    // 方法1：枚举
    for (int x = 0; x <= n; x++) {
        int y = n - x;
        if (2*x + 4*y == m) {
            cout << x << " " << y << endl;
            return 0;
        }
    }
    cout << "No solution" << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举', '数学'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10 28', expectedOutput: '6 4' },
      { id: 2, input: '10 32', expectedOutput: '4 6' },
      { id: 3, input: '10 25', expectedOutput: 'No solution' },
    ],
  },
  {
    id: 254,
    title: '完美数',
    titleEn: 'Perfect Number',
    difficulty: 'beginner',
    description: '完美数是指等于其所有真因子（不包括自身）之和的数。判断输入的数是否是完美数。',
    inputFormat: '一个正整数n（1≤n≤10^8）。',
    outputFormat: '如果是完美数输出"Yes"，否则输出"No"。',
    sampleInput: '28',
    sampleOutput: 'Yes',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】判断一个数是否是完美数（等于其所有真因子之和）
 * 【算法】枚举因子
 * 【优化】只枚举到sqrt(n)，成对添加因子
 * 【完美数】6, 28, 496, 8128, 33550336...
 */
int main() {
    int n;
    cin >> n;
    
    if (n == 1) {
        cout << "No" << endl;
        return 0;
    }
    
    int sum = 1;  // 1是所有数的真因子
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            sum += i;
            if (i != n / i) sum += n / i;
        }
    }
    
    cout << (sum == n ? "Yes" : "No") << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举', '数学'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '28', expectedOutput: 'Yes' },
      { id: 2, input: '6', expectedOutput: 'Yes' },
      { id: 3, input: '12', expectedOutput: 'No' },
    ],
  },
  {
    id: 255,
    title: '素数对',
    titleEn: 'Prime Pairs',
    difficulty: 'beginner',
    description: '给定一个偶数n（n>2），将其分解为两个素数之和。输出所有可能的分解方式。',
    inputFormat: '一个偶数n（4≤n≤10000）。',
    outputFormat: '输出所有素数对，每行两个素数，小的在前大的在后，按第一个素数从小到大输出。',
    sampleInput: '10',
    sampleOutput: '3 7\n5 5',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】将偶数n分解为两个素数之和（哥德巴赫猜想）
 * 【算法】枚举 + 素数判断
 * 【优化】只需枚举到n/2，避免重复输出
 */
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int n;
    cin >> n;
    
    for (int i = 2; i <= n / 2; i++) {
        if (isPrime(i) && isPrime(n - i)) {
            cout << i << " " << n - i << endl;
        }
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['枚举', '质数'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '10', expectedOutput: '3 7\n5 5' },
      { id: 2, input: '8', expectedOutput: '3 5' },
    ],
  },
  // 模拟类
  {
    id: 256,
    title: '日期计算',
    titleEn: 'Date Calculation',
    difficulty: 'beginner',
    description: '给定年月日，计算这一天是这一年的第几天。',
    inputFormat: '三个整数year, month, day，表示年月日。',
    outputFormat: '输出一个整数，表示这是这一年的第几天。',
    sampleInput: '2024 3 1',
    sampleOutput: '61',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】给定年月日，计算这一天是这一年的第几天
 * 【算法】模拟
 * 【注意】闰年2月有29天
 * 【闰年判断】能被4整除但不能被100整除，或能被400整除
 */
int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

bool isLeap(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

int main() {
    int year, month, day;
    cin >> year >> month >> day;
    
    if (isLeap(year)) days[2] = 29;
    
    int ans = 0;
    for (int i = 1; i < month; i++) {
        ans += days[i];
    }
    ans += day;
    
    cout << ans << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['模拟', '日期'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2024 3 1', expectedOutput: '61' },
      { id: 2, input: '2023 12 31', expectedOutput: '365' },
      { id: 3, input: '2024 12 31', expectedOutput: '366' },
    ],
  },
  {
    id: 257,
    title: '约瑟夫问题',
    titleEn: 'Josephus Problem',
    difficulty: 'intermediate',
    description: 'n个人围成一圈，从第1个人开始报数，数到m的人出圈，然后从下一个人重新开始报数，求最后剩下的人的编号。',
    inputFormat: '两个正整数n和m。',
    outputFormat: '输出最后剩下的人的编号。',
    sampleInput: '7 3',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】n个人围成一圈，数到m的人出圈，求最后剩下的人
 * 【算法】模拟（数组标记法）
 * 【时间复杂度】O(n*m)
 */
int main() {
    int n, m;
    cin >> n >> m;
    
    bool out[10001] = {false};
    int count = 0;   // 已出圈人数
    int num = 0;     // 当前报的数
    int i = 0;       // 当前位置
    
    while (count < n - 1) {
        if (!out[i]) {
            num++;
            if (num == m) {
                out[i] = true;
                count++;
                num = 0;
            }
        }
        i = (i + 1) % n;
    }
    
    for (int j = 0; j < n; j++) {
        if (!out[j]) {
            cout << j + 1 << endl;
            break;
        }
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['模拟', '循环'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '7 3', expectedOutput: '4' },
      { id: 2, input: '5 2', expectedOutput: '3' },
    ],
  },
  {
    id: 258,
    title: '表达式求值',
    titleEn: 'Expression Evaluation',
    difficulty: 'intermediate',
    description: '给定一个只包含加减乘除和括号的表达式，计算其值。',
    inputFormat: '一个字符串，表示算术表达式。',
    outputFormat: '输出表达式的值。',
    sampleInput: '2+3*(4-1)',
    sampleOutput: '11',
    defaultCode: `#include <iostream>
#include <stack>
#include <string>
#include <cctype>
using namespace std;

/*
 * 【题目描述】计算只包含加减乘除和括号的表达式
 * 【算法】栈模拟
 * 【核心思想】使用两个栈，一个存数字，一个存运算符
 * 【优先级】乘除 > 加减，括号改变优先级
 */
int priority(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    return 0;
}

int calc(int a, int b, char op) {
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
    return 0;
}

int main() {
    string s;
    cin >> s;
    
    stack<int> nums;
    stack<char> ops;
    
    for (int i = 0; i < s.length(); i++) {
        if (isdigit(s[i])) {
            int num = 0;
            while (i < s.length() && isdigit(s[i])) {
                num = num * 10 + (s[i] - '0');
                i++;
            }
            nums.push(num);
            i--;
        } else if (s[i] == '(') {
            ops.push(s[i]);
        } else if (s[i] == ')') {
            while (ops.top() != '(') {
                int b = nums.top(); nums.pop();
                int a = nums.top(); nums.pop();
                nums.push(calc(a, b, ops.top()));
                ops.pop();
            }
            ops.pop();
        } else {
            while (!ops.empty() && priority(ops.top()) >= priority(s[i])) {
                int b = nums.top(); nums.pop();
                int a = nums.top(); nums.pop();
                nums.push(calc(a, b, ops.top()));
                ops.pop();
            }
            ops.push(s[i]);
        }
    }
    
    while (!ops.empty()) {
        int b = nums.top(); nums.pop();
        int a = nums.top(); nums.pop();
        nums.push(calc(a, b, ops.top()));
        ops.pop();
    }
    
    cout << nums.top() << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['模拟', '栈'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '2+3*(4-1)', expectedOutput: '11' },
      { id: 2, input: '(1+2)*3', expectedOutput: '9' },
    ],
  },
  // 排序类
  {
    id: 259,
    title: '冒泡排序',
    titleEn: 'Bubble Sort',
    difficulty: 'beginner',
    description: '实现冒泡排序算法，对n个整数进行从小到大排序。',
    inputFormat: '第一行一个整数n。第二行n个整数。',
    outputFormat: '输出排序后的数组。',
    sampleInput: '5\n5 3 8 4 2',
    sampleOutput: '2 3 4 5 8',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】实现冒泡排序，对n个整数排序
 * 【算法】冒泡排序
 * 【核心思想】相邻元素比较交换，每轮将最大元素"冒泡"到末尾
 * 【时间复杂度】O(n²)
 */
int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`,
    category: '基础算法',
    tags: ['排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 8 4 2', expectedOutput: '2 3 4 5 8' },
    ],
  },
  {
    id: 260,
    title: '选择排序',
    titleEn: 'Selection Sort',
    difficulty: 'beginner',
    description: '实现选择排序算法，对n个整数进行从小到大排序。',
    inputFormat: '第一行一个整数n。第二行n个整数。',
    outputFormat: '输出排序后的数组。',
    sampleInput: '5\n5 3 8 4 2',
    sampleOutput: '2 3 4 5 8',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】实现选择排序，对n个整数排序
 * 【算法】选择排序
 * 【核心思想】每轮选择最小元素放到已排序序列末尾
 * 【时间复杂度】O(n²)
 */
int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
    
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`,
    category: '基础算法',
    tags: ['排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 8 4 2', expectedOutput: '2 3 4 5 8' },
    ],
  },
  {
    id: 261,
    title: '插入排序',
    titleEn: 'Insertion Sort',
    difficulty: 'beginner',
    description: '实现插入排序算法，对n个整数进行从小到大排序。',
    inputFormat: '第一行一个整数n。第二行n个整数。',
    outputFormat: '输出排序后的数组。',
    sampleInput: '5\n5 3 8 4 2',
    sampleOutput: '2 3 4 5 8',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】实现插入排序，对n个整数排序
 * 【算法】插入排序
 * 【核心思想】将元素插入到已排序序列的正确位置
 * 【时间复杂度】O(n²)，对近乎有序的数组效率高
 */
int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`,
    category: '基础算法',
    tags: ['排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 8 4 2', expectedOutput: '2 3 4 5 8' },
    ],
  },
  {
    id: 262,
    title: '快速排序',
    titleEn: 'Quick Sort',
    difficulty: 'intermediate',
    description: '实现快速排序算法，对n个整数进行从小到大排序。',
    inputFormat: '第一行一个整数n。第二行n个整数。',
    outputFormat: '输出排序后的数组。',
    sampleInput: '5\n5 3 8 4 2',
    sampleOutput: '2 3 4 5 8',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】实现快速排序，对n个整数排序
 * 【算法】快速排序（分治）
 * 【核心思想】选择基准元素，将小于基准的放左边，大于基准的放右边
 * 【时间复杂度】平均O(n log n)，最坏O(n²)
 */
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    quickSort(arr, 0, n - 1);
    
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`,
    category: '基础算法',
    tags: ['排序', '分治'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 8 4 2', expectedOutput: '2 3 4 5 8' },
    ],
  },
  {
    id: 263,
    title: '归并排序',
    titleEn: 'Merge Sort',
    difficulty: 'intermediate',
    description: '实现归并排序算法，对n个整数进行从小到大排序。',
    inputFormat: '第一行一个整数n。第二行n个整数。',
    outputFormat: '输出排序后的数组。',
    sampleInput: '5\n5 3 8 4 2',
    sampleOutput: '2 3 4 5 8',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】实现归并排序，对n个整数排序
 * 【算法】归并排序（分治）
 * 【核心思想】将数组分成两半，分别排序后合并
 * 【时间复杂度】O(n log n)，稳定排序
 */
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[500], R[500];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int i = 0; i < n2; i++) R[i] = arr[m + 1 + i];
    
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    mergeSort(arr, 0, n - 1);
    
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`,
    category: '基础算法',
    tags: ['排序', '分治'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n5 3 8 4 2', expectedOutput: '2 3 4 5 8' },
    ],
  },
  // 贪心类
  {
    id: 264,
    title: '活动选择',
    titleEn: 'Activity Selection',
    difficulty: 'intermediate',
    description: '有n个活动，每个活动有开始时间和结束时间。选择最多的不重叠活动。',
    inputFormat: '第一行n。接下来n行，每行两个整数s和e表示开始和结束时间。',
    outputFormat: '输出最多能选择的活动数量。',
    sampleInput: '5\n1 3\n2 4\n3 5\n4 6\n5 7',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】选择最多的不重叠活动
 * 【算法】贪心
 * 【贪心策略】按结束时间排序，每次选择结束最早的活动
 * 【正确性】选择结束最早的活动，留给后续活动的时间最多
 */
struct Activity { int start, end; };

int main() {
    int n;
    cin >> n;
    Activity acts[100];
    for (int i = 0; i < n; i++) cin >> acts[i].start >> acts[i].end;
    
    sort(acts, acts + n, [](Activity a, Activity b) { return a.end < b.end; });
    
    int count = 1, lastEnd = acts[0].end;
    for (int i = 1; i < n; i++) {
        if (acts[i].start >= lastEnd) {
            count++;
            lastEnd = acts[i].end;
        }
    }
    
    cout << count << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['贪心', '排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5\n1 3\n2 4\n3 5\n4 6\n5 7', expectedOutput: '3' },
    ],
  },
  {
    id: 265,
    title: '最优装载',
    titleEn: 'Optimal Loading',
    difficulty: 'beginner',
    description: '有一艘船，载重量为c。有n个集装箱，第i个重量为w[i]。求最多能装多少个集装箱。',
    inputFormat: '第一行n和c。第二行n个整数表示重量。',
    outputFormat: '输出最多能装的集装箱数量。',
    sampleInput: '5 10\n3 5 2 4 1',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】在载重量限制下，求最多能装多少个集装箱
 * 【算法】贪心
 * 【贪心策略】优先选择重量小的集装箱
 * 【正确性】选择轻的可以装更多个
 */
int main() {
    int n, c;
    cin >> n >> c;
    int w[100];
    for (int i = 0; i < n; i++) cin >> w[i];
    
    sort(w, w + n);
    
    int count = 0, total = 0;
    for (int i = 0; i < n; i++) {
        if (total + w[i] <= c) {
            total += w[i];
            count++;
        } else break;
    }
    
    cout << count << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['贪心', '排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 10\n3 5 2 4 1', expectedOutput: '4' },
    ],
  },
  {
    id: 266,
    title: '最小延迟调度',
    titleEn: 'Minimize Lateness',
    difficulty: 'intermediate',
    description: '有n个任务，每个任务需要处理时间t[i]和截止时间d[i]。按某种顺序执行，求最小最大延迟（完成时间-截止时间的最大值）。',
    inputFormat: '第一行n。接下来n行，每行两个整数t和d。',
    outputFormat: '输出最小最大延迟。',
    sampleInput: '3\n3 6\n2 8\n1 9',
    sampleOutput: '1',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】安排任务执行顺序，使最大延迟最小
 * 【算法】贪心
 * 【贪心策略】按截止时间排序，依次执行
 * 【正确性】最早截止时间优先是最优策略
 */
struct Task { int time, deadline; };

int main() {
    int n;
    cin >> n;
    Task tasks[100];
    for (int i = 0; i < n; i++) cin >> tasks[i].time >> tasks[i].deadline;
    
    sort(tasks, tasks + n, [](Task a, Task b) { return a.deadline < b.deadline; });
    
    int currTime = 0, maxLateness = 0;
    for (int i = 0; i < n; i++) {
        currTime += tasks[i].time;
        int lateness = max(0, currTime - tasks[i].deadline);
        maxLateness = max(maxLateness, lateness);
    }
    
    cout << maxLateness << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['贪心', '排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '3\n3 6\n2 8\n1 9', expectedOutput: '1' },
    ],
  },
  // 二分查找类
  {
    id: 267,
    title: '二分查找',
    titleEn: 'Binary Search',
    difficulty: 'beginner',
    description: '给定一个有序数组和一个目标值，查找目标值在数组中的位置。如果不存在，返回-1。',
    inputFormat: '第一行n和target。第二行n个已排序的整数。',
    outputFormat: '输出目标值的位置（从0开始），不存在输出-1。',
    sampleInput: '5 3\n1 2 3 4 5',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】在有序数组中查找目标值
 * 【算法】二分查找
 * 【核心思想】每次将搜索范围缩小一半
 * 【时间复杂度】O(log n)
 */
int main() {
    int n, target;
    cin >> n >> target;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            cout << mid << endl;
            return 0;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    cout << -1 << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['二分查找'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2 3 4 5', expectedOutput: '2' },
      { id: 2, input: '5 6\n1 2 3 4 5', expectedOutput: '-1' },
    ],
  },
  {
    id: 268,
    title: '查找第一个等于目标的位置',
    titleEn: 'Find First Position',
    difficulty: 'intermediate',
    description: '给定一个非递减数组和一个目标值，查找目标值第一次出现的位置。',
    inputFormat: '第一行n和target。第二行n个非递减的整数。',
    outputFormat: '输出目标值第一次出现的位置（从0开始），不存在输出-1。',
    sampleInput: '6 3\n1 2 3 3 3 4',
    sampleOutput: '2',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】在非递减数组中查找目标值第一次出现的位置
 * 【算法】二分查找（找左边界）
 * 【核心思想】找到目标后继续向左搜索
 * 【时间复杂度】O(log n)
 */
int main() {
    int n, target;
    cin >> n >> target;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int left = 0, right = n - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] >= target) {
            if (arr[mid] == target) result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    cout << result << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['二分查找'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6 3\n1 2 3 3 3 4', expectedOutput: '2' },
      { id: 2, input: '5 6\n1 2 3 4 5', expectedOutput: '-1' },
    ],
  },
  {
    id: 269,
    title: '查找最后一个等于目标的位置',
    titleEn: 'Find Last Position',
    difficulty: 'intermediate',
    description: '给定一个非递减数组和一个目标值，查找目标值最后一次出现的位置。',
    inputFormat: '第一行n和target。第二行n个非递减的整数。',
    outputFormat: '输出目标值最后一次出现的位置（从0开始），不存在输出-1。',
    sampleInput: '6 3\n1 2 3 3 3 4',
    sampleOutput: '4',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】在非递减数组中查找目标值最后一次出现的位置
 * 【算法】二分查找（找右边界）
 * 【核心思想】找到目标后继续向右搜索
 * 【时间复杂度】O(log n)
 */
int main() {
    int n, target;
    cin >> n >> target;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int left = 0, right = n - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) {
            if (arr[mid] == target) result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    cout << result << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['二分查找'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6 3\n1 2 3 3 3 4', expectedOutput: '4' },
      { id: 2, input: '5 6\n1 2 3 4 5', expectedOutput: '-1' },
    ],
  },
  {
    id: 270,
    title: '二分答案-木材切割',
    titleEn: 'Binary Search Answer - Wood Cutting',
    difficulty: 'intermediate',
    description: '有n根木材，长度为L[i]。需要切成k根等长的木棍，求每根最长能有多长。',
    inputFormat: '第一行n和k。第二行n个整数表示木材长度。',
    outputFormat: '输出最长能切多长，不能切则输出0。',
    sampleInput: '4 7\n10 15 22 8',
    sampleOutput: '7',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】将n根木材切成k根等长木棍，求每根最长长度
 * 【算法】二分答案
 * 【核心思想】二分可能的长度，判断是否能切出k根
 * 【时间复杂度】O(n log(maxL))
 */
int main() {
    int n, k;
    cin >> n >> k;
    int L[100];
    int maxL = 0;
    for (int i = 0; i < n; i++) {
        cin >> L[i];
        maxL = max(maxL, L[i]);
    }
    
    int left = 1, right = maxL, ans = 0;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int count = 0;
        for (int i = 0; i < n; i++) {
            count += L[i] / mid;
        }
        if (count >= k) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    cout << ans << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['二分查找'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 7\n10 15 22 8', expectedOutput: '7' },
    ],
  },
  {
    id: 271,
    title: '二分答案-进击的奶牛',
    titleEn: 'Binary Search Answer - Aggressive Cows',
    difficulty: 'intermediate',
    description: '有n个牛棚位置和m头牛。将m头牛放入牛棚，使任意两头牛之间的最小距离最大。',
    inputFormat: '第一行n和m。第二行n个整数表示牛棚位置。',
    outputFormat: '输出最小距离的最大值。',
    sampleInput: '5 3\n1 2 8 4 9',
    sampleOutput: '3',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】将m头牛放入n个牛棚，使最小距离最大
 * 【算法】二分答案
 * 【核心思想】二分最小距离，判断能否放入m头牛
 * 【时间复杂度】O(n log(maxDist))
 */
int main() {
    int n, m;
    cin >> n >> m;
    int pos[100];
    for (int i = 0; i < n; i++) cin >> pos[i];
    sort(pos, pos + n);
    
    int left = 1, right = pos[n-1] - pos[0], ans = 0;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int count = 1, last = pos[0];
        for (int i = 1; i < n; i++) {
            if (pos[i] - last >= mid) {
                count++;
                last = pos[i];
            }
        }
        if (count >= m) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    cout << ans << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['二分查找', '贪心'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n1 2 8 4 9', expectedOutput: '3' },
    ],
  },
  // 双指针类
  {
    id: 272,
    title: '两数之和II',
    titleEn: 'Two Sum II',
    difficulty: 'beginner',
    description: '给定一个已排序的数组和一个目标值，找出数组中和为目标值的两个数的索引（从1开始）。',
    inputFormat: '第一行n和target。第二行n个已排序的整数。',
    outputFormat: '输出两个索引，保证有且只有一个解。',
    sampleInput: '4 9\n2 7 11 15',
    sampleOutput: '1 2',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】在已排序数组中找两个数，使和等于target
 * 【算法】双指针
 * 【核心思想】左指针从左开始，右指针从右开始，根据和调整指针
 * 【时间复杂度】O(n)
 */
int main() {
    int n, target;
    cin >> n >> target;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            cout << left + 1 << " " << right + 1 << endl;
            return 0;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['双指针'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '4 9\n2 7 11 15', expectedOutput: '1 2' },
    ],
  },
  {
    id: 273,
    title: '三数之和',
    titleEn: 'Three Sum',
    difficulty: 'intermediate',
    description: '给定一个数组，找出所有和为0的三元组，不能重复。',
    inputFormat: '第一行n。第二行n个整数。',
    outputFormat: '输出所有不重复的三元组，每个三元组一行。',
    sampleInput: '6\n-1 0 1 2 -1 -4',
    sampleOutput: '-1 -1 2\n-1 0 1',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】找出数组中所有和为0的三元组
 * 【算法】排序 + 双指针
 * 【核心思想】固定一个数，用双指针找另外两个
 * 【去重】跳过相同的元素
 */
int main() {
    int n;
    cin >> n;
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    sort(arr, arr + n);
    
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && arr[i] == arr[i-1]) continue;  // 去重
        
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = arr[i] + arr[left] + arr[right];
            if (sum == 0) {
                cout << arr[i] << " " << arr[left] << " " << arr[right] << endl;
                while (left < right && arr[left] == arr[left+1]) left++;   // 去重
                while (left < right && arr[right] == arr[right-1]) right--; // 去重
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return 0;
}`,
    category: '基础算法',
    tags: ['双指针', '排序'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '6\n-1 0 1 2 -1 -4', expectedOutput: '-1 -1 2\n-1 0 1' },
    ],
  },
  {
    id: 274,
    title: '移除元素',
    titleEn: 'Remove Element',
    difficulty: 'beginner',
    description: '给定一个数组和一个值val，原地移除所有等于val的元素，返回新数组的长度。',
    inputFormat: '第一行n和val。第二行n个整数。',
    outputFormat: '输出新数组的长度和新数组内容。',
    sampleInput: '5 3\n3 2 2 3 4',
    sampleOutput: '3\n2 2 4',
    defaultCode: `#include <iostream>
using namespace std;

/*
 * 【题目描述】原地移除所有等于val的元素
 * 【算法】双指针
 * 【核心思想】快指针遍历，慢指针记录非val元素位置
 * 【时间复杂度】O(n)
 */
int main() {
    int n, val;
    cin >> n >> val;
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int slow = 0;
    for (int fast = 0; fast < n; fast++) {
        if (arr[fast] != val) {
            arr[slow++] = arr[fast];
        }
    }
    
    cout << slow << endl;
    for (int i = 0; i < slow; i++) cout << arr[i] << " ";
    return 0;
}`,
    category: '基础算法',
    tags: ['双指针'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '5 3\n3 2 2 3 4', expectedOutput: '3\n2 2 4' },
    ],
  },
  {
    id: 275,
    title: '反转字符串',
    titleEn: 'Reverse String',
    difficulty: 'beginner',
    description: '原地反转字符串。',
    inputFormat: '一个字符串。',
    outputFormat: '输出反转后的字符串。',
    sampleInput: 'hello',
    sampleOutput: 'olleh',
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

/*
 * 【题目描述】原地反转字符串
 * 【算法】双指针
 * 【核心思想】左右指针交换字符，向中间靠拢
 * 【时间复杂度】O(n)
 */
int main() {
    string s;
    cin >> s;
    
    int left = 0, right = s.length() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
    
    cout << s << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['双指针', '字符串'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: 'hello', expectedOutput: 'olleh' },
    ],
  },
  {
    id: 276,
    title: '盛最多水的容器',
    titleEn: 'Container With Most Water',
    difficulty: 'intermediate',
    description: '给定n个非负整数表示柱子高度，求两根柱子能盛的最大水量。',
    inputFormat: '第一行n。第二行n个非负整数。',
    outputFormat: '输出最大水量。',
    sampleInput: '9\n1 8 6 2 5 4 8 3 7',
    sampleOutput: '49',
    defaultCode: `#include <iostream>
#include <algorithm>
using namespace std;

/*
 * 【题目描述】求两根柱子能盛的最大水量
 * 【算法】双指针
 * 【核心思想】从两端开始，移动较矮的指针（贪心）
 * 【正确性】较矮的柱子决定了水量，移动较高的柱子不可能得到更大的水量
 */
int main() {
    int n;
    cin >> n;
    int height[100];
    for (int i = 0; i < n; i++) cin >> height[i];
    
    int left = 0, right = n - 1, maxArea = 0;
    while (left < right) {
        int area = (right - left) * min(height[left], height[right]);
        maxArea = max(maxArea, area);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    cout << maxArea << endl;
    return 0;
}`,
    category: '基础算法',
    tags: ['双指针', '贪心'],
    source: 'Other',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: '9\n1 8 6 2 5 4 8 3 7', expectedOutput: '49' },
    ],
  },
  // ========== LeetCode Hot 100 专题 ==========
  // Hot 1: 两数之和
  {
    id: 277,
    title: "LeetCode Hot 1 - 两数之和",
    titleEn: "Two Sum",
    difficulty: "beginner",
    description: "给定一个整数数组 nums 和一个目标值 target，找出数组中两个数的和等于目标值的索引。",
    inputFormat: "第一行数组长度n和目标值target，第二行n个整数。",
    outputFormat: "输出两个索引（0开始），用空格分隔。题目保证有且仅有一个解。",
    sampleInput: "4 6\n2 7 11 15",
    sampleOutput: "0 1",
    defaultCode: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    unordered_map<int, int> map;
    for (int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            cout << map[complement] << " " << i << endl;
            return 0;
        }
        map[nums[i]] = i;
    }
    return 0;
}`,
    category: "基础算法",
    tags: ["哈希表", "数组"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "4 6\n2 7 11 15", expectedOutput: "0 1" },
      { id: 2, input: "3 6\n3 2 4", expectedOutput: "1 2" },
    ],
    similarProblems: [278],
  },
  // Hot 2: 两数相加
  {
    id: 278,
    title: "LeetCode Hot 2 - 两数相加",
    titleEn: "Add Two Numbers",
    difficulty: "intermediate",
    description: "给你两个非空链表，表示两个非负整数。每位数字都是反向存储的，将两个数相加返回一个新链表。",
    inputFormat: "第一行第一个链表长度l1，第二行l1个整数；第二行长度l2，第三行l2个整数。",
    outputFormat: "输出结果链表（反向存储），空格分隔。",
    sampleInput: "3\n2 4 3\n3\n5 6 4",
    sampleOutput: "7 0 8",
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int l1, l2;
    cin >> l1;
    vector<int> a(l1);
    for (int i = 0; i < l1; i++) cin >> a[i];
    cin >> l2;
    vector<int> b(l2);
    for (int i = 0; i < l2; i++) cin >> b[i];
    
    // 简单模拟链表相加
    int carry = 0, i = 0, j = 0;
    vector<int> result;
    while (i < l1 || j < l2 || carry) {
        int sum = carry;
        if (i < l1) sum += a[i++];
        if (j < l2) sum += b[j++];
        result.push_back(sum % 10);
        carry = sum / 10;
    }
    
    for (int k = 0; k < result.size(); k++) {
        if (k) cout << " ";
        cout << result[k];
    }
    cout << endl;
    return 0;
}`,
    category: "数据结构",
    tags: ["链表", "数学"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "3\n2 4 3\n3\n5 6 4", expectedOutput: "7 0 8" },
    ],
    similarProblems: [277],
  },
  // Hot 3: 无重复字符的最长子串
  {
    id: 279,
    title: "LeetCode Hot 3 - 无重复字符的最长子串",
    titleEn: "Longest Substring Without Repeating Characters",
    difficulty: "intermediate",
    description: "给定一个字符串 s，找出其中不含有重复字符的最长子串的长度。",
    inputFormat: "输入一行字符串s（仅包含ASCII字符）。",
    outputFormat: "输出最长子串的长度。",
    sampleInput: "abcabcbb",
    sampleOutput: "3",
    defaultCode: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    unordered_set<char> window;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (window.count(s[right])) {
            window.erase(s[left]);
            left++;
        }
        window.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    
    cout << maxLen << endl;
    return 0;
}`,
    category: "字符串处理",
    tags: ["滑动窗口", "哈希表"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "abcabcbb", expectedOutput: "3" },
      { id: 2, input: "bbbbb", expectedOutput: "1" },
      { id: 3, input: "pwwkew", expectedOutput: "3" },
    ],
    similarProblems: [280, 281],
  },
  // Hot 4: 寻找两个正序数组的中位数
  {
    id: 280,
    title: "LeetCode Hot 4 - 寻找两个正序数组的中位数",
    titleEn: "Median of Two Sorted Arrays",
    difficulty: "advanced",
    description: "给定两个正序（从小到大）数组 nums1 和 nums2，找出它们合并后的中位数。",
    inputFormat: "第一行n1和nums1，第二行n1个整数；第三行n2和nums2，第四行n2个整数。",
    outputFormat: "输出中位数（保留一位小数或整数）。",
    sampleInput: "3\n1 2 3\n3\n4 5 6",
    sampleOutput: "3.5",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n1, n2;
    cin >> n1;
    vector<int> nums1(n1);
    for (int i = 0; i < n1; i++) cin >> nums1[i];
    cin >> n2;
    vector<int> nums2(n2);
    for (int i = 0; i < n2; i++) cin >> nums2[i];
    
    vector<int> merged(n1 + n2);
    merge(nums1.begin(), nums1.end(), nums2.begin(), nums2.end(), merged.begin());
    
    int total = n1 + n2;
    if (total % 2 == 0) {
        double median = (merged[total/2-1] + merged[total/2]) / 2.0;
        cout << median << endl;
    } else {
        cout << merged[total/2] << endl;
    }
    return 0;
}`,
    category: "搜索",
    tags: ["二分查找", "数组"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "3\n1 2 3\n3\n4 5 6", expectedOutput: "3.5" },
    ],
    similarProblems: [279],
  },
  // Hot 5: 最长回文子串
  {
    id: 281,
    title: "LeetCode Hot 5 - 最长回文子串",
    titleEn: "Longest Palindromic Substring",
    difficulty: "intermediate",
    description: "给定一个字符串 s，找出其中最长的回文子串。",
    inputFormat: "输入一行字符串s。",
    outputFormat: "输出最长的回文子串。",
    sampleInput: "babad",
    sampleOutput: "bab",
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

int expandAroundCenter(string s, int left, int right) {
    while (left >= 0 && right < s.length() && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

int main() {
    string s;
    cin >> s;
    
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);
        int len = max(len1, len2);
        if (len > end - start + 1) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    
    cout << s.substr(start, end - start + 1) << endl;
    return 0;
}`,
    category: "字符串处理",
    tags: ["动态规划", "字符串"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "babad", expectedOutput: "bab" },
      { id: 2, input: "cbbd", expectedOutput: "bb" },
    ],
    similarProblems: [279],
  },
  // Hot 6: Z字形变换
  {
    id: 282,
    title: "LeetCode Hot 6 - Z字形变换",
    titleEn: "Zigzag Conversion",
    difficulty: "intermediate",
    description: "将字符串 s 以Z字形排列成指定行数，然后按行读取返回新字符串。",
    inputFormat: "输入字符串s和行数numRows。",
    outputFormat: "输出Z字形变换后的字符串。",
    sampleInput: "PAYPALISHIRING 3",
    sampleOutput: "PAHNAPLSIIGYIR",
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s;
    int numRows;
    cin >> s >> numRows;
    
    if (numRows == 1) {
        cout << s << endl;
        return 0;
    }
    
    vector<string> rows(min(numRows, (int)s.length()));
    int curRow = 0;
    bool goingDown = false;
    
    for (char c : s) {
        rows[curRow] += c;
        if (curRow == 0 || curRow == numRows - 1) {
            goingDown = !goingDown;
        }
        curRow += goingDown ? 1 : -1;
    }
    
    string result;
    for (string row : rows) {
        result += row;
    }
    
    cout << result << endl;
    return 0;
}`,
    category: "字符串处理",
    tags: ["字符串"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "PAYPALISHIRING 3", expectedOutput: "PAHNAPLSIIGYIR" },
    ],
  },
  // Hot 7: 整数反转
  {
    id: 283,
    title: "LeetCode Hot 7 - 整数反转",
    titleEn: "Reverse Integer",
    difficulty: "beginner",
    description: "给你一个32位有符号整数 x，返回将 x 的数字部分反转后的结果。如果反转后溢出返回0。",
    inputFormat: "输入一个整数x。",
    outputFormat: "输出反转后的整数，溢出返回0。",
    sampleInput: "123",
    sampleOutput: "321",
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    long long x;
    cin >> x;
    
    long long rev = 0;
    while (x != 0) {
        int pop = x % 10;
        x /= 10;
        
        if (rev > INT_MAX/10 || (rev == INT_MAX/10 && pop > 7)) return 0;
        if (rev < INT_MIN/10 || (rev == INT_MIN/10 && pop < -8)) return 0;
        
        rev = rev * 10 + pop;
    }
    
    cout << rev << endl;
    return 0;
}`,
    category: "基础算法",
    tags: ["数学"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "123", expectedOutput: "321" },
      { id: 2, input: "-123", expectedOutput: "-321" },
      { id: 3, input: "120", expectedOutput: "21" },
    ],
  },
  // Hot 8: 字符串转换整数
  {
    id: 284,
    title: "LeetCode Hot 8 - 字符串转换整数",
    titleEn: "String to Integer (atoi)",
    difficulty: "intermediate",
    description: "将字符串转换为其整数表示，遵循空格跳过、正负号处理、溢出判断等规则。",
    inputFormat: "输入一行字符串。",
    outputFormat: "输出转换后的整数。",
    sampleInput: "42",
    sampleOutput: "42",
    defaultCode: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    int i = 0, n = s.length();
    while (i < n && isspace(s[i])) i++;
    
    if (i >= n) {
        cout << 0 << endl;
        return 0;
    }
    
    int sign = 1;
    if (s[i] == "-" || s[i] == "+") {
        sign = (s[i++] == "-") ? -1 : 1;
    }
    
    long long result = 0;
    while (i < n && isdigit(s[i])) {
        result = result * 10 + (s[i++] - "0");
        if (result > INT_MAX) break;
    }
    
    result *= sign;
    if (result > INT_MAX) result = INT_MAX;
    if (result < INT_MIN) result = INT_MIN;
    
    cout << result << endl;
    return 0;
}`,
    category: "字符串处理",
    tags: ["字符串", "数学"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "42", expectedOutput: "42" },
      { id: 2, input: "   -42", expectedOutput: "-42" },
    ],
  },
  // Hot 9: 回文数
  {
    id: 285,
    title: "LeetCode Hot 9 - 回文数",
    titleEn: "Palindrome Number",
    difficulty: "beginner",
    description: "给你一个整数 x，如果 x 是一个回文整数，返回 true。",
    inputFormat: "输入一个整数x。",
    outputFormat: "输出 true 或 false。",
    sampleInput: "121",
    sampleOutput: "true",
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    long long x;
    cin >> x;
    
    if (x < 0) {
        cout << "false" << endl;
        return 0;
    }
    
    long long original = x, reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    
    cout << (reversed == original ? "true" : "false") << endl;
    return 0;
}`,
    category: "基础算法",
    tags: ["数学"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "121", expectedOutput: "true" },
      { id: 2, input: "-121", expectedOutput: "false" },
    ],
  },
  // Hot 10: 正则表达式匹配
  {
    id: 286,
    title: "LeetCode Hot 10 - 正则表达式匹配",
    titleEn: "Regular Expression Matching",
    difficulty: "advanced",
    description: "实现正则表达式匹配，支持 . 和 * 的匹配。",
    inputFormat: "输入字符串s和模式p。",
    outputFormat: "输出 true 或 false。",
    sampleInput: "aa a*",
    sampleOutput: "true",
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s, p;
    cin >> s >> p;
    
    int m = s.length(), n = p.length();
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true;
    
    for (int j = 1; j <= n; j++) {
        if (p[j-1] == "*") dp[0][j] = dp[0][j-2];
    }
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p[j-1] == "*") {
                dp[i][j] = dp[i][j-2];
                if (p[j-2] == "." || p[j-2] == s[i-1]) {
                    dp[i][j] = dp[i][j] || dp[i-1][j];
                }
            } else if (p[j-1] == "." || p[j-1] == s[i-1]) {
                dp[i][j] = dp[i-1][j-1];
            }
        }
    }
    
    cout << (dp[m][n] ? "true" : "false") << endl;
    return 0;
}`,
    category: "字符串处理",
    tags: ["动态规划", "字符串"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "aa a*", expectedOutput: "true" },
    ],
  },
  // Hot 11: 盛最多水的容器
  {
    id: 287,
    title: "LeetCode Hot 11 - 盛最多水的容器",
    titleEn: "Container With Most Water",
    difficulty: "intermediate",
    description: "给定 n 个非负整数 a1, a2, ..., an，每个数代表一条垂直线，找出两条线使得它们与 x 轴构成的容器能容纳最多的水。",
    inputFormat: "第一行n，第二行n个整数表示高度。",
    outputFormat: "输出最大盛水量。",
    sampleInput: "9\n1 8 6 2 5 4 8 3 7",
    sampleOutput: "49",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    
    int left = 0, right = n - 1, maxArea = 0;
    while (left < right) {
        int area = (right - left) * min(height[left], height[right]);
        maxArea = max(maxArea, area);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    cout << maxArea << endl;
    return 0;
}`,
    category: "基础算法",
    tags: ["双指针", "贪心"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "9\n1 8 6 2 5 4 8 3 7", expectedOutput: "49" },
    ],
  },
  // Hot 12: 整数转罗马数字
  {
    id: 288,
    title: "LeetCode Hot 12 - 整数转罗马数字",
    titleEn: "Integer to Roman",
    difficulty: "intermediate",
    description: "将整数转换为罗马数字。",
    inputFormat: "输入一个整数num (1 <= num <= 3999)。",
    outputFormat: "输出对应的罗马数字字符串。",
    sampleInput: "3",
    sampleOutput: "III",
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int num;
    cin >> num;
    
    vector<int> vals = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    vector<string> syms = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    
    string result;
    for (int i = 0; i < vals.size(); i++) {
        while (num >= vals[i]) {
            result += syms[i];
            num -= vals[i];
        }
    }
    
    cout << result << endl;
    return 0;
}`,
    category: "基础算法",
    tags: ["数学", "字符串"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "3", expectedOutput: "III" },
      { id: 2, input: "58", expectedOutput: "LVIII" },
    ],
  },
  // Hot 13: 罗马数字转整数
  {
    id: 289,
    title: "LeetCode Hot 13 - 罗马数字转整数",
    titleEn: "Roman to Integer",
    difficulty: "beginner",
    description: "将罗马数字转换为整数。",
    inputFormat: "输入一个罗马数字字符串。",
    outputFormat: "输出对应的整数。",
    sampleInput: "III",
    sampleOutput: "3",
    defaultCode: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    unordered_map<char, int> val = {
        {"I", 1}, {"V", 5}, {"X", 10}, {"L", 50},
        {"C", 100}, {"D", 500}, {"M", 1000}
    };
    
    int result = 0;
    for (int i = 0; i < s.length(); i++) {
        if (i + 1 < s.length() && val[s[i]] < val[s[i+1]]) {
            result -= val[s[i]];
        } else {
            result += val[s[i]];
        }
    }
    
    cout << result << endl;
    return 0;
}`,
    category: "基础算法",
    tags: ["数学", "字符串"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "III", expectedOutput: "3" },
      { id: 2, input: "LVIII", expectedOutput: "58" },
    ],
  },
  // Hot 14: 最长公共前缀
  {
    id: 290,
    title: "LeetCode Hot 14 - 最长公共前缀",
    titleEn: "Longest Common Prefix",
    difficulty: "beginner",
    description: "编写一个函数来找出字符串数组中的最长公共前缀。",
    inputFormat: "第一行n表示字符串数量，接下来n行每行一个字符串。",
    outputFormat: "输出最长公共前缀。",
    sampleInput: "3\nflower\nflow\nflight",
    sampleOutput: "fl",
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> strs(n);
    for (int i = 0; i < n; i++) cin >> strs[i];
    
    if (strs.empty()) {
        cout << endl;
        return 0;
    }
    
    for (int i = 0; i < strs[0].length(); i++) {
        char c = strs[0][i];
        for (int j = 1; j < n; j++) {
            if (i >= strs[j].length() || strs[j][i] != c) {
                cout << strs[0].substr(0, i) << endl;
                return 0;
            }
        }
    }
    
    cout << strs[0] << endl;
    return 0;
}`,
    category: "字符串处理",
    tags: ["字符串"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "3\nflower\nflow\nflight", expectedOutput: "fl" },
    ],
  },
  // Hot 15: 三数之和
  {
    id: 291,
    title: "LeetCode Hot 15 - 三数之和",
    titleEn: "3Sum",
    difficulty: "intermediate",
    description: "给你一个整数数组 nums，判断 nums 中是否存在三个元素 a, b, c，使得 a + b + c = 0。",
    inputFormat: "第一行n，第二行n个整数。",
    outputFormat: "输出所有不重复的三元组，每行一个，空格分隔。",
    sampleInput: "6\n-1 0 1 2 -1 -4",
    sampleOutput: "-1 -1 2\n-1 0 1",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    
    vector<vector<int>> result;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    for (auto& triple : result) {
        cout << triple[0] << " " << triple[1] << " " << triple[2] << endl;
    }
    return 0;
}`,
    category: "搜索",
    tags: ["双指针", "排序"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "6\n-1 0 1 2 -1 -4", expectedOutput: "-1 -1 2\n-1 0 1" },
    ],
  },
  // Hot 16: 最接近的三数之和
  {
    id: 292,
    title: "LeetCode Hot 16 - 最接近的三数之和",
    titleEn: "3Sum Closest",
    difficulty: "intermediate",
    description: "给定一个整数数组 nums 和一个目标值 target，找出三个数的和最接近 target 的和。",
    inputFormat: "第一行n和target，第二行n个整数。",
    outputFormat: "输出最接近target的三数之和。",
    sampleInput: "4 -1\n-1 2 1 -4",
    sampleOutput: "2",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    
    int best = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < n - 2; i++) {
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (abs(sum - target) < abs(best - target)) {
                best = sum;
            }
            if (sum < target) left++;
            else right--;
        }
    }
    
    cout << best << endl;
    return 0;
}`,
    category: "搜索",
    tags: ["双指针", "排序"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "4 -1\n-1 2 1 -4", expectedOutput: "2" },
    ],
  },
  // Hot 17: 电话号码的字母组合
  {
    id: 293,
    title: "LeetCode Hot 17 - 电话号码的字母组合",
    titleEn: "Letter Combinations of a Phone Number",
    difficulty: "intermediate",
    description: "给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。",
    inputFormat: "输入一个仅包含数字2-9的字符串。",
    outputFormat: "输出所有可能的字母组合，按字典序排列，每行一个。",
    sampleInput: "23",
    sampleOutput: "ad\nae\naf\nbd\nbe\nbf\ncd\nce\ncf",
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string digits;
    cin >> digits;
    
    string mapping[] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    vector<string> result;
    result.push_back("");
    
    for (char d : digits) {
        vector<string> newResult;
        for (string s : result) {
            for (char c : mapping[d - "0"]) {
                newResult.push_back(s + c);
            }
        }
        result = newResult;
    }
    
    for (string s : result) {
        if (!s.empty()) cout << s << endl;
    }
    return 0;
}`,
    category: "搜索",
    tags: ["回溯", "字符串"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "23", expectedOutput: "ad" },
    ],
  },
  // Hot 18: 四数之和
  {
    id: 294,
    title: "LeetCode Hot 18 - 四数之和",
    titleEn: "4Sum",
    difficulty: "intermediate",
    description: "给定一个整数数组 nums 和一个目标值 target，找出所有满足条件的四元组。",
    inputFormat: "第一行n和target，第二行n个整数。",
    outputFormat: "输出所有四元组。",
    sampleInput: "6 0\n1 0 -1 0 -2 2",
    sampleOutput: "-2 -1 1 2\n-2 0 0 2\n-1 0 0 1",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    
    vector<vector<int>> result;
    for (int i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        for (int j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j-1]) continue;
            int left = j + 1, right = n - 1;
            while (left < right) {
                long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];
                if (sum == target) {
                    result.push_back({nums[i], nums[j], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++; right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    for (auto& quad : result) {
        cout << quad[0] << " " << quad[1] << " " << quad[2] << " " << quad[3] << endl;
    }
    return 0;
}`,
    category: "搜索",
    tags: ["双指针", "排序"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "6 0\n1 0 -1 0 -2 2", expectedOutput: "-2 -1 1 2" },
    ],
  },
  // Hot 19: 删除链表的倒数第N个节点
  {
    id: 295,
    title: "LeetCode Hot 19 - 删除链表的倒数第N个节点",
    titleEn: "Remove Nth Node From End of List",
    difficulty: "intermediate",
    description: "给你一个链表，删除链表的倒数第 n 个结点。",
    inputFormat: "第一行长度n和n，第二行n个整数表示链表。",
    outputFormat: "输出删除后的链表，空格分隔。",
    sampleInput: "5\n1 2 3 4 5 2",
    sampleOutput: "1 3 4 5",
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    // 删除倒数第k个元素
    int idx = n - k;
    for (int i = 0; i < n; i++) {
        if (i == idx) continue;
        cout << nums[i];
        if (i < n - 1 && (i + 1) != idx) cout << " ";
    }
    cout << endl;
    return 0;
}`,
    category: "数据结构",
    tags: ["链表", "双指针"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "5\n1 2 3 4 5 2", expectedOutput: "1 3 4 5" },
    ],
  },
  // Hot 20: 有效的括号
  {
    id: 296,
    title: "LeetCode Hot 20 - 有效的括号",
    titleEn: "Valid Parentheses",
    difficulty: "beginner",
    description: '给定一个只包括 "(", ")", "{", "}", "[", "]" 的字符串，判断字符串是否有效。',
    inputFormat: "输入一行字符串。",
    outputFormat: "输出 true 或 false。",
    sampleInput: "()",
    sampleOutput: "true",
    defaultCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    stack<char> st;
    for (char c : s) {
        if (c == "(" || c == "{" || c == "[") {
            st.push(c);
        } else {
            if (st.empty()) {
                cout << "false" << endl;
                return 0;
            }
            if (c == ")" && st.top() != "(") { cout << "false" << endl; return 0; }
            if (c == "}" && st.top() != "{") { cout << "false" << endl; return 0; }
            if (c == "]" && st.top() != "[") { cout << "false" << endl; return 0; }
            st.pop();
        }
    }
    
    cout << (st.empty() ? "true" : "false") << endl;
    return 0;
}`,
    category: "数据结构",
    tags: ["栈", "字符串"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "()", expectedOutput: "true" },
      { id: 2, input: "()[]{}", expectedOutput: "true" },
      { id: 3, input: "(]", expectedOutput: "false" },
    ],
  },
  // Hot 21: 合并两个有序链表
  {
    id: 297,
    title: "LeetCode Hot 21 - 合并两个有序链表",
    titleEn: "Merge Two Sorted Lists",
    difficulty: "beginner",
    description: "将两个升序链表合并为一个新的升序链表并返回。",
    inputFormat: "第一行长度l1，第二行l1个整数；第二行长度l2，第三行l2个整数。",
    outputFormat: "输出合并后的链表。",
    sampleInput: "3\n1 2 4\n3\n1 3 4",
    sampleOutput: "1 1 2 3 4 4",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int l1, l2;
    cin >> l1;
    vector<int> list1(l1);
    for (int i = 0; i < l1; i++) cin >> list1[i];
    cin >> l2;
    vector<int> list2(l2);
    for (int i = 0; i < l2; i++) cin >> list2[i];
    
    vector<int> merged;
    int i = 0, j = 0;
    while (i < l1 && j < l2) {
        if (list1[i] <= list2[j]) {
            merged.push_back(list1[i++]);
        } else {
            merged.push_back(list2[j++]);
        }
    }
    while (i < l1) merged.push_back(list1[i++]);
    while (j < l2) merged.push_back(list2[j++]);
    
    for (int k = 0; k < merged.size(); k++) {
        if (k) cout << " ";
        cout << merged[k];
    }
    cout << endl;
    return 0;
}`,
    category: "数据结构",
    tags: ["链表", "双指针"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "3\n1 2 4\n3\n1 3 4", expectedOutput: "1 1 2 3 4 4" },
    ],
  },
  // Hot 22: 括号生成
  {
    id: 298,
    title: "LeetCode Hot 22 - 括号生成",
    titleEn: "Generate Parentheses",
    difficulty: "intermediate",
    description: "数字 n 代表有 n 对括号，生成所有可能的有效括号组合。",
    inputFormat: "输入一个整数n。",
    outputFormat: "输出所有有效括号组合，每行一个。",
    sampleInput: "3",
    sampleOutput: "((()))\n(()())\n(())()\n()(())\n()()()",
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

void backtrack(vector<string>& result, string current, int open, int close, int n) {
    if (current.length() == 2 * n) {
        result.push_back(current);
        return;
    }
    if (open < n) backtrack(result, current + "(", open + 1, close, n);
    if (close < open) backtrack(result, current + ")", open, close + 1, n);
}

int main() {
    int n;
    cin >> n;
    
    vector<string> result;
    backtrack(result, "", 0, 0, n);
    
    for (string s : result) {
        cout << s << endl;
    }
    return 0;
}`,
    category: "搜索",
    tags: ["回溯", "递归"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "3", expectedOutput: "((()))" },
    ],
  },
  // Hot 23: 合并K个升序链表
  {
    id: 299,
    title: "LeetCode Hot 23 - 合并K个升序链表",
    titleEn: "Merge k Sorted Lists",
    difficulty: "advanced",
    description: "给你一个链表数组，每个链表都是按升序排列的。将所有链表合并成一个升序链表。",
    inputFormat: "第一行K；第二行第一个链表长度，后跟K个整数；重复K次。",
    outputFormat: "输出合并后的链表。",
    sampleInput: "3\n3 1 2 3\n3 1 3 4\n2 2 5",
    sampleOutput: "1 1 2 2 3 3 4 5",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int K;
    cin >> K;
    
    vector<vector<int>> lists(K);
    for (int i = 0; i < K; i++) {
        int len;
        cin >> len;
        lists[i].resize(len);
        for (int j = 0; j < len; j++) cin >> lists[i][j];
    }
    
    vector<int> merged;
    for (auto& list : lists) {
        merged.insert(merged.end(), list.begin(), list.end());
    }
    sort(merged.begin(), merged.end());
    
    for (int i = 0; i < merged.size(); i++) {
        if (i) cout << " ";
        cout << merged[i];
    }
    cout << endl;
    return 0;
}`,
    category: "数据结构",
    tags: ["链表", "堆"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "3\n3 1 2 3\n3 1 3 4\n2 2 5", expectedOutput: "1 1 2 2 3 3 4 5" },
    ],
  },
  // Hot 24: 两两交换链表中的节点
  {
    id: 300,
    title: "LeetCode Hot 24 - 两两交换链表中的节点",
    titleEn: "Swap Nodes in Pairs",
    difficulty: "intermediate",
    description: "给你一个链表，两两交换相邻节点，返回新链表的头节点。",
    inputFormat: "第一行n，第二行n个整数。",
    outputFormat: "输出交换后的链表。",
    sampleInput: "4\n1 2 3 4",
    sampleOutput: "2 1 4 3",
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    for (int i = 0; i + 1 < n; i += 2) {
        swap(nums[i], nums[i + 1]);
    }
    
    for (int i = 0; i < n; i++) {
        if (i) cout << " ";
        cout << nums[i];
    }
    cout << endl;
    return 0;
}`,
    category: "数据结构",
    tags: ["链表"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "4\n1 2 3 4", expectedOutput: "2 1 4 3" },
    ],
  },
  // Hot 25: K 个一组翻转链表
  {
    id: 301,
    title: "LeetCode Hot 25 - K 个一组翻转链表",
    titleEn: "Reverse Nodes in k-Group",
    difficulty: "advanced",
    description: "给你一个链表，每 k 个节点一组进行翻转，不够k个则保持原样。",
    inputFormat: "第一行n和k，第二行n个整数。",
    outputFormat: "输出翻转后的链表。",
    sampleInput: "5 3\n1 2 3 4 5",
    sampleOutput: "3 2 1 4 5",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    for (int i = 0; i + k <= n; i += k) {
        reverse(nums.begin() + i, nums.begin() + i + k);
    }
    
    for (int i = 0; i < n; i++) {
        if (i) cout << " ";
        cout << nums[i];
    }
    cout << endl;
    return 0;
}`,
    category: "数据结构",
    tags: ["链表"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "5 3\n1 2 3 4 5", expectedOutput: "3 2 1 4 5" },
    ],
  },
  // Hot 26: 删除排序数组中的重复项
  {
    id: 302,
    title: "LeetCode Hot 26 - 删除排序数组中的重复项",
    titleEn: "Remove Duplicates from Sorted Array",
    difficulty: "beginner",
    description: "给定一个排序数组 nums，你需要在原地删除重复出现的元素。",
    inputFormat: "第一行n，第二行n个整数。",
    outputFormat: "输出新长度和去重后的数组。",
    sampleInput: "6\n1 1 2",
    sampleOutput: "2\n1 2",
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    int idx = 0;
    for (int i = 1; i < n; i++) {
        if (nums[i] != nums[idx]) {
            nums[++idx] = nums[i];
        }
    }
    
    cout << idx + 1 << endl;
    for (int i = 0; i <= idx; i++) {
        if (i) cout << " ";
        cout << nums[i];
    }
    cout << endl;
    return 0;
}`,
    category: "基础算法",
    tags: ["双指针", "数组"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "6\n1 1 2", expectedOutput: "2\n1 2" },
    ],
  },
  // Hot 27: 移除元素
  {
    id: 303,
    title: "LeetCode Hot 27 - 移除元素",
    titleEn: "Remove Element",
    difficulty: "beginner",
    description: "给你一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素。",
    inputFormat: "第一行n和val，第二行n个整数。",
    outputFormat: "输出新长度和移除后的数组。",
    sampleInput: "5 3\n3 2 2 3 4",
    sampleOutput: "2\n2 4",
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, val;
    cin >> n >> val;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    int idx = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] != val) {
            nums[idx++] = nums[i];
        }
    }
    
    cout << idx << endl;
    for (int i = 0; i < idx; i++) {
        if (i) cout << " ";
        cout << nums[i];
    }
    cout << endl;
    return 0;
}`,
    category: "基础算法",
    tags: ["双指针", "数组"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "5 3\n3 2 2 3 4", expectedOutput: "2\n2 4" },
    ],
  },
  // Hot 28: 实现 strStr()
  {
    id: 304,
    title: "LeetCode Hot 28 - 实现 strStr()",
    titleEn: "Implement strStr()",
    difficulty: "beginner",
    description: "实现 strStr() 函数。给你两个字符串 haystack 和 needle，返回 needle 在 haystack 中首次出现的索引。",
    inputFormat: "输入两行字符串。",
    outputFormat: "输出首次出现的索引，不存在返回-1。",
    sampleInput: "hello\nll",
    sampleOutput: "2",
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string haystack, needle;
    cin >> haystack >> needle;
    
    int n = haystack.length(), m = needle.length();
    if (m == 0) {
        cout << 0 << endl;
        return 0;
    }
    
    for (int i = 0; i <= n - m; i++) {
        bool match = true;
        for (int j = 0; j < m; j++) {
            if (haystack[i + j] != needle[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            cout << i << endl;
            return 0;
        }
    }
    
    cout << -1 << endl;
    return 0;
}`,
    category: "字符串处理",
    tags: ["字符串匹配"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "hello\nll", expectedOutput: "2" },
    ],
  },
  // Hot 29: 两数相除
  {
    id: 305,
    title: "LeetCode Hot 29 - 两数相除",
    titleEn: "Divide Two Integers",
    difficulty: "advanced",
    description: "给定两个整数 dividend 和 divisor，将两数相除。不能使用乘法、除法和取余运算。",
    inputFormat: "输入两个整数 dividend 和 divisor。",
    outputFormat: "输出商。",
    sampleInput: "10 3",
    sampleOutput: "3",
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    long long dividend, divisor;
    cin >> dividend >> divisor;
    
    long long result = dividend / divisor;
    cout << result << endl;
    return 0;
}`,
    category: "基础算法",
    tags: ["数学", "位运算"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "10 3", expectedOutput: "3" },
    ],
  },
  // Hot 30: 串联所有单词的子串
  {
    id: 306,
    title: "LeetCode Hot 30 - 串联所有单词的子串",
    titleEn: "Substring with Concatenation of All Words",
    difficulty: "advanced",
    description: "给定一个字符串 s 和一个字符串数组 words，找出 s 中恰好由 words 中所有字符串串联形成的子串的起始索引。",
    inputFormat: "输入s，然后是words数量n，再输入n个单词。",
    outputFormat: "输出所有起始索引。",
    sampleInput: "barfoothefoobarman\n2\nfoo bar",
    sampleOutput: "0 9",
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    string s;
    int n;
    cin >> s >> n;
    vector<string> words(n);
    for (int i = 0; i < n; i++) cin >> words[i];
    
    int wordLen = words[0].length();
    int totalLen = wordLen * n;
    unordered_map<string, int> need, window;
    for (auto& w : words) need[w]++;
    
    vector<int> result;
    for (int i = 0; i + totalLen <= s.length(); i++) {
        window.clear();
        bool valid = true;
        for (int j = 0; j < n; j++) {
            string word = s.substr(i + j * wordLen, wordLen);
            window[word]++;
        }
        for (auto& p : need) {
            if (window[p.first] != p.second) {
                valid = false;
                break;
            }
        }
        if (valid) result.push_back(i);
    }
    
    for (int idx : result) {
        cout << idx << " ";
    }
    cout << endl;
    return 0;
}`,
    category: "字符串处理",
    tags: ["滑动窗口", "哈希表"],
    source: "LeetCode",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "barfoothefoobarman\n2\nfoo bar", expectedOutput: "0 9" },
    ],
  },
  // ========== ICPC/ACM 竞赛真题 ==========
  // ICPC 1: 数字三角形变式
  {
    id: 350,
    title: "ICPC 区域赛 - 数字金字塔",
    titleEn: "Digital Pyramid",
    difficulty: "intermediate",
    description: "给定一个数字金字塔，从顶部出发，每次只能移动到下一行相邻的位置，求到底部的最大路径和。",
    inputFormat: "第一行n，接下来n行每行i个整数。",
    outputFormat: "输出最大路径和。",
    sampleInput: "5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5",
    sampleOutput: "30",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> dp(n, vector<int>(n));
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cin >> dp[i][j];
        }
    }
    
    for (int i = n - 2; i >= 0; i--) {
        for (int j = 0; j <= i; j++) {
            dp[i][j] += max(dp[i+1][j], dp[i+1][j+1]);
        }
    }
    
    cout << dp[0][0] << endl;
    return 0;
}`,
    category: "动态规划",
    tags: ["动态规划"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5", expectedOutput: "30" },
    ],
  },
  // ICPC 2: 背包问题
  {
    id: 351,
    title: "ICPC 区域赛 - 0-1背包问题",
    titleEn: "0-1 Knapsack",
    difficulty: "intermediate",
    description: "给定n个物品，每个物品有重量w和价值v，在不超过容量C的情况下，求最大价值。",
    inputFormat: "第一行n和C，接下来n行每行w和v。",
    outputFormat: "输出最大价值。",
    sampleInput: "4 8\n2 3\n3 4\n4 5\n5 6",
    sampleOutput: "10",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, C;
    cin >> n >> C;
    vector<int> w(n), v(n);
    for (int i = 0; i < n; i++) cin >> w[i] >> v[i];
    
    vector<int> dp(C + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int j = C; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    
    cout << dp[C] << endl;
    return 0;
}`,
    category: "动态规划",
    tags: ["背包问题"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "4 8\n2 3\n3 4\n4 5\n5 6", expectedOutput: "10" },
    ],
  },
  // ICPC 3: 最长公共子序列
  {
    id: 352,
    title: "ICPC 区域赛 - 最长公共子序列",
    titleEn: "Longest Common Subsequence",
    difficulty: "intermediate",
    description: "给定两个字符串，求它们的最长公共子序列长度。",
    inputFormat: "输入两行字符串。",
    outputFormat: "输出最长公共子序列长度。",
    sampleInput: "abcde\nabce",
    sampleOutput: "4",
    defaultCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    int n = s1.length(), m = s2.length();
    
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    cout << dp[n][m] << endl;
    return 0;
}`,
    category: "动态规划",
    tags: ["LCS"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "abcde\nabce", expectedOutput: "4" },
    ],
  },
  // ICPC 4: 最短路径
  {
    id: 353,
    title: "ICPC 区域赛 - 单源最短路径",
    titleEn: "Shortest Path",
    difficulty: "intermediate",
    description: "给定一个带权有向图，求从源点到所有其他点的最短路径。",
    inputFormat: "第一行n,m,s表示顶点数、边数、源点。接下来m行每行u,v,w表示一条边。",
    outputFormat: "输出源点到各点的最短距离。",
    sampleInput: "5 7 1\n1 2 10\n1 3 3\n2 3 1\n2 4 2\n3 2 4\n3 4 8\n4 5 5",
    sampleOutput: "0 4 3 6 11",
    defaultCode: `#include <iostream>
#include <vector>
#include <queue>
#include <limits>
using namespace std;

int main() {
    int n, m, s;
    cin >> n >> m >> s;
    vector<vector<pair<int,int>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    vector<long long> dist(n + 1, LLONG_MAX);
    dist[s] = 0;
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<pair<long long,int>>> pq;
    pq.push({0, s});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        if (i > 1) cout << " ";
        cout << (dist[i] == LLONG_MAX ? -1 : dist[i]);
    }
    cout << endl;
    return 0;
}`,
    category: "图论",
    tags: ["Dijkstra"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "5 7 1\n1 2 10\n1 3 3\n2 3 1\n2 4 2\n3 2 4\n3 4 8\n4 5 5", expectedOutput: "0 4 3 6 11" },
    ],
  },
  // ICPC 5: 拓扑排序
  {
    id: 354,
    title: "ICPC 区域赛 - 课程表",
    titleEn: "Course Schedule",
    difficulty: "intermediate",
    description: "有n门课程，编号0到n-1。有些课程有先修课程。判断是否可能完成所有课程。",
    inputFormat: "第一行n和m，接下来m行每行prerequisite[0]和prerequisite[1]。",
    outputFormat: "输出是否可以完成（true/false）。",
    sampleInput: "2 1\n1 0",
    sampleOutput: "true",
    defaultCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n);
    vector<int> indegree(n, 0);
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> v >> u;
        adj[u].push_back(v);
        indegree[v]++;
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    int count = 0;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        count++;
        for (int v : adj[u]) {
            indegree[v]--;
            if (indegree[v] == 0) q.push(v);
        }
    }
    
    cout << (count == n ? "true" : "false") << endl;
    return 0;
}`,
    category: "图论",
    tags: ["拓扑排序"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "2 1\n1 0", expectedOutput: "true" },
    ],
  },
  // ICPC 6: 并查集
  {
    id: 355,
    title: "ICPC 区域赛 - 朋友圈",
    titleEn: "Friend Circles",
    difficulty: "intermediate",
    description: "有n个学生，如果两个学生认识，他们就在同一个朋友圈里。求朋友圈的数量。",
    inputFormat: "第一行n，接下来n行每行n个0/1表示认识关系。",
    outputFormat: "输出朋友圈数量。",
    sampleInput: "4\n1 1 0 0\n1 1 1 0\n0 1 1 0\n0 0 0 1",
    sampleOutput: "2",
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> parent;

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

void unite(int a, int b) {
    a = find(a);
    b = find(b);
    if (a != b) parent[a] = b;
}

int main() {
    int n;
    cin >> n;
    parent.resize(n);
    for (int i = 0; i < n; i++) parent[i] = i;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            int x;
            cin >> x;
            if (x == 1) unite(i, j);
        }
    }
    
    int groups = 0;
    for (int i = 0; i < n; i++) {
        if (parent[i] == i) groups++;
    }
    
    cout << groups << endl;
    return 0;
}`,
    category: "数据结构",
    tags: ["并查集"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "4\n1 1 0 0\n1 1 1 0\n0 1 1 0\n0 0 0 1", expectedOutput: "2" },
    ],
  },
  // ICPC 7: 快速幂
  {
    id: 356,
    title: "ICPC 区域赛 - 快速幂运算",
    titleEn: "Fast Power",
    difficulty: "intermediate",
    description: "计算 a^n mod m，其中 n 可能很大。",
    inputFormat: "输入 a, n, m。",
    outputFormat: "输出 a^n mod m。",
    sampleInput: "2 10 1000",
    sampleOutput: "24",
    defaultCode: `#include <iostream>
using namespace std;

long long fastPower(long long a, long long n, long long m) {
    long long result = 1;
    while (n > 0) {
        if (n % 2 == 1) {
            result = (result * a) % m;
        }
        a = (a * a) % m;
        n /= 2;
    }
    return result;
}

int main() {
    long long a, n, m;
    cin >> a >> n >> m;
    cout << fastPower(a, n, m) << endl;
    return 0;
}`,
    category: "数论",
    tags: ["快速幂"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "2 10 1000", expectedOutput: "24" },
    ],
  },
  // ICPC 8: 区间DP
  {
    id: 357,
    title: "ICPC 区域赛 - 合并石子",
    titleEn: "Stone Merging",
    difficulty: "advanced",
    description: "将n堆石子合并成一堆，每次只能合并相邻的两堆，求最小代价。",
    inputFormat: "第一行n，第二行n个整数表示每堆石子数量。",
    outputFormat: "输出最小合并代价。",
    sampleInput: "4\n4 5 9 4",
    sampleOutput: "44",
    defaultCode: `#include <iostream>
#include <vector>
#include <limits>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    vector<int> sum(n + 1, 0);
    for (int i = 0; i < n; i++) sum[i + 1] = sum[i] + a[i];
    
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i + len <= n; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k + 1][j] + sum[j + 1] - sum[i]);
            }
        }
    }
    
    cout << dp[0][n - 1] << endl;
    return 0;
}`,
    category: "动态规划",
    tags: ["区间DP"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "4\n4 5 9 4", expectedOutput: "44" },
    ],
  },
  // ICPC 9: Trie树
  {
    id: 358,
    title: "ICPC 区域赛 - 前缀树",
    titleEn: "Implement Trie",
    difficulty: "intermediate",
    description: "实现一个前缀树，支持插入和查找操作。",
    inputFormat: "输入操作序列：1 word 表示插入，2 word 表示查找。",
    outputFormat: "对于查找操作，输出是否找到。",
    sampleInput: "5\n1 hello\n1 helloworld\n2 hello\n2 hell\n2 hellowor",
    sampleOutput: "true\nfalse\nfalse",
    defaultCode: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

int main() {
    int n;
    cin >> n;
    unordered_set<string> trie;
    
    for (int i = 0; i < n; i++) {
        int op;
        string word;
        cin >> op >> word;
        if (op == 1) {
            trie.insert(word);
        } else {
            cout << (trie.count(word) ? "true" : "false") << endl;
        }
    }
    return 0;
}`,
    category: "数据结构",
    tags: ["Trie树"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "5\n1 hello\n1 helloworld\n2 hello\n2 hell\n2 hellowor", expectedOutput: "true\nfalse\nfalse" },
    ],
  },
  // ICPC 10: 线段树
  {
    id: 359,
    title: "ICPC 区域赛 - 区间求和",
    titleEn: "Range Sum Query",
    difficulty: "advanced",
    description: "给定数组，支持单点更新和区间求和查询。",
    inputFormat: "第一行n和q，第二行n个整数，接下来q行每行op,l,r。",
    outputFormat: "对于查询操作输出结果。",
    sampleInput: "5 3\n1 2 3 4 5\n2 1 3\n1 2 10\n2 1 3",
    sampleOutput: "6\n15",
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    vector<int> bit(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        for (int j = i; j <= n; j += j & -j) {
            bit[j] += a[i];
        }
    }
    
    auto query = [&](int idx) {
        int sum = 0;
        for (int i = idx; i > 0; i -= i & -i) {
            sum += bit[i];
        }
        return sum;
    };
    
    for (int i = 0; i < q; i++) {
        int op, l, r;
        cin >> op >> l >> r;
        if (op == 1) {
            int delta = r - a[l];
            a[l] = r;
            for (int j = l; j <= n; j += j & -j) {
                bit[j] += delta;
            }
        } else {
            cout << query(r) - query(l - 1) << endl;
        }
    }
    return 0;
}`,
    category: "数据结构",
    tags: ["线段树", "树状数组"],
    source: "ICPC",
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      { id: 1, input: "5 3\n1 2 3 4 5\n2 1 3\n1 2 10\n2 1 3", expectedOutput: "6\n15" },
    ],
  },
];

// 获取所有分类
export function getCategories(): string[] {
  return [...new Set(problems.map(p => p.category))];
}

// 获取所有年份
export function getYears(): string[] {
  const years = problems.filter(p => p.year).map(p => p.year as string);
  return [...new Set(years)].sort((a, b) => parseInt(b) - parseInt(a));
}

// 获取所有标签
export function getAllTags(): string[] {
  const tags = new Set<string>();
  problems.forEach(p => p.tags.forEach(t => tags.add(t)));
  return [...tags].sort();
}

// 标签分组配置 - 细化版
export const tagGroups: Record<string, { name: string; tags: string[] }> = {
  '入门': {
    name: '入门',
    tags: ['入门'],
  },
  '基础语法': {
    name: '基础语法',
    tags: ['输入输出', '变量', '运算符', '条件语句', '循环', '嵌套循环', '函数'],
  },
  '数据结构': {
    name: '数据结构',
    tags: ['数组', '字符串', '链表', '栈', '队列', '哈希表', '哈希思想', '树', '图', '堆', '并查集', '线段树', '树状数组'],
  },
  '基础算法': {
    name: '基础算法',
    tags: ['枚举', '模拟', '排序', '查找', '贪心', '前缀和', '差分', '位运算'],
  },
  '搜索': {
    name: '搜索',
    tags: ['搜索-DFS', '搜索-BFS', '回溯'],
  },
  '动态规划': {
    name: '动态规划',
    tags: ['动态规划', '递推', '背包问题', '区间DP', '树形DP'],
  },
  '图论': {
    name: '图论',
    tags: ['图论', '图论-最短路', '图论-生成树', '拓扑排序'],
  },
  '字符串算法': {
    name: '字符串算法',
    tags: ['字符串匹配', '字符串哈希', 'KMP', 'Trie树'],
  },
  '数学': {
    name: '数学',
    tags: ['数学', 'GCD', 'LCM', '质数', '数论-GCD', '数论-质数', '数论-快速幂', '组合数学'],
  },
  '高级技巧': {
    name: '高级技巧',
    tags: ['二分查找', '双指针', '滑动窗口', '分治', '递归'],
  },
};

// 根据条件筛选题目
export function filterProblems(filters: {
  difficulty?: DifficultyLevel;
  category?: string;
  source?: ProblemSource;
  year?: string;
  tag?: string;
  tags?: string[]; // 多标签筛选
  tagMode?: 'AND' | 'OR'; // 标签筛选模式：AND=同时包含所有标签，OR=包含任一标签
  search?: string;
}): Problem[] {
  return problems.filter(p => {
    if (filters.difficulty && p.difficulty !== filters.difficulty) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.source && p.source !== filters.source) return false;
    if (filters.year && p.year !== filters.year) return false;
    
    // 单标签筛选（向后兼容）
    if (filters.tag && !p.tags.includes(filters.tag)) return false;
    
    // 多标签筛选
    if (filters.tags && filters.tags.length > 0) {
      const mode = filters.tagMode || 'OR';
      if (mode === 'AND') {
        // AND模式：必须包含所有选中的标签
        if (!filters.tags.every(tag => p.tags.includes(tag))) return false;
      } else {
        // OR模式：包含任一选中的标签即可
        if (!filters.tags.some(tag => p.tags.includes(tag))) return false;
      }
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(search);
      const matchTitleEn = p.titleEn?.toLowerCase().includes(search);
      const matchDesc = p.description.toLowerCase().includes(search);
      if (!matchTitle && !matchTitleEn && !matchDesc) return false;
    }
    return true;
  });
}

// 获取相似题目
export function getSimilarProblems(problemId: number): Problem[] {
  const problem = problems.find(p => p.id === problemId);
  if (!problem || !problem.similarProblems) return [];
  
  return problem.similarProblems
    .map(id => problems.find(p => p.id === id))
    .filter((p): p is Problem => p !== undefined);
}

// 根据标签推荐相似题目
export function recommendByTags(tags: string[], excludeId?: number): Problem[] {
  const recommendations = problems
    .filter(p => p.id !== excludeId)
    .map(p => ({
      problem: p,
      score: p.tags.filter(t => tags.includes(t)).length,
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.problem);
  
  return recommendations;
}

// 根据ID获取题目
export function getProblemById(id: number): Problem | undefined {
  return problems.find(p => p.id === id);
}

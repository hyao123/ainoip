// 题库数据 - 扩展版

// 难度等级
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// 题目来源
export type ProblemSource = 'NOIP-Popular' | 'NOIP-Improvement' | 'NOI' | 'Other';

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

// 来源配置
export const sourceConfig: Record<ProblemSource, { label: string; color: string }> = {
  'NOIP-Popular': { label: 'NOIP普及组', color: 'bg-green-100 text-green-800' },
  'NOIP-Improvement': { label: 'NOIP提高组', color: 'bg-blue-100 text-blue-800' },
  'NOI': { label: 'NOI', color: 'bg-purple-100 text-purple-800' },
  'Other': { label: '其他', color: 'bg-gray-100 text-gray-800' },
};

// 分类配置
export const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
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
  '输入输出', '变量', '运算符', '条件语句', '循环',
  '数组', '字符串', '函数', '递归', '排序',
  '二分查找', '枚举', '模拟', '贪心', '分治',
  '搜索-DFS', '搜索-BFS', '动态规划', '背包问题', '区间DP',
  '图论-最短路', '图论-生成树', '树形DP', '并查集', '线段树',
  '树状数组', '哈希表', '堆', '栈', '队列',
  '数论-GCD', '数论-质数', '数论-快速幂', '位运算', '前缀和',
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

// 根据条件筛选题目
export function filterProblems(filters: {
  difficulty?: DifficultyLevel;
  category?: string;
  source?: ProblemSource;
  year?: string;
  tag?: string;
  search?: string;
}): Problem[] {
  return problems.filter(p => {
    if (filters.difficulty && p.difficulty !== filters.difficulty) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.source && p.source !== filters.source) return false;
    if (filters.year && p.year !== filters.year) return false;
    if (filters.tag && !p.tags.includes(filters.tag)) return false;
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

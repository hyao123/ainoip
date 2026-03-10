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

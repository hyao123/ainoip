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

// 标签分组配置
export const tagGroups: Record<string, { name: string; tags: string[] }> = {
  '基础': {
    name: '基础',
    tags: ['输入输出', '变量', '运算符', '条件语句', '循环', '数组', '字符串', '函数'],
  },
  '算法': {
    name: '算法',
    tags: ['递归', '排序', '二分查找', '枚举', '模拟', '贪心', '分治', '前缀和', '位运算'],
  },
  '搜索': {
    name: '搜索',
    tags: ['搜索-DFS', '搜索-BFS'],
  },
  '动态规划': {
    name: '动态规划',
    tags: ['动态规划', '背包问题', '区间DP', '树形DP'],
  },
  '数据结构': {
    name: '数据结构',
    tags: ['栈', '队列', '堆', '哈希表', '并查集', '线段树', '树状数组'],
  },
  '图论': {
    name: '图论',
    tags: ['图论-最短路', '图论-生成树'],
  },
  '数学': {
    name: '数学',
    tags: ['数论-GCD', '数论-质数', '数论-快速幂'],
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

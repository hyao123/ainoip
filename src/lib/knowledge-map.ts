// 知识点分类
export interface KnowledgeCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// 知识点
export interface KnowledgePoint {
  id: number;
  title: string;
  icon: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'competition';
  brief: string;
  description: string;
  content: string[];
  codeExample?: string;
  prerequisites: number[];
  recommendedProblems: number[];
  videoUrl?: string;
  readTime: number;
}

// 分类数据
export const categories: KnowledgeCategory[] = [
  { id: 'basics', name: '基础语法', icon: '📝', description: 'C++/Python基础语法和编程规范' },
  { id: 'data-structures', name: '数据结构', icon: '🏗️', description: '数组、链表、栈、队列、树、图等' },
  { id: 'algorithms', name: '基础算法', icon: '⚡', description: '排序、搜索、贪心、分治等' },
  { id: 'dp', name: '动态规划', icon: '🎯', description: '背包、区间DP、状态压缩等' },
  { id: 'graph', name: '图论', icon: '🕸️', description: '最短路、生成树、网络流等' },
  { id: 'math', name: '数学', icon: '🔢', description: '数论、组合数学、博弈论等' },
  { id: 'string', name: '字符串', icon: '🔤', description: 'KMP、Trie、AC自动机等' },
  { id: 'advanced', name: '进阶算法', icon: '🚀', description: '线段树、树链剖分、后缀数组等' },
];

// 知识点数据
export const knowledgePoints: KnowledgePoint[] = [
  // 基础语法
  {
    id: 1,
    title: '输入输出',
    icon: '⌨️',
    category: 'basics',
    difficulty: 'basic',
    brief: '掌握C++标准输入输出和文件输入输出',
    description: '输入输出是程序与外界交互的基础。在NOIP竞赛中，正确使用cin/cout或scanf/printf是必须掌握的技能，同时要熟练掌握文件输入输出的方式。',
    content: [
      'cin/cout的基本使用方法',
      'scanf/printf的格式化输入输出',
      '文件输入输出（freopen）',
      '输入输出优化技巧（取消同步流）',
      '处理大数输入和输出',
    ],
    codeExample: `// 取消同步流加速
ios::sync_with_stdio(false);
cin.tie(nullptr);

// 文件输入输出
freopen("input.txt", "r", stdin);
freopen("output.txt", "w", stdout);`,
    prerequisites: [],
    recommendedProblems: [1, 2, 3],
    readTime: 15,
  },
  {
    id: 2,
    title: '变量与数据类型',
    icon: '📊',
    category: 'basics',
    difficulty: 'basic',
    brief: '理解各种数据类型及其范围',
    description: '选择合适的数据类型是程序正确运行的基础。在NOIP中，需要注意数据范围，避免溢出问题。',
    content: [
      '整型：int, long long, unsigned',
      '浮点型：float, double',
      '字符型：char',
      '布尔型：bool',
      '数据范围与溢出问题',
      '类型转换与强制转换',
    ],
    codeExample: `// 常用数据类型范围
int: -2^31 ~ 2^31-1 (约2×10^9)
long long: -2^63 ~ 2^63-1 (约9×10^18)

// 避免溢出
long long result = 1LL * a * b;`,
    prerequisites: [1],
    recommendedProblems: [4, 5, 6],
    readTime: 20,
  },
  {
    id: 3,
    title: '分支结构',
    icon: '🔀',
    category: 'basics',
    difficulty: 'basic',
    brief: 'if-else和switch语句的使用',
    description: '分支结构让程序能够根据条件选择不同的执行路径，是控制流程的基础。',
    content: [
      'if-else语句的基本语法',
      '嵌套if-else',
      'switch-case语句',
      '条件运算符（三目运算符）',
      '逻辑运算符：&&、||、!',
      '常见错误与注意事项',
    ],
    codeExample: `// if-else示例
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else {
    grade = 'C';
}

// 三目运算符
int max = a > b ? a : b;`,
    prerequisites: [1, 2],
    recommendedProblems: [7, 8, 9],
    readTime: 25,
  },
  {
    id: 4,
    title: '循环结构',
    icon: '🔄',
    category: 'basics',
    difficulty: 'basic',
    brief: 'for、while、do-while循环',
    description: '循环结构用于重复执行某段代码，是算法实现的核心工具。',
    content: [
      'for循环的使用场景和语法',
      'while循环的使用',
      'do-while循环',
      '嵌套循环',
      'break和continue的使用',
      '循环优化技巧',
    ],
    codeExample: `// for循环
for (int i = 1; i <= n; i++) {
    sum += i;
}

// while循环
while (n > 0) {
    digit = n % 10;
    n /= 10;
}

// 双重循环
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        // 处理(i, j)
    }
}`,
    prerequisites: [3],
    recommendedProblems: [10, 11, 12],
    readTime: 30,
  },
  {
    id: 5,
    title: '数组',
    icon: '📦',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '一维数组和多维数组的使用',
    description: '数组是最基本的数据结构，用于存储相同类型的多个元素。',
    content: [
      '一维数组的声明和初始化',
      '数组访问和遍历',
      '多维数组（二维数组）',
      '数组越界问题',
      '数组作为函数参数',
      'memset和memcpy的使用',
    ],
    codeExample: `// 一维数组
int arr[100];
memset(arr, 0, sizeof(arr));

// 二维数组
int matrix[10][10];

// 数组遍历
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        // 处理matrix[i][j]
    }
}`,
    prerequisites: [4],
    recommendedProblems: [13, 14, 15],
    readTime: 35,
  },
  {
    id: 6,
    title: '字符串',
    icon: '🔤',
    category: 'string',
    difficulty: 'basic',
    brief: 'C风格字符串和string类的使用',
    description: '字符串处理是竞赛中常见的题型，需要熟练掌握字符串的输入、处理和输出。',
    content: [
      'C风格字符串（char数组）',
      'string类的使用',
      '字符串的输入输出',
      '常用字符串函数',
      '字符串遍历和处理',
      '字符串拼接和比较',
    ],
    codeExample: `// string类
string s = "Hello";
s += " World";  // 拼接
int len = s.length();  // 长度
char c = s[0];  // 访问字符

// 常用函数
s.substr(0, 5);  // 子串
s.find("lo");    // 查找
s.replace(0, 5, "Hi");  // 替换`,
    prerequisites: [1, 5],
    recommendedProblems: [16, 17, 18],
    readTime: 30,
  },
  {
    id: 7,
    title: '函数',
    icon: '⚙️',
    category: 'basics',
    difficulty: 'basic',
    brief: '函数的定义、参数传递和递归',
    description: '函数是代码模块化的基础，递归函数是许多算法的核心。',
    content: [
      '函数的定义和调用',
      '参数传递：值传递和引用传递',
      '返回值和void函数',
      '函数重载',
      '递归函数的概念和实现',
      '递归与递推的选择',
    ],
    codeExample: `// 函数定义
int max(int a, int b) {
    return a > b ? a : b;
}

// 引用传递
void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

// 递归函数
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
    prerequisites: [3, 4],
    recommendedProblems: [19, 20, 21],
    readTime: 35,
  },
  {
    id: 8,
    title: '结构体',
    icon: '🏛️',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '结构体的定义和使用',
    description: '结构体用于将多个不同类型的数据组合成一个整体，是自定义数据类型的基础。',
    content: [
      '结构体的定义',
      '结构体变量的声明和初始化',
      '结构体成员访问',
      '结构体数组',
      '结构体作为函数参数',
      '运算符重载（sort排序）',
    ],
    codeExample: `// 结构体定义
struct Student {
    string name;
    int score;
    
    // 运算符重载
    bool operator<(const Student& other) const {
        return score > other.score;  // 降序
    }
};

// 使用
Student stu[100];
stu[0] = {"Alice", 95};
sort(stu, stu + n);`,
    prerequisites: [5, 7],
    recommendedProblems: [22, 23, 24],
    readTime: 25,
  },
  {
    id: 9,
    title: '排序算法',
    icon: '📊',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '常见排序算法及其实现',
    description: '排序是最基础的算法之一，NOIP中常用sort函数，但也要理解各种排序算法的原理。',
    content: [
      '冒泡排序',
      '选择排序',
      '插入排序',
      '快速排序',
      '归并排序',
      'C++ sort函数的使用',
      '自定义排序规则',
    ],
    codeExample: `// 使用sort
#include <algorithm>
int arr[] = {3, 1, 4, 1, 5};
sort(arr, arr + 5);  // 升序

// 自定义排序
bool cmp(int a, int b) {
    return a > b;  // 降序
}
sort(arr, arr + 5, cmp);

// 对结构体排序
struct Node {
    int val, id;
    bool operator<(const Node& other) const {
        return val < other.val;
    }
};`,
    prerequisites: [4, 5],
    recommendedProblems: [25, 26, 27],
    readTime: 45,
  },
  {
    id: 10,
    title: '二分查找',
    icon: '🔍',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '二分查找算法及其应用',
    description: '二分查找是一种高效的查找算法，在有序数组中可以在O(log n)时间内完成查找。',
    content: [
      '二分查找的基本原理',
      'lower_bound和upper_bound',
      '二分答案',
      '实数二分',
      '二分查找的边界条件',
      '二分答案的应用场景',
    ],
    codeExample: `// 手写二分
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;  // 未找到
}

// 使用STL
int pos = lower_bound(arr, arr + n, target) - arr;`,
    prerequisites: [4, 9],
    recommendedProblems: [28, 29, 30],
    readTime: 40,
  },
  {
    id: 11,
    title: '递归与递推',
    icon: '🔁',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '递归思想和递推关系',
    description: '递归和递推是解决问题的两种重要方式，很多算法都基于这两种思想。',
    content: [
      '递归的基本概念',
      '递归三要素：定义、边界、递归式',
      '递推的基本概念',
      '递归到递推的转换',
      '记忆化搜索',
      '递归深度与栈溢出',
    ],
    codeExample: `// 递归求斐波那契
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

// 递推求斐波那契
int fib(int n) {
    int f[n+1];
    f[0] = 0, f[1] = 1;
    for (int i = 2; i <= n; i++) {
        f[i] = f[i-1] + f[i-2];
    }
    return f[n];
}`,
    prerequisites: [7],
    recommendedProblems: [31, 32, 33],
    readTime: 35,
  },
  {
    id: 12,
    title: '贪心算法',
    icon: '💰',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '贪心策略和正确性证明',
    description: '贪心算法是一种在每一步选择中都采取在当前状态下最好/最优的选择。',
    content: [
      '贪心算法的基本概念',
      '贪心选择性质',
      '最优子结构',
      '常见贪心问题',
      '贪心正确性的证明方法',
      '贪心与动态规划的区别',
    ],
    codeExample: `// 区间调度问题
struct Interval {
    int start, end;
    bool operator<(const Interval& other) const {
        return end < other.end;
    }
};

int maxIntervals(Interval arr[], int n) {
    sort(arr, arr + n);
    int count = 1, lastEnd = arr[0].end;
    for (int i = 1; i < n; i++) {
        if (arr[i].start >= lastEnd) {
            count++;
            lastEnd = arr[i].end;
        }
    }
    return count;
}`,
    prerequisites: [9],
    recommendedProblems: [34, 35, 36],
    readTime: 45,
  },
  {
    id: 13,
    title: '动态规划基础',
    icon: '🎯',
    category: 'dp',
    difficulty: 'intermediate',
    brief: '动态规划的基本概念和方法',
    description: '动态规划是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。',
    content: [
      '动态规划的基本概念',
      '状态定义',
      '状态转移方程',
      '边界条件',
      '时间空间复杂度分析',
      '递推实现方式',
    ],
    codeExample: `// 爬楼梯问题
int climbStairs(int n) {
    if (n <= 2) return n;
    int dp[n+1];
    dp[1] = 1, dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

// 状态压缩
int dp[n+1];  // 滚动数组
int prev1 = 1, prev2 = 2;
for (int i = 3; i <= n; i++) {
    int curr = prev1 + prev2;
    prev1 = prev2;
    prev2 = curr;
}`,
    prerequisites: [11],
    recommendedProblems: [37, 38, 39],
    readTime: 50,
  },
  {
    id: 14,
    title: '背包问题',
    icon: '🎒',
    category: 'dp',
    difficulty: 'intermediate',
    brief: '01背包、完全背包、多重背包',
    description: '背包问题是动态规划的经典问题，包括01背包、完全背包等多种变体。',
    content: [
      '01背包问题',
      '完全背包问题',
      '多重背包问题',
      '分组背包问题',
      '背包问题的空间优化',
      '背包问题初始化技巧',
    ],
    codeExample: `// 01背包
int knapsack01(int W, int wt[], int val[], int n) {
    int dp[W+1] = {0};
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], dp[w-wt[i]] + val[i]);
        }
    }
    return dp[W];
}

// 完全背包
int knapsackComplete(int W, int wt[], int val[], int n) {
    int dp[W+1] = {0};
    for (int i = 0; i < n; i++) {
        for (int w = wt[i]; w <= W; w++) {
            dp[w] = max(dp[w], dp[w-wt[i]] + val[i]);
        }
    }
    return dp[W];
}`,
    prerequisites: [13],
    recommendedProblems: [40, 41, 42],
    readTime: 60,
  },
  {
    id: 15,
    title: '图的基本概念',
    icon: '🕸️',
    category: 'graph',
    difficulty: 'intermediate',
    brief: '图的存储和遍历',
    description: '图是由顶点和边组成的数据结构，是描述网络关系的重要工具。',
    content: [
      '图的基本概念和术语',
      '图的存储方式：邻接矩阵',
      '图的存储方式：邻接表',
      '图的遍历：DFS',
      '图的遍历：BFS',
      '连通性和连通分量',
    ],
    codeExample: `// 邻接表
#include <vector>
vector<int> adj[1005];

// 添加边
adj[u].push_back(v);
adj[v].push_back(u);  // 无向图

// DFS遍历
void dfs(int u, bool visited[]) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, visited);
        }
    }
}

// BFS遍历
void bfs(int start) {
    queue<int> q;
    bool visited[1005] = {false};
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
    prerequisites: [5, 7],
    recommendedProblems: [43, 44, 45],
    readTime: 50,
  },
  {
    id: 16,
    title: '最短路径',
    icon: '🛤️',
    category: 'graph',
    difficulty: 'advanced',
    brief: 'Dijkstra、Floyd、SPFA算法',
    description: '最短路径问题是图论中的经典问题，有多种算法适用于不同场景。',
    content: [
      '单源最短路径问题',
      'Dijkstra算法',
      'Bellman-Ford算法',
      'SPFA算法',
      'Floyd算法（多源最短路）',
      '最短路径算法的选择',
    ],
    codeExample: `// Dijkstra算法
#include <queue>
typedef pair<int, int> pii;
int dist[1005];
vector<pii> adj[1005];  // (to, weight)

void dijkstra(int start) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    fill(dist, dist + 1005, INT_MAX);
    dist[start] = 0;
    pq.push({0, start});
    
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
}`,
    prerequisites: [15],
    recommendedProblems: [46, 47, 48],
    readTime: 60,
  },
  {
    id: 17,
    title: '最小生成树',
    icon: '🌳',
    category: 'graph',
    difficulty: 'advanced',
    brief: 'Prim和Kruskal算法',
    description: '最小生成树是在一个连通图中选取n-1条边，使得这n个点连通且边权之和最小。',
    content: [
      '生成树的概念',
      '最小生成树的定义',
      'Prim算法',
      'Kruskal算法',
      '并查集优化',
      '最小生成树的应用',
    ],
    codeExample: `// Kruskal算法
#include <algorithm>
struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

int parent[1005];
int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

int kruskal(Edge edges[], int n, int m) {
    sort(edges, edges + m);
    for (int i = 0; i < n; i++) parent[i] = i;
    
    int mst = 0, count = 0;
    for (int i = 0; i < m && count < n - 1; i++) {
        int pu = find(edges[i].u);
        int pv = find(edges[i].v);
        if (pu != pv) {
            parent[pu] = pv;
            mst += edges[i].weight;
            count++;
        }
    }
    return mst;
}`,
    prerequisites: [15],
    recommendedProblems: [49, 50, 51],
    readTime: 55,
  },
  {
    id: 18,
    title: '数论基础',
    icon: '🔢',
    category: 'math',
    difficulty: 'intermediate',
    brief: 'GCD、LCM、质数、素数筛',
    description: '数论是竞赛数学的重要组成部分，包括整除、同余、质数等内容。',
    content: [
      '最大公约数（GCD）',
      '最小公倍数（LCM）',
      '辗转相除法（欧几里得算法）',
      '扩展欧几里得',
      '质数判定',
      '素数筛法（埃氏筛、欧拉筛）',
    ],
    codeExample: `// GCD和LCM
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}

// 欧拉筛
void eulerSieve(int n, bool isPrime[]) {
    fill(isPrime, isPrime + n + 1, true);
    isPrime[0] = isPrime[1] = false;
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push_back(i);
        for (int p : primes) {
            if (i * p > n) break;
            isPrime[i * p] = false;
            if (i % p == 0) break;
        }
    }
}`,
    prerequisites: [7],
    recommendedProblems: [52, 53, 54],
    readTime: 50,
  },
  {
    id: 19,
    title: '搜索算法',
    icon: '🔎',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: 'DFS、BFS及其优化',
    description: '搜索是解决复杂问题的重要手段，包括深度优先搜索和广度优先搜索。',
    content: [
      '深度优先搜索（DFS）',
      '广度优先搜索（BFS）',
      '搜索的剪枝优化',
      '迭代加深搜索',
      '双向广搜',
      '搜索的应用场景',
    ],
    codeExample: `// DFS模板
void dfs(int depth) {
    if (满足条件) {
        // 处理结果
        return;
    }
    for (每个可能的选择) {
        if (可行) {
            标记;
            dfs(depth + 1);
            回溯（取消标记）;
        }
    }
}

// BFS模板
void bfs() {
    queue<State> q;
    q.push(初始状态);
    while (!q.empty()) {
        State cur = q.front();
        q.pop();
        if (cur是目标状态) {
            return;
        }
        for (每个可能的下一步) {
            if (合法 && 未访问) {
                q.push(下一状态);
                标记已访问;
            }
        }
    }
}`,
    prerequisites: [7, 15],
    recommendedProblems: [55, 56, 57],
    readTime: 55,
  },
  {
    id: 20,
    title: '线段树',
    icon: '🌲',
    category: 'advanced',
    difficulty: 'advanced',
    brief: '线段树的原理和实现',
    description: '线段树是一种二叉搜索树，用于处理区间查询和区间更新问题。',
    content: [
      '线段树的结构',
      '线段树的建树',
      '单点更新',
      '区间查询',
      '懒惰标记（延迟更新）',
      '线段树的应用场景',
    ],
    codeExample: `// 线段树模板
int tree[4 * MAXN];  // 4倍空间
int arr[MAXN];

void build(int node, int start, int end) {
    if (start == end) {
        tree[node] = arr[start];
    } else {
        int mid = (start + end) / 2;
        build(2*node, start, mid);
        build(2*node+1, mid+1, end);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
}

void update(int node, int start, int end, int idx, int val) {
    if (start == end) {
        arr[idx] = val;
        tree[node] = val;
    } else {
        int mid = (start + end) / 2;
        if (idx <= mid) update(2*node, start, mid, idx, val);
        else update(2*node+1, mid+1, end, idx, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
}

int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node];
    int mid = (start + end) / 2;
    return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r);
}`,
    prerequisites: [5, 10],
    recommendedProblems: [58, 59, 60],
    readTime: 70,
  },
];

// 搜索知识点
export function searchKnowledgePoints(query: string): KnowledgePoint[] {
  const lowerQuery = query.toLowerCase();
  return knowledgePoints.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.brief.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}

// 根据ID获取知识点
export function getKnowledgePointById(id: number): KnowledgePoint | undefined {
  return knowledgePoints.find(p => p.id === id);
}

// 根据分类获取知识点
export function getKnowledgePointsByCategory(category: string): KnowledgePoint[] {
  return knowledgePoints.filter(p => p.category === category);
}

// 获取推荐学习顺序
export function getLearningOrder(): KnowledgePoint[] {
  // 简单的拓扑排序（基于prerequisites）
  const visited = new Set<number>();
  const result: KnowledgePoint[] = [];
  
  function visit(point: KnowledgePoint) {
    if (visited.has(point.id)) return;
    visited.add(point.id);
    
    for (const preId of point.prerequisites) {
      const prePoint = getKnowledgePointById(preId);
      if (prePoint) visit(prePoint);
    }
    
    result.push(point);
  }
  
  knowledgePoints.forEach(visit);
  return result;
}

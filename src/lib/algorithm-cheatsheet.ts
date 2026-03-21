// 算法速查表 - 快速复习用

export interface CheatSheetItem {
  id: string;
  title: string;
  category: string;
  summary: string; // 一句话总结
  formula: string; // 核心公式/伪代码
  timeComplexity: string;
  spaceComplexity: string;
  keyPoints: string[];
  whenToUse: string[];
  pitfalls: string[];
  example: {
    problem: string;
    solution: string;
  };
}

export interface CheatSheetCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const cheatSheetCategories: CheatSheetCategory[] = [
  { id: 'sort', name: '排序算法', icon: '📊', color: 'blue', description: '各种排序算法的对比与实现' },
  { id: 'search', name: '搜索算法', icon: '🔍', color: 'green', description: '二分查找、搜索技巧' },
  { id: 'dp', name: '动态规划', icon: '🎯', color: 'purple', description: '经典DP模型与状态转移' },
  { id: 'graph', name: '图论算法', icon: '🕸️', color: 'cyan', description: '最短路、生成树等' },
  { id: 'number-theory', name: '数论算法', icon: '🔢', color: 'orange', description: 'GCD、质数、快速幂等' },
  { id: 'data-structure', name: '数据结构', icon: '🏗️', color: 'red', description: '常用数据结构操作' },
];

export const cheatSheetItems: CheatSheetItem[] = [
  // ========== 排序算法 ==========
  {
    id: 'quick-sort',
    title: '快速排序',
    category: 'sort',
    summary: '分治思想，选基准值分区排序',
    formula: `void quickSort(int l, int r) {
  if (l >= r) return;
  int pivot = partition(l, r);
  quickSort(l, pivot - 1);
  quickSort(pivot + 1, r);
}`,
    timeComplexity: '平均O(n log n)，最坏O(n²)',
    spaceComplexity: 'O(log n)',
    keyPoints: [
      '基准值(pivot)选择影响效率',
      '随机选基准可避免最坏情况',
      '三路快排处理重复元素更高效',
      '小规模数据可切换插入排序',
    ],
    whenToUse: [
      '大规模数据排序',
      '内存有限（原地排序）',
      '平均性能要求高',
    ],
    pitfalls: [
      '已排序数组会退化到O(n²)',
      '大量重复元素效率降低',
      '递归深度可能导致栈溢出',
    ],
    example: {
      problem: '对n个整数排序',
      solution: `sort(arr, arr + n); // C++ STL直接用`,
    },
  },
  {
    id: 'merge-sort',
    title: '归并排序',
    category: 'sort',
    summary: '分治+合并，稳定排序',
    formula: `void mergeSort(int l, int r) {
  if (l >= r) return;
  int mid = (l + r) / 2;
  mergeSort(l, mid);
  mergeSort(mid + 1, r);
  merge(l, mid, r); // 合并两个有序数组
}`,
    timeComplexity: 'O(n log n) 稳定',
    spaceComplexity: 'O(n)',
    keyPoints: [
      '时间复杂度稳定为O(n log n)',
      '稳定排序（相同元素顺序不变）',
      '可用于求逆序对',
      '适合链表排序',
    ],
    whenToUse: [
      '需要稳定排序时',
      '求逆序对数量',
      '链表排序',
      '大数据外部排序',
    ],
    pitfalls: [
      '需要额外O(n)空间',
      '常数因子较大',
    ],
    example: {
      problem: '求逆序对数量',
      solution: `// 归并排序时统计逆序对
long long cnt = 0;
void merge(int l, int mid, int r) {
  // 合并时 a[i] > a[j] 则 cnt += mid - i + 1;
}`,
    },
  },

  // ========== 搜索算法 ==========
  {
    id: 'binary-search',
    title: '二分查找',
    category: 'search',
    summary: '在有序数组中O(log n)查找',
    formula: `// 找第一个>=x的位置
int lowerBound(int l, int r, int x) {
  while (l < r) {
    int mid = l + (r - l) / 2;
    if (a[mid] < x) l = mid + 1;
    else r = mid;
  }
  return l;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    keyPoints: [
      '前提：数组必须有序',
      'mid = l + (r - l) / 2 避免溢出',
      '区分"找第一个"和"找任意一个"',
      '浮点数二分注意精度',
    ],
    whenToUse: [
      '有序数组查找',
      '二分答案（答案有单调性）',
      '查找边界位置',
    ],
    pitfalls: [
      '死循环：l和r更新错误',
      '溢出：mid计算溢出',
      '边界：没处理好边界情况',
    ],
    example: {
      problem: '在有序数组中找目标值',
      solution: `int pos = lower_bound(a, a + n, x) - a;`,
    },
  },
  {
    id: 'binary-answer',
    title: '二分答案',
    category: 'search',
    summary: '答案有单调性时，二分查找最优解',
    formula: `// 二分答案模板
long long l = minAns, r = maxAns;
while (l < r) {
  long long mid = l + (r - l) / 2;
  if (check(mid)) r = mid;  // mid可行，尝试更小
  else l = mid + 1;         // mid不可行，需要更大
}
return l;`,
    timeComplexity: 'O(log(值域) × check复杂度)',
    spaceComplexity: '取决于check函数',
    keyPoints: [
      '关键是写出check函数',
      '答案需要具有单调性',
      '整数二分注意边界',
      '浮点数二分控制精度',
    ],
    whenToUse: [
      '求最小值/最大值',
      '答案有单调性',
      '直接求答案困难，验证答案容易',
    ],
    pitfalls: [
      'check函数写错',
      'l和r更新方向错误',
      '浮点二分精度不够',
    ],
    example: {
      problem: '最小化最大值问题',
      solution: `// 分割数组使最大和最小
bool check(long long limit) {
  // 检查是否可以用limit分割
}`,
    },
  },

  // ========== 动态规划 ==========
  {
    id: 'knapsack-01',
    title: '01背包',
    category: 'dp',
    summary: '每件物品最多选一次',
    formula: `// 一维优化
for (int i = 1; i <= n; i++) {
  for (int j = W; j >= w[i]; j--) {  // 倒序！
    dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
  }
}`,
    timeComplexity: 'O(n × W)',
    spaceComplexity: 'O(W)',
    keyPoints: [
      '一维优化必须倒序遍历',
      'dp[j]表示容量j的最大价值',
      '注意背包容量和数据范围',
    ],
    whenToUse: [
      '每件物品只能选或不选',
      '求最大价值/最小花费',
    ],
    pitfalls: [
      '一维优化用正序（错误）',
      '容量W过大导致超时',
    ],
    example: {
      problem: '有n件物品，容量W的背包，求最大价值',
      solution: `dp[j] = max(dp[j], dp[j-w[i]] + v[i])`,
    },
  },
  {
    id: 'knapsack-complete',
    title: '完全背包',
    category: 'dp',
    summary: '每件物品可选无限次',
    formula: `// 正序遍历
for (int i = 1; i <= n; i++) {
  for (int j = w[i]; j <= W; j++) {  // 正序！
    dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
  }
}`,
    timeComplexity: 'O(n × W)',
    spaceComplexity: 'O(W)',
    keyPoints: [
      '正序遍历（与01背包唯一区别）',
      '每件物品可以选多次',
      '可以转换为01背包优化',
    ],
    whenToUse: [
      '物品数量无限',
      '求方案数或最大价值',
    ],
    pitfalls: [
      '用倒序遍历（变成01背包）',
      '忘记初始化',
    ],
    example: {
      problem: '完全背包求方案数',
      solution: `dp[0] = 1;
for (int i = 1; i <= n; i++)
  for (int j = w[i]; j <= W; j++)
    dp[j] += dp[j - w[i]];`,
    },
  },
  {
    id: 'lis',
    title: '最长递增子序列(LIS)',
    category: 'dp',
    summary: 'O(n log n)求最长递增子序列',
    formula: `vector<int> dp;
for (int x : a) {
  auto it = lower_bound(dp.begin(), dp.end(), x);
  if (it == dp.end()) dp.push_back(x);
  else *it = x;
}
return dp.size();`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    keyPoints: [
      'dp[i]表示长度为i+1的LIS最小结尾元素',
      'lower_bound找第一个>=x的位置',
      '只能求长度，不能求方案',
    ],
    whenToUse: [
      '求最长递增/不降子序列长度',
      '序列问题',
    ],
    pitfalls: [
      '想求方案要用O(n²)方法',
      '区分递增和不降',
    ],
    example: {
      problem: '求序列的最长递增子序列长度',
      solution: `// dp[i] 存长度为i+1的LIS的最小结尾`,
    },
  },
  {
    id: 'lcs',
    title: '最长公共子序列(LCS)',
    category: 'dp',
    summary: '求两个序列的最长公共子序列',
    formula: `for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= m; j++) {
    if (s[i] == t[j]) dp[i][j] = dp[i-1][j-1] + 1;
    else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
  }
}`,
    timeComplexity: 'O(n × m)',
    spaceComplexity: 'O(n × m)',
    keyPoints: [
      'dp[i][j]表示s前i个和t前j个的LCS',
      '相等时从dp[i-1][j-1]转移',
      '不等时从上方或左方转移',
    ],
    whenToUse: [
      '两个序列的相似度',
      '编辑距离问题基础',
    ],
    pitfalls: [
      '空间优化时注意顺序',
      '求方案需要回溯',
    ],
    example: {
      problem: '求两个字符串的LCS长度',
      solution: `dp[i][j] = s[i]==t[j] ? dp[i-1][j-1]+1 : max(dp[i-1][j], dp[i][j-1])`,
    },
  },

  // ========== 图论算法 ==========
  {
    id: 'dijkstra',
    title: 'Dijkstra最短路',
    category: 'graph',
    summary: '单源最短路径（无负权边）',
    formula: `priority_queue<pair<int,int>> pq;
dist[start] = 0;
pq.push({0, start});
while (!pq.empty()) {
  auto [d, u] = pq.top(); pq.pop();
  if (d > dist[u]) continue;
  for (auto [v, w] : adj[u]) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      pq.push({dist[v], v});
    }
  }
}`,
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    keyPoints: [
      '只能处理非负权边',
      '使用优先队列优化',
      'd > dist[u]是关键剪枝',
    ],
    whenToUse: [
      '单源最短路',
      '边权非负',
      '稀疏图',
    ],
    pitfalls: [
      '有负权边会出错',
      '忘记continue剪枝',
      '优先队列用less（应该是greater）',
    ],
    example: {
      problem: '求起点到所有点的最短距离',
      solution: `// 用邻接表存图，优先队列优化`,
    },
  },
  {
    id: 'spfa',
    title: 'SPFA最短路',
    category: 'graph',
    summary: '支持负权边，可判负环',
    formula: `queue<int> q;
dist[start] = 0; inQueue[start] = true;
q.push(start);
while (!q.empty()) {
  int u = q.front(); q.pop();
  inQueue[u] = false;
  for (auto [v, w] : adj[u]) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      cnt[v] = cnt[u] + 1;
      if (cnt[v] >= n) return -1; // 负环
      if (!inQueue[v]) {
        q.push(v);
        inQueue[v] = true;
      }
    }
  }
}`,
    timeComplexity: '平均O(E)，最坏O(V×E)',
    spaceComplexity: 'O(V)',
    keyPoints: [
      'SPFA是Bellman-Ford的优化',
      '可以处理负权边',
      'cnt[v] >= n说明有负环',
      '可能退化到O(VE)',
    ],
    whenToUse: [
      '有负权边',
      '判断负环',
      '差分约束系统',
    ],
    pitfalls: [
      '没有负权边时优先用Dijkstra',
      '容易被卡时间',
      '负环判断条件错误',
    ],
    example: {
      problem: '判断图中是否有负环',
      solution: `// cnt[v] >= n 时存在负环`,
    },
  },
  {
    id: 'mst-kruskal',
    title: 'Kruskal最小生成树',
    category: 'graph',
    summary: '贪心+并查集求最小生成树',
    formula: `sort(edges.begin(), edges.end());  // 按权值排序
for (auto& e : edges) {
  if (find(e.u) != find(e.v)) {
    unite(e.u, e.v);
    totalWeight += e.w;
    edgeCount++;
  }
}`,
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V)',
    keyPoints: [
      '边按权值排序',
      '用并查集判断连通性',
      '选n-1条边结束',
    ],
    whenToUse: [
      '求最小生成树',
      '稀疏图优先',
    ],
    pitfalls: [
      '忘记排序',
      '并查集初始化',
      '边数不足n-1说明不连通',
    ],
    example: {
      problem: '求连通图的最小生成树权值',
      solution: `// 按边权排序后贪心选取`,
    },
  },

  // ========== 数论算法 ==========
  {
    id: 'gcd',
    title: '最大公约数(GCD)',
    category: 'number-theory',
    summary: '辗转相除法求GCD',
    formula: `long long gcd(long long a, long long b) {
  return b == 0 ? a : gcd(b, a % b);
}

// LCM
long long lcm(long long a, long long b) {
  return a / gcd(a, b) * b;  // 先除后乘避免溢出
}`,
    timeComplexity: 'O(log min(a, b))',
    spaceComplexity: 'O(1)',
    keyPoints: [
      'gcd(a, b) = gcd(b, a % b)',
      'lcm先除后乘避免溢出',
      '__gcd(a, b)是C++内置函数',
    ],
    whenToUse: [
      '分数化简',
      '求最小公倍数',
      '数论问题',
    ],
    pitfalls: [
      'lcm先乘后除会溢出',
      '负数取模问题',
    ],
    example: {
      problem: '求a和b的最大公约数',
      solution: `return __gcd(a, b); // C++内置`,
    },
  },
  {
    id: 'prime-sieve',
    title: '素数筛',
    category: 'number-theory',
    summary: '欧拉筛O(n)求所有素数',
    formula: `vector<int> primes;
vector<bool> isPrime(n + 1, true);
isPrime[0] = isPrime[1] = false;
for (int i = 2; i <= n; i++) {
  if (isPrime[i]) primes.push_back(i);
  for (int p : primes) {
    if (i * p > n) break;
    isPrime[i * p] = false;
    if (i % p == 0) break;  // 关键：保证每个合数只被筛一次
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    keyPoints: [
      '每个合数只被最小质因子筛一次',
      'i % p == 0时break是关键',
      '可以顺便求欧拉函数',
    ],
    whenToUse: [
      '需要所有素数时',
      '大范围内判断素数',
      '预处理质因子',
    ],
    pitfalls: [
      '埃氏筛够用时不必用欧拉筛',
      '忘记break条件',
    ],
    example: {
      problem: '求1到n的所有素数',
      solution: `// 欧拉筛O(n)时间复杂度`,
    },
  },
  {
    id: 'fast-power',
    title: '快速幂',
    category: 'number-theory',
    summary: 'O(log n)计算a^b mod m',
    formula: `long long fastPow(long long a, long long b, long long m) {
  long long result = 1;
  a %= m;
  while (b > 0) {
    if (b & 1) result = result * a % m;
    a = a * a % m;
    b >>= 1;
  }
  return result;
}`,
    timeComplexity: 'O(log b)',
    spaceComplexity: 'O(1)',
    keyPoints: [
      '利用二进制分解指数',
      '每次平方+取模',
      'b&1判断当前位是否为1',
    ],
    whenToUse: [
      '计算大指数幂',
      '取模运算',
      '矩阵快速幂',
    ],
    pitfalls: [
      '忘记每步取模',
      'a要先取模',
      '结果可能为0',
    ],
    example: {
      problem: '计算a^b mod m',
      solution: `// 快速幂模板`,
    },
  },

  // ========== 数据结构 ==========
  {
    id: 'segment-tree',
    title: '线段树',
    category: 'data-structure',
    summary: '支持区间修改、区间查询',
    formula: `void build(int node, int l, int r);
void update(int node, int l, int r, int ql, int qr, int val);
long long query(int node, int l, int r, int ql, int qr);
// 懒标记下推
void pushDown(int node, int l, int r);`,
    timeComplexity: 'O(log n) 单次操作',
    spaceComplexity: 'O(4n)',
    keyPoints: [
      '开4倍空间',
      'lazy标记延迟下推',
      'pushUp合并，pushDown下推',
    ],
    whenToUse: [
      '区间加/区间求和',
      '区间最值查询',
      '区间修改',
    ],
    pitfalls: [
      '空间开小了',
      '忘记pushDown',
      '边界处理错误',
    ],
    example: {
      problem: '区间加、区间求和',
      solution: `// 线段树模板+lazy标记`,
    },
  },
  {
    id: 'fenwick-tree',
    title: '树状数组',
    category: 'data-structure',
    summary: '单点修改、区间求和',
    formula: `int lowbit(int x) { return x & (-x); }
void update(int x, int val) {
  for (; x <= n; x += lowbit(x)) tree[x] += val;
}
int query(int x) {
  int sum = 0;
  for (; x > 0; x -= lowbit(x)) sum += tree[x];
  return sum;
}`,
    timeComplexity: 'O(log n) 单次操作',
    spaceComplexity: 'O(n)',
    keyPoints: [
      'lowbit(x) = x & (-x)',
      '支持单点修改+前缀查询',
      '区间查询 = query(r) - query(l-1)',
    ],
    whenToUse: [
      '单点修改+区间求和',
      '求逆序对',
      '简单区间问题',
    ],
    pitfalls: [
      '下标从1开始',
      '不能区间修改（除非用差分）',
    ],
    example: {
      problem: '单点修改，区间求和',
      solution: `// 树状数组模板`,
    },
  },
  {
    id: 'union-find',
    title: '并查集',
    category: 'data-structure',
    summary: '维护集合合并与查询',
    formula: `int find(int x) {
  return parent[x] == x ? x : parent[x] = find(parent[x]);
}
void unite(int x, int y) {
  parent[find(x)] = find(y);
}
bool same(int x, int y) {
  return find(x) == find(y);
}`,
    timeComplexity: 'O(α(n)) 近似O(1)',
    spaceComplexity: 'O(n)',
    keyPoints: [
      '路径压缩：查找时更新父节点',
      '按秩合并：小树合并到大树',
      '初始化：parent[i] = i',
    ],
    whenToUse: [
      '连通性判断',
      'Kruskal最小生成树',
      '等价类划分',
    ],
    pitfalls: [
      '忘记初始化',
      '只用unite不用find',
    ],
    example: {
      problem: '判断两点是否连通',
      solution: `// 并查集模板`,
    },
  },
];

// 按分类获取速查表
export function getCheatSheetByCategory(categoryId: string): CheatSheetItem[] {
  return cheatSheetItems.filter(item => item.category === categoryId);
}

// 搜索速查表
export function searchCheatSheet(keyword: string): CheatSheetItem[] {
  const lower = keyword.toLowerCase();
  return cheatSheetItems.filter(item =>
    item.title.toLowerCase().includes(lower) ||
    item.summary.toLowerCase().includes(lower) ||
    item.keyPoints.some(p => p.toLowerCase().includes(lower))
  );
}

// 获取所有速查表
export function getAllCheatSheets(): CheatSheetItem[] {
  return cheatSheetItems;
}

// 代码模板库

export interface CodeTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  code: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TemplateCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const templateCategories: TemplateCategory[] = [
  { id: 'basic', name: '基础模板', icon: '📄', description: 'NOIP标准输入输出模板' },
  { id: 'data-structure', name: '数据结构', icon: '🏗️', description: '常用数据结构模板' },
  { id: 'algorithm', name: '算法模板', icon: '⚡', description: '经典算法实现' },
  { id: 'graph', name: '图论', icon: '🕸️', description: '图论算法模板' },
  { id: 'dp', name: '动态规划', icon: '📊', description: 'DP状态转移模板' },
  { id: 'number-theory', name: '数论', icon: '🔢', description: '数论算法模板' },
  { id: 'string', name: '字符串', icon: '📝', description: '字符串处理模板' },
  { id: 'geometry', name: '计算几何', icon: '📐', description: '几何计算模板' },
];

export const codeTemplates: CodeTemplate[] = [
  // ========== 基础模板 ==========
  {
    id: 'noip-template',
    name: 'NOIP标准模板',
    category: 'basic',
    description: 'NOIP竞赛标准文件输入输出模板，包含常用头文件',
    code: `#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <vector>
#include <queue>
#include <stack>
#include <set>
#include <map>
using namespace std;

int main() {
    // 从文件读取输入，输出到文件
    freopen("xxx.in", "r", stdin);
    freopen("xxx.out", "w", stdout);
    
    // 你的代码
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    tags: ['NOIP', '文件IO', '基础'],
    difficulty: 'beginner',
  },
  {
    id: 'fast-io',
    name: '快速输入输出',
    category: 'basic',
    description: '使用快读快写优化输入输出效率',
    code: `#include <iostream>
#include <cstdio>
using namespace std;

namespace IO {
    const int SIZE = 1 << 20;
    char buf[SIZE], *p1 = buf, *p2 = buf;
    
    inline char gc() {
        return p1 == p2 && (p2 = (p1 = buf) + fread(buf, 1, SIZE, stdin), p1 == p2) ? EOF : *p1++;
    }
    
    template<typename T>
    inline void read(T &x) {
        x = 0;
        char c = gc();
        bool f = false;
        while (c < '0' || c > '9') {
            if (c == '-') f = true;
            c = gc();
        }
        while (c >= '0' && c <= '9') {
            x = x * 10 + (c - '0');
            c = gc();
        }
        if (f) x = -x;
    }
    
    char obuf[SIZE], *p3 = obuf;
    
    inline void flush() {
        fwrite(obuf, 1, p3 - obuf, stdout);
        p3 = obuf;
    }
    
    inline void pc(char c) {
        if (p3 - obuf == SIZE) flush();
        *p3++ = c;
    }
    
    template<typename T>
    inline void write(T x) {
        if (x < 0) {
            pc('-');
            x = -x;
        }
        if (x > 9) write(x / 10);
        pc(x % 10 + '0');
    }
}
using namespace IO;

int main() {
    freopen("xxx.in", "r", stdin);
    freopen("xxx.out", "w", stdout);
    
    int n;
    read(n);
    write(n);
    pc('\\n');
    
    flush();
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
    tags: ['快读', '快写', '优化'],
    difficulty: 'intermediate',
  },
  
  // ========== 数据结构 ==========
  {
    id: 'segment-tree',
    name: '线段树',
    category: 'data-structure',
    description: '支持区间修改、区间查询的线段树模板',
    code: `const int MAXN = 100005;
long long tree[MAXN * 4], lazy[MAXN * 4];
int a[MAXN];
int n;

void pushUp(int node) {
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

void pushDown(int node, int l, int r) {
    if (lazy[node] != 0) {
        int mid = (l + r) / 2;
        tree[node * 2] += lazy[node] * (mid - l + 1);
        tree[node * 2 + 1] += lazy[node] * (r - mid);
        lazy[node * 2] += lazy[node];
        lazy[node * 2 + 1] += lazy[node];
        lazy[node] = 0;
    }
}

void build(int node, int l, int r) {
    lazy[node] = 0;
    if (l == r) {
        tree[node] = a[l];
        return;
    }
    int mid = (l + r) / 2;
    build(node * 2, l, mid);
    build(node * 2 + 1, mid + 1, r);
    pushUp(node);
}

void update(int node, int l, int r, int ql, int qr, long long val) {
    if (ql <= l && r <= qr) {
        tree[node] += val * (r - l + 1);
        lazy[node] += val;
        return;
    }
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    if (ql <= mid) update(node * 2, l, mid, ql, qr, val);
    if (qr > mid) update(node * 2 + 1, mid + 1, r, ql, qr, val);
    pushUp(node);
}

long long query(int node, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[node];
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    long long ans = 0;
    if (ql <= mid) ans += query(node * 2, l, mid, ql, qr);
    if (qr > mid) ans += query(node * 2 + 1, mid + 1, r, ql, qr);
    return ans;
}`,
    tags: ['线段树', '区间修改', '区间查询'],
    difficulty: 'advanced',
  },
  {
    id: 'union-find',
    name: '并查集',
    category: 'data-structure',
    description: '带路径压缩和按秩合并的并查集',
    code: `const int MAXN = 100005;
int parent[MAXN], rank_[MAXN];

void init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        rank_[i] = 1;
    }
}

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

bool unite(int x, int y) {
    x = find(x);
    y = find(y);
    if (x == y) return false;
    if (rank_[x] < rank_[y]) swap(x, y);
    parent[y] = x;
    if (rank_[x] == rank_[y]) rank_[x]++;
    return true;
}

bool same(int x, int y) {
    return find(x) == find(y);
}`,
    tags: ['并查集', '路径压缩'],
    difficulty: 'intermediate',
  },
  {
    id: 'fenwick-tree',
    name: '树状数组',
    category: 'data-structure',
    description: '支持单点修改、区间查询的树状数组',
    code: `const int MAXN = 100005;
long long tree[MAXN];
int n;

int lowbit(int x) {
    return x & (-x);
}

void update(int x, long long val) {
    for (int i = x; i <= n; i += lowbit(i)) {
        tree[i] += val;
    }
}

long long query(int x) {
    long long ans = 0;
    for (int i = x; i > 0; i -= lowbit(i)) {
        ans += tree[i];
    }
    return ans;
}

long long queryRange(int l, int r) {
    return query(r) - query(l - 1);
}

void init(int arr[], int len) {
    n = len;
    memset(tree, 0, sizeof(tree));
    for (int i = 1; i <= n; i++) {
        update(i, arr[i]);
    }
}`,
    tags: ['树状数组', 'BIT', '区间查询'],
    difficulty: 'intermediate',
  },
  {
    id: 'sparse-table',
    name: 'ST表',
    category: 'data-structure',
    description: '静态区间最值查询，O(1)查询复杂度',
    code: `const int MAXN = 100005;
const int LOGN = 20;
int st[MAXN][LOGN], logn[MAXN];
int a[MAXN], n;

void init() {
    logn[1] = 0;
    for (int i = 2; i <= n; i++) {
        logn[i] = logn[i / 2] + 1;
    }
    for (int i = 1; i <= n; i++) {
        st[i][0] = a[i];
    }
    for (int j = 1; j < LOGN; j++) {
        for (int i = 1; i + (1 << j) - 1 <= n; i++) {
            st[i][j] = max(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
        }
    }
}

int query(int l, int r) {
    int k = logn[r - l + 1];
    return max(st[l][k], st[r - (1 << k) + 1][k]);
}`,
    tags: ['ST表', 'RMQ', '静态查询'],
    difficulty: 'intermediate',
  },
  {
    id: 'monotonic-stack',
    name: '单调栈',
    category: 'data-structure',
    description: '求每个元素左边/右边第一个比它大/小的元素',
    code: `// 求每个元素右边第一个比它大的元素下标
int n = arr.size();
vector<int> nextGreater(n, -1);
stack<int> st;

for (int i = 0; i < n; i++) {
    while (!st.empty() && arr[st.top()] < arr[i]) {
        nextGreater[st.top()] = i;
        st.pop();
    }
    st.push(i);
}

// 求每个元素左边第一个比它小的元素下标
vector<int> prevSmaller(n, -1);
while (!st.empty()) st.pop();

for (int i = 0; i < n; i++) {
    while (!st.empty() && arr[st.top()] >= arr[i]) {
        st.pop();
    }
    if (!st.empty()) {
        prevSmaller[i] = st.top();
    }
    st.push(i);
}`,
    tags: ['单调栈', '单调队列'],
    difficulty: 'intermediate',
  },

  // ========== 图论 ==========
  {
    id: 'dijkstra',
    name: 'Dijkstra最短路',
    category: 'graph',
    description: '单源最短路径，使用优先队列优化',
    code: `const int MAXN = 100005;
const long long INF = 1e18;
struct Edge {
    int to;
    long long w;
};
vector<Edge> adj[MAXN];
long long dist[MAXN];
int n, m;

void dijkstra(int start) {
    for (int i = 1; i <= n; i++) dist[i] = INF;
    dist[start] = 0;
    
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        
        for (auto& e : adj[u]) {
            if (dist[u] + e.w < dist[e.to]) {
                dist[e.to] = dist[u] + e.w;
                pq.push({dist[e.to], e.to});
            }
        }
    }
}`,
    tags: ['最短路', 'Dijkstra', '优先队列'],
    difficulty: 'intermediate',
  },
  {
    id: 'spfa',
    name: 'SPFA最短路',
    category: 'graph',
    description: '支持负权边的最短路算法，可判断负环',
    code: `const int MAXN = 100005;
const long long INF = 1e18;
struct Edge {
    int to;
    long long w;
};
vector<Edge> adj[MAXN];
long long dist[MAXN];
bool inQueue[MAXN];
int cnt[MAXN];
int n, m;

bool spfa(int start) {
    for (int i = 1; i <= n; i++) {
        dist[i] = INF;
        inQueue[i] = false;
        cnt[i] = 0;
    }
    
    queue<int> q;
    dist[start] = 0;
    q.push(start);
    inQueue[start] = true;
    
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
                    if (cnt[e.to] >= n) return false; // 存在负环
                }
            }
        }
    }
    return true;
}`,
    tags: ['最短路', 'SPFA', '负权边'],
    difficulty: 'intermediate',
  },
  {
    id: 'floyd',
    name: 'Floyd全源最短路',
    category: 'graph',
    description: '计算任意两点间的最短路径',
    code: `const int MAXN = 505;
const long long INF = 1e18;
long long dist[MAXN][MAXN];
int n;

void floyd() {
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}

void init() {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            dist[i][j] = (i == j) ? 0 : INF;
        }
    }
    // 读入边后: dist[u][v] = min(dist[u][v], w);
}`,
    tags: ['最短路', 'Floyd', '多源'],
    difficulty: 'intermediate',
  },
  {
    id: 'kruskal',
    name: 'Kruskal最小生成树',
    category: 'graph',
    description: '基于并查集的最小生成树算法',
    code: `struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const {
        return w < other.w;
    }
};

const int MAXN = 100005;
int parent[MAXN];

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

long long kruskal(vector<Edge>& edges, int n) {
    sort(edges.begin(), edges.end());
    for (int i = 1; i <= n; i++) parent[i] = i;
    
    long long totalWeight = 0;
    int edgeCount = 0;
    
    for (auto& e : edges) {
        int pu = find(e.u);
        int pv = find(e.v);
        if (pu != pv) {
            parent[pu] = pv;
            totalWeight += e.w;
            edgeCount++;
            if (edgeCount == n - 1) break;
        }
    }
    
    return edgeCount == n - 1 ? totalWeight : -1; // -1表示无法构成生成树
}`,
    tags: ['最小生成树', 'Kruskal', '并查集'],
    difficulty: 'intermediate',
  },
  {
    id: 'lca',
    name: 'LCA最近公共祖先',
    category: 'graph',
    description: '使用倍增法求最近公共祖先',
    code: `const int MAXN = 100005;
const int LOGN = 20;
vector<int> adj[MAXN];
int parent[MAXN][LOGN], depth[MAXN];
int n;

void dfs(int u, int p, int d) {
    parent[u][0] = p;
    depth[u] = d;
    for (int i = 1; i < LOGN; i++) {
        parent[u][i] = parent[parent[u][i - 1]][i - 1];
    }
    for (int v : adj[u]) {
        if (v != p) dfs(v, u, d + 1);
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    int diff = depth[u] - depth[v];
    for (int i = 0; i < LOGN; i++) {
        if ((diff >> i) & 1) u = parent[u][i];
    }
    if (u == v) return u;
    for (int i = LOGN - 1; i >= 0; i--) {
        if (parent[u][i] != parent[v][i]) {
            u = parent[u][i];
            v = parent[v][i];
        }
    }
    return parent[u][0];
}`,
    tags: ['LCA', '倍增', '树上问题'],
    difficulty: 'advanced',
  },

  // ========== 动态规划 ==========
  {
    id: 'knapsack-01',
    name: '01背包',
    category: 'dp',
    description: '经典01背包问题模板',
    code: `const int MAXN = 1005;
const int MAXW = 100005;
int w[MAXN], v[MAXN];
long long dp[MAXW];
int n, W;

long long knapsack01() {
    memset(dp, 0, sizeof(dp));
    for (int i = 1; i <= n; i++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    return dp[W];
}

// 空间优化版本 - 滚动数组
long long dp2[2][MAXW];
long long knapsack01Rolling() {
    memset(dp2, 0, sizeof(dp2));
    for (int i = 1; i <= n; i++) {
        int cur = i % 2, prev = 1 - cur;
        for (int j = 0; j <= W; j++) {
            dp2[cur][j] = dp2[prev][j];
            if (j >= w[i]) {
                dp2[cur][j] = max(dp2[cur][j], dp2[prev][j - w[i]] + v[i]);
            }
        }
    }
    return dp2[n % 2][W];
}`,
    tags: ['背包问题', 'DP', '01背包'],
    difficulty: 'intermediate',
  },
  {
    id: 'knapsack-complete',
    name: '完全背包',
    category: 'dp',
    description: '每种物品可以选无限次',
    code: `const int MAXN = 1005;
const int MAXW = 100005;
int w[MAXN], v[MAXN];
long long dp[MAXW];
int n, W;

long long knapsackComplete() {
    memset(dp, 0, sizeof(dp));
    for (int i = 1; i <= n; i++) {
        for (int j = w[i]; j <= W; j++) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    return dp[W];
}`,
    tags: ['背包问题', 'DP', '完全背包'],
    difficulty: 'intermediate',
  },
  {
    id: 'lis',
    name: '最长递增子序列',
    category: 'dp',
    description: 'O(nlogn)求最长递增子序列长度',
    code: `int lengthOfLIS(vector<int>& nums) {
    vector<int> dp;
    for (int x : nums) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) {
            dp.push_back(x);
        } else {
            *it = x;
        }
    }
    return dp.size();
}

// 同时求方案数
const int MAXN = 100005;
int a[MAXN], len[MAXN], cnt[MAXN];
int n;

pair<int, long long> lisWithCount() {
    vector<int> dp;
    for (int i = 0; i < n; i++) {
        auto it = lower_bound(dp.begin(), dp.end(), a[i]);
        len[i] = (int)(it - dp.begin()) + 1;
        if (it == dp.end()) dp.push_back(a[i]);
        else *it = a[i];
    }
    
    int maxLen = dp.size();
    // 计算方案数需要额外处理
    return {maxLen, 0}; // 返回长度和方案数
}`,
    tags: ['LIS', 'DP', '二分'],
    difficulty: 'intermediate',
  },
  {
    id: 'lcs',
    name: '最长公共子序列',
    category: 'dp',
    description: '求两个序列的最长公共子序列',
    code: `const int MAXN = 1005;
int dp[MAXN][MAXN];

int lcs(string& s, string& t) {
    int n = s.length(), m = t.length();
    memset(dp, 0, sizeof(dp));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (s[i - 1] == t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[n][m];
}

// 输出方案
string getLCS(string& s, string& t) {
    int n = s.length(), m = t.length();
    lcs(s, t);
    
    string result = "";
    int i = n, j = m;
    while (i > 0 && j > 0) {
        if (s[i - 1] == t[j - 1]) {
            result = s[i - 1] + result;
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return result;
}`,
    tags: ['LCS', 'DP'],
    difficulty: 'intermediate',
  },

  // ========== 数论 ==========
  {
    id: 'gcd-lcm',
    name: 'GCD与LCM',
    category: 'number-theory',
    description: '最大公约数和最小公倍数',
    code: `long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}

// 扩展欧几里得 - 求 ax + by = gcd(a,b) 的解
long long exgcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long d = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return d;
}`,
    tags: ['GCD', 'LCM', '扩展欧几里得'],
    difficulty: 'beginner',
  },
  {
    id: 'prime-sieve',
    name: '素数筛法',
    category: 'number-theory',
    description: '埃氏筛和欧拉筛',
    code: `const int MAXN = 10000005;
bool isPrime[MAXN];
int primes[MAXN], primeCount;

// 埃氏筛 O(n log log n)
void eratosthenes(int n) {
    memset(isPrime, true, sizeof(isPrime));
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
}

// 欧拉筛 O(n)
void eulerSieve(int n) {
    memset(isPrime, true, sizeof(isPrime));
    primeCount = 0;
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes[++primeCount] = i;
        }
        for (int j = 1; j <= primeCount && i * primes[j] <= n; j++) {
            isPrime[i * primes[j]] = false;
            if (i % primes[j] == 0) break;
        }
    }
}`,
    tags: ['素数', '筛法', '欧拉筛'],
    difficulty: 'intermediate',
  },
  {
    id: 'fast-power',
    name: '快速幂',
    category: 'number-theory',
    description: '快速计算 a^b mod m',
    code: `// 非递归版本
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

// 递归版本
long long fastPowRec(long long a, long long b, long long m) {
    if (b == 0) return 1;
    if (b == 1) return a % m;
    long long t = fastPowRec(a, b / 2, m);
    t = t * t % m;
    if (b & 1) t = t * a % m;
    return t;
}

// 矩阵快速幂
struct Matrix {
    long long a[2][2];
    Matrix() { memset(a, 0, sizeof(a)); }
};

Matrix multiply(Matrix& A, Matrix& B, long long m) {
    Matrix C;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % m;
            }
        }
    }
    return C;
}

Matrix matPow(Matrix A, long long b, long long m) {
    Matrix result;
    result.a[0][0] = result.a[1][1] = 1;
    while (b > 0) {
        if (b & 1) result = multiply(result, A, m);
        A = multiply(A, A, m);
        b >>= 1;
    }
    return result;
}`,
    tags: ['快速幂', '矩阵快速幂'],
    difficulty: 'intermediate',
  },
  {
    id: 'mod-inv',
    name: '模逆元',
    category: 'number-theory',
    description: '求乘法逆元的多种方法',
    code: `const int MOD = 1e9 + 7;

// 方法1: 快速幂 (仅当MOD为质数时可用)
long long modInv(long long a, long long m) {
    return fastPow(a, m - 2, m);
}

// 方法2: 扩展欧几里得 (MOD与a互质即可)
long long modInvExgcd(long long a, long long m) {
    long long x, y;
    long long d = exgcd(a, m, x, y);
    if (d != 1) return -1; // 不存在逆元
    return (x % m + m) % m;
}

// 方法3: 线性求1到n的所有逆元
long long inv[100005];
void getAllInv(int n, long long m) {
    inv[1] = 1;
    for (int i = 2; i <= n; i++) {
        inv[i] = (m - m / i) * inv[m % i] % m;
    }
}`,
    tags: ['逆元', '模运算', '数论'],
    difficulty: 'intermediate',
  },

  // ========== 字符串 ==========
  {
    id: 'kmp',
    name: 'KMP字符串匹配',
    category: 'string',
    description: 'O(n+m)的字符串匹配算法',
    code: `// 计算next数组
void getNext(string& p, vector<int>& next) {
    int m = p.length();
    next.resize(m);
    next[0] = -1;
    int j = -1;
    for (int i = 1; i < m; i++) {
        while (j >= 0 && p[i] != p[j + 1]) j = next[j];
        if (p[i] == p[j + 1]) j++;
        next[i] = j;
    }
}

// KMP匹配，返回所有匹配位置
vector<int> kmp(string& s, string& p) {
    vector<int> next, result;
    getNext(p, next);
    
    int n = s.length(), m = p.length();
    int j = -1;
    for (int i = 0; i < n; i++) {
        while (j >= 0 && s[i] != p[j + 1]) j = next[j];
        if (s[i] == p[j + 1]) j++;
        if (j == m - 1) {
            result.push_back(i - m + 1);
            j = next[j];
        }
    }
    return result;
}`,
    tags: ['KMP', '字符串匹配'],
    difficulty: 'intermediate',
  },
  {
    id: 'string-hash',
    name: '字符串哈希',
    category: 'string',
    description: 'O(1)查询子串哈希值',
    code: `typedef unsigned long long ull;
const ull BASE = 131;
const ull MOD = 1e9 + 7;

ull power[MAXN], prefix[MAXN];
int n;
string s;

void init() {
    n = s.length();
    power[0] = 1;
    for (int i = 1; i <= n; i++) {
        power[i] = power[i - 1] * BASE;
    }
    prefix[0] = 0;
    for (int i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] * BASE + s[i - 1];
    }
}

ull getHash(int l, int r) { // 1-indexed, [l, r]
    return prefix[r] - prefix[l - 1] * power[r - l + 1];
}

bool equal(int l1, int r1, int l2, int r2) {
    return getHash(l1, r1) == getHash(l2, r2);
}`,
    tags: ['字符串哈希', '哈希'],
    difficulty: 'intermediate',
  },

  // ========== 计算几何 ==========
  {
    id: 'point-line',
    name: '点与线',
    category: 'geometry',
    description: '点线关系基础模板',
    code: `const double EPS = 1e-9;
const double PI = acos(-1.0);

int sign(double x) {
    if (fabs(x) < EPS) return 0;
    return x > 0 ? 1 : -1;
}

struct Point {
    double x, y;
    Point(double x = 0, double y = 0) : x(x), y(y) {}
    
    Point operator+(const Point& b) const { return Point(x + b.x, y + b.y); }
    Point operator-(const Point& b) const { return Point(x - b.x, y - b.y); }
    Point operator*(double t) const { return Point(x * t, y * t); }
    Point operator/(double t) const { return Point(x / t, y / t); }
    
    double dot(const Point& b) const { return x * b.x + y * b.y; }
    double cross(const Point& b) const { return x * b.y - y * b.x; }
    double length() const { return sqrt(x * x + y * y); }
    double angle() const { return atan2(y, x); }
    
    Point rotate(double angle) {
        double c = cos(angle), s = sin(angle);
        return Point(x * c - y * s, x * s + y * c);
    }
};

// 点到直线距离
double pointToLine(Point p, Point a, Point b) {
    return fabs((p - a).cross(b - a)) / (b - a).length();
}

// 两线段是否相交
bool segmentIntersect(Point a1, Point a2, Point b1, Point b2) {
    double c1 = (a2 - a1).cross(b1 - a1);
    double c2 = (a2 - a1).cross(b2 - a1);
    double c3 = (b2 - b1).cross(a1 - b1);
    double c4 = (b2 - b1).cross(a2 - b1);
    return sign(c1) * sign(c2) <= 0 && sign(c3) * sign(c4) <= 0;
}`,
    tags: ['计算几何', '点线关系'],
    difficulty: 'advanced',
  },

  // ========== 搜索算法 ==========
  {
    id: 'dfs-template',
    name: 'DFS模板',
    category: 'algorithm',
    description: '深度优先搜索通用模板',
    code: `// 标准DFS模板
bool visited[MAXN];
vector<int> adj[MAXN];

void dfs(int u) {
    visited[u] = true;
    // 处理当前节点
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

// 带回溯的DFS（排列、组合等）
int n;
vector<int> path;
bool used[MAXN];

void dfs(int depth) {
    if (depth == n) {
        // 处理完整方案
        return;
    }
    
    for (int i = 0; i < n; i++) {
        if (!used[i]) {
            used[i] = true;
            path.push_back(i);
            dfs(depth + 1);
            path.pop_back();
            used[i] = false;
        }
    }
}`,
    tags: ['DFS', '搜索', '回溯'],
    difficulty: 'beginner',
  },
  {
    id: 'bfs-template',
    name: 'BFS模板',
    category: 'algorithm',
    description: '广度优先搜索通用模板',
    code: `// 标准BFS模板
bool visited[MAXN];
vector<int> adj[MAXN];
int dist[MAXN];

void bfs(int start) {
    memset(visited, false, sizeof(visited));
    memset(dist, -1, sizeof(dist));
    
    queue<int> q;
    q.push(start);
    visited[start] = true;
    dist[start] = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}

// 二维网格BFS
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

void bfs2D(int sx, int sy, int n, int m) {
    vector<vector<bool>> visited(n, vector<bool>(m, false));
    vector<vector<int>> dist(n, vector<int>(m, -1));
    
    queue<pair<int, int>> q;
    q.push({sx, sy});
    visited[sx][sy] = true;
    dist[sx][sy] = 0;
    
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx][ny]) {
                visited[nx][ny] = true;
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
}`,
    tags: ['BFS', '搜索', '最短路'],
    difficulty: 'beginner',
  },
  {
    id: 'binary-search',
    name: '二分查找',
    category: 'algorithm',
    description: '整数和浮点数二分模板',
    code: `// 整数二分 - 找第一个>=x的位置
int lowerBound(vector<int>& a, int x) {
    int l = 0, r = a.size();
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (a[mid] < x) l = mid + 1;
        else r = mid;
    }
    return l;
}

// 整数二分 - 找第一个>x的位置
int upperBound(vector<int>& a, int x) {
    int l = 0, r = a.size();
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (a[mid] <= x) l = mid + 1;
        else r = mid;
    }
    return l;
}

// 浮点数二分
double binarySearchDouble(double l, double r, double eps, function<bool(double)> check) {
    while (r - l > eps) {
        double mid = (l + r) / 2;
        if (check(mid)) r = mid;
        else l = mid;
    }
    return (l + r) / 2;
}

// 二分答案模板
bool check(long long mid) {
    // 检查mid是否满足条件
    return true;
}

long long binarySearchAnswer(long long l, long long r) {
    while (l < r) {
        long long mid = l + (r - l) / 2;
        if (check(mid)) r = mid;
        else l = mid + 1;
    }
    return l;
}`,
    tags: ['二分查找', '二分答案'],
    difficulty: 'beginner',
  },
];

// 按分类获取模板
export function getTemplatesByCategory(categoryId: string): CodeTemplate[] {
  return codeTemplates.filter(t => t.category === categoryId);
}

// 搜索模板
export function searchTemplates(keyword: string): CodeTemplate[] {
  const lower = keyword.toLowerCase();
  return codeTemplates.filter(t => 
    t.name.toLowerCase().includes(lower) ||
    t.description.toLowerCase().includes(lower) ||
    t.tags.some(tag => tag.toLowerCase().includes(lower))
  );
}

// 获取所有模板
export function getAllTemplates(): CodeTemplate[] {
  return codeTemplates;
}

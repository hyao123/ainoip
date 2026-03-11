/**
 * NOIP 常用代码片段
 * 用于代码编辑器的智能补全
 */

export interface CodeSnippet {
  label: string;
  kind: 'function' | 'snippet' | 'keyword' | 'constant';
  insertText: string;
  documentation: string;
  detail?: string;
}

// C++ 标准库头文件
export const cppHeaders: CodeSnippet[] = [
  {
    label: '#include <iostream>',
    kind: 'snippet',
    insertText: '#include <iostream>',
    documentation: '输入输出流库，包含 cin, cout',
    detail: '常用头文件',
  },
  {
    label: '#include <cstdio>',
    kind: 'snippet',
    insertText: '#include <cstdio>',
    documentation: 'C标准输入输出，包含 scanf, printf',
    detail: '常用头文件',
  },
  {
    label: '#include <algorithm>',
    kind: 'snippet',
    insertText: '#include <algorithm>',
    documentation: '算法库，包含 sort, lower_bound, upper_bound 等',
    detail: '常用头文件',
  },
  {
    label: '#include <vector>',
    kind: 'snippet',
    insertText: '#include <vector>',
    documentation: '动态数组容器',
    detail: '常用头文件',
  },
  {
    label: '#include <string>',
    kind: 'snippet',
    insertText: '#include <string>',
    documentation: '字符串类',
    detail: '常用头文件',
  },
  {
    label: '#include <cmath>',
    kind: 'snippet',
    insertText: '#include <cmath>',
    documentation: '数学函数库，包含 sqrt, pow, abs 等',
    detail: '常用头文件',
  },
  {
    label: '#include <queue>',
    kind: 'snippet',
    insertText: '#include <queue>',
    documentation: '队列容器，包含 queue, priority_queue',
    detail: '常用头文件',
  },
  {
    label: '#include <stack>',
    kind: 'snippet',
    insertText: '#include <stack>',
    documentation: '栈容器',
    detail: '常用头文件',
  },
  {
    label: '#include <map>',
    kind: 'snippet',
    insertText: '#include <map>',
    documentation: '映射容器（红黑树）',
    detail: '常用头文件',
  },
  {
    label: '#include <set>',
    kind: 'snippet',
    insertText: '#include <set>',
    documentation: '集合容器（红黑树）',
    detail: '常用头文件',
  },
  {
    label: '#include <unordered_map>',
    kind: 'snippet',
    insertText: '#include <unordered_map>',
    documentation: '哈希映射容器',
    detail: '常用头文件',
  },
  {
    label: '#include <cstring>',
    kind: 'snippet',
    insertText: '#include <cstring>',
    documentation: 'C字符串操作，包含 memset, memcpy, strlen 等',
    detail: '常用头文件',
  },
  {
    label: '#include <bitset>',
    kind: 'snippet',
    insertText: '#include <bitset>',
    documentation: '位集合容器',
    detail: '常用头文件',
  },
];

// C++ 常用宏定义
export const cppMacros: CodeSnippet[] = [
  {
    label: '#define int long long',
    kind: 'snippet',
    insertText: '#define int long long',
    documentation: '将 int 定义为 long long，防止溢出',
    detail: '防溢出',
  },
  {
    label: '#define pb push_back',
    kind: 'snippet',
    insertText: '#define pb push_back',
    documentation: 'push_back 简写',
    detail: '简写宏',
  },
  {
    label: '#define mp make_pair',
    kind: 'snippet',
    insertText: '#define mp make_pair',
    documentation: 'make_pair 简写',
    detail: '简写宏',
  },
  {
    label: '#define all(x)',
    kind: 'snippet',
    insertText: '#define all(x) x.begin(), x.end()',
    documentation: '获取容器首尾迭代器',
    detail: '简写宏',
  },
];

// C++ 快速IO
export const cppFastIO: CodeSnippet[] = [
  {
    label: 'fastio',
    kind: 'snippet',
    insertText: 'ios::sync_with_stdio(false);\ncin.tie(0);\ncout.tie(0);',
    documentation: '快速输入输出，提高 cin/cout 效率',
    detail: '快速IO',
  },
  {
    label: 'freopen',
    kind: 'snippet',
    insertText: 'freopen("${1:filename}.in", "r", stdin);\nfreopen("${1:filename}.out", "w", stdout);',
    documentation: 'NOIP 标准文件读写',
    detail: 'NOIP文件读写',
  },
];

// C++ 常用算法
export const cppAlgorithms: CodeSnippet[] = [
  {
    label: 'sort',
    kind: 'function',
    insertText: 'sort(${1:begin}, ${2:end});',
    documentation: '排序算法，默认升序',
    detail: 'O(n log n)',
  },
  {
    label: 'sort_custom',
    kind: 'snippet',
    insertText: 'sort(${1:arr}.begin(), ${1:arr}.end(), [](const auto& a, const auto& b) {\n    return ${2:a < b};\n});',
    documentation: '自定义比较器的排序',
    detail: '自定义排序',
  },
  {
    label: 'lower_bound',
    kind: 'function',
    insertText: 'lower_bound(${1:begin}, ${2:end}, ${3:value})',
    documentation: '二分查找第一个 >= value 的位置',
    detail: '二分查找',
  },
  {
    label: 'upper_bound',
    kind: 'function',
    insertText: 'upper_bound(${1:begin}, ${2:end}, ${3:value})',
    documentation: '二分查找第一个 > value 的位置',
    detail: '二分查找',
  },
  {
    label: 'binary_search',
    kind: 'function',
    insertText: 'binary_search(${1:begin}, ${2:end}, ${3:value})',
    documentation: '二分查找是否存在 value',
    detail: '二分查找',
  },
  {
    label: 'reverse',
    kind: 'function',
    insertText: 'reverse(${1:begin}, ${2:end});',
    documentation: '反转区间元素',
    detail: 'O(n)',
  },
  {
    label: 'swap',
    kind: 'function',
    insertText: 'swap(${1:a}, ${2:b});',
    documentation: '交换两个变量',
    detail: 'O(1)',
  },
  {
    label: 'max',
    kind: 'function',
    insertText: 'max(${1:a}, ${2:b})',
    documentation: '返回较大值',
    detail: 'O(1)',
  },
  {
    label: 'min',
    kind: 'function',
    insertText: 'min(${1:a}, ${2:b})',
    documentation: '返回较小值',
    detail: 'O(1)',
  },
  {
    label: 'max_element',
    kind: 'function',
    insertText: 'max_element(${1:begin}, ${2:end})',
    documentation: '返回区间最大值的迭代器',
    detail: 'O(n)',
  },
  {
    label: 'min_element',
    kind: 'function',
    insertText: 'min_element(${1:begin}, ${2:end})',
    documentation: '返回区间最小值的迭代器',
    detail: 'O(n)',
  },
  {
    label: 'unique',
    kind: 'function',
    insertText: 'unique(${1:begin}, ${2:end})',
    documentation: '去除相邻重复元素，返回末尾迭代器',
    detail: 'O(n)',
  },
  {
    label: 'next_permutation',
    kind: 'function',
    insertText: 'next_permutation(${1:begin}, ${2:end})',
    documentation: '生成下一个排列',
    detail: '全排列',
  },
  {
    label: 'gcd',
    kind: 'function',
    insertText: '__gcd(${1:a}, ${2:b})',
    documentation: '最大公约数（GCC内置）',
    detail: '数论',
  },
  {
    label: 'lcm',
    kind: 'function',
    insertText: '${1:a} / __gcd(${1:a}, ${2:b}) * ${2:b}',
    documentation: '最小公倍数',
    detail: '数论',
  },
];

// C++ 数据结构
export const cppDataStructures: CodeSnippet[] = [
  {
    label: 'vector_int',
    kind: 'snippet',
    insertText: 'vector<int> ${1:name}(${2:size});',
    documentation: '定义 int 动态数组',
    detail: '动态数组',
  },
  {
    label: 'vector_2d',
    kind: 'snippet',
    insertText: 'vector<vector<int>> ${1:name}(${2:rows}, vector<int>(${3:cols}));',
    documentation: '定义二维动态数组',
    detail: '二维数组',
  },
  {
    label: 'pair',
    kind: 'snippet',
    insertText: 'pair<${1:int}, ${2:int}> ${3:p};',
    documentation: '定义二元组',
    detail: 'pair',
  },
  {
    label: 'priority_queue',
    kind: 'snippet',
    insertText: 'priority_queue<${1:int}> ${2:pq};',
    documentation: '大根堆（默认）',
    detail: '优先队列',
  },
  {
    label: 'priority_queue_min',
    kind: 'snippet',
    insertText: 'priority_queue<${1:int}, vector<${1:int}>, greater<${1:int}>> ${2:pq};',
    documentation: '小根堆',
    detail: '小根堆',
  },
  {
    label: 'queue',
    kind: 'snippet',
    insertText: 'queue<${1:int}> ${2:q};',
    documentation: '队列',
    detail: '队列',
  },
  {
    label: 'stack',
    kind: 'snippet',
    insertText: 'stack<${1:int}> ${2:st};',
    documentation: '栈',
    detail: '栈',
  },
  {
    label: 'set',
    kind: 'snippet',
    insertText: 'set<${1:int}> ${2:s};',
    documentation: '有序集合（红黑树）',
    detail: '集合',
  },
  {
    label: 'unordered_set',
    kind: 'snippet',
    insertText: 'unordered_set<${1:int}> ${2:s};',
    documentation: '无序集合（哈希表）',
    detail: '哈希集合',
  },
  {
    label: 'map',
    kind: 'snippet',
    insertText: 'map<${1:int}, ${2:int}> ${3:m};',
    documentation: '有序映射（红黑树）',
    detail: '映射',
  },
  {
    label: 'unordered_map',
    kind: 'snippet',
    insertText: 'unordered_map<${1:int}, ${2:int}> ${3:m};',
    documentation: '无序映射（哈希表）',
    detail: '哈希映射',
  },
  {
    label: 'deque',
    kind: 'snippet',
    insertText: 'deque<${1:int}> ${2:dq};',
    documentation: '双端队列',
    detail: '双端队列',
  },
  {
    label: 'bitset',
    kind: 'snippet',
    insertText: 'bitset<${1:N}> ${2:bs};',
    documentation: '位集合',
    detail: '位运算',
  },
];

// C++ 数学相关
export const cppMath: CodeSnippet[] = [
  {
    label: 'pow',
    kind: 'function',
    insertText: 'pow(${1:base}, ${2:exp})',
    documentation: '幂运算，返回 double',
    detail: '数学函数',
  },
  {
    label: 'sqrt',
    kind: 'function',
    insertText: 'sqrt(${1:x})',
    documentation: '平方根',
    detail: '数学函数',
  },
  {
    label: 'abs',
    kind: 'function',
    insertText: 'abs(${1:x})',
    documentation: '绝对值',
    detail: '数学函数',
  },
  {
    label: 'floor',
    kind: 'function',
    insertText: 'floor(${1:x})',
    documentation: '向下取整',
    detail: '数学函数',
  },
  {
    label: 'ceil',
    kind: 'function',
    insertText: 'ceil(${1:x})',
    documentation: '向上取整',
    detail: '数学函数',
  },
  {
    label: 'round',
    kind: 'function',
    insertText: 'round(${1:x})',
    documentation: '四舍五入',
    detail: '数学函数',
  },
  {
    label: 'mod_pow',
    kind: 'snippet',
    insertText: 'long long mod_pow(long long base, long long exp, long long mod) {\n    long long result = 1;\n    base %= mod;\n    while (exp > 0) {\n        if (exp & 1) result = result * base % mod;\n        base = base * base % mod;\n        exp >>= 1;\n    }\n    return result;\n}',
    documentation: '快速幂（带模）',
    detail: 'O(log n)',
  },
];

// C++ 字符串相关
export const cppString: CodeSnippet[] = [
  {
    label: 'to_string',
    kind: 'function',
    insertText: 'to_string(${1:value})',
    documentation: '将数字转为字符串',
    detail: '类型转换',
  },
  {
    label: 'stoi',
    kind: 'function',
    insertText: 'stoi(${1:str})',
    documentation: '将字符串转为 int',
    detail: '类型转换',
  },
  {
    label: 'stoll',
    kind: 'function',
    insertText: 'stoll(${1:str})',
    documentation: '将字符串转为 long long',
    detail: '类型转换',
  },
  {
    label: 'strlen',
    kind: 'function',
    insertText: 'strlen(${1:str})',
    documentation: 'C字符串长度',
    detail: '字符串',
  },
  {
    label: 'strcpy',
    kind: 'function',
    insertText: 'strcpy(${1:dest}, ${2:src});',
    documentation: '复制C字符串',
    detail: '字符串',
  },
  {
    label: 'strcmp',
    kind: 'function',
    insertText: 'strcmp(${1:s1}, ${2:s2})',
    documentation: '比较C字符串',
    detail: '字符串',
  },
  {
    label: 'memset',
    kind: 'function',
    insertText: 'memset(${1:ptr}, ${2:value}, ${3:size});',
    documentation: '设置内存（常用于数组清零）',
    detail: '内存操作',
  },
];

// C++ 主函数模板
export const cppMainTemplates: CodeSnippet[] = [
  {
    label: 'main_simple',
    kind: 'snippet',
    insertText: 'int main() {\n    ${1:// code}\n    return 0;\n}',
    documentation: '简单主函数',
    detail: '主函数模板',
  },
  {
    label: 'main_fastio',
    kind: 'snippet',
    insertText: 'int main() {\n    ios::sync_with_stdio(false);\n    cin.tie(0);\n    \n    ${1:// code}\n    \n    return 0;\n}',
    documentation: '带快速IO的主函数',
    detail: '快速IO模板',
  },
  {
    label: 'main_noip',
    kind: 'snippet',
    insertText: 'int main() {\n    freopen("${1:filename}.in", "r", stdin);\n    freopen("${1:filename}.out", "w", stdout);\n    \n    ${2:// code}\n    \n    fclose(stdin);\n    fclose(stdout);\n    return 0;\n}',
    documentation: 'NOIP标准模板（文件读写）',
    detail: 'NOIP模板',
  },
];

// C++ 常用循环
export const cppLoops: CodeSnippet[] = [
  {
    label: 'for_i',
    kind: 'snippet',
    insertText: 'for (int i = 0; i < ${1:n}; i++) {\n    ${2:// code}\n}',
    documentation: '标准for循环',
    detail: '循环模板',
  },
  {
    label: 'for_range',
    kind: 'snippet',
    insertText: 'for (const auto& ${1:item} : ${2:container}) {\n    ${3:// code}\n}',
    documentation: '范围for循环',
    detail: 'C++11范围循环',
  },
  {
    label: 'while_input',
    kind: 'snippet',
    insertText: 'while (cin >> ${1:var}) {\n    ${2:// code}\n}',
    documentation: '持续读取输入直到EOF',
    detail: 'EOF输入',
  },
  {
    label: 'while_scanf',
    kind: 'snippet',
    insertText: 'while (scanf("${1:%d}", &${2:var}) != EOF) {\n    ${3:// code}\n}',
    documentation: '使用scanf读取输入直到EOF',
    detail: 'EOF输入',
  },
];

// 常用算法模板
export const cppAlgorithmTemplates: CodeSnippet[] = [
  {
    label: 'bfs',
    kind: 'snippet',
    insertText: 'void bfs(int start) {\n    queue<int> q;\n    q.push(start);\n    visited[start] = true;\n    \n    while (!q.empty()) {\n        int cur = q.front();\n        q.pop();\n        \n        for (int next : adj[cur]) {\n            if (!visited[next]) {\n                visited[next] = true;\n                q.push(next);\n            }\n        }\n    }\n}',
    documentation: '广度优先搜索',
    detail: 'BFS模板',
  },
  {
    label: 'dfs',
    kind: 'snippet',
    insertText: 'void dfs(int cur) {\n    visited[cur] = true;\n    \n    for (int next : adj[cur]) {\n        if (!visited[next]) {\n            dfs(next);\n        }\n    }\n}',
    documentation: '深度优先搜索',
    detail: 'DFS模板',
  },
  {
    label: 'binary_search_template',
    kind: 'snippet',
    insertText: 'int binary_search(int left, int right, int target) {\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) {\n            return mid;\n        } else if (arr[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return -1; // 未找到\n}',
    documentation: '二分查找模板',
    detail: 'O(log n)',
  },
  {
    label: 'dp_knapsack',
    kind: 'snippet',
    insertText: '// 01背包问题\nint dp[MAX_W + 1] = {0};\nfor (int i = 0; i < n; i++) {\n    for (int j = W; j >= w[i]; j--) {\n        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);\n    }\n}',
    documentation: '01背包DP',
    detail: 'DP模板',
  },
  {
    label: 'dp_lis',
    kind: 'snippet',
    insertText: '// 最长递增子序列 O(n log n)\nvector<int> lis;\nfor (int i = 0; i < n; i++) {\n    auto it = lower_bound(lis.begin(), lis.end(), arr[i]);\n    if (it == lis.end()) {\n        lis.push_back(arr[i]);\n    } else {\n        *it = arr[i];\n    }\n}\nint length = lis.size();',
    documentation: '最长递增子序列',
    detail: 'DP模板',
  },
  {
    label: 'disjoint_set',
    kind: 'snippet',
    insertText: 'class DisjointSet {\nprivate:\n    vector<int> parent, rank;\npublic:\n    DisjointSet(int n) : parent(n), rank(n, 0) {\n        for (int i = 0; i < n; i++) parent[i] = i;\n    }\n    \n    int find(int x) {\n        return parent[x] == x ? x : parent[x] = find(parent[x]);\n    }\n    \n    bool unite(int x, int y) {\n        x = find(x), y = find(y);\n        if (x == y) return false;\n        if (rank[x] < rank[y]) swap(x, y);\n        parent[y] = x;\n        if (rank[x] == rank[y]) rank[x]++;\n        return true;\n    }\n    \n    bool same(int x, int y) {\n        return find(x) == find(y);\n    }\n};',
    documentation: '并查集（带路径压缩和按秩合并）',
    detail: '数据结构',
  },
];

// Python 常用片段
export const pythonSnippets: CodeSnippet[] = [
  {
    label: 'input_int',
    kind: 'snippet',
    insertText: 'n = int(input())',
    documentation: '读取一个整数',
    detail: '输入',
  },
  {
    label: 'input_list',
    kind: 'snippet',
    insertText: 'arr = list(map(int, input().split()))',
    documentation: '读取一行整数列表',
    detail: '输入',
  },
  {
    label: 'input_multiple_lines',
    kind: 'snippet',
    insertText: 'while True:\n    try:\n        line = input()\n        ${1:# 处理每行}\n    except EOFError:\n        break',
    documentation: '读取多行输入直到EOF',
    detail: '输入',
  },
  {
    label: 'range_loop',
    kind: 'snippet',
    insertText: 'for i in range(${1:n}):\n    ${2:# code}',
    documentation: '范围循环',
    detail: '循环',
  },
  {
    label: 'enumerate_loop',
    kind: 'snippet',
    insertText: 'for i, val in enumerate(${1:arr}):\n    ${2:# code}',
    documentation: '带索引的遍历',
    detail: '循环',
  },
  {
    label: 'list_comprehension',
    kind: 'snippet',
    insertText: '[${1:expression} for ${2:x} in ${3:iterable}]',
    documentation: '列表推导式',
    detail: '列表',
  },
  {
    label: 'dict',
    kind: 'snippet',
    insertText: 'd = {}',
    documentation: '创建空字典',
    detail: '字典',
  },
  {
    label: 'defaultdict',
    kind: 'snippet',
    insertText: 'from collections import defaultdict\nd = defaultdict(${1:int})',
    documentation: '带默认值的字典',
    detail: '字典',
  },
  {
    label: 'sort_list',
    kind: 'snippet',
    insertText: '${1:arr}.sort()',
    documentation: '原位排序',
    detail: '排序',
  },
  {
    label: 'sorted_list',
    kind: 'snippet',
    insertText: 'sorted(${1:arr})',
    documentation: '返回排序后的新列表',
    detail: '排序',
  },
  {
    label: 'sort_key',
    kind: 'snippet',
    insertText: '${1:arr}.sort(key=lambda x: ${2:x[0]})',
    documentation: '自定义键排序',
    detail: '排序',
  },
  {
    label: 'binary_search',
    kind: 'snippet',
    insertText: 'import bisect\nindex = bisect.bisect_left(${1:arr}, ${2:target})',
    documentation: '二分查找',
    detail: '查找',
  },
  {
    label: 'heapq',
    kind: 'snippet',
    insertText: 'import heapq\nheap = []\nheapq.heappush(heap, ${1:item})\nval = heapq.heappop(heap)',
    documentation: '堆操作',
    detail: '堆',
  },
  {
    label: 'deque',
    kind: 'snippet',
    insertText: 'from collections import deque\ndq = deque()\ndq.append(${1:item})\ndq.popleft()',
    documentation: '双端队列',
    detail: '队列',
  },
  {
    label: 'gcd_lcm',
    kind: 'snippet',
    insertText: 'from math import gcd\ng = gcd(${1:a}, ${2:b})\nl = ${1:a} // g * ${2:b}',
    documentation: '最大公约数和最小公倍数',
    detail: '数学',
  },
  {
    label: 'main_block',
    kind: 'snippet',
    insertText: 'if __name__ == "__main__":\n    ${1:# main code}',
    documentation: '主程序入口',
    detail: '模板',
  },
];

// Java 常用片段
export const javaSnippets: CodeSnippet[] = [
  {
    label: 'main',
    kind: 'snippet',
    insertText: 'public static void main(String[] args) {\n    ${1:// code}\n}',
    documentation: '主函数',
    detail: '模板',
  },
  {
    label: 'scanner',
    kind: 'snippet',
    insertText: 'Scanner sc = new Scanner(System.in);\nint n = sc.nextInt();\nlong m = sc.nextLong();\nString s = sc.next();',
    documentation: 'Scanner输入',
    detail: '输入',
  },
  {
    label: 'bufferedReader',
    kind: 'snippet',
    insertText: 'BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nString line = br.readLine();\nint n = Integer.parseInt(line);',
    documentation: 'BufferedReader快速输入',
    detail: '快速输入',
  },
  {
    label: 'array_int',
    kind: 'snippet',
    insertText: 'int[] ${1:arr} = new int[${2:n}];',
    documentation: '定义整数数组',
    detail: '数组',
  },
  {
    label: 'array_2d',
    kind: 'snippet',
    insertText: 'int[][] ${1:arr} = new int[${2:rows}][${3:cols}];',
    documentation: '定义二维数组',
    detail: '数组',
  },
  {
    label: 'arraylist',
    kind: 'snippet',
    insertText: 'ArrayList<${1:Integer}> ${2:list} = new ArrayList<>();',
    documentation: '动态数组',
    detail: '集合',
  },
  {
    label: 'hashmap',
    kind: 'snippet',
    insertText: 'HashMap<${1:Integer}, ${2:Integer}> ${3:map} = new HashMap<>();',
    documentation: '哈希映射',
    detail: '集合',
  },
  {
    label: 'hashset',
    kind: 'snippet',
    insertText: 'HashSet<${1:Integer}> ${2:set} = new HashSet<>();',
    documentation: '哈希集合',
    detail: '集合',
  },
  {
    label: 'priorityqueue',
    kind: 'snippet',
    insertText: 'PriorityQueue<${1:Integer}> ${2:pq} = new PriorityQueue<>();',
    documentation: '优先队列（小根堆）',
    detail: '集合',
  },
  {
    label: 'priorityqueue_max',
    kind: 'snippet',
    insertText: 'PriorityQueue<${1:Integer}> ${2:pq} = new PriorityQueue<>(Collections.reverseOrder());',
    documentation: '优先队列（大根堆）',
    detail: '集合',
  },
  {
    label: 'arrays_sort',
    kind: 'snippet',
    insertText: 'Arrays.sort(${1:arr});',
    documentation: '数组排序',
    detail: '排序',
  },
  {
    label: 'collections_sort',
    kind: 'snippet',
    insertText: 'Collections.sort(${1:list});',
    documentation: '集合排序',
    detail: '排序',
  },
  {
    label: 'math_max',
    kind: 'snippet',
    insertText: 'Math.max(${1:a}, ${2:b})',
    documentation: '最大值',
    detail: '数学',
  },
  {
    label: 'math_min',
    kind: 'snippet',
    insertText: 'Math.min(${1:a}, ${2:b})',
    documentation: '最小值',
    detail: '数学',
  },
  {
    label: 'math_pow',
    kind: 'snippet',
    insertText: 'Math.pow(${1:base}, ${2:exp})',
    documentation: '幂运算',
    detail: '数学',
  },
  {
    label: 'stringbuilder',
    kind: 'snippet',
    insertText: 'StringBuilder sb = new StringBuilder();\nsb.append(${1:str});\nSystem.out.println(sb.toString());',
    documentation: '快速字符串拼接',
    detail: '字符串',
  },
  {
    label: 'string_to_int',
    kind: 'snippet',
    insertText: 'Integer.parseInt(${1:str})',
    documentation: '字符串转整数',
    detail: '类型转换',
  },
  {
    label: 'int_to_string',
    kind: 'snippet',
    insertText: 'String.valueOf(${1:num})',
    documentation: '整数转字符串',
    detail: '类型转换',
  },
  {
    label: 'System_out_println',
    kind: 'snippet',
    insertText: 'System.out.println(${1:content});',
    documentation: '输出换行',
    detail: '输出',
  },
  {
    label: 'System_out_print',
    kind: 'snippet',
    insertText: 'System.out.print(${1:content});',
    documentation: '输出不换行',
    detail: '输出',
  },
];

// 导出所有片段，按语言分类
export const allSnippets = {
  cpp: [
    ...cppHeaders,
    ...cppMacros,
    ...cppFastIO,
    ...cppAlgorithms,
    ...cppDataStructures,
    ...cppMath,
    ...cppString,
    ...cppMainTemplates,
    ...cppLoops,
    ...cppAlgorithmTemplates,
  ],
  python: pythonSnippets,
  java: javaSnippets,
};

// 获取指定语言的片段
export function getSnippetsForLanguage(language: string): CodeSnippet[] {
  const lang = language.toLowerCase();
  if (lang === 'cpp' || lang === 'c++') {
    return allSnippets.cpp;
  }
  if (lang === 'python' || lang === 'py') {
    return allSnippets.python;
  }
  if (lang === 'java') {
    return allSnippets.java;
  }
  return [];
}

// 常见错误库 - 帮助学生避免典型错误

export interface CommonMistake {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wrongCode: string;
  correctCode: string;
  explanation: string;
  kidFriendly: string; // 小朋友能理解的解释
  howToFind: string; // 如何发现这个错误
  prevention: string; // 如何预防
  relatedTopics: string[];
  frequency: number; // 出现频率 1-5
}

export interface MistakeCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const mistakeCategories: MistakeCategory[] = [
  { id: 'syntax', name: '语法错误', icon: '⚠️', description: '代码语法问题导致的编译错误' },
  { id: 'logic', name: '逻辑错误', icon: '🧠', description: '代码能运行但结果不对' },
  { id: 'overflow', name: '溢出错误', icon: '📈', description: '数据超出类型范围' },
  { id: 'boundary', name: '边界错误', icon: '🔲', description: '边界条件处理不当' },
  { id: 'algorithm', name: '算法错误', icon: '⚙️', description: '算法实现或选择错误' },
  { id: 'efficiency', name: '效率问题', icon: '⏱️', description: '代码效率低下导致超时' },
];

export const commonMistakes: CommonMistake[] = [
  // ========== 语法错误 ==========
  {
    id: 'syntax-semicolon',
    title: '忘记加分号',
    category: 'syntax',
    difficulty: 'beginner',
    wrongCode: `int a = 10
cout << a << endl`,
    correctCode: `int a = 10;
cout << a << endl;`,
    explanation: 'C++中每条语句必须以分号结尾，就像每句话要加句号一样。',
    kidFriendly: '就像写作文每句话结束要加句号，写代码每句话结束也要加分号！',
    howToFind: '编译器会提示"expected ;"之类的错误，告诉你哪里少了分号。',
    prevention: '写完一行代码就检查是否加了分号，养成好习惯！',
    relatedTopics: ['基础语法', '变量'],
    frequency: 5,
  },
  {
    id: 'syntax-equal',
    title: '混淆 = 和 ==',
    category: 'syntax',
    difficulty: 'beginner',
    wrongCode: `if (a = 5) {  // 错误：这是赋值！
    cout << "a等于5" << endl;
}`,
    correctCode: `if (a == 5) {  // 正确：这是比较！
    cout << "a等于5" << endl;
}`,
    explanation: '单个=是赋值，两个==是比较相等。在if条件里通常要用==。',
    kidFriendly: '一个等号是"给它一个新值"（赋值），两个等号是"问它是不是等于这个值"（比较）。',
    howToFind: '如果if里面用了=，编译器可能会警告，但不会报错。注意检查！',
    prevention: '记住口诀：一个等号是"变"，两个等号是"问"。',
    relatedTopics: ['条件语句', '运算符'],
    frequency: 5,
  },
  {
    id: 'syntax-array-size',
    title: '数组大小用变量',
    category: 'syntax',
    difficulty: 'beginner',
    wrongCode: `int n;
cin >> n;
int arr[n];  // 错误：数组大小必须是常量！`,
    correctCode: `int n;
cin >> n;
const int MAXN = 100005;
int arr[MAXN];  // 正确：用足够大的常量`,
    explanation: 'C++中数组大小必须是编译时常量，不能用变量。应该开一个足够大的数组。',
    kidFriendly: '数组就像一排座位，必须在盖房子前定好有多少座位，不能等客人来了再决定。',
    howToFind: '编译错误，提示数组大小不是常量表达式。',
    prevention: '养成使用const定义数组大小的习惯，比如 const int MAXN = 100005;',
    relatedTopics: ['数组', '变量'],
    frequency: 4,
  },

  // ========== 溢出错误 ==========
  {
    id: 'overflow-int-multiply',
    title: 'int乘法溢出',
    category: 'overflow',
    difficulty: 'intermediate',
    wrongCode: `int a = 100000, b = 100000;
int c = a * b;  // 错误：溢出了！
cout << c << endl;  // 输出错误结果`,
    correctCode: `int a = 100000, b = 100000;
long long c = (long long)a * b;  // 正确：先转long long
cout << c << endl;  // 输出 10000000000`,
    explanation: 'int范围约21亿，两个10万的数相乘超过21亿就会溢出。需要用long long。',
    kidFriendly: '就像杯子的容量有限，倒太多水会溢出来。int杯子只能装21亿以内的数。',
    howToFind: '看到结果变成负数或者很奇怪的数，可能是溢出了。',
    prevention: '看到两个数相乘，先想想结果会不会超过21亿。如果可能，就用long long！',
    relatedTopics: ['数据类型', '变量'],
    frequency: 5,
  },
  {
    id: 'overflow-int-sum',
    title: '循环累加溢出',
    category: 'overflow',
    difficulty: 'intermediate',
    wrongCode: `int sum = 0;
for (int i = 1; i <= n; i++) {
    sum += i;  // 如果n很大，sum会溢出
}`,
    correctCode: `long long sum = 0;  // 用long long
for (int i = 1; i <= n; i++) {
    sum += i;
}`,
    explanation: '累加很多数时，和可能超过int范围。要用long long存储。',
    kidFriendly: '就像存钱罐，一直往里存钱，总有一天会装不下。用更大的容器（long long）就好了。',
    howToFind: '计算结果为负数或者突然变小，可能是溢出。',
    prevention: '看到数据范围>10^9，或者累加、累乘操作，优先考虑long long。',
    relatedTopics: ['循环', '数据类型'],
    frequency: 4,
  },
  {
    id: 'overflow-lcm',
    title: 'LCM计算溢出',
    category: 'overflow',
    difficulty: 'intermediate',
    wrongCode: `long long lcm = a * b / gcd(a, b);  // 错误：a*b可能溢出！`,
    correctCode: `long long lcm = a / gcd(a, b) * b;  // 正确：先除后乘`,
    explanation: '虽然用了long long，但a*b可能先溢出了，再除也救不回来。要先除后乘！',
    kidFriendly: '计算最小公倍数时，先让a"瘦身"（除以GCD），再和b相乘，这样就不会太大了。',
    howToFind: '大数测试时结果错误，可能是中间计算溢出。',
    prevention: '涉及乘除法时，考虑先除后乘避免溢出。',
    relatedTopics: ['数论', 'GCD/LCM'],
    frequency: 3,
  },

  // ========== 边界错误 ==========
  {
    id: 'boundary-array-index',
    title: '数组越界',
    category: 'boundary',
    difficulty: 'beginner',
    wrongCode: `int arr[5];
for (int i = 0; i <= 5; i++) {  // 错误：i=5时越界！
    arr[i] = i;
}`,
    correctCode: `int arr[5];
for (int i = 0; i < 5; i++) {  // 正确：i从0到4
    arr[i] = i;
}`,
    explanation: '数组arr[5]的下标是0到4，访问arr[5]会越界，可能导致程序崩溃。',
    kidFriendly: '5个座位的座位号是0到4，不是1到5，也不是0到5。座位号5是不存在的！',
    howToFind: '程序崩溃或者结果异常。有时编译器会警告。',
    prevention: '记住：数组大小为n，下标范围是0到n-1。',
    relatedTopics: ['数组', '循环'],
    frequency: 4,
  },
  {
    id: 'boundary-loop',
    title: '循环边界错误',
    category: 'boundary',
    difficulty: 'beginner',
    wrongCode: `// 计算1+2+...+n
int sum = 0;
for (int i = 1; i < n; i++) {  // 错误：少加了n
    sum += i;
}`,
    correctCode: `// 计算1+2+...+n
int sum = 0;
for (int i = 1; i <= n; i++) {  // 正确：包含n
    sum += i;
}`,
    explanation: 'for循环的条件要仔细看题目要求。i < n 和 i <= n 差一个数！',
    kidFriendly: '数数的时候，要注意是"数到n为止"还是"数到n前面那个数为止"。',
    howToFind: '手算几个例子，和程序结果对比。',
    prevention: '写循环前，在纸上写出循环变量的所有取值。',
    relatedTopics: ['循环', '边界条件'],
    frequency: 4,
  },
  {
    id: 'boundary-binary-search',
    title: '二分查找死循环',
    category: 'boundary',
    difficulty: 'intermediate',
    wrongCode: `int l = 0, r = n - 1;
while (l < r) {
    int mid = (l + r) / 2;
    if (a[mid] < x) l = mid;  // 错误：可能死循环！
    else r = mid;
}`,
    correctCode: `int l = 0, r = n - 1;
while (l < r) {
    int mid = (l + r) / 2;
    if (a[mid] < x) l = mid + 1;  // 正确：l要前进
    else r = mid;
}`,
    explanation: '二分查找时，如果l = mid，当l和r相邻时可能死循环。l应该前进到mid+1。',
    kidFriendly: '猜数字游戏，如果告诉你"答案比5大"，你应该从6开始猜，不是再猜一次5。',
    howToFind: '程序卡住不动，可能是死循环了。',
    prevention: '记住二分模板，l的更新用mid+1，r的更新用mid。',
    relatedTopics: ['二分查找', '搜索'],
    frequency: 4,
  },

  // ========== 逻辑错误 ==========
  {
    id: 'logic-swap',
    title: '交换变量顺序错误',
    category: 'logic',
    difficulty: 'beginner',
    wrongCode: `// 交换a和b
a = b;
b = a;  // 错误：此时a已经被覆盖了！`,
    correctCode: `// 交换a和b
int temp = a;  // 先保存a的值
a = b;
b = temp;`,
    explanation: '交换两个变量需要临时变量保存其中一个的值。',
    kidFriendly: '就像两杯水要互换，需要第三个杯子。先把第一杯倒到第三个杯子，再把第二杯倒到第一个杯子...',
    howToFind: '交换后两个变量变成了相同的值。',
    prevention: '记住三步走：保存a → 把b给a → 把保存的给b',
    relatedTopics: ['变量', '基础语法'],
    frequency: 3,
  },
  {
    id: 'logic-and-or',
    title: '逻辑运算符优先级错误',
    category: 'logic',
    difficulty: 'intermediate',
    wrongCode: `if (a > 0 && b > 0 || c > 0) {  // 意思不对！`,
    correctCode: `if ((a > 0 && b > 0) || c > 0) {  // 加括号明确意图
// 或者
if (a > 0 && (b > 0 || c > 0)) {  // 另一种可能`,
    explanation: '&&优先级高于||，但容易混淆。用括号明确表达意图！',
    kidFriendly: '就像数学里"先乘除后加减"，逻辑运算也有优先级。不确定就加括号！',
    howToFind: '条件判断结果和预期不符。',
    prevention: '复杂条件都用括号括起来，不要靠记忆优先级。',
    relatedTopics: ['条件语句', '运算符'],
    frequency: 3,
  },
  {
    id: 'logic-mod-negative',
    title: '负数取余结果',
    category: 'logic',
    difficulty: 'intermediate',
    wrongCode: `int a = -7, b = 3;
int r = a % b;  // r = -1，不是预期的2`,
    correctCode: `int a = -7, b = 3;
int r = ((a % b) + b) % b;  // r = 2，正确的非负余数`,
    explanation: 'C++中负数取余结果可能为负。需要额外处理才能得到非负余数。',
    kidFriendly: '负数取余就像在环形跑道上跑步，方向搞对了才能到达正确位置。',
    howToFind: '涉及负数的取余运算结果不符合预期。',
    prevention: '需要非负余数时，用 ((a % b) + b) % b。',
    relatedTopics: ['运算符', '模运算'],
    frequency: 3,
  },

  // ========== 算法错误 ==========
  {
    id: 'algorithm-knapsack-order',
    title: '01背包遍历顺序错误',
    category: 'algorithm',
    difficulty: 'intermediate',
    wrongCode: `// 01背包 - 错误
for (int i = 1; i <= n; i++) {
    for (int j = w[i]; j <= W; j++) {  // 正序：每件物品可能被选多次！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}`,
    correctCode: `// 01背包 - 正确
for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {  // 倒序：每件物品只选一次
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}`,
    explanation: '01背包用一维数组时必须倒序遍历，否则一件物品可能被选多次，变成完全背包。',
    kidFriendly: '倒着选东西，选过的就不会再被选中。正着选的话，刚选的可能又被选一次。',
    howToFind: '结果比预期大，可能是物品被重复选了。',
    prevention: '记住：01背包倒序，完全背包正序。',
    relatedTopics: ['动态规划', '背包问题'],
    frequency: 5,
  },
  {
    id: 'algorithm-dijkstra-negative',
    title: 'Dijkstra处理负权边',
    category: 'algorithm',
    difficulty: 'intermediate',
    wrongCode: `// 图中有负权边
dijkstra(start);  // 错误：Dijkstra不能处理负权边！`,
    correctCode: `// 图中有负权边
spfa(start);  // 正确：用SPFA算法`,
    explanation: 'Dijkstra算法不能正确处理负权边，应该使用SPFA或Bellman-Ford算法。',
    kidFriendly: 'Dijkstra就像只往前走的贪心，遇到"倒退"的路（负权边）就懵了。',
    howToFind: '有负权边时结果错误或不收敛。',
    prevention: '有负权边就用SPFA，没有负权边优先用Dijkstra。',
    relatedTopics: ['图论', '最短路'],
    frequency: 3,
  },
  {
    id: 'algorithm-sort-stability',
    title: '忽略排序稳定性',
    category: 'algorithm',
    difficulty: 'intermediate',
    wrongCode: `// 需要保持相同元素的原始顺序
sort(arr, arr + n, cmp);  // 快排不稳定！`,
    correctCode: `// 需要保持相同元素的原始顺序
stable_sort(arr, arr + n, cmp);  // 稳定排序`,
    explanation: 'sort是快速排序，不稳定。需要稳定排序时要用stable_sort。',
    kidFriendly: '有些排序会打乱相同分数的同学的排名顺序，稳定排序可以保持原来的顺序。',
    howToFind: '相同关键字元素的相对顺序改变了。',
    prevention: '需要保持相对顺序时用stable_sort。',
    relatedTopics: ['排序', '算法'],
    frequency: 2,
  },

  // ========== 效率问题 ==========
  {
    id: 'efficiency-cin-sync',
    title: 'cin/cout效率问题',
    category: 'efficiency',
    difficulty: 'beginner',
    wrongCode: `// 大量输入数据时超时
int n;
cin >> n;
for (int i = 0; i < 1000000; i++) {
    cin >> a[i];  // 太慢了！
}`,
    correctCode: `// 方法1：关闭同步
ios::sync_with_stdio(false);
cin.tie(nullptr);

// 方法2：用scanf
int n;
scanf("%d", &n);
for (int i = 0; i < 1000000; i++) {
    scanf("%d", &a[i]);
}`,
    explanation: 'cin/cout默认与stdio同步，效率较低。大数据量时应该关闭同步或用scanf/printf。',
    kidFriendly: 'cin像是一个很有礼貌的服务员，每次都确认一下，所以比较慢。告诉它"不用那么客气"就会快很多。',
    howToFind: '输入输出部分导致超时。',
    prevention: '大数据量时，要么关闭同步，要么用scanf/printf。',
    relatedTopics: ['输入输出', '效率优化'],
    frequency: 4,
  },
  {
    id: 'efficiency-nested-loop',
    title: '嵌套循环导致超时',
    category: 'efficiency',
    difficulty: 'intermediate',
    wrongCode: `// O(n²)复杂度，n=10^5时超时
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // 操作
    }
}`,
    correctCode: `// 寻找O(n)或O(n log n)的算法
// 例如用哈希表、前缀和、双指针等技巧`,
    explanation: 'n=10^5时，O(n²)约10^10次操作，肯定会超时。需要找更优的算法。',
    kidFriendly: '两层循环就像每个人都要和其他所有人握手，人多了时间就会爆炸。',
    howToFind: '看数据范围：n=1000可用O(n²)，n=10^5需要O(n)或O(n log n)。',
    prevention: '先估算复杂度，根据数据范围选择合适算法。',
    relatedTopics: ['复杂度分析', '算法设计'],
    frequency: 4,
  },
  {
    id: 'efficiency-memo',
    title: '递归无记忆化',
    category: 'efficiency',
    difficulty: 'intermediate',
    wrongCode: `// 斐波那契 - 重复计算导致超时
long long fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);  // 大量重复计算
}`,
    correctCode: `// 斐波那契 - 记忆化或递推
long long memo[100];
long long fib(int n) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    return memo[n] = fib(n - 1) + fib(n - 2);
}
// 或者直接用递推
long long f[100];
f[0] = 0; f[1] = 1;
for (int i = 2; i <= n; i++) f[i] = f[i-1] + f[i-2];`,
    explanation: '普通递归斐波那契时间复杂度O(2^n)，会大量重复计算。记忆化或递推可以降到O(n)。',
    kidFriendly: '就像做作业，已经算过的题要把答案记下来，下次就不用再算一遍。',
    howToFind: '递归调用次数爆炸，程序运行很慢或超时。',
    prevention: '递归问题考虑是否需要记忆化，或者改用递推。',
    relatedTopics: ['递归', '动态规划'],
    frequency: 4,
  },
];

// 按分类获取错误
export function getMistakesByCategory(categoryId: string): CommonMistake[] {
  return commonMistakes.filter(m => m.category === categoryId);
}

// 按难度获取错误
export function getMistakesByDifficulty(difficulty: string): CommonMistake[] {
  return commonMistakes.filter(m => m.difficulty === difficulty);
}

// 获取高频错误
export function getFrequentMistakes(minFrequency: number = 4): CommonMistake[] {
  return commonMistakes.filter(m => m.frequency >= minFrequency);
}

// 搜索错误
export function searchMistakes(keyword: string): CommonMistake[] {
  const lower = keyword.toLowerCase();
  return commonMistakes.filter(m =>
    m.title.toLowerCase().includes(lower) ||
    m.explanation.toLowerCase().includes(lower) ||
    m.kidFriendly.toLowerCase().includes(lower) ||
    m.relatedTopics.some(t => t.toLowerCase().includes(lower))
  );
}

// 获取所有错误
export function getAllMistakes(): CommonMistake[] {
  return commonMistakes;
}

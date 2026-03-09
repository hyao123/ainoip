// 知识点详细讲解数据

export interface KnowledgeLesson {
  id: string;
  title: string;
  content: string; // Markdown格式的讲解内容
  codeExamples: {
    title: string;
    code: string;
    explanation: string;
  }[];
  keyPoints: string[]; // 关键要点
  commonMistakes: string[]; // 常见错误
  tips: string[]; // 学习建议
  relatedProblems: number[]; // 相关题目ID
}

export const knowledgeLessons: Record<string, KnowledgeLesson> = {
  // ========== 基础篇 ==========
  'basics-io': {
    id: 'basics-io',
    title: '输入输出',
    content: `## 输入输出基础

在NOIP竞赛中，输入输出是最基础也是最重要的技能。

### 标准输入输出

C++提供了两种主要的输入输出方式：

**1. cin/cout（推荐初学者使用）**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;  // 输入两个整数
    cout << a + b << endl;  // 输出结果
    return 0;
}
\`\`\`

**2. scanf/printf（效率更高）**
\`\`\`cpp
#include <cstdio>

int main() {
    int a, b;
    scanf("%d%d", &a, &b);  // 输入两个整数
    printf("%d\\n", a + b);  // 输出结果
    return 0;
}
\`\`\`

### NOIP标准文件输入输出

NOIP竞赛要求使用文件输入输出，格式如下：
\`\`\`cpp
#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("xxx.in", "r", stdin);   // 打开输入文件
    freopen("xxx.out", "w", stdout); // 打开输出文件
    
    // 正常的输入输出代码
    int n;
    cin >> n;
    cout << n * 2 << endl;
    
    fclose(stdin);   // 关闭输入文件
    fclose(stdout);  // 关闭输出文件
    return 0;
}
\`\`\`

### 格式化输出

使用printf进行格式化输出：
\`\`\`cpp
printf("%d\\n", 123);      // 输出整数
printf("%f\\n", 3.14);     // 输出浮点数
printf("%.2f\\n", 3.14159); // 保留2位小数
printf("%lld\\n", 12345678901234LL); // 输出long long
\`\`\``,
    codeExamples: [
      {
        title: '读取多个整数',
        code: `int a, b, c;
cin >> a >> b >> c;
cout << a + b + c << endl;`,
        explanation: '使用cin连续读取多个变量，用空格或换行分隔输入。',
      },
      {
        title: 'NOIP标准模板',
        code: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("problem.in", "r", stdin);
    freopen("problem.out", "w", stdout);
    
    // 你的代码
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
        explanation: '这是NOIP竞赛的标准代码模板，使用freopen进行文件重定向。',
      },
    ],
    keyPoints: [
      'cin/cout使用方便，scanf/printf效率更高',
      'NOIP竞赛必须使用freopen进行文件输入输出',
      '输入文件名和输出文件名要仔细阅读题目要求',
      '记得在程序结束时关闭文件',
    ],
    commonMistakes: [
      '忘记添加#include <cstdio>头文件',
      'freopen的文件名写错',
      'scanf忘记加&取地址符',
      '忘记关闭文件（虽然大多数情况下不影响）',
    ],
    tips: [
      '建议先在本地测试通过后再添加freopen语句',
      '调试时可以先用键盘输入，确认正确后再改文件输入',
      '注意区分"r"（读取）和"w"（写入）模式',
    ],
    relatedProblems: [1],
  },

  'basics-variables': {
    id: 'basics-variables',
    title: '变量与数据类型',
    content: `## 变量与数据类型

### 基本数据类型

| 类型 | 关键字 | 范围 | 字节数 |
|------|--------|------|--------|
| 整型 | int | -2¹⁷ ~ 2³¹-1（约±21亿） | 4 |
| 长整型 | long long | -2⁶³ ~ 2⁶³-1 | 8 |
| 单精度浮点 | float | 约±3.4×10³⁸ | 4 |
| 双精度浮点 | double | 约±1.7×10³⁰⁸ | 8 |
| 字符型 | char | -128 ~ 127 或 0 ~ 255 | 1 |
| 布尔型 | bool | true/false | 1 |

### 变量声明与初始化

\`\`\`cpp
// 声明变量
int a;           // 声明一个整型变量
int a, b, c;     // 声明多个同类型变量

// 初始化
int a = 10;      // 声明并初始化
int a(10);       // 另一种初始化方式
int a{10};       // C++11 列表初始化

// 常量
const int MAXN = 100000;  // 使用const定义常量
#define MAXN 100000       // 使用宏定义常量
\`\`\`

### 数据溢出问题

当计算结果超出数据类型范围时，会发生溢出：

\`\`\`cpp
int a = 2147483647;  // int最大值
a = a + 1;           // 溢出！变成-2147483648

// 解决方法：使用long long
long long b = 2147483647LL;
b = b + 1;           // 正确：2147483648
\`\`\`

### 类型转换

\`\`\`cpp
// 隐式类型转换
int a = 5;
double b = a;        // 自动转换为5.0

// 显式类型转换（强制转换）
double c = 3.14;
int d = (int)c;      // 强制转换为3

// 使用long long避免溢出
int a = 100000;
int b = 100000;
long long c = (long long)a * b;  // 正确：10000000000
\`\`\``,
    codeExamples: [
      {
        title: '处理大整数运算',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 100000, b = 100000;
    
    // 错误：int会溢出
    // int c = a * b;
    
    // 正确：使用long long
    long long c = (long long)a * b;
    cout << c << endl;  // 输出：10000000000
    
    return 0;
}`,
        explanation: '当两个大int相乘时，结果可能溢出，需要使用long long存储结果。',
      },
    ],
    keyPoints: [
      'int范围约±21亿，超出需要使用long long',
      '浮点数运算使用double',
      'long long常量加LL后缀',
      '注意乘法、加法的溢出问题',
    ],
    commonMistakes: [
      'int相乘溢出（最常见错误！）',
      '忘记(long long)强制转换',
      '浮点数比较使用==',
      '除法结果取整问题',
    ],
    tips: [
      '看到数据范围>10⁹就要考虑long long',
      '乘法运算前先检查是否会溢出',
      '建议默认使用long long避免溢出问题',
    ],
    relatedProblems: [101],
  },

  'basics-operators': {
    id: 'basics-operators',
    title: '运算符与表达式',
    content: `## 运算符与表达式

### 算术运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| + | 加法 | a + b |
| - | 减法 | a - b |
| * | 乘法 | a * b |
| / | 除法（整数除法向下取整） | 7 / 2 = 3 |
| % | 取余（模运算） | 7 % 2 = 1 |

### 模运算的重要应用

\`\`\`cpp
// 判断奇偶
if (n % 2 == 0)  // 偶数
if (n % 2 == 1)  // 奇数

// 取个位数
int lastDigit = n % 10;

// 循环计数
count = (count + 1) % N;  // 0到N-1循环

// 大数取余（避免溢出）
long long result = (a % M + b % M) % M;
\`\`\`

### 关系运算符

\`\`\`cpp
==  等于
!=  不等于
>   大于
<   小于
>=  大于等于
<=  小于等于
\`\`\`

### 逻辑运算符

\`\`\`cpp
&&  逻辑与（AND）
||  逻辑或（OR）
!   逻辑非（NOT）
\`\`\`

### 运算符优先级

从高到低：
1. 括号 ()
2. 单目运算符 !、-（负号）
3. 算术运算符 *、/、%
4. 算术运算符 +、-
5. 关系运算符 >、<、>=、<=
6. 关系运算符 ==、!=
7. 逻辑与 &&
8. 逻辑或 ||
9. 赋值运算符 =

建议：**不确定优先级时，使用括号明确表达意图！**`,
    codeExamples: [
      {
        title: '模运算应用',
        code: `// 判断一个数是否是3的倍数
if (n % 3 == 0) {
    cout << "是3的倍数" << endl;
}

// 取出数字的各位
int n = 12345;
int ge = n % 10;        // 个位：5
int shi = n / 10 % 10;  // 十位：4
int bai = n / 100 % 10; // 百位：3`,
        explanation: '模运算在处理数字位数、循环计数等场景非常常用。',
      },
    ],
    keyPoints: [
      '整数除法会向下取整',
      '模运算结果符号与被除数相同',
      '善用括号明确运算优先级',
      '短路求值：&&和||有短路特性',
    ],
    commonMistakes: [
      '混淆 = 和 ==',
      '整数除法精度丢失',
      '负数取余结果符号问题',
      '运算符优先级错误',
    ],
    tips: [
      '判断相等用==，赋值用=',
      '整数除法前考虑是否需要先转换为浮点数',
      '复杂表达式多用括号提高可读性',
    ],
    relatedProblems: [101, 103, 111],
  },

  'basics-conditional': {
    id: 'basics-conditional',
    title: '条件判断',
    content: `## 条件判断

### if语句

\`\`\`cpp
// 单分支
if (条件) {
    // 条件为真时执行
}

// 双分支
if (条件) {
    // 条件为真时执行
} else {
    // 条件为假时执行
}

// 多分支
if (条件1) {
    // 条件1为真
} else if (条件2) {
    // 条件2为真
} else {
    // 都不满足
}
\`\`\`

### switch语句

\`\`\`cpp
switch (表达式) {
    case 值1:
        // 执行代码
        break;
    case 值2:
        // 执行代码
        break;
    default:
        // 默认情况
        break;
}
\`\`\`

### 三目运算符

\`\`\`cpp
// 条件 ? 真值 : 假值
int max = a > b ? a : b;  // 取较大值
int abs = x >= 0 ? x : -x; // 取绝对值
\`\`\`

### 逻辑表达式

\`\`\`cpp
// 组合条件
if (a > 0 && b > 0)  // a和b都大于0
if (a > 0 || b > 0)  // a或b大于0
if (!(a > 0))        // a不大于0

// 范围判断
if (a >= 1 && a <= 100)  // a在[1,100]范围内
\`\`\``,
    codeExamples: [
      {
        title: '判断闰年',
        code: `int year;
cin >> year;

// 闰年规则：
// 能被4整除但不能被100整除，或能被400整除
if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    cout << "是闰年" << endl;
} else {
    cout << "不是闰年" << endl;
}`,
        explanation: '闰年判断是经典的组合条件判断示例。',
      },
      {
        title: '成绩等级判断',
        code: `int score;
cin >> score;

if (score >= 90) {
    cout << "A" << endl;
} else if (score >= 80) {
    cout << "B" << endl;
} else if (score >= 70) {
    cout << "C" << endl;
} else if (score >= 60) {
    cout << "D" << endl;
} else {
    cout << "E" << endl;
}`,
        explanation: '多分支结构常用于分段判断。',
      },
    ],
    keyPoints: [
      'else与最近的if匹配',
      '多分支时注意条件的顺序',
      'switch必须配合break使用',
      '三目运算符适合简单的条件判断',
    ],
    commonMistakes: [
      'if后多加了分号',
      'else匹配错误',
      'switch忘记break',
      '浮点数用==比较',
    ],
    tips: [
      '复杂条件建议拆分成多个if',
      '判断浮点数相等用绝对值小于某个小数',
      '使用代码缩进提高可读性',
    ],
    relatedProblems: [109, 103],
  },

  'basics-loops': {
    id: 'basics-loops',
    title: '循环结构',
    content: `## 循环结构

### for循环

\`\`\`cpp
// 基本语法
for (初始化; 条件; 更新) {
    // 循环体
}

// 示例：打印1到10
for (int i = 1; i <= 10; i++) {
    cout << i << " ";
}
\`\`\`

### while循环

\`\`\`cpp
// 基本语法
while (条件) {
    // 循环体
}

// 示例：计算各位数字之和
int n = 12345, sum = 0;
while (n > 0) {
    sum += n % 10;  // 取个位
    n /= 10;        // 去掉个位
}
\`\`\`

### do-while循环

\`\`\`cpp
// 至少执行一次
do {
    // 循环体
} while (条件);
\`\`\`

### 循环控制

\`\`\`cpp
break;    // 跳出整个循环
continue; // 跳过本次迭代
return;   // 退出函数
\`\`\`

### 循环嵌套

\`\`\`cpp
// 打印九九乘法表
for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= i; j++) {
        cout << j << "*" << i << "=" << i*j << " ";
    }
    cout << endl;
}
\`\`\`

### 循环优化技巧

\`\`\`cpp
// 避免在循环中重复计算
int n = arr.size();  // 提前计算
for (int i = 0; i < n; i++) { }

// 循环展开（减少循环次数）
for (int i = 0; i < n; i += 4) {
    // 一次处理4个元素
}
\`\`\``,
    codeExamples: [
      {
        title: '求阶乘',
        code: `int n;
cin >> n;

long long factorial = 1;
for (int i = 2; i <= n; i++) {
    factorial *= i;
}
cout << n << "! = " << factorial << endl;`,
        explanation: '阶乘计算是for循环的经典应用，注意使用long long防止溢出。',
      },
      {
        title: '斐波那契数列',
        code: `int n;
cin >> n;

if (n == 0) {
    cout << 0 << endl;
} else if (n == 1) {
    cout << 1 << endl;
} else {
    int a = 0, b = 1, c;
    for (int i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    cout << b << endl;
}`,
        explanation: '使用迭代方式计算斐波那契数列，时间复杂度O(n)，比递归更高效。',
      },
    ],
    keyPoints: [
      'for适合已知次数的循环',
      'while适合未知次数的循环',
      '循环变量作用域问题',
      '避免死循环',
    ],
    commonMistakes: [
      '循环边界错误（差一错误）',
      '死循环',
      '循环变量未初始化',
      '嵌套循环变量重名',
    ],
    tips: [
      '循环前确定边界条件',
      '检查循环是否能正常结束',
      '注意循环变量的更新',
    ],
    relatedProblems: [2, 3, 101, 105],
  },

  'basics-arrays': {
    id: 'basics-arrays',
    title: '数组',
    content: `## 数组

### 一维数组

\`\`\`cpp
// 声明数组
int arr[100];           // 声明大小为100的数组
int arr[5] = {1, 2, 3, 4, 5};  // 声明并初始化
int arr[10] = {0};      // 全部初始化为0

// 访问元素（下标从0开始）
arr[0] = 10;    // 第一个元素
arr[99] = 20;   // 最后一个元素
\`\`\`

### 二维数组

\`\`\`cpp
// 声明二维数组
int matrix[10][10];     // 10行10列
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 访问元素
matrix[0][0] = 1;  // 第一行第一列
matrix[2][3] = 12; // 第三行第四列
\`\`\`

### 数组遍历

\`\`\`cpp
// 一维数组遍历
int arr[10];
for (int i = 0; i < 10; i++) {
    cin >> arr[i];
}

// 二维数组遍历
int matrix[5][5];
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        cin >> matrix[i][j];
    }
}
\`\`\`

### 全局数组 vs 局部数组

\`\`\`cpp
// 全局数组 - 自动初始化为0
int globalArr[1000];  // 所有元素都是0

int main() {
    // 局部数组 - 值不确定
    int localArr[1000];  // 值是随机的
    
    // 方法1：循环初始化
    for (int i = 0; i < 1000; i++) {
        localArr[i] = 0;
    }
    
    // 方法2：使用memset
    memset(localArr, 0, sizeof(localArr));
    
    return 0;
}
\`\`\``,
    codeExamples: [
      {
        title: '统计数字出现次数',
        code: `int count[10] = {0};  // 统计0-9各出现多少次
int n;

while (cin >> n) {
    while (n > 0) {
        count[n % 10]++;  // 统计各位数字
        n /= 10;
    }
}

for (int i = 0; i < 10; i++) {
    cout << i << "出现" << count[i] << "次" << endl;
}`,
        explanation: '数组常用于计数统计，这里是统计每个数字出现的次数。',
      },
      {
        title: '矩阵相加',
        code: `int a[100][100], b[100][100], c[100][100];
int n, m;
cin >> n >> m;

// 读取矩阵a
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        cin >> a[i][j];

// 读取矩阵b
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        cin >> b[i][j];

// 矩阵相加
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        c[i][j] = a[i][j] + b[i][j];`,
        explanation: '二维数组常用于处理矩阵问题。',
      },
    ],
    keyPoints: [
      '数组下标从0开始',
      '注意数组越界问题',
      '全局数组自动初始化为0',
      '数组大小必须是常量',
    ],
    commonMistakes: [
      '数组越界访问',
      '局部数组未初始化',
      '数组大小不够',
      '混淆下标和元素值',
    ],
    tips: [
      '数组大小开得比需要稍大一些',
      '重要数组建议开为全局变量',
      '访问数组前检查下标范围',
    ],
    relatedProblems: [105],
  },

  // ========== 进阶篇 ==========
  'string-basics': {
    id: 'string-basics',
    title: '字符串基础',
    content: `## 字符串基础

### C风格字符串（字符数组）

\`\`\`cpp
#include <cstring>

char str[100];
cin >> str;           // 读取字符串
cout << str;          // 输出字符串

// 常用函数
strlen(str);          // 字符串长度
strcpy(dest, src);    // 复制字符串
strcat(dest, src);    // 连接字符串
strcmp(s1, s2);       // 比较字符串
\`\`\`

### C++ string类（推荐）

\`\`\`cpp
#include <string>

string s;
cin >> s;             // 读取一个单词
getline(cin, s);      // 读取一整行

// 常用操作
s.length();           // 长度
s.size();             // 长度（同length）
s.empty();            // 是否为空
s.clear();            // 清空

// 访问字符
s[0];                 // 第一个字符
s[s.length()-1];      // 最后一个字符

// 拼接
s = s + " world";
s += "!";

// 查找
s.find("abc");        // 查找子串，返回位置
s.substr(0, 3);       // 截取子串
\`\`\`

### 字符处理

\`\`\`cpp
#include <cctype>

isalpha(c);    // 是否是字母
isdigit(c);    // 是否是数字
islower(c);    // 是否是小写
isupper(c);    // 是否是大写
isspace(c);    // 是否是空格

tolower(c);    // 转小写
toupper(c);    // 转大写
\`\`\``,
    codeExamples: [
      {
        title: '统计字符串中各字符出现次数',
        code: `string s;
cin >> s;

int count[26] = {0};  // 统计26个字母

for (int i = 0; i < s.length(); i++) {
    if (isalpha(s[i])) {
        count[tolower(s[i]) - 'a']++;
    }
}

for (int i = 0; i < 26; i++) {
    if (count[i] > 0) {
        cout << (char)('a' + i) << ": " << count[i] << endl;
    }
}`,
        explanation: '使用数组统计字符出现次数，注意大小写转换。',
      },
    ],
    keyPoints: [
      'string类比字符数组更方便',
      'getline读取含空格的行',
      '字符可视为整数进行运算',
      'ASCII码：A=65, a=97, 0=48',
    ],
    commonMistakes: [
      'cin>>s不能读取空格',
      '忘记string头文件',
      '混淆字符和字符串',
      '数组越界访问',
    ],
    tips: [
      '优先使用string类',
      '注意区分单引号(字符)和双引号(字符串)',
      '善用cctype库函数',
    ],
    relatedProblems: [107, 104],
  },

  'number-theory-basics': {
    id: 'number-theory-basics',
    title: '数论基础',
    content: `## 数论基础

### 整除与余数

\`\`\`cpp
// 整除：a能被b整除
if (a % b == 0) {
    cout << "a能被b整除" << endl;
}

// 余数
int r = a % b;  // a除以b的余数

// 商和余数
int q = a / b;  // 商
int r = a % b;  // 余数
// 有：a = q * b + r，且 0 <= r < b
\`\`\`

### 最大公约数（GCD）

\`\`\`cpp
// 欧几里得算法（辗转相除法）
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 非递归版本
int gcd(int a, int b) {
    while (b != 0) {
        int t = a % b;
        a = b;
        b = t;
    }
    return a;
}
\`\`\`

### 最小公倍数（LCM）

\`\`\`cpp
// LCM(a, b) = a * b / GCD(a, b)
int lcm(int a, int b) {
    return a / gcd(a, b) * b;  // 先除后乘避免溢出
}
\`\`\`

### 快速幂

\`\`\`cpp
// 计算 a^b mod m
long long power(long long a, long long b, long long m) {
    long long result = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) result = result * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return result;
}
\`\`\``,
    codeExamples: [
      {
        title: '判断素数',
        code: `bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    
    // 只需检查到sqrt(n)
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}`,
        explanation: '判断素数的优化方法：只检查奇数，只检查到平方根。',
      },
    ],
    keyPoints: [
      'GCD使用欧几里得算法',
      'LCM = a * b / GCD(a, b)',
      '素数判断只需检查到sqrt(n)',
      '快速幂时间复杂度O(log n)',
    ],
    commonMistakes: [
      '素数判断遗漏边界情况',
      'LCM计算溢出',
      '负数取余结果处理',
      '快速幂忘记取模',
    ],
    tips: [
      '数论题多考虑边界情况',
      '大数运算注意取模',
      '熟记常见算法模板',
    ],
    relatedProblems: [102, 110],
  },

  'recursion': {
    id: 'recursion',
    title: '递归思想',
    content: `## 递归思想

### 递归基本概念

递归是一种通过函数调用自身来解决问题的方法。

**递归三要素：**
1. **终止条件**：避免无限递归
2. **递归调用**：问题规模缩小
3. **返回结果**：合并子问题结果

### 经典递归示例

**1. 阶乘**
\`\`\`cpp
long long factorial(int n) {
    if (n <= 1) return 1;        // 终止条件
    return n * factorial(n - 1); // 递归调用
}
\`\`\`

**2. 斐波那契数列**
\`\`\`cpp
int fib(int n) {
    if (n <= 1) return n;        // 终止条件
    return fib(n - 1) + fib(n - 2); // 递归调用
}
\`\`\`

**3. 汉诺塔**
\`\`\`cpp
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << from << " -> " << to << endl;
        return;
    }
    hanoi(n - 1, from, aux, to);
    cout << from << " -> " << to << endl;
    hanoi(n - 1, aux, to, from);
}
\`\`\`

### 递归优化：记忆化

\`\`\`cpp
int memo[1000];  // 记忆数组

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];  // 直接返回已计算的值
    return memo[n] = fib(n - 1) + fib(n - 2);
}
\`\`\``,
    codeExamples: [
      {
        title: '递归求和',
        code: `// 计算1到n的和
int sum(int n) {
    if (n == 1) return 1;        // 终止条件
    return n + sum(n - 1);       // 递归调用
}

// 更高效的方法：公式 n*(n+1)/2
int sum(int n) {
    return n * (n + 1) / 2;
}`,
        explanation: '简单递归示例，但实际问题中能用公式解决的更高效。',
      },
    ],
    keyPoints: [
      '必须有终止条件',
      '每次递归问题规模要缩小',
      '注意递归深度限制',
      '使用记忆化优化重复计算',
    ],
    commonMistakes: [
      '忘记终止条件导致无限递归',
      '递归深度过大导致栈溢出',
      '重复计算导致效率低下',
      '递归边界处理错误',
    ],
    tips: [
      '先想清楚终止条件',
      '画递归树理解执行过程',
      '考虑是否可以用迭代替代',
      '使用记忆化减少重复计算',
    ],
    relatedProblems: [2, 3],
  },

  'dp-intro': {
    id: 'dp-intro',
    title: '动态规划入门',
    content: `## 动态规划入门

### 什么是动态规划？

动态规划(Dynamic Programming)是一种通过把原问题分解为相对简单的子问题来求解复杂问题的方法。

**核心概念：**
- **状态**：描述子问题的解
- **状态转移**：从已知状态推导新状态
- **边界条件**：最小子问题的解

### DP vs 递归

\`\`\`cpp
// 递归：自顶向下
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);  // 大量重复计算
}

// DP：自底向上
int fib(int n) {
    if (n <= 1) return n;
    int dp[100];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];  // 无重复计算
    }
    return dp[n];
}
\`\`\`

### DP解题步骤

1. **定义状态**：dp[i]表示什么？
2. **确定转移方程**：dp[i]如何从之前的状态得到？
3. **确定边界条件**：最小的子问题怎么解？
4. **确定计算顺序**：自底向上还是自顶向下？

### 经典例子：爬楼梯

\`\`\`cpp
// 每次可以爬1或2级台阶，问爬到第n级有多少种方法？
int climbStairs(int n) {
    if (n <= 2) return n;
    
    int dp[n + 1];
    dp[1] = 1;  // 1级台阶：1种方法
    dp[2] = 2;  // 2级台阶：2种方法
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];  // 从i-1级爬1步 + 从i-2级爬2步
    }
    
    return dp[n];
}
\`\`\``,
    codeExamples: [
      {
        title: '最大子数组和',
        code: `// 求连续子数组的最大和
int maxSubArray(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n);
    dp[0] = nums[0];
    int maxSum = dp[0];
    
    for (int i = 1; i < n; i++) {
        dp[i] = max(dp[i - 1] + nums[i], nums[i]);
        maxSum = max(maxSum, dp[i]);
    }
    
    return maxSum;
}`,
        explanation: 'dp[i]表示以第i个元素结尾的最大子数组和。',
      },
    ],
    keyPoints: [
      '定义清晰的状态',
      '正确的状态转移方程',
      '处理好边界条件',
      '选择合适的计算顺序',
    ],
    commonMistakes: [
      '状态定义不清晰',
      '转移方程推导错误',
      '边界条件遗漏',
      '空间优化导致错误',
    ],
    tips: [
      '先画状态转移图',
      '从简单例子验证转移方程',
      '先写出正确版本再考虑优化',
      '注意初始化',
    ],
    relatedProblems: [],
  },

  'search-dfs': {
    id: 'search-dfs',
    title: '深度优先搜索(DFS)',
    content: `## 深度优先搜索(DFS)

### 基本概念

深度优先搜索(Depth-First Search)是一种用于遍历或搜索树/图的算法。

**核心思想：** 一条路走到底，走不通就回溯。

### DFS框架

\`\`\`cpp
void dfs(参数) {
    if (终止条件) {
        // 处理结果
        return;
    }
    
    for (每种可能的选择) {
        if (选择合法) {
            做选择;
            dfs(下一状态);
            撤销选择;  // 回溯
        }
    }
}
\`\`\`

### 经典应用

**1. 全排列**
\`\`\`cpp
int n;
int path[100];      // 当前路径
bool used[100];     // 标记是否使用过

void dfs(int pos) {
    if (pos == n) {  // 找到一个排列
        for (int i = 0; i < n; i++) {
            cout << path[i] << " ";
        }
        cout << endl;
        return;
    }
    
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            path[pos] = i;
            used[i] = true;
            dfs(pos + 1);
            used[i] = false;  // 回溯
        }
    }
}
\`\`\`

**2. 图的遍历**
\`\`\`cpp
vector<int> adj[100];  // 邻接表
bool visited[100];

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '迷宫路径搜索',
        code: `char maze[10][10];
bool visited[10][10];
int dx[] = {-1, 1, 0, 0};  // 四个方向
int dy[] = {0, 0, -1, 1};
int n, m;

bool dfs(int x, int y, int endX, int endY) {
    if (x == endX && y == endY) return true;
    
    visited[x][y] = true;
    
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i];
        int ny = y + dy[i];
        
        if (nx >= 0 && nx < n && ny >= 0 && ny < m 
            && !visited[nx][ny] && maze[nx][ny] != '#') {
            if (dfs(nx, ny, endX, endY)) {
                return true;
            }
        }
    }
    
    return false;
}`,
        explanation: 'DFS搜索迷宫中从起点到终点的路径。',
      },
    ],
    keyPoints: [
      '确定终止条件',
      '正确标记和取消标记',
      '避免重复访问',
      '合理设置搜索边界',
    ],
    commonMistakes: [
      '忘记回溯（取消标记）',
      '终止条件错误',
      '越界访问',
      '死循环',
    ],
    tips: [
      '画图理解搜索过程',
      '注意剪枝优化',
      '大数据时考虑迭代代替递归',
      '使用方向数组简化代码',
    ],
    relatedProblems: [],
  },

  'search-bfs': {
    id: 'search-bfs',
    title: '广度优先搜索(BFS)',
    content: `## 广度优先搜索(BFS)

### 基本概念

广度优先搜索(Breadth-First Search)按层次遍历所有节点。

**核心思想：** 先访问近的节点，再访问远的节点。

### BFS框架

\`\`\`cpp
#include <queue>

void bfs(起点) {
    queue<状态> q;
    q.push(起点);
    visited[起点] = true;
    
    while (!q.empty()) {
        auto curr = q.front();
        q.pop();
        
        if (是目标状态) {
            // 处理结果
            return;
        }
        
        for (每种可能的下一步) {
            if (下一步合法 && 未访问过) {
                visited[下一步] = true;
                q.push(下一步);
            }
        }
    }
}
\`\`\`

### BFS vs DFS

| 特性 | BFS | DFS |
|------|-----|-----|
| 数据结构 | 队列 | 栈/递归 |
| 空间复杂度 | 较大 | 较小 |
| 最短路径 | ✅ 天然支持 | ❌ 需要额外处理 |
| 实现 | 非递归 | 通常递归 |

### 经典应用：最短路径

\`\`\`cpp
int bfs(int startX, int startY, int endX, int endY) {
    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};
    
    queue<pair<int, int>> q;
    int dist[100][100] = {0};
    
    q.push({startX, startY});
    dist[startX][startY] = 1;
    
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        
        if (x == endX && y == endY) {
            return dist[x][y] - 1;
        }
        
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            
            if (nx >= 0 && nx < n && ny >= 0 && ny < m 
                && dist[nx][ny] == 0 && maze[nx][ny] != '#') {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    
    return -1;  // 无法到达
}
\`\`\``,
    codeExamples: [
      {
        title: '层序遍历',
        code: `void levelOrder(TreeNode* root) {
    if (!root) return;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int size = q.size();  // 当前层节点数
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            cout << node->val << " ";
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        cout << endl;  // 换行表示新的一层
    }
}`,
        explanation: 'BFS天然适合层序遍历，每层的节点会一起处理。',
      },
    ],
    keyPoints: [
      '使用队列存储待访问节点',
      '入队时标记已访问',
      'BFS找到的一定是最短路径',
      '注意判空和边界条件',
    ],
    commonMistakes: [
      '出队时才标记（应为入队时）',
      '忘记判空',
      '越界访问',
      '重复入队',
    ],
    tips: [
      'BFS适合求最短路径问题',
      '使用dist数组记录距离',
      '分层遍历时记录每层大小',
      '注意vis数组的时机',
    ],
    relatedProblems: [],
  },

  'sorting-basics': {
    id: 'sorting-basics',
    title: '排序算法',
    content: `## 排序算法

### 常见排序算法

| 算法 | 时间复杂度 | 空间复杂度 | 稳定性 |
|------|-----------|-----------|--------|
| 冒泡排序 | O(n²) | O(1) | 稳定 |
| 选择排序 | O(n²) | O(1) | 不稳定 |
| 插入排序 | O(n²) | O(1) | 稳定 |
| 快速排序 | O(n log n) | O(log n) | 不稳定 |
| 归并排序 | O(n log n) | O(n) | 稳定 |
| 堆排序 | O(n log n) | O(1) | 不稳定 |

### C++ sort函数

\`\`\`cpp
#include <algorithm>

// 默认升序
sort(arr, arr + n);
sort(v.begin(), v.end());

// 降序
sort(arr, arr + n, greater<int>());

// 自定义比较
bool cmp(int a, int b) {
    return a > b;  // 降序
}
sort(arr, arr + n, cmp);

// 结构体排序
struct Student {
    string name;
    int score;
};
bool cmpStudent(Student a, Student b) {
    return a.score > b.score;  // 按分数降序
}
\`\`\`

### 手写快速排序

\`\`\`cpp
void quickSort(int arr[], int left, int right) {
    if (left >= right) return;
    
    int i = left, j = right;
    int pivot = arr[(left + right) / 2];
    
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) {
            swap(arr[i], arr[j]);
            i++;
            j--;
        }
    }
    
    quickSort(arr, left, j);
    quickSort(arr, i, right);
}
\`\`\``,
    codeExamples: [
      {
        title: '结构体排序',
        code: `struct Student {
    string name;
    int score;
};

bool cmp(Student a, Student b) {
    if (a.score != b.score) {
        return a.score > b.score;  // 分数降序
    }
    return a.name < b.name;  // 同分按姓名升序
}

int main() {
    Student stu[100];
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> stu[i].name >> stu[i].score;
    }
    sort(stu, stu + n, cmp);
}`,
        explanation: '结构体排序是竞赛中的常见需求。',
      },
    ],
    keyPoints: [
      '掌握C++ sort函数的使用',
      '理解各种排序算法的特点',
      '注意排序的稳定性',
      '自定义比较函数的写法',
    ],
    commonMistakes: [
      '比较函数返回等号（导致错误）',
      '数组越界',
      '忘记algorithm头文件',
      '比较函数逻辑错误',
    ],
    tips: [
      '竞赛中优先使用sort',
      '理解比较函数的返回值含义',
      '注意结构体排序的语法',
      'stable_sort保持相等元素的相对顺序',
    ],
    relatedProblems: [108],
  },
};

// 获取知识点讲解
export function getKnowledgeLesson(nodeId: string): KnowledgeLesson | null {
  return knowledgeLessons[nodeId] || null;
}

// 获取所有知识点讲解ID
export function getAllLessonIds(): string[] {
  return Object.keys(knowledgeLessons);
}

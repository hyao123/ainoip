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

  // ========== Day 3: 输入与输出知识点 ==========
  'cin-cout': {
    id: 'cin-cout',
    title: 'cin和cout',
    content: `## cin和cout详解

cin和cout是C++标准库提供的输入输出流对象，使用简单直观。

### 基本用法

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int a;
    double b;
    string s;
    
    cin >> a;           // 读取整数
    cin >> a >> b;      // 连续读取
    cin >> s;           // 读取字符串（遇空格停止）
    
    cout << a << endl;  // 输出并换行
    cout << a << " " << b << "\\n";  // 输出多个值
    return 0;
}
\`\`\`

### cin的特点

1. **自动类型识别**：根据变量类型自动解析输入
2. **自动跳过空白**：空格、Tab、换行都会被跳过
3. **链式操作**：可以连续读取多个变量

### cout的特点

1. **自动类型转换**：各种类型都能输出
2. **链式输出**：可以连续输出多个值
3. **endl vs \\n**：endl会刷新缓冲区

### 读取整行

\`\`\`cpp
string line;
getline(cin, line);  // 读取整行，包括空格
\`\`\`

### 关闭同步（提高速度）

\`\`\`cpp
ios::sync_with_stdio(false);
cin.tie(0);
// 此后不要混用scanf/printf
\`\`\``,
    codeExamples: [
      {
        title: '读取多个数据',
        code: `int n, m;
cin >> n >> m;
vector<int> arr(n);
for (int i = 0; i < n; i++) {
    cin >> arr[i];
}`,
        explanation: '先读取数量，再读取数组元素。',
      },
      {
        title: '格式化输出',
        code: `cout << "答案是: " << ans << endl;
cout << "平均分: " << fixed << setprecision(2) << avg << endl;`,
        explanation: '使用iomanip库进行格式化输出。',
      },
    ],
    keyPoints: [
      'cin自动跳过空白字符',
      'cout的endl会刷新缓冲区',
      'getline可以读取包含空格的整行',
      '关闭同步可以显著提高速度',
    ],
    commonMistakes: [
      '混用cin>>和getline导致读取错误',
      '关闭同步后使用scanf/printf',
      '忘记using namespace std',
      '输出格式不符合要求',
    ],
    tips: [
      '大量数据时考虑关闭同步或使用scanf',
      'getline前如果有cin>>，需要处理换行符',
      '使用setw和setprecision控制格式',
      'cerr用于调试输出，不影响裁判系统',
    ],
    relatedProblems: [1, 19, 20],
  },

  'scanf-printf': {
    id: 'scanf-printf',
    title: 'scanf和printf',
    content: `## scanf和printf详解

scanf和printf是C语言标准库函数，效率比cin/cout高，在竞赛中广泛使用。

### printf格式化输出

\`\`\`cpp
#include <cstdio>

int main() {
    int a = 10;
    double b = 3.14159;
    long long c = 12345678901234LL;
    
    printf("%d\\n", a);           // 整数
    printf("%lld\\n", c);         // long long
    printf("%f\\n", b);           // 浮点数
    printf("%.2f\\n", b);         // 保留2位小数
    printf("%10d\\n", a);         // 宽度10，右对齐
    printf("%-10d\\n", a);        // 宽度10，左对齐
    printf("%05d\\n", a);         // 宽度5，前导零
    return 0;
}
\`\`\`

### scanf格式化输入

\`\`\`cpp
int a, b;
double c;
char s[100];

scanf("%d%d", &a, &b);      // 读取两个整数
scanf("%lf", &c);            // 读取double（注意是%lf）
scanf("%s", s);              // 读取字符串（遇空格停止）
scanf("%[^\\n]", s);         // 读取到换行符为止
\`\`\`

### 常用格式说明符

| 格式 | 说明 |
|------|------|
| %d | int |
| %lld | long long |
| %u | unsigned int |
| %f / %lf | float / double |
| %c | 单个字符 |
| %s | 字符串 |
| %x | 十六进制 |
| %o | 八进制 |

### 返回值

- scanf返回成功读取的变量个数
- printf返回输出的字符数`,
    codeExamples: [
      {
        title: '快速读取大量数据',
        code: `int n;
scanf("%d", &n);
for (int i = 0; i < n; i++) {
    int x;
    scanf("%d", &x);
    // 处理x
}`,
        explanation: 'scanf读取大量数据比cin快很多。',
      },
      {
        title: '格式化输出表格',
        code: `printf("%-10s %10d\\n", "Alice", 95);
printf("%-10s %10d\\n", "Bob", 88);
// 输出:
// Alice            95
// Bob              88`,
        explanation: '负号表示左对齐，数字表示宽度。',
      },
    ],
    keyPoints: [
      'scanf需要变量地址（&符号）',
      'long long使用%lld',
      'double读取用%lf，输出用%f或%lf都可以',
      '格式化输出控制宽度和精度',
    ],
    commonMistakes: [
      '忘记&符号',
      'long long用%d导致溢出',
      'double用%f读取（应用%lf）',
      '格式字符串与变量类型不匹配',
    ],
    tips: [
      '大量数据时优先用scanf/printf',
      '注意long long的格式说明符',
      '返回值可用于判断输入是否结束',
      '读取字符时注意空白字符的处理',
    ],
    relatedProblems: [1, 19, 20, 21],
  },

  'file-io': {
    id: 'file-io',
    title: '文件输入输出',
    content: `## NOIP文件输入输出

NOIP竞赛要求使用文件输入输出，这是必须要掌握的技能！

### freopen方式（推荐）

\`\`\`cpp
#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("xxx.in", "r", stdin);   // 重定向输入
    freopen("xxx.out", "w", stdout); // 重定向输出
    
    // 此后正常使用cin/cout或scanf/printf
    int n;
    cin >> n;
    cout << n * 2 << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}
\`\`\`

### fstream方式

\`\`\`cpp
#include <fstream>

int main() {
    ifstream fin("xxx.in");   // 输入文件流
    ofstream fout("xxx.out"); // 输出文件流
    
    int n;
    fin >> n;
    fout << n * 2 << endl;
    
    fin.close();
    fout.close();
    return 0;
}
\`\`\`

### 文件模式

| 模式 | 说明 |
|------|------|
| "r" | 只读 |
| "w" | 只写（覆盖） |
| "a" | 追加 |
| "r+" | 读写 |
| "w+" | 读写（覆盖） |

### 注意事项

1. 文件名根据题目要求确定
2. 确保文件创建成功
3. 记得关闭文件`,
    codeExamples: [
      {
        title: 'NOIP标准模板',
        code: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("problem.in", "r", stdin);
    freopen("problem.out", "w", stdout);
    
    int n, m;
    cin >> n >> m;
    cout << n + m << endl;
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`,
        explanation: 'NOIP竞赛的标准文件输入输出模板。',
      },
      {
        title: '条件编译调试',
        code: `#include <iostream>
using namespace std;

int main() {
    #ifdef LOCAL
    freopen("input.txt", "r", stdin);
    #endif
    
    int n;
    cin >> n;
    cout << n << endl;
    
    return 0;
}
// 编译时定义LOCAL: g++ -DLOCAL main.cpp`,
        explanation: '使用条件编译在本地调试和提交时切换。',
      },
    ],
    keyPoints: [
      'NOIP必须使用文件输入输出',
      'freopen最简单常用',
      '文件名按题目要求',
      '记得关闭文件',
    ],
    commonMistakes: [
      '文件名拼写错误',
      '忘记写freopen',
      '输入输出文件名写反',
      '本地测试没有注释freopen',
    ],
    tips: [
      '建立标准模板，每次复制',
      '本地调试可用条件编译',
      '比赛时检查文件名',
      'fclose可以省略，但养成好习惯',
    ],
    relatedProblems: [1, 19, 20],
  },

  // ========== Day 36-70: 进阶提升知识点 ==========
  'dfs-intro': {
    id: 'dfs-intro',
    title: 'DFS入门',
    content: `## 深度优先搜索(DFS)入门

深度优先搜索是一种暴力搜索策略，沿着一条路走到底，再回溯尝试其他路径。

### 基本思想

DFS使用递归实现，核心是"走不通就回头"：
1. 从起点开始探索
2. 每次选择一个方向前进
3. 走到终点或无路可走时回溯
4. 尝试其他方向

### 基本模板

\`\`\`cpp
void dfs(int step) {
    // 递归边界（结束条件）
    if (step == n) {
        // 处理答案
        return;
    }
    
    // 尝试所有可能的选择
    for (int i = 0; i < n; i++) {
        if (!used[i]) {  // 如果这个选择还没用过
            used[i] = true;
            // 做选择
            dfs(step + 1);  // 递归下一层
            used[i] = false;  // 撤销选择（回溯）
        }
    }
}
\`\`\`

### 方向数组

在网格图中移动：

\`\`\`cpp
// 四个方向：上右下左
int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

// 八个方向
int dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};
int dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};

void dfs(int x, int y) {
    vis[x][y] = true;
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i];
        int ny = y + dy[i];
        if (valid(nx, ny) && !vis[nx][ny]) {
            dfs(nx, ny);
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '全排列生成',
        code: `int n;
int path[10];
bool used[10];

void dfs(int step) {
    if (step == n) {
        for (int i = 0; i < n; i++) {
            cout << path[i] << " ";
        }
        cout << endl;
        return;
    }
    
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            path[step] = i;
            dfs(step + 1);
            used[i] = false;
        }
    }
}`,
        explanation: '经典的DFS全排列生成问题。',
      },
      {
        title: '迷宫搜索',
        code: `char maze[100][100];
bool vis[100][100];
int n, m;
int sx, sy, ex, ey;  // 起点和终点

int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

bool dfs(int x, int y) {
    if (x == ex && y == ey) return true;
    
    vis[x][y] = true;
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i];
        int ny = y + dy[i];
        if (nx >= 0 && nx < n && ny >= 0 && ny < m 
            && !vis[nx][ny] && maze[nx][ny] != '#') {
            if (dfs(nx, ny)) return true;
        }
    }
    return false;
}`,
        explanation: 'DFS解决迷宫问题，判断是否能到达终点。',
      },
    ],
    keyPoints: [
      '理解递归和回溯的概念',
      '掌握基本DFS模板',
      '学会使用方向数组',
      '注意标记数组的使用',
    ],
    commonMistakes: [
      '忘记回溯时撤销标记',
      '递归边界条件写错',
      '数组越界',
      '没有剪枝导致超时',
    ],
    tips: [
      '先画出搜索树理解过程',
      '注意参数的含义',
      '学会调试递归程序',
      '考虑是否需要剪枝',
    ],
    relatedProblems: [65, 66],
  },

  'dfs-impl': {
    id: 'dfs-impl',
    title: 'DFS实现技巧',
    content: `## DFS实现技巧

### 参数设计

DFS函数的参数决定了搜索的状态，需要仔细设计：

\`\`\`cpp
// 最少参数
void dfs(int step)  // 当前步骤

// 常见参数
void dfs(int x, int y)  // 当前位置
void dfs(int x, int y, int step)  // 位置+步数
void dfs(int x, int y, int step, int sum)  // 再加上累计值

// 状态压缩参数
void dfs(int x, int y, int state)  // state用二进制表示已访问的点
\`\`\`

### 回溯要点

\`\`\`cpp
void dfs(int step) {
    if (结束条件) {
        更新答案;
        return;
    }
    
    for (所有选择) {
        if (选择可行) {
            做标记;
            做选择;
            dfs(step + 1);
            撤销选择;  // 回溯
            撤销标记;
        }
    }
}
\`\`\`

### 剪枝优化

1. **可行性剪枝**：当前状态已经不可能到达目标
2. **最优性剪枝**：当前路径已经不可能比已知最优解更好
3. **重复状态剪枝**：相同状态只搜索一次

\`\`\`cpp
void dfs(int step, int sum) {
    if (sum >= ans) return;  // 最优性剪枝
    if (step == n) {
        ans = min(ans, sum);
        return;
    }
    // ...
}
\`\`\``,
    codeExamples: [
      {
        title: 'N皇后问题',
        code: `int n;
int queen[15];  // queen[i]表示第i行皇后放在第几列
int ans = 0;

bool check(int row, int col) {
    for (int i = 0; i < row; i++) {
        // 同列或对角线冲突
        if (queen[i] == col || 
            abs(row - i) == abs(col - queen[i])) {
            return false;
        }
    }
    return true;
}

void dfs(int row) {
    if (row == n) {
        ans++;
        return;
    }
    
    for (int col = 0; col < n; col++) {
        if (check(row, col)) {
            queen[row] = col;
            dfs(row + 1);
        }
    }
}`,
        explanation: '经典的N皇后问题，使用DFS+剪枝。',
      },
    ],
    keyPoints: [
      '合理设计函数参数',
      '正确处理回溯',
      '灵活运用剪枝',
      '注意边界条件',
    ],
    commonMistakes: [
      '参数遗漏导致状态不完整',
      '回溯不彻底',
      '剪枝条件写错',
      '全局变量冲突',
    ],
    tips: [
      '画图理解搜索过程',
      '先写出正确版本再优化',
      '善用调试输出',
      '分析时间复杂度',
    ],
    relatedProblems: [66, 67],
  },

  'bfs-intro': {
    id: 'bfs-intro',
    title: 'BFS入门',
    content: `## 广度优先搜索(BFS)入门

BFS使用队列实现，逐层扩展，适合求最短路问题。

### 基本思想

1. 从起点开始，加入队列
2. 每次取出队首，扩展其相邻节点
3. 新节点加入队尾
4. 重复直到队列为空

### 基本模板

\`\`\`cpp
#include <queue>
using namespace std;

queue<int> q;
bool vis[100];

void bfs(int start) {
    q.push(start);
    vis[start] = true;
    
    while (!q.empty()) {
        int cur = q.front();
        q.pop();
        
        // 处理当前节点
        
        for (每个相邻节点next) {
            if (!vis[next]) {
                vis[next] = true;
                q.push(next);
            }
        }
    }
}
\`\`\`

### BFS vs DFS

| 特点 | BFS | DFS |
|------|-----|-----|
| 数据结构 | 队列 | 栈（递归） |
| 空间复杂度 | O(宽度) | O(深度) |
| 最短路 | 天然支持 | 需要额外处理 |
| 实现难度 | 较简单 | 递归易出错 |
| 适用场景 | 最短路、层序 | 路径搜索、排列组合 |`,
    codeExamples: [
      {
        title: '迷宫最短路',
        code: `char maze[100][100];
int dist[100][100];
int n, m;
int sx, sy, ex, ey;

int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

int bfs() {
    queue<pair<int,int>> q;
    memset(dist, -1, sizeof(dist));
    
    q.push({sx, sy});
    dist[sx][sy] = 0;
    
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        
        if (x == ex && y == ey) {
            return dist[x][y];
        }
        
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m 
                && dist[nx][ny] == -1 && maze[nx][ny] != '#') {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    return -1;  // 无法到达
}`,
        explanation: 'BFS求迷宫最短路径长度。',
      },
    ],
    keyPoints: [
      'BFS使用队列实现',
      '标记数组防止重复访问',
      '天然求最短路',
      '注意队列的操作顺序',
    ],
    commonMistakes: [
      '忘记标记起点',
      '队列操作顺序错误',
      '数组越界',
      '混用DFS和BFS',
    ],
    tips: [
      'BFS适合求最短路',
      '注意记录距离或路径',
      '可以双向BFS优化',
      '状态可以不止一个维度',
    ],
    relatedProblems: [68, 69],
  },

  // ========== Day 41-70: 进阶知识点 ==========
  'linear-dp': {
    id: 'linear-dp',
    title: '线性DP',
    content: `## 线性动态规划

线性DP是最基础的DP类型，状态沿着一个维度线性递推。

### 基本模式

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = ... ) {  // 枚举与i相关的状态
        dp[i] = 最优值(dp[j]...);
    }
}
\`\`\`

### 最长上升子序列(LIS)

\`\`\`cpp
// O(n²)解法
int dp[MAXN];  // dp[i]表示以i结尾的LIS长度
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i]) {
            dp[i] = max(dp[i], dp[j] + 1);
        }
    }
}

// O(n log n)解法：二分优化
vector<int> d;
for (int i = 0; i < n; i++) {
    int pos = lower_bound(d.begin(), d.end(), a[i]) - d.begin();
    if (pos == d.size()) d.push_back(a[i]);
    else d[pos] = a[i];
}
// LIS长度 = d.size()
\`\`\`

### 最长公共子序列(LCS)

\`\`\`cpp
int dp[MAXN][MAXN];
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        if (s1[i] == s2[j]) {
            dp[i][j] = dp[i-1][j-1] + 1;
        } else {
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '最长下降子序列',
        code: `int dp[MAXN];
int ans = 0;
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++) {
        if (a[j] > a[i]) {  // 下降
            dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    ans = max(ans, dp[i]);
}`,
        explanation: '修改比较符号即可求最长下降子序列。',
      },
    ],
    keyPoints: [
      '状态定义要清晰',
      '转移方程要完整',
      '注意边界条件',
      '学会二分优化',
    ],
    commonMistakes: [
      '状态定义不明确',
      '转移遗漏情况',
      '边界处理错误',
      '数组越界',
    ],
    tips: [
      '从简单例子入手',
      '画表格帮助理解',
      '注意数据范围',
      '学会空间优化',
    ],
    relatedProblems: [73, 74],
  },

  '01-knapsack': {
    id: '01-knapsack',
    title: '01背包问题',
    content: `## 01背包问题

有N件物品和一个容量为V的背包，每件物品只能用一次，求最大价值。

### 状态定义

dp[i][j] = 前i件物品放入容量为j的背包的最大价值

### 状态转移

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = 0; j <= V; j++) {
        dp[i][j] = dp[i-1][j];  // 不选第i件
        if (j >= w[i]) {
            dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
        }
    }
}
\`\`\`

### 空间优化（一维）

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = V; j >= w[i]; j--) {  // 逆序枚举！
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
    }
}
\`\`\`

**为什么逆序？**
- 正序会导致一件物品被选多次（变成完全背包）
- 逆序保证dp[j-w[i]]用的是上一层的状态`,
    codeExamples: [
      {
        title: '01背包模板',
        code: `int n, V;
int w[105], v[105];
int dp[1005];

int main() {
    cin >> n >> V;
    for (int i = 1; i <= n; i++) {
        cin >> w[i] >> v[i];
    }
    
    for (int i = 1; i <= n; i++) {
        for (int j = V; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
        }
    }
    
    cout << dp[V] << endl;
    return 0;
}`,
        explanation: '标准的01背包空间优化实现。',
      },
    ],
    keyPoints: [
      '理解状态含义',
      '掌握转移方程',
      '注意枚举顺序',
      '学会空间优化',
    ],
    commonMistakes: [
      '空间优化时正序枚举',
      '忘记判断容量是否足够',
      '数组开太小',
      '初始化错误',
    ],
    tips: [
      '先写二维版本理解',
      '再优化到一维',
      '注意初始化的影响',
      '可以记录方案',
    ],
    relatedProblems: [75, 76],
  },

  'complete-knapsack': {
    id: 'complete-knapsack',
    title: '完全背包问题',
    content: `## 完全背包问题

每件物品可以使用无限次。

### 与01背包的区别

只需将内层循环改为**正序**：

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = w[i]; j <= V; j++) {  // 正序枚举
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
    }
}
\`\`\`

### 为什么正序？

正序时，dp[j-w[i]]可能已经包含了第i件物品，实现了重复选取。`,
    codeExamples: [
      {
        title: '完全背包模板',
        code: `int n, V;
int w[105], v[105];
int dp[1005];

int main() {
    cin >> n >> V;
    for (int i = 1; i <= n; i++) {
        cin >> w[i] >> v[i];
    }
    
    for (int i = 1; i <= n; i++) {
        for (int j = w[i]; j <= V; j++) {  // 正序！
            dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
        }
    }
    
    cout << dp[V] << endl;
    return 0;
}`,
        explanation: '完全背包只需将01背包的逆序改为正序。',
      },
    ],
    keyPoints: [
      '与01背包的对比',
      '正序枚举的原因',
      '掌握基本模板',
    ],
    commonMistakes: [
      '混淆01背包和完全背包',
      '枚举顺序错误',
    ],
    tips: [
      '记住：01背包逆序，完全背包正序',
      '可以和01背包对比记忆',
    ],
    relatedProblems: [77, 78],
  },

  'interval-dp': {
    id: 'interval-dp',
    title: '区间DP',
    content: `## 区间动态规划

区间DP是在区间上进行状态转移，通常用于解决区间合并类问题。

### 基本思想

dp[l][r]表示区间[l,r]上的最优解，通过合并子区间得到答案。

### 枚举顺序

**关键**：先枚举区间长度，再枚举左端点

\`\`\`cpp
for (int len = 1; len <= n; len++) {      // 区间长度
    for (int l = 1; l + len - 1 <= n; l++) { // 左端点
        int r = l + len - 1;               // 右端点
        for (int k = l; k < r; k++) {      // 分割点
            dp[l][r] = 最优(dp[l][k], dp[k+1][r]);
        }
    }
}
\`\`\`

### 石子合并问题

\`\`\`cpp
// dp[l][r] = 合并[l,r]区间石子的最小代价
// sum[l][r] = 区间石子总重量

for (int len = 2; len <= n; len++) {
    for (int l = 1; l + len - 1 <= n; l++) {
        int r = l + len - 1;
        dp[l][r] = INF;
        for (int k = l; k < r; k++) {
            dp[l][r] = min(dp[l][r], 
                dp[l][k] + dp[k+1][r] + sum[l][r]);
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '矩阵链乘',
        code: `int n;
int p[105];  // 矩阵维度
int dp[105][105];

int main() {
    cin >> n;
    for (int i = 0; i <= n; i++) cin >> p[i];
    
    for (int len = 2; len <= n; len++) {
        for (int l = 1; l + len - 1 <= n; l++) {
            int r = l + len - 1;
            dp[l][r] = INT_MAX;
            for (int k = l; k < r; k++) {
                dp[l][r] = min(dp[l][r],
                    dp[l][k] + dp[k+1][r] + p[l-1]*p[k]*p[r]);
            }
        }
    }
    
    cout << dp[1][n] << endl;
    return 0;
}`,
        explanation: '经典区间DP问题：矩阵链乘。',
      },
    ],
    keyPoints: [
      '正确枚举区间长度',
      '理解分割点的作用',
      '注意初始化',
    ],
    commonMistakes: [
      '枚举顺序错误',
      '边界处理不当',
      '忘记初始化',
    ],
    tips: [
      '先枚举长度，再枚举起点',
      '画图理解合并过程',
      '注意INF的设置',
    ],
    relatedProblems: [79, 80],
  },

  'dsu-intro': {
    id: 'dsu-intro',
    title: '并查集',
    content: `## 并查集

并查集是一种用于管理元素分组的数据结构，支持两种操作：
- 合并(Union)：合并两个集合
- 查找(Find)：查找元素所属集合

### 基本实现

\`\`\`cpp
int parent[MAXN];

void init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;  // 初始时每个元素的父节点是自己
    }
}

int find(int x) {
    if (parent[x] == x) return x;
    return find(parent[x]);  // 递归查找根节点
}

void unite(int x, int y) {
    int px = find(x);
    int py = find(y);
    if (px != py) {
        parent[px] = py;  // 将x的根连到y的根
    }
}

bool same(int x, int y) {
    return find(x) == find(y);
}
\`\`\`

### 路径压缩

\`\`\`cpp
int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);  // 路径压缩
}
\`\`\`

查找时直接将节点连到根节点，大幅提高效率。`,
    codeExamples: [
      {
        title: '并查集模板',
        code: `int parent[MAXN];

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

void unite(int x, int y) {
    parent[find(x)] = find(y);
}

int main() {
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
    return 0;
}`,
        explanation: '标准并查集模板，支持合并和查询操作。',
      },
    ],
    keyPoints: [
      '理解树形结构',
      '掌握路径压缩',
      '了解按秩合并',
    ],
    commonMistakes: [
      '忘记初始化',
      '路径压缩写错',
      '合并方向错误',
    ],
    tips: [
      '路径压缩是关键优化',
      '可以结合按秩合并',
      '注意判断连通性',
    ],
    relatedProblems: [89, 90],
  },

  'dijkstra': {
    id: 'dijkstra',
    title: 'Dijkstra算法',
    content: `## Dijkstra算法

用于求单源最短路径，适用于非负权图。

### 算法思想

每次选择距离起点最近的未访问节点，更新其邻居的距离。

### 堆优化实现

\`\`\`cpp
#include <queue>
#include <vector>

struct Edge {
    int to, weight;
};

vector<Edge> adj[MAXN];
int dist[MAXN];

void dijkstra(int start) {
    memset(dist, 0x3f, sizeof(dist));
    dist[start] = 0;
    
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;  // 已更新过
        
        for (auto& e : adj[u]) {
            if (dist[e.to] > dist[u] + e.weight) {
                dist[e.to] = dist[u] + e.weight;
                pq.push({dist[e.to], e.to});
            }
        }
    }
}
\`\`\`

### 时间复杂度

- 朴素实现：O(V²)
- 堆优化：O((V+E) log V)`,
    codeExamples: [
      {
        title: 'Dijkstra完整实现',
        code: `int n, m, s;
vector<pair<int,int>> adj[100005];
int dist[100005];

int main() {
    cin >> n >> m >> s;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    memset(dist, 0x3f, sizeof(dist));
    dist[s] = 0;
    
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    pq.push({0, s});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, w] : adj[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        cout << dist[i] << " ";
    }
    return 0;
}`,
        explanation: 'Dijkstra算法求单源最短路。',
      },
    ],
    keyPoints: [
      '理解贪心策略',
      '掌握堆优化实现',
      '注意处理重复访问',
    ],
    commonMistakes: [
      '忘记判断重复访问',
      '优先队列比较器错误',
      '不能处理负权边',
    ],
    tips: [
      '使用小顶堆',
      '注意松弛操作',
      '负权边用SPFA',
    ],
    relatedProblems: [86, 87],
  },

  'floyd': {
    id: 'floyd',
    title: 'Floyd算法',
    content: `## Floyd算法

用于求多源最短路径，可以处理负权边（但不能有负环）。

### 算法思想

枚举中间点k，尝试通过k来更新任意两点间的距离。

### 实现

\`\`\`cpp
int dist[MAXN][MAXN];

void floyd(int n) {
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}

// 初始化
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
        if (i == j) dist[i][j] = 0;
        else dist[i][j] = INF;
    }
}
\`\`\`

### 时间复杂度

O(V³)，适合小规模稠密图。`,
    codeExamples: [
      {
        title: 'Floyd完整实现',
        code: `int n, m;
int dist[505][505];
const int INF = 1e9;

int main() {
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (i == j) dist[i][j] = 0;
            else dist[i][j] = INF;
        }
    }
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v], w);  // 重边取最小
    }
    
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    // 输出任意两点间最短路
    return 0;
}`,
        explanation: 'Floyd算法求多源最短路。',
      },
    ],
    keyPoints: [
      'k必须在最外层',
      '注意初始化',
      '能处理负权边',
    ],
    commonMistakes: [
      '循环顺序错误',
      '初始化错误',
      '溢出问题',
    ],
    tips: [
      'k在中间层是关键',
      '适合n较小的图',
      '可以判断负环',
    ],
    relatedProblems: [87, 88],
  },

  'mst-intro': {
    id: 'mst-intro',
    title: '最小生成树',
    content: `## 最小生成树

在一个连通图中，选取n-1条边连接所有n个顶点，且边权和最小。

### Kruskal算法

按边权排序，贪心选择不形成环的边。

\`\`\`cpp
struct Edge {
    int u, v, w;
    bool operator<(const Edge& e) const {
        return w < e.w;
    }
};

int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    init(n);  // 初始化并查集
    
    int sum = 0, cnt = 0;
    for (auto& e : edges) {
        if (!same(e.u, e.v)) {
            unite(e.u, e.v);
            sum += e.w;
            cnt++;
            if (cnt == n - 1) break;
        }
    }
    return cnt == n - 1 ? sum : -1;  // -1表示图不连通
}
\`\`\`

### Prim算法

从任意点开始，每次选择连接已选和未选顶点的最小边。

\`\`\`cpp
int prim(int n) {
    int sum = 0;
    vector<int> dist(n + 1, INF);
    vector<bool> vis(n + 1, false);
    dist[1] = 0;
    
    for (int i = 0; i < n; i++) {
        int u = -1;
        for (int j = 1; j <= n; j++) {
            if (!vis[j] && (u == -1 || dist[j] < dist[u])) {
                u = j;
            }
        }
        if (u == -1) break;
        vis[u] = true;
        sum += dist[u];
        
        for (auto& [v, w] : adj[u]) {
            if (!vis[v]) dist[v] = min(dist[v], w);
        }
    }
    return sum;
}
\`\`\``,
    codeExamples: [
      {
        title: 'Kruskal模板',
        code: `struct Edge {
    int u, v, w;
    bool operator<(const Edge& e) const { return w < e.w; }
};

int parent[5005];

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }
    
    for (int i = 1; i <= n; i++) parent[i] = i;
    sort(edges.begin(), edges.end());
    
    int sum = 0, cnt = 0;
    for (auto& e : edges) {
        int pu = find(e.u), pv = find(e.v);
        if (pu != pv) {
            parent[pu] = pv;
            sum += e.w;
            cnt++;
        }
    }
    
    if (cnt == n - 1) cout << sum << endl;
    else cout << "orz" << endl;
    return 0;
}`,
        explanation: 'Kruskal算法求最小生成树。',
      },
    ],
    keyPoints: [
      '理解贪心策略',
      'Kruskal需要并查集',
      'Prim适合稠密图',
    ],
    commonMistakes: [
      '忘记排序',
      '并查集写错',
      '判断连通性',
    ],
    tips: [
      'Kruskal适合稀疏图',
      'Prim适合稠密图',
      '堆优化Prim更好',
    ],
    relatedProblems: [91, 92],
  },

  'segtree-intro': {
    id: 'segtree-intro',
    title: '线段树入门',
    content: `## 线段树

线段树是一种支持区间查询和修改的数据结构。

### 结构特点

- 完全二叉树结构
- 每个节点代表一个区间
- 叶节点代表单个元素
- 时间复杂度：O(log n)

### 数组存储

\`\`\`cpp
// 节点i的左孩子是2i，右孩子是2i+1
// 根节点是1
int tree[4 * MAXN];  // 数组大小开4倍
int a[MAXN];         // 原数组
\`\`\`

### 建树

\`\`\`cpp
void build(int node, int l, int r) {
    if (l == r) {
        tree[node] = a[l];
        return;
    }
    int mid = (l + r) / 2;
    build(2 * node, l, mid);
    build(2 * node + 1, mid + 1, r);
    tree[node] = tree[2 * node] + tree[2 * node + 1];  // 区间和
}
\`\`\`

### 单点更新

\`\`\`cpp
void update(int node, int l, int r, int pos, int val) {
    if (l == r) {
        tree[node] = val;
        return;
    }
    int mid = (l + r) / 2;
    if (pos <= mid) update(2 * node, l, mid, pos, val);
    else update(2 * node + 1, mid + 1, r, pos, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}
\`\`\`

### 区间查询

\`\`\`cpp
int query(int node, int l, int r, int ql, int qr) {
    if (ql > r || qr < l) return 0;  // 完全不相交
    if (ql <= l && r <= qr) return tree[node];  // 完全包含
    int mid = (l + r) / 2;
    return query(2 * node, l, mid, ql, qr) +
           query(2 * node + 1, mid + 1, r, ql, qr);
}
\`\`\``,
    codeExamples: [
      {
        title: '线段树模板',
        code: `int tree[4 * MAXN];

void build(int node, int l, int r, int a[]) {
    if (l == r) {
        tree[node] = a[l];
        return;
    }
    int mid = (l + r) / 2;
    build(2*node, l, mid, a);
    build(2*node+1, mid+1, r, a);
    tree[node] = tree[2*node] + tree[2*node+1];
}

void update(int node, int l, int r, int pos, int val) {
    if (l == r) {
        tree[node] = val;
        return;
    }
    int mid = (l + r) / 2;
    if (pos <= mid) update(2*node, l, mid, pos, val);
    else update(2*node+1, mid+1, r, pos, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}

int query(int node, int l, int r, int ql, int qr) {
    if (ql > r || qr < l) return 0;
    if (ql <= l && r <= qr) return tree[node];
    int mid = (l + r) / 2;
    return query(2*node, l, mid, ql, qr) + 
           query(2*node+1, mid+1, r, ql, qr);
}`,
        explanation: '线段树基础模板：支持单点修改和区间查询。',
      },
    ],
    keyPoints: [
      '理解树形结构',
      '掌握递归操作',
      '注意数组大小',
    ],
    commonMistakes: [
      '数组开太小',
      '边界条件错误',
      '忘记pushUp',
    ],
    tips: [
      '数组开4倍大小',
      '画图理解结构',
      '注意懒标记',
    ],
    relatedProblems: [102, 103],
  },

  'trie-intro': {
    id: 'trie-intro',
    title: 'Trie树',
    content: `## Trie树（字典树）

Trie树是一种用于高效字符串检索的树形结构。

### 结构特点

- 每条边代表一个字符
- 从根到某个节点的路径代表一个字符串
- 查找时间复杂度O(m)，m为字符串长度

### 节点结构

\`\`\`cpp
struct Node {
    int children[26];  // 26个小写字母
    bool isEnd;        // 是否是单词结尾
    Node() {
        memset(children, 0, sizeof(children));
        isEnd = false;
    }
};

vector<Node> trie;
trie.push_back(Node());  // 根节点
\`\`\`

### 插入操作

\`\`\`cpp
void insert(string s) {
    int node = 0;
    for (char c : s) {
        int idx = c - 'a';
        if (trie[node].children[idx] == 0) {
            trie[node].children[idx] = trie.size();
            trie.push_back(Node());
        }
        node = trie[node].children[idx];
    }
    trie[node].isEnd = true;
}
\`\`\`

### 查找操作

\`\`\`cpp
bool search(string s) {
    int node = 0;
    for (char c : s) {
        int idx = c - 'a';
        if (trie[node].children[idx] == 0) return false;
        node = trie[node].children[idx];
    }
    return trie[node].isEnd;
}
\`\`\``,
    codeExamples: [
      {
        title: 'Trie树模板',
        code: `int trie[100005][26];
bool isEnd[100005];
int cnt = 1;  // 节点计数

void insert(string s) {
    int node = 0;
    for (char c : s) {
        int idx = c - 'a';
        if (!trie[node][idx]) {
            trie[node][idx] = cnt++;
        }
        node = trie[node][idx];
    }
    isEnd[node] = true;
}

bool search(string s) {
    int node = 0;
    for (char c : s) {
        int idx = c - 'a';
        if (!trie[node][idx]) return false;
        node = trie[node][idx];
    }
    return isEnd[node];
}`,
        explanation: '使用数组实现的Trie树模板。',
      },
    ],
    keyPoints: [
      '理解树形结构',
      '掌握插入和查找',
      '注意空间复杂度',
    ],
    commonMistakes: [
      '节点编号错误',
      '忘记标记单词结尾',
      '数组开太小',
    ],
    tips: [
      '数组实现更高效',
      '注意字符范围',
      '可以支持前缀查询',
    ],
    relatedProblems: [107, 108],
  },

  'graph-intro': {
    id: 'graph-intro',
    title: '图论基础',
    content: `## 图的基本概念

### 图的定义

图由顶点集V和边集E组成，记作G=(V,E)。

### 图的类型

- **无向图**：边没有方向
- **有向图**：边有方向
- **带权图**：边上有权值
- **简单图**：无自环和重边

### 图的存储

**邻接矩阵**：
\`\`\`cpp
int adj[MAXN][MAXN];
// adj[u][v] = w 表示u到v有一条权值为w的边
// 空间复杂度O(V²)
\`\`\`

**邻接表**（推荐）：
\`\`\`cpp
struct Edge {
    int to, weight;
};
vector<Edge> adj[MAXN];
// adj[u]存储从u出发的所有边
// 空间复杂度O(V+E)

// 添加边
adj[u].push_back({v, w});
\`\`\`

### 图的遍历

\`\`\`cpp
bool vis[MAXN];

void dfs(int u) {
    vis[u] = true;
    for (auto& e : adj[u]) {
        if (!vis[e.to]) {
            dfs(e.to);
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '邻接表存储图',
        code: `int n, m;
vector<int> adj[100005];

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);  // 无向图
    }
    
    // 遍历节点u的所有邻居
    for (int v : adj[u]) {
        cout << v << " ";
    }
    return 0;
}`,
        explanation: '使用邻接表存储无向图。',
      },
    ],
    keyPoints: [
      '理解图的基本概念',
      '掌握邻接表存储',
      '学会图的遍历',
    ],
    commonMistakes: [
      '混淆有向图和无向图',
      '忘记标记访问',
      '数组越界',
    ],
    tips: [
      '竞赛中优先用邻接表',
      '注意边的方向',
      '大图用BFS避免栈溢出',
    ],
    relatedProblems: [81, 82],
  },

  'tree-intro': {
    id: 'tree-intro',
    title: '树的基础',
    content: `## 树的基本概念

### 树的定义

树是一种特殊的图：无环、连通的无向图。

### 树的特点

- 有n个顶点的树有n-1条边
- 任意两点间有且仅有一条路径
- 去掉任意一条边，图不再连通
- 加上任意一条边，会出现环

### 特殊概念

- **根节点**：树的顶端节点
- **叶子节点**：没有子节点的节点
- **深度**：从根到节点的边数
- **高度**：从节点到最远叶子的边数

### 树的存储

\`\`\`cpp
vector<int> tree[MAXN];  // 存储每个节点的孩子

// 或者存储父节点
int parent[MAXN];

// 二叉树
struct Node {
    int left, right;
    int val;
};
\`\`\`

### 树的遍历

\`\`\`cpp
void dfs(int u, int fa) {
    // 处理节点u
    for (int v : tree[u]) {
        if (v != fa) {  // 避免回到父节点
            dfs(v, u);
        }
    }
}

// 调用
dfs(root, -1);
\`\`\``,
    codeExamples: [
      {
        title: '求树的深度',
        code: `int getDepth(int u, int fa) {
    int depth = 0;
    for (int v : tree[u]) {
        if (v != fa) {
            depth = max(depth, getDepth(v, u) + 1);
        }
    }
    return depth;
}`,
        explanation: '递归求树的深度。',
      },
    ],
    keyPoints: [
      '理解树的特点',
      '掌握树的存储',
      '学会树的遍历',
    ],
    commonMistakes: [
      '忘记避免回到父节点',
      '混淆深度和高度',
      '边界处理错误',
    ],
    tips: [
      '画图理解树结构',
      '注意根节点的选择',
      '可以用BFS求深度',
    ],
    relatedProblems: [82, 83],
  },

  'bitmask-dp': {
    id: 'bitmask-dp',
    title: '状态压缩DP',
    content: `## 状态压缩DP

当状态可以用集合表示时，用二进制数压缩存储。

### 位运算基础

\`\`\`cpp
int s = 0;         // 空集合
s |= (1 << i);     // 将第i个元素加入集合
s &= ~(1 << i);    // 将第i个元素移出集合
s & (1 << i);      // 检查第i个元素是否在集合中
s = s & (s - 1);   // 去掉最低位的1
__builtin_popcount(s);  // 集合中1的个数
\`\`\`

### 经典问题：旅行商问题

\`\`\`cpp
// dp[s][i] = 经过集合s中的城市，最后在城市i的最短距离
int dp[1 << n][n];

int tsp() {
    memset(dp, 0x3f, sizeof(dp));
    dp[1][0] = 0;  // 从城市0出发
    
    for (int s = 1; s < (1 << n); s++) {
        for (int i = 0; i < n; i++) {
            if (!(s & (1 << i))) continue;
            for (int j = 0; j < n; j++) {
                if (s & (1 << j)) continue;
                int ns = s | (1 << j);
                dp[ns][j] = min(dp[ns][j], dp[s][i] + dist[i][j]);
            }
        }
    }
    
    int ans = INF;
    for (int i = 1; i < n; i++) {
        ans = min(ans, dp[(1 << n) - 1][i] + dist[i][0]);
    }
    return ans;
}
\`\`\``,
    codeExamples: [
      {
        title: '状压DP模板',
        code: `int n;
int dp[1 << 20][20];

int solve() {
    memset(dp, 0x3f, sizeof(dp));
    dp[1][0] = 0;  // 初始状态
    
    for (int s = 1; s < (1 << n); s++) {
        for (int i = 0; i < n; i++) {
            if (!(s & (1 << i))) continue;
            // 枚举从状态s、位置i能转移到的状态
            for (int j = 0; j < n; j++) {
                if (s & (1 << j)) continue;
                int ns = s | (1 << j);
                dp[ns][j] = min(dp[ns][j], dp[s][i] + cost[i][j]);
            }
        }
    }
    
    return dp[(1 << n) - 1][n - 1];
}`,
        explanation: '状态压缩DP的基本模板。',
      },
    ],
    keyPoints: [
      '掌握位运算',
      '理解状态压缩',
      '正确枚举状态',
    ],
    commonMistakes: [
      '位运算写错',
      '状态转移遗漏',
      '数组越界',
    ],
    tips: [
      '先确定状态含义',
      '注意枚举顺序',
      '空间可能很大',
    ],
    relatedProblems: [93, 94],
  },

  'lazy-tag': {
    id: 'lazy-tag',
    title: '懒标记',
    content: `## 懒标记（Lazy Tag）

用于线段树的区间修改，延迟下推操作。

### 基本思想

- 区间修改时，不立即更新所有子节点
- 只更新当前节点，并记录懒标记
- 需要访问子节点时，再下推懒标记

### 实现

\`\`\`cpp
int tree[4 * MAXN];
int lazy[4 * MAXN];  // 懒标记

void pushDown(int node, int l, int r) {
    if (lazy[node] != 0) {
        int mid = (l + r) / 2;
        // 下推给左孩子
        tree[2 * node] += lazy[node] * (mid - l + 1);
        lazy[2 * node] += lazy[node];
        // 下推给右孩子
        tree[2 * node + 1] += lazy[node] * (r - mid);
        lazy[2 * node + 1] += lazy[node];
        // 清除当前标记
        lazy[node] = 0;
    }
}

void updateRange(int node, int l, int r, int ql, int qr, int val) {
    if (ql > r || qr < l) return;
    if (ql <= l && r <= qr) {
        tree[node] += val * (r - l + 1);
        lazy[node] += val;
        return;
    }
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    updateRange(2 * node, l, mid, ql, qr, val);
    updateRange(2 * node + 1, mid + 1, r, ql, qr, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int queryRange(int node, int l, int r, int ql, int qr) {
    if (ql > r || qr < l) return 0;
    if (ql <= l && r <= qr) return tree[node];
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    return queryRange(2 * node, l, mid, ql, qr) +
           queryRange(2 * node + 1, mid + 1, r, ql, qr);
}
\`\`\``,
    codeExamples: [
      {
        title: '区间修改线段树',
        code: `long long tree[4 * MAXN];
long long lazy[4 * MAXN];

void pushDown(int node, int l, int r) {
    if (lazy[node]) {
        int mid = (l + r) / 2;
        tree[2*node] += lazy[node] * (mid - l + 1);
        tree[2*node+1] += lazy[node] * (r - mid);
        lazy[2*node] += lazy[node];
        lazy[2*node+1] += lazy[node];
        lazy[node] = 0;
    }
}

void update(int node, int l, int r, int ql, int qr, long long val) {
    if (ql <= l && r <= qr) {
        tree[node] += val * (r - l + 1);
        lazy[node] += val;
        return;
    }
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    if (ql <= mid) update(2*node, l, mid, ql, qr, val);
    if (qr > mid) update(2*node+1, mid+1, r, ql, qr, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}`,
        explanation: '带懒标记的区间修改线段树。',
      },
    ],
    keyPoints: [
      '理解延迟下推',
      '正确更新懒标记',
      '查询前要pushDown',
    ],
    commonMistakes: [
      '忘记下推标记',
      '标记叠加错误',
      '忘记清零标记',
    ],
    tips: [
      '画图理解过程',
      '注意乘法的影响',
      '不同操作可能有冲突',
    ],
    relatedProblems: [103, 104],
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

  // ========== Day 1-2: C++基础补充 ==========
  'intro-cpp': {
    id: 'intro-cpp',
    title: 'C++简介',
    content: `## C++语言简介

C++是一种强大的编程语言，在NOIP竞赛中广泛使用。

### 为什么选择C++

1. **执行效率高**：编译型语言，运行速度快
2. **STL强大**：标准模板库提供丰富算法和数据结构
3. **竞赛主流**：NOIP/CSP等竞赛的主流语言

### 程序的基本结构

\`\`\`cpp
#include <iostream>  // 头文件
using namespace std; // 使用标准命名空间

int main() {         // 主函数
    // 你的代码
    return 0;        // 返回值
}
\`\`\``,
    codeExamples: [
      {
        title: '最小C++程序',
        code: `int main() {
    return 0;
}`,
        explanation: '最简单的C++程序，只包含main函数。',
      },
    ],
    keyPoints: ['理解程序的基本结构', '知道头文件的作用', '掌握编译运行流程'],
    commonMistakes: ['忘记分号', 'main函数拼写错误', '中英文符号混淆'],
    tips: ['多练习输入输出', '注意代码规范', '学会看编译错误'],
    relatedProblems: [1],
  },

  'hello-world': {
    id: 'hello-world',
    title: 'Hello World',
    content: `## 第一个程序

经典的入门程序：输出"Hello World"。

### 代码实现

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}
\`\`\`

### 代码解析

- \`#include <iostream>\`：包含输入输出流库
- \`using namespace std;\`：使用标准命名空间
- \`cout\`：标准输出流对象
- \`<<\`：插入运算符
- \`endl\`：换行并刷新缓冲区`,
    codeExamples: [
      {
        title: '输出个人信息',
        code: `cout << "姓名：小明" << endl;
cout << "年龄：12岁" << endl;`,
        explanation: '使用cout输出多行信息。',
      },
    ],
    keyPoints: ['掌握cout的基本用法', '理解endl的作用'],
    commonMistakes: ['忘记#include', '忘记using namespace std'],
    tips: ['endl会刷新缓冲区', '中文需要正确的编码'],
    relatedProblems: [1],
  },

  'variables': {
    id: 'variables',
    title: '变量的概念',
    content: `## 变量

变量是存储数据的容器，每个变量都有名字和类型。

### 变量命名规则

1. 只能包含字母、数字、下划线
2. 必须以字母或下划线开头
3. 不能是C++关键字
4. 区分大小写

### 声明和初始化

\`\`\`cpp
int a;        // 声明
int a = 10;   // 声明并初始化
int a = 10, b = 20;  // 声明多个变量
\`\`\``,
    codeExamples: [
      {
        title: '变量基本操作',
        code: `int a = 10;    // 初始化
a = 20;        // 赋值
int b = a;     // 用a初始化b`,
        explanation: '变量的声明、赋值和使用。',
      },
    ],
    keyPoints: ['理解变量是存储数据的容器', '掌握命名规则'],
    commonMistakes: ['使用关键字作变量名', '变量未初始化就使用'],
    tips: ['变量名要有意义', '初始化是好习惯'],
    relatedProblems: [1, 2],
  },

  'data-types': {
    id: 'data-types',
    title: '基本数据类型',
    content: `## 数据类型

C++提供了多种数据类型来存储不同类型的数据。

### 整数类型

| 类型 | 字节 | 范围 |
|------|------|------|
| int | 4 | -2.1×10⁹ ~ 2.1×10⁹ |
| long long | 8 | -9.2×10¹⁸ ~ 9.2×10¹⁸ |

### 浮点类型

| 类型 | 字节 | 精度 |
|------|------|------|
| float | 4 | 6-7位有效数字 |
| double | 8 | 15-16位有效数字 |`,
    codeExamples: [
      {
        title: '数据类型使用',
        code: `int a = 100000;
long long b = 10000000000LL;  // 注意LL后缀
double c = 3.14159;`,
        explanation: '不同数据类型的声明和初始化。',
      },
    ],
    keyPoints: ['了解各类型的范围', '选择合适的类型'],
    commonMistakes: ['int溢出', '浮点精度问题'],
    tips: ['大数用long long', '浮点用double'],
    relatedProblems: [1, 2, 3],
  },

  'int-range': {
    id: 'int-range',
    title: '整数范围',
    content: `## 整数范围详解

理解整数范围对于竞赛编程至关重要！

### 各类型的范围

\`\`\`cpp
// int 范围
int max_int = 2147483647;      // 约 2.1×10⁹

// long long 范围
long long max_ll = 9223372036854775807LL;  // 约 9.2×10¹⁸
\`\`\`

### 溢出问题

\`\`\`cpp
int a = 2147483647;
a = a + 1;  // 溢出！变成 -2147483648

// 正确做法
long long b = 2147483647LL;
b = b + 1;  // 正确：2147483648
\`\`\``,
    codeExamples: [
      {
        title: '防止溢出',
        code: `long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
        explanation: '阶乘结果很大，必须用long long。',
      },
    ],
    keyPoints: ['记住int范围约21亿', '知道何时用long long'],
    commonMistakes: ['忘记用long long', '乘法溢出'],
    tips: ['不确定就用long long', '学会估算范围'],
    relatedProblems: [2, 3],
  },

  'arithmetic': {
    id: 'arithmetic',
    title: '算术运算符',
    content: `## 算术运算符

### 基本运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| + | 加法 | 3 + 2 = 5 |
| - | 减法 | 5 - 3 = 2 |
| * | 乘法 | 4 * 3 = 12 |
| / | 除法 | 7 / 2 = 3 |
| % | 取余 | 7 % 2 = 1 |

### 整数除法

\`\`\`cpp
int a = 7 / 2;    // 结果是3，不是3.5
double c = 7.0 / 2;  // 3.5
\`\`\``,
    codeExamples: [
      {
        title: '数字分离',
        code: `int n = 12345;
int ge = n % 10;        // 5 (个位)
int shi = n / 10 % 10;  // 4 (十位)`,
        explanation: '使用除法和取余分离数字各位。',
      },
    ],
    keyPoints: ['掌握五种运算符', '理解整数除法'],
    commonMistakes: ['整数除法丢失精度', '除数为0'],
    tips: ['取余有很多妙用', '注意运算优先级'],
    relatedProblems: [4, 22],
  },

  'if-else': {
    id: 'if-else',
    title: 'if-else语句',
    content: `## 条件语句

根据条件执行不同的代码。

### 基本语法

\`\`\`cpp
if (条件) {
    // 条件为真时执行
} else {
    // 条件为假时执行
}
\`\`\`

### 比较运算符

| 运算符 | 说明 |
|--------|------|
| == | 等于 |
| != | 不等于 |
| < | 小于 |
| > | 大于 |`,
    codeExamples: [
      {
        title: '判断成绩等级',
        code: `if (score >= 90) {
    cout << "优秀" << endl;
} else if (score >= 60) {
    cout << "及格" << endl;
} else {
    cout << "不及格" << endl;
}`,
        explanation: '多分支条件判断。',
      },
    ],
    keyPoints: ['掌握if-else语法', '理解比较运算符'],
    commonMistakes: ['==写成=', '忘记花括号'],
    tips: ['善用else if', '注意条件顺序'],
    relatedProblems: [24, 25],
  },

  'comparison': {
    id: 'comparison',
    title: '比较运算符',
    content: `## 比较运算符详解

比较运算符用于比较两个值，返回布尔结果。

### 运算符列表

| 运算符 | 含义 | 示例 | 结果 |
|--------|------|------|------|
| == | 等于 | 5 == 5 | true |
| != | 不等于 | 5 != 3 | true |
| < | 小于 | 3 < 5 | true |
| > | 大于 | 5 > 3 | true |

### 常见错误

\`\`\`cpp
// 错误：把==写成=
if (a = 5) { }  // 这是赋值！永远为真

// 正确
if (a == 5) { }
\`\`\``,
    codeExamples: [
      {
        title: '比较三个数大小',
        code: `int max_val = a;
if (b > max_val) max_val = b;
if (c > max_val) max_val = c;`,
        explanation: '比较求最大值。',
      },
    ],
    keyPoints: ['区分=和==', '理解比较结果为布尔值'],
    commonMistakes: ['==写成=', '浮点数直接比较'],
    tips: ['建议把常量放左边：5 == a'],
    relatedProblems: [24, 25],
  },

  'for-loop': {
    id: 'for-loop',
    title: 'for循环',
    content: `## for循环

for循环是最常用的循环结构，适合已知循环次数的情况。

### 基本语法

\`\`\`cpp
for (初始化; 条件; 更新) {
    // 循环体
}

// 示例：输出1到10
for (int i = 1; i <= 10; i++) {
    cout << i << " ";
}
\`\`\``,
    codeExamples: [
      {
        title: '求和',
        code: `int sum = 0;
for (int i = 1; i <= n; i++) {
    sum += i;
}`,
        explanation: '使用for循环求1到n的和。',
      },
    ],
    keyPoints: ['理解执行顺序', '掌握循环变量'],
    commonMistakes: ['边界写错', '死循环'],
    tips: ['习惯从0开始', '注意循环次数'],
    relatedProblems: [5, 6],
  },

  'while-loop': {
    id: 'while-loop',
    title: 'while循环',
    content: `## while循环

适合不确定循环次数，根据条件决定是否继续。

### 基本语法

\`\`\`cpp
while (条件) {
    // 循环体
}

// do-while至少执行一次
do {
    // 循环体
} while (条件);
\`\`\``,
    codeExamples: [
      {
        title: '读入直到0',
        code: `int n;
while (cin >> n && n != 0) {
    cout << n * 2 << endl;
}`,
        explanation: '持续读入直到遇到0。',
      },
    ],
    keyPoints: ['理解条件控制', '避免死循环'],
    commonMistakes: ['忘记更新条件', '条件永远为真'],
    tips: ['确保循环能结束'],
    relatedProblems: [5, 6],
  },

  'array-intro': {
    id: 'array-intro',
    title: '数组基础',
    content: `## 数组

数组是存储同类型元素的连续内存空间。

### 声明数组

\`\`\`cpp
int arr[100];        // 声明100个int元素
int arr[5] = {1,2,3,4,5};  // 声明并初始化
int arr[5] = {0};    // 全部初始化为0
\`\`\`

### 访问元素

\`\`\`cpp
arr[0] = 10;     // 下标从0开始
cout << arr[0];  // 输出10
\`\`\``,
    codeExamples: [
      {
        title: '数组基本操作',
        code: `int arr[100];
for (int i = 0; i < n; i++) {
    cin >> arr[i];
}`,
        explanation: '数组的读入。',
      },
    ],
    keyPoints: ['数组下标从0开始', '不能越界'],
    commonMistakes: ['越界访问', '忘记初始化'],
    tips: ['数组开大一点留余量'],
    relatedProblems: [19, 20],
  },

  'prefix-sum': {
    id: 'prefix-sum',
    title: '前缀和',
    content: `## 前缀和

前缀和是数组前i项的和，可以快速计算区间和。

### 计算前缀和

\`\`\`cpp
int sum[MAXN];
for (int i = 1; i <= n; i++) {
    sum[i] = sum[i-1] + a[i];
}
\`\`\`

### 求区间和

\`\`\`cpp
// 区间[l, r]的和
int rangeSum(int l, int r) {
    return sum[r] - sum[l-1];
}
\`\`\``,
    codeExamples: [
      {
        title: '前缀和模板',
        code: `long long sum[100005];
for (int i = 1; i <= n; i++) {
    sum[i] = sum[i-1] + a[i];
}
cout << sum[r] - sum[l-1] << endl;`,
        explanation: '标准前缀和模板。',
      },
    ],
    keyPoints: ['理解前缀和定义', '掌握区间和计算'],
    commonMistakes: ['下标处理错误', '溢出问题'],
    tips: ['建议从下标1开始', '注意long long'],
    relatedProblems: [73, 74],
  },

  'difference': {
    id: 'difference',
    title: '差分',
    content: `## 差分

差分是前缀和的逆运算，用于快速区间修改。

### 区间修改

给区间[l, r]的每个元素加x：

\`\`\`cpp
d[l] += x;
d[r+1] -= x;
\`\`\`

### 还原原数组

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    a[i] = a[i-1] + d[i];
}
\`\`\``,
    codeExamples: [
      {
        title: '差分模板',
        code: `int d[100005];
d[l] += x;
d[r+1] -= x;
for (int i = 1; i <= n; i++) {
    a[i] = a[i-1] + d[i];
}`,
        explanation: '差分数组进行区间修改。',
      },
    ],
    keyPoints: ['理解差分与前缀和的关系', '掌握区间修改方法'],
    commonMistakes: ['忘记还原', '边界处理'],
    tips: ['差分适合多次修改一次查询'],
    relatedProblems: [76, 77],
  },

  'enumeration': {
    id: 'enumeration',
    title: '枚举算法',
    content: `## 枚举算法

枚举是最基本的算法思想：尝试所有可能的情况。

### 基本思想

1. 列出所有可能的情况
2. 逐一检验是否满足条件
3. 统计或输出符合条件的解`,
    codeExamples: [
      {
        title: '百钱买百鸡',
        code: `for (int x = 0; x <= 20; x++) {
    for (int y = 0; y <= 33; y++) {
        int z = 100 - x - y;
        if (z % 3 == 0 && 5*x + 3*y + z/3 == 100) {
            cout << x << " " << y << " " << z << endl;
        }
    }
}`,
        explanation: '经典枚举问题：百钱买百鸡。',
      },
    ],
    keyPoints: ['尝试所有情况', '合理缩小范围'],
    commonMistakes: ['范围过大超时', '遗漏情况'],
    tips: ['先写暴力再优化'],
    relatedProblems: [79, 80, 81],
  },

  'bfs-maze': {
    id: 'bfs-maze',
    title: 'BFS迷宫问题',
    content: `## BFS解决迷宫问题

BFS天然适合求迷宫最短路径。

### 基本思路

1. 从起点开始BFS
2. 每扩展一层，步数+1
3. 到达终点时的步数就是最短路`,
    codeExamples: [
      {
        title: '迷宫BFS',
        code: `int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

queue<pair<int,int>> q;
q.push({sx, sy});
dist[sx][sy] = 0;

while (!q.empty()) {
    auto [x, y] = q.front();
    q.pop();
    if (x == ex && y == ey) return dist[x][y];
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (valid(nx, ny) && dist[nx][ny] == -1) {
            dist[nx][ny] = dist[x][y] + 1;
            q.push({nx, ny});
        }
    }
}`,
        explanation: 'BFS求迷宫最短路径。',
      },
    ],
    keyPoints: ['BFS天然求最短路', '正确处理边界'],
    commonMistakes: ['忘记标记已访问', '边界判断错误'],
    tips: ['dist数组同时作访问标记'],
    relatedProblems: [68, 69],
  },

  'dfs-permute': {
    id: 'dfs-permute',
    title: '全排列',
    content: `## 全排列问题

输出n个数的所有排列。

### DFS思路

1. 每个位置选择一个未使用的数
2. 递归填下一个位置
3. 所有位置填完后输出`,
    codeExamples: [
      {
        title: '全排列',
        code: `int path[10];
bool used[10];

void dfs(int step) {
    if (step == n) {
        for (int i = 0; i < n; i++) cout << path[i] << " ";
        cout << endl;
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            path[step] = i;
            dfs(step + 1);
            used[i] = false;  // 回溯
        }
    }
}`,
        explanation: '输出1到n的全排列。',
      },
    ],
    keyPoints: ['理解回溯过程', '正确标记和撤销'],
    commonMistakes: ['忘记回溯', '标记错误'],
    tips: ['画出搜索树理解'],
    relatedProblems: [66, 67],
  },

  'lis': {
    id: 'lis',
    title: '最长上升子序列',
    content: `## LIS问题

最长上升子序列(Longest Increasing Subsequence)是经典DP问题。

### O(n²)解法

\`\`\`cpp
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i]) {
            dp[i] = max(dp[i], dp[j] + 1);
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: 'LIS模板',
        code: `int dp[10005];
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i]) {
            dp[i] = max(dp[i], dp[j] + 1);
        }
    }
}
cout << *max_element(dp, dp + n) << endl;`,
        explanation: 'O(n²)的LIS解法。',
      },
    ],
    keyPoints: ['理解状态定义', '掌握转移方程'],
    commonMistakes: ['状态定义不清', '比较方向错误'],
    tips: ['小数据用O(n²)', '大数据用O(n log n)'],
    relatedProblems: [73, 74],
  },

  // ========== Day 36-70: 进阶知识点补充 ==========

  // Day 36: DFS入门
  'dfs-order': {
    id: 'dfs-order',
    title: '搜索顺序',
    content: `## 搜索顺序

DFS的搜索顺序决定了搜索树的形态，合理设计搜索顺序可以优化效率。

### 搜索树的概念

DFS可以看作是在搜索树上的遍历，每个节点代表一个状态。

### 常见搜索顺序

1. **位置优先**：先填前面的位置
2. **数值优先**：先尝试小的数
3. **分支优先**：先走某个方向

### 设计原则

1. 避免重复搜索
2. 尽早剪枝
3. 状态表示要完整`,
    codeExamples: [
      {
        title: '不同的搜索顺序',
        code: `// 方式1：位置优先
for (int i = 0; i < n; i++) {
    for (int num = 1; num <= n; num++) {
        // 尝试在第i个位置放num
    }
}

// 方式2：数值优先
for (int num = 1; num <= n; num++) {
    for (int i = 0; i < n; i++) {
        // 尝试把num放在第i个位置
    }
}`,
        explanation: '不同的搜索顺序会影响效率。',
      },
    ],
    keyPoints: ['理解搜索树概念', '合理设计搜索顺序'],
    commonMistakes: ['搜索顺序混乱', '遗漏情况'],
    tips: ['画出搜索树帮助理解', '选择有利剪枝的顺序'],
    relatedProblems: [66, 67],
  },

  // Day 37: DFS应用
  'dfs-combine': {
    id: 'dfs-combine',
    title: '组合',
    content: `## 组合问题

从n个数中选k个的所有组合。

### 与全排列的区别

- 排列：顺序重要，{1,2}和{2,1}不同
- 组合：顺序不重要，{1,2}和{2,1}相同

### 实现方法

\`\`\`cpp
void dfs(int start, int k) {
    if (k == 0) {
        // 选够了，输出结果
        return;
    }
    for (int i = start; i <= n; i++) {
        path.push_back(i);
        dfs(i + 1, k - 1);  // 从i+1开始，避免重复
        path.pop_back();
    }
}
\`\`\``,
    codeExamples: [
      {
        title: 'C(n,k)组合',
        code: `vector<int> path;
int n, k;

void dfs(int start, int cnt) {
    if (cnt == k) {
        for (int x : path) cout << x << " ";
        cout << endl;
        return;
    }
    for (int i = start; i <= n; i++) {
        path.push_back(i);
        dfs(i + 1, cnt + 1);
        path.pop_back();
    }
}`,
        explanation: '从n个数中选k个的组合。',
      },
    ],
    keyPoints: ['理解组合与排列的区别', '使用start避免重复'],
    commonMistakes: ['重复选数', 'start参数设置错误'],
    tips: ['组合数可以用公式计算', 'start参数是关键'],
    relatedProblems: [66, 67],
  },

  'dfs-prune': {
    id: 'dfs-prune',
    title: '剪枝基础',
    content: `## 剪枝

剪枝是在搜索过程中提前终止不可能得到解的分支。

### 剪枝的作用

减少搜索空间，提高效率。

### 常见剪枝方法

1. **可行性剪枝**：当前状态无法继续
2. **最优性剪枝**：当前解不可能更优
3. **重复状态剪枝**：避免重复搜索

### 示例

\`\`\`cpp
void dfs(int step) {
    if (当前解 >= 已知最优解) return;  // 最优性剪枝
    if (无法完成) return;  // 可行性剪枝
    // ...
}
\`\`\``,
    codeExamples: [
      {
        title: '剪枝示例',
        code: `int ans = INT_MAX;

void dfs(int step, int cost) {
    if (cost >= ans) return;  // 最优性剪枝
    if (step == n) {
        ans = min(ans, cost);
        return;
    }
    // 继续搜索...
}`,
        explanation: '最优性剪枝示例。',
      },
    ],
    keyPoints: ['理解剪枝的目的', '掌握常见剪枝方法'],
    commonMistakes: ['剪枝条件写错', '过度剪枝遗漏解'],
    tips: ['剪枝要保证不遗漏正确解', '多种剪枝可以组合使用'],
    relatedProblems: [67, 71],
  },

  // Day 38: BFS入门
  'bfs-impl': {
    id: 'bfs-impl',
    title: 'BFS实现',
    content: `## BFS实现

BFS使用队列实现，按层次遍历。

### 基本框架

\`\`\`cpp
void bfs(起点) {
    queue.push(起点);
    visited[起点] = true;
    
    while (!queue.empty()) {
        auto cur = queue.front();
        queue.pop();
        
        for (每个相邻状态) {
            if (!visited[下一状态]) {
                visited[下一状态] = true;
                queue.push(下一状态);
            }
        }
    }
}
\`\`\`

### 注意事项

1. 入队时标记，不是出队时
2. 使用vis数组避免重复`,
    codeExamples: [
      {
        title: 'BFS模板',
        code: `bool visited[1005];
vector<int> adj[1005];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
        explanation: '标准BFS模板。',
      },
    ],
    keyPoints: ['使用队列实现', '入队时标记'],
    commonMistakes: ['出队时才标记', '忘记标记'],
    tips: ['入队时标记避免重复入队', 'BFS天然求最短路'],
    relatedProblems: [68, 69],
  },

  'bfs-level': {
    id: 'bfs-level',
    title: '层次遍历',
    content: `## 层次遍历

BFS可以按层输出结果，常见于树的层次遍历。

### 实现方法

方法一：记录每层大小
\`\`\`cpp
while (!q.empty()) {
    int size = q.size();  // 当前层节点数
    for (int i = 0; i < size; i++) {
        auto cur = q.front();
        q.pop();
        // 处理cur
        // 子节点入队
    }
    // 一层结束
}
\`\`\`

方法二：使用depth数组`,
    codeExamples: [
      {
        title: '树的层次遍历',
        code: `void levelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            cout << node->val << " ";
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        cout << endl;  // 一层结束
    }
}`,
        explanation: '树的层次遍历。',
      },
    ],
    keyPoints: ['记录每层节点数', '理解BFS的层次特性'],
    commonMistakes: ['忘记统计层数', '层次边界不清'],
    tips: ['每层开始时记录队列大小', '可以用于求树的高度'],
    relatedProblems: [68, 82],
  },

  // Day 39: BFS应用
  'bfs-shortest': {
    id: 'bfs-shortest',
    title: '最短路',
    content: `## BFS求最短路

BFS天然适合求无权图的最短路径。

### 原理

BFS按层扩展，第一次到达某点时的步数就是最短路。

### 实现

\`\`\`cpp
int dist[MAXN];
memset(dist, -1, sizeof(dist));

dist[start] = 0;
queue.push(start);

while (!queue.empty()) {
    int u = queue.front();
    queue.pop();
    
    for (int v : adj[u]) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            queue.push(v);
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: 'BFS求最短路',
        code: `int dist[1005];
vector<int> adj[1005];

int bfs_shortest(int start, int end) {
    memset(dist, -1, sizeof(dist));
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        if (u == end) return dist[u];
        
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return -1;  // 无法到达
}`,
        explanation: 'BFS求两点间最短路。',
      },
    ],
    keyPoints: ['BFS天然求最短路', '第一次到达就是最短'],
    commonMistakes: ['忘记记录距离', '多次更新同一点'],
    tips: ['dist数组同时作访问标记', '只适用于无权图'],
    relatedProblems: [69, 71],
  },

  'bfs-state': {
    id: 'bfs-state',
    title: '状态压缩BFS',
    content: `## 状态压缩BFS

当状态可以用二进制表示时，可以用状态压缩+BFS。

### 适用场景

- 需要记录哪些点已访问
- 状态可以用bitset表示
- 状态空间可控

### 实现

\`\`\`cpp
int dist[1 << n][n];  // 状态压缩+当前位置
// 状态：(已访问集合, 当前位置)
\`\`\``,
    codeExamples: [
      {
        title: '旅行商问题BFS',
        code: `int n;
int dist[1 << 15][15];

int tsp() {
    memset(dist, -1, sizeof(dist));
    queue<pair<int,int>> q;
    
    for (int i = 0; i < n; i++) {
        dist[1 << i][i] = 0;
        q.push({1 << i, i});
    }
    
    while (!q.empty()) {
        auto [state, u] = q.front();
        q.pop();
        
        if (state == (1 << n) - 1) {
            return dist[state][u];
        }
        
        for (int v = 0; v < n; v++) {
            if (!(state & (1 << v))) {
                int new_state = state | (1 << v);
                if (dist[new_state][v] == -1) {
                    dist[new_state][v] = dist[state][u] + 1;
                    q.push({new_state, v});
                }
            }
        }
    }
    return -1;
}`,
        explanation: '状态压缩BFS解TSP。',
      },
    ],
    keyPoints: ['状态用二进制表示', '状态空间可能很大'],
    commonMistakes: ['状态表示错误', '空间开不够'],
    tips: ['注意状态空间大小', '可以配合贪心优化'],
    relatedProblems: [93, 94],
  },

  // Day 40: 动态规划入门
  'dp-state': {
    id: 'dp-state',
    title: '状态定义',
    content: `## 状态定义

状态定义是DP的第一步，决定了整个DP的框架。

### 什么是状态

状态是对问题的子问题的描述，通常用dp数组表示。

### 状态定义原则

1. 能描述子问题
2. 能够推导
3. 无后效性

### 常见状态定义

\`\`\`cpp
// dp[i] = 以i结尾的最优解
// dp[i][j] = 前i个物品容量为j的最优解
// dp[i][j] = 区间[i,j]的最优解
\`\`\``,
    codeExamples: [
      {
        title: '状态定义示例',
        code: `// 最长上升子序列
int dp[i];  // dp[i] = 以a[i]结尾的LIS长度

// 01背包
int dp[i][j];  // dp[i][j] = 前i个物品容量为j的最大价值

// 区间DP
int dp[i][j];  // dp[i][j] = 区间[i,j]合并的最小代价`,
        explanation: '不同问题的状态定义。',
      },
    ],
    keyPoints: ['状态要有明确含义', '能够递推'],
    commonMistakes: ['状态定义不清', '遗漏信息'],
    tips: ['状态定义要能完整描述子问题', '从简单例子推敲'],
    relatedProblems: [72, 73],
  },

  'dp-transfer': {
    id: 'dp-transfer',
    title: '状态转移',
    content: `## 状态转移

状态转移方程描述了状态之间的关系。

### 转移方程

从已知状态推导出新状态的公式。

\`\`\`cpp
// LIS
dp[i] = max(dp[j] + 1)  for all j < i and a[j] < a[i]

// 01背包
dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])

// 区间DP
dp[i][j] = min(dp[i][k] + dp[k+1][j])  for i <= k < j
\`\`\`

### 转移顺序

必须保证转移时用到的状态已经计算过。`,
    codeExamples: [
      {
        title: '状态转移实现',
        code: `// LIS转移
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i]) {
            dp[i] = max(dp[i], dp[j] + 1);
        }
    }
}

// 01背包转移
for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
    }
}`,
        explanation: '常见DP转移实现。',
      },
    ],
    keyPoints: ['明确转移来源', '注意转移顺序'],
    commonMistakes: ['转移方向错误', '边界处理'],
    tips: ['画出状态转移图', '从简单例子验证'],
    relatedProblems: [72, 73],
  },

  // Day 41: 线性DP
  'lis-optim': {
    id: 'lis-optim',
    title: 'LIS优化',
    content: `## LIS的O(n log n)优化

使用二分查找优化LIS。

### 思路

维护一个数组d，d[i]表示长度为i的LIS的最小结尾元素。

### 实现

\`\`\`cpp
vector<int> d;

for (int i = 0; i < n; i++) {
    int pos = lower_bound(d.begin(), d.end(), a[i]) - d.begin();
    if (pos == d.size()) {
        d.push_back(a[i]);
    } else {
        d[pos] = a[i];
    }
}

return d.size();
\`\`\`

### 变形

- 最长不下降：upper_bound
- 最长下降：取负或改变比较`,
    codeExamples: [
      {
        title: 'LIS优化版',
        code: `int LIS(vector<int>& a) {
    vector<int> d;
    for (int x : a) {
        auto it = lower_bound(d.begin(), d.end(), x);
        if (it == d.end()) {
            d.push_back(x);
        } else {
            *it = x;
        }
    }
    return d.size();
}`,
        explanation: 'O(n log n)的LIS。',
      },
    ],
    keyPoints: ['理解d数组的含义', '掌握二分查找'],
    commonMistakes: ['lower/upper_bound混淆', 'd数组含义理解错误'],
    tips: ['d数组不是LIS本身', '只能求长度'],
    relatedProblems: [73, 74],
  },

  // Day 42: 背包问题
  'knapsack-intro': {
    id: 'knapsack-intro',
    title: '背包问题概念',
    content: `## 背包问题

给定容量为W的背包和n个物品，每个物品有重量w和价值v，求最大价值。

### 问题分类

| 类型 | 特点 |
|------|------|
| 01背包 | 每个物品最多选1个 |
| 完全背包 | 每个物品可选无限个 |
| 多重背包 | 每个物品可选有限个 |

### 状态定义

\`\`\`cpp
dp[i][j] = 前i个物品，容量为j时的最大价值
\`\`\``,
    codeExamples: [
      {
        title: '背包问题输入',
        code: `int n, W;
cin >> n >> W;

int w[105], v[105];
for (int i = 1; i <= n; i++) {
    cin >> w[i] >> v[i];
}

// 求最大价值
// dp[i][j] = 前i个物品容量j的最大价值`,
        explanation: '背包问题的基本输入。',
      },
    ],
    keyPoints: ['理解问题模型', '区分不同类型'],
    commonMistakes: ['类型混淆', '状态定义错误'],
    tips: ['背包是经典DP模型', '掌握后可以举一反三'],
    relatedProblems: [75, 76],
  },

  '01-space': {
    id: '01-space',
    title: '空间优化',
    content: `## 背包问题空间优化

可以将二维dp优化为一维。

### 原理

dp[i][j]只依赖于dp[i-1][...]，可以用滚动数组。

### 01背包

必须**逆序**枚举容量：

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
    }
}
\`\`\`

### 为什么逆序

保证每个物品只选一次。正序会重复选。`,
    codeExamples: [
      {
        title: '01背包空间优化',
        code: `int dp[10005];  // 一维数组

for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}

cout << dp[W] << endl;`,
        explanation: '一维01背包。',
      },
    ],
    keyPoints: ['理解为什么逆序', '掌握一维优化'],
    commonMistakes: ['顺序错误', '容量范围错误'],
    tips: ['画图理解转移过程', '完全背包是正序'],
    relatedProblems: [75, 76],
  },

  'multiple-knapsack': {
    id: 'multiple-knapsack',
    title: '多重背包',
    content: `## 多重背包

每个物品有数量限制，可选有限个。

### 朴素解法

把每个物品展开成多个01背包物品：

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int k = 1; k <= cnt[i]; k++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
        }
    }
}
\`\`\`

### 二进制优化

将数量拆分成1,2,4,8,...的形式，O(n*W*log(cnt))。`,
    codeExamples: [
      {
        title: '多重背包朴素版',
        code: `int dp[10005];

for (int i = 1; i <= n; i++) {
    for (int k = 1; k <= cnt[i]; k++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
}`,
        explanation: '多重背包基础实现。',
      },
    ],
    keyPoints: ['理解与01背包的关系', '知道二进制优化'],
    commonMistakes: ['数量处理错误', '忘记逆序'],
    tips: ['可以用二进制优化', '单调队列优化更优'],
    relatedProblems: [77, 78],
  },

  // Day 44: 区间DP
  'interval-order': {
    id: 'interval-order',
    title: '枚举顺序',
    content: `## 区间DP枚举顺序

区间DP必须按正确的顺序枚举。

### 原则

小区间先算，大区间后算。

### 三种枚举顺序

1. **按区间长度**
\`\`\`cpp
for (int len = 2; len <= n; len++) {
    for (int i = 1; i + len - 1 <= n; i++) {
        int j = i + len - 1;
        // 计算dp[i][j]
    }
}
\`\`\`

2. **倒序枚举左端点**
\`\`\`cpp
for (int i = n; i >= 1; i--) {
    for (int j = i + 1; j <= n; j++) {
        // 计算dp[i][j]
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '区间DP模板',
        code: `// 石子合并
for (int len = 2; len <= n; len++) {
    for (int i = 1; i + len - 1 <= n; i++) {
        int j = i + len - 1;
        dp[i][j] = INT_MAX;
        for (int k = i; k < j; k++) {
            dp[i][j] = min(dp[i][j], 
                dp[i][k] + dp[k+1][j] + sum[j] - sum[i-1]);
        }
    }
}`,
        explanation: '按长度枚举的区间DP。',
      },
    ],
    keyPoints: ['理解为什么要按长度枚举', '保证子问题先算'],
    commonMistakes: ['枚举顺序错误', '边界处理'],
    tips: ['画出区间表格帮助理解', 'len从2开始'],
    relatedProblems: [79, 80],
  },

  'interval-examples': {
    id: 'interval-examples',
    title: '区间DP经典问题',
    content: `## 区间DP经典问题

### 石子合并

合并相邻石子堆，求最小代价。

### 矩阵链乘

计算矩阵乘法的最小次数。

### 回文串

将字符串变成回文串的最小代价。

### 多边形三角剖分

将多边形分成三角形的最小代价。`,
    codeExamples: [
      {
        title: '石子合并',
        code: `int n, a[105], sum[105], dp[105][105];

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        sum[i] = sum[i-1] + a[i];
    }
    
    memset(dp, 0x3f, sizeof(dp));
    for (int i = 1; i <= n; i++) dp[i][i] = 0;
    
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            for (int k = i; k < j; k++) {
                dp[i][j] = min(dp[i][j], 
                    dp[i][k] + dp[k+1][j] + sum[j] - sum[i-1]);
            }
        }
    }
    
    cout << dp[1][n] << endl;
    return 0;
}`,
        explanation: '石子合并问题。',
      },
    ],
    keyPoints: ['掌握标准模板', '学会套用'],
    commonMistakes: ['初始化错误', '边界条件'],
    tips: ['区间DP有很多变形', '注意题目条件'],
    relatedProblems: [79, 80],
  },

  // Day 45: 树和图基础
  'graph-store': {
    id: 'graph-store',
    title: '图的存储',
    content: `## 图的存储方式

### 邻接矩阵

\`\`\`cpp
int g[105][105];  // g[u][v] = 1 表示有边
\`\`\`

- 优点：实现简单
- 缺点：空间O(n²)，不适合稀疏图

### 邻接表

\`\`\`cpp
vector<int> adj[10005];  // adj[u]存储u的所有邻居
adj[u].push_back(v);
\`\`\`

- 优点：空间O(n+m)
- 缺点：判断两点是否有边需要遍历

### 链式前向星

竞赛中常用的存储方式。`,
    codeExamples: [
      {
        title: '邻接表存图',
        code: `int n, m;
vector<pair<int,int>> adj[10005];  // (邻居, 边权)

void addEdge(int u, int v, int w) {
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});  // 无向图
}

// 遍历u的所有邻居
for (auto [v, w] : adj[u]) {
    // 处理边(u, v)
}`,
        explanation: '邻接表存储和遍历。',
      },
    ],
    keyPoints: ['掌握邻接表', '了解邻接矩阵'],
    commonMistakes: ['无向图忘记加两条边', '数组开小'],
    tips: ['竞赛中多用邻接表', '注意边数开两倍'],
    relatedProblems: [81, 82],
  },

  // Day 46: 树的遍历
  'tree-dfs': {
    id: 'tree-dfs',
    title: '树的DFS',
    content: `## 树的DFS遍历

### 基本框架

\`\`\`cpp
void dfs(int u, int parent) {
    for (int v : adj[u]) {
        if (v != parent) {
            dfs(v, u);
        }
    }
}
\`\`\`

### 应用

1. 求子树大小
2. 求树的高度
3. 求树的重心`,
    codeExamples: [
      {
        title: '求子树大小',
        code: `int sz[10005];

void dfs(int u, int parent) {
    sz[u] = 1;
    for (int v : adj[u]) {
        if (v != parent) {
            dfs(v, u);
            sz[u] += sz[v];
        }
    }
}`,
        explanation: 'DFS求子树大小。',
      },
    ],
    keyPoints: ['用parent避免回走', '递归处理子树'],
    commonMistakes: ['忘记判断parent', '无限递归'],
    tips: ['可以传入parent参数', '也可以用vis数组'],
    relatedProblems: [82, 83],
  },

  'tree-bfs': {
    id: 'tree-bfs',
    title: '树的BFS',
    content: `## 树的BFS遍历

BFS可以按层次遍历树。

### 应用

1. 层次遍历
2. 求树的深度
3. 求两点间距离`,
    codeExamples: [
      {
        title: 'BFS求树的高度',
        code: `int depth[10005];

int bfs(int root) {
    queue<int> q;
    q.push(root);
    depth[root] = 1;
    int maxDepth = 1;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (depth[v] == 0) {
                depth[v] = depth[u] + 1;
                maxDepth = max(maxDepth, depth[v]);
                q.push(v);
            }
        }
    }
    
    return maxDepth;
}`,
        explanation: 'BFS求树高度。',
      },
    ],
    keyPoints: ['BFS天然层次遍历', '记录深度'],
    commonMistakes: ['忘记记录深度', '起点处理'],
    tips: ['可以同时求最远点', '两次BFS求直径'],
    relatedProblems: [82, 83],
  },

  'tree-diameter': {
    id: 'tree-diameter',
    title: '树的直径',
    content: `## 树的直径

树上最长的路径叫直径。

### 求法

1. 从任意点u出发，BFS/DFS找最远点v
2. 从v出发，BFS/DFS找最远点w
3. v到w就是直径

### 证明

直径的两个端点一定是最远点。`,
    codeExamples: [
      {
        title: '求树的直径',
        code: `pair<int,int> bfs_farthest(int start) {
    memset(dist, -1, sizeof(dist));
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    int farthest = start, maxDist = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                if (dist[v] > maxDist) {
                    maxDist = dist[v];
                    farthest = v;
                }
                q.push(v);
            }
        }
    }
    return {farthest, maxDist};
}

int getDiameter() {
    auto [v, _] = bfs_farthest(1);  // 第一次BFS
    auto [w, d] = bfs_farthest(v);  // 第二次BFS
    return d;  // 直径长度
}`,
        explanation: '两次BFS求直径。',
      },
    ],
    keyPoints: ['两次BFS求直径', '记住这个方法'],
    commonMistakes: ['只做一次BFS', '起点选择'],
    tips: ['直径可能有多条', '直径的中点是重心候选'],
    relatedProblems: [82, 83],
  },

  // Day 47: 图的遍历
  'graph-dfs': {
    id: 'graph-dfs',
    title: '图的DFS',
    content: `## 图的DFS遍历

与树的DFS类似，但需要标记已访问的节点。

### 基本框架

\`\`\`cpp
bool visited[10005];

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '图的DFS遍历',
        code: `bool visited[10005];
vector<int> adj[10005];

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}`,
        explanation: '图的DFS遍历。',
      },
    ],
    keyPoints: ['必须标记已访问', '防止重复访问'],
    commonMistakes: ['忘记标记', '导致无限循环'],
    tips: ['DFS可以判断连通性', '可以用于拓扑排序'],
    relatedProblems: [84, 85],
  },

  'graph-bfs': {
    id: 'graph-bfs',
    title: '图的BFS',
    content: `## 图的BFS遍历

按层次遍历图，常用于求最短路径。`,
    codeExamples: [
      {
        title: '图的BFS遍历',
        code: `bool visited[10005];
vector<int> adj[10005];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
        explanation: '图的BFS遍历。',
      },
    ],
    keyPoints: ['入队时标记', '避免重复入队'],
    commonMistakes: ['出队时标记', '导致重复入队'],
    tips: ['BFS适合求最短路', '可以分层处理'],
    relatedProblems: [84, 85],
  },

  'connected': {
    id: 'connected',
    title: '连通分量',
    content: `## 连通分量

图中的极大连通子图。

### 求法

用DFS/BFS遍历，每次遍历一个连通分量。

\`\`\`cpp
int cnt = 0;
for (int i = 1; i <= n; i++) {
    if (!visited[i]) {
        cnt++;
        dfs(i);
    }
}
\`\`\`

### 应用

- 判断图是否连通
- 统计连通分量个数
- 处理各连通分量`,
    codeExamples: [
      {
        title: '统计连通分量',
        code: `bool visited[10005];
vector<int> adj[10005];

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
}

int countComponents(int n) {
    int cnt = 0;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            cnt++;
            dfs(i);
        }
    }
    return cnt;
}`,
        explanation: '统计连通分量个数。',
      },
    ],
    keyPoints: ['每个连通分量做一次DFS', '统计遍历次数'],
    commonMistakes: ['忘记遍历所有节点', '孤立点也要计数'],
    tips: ['连通分量个数 = DFS次数', '可以用并查集'],
    relatedProblems: [84, 89],
  },

  // Day 48: 最短路
  'dijkstra-impl': {
    id: 'dijkstra-impl',
    title: 'Dijkstra实现',
    content: `## Dijkstra算法实现

### 基本步骤

1. 初始化距离数组，起点为0，其他为∞
2. 选择未访问的距离最小的点
3. 更新其邻居的距离
4. 重复直到所有点访问

### 朴素实现 O(n²)

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    int u = -1, minDist = INT_MAX;
    for (int j = 1; j <= n; j++) {
        if (!visited[j] && dist[j] < minDist) {
            minDist = dist[j];
            u = j;
        }
    }
    if (u == -1) break;
    visited[u] = true;
    for (auto [v, w] : adj[u]) {
        dist[v] = min(dist[v], dist[u] + w);
    }
}
\`\`\``,
    codeExamples: [
      {
        title: 'Dijkstra朴素版',
        code: `int dist[10005];
bool visited[10005];
vector<pair<int,int>> adj[10005];  // (邻居, 边权)

void dijkstra(int start) {
    memset(dist, 0x3f, sizeof(dist));
    memset(visited, false, sizeof(visited));
    dist[start] = 0;
    
    for (int i = 1; i <= n; i++) {
        int u = -1, minDist = INT_MAX;
        for (int j = 1; j <= n; j++) {
            if (!visited[j] && dist[j] < minDist) {
                minDist = dist[j];
                u = j;
            }
        }
        if (u == -1) break;
        visited[u] = true;
        for (auto [v, w] : adj[u]) {
            dist[v] = min(dist[v], dist[u] + w);
        }
    }
}`,
        explanation: 'Dijkstra朴素实现。',
      },
    ],
    keyPoints: ['每次选最小距离点', '更新邻居距离'],
    commonMistakes: ['忘记标记已访问', '初始化错误'],
    tips: ['只适用于非负权图', '可以用堆优化'],
    relatedProblems: [86, 87],
  },

  'dijkstra-heap': {
    id: 'dijkstra-heap',
    title: 'Dijkstra堆优化',
    content: `## Dijkstra堆优化

使用优先队列优化，O((n+m)log n)。

### 实现

\`\`\`cpp
priority_queue<pair<int,int>, vector<pair<int,int>>, 
               greater<pair<int,int>>> pq;
// (距离, 节点)

pq.push({0, start});
while (!pq.empty()) {
    auto [d, u] = pq.top();
    pq.pop();
    if (d > dist[u]) continue;  // 已更新过
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}
\`\`\``,
    codeExamples: [
      {
        title: 'Dijkstra堆优化',
        code: `int dist[10005];
vector<pair<int,int>> adj[10005];

void dijkstra(int start) {
    memset(dist, 0x3f, sizeof(dist));
    dist[start] = 0;
    
    priority_queue<pair<int,int>, vector<pair<int,int>>, 
                   greater<pair<int,int>>> pq;
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
        explanation: '堆优化的Dijkstra。',
      },
    ],
    keyPoints: ['使用小根堆', '判断是否已更新'],
    commonMistakes: ['忘记判断d > dist[u]', '堆类型错误'],
    tips: ['greater<pair<int,int>>是小根堆', '这是竞赛常用写法'],
    relatedProblems: [86, 87],
  },

  // Day 49: 最短路（二）
  'spfa': {
    id: 'spfa',
    title: 'SPFA算法',
    content: `## SPFA算法

SPFA是Bellman-Ford的队列优化，可以处理负权边。

### 实现

\`\`\`cpp
queue<int> q;
q.push(start);
inQueue[start] = true;

while (!q.empty()) {
    int u = q.front();
    q.pop();
    inQueue[u] = false;
    
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            if (!inQueue[v]) {
                q.push(v);
                inQueue[v] = true;
            }
        }
    }
}
\`\`\`

### 判断负环

如果一个点入队超过n次，存在负环。`,
    codeExamples: [
      {
        title: 'SPFA模板',
        code: `int dist[10005];
bool inQueue[10005];
vector<pair<int,int>> adj[10005];

void spfa(int start) {
    memset(dist, 0x3f, sizeof(dist));
    dist[start] = 0;
    
    queue<int> q;
    q.push(start);
    inQueue[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        inQueue[u] = false;
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (!inQueue[v]) {
                    q.push(v);
                    inQueue[v] = true;
                }
            }
        }
    }
}`,
        explanation: 'SPFA算法。',
      },
    ],
    keyPoints: ['可以处理负权', '判断负环'],
    commonMistakes: ['忘记inQueue数组', '负环判断条件'],
    tips: ['SPFA可能退化', '最好用Dijkstra'],
    relatedProblems: [87, 88],
  },

  'negative': {
    id: 'negative',
    title: '负权边处理',
    content: `## 负权边处理

### Dijkstra vs SPFA vs Floyd

| 算法 | 负权边 | 复杂度 |
|------|--------|--------|
| Dijkstra | 不支持 | O(n²)或O(m log n) |
| SPFA | 支持 | O(km)，可能退化 |
| Floyd | 支持 | O(n³) |

### 负环

存在负权环时，可以无限绕圈使距离趋向负无穷。

### 判断方法

- SPFA：入队次数超过n
- Bellman-Ford：第n次还能松弛`,
    codeExamples: [
      {
        title: '判断负环',
        code: `int cnt[10005];  // 入队次数

bool hasNegativeCycle(int start) {
    memset(dist, 0x3f, sizeof(dist));
    memset(cnt, 0, sizeof(cnt));
    
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    cnt[start] = 1;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u] + 1;
                if (cnt[v] > n) return true;  // 负环
                q.push(v);
            }
        }
    }
    return false;
}`,
        explanation: '判断图中是否有负环。',
      },
    ],
    keyPoints: ['理解各算法适用场景', '会判断负环'],
    commonMistakes: ['Dijkstra用于负权图', '负环判断错误'],
    tips: ['大多数题目用Dijkstra', 'SPFA用于负权或负环'],
    relatedProblems: [87, 88],
  },

  // Day 50: 并查集
  'dsu-path': {
    id: 'dsu-path',
    title: '路径压缩',
    content: `## 路径压缩

并查集的核心优化。

### 原理

查找时，将路径上所有节点直接连到根节点。

### 实现

\`\`\`cpp
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  // 路径压缩
    }
    return parent[x];
}
\`\`\`

### 效果

将查找复杂度从O(n)降到近似O(1)。`,
    codeExamples: [
      {
        title: '路径压缩并查集',
        code: `int parent[10005];

void init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
    }
}

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

void unite(int x, int y) {
    int px = find(x);
    int py = find(y);
    if (px != py) {
        parent[px] = py;
    }
}

bool connected(int x, int y) {
    return find(x) == find(y);
}`,
        explanation: '路径压缩并查集。',
      },
    ],
    keyPoints: ['递归实现路径压缩', '理解压缩效果'],
    commonMistakes: ['忘记初始化', 'find写错'],
    tips: ['路径压缩足够高效', '可以配合按秩合并'],
    relatedProblems: [89, 90],
  },

  'dsu-rank': {
    id: 'dsu-rank',
    title: '按秩合并',
    content: `## 按秩合并

另一种并查集优化。

### 原理

合并时，将小树合并到大树下。

### 实现

\`\`\`cpp
int parent[10005], rank_[10005];

void unite(int x, int y) {
    int px = find(x);
    int py = find(y);
    if (px == py) return;
    
    if (rank_[px] < rank_[py]) {
        parent[px] = py;
    } else if (rank_[px] > rank_[py]) {
        parent[py] = px;
    } else {
        parent[px] = py;
        rank_[py]++;
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '按秩合并并查集',
        code: `int parent[10005], rnk[10005];

void init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        rnk[i] = 0;
    }
}

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

void unite(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return;
    
    if (rnk[px] < rnk[py]) swap(px, py);
    parent[py] = px;
    if (rnk[px] == rnk[py]) rnk[px]++;
}`,
        explanation: '按秩合并。',
      },
    ],
    keyPoints: ['小的合并到大的', '可以和路径压缩配合'],
    commonMistakes: ['rank关键字冲突', '合并逻辑错误'],
    tips: ['路径压缩+按秩合并最优', '大多数情况路径压缩够了'],
    relatedProblems: [89, 90],
  },

  // Day 51: 最小生成树
  'kruskal': {
    id: 'kruskal',
    title: 'Kruskal算法',
    content: `## Kruskal算法

### 步骤

1. 将所有边按权值排序
2. 从小到大选边
3. 如果边的两端不在同一连通分量，选中
4. 直到选了n-1条边

### 实现

\`\`\`cpp
struct Edge {
    int u, v, w;
    bool operator<(const Edge& e) const {
        return w < e.w;
    }
};

sort(edges.begin(), edges.end());
for (auto& e : edges) {
    if (find(e.u) != find(e.v)) {
        unite(e.u, e.v);
        total += e.w;
    }
}
\`\`\``,
    codeExamples: [
      {
        title: 'Kruskal模板',
        code: `struct Edge {
    int u, v, w;
    bool operator<(const Edge& e) const {
        return w < e.w;
    }
};

int parent[10005];

int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

long long kruskal(int n, vector<Edge>& edges) {
    for (int i = 1; i <= n; i++) parent[i] = i;
    
    sort(edges.begin(), edges.end());
    long long total = 0;
    int cnt = 0;
    
    for (auto& e : edges) {
        int pu = find(e.u), pv = find(e.v);
        if (pu != pv) {
            parent[pu] = pv;
            total += e.w;
            cnt++;
            if (cnt == n - 1) break;
        }
    }
    
    return cnt == n - 1 ? total : -1;  // -1表示不连通
}`,
        explanation: 'Kruskal求MST。',
      },
    ],
    keyPoints: ['边排序+并查集', '选n-1条边'],
    commonMistakes: ['忘记排序', '边数判断'],
    tips: ['Kruskal适合稀疏图', '时间复杂度O(m log m)'],
    relatedProblems: [91, 92],
  },

  'prim': {
    id: 'prim',
    title: 'Prim算法',
    content: `## Prim算法

### 步骤

1. 从任意点开始
2. 选择连接已选集合和未选集合的最小边
3. 将新点加入集合
4. 重复n-1次

### 复杂度

- 朴素：O(n²)
- 堆优化：O(m log n)`,
    codeExamples: [
      {
        title: 'Prim模板',
        code: `int dist[10005];
bool visited[10005];
vector<pair<int,int>> adj[10005];

long long prim(int n) {
    memset(dist, 0x3f, sizeof(dist));
    memset(visited, false, sizeof(visited));
    dist[1] = 0;
    
    long long total = 0;
    
    for (int i = 1; i <= n; i++) {
        int u = -1, minDist = INT_MAX;
        for (int j = 1; j <= n; j++) {
            if (!visited[j] && dist[j] < minDist) {
                minDist = dist[j];
                u = j;
            }
        }
        
        if (u == -1) return -1;  // 不连通
        visited[u] = true;
        total += dist[u];
        
        for (auto [v, w] : adj[u]) {
            dist[v] = min(dist[v], w);
        }
    }
    
    return total;
}`,
        explanation: 'Prim求MST。',
      },
    ],
    keyPoints: ['类似Dijkstra', '选最小连接边'],
    commonMistakes: ['与Dijkstra混淆', 'dist更新方式不同'],
    tips: ['Prim适合稠密图', 'dist存的是到集合的距离'],
    relatedProblems: [91, 92],
  },

  // Day 52: DP进阶
  'bitmask-intro': {
    id: 'bitmask-intro',
    title: '位运算基础',
    content: `## 位运算基础

### 常用操作

\`\`\`cpp
// 第i位是否为1
(x >> i) & 1

// 将第i位设为1
x | (1 << i)

// 将第i位设为0
x & ~(1 << i)

// 翻转第i位
x ^ (1 << i)

// 统计1的个数
__builtin_popcount(x)

// 最低位的1
x & (-x)
\`\`\``,
    codeExamples: [
      {
        title: '位运算常用操作',
        code: `int x = 13;  // 二进制: 1101

// 检查第i位
for (int i = 0; i < 32; i++) {
    if ((x >> i) & 1) {
        cout << "第" << i << "位是1" << endl;
    }
}

// 枚举子集
for (int sub = x; sub; sub = (sub - 1) & x) {
    // sub是x的子集
}

// 统计1的个数
int cnt = __builtin_popcount(x);`,
        explanation: '位运算基本操作。',
      },
    ],
    keyPoints: ['掌握基本位操作', '理解状态压缩'],
    commonMistakes: ['优先级问题', '移位溢出'],
    tips: ['多写多练', '注意运算符优先级'],
    relatedProblems: [93, 94],
  },

  'bitmask-examples': {
    id: 'bitmask-examples',
    title: '状压DP经典问题',
    content: `## 状压DP经典问题

### 旅行商问题(TSP)

访问所有城市的最短路径。

### 棋盘问题

在棋盘上放置棋子。

### 集合问题

集合的划分、覆盖等。`,
    codeExamples: [
      {
        title: 'TSP状压DP',
        code: `int n;
int dist[20][20];
int dp[1 << 16][16];

int tsp() {
    memset(dp, 0x3f, sizeof(dp));
    
    for (int i = 0; i < n; i++) {
        dp[1 << i][i] = 0;
    }
    
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask & (1 << u))) continue;
            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                int new_mask = mask | (1 << v);
                dp[new_mask][v] = min(dp[new_mask][v], 
                    dp[mask][u] + dist[u][v]);
            }
        }
    }
    
    int full = (1 << n) - 1;
    int ans = INT_MAX;
    for (int i = 0; i < n; i++) {
        ans = min(ans, dp[full][i]);
    }
    return ans;
}`,
        explanation: '状压DP解TSP。',
      },
    ],
    keyPoints: ['状态用二进制表示', '枚举所有状态'],
    commonMistakes: ['状态转移错误', '空间开不够'],
    tips: ['状态空间是2^n', '注意n的范围'],
    relatedProblems: [93, 94],
  },

  // Day 53: 记忆化搜索
  'memo-intro': {
    id: 'memo-intro',
    title: '记忆化搜索概念',
    content: `## 记忆化搜索

记忆化搜索 = 递归 + 缓存

### 原理

将已经计算过的结果存储起来，避免重复计算。

### 实现

\`\`\`cpp
int memo[MAXN];

int solve(int x) {
    if (x == 0) return 0;
    if (memo[x] != -1) return memo[x];  // 已计算
    
    int result = /* 计算过程 */;
    memo[x] = result;  // 存储
    return result;
}
\`\`\``,
    codeExamples: [
      {
        title: '斐波那契记忆化',
        code: `long long memo[100];

long long fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    memset(memo, -1, sizeof(memo));
    cout << fib(50) << endl;
    return 0;
}`,
        explanation: '记忆化搜索求斐波那契。',
      },
    ],
    keyPoints: ['用数组缓存结果', '避免重复计算'],
    commonMistakes: ['忘记初始化memo', 'memo判断条件错误'],
    tips: ['记忆化搜索与DP等价', '写起来更直观'],
    relatedProblems: [95, 96],
  },

  'memo-vs-dp': {
    id: 'memo-vs-dp',
    title: '记忆化与递推',
    content: `## 记忆化搜索 vs 递推DP

### 对比

| 方面 | 记忆化搜索 | 递推DP |
|------|-----------|--------|
| 实现 | 递归 | 循环 |
| 思维 | 从问题到子问题 | 从子问题到问题 |
| 效率 | 略慢(递归开销) | 略快 |
| 空间 | 可能需要更多 | 通常更省 |

### 选择

- 递推容易写循环时选递推
- 状态转移复杂时选记忆化
- 拓扑顺序不明确时选记忆化`,
    codeExamples: [
      {
        title: '两种实现对比',
        code: `// 记忆化搜索
int memo[10005];
int dfs(int n) {
    if (n == 0) return 0;
    if (memo[n] != -1) return memo[n];
    return memo[n] = max(dfs(n-1), dfs(n-2) + a[n]);
}

// 递推DP
int dp[10005];
dp[0] = 0;
dp[1] = a[1];
for (int i = 2; i <= n; i++) {
    dp[i] = max(dp[i-1], dp[i-2] + a[i]);
}`,
        explanation: '记忆化与递推对比。',
      },
    ],
    keyPoints: ['理解两种方式等价', '根据情况选择'],
    commonMistakes: ['混淆两种方式', '选择不当'],
    tips: ['两种方式都要掌握', '各有适用场景'],
    relatedProblems: [95, 96],
  },

  'memo-examples': {
    id: 'memo-examples',
    title: '记忆化经典问题',
    content: `## 记忆化搜索经典问题

### 滑雪问题

在矩阵中找最长下降路径。

### 数字三角形

从顶到底的最大路径和。

### 区间DP

很多区间DP可以用记忆化实现。`,
    codeExamples: [
      {
        title: '滑雪问题',
        code: `int h[105][105];
int dp[105][105];
int n, m;
int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

int solve(int x, int y) {
    if (dp[x][y] != 0) return dp[x][y];
    
    int best = 1;
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < n && ny >= 0 && ny < m
            && h[nx][ny] < h[x][y]) {
            best = max(best, solve(nx, ny) + 1);
        }
    }
    
    return dp[x][y] = best;
}`,
        explanation: '记忆化搜索解滑雪问题。',
      },
    ],
    keyPoints: ['状态是坐标', '四个方向递归'],
    commonMistakes: ['忘记边界检查', '记忆化数组初始化'],
    tips: ['滑雪问题是经典记忆化题', '注意避免无限递归'],
    relatedProblems: [95, 96],
  },

  // Day 54: 字符串匹配
  'kmp-intro': {
    id: 'kmp-intro',
    title: 'KMP概念',
    content: `## KMP算法

KMP用于字符串匹配，时间复杂度O(n+m)。

### 核心思想

利用已经匹配的信息，跳过不必要的比较。

### 失败函数

next[i] = 模式串[0..i]的最长相等前后缀长度`,
    codeExamples: [
      {
        title: 'KMP匹配',
        code: `// 求next数组
vector<int> getNext(string p) {
    int m = p.size();
    vector<int> next(m);
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && p[i] != p[j]) j = next[j-1];
        if (p[i] == p[j]) j++;
        next[i] = j;
    }
    return next;
}

// KMP匹配
vector<int> kmp(string s, string p) {
    auto next = getNext(p);
    vector<int> matches;
    for (int i = 0, j = 0; i < s.size(); i++) {
        while (j > 0 && s[i] != p[j]) j = next[j-1];
        if (s[i] == p[j]) j++;
        if (j == p.size()) {
            matches.push_back(i - p.size() + 1);
            j = next[j-1];
        }
    }
    return matches;
}`,
        explanation: 'KMP字符串匹配。',
      },
    ],
    keyPoints: ['理解next数组', '掌握匹配过程'],
    commonMistakes: ['next数组计算错误', '边界处理'],
    tips: ['多画图理解', 'next数组是关键'],
    relatedProblems: [97, 98],
  },

  'kmp-next': {
    id: 'kmp-next',
    title: 'next数组',
    content: `## next数组详解

### 定义

next[i] = p[0..i]的最长相等真前后缀长度

### 示例

模式串 "ababac"

| i | p[0..i] | next[i] |
|---|---------|---------|
| 0 | a | 0 |
| 1 | ab | 0 |
| 2 | aba | 1 |
| 3 | abab | 2 |
| 4 | ababa | 3 |
| 5 | ababac | 0 |`,
    codeExamples: [
      {
        title: '求next数组',
        code: `vector<int> getNext(string p) {
    int m = p.size();
    vector<int> next(m, 0);
    
    for (int i = 1, j = 0; i < m; i++) {
        // 不匹配时回退
        while (j > 0 && p[i] != p[j]) {
            j = next[j - 1];
        }
        // 匹配时扩展
        if (p[i] == p[j]) {
            j++;
        }
        next[i] = j;
    }
    
    return next;
}`,
        explanation: '计算next数组。',
      },
    ],
    keyPoints: ['理解next数组含义', '掌握计算方法'],
    commonMistakes: ['j回退位置错误', '边界情况'],
    tips: ['next数组本质是自匹配', '可以用于其他问题'],
    relatedProblems: [97, 98],
  },

  'kmp-match': {
    id: 'kmp-match',
    title: 'KMP匹配过程',
    content: `## KMP匹配过程

### 步骤

1. 预处理模式串，求next数组
2. 匹配时，失配则根据next跳转
3. 匹配成功，继续寻找下一个匹配

### 优化

KMP可以用于：
- 找所有匹配位置
- 统计匹配次数
- 求循环节`,
    codeExamples: [
      {
        title: 'KMP完整实现',
        code: `vector<int> kmpSearch(string text, string pattern) {
    int n = text.size(), m = pattern.size();
    if (m == 0) return {};
    
    // 求next数组
    vector<int> next(m);
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && pattern[i] != pattern[j]) {
            j = next[j - 1];
        }
        if (pattern[i] == pattern[j]) j++;
        next[i] = j;
    }
    
    // 匹配
    vector<int> result;
    for (int i = 0, j = 0; i < n; i++) {
        while (j > 0 && text[i] != pattern[j]) {
            j = next[j - 1];
        }
        if (text[i] == pattern[j]) j++;
        if (j == m) {
            result.push_back(i - m + 1);
            j = next[j - 1];
        }
    }
    
    return result;
}`,
        explanation: 'KMP完整匹配过程。',
      },
    ],
    keyPoints: ['失配时用next跳转', '匹配成功后继续'],
    commonMistakes: ['跳转位置错误', '忘记继续匹配'],
    tips: ['KMP是重要算法', '很多字符串问题用到'],
    relatedProblems: [97, 98],
  },

  // Day 55: 哈希
  'hash-intro': {
    id: 'hash-intro',
    title: '哈希概念',
    content: `## 哈希

哈希将任意长度的数据映射到固定长度。

### 常用哈希函数

\`\`\`cpp
// 取模哈希
hash(x) = x % MOD

// 字符串哈希
hash(s) = (s[0] * p^(n-1) + s[1] * p^(n-2) + ... + s[n-1]) % MOD
\`\`\`

### 冲突

不同数据可能得到相同哈希值。`,
    codeExamples: [
      {
        title: '简单哈希',
        code: `const int MOD = 1e9 + 7;

long long hashString(string s) {
    long long h = 0;
    for (char c : s) {
        h = (h * 31 + c) % MOD;
    }
    return h;
}`,
        explanation: '字符串哈希。',
      },
    ],
    keyPoints: ['理解哈希映射', '知道冲突问题'],
    commonMistakes: ['哈希函数选择不当', '冲突处理'],
    tips: ['选择好的哈希函数', '双哈希减少冲突'],
    relatedProblems: [99, 100],
  },

  'str-hash': {
    id: 'str-hash',
    title: '字符串哈希',
    content: `## 字符串哈希

### 多项式哈希

\`\`\`cpp
hash(s) = s[0] * p^(n-1) + s[1] * p^(n-2) + ... + s[n-1]
\`\`\`

### 前缀哈希

预处理前缀哈希，可以O(1)求子串哈希：

\`\`\`cpp
hash(s[l..r]) = (h[r] - h[l-1] * p^(r-l+1)) % MOD
\`\`\``,
    codeExamples: [
      {
        title: '字符串哈希模板',
        code: `const long long MOD = 1e9 + 7;
const long long P = 31;

long long h[100005], p[100005];

void init(string s) {
    int n = s.size();
    p[0] = 1;
    for (int i = 1; i <= n; i++) {
        p[i] = p[i-1] * P % MOD;
    }
    h[0] = 0;
    for (int i = 1; i <= n; i++) {
        h[i] = (h[i-1] * P + s[i-1]) % MOD;
    }
}

long long getHash(int l, int r) {
    return (h[r] - h[l-1] * p[r-l+1] % MOD + MOD) % MOD;
}`,
        explanation: '字符串前缀哈希。',
      },
    ],
    keyPoints: ['前缀哈希预处理', '子串哈希O(1)'],
    commonMistakes: ['负数取模处理', 'p的幂次'],
    tips: ['双哈希减少冲突', 'P选择质数'],
    relatedProblems: [99, 100],
  },

  'hash-collision': {
    id: 'hash-collision',
    title: '哈希冲突',
    content: `## 哈希冲突

### 原因

哈希值空间有限，不同数据可能映射到相同值。

### 解决方法

1. **双哈希**：使用两个不同的哈希函数
2. **大质数**：选择大的质数作为模数
3. **开放寻址**：冲突时寻找下一个空位

### 双哈希

\`\`\`cpp
pair<long long, long long> hashPair(s) {
    return {hash1(s), hash2(s)};
}
\`\`\``,
    codeExamples: [
      {
        title: '双哈希',
        code: `const long long MOD1 = 1e9 + 7;
const long long MOD2 = 1e9 + 9;
const long long P = 31;

pair<long long, long long> hashString(string s) {
    long long h1 = 0, h2 = 0;
    for (char c : s) {
        h1 = (h1 * P + c) % MOD1;
        h2 = (h2 * P + c) % MOD2;
    }
    return {h1, h2};
}`,
        explanation: '双哈希减少冲突。',
      },
    ],
    keyPoints: ['理解冲突原因', '掌握解决方法'],
    commonMistakes: ['忽略冲突', '单哈希被卡'],
    tips: ['竞赛中常用双哈希', '选择不同的MOD'],
    relatedProblems: [99, 100],
  },

  // Day 56: 高精度
  'bigint-intro': {
    id: 'bigint-intro',
    title: '高精度概念',
    content: `## 高精度

当数字超出long long范围时，需要用数组存储。

### 存储方式

\`\`\`cpp
// 低位在前，高位在后
int a[10005];  // a[0]存个位
\`\`\`

### 基本操作

- 高精度加法
- 高精度减法
- 高精度乘法
- 高精度除法`,
    codeExamples: [
      {
        title: '高精度存储',
        code: `string s = "12345678901234567890";
int a[10005] = {0};
int len = s.size();

// 字符串转高精度
for (int i = 0; i < len; i++) {
    a[i] = s[len - 1 - i] - '0';  // 低位在前
}`,
        explanation: '高精度数的存储。',
      },
    ],
    keyPoints: ['低位在前存储', '用数组模拟'],
    commonMistakes: ['存储方向错误', '进位处理'],
    tips: ['熟练掌握加法和乘法', '减法注意借位'],
    relatedProblems: [72, 101],
  },

  'bigint-add': {
    id: 'bigint-add',
    title: '高精度加法',
    content: `## 高精度加法

### 算法

从低位到高位，逐位相加并处理进位。`,
    codeExamples: [
      {
        title: '高精度加法',
        code: `string add(string a, string b) {
    // 确保a较长
    if (a.size() < b.size()) swap(a, b);
    
    string result;
    int carry = 0;
    int i = a.size() - 1, j = b.size() - 1;
    
    while (i >= 0 || j >= 0 || carry) {
        int sum = carry;
        if (i >= 0) sum += a[i--] - '0';
        if (j >= 0) sum += b[j--] - '0';
        result = char(sum % 10 + '0') + result;
        carry = sum / 10;
    }
    
    return result;
}`,
        explanation: '高精度加法。',
      },
    ],
    keyPoints: ['处理进位', '注意长度不同'],
    commonMistakes: ['进位忘记', '顺序错误'],
    tips: ['从低位开始加', '最后检查carry'],
    relatedProblems: [72, 101],
  },

  'bigint-mul': {
    id: 'bigint-mul',
    title: '高精度乘法',
    content: `## 高精度乘法

### 算法

模拟竖式乘法，用高精度数乘以普通整数。`,
    codeExamples: [
      {
        title: '高精度乘法',
        code: `string multiply(string a, int b) {
    string result;
    int carry = 0;
    
    for (int i = a.size() - 1; i >= 0; i--) {
        int prod = (a[i] - '0') * b + carry;
        result = char(prod % 10 + '0') + result;
        carry = prod / 10;
    }
    
    while (carry) {
        result = char(carry % 10 + '0') + result;
        carry /= 10;
    }
    
    return result;
}

// 阶乘
string factorial(int n) {
    string result = "1";
    for (int i = 2; i <= n; i++) {
        result = multiply(result, i);
    }
    return result;
}`,
        explanation: '高精度乘法和阶乘。',
      },
    ],
    keyPoints: ['处理进位', '乘完检查剩余carry'],
    commonMistakes: ['进位处理错误', '结果顺序'],
    tips: ['可以扩展为高精度*高精度', '注意效率'],
    relatedProblems: [72, 101],
  },

  // Day 57-58: 线段树
  'segtree-build': {
    id: 'segtree-build',
    title: '线段树建树',
    content: `## 线段树建树

### 结构

线段树是一棵完全二叉树：
- 根节点表示区间[1,n]
- 每个节点表示一个区间
- 左孩子表示左半区间，右孩子表示右半区间

### 数组存储

\`\`\`cpp
tree[1] = 根节点
tree[2*i] = 左孩子
tree[2*i+1] = 右孩子
\`\`\``,
    codeExamples: [
      {
        title: '建树',
        code: `int a[10005];
int tree[40005];

void build(int node, int l, int r) {
    if (l == r) {
        tree[node] = a[l];
        return;
    }
    int mid = (l + r) / 2;
    build(2 * node, l, mid);
    build(2 * node + 1, mid + 1, r);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

// 调用
build(1, 1, n);`,
        explanation: '线段树建树。',
      },
    ],
    keyPoints: ['递归建树', '理解节点编号'],
    commonMistakes: ['节点编号错误', '边界处理'],
    tips: ['数组开4倍大小', '注意下标从1开始'],
    relatedProblems: [102, 103],
  },

  'segtree-query': {
    id: 'segtree-query',
    title: '区间查询',
    content: `## 线段树区间查询

### 思路

从根节点开始，判断查询区间与当前节点区间的关系。

### 情况

1. 完全包含：直接返回节点值
2. 完全不相交：返回0
3. 部分相交：递归查询子节点`,
    codeExamples: [
      {
        title: '区间查询',
        code: `int query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;  // 不相交
    if (ql <= l && r <= qr) return tree[node];  // 完全包含
    
    int mid = (l + r) / 2;
    return query(2 * node, l, mid, ql, qr) +
           query(2 * node + 1, mid + 1, r, ql, qr);
}

// 查询区间[ql, qr]的和
int sum = query(1, 1, n, ql, qr);`,
        explanation: '线段树区间查询。',
      },
    ],
    keyPoints: ['理解三种情况', '递归处理'],
    commonMistakes: ['边界条件错误', '区间判断'],
    tips: ['时间复杂度O(log n)', '代码简洁'],
    relatedProblems: [102, 103],
  },

  'segtree-update': {
    id: 'segtree-update',
    title: '区间修改',
    content: `## 线段树区间修改

### 单点修改

找到叶子节点，更新后回溯更新父节点。

### 区间修改

需要懒标记优化。`,
    codeExamples: [
      {
        title: '单点修改',
        code: `void update(int node, int l, int r, int pos, int val) {
    if (l == r) {
        tree[node] = val;
        return;
    }
    int mid = (l + r) / 2;
    if (pos <= mid) {
        update(2 * node, l, mid, pos, val);
    } else {
        update(2 * node + 1, mid + 1, r, pos, val);
    }
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

// 将位置pos的值改为val
update(1, 1, n, pos, val);`,
        explanation: '线段树单点修改。',
      },
    ],
    keyPoints: ['找到叶子节点', '回溯更新'],
    commonMistakes: ['忘记更新父节点', '方向判断错误'],
    tips: ['单点修改是基础', '区间修改需要懒标记'],
    relatedProblems: [103, 104],
  },

  // Day 59: 树状数组
  'bit-intro': {
    id: 'bit-intro',
    title: '树状数组概念',
    content: `## 树状数组

树状数组(BIT)是一种支持单点修改和区间查询的数据结构。

### 特点

- 代码简洁
- 常数小
- 功能比线段树少，但够用

### 核心操作

\`\`\`cpp
int lowbit(int x) {
    return x & (-x);
}
\`\`\``,
    codeExamples: [
      {
        title: '树状数组结构',
        code: `// 树状数组结构
// c[i] 管理 a[i - lowbit(i) + 1] 到 a[i] 的和
// c[1] = a[1]
// c[2] = a[1] + a[2]
// c[3] = a[3]
// c[4] = a[1] + a[2] + a[3] + a[4]
// ...

int lowbit(int x) {
    return x & (-x);
}`,
        explanation: '树状数组的结构理解。',
      },
    ],
    keyPoints: ['理解lowbit', '知道管理范围'],
    commonMistakes: ['下标从0还是1开始', '管理范围理解错误'],
    tips: ['树状数组从下标1开始', '适合前缀和问题'],
    relatedProblems: [105, 106],
  },

  'bit-ops': {
    id: 'bit-ops',
    title: '树状数组操作',
    content: `## 树状数组基本操作

### 单点修改

\`\`\`cpp
void update(int i, int delta) {
    while (i <= n) {
        c[i] += delta;
        i += lowbit(i);
    }
}
\`\`\`

### 前缀查询

\`\`\`cpp
int query(int i) {
    int sum = 0;
    while (i > 0) {
        sum += c[i];
        i -= lowbit(i);
    }
    return sum;
}
\`\`\``,
    codeExamples: [
      {
        title: '树状数组模板',
        code: `int c[10005];
int n;

int lowbit(int x) {
    return x & (-x);
}

void update(int i, int delta) {
    while (i <= n) {
        c[i] += delta;
        i += lowbit(i);
    }
}

int query(int i) {
    int sum = 0;
    while (i > 0) {
        sum += c[i];
        i -= lowbit(i);
    }
    return sum;
}

// 区间查询[l, r]
int rangeQuery(int l, int r) {
    return query(r) - query(l - 1);
}`,
        explanation: '树状数组基本操作。',
      },
    ],
    keyPoints: ['掌握update和query', '理解跳转方向'],
    commonMistakes: ['lowbit方向错误', '边界处理'],
    tips: ['update向上跳', 'query向下跳'],
    relatedProblems: [105, 106],
  },

  'bit-vs-seg': {
    id: 'bit-vs-seg',
    title: '与线段树对比',
    content: `## 树状数组 vs 线段树

| 特性 | 树状数组 | 线段树 |
|------|----------|--------|
| 代码量 | 少 | 多 |
| 常数 | 小 | 大 |
| 功能 | 单点修改+前缀查询 | 区间修改+区间查询 |
| 空间 | O(n) | O(4n) |
| 时间 | O(log n) | O(log n) |

### 选择

- 简单前缀和问题：树状数组
- 复杂区间问题：线段树`,
    codeExamples: [
      {
        title: '对比示例',
        code: `// 树状数组：适合
// - 单点修改，前缀查询
// - 求逆序对

// 线段树：适合
// - 区间修改
// - 区间最值
// - 复杂区间操作`,
        explanation: '选择合适数据结构。',
      },
    ],
    keyPoints: ['理解各自适用场景', '根据题目选择'],
    commonMistakes: ['树状数组强行做区间修改', '功能不足时强用'],
    tips: ['简单问题用树状数组', '复杂问题用线段树'],
    relatedProblems: [105, 106],
  },

  // Day 60: Trie树
  'trie-ops': {
    id: 'trie-ops',
    title: 'Trie插入和查询',
    content: `## Trie操作

### 插入

\`\`\`cpp
void insert(string s) {
    int node = 0;
    for (char c : s) {
        if (!trie[node][c-'a']) {
            trie[node][c-'a'] = ++cnt;
        }
        node = trie[node][c-'a'];
    }
    isEnd[node] = true;
}
\`\`\`

### 查询

\`\`\`cpp
bool search(string s) {
    int node = 0;
    for (char c : s) {
        if (!trie[node][c-'a']) return false;
        node = trie[node][c-'a'];
    }
    return isEnd[node];
}
\`\`\``,
    codeExamples: [
      {
        title: 'Trie模板',
        code: `int trie[100005][26];
bool isEnd[100005];
int cnt = 0;

void insert(string s) {
    int node = 0;
    for (char c : s) {
        int idx = c - 'a';
        if (!trie[node][idx]) {
            trie[node][idx] = ++cnt;
        }
        node = trie[node][idx];
    }
    isEnd[node] = true;
}

bool search(string s) {
    int node = 0;
    for (char c : s) {
        int idx = c - 'a';
        if (!trie[node][idx]) return false;
        node = trie[node][idx];
    }
    return isEnd[node];
}`,
        explanation: 'Trie插入和查询。',
      },
    ],
    keyPoints: ['掌握插入和查询', '理解节点编号'],
    commonMistakes: ['节点编号管理', 'isEnd标记'],
    tips: ['可以统计出现次数', '空间要开够'],
    relatedProblems: [107, 108],
  },

  'trie-apps': {
    id: 'trie-apps',
    title: 'Trie应用场景',
    content: `## Trie应用场景

### 常见应用

1. 字符串查找
2. 前缀匹配
3. 词频统计
4. 异或最值问题

### 异或最值

从高位到低位建Trie，贪心选择相反位。`,
    codeExamples: [
      {
        title: '最大异或对',
        code: `int trie[4000005][2];
int cnt = 0;

void insert(int x) {
    int node = 0;
    for (int i = 30; i >= 0; i--) {
        int b = (x >> i) & 1;
        if (!trie[node][b]) trie[node][b] = ++cnt;
        node = trie[node][b];
    }
}

int query(int x) {
    int node = 0, result = 0;
    for (int i = 30; i >= 0; i--) {
        int b = (x >> i) & 1;
        if (trie[node][!b]) {
            result |= (1 << i);
            node = trie[node][!b];
        } else {
            node = trie[node][b];
        }
    }
    return result;
}`,
        explanation: 'Trie求最大异或对。',
      },
    ],
    keyPoints: ['理解各种应用', '掌握异或问题'],
    commonMistakes: ['空间开不够', '异或方向错误'],
    tips: ['异或问题从高位开始', '可以结合贪心'],
    relatedProblems: [107, 108],
  },

  // Day 61: 拓扑排序
  'topo-intro': {
    id: 'topo-intro',
    title: '拓扑排序概念',
    content: `## 拓扑排序

对有向无环图(DAG)的顶点排序，使得所有边u→v，u在v之前。

### 应用

- 任务调度
- 课程安排
- 判断是否有环`,
    codeExamples: [
      {
        title: '拓扑排序概念',
        code: `// 有向边 u -> v
// 拓扑序中 u 在 v 之前

// 示例：
// 边: 1->2, 1->3, 2->4, 3->4
// 拓扑序: 1, 2, 3, 4 或 1, 3, 2, 4`,
        explanation: '拓扑排序的基本概念。',
      },
    ],
    keyPoints: ['只适用于DAG', '结果可能不唯一'],
    commonMistakes: ['有环图不能拓扑排序', '结果不唯一'],
    tips: ['可以判断图是否有环', 'Kahn算法实现简单'],
    relatedProblems: [109, 110],
  },

  'topo-impl': {
    id: 'topo-impl',
    title: '拓扑排序实现',
    content: `## Kahn算法

### 步骤

1. 计算所有顶点的入度
2. 将入度为0的点加入队列
3. 取出队首，删除其出边
4. 若新的入度为0的点，加入队列
5. 重复直到队列为空`,
    codeExamples: [
      {
        title: 'Kahn算法',
        code: `vector<int> adj[10005];
int inDegree[10005];

vector<int> topoSort(int n) {
    vector<int> result;
    queue<int> q;
    
    for (int i = 1; i <= n; i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    return result;  // 如果result.size() < n，说明有环
}`,
        explanation: 'Kahn算法实现拓扑排序。',
      },
    ],
    keyPoints: ['入度为0入队', '删边更新入度'],
    commonMistakes: ['忘记更新入度', '环的判断'],
    tips: ['可以用优先队列求字典序最小的', 'DFS也可以实现'],
    relatedProblems: [109, 110],
  },

  'topo-apps': {
    id: 'topo-apps',
    title: '拓扑排序应用',
    content: `## 拓扑排序应用

### 判断环

如果拓扑排序结果不足n个点，说明图中有环。

### 任务调度

按拓扑序执行任务，保证依赖关系。

### 关键路径

求任务的最早/最晚开始时间。`,
    codeExamples: [
      {
        title: '判断是否有环',
        code: `bool hasCycle(int n) {
    vector<int> result = topoSort(n);
    return result.size() < n;
}

// 关键路径示例
// 最早开始时间: 按拓扑序正向求
// 最晚开始时间: 按拓扑序逆向求`,
        explanation: '拓扑排序判断环。',
      },
    ],
    keyPoints: ['判断环', '任务调度'],
    commonMistakes: ['环的判断条件', '结果不唯一'],
    tips: ['很多问题需要先拓扑排序', '可以配合DP'],
    relatedProblems: [109, 110],
  },

  // Day 62: LCA
  'lca-intro': {
    id: 'lca-intro',
    title: 'LCA概念',
    content: `## 最近公共祖先(LCA)

树上两点的最近公共祖先。

### 定义

u和v的LCA是同时是u和v祖先的深度最大的节点。

### 应用

- 求两点间距离
- 树上路径问题
- 树链剖分基础`,
    codeExamples: [
      {
        title: 'LCA概念',
        code: `// 示例树：
//       1
//      / \\
//     2   3
//    / \\
//   4   5
// LCA(4, 5) = 2
// LCA(4, 3) = 1
// LCA(2, 4) = 2`,
        explanation: 'LCA的基本概念。',
      },
    ],
    keyPoints: ['理解LCA定义', '知道应用场景'],
    commonMistakes: ['LCA可以是u或v本身', '深度判断'],
    tips: ['LCA是重要问题', '有多种解法'],
    relatedProblems: [111, 112],
  },

  'lca-naive': {
    id: 'lca-naive',
    title: 'LCA朴素算法',
    content: `## LCA朴素算法

### 方法

1. 先将较深的点向上跳到同一深度
2. 然后两点同时向上跳
3. 直到相遇

### 复杂度

O(n)每次查询`,
    codeExamples: [
      {
        title: 'LCA朴素实现',
        code: `int parent[10005], depth[10005];

int lca(int u, int v) {
    // 保证u较深
    if (depth[u] < depth[v]) swap(u, v);
    
    // u向上跳到同一深度
    while (depth[u] > depth[v]) {
        u = parent[u];
    }
    
    // 同时向上跳
    while (u != v) {
        u = parent[u];
        v = parent[v];
    }
    
    return u;
}`,
        explanation: 'LCA朴素实现。',
      },
    ],
    keyPoints: ['先对齐深度', '再同时跳'],
    commonMistakes: ['深度对齐错误', '跳过LCA'],
    tips: ['可以预处理parent和depth', '复杂度高但简单'],
    relatedProblems: [111, 112],
  },

  'lca-binary': {
    id: 'lca-binary',
    title: 'LCA倍增算法',
    content: `## LCA倍增算法

预处理每个点向上跳2^k步到达的点，O(log n)查询。

### 预处理

\`\`\`cpp
up[u][k] = u向上跳2^k步到达的点
up[u][0] = parent[u]
up[u][k] = up[up[u][k-1]][k-1]
\`\`\`

### 查询

按二进制从大到小跳。`,
    codeExamples: [
      {
        title: 'LCA倍增',
        code: `int up[10005][15];  // 2^14 > 10000
int depth[10005];

void dfs(int u, int p, int d) {
    depth[u] = d;
    up[u][0] = p;
    for (int k = 1; k < 15; k++) {
        up[u][k] = up[up[u][k-1]][k-1];
    }
    for (int v : adj[u]) {
        if (v != p) dfs(v, u, d + 1);
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    
    // u跳到同一深度
    int diff = depth[u] - depth[v];
    for (int k = 0; k < 15; k++) {
        if ((diff >> k) & 1) u = up[u][k];
    }
    
    if (u == v) return u;
    
    // 同时向上跳
    for (int k = 14; k >= 0; k--) {
        if (up[u][k] != up[v][k]) {
            u = up[u][k];
            v = up[v][k];
        }
    }
    
    return up[u][0];
}`,
        explanation: 'LCA倍增算法。',
      },
    ],
    keyPoints: ['预处理up数组', '二进制跳转'],
    commonMistakes: ['k的范围', '跳转顺序'],
    tips: ['预处理O(n log n)', '查询O(log n)'],
    relatedProblems: [111, 112],
  },

  // Day 63: 数位DP
  'digit-dp-intro': {
    id: 'digit-dp-intro',
    title: '数位DP概念',
    content: `## 数位DP

对数字的各位进行动态规划。

### 适用问题

- 求区间[l,r]中满足条件的数的个数
- 条件通常与数字的各位有关

### 基本思想

- 数位限制
- 从高位到低位DP
- 用记忆化搜索实现`,
    codeExamples: [
      {
        title: '数位DP概念',
        code: `// 典型问题：求[1,n]中不包含数字4的数的个数
// 
// 思路：
// 从高位到低位枚举
// 每位可以填0-9（但受limit限制）
// 如果某位填了4，就不满足条件`,
        explanation: '数位DP的基本概念。',
      },
    ],
    keyPoints: ['数位限制', '记忆化搜索'],
    commonMistakes: ['limit处理错误', '前导零'],
    tips: ['数位DP是套路题', '掌握模板'],
    relatedProblems: [113, 114],
  },

  'digit-dp-state': {
    id: 'digit-dp-state',
    title: '数位DP状态设计',
    content: `## 数位DP状态设计

### 常见状态

\`\`\`cpp
// pos: 当前位
// limit: 是否达到上限
// lead: 是否有前导零
// state: 其他状态（根据题目）
\`\`\`

### 记忆化

不含limit和lead的状态可以记忆化。`,
    codeExamples: [
      {
        title: '数位DP模板',
        code: `int dp[20][2];  // pos, state
int digit[20];

int dfs(int pos, bool limit, bool lead, int state) {
    if (pos == 0) return 1;  // 根据题目返回
    
    if (!limit && !lead && dp[pos][state] != -1) {
        return dp[pos][state];
    }
    
    int up = limit ? digit[pos] : 9;
    int result = 0;
    
    for (int i = 0; i <= up; i++) {
        // 根据题目条件判断
        if (i == 4) continue;  // 不选4
        
        result += dfs(pos - 1, limit && i == up, 
                      lead && i == 0, newState);
    }
    
    if (!limit && !lead) {
        dp[pos][state] = result;
    }
    
    return result;
}`,
        explanation: '数位DP记忆化模板。',
      },
    ],
    keyPoints: ['状态设计', 'limit和lead的处理'],
    commonMistakes: ['记忆化条件', 'limit传递'],
    tips: ['limit=true不能记忆化', '多练习经典题'],
    relatedProblems: [113, 114],
  },

  'digit-dp-examples': {
    id: 'digit-dp-examples',
    title: '数位DP经典问题',
    content: `## 数位DP经典问题

### 不含4

求[1,n]中不含数字4的数的个数。

### 含62

求[1,n]中不含"62"子串的数的个数。

### 数位和

求数位和满足条件的数的个数。`,
    codeExamples: [
      {
        title: '不含4的数',
        code: `int dp[20];
int digit[20];

int dfs(int pos, bool limit) {
    if (pos == 0) return 1;
    if (!limit && dp[pos] != -1) return dp[pos];
    
    int up = limit ? digit[pos] : 9;
    int result = 0;
    
    for (int i = 0; i <= up; i++) {
        if (i == 4) continue;  // 不选4
        result += dfs(pos - 1, limit && i == up);
    }
    
    if (!limit) dp[pos] = result;
    return result;
}

int solve(int n) {
    memset(dp, -1, sizeof(dp));
    int len = 0;
    while (n) {
        digit[++len] = n % 10;
        n /= 10;
    }
    return dfs(len, true);
}`,
        explanation: '求不含4的数的个数。',
      },
    ],
    keyPoints: ['掌握经典问题', '灵活变形'],
    commonMistakes: ['状态遗漏', '边界条件'],
    tips: ['多做模板题', '注意题目条件'],
    relatedProblems: [113, 114],
  },

  // Day 64: 博弈论DP
  'game-dp-intro': {
    id: 'game-dp-intro',
    title: '博弈论基础',
    content: `## 博弈论基础

### 公平组合游戏

- 两人轮流操作
- 信息完全公开
- 无平局

### 必胜态与必败态

- 必胜态：存在一种走法到达必败态
- 必败态：所有走法都到达必胜态`,
    codeExamples: [
      {
        title: '简单博弈',
        code: `// 取石子游戏：n个石子，每次取1-3个
// dp[i] = true 表示有i个石子时先手必胜

bool dp[10005];

void init(int n) {
    for (int i = 1; i <= n; i++) {
        // 如果能到达必败态，则必胜
        if (i >= 1 && !dp[i-1]) dp[i] = true;
        else if (i >= 2 && !dp[i-2]) dp[i] = true;
        else if (i >= 3 && !dp[i-3]) dp[i] = true;
        else dp[i] = false;
    }
}`,
        explanation: '简单取石子博弈。',
      },
    ],
    keyPoints: ['必胜必败态', 'DP求解'],
    commonMistakes: ['状态定义错误', '转移遗漏'],
    tips: ['很多博弈问题用DP', '注意先手后手'],
    relatedProblems: [115, 116],
  },

  'sg-function': {
    id: 'sg-function',
    title: 'SG函数',
    content: `## SG函数

### 定义

SG(x) = mex({SG(y) | x可以到达y})

mex(S) = 不在集合S中的最小非负整数

### 性质

- 必败态: SG = 0
- 必胜态: SG > 0

### SG定理

多个独立游戏的SG值等于各游戏SG值的异或。`,
    codeExamples: [
      {
        title: 'SG函数',
        code: `int sg[10005];
bool vis[10005];

int getSG(int n, vector<int>& moves) {
    memset(sg, 0, sizeof(sg));
    
    for (int i = 1; i <= n; i++) {
        memset(vis, false, sizeof(vis));
        for (int m : moves) {
            if (i >= m) {
                vis[sg[i - m]] = true;
            }
        }
        // mex
        for (int j = 0; ; j++) {
            if (!vis[j]) {
                sg[i] = j;
                break;
            }
        }
    }
    
    return sg[n];
}`,
        explanation: 'SG函数计算。',
      },
    ],
    keyPoints: ['理解mex操作', '掌握SG定理'],
    commonMistakes: ['mex计算错误', '忘记清vis'],
    tips: ['SG定理解决多堆问题', '很多博弈题的通法'],
    relatedProblems: [115, 116],
  },

  'nim-game': {
    id: 'nim-game',
    title: 'Nim游戏',
    content: `## Nim游戏

### 规则

n堆石子，每次从一堆中取任意个，取最后一个者胜。

### 结论

先手必胜当且仅当所有堆石子数的异或和不为0。

### 证明

这实际上是SG定理的特例，每堆石子的SG值就是石子数。`,
    codeExamples: [
      {
        title: 'Nim游戏',
        code: `bool nim(vector<int>& piles) {
    int xorSum = 0;
    for (int x : piles) {
        xorSum ^= x;
    }
    return xorSum != 0;  // 异或和不为0则先手必胜
}

int main() {
    int n;
    cin >> n;
    vector<int> piles(n);
    for (int i = 0; i < n; i++) {
        cin >> piles[i];
    }
    
    if (nim(piles)) {
        cout << "先手必胜" << endl;
    } else {
        cout << "后手必胜" << endl;
    }
    return 0;
}`,
        explanation: 'Nim游戏判断。',
      },
    ],
    keyPoints: ['记住Nim结论', '理解与SG的关系'],
    commonMistakes: ['异或和计算错误', '结论记反'],
    tips: ['Nim是最经典的博弈', '很多博弈可以转化为Nim'],
    relatedProblems: [115, 116],
  },

  // Day 65-70: 复习和考核
  'review-search': {
    id: 'review-search',
    title: '搜索算法复习',
    content: `## 搜索算法复习

### DFS

- 递归实现
- 适合求方案数、方案输出
- 需要回溯

### BFS

- 队列实现
- 适合求最短路
- 入队时标记

### 剪枝

- 可行性剪枝
- 最优性剪枝
- 减少搜索空间`,
    codeExamples: [
      {
        title: '搜索复习要点',
        code: `// DFS模板
void dfs(int state) {
    if (目标状态) { 处理; return; }
    for (所有可能的下一步) {
        if (可行) {
            标记;
            dfs(新状态);
            回溯;
        }
    }
}

// BFS模板
void bfs() {
    q.push(起点);
    visited[起点] = true;
    while (!q.empty()) {
        auto cur = q.front(); q.pop();
        for (所有相邻状态) {
            if (!visited[下一状态]) {
                visited[下一状态] = true;
                q.push(下一状态);
            }
        }
    }
}`,
        explanation: '搜索算法模板回顾。',
      },
    ],
    keyPoints: ['掌握两种搜索模板', '理解适用场景'],
    commonMistakes: ['忘记标记', '忘记回溯'],
    tips: ['画搜索树理解', '注意剪枝优化'],
    relatedProblems: [65, 68, 69, 71],
  },

  'review-dp': {
    id: 'review-dp',
    title: '动态规划复习',
    content: `## 动态规划复习

### 基本步骤

1. 状态定义
2. 状态转移方程
3. 边界条件
4. 计算顺序

### 常见类型

- 线性DP（LIS、LCS）
- 背包问题
- 区间DP
- 树形DP
- 状压DP`,
    codeExamples: [
      {
        title: 'DP复习要点',
        code: `// 状态定义要明确
// dp[i] 表示什么？

// 转移方程要正确
// dp[i] = 从哪些状态转移来？

// 边界要处理好
// dp[0] = ? dp[1] = ?

// 顺序要正确
// 保证转移时用到的状态已计算`,
        explanation: 'DP核心要点回顾。',
      },
    ],
    keyPoints: ['掌握DP思路', '多练习典型题'],
    commonMistakes: ['状态定义不清', '转移错误', '边界错误'],
    tips: ['从简单例子验证', '画表格理解转移'],
    relatedProblems: [73, 75, 79, 93],
  },

  'review-graph': {
    id: 'review-graph',
    title: '图论复习',
    content: `## 图论复习

### 图的存储

- 邻接矩阵
- 邻接表（推荐）

### 图的遍历

- DFS
- BFS

### 最短路

- Dijkstra（非负权）
- Floyd（全源）
- SPFA（负权）

### 生成树

- Kruskal
- Prim`,
    codeExamples: [
      {
        title: '图论算法回顾',
        code: `// 存储方式选择
// 稀疏图：邻接表
// 稠密图：邻接矩阵

// 最短路选择
// 单源非负权：Dijkstra
// 全源：Floyd
// 负权：SPFA

// 生成树选择
// 稀疏图：Kruskal
// 稠密图：Prim`,
        explanation: '图论算法选择。',
      },
    ],
    keyPoints: ['掌握各算法适用场景', '正确选择算法'],
    commonMistakes: ['算法选择错误', '实现细节错误'],
    tips: ['理解算法原理', '多写模板'],
    relatedProblems: [86, 89, 91, 111],
  },

  'review-ds': {
    id: 'review-ds',
    title: '数据结构复习',
    content: `## 数据结构复习

### 基础数据结构

- 数组
- 栈
- 队列

### 高级数据结构

- 并查集
- 线段树
- 树状数组
- Trie树`,
    codeExamples: [
      {
        title: '数据结构选择',
        code: `// 并查集：连通性问题
// 线段树：区间修改+区间查询
// 树状数组：单点修改+前缀查询
// Trie：字符串问题、异或问题`,
        explanation: '数据结构适用场景。',
      },
    ],
    keyPoints: ['理解各数据结构特点', '正确选择'],
    commonMistakes: ['数据结构选择不当', '实现错误'],
    tips: ['掌握常用模板', '注意空间复杂度'],
    relatedProblems: [102, 105, 107, 61],
  },

  'practice-intermediate': {
    id: 'practice-intermediate',
    title: '进阶综合练习',
    content: `## 进阶综合练习

综合运用进阶阶段所学的算法和数据结构，解决复杂问题。

### 涉及知识点

- 搜索算法
- 动态规划
- 图论算法
- 高级数据结构`,
    codeExamples: [
      {
        title: '综合练习建议',
        code: `// 1. 分析题目类型
// 2. 选择合适的算法
// 3. 设计算法流程
// 4. 注意边界情况
// 5. 优化时间空间`,
        explanation: '综合练习思路。',
      },
    ],
    keyPoints: ['综合运用知识', '分析问题能力'],
    commonMistakes: ['算法选择错误', '实现细节错误'],
    tips: ['多做综合题', '总结解题思路'],
    relatedProblems: [117, 118, 119, 120],
  },

  'exam-intermediate': {
    id: 'exam-intermediate',
    title: '阶段考核',
    content: `## 进阶阶段考核

检验进阶阶段学习成果。

### 考核内容

- 搜索算法应用
- 动态规划问题
- 图论问题
- 数据结构应用

### 要求

能够独立分析问题并选择合适的算法解决。`,
    codeExamples: [
      {
        title: '考核要求',
        code: `// 1. 正确理解题意
// 2. 选择合适算法
// 3. 正确实现代码
// 4. 处理边界情况
// 5. 通过测试用例`,
        explanation: '考核标准。',
      },
    ],
    keyPoints: ['独立解决问题', '综合运用知识'],
    commonMistakes: ['审题不清', '算法选择错误'],
    tips: ['先分析再编码', '注意特殊情况'],
    relatedProblems: [121, 122, 123, 124],
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

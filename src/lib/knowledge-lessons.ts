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
  relatedKnowledge?: string[]; // 相关知识点ID（可选）
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
    content: `## 搜索顺序详解

DFS的搜索顺序决定了搜索树的形态，合理设计搜索顺序可以优化效率。

### 搜索树的概念

DFS可以看作是在搜索树上的遍历，每个节点代表一个状态，边代表状态转移。

**搜索树的特点：**
- 根节点：初始状态
- 叶节点：终止状态（成功或失败）
- 路径：从根到某个节点的路径代表一个部分解

### 常见搜索顺序

#### 1. 位置优先
先确定前面的位置，再确定后面的位置。
\`\`\`
填第1位 → 填第2位 → ... → 填第n位
\`\`\`

**适用场景：** 排列、组合问题

#### 2. 数值优先
先尝试小的数值，再尝试大的数值。
\`\`\`
尝试放1 → 尝试放2 → ... → 尝试放n
\`\`\`

**适用场景：** 求最小/最大方案、字典序

#### 3. 分支优先
按特定优先级选择分支方向。
\`\`\`
上下左右 → 右下左上 → ...
\`\`\`

**适用场景：** 迷宫、路径搜索

### 设计原则

1. **避免重复搜索**：通过参数控制范围（如start）
2. **尽早剪枝**：把必然失败的情况排除
3. **状态表示完整**：确保能恢复现场

### 经典示例：全排列

**位置优先 vs 数值优先：**

位置优先（填位置）：
\`\`\`
第1位放1 → 第2位放2 → 第3位放3 → 输出[1,2,3]
                    → 第3位不能放1,2，回溯
        → 第2位放3 → 第3位放2 → 输出[1,3,2]
\`\`\`

数值优先（放数值）：
\`\`\`
放1在第1位 → 放2在第2位 → ... 
放1在第2位 → ...
\`\`\`

### 优化策略

1. **选择分支少的先搜索**：减少搜索树规模
2. **优先选约束多的位置**：更容易剪枝
3. **记录已选状态**：避免重复`,
    codeExamples: [
      {
        title: '位置优先 - 全排列',
        code: `// 按位置填数：依次确定每个位置放什么
int n;
int a[20];        // 当前排列
bool used[20];    // used[i]表示数字i是否已使用

void dfs(int pos) {
    if (pos > n) {
        // 输出排列
        for (int i = 1; i <= n; i++) cout << a[i] << " ";
        cout << endl;
        return;
    }
    // 尝试在位置pos放每个可用数字
    for (int num = 1; num <= n; num++) {
        if (!used[num]) {
            a[pos] = num;
            used[num] = true;
            dfs(pos + 1);    // 填下一个位置
            used[num] = false;  // 回溯
        }
    }
}`,
        explanation: '位置优先：确定当前放什么，再递归下一个位置',
      },
      {
        title: '数值优先 - 全排列',
        code: `// 按数值填位置：依次确定每个数放在哪
int n;
int pos[20];      // pos[num]表示数字num放在哪个位置
bool occupied[20]; // occupied[p]表示位置p是否被占用

void dfs(int num) {
    if (num > n) {
        // 输出排列
        for (int i = 1; i <= n; i++) cout << pos[i] << " ";
        cout << endl;
        return;
    }
    // 尝试把num放在每个可用位置
    for (int p = 1; p <= n; p++) {
        if (!occupied[p]) {
            pos[num] = p;
            occupied[p] = true;
            dfs(num + 1);    // 放下一个数
            occupied[p] = false;  // 回溯
        }
    }
}`,
        explanation: '数值优先：确定当前数放哪，再递归下一个数',
      },
    ],
    keyPoints: ['搜索树是理解DFS的关键', '搜索顺序影响效率和实现复杂度', '位置优先最常用，适合大多数问题'],
    commonMistakes: ['搜索顺序混乱导致重复或遗漏', '回溯不彻底导致状态错误', '没有利用搜索顺序剪枝'],
    tips: ['画出小规模搜索树帮助理解', '选择能使剪枝更早的顺序', '根据题目要求选择合适顺序'],
    relatedKnowledge: ['dfs-intro', 'dfs-impl', 'dfs-prune'],
    relatedProblems: [66, 67],
  },

  // Day 37: DFS应用
  'dfs-combine': {
    id: 'dfs-combine',
    title: '组合',
    content: `## 组合问题详解

从n个不同元素中选出k个元素的所有组合方式。

### 组合与排列的区别

| 类型 | 特点 | 示例 |
|------|------|------|
| 排列 | 有序 | {1,2,3}和{3,2,1}是不同排列 |
| 组合 | 无序 | {1,2,3}和{3,2,1}是同一组合 |

**数学表示：**
- 排列数：P(n,k) = n!/(n-k)!
- 组合数：C(n,k) = n!/(k!(n-k)!)

### 组合的核心思想

避免重复的关键：**保证选数的顺序是递增的**

如果每次都从比上一个数更大的位置开始选，就不会选到重复的组合。

### 实现方法

#### 方法一：start参数
\`\`\`cpp
void dfs(int start, int cnt) {
    // start: 从哪个数开始选
    // cnt: 已经选了几个数
}
\`\`\`

#### 方法二：二进制枚举
用n位二进制数表示选择状态，1表示选，0表示不选。

### 经典模板

**C(n,k) - 从1到n中选k个数的组合：**
\`\`\`cpp
int n, k;
int path[20];  // 存储当前组合

void dfs(int start, int cnt) {
    if (cnt == k) {
        // 选够了k个，输出
        for (int i = 0; i < k; i++) 
            cout << path[i] << " ";
        cout << endl;
        return;
    }
    // 从start开始选，保证递增
    for (int i = start; i <= n; i++) {
        path[cnt] = i;
        dfs(i + 1, cnt + 1);  // 从i+1开始，不会重复
    }
}
\`\`\`

### 剪枝优化

当剩余数不够选时，可以提前终止：
\`\`\`cpp
// 剩余可选数：n - i + 1
// 还需要选：k - cnt
if (n - i + 1 < k - cnt) continue;  // 剪枝
\`\`\`

### 变形问题

1. **可重复组合**：每个数可选多次
2. **子集问题**：输出所有子集（每个数选或不选）
3. **组合求和**：组合的和等于目标值`,
    codeExamples: [
      {
        title: '基础组合 C(n,k)',
        code: `#include <bits/stdc++.h>
using namespace std;

int n, k;
int path[20];

void dfs(int start, int cnt) {
    // 剪枝：剩余数不够选
    if (n - start + 1 < k - cnt) return;
    
    if (cnt == k) {
        for (int i = 0; i < k; i++) 
            cout << path[i] << " ";
        cout << endl;
        return;
    }
    
    for (int i = start; i <= n; i++) {
        path[cnt] = i;
        dfs(i + 1, cnt + 1);
    }
}

int main() {
    cin >> n >> k;
    dfs(1, 0);
    return 0;
}`,
        explanation: '从1到n中选k个数，使用start保证递增避免重复',
      },
      {
        title: '子集问题 - 每个数选或不选',
        code: `int n;
int a[20];

void dfs(int pos) {
    if (pos > n) {
        // 输出当前子集
        for (int i = 1; i <= n; i++)
            if (a[i]) cout << i << " ";
        cout << endl;
        return;
    }
    // 不选pos
    a[pos] = 0;
    dfs(pos + 1);
    // 选pos
    a[pos] = 1;
    dfs(pos + 1);
}`,
        explanation: '每个位置有选或不选两种选择，共2^n个子集',
      },
      {
        title: '组合求和',
        code: `// 从candidates中选若干数，和为target
void dfs(vector<int>& candidates, int start, int target, 
         vector<int>& path, vector<vector<int>>& res) {
    if (target == 0) {
        res.push_back(path);
        return;
    }
    for (int i = start; i < candidates.size(); i++) {
        if (candidates[i] > target) break;  // 剪枝
        path.push_back(candidates[i]);
        dfs(candidates, i, target - candidates[i], path, res);
        path.pop_back();
    }
}`,
        explanation: '找出所有和为target的组合（可重复选）',
      },
    ],
    keyPoints: ['start参数是避免重复的关键', '组合是无序的，排列是有序的', '剪枝可大幅提高效率'],
    commonMistakes: ['忘记设置start参数导致重复', '递归参数传递错误', '剪枝条件写错导致遗漏解'],
    tips: ['组合数C(n,k)增长很快，注意数据规模', '可以用公式验证输出数量是否正确', '处理大数据时必须剪枝'],
    relatedKnowledge: ['dfs-intro', 'dfs-permute', 'dfs-prune'],
    relatedProblems: [66, 67],
  },

  'dfs-prune': {
    id: 'dfs-prune',
    title: '剪枝基础',
    content: `## 剪枝技术详解

剪枝（Pruning）是在搜索过程中提前终止不可能得到解的分支，从而减少搜索空间的优化技术。

### 剪枝的核心思想

**如果当前状态已经无法产生有效解，就没必要继续搜索。**

就像修剪树枝一样，剪掉"死枝"（无解分支），让搜索树更小。

### 剪枝的分类

#### 1. 可行性剪枝

判断当前状态是否能继续发展成有效解。

\`\`\`cpp
// 示例：选数和为target
if (currentSum > target) return;  // 和已超过，不可能
if (currentSum + maxRemaining < target) return;  // 全选最大也不够
\`\`\`

#### 2. 最优性剪枝

判断当前解是否可能比已知最优解更好。

\`\`\`cpp
// 示例：求最小代价
if (currentCost >= bestCost) return;  // 当前代价已不优
\`\`\`

#### 3. 重复状态剪枝

避免搜索相同的状态。

\`\`\`cpp
// 使用vis数组或哈希表记录已访问状态
if (visited[state]) return;
visited[state] = true;
\`\`\`

#### 4. 顺序剪枝

通过排序或特定顺序提前终止。

\`\`\`cpp
// 从小到大排序后，后面的数更大
for (int i = start; i <= n; i++) {
    if (candidates[i] > target) break;  // 后面更大，不用试了
    dfs(...);
}
\`\`\`

### 经典应用场景

1. **全排列**：vis数组避免重复
2. **组合求和**：和超限就剪
3. **最短路径**：距离超限就剪
4. **N皇后**：冲突就剪
5. **数独**：不合法就剪

### 剪枝三原则

1. **正确性**：不能剪掉有解的分支
2. **高效性**：判断剪枝的开销要小于节省的时间
3. **简洁性**：条件清晰，易于实现

### 实战技巧

1. **提前排序**：配合顺序剪枝
2. **预处理**：计算上下界
3. **贪心初值**：先找个可行解作为上界
4. **迭代加深**：限制深度`,
    codeExamples: [
      {
        title: '可行性剪枝 - 组合求和',
        code: `// 从nums中选若干数，和等于target
int target;
vector<int> nums, path;

void dfs(int start, int sum) {
    // 可行性剪枝
    if (sum > target) return;  // 和已超，剪掉
    if (sum == target) {
        // 找到解
        output(path);
        return;
    }
    
    for (int i = start; i < nums.size(); i++) {
        // 顺序剪枝（假设nums已排序）
        if (sum + nums[i] > target) break;
        
        path.push_back(nums[i]);
        dfs(i, sum + nums[i]);
        path.pop_back();
    }
}`,
        explanation: '双重剪枝：和超限剪 + 顺序剪枝',
      },
      {
        title: '最优性剪枝 - 最小路径',
        code: `int n, m;
int maze[105][105];
int minCost = INT_MAX;
int dx[] = {0, 1, 0, -1};
int dy[] = {1, 0, -1, 0};

void dfs(int x, int y, int cost) {
    // 最优性剪枝
    if (cost >= minCost) return;  // 当前代价已不优
    
    if (x == n && y == m) {
        minCost = min(minCost, cost);
        return;
    }
    
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (valid(nx, ny)) {
            dfs(nx, ny, cost + maze[nx][ny]);
        }
    }
}`,
        explanation: '当前代价已超过已知最优，不再继续',
      },
      {
        title: '剪枝综合 - N皇后',
        code: `int n;
int queen[20];  // queen[i]表示第i行皇后放在第几列
int ans = 0;

bool check(int row, int col) {
    for (int i = 1; i < row; i++) {
        // 同列冲突
        if (queen[i] == col) return false;
        // 对角线冲突
        if (abs(queen[i] - col) == abs(i - row)) return false;
    }
    return true;
}

void dfs(int row) {
    if (row > n) {
        ans++;
        return;
    }
    
    for (int col = 1; col <= n; col++) {
        // 可行性剪枝：冲突就跳过
        if (!check(row, col)) continue;
        
        queen[row] = col;
        dfs(row + 1);
    }
}`,
        explanation: 'N皇后：冲突检测是最经典的剪枝',
      },
    ],
    keyPoints: ['剪枝是DFS优化的核心手段', '正确性第一，不能漏解', '多种剪枝可以组合使用'],
    commonMistakes: ['剪枝条件错误导致漏解', '剪枝判断开销过大适得其反', '忘记回溯导致状态错误'],
    tips: ['先写朴素DFS，再加剪枝', '用小数据验证剪枝正确性', '排序是剪枝的好帮手'],
    relatedKnowledge: ['dfs-intro', 'dfs-order', 'dfs-combine'],
    relatedProblems: [67, 71],
  },

  // Day 38: BFS入门
  'bfs-impl': {
    id: 'bfs-impl',
    title: 'BFS实现',
    content: `## BFS实现详解

BFS（广度优先搜索）使用队列实现，按照"先访问的先扩展"的原则进行搜索。

### BFS核心思想

**层次扩展**：先访问距离起点近的节点，再访问距离远的节点。

就像水波纹一样，从起点向外一圈一圈扩展。

### BFS vs DFS

| 特性 | BFS | DFS |
|------|-----|-----|
| 数据结构 | 队列 | 栈/递归 |
| 搜索方式 | 层次遍历 | 深度探索 |
| 最短路 | 天然支持 | 需要记录 |
| 空间复杂度 | O(宽度) | O(深度) |
| 适用场景 | 最短路、层次 | 路径、方案 |

### 基本框架

\`\`\`cpp
void bfs(起点) {
    // 1. 初始化
    queue.push(起点);
    visited[起点] = true;  // 入队时标记！
    
    // 2. 循环处理队列
    while (!queue.empty()) {
        auto cur = queue.front();
        queue.pop();
        
        // 3. 扩展相邻状态
        for (每个相邻状态 next) {
            if (!visited[next]) {
                visited[next] = true;  // 入队时标记！
                queue.push(next);
            }
        }
    }
}
\`\`\`

### 关键注意事项

#### 1. 入队时标记（非常重要！）

❌ 错误写法（出队时标记）：
\`\`\`cpp
while (!q.empty()) {
    int u = q.front(); q.pop();
    visited[u] = true;  // 太晚了！可能重复入队
    ...
}
\`\`\`

✅ 正确写法（入队时标记）：
\`\`\`cpp
q.push(start);
visited[start] = true;  // 入队时就标记
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
        if (!visited[v]) {
            visited[v] = true;  // 入队时标记
            q.push(v);
        }
    }
}
\`\`\`

#### 2. 为什么必须入队时标记？

如果出队时才标记，同一个节点可能在队列中出现多次：
- 第一次入队时visited=false
- 第二次入队时visited还是false
- 导致重复处理，效率降低甚至死循环

### BFS的性质

1. **最短路径**：BFS保证第一次到达某点时路径最短（无权图）
2. **层次性**：可以按层输出结果
3. **完备性**：如果解存在，BFS一定能找到`,
    codeExamples: [
      {
        title: '基础BFS模板 - 图遍历',
        code: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1005;
bool visited[MAXN];
vector<int> adj[MAXN];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";  // 处理节点
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;  // 入队时标记
                q.push(v);
            }
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);  // 无向图
    }
    
    memset(visited, false, sizeof(visited));
    bfs(1);  // 从节点1开始BFS
    return 0;
}`,
        explanation: '标准BFS模板：入队时标记，队列实现层次遍历',
      },
      {
        title: 'BFS判断连通性',
        code: `// 判断图是否连通（所有点都能从起点到达）
bool isConnected(int n, int start) {
    int cnt = 0;
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cnt++;  // 统计访问的节点数
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    
    return cnt == n;  // 访问了n个点则连通
}`,
        explanation: 'BFS统计可达节点数，判断图是否连通',
      },
    ],
    keyPoints: ['BFS使用队列，先入先出', '必须在入队时标记visited', 'BFS天然支持求无权图最短路'],
    commonMistakes: ['出队时才标记导致重复入队', '忘记初始化visited数组', '队列元素类型写错'],
    tips: ['入队时标记是BFS最重要的细节', 'BFS适合求最短路，DFS适合求方案', '可以用数组模拟队列提高效率'],
    relatedKnowledge: ['bfs-intro', 'dfs-intro', 'bfs-shortest'],
    relatedProblems: [68, 69],
  },

  'bfs-level': {
    id: 'bfs-level',
    title: '层次遍历',
    content: `## 层次遍历详解

BFS天然按层次扩展，可以用于输出每层的节点、计算层数等。

### 层次遍历的核心思想

BFS过程中，同一时刻队列中的元素属于"当前层"或"下一层"。
通过记录每层的节点数，可以区分层次。

### 实现方法

#### 方法一：队列大小法（推荐）

每次处理一整层：
\`\`\`cpp
while (!q.empty()) {
    int size = q.size();  // 当前层的节点数
    for (int i = 0; i < size; i++) {
        auto cur = q.front(); q.pop();
        // 处理当前节点
        // 子节点入队（属于下一层）
    }
    // 一层处理完毕
}
\`\`\`

#### 方法二：depth数组法

记录每个节点的深度：
\`\`\`cpp
dist[start] = 0;
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;  // 深度+1
            q.push(v);
        }
    }
}
\`\`\`

#### 方法三：双队列法

用两个队列交替：
\`\`\`cpp
queue<int> cur, next;
cur.push(start);
while (!cur.empty()) {
    int u = cur.front(); cur.pop();
    for (int v : adj[u]) {
        if (!vis[v]) {
            vis[v] = true;
            next.push(v);  // 放入下一层队列
        }
    }
    if (cur.empty()) swap(cur, next);  // 换层
}
\`\`\`

### 经典应用

1. **树的层次遍历**：按层输出节点
2. **求树的高度**：统计层数
3. **判断完全二叉树**：检查每层是否填满
4. **最短路径**：记录到达每层的步数`,
    codeExamples: [
      {
        title: '树的层次遍历',
        code: `// LeetCode 102. 二叉树的层序遍历
struct TreeNode {
    int val;
    TreeNode *left, *right;
};

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int size = q.size();  // 当前层节点数
        vector<int> level;
        
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    
    return result;
}`,
        explanation: '每层单独处理，输出二维数组',
      },
      {
        title: '求树的高度/最大深度',
        code: `int maxDepth(TreeNode* root) {
    if (!root) return 0;
    
    queue<TreeNode*> q;
    q.push(root);
    int depth = 0;
    
    while (!q.empty()) {
        int size = q.size();
        depth++;  // 每处理一层，深度+1
        
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    
    return depth;
}`,
        explanation: '层次遍历，统计层数即为高度',
      },
      {
        title: '每层最大值',
        code: `// 找出二叉树每层的最大值
vector<int> largestValues(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int size = q.size();
        int maxVal = INT_MIN;
        
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            maxVal = max(maxVal, node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(maxVal);
    }
    
    return result;
}`,
        explanation: '层次遍历时维护每层最大值',
      },
    ],
    keyPoints: ['用队列大小区分层次', '处理完一层后再处理下一层', 'depth数组法更简洁但需要额外空间'],
    commonMistakes: ['混淆当前层和下一层', '忘记更新层数', '处理完一层后没有重置状态'],
    tips: ['队列大小法最通用', '层次遍历常用于树的题目', '可以配合其他操作（求和、找最值等）'],
    relatedKnowledge: ['bfs-impl', 'tree-bfs'],
    relatedProblems: [68, 82],
  },

  // Day 39: BFS应用
  'bfs-shortest': {
    id: 'bfs-shortest',
    title: '最短路',
    content: `## BFS求最短路详解

BFS天然适合求无权图的最短路径。

### 核心原理

**BFS按层次扩展，第一次到达某点的步数就是最短路。**

这是因为：
- 第0层：起点本身，距离=0
- 第1层：与起点直接相连的点，距离=1
- 第2层：距离起点2步的点，距离=2
- ...

**第一次到达时，必然是经过最少步数的路径。**

### 为什么DFS不行？

DFS可能走很长的路才到达某点，无法保证是最短。
BFS按层扩展，保证了路径最优性。

### 实现要点

1. **dist数组**：记录到每个点的距离，初始化为-1（未访问）
2. **入队时更新距离**：dist[v] = dist[u] + 1
3. **第一次到达即最短**：不需要后续更新

### 模板代码

\`\`\`cpp
int dist[MAXN];
memset(dist, -1, sizeof(dist));

queue<int> q;
q.push(start);
dist[start] = 0;

while (!q.empty()) {
    int u = q.front(); q.pop();
    
    for (int v : adj[u]) {
        if (dist[v] == -1) {  // 未访问过
            dist[v] = dist[u] + 1;  // 更新距离
            q.push(v);
        }
    }
}

// dist[end]就是最短路，-1表示无法到达
\`\`\`

### 路径还原

如果要输出最短路径本身，需要记录前驱节点：
\`\`\`cpp
int pre[MAXN];  // pre[v]表示v的前驱节点

// BFS过程中
if (dist[v] == -1) {
    dist[v] = dist[u] + 1;
    pre[v] = u;  // 记录前驱
    q.push(v);
}

// 还原路径
void printPath(int end) {
    if (end == start) {
        cout << start;
        return;
    }
    printPath(pre[end]);
    cout << " -> " << end;
}
\`\`\``,
    codeExamples: [
      {
        title: '无权图最短路',
        code: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1005;
int dist[MAXN];
vector<int> adj[MAXN];

int bfs_shortest(int start, int end, int n) {
    memset(dist, -1, sizeof(dist));
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (u == end) return dist[u];  // 找到终点
        
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return -1;  // 无法到达
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    int s, t;
    cin >> s >> t;
    cout << bfs_shortest(s, t, n) << endl;
    return 0;
}`,
        explanation: 'BFS求无权图中两点间最短路径',
      },
      {
        title: '迷宫最短路',
        code: `// 给定n×m的迷宫，求从起点到终点的最短步数
// '#'是墙，'.'是路，'S'是起点，'E'是终点
int n, m;
char maze[105][105];
int dist[105][105];
int dx[] = {0, 1, 0, -1};
int dy[] = {1, 0, -1, 0};

int bfs_maze(int sx, int sy, int ex, int ey) {
    memset(dist, -1, sizeof(dist));
    queue<pair<int,int>> q;
    q.push({sx, sy});
    dist[sx][sy] = 0;
    
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        if (x == ex && y == ey) return dist[x][y];
        
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m &&
                maze[nx][ny] != '#' && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    return -1;  // 无法到达
}`,
        explanation: 'BFS解决迷宫最短路问题',
      },
      {
        title: '还原最短路径',
        code: `// 不仅求最短路长度，还要输出路径
int pre[MAXN];

void bfs_with_path(int start) {
    memset(dist, -1, sizeof(dist));
    memset(pre, -1, sizeof(pre));
    
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                pre[v] = u;  // 记录前驱
                q.push(v);
            }
        }
    }
}

void printPath(int u) {
    if (u == -1) return;
    printPath(pre[u]);  // 先递归到起点
    if (pre[u] != -1) cout << " -> ";
    cout << u;
}`,
        explanation: 'BFS求最短路并还原路径',
      },
    ],
    keyPoints: ['BFS天然求最短路，第一次到达即最优', 'dist数组初始为-1，表示未访问', '可以用pre数组还原路径'],
    commonMistakes: ['忘记初始化dist为-1', '把DFS当成求最短路', '路径还原时顺序反了'],
    tips: ['无权图最短路首选BFS', '有权图要用Dijkstra等算法', '迷宫问题注意边界检查'],
    relatedKnowledge: ['bfs-impl', 'dijkstra'],
    relatedProblems: [68, 69],
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
    content: `## 状态定义详解

状态定义是DP的第一步，也是最关键的一步。一个好的状态定义能让问题迎刃而解。

### 什么是状态

**状态是对子问题的完整描述。**

DP的本质是把大问题拆成小问题，状态就是描述每个小问题的"身份信息"。

### 状态的三要素

1. **维度**：需要几个变量来描述
2. **含义**：每个维度代表什么
3. **值**：状态值代表什么（最优解、方案数等）

### 状态定义原则

#### 1. 完整性
状态必须能完整描述子问题，不遗漏关键信息。

❌ 错误示例：
\`\`\`cpp
dp[i] = 前i个物品的最大价值  // 缺少容量信息
\`\`\`

✅ 正确示例：
\`\`\`cpp
dp[i][j] = 前i个物品、容量为j时的最大价值
\`\`\`

#### 2. 无后效性
"未来与过去无关，只与现在有关"

当前状态确定后，之前如何到达这个状态不会影响未来的决策。

#### 3. 可推导性
状态之间要有明确的转移关系。

### 常见状态模式

#### 一维状态
\`\`\`cpp
dp[i]     // 以第i个位置结尾的最优解
dp[i]     // 前i个元素的最优解
dp[i]     // 第i阶段的最优解
\`\`\`

#### 二维状态
\`\`\`cpp
dp[i][j]  // 前i个物品容量为j
dp[i][j]  // 区间[i,j]的最优解
dp[i][j]  // 位置(i,j)的最优解
\`\`\`

#### 三维及以上
\`\`\`cpp
dp[i][j][k]  // 更复杂的场景
\`\`\`

### 状态定义的技巧

1. **从答案出发**：最终答案需要什么信息？
2. **从决策出发**：每一步决策需要什么信息？
3. **从约束出发**：题目有什么限制条件？
4. **从小例子推敲**：手推几个例子`,
    codeExamples: [
      {
        title: '最长上升子序列 (LIS)',
        code: `// 问题：求最长上升子序列长度
// 状态定义：dp[i] = 以a[i]结尾的最长上升子序列长度
int dp[MAXN];

int LIS(vector<int>& a) {
    int n = a.size();
    int ans = 0;
    
    for (int i = 0; i < n; i++) {
        dp[i] = 1;  // 至少包含自己
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        ans = max(ans, dp[i]);
    }
    
    return ans;
}`,
        explanation: 'dp[i]表示以a[i]结尾的LIS长度，这是最经典的一维状态定义',
      },
      {
        title: '01背包问题',
        code: `// 问题：n个物品，容量W，求最大价值
// 状态定义：dp[i][j] = 前i个物品、容量为j时的最大价值
int dp[105][10005];

int knapsack(int n, int W, int w[], int v[]) {
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            // 不选第i个物品
            dp[i][j] = dp[i-1][j];
            // 选第i个物品（如果容量够）
            if (j >= w[i]) {
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
            }
        }
    }
    return dp[n][W];
}`,
        explanation: '二维状态：物品数和容量两个维度',
      },
      {
        title: '区间DP - 石子合并',
        code: `// 问题：合并n堆石子，相邻两堆合并代价为两堆之和
// 状态定义：dp[i][j] = 合并区间[i,j]石子的最小代价
int dp[205][205];
int sum[205];  // 前缀和

int mergeStone(int n, int a[]) {
    // 计算前缀和
    for (int i = 1; i <= n; i++) sum[i] = sum[i-1] + a[i];
    
    // 枚举区间长度
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            // 枚举分割点
            for (int k = i; k < j; k++) {
                dp[i][j] = min(dp[i][j], 
                    dp[i][k] + dp[k+1][j] + sum[j] - sum[i-1]);
            }
        }
    }
    return dp[1][n];
}`,
        explanation: '区间DP：状态表示一个区间的最优解',
      },
    ],
    keyPoints: ['状态是对子问题的完整描述', '必须满足无后效性', '从答案、决策、约束三个角度思考状态'],
    commonMistakes: ['状态遗漏关键信息', '忽略了无后效性要求', '状态维度过多导致空间爆炸'],
    tips: ['先用二维三维思考，再考虑优化', '小例子手动推演验证', '状态定义不唯一，选最直观的'],
    relatedKnowledge: ['linear-dp', 'dp-transfer'],
    relatedProblems: [72, 73],
  },

  'dp-transfer': {
    id: 'dp-transfer',
    title: '状态转移',
    content: `## 状态转移详解

状态转移方程描述了状态之间的推导关系，是DP的核心。

### 转移方程的本质

**从已知状态推导出新状态的数学表达式。**

就像递推一样，当前状态 = 某种运算(之前的状态)。

### 转移方程的形式

\`\`\`cpp
dp[当前状态] = 最优值(所有可能的转移来源)
\`\`\`

### 常见转移模式

#### 1. 线性转移
从前面几个状态转移：
\`\`\`cpp
dp[i] = f(dp[i-1], dp[i-2], ...)
\`\`\`

#### 2. 区间转移
从子区间转移：
\`\`\`cpp
dp[i][j] = f(dp[i][k], dp[k+1][j])
\`\`\`

#### 3. 树形转移
从子节点转移：
\`\`\`cpp
dp[u] = f(dp[v]) for all children v of u
\`\`\`

### 推导转移方程的方法

#### 方法1：从决策出发

每一步有哪些选择？每种选择对应什么状态？

**示例：01背包**
- 决策：选或不选当前物品
- 不选：dp[i][j] = dp[i-1][j]
- 选：dp[i][j] = dp[i-1][j-w[i]] + v[i]
- 取最优：dp[i][j] = max(不选, 选)

#### 方法2：从最后一步出发

最后一步做了什么？之前的状态是什么？

**示例：LIS**
- 最后一步：选了a[i]作为结尾
- 之前的状态：某个以a[j]结尾的LIS（j < i 且 a[j] < a[i]）
- 转移：dp[i] = max(dp[j] + 1)

### 转移顺序

**必须保证转移时用到的状态已经计算过！**

不同DP类型的计算顺序：
- **线性DP**：从前往后或从后往前
- **区间DP**：先算小区间，再算大区间
- **背包DP**：先遍历物品，再遍历容量
- **树形DP**：先算子树，再算根（DFS后序）

### 转移优化

有些转移可以优化：
- **二分优化**：LIS的O(n²) → O(n log n)
- **单调队列优化**：滑动窗口最大值
- **数据结构优化**：线段树、树状数组`,
    codeExamples: [
      {
        title: 'LIS状态转移',
        code: `// dp[i] = 以a[i]结尾的最长上升子序列长度
// 转移：dp[i] = max(dp[j] + 1) for all j < i and a[j] < a[i]

int LIS(vector<int>& a) {
    int n = a.size();
    vector<int> dp(n, 1);  // 初始每个至少为1
    
    for (int i = 0; i < n; i++) {
        // 枚举所有可能的转移来源
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return *max_element(dp.begin(), dp.end());
}`,
        explanation: '从前面所有满足条件的j转移过来',
      },
      {
        title: '01背包状态转移',
        code: `// dp[i][j] = 前i个物品容量为j的最大价值
// 转移：dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])

int knapsack(int n, int W, vector<int>& w, vector<int>& v) {
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            // 不选第i个物品
            dp[i][j] = dp[i-1][j];
            // 选第i个物品（如果容量够）
            if (j >= w[i]) {
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
            }
        }
    }
    
    return dp[n][W];
}`,
        explanation: '每个物品有两种选择，取最优',
      },
      {
        title: '区间DP转移 - 矩阵链乘',
        code: `// dp[i][j] = 计算区间[i,j]矩阵链乘的最小代价
// 转移：dp[i][j] = min(dp[i][k] + dp[k+1][j] + 代价)

int matrixChain(int n, vector<int>& p) {
    vector<vector<int>> dp(n+1, vector<int>(n+1, 0));
    
    // 枚举区间长度
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            
            // 枚举分割点
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + p[i-1] * p[k] * p[j];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    
    return dp[1][n];
}`,
        explanation: '区间DP：先算小区间，再合并成大区间',
      },
    ],
    keyPoints: ['转移方程描述状态间的关系', '转移顺序必须保证依赖状态已计算', '可以从决策或最后一步推导转移'],
    commonMistakes: ['转移方向错误导致使用未计算的值', '忘记初始化边界状态', '转移方程遗漏情况'],
    tips: ['画状态转移图帮助理解', '用简单例子验证转移正确性', '注意边界条件处理'],
    relatedKnowledge: ['dp-state', 'linear-dp'],
    relatedProblems: [72, 73],
  },

  // Day 41: 线性DP
  'lis-optim': {
    id: 'lis-optim',
    title: 'LIS优化',
    content: `## LIS的O(n log n)优化

朴素LIS是O(n²)，可以通过二分优化到O(n log n)。

### 贪心+二分的思想

**关键观察：** 对于同样长度的上升子序列，结尾元素越小越好（更有机会接上后面的元素）。

### 辅助数组d的定义

d[i] = 长度为i的所有上升子序列中，结尾元素的最小值

**性质：** d数组是严格递增的

### 算法流程

对于每个元素a[i]：
1. 在d中找第一个 >= a[i] 的位置（lower_bound）
2. 如果找到了，用a[i]替换d[pos]
3. 如果没找到，把a[i]追加到d末尾
4. 最终d的长度就是LIS长度

### 为什么正确？

- 如果a[i]可以替换d[pos]，说明存在一个长度为pos的子序列可以以a[i]结尾
- 如果a[i]比所有d都大，说明可以扩展最长子序列

### 代码实现

\`\`\`cpp
int LIS(vector<int>& a) {
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
}
\`\`\`

### 变形问题

| 问题 | 修改 |
|------|------|
| 最长不下降子序列 | lower_bound改为upper_bound |
| 最长下降子序列 | 对负数做LIS或改变比较方向 |
| 输出LIS方案 | 需要额外记录，d数组只是长度 |

### 注意事项

⚠️ **d数组不是LIS本身！** 它只是辅助计算长度的。

要输出方案，需要额外维护pre数组。`,
    codeExamples: [
      {
        title: 'LIS优化版 O(n log n)',
        code: `#include <bits/stdc++.h>
using namespace std;

int LIS(vector<int>& a) {
    vector<int> d;  // d[i] = 长度为i+1的LIS的最小结尾元素
    
    for (int x : a) {
        // 找第一个 >= x 的位置
        auto it = lower_bound(d.begin(), d.end(), x);
        
        if (it == d.end()) {
            // x比所有d都大，可以扩展最长子序列
            d.push_back(x);
        } else {
            // 用x替换，保持d[pos]最小
            *it = x;
        }
    }
    
    return d.size();
}

int main() {
    vector<int> a = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << LIS(a) << endl;  // 输出: 4
    return 0;
}`,
        explanation: '使用贪心+二分，时间复杂度O(n log n)',
      },
      {
        title: '最长不下降子序列',
        code: `// 允许相等元素
int LNDS(vector<int>& a) {
    vector<int> d;
    for (int x : a) {
        // upper_bound找第一个 > x 的位置
        auto it = upper_bound(d.begin(), d.end(), x);
        if (it == d.end()) {
            d.push_back(x);
        } else {
            *it = x;
        }
    }
    return d.size();
}`,
        explanation: '改用upper_bound，允许相等元素',
      },
      {
        title: '输出LIS方案',
        code: `// 需要额外记录，O(n²)方法更适合输出方案
int LIS_with_path(vector<int>& a, vector<int>& path) {
    int n = a.size();
    vector<int> dp(n, 1), pre(n, -1);
    
    int maxLen = 1, endPos = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                pre[i] = j;  // 记录前驱
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            endPos = i;
        }
    }
    
    // 还原路径
    while (endPos != -1) {
        path.push_back(a[endPos]);
        endPos = pre[endPos];
    }
    reverse(path.begin(), path.end());
    
    return maxLen;
}`,
        explanation: '要输出方案，用O(n²)方法更方便',
      },
    ],
    keyPoints: ['d数组存储的是最小结尾元素', 'lower_bound找位置是关键', 'd数组不是LIS本身，只是长度'],
    commonMistakes: ['混淆lower_bound和upper_bound', '误以为d数组就是LIS', '忘记d是严格递增的'],
    tips: ['优化后只能求长度，求方案用O(n²)', '理解贪心思想：越小的结尾越有利', '二分优化思想可推广到其他问题'],
    relatedKnowledge: ['linear-dp', 'dp-transfer'],
    relatedProblems: [73, 74],
  },

  // Day 42: 背包问题
  'knapsack-intro': {
    id: 'knapsack-intro',
    title: '背包问题概念',
    content: `## 背包问题详解

背包问题是DP最经典的模型，考查频率极高。

### 问题背景

有一个容量为W的背包，n个物品，每个物品有重量w和价值v。如何选择物品使总价值最大？

### 背包问题分类

| 类型 | 特点 | 示例场景 |
|------|------|----------|
| 01背包 | 每个物品最多选1个 | 选或不选 |
| 完全背包 | 每个物品可选无限个 | 钱币找零 |
| 多重背包 | 每个物品可选有限个 | 购物限额 |
| 分组背包 | 物品分组，每组最多选1个 | 套餐选择 |
| 混合背包 | 以上混合 | 综合场景 |

### 01背包详解

**状态定义：**
\`\`\`cpp
dp[i][j] = 前i个物品，容量为j时的最大价值
\`\`\`

**状态转移：**
对于第i个物品，有两种选择：
1. 不选：dp[i][j] = dp[i-1][j]
2. 选（如果容量够）：dp[i][j] = dp[i-1][j-w[i]] + v[i]

取最优：
\`\`\`cpp
dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])
\`\`\`

**初始条件：**
dp[0][j] = 0（没有物品时价值为0）
dp[i][0] = 0（容量为0时价值为0）

### 时间复杂度

- 时间：O(n × W)
- 空间：O(n × W)，可优化到O(W)

### 变形问题

1. **恰好装满**：初始化dp[0][0]=0，其他为-∞
2. **求方案数**：max改为count
3. **输出方案**：记录转移路径`,
    codeExamples: [
      {
        title: '01背包基础版',
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, W;
    cin >> n >> W;
    
    vector<int> w(n+1), v(n+1);
    for (int i = 1; i <= n; i++) {
        cin >> w[i] >> v[i];
    }
    
    // dp[i][j] = 前i个物品容量为j的最大价值
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            // 不选第i个物品
            dp[i][j] = dp[i-1][j];
            // 选第i个物品（如果容量够）
            if (j >= w[i]) {
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
            }
        }
    }
    
    cout << dp[n][W] << endl;
    return 0;
}`,
        explanation: '基础01背包，二维DP实现',
      },
      {
        title: '恰好装满版本',
        code: `// 要求背包恰好装满
int knapsack_exact(int n, int W, vector<int>& w, vector<int>& v) {
    const int INF = 1e9;
    vector<vector<int>> dp(n+1, vector<int>(W+1, -INF));
    
    dp[0][0] = 0;  // 只有容量0恰好装满是合法的
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            dp[i][j] = dp[i-1][j];  // 不选
            if (j >= w[i] && dp[i-1][j-w[i]] != -INF) {
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
            }
        }
    }
    
    return dp[n][W] < 0 ? -1 : dp[n][W];
}`,
        explanation: '初始化为-∞，只有dp[0][0]=0是合法状态',
      },
    ],
    keyPoints: ['理解"选或不选"的决策模型', '状态表示要完整（物品+容量）', '注意边界初始化'],
    commonMistakes: ['容量枚举方向错误', '忘记判断容量是否够', '恰好装满初始化错误'],
    tips: ['先画表格理解状态转移', '二维熟练后再学一维优化', '背包问题有很多变形'],
    relatedKnowledge: ['01-knapsack', 'complete-knapsack'],
    relatedProblems: [75, 76],
  },

  '01-space': {
    id: '01-space',
    title: '空间优化',
    content: `## 背包问题空间优化

可以将二维dp优化为一维，节省空间。

### 优化原理

观察转移方程：
\`\`\`cpp
dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])
\`\`\`

dp[i][j]只依赖于dp[i-1][...]，即上一层的状态。

**滚动数组思想：** 只需要保存一层，用完就覆盖。

### 01背包：必须逆序枚举！

\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {  // 逆序！
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
    }
}
\`\`\`

### 为什么必须逆序？

**正序的问题：** 同一轮中，dp[j-w[i]]可能已经被更新过，相当于重复选了第i个物品！

**例子：** w[i]=2, v[i]=3
- 正序：dp[2] = dp[0]+3 = 3，dp[4] = dp[2]+3 = 6（错误！选了两次）
- 逆序：dp[4] = dp[2]+3 = 3（正确，dp[2]是上一轮的值）

### 完全背包：正序枚举！

完全背包允许重复选，所以正好利用正序的特点：
\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = w[i]; j <= W; j++) {  // 正序！
        dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
    }
}
\`\`\`

### 空间优化总结

| 类型 | 枚举顺序 | 原因 |
|------|----------|------|
| 01背包 | 逆序 | 避免重复选 |
| 完全背包 | 正序 | 利用重复选 |`,
    codeExamples: [
      {
        title: '01背包空间优化',
        code: `int knapsack_01(int n, int W, vector<int>& w, vector<int>& v) {
    vector<int> dp(W + 1, 0);
    
    for (int i = 1; i <= n; i++) {
        // 逆序枚举，保证每个物品只选一次
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    
    return dp[W];
}`,
        explanation: '一维数组，逆序枚举容量',
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
    content: `## 图的存储方式详解

选择合适的存储方式对解决问题至关重要。

### 常见存储方式对比

| 存储方式 | 空间复杂度 | 判断是否有边 | 遍历邻居 | 适用场景 |
|----------|------------|--------------|----------|----------|
| 邻接矩阵 | O(n²) | O(1) | O(n) | 稠密图 |
| 邻接表 | O(n+m) | O(度) | O(度) | 稀疏图 |
| 链式前向星 | O(m) | O(度) | O(度) | 竞赛推荐 |

### 邻接矩阵

用二维数组表示：
\`\`\`cpp
int g[105][105];  // g[u][v] = w 表示u到v有边，权值为w
g[u][v] = w;      // 添加边
\`\`\`

**优点：**
- 实现简单
- 判断两点是否有边：O(1)
- 适合Floyd等算法

**缺点：**
- 空间O(n²)，n=10000时约需要400MB
- 不适合稀疏图

### 邻接表（推荐）

用vector数组存储每个点的邻居：
\`\`\`cpp
vector<int> adj[N];          // 无权图
vector<pair<int,int>> adj[N]; // 有权图：(邻居, 权值)
\`\`\`

**优点：**
- 空间O(n+m)，适合稀疏图
- 遍历邻居高效

**缺点：**
- 判断两点是否有边需要遍历

### 链式前向星（竞赛常用）

用静态数组模拟链表：
\`\`\`cpp
int head[N], to[M], nxt[M], val[M], tot;

void add(int u, int v, int w) {
    to[++tot] = v;
    val[tot] = w;
    nxt[tot] = head[u];
    head[u] = tot;
}

// 遍历u的邻居
for (int i = head[u]; i; i = nxt[i]) {
    int v = to[i], w = val[i];
}
\`\`\`

**优点：**
- 空间紧凑
- 常数小，效率高
- 适合重边、自环`,
    codeExamples: [
      {
        title: '邻接表完整示例',
        code: `#include <bits/stdc++.h>
using namespace std;

const int N = 10005;
vector<pair<int,int>> adj[N];  // (邻居, 边权)

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});  // 有向图
        // adj[v].push_back({u, w}); // 无向图加上这行
    }
    
    // 遍历节点u的所有邻居
    int u = 1;
    for (auto [v, w] : adj[u]) {
        cout << u << " -> " << v << " : " << w << endl;
    }
    
    return 0;
}`,
        explanation: '邻接表存图，支持边权，遍历高效',
      },
      {
        title: '链式前向星存图',
        code: `const int N = 10005, M = 20005;
int head[N], to[M], nxt[M], val[M], tot;

void init() {
    memset(head, 0, sizeof(head));
    tot = 0;
}

void addEdge(int u, int v, int w) {
    to[++tot] = v;
    val[tot] = w;
    nxt[tot] = head[u];
    head[u] = tot;
}

// 遍历u的邻居
void traverse(int u) {
    for (int i = head[u]; i; i = nxt[i]) {
        int v = to[i], w = val[i];
        cout << u << " -> " << v << " : " << w << endl;
    }
}`,
        explanation: '链式前向星：静态数组模拟链表，效率最高',
      },
    ],
    keyPoints: ['邻接表是最常用的存储方式', '无向图边数要开两倍', '注意数组大小防止越界'],
    commonMistakes: ['无向图只加一条边', '数组开小导致越界', '忘记初始化'],
    tips: ['竞赛优先用邻接表或链式前向星', '边数M一般开为点数N的2倍以上', '有权图用pair存储'],
    relatedKnowledge: ['graph-intro', 'dfs-intro', 'bfs-intro'],
    relatedProblems: [81, 82],
  },

  // Day 46: 树的遍历
  'tree-dfs': {
    id: 'tree-dfs',
    title: '树的DFS',
    content: `## 树的DFS遍历详解

树是一种特殊的图：连通、无环、n个点n-1条边。

### 树DFS的特点

与普通图不同，树DFS不需要visited数组，因为：
- 树无环，不会重复访问
- 只需要避免"回头"到父节点

### 基本框架

\`\`\`cpp
void dfs(int u, int parent) {
    // 处理当前节点u
    for (int v : adj[u]) {
        if (v != parent) {  // 不走回头路
            dfs(v, u);
        }
    }
}
\`\`\`

### 树DFS的应用

#### 1. 求子树大小
\`\`\`cpp
void getSize(int u, int parent) {
    sz[u] = 1;
    for (int v : adj[u]) {
        if (v != parent) {
            getSize(v, u);
            sz[u] += sz[v];
        }
    }
}
\`\`\`

#### 2. 求树的高度
\`\`\`cpp
void getHeight(int u, int parent) {
    height[u] = 0;
    for (int v : adj[u]) {
        if (v != parent) {
            getHeight(v, u);
            height[u] = max(height[u], height[v] + 1);
        }
    }
}
\`\`\`

#### 3. 求树的重心
重心：删除后最大子树最小的节点。
\`\`\`cpp
void findCentroid(int u, int parent) {
    sz[u] = 1;
    maxSubtree[u] = 0;
    for (int v : adj[u]) {
        if (v != parent) {
            findCentroid(v, u);
            sz[u] += sz[v];
            maxSubtree[u] = max(maxSubtree[u], sz[v]);
        }
    }
    maxSubtree[u] = max(maxSubtree[u], n - sz[u]);  // 上面的部分
    if (maxSubtree[u] < minMax) {
        minMax = maxSubtree[u];
        centroid = u;
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '求子树大小',
        code: `#include <bits/stdc++.h>
using namespace std;

const int N = 10005;
vector<int> adj[N];
int sz[N];

void dfs(int u, int parent) {
    sz[u] = 1;  // 自己算1个
    for (int v : adj[u]) {
        if (v != parent) {
            dfs(v, u);
            sz[u] += sz[v];  // 累加子树大小
        }
    }
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    dfs(1, 0);  // 从根节点开始
    
    for (int i = 1; i <= n; i++) {
        cout << "子树" << i << "的大小：" << sz[i] << endl;
    }
    return 0;
}`,
        explanation: 'DFS求每个节点的子树大小，可用于树的重心、树形DP等',
      },
      {
        title: '求树的重心',
        code: `const int N = 10005;
vector<int> adj[N];
int sz[N], maxSubtree[N];
int n, centroid, minMax = N;

void dfs(int u, int parent) {
    sz[u] = 1;
    maxSubtree[u] = 0;
    
    for (int v : adj[u]) {
        if (v != parent) {
            dfs(v, u);
            sz[u] += sz[v];
            maxSubtree[u] = max(maxSubtree[u], sz[v]);
        }
    }
    
    // 还要考虑u上方的那部分
    maxSubtree[u] = max(maxSubtree[u], n - sz[u]);
    
    if (maxSubtree[u] < minMax) {
        minMax = maxSubtree[u];
        centroid = u;
    }
}`,
        explanation: '重心是删除后最大子树最小的节点',
      },
    ],
    keyPoints: ['树DFS用parent参数避免回头', '递归处理子树', '后序遍历先处理子节点再处理父节点'],
    commonMistakes: ['忘记判断parent导致无限递归', '把parent误当成已访问标记', '子树大小初始化错误'],
    tips: ['树的DFS天然是后序遍历', '可以用父节点参数代替vis数组', '处理子树信息时注意累积顺序'],
    relatedKnowledge: ['tree-intro', 'dfs-intro'],
    relatedProblems: [82, 83],
  },

  'tree-bfs': {
    id: 'tree-bfs',
    title: '树的BFS',
    content: `## 树的BFS遍历详解

BFS按层次遍历树，适合处理与深度相关的问题。

### 树BFS的特点

- 天然按层遍历
- 不需要visited数组（树无环）
- 第一次到达的深度就是最短距离

### 基本框架

\`\`\`cpp
void bfs(int root) {
    queue<int> q;
    q.push(root);
    depth[root] = 1;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (depth[v] == 0) {  // 未访问
                depth[v] = depth[u] + 1;
                q.push(v);
            }
        }
    }
}
\`\`\`

### 树BFS的应用

#### 1. 层次遍历
按层输出节点，常见于树的题目。

#### 2. 求树的高度
最大的depth值就是树的高度。

#### 3. 求最远点
BFS可以找到距离起点最远的点。

#### 4. 求两点间距离
从起点BFS，终点的depth差就是距离。

### 两次BFS求直径

树的直径是最长路径，可以通过两次BFS找到：
1. 从任意点出发，找最远点v
2. 从v出发，找最远点w
3. v-w就是直径`,
    codeExamples: [
      {
        title: 'BFS求树的高度',
        code: `const int N = 10005;
vector<int> adj[N];
int depth[N];

int treeHeight(int root) {
    memset(depth, 0, sizeof(depth));
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
        explanation: 'BFS遍历时记录最大深度',
      },
      {
        title: '层次遍历输出',
        code: `vector<vector<int>> levelOrder(int root) {
    vector<vector<int>> result;
    queue<int> q;
    q.push(root);
    depth[root] = 1;
    
    while (!q.empty()) {
        int size = q.size();  // 当前层节点数
        vector<int> level;
        
        for (int i = 0; i < size; i++) {
            int u = q.front();
            q.pop();
            level.push_back(u);
            
            for (int v : adj[u]) {
                if (depth[v] == 0) {
                    depth[v] = depth[u] + 1;
                    q.push(v);
                }
            }
        }
        result.push_back(level);
    }
    
    return result;
}`,
        explanation: '按层输出节点，每层一个vector',
      },
    ],
    keyPoints: ['BFS天然按层次遍历', 'depth数组既记录深度又标记访问', '可以用于求最远点'],
    commonMistakes: ['忘记初始化depth数组', '把depth用于其他用途时冲突', '起点深度设置错误'],
    tips: ['两次BFS可以求树的直径', 'BFS可以用于求树上两点距离', '层次遍历时注意记录每层大小'],
    relatedKnowledge: ['tree-dfs', 'bfs-intro'],
    relatedProblems: [82, 83],
  },

  'tree-diameter': {
    id: 'tree-diameter',
    title: '树的直径',
    content: `## 树的直径详解

树的直径是树上最长路径的长度。

### 性质

1. 直径的两个端点一定是叶子节点
2. 一棵树可能有多个直径
3. 所有直径的中点（或中心边）相同

### 求直径的方法

#### 方法一：两次BFS/DFS（推荐）

1. 从任意点u出发，找最远点v
2. 从v出发，找最远点w
3. v到w就是直径

**时间复杂度：** O(n)

**为什么正确？**
- 直径的两个端点一定是最远的点对
- 从任意点出发，最远点一定是直径端点之一

#### 方法二：树形DP

对每个节点，求经过它的最长路径：
\`\`\`cpp
dp[u] = 向下最长链 + 向下次长链
\`\`\`

### 直径的应用

1. 求树的"长度"
2. 判断树是否平衡
3. 作为树的某种"半径"的基准`,
    codeExamples: [
      {
        title: '两次BFS求直径',
        code: `#include <bits/stdc++.h>
using namespace std;

const int N = 10005;
vector<int> adj[N];
int dist[N];
int n;

pair<int,int> bfs(int start) {
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
    // 第一次BFS：找最远点v
    auto [v, _] = bfs(1);
    
    // 第二次BFS：从v找最远点
    auto [w, diameter] = bfs(v);
    
    return diameter;
}`,
        explanation: '两次BFS求直径，时间复杂度O(n)',
      },
      {
        title: '树形DP求直径',
        code: `const int N = 10005;
vector<int> adj[N];
int diameter = 0;

int dfs(int u, int parent) {
    int max1 = 0, max2 = 0;  // 最长链和次长链
    
    for (int v : adj[u]) {
        if (v != parent) {
            int d = dfs(v, u) + 1;
            if (d > max1) {
                max2 = max1;
                max1 = d;
            } else if (d > max2) {
                max2 = d;
            }
        }
    }
    
    // 经过u的最长路径
    diameter = max(diameter, max1 + max2);
    
    return max1;  // 返回最长链
}`,
        explanation: '树形DP：维护最长链和次长链',
      },
    ],
    keyPoints: ['两次BFS是最简单的方法', '直径端点一定是最远点', '树形DP可以同时求方案'],
    commonMistakes: ['只做一次BFS', '忘记是从最远点再找一次', '树形DP时更新顺序错误'],
    tips: ['直径可能有多条', '直径的中点(或中心边)是唯一的', '可以用直径来判断树的平衡性'],
    relatedKnowledge: ['tree-dfs', 'tree-bfs'],
    relatedProblems: [82, 83],
  },

  // Day 47: 图的遍历
  'graph-dfs': {
    id: 'graph-dfs',
    title: '图的DFS',
    content: `## 图的DFS遍历详解

图的DFS比树复杂，因为图可能有环，必须标记已访问的节点。

### 基本框架

\`\`\`cpp
bool visited[N];

void dfs(int u) {
    visited[u] = true;  // 标记已访问
    // 处理节点u
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}
\`\`\`

### 图DFS的应用

#### 1. 判断连通性
从某点出发DFS，看能否到达所有点。

#### 2. 求连通分量
多次DFS，每次DFS访问的点属于一个连通分量。

#### 3. 检测环
如果DFS过程中遇到已访问但不是父节点的点，说明有环。

#### 4. 拓扑排序
DFS后序的逆序就是拓扑序（DAG）。

#### 5. 判断二分图
DFS染色，相邻节点颜色不同。

### DFS的时间戳

记录进入和离开每个节点的时间：
\`\`\`cpp
int timer = 0, tin[N], tout[N];

void dfs(int u) {
    tin[u] = ++timer;  // 进入时间
    visited[u] = true;
    
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
    
    tout[u] = ++timer;  // 离开时间
}
\`\`\`

时间戳的应用：
- 判断祖先-后代关系
- 求LCA
- 欧拉序`,
    codeExamples: [
      {
        title: '图的DFS遍历',
        code: `#include <bits/stdc++.h>
using namespace std;

const int N = 10005;
vector<int> adj[N];
bool visited[N];

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";  // 访问节点
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);  // 无向图
    }
    
    cout << "DFS遍历结果: ";
    dfs(1);  // 从节点1开始
    cout << endl;
    
    return 0;
}`,
        explanation: '标准图的DFS遍历',
      },
      {
        title: '求连通分量个数',
        code: `int countComponents(int n) {
    memset(visited, false, sizeof(visited));
    int cnt = 0;
    
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            dfs(i);
            cnt++;  // 每次DFS覆盖一个连通分量
        }
    }
    
    return cnt;
}`,
        explanation: '每个连通分量需要一次DFS',
      },
      {
        title: '检测无向图是否有环',
        code: `bool hasCycle = false;

void dfs(int u, int parent) {
    visited[u] = true;
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, u);
        } else if (v != parent) {
            // 访问到非父节点的已访问节点，有环
            hasCycle = true;
        }
    }
}`,
        explanation: '遇到已访问的非父节点，说明有环',
      },
    ],
    keyPoints: ['图DFS必须标记已访问', '与树DFS的区别是图可能有环', '可以判断连通性、环、二分图等'],
    commonMistakes: ['忘记标记visited导致无限循环', '混淆有向图和无向图的环检测', '重边/自环处理不当'],
    tips: ['DFS适合求方案，BFS适合求最短路', '时间戳可以解决很多树上问题', '连通分量用并查集也可以求'],
    relatedKnowledge: ['dfs-intro', 'tree-dfs', 'connected'],
    relatedProblems: [84, 85],
  },

  'graph-bfs': {
    id: 'graph-bfs',
    title: '图的BFS',
    content: `## 图的BFS遍历详解

BFS按层次遍历图，天然适合求最短路径。

### 基本框架

\`\`\`cpp
bool visited[N];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;  // 入队时标记
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;  // 入队时标记
                q.push(v);
            }
        }
    }
}
\`\`\`

### 图BFS的应用

#### 1. 求无权图最短路
第一次到达某点的距离就是最短距离。

#### 2. 判断连通性
BFS能到达的点与起点连通。

#### 3. 层次遍历
记录每层的节点数，分层处理。

#### 4. 拓扑排序
BFS可以处理DAG的拓扑排序（Kahn算法）。

#### 5. 判断二分图
BFS染色，相邻节点颜色不同。`,
    codeExamples: [
      {
        title: '图的BFS遍历',
        code: `const int N = 10005;
vector<int> adj[N];
bool visited[N];

void bfs(int start) {
    memset(visited, false, sizeof(visited));
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    cout << "BFS遍历: ";
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
    cout << endl;
}`,
        explanation: '标准图的BFS遍历',
      },
      {
        title: 'BFS求最短路',
        code: `int dist[N];

int shortestPath(int start, int end) {
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
        explanation: 'BFS天然求最短路，dist数组同时表示距离和访问状态',
      },
    ],
    keyPoints: ['入队时必须标记visited', 'BFS天然按层次扩展', '第一次到达的距离最短'],
    commonMistakes: ['出队时才标记导致重复入队', '忘记初始化dist/visited', '最短路问题用DFS而非BFS'],
    tips: ['无权图最短路首选BFS', 'BFS可以处理很多图论问题', '配合队列实现层次遍历'],
    relatedKnowledge: ['bfs-intro', 'bfs-shortest', 'graph-dfs'],
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
    content: `## Dijkstra算法详解

Dijkstra是求单源最短路的经典算法，适用于非负权图。

### 核心思想

**贪心选择**：每次选择距离最小的未访问点，其距离就是最短路。

**正确性**：由于没有负权边，距离最小的点不可能再被更新更小。

### 算法步骤

1. 初始化：dist[起点] = 0，其他 = ∞
2. 选择未访问中距离最小的点u
3. 标记u为已访问
4. 用u更新其邻居的距离（松弛操作）
5. 重复2-4直到所有点访问完

### 松弛操作

\`\`\`cpp
if (dist[u] + w < dist[v]) {
    dist[v] = dist[u] + w;
}
\`\`\`

### 朴素实现 O(n²)

适合稠密图（m ≈ n²）：
\`\`\`cpp
for (int i = 1; i <= n; i++) {
    // 找距离最小的未访问点
    int u = -1, minDist = INT_MAX;
    for (int j = 1; j <= n; j++) {
        if (!visited[j] && dist[j] < minDist) {
            minDist = dist[j];
            u = j;
        }
    }
    if (u == -1) break;
    
    visited[u] = true;
    // 松弛邻居
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
        }
    }
}
\`\`\`

### 不能处理负权边

如果有负权边，Dijkstra可能得到错误结果。原因：已经确定最短路的点可能被负边更新更小。

### 复杂度分析

- 时间：O(n²)
- 空间：O(n + m)`,
    codeExamples: [
      {
        title: 'Dijkstra朴素版完整代码',
        code: `#include <bits/stdc++.h>
using namespace std;

const int N = 10005;
const int INF = 0x3f3f3f3f;
int dist[N];
bool visited[N];
vector<pair<int,int>> adj[N];  // (邻居, 边权)
int n, m;

void dijkstra(int start) {
    memset(dist, 0x3f, sizeof(dist));
    memset(visited, false, sizeof(visited));
    dist[start] = 0;
    
    for (int i = 1; i <= n; i++) {
        // 找未访问中距离最小的点
        int u = -1, minDist = INF;
        for (int j = 1; j <= n; j++) {
            if (!visited[j] && dist[j] < minDist) {
                minDist = dist[j];
                u = j;
            }
        }
        
        if (u == -1) break;  // 剩余点不可达
        visited[u] = true;
        
        // 松弛邻居
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        // adj[v].push_back({u, w}); // 无向图
    }
    
    int s, t;
    cin >> s >> t;
    dijkstra(s);
    cout << dist[t] << endl;
    return 0;
}`,
        explanation: '朴素Dijkstra，适合稠密图',
      },
    ],
    keyPoints: ['每次选最小距离点', '松弛更新邻居', '只适用于非负权图'],
    commonMistakes: ['忘记标记已访问', '初始化错误用INT_MAX', '负权边会得到错误结果'],
    tips: ['n小时用朴素版', 'm小时用堆优化', 'INF用0x3f3f3f3f'],
    relatedKnowledge: ['dijkstra', 'dijkstra-heap'],
    relatedProblems: [86, 87],
  },

  'dijkstra-heap': {
    id: 'dijkstra-heap',
    title: 'Dijkstra堆优化',
    content: `## Dijkstra堆优化详解

使用优先队列（堆）优化选点过程，时间复杂度从O(n²)降到O(m log n)。

### 优化思路

朴素做法每次选最小距离需要O(n)，用堆可以降到O(log n)。

### 堆的选择

使用小根堆，堆顶是距离最小的点：
\`\`\`cpp
priority_queue<pair<int,int>, vector<pair<int,int>>, 
               greater<pair<int,int>>> pq;
// 存储 (距离, 节点编号)
\`\`\`

### 关键优化：延迟删除

同一个点可能在堆中存在多次（多次更新距离），但只有距离最小的那个有用。

**处理方法**：取出时检查是否已过时：
\`\`\`cpp
auto [d, u] = pq.top();
pq.pop();
if (d > dist[u]) continue;  // 已过时，跳过
\`\`\`

### 算法流程

1. 起点入堆
2. 取堆顶(d, u)
3. 如果d > dist[u]，跳过（过时的）
4. 否则松弛邻居，更新距离并入堆
5. 重复直到堆空

### 复杂度

- 时间：O(m log n)
- 空间：O(n + m)

适合稀疏图（m << n²）`,
    codeExamples: [
      {
        title: 'Dijkstra堆优化完整代码',
        code: `#include <bits/stdc++.h>
using namespace std;

const int N = 100005;
const int INF = 0x3f3f3f3f;
int dist[N];
vector<pair<int,int>> adj[N];  // (邻居, 边权)

void dijkstra(int start) {
    memset(dist, 0x3f, sizeof(dist));
    dist[start] = 0;
    
    // 小根堆：(距离, 节点)
    priority_queue<pair<int,int>, vector<pair<int,int>>, 
                   greater<pair<int,int>>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        // 过时的点，跳过
        if (d > dist[u]) continue;
        
        // 松弛邻居
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    int s, t;
    cin >> s >> t;
    dijkstra(s);
    
    if (dist[t] == INF) cout << -1 << endl;
    else cout << dist[t] << endl;
    
    return 0;
}`,
        explanation: '堆优化Dijkstra，竞赛最常用',
      },
      {
        title: '还原最短路径',
        code: `int pre[N];  // pre[v] = 到达v的前一个点

void dijkstra_with_path(int start) {
    memset(dist, 0x3f, sizeof(dist));
    memset(pre, -1, sizeof(pre));
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
                pre[v] = u;  // 记录前驱
                pq.push({dist[v], v});
            }
        }
    }
}

// 输出从start到end的路径
void printPath(int end) {
    vector<int> path;
    for (int u = end; u != -1; u = pre[u]) {
        path.push_back(u);
    }
    reverse(path.begin(), path.end());
    for (int u : path) cout << u << " ";
}`,
        explanation: '用pre数组记录前驱，可还原路径',
      },
    ],
    keyPoints: ['小根堆greater<pair<int,int>>', '判断d > dist[u]跳过过时点', '时间复杂度O(m log n)'],
    commonMistakes: ['忘记判断过时点导致超时', '堆类型用错', '入堆时更新了错误距离'],
    tips: ['竞赛首选堆优化版本', 'greater<>是小根堆，默认是大根堆', '延迟删除比删除更高效'],
    relatedKnowledge: ['dijkstra-impl', 'spfa'],
    relatedProblems: [86, 87],
  },

  // Day 49: 最短路（二）
  'spfa': {
    id: 'spfa',
    title: 'SPFA算法',
    content: `## SPFA算法详解

SPFA (Shortest Path Faster Algorithm) 是Bellman-Ford的队列优化版本，可以处理负权边。

### 与Dijkstra的区别

| 特性 | Dijkstra | SPFA |
|------|----------|------|
| 负权边 | 不支持 | 支持 |
| 复杂度 | O(m log n) | O(km)，可能退化到O(nm) |
| 适用场景 | 非负权图 | 有负权边或判断负环 |

### 算法思想

Bellman-Ford每轮松弛所有边，SPFA只松弛可能有效的边：
- 只有被更新的点才可能更新邻居
- 用队列维护待处理的点

### 算法步骤

1. 起点入队，标记在队中
2. 取队首u，取消标记
3. 松弛u的邻居：
   - 如果更新成功且邻居不在队中，入队
4. 重复直到队空

### 代码框架

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

如果一个点入队次数超过n次，说明存在负环。

### 注意事项

⚠️ SPFA可能退化到O(nm)，如网格图。非必要不用。`,
    codeExamples: [
      {
        title: 'SPFA模板',
        code: `#include <bits/stdc++.h>
using namespace std;

const int N = 10005;
const int INF = 0x3f3f3f3f;
int dist[N];
bool inQueue[N];
vector<pair<int,int>> adj[N];

void spfa(int start) {
    memset(dist, 0x3f, sizeof(dist));
    memset(inQueue, false, sizeof(inQueue));
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
        explanation: 'SPFA算法，可处理负权边',
      },
      {
        title: 'SPFA判断负环',
        code: `int cnt[N];  // 入队次数

bool hasNegativeCycle(int start, int n) {
    memset(dist, 0x3f, sizeof(dist));
    memset(cnt, 0, sizeof(cnt));
    memset(inQueue, false, sizeof(inQueue));
    
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    cnt[start] = 1;
    inQueue[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        inQueue[u] = false;
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (!inQueue[v]) {
                    cnt[v]++;
                    if (cnt[v] > n) return true;  // 存在负环
                    q.push(v);
                    inQueue[v] = true;
                }
            }
        }
    }
    
    return false;
}`,
        explanation: '入队超过n次说明存在负环',
      },
    ],
    keyPoints: ['只有被更新的点才入队', '用inQueue避免重复入队', '可以处理负权边和判断负环'],
    commonMistakes: ['忘记inQueue标记', '负环判断条件错误', '在非必要场景使用导致超时'],
    tips: ['能用Dijkstra就别用SPFA', 'SPFA在某些图上会退化', '判断负环是SPFA的主要用途'],
    relatedKnowledge: ['dijkstra-heap', 'negative'],
    relatedProblems: [87, 88],
  },

  'negative': {
    id: 'negative',
    title: '负权边处理',
    content: `## 负权边与负环处理

### 负权边

当图中存在负权边时，Dijkstra不再适用，需要使用SPFA或Floyd。

### 最短路算法对比

| 算法 | 负权边 | 负环 | 复杂度 | 适用场景 |
|------|--------|------|--------|----------|
| Dijkstra | ❌ | ❌ | O(m log n) | 非负权图 |
| SPFA | ✅ | 可检测 | O(km) | 负权边、判负环 |
| Bellman-Ford | ✅ | 可检测 | O(nm) | 负权边、判负环 |
| Floyd | ✅ | 可检测 | O(n³) | 多源最短路 |

### 负环

负环是指权和为负的环。存在负环时：
- 可以无限绕圈使距离趋向负无穷
- 最短路无意义（或不存在）

### 判断负环的方法

#### 方法1：SPFA
统计每个点的入队次数，超过n次则存在负环。

#### 方法2：Bellman-Ford
进行n轮松弛，如果第n轮还能松弛，存在负环。

\`\`\`cpp
// Bellman-Ford判断负环
for (int i = 1; i <= n; i++) {
    bool updated = false;
    for (每条边 u -> v, w) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            updated = true;
        }
    }
    if (!updated) break;
    if (i == n && updated) return true;  // 第n轮还能更新
}
return false;
\`\`\`

### 负权边的处理技巧

有时可以通过转换消去负权：
- 给所有边加上常数（不正确！会改变最短路）
- 正确方法：用SPFA或重新建图`,
    codeExamples: [
      {
        title: 'Bellman-Ford判断负环',
        code: `struct Edge {
    int u, v, w;
} edges[M];

bool hasNegativeCycle(int n, int m) {
    int dist[N];
    memset(dist, 0, sizeof(dist));  // 初始化为0
    
    // 进行n轮松弛
    for (int i = 1; i <= n; i++) {
        bool updated = false;
        for (int j = 0; j < m; j++) {
            if (dist[edges[j].u] + edges[j].w < dist[edges[j].v]) {
                dist[edges[j].v] = dist[edges[j].u] + edges[j].w;
                updated = true;
            }
        }
        if (!updated) return false;  // 没有更新，无负环
    }
    return true;  // 第n轮还能更新，存在负环
}`,
        explanation: 'Bellman-Ford进行n轮，还能更新则有负环',
      },
      {
        title: '处理差分约束问题',
        code: `// 差分约束：x[i] - x[j] <= c
// 转化为：x[j] + c >= x[i]，即j到i有边权c
// 求解：建立超级源点，用SPFA求最短路

// 例：x[1] - x[0] <= 1, x[2] - x[1] <= 2
// 建边：0->1(1), 1->2(2)
// 求从超级源点到各点的最短路

void buildConstraints(int n) {
    // 超级源点0，到每个点距离为0
    for (int i = 1; i <= n; i++) {
        adj[0].push_back({i, 0});
    }
    // 添加约束边...
    
    spfa(0);  // dist[i]就是满足约束的解
}`,
        explanation: '差分约束转化为最短路问题',
      },
    ],
    keyPoints: ['Dijkstra不能处理负权边', 'SPFA可以处理负权和检测负环', '负环使最短路无意义'],
    commonMistakes: ['用Dijkstra处理负权图', '负环判断条件错误', '给所有边加常数试图消去负权'],
    tips: ['能用Dijkstra就别用SPFA', '差分约束是负权图的重要应用', '注意SPFA可能退化'],
    relatedKnowledge: ['dijkstra-impl', 'spfa'],
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

  // ========== 基础阶段补充 (Day 1-35) ==========
  'loop-optimization': {
    id: 'loop-optimization',
    title: '循环优化基础',
    content: `## 循环优化基础

### 为什么要优化循环

循环是程序中最耗时的部分之一，优化循环可以显著提高程序效率。

### 常见优化方法

1. **减少循环内计算**
\`\`\`cpp
// 不好：每次循环都计算
for (int i = 0; i < strlen(s); i++) { }

// 好：提前计算
int len = strlen(s);
for (int i = 0; i < len; i++) { }
\`\`\`

2. **减少函数调用**
\`\`\`cpp
// 不好：每次循环都调用函数
for (int i = 0; i < n; i++) {
    sum += getValue(i);
}

// 好：内联或提前计算
\`\`\`

3. **循环展开**
\`\`\`cpp
// 展开4次
for (int i = 0; i < n; i += 4) {
    sum += a[i] + a[i+1] + a[i+2] + a[i+3];
}
\`\`\``,
    codeExamples: [
      {
        title: '循环优化示例',
        code: `// 优化前
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        // 每次都访问全局变量
    }
}

// 优化后：局部变量缓存
for (int i = 0; i < n; i++) {
    int local = globalVar;
    for (int j = 0; j < m; j++) {
        // 使用local
    }
}`,
        explanation: '缓存全局变量到局部变量。',
      },
    ],
    keyPoints: ['减少循环内计算', '减少函数调用', '适当展开'],
    commonMistakes: ['过度优化', '展开后边界错误'],
    tips: ['先写对再优化', '测量优化效果'],
    relatedProblems: [5, 6],
  },

  'matrix': {
    id: 'matrix',
    title: '矩阵操作',
    content: `## 矩阵操作

### 矩阵的概念

矩阵是一个二维数组，常用的操作包括遍历、旋转、翻转等。

### 基本操作

\`\`\`cpp
int a[105][105];
int n, m;

// 遍历
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cin >> a[i][j];
    }
}

// 顺时针旋转90度
int b[105][105];
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        b[j][n-1-i] = a[i][j];
    }
}
\`\`\``,
    codeExamples: [
      {
        title: '矩阵旋转',
        code: `// 顺时针旋转90度
void rotate90(int a[][105], int n) {
    int b[105][105];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            b[j][n-1-i] = a[i][j];
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            a[i][j] = b[i][j];
        }
    }
}`,
        explanation: '矩阵顺时针旋转90度。',
      },
    ],
    keyPoints: ['掌握矩阵遍历', '学会旋转和翻转'],
    commonMistakes: ['下标写错', '旋转方向错误'],
    tips: ['画图理解变换', '注意边界'],
    relatedProblems: [20, 21],
  },

  'struct-sort': {
    id: 'struct-sort',
    title: '结构体排序',
    content: `## 结构体排序

### 为什么需要结构体排序

当需要按多个字段排序时，结构体排序非常有用。

### 方法一：比较函数

\`\`\`cpp
struct Student {
    string name;
    int score;
    int age;
};

bool cmp(Student a, Student b) {
    if (a.score != b.score) return a.score > b.score;  // 分数降序
    if (a.age != b.age) return a.age < b.age;          // 年龄升序
    return a.name < b.name;                             // 姓名升序
}

sort(stu, stu + n, cmp);
\`\`\`

### 方法二：重载运算符

\`\`\`cpp
struct Student {
    string name;
    int score;
    bool operator<(const Student& other) const {
        return score > other.score;  // 分数降序
    }
};
\`\`\``,
    codeExamples: [
      {
        title: '多关键字排序',
        code: `struct Student {
    string name;
    int score;
    int age;
};

bool cmp(Student a, Student b) {
    // 分数高的在前，分数相同按年龄小在前
    if (a.score != b.score) return a.score > b.score;
    return a.age < b.age;
}

int main() {
    Student stu[100];
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> stu[i].name >> stu[i].score >> stu[i].age;
    }
    sort(stu, stu + n, cmp);
    for (int i = 0; i < n; i++) {
        cout << stu[i].name << " " << stu[i].score << endl;
    }
}`,
        explanation: '按多个关键字排序。',
      },
    ],
    keyPoints: ['掌握比较函数写法', '理解多关键字排序'],
    commonMistakes: ['比较函数返回等号', '排序方向搞反'],
    tips: ['比较函数只能返回<或>', '注意稳定性'],
    relatedProblems: [22, 23],
  },

  'char-array': {
    id: 'char-array',
    title: '字符数组',
    content: `## 字符数组

### C风格字符串

字符数组是C语言风格的字符串，以'\\0'结尾。

### 常用操作

\`\`\`cpp
char s[100];

cin >> s;           // 读入（遇空格停止）
cin.getline(s, 100); // 读入一行
cout << s;          // 输出

strlen(s);          // 长度
strcpy(s1, s2);     // 复制
strcat(s1, s2);     // 连接
strcmp(s1, s2);     // 比较
\`\`\`

### 遍历字符

\`\`\`cpp
for (int i = 0; s[i]; i++) {
    // 处理每个字符
}

// 或
for (int i = 0; i < strlen(s); i++) {
    // 处理每个字符
}
\`\`\``,
    codeExamples: [
      {
        title: '字符数组操作',
        code: `#include <cstring>

int main() {
    char s1[100] = "Hello";
    char s2[100] = "World";
    
    // 连接
    strcat(s1, " ");
    strcat(s1, s2);
    cout << s1 << endl;  // Hello World
    
    // 长度
    cout << strlen(s1) << endl;  // 11
    
    // 比较
    if (strcmp(s1, s2) > 0) {
        cout << "s1 > s2" << endl;
    }
    
    return 0;
}`,
        explanation: '字符数组基本操作。',
      },
    ],
    keyPoints: ['掌握基本操作函数', '理解C风格字符串'],
    commonMistakes: ['忘记分配足够空间', '越界访问'],
    tips: ['推荐使用string', '注意空间分配'],
    relatedProblems: [19, 20],
  },

  // ========== 高级阶段 (Day 71-100) ==========
  'astar': {
    id: 'astar',
    title: 'A*算法',
    content: `## A*算法

A*是一种启发式搜索算法，用于寻找最短路径。

### 基本公式

f(n) = g(n) + h(n)

- g(n)：从起点到n的实际代价
- h(n)：从n到终点的估计代价（启发函数）
- f(n)：总估计代价

### 启发函数

启发函数必须**不高估**实际代价（可采纳性）。`,
    codeExamples: [
      {
        title: 'A*算法模板',
        code: `int heuristic(int x, int y, int ex, int ey) {
    return abs(x - ex) + abs(y - ey);  // 曼哈顿距离
}

int astar(int sx, int sy, int ex, int ey) {
    priority_queue<pair<int, pair<int,int>>, 
                   vector<pair<int, pair<int,int>>>,
                   greater<>> pq;
    
    pq.push({heuristic(sx, sy, ex, ey), {sx, sy}});
    dist[sx][sy] = 0;
    
    while (!pq.empty()) {
        auto [f, pos] = pq.top();
        auto [x, y] = pos;
        pq.pop();
        
        if (x == ex && y == ey) return dist[x][y];
        if (f > dist[x][y] + heuristic(x, y, ex, ey)) continue;
        
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (valid(nx, ny) && dist[nx][ny] > dist[x][y] + 1) {
                dist[nx][ny] = dist[x][y] + 1;
                pq.push({dist[nx][ny] + heuristic(nx, ny, ex, ey), {nx, ny}});
            }
        }
    }
    return -1;
}`,
        explanation: 'A*寻路算法。',
      },
    ],
    keyPoints: ['理解启发函数', '保证可采纳性'],
    commonMistakes: ['启发函数过高估计', '忘记判断重复'],
    tips: ['启发函数越准确越快', 'BFS是A*的特例'],
    relatedProblems: [71, 126],
  },

  'ida': {
    id: 'ida',
    title: 'IDA*算法',
    content: `## IDA*算法

迭代加深A*，结合了迭代加深和A*的优点。

### 适用场景

- 状态空间大
- 内存有限
- 需要最优解

### 基本思想

1. 设置最大深度限制
2. DFS搜索，剪枝：如果当前代价+估计代价>限制，返回
3. 没找到则增加深度限制，重复`,
    codeExamples: [
      {
        title: 'IDA*模板',
        code: `int limit;

bool dfs(int depth, int g, State state) {
    int h = heuristic(state);
    if (g + h > limit) return false;
    if (isGoal(state)) return true;
    if (depth == 0) return false;
    
    for (State next : getNextStates(state)) {
        if (dfs(depth - 1, g + 1, next)) {
            return true;
        }
    }
    return false;
}

int idaStar(State start) {
    limit = heuristic(start);
    while (!dfs(limit, 0, start)) {
        limit++;
    }
    return limit;
}`,
        explanation: 'IDA*算法框架。',
      },
    ],
    keyPoints: ['迭代加深+启发式', '适合内存受限场景'],
    commonMistakes: ['启发函数设计错误', '深度限制更新错误'],
    tips: ['IDA*空间复杂度O(d)', '适合解空间大的问题'],
    relatedProblems: [126, 127],
  },

  'flow-intro': {
    id: 'flow-intro',
    title: '网络流概念',
    content: `## 网络流

网络流是图论中的重要问题，涉及流量在网络中的传输。

### 基本概念

- **容量**：边的最大流量
- **流量**：实际通过的流量
- **流量守恒**：进入=流出（除源点和汇点）

### 问题类型

1. **最大流**：从源点到汇点的最大流量
2. **最小割**：切断源汇的最小容量
3. **费用流**：考虑费用的流量问题`,
    codeExamples: [
      {
        title: '网络流基础',
        code: `// 流网络表示
struct Edge {
    int to, cap, flow;
};

vector<Edge> edges;
vector<int> adj[MAXN];

void addEdge(int u, int v, int cap) {
    adj[u].push_back(edges.size());
    edges.push_back({v, cap, 0});
    adj[v].push_back(edges.size());
    edges.push_back({u, 0, 0});  // 反向边
}`,
        explanation: '网络流图的表示。',
      },
    ],
    keyPoints: ['理解流量和容量', '掌握残留网络'],
    commonMistakes: ['忘记反向边', '流量守恒'],
    tips: ['最大流=最小割', '多种算法选择'],
    relatedProblems: [128, 129],
  },

  'maxflow': {
    id: 'maxflow',
    title: '最大流',
    content: `## 最大流问题

### Ford-Fulkerson方法

不断寻找增广路径，增加流量。

### Dinic算法

更高效的实现，使用BFS分层+DFS增广。`,
    codeExamples: [
      {
        title: 'Dinic算法',
        code: `struct Edge {
    int to, cap, rev;
};

vector<Edge> adj[MAXN];
int level[MAXN], iter[MAXN];

void addEdge(int u, int v, int cap) {
    adj[u].push_back({v, cap, (int)adj[v].size()});
    adj[v].push_back({u, 0, (int)adj[u].size() - 1});
}

bool bfs(int s, int t) {
    memset(level, -1, sizeof(level));
    queue<int> q;
    level[s] = 0;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto& e : adj[u]) {
            if (e.cap > 0 && level[e.to] < 0) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
    }
    return level[t] >= 0;
}

int dfs(int u, int t, int f) {
    if (u == t) return f;
    for (int& i = iter[u]; i < adj[u].size(); i++) {
        auto& e = adj[u][i];
        if (e.cap > 0 && level[u] < level[e.to]) {
            int d = dfs(e.to, t, min(f, e.cap));
            if (d > 0) {
                e.cap -= d;
                adj[e.to][e.rev].cap += d;
                return d;
            }
        }
    }
    return 0;
}

int maxFlow(int s, int t) {
    int flow = 0;
    while (bfs(s, t)) {
        memset(iter, 0, sizeof(iter));
        int f;
        while ((f = dfs(s, t, INF)) > 0) {
            flow += f;
        }
    }
    return flow;
}`,
        explanation: 'Dinic最大流算法。',
      },
    ],
    keyPoints: ['BFS分层', 'DFS增广', '当前弧优化'],
    commonMistakes: ['忘记反向边', '当前弧优化错误'],
    tips: ['复杂度O(n²m)', '竞赛中常用'],
    relatedProblems: [128, 129],
  },

  'dinic': {
    id: 'dinic',
    title: 'Dinic算法详解',
    content: `## Dinic算法详解

Dinic是最大流问题的高效算法。

### 算法步骤

1. BFS建立层次图
2. DFS在层次图上增广
3. 重复直到无法增广

### 优化

- **当前弧优化**：记录已经处理过的边
- **多路增广**：一次DFS找多条增广路`,
    codeExamples: [
      {
        title: 'Dinic完整实现',
        code: `const int INF = 1e9;

struct Dinic {
    struct Edge {
        int to, cap, rev;
    };
    
    vector<Edge> adj[MAXN];
    int level[MAXN], iter[MAXN];
    
    void addEdge(int u, int v, int cap) {
        adj[u].push_back({v, cap, (int)adj[v].size()});
        adj[v].push_back({u, 0, (int)adj[u].size() - 1});
    }
    
    bool bfs(int s, int t) {
        memset(level, -1, sizeof(level));
        queue<int> q;
        level[s] = 0;
        q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& e : adj[u]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[u] + 1;
                    q.push(e.to);
                }
            }
        }
        return level[t] >= 0;
    }
    
    int dfs(int u, int t, int f) {
        if (u == t) return f;
        for (int& i = iter[u]; i < (int)adj[u].size(); i++) {
            auto& e = adj[u][i];
            if (e.cap > 0 && level[u] < level[e.to]) {
                int d = dfs(e.to, t, min(f, e.cap));
                if (d > 0) {
                    e.cap -= d;
                    adj[e.to][e.rev].cap += d;
                    return d;
                }
            }
        }
        return 0;
    }
    
    int maxFlow(int s, int t) {
        int flow = 0;
        while (bfs(s, t)) {
            memset(iter, 0, sizeof(iter));
            int f;
            while ((f = dfs(s, t, INF)) > 0) {
                flow += f;
            }
        }
        return flow;
    }
};`,
        explanation: 'Dinic算法完整实现。',
      },
    ],
    keyPoints: ['层次图', '当前弧优化', '反向边'],
    commonMistakes: ['忘记重置iter', '反向边容量'],
    tips: ['记住模板', '理解原理'],
    relatedProblems: [128, 129],
  },

  'mincut': {
    id: 'mincut',
    title: '最小割',
    content: `## 最小割

### 定义

将源点和汇点分开的边的最小容量和。

### 最大流最小割定理

**最大流 = 最小割**

### 应用

- 网络可靠性
- 图像分割
- 项目选择`,
    codeExamples: [
      {
        title: '最小割求法',
        code: `// 最大流求完后，从源点BFS
// 能到达的点在S集合，不能到达的在T集合
// S到T的边就是割边

vector<bool> minCut(int s) {
    vector<bool> inS(MAXN, false);
    queue<int> q;
    q.push(s);
    inS[s] = true;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto& e : adj[u]) {
            if (e.cap > 0 && !inS[e.to]) {
                inS[e.to] = true;
                q.push(e.to);
            }
        }
    }
    
    return inS;
}`,
        explanation: '最小割的求法。',
      },
    ],
    keyPoints: ['最大流=最小割', 'BFS找S集合'],
    commonMistakes: ['割边判断错误'],
    tips: ['很多问题可转化为最小割', '理解定理本质'],
    relatedProblems: [130, 131],
  },

  'mcmf': {
    id: 'mcmf',
    title: '最小费用最大流',
    content: `## 最小费用最大流

在最大流的基础上，要求费用最小。

### 算法

使用SPFA找最短路增广。`,
    codeExamples: [
      {
        title: 'MCMF模板',
        code: `struct Edge {
    int to, cap, cost, rev;
};

vector<Edge> adj[MAXN];
int dist[MAXN], prevv[MAXN], preve[MAXN];

void addEdge(int u, int v, int cap, int cost) {
    adj[u].push_back({v, cap, cost, (int)adj[v].size()});
    adj[v].push_back({u, 0, -cost, (int)adj[u].size() - 1});
}

pair<int, int> minCostMaxFlow(int s, int t) {
    int flow = 0, cost = 0;
    while (true) {
        memset(dist, 0x3f, sizeof(dist));
        dist[s] = 0;
        queue<int> q;
        q.push(s);
        
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i = 0; i < (int)adj[u].size(); i++) {
                auto& e = adj[u][i];
                if (e.cap > 0 && dist[e.to] > dist[u] + e.cost) {
                    dist[e.to] = dist[u] + e.cost;
                    prevv[e.to] = u;
                    preve[e.to] = i;
                    q.push(e.to);
                }
            }
        }
        
        if (dist[t] == 0x3f3f3f3f) break;
        
        int d = INF;
        for (int v = t; v != s; v = prevv[v]) {
            d = min(d, adj[prevv[v]][preve[v]].cap);
        }
        
        flow += d;
        cost += d * dist[t];
        
        for (int v = t; v != s; v = prevv[v]) {
            auto& e = adj[prevv[v]][preve[v]];
            e.cap -= d;
            adj[v][e.rev].cap += d;
        }
    }
    
    return {flow, cost};
}`,
        explanation: '最小费用最大流。',
      },
    ],
    keyPoints: ['SPFA找最短路', '同时更新流量和费用'],
    commonMistakes: ['费用正负号', '反向边费用取反'],
    tips: ['注意负权边', '复杂度O(VE*flow)'],
    relatedProblems: [132, 133],
  },

  'scc-intro': {
    id: 'scc-intro',
    title: '强连通分量',
    content: `## 强连通分量

有向图中，任意两点可互相到达的最大子图。

### 应用

- 缩点（将强连通分量缩为一个点）
- 2-SAT问题`,
    codeExamples: [
      {
        title: '强连通分量概念',
        code: `// 强连通分量示例
// 1 -> 2 -> 3 -> 1 形成一个强连通分量
// 4 -> 5 形成另一个强连通分量（不包含3->4）`,
        explanation: '强连通分量的概念。',
      },
    ],
    keyPoints: ['理解定义', '知道应用场景'],
    commonMistakes: ['与连通分量混淆'],
    tips: ['DAG由SCC组成', '缩点后是DAG'],
    relatedProblems: [134, 135],
  },

  'tarjan': {
    id: 'tarjan',
    title: 'Tarjan算法',
    content: `## Tarjan算法

线性时间求强连通分量。

### 核心概念

- **dfn**：时间戳
- **low**：能回溯到的最早时间戳
- **栈**：保存当前路径上的节点`,
    codeExamples: [
      {
        title: 'Tarjan求SCC',
        code: `int dfn[MAXN], low[MAXN], sccno[MAXN];
int dfsclock, scccnt;
stack<int> s;

void dfs(int u) {
    dfn[u] = low[u] = ++dfsclock;
    s.push(u);
    
    for (int v : adj[u]) {
        if (!dfn[v]) {
            dfs(v);
            low[u] = min(low[u], low[v]);
        } else if (!sccno[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }
    
    if (low[u] == dfn[u]) {
        scccnt++;
        while (true) {
            int x = s.top(); s.pop();
            sccno[x] = scccnt;
            if (x == u) break;
        }
    }
}

void findSCC(int n) {
    dfsclock = scccnt = 0;
    memset(dfn, 0, sizeof(dfn));
    memset(sccno, 0, sizeof(sccno));
    
    for (int i = 1; i <= n; i++) {
        if (!dfn[i]) dfs(i);
    }
}`,
        explanation: 'Tarjan算法求强连通分量。',
      },
    ],
    keyPoints: ['dfn和low数组', '栈的使用'],
    commonMistakes: ['low更新条件', '出栈条件'],
    tips: ['Tarjan是万能算法', '可求割点、桥等'],
    relatedProblems: [134, 135],
  },

  'scc-apps': {
    id: 'scc-apps',
    title: '强连通分量应用',
    content: `## 强连通分量应用

### 缩点

将每个SCC缩成一个点，得到DAG。

### 2-SAT

利用SCC判断2-SAT是否有解。

### 求解问题

- 在DAG上DP
- 统计信息`,
    codeExamples: [
      {
        title: '缩点建图',
        code: `// 缩点后建新图
void buildDAG(int n) {
    for (int u = 1; u <= n; u++) {
        for (int v : adj[u]) {
            if (sccno[u] != sccno[v]) {
                dag[sccno[u]].push_back(sccno[v]);
            }
        }
    }
}

// 在DAG上DP
void solve(int n) {
    findSCC(n);
    buildDAG(n);
    // 在DAG上进行DP或其他操作
}`,
        explanation: '缩点后建DAG。',
      },
    ],
    keyPoints: ['缩点建DAG', 'DAG上处理'],
    commonMistakes: ['重复边处理', 'DAG方向'],
    tips: ['缩点是常用技巧', '简化问题'],
    relatedProblems: [134, 135],
  },

  'hld-intro': {
    id: 'hld-intro',
    title: '树链剖分概念',
    content: `## 树链剖分

将树分解成多条链，支持路径查询和修改。

### 核心思想

- 重儿子：子树最大的儿子
- 重边：连向重儿子的边
- 重链：连续的重边`,
    codeExamples: [
      {
        title: '树链剖分概念',
        code: `// 重儿子：子树最大的儿子
// 轻儿子：其他儿子
// 重边：连向重儿子的边
// 轻边：其他边
// 重链：连续的重边组成的链`,
        explanation: '树链剖分的基本概念。',
      },
    ],
    keyPoints: ['理解重链定义', '知道作用'],
    commonMistakes: ['重儿子选择错误'],
    tips: ['重链可以快速跳到链顶', '路径查询O(log²n)'],
    relatedProblems: [136, 137],
  },

  'hld-impl': {
    id: 'hld-impl',
    title: '树链剖分实现',
    content: `## 树链剖分实现

两次DFS预处理，然后进行路径操作。`,
    codeExamples: [
      {
        title: '树链剖分模板',
        code: `int sz[MAXN], dep[MAXN], fa[MAXN], son[MAXN];
int top[MAXN], id[MAXN], tot;

void dfs1(int u, int f, int d) {
    sz[u] = 1;
    dep[u] = d;
    fa[u] = f;
    son[u] = 0;
    for (int v : adj[u]) {
        if (v != f) {
            dfs1(v, u, d + 1);
            sz[u] += sz[v];
            if (sz[v] > sz[son[u]]) son[u] = v;
        }
    }
}

void dfs2(int u, int t) {
    top[u] = t;
    id[u] = ++tot;
    if (son[u]) dfs2(son[u], t);
    for (int v : adj[u]) {
        if (v != fa[u] && v != son[u]) {
            dfs2(v, v);
        }
    }
}

// 路径查询
int queryPath(int u, int v) {
    int res = 0;
    while (top[u] != top[v]) {
        if (dep[top[u]] < dep[top[v]]) swap(u, v);
        res += query(id[top[u]], id[u]);  // 线段树查询
        u = fa[top[u]];
    }
    if (dep[u] > dep[v]) swap(u, v);
    res += query(id[u], id[v]);
    return res;
}`,
        explanation: '树链剖分完整实现。',
      },
    ],
    keyPoints: ['两次DFS', '重链跳跃'],
    commonMistakes: ['方向判断错误', '线段树映射'],
    tips: ['id数组映射到线段树', '路径修改类似'],
    relatedProblems: [136, 137],
  },

  'divide-intro': {
    id: 'divide-intro',
    title: '分治算法概念',
    content: `## 分治算法

分而治之：将大问题分解为小问题，递归求解后合并。

### 基本步骤

1. **分解**：将问题分解为子问题
2. **解决**：递归求解子问题
3. **合并**：合并子问题的解

### 经典应用

- 归并排序
- 快速排序
- 最近点对
- 大整数乘法`,
    codeExamples: [
      {
        title: '归并排序',
        code: `void merge(int l, int mid, int r) {
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) tmp[k++] = a[i++];
        else tmp[k++] = a[j++];
    }
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int i = l; i <= r; i++) a[i] = tmp[i];
}

void mergeSort(int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    mergeSort(l, mid);
    mergeSort(mid + 1, r);
    merge(l, mid, r);
}`,
        explanation: '归并排序是典型的分治。',
      },
    ],
    keyPoints: ['分解-解决-合并', '递归处理'],
    commonMistakes: ['边界条件', '合并逻辑'],
    tips: ['分治是重要思想', '很多算法基于分治'],
    relatedProblems: [138, 139],
  },

  'divide-impl': {
    id: 'divide-impl',
    title: '分治算法实现',
    content: `## 分治实现技巧

### 注意事项

1. 确定递归边界
2. 正确分解问题
3. 高效合并结果`,
    codeExamples: [
      {
        title: '逆序对计数',
        code: `long long cnt = 0;

void merge(int l, int mid, int r) {
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) {
            tmp[k++] = a[i++];
        } else {
            tmp[k++] = a[j++];
            cnt += mid - i + 1;  // 逆序对数量
        }
    }
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int i = l; i <= r; i++) a[i] = tmp[i];
}

void mergeSort(int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    mergeSort(l, mid);
    mergeSort(mid + 1, r);
    merge(l, mid, r);
}`,
        explanation: '归并排序求逆序对。',
      },
    ],
    keyPoints: ['掌握经典分治', '学会变形'],
    commonMistakes: ['合并时遗漏', '边界处理'],
    tips: ['分治+排序很常见', '注意复杂度'],
    relatedProblems: [138, 139],
  },

  'cdq-intro': {
    id: 'cdq-intro',
    title: 'CDQ分治',
    content: `## CDQ分治

一种特殊的分治方法，用于处理偏序问题。

### 核心思想

将问题按某一维度排序，分治处理后合并时计算跨区间的贡献。

### 适用场景

- 三维偏序
- 多维计数问题`,
    codeExamples: [
      {
        title: 'CDQ分治概念',
        code: `// 三维偏序：求满足 a[i] < a[j], b[i] < b[j], c[i] < c[j] 的对数
// 步骤：
// 1. 按第一维排序
// 2. CDQ分治处理第二维
// 3. 树状数组处理第三维`,
        explanation: 'CDQ分治处理三维偏序。',
      },
    ],
    keyPoints: ['理解降维思想', '掌握合并方法'],
    commonMistakes: ['维度处理顺序', '重复计数'],
    tips: ['CDQ分治是高级技巧', '需要多练习'],
    relatedProblems: [140, 141],
  },

  'cdq-3d': {
    id: 'cdq-3d',
    title: '三维偏序',
    content: `## 三维偏序问题

求满足 x[i] < x[j], y[i] < y[j], z[i] < z[j] 的点对数量。`,
    codeExamples: [
      {
        title: '三维偏序CDQ',
        code: `struct Point {
    int x, y, z, id;
} p[MAXN];

bool cmpX(Point a, Point b) {
    return a.x != b.x ? a.x < b.x : (a.y != b.y ? a.y < b.y : a.z < b.z);
}

bool cmpY(Point a, Point b) {
    return a.y != b.y ? a.y < b.y : a.z < b.z;
}

int bit[MAXN], ans[MAXN];

void add(int i, int v) {
    for (; i < MAXN; i += i & -i) bit[i] += v;
}

int sum(int i) {
    int s = 0;
    for (; i; i -= i & -i) s += bit[i];
    return s;
}

void cdq(int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    cdq(l, mid);
    cdq(mid + 1, r);
    
    sort(p + l, p + mid + 1, cmpY);
    sort(p + mid + 1, p + r + 1, cmpY);
    
    int i = l, j = mid + 1;
    while (j <= r) {
        while (i <= mid && p[i].y <= p[j].y) {
            add(p[i].z, 1);
            i++;
        }
        ans[p[j].id] += sum(p[j].z - 1);
        j++;
    }
    for (int k = l; k < i; k++) add(p[k].z, -1);
}`,
        explanation: '三维偏序CDQ分治。',
      },
    ],
    keyPoints: ['分治+排序+树状数组', '正确去重'],
    commonMistakes: ['坐标离散化', '清空树状数组'],
    tips: ['注意相等元素处理', '复杂度O(n log² n)'],
    relatedProblems: [140, 141],
  },

  'convex-intro': {
    id: 'convex-intro',
    title: '凸包概念',
    content: `## 凸包

平面上点集的凸包是包含所有点的最小凸多边形。

### 应用

- 最远点对
- 最近点对
- 面积计算`,
    codeExamples: [
      {
        title: '凸包概念',
        code: `// 凸包：包含所有点的最小凸多边形
// 应用：求面积、最远点对、旋转卡壳等`,
        explanation: '凸包的基本概念。',
      },
    ],
    keyPoints: ['理解凸包定义', '知道应用场景'],
    commonMistakes: ['凸包顺序', '边界点'],
    tips: ['常用Graham或Andrew算法', '注意精度'],
    relatedProblems: [142, 143],
  },

  'convex-hull': {
    id: 'convex-hull',
    title: '凸包算法',
    content: `## 凸包算法

### Andrew算法

1. 按x坐标排序
2. 从左到右求下凸壳
3. 从右到左求上凸壳`,
    codeExamples: [
      {
        title: 'Andrew凸包',
        code: `struct Point {
    double x, y;
    bool operator<(const Point& p) const {
        return x < p.x || (x == p.x && y < p.y);
    }
} p[MAXN];

double cross(Point o, Point a, Point b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

vector<Point> convexHull(vector<Point>& pts) {
    int n = pts.size();
    sort(pts.begin(), pts.end());
    
    vector<Point> hull(2 * n);
    int k = 0;
    
    // 下凸壳
    for (int i = 0; i < n; i++) {
        while (k >= 2 && cross(hull[k-2], hull[k-1], pts[i]) <= 0) {
            k--;
        }
        hull[k++] = pts[i];
    }
    
    // 上凸壳
    for (int i = n - 2, t = k + 1; i >= 0; i--) {
        while (k >= t && cross(hull[k-2], hull[k-1], pts[i]) <= 0) {
            k--;
        }
        hull[k++] = pts[i];
    }
    
    hull.resize(k - 1);
    return hull;
}`,
        explanation: 'Andrew算法求凸包。',
      },
    ],
    keyPoints: ['叉积判断方向', '上下凸壳合并'],
    commonMistakes: ['叉积符号', '重复点处理'],
    tips: ['注意浮点精度', 'k-1是正确大小'],
    relatedProblems: [142, 143],
  },

  'quad-intro': {
    id: 'quad-intro',
    title: '四边形不等式',
    content: `## 四边形不等式

用于优化区间DP的一种技巧。

### 四边形不等式

对于函数w(i,j)，若满足：
w(a,c) + w(b,d) ≤ w(a,d) + w(b,c)（a≤b≤c≤d）

则称w满足四边形不等式。`,
    codeExamples: [
      {
        title: '四边形不等式概念',
        code: `// 如果代价函数满足四边形不等式
// 则最优决策点单调
// 可以优化区间DP到O(n²)`,
        explanation: '四边形不等式的概念。',
      },
    ],
    keyPoints: ['理解不等式含义', '知道优化效果'],
    commonMistakes: ['判断条件错误'],
    tips: ['石子合并满足四边形不等式', '可优化到O(n²)'],
    relatedProblems: [144, 145],
  },

  'quad-opt': {
    id: 'quad-opt',
    title: '四边形不等式优化',
    content: `## 四边形不等式优化DP

当最优决策点单调时，可以用决策单调性优化。`,
    codeExamples: [
      {
        title: '决策单调性优化',
        code: `// dp[i] = min(dp[j] + w(j, i))
// 如果决策点单调递增，可以用分治或单调队列优化

// 石子合并优化
for (int len = 2; len <= n; len++) {
    for (int i = 1; i + len - 1 <= n; i++) {
        int j = i + len - 1;
        dp[i][j] = INF;
        // 优化：只在s[i][j-1]到s[i+1][j]范围内枚举
        for (int k = s[i][j-1]; k <= s[i+1][j]; k++) {
            if (dp[i][k] + dp[k+1][j] < dp[i][j]) {
                dp[i][j] = dp[i][k] + dp[k+1][j];
                s[i][j] = k;
            }
        }
        dp[i][j] += sum[j] - sum[i-1];
    }
}`,
        explanation: '四边形不等式优化石子合并。',
      },
    ],
    keyPoints: ['决策点单调', '缩小枚举范围'],
    commonMistakes: ['s数组边界', '初始化'],
    tips: ['优化后复杂度O(n²)', '需要证明四边形不等式'],
    relatedProblems: [144, 145],
  },

  'tree-dp-adv': {
    id: 'tree-dp-adv',
    title: '树形DP进阶',
    content: `## 树形DP进阶

### 常见问题

- 换根DP
- 树上背包
- 树的直径扩展`,
    codeExamples: [
      {
        title: '换根DP',
        code: `// 第一遍DFS：求子树信息
void dfs1(int u, int fa) {
    sz[u] = 1;
    dp[u] = 0;
    for (int v : adj[u]) {
        if (v != fa) {
            dfs1(v, u);
            sz[u] += sz[v];
            dp[u] += dp[v] + sz[v];
        }
    }
}

// 第二遍DFS：换根
void dfs2(int u, int fa) {
    for (int v : adj[u]) {
        if (v != fa) {
            // 从u换到v
            dp[v] = dp[u] - sz[v] + (n - sz[v]);
            dfs2(v, u);
        }
    }
}`,
        explanation: '换根DP求所有点到其他点的距离和。',
      },
    ],
    keyPoints: ['两次DFS', '换根计算'],
    commonMistakes: ['换根公式错误', '边界处理'],
    tips: ['换根DP是重要技巧', '很多题目会用到'],
    relatedProblems: [146, 147],
  },

  'tree-dp-merge': {
    id: 'tree-dp-merge',
    title: '树上合并',
    content: `## 树上合并

启发式合并：将小的集合合并到大的集合。

### 应用

- 统计子树信息
- 颜色统计问题`,
    codeExamples: [
      {
        title: '启发式合并',
        code: `map<int, int> cnt[MAXN];
int big[MAXN];

void dfs(int u, int fa) {
    big[u] = u;
    cnt[u][color[u]] = 1;
    
    for (int v : adj[u]) {
        if (v == fa) continue;
        dfs(v, u);
        
        // 小合并到大
        if (cnt[v].size() > cnt[big[u]].size()) {
            swap(big[u], v);
        }
        
        for (auto [c, num] : cnt[v]) {
            cnt[big[u]][c] += num;
        }
        cnt[v].clear();
    }
    
    // 结果在cnt[big[u]]中
    ans[u] = cnt[big[u]].size();
}`,
        explanation: '启发式合并统计颜色。',
      },
    ],
    keyPoints: ['小合并到大', '时间复杂度O(n log n)'],
    commonMistakes: ['忘记交换big', '清空容器'],
    tips: ['启发式合并很实用', '注意常数'],
    relatedProblems: [146, 147],
  },

  'mo-intro': {
    id: 'mo-intro',
    title: '莫队算法概念',
    content: `## 莫队算法

一种离线处理区间查询的算法，通过排序减少移动次数。

### 核心思想

将询问按某种顺序排序，使得相邻询问的区间变化尽量小。`,
    codeExamples: [
      {
        title: '莫队概念',
        code: `// 区间查询：n个数，m个询问，求区间内不同数的个数
// 暴力：O(nm)
// 莫队：O(n√m)`,
        explanation: '莫队算法的适用场景。',
      },
    ],
    keyPoints: ['离线处理', '分块排序'],
    commonMistakes: ['排序方式错误'],
    tips: ['莫队是重要技巧', '很多区间问题适用'],
    relatedProblems: [148, 149],
  },

  'mo-impl': {
    id: 'mo-impl',
    title: '莫队算法实现',
    content: `## 莫队实现

### 步骤

1. 分块
2. 按块排序询问
3. 双指针移动`,
    codeExamples: [
      {
        title: '莫队模板',
        code: `int block;

struct Query {
    int l, r, id;
    bool operator<(const Query& q) const {
        if (l / block != q.l / block) return l < q.l;
        return (l / block) & 1 ? r < q.r : r > q.r;
    }
} qs[MAXN];

int curAns = 0, cnt[MAXV];

void add(int x) {
    if (++cnt[x] == 1) curAns++;
}

void remove(int x) {
    if (--cnt[x] == 0) curAns--;
}

void mo(int n, int m) {
    block = sqrt(n);
    sort(qs, qs + m);
    
    int l = 1, r = 0;
    for (int i = 0; i < m; i++) {
        while (l > qs[i].l) add(a[--l]);
        while (r < qs[i].r) add(a[++r]);
        while (l < qs[i].l) remove(a[l++]);
        while (r > qs[i].r) remove(a[r--]);
        ans[qs[i].id] = curAns;
    }
}`,
        explanation: '莫队算法求区间不同数。',
      },
    ],
    keyPoints: ['奇偶排序优化', 'add/remove顺序'],
    commonMistakes: ['指针越界', '排序写错'],
    tips: ['复杂度O(n√n)', '奇偶排序可优化常数'],
    relatedProblems: [148, 149],
  },

  'mo-variants': {
    id: 'mo-variants',
    title: '莫队变种',
    content: `## 莫队变种

### 带修莫队

支持单点修改的莫队，增加时间维度。

### 树上莫队

在树上进行莫队，使用欧拉序。`,
    codeExamples: [
      {
        title: '带修莫队',
        code: `struct Query {
    int l, r, t, id;  // t是时间戳
} qs[MAXN];

struct Modify {
    int pos, oldVal, newVal;
} ms[MAXN];

// 三维排序：块号、右端点、时间
bool operator<(const Query& a, const Query& b) {
    if (a.l / block != b.l / block) return a.l < b.l;
    if (a.r / block != b.r / block) return a.r < b.r;
    return a.t < b.t;
}`,
        explanation: '带修莫队的结构。',
      },
    ],
    keyPoints: ['增加时间维度', '三维排序'],
    commonMistakes: ['时间移动顺序', '修改回退'],
    tips: ['复杂度O(n^(5/3))', '树上莫队用欧拉序'],
    relatedProblems: [150, 151],
  },

  'matrix-intro': {
    id: 'matrix-intro',
    title: '矩阵基础',
    content: `## 矩阵

### 定义

矩阵是一个二维数组，可以进行加减乘等运算。

### 矩阵乘法

\`\`\`
C[i][j] = Σ A[i][k] * B[k][j]
\`\`\`

时间复杂度O(n³)`,
    codeExamples: [
      {
        title: '矩阵乘法',
        code: `typedef vector<vector<long long>> Matrix;

Matrix multiply(Matrix& A, Matrix& B, long long mod) {
    int n = A.size();
    Matrix C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) {
        for (int k = 0; k < n; k++) {
            for (int j = 0; j < n; j++) {
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod;
            }
        }
    }
    return C;
}`,
        explanation: '矩阵乘法实现。',
      },
    ],
    keyPoints: ['掌握矩阵乘法', '注意取模'],
    commonMistakes: ['乘法顺序', '溢出'],
    tips: ['矩阵乘法不满足交换律', '满足结合律'],
    relatedProblems: [152, 153],
  },

  'matrix-power': {
    id: 'matrix-power',
    title: '矩阵快速幂',
    content: `## 矩阵快速幂

利用快速幂思想，O(n³ log k)计算矩阵的k次幂。

### 应用

- 递推关系优化
- 图的邻接矩阵k次幂`,
    codeExamples: [
      {
        title: '矩阵快速幂',
        code: `Matrix identity(int n) {
    Matrix I(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) I[i][i] = 1;
    return I;
}

Matrix power(Matrix A, long long k, long long mod) {
    Matrix result = identity(A.size());
    while (k > 0) {
        if (k & 1) result = multiply(result, A, mod);
        A = multiply(A, A, mod);
        k >>= 1;
    }
    return result;
}

// 斐波那契数列第n项
long long fib(long long n, long long mod) {
    if (n <= 1) return n;
    Matrix A = {{1, 1}, {1, 0}};
    Matrix result = power(A, n - 1, mod);
    return result[0][0];
}`,
        explanation: '矩阵快速幂求斐波那契。',
      },
    ],
    keyPoints: ['快速幂思想', '递推优化'],
    commonMistakes: ['单位矩阵', '取模'],
    tips: ['很多递推可以矩阵优化', '注意构造矩阵'],
    relatedProblems: [152, 153],
  },

  'matrix-dp': {
    id: 'matrix-dp',
    title: '矩阵优化DP',
    content: `## 矩阵优化DP

当DP转移是线性递推时，可以用矩阵快速幂优化。

### 条件

- 递推关系是线性的
- n很大但递推式简单`,
    codeExamples: [
      {
        title: '矩阵优化递推',
        code: `// dp[i] = a*dp[i-1] + b*dp[i-2] + c
// 转化为矩阵乘法

// [dp[i]  ]   [a b c] [dp[i-1]]
// [dp[i-1]] = [1 0 0] [dp[i-2]]
// [1      ]   [0 0 1] [1      ]

// 然后 matrix^n 求解`,
        explanation: '矩阵优化线性递推。',
      },
    ],
    keyPoints: ['构造转移矩阵', '快速幂优化'],
    commonMistakes: ['矩阵构造错误', '常数项处理'],
    tips: ['复杂度从O(n)降到O(log n)', '注意矩阵大小'],
    relatedProblems: [154, 155],
  },

  'vt-intro': {
    id: 'vt-intro',
    title: '虚树概念',
    content: `## 虚树

当只需要处理树上部分关键节点时，可以构建虚树减少规模。

### 适用场景

- 多次询问，每次只有少量关键点
- 需要在树上DP`,
    codeExamples: [
      {
        title: '虚树概念',
        code: `// 原树有n个节点，但每次只有k个关键点
// 虚树只包含关键点和它们的LCA
// 节点数O(k)`,
        explanation: '虚树的规模。',
      },
    ],
    keyPoints: ['理解虚树结构', '知道何时使用'],
    commonMistakes: ['LCA遗漏', '边权处理'],
    tips: ['虚树是重要优化', '需要LCA预处理'],
    relatedProblems: [156, 157],
  },

  'vt-build': {
    id: 'vt-build',
    title: '虚树构建',
    content: `## 虚树构建

### 步骤

1. 将关键点按DFS序排序
2. 用栈维护虚树路径
3. 计算相邻点的LCA`,
    codeExamples: [
      {
        title: '虚树构建',
        code: `vector<int> adj[MAXN], vt[MAXN];  // 原树和虚树
int dfn[MAXN], dfsclock;
int stk[MAXN], top;

bool cmp(int a, int b) { return dfn[a] < dfn[b]; }

void buildVirtualTree(vector<int>& keyPoints) {
    sort(keyPoints.begin(), keyPoints.end(), cmp);
    
    top = 0;
    stk[++top] = 1;  // 根节点入栈
    
    for (int u : keyPoints) {
        if (u == 1) continue;
        int lca = LCA(u, stk[top]);
        
        while (dfn[lca] < dfn[stk[top-1]]) {
            addEdge(stk[top-1], stk[top]);
            top--;
        }
        
        if (lca != stk[top]) {
            addEdge(lca, stk[top]);
            stk[top] = lca;
        }
        stk[++top] = u;
    }
    
    for (int i = 1; i < top; i++) {
        addEdge(stk[i], stk[i+1]);
    }
}`,
        explanation: '虚树构建算法。',
      },
    ],
    keyPoints: ['栈维护', 'LCA计算'],
    commonMistakes: ['根节点处理', 'DFS序排序'],
    tips: ['构建后可以正常DP', '注意清空虚树'],
    relatedProblems: [156, 157],
  },

  'fft-intro': {
    id: 'fft-intro',
    title: 'FFT概念',
    content: `## FFT（快速傅里叶变换）

用于快速计算多项式乘法，O(n log n)。

### 应用

- 多项式乘法
- 高精度乘法
- 卷积`,
    codeExamples: [
      {
        title: 'FFT概念',
        code: `// 多项式A和B相乘
// 暴力：O(n²)
// FFT：O(n log n)

// 步骤：
// 1. DFT将多项式转换为点值表示
// 2. 点值相乘
// 3. IDFT转换回系数表示`,
        explanation: 'FFT的基本流程。',
      },
    ],
    keyPoints: ['理解点值表示', '掌握DFT/IDFT'],
    commonMistakes: ['精度问题', '长度取2的幂'],
    tips: ['FFT是重要算法', '很多多项式问题会用到'],
    relatedProblems: [158, 159],
  },

  'fft-impl': {
    id: 'fft-impl',
    title: 'FFT实现',
    content: `## FFT实现

使用复数或NTT实现。`,
    codeExamples: [
      {
        title: 'FFT模板',
        code: `#include <complex>
typedef complex<double> cd;
const double PI = acos(-1);

void fft(vector<cd>& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (invert ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len / 2; j++) {
                cd u = a[i+j], v = a[i+j+len/2] * w;
                a[i+j] = u + v;
                a[i+j+len/2] = u - v;
                w *= wlen;
            }
        }
    }
    
    if (invert) {
        for (cd& x : a) x /= n;
    }
}

vector<long long> multiply(vector<int>& a, vector<int>& b) {
    int n = 1;
    while (n < (int)a.size() + (int)b.size()) n <<= 1;
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    fa.resize(n); fb.resize(n);
    
    fft(fa, false); fft(fb, false);
    for (int i = 0; i < n; i++) fa[i] *= fb[i];
    fft(fa, true);
    
    vector<long long> result(n);
    for (int i = 0; i < n; i++) {
        result[i] = round(fa[i].real());
    }
    return result;
}`,
        explanation: 'FFT多项式乘法。',
      },
    ],
    keyPoints: ['蝴蝶变换', '单位根'],
    commonMistakes: ['精度', '长度'],
    tips: ['NTT可以避免精度问题', '长度取最近的2的幂'],
    relatedProblems: [158, 159],
  },

  'ntt': {
    id: 'ntt',
    title: 'NTT（数论变换）',
    content: `## NTT

在模意义下的FFT，避免浮点精度问题。

### 条件

- 模数是质数
- 模数-1是2的幂的倍数（如998244353）`,
    codeExamples: [
      {
        title: 'NTT模板',
        code: `const long long MOD = 998244353;
const long long g = 3;  // 原根

long long power(long long a, long long b, long long mod) {
    long long res = 1;
    while (b > 0) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

void ntt(vector<long long>& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    
    for (int len = 2; len <= n; len <<= 1) {
        long long w = invert ? power(g, MOD-1-len/(MOD-1), MOD) 
                             : power(g, (MOD-1)/len, MOD);
        for (int i = 0; i < n; i += len) {
            long long wk = 1;
            for (int j = 0; j < len / 2; j++) {
                long long u = a[i+j];
                long long v = a[i+j+len/2] * wk % MOD;
                a[i+j] = (u + v) % MOD;
                a[i+j+len/2] = (u - v + MOD) % MOD;
                wk = wk * w % MOD;
            }
        }
    }
    
    if (invert) {
        long long n_inv = power(n, MOD-2, MOD);
        for (long long& x : a) x = x * n_inv % MOD;
    }
}`,
        explanation: 'NTT实现。',
      },
    ],
    keyPoints: ['模数选择', '原根'],
    commonMistakes: ['模数不满足条件', '原根取错'],
    tips: ['998244353是常用模数', '原根是3'],
    relatedProblems: [158, 159],
  },

  'height': {
    id: 'height',
    title: '后缀数组height数组',
    content: `## Height数组

height[i] = LCP(后缀SA[i], 后缀SA[i-1])

### 性质

- height[rank[i]] ≥ height[rank[i-1]] - 1
- 可以O(n)求出

### 应用

- 求两个后缀的LCP
- 本质不同的子串数量`,
    codeExamples: [
      {
        title: 'Height数组',
        code: `int sa[MAXN], rk[MAXN], height[MAXN];

void getHeight(char* s, int n) {
    for (int i = 1; i <= n; i++) rk[sa[i]] = i;
    
    int h = 0;
    for (int i = 1; i <= n; i++) {
        if (rk[i] == 1) continue;
        int j = sa[rk[i] - 1];
        
        while (s[i + h] == s[j + h]) h++;
        height[rk[i]] = h;
        if (h) h--;
    }
}

// 两个后缀的LCP
int lcp(int i, int j) {
    int ri = rk[i], rj = rk[j];
    if (ri > rj) swap(ri, rj);
    // ri+1到rj的height最小值
    return queryMin(ri + 1, rj);
}`,
        explanation: 'Height数组求LCP。',
      },
    ],
    keyPoints: ['理解height含义', '掌握应用'],
    commonMistakes: ['h的更新', 'LCP求法'],
    tips: ['height配合RMQ求LCP', '重要应用'],
    relatedProblems: [160, 161],
  },

  'sa-intro': {
    id: 'sa-intro',
    title: '后缀数组概念',
    content: `## 后缀数组

SA[i] = 排名第i的后缀的起始位置
Rank[i] = 后缀i的排名

### 应用

- 字符串匹配
- 最长公共子串
- 本质不同子串`,
    codeExamples: [
      {
        title: '后缀数组概念',
        code: `// 字符串 "banana"
// 后缀：
// 0: banana
// 1: anana
// 2: nana
// 3: ana
// 4: na
// 5: a

// 排序后：
// SA[1] = 5 (a)
// SA[2] = 3 (ana)
// SA[3] = 1 (anana)
// SA[4] = 0 (banana)
// SA[5] = 4 (na)
// SA[6] = 2 (nana)`,
        explanation: '后缀数组的含义。',
      },
    ],
    keyPoints: ['理解SA和Rank', '知道应用场景'],
    commonMistakes: ['SA和Rank关系'],
    tips: ['SA和Rank互逆', '配合height使用'],
    relatedProblems: [160, 161],
  },

  'sa-build': {
    id: 'sa-build',
    title: '后缀数组构建',
    content: `## 后缀数组构建

### 倍增算法 O(n log n)

按长度倍增排序。`,
    codeExamples: [
      {
        title: '倍增法求SA',
        code: `int sa[MAXN], rk[MAXN], tmp[MAXN];

void buildSA(char* s, int n) {
    int m = 256;  // 字符范围
    
    // 初始按单个字符排序
    for (int i = 1; i <= n; i++) rk[i] = s[i];
    for (int i = 1; i <= n; i++) cnt[rk[i]]++;
    for (int i = 1; i <= m; i++) cnt[i] += cnt[i-1];
    for (int i = n; i >= 1; i--) sa[cnt[rk[i]]--] = i;
    
    for (int k = 1; k <= n; k <<= 1) {
        // 第二关键字排序
        int p = 0;
        for (int i = n - k + 1; i <= n; i++) tmp[++p] = i;
        for (int i = 1; i <= n; i++) {
            if (sa[i] > k) tmp[++p] = sa[i] - k;
        }
        
        // 第一关键字排序
        memset(cnt, 0, sizeof(cnt));
        for (int i = 1; i <= n; i++) cnt[rk[i]]++;
        for (int i = 1; i <= m; i++) cnt[i] += cnt[i-1];
        for (int i = n; i >= 1; i--) sa[cnt[rk[tmp[i]]]--] = tmp[i];
        
        // 重新计算rk
        swap(rk, tmp);
        rk[sa[1]] = 1;
        p = 1;
        for (int i = 2; i <= n; i++) {
            rk[sa[i]] = (tmp[sa[i]] == tmp[sa[i-1]] && 
                         tmp[sa[i]+k] == tmp[sa[i-1]+k]) ? p : ++p;
        }
        if (p == n) break;
        m = p;
    }
}`,
        explanation: '倍增法构建后缀数组。',
      },
    ],
    keyPoints: ['基数排序', '倍增思想'],
    commonMistakes: ['排序顺序', 'rk更新'],
    tips: ['SA是经典算法', '需要熟练掌握'],
    relatedProblems: [160, 161],
  },

  'ac-intro': {
    id: 'ac-intro',
    title: 'AC自动机概念',
    content: `## AC自动机

Trie树 + KMP的失配指针，用于多模式串匹配。

### 核心概念

- **fail指针**：失配时跳转的位置
- **匹配**：沿fail链统计所有匹配`,
    codeExamples: [
      {
        title: 'AC自动机概念',
        code: `// 给定多个模式串，在文本串中查找所有出现位置
// 暴力：每个模式串单独KMP
// AC自动机：一次扫描完成`,
        explanation: 'AC自动机的用途。',
      },
    ],
    keyPoints: ['理解fail指针', '知道匹配过程'],
    commonMistakes: ['fail构建错误'],
    tips: ['AC自动机是经典算法', '多模式匹配首选'],
    relatedProblems: [162, 163],
  },

  'ac-build': {
    id: 'ac-build',
    title: 'AC自动机构建',
    content: `## AC自动机构建

### 步骤

1. 建立Trie树
2. BFS构建fail指针`,
    codeExamples: [
      {
        title: 'AC自动机构建',
        code: `int trie[MAXN][26], fail[MAXN], cnt;
bool end[MAXN];

void insert(string& s) {
    int u = 0;
    for (char c : s) {
        int v = c - 'a';
        if (!trie[u][v]) trie[u][v] = ++cnt;
        u = trie[u][v];
    }
    end[u] = true;
}

void buildFail() {
    queue<int> q;
    for (int i = 0; i < 26; i++) {
        if (trie[0][i]) q.push(trie[0][i]);
    }
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = 0; i < 26; i++) {
            int v = trie[u][i];
            if (v) {
                fail[v] = trie[fail[u]][i];
                end[v] |= end[fail[v]];
                q.push(v);
            } else {
                trie[u][i] = trie[fail[u]][i];
            }
        }
    }
}`,
        explanation: 'AC自动机构建。',
      },
    ],
    keyPoints: ['BFS构建fail', '路径压缩优化'],
    commonMistakes: ['fail指向错误', 'end标记传递'],
    tips: ['可以不实际建fail边', '直接用路径压缩'],
    relatedProblems: [162, 163],
  },

  'ac-match': {
    id: 'ac-match',
    title: 'AC自动机匹配',
    content: `## AC自动机匹配

### 匹配过程

沿Trie走，失配时跳fail，检查是否匹配。`,
    codeExamples: [
      {
        title: 'AC自动机匹配',
        code: `int query(string& t) {
    int u = 0, result = 0;
    for (char c : t) {
        int v = c - 'a';
        u = trie[u][v];
        
        // 检查所有匹配
        int temp = u;
        while (temp) {
            result += end[temp];
            end[temp] = 0;  // 清空避免重复计数
            temp = fail[temp];
        }
    }
    return result;
}`,
        explanation: 'AC自动机查询。',
      },
    ],
    keyPoints: ['失配跳转', '沿fail统计'],
    commonMistakes: ['重复计数', '忘记清空'],
    tips: ['可以用end标记优化', '避免重复统计'],
    relatedProblems: [162, 163],
  },

  'bst-intro': {
    id: 'bst-intro',
    title: '二叉搜索树',
    content: `## 二叉搜索树(BST)

左子树所有节点 < 根 < 右子树所有节点。

### 操作

- 插入：O(log n)平均
- 删除：O(log n)平均
- 查询：O(log n)平均

### 问题

极端情况会退化成链，变成O(n)。`,
    codeExamples: [
      {
        title: 'BST基本操作',
        code: `struct Node {
    int val;
    Node *left, *right;
};

Node* insert(Node* root, int val) {
    if (!root) return new Node{val, nullptr, nullptr};
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

Node* search(Node* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) return search(root->left, val);
    return search(root->right, val);
}`,
        explanation: 'BST基本操作。',
      },
    ],
    keyPoints: ['理解BST性质', '知道退化问题'],
    commonMistakes: ['删除操作复杂', '退化情况'],
    tips: ['实际使用平衡树', 'BST是基础'],
    relatedProblems: [164, 165],
  },

  'treap': {
    id: 'treap',
    title: 'Treap',
    content: `## Treap

Tree + Heap，通过随机优先级保持平衡。

### 特性

- 按值满足BST性质
- 按优先级满足堆性质
- 期望深度O(log n)`,
    codeExamples: [
      {
        title: 'Treap模板',
        code: `struct Node {
    int val, pri, cnt, sz;
    Node *left, *right;
};

int getSize(Node* t) { return t ? t->sz : 0; }
void update(Node* t) { if (t) t->sz = t->cnt + getSize(t->left) + getSize(t->right); }

void split(Node* t, int val, Node*& l, Node*& r) {
    if (!t) { l = r = nullptr; return; }
    if (t->val <= val) {
        split(t->right, val, t->right, r);
        l = t;
    } else {
        split(t->left, val, l, t->left);
        r = t;
    }
    update(t);
}

void merge(Node*& t, Node* l, Node* r) {
    if (!l || !r) { t = l ? l : r; return; }
    if (l->pri > r->pri) {
        merge(l->right, l->right, r);
        t = l;
    } else {
        merge(r->left, l, r->left);
        t = r;
    }
    update(t);
}

void insert(Node*& t, int val) {
    Node *l, *r;
    split(t, val, l, r);
    Node* mid = new Node{val, rand(), 1, 1, nullptr, nullptr};
    merge(t, l, mid);
    merge(t, t, r);
}`,
        explanation: 'Treap插入操作。',
      },
    ],
    keyPoints: ['split和merge操作', '随机优先级'],
    commonMistakes: ['split边界', 'update顺序'],
    tips: ['Treap代码简洁', '支持各种操作'],
    relatedProblems: [164, 165],
  },

  'splay': {
    id: 'splay',
    title: 'Splay树',
    content: `## Splay树

通过旋转将访问的节点移到根，实现摊还O(log n)。

### 特点

- 每次操作后splay到根
- 实现简单
- 支持各种区间操作`,
    codeExamples: [
      {
        title: 'Splay模板',
        code: `int ch[MAXN][2], fa[MAXN], cnt[MAXN], sz[MAXN], root, tot;

bool get(int x) { return ch[fa[x]][1] == x; }
void update(int x) { sz[x] = sz[ch[x][0]] + sz[ch[x][1]] + cnt[x]; }

void rotate(int x) {
    int y = fa[x], z = fa[y], k = get(x);
    ch[y][k] = ch[x][k^1];
    if (ch[x][k^1]) fa[ch[x][k^1]] = y;
    ch[x][k^1] = y;
    fa[y] = x; fa[x] = z;
    if (z) ch[z][y == ch[z][1]] = x;
    update(y); update(x);
}

void splay(int x, int goal = 0) {
    while (fa[x] != goal) {
        int y = fa[x], z = fa[y];
        if (z != goal) {
            (get(x) == get(y)) ? rotate(y) : rotate(x);
        }
        rotate(x);
    }
    if (!goal) root = x;
}`,
        explanation: 'Splay旋转操作。',
      },
    ],
    keyPoints: ['rotate和splay', '访问后splay'],
    commonMistakes: ['旋转顺序', '边界处理'],
    tips: ['Splay用途广泛', '可以维护序列'],
    relatedProblems: [166, 167],
  },

  'lct': {
    id: 'lct',
    title: 'Link-Cut Tree',
    content: `## LCT

动态树数据结构，支持动态维护森林。

### 操作

- link：连接两棵树
- cut：断开一条边
- query：查询路径信息`,
    codeExamples: [
      {
        title: 'LCT概念',
        code: `// LCT = Splay + 树链剖分思想
// 用Splay维护实链
// 通过虚边连接不同的实链

// 操作复杂度均为摊还O(log n)`,
        explanation: 'LCT的基本概念。',
      },
    ],
    keyPoints: ['实边和虚边', 'access操作'],
    commonMistakes: ['虚实边判断', 'makeRoot'],
    tips: ['LCT是高级数据结构', '需要熟练Splay'],
    relatedProblems: [168, 169],
  },

  'sam-intro': {
    id: 'sam-intro',
    title: '后缀自动机概念',
    content: `## 后缀自动机(SAM)

能识别字符串所有子串的最小DFA。

### 特点

- 状态数O(n)
- 转移数O(n)
- 可线性构建`,
    codeExamples: [
      {
        title: 'SAM概念',
        code: `// SAM可以：
// 1. 判断子串是否存在
// 2. 计算本质不同子串数
// 3. 计算子串出现次数
// 4. 求最长公共子串`,
        explanation: 'SAM的应用。',
      },
    ],
    keyPoints: ['理解SAM结构', '知道应用'],
    commonMistakes: ['状态含义不清'],
    tips: ['SAM是强大的字符串工具', '需要深入学习'],
    relatedProblems: [170, 171],
  },

  'sam-build': {
    id: 'sam-build',
    title: 'SAM构建',
    content: `## SAM构建

在线构建，每次添加一个字符。`,
    codeExamples: [
      {
        title: 'SAM构建',
        code: `struct SAM {
    int ch[MAXN][26], len[MAXN], link[MAXN];
    int cnt, last;
    
    void init() { cnt = last = 1; }
    
    void extend(int c) {
        int p = last, cur = ++cnt;
        len[cur] = len[p] + 1;
        
        while (p && !ch[p][c]) {
            ch[p][c] = cur;
            p = link[p];
        }
        
        if (!p) {
            link[cur] = 1;
        } else {
            int q = ch[p][c];
            if (len[p] + 1 == len[q]) {
                link[cur] = q;
            } else {
                int clone = ++cnt;
                len[clone] = len[p] + 1;
                memcpy(ch[clone], ch[q], sizeof(ch[q]));
                link[clone] = link[q];
                while (p && ch[p][c] == q) {
                    ch[p][c] = clone;
                    p = link[p];
                }
                link[q] = link[cur] = clone;
            }
        }
        last = cur;
    }
} sam;`,
        explanation: 'SAM在线构建。',
      },
    ],
    keyPoints: ['clone操作', 'link指针'],
    commonMistakes: ['clone条件', 'link更新'],
    tips: ['len[link] + 1是关键', '理解endpos概念'],
    relatedProblems: [170, 171],
  },

  'sam-apps': {
    id: 'sam-apps',
    title: 'SAM应用',
    content: `## SAM应用

### 常见问题

1. 本质不同子串数
2. 子串出现次数
3. 最长公共子串
4. 第k小子串`,
    codeExamples: [
      {
        title: 'SAM应用',
        code: `// 本质不同子串数
long long countDistinct() {
    long long ans = 0;
    for (int i = 2; i <= cnt; i++) {
        ans += len[i] - len[link[i]];
    }
    return ans;
}

// 子串出现次数
void calcOccurrence() {
    // 拓扑排序后累加
    for (int i = cnt; i >= 1; i--) {
        sz[link[order[i]]] += sz[order[i]];
    }
}`,
        explanation: 'SAM常见应用。',
      },
    ],
    keyPoints: ['len - len[link]', '拓扑排序'],
    commonMistakes: ['拓扑顺序', '初始化'],
    tips: ['SAM功能强大', '需要多练习'],
    relatedProblems: [170, 171],
  },

  // ========== 复习和冲刺阶段 ==========
  'review-graph-adv': {
    id: 'review-graph-adv',
    title: '高级图论复习',
    content: `## 高级图论复习

### 主要知识点

- 网络流
- 强连通分量
- 树链剖分
- 虚树`,
    codeExamples: [
      {
        title: '复习要点',
        code: `// 1. Dinic最大流模板
// 2. Tarjan求SCC
// 3. 树链剖分路径查询
// 4. 虚树构建`,
        explanation: '高级图论复习重点。',
      },
    ],
    keyPoints: ['网络流模板', 'SCC缩点', '树链剖分'],
    commonMistakes: ['各种边界情况'],
    tips: ['重点掌握模板', '注意细节'],
    relatedProblems: [128, 134, 136],
  },

  'review-dp-adv': {
    id: 'review-dp-adv',
    title: '高级DP复习',
    content: `## 高级DP复习

### 主要知识点

- 树形DP
- 矩阵优化DP
- CDQ分治优化`,
    codeExamples: [
      {
        title: '复习要点',
        code: `// 1. 树形DP（换根、背包）
// 2. 矩阵快速幂优化递推
// 3. 四边形不等式优化`,
        explanation: '高级DP复习重点。',
      },
    ],
    keyPoints: ['树形DP', '矩阵优化', '决策单调性'],
    commonMistakes: ['状态定义', '优化条件'],
    tips: ['理解优化原理', '多练习'],
    relatedProblems: [146, 152, 144],
  },

  'review-ds-adv': {
    id: 'review-ds-adv',
    title: '高级数据结构复习',
    content: `## 高级数据结构复习

### 主要知识点

- 平衡树
- LCT
- SAM`,
    codeExamples: [
      {
        title: '复习要点',
        code: `// 1. Treap/Splay基本操作
// 2. LCT的link/cut
// 3. SAM构建和应用`,
        explanation: '高级数据结构复习重点。',
      },
    ],
    keyPoints: ['平衡树操作', '动态树', 'SAM'],
    commonMistakes: ['旋转细节', '边界处理'],
    tips: ['需要大量练习', '理解原理'],
    relatedProblems: [164, 168, 170],
  },

  'practice-adv-1': {
    id: 'practice-adv-1',
    title: '高级练习（一）',
    content: `## 高级练习（一）

综合运用网络流、SCC等知识解决问题。`,
    codeExamples: [
      {
        title: '练习重点',
        code: `// 1. 最大流/最小割问题
// 2. 2-SAT问题
// 3. 缩点后DP`,
        explanation: '练习方向。',
      },
    ],
    keyPoints: ['综合运用', '模型转化'],
    commonMistakes: ['建模错误'],
    tips: ['多分析题目', '总结模型'],
    relatedProblems: [172, 173, 174],
  },

  'practice-adv-2': {
    id: 'practice-adv-2',
    title: '高级练习（二）',
    content: `## 高级练习（二）

综合运用高级数据结构和字符串算法。`,
    codeExamples: [
      {
        title: '练习重点',
        code: `// 1. 字符串综合问题
// 2. 数据结构综合
// 3. 复杂图论问题`,
        explanation: '练习方向。',
      },
    ],
    keyPoints: ['算法组合', '综合应用'],
    commonMistakes: ['细节错误'],
    tips: ['注意复杂度', '多调试'],
    relatedProblems: [175, 176, 177],
  },

  'exam-advanced': {
    id: 'exam-advanced',
    title: '高级阶段考核',
    content: `## 高级阶段考核

检验高级阶段学习成果。`,
    codeExamples: [
      {
        title: '考核要求',
        code: `// 1. 能够解决网络流问题
// 2. 掌握高级数据结构
// 3. 综合运用多种算法`,
        explanation: '考核标准。',
      },
    ],
    keyPoints: ['独立解决复杂问题', '综合运用'],
    commonMistakes: ['审题不清', '实现错误'],
    tips: ['冷静分析', '注意细节'],
    relatedProblems: [178, 179, 180, 181],
  },

  'noip-pop-1': {
    id: 'noip-pop-1',
    title: 'NOIP普及组模拟（一）',
    content: `## NOIP普及组模拟

模拟真实考试环境。`,
    codeExamples: [
      {
        title: '模拟要求',
        code: `// 时间：3.5小时
// 题目：4道
// 难度：普及组水平`,
        explanation: '模拟环境。',
      },
    ],
    keyPoints: ['时间分配', '策略选择'],
    commonMistakes: ['时间不够', '心态波动'],
    tips: ['先易后难', '保证部分分'],
    relatedProblems: [182, 183, 184, 185],
  },

  'noip-pop-2': {
    id: 'noip-pop-2',
    title: 'NOIP普及组模拟（二）',
    content: `## NOIP普及组模拟

继续模拟训练。`,
    codeExamples: [
      {
        title: '模拟重点',
        code: `// 1. 熟悉常见题型
// 2. 掌握骗分技巧
// 3. 提高代码速度`,
        explanation: '训练重点。',
      },
    ],
    keyPoints: ['熟练度', '准确率'],
    commonMistakes: ['粗心错误'],
    tips: ['多练多总结'],
    relatedProblems: [186, 187, 188, 189],
  },

  'noip-imp-1': {
    id: 'noip-imp-1',
    title: 'NOIP提高组模拟（一）',
    content: `## NOIP提高组模拟

提高组难度模拟。`,
    codeExamples: [
      {
        title: '模拟要求',
        code: `// 时间：3.5小时
// 题目：4道
// 难度：提高组水平`,
        explanation: '模拟环境。',
      },
    ],
    keyPoints: ['算法选择', '实现能力'],
    commonMistakes: ['超时', '实现复杂'],
    tips: ['选择合适算法', '注意常数'],
    relatedProblems: [190, 191, 192, 193],
  },

  'noip-imp-2': {
    id: 'noip-imp-2',
    title: 'NOIP提高组模拟（二）',
    content: `## NOIP提高组模拟

继续提高组训练。`,
    codeExamples: [
      {
        title: '训练重点',
        code: `// 1. 复杂度分析
// 2. 边界情况
// 3. 代码优化`,
        explanation: '训练重点。',
      },
    ],
    keyPoints: ['分析能力', '优化能力'],
    commonMistakes: ['TLE', 'WA'],
    tips: ['分析瓶颈', '优化常数'],
    relatedProblems: [194, 195, 196, 197],
  },

  'summary-advanced': {
    id: 'summary-advanced',
    title: '高级阶段总结',
    content: `## 高级阶段总结

回顾高级阶段所学内容。`,
    codeExamples: [
      {
        title: '知识点总结',
        code: `// 图论：网络流、SCC、树链剖分
// 数据结构：平衡树、LCT、SAM
// 算法：CDQ分治、FFT、矩阵优化`,
        explanation: '高级知识点总结。',
      },
    ],
    keyPoints: ['知识体系', '薄弱点'],
    commonMistakes: ['遗忘知识点'],
    tips: ['查漏补缺', '巩固基础'],
    relatedProblems: [198, 199, 200],
  },

  'mock-1': { id: 'mock-1', title: '模拟考试（一）', content: `## 模拟考试`, codeExamples: [{ title: '模拟', code: `// 全真模拟`, explanation: '模拟考试。' }], keyPoints: ['时间管理'], commonMistakes: ['紧张'], tips: ['保持冷静'], relatedProblems: [201, 202, 203, 204] },
  'mock-2': { id: 'mock-2', title: '模拟考试（二）', content: `## 模拟考试`, codeExamples: [{ title: '模拟', code: `// 全真模拟`, explanation: '模拟考试。' }], keyPoints: ['时间管理'], commonMistakes: ['紧张'], tips: ['保持冷静'], relatedProblems: [205, 206, 207, 208] },
  'mock-3': { id: 'mock-3', title: '模拟考试（三）', content: `## 模拟考试`, codeExamples: [{ title: '模拟', code: `// 全真模拟`, explanation: '模拟考试。' }], keyPoints: ['时间管理'], commonMistakes: ['紧张'], tips: ['保持冷静'], relatedProblems: [209, 210, 211, 212] },
  'mock-4': { id: 'mock-4', title: '模拟考试（四）', content: `## 模拟考试`, codeExamples: [{ title: '模拟', code: `// 全真模拟`, explanation: '模拟考试。' }], keyPoints: ['时间管理'], commonMistakes: ['紧张'], tips: ['保持冷静'], relatedProblems: [213, 214, 215, 216] },
  'review-mock-1': { id: 'review-mock-1', title: '模拟复盘（一）', content: `## 模拟复盘`, codeExamples: [{ title: '复盘', code: `// 分析错误`, explanation: '复盘。' }], keyPoints: ['总结错误'], commonMistakes: ['不复盘'], tips: ['认真总结'], relatedProblems: [201, 202, 203, 204] },
  'review-mock-2': { id: 'review-mock-2', title: '模拟复盘（二）', content: `## 模拟复盘`, codeExamples: [{ title: '复盘', code: `// 分析错误`, explanation: '复盘。' }], keyPoints: ['总结错误'], commonMistakes: ['不复盘'], tips: ['认真总结'], relatedProblems: [205, 206, 207, 208] },
  'review-mock-3': { id: 'review-mock-3', title: '模拟复盘（三）', content: `## 模拟复盘`, codeExamples: [{ title: '复盘', code: `// 分析错误`, explanation: '复盘。' }], keyPoints: ['总结错误'], commonMistakes: ['不复盘'], tips: ['认真总结'], relatedProblems: [209, 210, 211, 212] },
  'review-mock-4': { id: 'review-mock-4', title: '模拟复盘（四）', content: `## 模拟复盘`, codeExamples: [{ title: '复盘', code: `// 分析错误`, explanation: '复盘。' }], keyPoints: ['总结错误'], commonMistakes: ['不复盘'], tips: ['认真总结'], relatedProblems: [213, 214, 215, 216] },
  'focus-dp': { id: 'focus-dp', title: 'DP专项训练', content: `## DP专项`, codeExamples: [{ title: '训练', code: `// DP专题`, explanation: '专项训练。' }], keyPoints: ['DP思维'], commonMistakes: ['状态定义'], tips: ['多练习'], relatedProblems: [217, 218, 219, 220] },
  'focus-graph': { id: 'focus-graph', title: '图论专项训练', content: `## 图论专项`, codeExamples: [{ title: '训练', code: `// 图论专题`, explanation: '专项训练。' }], keyPoints: ['建模能力'], commonMistakes: ['建图错误'], tips: ['多分析'], relatedProblems: [221, 222, 223, 224] },
  'focus-ds': { id: 'focus-ds', title: '数据结构专项训练', content: `## 数据结构专项`, codeExamples: [{ title: '训练', code: `// 数据结构专题`, explanation: '专项训练。' }], keyPoints: ['选择合适结构'], commonMistakes: ['选错结构'], tips: ['理解各结构特点'], relatedProblems: [225, 226, 227, 228] },
  'focus-string': { id: 'focus-string', title: '字符串专项训练', content: `## 字符串专项`, codeExamples: [{ title: '训练', code: `// 字符串专题`, explanation: '专项训练。' }], keyPoints: ['字符串算法'], commonMistakes: ['边界处理'], tips: ['注意细节'], relatedProblems: [229, 230, 231, 232] },
  'focus-nt': { id: 'focus-nt', title: '数论专项训练', content: `## 数论专项`, codeExamples: [{ title: '训练', code: `// 数论专题`, explanation: '专项训练。' }], keyPoints: ['数论知识'], commonMistakes: ['公式错误'], tips: ['理解原理'], relatedProblems: [233, 234, 235, 236] },
  'fill-gaps-1': { id: 'fill-gaps-1', title: '查漏补缺（一）', content: `## 查漏补缺`, codeExamples: [{ title: '复习', code: `// 补薄弱点`, explanation: '查漏补缺。' }], keyPoints: ['薄弱点'], commonMistakes: ['忽视薄弱点'], tips: ['重点突破'], relatedProblems: [237, 238, 239, 240] },
  'fill-gaps-2': { id: 'fill-gaps-2', title: '查漏补缺（二）', content: `## 查漏补缺`, codeExamples: [{ title: '复习', code: `// 补薄弱点`, explanation: '查漏补缺。' }], keyPoints: ['薄弱点'], commonMistakes: ['忽视薄弱点'], tips: ['重点突破'], relatedProblems: [241, 242, 243, 244] },
  'mental': { id: 'mental', title: '考前心理', content: `## 考前心理调整`, codeExamples: [{ title: '心态', code: `// 保持平常心`, explanation: '心理调整。' }], keyPoints: ['心态平稳'], commonMistakes: ['过度紧张'], tips: ['放松心情'], relatedProblems: [] },
  'tips': { id: 'tips', title: '考试技巧', content: `## 考试技巧`, codeExamples: [{ title: '技巧', code: `// 时间分配、策略选择`, explanation: '考试技巧。' }], keyPoints: ['策略'], commonMistakes: ['策略错误'], tips: ['先易后难'], relatedProblems: [] },
  'sprint-1': { id: 'sprint-1', title: '冲刺训练（一）', content: `## 冲刺训练`, codeExamples: [{ title: '冲刺', code: `// 高强度训练`, explanation: '冲刺训练。' }], keyPoints: ['熟练度'], commonMistakes: ['疲劳'], tips: ['保持状态'], relatedProblems: [245, 246, 247, 248] },
  'sprint-2': { id: 'sprint-2', title: '冲刺训练（二）', content: `## 冲刺训练`, codeExamples: [{ title: '冲刺', code: `// 高强度训练`, explanation: '冲刺训练。' }], keyPoints: ['熟练度'], commonMistakes: ['疲劳'], tips: ['保持状态'], relatedProblems: [249, 250, 251, 252] },
  'final-summary': { id: 'final-summary', title: '最终总结', content: `## 最终总结`, codeExamples: [{ title: '总结', code: `// 全面复习`, explanation: '最终总结。' }], keyPoints: ['知识体系'], commonMistakes: ['遗漏'], tips: ['全面覆盖'], relatedProblems: [] },
};

// 获取知识点讲解
export function getKnowledgeLesson(nodeId: string): KnowledgeLesson | null {
  return knowledgeLessons[nodeId] || null;
}

// 获取所有知识点讲解ID
export function getAllLessonIds(): string[] {
  return Object.keys(knowledgeLessons);
}

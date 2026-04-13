'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy,
  Clock,
  Target,
  Lightbulb,
  RotateCcw,
  Home,
  BookOpen,
} from 'lucide-react';

// 测验题目类型
interface QuizQuestion {
  id: number;
  question: string;
  code?: string; // 可选的代码片段
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string; // 知识点分类
  relatedDay: string; // 关联的学习天数
}

// 基础入门综合测验题目（30道，覆盖Day 1-13）
const foundationQuizQuestions: QuizQuestion[] = [
  // ========== Day 1-2: C++入门与变量 ==========
  {
    id: 1,
    question: '下面哪个是正确的C++程序入口函数？',
    options: ['void main()', 'int main()', 'function main()', 'start()'],
    correctAnswer: 1,
    explanation: 'C++程序的入口函数必须是 int main()，表示返回一个整数值给操作系统。void main() 在某些编译器中可以编译，但不是标准写法。',
    difficulty: 'easy',
    category: 'C++程序结构',
    relatedDay: 'Day 1',
  },
  {
    id: 2,
    question: '下面哪个变量名是合法的？',
    options: ['2name', 'my-name', '_count', 'int'],
    correctAnswer: 2,
    explanation: '变量名规则：1) 必须以字母或下划线开头；2) 只能包含字母、数字、下划线；3) 不能是关键字。_count 以下划线开头是合法的，2name 以数字开头不合法，my-name 包含减号不合法，int 是关键字。',
    difficulty: 'easy',
    category: '变量命名',
    relatedDay: 'Day 1',
  },
  {
    id: 3,
    question: '以下哪种数据类型能存储的最大整数范围最大？',
    options: ['int', 'short', 'long long', 'char'],
    correctAnswer: 2,
    explanation: 'long long 类型占用8字节，范围约为 -9.2×10¹⁸ 到 9.2×10¹⁸，是选项中范围最大的。int 通常4字节，short 2字节，char 1字节。',
    difficulty: 'easy',
    category: '数据类型',
    relatedDay: 'Day 2',
  },
  {
    id: 4,
    question: '下面代码输出什么？\n\nint a = 5;\nint b = 2;\ncout << a / b;',
    options: ['2.5', '2', '3', '2.50'],
    correctAnswer: 1,
    explanation: '两个整数相除，结果仍是整数，小数部分被丢弃（不是四舍五入）。5 / 2 = 2，不是 2.5。如果要得到 2.5，需要至少一个数是浮点类型。',
    difficulty: 'medium',
    category: '整数除法',
    relatedDay: 'Day 2',
  },

  // ========== Day 3-4: 运算符与表达式 ==========
  {
    id: 5,
    question: '表达式 17 % 5 的结果是？',
    options: ['3', '2', '3.4', '0'],
    correctAnswer: 0,
    explanation: '% 是取模（求余数）运算符。17 ÷ 5 = 3 余 2，所以 17 % 5 = 2。注意：取模运算只能用于整数！',
    difficulty: 'easy',
    category: '取模运算',
    relatedDay: 'Day 3',
  },
  {
    id: 6,
    question: '下面代码执行后，a 的值是多少？\n\nint a = 5;\na += 3;\na *= 2;',
    options: ['10', '16', '11', '8'],
    correctAnswer: 1,
    explanation: '复合赋值运算符：a += 3 等价于 a = a + 3，所以 a 变成 8；然后 a *= 2 等价于 a = a * 2，所以 a 变成 16。',
    difficulty: 'easy',
    category: '复合赋值运算符',
    relatedDay: 'Day 3',
  },
  {
    id: 7,
    question: '下面代码输出什么？\n\nint x = 5;\ncout << x++ << " " << x;',
    options: ['5 5', '6 6', '5 6', '6 5'],
    correctAnswer: 2,
    explanation: 'x++ 是后置自增：先使用 x 的当前值（5），然后再加1。所以第一个输出是 5，之后 x 变成 6，第二个输出是 6。',
    difficulty: 'medium',
    category: '自增自减运算符',
    relatedDay: 'Day 3',
  },
  {
    id: 8,
    question: '表达式 3 + 4 * 2 - 6 / 3 的结果是？',
    options: ['11', '9', '12', '10'],
    correctAnswer: 0,
    explanation: '按运算符优先级计算：先乘除，后加减。4 * 2 = 8，6 / 3 = 2。然后 3 + 8 - 2 = 11。',
    difficulty: 'easy',
    category: '运算符优先级',
    relatedDay: 'Day 3',
  },

  // ========== Day 5-6: 选择结构 ==========
  {
    id: 9,
    question: '下面代码的输出是什么？\n\nint a = 5;\nif (a = 3) {\n  cout << "Yes";\n} else {\n  cout << "No";\n}',
    options: ['Yes', 'No', '编译错误', '无输出'],
    correctAnswer: 0,
    explanation: '这是一个常见的陷阱！a = 3 是赋值表达式，把 3 赋给 a，表达式的值是 3（非零，即 true）。正确写法应该是 a == 3。这是一个非常容易犯的错误！',
    difficulty: 'hard',
    category: '条件判断',
    relatedDay: 'Day 5',
  },
  {
    id: 10,
    question: '下面哪个表达式等价于 !(a > 5 && b < 10)？',
    options: ['a <= 5 || b >= 10', 'a <= 5 && b >= 10', 'a < 5 || b > 10', '!(a > 5) || !(b < 10)'],
    correctAnswer: 0,
    explanation: '根据德摩根定律：!(A && B) = !A || !B。所以 !(a > 5 && b < 10) = (a <= 5) || (b >= 10)。注意取反后 > 变成 <=，< 变成 >=。',
    difficulty: 'hard',
    category: '逻辑运算符',
    relatedDay: 'Day 5',
  },
  {
    id: 11,
    question: 'switch 语句中，如果忘记写 break 会发生什么？',
    options: ['编译错误', '运行时错误', '继续执行下一个 case', '直接退出 switch'],
    correctAnswer: 2,
    explanation: 'switch 语句中如果不写 break，程序会"贯穿"（fall through），继续执行后面所有 case 的语句，直到遇到 break 或 switch 结束。这通常是程序错误。',
    difficulty: 'medium',
    category: 'switch语句',
    relatedDay: 'Day 6',
  },
  {
    id: 12,
    question: '表达式 a > b ? a : b 的含义是？',
    options: ['如果 a > b，返回 a，否则返回 b', '如果 a > b，返回 b，否则返回 a', '比较 a 和 b 是否相等', 'a 和 b 中的较小值'],
    correctAnswer: 0,
    explanation: '三元运算符 格式：条件 ? 值1 : 值2。如果条件为 true，返回值1；否则返回值2。所以 a > b ? a : b 返回 a 和 b 中较大的那个。',
    difficulty: 'medium',
    category: '三元运算符',
    relatedDay: 'Day 6',
  },

  // ========== Day 7-9: 循环结构 ==========
  {
    id: 13,
    question: '下面循环执行多少次？\n\nfor (int i = 0; i < 5; i++) {\n  cout << i;\n}',
    options: ['4次', '5次', '6次', '无限次'],
    correctAnswer: 1,
    explanation: 'i 从 0 开始，每次循环后 i++，条件是 i < 5。所以 i 取值 0, 1, 2, 3, 4，共循环 5 次。当 i = 5 时不满足 i < 5，退出循环。',
    difficulty: 'easy',
    category: 'for循环',
    relatedDay: 'Day 7',
  },
  {
    id: 14,
    question: '下面代码输出什么？\n\nfor (int i = 1; i <= 10; i++) {\n  if (i % 3 == 0) continue;\n  cout << i << " ";',
    options: ['1 2 3 4 5 6 7 8 9 10', '1 2 4 5 7 8 10', '3 6 9', '1 2 4 5 7 8',
      ''],
    correctAnswer: 1,
    explanation: 'continue 语句跳过本次循环的剩余部分，直接进入下一次循环。当 i 是 3 的倍数（3, 6, 9）时，执行 continue，跳过输出。所以输出 1 2 4 5 7 8 10。',
    difficulty: 'medium',
    category: 'continue语句',
    relatedDay: 'Day 7',
  },
  {
    id: 15,
    question: '下面代码的输出结果是什么？\n\nint i = 0;\nwhile (i < 3) {\n  cout << i;\n  i++;\n}',
    options: ['012', '123', '0123', '无输出'],
    correctAnswer: 0,
    explanation: 'while 循环先判断条件再执行。i 初始为 0，满足 i < 3，输出 0；i 变为 1，输出 1；i 变为 2，输出 2；i 变为 3，不满足条件，退出循环。',
    difficulty: 'easy',
    category: 'while循环',
    relatedDay: 'Day 8',
  },
  {
    id: 16,
    question: 'do-while 循环和 while 循环的主要区别是？',
    options: ['do-while 至少执行一次', 'while 至少执行一次', 'do-while 不需要条件', '没有区别'],
    correctAnswer: 0,
    explanation: 'do-while 是"先执行，后判断"，所以循环体至少执行一次。while 是"先判断，后执行"，如果条件一开始就不满足，循环体一次都不执行。',
    difficulty: 'easy',
    category: 'do-while循环',
    relatedDay: 'Day 8',
  },
  {
    id: 17,
    question: '下面嵌套循环总共执行多少次内层循环体？\n\nfor (int i = 0; i < 3; i++) {\n  for (int j = 0; j < 4; j++) {\n    cout << "*";\n  }\n}',
    options: ['7次', '12次', '3次', '4次'],
    correctAnswer: 1,
    explanation: '外层循环执行 3 次（i = 0, 1, 2），每次外层循环中，内层循环执行 4 次（j = 0, 1, 2, 3）。总共执行 3 × 4 = 12 次。',
    difficulty: 'medium',
    category: '嵌套循环',
    relatedDay: 'Day 9',
  },
  {
    id: 18,
    question: '如何判断一个正整数 n 是否为偶数？',
    options: ['n / 2 == 0', 'n % 2 == 0', 'n * 2 == 0', 'n - 2 == 0'],
    correctAnswer: 1,
    explanation: '偶数除以 2 余数为 0，所以用 n % 2 == 0 来判断。n / 2 == 0 只在 n = 0 或 n = 1 时成立，不能判断偶数。',
    difficulty: 'easy',
    category: '取模应用',
    relatedDay: 'Day 7',
  },

  // ========== Day 10: 一维数组 ==========
  {
    id: 19,
    question: '下面数组有多少个元素？\n\nint arr[5] = {1, 2, 3};',
    options: ['3个', '5个', '编译错误', '不确定'],
    correctAnswer: 1,
    explanation: '数组声明时指定了大小为 5，所以数组有 5 个元素。初始化只给了 3 个值，剩余 2 个元素自动初始化为 0。所以 arr = {1, 2, 3, 0, 0}。',
    difficulty: 'medium',
    category: '数组初始化',
    relatedDay: 'Day 10',
  },
  {
    id: 20,
    question: '下面代码输出什么？\n\nint arr[5] = {10, 20, 30, 40, 50};\ncout << arr[3];',
    options: ['30', '40', '50', '编译错误'],
    correctAnswer: 1,
    explanation: '数组下标从 0 开始！arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40, arr[4]=50。所以 arr[3] = 40。',
    difficulty: 'easy',
    category: '数组下标',
    relatedDay: 'Day 10',
  },
  {
    id: 21,
    question: '下面代码有什么问题？\n\nint arr[5];\ncout << arr[5];',
    options: ['没有问题', '数组越界', '编译错误', '运行时错误'],
    correctAnswer: 1,
    explanation: '数组 arr 有 5 个元素，有效下标是 0 到 4。arr[5] 访问了不存在的第 6 个元素，这是数组越界错误，可能导致程序崩溃或输出垃圾值。',
    difficulty: 'medium',
    category: '数组越界',
    relatedDay: 'Day 10',
  },
  {
    id: 22,
    question: '如何遍历数组 int arr[10] 的所有元素？',
    options: ['for (int i = 0; i < 10; i++)', 'for (int i = 1; i <= 10; i++)', 'for (int i = 0; i <= 10; i++)', 'for (int i = 1; i < 10; i++)'],
    correctAnswer: 0,
    explanation: '数组下标从 0 开始，最后一个元素下标是 9。正确的遍历是 i 从 0 到 9，即 i < 10。选项B会跳过 arr[0]，选项C会越界访问 arr[10]。',
    difficulty: 'easy',
    category: '数组遍历',
    relatedDay: 'Day 10',
  },

  // ========== Day 11: 二维数组 ==========
  {
    id: 23,
    question: '声明一个 3 行 4 列的二维数组，正确的是？',
    options: ['int arr[3][4];', 'int arr[4][3];', 'int arr(3,4);', 'int[3][4] arr;'],
    correctAnswer: 0,
    explanation: 'C++ 中二维数组声明格式：类型 数组名[行数][列数]。所以 3 行 4 列写作 arr[3][4]，第一个数字是行数，第二个是列数。',
    difficulty: 'easy',
    category: '二维数组声明',
    relatedDay: 'Day 11',
  },
  {
    id: 24,
    question: '下面代码输出什么？\n\nint matrix[2][3] = {{1,2,3}, {4,5,6}};\ncout << matrix[1][0];',
    options: ['1', '2', '4', '5'],
    correctAnswer: 2,
    explanation: 'matrix[0] 是第 0 行 {1,2,3}，matrix[1] 是第 1 行 {4,5,6}。matrix[1][0] 是第 1 行第 0 列，即 4。',
    difficulty: 'medium',
    category: '二维数组访问',
    relatedDay: 'Day 11',
  },
  {
    id: 25,
    question: '遍历 n×n 矩阵的主对角线元素，应该访问哪些下标？',
    options: ['[i][i]', '[i][n-1-i]', '[i][0]', '[0][i]'],
    correctAnswer: 0,
    explanation: '主对角线是从左上到右下，特点是行号和列号相同。即 [0][0], [1][1], [2][2], ..., [n-1][n-1]，通式是 [i][i]。',
    difficulty: 'medium',
    category: '对角线访问',
    relatedDay: 'Day 11',
  },

  // ========== Day 12: 结构体 ==========
  {
    id: 26,
    question: '定义一个学生结构体，正确的是？',
    code: '',
    options: [
      'struct Student { string name; int age; };',
      'struct Student { string name, int age };',
      'Student struct { string name; int age; }',
      'struct Student(string name, int age);'
    ],
    correctAnswer: 0,
    explanation: '结构体定义格式：struct 结构体名 { 成员列表 }; 注意：1) 成员用分号分隔；2) 结构体定义末尾有分号。选项B成员之间应该用分号，选项C、D语法错误。',
    difficulty: 'easy',
    category: '结构体定义',
    relatedDay: 'Day 12',
  },
  {
    id: 27,
    question: '访问结构体变量 stu 的 name 成员，正确的是？',
    options: ['stu.name', 'stu->name', 'stu[name]', 'stu::name'],
    correctAnswer: 0,
    explanation: '结构体变量访问成员使用点运算符(.)。箭头运算符(->)用于结构体指针。stu.name 是正确写法。',
    difficulty: 'easy',
    category: '结构体成员访问',
    relatedDay: 'Day 12',
  },
  {
    id: 28,
    question: '下面代码输出什么？\n\nstruct Point { int x, y; };\nPoint p = {3, 4};\ncout << p.x + p.y;',
    options: ['7', '34', '编译错误', '运行错误'],
    correctAnswer: 0,
    explanation: '结构体可以用花括号初始化，按顺序赋值给成员。p.x = 3, p.y = 4，所以 p.x + p.y = 7。',
    difficulty: 'medium',
    category: '结构体初始化',
    relatedDay: 'Day 12',
  },

  // ========== Day 13: 字符串 ==========
  {
    id: 29,
    question: '下面代码的输出是什么？\n\nstring s = "Hello";\ncout << s.length();',
    options: ['5', '6', 'Hello', '编译错误'],
    correctAnswer: 0,
    explanation: 's.length() 返回字符串的长度（字符个数）。"Hello" 有 5 个字符，所以输出 5。注意：不包含末尾的空字符 \\0。',
    difficulty: 'easy',
    category: '字符串长度',
    relatedDay: 'Day 13',
  },
  {
    id: 30,
    question: '使用 cin >> s 读取字符串 "Hello World"，s 的值是？',
    options: ['Hello World', 'Hello', 'World', '编译错误'],
    correctAnswer: 1,
    explanation: 'cin >> 以空格、Tab、换行符作为分隔符，遇到空格就停止读取。所以输入 "Hello World" 时，cin >> s 只读取 "Hello"。要读取整行应该用 getline(cin, s)。',
    difficulty: 'medium',
    category: '字符串输入',
    relatedDay: 'Day 13',
  },
  {
    id: 31,
    question: '下面代码的输出是什么？\n\nstring s = "abcdef";\ncout << s.substr(2, 3);',
    options: ['cde', 'bcd', 'abc', 'def'],
    correctAnswer: 0,
    explanation: "s.substr(pos, len) 从位置 pos 开始，取长度为 len 的子串。s.substr(2, 3) 从下标 2 开始（即 'c'），取 3 个字符，结果是 \"cde\"。",
    difficulty: 'medium',
    category: '字符串截取',
    relatedDay: 'Day 13',
  },
  {
    id: 32,
    question: '下面代码的输出是什么？\n\nstring s = "Hello";\ns += " World";\ncout << s;',
    options: ['Hello', 'World', 'Hello World', '编译错误'],
    correctAnswer: 2,
    explanation: '+= 运算符用于字符串拼接。s += " World" 把 " World" 追加到 s 末尾，所以 s 变成 "Hello World"。',
    difficulty: 'easy',
    category: '字符串拼接',
    relatedDay: 'Day 13',
  },

  // ========== 综合题 ==========
  {
    id: 33,
    question: '下面代码的功能是？\n\nint n, sum = 0;\ncin >> n;\nfor (int i = 1; i <= n; i++) {\n  sum += i;\n}\ncout << sum;',
    options: ['计算 n 的阶乘', '计算 1 到 n 的和', '计算 n 的平方', '计算 n 个数的平均值'],
    correctAnswer: 1,
    explanation: '这是一个累加程序，sum 从 0 开始，每次循环把 i 加到 sum 中。i 从 1 到 n，所以最终 sum = 1 + 2 + 3 + ... + n，即 1 到 n 的和。',
    difficulty: 'easy',
    category: '循环应用',
    relatedDay: 'Day 7',
  },
  {
    id: 34,
    question: '下面代码实现什么功能？\n\nint arr[5] = {3, 1, 4, 1, 5};\nint maxVal = arr[0];\nfor (int i = 1; i < 5; i++) {\n  if (arr[i] > maxVal) maxVal = arr[i];\n}\ncout << maxVal;',
    options: ['找最小值', '找最大值', '求平均值', '求和'],
    correctAnswer: 1,
    explanation: '这是一个找最大值的算法。假设第一个元素最大，然后依次比较，如果发现更大的就更新 maxVal。最终 maxVal = 5。',
    difficulty: 'easy',
    category: '数组操作',
    relatedDay: 'Day 10',
  },
  {
    id: 35,
    question: '下面代码的输出是什么？\n\nint count = 0;\nfor (int i = 1; i <= 100; i++) {\n  if (i % 7 == 0) count++;\n}\ncout << count;',
    options: ['14', '15', '16', '100'],
    correctAnswer: 0,
    explanation: '这题统计 1 到 100 中 7 的倍数有多少个。7 × 1 = 7, 7 × 2 = 14, ..., 7 × 14 = 98。所以有 14 个 7 的倍数。',
    difficulty: 'medium',
    category: '循环与条件',
    relatedDay: 'Day 7',
  },
];

// 难度配置
const difficultyConfig = {
  easy: { label: '简单', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  medium: { label: '中等', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  hard: { label: '困难', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
};

// 知识点分类颜色
const categoryColors: Record<string, string> = {
  'C++程序结构': 'bg-blue-100 text-blue-700',
  '变量命名': 'bg-indigo-100 text-indigo-700',
  '数据类型': 'bg-purple-100 text-purple-700',
  '整数除法': 'bg-cyan-100 text-cyan-700',
  '取模运算': 'bg-teal-100 text-teal-700',
  '复合赋值运算符': 'bg-emerald-100 text-emerald-700',
  '自增自减运算符': 'bg-green-100 text-green-700',
  '运算符优先级': 'bg-lime-100 text-lime-700',
  '条件判断': 'bg-amber-100 text-amber-700',
  '逻辑运算符': 'bg-orange-100 text-orange-700',
  'switch语句': 'bg-red-100 text-red-700',
  '三元运算符': 'bg-pink-100 text-pink-700',
  'for循环': 'bg-rose-100 text-rose-700',
  'continue语句': 'bg-sky-100 text-sky-700',
  'while循环': 'bg-slate-100 text-slate-700',
  'do-while循环': 'bg-zinc-100 text-zinc-700',
  '嵌套循环': 'bg-stone-100 text-stone-700',
  '取模应用': 'bg-neutral-100 text-neutral-700',
  '数组初始化': 'bg-violet-100 text-violet-700',
  '数组下标': 'bg-fuchsia-100 text-fuchsia-700',
  '数组越界': 'bg-pink-100 text-pink-700',
  '数组遍历': 'bg-rose-100 text-rose-700',
  '二维数组声明': 'bg-indigo-100 text-indigo-700',
  '二维数组访问': 'bg-blue-100 text-blue-700',
  '对角线访问': 'bg-cyan-100 text-cyan-700',
  '结构体定义': 'bg-amber-100 text-amber-700',
  '结构体成员访问': 'bg-orange-100 text-orange-700',
  '结构体初始化': 'bg-yellow-100 text-yellow-700',
  '字符串长度': 'bg-emerald-100 text-emerald-700',
  '字符串输入': 'bg-green-100 text-green-700',
  '字符串截取': 'bg-teal-100 text-teal-700',
  '字符串拼接': 'bg-cyan-100 text-cyan-700',
  '循环应用': 'bg-blue-100 text-blue-700',
  '数组操作': 'bg-purple-100 text-purple-700',
  '循环与条件': 'bg-indigo-100 text-indigo-700',
};

export default function FoundationQuizPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <FoundationQuizContent />
    </Suspense>
  );
}

function FoundationQuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(foundationQuizQuestions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  // 计时器
  useEffect(() => {
    if (!quizFinished) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, quizFinished]);

  const currentQuestion = foundationQuizQuestions[currentStep];
  const answeredCount = answers.filter(a => a !== null).length;
  const progress = (answeredCount / foundationQuizQuestions.length) * 100;

  // 选择答案
  const selectAnswer = (optionIndex: number) => {
    if (showExplanation) return; // 已经显示解析就不能再选
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  // 下一题
  const nextQuestion = () => {
    if (currentStep < foundationQuizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowExplanation(false);
    }
  };

  // 上一题
  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowExplanation(answers[currentStep - 1] !== null);
    }
  };

  // 跳转到指定题目
  const jumpToQuestion = (index: number) => {
    setCurrentStep(index);
    setShowExplanation(answers[index] !== null);
  };

  // 提交测验
  const submitQuiz = () => {
    setQuizFinished(true);
    setShowAllResults(true);
  };

  // 重新开始
  const restartQuiz = () => {
    setAnswers(new Array(foundationQuizQuestions.length).fill(null));
    setCurrentStep(0);
    setShowExplanation(false);
    setQuizFinished(false);
    setShowAllResults(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  // 返回
  const goBack = () => {
    if (from === 'learning') {
      router.push('/?view=learning');
    } else {
      router.push('/knowledge/foundation-review');
    }
  };

  // 计算成绩
  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === foundationQuizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: foundationQuizQuestions.length,
      percentage: Math.round((correct / foundationQuizQuestions.length) * 100),
    };
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  // 结果页面
  if (quizFinished && showAllResults) {
    const score = calculateScore();
    const getGrade = () => {
      if (score.percentage >= 90) return { emoji: '🏆', text: '优秀！基础扎实！', color: 'text-yellow-600' };
      if (score.percentage >= 80) return { emoji: '🎉', text: '良好！继续加油！', color: 'text-green-600' };
      if (score.percentage >= 60) return { emoji: '💪', text: '及格！还需努力！', color: 'text-blue-600' };
      return { emoji: '📚', text: '需要加强基础！', color: 'text-red-600' };
    };
    const grade = getGrade();

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 成绩卡片 */}
          <Card className="border-2 border-primary/20 shadow-lg mb-6">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">{grade.emoji}</div>
              <h1 className="text-3xl font-bold mb-2">基础入门综合测验</h1>
              <p className={`text-xl font-medium ${grade.color} mb-6`}>{grade.text}</p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-600">{score.correct}</div>
                  <div className="text-sm text-muted-foreground">答对题数</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600">{score.percentage}%</div>
                  <div className="text-sm text-muted-foreground">正确率</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-purple-600">{formatTime(elapsedTime)}</div>
                  <div className="text-sm text-muted-foreground">用时</div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={restartQuiz} variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  重新测验
                </Button>
                <Button onClick={goBack} className="gap-2">
                  <Home className="h-4 w-4" />
                  返回学习
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 答题详情 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                答题详情
              </CardTitle>
              <CardDescription>查看每道题的正确答案和解析</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 题目导航 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {foundationQuizQuestions.map((_, index) => {
                  const isCorrect = answers[index] === foundationQuizQuestions[index].correctAnswer;
                  const isAnswered = answers[index] !== null;
                  return (
                    <button
                      key={index}
                      onClick={() => jumpToQuestion(index)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        index === currentStep
                          ? 'ring-2 ring-primary ring-offset-2'
                          : ''
                      } ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-gray-100 text-gray-500 border border-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <Separator className="my-4" />

              {/* 当前题目详情 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentQuestion.relatedDay}</Badge>
                  <Badge className={categoryColors[currentQuestion.category] || 'bg-gray-100'}>
                    {currentQuestion.category}
                  </Badge>
                  <Badge className={`${difficultyConfig[currentQuestion.difficulty].bgColor} ${difficultyConfig[currentQuestion.difficulty].color}`}>
                    {difficultyConfig[currentQuestion.difficulty].label}
                  </Badge>
                </div>

                <div className="font-medium text-lg">
                  {currentStep + 1}. {currentQuestion.question}
                </div>

                {currentQuestion.code && (
                  <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{currentQuestion.code}</code>
                  </pre>
                )}

                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const isSelected = answers[currentStep] === index;
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${
                          isCorrect
                            ? 'bg-green-50 border-green-500'
                            : isSelected
                            ? 'bg-red-50 border-red-500'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`font-medium ${
                            isCorrect ? 'text-green-600' : isSelected ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <div className="flex-1">
                            <span className={isCorrect ? 'text-green-700' : isSelected ? 'text-red-700' : ''}>
                              {option}
                            </span>
                            {isCorrect && (
                              <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                                <CheckCircle2 className="h-4 w-4" />
                                正确答案
                              </div>
                            )}
                            {isSelected && !isCorrect && (
                              <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                                <XCircle className="h-4 w-4" />
                                你的答案
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 解析 */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-blue-700 mb-1">解析</div>
                      <p className="text-blue-800">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>

                {/* 导航按钮 */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    上一题
                  </Button>
                  <Button
                    variant="outline"
                    onClick={nextQuestion}
                    disabled={currentStep === foundationQuizQuestions.length - 1}
                  >
                    下一题
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 答题页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 顶部状态栏 */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={goBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            返回
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
            <Badge variant="secondary">
              已答 {answeredCount}/{foundationQuizQuestions.length}
            </Badge>
          </div>
        </div>

        {/* 进度条 */}
        <Progress value={progress} className="h-2 mb-6" />

        {/* 题目导航 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {foundationQuizQuestions.map((_, index) => {
            const isAnswered = answers[index] !== null;
            const isCurrent = index === currentStep;
            return (
              <button
                key={index}
                onClick={() => jumpToQuestion(index)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isAnswered
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-white text-gray-500 border border-gray-300 hover:border-primary'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* 题目卡片 */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{currentQuestion.relatedDay}</Badge>
                <Badge className={categoryColors[currentQuestion.category] || 'bg-gray-100'}>
                  {currentQuestion.category}
                </Badge>
              </div>
              <Badge className={`${difficultyConfig[currentQuestion.difficulty].bgColor} ${difficultyConfig[currentQuestion.difficulty].color}`}>
                {difficultyConfig[currentQuestion.difficulty].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* 题目 */}
            <div className="font-medium text-lg mb-4">
              {currentStep + 1}. {currentQuestion.question}
            </div>

            {/* 代码片段 */}
            {currentQuestion.code && (
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm overflow-x-auto mb-4">
                <code>{currentQuestion.code}</code>
              </pre>
            )}

            {/* 选项 */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentStep] === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = showExplanation;

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      showResult
                        ? isCorrect
                          ? 'bg-green-50 border-green-500'
                          : isSelected
                          ? 'bg-red-50 border-red-500'
                          : 'bg-gray-50 border-gray-200'
                        : isSelected
                        ? 'bg-primary/10 border-primary'
                        : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium shrink-0 ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : isSelected
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                          : isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className={`pt-1 ${
                        showResult
                          ? isCorrect
                            ? 'text-green-700'
                            : isSelected
                            ? 'text-red-700'
                            : ''
                          : ''
                      }`}>
                        {option}
                      </span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-red-500 ml-auto shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 解析 */}
            {showExplanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-blue-700 mb-1">解析</div>
                    <p className="text-blue-800">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 导航按钮 */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                上一题
              </Button>
              {currentStep === foundationQuizQuestions.length - 1 ? (
                <Button
                  onClick={submitQuiz}
                  disabled={answeredCount < foundationQuizQuestions.length}
                  className="gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  提交测验
                </Button>
              ) : (
                <Button onClick={nextQuestion} disabled={!showExplanation}>
                  下一题
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 提交提示 */}
        {answeredCount === foundationQuizQuestions.length && currentStep !== foundationQuizQuestions.length - 1 && (
          <div className="mt-4 text-center">
            <Button onClick={submitQuiz} className="gap-2">
              <Trophy className="h-4 w-4" />
              提交测验
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

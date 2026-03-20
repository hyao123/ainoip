/**
 * 70天NOIP学习计划
 * 从基础到进阶，每天安排具体的学习任务和练习题目
 */

// 每日学习任务类型
export interface DailyTask {
  day: number;
  phase: string; // 学习阶段
  title: string;
  topics: string[]; // 学习主题
  problems: number[]; // 推荐题目ID
  objectives: string[]; // 学习目标
  tips: string[]; // 学习提示
  estimatedHours: number; // 预计学习时长
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// 学习阶段
export interface LearningPhase {
  id: string;
  name: string;
  description: string;
  startDay: number;
  endDay: number;
  goals: string[];
}

// 学习阶段定义
export const learningPhases: LearningPhase[] = [
  {
    id: 'phase-1',
    name: '基础语法入门',
    description: '掌握C++基本语法，熟悉编程环境',
    startDay: 1,
    endDay: 14,
    goals: ['掌握输入输出', '理解变量和数据类型', '掌握条件判断和循环', '能独立完成简单程序'],
  },
  {
    id: 'phase-2',
    name: '数组与字符串',
    description: '深入理解数组和字符串操作',
    startDay: 15,
    endDay: 24,
    goals: ['熟练使用一维和二维数组', '掌握字符串基本操作', '能处理简单的数据统计问题'],
  },
  {
    id: 'phase-3',
    name: '基础算法',
    description: '学习排序、查找和基础数学',
    startDay: 25,
    endDay: 36,
    goals: ['掌握常见排序算法', '理解二分查找', '掌握基础数论知识'],
  },
  {
    id: 'phase-4',
    name: '搜索算法',
    description: '学习DFS和BFS搜索',
    startDay: 37,
    endDay: 46,
    goals: ['理解递归思想', '掌握DFS搜索', '掌握BFS搜索', '能解决基础搜索问题'],
  },
  {
    id: 'phase-5',
    name: '动态规划入门',
    description: '理解动态规划基本概念',
    startDay: 47,
    endDay: 56,
    goals: ['理解DP基本概念', '掌握线性DP', '掌握背包问题', '掌握区间DP'],
  },
  {
    id: 'phase-6',
    name: '数据结构',
    description: '学习基础数据结构',
    startDay: 57,
    endDay: 66,
    goals: ['掌握栈和队列', '理解树的基本概念', '掌握图的存储和遍历'],
  },
  {
    id: 'phase-7',
    name: '综合训练',
    description: '真题模拟和综合练习',
    startDay: 67,
    endDay: 70,
    goals: ['完成真题训练', '查漏补缺', '提高解题速度'],
  },
];

// 70天每日学习计划
export const dailySchedule: DailyTask[] = [
  // ========== 第一阶段：基础语法入门 (Day 1-14) ==========
  {
    day: 1,
    phase: '基础语法入门',
    title: '认识编程与开发环境',
    topics: ['编程简介', '开发环境配置', '第一个程序'],
    problems: [19, 1, 21, 22, 20], // Hello World, A+B, 数据范围, 四则运算, 输出图形
    objectives: ['了解什么是编程', '学会使用开发环境', '成功运行第一个程序'],
    tips: ['不要急于求成，先熟悉环境', '多动手敲代码'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 2,
    phase: '基础语法入门',
    title: '变量与数据类型',
    topics: ['变量声明', '基本数据类型', '数据范围'],
    problems: [21, 1, 22, 23, 26], // 数据范围测试, A+B问题, 四则运算, 求平均值, 最大值
    objectives: ['理解变量的概念', '掌握int, long long, double等类型', '了解数据溢出问题'],
    tips: ['注意int和long long的范围区别', '大数运算要用long long'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 3,
    phase: '基础语法入门',
    title: '输入输出基础',
    topics: ['cin/cout', 'scanf/printf', '格式化输出'],
    problems: [1, 22, 23, 19, 27], // A+B问题, 四则运算, 求平均值, Hello World, 求和
    objectives: ['掌握基本输入输出', '理解NOIP文件输入输出', '学会格式化输出'],
    tips: ['NOIP要求使用freopen进行文件输入输出', 'printf格式化输出更灵活'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 4,
    phase: '基础语法入门',
    title: '运算符与表达式',
    topics: ['算术运算符', '比较运算符', '逻辑运算符'],
    problems: [22, 23, 26, 1, 21], // 四则运算, 求平均值, 最大值, A+B, 数据范围
    objectives: ['掌握各种运算符', '理解运算优先级', '能写出正确的表达式'],
    tips: ['注意整数除法的问题', '使用括号明确优先级'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 5,
    phase: '基础语法入门',
    title: '条件语句if-else',
    topics: ['if语句', 'if-else语句', '多重条件'],
    problems: [24, 25, 26, 38, 41], // 判断奇偶, 成绩等级, 最大值, 素数判断, 最大公约数
    objectives: ['掌握if语句的使用', '学会多条件判断', '理解嵌套if'],
    tips: ['注意if-else的配对', '多用else if使代码更清晰'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 6,
    phase: '基础语法入门',
    title: '条件语句进阶',
    topics: ['switch语句', '三元运算符', '综合练习'],
    problems: [25, 26, 24, 38, 42], // 成绩等级, 最大值, 判断奇偶, 素数判断, 最小公倍数
    objectives: ['掌握switch语句', '理解三元运算符', '能综合运用条件判断'],
    tips: ['switch适合多分支情况', '三元运算符可以简化简单的if-else'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 7,
    phase: '基础语法入门',
    title: 'for循环基础',
    topics: ['for循环语法', '循环变量', '循环体'],
    problems: [20, 27, 28, 2, 3], // 输出图形, 求和, 九九乘法表, 斐波那契, 阶乘
    objectives: ['掌握for循环语法', '理解循环执行过程', '能写出简单的循环程序'],
    tips: ['注意循环边界', '避免死循环'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 8,
    phase: '基础语法入门',
    title: 'while和do-while循环',
    topics: ['while循环', 'do-while循环', '循环控制'],
    problems: [27, 29, 30, 2, 3], // 求和, 数字统计, 数组求和, 斐波那契, 阶乘
    objectives: ['掌握while和do-while', '理解三种循环的区别', '学会选择合适的循环'],
    tips: ['while先判断后执行', 'do-while先执行后判断'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 9,
    phase: '基础语法入门',
    title: '循环嵌套',
    topics: ['双重循环', '循环嵌套的应用', '打印图形'],
    problems: [28, 20, 29, 44, 45], // 九九乘法表, 输出图形, 数字统计, 冒泡排序, 选择排序
    objectives: ['理解循环嵌套', '能分析嵌套循环的执行过程', '能打印简单图形'],
    tips: ['外层循环控制行，内层循环控制列', '注意循环变量的作用域'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 10,
    phase: '基础语法入门',
    title: '循环综合练习',
    topics: ['循环综合应用', '累加器', '计数器'],
    problems: [2, 3, 27, 29, 30], // 斐波那契, 阶乘, 求和, 数字统计, 数组求和
    objectives: ['能综合运用循环', '理解累加和计数', '解决实际问题'],
    tips: ['累加器初始值通常为0', '计数器初始值通常为0'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 11,
    phase: '基础语法入门',
    title: 'break和continue',
    topics: ['break语句', 'continue语句', '循环优化'],
    problems: [29, 30, 32, 27, 3], // 数字统计, 数组求和, 数组查找, 求和, 阶乘
    objectives: ['掌握break和continue', '理解它们的作用', '能优化循环'],
    tips: ['break跳出整个循环', 'continue跳过本次迭代'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 12,
    phase: '基础语法入门',
    title: '函数基础',
    topics: ['函数定义', '函数调用', '参数传递'],
    problems: [4, 2, 3, 22, 23], // 最大公约数, 斐波那契, 阶乘, 四则运算, 求平均值
    objectives: ['理解函数的概念', '学会定义和调用函数', '理解参数传递'],
    tips: ['函数可以提高代码复用性', '注意参数的值传递'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 13,
    phase: '基础语法入门',
    title: '函数进阶',
    topics: ['返回值', '递归函数初步', '全局变量和局部变量'],
    problems: [4, 2, 3, 41, 42], // GCD, 斐波那契, 阶乘, 最大公约数, 最小公倍数
    objectives: ['理解返回值', '初步了解递归', '理解变量作用域'],
    tips: ['递归要有终止条件', '全局变量谨慎使用'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 14,
    phase: '基础语法入门',
    title: '第一阶段复习',
    topics: ['基础语法复习', '查漏补缺', '综合练习'],
    problems: [1, 2, 3, 24, 25, 27],
    objectives: ['巩固第一阶段知识', '发现并弥补不足', '完成阶段测试'],
    tips: ['多写代码，多调试', '总结常见错误'],
    estimatedHours: 3,
    difficulty: 'beginner',
  },

  // ========== 第二阶段：数组与字符串 (Day 15-24) ==========
  {
    day: 15,
    phase: '数组与字符串',
    title: '一维数组基础',
    topics: ['数组声明', '数组初始化', '数组访问'],
    problems: [30, 31, 32, 27, 29], // 数组求和, 数组逆序, 数组查找, 求和, 数字统计
    objectives: ['理解数组的概念', '掌握数组的声明和使用', '能进行简单数组操作'],
    tips: ['数组下标从0开始', '注意数组越界问题'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 16,
    phase: '数组与字符串',
    title: '数组遍历与查找',
    topics: ['数组遍历', '线性查找', '查找最值'],
    problems: [30, 32, 31, 44, 45], // 数组求和, 数组查找, 数组逆序, 冒泡排序, 选择排序
    objectives: ['掌握数组遍历', '学会查找算法', '能找出最值和位置'],
    tips: ['查找时注意保存位置', '找最值时初始化很重要'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 17,
    phase: '数组与字符串',
    title: '数组排序基础',
    topics: ['冒泡排序', '选择排序', '排序应用'],
    problems: [44, 45, 46, 30, 32], // 冒泡排序, 选择排序, 快速排序, 数组求和, 数组查找
    objectives: ['理解排序的概念', '掌握冒泡和选择排序', '能应用排序解决问题'],
    tips: ['冒泡排序每次把最大的冒到最后', '选择排序每次选择最小的'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 18,
    phase: '数组与字符串',
    title: '二维数组',
    topics: ['二维数组声明', '矩阵操作', '行列处理'],
    problems: [100, 101, 28, 44, 45], // 矩阵转置, 矩阵加法, 九九乘法表, 冒泡排序, 选择排序
    objectives: ['理解二维数组', '掌握矩阵基本操作', '能处理行列相关问题'],
    tips: ['二维数组是数组的数组', '先行后列的访问顺序'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 19,
    phase: '数组与字符串',
    title: '字符串基础',
    topics: ['string类型', '字符数组', '字符串输入输出'],
    problems: [33, 34, 35, 5, 6], // 字符串长度, 字符串拼接, 字母大小写转换, 数字反转, ISBN号码
    objectives: ['掌握string基本操作', '理解字符数组', '能进行字符串输入输出'],
    tips: ['string比字符数组更方便', 'getline可以读入带空格的字符串'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 20,
    phase: '数组与字符串',
    title: '字符串处理',
    topics: ['字符串遍历', '字符操作', '字符串比较'],
    problems: [35, 5, 33, 34, 36], // 字母大小写转换, 数字反转, 字符串长度, 字符串拼接, 回文字符串
    objectives: ['掌握字符串遍历', '学会字符操作', '能比较字符串'],
    tips: ['字符可以直接比较大小', '大小写转换可以用ASCII码'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 21,
    phase: '数组与字符串',
    title: '字符串查找与替换',
    topics: ['字符串查找', '子串', '字符串替换'],
    problems: [36, 37, 5, 6, 7], // 回文字符串, 字符串统计, 数字反转, ISBN号码, 标题统计
    objectives: ['学会查找子串', '理解回文字符串', '能进行字符串统计'],
    tips: ['回文字符串正反读一样', '使用substr截取子串'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 22,
    phase: '数组与字符串',
    title: '模拟算法入门',
    topics: ['模拟思想', '日期计算', '模拟技巧'],
    problems: [70, 71, 7, 13, 17], // 日期计算, 模拟题, 标题统计, 扫雷游戏, 接水问题
    objectives: ['理解模拟算法', '学会日期处理', '能解决简单模拟题'],
    tips: ['模拟就是按照题目描述直接实现', '注意细节和边界情况'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 23,
    phase: '数组与字符串',
    title: 'NOIP字符串真题',
    topics: ['NOIP真题', '字符串综合', '技巧总结'],
    problems: [5, 6, 7, 33, 36], // 数字反转, ISBN号码, 标题统计, 字符串长度, 回文字符串
    objectives: ['熟悉NOIP题型', '综合运用字符串知识', '总结解题技巧'],
    tips: ['NOIP字符串题注重细节', '多练习真题'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },
  {
    day: 24,
    phase: '数组与字符串',
    title: '第二阶段复习',
    topics: ['数组字符串复习', '查漏补缺', '阶段测试'],
    problems: [30, 33, 35, 5, 6, 36, 44], // 数组求和, 字符串长度, 大小写转换, 数字反转, ISBN, 回文, 排序
    objectives: ['巩固数组字符串知识', '完成阶段测试', '总结经验'],
    tips: ['注意字符串和数组的区别', '多做题巩固'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },

  // ========== 第三阶段：基础算法 (Day 25-36) ==========
  {
    day: 25,
    phase: '基础算法',
    title: '排序算法进阶',
    topics: ['快速排序', '归并排序', 'sort函数'],
    problems: [46, 44, 45, 30, 102], // 快速排序, 归并排序, 选择排序, 数组求和, 结构体排序
    objectives: ['理解快速排序原理', '了解归并排序', '学会使用sort函数'],
    tips: ['sort函数最常用', '快排和归并都是分治思想'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 26,
    phase: '基础算法',
    title: '排序应用',
    topics: ['结构体排序', '多关键字排序', '排序技巧'],
    problems: [45, 102, 46, 44, 47], // 选择排序, 结构体排序, 快速排序, 冒泡排序, 二分查找
    objectives: ['学会结构体排序', '掌握多关键字排序', '能灵活应用排序'],
    tips: ['自定义比较函数很重要', 'stable_sort可以保持稳定性'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 27,
    phase: '基础算法',
    title: '二分查找基础',
    topics: ['二分查找原理', 'lower_bound', 'upper_bound'],
    problems: [47, 48, 32, 46, 44], // 二分查找, 二分答案, 数组查找, 快速排序, 冒泡排序
    objectives: ['理解二分查找', '学会使用STL二分函数', '能写出正确的二分'],
    tips: ['二分前提是有序', '注意边界条件'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 28,
    phase: '基础算法',
    title: '二分答案',
    topics: ['二分答案思想', '判定函数', '二分应用'],
    problems: [48, 103, 47, 46, 44], // 二分答案, 二分应用题, 二分查找, 快速排序, 冒泡排序
    objectives: ['理解二分答案', '学会设计判定函数', '能解决二分答案问题'],
    tips: ['二分答案常用于最优化问题', '判定函数要正确实现'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 29,
    phase: '基础算法',
    title: '数论基础-整除与余数',
    topics: ['整除', '取余运算', '整除性质'],
    problems: [38, 41, 42, 4, 39], // 素数判断, 最大公约数, 最小公倍数, GCD, 素数筛法
    objectives: ['理解整除概念', '掌握取余运算', '能解决整除相关问题'],
    tips: ['取余运算有很多性质', '负数取余要注意'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 30,
    phase: '基础算法',
    title: 'GCD与LCM',
    topics: ['最大公约数', '最小公倍数', '欧几里得算法'],
    problems: [4, 41, 42, 38, 39], // GCD, 最大公约数, 最小公倍数, 素数判断, 素数筛法
    objectives: ['掌握GCD算法', '学会计算LCM', '能应用GCD解决问题'],
    tips: ['GCD(a,b) * LCM(a,b) = a * b', '辗转相除法很高效'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 31,
    phase: '基础算法',
    title: '素数与筛法',
    topics: ['素数判定', '埃氏筛', '欧拉筛'],
    problems: [38, 39, 40, 9, 41], // 素数判断, 素数筛法, 质因数分解, NOIP质因数分解, 最大公约数
    objectives: ['掌握素数判定', '理解筛法原理', '能实现高效筛法'],
    tips: ['判断到sqrt(n)即可', '欧拉筛是线性的'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 32,
    phase: '基础算法',
    title: '质因数分解',
    topics: ['分解质因数', '唯一分解定理', '约数个数'],
    problems: [40, 9, 38, 39, 42], // 质因数分解, NOIP质因数分解, 素数判断, 素数筛法, 最小公倍数
    objectives: ['掌握质因数分解', '理解唯一分解定理', '能计算约数个数'],
    tips: ['分解到sqrt(n)即可', '记录质因数和指数'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 33,
    phase: '基础算法',
    title: '快速幂',
    topics: ['快速幂原理', '二进制分解', '模运算'],
    problems: [43, 104, 38, 39, 40], // 快速幂, 快速幂应用, 素数判断, 素数筛法, 质因数分解
    objectives: ['理解快速幂原理', '能实现快速幂', '掌握模运算技巧'],
    tips: ['快速幂利用二进制分解', '注意long long和取模'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 34,
    phase: '基础算法',
    title: '贪心算法入门',
    topics: ['贪心思想', '贪心正确性', '简单贪心'],
    problems: [17, 52, 18, 53, 44], // 接水问题, 排队接水, 合并果子, 活动选择, 冒泡排序
    objectives: ['理解贪心思想', '学会分析正确性', '能解决简单贪心问题'],
    tips: ['贪心需要证明正确性', '局部最优不一定全局最优'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 35,
    phase: '基础算法',
    title: '贪心算法进阶',
    topics: ['区间贪心', '排序+贪心', 'NOIP贪心真题'],
    problems: [18, 53, 17, 52, 45], // 合并果子, 活动选择, 接水问题, 排队接水, 选择排序
    objectives: ['掌握区间贪心', '学会排序+贪心组合', '能解决NOIP贪心题'],
    tips: ['区间问题常按端点排序', '优先队列常用于贪心'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 36,
    phase: '基础算法',
    title: '第三阶段复习',
    topics: ['基础算法复习', '查漏补缺', '阶段测试'],
    problems: [44, 47, 41, 17, 18, 38, 46], // 排序, 二分, GCD, 贪心, 贪心, 素数, 快排
    objectives: ['巩固基础算法', '完成阶段测试', '总结解题技巧'],
    tips: ['排序、二分、贪心是NOIP重点', '多练习真题'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },

  // ========== 第四阶段：搜索算法 (Day 37-46) ==========
  {
    day: 37,
    phase: '搜索算法',
    title: '递归深入',
    topics: ['递归原理', '递归三要素', '递归优化'],
    problems: [49, 50, 2, 3, 4], // 阶乘递归, 汉诺塔, 斐波那契, 阶乘, GCD
    objectives: ['深入理解递归', '掌握递归三要素', '学会优化递归'],
    tips: ['递归要有终止条件', '注意递归深度'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 38,
    phase: '搜索算法',
    title: 'DFS基础',
    topics: ['DFS原理', 'DFS实现', '递归实现DFS'],
    problems: [54, 55, 49, 50, 14], // 全排列, N皇后, 阶乘递归, 汉诺塔, 棋盘问题
    objectives: ['理解DFS原理', '学会实现DFS', '能解决简单DFS问题'],
    tips: ['DFS是一条路走到黑', '注意回溯恢复状态'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 39,
    phase: '搜索算法',
    title: 'DFS应用-全排列',
    topics: ['全排列', '排列组合', 'DFS应用'],
    problems: [54, 105, 55, 49, 50], // 全排列, 排列组合, N皇后, 阶乘递归, 汉诺塔
    objectives: ['掌握全排列生成', '理解排列组合', '能用DFS解决排列问题'],
    tips: ['全排列是经典DFS', 'n个元素有n!种排列'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 40,
    phase: '搜索算法',
    title: 'DFS应用-N皇后',
    topics: ['N皇后问题', '对角线标记', '剪枝优化'],
    problems: [55, 14, 54, 105, 13], // N皇后, 棋盘问题, 全排列, 排列组合, 扫雷游戏
    objectives: ['掌握N皇后解法', '学会对角线标记', '理解剪枝'],
    tips: ['主对角线i-j相同', '副对角线i+j相同'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 41,
    phase: '搜索算法',
    title: 'BFS基础',
    topics: ['BFS原理', '队列实现', 'BFS与DFS对比'],
    problems: [56, 65, 61, 64, 63], // 迷宫问题, 图的BFS遍历, 队列操作, DFS遍历, 图的存储
    objectives: ['理解BFS原理', '学会用队列实现BFS', '能解决简单BFS问题'],
    tips: ['BFS按层次遍历', '常用于求最短路'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 42,
    phase: '搜索算法',
    title: 'BFS应用-迷宫问题',
    topics: ['迷宫问题', '最短路径', 'BFS应用'],
    problems: [56, 106, 65, 64, 63], // 迷宫问题, 走迷宫, 图的BFS遍历, DFS遍历, 图的存储
    objectives: ['掌握迷宫问题解法', '学会求最短路径', '能处理复杂迷宫'],
    tips: ['BFS可以求最短路', '记录路径需要额外数组'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 43,
    phase: '搜索算法',
    title: '图的遍历',
    topics: ['图的存储', '邻接表', 'DFS和BFS遍历图'],
    problems: [63, 64, 65, 56, 66], // 图的邻接表, DFS遍历, BFS遍历, 迷宫问题, Dijkstra
    objectives: ['掌握图的存储方式', '学会遍历图', '理解连通性'],
    tips: ['邻接表比邻接矩阵更省空间', '遍历标记访问数组'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 44,
    phase: '搜索算法',
    title: '搜索优化-剪枝',
    topics: ['剪枝原理', '常见剪枝方法', '优化技巧'],
    problems: [107, 108, 55, 54, 14], // 剪枝练习题, N皇后, 全排列, 棋盘问题
    objectives: ['理解剪枝原理', '学会常见剪枝方法', '能优化搜索效率'],
    tips: ['剪枝可以大大提高效率', '可行性剪枝和最优性剪枝'],
    estimatedHours: 2,
    difficulty: 'advanced',
  },
  {
    day: 45,
    phase: '搜索算法',
    title: 'NOIP搜索真题',
    topics: ['NOIP真题', '搜索综合', '技巧总结'],
    problems: [13, 14, 54, 55, 56], // 扫雷游戏, 棋盘问题, 全排列, N皇后, 迷宫问题
    objectives: ['熟悉NOIP搜索题型', '综合运用搜索知识', '总结解题技巧'],
    tips: ['NOIP搜索题注重细节', '合理使用剪枝'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },
  {
    day: 46,
    phase: '搜索算法',
    title: '第四阶段复习',
    topics: ['搜索复习', '查漏补缺', '阶段测试'],
    problems: [54, 55, 56, 63, 13, 64, 65], // 全排列, N皇后, 迷宫, 图存储, 扫雷, DFS, BFS
    objectives: ['巩固搜索算法', '完成阶段测试', '总结经验'],
    tips: ['DFS适合求方案', 'BFS适合求最短路'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },

  // ========== 第五阶段：动态规划入门 (Day 47-56) ==========
  {
    day: 47,
    phase: '动态规划入门',
    title: 'DP基础概念',
    topics: ['DP思想', '状态定义', '状态转移'],
    problems: [57, 2, 3, 58, 59], // 爬楼梯, 斐波那契, 阶乘, 背包问题, LIS
    objectives: ['理解DP基本概念', '学会定义状态', '理解状态转移'],
    tips: ['DP是递推的优化', '找出状态转移方程是关键'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 48,
    phase: '动态规划入门',
    title: '线性DP-爬楼梯',
    topics: ['线性DP', '爬楼梯问题', 'DP实现'],
    problems: [57, 58, 2, 3, 59], // 爬楼梯, 背包问题, 斐波那契, 阶乘, LIS
    objectives: ['掌握爬楼梯问题', '理解线性DP', '能实现简单DP'],
    tips: ['dp[i]表示到达第i阶的方法数', 'dp[i] = dp[i-1] + dp[i-2]'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 49,
    phase: '动态规划入门',
    title: '背包问题-01背包',
    topics: ['01背包', '状态转移', '空间优化'],
    problems: [58, 11, 57, 59, 12], // 背包问题, 摆花, 爬楼梯, LIS, 数字三角形
    objectives: ['掌握01背包问题', '理解状态转移', '学会空间优化'],
    tips: ['dp[j]表示容量为j时的最大价值', '逆序遍历避免重复选取'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 50,
    phase: '动态规划入门',
    title: '背包问题-完全背包',
    topics: ['完全背包', '与01背包区别', '实现方式'],
    problems: [109, 110, 58, 11, 57], // 完全背包题, 完全背包应用, 01背包, 摆花, 爬楼梯
    objectives: ['掌握完全背包问题', '理解与01背包的区别', '能正确实现'],
    tips: ['完全背包正序遍历', '每种物品可以选多次'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 51,
    phase: '动态规划入门',
    title: '最长递增子序列',
    topics: ['LIS问题', 'O(n²)解法', 'O(nlogn)优化'],
    problems: [59, 111, 57, 58, 2], // LIS, LIS应用, 爬楼梯, 背包问题, 斐波那契
    objectives: ['掌握LIS问题', '理解两种解法', '能应用LIS'],
    tips: ['O(n²)容易理解', 'O(nlogn)用二分优化'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 52,
    phase: '动态规划入门',
    title: '最长公共子序列',
    topics: ['LCS问题', '状态转移', '输出方案'],
    problems: [112, 113, 59, 57, 58], // LCS题, LCS应用, LIS, 爬楼梯, 背包问题
    objectives: ['掌握LCS问题', '理解状态转移', '能输出方案'],
    tips: ['dp[i][j]表示s1前i个和s2前j个的LCS', '注意边界条件'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 53,
    phase: '动态规划入门',
    title: '数字三角形',
    topics: ['数字三角形', '自顶向下', '自底向上'],
    problems: [12, 11, 57, 58, 59], // 数字三角形, 摆花, 爬楼梯, 背包问题, LIS
    objectives: ['掌握数字三角形问题', '理解两种解法', '能处理类似问题'],
    tips: ['自底向上更简单', '注意边界处理'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 54,
    phase: '动态规划入门',
    title: '区间DP',
    topics: ['区间DP概念', '区间合并', '石子合并'],
    problems: [114, 115, 12, 11, 18], // 区间DP题, 石子合并, 数字三角形, 摆花, 合并果子
    objectives: ['理解区间DP', '掌握区间合并问题', '能解决石子合并'],
    tips: ['区间DP按区间长度递推', '枚举区间分割点'],
    estimatedHours: 2,
    difficulty: 'advanced',
  },
  {
    day: 55,
    phase: '动态规划入门',
    title: 'NOIP DP真题',
    topics: ['NOIP真题', 'DP综合', '技巧总结'],
    problems: [11, 12, 57, 58, 59], // 摆花, 数字三角形, 爬楼梯, 背包问题, LIS
    objectives: ['熟悉NOIP DP题型', '综合运用DP知识', '总结解题技巧'],
    tips: ['NOIP DP题多为经典模型变种', '先识别模型再解题'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },
  {
    day: 56,
    phase: '动态规划入门',
    title: '第五阶段复习',
    topics: ['DP复习', '查漏补缺', '阶段测试'],
    problems: [57, 58, 59, 11, 12, 2, 114], // 爬楼梯, 背包, LIS, 摆花, 数字三角形, 斐波那契, 区间DP
    objectives: ['巩固DP知识', '完成阶段测试', '总结DP模型'],
    tips: ['DP重在状态设计和转移方程', '多练习不同类型DP'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },

  // ========== 第六阶段：数据结构 (Day 57-66) ==========
  {
    day: 57,
    phase: '数据结构',
    title: '栈基础',
    topics: ['栈的概念', '栈的实现', '栈的应用'],
    problems: [60, 62, 61, 63, 64], // 栈的基本操作, 括号匹配, 队列操作, 图存储, DFS遍历
    objectives: ['理解栈的原理', '学会实现栈', '能解决括号匹配问题'],
    tips: ['栈是后进先出(LIFO)', '递归本质就是栈'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 58,
    phase: '数据结构',
    title: '栈的应用',
    topics: ['表达式求值', '单调栈', '栈的应用'],
    problems: [62, 116, 60, 61, 65], // 括号匹配, 单调栈, 栈操作, 队列操作, BFS遍历
    objectives: ['掌握表达式求值', '了解单调栈', '能应用栈解决问题'],
    tips: ['单调栈可以求最近的更大/小元素', '表达式求值用两个栈'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 59,
    phase: '数据结构',
    title: '队列基础',
    topics: ['队列的概念', '队列的实现', '队列的应用'],
    problems: [61, 60, 62, 65, 56], // 队列的基本操作, 栈操作, 括号匹配, BFS遍历, 迷宫问题
    objectives: ['理解队列原理', '学会实现队列', '能应用队列'],
    tips: ['队列是先进先出(FIFO)', 'BFS使用队列'],
    estimatedHours: 2,
    difficulty: 'beginner',
  },
  {
    day: 60,
    phase: '数据结构',
    title: '树的基础',
    topics: ['树的概念', '二叉树', '树的遍历'],
    problems: [117, 118, 63, 64, 65], // 二叉树遍历, 树的遍历, 图存储, DFS遍历, BFS遍历
    objectives: ['理解树的概念', '掌握二叉树遍历', '能处理树的基本问题'],
    tips: ['前中后序遍历要熟练', '递归遍历最简单'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 61,
    phase: '数据结构',
    title: '图的基础',
    topics: ['图的概念', '图的存储', '邻接矩阵和邻接表'],
    problems: [63, 64, 65, 56, 66], // 图的存储和遍历, DFS遍历, BFS遍历, 迷宫, Dijkstra
    objectives: ['理解图的概念', '掌握图的存储方式', '能表示和存储图'],
    tips: ['稀疏图用邻接表', '稠密图用邻接矩阵'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 62,
    phase: '数据结构',
    title: '图的遍历应用',
    topics: ['连通性', '图的遍历应用', '连通分量'],
    problems: [64, 65, 119, 63, 56], // 图遍历应用, DFS, BFS, 连通性, 迷宫问题
    objectives: ['能用遍历解决实际问题', '理解连通性', '能求连通分量'],
    tips: ['DFS和BFS各有优势', '连通分量用遍历标记'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 63,
    phase: '数据结构',
    title: '最短路径-Dijkstra',
    topics: ['最短路径', 'Dijkstra算法', '优先队列优化'],
    problems: [66, 15, 56, 65, 64], // Dijkstra, 信息传递, 迷宫问题, BFS遍历, DFS遍历
    objectives: ['理解最短路径问题', '掌握Dijkstra算法', '能实现优先队列优化'],
    tips: ['Dijkstra适用于非负权图', '优先队列优化后是O((n+m)logn)'],
    estimatedHours: 2,
    difficulty: 'advanced',
  },
  {
    day: 64,
    phase: '数据结构',
    title: '最短路径-Floyd',
    topics: ['Floyd算法', '多源最短路', '传递闭包'],
    problems: [120, 121, 66, 15, 63], // Floyd题, Floyd应用, Dijkstra, 信息传递, 图存储
    objectives: ['掌握Floyd算法', '理解多源最短路', '能应用传递闭包'],
    tips: ['Floyd是O(n³)', '适合求所有点对最短路'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 65,
    phase: '数据结构',
    title: '并查集',
    topics: ['并查集概念', '路径压缩', '按秩合并'],
    problems: [122, 123, 119, 63, 64], // 并查集题, 并查集应用, 连通性, 图存储, DFS遍历
    objectives: ['理解并查集原理', '掌握路径压缩', '能应用并查集'],
    tips: ['并查集处理连通性问题', '路径压缩后接近O(1)'],
    estimatedHours: 2,
    difficulty: 'intermediate',
  },
  {
    day: 66,
    phase: '数据结构',
    title: '第六阶段复习',
    topics: ['数据结构复习', '查漏补缺', '阶段测试'],
    problems: [60, 61, 63, 66, 122, 64, 65], // 栈, 队列, 图存储, Dijkstra, 并查集, DFS, BFS
    objectives: ['巩固数据结构知识', '完成阶段测试', '总结数据结构应用'],
    tips: ['栈队列是基础', '图论是重点'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },

  // ========== 第七阶段：综合训练 (Day 67-70) ==========
  {
    day: 67,
    phase: '综合训练',
    title: 'NOIP普及组真题训练(一)',
    topics: ['真题训练', '模拟题', '时间分配'],
    problems: [7, 13, 17, 5, 6, 18], // 标题统计, 扫雷, 接水问题, 数字反转, ISBN号码, 合并果子
    objectives: ['熟悉NOIP题型', '练习时间分配', '提高解题速度'],
    tips: ['先做简单题拿分', '注意时间分配'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },
  {
    day: 68,
    phase: '综合训练',
    title: 'NOIP普及组真题训练(二)',
    topics: ['真题训练', 'DP题', '搜索题'],
    problems: [11, 14, 18, 12, 57, 58], // 摆花, 棋盘, 合并果子, 数字三角形, 爬楼梯, 背包问题
    objectives: ['熟悉NOIP题型', '练习DP和搜索', '提高准确率'],
    tips: ['DP题要仔细分析状态', '搜索题注意剪枝'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },
  {
    day: 69,
    phase: '综合训练',
    title: '查漏补缺',
    topics: ['薄弱环节', '专项训练', '错题回顾'],
    problems: [1, 2, 3, 4, 5, 6, 7], // 根据用户情况推荐：A+B, 斐波那契, 阶乘, GCD, 数字反转, ISBN, 标题统计
    objectives: ['找出薄弱环节', '专项训练提高', '回顾错题'],
    tips: ['回顾之前做错的题', '针对性练习'],
    estimatedHours: 3,
    difficulty: 'intermediate',
  },
  {
    day: 70,
    phase: '综合训练',
    title: '模拟考试',
    topics: ['模拟考试', '时间管理', '心态调整'],
    problems: [124, 125, 126, 127, 11, 12], // 模拟题, 摆花, 数字三角形
    objectives: ['模拟真实考试环境', '练习时间管理', '调整考试心态'],
    tips: ['像真实考试一样完成', '注意检查'],
    estimatedHours: 4,
    difficulty: 'advanced',
  },
];

// 获取指定天的学习任务
export function getDailyTask(day: number): DailyTask | undefined {
  return dailySchedule.find(task => task.day === day);
}

// 获取指定阶段的学习任务
export function getPhaseTasks(phaseId: string): DailyTask[] {
  const phase = learningPhases.find(p => p.id === phaseId);
  if (!phase) return [];
  return dailySchedule.filter(task => task.day >= phase.startDay && task.day <= phase.endDay);
}

// 获取当前应该学习的天数（基于用户进度）
export function getCurrentDay(completedDays: number[]): number {
  if (completedDays.length === 0) return 1;
  const maxDay = Math.max(...completedDays);
  return Math.min(maxDay + 1, 70);
}

// 获取学习进度统计
export function getProgressStats(completedDays: number[]): {
  totalDays: number;
  completedDays: number;
  currentPhase: LearningPhase;
  phaseProgress: number;
} {
  const currentDay = getCurrentDay(completedDays);
  const currentPhase = learningPhases.find(
    phase => currentDay >= phase.startDay && currentDay <= phase.endDay
  ) || learningPhases[0];

  const phaseProgress = currentPhase
    ? Math.round(((currentDay - currentPhase.startDay + 1) / (currentPhase.endDay - currentPhase.startDay + 1)) * 100)
    : 0;

  return {
    totalDays: 70,
    completedDays: completedDays.length,
    currentPhase,
    phaseProgress,
  };
}

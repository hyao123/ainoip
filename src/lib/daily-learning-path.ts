// 每日学习路径数据结构
// 从Day 1开始，循序渐进，支持有基础者跳转

// 单日学习内容
export interface DayLesson {
  day: number;
  title: string;
  description: string;
  phase: 'foundation' | 'basic' | 'intermediate' | 'advanced' | 'competition';
  phaseName: string;
  topics: LessonTopic[];
  practiceProblems: number[];
  challengeProblem?: number;
  estimatedMinutes: number;
  objectives: string[];
  // 总结内容（用于复习日）
  summary?: {
    title: string;
    sections: {
      title: string;
      topicId?: string; // 点击可跳转到对应知识点
      keyPoints: string[];
      commonMistakes: string[];
    }[];
  };
}

// 知识点
export interface LessonTopic {
  id: string;
  name: string;
  type: 'concept' | 'algorithm' | 'data_structure';
  importance: 'required' | 'recommended' | 'optional';
}

// 学习阶段
export interface LearningPhase {
  id: string;
  name: string;
  description: string;
  startDay: number;
  endDay: number;
  targetLevel: string;
  color: string;
  icon: string;
}

// 学习阶段定义
export const learningPhases: LearningPhase[] = [
  {
    id: 'foundation',
    name: '基础入门',
    description: '从零开始，掌握C++基础语法',
    startDay: 1,
    endDay: 14,
    targetLevel: '入门级',
    color: 'green',
    icon: '🌱',
  },
  {
    id: 'basic',
    name: '基础算法',
    description: '掌握基本算法思想和数据结构',
    startDay: 15,
    endDay: 35,
    targetLevel: '普及组入门',
    color: 'blue',
    icon: '🌿',
  },
  {
    id: 'intermediate',
    name: '进阶提升',
    description: '深入算法学习，攻克普及组',
    startDay: 36,
    endDay: 70,
    targetLevel: '普及组',
    color: 'yellow',
    icon: '🌳',
  },
  {
    id: 'advanced',
    name: '高级算法',
    description: '掌握高级算法，冲击提高组',
    startDay: 71,
    endDay: 100,
    targetLevel: '提高组',
    color: 'orange',
    icon: '🏔️',
  },
  {
    id: 'competition',
    name: '竞赛冲刺',
    description: '真题训练，模拟比赛',
    startDay: 101,
    endDay: 120,
    targetLevel: '省选水平',
    color: 'red',
    icon: '🏆',
  },
];

// 每日学习路径（从Day 1到Day 120）
export const dailyLearningPath: DayLesson[] = [
  // ============ 阶段一：基础入门（Day 1-14）============
  {
    day: 1,
    title: '初识C++',
    description: '了解编程是什么，认识C++语言，写出你的第一个程序',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'intro-cpp', name: 'C++简介', type: 'concept', importance: 'required' },
      { id: 'hello-world', name: 'Hello World', type: 'concept', importance: 'required' },
      { id: 'compile-run', name: '编译与运行', type: 'concept', importance: 'required' },
    ],
    practiceProblems: [1, 19],
    estimatedMinutes: 45,
    objectives: [
      '了解什么是编程和C++语言',
      '能够编写并运行第一个程序',
      '理解程序的基本结构',
    ],
  },
  {
    day: 2,
    title: '变量与数据类型',
    description: '学习如何存储和处理数据',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'variables', name: '变量的概念', type: 'concept', importance: 'required' },
      { id: 'data-types', name: '基本数据类型', type: 'concept', importance: 'required' },
      { id: 'int-range', name: '整数范围', type: 'concept', importance: 'recommended' },
    ],
    practiceProblems: [1, 21],
    estimatedMinutes: 50,
    objectives: [
      '理解变量的概念和作用',
      '掌握int、long long等整数类型',
      '了解数据范围的重要性',
    ],
  },
  {
    day: 3,
    title: '输入与输出',
    description: '学习如何让程序与用户交互',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'cin-cout', name: 'cin和cout', type: 'concept', importance: 'required' },
      { id: 'scanf-printf', name: 'scanf和printf', type: 'concept', importance: 'recommended' },
      { id: 'file-io', name: '文件输入输出', type: 'concept', importance: 'optional' },
    ],
    practiceProblems: [1, 19, 20],
    estimatedMinutes: 45,
    objectives: [
      '掌握基本的输入输出方法',
      '了解cin/cout和scanf/printf的区别',
      '初步了解NOIP的文件输入输出要求',
    ],
  },
  {
    day: 4,
    title: '运算符',
    description: '学习算术运算和表达式',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'arithmetic', name: '算术运算符', type: 'concept', importance: 'required' },
      { id: 'expression', name: '表达式', type: 'concept', importance: 'required' },
      { id: 'operator-order', name: '运算优先级', type: 'concept', importance: 'recommended' },
    ],
    practiceProblems: [22, 26],
    estimatedMinutes: 40,
    objectives: [
      '掌握加减乘除取余运算',
      '理解表达式的求值过程',
      '注意整数除法的特殊性',
    ],
  },
  {
    day: 5,
    title: '条件判断',
    description: '让程序学会做选择',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'if-else', name: 'if-else语句', type: 'concept', importance: 'required' },
      { id: 'comparison', name: '比较运算符', type: 'concept', importance: 'required' },
      { id: 'nested-if', name: '嵌套条件', type: 'concept', importance: 'recommended' },
    ],
    practiceProblems: [24, 25],
    estimatedMinutes: 50,
    objectives: [
      '掌握if-else语句的使用',
      '学会使用比较运算符',
      '理解条件语句的嵌套',
    ],
  },
  {
    day: 6,
    title: '逻辑运算',
    description: '组合多个条件',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'logical-ops', name: '逻辑运算符', type: 'concept', importance: 'required' },
      { id: 'complex-conditions', name: '复杂条件', type: 'concept', importance: 'required' },
      { id: 'short-circuit', name: '短路求值', type: 'concept', importance: 'optional' },
    ],
    practiceProblems: [24, 25, 26],
    estimatedMinutes: 40,
    objectives: [
      '掌握与、或、非逻辑运算',
      '能够组合复杂条件表达式',
      '理解短路求值',
    ],
  },
  {
    day: 7,
    title: 'for循环',
    description: '让程序重复执行',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'for-loop', name: 'for循环', type: 'concept', importance: 'required' },
      { id: 'loop-variable', name: '循环变量', type: 'concept', importance: 'required' },
      { id: 'loop-patterns', name: '常见循环模式', type: 'concept', importance: 'recommended' },
    ],
    practiceProblems: [27, 28],
    estimatedMinutes: 55,
    objectives: [
      '理解循环的概念',
      '掌握for循环的语法',
      '学会使用循环解决问题',
    ],
  },
  {
    day: 8,
    title: 'while循环',
    description: '另一种循环方式',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'while-loop', name: 'while循环', type: 'concept', importance: 'required' },
      { id: 'do-while', name: 'do-while循环', type: 'concept', importance: 'recommended' },
      { id: 'loop-choice', name: '循环选择', type: 'concept', importance: 'recommended' },
    ],
    practiceProblems: [2, 27],
    estimatedMinutes: 45,
    objectives: [
      '掌握while循环的使用',
      '理解for和while的区别',
      '学会选择合适的循环类型',
    ],
  },
  {
    day: 9,
    title: '循环进阶',
    description: '嵌套循环和循环控制',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'nested-loops', name: '嵌套循环', type: 'concept', importance: 'required' },
      { id: 'break-continue', name: 'break和continue', type: 'concept', importance: 'required' },
      { id: 'loop-optimization', name: '循环优化基础', type: 'concept', importance: 'optional' },
    ],
    practiceProblems: [28, 29],
    estimatedMinutes: 50,
    objectives: [
      '掌握嵌套循环的使用',
      '理解break和continue的作用',
      '能够打印简单图形',
    ],
  },
  {
    day: 10,
    title: '一维数组',
    description: '存储多个数据',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'array-intro', name: '数组概念', type: 'data_structure', importance: 'required' },
      { id: 'array-declare', name: '数组声明', type: 'data_structure', importance: 'required' },
      { id: 'array-access', name: '数组访问', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [30, 31],
    estimatedMinutes: 55,
    objectives: [
      '理解数组的概念和作用',
      '掌握一维数组的声明和使用',
      '学会遍历数组',
    ],
  },
  {
    day: 11,
    title: '二维数组',
    description: '矩阵和表格数据处理',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: '2d-array', name: '二维数组概念', type: 'data_structure', importance: 'required' },
      { id: '2d-traverse', name: '二维数组遍历', type: 'data_structure', importance: 'required' },
      { id: 'matrix', name: '矩阵操作', type: 'data_structure', importance: 'recommended' },
    ],
    practiceProblems: [32, 70],
    estimatedMinutes: 55,
    objectives: [
      '理解二维数组的概念',
      '掌握二维数组的声明和遍历',
      '能够处理矩阵相关问题',
    ],
  },
  {
    day: 12,
    title: '结构体',
    description: '自定义数据类型',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'struct-intro', name: '结构体概念', type: 'data_structure', importance: 'required' },
      { id: 'struct-advanced', name: '结构体进阶', type: 'data_structure', importance: 'recommended' },
      { id: 'struct-sort', name: '结构体排序', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [75, 76, 77],
    estimatedMinutes: 50,
    objectives: [
      '理解结构体的概念和定义',
      '学会使用结构体组织相关数据',
      '掌握结构体的常见应用',
    ],
  },
  {
    day: 13,
    title: '字符串基础',
    description: '文本数据处理',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'string-intro', name: '字符串概念', type: 'data_structure', importance: 'required' },
      { id: 'string-ops', name: '字符串操作', type: 'data_structure', importance: 'required' },
      { id: 'char-array', name: '字符数组', type: 'data_structure', importance: 'recommended' },
    ],
    practiceProblems: [33, 34],
    estimatedMinutes: 50,
    objectives: [
      '掌握string类型的使用',
      '学会字符串的基本操作',
      '理解字符和字符串的区别',
    ],
  },
  {
    day: 14,
    title: '基础入门复习',
    description: '串联前13天知识，完成入门考核',
    phase: 'foundation',
    phaseName: '基础入门',
    topics: [
      { id: 'foundation-review', name: '基础入门复习', type: 'concept', importance: 'required' },
    ],
    practiceProblems: [1, 15, 24, 30, 75],
    challengeProblem: 29,
    estimatedMinutes: 70,
    objectives: [
      '回顾C++程序的基本结构',
      '巩固变量、数据类型和运算符',
      '熟练掌握三种流程控制结构',
      '理解数组、字符串和结构体的应用',
      '完成入门阶段综合测验',
    ],
    summary: {
      title: '基础入门知识图谱',
      sections: [
        {
          title: 'Day 1-2：C++入门与变量',
          topicId: 'intro-cpp',
          keyPoints: ['C++程序结构（头文件、main函数）', 'cout输出、cin输入', '变量命名规则', '基本数据类型（int、double、char、bool、string）'],
          commonMistakes: ['忘记分号', '变量未初始化就使用', '数据类型选择不当导致精度丢失'],
        },
        {
          title: 'Day 3-4：运算符与表达式',
          topicId: 'operators',
          keyPoints: ['算术运算符（+、-、*、/、%）', '自增自减（++、--）', '复合赋值运算符（+=、-=）', '类型转换与精度问题'],
          commonMistakes: ['整数除法丢失小数部分', '自增自减的前置后置混淆', '运算符优先级错误'],
        },
        {
          title: 'Day 5-6：选择结构',
          topicId: 'if-else',
          keyPoints: ['if-else语句', 'else if多分支', 'switch-case语句', '逻辑运算符（&&、||、！）', '三元运算符'],
          commonMistakes: ['条件判断写成赋值（= vs ==）', '忘记else分支', 'switch缺少break'],
        },
        {
          title: 'Day 7-9：循环结构',
          topicId: 'for-loop',
          keyPoints: ['for循环（计数循环）', 'while循环（条件循环）', 'do-while循环', '循环嵌套', 'break和continue'],
          commonMistakes: ['循环边界错误（< vs <=）', '死循环', '嵌套循环变量混淆'],
        },
        {
          title: 'Day 10：一维数组',
          topicId: 'array-intro',
          keyPoints: ['数组声明与初始化', '数组下标从0开始', '数组遍历', '数组越界问题'],
          commonMistakes: ['下标越界', '数组未初始化', '混淆数组长度和最大下标'],
        },
        {
          title: 'Day 11：二维数组',
          topicId: '2d-array',
          keyPoints: ['二维数组声明', '行列遍历', '矩阵操作', '对角线访问'],
          commonMistakes: ['行列索引混淆', '二维数组初始化格式错误'],
        },
        {
          title: 'Day 12：结构体',
          topicId: 'struct-intro',
          keyPoints: ['结构体定义', '成员访问（.运算符）', '结构体初始化', '结构体数组', '结构体排序'],
          commonMistakes: ['定义后忘记分号', '初始化顺序错误', '值传递vs引用传递'],
        },
        {
          title: 'Day 13：字符串',
          topicId: 'string-intro',
          keyPoints: ['string类型', '字符串输入（cin、getline）', '常用操作（length、substr、find）', '字符数组'],
          commonMistakes: ['cin遇到空格停止', '字符串比较用==而非strcmp', '忘记字符串以\\0结尾'],
        },
      ],
    },
  },

  // ============ 阶段二：基础算法（Day 15-35）============
  {
    day: 15,
    title: '模拟算法入门',
    description: '按照题目描述直接模拟过程',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'simulation-intro', name: '模拟算法', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [70, 71],
    estimatedMinutes: 55,
    objectives: [
      '理解模拟算法的思想',
      '学会分析模拟过程',
      '能够解决简单的模拟题',
    ],
  },
  {
    day: 16,
    title: '枚举算法',
    description: '尝试所有可能的情况',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'enumeration', name: '枚举算法', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [79, 80], // 百钱百鸡、水仙花数
    estimatedMinutes: 50,
    objectives: [
      '理解枚举算法的基本思想',
      '能够确定合理的枚举范围',
      '学会基本的枚举优化技巧',
    ],
  },
  {
    day: 17,
    title: '排序算法（一）',
    description: '冒泡排序和选择排序',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'sort-intro', name: '排序概念', type: 'algorithm', importance: 'required' },
      { id: 'bubble-sort', name: '冒泡排序', type: 'algorithm', importance: 'required' },
      { id: 'selection-sort', name: '选择排序', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [44, 45],
    estimatedMinutes: 55,
    objectives: [
      '理解排序的意义',
      '掌握冒泡排序的实现',
      '了解选择排序',
    ],
  },
  {
    day: 18,
    title: '排序算法（二）',
    description: '插入排序和sort函数',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'insertion-sort', name: '插入排序', type: 'algorithm', importance: 'recommended' },
      { id: 'stl-sort', name: 'STL sort函数', type: 'algorithm', importance: 'required' },
      { id: 'custom-compare', name: '自定义比较', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [44, 45],
    estimatedMinutes: 50,
    objectives: [
      '掌握STL sort的使用',
      '学会自定义比较函数',
      '了解插入排序',
    ],
  },
  {
    day: 19,
    title: '函数基础',
    description: '代码模块化',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'function-intro', name: '函数概念', type: 'concept', importance: 'required' },
      { id: 'function-define', name: '函数定义', type: 'concept', importance: 'required' },
      { id: 'function-call', name: '函数调用', type: 'concept', importance: 'required' },
    ],
    practiceProblems: [2, 3],
    estimatedMinutes: 45,
    objectives: [
      '理解函数的作用',
      '学会定义和调用函数',
      '理解参数传递',
    ],
  },
  {
    day: 20,
    title: '递归入门',
    description: '函数调用自己',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'recursion-intro', name: '递归算法', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [2, 49],
    estimatedMinutes: 55,
    objectives: [
      '理解递归的思想',
      '能够写出简单的递归函数',
      '理解递归终止条件的重要性',
    ],
  },
  {
    day: 21,
    title: '递归应用',
    description: '递归的实际应用',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'recursion-examples', name: '递归经典问题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [49, 50], // 阶乘、汉诺塔
    estimatedMinutes: 55,
    objectives: [
      '掌握分治思想',
      '能够解决经典递归问题',
      '理解递归的执行过程',
    ],
  },
  {
    day: 22,
    title: '二分查找',
    description: '高效的查找方法',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'binary-search', name: '二分思想与查找', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [47, 32], // 二分查找、数组查找
    estimatedMinutes: 55,
    objectives: [
      '理解二分查找的前提条件',
      '掌握二分查找的实现',
      '学会处理边界情况',
    ],
  },
  {
    day: 23,
    title: '二分答案',
    description: '用二分思想解决问题',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'binary-answer', name: '二分答案', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [48, 32],
    estimatedMinutes: 60,
    objectives: [
      '理解二分答案的思想',
      '学会设计检验函数',
      '能够解决二分答案问题',
    ],
  },
  {
    day: 24,
    title: '贪心算法入门',
    description: '每一步选择最优',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'greedy-intro', name: '贪心算法', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [52, 53],
    estimatedMinutes: 55,
    objectives: [
      '理解贪心算法的思想',
      '学会分析贪心正确性',
      '能够解决简单的贪心问题',
    ],
  },
  {
    day: 25,
    title: '贪心应用',
    description: '更多贪心问题',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'greedy-intro', name: '贪心算法应用', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [17, 53],
    estimatedMinutes: 55,
    objectives: [
      '掌握排序+贪心的套路',
      '能够解决区间贪心问题',
      '加深对贪心的理解',
    ],
  },
  {
    day: 26,
    title: '前缀和',
    description: '快速计算区间和',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'prefix-sum', name: '前缀和', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [73, 74], // 前缀和求区间和、子数组和
    estimatedMinutes: 50,
    objectives: [
      '理解前缀和的概念',
      '掌握前缀和的预处理',
      '能够快速计算区间和',
    ],
  },
  {
    day: 27,
    title: '差分',
    description: '高效的区间修改',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'difference', name: '差分', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [76, 77], // 差分数组基础、差分求最终值
    estimatedMinutes: 50,
    objectives: [
      '理解差分的概念',
      '掌握差分的区间修改',
      '理解差分与前缀和的关系',
    ],
  },
  {
    day: 28,
    title: '数论基础',
    description: '整除、余数和GCD',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'divisible', name: '整除与余数', type: 'algorithm', importance: 'required' },
      { id: 'gcd-lcm', name: '最大公约数与最小公倍数', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [38, 41, 42],
    estimatedMinutes: 55,
    objectives: [
      '掌握整除和余数的性质',
      '学会使用欧几里得算法',
      '理解GCD和LCM的关系',
    ],
  },
  {
    day: 29,
    title: '素数',
    description: '素数判定和筛法',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'prime', name: '素数与筛法', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [38, 39, 40],
    estimatedMinutes: 55,
    objectives: [
      '掌握素数判定的方法',
      '学会埃氏筛法',
      '了解欧拉筛的优化',
    ],
  },
  {
    day: 30,
    title: '快速幂',
    description: '高效的幂运算',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'fast-power', name: '快速幂', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [43, 68],
    estimatedMinutes: 50,
    objectives: [
      '理解快速幂的原理',
      '掌握快速幂的实现',
      '学会模幂运算',
    ],
  },
  {
    day: 31,
    title: '结构体',
    description: '自定义数据类型',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'struct-intro', name: '结构体', type: 'data_structure', importance: 'required' },
      { id: 'struct-advanced', name: '结构体进阶', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [53, 52],
    estimatedMinutes: 45,
    objectives: [
      '学会定义结构体',
      '掌握结构体的使用',
      '能够对结构体排序',
    ],
  },
  {
    day: 32,
    title: 'STL基础',
    description: 'vector和pair',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'vector-intro', name: 'vector容器', type: 'data_structure', importance: 'required' },
      { id: 'pair-intro', name: 'pair类型', type: 'data_structure', importance: 'recommended' },
    ],
    practiceProblems: [30, 60],
    estimatedMinutes: 50,
    objectives: [
      '掌握vector的使用',
      '了解pair的用法',
      '学会使用STL简化代码',
    ],
  },
  {
    day: 33,
    title: '栈',
    description: '后进先出的数据结构',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'stack-intro', name: '栈', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [60, 62],
    estimatedMinutes: 50,
    objectives: [
      '理解栈的特性',
      '掌握STL stack的使用',
      '能够解决简单的栈问题',
    ],
  },
  {
    day: 34,
    title: '队列',
    description: '先进先出的数据结构',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'queue-intro', name: '队列', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [61, 56],
    estimatedMinutes: 50,
    objectives: [
      '理解队列的特性',
      '掌握STL queue的使用',
      '了解双端队列',
    ],
  },
  {
    day: 35,
    title: '基础算法复习',
    description: '巩固所学，完成阶段考核',
    phase: 'basic',
    phaseName: '基础算法',
    topics: [
      { id: 'basic-algo-review', name: '基础算法复习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [44, 47, 52, 27, 60],
    challengeProblem: 64,
    estimatedMinutes: 70,
    objectives: [
      '复习巩固基础算法',
      '完成基础阶段所有练习',
      '准备进入进阶阶段',
    ],
    summary: {
      title: '基础算法知识图谱',
      sections: [
        {
          title: 'Day 15-16：模拟与枚举',
          topicId: 'simulation-intro',
          keyPoints: ['模拟：按题目描述直接实现过程', '枚举：尝试所有可能的情况', '枚举优化：缩小范围、减少重复', '注意边界条件和特殊情况'],
          commonMistakes: ['漏掉边界情况', '枚举范围过大超时', '题意理解错误导致模拟方向错误'],
        },
        {
          title: 'Day 17-18：排序算法',
          topicId: 'sort-intro',
          keyPoints: ['冒泡排序：相邻元素交换', '选择排序：选最小的放前面', '插入排序：插入到正确位置', 'STL sort：高效便捷', '自定义比较：控制排序规则'],
          commonMistakes: ['数组下标错误', '比较函数写错（不要用>=）', '忘记包含<algorithm>头文件'],
        },
        {
          title: 'Day 19-21：函数与递归',
          topicId: 'function-intro',
          keyPoints: ['函数定义与调用', '参数传递（值传递）', '递归思想：自己调用自己', '递归终止条件必不可少', '分治：大问题分解为小问题'],
          commonMistakes: ['没有终止条件导致无限递归', '参数传递错误', '返回值遗漏', '递归深度过大'],
        },
        {
          title: 'Day 22-23：二分查找与答案',
          topicId: 'binary-search',
          keyPoints: ['二分查找前提：有序数组', '二分答案前提：答案单调', '边界处理：L<=R 还是 L<R', '检验函数的设计', '时间复杂度：O(log n)'],
          commonMistakes: ['边界条件错误（死循环）', '二分答案忘记检验函数', '检验函数逻辑错误'],
        },
        {
          title: 'Day 24-25：贪心算法',
          topicId: 'greedy-intro',
          keyPoints: ['贪心思想：每步选当前最优', '贪心正确性需要验证', '经典问题：找零钱、区间调度', '排序+贪心是常见套路', '贪心不是万能的'],
          commonMistakes: ['贪心后没有验证正确性', '局部最优≠全局最优', '排序方向搞错'],
        },
        {
          title: 'Day 26-27：前缀和与差分',
          topicId: 'prefix-sum',
          keyPoints: ['前缀和：预处理后O(1)区间查询', '差分：O(1)区间修改', '差分是前缀和的逆运算', '下标从1开始更方便', '公式：sum[l,r] = prefix[r] - prefix[l-1]'],
          commonMistakes: ['下标从0开始导致边界问题', '忘记还原差分数组', '数据溢出（用long long）'],
        },
        {
          title: 'Day 28-30：数论基础',
          topicId: 'gcd-lcm',
          keyPoints: ['GCD：辗转相除法', 'LCM = a × b / GCD(a,b)', '素数判定：试除法', '埃氏筛法：批量求素数', '快速幂：O(log n)幂运算'],
          commonMistakes: ['忘记取模导致溢出', '筛法下标错误', '快速幂没用long long'],
        },
        {
          title: 'Day 31-34：STL容器',
          topicId: 'vector-intro',
          keyPoints: ['vector：动态数组，push_back/pop_back', 'pair：存储两个值，用.first/.second访问', 'stack：后进先出(LIFO)，push/pop/top', 'queue：先进先出(FIFO)，push/pop/front', '使用前检查empty()'],
          commonMistakes: ['空容器访问top/front', '下标越界', '忘记包含头文件', '混淆栈和队列的特性'],
        },
      ],
    },
  },

  // ============ 阶段三：进阶提升（Day 36-70）============
  {
    day: 36,
    title: 'DFS入门',
    description: '深度优先搜索',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'dfs-intro', name: 'DFS概念', type: 'algorithm', importance: 'required' },
      { id: 'dfs-impl', name: 'DFS实现', type: 'algorithm', importance: 'required' },
      { id: 'dfs-order', name: '搜索顺序', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [65, 66],
    estimatedMinutes: 60,
    objectives: [
      '理解DFS的搜索过程',
      '掌握DFS的代码实现',
      '学会设计搜索顺序',
    ],
  },
  {
    day: 37,
    title: 'DFS应用',
    description: '全排列和组合',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'dfs-permute', name: '全排列', type: 'algorithm', importance: 'required' },
      { id: 'dfs-combine', name: '组合', type: 'algorithm', importance: 'required' },
      { id: 'dfs-prune', name: '剪枝基础', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [66, 67],
    estimatedMinutes: 60,
    objectives: [
      '掌握全排列的生成',
      '学会组合的枚举',
      '理解剪枝的作用',
    ],
  },
  {
    day: 38,
    title: 'BFS入门',
    description: '广度优先搜索',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'bfs-intro', name: 'BFS概念', type: 'algorithm', importance: 'required' },
      { id: 'bfs-impl', name: 'BFS实现', type: 'algorithm', importance: 'required' },
      { id: 'bfs-level', name: '层次遍历', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [68, 69],
    estimatedMinutes: 60,
    objectives: [
      '理解BFS的搜索过程',
      '掌握BFS的代码实现',
      '学会层次遍历',
    ],
  },
  {
    day: 39,
    title: 'BFS应用',
    description: '最短路和迷宫',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'bfs-maze', name: '迷宫问题', type: 'algorithm', importance: 'required' },
      { id: 'bfs-shortest', name: '最短路', type: 'algorithm', importance: 'required' },
      { id: 'bfs-state', name: '状态压缩BFS', type: 'algorithm', importance: 'optional' },
    ],
    practiceProblems: [69, 71],
    estimatedMinutes: 65,
    objectives: [
      '能够解决迷宫问题',
      '理解BFS求最短路的原理',
      '了解状态压缩',
    ],
  },
  {
    day: 40,
    title: '动态规划入门',
    description: 'DP的基本概念',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'dp-intro', name: 'DP概念', type: 'algorithm', importance: 'required' },
      { id: 'dp-state', name: '状态定义', type: 'algorithm', importance: 'required' },
      { id: 'dp-transfer', name: '状态转移', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [2, 72],
    estimatedMinutes: 60,
    objectives: [
      '理解动态规划的思想',
      '学会定义状态',
      '掌握状态转移方程',
    ],
  },
  {
    day: 41,
    title: '线性DP',
    description: '一维状态转移',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'linear-dp', name: '线性DP', type: 'algorithm', importance: 'required' },
      { id: 'lis', name: '最长上升子序列', type: 'algorithm', importance: 'required' },
      { id: 'lis-optim', name: 'LIS优化', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [73, 74],
    estimatedMinutes: 60,
    objectives: [
      '掌握线性DP的模式',
      '学会LIS问题',
      '了解LIS的二分优化',
    ],
  },
  {
    day: 42,
    title: '背包问题（一）',
    description: '01背包',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'knapsack-intro', name: '背包问题概念', type: 'algorithm', importance: 'required' },
      { id: '01-knapsack', name: '01背包', type: 'algorithm', importance: 'required' },
      { id: '01-space', name: '空间优化', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [75, 76],
    estimatedMinutes: 65,
    objectives: [
      '理解背包问题的模型',
      '掌握01背包的状态转移',
      '学会空间优化',
    ],
  },
  {
    day: 43,
    title: '背包问题（二）',
    description: '完全背包和多重背包',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'complete-knapsack', name: '完全背包', type: 'algorithm', importance: 'required' },
      { id: 'multiple-knapsack', name: '多重背包', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [77, 78],
    estimatedMinutes: 60,
    objectives: [
      '掌握完全背包',
      '了解多重背包',
      '区分不同背包问题',
    ],
  },
  {
    day: 44,
    title: '区间DP',
    description: '区间上的动态规划',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'interval-dp', name: '区间DP概念', type: 'algorithm', importance: 'required' },
      { id: 'interval-order', name: '枚举顺序', type: 'algorithm', importance: 'required' },
      { id: 'interval-examples', name: '经典问题', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [79, 80],
    estimatedMinutes: 65,
    objectives: [
      '理解区间DP的思想',
      '掌握正确的枚举顺序',
      '能够解决经典区间DP问题',
    ],
  },
  {
    day: 45,
    title: '树和图基础',
    description: '图论入门',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'graph-intro', name: '图的概念', type: 'data_structure', importance: 'required' },
      { id: 'tree-intro', name: '树的概念', type: 'data_structure', importance: 'required' },
      { id: 'graph-store', name: '图的存储', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [81, 82],
    estimatedMinutes: 55,
    objectives: [
      '理解图和树的概念',
      '掌握邻接表存储',
      '了解邻接矩阵',
    ],
  },
  {
    day: 46,
    title: '树的遍历',
    description: 'DFS和BFS遍历树',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'tree-dfs', name: '树的DFS', type: 'algorithm', importance: 'required' },
      { id: 'tree-bfs', name: '树的BFS', type: 'algorithm', importance: 'required' },
      { id: 'tree-diameter', name: '树的直径', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [82, 83],
    estimatedMinutes: 60,
    objectives: [
      '掌握树的遍历方法',
      '能够求树的深度',
      '学会求树的直径',
    ],
  },
  {
    day: 47,
    title: '图的遍历',
    description: '连通性和搜索',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'graph-dfs', name: '图的DFS', type: 'algorithm', importance: 'required' },
      { id: 'graph-bfs', name: '图的BFS', type: 'algorithm', importance: 'required' },
      { id: 'connected', name: '连通分量', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [84, 85],
    estimatedMinutes: 60,
    objectives: [
      '掌握图的遍历',
      '学会判断连通性',
      '能够求连通分量',
    ],
  },
  {
    day: 48,
    title: '最短路（一）',
    description: 'Dijkstra算法',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'dijkstra', name: 'Dijkstra算法', type: 'algorithm', importance: 'required' },
      { id: 'dijkstra-impl', name: '算法实现', type: 'algorithm', importance: 'required' },
      { id: 'dijkstra-heap', name: '堆优化', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [86, 87],
    estimatedMinutes: 65,
    objectives: [
      '理解Dijkstra算法原理',
      '掌握算法实现',
      '学会堆优化',
    ],
  },
  {
    day: 49,
    title: '最短路（二）',
    description: 'Floyd和SPFA',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'floyd', name: 'Floyd算法', type: 'algorithm', importance: 'required' },
      { id: 'spfa', name: 'SPFA算法', type: 'algorithm', importance: 'recommended' },
      { id: 'negative', name: '负权边处理', type: 'algorithm', importance: 'optional' },
    ],
    practiceProblems: [87, 88],
    estimatedMinutes: 60,
    objectives: [
      '掌握Floyd算法',
      '了解SPFA算法',
      '理解不同算法的适用场景',
    ],
  },
  {
    day: 50,
    title: '并查集',
    description: '高效的集合操作',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'dsu-intro', name: '并查集概念', type: 'data_structure', importance: 'required' },
      { id: 'dsu-path', name: '路径压缩', type: 'algorithm', importance: 'required' },
      { id: 'dsu-rank', name: '按秩合并', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [89, 90],
    estimatedMinutes: 55,
    objectives: [
      '理解并查集的原理',
      '掌握路径压缩优化',
      '学会解决连通性问题',
    ],
  },
  {
    day: 51,
    title: '最小生成树',
    description: 'Kruskal和Prim',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'mst-intro', name: '最小生成树概念', type: 'algorithm', importance: 'required' },
      { id: 'kruskal', name: 'Kruskal算法', type: 'algorithm', importance: 'required' },
      { id: 'prim', name: 'Prim算法', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [91, 92],
    estimatedMinutes: 60,
    objectives: [
      '理解最小生成树',
      '掌握Kruskal算法',
      '了解Prim算法',
    ],
  },
  {
    day: 52,
    title: 'DP进阶',
    description: '状态压缩DP',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'bitmask-intro', name: '位运算基础', type: 'algorithm', importance: 'required' },
      { id: 'bitmask-dp', name: '状压DP概念', type: 'algorithm', importance: 'required' },
      { id: 'bitmask-examples', name: '经典问题', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [93, 94],
    estimatedMinutes: 70,
    objectives: [
      '掌握位运算',
      '理解状压DP的思想',
      '能够解决简单状压DP问题',
    ],
  },
  {
    day: 53,
    title: '记忆化搜索',
    description: '递归+记忆',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'memo-intro', name: '记忆化搜索概念', type: 'algorithm', importance: 'required' },
      { id: 'memo-vs-dp', name: '记忆化与递推', type: 'algorithm', importance: 'required' },
      { id: 'memo-examples', name: '经典问题', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [95, 96],
    estimatedMinutes: 55,
    objectives: [
      '理解记忆化搜索',
      '学会选择递推或记忆化',
      '能够解决记忆化问题',
    ],
  },
  {
    day: 54,
    title: '字符串匹配',
    description: 'KMP算法',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'kmp-intro', name: 'KMP概念', type: 'algorithm', importance: 'required' },
      { id: 'kmp-next', name: 'next数组', type: 'algorithm', importance: 'required' },
      { id: 'kmp-match', name: '匹配过程', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [97, 98],
    estimatedMinutes: 65,
    objectives: [
      '理解KMP算法原理',
      '掌握next数组的计算',
      '能够实现字符串匹配',
    ],
  },
  {
    day: 55,
    title: '哈希',
    description: '字符串哈希',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'hash-intro', name: '哈希概念', type: 'algorithm', importance: 'required' },
      { id: 'str-hash', name: '字符串哈希', type: 'algorithm', importance: 'required' },
      { id: 'hash-collision', name: '哈希冲突', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [99, 100],
    estimatedMinutes: 55,
    objectives: [
      '理解哈希的思想',
      '掌握字符串哈希',
      '了解冲突处理',
    ],
  },
  {
    day: 56,
    title: '高精度',
    description: '大整数运算',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'bigint-intro', name: '高精度概念', type: 'algorithm', importance: 'required' },
      { id: 'bigint-add', name: '高精度加法', type: 'algorithm', importance: 'required' },
      { id: 'bigint-mul', name: '高精度乘法', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [72, 101],
    estimatedMinutes: 60,
    objectives: [
      '理解高精度的原理',
      '掌握高精度加法',
      '学会高精度乘法',
    ],
  },
  {
    day: 57,
    title: '线段树入门',
    description: '区间查询数据结构',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'segtree-intro', name: '线段树概念', type: 'data_structure', importance: 'required' },
      { id: 'segtree-build', name: '建树', type: 'algorithm', importance: 'required' },
      { id: 'segtree-query', name: '区间查询', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [102, 103],
    estimatedMinutes: 70,
    objectives: [
      '理解线段树的结构',
      '掌握建树和查询',
      '能够解决简单区间问题',
    ],
  },
  {
    day: 58,
    title: '线段树进阶',
    description: '区间修改和懒标记',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'segtree-update', name: '区间修改', type: 'algorithm', importance: 'required' },
      { id: 'lazy-tag', name: '懒标记', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [103, 104],
    estimatedMinutes: 70,
    objectives: [
      '掌握区间修改',
      '理解懒标记的原理',
      '能够实现带标记的线段树',
    ],
  },
  {
    day: 59,
    title: '树状数组',
    description: '高效的区间操作',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'bit-intro', name: '树状数组概念', type: 'data_structure', importance: 'required' },
      { id: 'bit-ops', name: '基本操作', type: 'algorithm', importance: 'required' },
      { id: 'bit-vs-seg', name: '与线段树对比', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [105, 106],
    estimatedMinutes: 55,
    objectives: [
      '理解树状数组原理',
      '掌握基本操作',
      '了解适用场景',
    ],
  },
  {
    day: 60,
    title: 'Trie树',
    description: '字典树',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'trie-intro', name: 'Trie概念', type: 'data_structure', importance: 'required' },
      { id: 'trie-ops', name: '插入和查询', type: 'algorithm', importance: 'required' },
      { id: 'trie-apps', name: '应用场景', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [107, 108],
    estimatedMinutes: 55,
    objectives: [
      '理解Trie树的结构',
      '掌握插入和查询',
      '了解应用场景',
    ],
  },
  {
    day: 61,
    title: '拓扑排序',
    description: '有向无环图的排序',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'topo-intro', name: '拓扑排序概念', type: 'algorithm', importance: 'required' },
      { id: 'topo-impl', name: '算法实现', type: 'algorithm', importance: 'required' },
      { id: 'topo-apps', name: '应用场景', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [109, 110],
    estimatedMinutes: 55,
    objectives: [
      '理解拓扑排序',
      '掌握算法实现',
      '能够判断环的存在',
    ],
  },
  {
    day: 62,
    title: 'LCA',
    description: '最近公共祖先',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'lca-intro', name: 'LCA概念', type: 'algorithm', importance: 'required' },
      { id: 'lca-naive', name: '朴素算法', type: 'algorithm', importance: 'required' },
      { id: 'lca-binary', name: '倍增算法', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [111, 112],
    estimatedMinutes: 65,
    objectives: [
      '理解LCA的概念',
      '掌握朴素算法',
      '了解倍增优化',
    ],
  },
  {
    day: 63,
    title: '数位DP',
    description: '数位上的动态规划',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'digit-dp-intro', name: '数位DP概念', type: 'algorithm', importance: 'required' },
      { id: 'digit-dp-state', name: '状态设计', type: 'algorithm', importance: 'required' },
      { id: 'digit-dp-examples', name: '经典问题', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [113, 114],
    estimatedMinutes: 70,
    objectives: [
      '理解数位DP的思想',
      '学会状态设计',
      '能够解决数位DP问题',
    ],
  },
  {
    day: 64,
    title: '博弈论DP',
    description: '博弈问题的DP解法',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'game-dp-intro', name: '博弈论基础', type: 'algorithm', importance: 'required' },
      { id: 'sg-function', name: 'SG函数', type: 'algorithm', importance: 'recommended' },
      { id: 'nim-game', name: 'Nim游戏', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [115, 116],
    estimatedMinutes: 65,
    objectives: [
      '理解博弈论基础',
      '了解SG函数',
      '能够解决简单博弈问题',
    ],
  },
  {
    day: 65,
    title: '进阶复习（一）',
    description: '搜索算法复习',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'review-search', name: '搜索复习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [65, 68, 69, 71],
    estimatedMinutes: 60,
    objectives: [
      '巩固DFS和BFS',
      '复习搜索应用',
    ],
  },
  {
    day: 66,
    title: '进阶复习（二）',
    description: '动态规划复习',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'review-dp', name: 'DP复习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [73, 75, 79, 93],
    estimatedMinutes: 60,
    objectives: [
      '巩固各类DP问题',
      '复习DP优化技巧',
    ],
  },
  {
    day: 67,
    title: '进阶复习（三）',
    description: '图论复习',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'review-graph', name: '图论复习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [86, 89, 91, 111],
    estimatedMinutes: 60,
    objectives: [
      '巩固图论算法',
      '复习最短路和生成树',
    ],
  },
  {
    day: 68,
    title: '进阶复习（四）',
    description: '数据结构复习',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'review-ds', name: '数据结构复习', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [102, 105, 107, 61],
    estimatedMinutes: 60,
    objectives: [
      '巩固高级数据结构',
      '复习线段树和树状数组',
    ],
  },
  {
    day: 69,
    title: '进阶综合练习',
    description: '综合应用所学',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'practice-intermediate', name: '综合练习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [117, 118, 119, 120],
    estimatedMinutes: 80,
    objectives: [
      '综合运用所学算法',
      '解决复杂问题',
    ],
  },
  {
    day: 70,
    title: '进阶阶段考核',
    description: '完成进阶阶段考核',
    phase: 'intermediate',
    phaseName: '进阶提升',
    topics: [
      { id: 'exam-intermediate', name: '阶段考核', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [121, 122, 123, 124],
    challengeProblem: 125,
    estimatedMinutes: 90,
    objectives: [
      '检验进阶阶段学习成果',
      '准备进入高级阶段',
    ],
  },

  // ============ 阶段四：高级算法（Day 71-100）============
  {
    day: 71,
    title: '高级搜索',
    description: 'IDA*和A*算法',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'astar', name: 'A*算法', type: 'algorithm', importance: 'required' },
      { id: 'ida', name: 'IDA*算法', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [126, 127],
    estimatedMinutes: 70,
    objectives: [
      '理解启发式搜索',
      '掌握A*算法',
      '了解IDA*',
    ],
  },
  {
    day: 72,
    title: '网络流入门',
    description: '最大流问题',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'flow-intro', name: '网络流概念', type: 'algorithm', importance: 'required' },
      { id: 'maxflow', name: '最大流', type: 'algorithm', importance: 'required' },
      { id: 'dinic', name: 'Dinic算法', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [128, 129],
    estimatedMinutes: 75,
    objectives: [
      '理解网络流模型',
      '掌握Dinic算法',
      '能够建模最大流问题',
    ],
  },
  {
    day: 73,
    title: '网络流应用',
    description: '最小割和费用流',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'mincut', name: '最小割', type: 'algorithm', importance: 'required' },
      { id: 'mcmf', name: '费用流', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [130, 131],
    estimatedMinutes: 70,
    objectives: [
      '理解最小割定理',
      '了解费用流',
      '能够解决建模问题',
    ],
  },
  {
    day: 74,
    title: '强连通分量',
    description: 'Tarjan算法',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'scc-intro', name: '强连通分量概念', type: 'algorithm', importance: 'required' },
      { id: 'tarjan', name: 'Tarjan算法', type: 'algorithm', importance: 'required' },
      { id: 'scc-apps', name: '应用场景', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [132, 133],
    estimatedMinutes: 70,
    objectives: [
      '理解强连通分量',
      '掌握Tarjan算法',
      '学会缩点应用',
    ],
  },
  {
    day: 75,
    title: '树链剖分',
    description: '重链剖分',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'hld-intro', name: '树链剖分概念', type: 'algorithm', importance: 'required' },
      { id: 'hld-impl', name: '实现细节', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [134, 135],
    estimatedMinutes: 80,
    objectives: [
      '理解重链剖分原理',
      '掌握代码实现',
      '能够解决树上问题',
    ],
  },
  {
    day: 76,
    title: '点分治',
    description: '树上分治算法',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'divide-intro', name: '点分治概念', type: 'algorithm', importance: 'required' },
      { id: 'divide-impl', name: '算法实现', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [136, 137],
    estimatedMinutes: 75,
    objectives: [
      '理解点分治思想',
      '掌握重心划分',
      '能够解决树上路径问题',
    ],
  },
  {
    day: 77,
    title: 'CDQ分治',
    description: '三维偏序问题',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'cdq-intro', name: 'CDQ分治概念', type: 'algorithm', importance: 'required' },
      { id: 'cdq-3d', name: '三维偏序', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [138, 139],
    estimatedMinutes: 70,
    objectives: [
      '理解CDQ分治思想',
      '掌握三维偏序解法',
      '学会降维处理',
    ],
  },
  {
    day: 78,
    title: '高级DP（一）',
    description: '斜率优化',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'convex-intro', name: '斜率优化概念', type: 'algorithm', importance: 'required' },
      { id: 'convex-hull', name: '凸壳维护', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [140, 141],
    estimatedMinutes: 75,
    objectives: [
      '理解斜率优化原理',
      '掌握凸壳维护',
      '能够识别适用问题',
    ],
  },
  {
    day: 79,
    title: '高级DP（二）',
    description: '四边形不等式',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'quad-intro', name: '四边形不等式', type: 'algorithm', importance: 'required' },
      { id: 'quad-opt', name: '决策单调性优化', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [142, 143],
    estimatedMinutes: 70,
    objectives: [
      '理解四边形不等式',
      '学会决策单调性优化',
      '掌握优化区间DP',
    ],
  },
  {
    day: 80,
    title: '高级DP（三）',
    description: '树形DP进阶',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'tree-dp-adv', name: '树形DP进阶', type: 'algorithm', importance: 'required' },
      { id: 'tree-dp-merge', name: '树上启发式合并', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [144, 145],
    estimatedMinutes: 75,
    objectives: [
      '掌握复杂树形DP',
      '了解树上启发式合并',
      '能够解决树上问题',
    ],
  },
  {
    day: 81,
    title: '莫队算法',
    description: '离线区间查询',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'mo-intro', name: '莫队算法概念', type: 'algorithm', importance: 'required' },
      { id: 'mo-impl', name: '普通莫队', type: 'algorithm', importance: 'required' },
      { id: 'mo-variants', name: '莫队变种', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [146, 147],
    estimatedMinutes: 70,
    objectives: [
      '理解莫队算法原理',
      '掌握普通莫队',
      '了解带修改莫队',
    ],
  },
  {
    day: 82,
    title: '矩阵快速幂',
    description: '矩阵加速递推',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'matrix-intro', name: '矩阵基础', type: 'algorithm', importance: 'required' },
      { id: 'matrix-power', name: '矩阵快速幂', type: 'algorithm', importance: 'required' },
      { id: 'matrix-dp', name: '矩阵加速DP', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [148, 149],
    estimatedMinutes: 65,
    objectives: [
      '掌握矩阵运算',
      '学会矩阵快速幂',
      '能够加速递推问题',
    ],
  },
  {
    day: 83,
    title: '虚树',
    description: '压缩关键点的树',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'vt-intro', name: '虚树概念', type: 'algorithm', importance: 'required' },
      { id: 'vt-build', name: '虚树构建', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [150, 151],
    estimatedMinutes: 75,
    objectives: [
      '理解虚树的作用',
      '掌握虚树构建方法',
      '能够解决关键点问题',
    ],
  },
  {
    day: 84,
    title: 'FFT/NTT',
    description: '快速傅里叶变换',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'fft-intro', name: 'FFT概念', type: 'algorithm', importance: 'required' },
      { id: 'fft-impl', name: 'FFT实现', type: 'algorithm', importance: 'required' },
      { id: 'ntt', name: 'NTT', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [152, 153],
    estimatedMinutes: 80,
    objectives: [
      '理解FFT原理',
      '掌握FFT实现',
      '学会多项式乘法',
    ],
  },
  {
    day: 85,
    title: '后缀数组',
    description: '字符串高级处理',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'sa-intro', name: '后缀数组概念', type: 'algorithm', importance: 'required' },
      { id: 'sa-build', name: 'SA构建', type: 'algorithm', importance: 'required' },
      { id: 'height', name: 'LCP数组', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [154, 155],
    estimatedMinutes: 75,
    objectives: [
      '理解后缀数组',
      '掌握SA构建方法',
      '学会使用LCP数组',
    ],
  },
  {
    day: 86,
    title: 'AC自动机',
    description: '多模式匹配',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'ac-intro', name: 'AC自动机概念', type: 'algorithm', importance: 'required' },
      { id: 'ac-build', name: '构建过程', type: 'algorithm', importance: 'required' },
      { id: 'ac-match', name: '匹配应用', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [156, 157],
    estimatedMinutes: 70,
    objectives: [
      '理解AC自动机原理',
      '掌握fail指针构建',
      '能够解决多模式匹配',
    ],
  },
  {
    day: 87,
    title: '高级数据结构（一）',
    description: '平衡树入门',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'bst-intro', name: '平衡树概念', type: 'data_structure', importance: 'required' },
      { id: 'treap', name: 'Treap', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [158, 159],
    estimatedMinutes: 80,
    objectives: [
      '理解平衡树的原理',
      '掌握Treap的实现',
      '能够维护动态集合',
    ],
  },
  {
    day: 88,
    title: '高级数据结构（二）',
    description: 'Splay和LCT',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'splay', name: 'Splay树', type: 'data_structure', importance: 'recommended' },
      { id: 'lct', name: 'Link-Cut Tree', type: 'data_structure', importance: 'optional' },
    ],
    practiceProblems: [160, 161],
    estimatedMinutes: 85,
    objectives: [
      '了解Splay树',
      '认识LCT',
      '理解动态树问题',
    ],
  },
  {
    day: 89,
    title: 'SAM',
    description: '后缀自动机',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'sam-intro', name: 'SAM概念', type: 'algorithm', importance: 'required' },
      { id: 'sam-build', name: 'SAM构建', type: 'algorithm', importance: 'required' },
      { id: 'sam-apps', name: 'SAM应用', type: 'algorithm', importance: 'recommended' },
    ],
    practiceProblems: [162, 163],
    estimatedMinutes: 80,
    objectives: [
      '理解后缀自动机',
      '掌握SAM构建',
      '能够解决字符串问题',
    ],
  },
  {
    day: 90,
    title: '高级阶段复习（一）',
    description: '图论算法复习',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'review-graph-adv', name: '图论复习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [128, 132, 134, 136],
    estimatedMinutes: 70,
    objectives: [
      '巩固高级图论算法',
      '复习网络流和Tarjan',
    ],
  },
  {
    day: 91,
    title: '高级阶段复习（二）',
    description: 'DP算法复习',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'review-dp-adv', name: 'DP复习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [140, 142, 144, 148],
    estimatedMinutes: 70,
    objectives: [
      '巩固高级DP技巧',
      '复习各类优化',
    ],
  },
  {
    day: 92,
    title: '高级阶段复习（三）',
    description: '数据结构复习',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'review-ds-adv', name: '数据结构复习', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [146, 150, 158, 162],
    estimatedMinutes: 70,
    objectives: [
      '巩固高级数据结构',
      '复习字符串算法',
    ],
  },
  {
    day: 93,
    title: '高级综合练习（一）',
    description: '综合应用',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'practice-adv-1', name: '综合练习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [164, 165, 166, 167],
    estimatedMinutes: 90,
    objectives: [
      '综合运用高级算法',
      '解决复杂问题',
    ],
  },
  {
    day: 94,
    title: '高级综合练习（二）',
    description: '综合应用',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'practice-adv-2', name: '综合练习', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [168, 169, 170, 171],
    estimatedMinutes: 90,
    objectives: [
      '综合运用高级算法',
      '解决复杂问题',
    ],
  },
  {
    day: 95,
    title: '高级阶段考核',
    description: '完成高级阶段考核',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'exam-advanced', name: '阶段考核', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [172, 173, 174, 175],
    challengeProblem: 176,
    estimatedMinutes: 100,
    objectives: [
      '检验高级阶段成果',
      '准备进入竞赛阶段',
    ],
  },
  {
    day: 96,
    title: 'NOIP普及组真题（一）',
    description: '近年普及组真题训练',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'noip-pop-1', name: '普及组真题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [177, 178, 179, 180],
    estimatedMinutes: 90,
    objectives: [
      '熟悉普及组题型',
      '提高实战能力',
    ],
  },
  {
    day: 97,
    title: 'NOIP普及组真题（二）',
    description: '近年普及组真题训练',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'noip-pop-2', name: '普及组真题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [181, 182, 183, 184],
    estimatedMinutes: 90,
    objectives: [
      '熟悉普及组题型',
      '提高实战能力',
    ],
  },
  {
    day: 98,
    title: 'NOIP提高组真题（一）',
    description: '近年提高组真题训练',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'noip-imp-1', name: '提高组真题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [185, 186, 187, 188],
    estimatedMinutes: 100,
    objectives: [
      '熟悉提高组题型',
      '提高解题难度',
    ],
  },
  {
    day: 99,
    title: 'NOIP提高组真题（二）',
    description: '近年提高组真题训练',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'noip-imp-2', name: '提高组真题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [189, 190, 191, 192],
    estimatedMinutes: 100,
    objectives: [
      '熟悉提高组题型',
      '提高解题难度',
    ],
  },
  {
    day: 100,
    title: '高级阶段总结',
    description: '总结所学，准备冲刺',
    phase: 'advanced',
    phaseName: '高级算法',
    topics: [
      { id: 'summary-advanced', name: '阶段总结', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [193, 194, 195, 196],
    estimatedMinutes: 80,
    objectives: [
      '总结高级阶段学习',
      '查漏补缺',
      '准备竞赛冲刺',
    ],
  },

  // ============ 阶段五：竞赛冲刺（Day 101-120）============
  {
    day: 101,
    title: '模拟赛（一）',
    description: '完整模拟NOIP比赛',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'mock-1', name: '模拟赛', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [197, 198, 199, 200],
    estimatedMinutes: 240,
    objectives: [
      '适应比赛节奏',
      '锻炼时间分配',
      '提高心态稳定性',
    ],
  },
  {
    day: 102,
    title: '模拟赛复盘',
    description: '分析模拟赛问题',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'review-mock-1', name: '模拟赛复盘', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [201, 202, 203, 204],
    estimatedMinutes: 90,
    objectives: [
      '总结比赛经验',
      '发现薄弱点',
      '针对性提高',
    ],
  },
  {
    day: 103,
    title: '专题突破（一）',
    description: 'DP专题强化',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'focus-dp', name: 'DP专题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [205, 206, 207, 208],
    estimatedMinutes: 100,
    objectives: [
      '强化DP能力',
      '突破难点',
    ],
  },
  {
    day: 104,
    title: '专题突破（二）',
    description: '图论专题强化',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'focus-graph', name: '图论专题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [209, 210, 211, 212],
    estimatedMinutes: 100,
    objectives: [
      '强化图论能力',
      '突破难点',
    ],
  },
  {
    day: 105,
    title: '专题突破（三）',
    description: '数据结构专题强化',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'focus-ds', name: '数据结构专题', type: 'data_structure', importance: 'required' },
    ],
    practiceProblems: [213, 214, 215, 216],
    estimatedMinutes: 100,
    objectives: [
      '强化数据结构能力',
      '突破难点',
    ],
  },
  {
    day: 106,
    title: '模拟赛（二）',
    description: '完整模拟NOIP比赛',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'mock-2', name: '模拟赛', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [217, 218, 219, 220],
    estimatedMinutes: 240,
    objectives: [
      '适应比赛节奏',
      '锻炼时间分配',
    ],
  },
  {
    day: 107,
    title: '模拟赛复盘',
    description: '分析模拟赛问题',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'review-mock-2', name: '模拟赛复盘', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [221, 222, 223, 224],
    estimatedMinutes: 90,
    objectives: [
      '总结比赛经验',
      '发现薄弱点',
    ],
  },
  {
    day: 108,
    title: '专题突破（四）',
    description: '字符串专题强化',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'focus-string', name: '字符串专题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [225, 226, 227, 228],
    estimatedMinutes: 100,
    objectives: [
      '强化字符串能力',
      '突破难点',
    ],
  },
  {
    day: 109,
    title: '专题突破（五）',
    description: '数论专题强化',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'focus-nt', name: '数论专题', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [229, 230, 231, 232],
    estimatedMinutes: 100,
    objectives: [
      '强化数论能力',
      '突破难点',
    ],
  },
  {
    day: 110,
    title: '模拟赛（三）',
    description: '完整模拟NOIP比赛',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'mock-3', name: '模拟赛', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [233, 234, 235, 236],
    estimatedMinutes: 240,
    objectives: [
      '适应比赛节奏',
      '锻炼时间分配',
    ],
  },
  {
    day: 111,
    title: '模拟赛复盘',
    description: '分析模拟赛问题',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'review-mock-3', name: '模拟赛复盘', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [237, 238, 239, 240],
    estimatedMinutes: 90,
    objectives: [
      '总结比赛经验',
      '发现薄弱点',
    ],
  },
  {
    day: 112,
    title: '查漏补缺（一）',
    description: '针对性复习',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'fill-gaps-1', name: '查漏补缺', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [241, 242, 243, 244],
    estimatedMinutes: 90,
    objectives: [
      '发现知识漏洞',
      '针对性补强',
    ],
  },
  {
    day: 113,
    title: '查漏补缺（二）',
    description: '针对性复习',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'fill-gaps-2', name: '查漏补缺', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [245, 246, 247, 248],
    estimatedMinutes: 90,
    objectives: [
      '发现知识漏洞',
      '针对性补强',
    ],
  },
  {
    day: 114,
    title: '模拟赛（四）',
    description: '完整模拟NOIP比赛',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'mock-4', name: '模拟赛', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [249, 250, 251, 252],
    estimatedMinutes: 240,
    objectives: [
      '适应比赛节奏',
      '锻炼时间分配',
    ],
  },
  {
    day: 115,
    title: '模拟赛复盘',
    description: '分析模拟赛问题',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'review-mock-4', name: '模拟赛复盘', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [253, 254, 255, 256],
    estimatedMinutes: 90,
    objectives: [
      '总结比赛经验',
      '发现薄弱点',
    ],
  },
  {
    day: 116,
    title: '心态调整',
    description: '赛前心理建设',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'mental', name: '心态调整', type: 'concept', importance: 'required' },
    ],
    practiceProblems: [257, 258, 259, 260],
    estimatedMinutes: 80,
    objectives: [
      '调整比赛心态',
      '增强自信心',
      '学会压力管理',
    ],
  },
  {
    day: 117,
    title: '技巧总结',
    description: '比赛技巧和注意事项',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'tips', name: '比赛技巧', type: 'concept', importance: 'required' },
    ],
    practiceProblems: [261, 262, 263, 264],
    estimatedMinutes: 80,
    objectives: [
      '掌握比赛技巧',
      '了解注意事项',
      '提高比赛效率',
    ],
  },
  {
    day: 118,
    title: '最后冲刺（一）',
    description: '保持状态',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'sprint-1', name: '最后冲刺', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [265, 266, 267, 268],
    estimatedMinutes: 90,
    objectives: [
      '保持竞技状态',
      '巩固知识',
    ],
  },
  {
    day: 119,
    title: '最后冲刺（二）',
    description: '保持状态',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'sprint-2', name: '最后冲刺', type: 'algorithm', importance: 'required' },
    ],
    practiceProblems: [269, 270, 271, 272],
    estimatedMinutes: 90,
    objectives: [
      '保持竞技状态',
      '巩固知识',
    ],
  },
  {
    day: 120,
    title: '赛前总结',
    description: '总结120天学习成果',
    phase: 'competition',
    phaseName: '竞赛冲刺',
    topics: [
      { id: 'final-summary', name: '总结', type: 'concept', importance: 'required' },
    ],
    practiceProblems: [273, 274, 275, 276],
    estimatedMinutes: 60,
    objectives: [
      '回顾学习历程',
      '总结经验教训',
      '调整最佳状态',
      '迎接NOIP比赛！',
    ],
  },
];

// 获取某一天的学习内容
export function getDayLesson(day: number): DayLesson | undefined {
  return dailyLearningPath.find(lesson => lesson.day === day);
}

// 获取某个阶段的所有学习内容
export function getPhaseLessons(phase: LearningPhase['id']): DayLesson[] {
  return dailyLearningPath.filter(lesson => lesson.phase === phase);
}

// 获取总学习天数
export function getTotalDays(): number {
  return dailyLearningPath.length;
}

// 基础评估题目（用于定位起始学习位置）
export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  suggestDay: number; // 根据答案建议从哪天开始
}

export const assessmentQuestions: AssessmentQuestion[] = [
  // ==================== 基础入门（Day 1-14）测验 ====================
  // Day 1: C++简介与Hello World
  {
    id: 1,
    question: '以下哪个是正确的C++输出语句？',
    options: ['print("Hello")', 'cout << "Hello"', 'Console.WriteLine("Hello")', 'printf("Hello")'],
    correctAnswer: 1,
    topic: '输入输出',
    difficulty: 'easy',
    suggestDay: 1,
  },
  {
    id: 2,
    question: 'C++程序的入口函数是？',
    options: ['start()', 'main()', 'run()', 'begin()'],
    correctAnswer: 1,
    topic: '程序结构',
    difficulty: 'easy',
    suggestDay: 1,
  },
  {
    id: 3,
    question: '下列哪个头文件是正确的？',
    options: ['#include <iostream>', '#import iostream', '#include iostream', 'using iostream'],
    correctAnswer: 0,
    topic: '头文件',
    difficulty: 'easy',
    suggestDay: 1,
  },
  // Day 2: 变量与数据类型
  {
    id: 4,
    question: 'int类型的数据范围大约是？',
    options: ['-128到127', '-32768到32767', '-21亿到21亿', '无限制'],
    correctAnswer: 2,
    topic: '数据类型',
    difficulty: 'easy',
    suggestDay: 2,
  },
  {
    id: 5,
    question: '以下哪个是合法的变量名？',
    options: ['2name', 'my-name', '_count', 'int'],
    correctAnswer: 2,
    topic: '变量命名',
    difficulty: 'easy',
    suggestDay: 2,
  },
  {
    id: 6,
    question: 'double类型比float类型？',
    options: ['精度更低', '精度更高', '精度相同', '无法比较'],
    correctAnswer: 1,
    topic: '数据类型',
    difficulty: 'easy',
    suggestDay: 2,
  },
  {
    id: 7,
    question: 'char类型占用的内存大小是？',
    options: ['1字节', '2字节', '4字节', '8字节'],
    correctAnswer: 0,
    topic: '数据类型',
    difficulty: 'easy',
    suggestDay: 2,
  },
  // Day 3-4: 运算符
  {
    id: 8,
    question: '表达式 17 / 5 的结果是？',
    options: ['3', '3.4', '4', '2'],
    correctAnswer: 0,
    topic: '算术运算',
    difficulty: 'easy',
    suggestDay: 3,
  },
  {
    id: 9,
    question: '表达式 17 % 5 的结果是？',
    options: ['3', '2', '3.4', '0'],
    correctAnswer: 1,
    topic: '取余运算',
    difficulty: 'easy',
    suggestDay: 3,
  },
  {
    id: 10,
    question: 'int a = 5; int b = a++; 执行后a和b的值分别是？',
    options: ['a=6, b=6', 'a=6, b=5', 'a=5, b=5', 'a=5, b=6'],
    correctAnswer: 1,
    topic: '自增运算',
    difficulty: 'medium',
    suggestDay: 3,
  },
  {
    id: 11,
    question: '表达式 5 > 3 && 2 < 1 的结果是？',
    options: ['true', 'false', '1', '编译错误'],
    correctAnswer: 1,
    topic: '逻辑运算',
    difficulty: 'easy',
    suggestDay: 4,
  },
  // Day 5-6: 选择结构
  {
    id: 12,
    question: 'if语句后的花括号可以省略的情况是？',
    options: ['永远不能省略', '只有一条语句时可以省略', '任何时候都可以省略', '有多条语句时可以省略'],
    correctAnswer: 1,
    topic: 'if语句',
    difficulty: 'easy',
    suggestDay: 5,
  },
  {
    id: 13,
    question: 'switch语句中，用于跳出当前case的关键字是？',
    options: ['continue', 'break', 'return', 'exit'],
    correctAnswer: 1,
    topic: 'switch语句',
    difficulty: 'easy',
    suggestDay: 5,
  },
  {
    id: 14,
    question: '三元运算符 a > b ? a : b 的作用是？',
    options: ['返回较小的值', '返回较大的值', '返回a', '返回b'],
    correctAnswer: 1,
    topic: '三元运算符',
    difficulty: 'medium',
    suggestDay: 6,
  },
  {
    id: 15,
    question: '以下代码输出什么？\nint x = 10;\nif (x = 5) { cout << "A"; } else { cout << "B"; }',
    options: ['A', 'B', '编译错误', '无输出'],
    correctAnswer: 0,
    topic: '条件判断',
    difficulty: 'hard',
    suggestDay: 5,
  },
  // Day 7-9: 循环结构
  {
    id: 16,
    question: 'for(int i=0; i<10; i++) 循环会执行多少次？',
    options: ['9次', '10次', '11次', '无限次'],
    correctAnswer: 1,
    topic: 'for循环',
    difficulty: 'easy',
    suggestDay: 7,
  },
  {
    id: 17,
    question: 'while循环和do-while循环的主要区别是？',
    options: ['没有区别', 'do-while至少执行一次', 'while至少执行一次', 'do-while执行更快'],
    correctAnswer: 1,
    topic: '循环结构',
    difficulty: 'easy',
    suggestDay: 8,
  },
  {
    id: 18,
    question: '以下代码输出什么？\nfor(int i=0; i<5; i++) {\n  if(i==3) break;\n  cout << i;\n}',
    options: ['01234', '012', '0123', '1234'],
    correctAnswer: 1,
    topic: 'break语句',
    difficulty: 'medium',
    suggestDay: 9,
  },
  {
    id: 19,
    question: '以下代码输出什么？\nfor(int i=0; i<5; i++) {\n  if(i==3) continue;\n  cout << i;\n}',
    options: ['01234', '012', '0124', '1234'],
    correctAnswer: 2,
    topic: 'continue语句',
    difficulty: 'medium',
    suggestDay: 9,
  },
  {
    id: 20,
    question: '嵌套循环中，break语句的作用范围是？',
    options: ['跳出所有循环', '只跳出最内层循环', '只跳出最外层循环', '跳出if语句'],
    correctAnswer: 1,
    topic: '嵌套循环',
    difficulty: 'medium',
    suggestDay: 9,
  },
  // Day 10: 一维数组
  {
    id: 21,
    question: '数组a[10]的有效下标范围是？',
    options: ['1到10', '0到9', '0到10', '1到9'],
    correctAnswer: 1,
    topic: '数组',
    difficulty: 'easy',
    suggestDay: 10,
  },
  {
    id: 22,
    question: '以下哪种方式可以正确初始化数组？',
    options: ['int arr[5] = {1,2,3};', 'int arr = {1,2,3,4,5};', 'int arr[5] = 1,2,3,4,5;', 'int arr(5) = {1,2,3,4,5};'],
    correctAnswer: 0,
    topic: '数组初始化',
    difficulty: 'easy',
    suggestDay: 10,
  },
  {
    id: 23,
    question: '访问数组时越界会怎样？',
    options: ['编译错误', '运行时报错', '可能访问到非法内存', '自动返回0'],
    correctAnswer: 2,
    topic: '数组越界',
    difficulty: 'medium',
    suggestDay: 10,
  },
  // Day 11: 二维数组
  {
    id: 24,
    question: 'int arr[3][4] 表示一个？',
    options: ['3行4列的二维数组', '4行3列的二维数组', '3个元素的一维数组', '4个元素的一维数组'],
    correctAnswer: 0,
    topic: '二维数组',
    difficulty: 'easy',
    suggestDay: 11,
  },
  {
    id: 25,
    question: '访问二维数组arr的第i行第j列元素的正确方式是？',
    options: ['arr[i][j]', 'arr[j][i]', 'arr(i,j)', 'arr[i,j]'],
    correctAnswer: 0,
    topic: '二维数组访问',
    difficulty: 'easy',
    suggestDay: 11,
  },
  {
    id: 26,
    question: '3x3数组主对角线上的元素满足？',
    options: ['i == j', 'i + j == 2', 'i < j', 'i > j'],
    correctAnswer: 0,
    topic: '矩阵对角线',
    difficulty: 'medium',
    suggestDay: 11,
  },
  // Day 12: 结构体
  {
    id: 27,
    question: '定义结构体时，末尾应该有？',
    options: ['逗号', '分号', '冒号', '什么都没有'],
    correctAnswer: 1,
    topic: '结构体定义',
    difficulty: 'easy',
    suggestDay: 12,
  },
  {
    id: 28,
    question: '如何访问结构体变量stu的成员name？',
    options: ['stu->name', 'stu.name', 'stu[name]', 'stu::name'],
    correctAnswer: 1,
    topic: '结构体成员',
    difficulty: 'easy',
    suggestDay: 12,
  },
  {
    id: 29,
    question: '结构体指针ptr访问成员name的正确方式是？',
    options: ['*ptr.name', 'ptr.name', 'ptr->name', '&ptr->name'],
    correctAnswer: 2,
    topic: '结构体指针',
    difficulty: 'medium',
    suggestDay: 12,
  },
  // Day 13: 字符串
  {
    id: 30,
    question: 'string s = "Hello"; s.length() 返回？',
    options: ['4', '5', '6', '编译错误'],
    correctAnswer: 1,
    topic: '字符串长度',
    difficulty: 'easy',
    suggestDay: 13,
  },
  {
    id: 31,
    question: 'cin >> s 遇到空格会怎样？',
    options: ['读取整个句子', '停止读取', '跳过空格继续', '报错'],
    correctAnswer: 1,
    topic: '字符串输入',
    difficulty: 'easy',
    suggestDay: 13,
  },
  {
    id: 32,
    question: '读取包含空格的字符串应该用？',
    options: ['cin >> s', 'getline(cin, s)', 'scanf("%s", s)', 'read(s)'],
    correctAnswer: 1,
    topic: '字符串输入',
    difficulty: 'easy',
    suggestDay: 13,
  },
  // ==================== 基础算法（Day 15+）测验 ====================
  {
    id: 33,
    question: '冒泡排序的时间复杂度是？',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 2,
    topic: '排序算法',
    difficulty: 'medium',
    suggestDay: 17,
  },
  {
    id: 34,
    question: '二分查找的前提条件是？',
    options: ['数组有序', '数组无序', '数组长度为偶数', '数组元素互不相同'],
    correctAnswer: 0,
    topic: '二分查找',
    difficulty: 'medium',
    suggestDay: 22,
  },
  {
    id: 35,
    question: 'DFS和BFS分别使用什么数据结构实现？',
    options: ['栈和队列', '队列和栈', '数组和链表', '链表和数组'],
    correctAnswer: 0,
    topic: '搜索算法',
    difficulty: 'medium',
    suggestDay: 36,
  },
  {
    id: 36,
    question: '01背包问题的时间复杂度是O(nW)，其中W是？',
    options: ['物品数量', '背包容量', '物品总价值', '最大重量'],
    correctAnswer: 1,
    topic: '动态规划',
    difficulty: 'medium',
    suggestDay: 42,
  },
  {
    id: 37,
    question: 'Dijkstra算法不能处理哪种情况？',
    options: ['有向图', '无向图', '负权边', '稀疏图'],
    correctAnswer: 2,
    topic: '最短路',
    difficulty: 'hard',
    suggestDay: 48,
  },
  {
    id: 38,
    question: '线段树的时间复杂度优势在于？',
    options: ['建树O(n)', '查询O(1)', '区间操作O(log n)', '空间O(1)'],
    correctAnswer: 2,
    topic: '数据结构',
    difficulty: 'hard',
    suggestDay: 57,
  },
];

// 根据评估结果建议起始学习天数
export function suggestStartDay(correctCount: number, totalQuestions: number): number {
  const accuracy = correctCount / totalQuestions;
  
  if (accuracy < 0.3) {
    return 1; // 从头开始
  } else if (accuracy < 0.5) {
    return 7; // 从循环开始
  } else if (accuracy < 0.7) {
    return 15; // 从基础算法开始
  } else if (accuracy < 0.9) {
    return 36; // 从进阶开始
  } else {
    return 71; // 从高级开始
  }
}

// 获取基础入门阶段（Day 1-14）的测验题目
export function getFoundationQuizQuestions(): AssessmentQuestion[] {
  return assessmentQuestions.filter(q => q.suggestDay <= 14);
}

// 获取指定阶段的测验题目
export function getPhaseQuizQuestions(phaseId: string): AssessmentQuestion[] {
  const phaseDayRanges: Record<string, { min: number; max: number }> = {
    foundation: { min: 1, max: 14 },
    basic: { min: 15, max: 35 },
    intermediate: { min: 36, max: 70 },
    advanced: { min: 71, max: 100 },
    competition: { min: 101, max: 120 },
  };
  
  const range = phaseDayRanges[phaseId];
  if (!range) return [];
  
  return assessmentQuestions.filter(q => q.suggestDay >= range.min && q.suggestDay <= range.max);
}

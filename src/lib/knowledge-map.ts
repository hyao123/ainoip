// 知识点分类
export interface KnowledgeCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// 知识点
export interface KnowledgePoint {
  id: number;
  slug: string; // 用于匹配学习路径中的topic id
  title: string;
  icon: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'competition';
  brief: string;
  description: string;
  content: string[];
  kidFriendly?: {
    analogy: string;
    visualization: string;
    whyLearn: string;
  };
  codeExamples?: {
    title: string;
    description: string;
    code: string;
    input?: string;
    expectedOutput?: string;
    explanation: string[];
  }[];
  commonMistakes?: {
    mistake: string;
    why: string;
    correctWay: string;
  }[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  codeExample?: string;
  prerequisites: number[];
  recommendedProblems: number[];
  videoUrl?: string;
  readTime: number;
}

// 分类数据
export const categories: KnowledgeCategory[] = [
  { id: 'basics', name: '基础语法', icon: '📝', description: 'C++/Python基础语法和编程规范' },
  { id: 'data-structures', name: '数据结构', icon: '🏗️', description: '数组、链表、栈、队列、树、图等' },
  { id: 'algorithms', name: '基础算法', icon: '⚡', description: '排序、搜索、贪心、分治等' },
  { id: 'dp', name: '动态规划', icon: '🎯', description: '背包、区间DP、状态压缩等' },
  { id: 'graph', name: '图论', icon: '🕸️', description: '最短路、生成树、网络流等' },
  { id: 'math', name: '数学', icon: '🔢', description: '数论、组合数学、博弈论等' },
  { id: 'string', name: '字符串', icon: '🔤', description: 'KMP、Trie、AC自动机等' },
  { id: 'advanced', name: '进阶算法', icon: '🚀', description: '线段树、树链剖分、后缀数组等' },
];

// 知识点数据 - 完整版
export const knowledgePoints: KnowledgePoint[] = [
  // ==================== 基础入门 ====================
  {
    id: 1,
    slug: 'intro-cpp',
    title: 'C++简介',
    icon: '👋',
    category: 'basics',
    difficulty: 'basic',
    brief: '认识C++编程语言，了解它的历史和特点',
    description: 'C++是一种强大的编程语言，它可以让你指挥计算机完成各种任务。就像你用中文和朋友交流一样，C++是你和计算机交流的语言。',
    content: [
      'C++是什么？一种让计算机听懂你指令的语言',
      'C++的历史：由Bjarne Stroustrup在1983年创造',
      'C++的特点：运行速度快、功能强大',
      '为什么学C++？NOIP竞赛官方语言之一',
      'C++能做什么？游戏、软件、网站后台...',
    ],
    kidFriendly: {
      analogy: '想象C++就像一本魔法书，里面写满了咒语（代码）。当你念出这些咒语，电脑就会按照你的命令做事。比如显示文字、计算数学题、甚至制作游戏！',
      visualization: '🏛️ C++就像建造房子的工具箱，你可以用各种工具（命令）来建造你想要的任何东西。',
      whyLearn: '学会C++，你就能参加NOIP编程竞赛，还能自己制作小游戏！很多著名的游戏（如《我的世界》）都是用C++写的。'
    },
    codeExamples: [
      {
        title: '第一个C++程序',
        description: '让电脑显示一句话',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "你好，世界！" << endl;
    return 0;
}`,
        expectedOutput: '你好，世界！',
        explanation: [
          '#include 是"包含"的意思，iostream是"输入输出流"',
          'cout 发音是"C-out"，意思是"从C++输出"',
          '每个语句后面都要加分号 ; 就像每句话结束要加句号',
          'return 0 表示程序成功运行完毕',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记加分号 ;',
        why: 'C++需要分号来知道一句话结束了',
        correctWay: '每条语句结束都要加 ;'
      },
    ],
    quiz: {
      question: 'C++程序从哪里开始执行？',
      options: ['从第一行开始', '从main函数开始', '从#include开始', '从return 0开始'],
      answer: 1,
      explanation: 'C++程序总是从main函数开始执行。'
    },
    prerequisites: [],
    recommendedProblems: [1, 2, 3],
    readTime: 15,
  },
  {
    id: 2,
    slug: 'hello-world',
    title: 'Hello World',
    icon: '🌍',
    category: 'basics',
    difficulty: 'basic',
    brief: '编写你的第一个程序，向世界问好',
    description: 'Hello World是所有程序员学习新语言时写的第一个程序。',
    content: [
      '什么是Hello World程序？',
      '程序的基本结构：头文件、命名空间、主函数',
      '如何输出文字到屏幕？',
      '编译和运行程序',
      '理解每个部分的作用',
    ],
    kidFriendly: {
      analogy: '写程序就像写作文。作文有开头、中间、结尾，程序也有固定的格式。Hello World就是最简单的"作文"。',
      visualization: '📝 程序结构：\n┌─────────────────────┐\n│ #include（引入工具）  │\n│ main()（开始做事）    │\n│   cout（输出内容）    │\n│ return 0（结束）      │\n└─────────────────────┘',
      whyLearn: '这是你编程旅程的第一步！学会它，你就能让电脑显示任何你想说的话。'
    },
    codeExamples: [
      {
        title: '输出多行文字',
        description: '使用endl换行',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    cout << "你好，世界！" << endl;
    cout << "I love programming!" << endl;
    return 0;
}`,
        expectedOutput: 'Hello World!\n你好，世界！\nI love programming!',
        explanation: [
          'endl 表示换行，相当于按回车键',
          '每个cout语句输出一行内容',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记写using namespace std;',
        why: '编译器不知道cout是什么',
        correctWay: '在开头加上using namespace std; 或者写std::cout'
      },
    ],
    quiz: {
      question: 'endl的作用是什么？',
      options: ['结束程序', '换行', '暂停', '清屏'],
      answer: 1,
      explanation: 'endl的作用是换行，让后面的内容显示在新的一行。'
    },
    prerequisites: [1],
    recommendedProblems: [1, 2, 19],
    readTime: 10,
  },
  {
    id: 3,
    slug: 'compile-run',
    title: '编译与运行',
    icon: '▶️',
    category: 'basics',
    difficulty: 'basic',
    brief: '学会如何让程序跑起来',
    description: '程序写好后，需要编译成电脑能理解的语言，然后才能运行。',
    content: [
      '什么是编译？把代码翻译成机器语言',
      '编译器的作用：检查错误、生成可执行文件',
      '如何编译C++程序？',
      '如何运行编译后的程序？',
      '常见编译错误及解决方法',
    ],
    kidFriendly: {
      analogy: '编译就像翻译。你用C++写的代码，电脑看不懂，需要"翻译官"（编译器）把它翻译成电脑能理解的机器语言。',
      visualization: '📝 编译过程：\n源代码(.cpp) → 编译器 → 机器码 → 运行 → 结果',
      whyLearn: '理解编译过程，遇到错误时你才能知道怎么修改。'
    },
    codeExamples: [
      {
        title: '编译运行流程',
        description: '命令行编译运行',
        code: `// 步骤1：保存代码为 hello.cpp
// 步骤2：打开命令行，输入：
// g++ hello.cpp -o hello
// 步骤3：运行程序
// ./hello  (Linux/Mac)
// hello.exe (Windows)`,
        explanation: [
          'g++是C++编译器',
          '-o hello 表示输出文件名为hello',
          '运行生成的可执行文件就能看到结果',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '修改代码后忘记重新编译',
        why: '运行的还是旧程序',
        correctWay: '每次修改代码后都要重新编译'
      },
    ],
    quiz: {
      question: '编译器的作用是什么？',
      options: ['运行程序', '把代码翻译成机器语言', '写代码', '删除程序'],
      answer: 1,
      explanation: '编译器把人类可读的代码翻译成机器能执行的语言。'
    },
    prerequisites: [1, 2],
    recommendedProblems: [1, 2, 3],
    readTime: 15,
  },
  {
    id: 4,
    slug: 'variables',
    title: '变量的概念',
    icon: '📦',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习如何在程序中存储数据',
    description: '变量就像盒子，可以存放各种数据。你可以把数字、文字放进去，以后再用。',
    content: [
      '什么是变量？存储数据的容器',
      '变量的命名规则：字母、数字、下划线',
      '变量命名的好习惯：见名知意',
      '变量的声明和初始化',
      '变量的赋值和修改',
    ],
    kidFriendly: {
      analogy: '变量就像一个个带标签的盒子。你在盒子上写上名字（变量名），然后把东西（数据）放进去。以后想用的时候，只要说"打开写着xxx的盒子"就行了。',
      visualization: '📦 变量示意：\n┌─────────┐\n│  age    │ → 盒子名称\n│   10    │ → 盒子里装的东西\n└─────────┘',
      whyLearn: '没有变量，程序就记不住任何东西！学会变量，你才能让程序记住用户输入的数据。'
    },
    codeExamples: [
      {
        title: '声明和使用变量',
        description: '创建变量并存储数据',
        code: `#include <iostream>
using namespace std;

int main() {
    // 声明变量
    int age;        // 声明一个整数变量
    age = 10;       // 给变量赋值
    
    // 声明并初始化
    int score = 100;
    
    // 输出变量的值
    cout << "年龄：" << age << endl;
    cout << "分数：" << score << endl;
    
    // 修改变量的值
    age = age + 1;  // 年龄加1
    cout << "明年年龄：" << age << endl;
    
    return 0;
}`,
        expectedOutput: '年龄：10\n分数：100\n明年年龄：11',
        explanation: [
          'int 是整数类型，用来存储没有小数的数字',
          '先声明，后使用',
          '变量可以被多次赋值，后面的值会覆盖前面的',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '使用未初始化的变量',
        why: '变量里可能有垃圾数据',
        correctWay: '声明变量时最好立即初始化'
      },
      {
        mistake: '变量名用数字开头',
        why: 'C++不允许变量名以数字开头',
        correctWay: '变量名以字母或下划线开头'
      },
    ],
    quiz: {
      question: '下列哪个变量名是正确的？',
      options: ['1name', 'my-name', 'myName', 'class'],
      answer: 2,
      explanation: '变量名不能以数字开头，不能含减号，不能是关键字。myName是正确的。'
    },
    prerequisites: [1, 2],
    recommendedProblems: [1, 2, 21],
    readTime: 20,
  },
  {
    id: 5,
    slug: 'data-types',
    title: '基本数据类型',
    icon: '📊',
    category: 'basics',
    difficulty: 'basic',
    brief: '了解C++中的不同数据类型',
    description: '不同的数据需要不同类型的盒子来存储。整数用int，小数用double，字符用char。',
    content: [
      '整数类型：int, long long',
      '浮点类型：float, double',
      '字符类型：char',
      '布尔类型：bool',
      '字符串类型：string',
      '如何选择合适的数据类型？',
    ],
    kidFriendly: {
      analogy: '数据类型就像不同形状的盒子。整数盒子只能放整数，小数盒子可以放小数，字符盒子只能放一个字符。用错盒子，东西就装不进去。',
      visualization: '📦 数据类型盒子：\n[int] → 整数盒子\n[double] → 小数盒子\n[char] → 单字符盒子\n[string] → 字符串盒子',
      whyLearn: '选对数据类型，程序才能正确处理数据。比如算年龄用整数，算价格用小数。'
    },
    codeExamples: [
      {
        title: '各种数据类型',
        description: '声明不同类型的变量',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // 整数类型
    int age = 10;
    long long bigNumber = 1000000000000;
    
    // 浮点类型
    double price = 3.14;
    
    // 字符类型
    char grade = 'A';
    
    // 字符串类型
    string name = "小明";
    
    // 布尔类型
    bool isStudent = true;
    
    cout << "姓名：" << name << endl;
    cout << "年龄：" << age << endl;
    cout << "成绩：" << grade << endl;
    cout << "价格：" << price << endl;
    
    return 0;
}`,
        expectedOutput: '姓名：小明\n年龄：10\n成绩：A\n价格：3.14',
        explanation: [
          'int 存储整数，范围约-21亿到21亿',
          'long long 存储更大的整数',
          'double 存储小数，精度高',
          'char 用单引号，存储单个字符',
          'string 用双引号，存储一串字符',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '用int存储超出范围的数',
        why: 'int范围有限，超过会溢出',
        correctWay: '大数用long long'
      },
      {
        mistake: '字符用双引号',
        why: '双引号是字符串，单引号才是字符',
        correctWay: 'char c = \'A\'; // 单引号'
      },
    ],
    quiz: {
      question: '存储3.14应该用什么类型？',
      options: ['int', 'char', 'double', 'bool'],
      answer: 2,
      explanation: '3.14是小数，应该用double类型存储。'
    },
    prerequisites: [4],
    recommendedProblems: [1, 21, 22],
    readTime: 25,
  },
  {
    id: 6,
    slug: 'int-range',
    title: '整数范围',
    icon: '📏',
    category: 'basics',
    difficulty: 'basic',
    brief: '理解整数类型的取值范围',
    description: '每种整数类型能存储的数值都有上限。超出范围就会溢出，导致程序出错。',
    content: [
      'int的范围：约-21亿到21亿',
      'long long的范围：约-9×10^18到9×10^18',
      '什么是溢出？',
      '如何判断是否需要long long？',
      'NOIP中常见的数值范围',
    ],
    kidFriendly: {
      analogy: '想象一个计数器，最大只能显示9999。如果你数到9999再加1，它不会变成10000，而是变成0000！这就是溢出。',
      visualization: '📏 整数范围：\nint: -2,147,483,648 ~ 2,147,483,647\nlong long: 约 ±9.2×10^18',
      whyLearn: '很多题目的答案会超过int范围，用错类型就会WA（答案错误）。'
    },
    codeExamples: [
      {
        title: '观察溢出',
        description: 'int溢出演示',
        code: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    cout << "int最大值：" << INT_MAX << endl;
    cout << "int最小值：" << INT_MIN << endl;
    
    int a = INT_MAX;
    a = a + 1;  // 溢出！
    cout << "溢出后：" << a << endl;
    
    // 正确做法：用long long
    long long b = 1000000000000LL;
    cout << "大数：" << b << endl;
    
    return 0;
}`,
        explanation: [
          'INT_MAX是int的最大值',
          '超出范围会变成负数或错误的值',
          '超过10位数最好用long long',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '计算过程溢出',
        why: '中间结果超过int范围',
        correctWay: '计算前先用long long'
      },
    ],
    quiz: {
      question: 'int能存储的最大值约为？',
      options: ['10亿', '21亿', '100亿', '1万亿'],
      answer: 1,
      explanation: 'int的最大值约为21亿（2^31-1）。'
    },
    prerequisites: [4, 5],
    recommendedProblems: [21, 22, 38],
    readTime: 15,
  },
  {
    id: 7,
    slug: 'cin-cout',
    title: 'cin和cout',
    icon: '📤',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习输入和输出',
    description: 'cin用于从键盘读取输入，cout用于向屏幕输出结果。',
    content: [
      'cout输出：把内容显示到屏幕',
      'cin输入：从键盘读取数据',
      '连续输入输出',
      'endl和\\n的区别',
      '输入输出的格式控制',
    ],
    kidFriendly: {
      analogy: 'cout就像电脑的嘴巴，能把信息说出来给你看。cin就像电脑的耳朵，能听你输入的话。',
      visualization: '⌨️ 输入输出流程：\n键盘 → cin → 程序 → cout → 屏幕',
      whyLearn: '没有输入，程序只能做固定的事。有了输入，程序就能根据用户的需求来工作。'
    },
    codeExamples: [
      {
        title: '输入输出示例',
        description: '读取用户输入并输出',
        code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    
    // 输入两个数
    cin >> a >> b;
    
    // 计算并输出
    cout << "和：" << a + b << endl;
    cout << "差：" << a - b << endl;
    cout << "积：" << a * b << endl;
    
    return 0;
}`,
        input: '3 5',
        expectedOutput: '和：8\n差：-2\n积：15',
        explanation: [
          'cin >> a 表示从键盘读取一个数存到a中',
          '>> 可以连续使用读取多个值',
          '用空格或回车分隔输入的多个值',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '>>和<<搞反',
        why: 'cin用>>，cout用<<',
        correctWay: 'cin >> a; cout << a;'
      },
    ],
    quiz: {
      question: '从键盘读取一个数应该用？',
      options: ['cout >>', 'cin <<', 'cin >>', 'cout <<'],
      answer: 2,
      explanation: 'cin用于输入，使用>>运算符。'
    },
    prerequisites: [4, 5],
    recommendedProblems: [1, 19, 20],
    readTime: 20,
  },
  {
    id: 8,
    slug: 'scanf-printf',
    title: 'scanf和printf',
    icon: '🖨️',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习C风格的输入输出',
    description: 'scanf和printf是C语言的输入输出函数，在C++中也能使用，有时候比cin/cout更快。',
    content: [
      'printf格式化输出',
      'scanf格式化输入',
      '格式说明符：%d, %lld, %f, %c, %s',
      'cin/cout和scanf/printf的区别',
      '什么时候用scanf/printf？',
    ],
    kidFriendly: {
      analogy: 'printf就像填空题，你先写好模板，然后把数据填进去。比如"我今年%d岁"，%d就是空格，等会儿填上年龄。',
      visualization: '📝 格式说明符：\n%d → int\n%lld → long long\n%f → float/double\n%c → char\n%s → string',
      whyLearn: 'scanf/printf比cin/cout快，数据量大时用scanf/printf不容易超时。'
    },
    codeExamples: [
      {
        title: 'scanf和printf示例',
        description: '格式化输入输出',
        code: `#include <cstdio>
using namespace std;

int main() {
    int a, b;
    
    // 输入两个整数
    scanf("%d%d", &a, &b);
    
    // 输出结果
    printf("a = %d, b = %d\\n", a, b);
    printf("a + b = %d\\n", a + b);
    
    // 输出浮点数，保留2位小数
    double x = 3.14159;
    printf("x = %.2f\\n", x);
    
    return 0;
}`,
        input: '10 20',
        expectedOutput: 'a = 10, b = 20\na + b = 30\nx = 3.14',
        explanation: [
          '%d表示整数，%lld表示long long',
          '&a表示变量a的地址，scanf需要地址',
          '%.2f表示保留2位小数',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'scanf忘记写&',
        why: 'scanf需要变量的地址',
        correctWay: 'scanf("%d", &a); // 别忘&'
      },
    ],
    quiz: {
      question: 'printf输出long long应该用什么格式？',
      options: ['%d', '%lld', '%f', '%s'],
      answer: 1,
      explanation: 'long long用%lld格式。'
    },
    prerequisites: [7],
    recommendedProblems: [19, 20, 22],
    readTime: 20,
  },
  {
    id: 9,
    slug: 'file-io',
    title: '文件输入输出',
    icon: '📁',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习从文件读取和写入',
    description: 'NOIP竞赛中，有时需要从文件读取输入，把结果写入文件。',
    content: [
      'freopen重定向输入输出',
      'ifstream和ofstream',
      'NOIP中的文件操作',
      '为什么需要文件输入输出？',
      '文件操作的注意事项',
    ],
    kidFriendly: {
      analogy: '文件输入输出就像从本子上读题，把答案写到另一个本子上。而不是老师直接说题目，你口头回答。',
      visualization: '📁 文件操作：\n输入文件 → 程序 → 输出文件\n（而不是 键盘 → 程序 → 屏幕）',
      whyLearn: 'NOIP有些题目要求从文件读数据、把结果写到文件，这是比赛的基本要求。'
    },
    codeExamples: [
      {
        title: 'freopen示例',
        description: '重定向标准输入输出到文件',
        code: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    // 重定向输入到data.in
    freopen("data.in", "r", stdin);
    // 重定向输出到data.out
    freopen("data.out", "w", stdout);
    
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    
    // 文件会自动关闭
    return 0;
}`,
        explanation: [
          'freopen把标准输入输出重定向到文件',
          '"r"表示读，"w"表示写',
          '之后cin/cout就从文件读写',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记关闭文件',
        why: '可能导致数据没有写入',
        correctWay: '程序结束前fclose或让程序自动关闭'
      },
    ],
    quiz: {
      question: 'freopen("a.in", "r", stdin)的作用是？',
      options: ['写入文件', '从文件读取', '删除文件', '创建文件'],
      answer: 1,
      explanation: '这行代码把标准输入重定向到a.in文件。'
    },
    prerequisites: [7, 8],
    recommendedProblems: [1, 19, 20],
    readTime: 15,
  },
  {
    id: 10,
    slug: 'arithmetic',
    title: '算术运算符',
    icon: '➕',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习加减乘除取余运算',
    description: 'C++支持各种数学运算：加、减、乘、除、取余。',
    content: [
      '加法 + 和减法 -',
      '乘法 * 和除法 /',
      '取余运算 %',
      '整数除法的特点',
      '自增++和自减--',
    ],
    kidFriendly: {
      analogy: '运算符就像计算器上的按键。+是加，-是减，*是乘，/是除，%是取余数。让电脑帮你算数学题！',
      visualization: '🔢 运算符：\n+ 加法\n- 减法\n* 乘法\n/ 除法\n% 取余\n++ 自增\n-- 自减',
      whyLearn: '编程中经常需要进行各种计算，学会运算符是编程的基础。'
    },
    codeExamples: [
      {
        title: '算术运算示例',
        description: '各种运算演示',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;
    
    cout << "a + b = " << a + b << endl;  // 13
    cout << "a - b = " << a - b << endl;  // 7
    cout << "a * b = " << a * b << endl;  // 30
    cout << "a / b = " << a / b << endl;  // 3（整数除法）
    cout << "a % b = " << a % b << endl;  // 1（余数）
    
    // 自增自减
    int c = 5;
    c++;  // c变成6
    cout << "c++ 后 c = " << c << endl;
    
    return 0;
}`,
        expectedOutput: 'a + b = 13\na - b = 7\na * b = 30\na / b = 3\na % b = 1\nc++ 后 c = 6',
        explanation: [
          '整数除法会舍去小数部分',
          '%取余只能用于整数',
          'a++ 相当于 a = a + 1',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '整数相除想得到小数',
        why: '10/3=3，不是3.33',
        correctWay: '用浮点数：(double)10/3 或 10.0/3'
      },
    ],
    quiz: {
      question: '17 % 5 的结果是？',
      options: ['3', '2', '3.4', '17'],
      answer: 1,
      explanation: '17除以5等于3余2，所以17%5=2。'
    },
    prerequisites: [4, 5],
    recommendedProblems: [22, 26, 38],
    readTime: 20,
  },
  {
    id: 11,
    slug: 'expression',
    title: '表达式',
    icon: '📝',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习表达式的组成和计算',
    description: '表达式是由运算符和操作数组成的式子，可以计算出一个值。',
    content: [
      '什么是表达式？',
      '表达式的组成：操作数和运算符',
      '表达式的值',
      '赋值表达式',
      '复合赋值运算符',
    ],
    kidFriendly: {
      analogy: '表达式就像数学算式。3 + 5是一个表达式，它的值是8。a = 10也是表达式，它的作用是把10存到a里面。',
      visualization: '📝 表达式示例：\n3 + 5 → 值为8\na * 2 → 值为a的两倍\na = 10 → 把10赋给a',
      whyLearn: '程序中大部分计算都通过表达式完成，理解表达式是编程基础。'
    },
    codeExamples: [
      {
        title: '表达式示例',
        description: '各种表达式',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 5;
    
    // 算术表达式
    cout << "a + b = " << a + b << endl;
    
    // 赋值表达式
    int c = a + b;  // 先计算a+b，再赋给c
    cout << "c = " << c << endl;
    
    // 复合赋值
    c += 5;  // 相当于 c = c + 5
    cout << "c += 5 后 c = " << c << endl;
    
    c *= 2;  // 相当于 c = c * 2
    cout << "c *= 2 后 c = " << c << endl;
    
    return 0;
}`,
        expectedOutput: 'a + b = 15\nc = 15\nc += 5 后 c = 20\nc *= 2 后 c = 40',
        explanation: [
          '表达式会计算出结果',
          '+=、-=、*=、/=、%=是复合赋值运算符',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '== 和 = 混淆',
        why: '== 是判断相等，= 是赋值',
        correctWay: 'if (a == b) 判断；a = b 赋值'
      },
    ],
    quiz: {
      question: 'a += 3 等价于？',
      options: ['a = 3', 'a + 3', 'a = a + 3', 'a == 3'],
      answer: 2,
      explanation: 'a += 3 是复合赋值，等价于 a = a + 3。'
    },
    prerequisites: [10],
    recommendedProblems: [22, 26, 38],
    readTime: 15,
  },
  {
    id: 12,
    slug: 'operator-order',
    title: '运算优先级',
    icon: '🔢',
    category: 'basics',
    difficulty: 'basic',
    brief: '理解运算符的优先级和结合性',
    description: '当表达式中有多个运算符时，按照优先级顺序计算。',
    content: [
      '优先级规则：先乘除后加减',
      '括号可以改变优先级',
      '常见运算符优先级表',
      '结合性：从左到右还是从右到左',
      '写代码时的最佳实践',
    ],
    kidFriendly: {
      analogy: '运算优先级就像数学里的"先乘除后加减"。3 + 5 * 2先算乘法，得到13，不是16。',
      visualization: '📊 优先级（从高到低）：\n1. () 括号\n2. * / %\n3. + -\n4. 赋值运算符',
      whyLearn: '理解优先级才能写出正确的计算表达式，避免结果出错。'
    },
    codeExamples: [
      {
        title: '优先级示例',
        description: '观察运算顺序',
        code: `#include <iostream>
using namespace std;

int main() {
    // 先乘除后加减
    cout << "3 + 5 * 2 = " << 3 + 5 * 2 << endl;  // 13
    
    // 用括号改变顺序
    cout << "(3 + 5) * 2 = " << (3 + 5) * 2 << endl;  // 16
    
    // 取余和乘除同级，从左到右
    cout << "10 % 3 * 2 = " << 10 % 3 * 2 << endl;  // 4
    
    // 复杂表达式
    int a = 2, b = 3, c = 4;
    int result = a + b * c - a * b;
    cout << "a + b * c - a * b = " << result << endl;  // 8
    
    return 0;
}`,
        expectedOutput: '3 + 5 * 2 = 13\n(3 + 5) * 2 = 16\n10 % 3 * 2 = 4\na + b * c - a * b = 8',
        explanation: [
          '*和/优先级高于+和-',
          '同级运算从左到右计算',
          '不确定时用括号明确优先级',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记优先级规则',
        why: '计算结果和预期不同',
        correctWay: '复杂表达式用括号明确顺序'
      },
    ],
    quiz: {
      question: '2 + 3 * 4 - 1 的结果是？',
      options: ['15', '13', '11', '20'],
      answer: 1,
      explanation: '先算3*4=12，然后2+12-1=13。'
    },
    prerequisites: [10, 11],
    recommendedProblems: [22, 26, 38],
    readTime: 15,
  },
  // ==================== 条件语句 ====================
  {
    id: 13,
    slug: 'if-else',
    title: 'if-else语句',
    icon: '❓',
    category: 'basics',
    difficulty: 'basic',
    brief: '让程序学会做选择',
    description: 'if-else语句让程序能够根据条件做出不同的选择，就像"如果下雨就带伞，否则不带"。',
    content: [
      'if语句：如果条件成立就执行',
      'if-else语句：二选一',
      'else if语句：多选一',
      '条件表达式的写法',
      '代码块和缩进',
    ],
    kidFriendly: {
      analogy: 'if-else就像生活中的选择。比如：如果作业写完了，就可以玩游戏；否则，继续写作业。程序也能根据条件做不同的事。',
      visualization: '🔀 条件分支：\n┌─────────────┐\n│ 如果(条件)  │\n│   执行A     │\n│ 否则        │\n│   执行B     │\n└─────────────┘',
      whyLearn: '没有条件语句，程序只能从头到尾执行一遍。学会它，程序就能变得"聪明"，能根据情况做不同的事情。'
    },
    codeExamples: [
      {
        title: 'if-else示例',
        description: '判断成绩等级',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;
    
    if (score >= 90) {
        cout << "优秀！" << endl;
    } else if (score >= 80) {
        cout << "良好！" << endl;
    } else if (score >= 60) {
        cout << "及格" << endl;
    } else {
        cout << "需要加油！" << endl;
    }
    
    return 0;
}`,
        input: '85',
        expectedOutput: '良好！',
        explanation: [
          'if后面的括号里写条件',
          '条件成立执行对应代码块',
          'else if可以写多个',
          'else处理其他所有情况',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'if后面加分号',
        why: '分号会结束if语句',
        correctWay: 'if (条件) { ... } 不要加分号'
      },
    ],
    quiz: {
      question: 'score=75，上面的程序输出什么？',
      options: ['优秀！', '良好！', '及格', '需要加油！'],
      answer: 2,
      explanation: '75>=60但<80，所以输出"及格"。'
    },
    prerequisites: [4, 5, 7],
    recommendedProblems: [24, 25, 26],
    readTime: 25,
  },
  {
    id: 14,
    slug: 'comparison',
    title: '比较运算符',
    icon: '⚖️',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习如何比较两个值',
    description: '比较运算符用于比较两个值的大小关系，结果是true或false。',
    content: [
      '等于 == 和不等于 !=',
      '大于 > 和小于 <',
      '大于等于 >= 和小于等于 <=',
      '比较的结果是布尔值',
      '常见错误：= 和 == 的区别',
    ],
    kidFriendly: {
      analogy: '比较运算符就像天平。你把两个东西放上去，它会告诉你哪边重，或者两边一样重。程序用比较的结果来决定下一步做什么。',
      visualization: '⚖️ 比较运算符：\n== 相等\n!= 不等\n> 大于\n< 小于\n>= 大于等于\n<= 小于等于',
      whyLearn: '条件判断需要比较两个值，学会比较运算符才能写出正确的条件。'
    },
    codeExamples: [
      {
        title: '比较运算符示例',
        description: '各种比较',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 10;
    
    cout << (a == b) << endl;  // 0 (false)
    cout << (a != b) << endl;  // 1 (true)
    cout << (a < b) << endl;   // 1 (true)
    cout << (a >= b) << endl;  // 0 (false)
    
    // 用于条件判断
    if (a < b) {
        cout << "a比b小" << endl;
    }
    
    return 0;
}`,
        expectedOutput: '0\n1\n1\n0\na比b小',
        explanation: [
          '比较结果是布尔值：true(1)或false(0)',
          '== 是判断相等，= 是赋值',
          '比较结果可以直接用于if条件',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'if (a = 5) 写成赋值',
        why: '结果是5，永远为真',
        correctWay: 'if (a == 5) 判断是否等于5'
      },
    ],
    quiz: {
      question: 'a=3, b=5，a <= b的结果是？',
      options: ['false', 'true', '3', '5'],
      answer: 1,
      explanation: '3<=5成立，结果是true。'
    },
    prerequisites: [13],
    recommendedProblems: [24, 25, 26],
    readTime: 15,
  },
  {
    id: 15,
    slug: 'nested-if',
    title: '嵌套条件',
    icon: '🎯',
    category: 'basics',
    difficulty: 'basic',
    brief: '在条件里面再套条件',
    description: 'if语句里面还可以再写if语句，形成多层判断。',
    content: [
      '什么是嵌套？if里面有if',
      '嵌套if的执行流程',
      '嵌套层数的控制',
      '用else if代替深层嵌套',
      '代码缩进的重要性',
    ],
    kidFriendly: {
      analogy: '嵌套就像俄罗斯套娃，大娃娃里面有小娃娃，小娃娃里面还有更小的娃娃。程序里，大判断里面有小判断。',
      visualization: '🎯 嵌套结构：\n如果(条件1) {\n  如果(条件2) {\n    如果(条件3) {\n      执行...\n    }\n  }\n}',
      whyLearn: '有些问题需要多层判断才能解决，比如先判断是不是学生，再判断是几年级。'
    },
    codeExamples: [
      {
        title: '嵌套if示例',
        description: '判断闰年',
        code: `#include <iostream>
using namespace std;

int main() {
    int year;
    cin >> year;
    
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                cout << "闰年" << endl;
            } else {
                cout << "平年" << endl;
            }
        } else {
            cout << "闰年" << endl;
        }
    } else {
        cout << "平年" << endl;
    }
    
    return 0;
}`,
        input: '2020',
        expectedOutput: '闰年',
        explanation: [
          '闰年规则：能被4整除但不能被100整除，或能被400整除',
          '嵌套if逐步判断',
          '也可以用逻辑运算符简化',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '嵌套层数太多',
        why: '代码难以阅读',
        correctWay: '用逻辑运算符或提前return简化'
      },
    ],
    quiz: {
      question: '2000年是闰年吗？',
      options: ['是', '不是', '无法判断', '要看月份'],
      answer: 0,
      explanation: '2000能被400整除，所以是闰年。'
    },
    prerequisites: [13, 14],
    recommendedProblems: [24, 25, 26],
    readTime: 20,
  },
  {
    id: 16,
    slug: 'logical-ops',
    title: '逻辑运算符',
    icon: '🔗',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习与、或、非运算',
    description: '逻辑运算符可以把多个条件组合起来，形成更复杂的条件。',
    content: [
      '与运算 &&：两个条件都成立',
      '或运算 ||：至少一个成立',
      '非运算 !：取反',
      '逻辑运算的优先级',
      '短路求值',
    ],
    kidFriendly: {
      analogy: '逻辑运算符就像生活中的连接词。"我要吃饭，而且我要喝汤"是&&。"我要吃饭，或者我要喝汤"是||。"我不饿"是!。',
      visualization: '🔗 逻辑运算：\n&& 与（都真才真）\n|| 或（有真就真）\n!  非（真变假，假变真）',
      whyLearn: '很多问题需要同时满足多个条件，逻辑运算符让你能表达复杂的条件。'
    },
    codeExamples: [
      {
        title: '逻辑运算符示例',
        description: '组合条件',
        code: `#include <iostream>
using namespace std;

int main() {
    int age = 15;
    int score = 85;
    
    // 与运算：两个条件都要满足
    if (age >= 10 && age <= 18) {
        cout << "是青少年" << endl;
    }
    
    // 或运算：满足一个即可
    if (score >= 90 || score >= 85 && age < 16) {
        cout << "表现优秀！" << endl;
    }
    
    // 非运算
    bool isRaining = false;
    if (!isRaining) {
        cout << "可以出去玩" << endl;
    }
    
    return 0;
}`,
        expectedOutput: '是青少年\n表现优秀！\n可以出去玩',
        explanation: [
          '&& 两边都为true结果才为true',
          '|| 一边为true结果就为true',
          '! 可以把true变成false',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '写成 a >= 10 && <= 18',
        why: '必须完整写出两个条件',
        correctWay: 'a >= 10 && a <= 18'
      },
    ],
    quiz: {
      question: 'true && false 的结果是？',
      options: ['true', 'false', 'error', 'null'],
      answer: 1,
      explanation: '&&需要两边都为true，结果是false。'
    },
    prerequisites: [13, 14],
    recommendedProblems: [24, 25, 26],
    readTime: 20,
  },
  {
    id: 17,
    slug: 'complex-conditions',
    title: '复杂条件',
    icon: '🧩',
    category: 'basics',
    difficulty: 'basic',
    brief: '学会组合多个条件',
    description: '用逻辑运算符组合多个比较条件，形成复杂的判断逻辑。',
    content: [
      '多个条件的组合',
      '优先级：! > && > ||',
      '用括号明确优先级',
      '常见复杂条件模式',
      '如何简化复杂条件',
    ],
    kidFriendly: {
      analogy: '复杂条件就像超市的优惠规则："买满100元，且是会员，或者使用优惠券，就能打折"。多个条件组合在一起。',
      visualization: '🧩 示例：\n(a > 0 && b > 0) || c == 0\n表示：a和b都大于0，或者c等于0',
      whyLearn: '实际问题往往需要复杂的判断条件，学会组合条件能解决更多问题。'
    },
    codeExamples: [
      {
        title: '复杂条件示例',
        description: '判断三角形类型',
        code: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    
    // 先判断能否构成三角形
    if (a + b > c && b + c > a && a + c > b) {
        // 判断是否是等边三角形
        if (a == b && b == c) {
            cout << "等边三角形" << endl;
        }
        // 判断是否是等腰三角形
        else if (a == b || b == c || a == c) {
            cout << "等腰三角形" << endl;
        }
        // 判断是否是直角三角形
        else if (a*a + b*b == c*c || 
                 b*b + c*c == a*a || 
                 a*a + c*c == b*b) {
            cout << "直角三角形" << endl;
        }
        else {
            cout << "普通三角形" << endl;
        }
    } else {
        cout << "不能构成三角形" << endl;
    }
    
    return 0;
}`,
        input: '3 4 5',
        expectedOutput: '直角三角形',
        explanation: [
          '三角形条件：任意两边之和大于第三边',
          '多个条件用&&连接',
          '直角条件用勾股定理判断',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记括号导致优先级错误',
        why: '&&优先级高于||',
        correctWay: '用括号明确表达意图'
      },
    ],
    quiz: {
      question: 'a=1, b=2, c=3，a || b && c的结果是？',
      options: ['0', '1', '2', '3'],
      answer: 1,
      explanation: '&&优先级高，先算b&&c=1，再算a||1=1。'
    },
    prerequisites: [15, 16],
    recommendedProblems: [24, 25, 26],
    readTime: 25,
  },
  {
    id: 18,
    slug: 'short-circuit',
    title: '短路求值',
    icon: '⚡',
    category: 'basics',
    difficulty: 'basic',
    brief: '理解逻辑运算的短路特性',
    description: '在逻辑运算中，如果前面的条件已经能确定结果，后面的条件就不会再计算。',
    content: [
      '什么是短路求值？',
      '&&的短路：遇到false就停止',
      '||的短路：遇到true就停止',
      '短路求值的应用',
      '注意事项',
    ],
    kidFriendly: {
      analogy: '短路求值就像快速判断。比如检查"有没有作业 AND 有没有笔"，如果发现没作业，就不用检查有没有笔了——反正也写不了。',
      visualization: '⚡ 短路规则：\nfalse && ? → 不看?，直接false\ntrue || ? → 不看?，直接true',
      whyLearn: '利用短路求值可以避免不必要的计算，还可以防止运行时错误。'
    },
    codeExamples: [
      {
        title: '短路求值示例',
        description: '避免除零错误',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 0, b = 10;
    
    // 利用短路避免除零错误
    if (a != 0 && b / a > 5) {
        cout << "条件成立" << endl;
    } else {
        cout << "条件不成立" << endl;
    }
    // a!=0为false，不会计算b/a，避免错误
    
    // 另一个例子
    int x = 5;
    if (x > 0 || x / 0) {  // 不会计算x/0
        cout << "x是正数" << endl;
    }
    
    return 0;
}`,
        expectedOutput: '条件不成立\nx是正数',
        explanation: [
          '&&遇到false就停止，不计算后面',
          '||遇到true就停止，不计算后面',
          '可以用来避免运行时错误',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '依赖后面的条件产生副作用',
        why: '短路时后面不会执行',
        correctWay: '不要在条件里做有副作用的操作'
      },
    ],
    quiz: {
      question: 'false && (1/0) 会报错吗？',
      options: ['会报错', '不会报错', '结果为true', '不确定'],
      answer: 1,
      explanation: '由于短路求值，(1/0)不会被执行。'
    },
    prerequisites: [16, 17],
    recommendedProblems: [24, 25, 26],
    readTime: 15,
  },
  // ==================== 循环语句 ====================
  {
    id: 19,
    slug: 'for-loop',
    title: 'for循环',
    icon: '🔄',
    category: 'basics',
    difficulty: 'basic',
    brief: '让程序重复执行',
    description: 'for循环是使用最多的循环结构，适合已知循环次数的情况。',
    content: [
      'for循环的三个部分：初始化、条件、更新',
      '循环变量的作用',
      '循环体的执行过程',
      '常见循环模式',
      '如何确定循环次数',
    ],
    kidFriendly: {
      analogy: 'for循环就像体育课跑圈。"从起跑线开始，跑够10圈，每跑一圈就数一下"。程序也是，从一开始，满足条件就继续，每次做完更新一下。',
      visualization: '🔄 for循环结构：\nfor (起点; 终点条件; 步进) {\n    重复做的事\n}',
      whyLearn: '很多任务需要重复做，比如计算1到100的和、打印九九乘法表。循环让这些变得简单。'
    },
    codeExamples: [
      {
        title: 'for循环示例',
        description: '计算1到n的和',
        code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int sum = 0;
    // i从1开始，每次加1，直到超过n
    for (int i = 1; i <= n; i++) {
        sum = sum + i;  // 或者 sum += i;
    }
    
    cout << "1到" << n << "的和是" << sum << endl;
    return 0;
}`,
        input: '10',
        expectedOutput: '1到10的和是55',
        explanation: [
          'int i = 1：初始化，i从1开始',
          'i <= n：条件，满足才继续循环',
          'i++：每次循环后i加1',
          '循环执行10次，sum累加1到10',
        ]
      },
      {
        title: '打印九九乘法表',
        description: '嵌套for循环',
        code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j << "*" << i << "=" << i*j << " ";
        }
        cout << endl;
    }
    return 0;
}`,
        expectedOutput: '1*1=1 \n1*2=2 2*2=4 \n...',
        explanation: [
          '外层循环控制行，内层循环控制列',
          '每行结束后换行',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'for后面加分号',
        why: '循环体为空，只执行初始化和更新',
        correctWay: 'for (...) { ... } 不加分号'
      },
      {
        mistake: '循环变量超出范围',
        why: '可能导致数组越界等问题',
        correctWay: '仔细检查边界条件'
      },
    ],
    quiz: {
      question: 'for (int i = 0; i < 5; i++) 循环执行几次？',
      options: ['4次', '5次', '6次', '无限次'],
      answer: 1,
      explanation: 'i从0到4，共5次。'
    },
    prerequisites: [13, 14],
    recommendedProblems: [27, 28, 29],
    readTime: 30,
  },
  {
    id: 20,
    slug: 'loop-variable',
    title: '循环变量',
    icon: '🔢',
    category: 'basics',
    difficulty: 'basic',
    brief: '理解循环变量的作用',
    description: '循环变量控制循环的次数和过程，理解它的工作方式很重要。',
    content: [
      '循环变量的声明位置',
      '循环变量的生命周期',
      '循环变量的修改',
      '多层循环的变量命名',
      '循环变量的常见用法',
    ],
    kidFriendly: {
      analogy: '循环变量就像计数器。你每做一次，计数器就加1，直到达到目标数字就停下来。',
      visualization: '🔢 循环变量变化：\nfor i=1,2,3,4,5:\n  第1次: i=1\n  第2次: i=2\n  ...\n  第5次: i=5\n  结束',
      whyLearn: '正确使用循环变量，才能控制循环执行正确的次数。'
    },
    codeExamples: [
      {
        title: '循环变量用法',
        description: '不同用法示例',
        code: `#include <iostream>
using namespace std;

int main() {
    // 递增循环
    cout << "递增：";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    
    // 递减循环
    cout << "递减：";
    for (int i = 5; i >= 1; i--) {
        cout << i << " ";
    }
    cout << endl;
    
    // 步长为2
    cout << "奇数：";
    for (int i = 1; i <= 10; i += 2) {
        cout << i << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '递增：1 2 3 4 5\n递减：5 4 3 2 1\n奇数：1 3 5 7 9',
        explanation: [
          'i++表示每次加1',
          'i--表示每次减1',
          'i += 2表示每次加2',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '在循环内错误修改循环变量',
        why: '可能导致死循环或提前结束',
        correctWay: '只在for语句中修改，或明确修改目的'
      },
    ],
    quiz: {
      question: 'for (int i = 10; i > 0; i -= 2) 循环几次？',
      options: ['5次', '10次', '4次', '无限次'],
      answer: 0,
      explanation: 'i=10,8,6,4,2共5次，i=0时退出。'
    },
    prerequisites: [19],
    recommendedProblems: [27, 28, 29],
    readTime: 15,
  },
  {
    id: 21,
    slug: 'loop-patterns',
    title: '常见循环模式',
    icon: '📐',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习常见的循环使用模式',
    description: '循环有很多经典用法，掌握这些模式能解决大部分问题。',
    content: [
      '累加模式：求和、计数',
      '累乘模式：求阶乘',
      '查找模式：找最大值、最小值',
      '遍历模式：处理每个元素',
      '验证模式：检查条件',
    ],
    kidFriendly: {
      analogy: '循环模式就像乐高积木的基本形状。掌握几种基本形状，就能拼出各种东西。',
      visualization: '📐 常见模式：\n累加: sum = 0; for(...) sum += x\n累乘: prod = 1; for(...) prod *= x\n找最大: max = a[0]; for(...) if(a[i]>max) max=a[i]',
      whyLearn: '掌握这些模式，写程序就像搭积木一样简单。'
    },
    codeExamples: [
      {
        title: '常见模式示例',
        description: '多种循环模式',
        code: `#include <iostream>
using namespace std;

int main() {
    // 累加模式：求和
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    cout << "1到100的和：" << sum << endl;
    
    // 累乘模式：阶乘
    int n = 5;
    int fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    cout << "5的阶乘：" << fact << endl;
    
    // 查找模式：找最大值
    int maxVal = 0;
    for (int i = 0; i < 5; i++) {
        int x;
        cin >> x;
        if (x > maxVal) maxVal = x;
    }
    cout << "最大值：" << maxVal << endl;
    
    return 0;
}`,
        explanation: [
          '累加：从初始值开始不断加',
          '累乘：从初始值开始不断乘',
          '找最大：先假设一个最大值，然后逐个比较',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '累加初始值不是0',
        why: '会导致结果偏大或偏小',
        correctWay: '累加从0开始，累乘从1开始'
      },
    ],
    quiz: {
      question: '求阶乘时，初始值应该是？',
      options: ['0', '1', '-1', '不确定'],
      answer: 1,
      explanation: '乘法从1开始，因为任何数乘1还是它本身。'
    },
    prerequisites: [19, 20],
    recommendedProblems: [27, 28, 38],
    readTime: 20,
  },
  {
    id: 22,
    slug: 'while-loop',
    title: 'while循环',
    icon: '🔁',
    category: 'basics',
    difficulty: 'basic',
    brief: '条件为真就一直循环',
    description: 'while循环在条件为真时一直执行，适合不确定循环次数的情况。',
    content: [
      'while循环的语法',
      'while和for的区别',
      '什么时候用while？',
      '死循环的产生和避免',
      'while循环的常见用法',
    ],
    kidFriendly: {
      analogy: 'while循环就像"如果还有作业，就继续写"。你不知道要写多久，只知道写完为止。而for循环像"写10遍单词"，次数是确定的。',
      visualization: '🔁 while结构：\nwhile (条件) {\n    重复做的事\n}\n条件为真就继续',
      whyLearn: '有些时候我们不知道要循环几次，只知道停止条件，这时就用while。'
    },
    codeExamples: [
      {
        title: 'while循环示例',
        description: '读取输入直到0',
        code: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    int n;
    
    // 读取数字，直到输入0为止
    cin >> n;
    while (n != 0) {
        sum += n;
        cin >> n;
    }
    
    cout << "总和：" << sum << endl;
    return 0;
}`,
        input: '5 3 8 2 0',
        expectedOutput: '总和：18',
        explanation: [
          '先读取第一个数',
          '如果不是0就加到sum，继续读',
          '遇到0就退出循环',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记更新循环变量',
        why: '条件永远不变，变成死循环',
        correctWay: '确保循环体内有改变条件的操作'
      },
    ],
    quiz: {
      question: 'while(1)是什么循环？',
      options: ['执行1次', '执行0次', '死循环', '语法错误'],
      answer: 2,
      explanation: '1为真，条件永远成立，是死循环。'
    },
    prerequisites: [19],
    recommendedProblems: [2, 27, 28],
    readTime: 20,
  },
  {
    id: 23,
    slug: 'do-while',
    title: 'do-while循环',
    icon: '🔃',
    category: 'basics',
    difficulty: 'basic',
    brief: '先执行一次再判断',
    description: 'do-while循环先执行一次循环体，再判断条件是否继续。',
    content: [
      'do-while的语法',
      'do-while和while的区别',
      '什么时候用do-while？',
      '常见的do-while应用',
      '注意事项',
    ],
    kidFriendly: {
      analogy: 'do-while就像"先吃一口菜，如果好吃就继续吃"。不管怎样都会先执行一次。而while是"如果菜好吃，才开始吃"。',
      visualization: '🔃 do-while结构：\ndo {\n    先执行一次\n} while (条件);',
      whyLearn: '有些情况需要先做一次，再决定要不要继续，这时用do-while最合适。'
    },
    codeExamples: [
      {
        title: 'do-while示例',
        description: '菜单选择',
        code: `#include <iostream>
using namespace std;

int main() {
    int choice;
    
    do {
        cout << "请选择：" << endl;
        cout << "1. 开始游戏" << endl;
        cout << "2. 设置" << endl;
        cout << "0. 退出" << endl;
        cin >> choice;
        
        if (choice == 1) {
            cout << "游戏开始！" << endl;
        } else if (choice == 2) {
            cout << "打开设置" << endl;
        }
    } while (choice != 0);
    
    cout << "再见！" << endl;
    return 0;
}`,
        explanation: [
          '菜单至少显示一次',
          '用户选择0才退出',
          '适合需要至少执行一次的情况',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'while后面忘记分号',
        why: '语法错误',
        correctWay: '} while (条件); // 别忘了分号'
      },
    ],
    quiz: {
      question: 'do-while至少执行几次？',
      options: ['0次', '1次', '2次', '不确定'],
      answer: 1,
      explanation: 'do-while先执行再判断，所以至少执行1次。'
    },
    prerequisites: [22],
    recommendedProblems: [2, 27, 28],
    readTime: 15,
  },
  {
    id: 24,
    slug: 'loop-choice',
    title: '循环选择',
    icon: '🤔',
    category: 'basics',
    difficulty: 'basic',
    brief: '如何选择合适的循环类型',
    description: 'for、while、do-while各有适用场景，选择合适的循环能让代码更清晰。',
    content: [
      'for：已知循环次数',
      'while：未知次数，可能0次',
      'do-while：至少执行1次',
      '循环选择的判断标准',
      '循环类型的转换',
    ],
    kidFriendly: {
      analogy: '选循环就像选工具。已知要跑几圈用for（比如跑10圈），不知道要跑多久用while（比如跑到累为止），至少跑一圈用do-while。',
      visualization: '🤔 选择标准：\n知道次数 → for\n不知道次数，可能0次 → while\n至少执行1次 → do-while',
      whyLearn: '选对循环类型，代码更简洁，也更容易理解。'
    },
    codeExamples: [
      {
        title: '循环选择示例',
        description: '同一问题的不同实现',
        code: `#include <iostream>
using namespace std;

int main() {
    // 用for：已知循环10次
    int sum1 = 0;
    for (int i = 1; i <= 10; i++) {
        sum1 += i;
    }
    cout << "for结果：" << sum1 << endl;
    
    // 用while：读数直到0
    int sum2 = 0, n = 1;
    while (n != 0) {
        cin >> n;
        sum2 += n;
    }
    cout << "while结果：" << sum2 << endl;
    
    return 0;
}`,
        explanation: [
          '已知次数用for最简洁',
          '不确定次数用while',
          '其实三种循环可以互相转换',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '用while实现已知次数的循环',
        why: '代码冗长，不如for清晰',
        correctWay: '已知次数优先用for'
      },
    ],
    quiz: {
      question: '统计输入的数字个数，以-1结束，用哪种循环？',
      options: ['for', 'while', 'do-while', '都可以'],
      answer: 1,
      explanation: '不确定次数，可能一开始就是-1，用while最合适。'
    },
    prerequisites: [19, 22, 23],
    recommendedProblems: [27, 28, 29],
    readTime: 15,
  },
  {
    id: 25,
    slug: 'nested-loops',
    title: '嵌套循环',
    icon: '🎯',
    category: 'basics',
    difficulty: 'basic',
    brief: '循环里面套循环',
    description: '嵌套循环用于处理二维结构，比如表格、图形、矩阵等。',
    content: [
      '什么是嵌套循环？',
      '嵌套循环的执行过程',
      '二维遍历',
      '打印图形',
      '嵌套循环的时间复杂度',
    ],
    kidFriendly: {
      analogy: '嵌套循环就像钟表的时针和分针。时针走一格，分针要走一圈。外层循环是时针，内层循环是分针。',
      visualization: '🎯 嵌套结构：\nfor (外层) {\n    for (内层) {\n        执行次数 = 外层次数 × 内层次数\n    }\n}',
      whyLearn: '处理二维数组、打印图形、生成排列组合都需要嵌套循环。'
    },
    codeExamples: [
      {
        title: '嵌套循环示例',
        description: '打印矩形和三角形',
        code: `#include <iostream>
using namespace std;

int main() {
    // 打印5x5矩形
    cout << "矩形：" << endl;
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            cout << "* ";
        }
        cout << endl;
    }
    
    // 打印直角三角形
    cout << "三角形：" << endl;
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "* ";
        }
        cout << endl;
    }
    
    return 0;
}`,
        expectedOutput: '矩形：\n* * * * *\n...\n三角形：\n*\n* *\n...',
        explanation: [
          '外层控制行，内层控制列',
          '矩形每行星号数相同',
          '三角形每行星号数递增',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '内层循环条件用错变量',
        why: '导致输出不符合预期',
        correctWay: '仔细检查内层条件是否正确'
      },
    ],
    quiz: {
      question: '两层循环分别执行m次和n次，总共执行几次循环体？',
      options: ['m+n', 'm*n', 'm^n', 'max(m,n)'],
      answer: 1,
      explanation: '外层每执行一次，内层执行n次，总共m*n次。'
    },
    prerequisites: [19, 20],
    recommendedProblems: [28, 29, 70],
    readTime: 25,
  },
  {
    id: 26,
    slug: 'break-continue',
    title: 'break和continue',
    icon: '⏹️',
    category: 'basics',
    difficulty: 'basic',
    brief: '控制循环的执行流程',
    description: 'break用于提前退出循环，continue用于跳过本次迭代。',
    content: [
      'break：立即退出循环',
      'continue：跳过本次，继续下一次',
      '在嵌套循环中的作用',
      '使用场景',
      '注意事项',
    ],
    kidFriendly: {
      analogy: 'break就像"不跑了，回家"。continue就像"这圈不算，重新跑"。break是彻底退出，continue只是跳过这一次。',
      visualization: '⏹️ 控制语句：\nbreak → 立即退出整个循环\ncontinue → 跳过本次，继续下一次',
      whyLearn: '有时候需要在特定条件下提前结束或跳过某次循环，这两个关键字就派上用场了。'
    },
    codeExamples: [
      {
        title: 'break和continue示例',
        description: '找第一个能被7整除的数',
        code: `#include <iostream>
using namespace std;

int main() {
    // break示例：找到就停止
    cout << "第一个能被7整除的数（10-20）：" << endl;
    for (int i = 10; i <= 20; i++) {
        if (i % 7 == 0) {
            cout << i << endl;
            break;  // 找到就退出
        }
    }
    
    // continue示例：跳过偶数
    cout << "1-10的奇数：" << endl;
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue;  // 跳过偶数
        }
        cout << i << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '第一个能被7整除的数（10-20）：\n14\n1-10的奇数：\n1 3 5 7 9',
        explanation: [
          'break执行后立即退出循环',
          'continue跳过本次，继续下一次循环',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '在嵌套循环中break只退出内层',
        why: 'break只影响最近的一层循环',
        correctWay: '如需退出外层，用标志变量或goto'
      },
    ],
    quiz: {
      question: 'for循环中执行continue后，循环变量会更新吗？',
      options: ['不会更新', '会更新', '取决于条件', '会结束循环'],
      answer: 1,
      explanation: 'continue只是跳过本次循环体，for的更新语句仍会执行。'
    },
    prerequisites: [19, 22],
    recommendedProblems: [27, 28, 29],
    readTime: 15,
  },
  // ==================== 数组 ====================
  {
    id: 27,
    slug: 'array-intro',
    title: '数组概念',
    icon: '📦',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '存储多个相同类型的数据',
    description: '数组是一组相同类型数据的集合，通过下标访问每个元素。',
    content: [
      '什么是数组？一组连续的存储空间',
      '数组的声明和初始化',
      '数组下标从0开始',
      '访问数组元素',
      '数组的长度',
    ],
    kidFriendly: {
      analogy: '数组就像一排储物柜，每个柜子有编号。你可以在1号柜放书，2号柜放笔，3号柜放橡皮。要找的时候只要说"几号柜"就行了。',
      visualization: '📦 数组示意：\n┌───┬───┬───┬───┬───┐\n│ 3 │ 1 │ 4 │ 1 │ 5 │\n└───┴───┴───┴───┴───┘\n  [0] [1] [2] [3] [4]  ← 下标从0开始',
      whyLearn: '如果有很多数据要存储，用变量太麻烦。用数组，一个名字就能管理很多数据。'
    },
    codeExamples: [
      {
        title: '数组基本操作',
        description: '声明、访问、遍历',
        code: `#include <iostream>
using namespace std;

int main() {
    // 声明数组，长度为5
    int arr[5];
    
    // 初始化
    int scores[5] = {90, 85, 92, 78, 88};
    
    // 访问元素
    cout << "第一个成绩：" << scores[0] << endl;
    cout << "第三个成绩：" << scores[2] << endl;
    
    // 修改元素
    scores[1] = 95;
    
    // 遍历数组
    cout << "所有成绩：";
    for (int i = 0; i < 5; i++) {
        cout << scores[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '第一个成绩：90\n第三个成绩：92\n所有成绩：90 95 92 78 88',
        explanation: [
          '数组声明：类型 名字[长度]',
          '下标从0开始，最大是长度-1',
          '用循环遍历数组所有元素',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '数组下标越界',
        why: '访问不存在的元素，程序崩溃',
        correctWay: '确保下标在0到长度-1之间'
      },
    ],
    quiz: {
      question: 'int arr[5]有几个元素？最大下标是？',
      options: ['5个，下标最大5', '5个，下标最大4', '6个，下标最大5', '5个，下标最大6'],
      answer: 1,
      explanation: '数组有5个元素，下标从0到4，最大下标是4。'
    },
    prerequisites: [4, 5, 19],
    recommendedProblems: [30, 31, 32],
    readTime: 30,
  },
  {
    id: 28,
    slug: 'array-declare',
    title: '数组声明',
    icon: '📋',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '学习如何声明和初始化数组',
    description: '数组可以有多种声明和初始化方式。',
    content: [
      '声明数组的基本语法',
      '数组的初始化方式',
      '部分初始化',
      '数组的大小必须是常量',
      'C++11的初始化方式',
    ],
    kidFriendly: {
      analogy: '声明数组就像告诉电脑"我要一排5个柜子"。初始化就是在声明的时候顺便往柜子里放东西。',
      visualization: '📋 声明方式：\nint arr[5];  // 5个柜子，空的\nint arr[5] = {1,2,3,4,5};  // 放好东西\nint arr[] = {1,2,3};  // 自动数3个',
      whyLearn: '正确声明数组是使用数组的第一步。'
    },
    codeExamples: [
      {
        title: '数组声明方式',
        description: '各种初始化方法',
        code: `#include <iostream>
using namespace std;

int main() {
    // 方式1：先声明，后赋值
    int arr1[5];
    arr1[0] = 1; arr1[1] = 2;
    
    // 方式2：完全初始化
    int arr2[5] = {1, 2, 3, 4, 5};
    
    // 方式3：省略大小
    int arr3[] = {1, 2, 3};  // 自动确定长度为3
    
    // 方式4：部分初始化（其他为0）
    int arr4[5] = {1, 2};  // {1, 2, 0, 0, 0}
    
    // 方式5：全部初始化为0
    int arr5[5] = {};  // {0, 0, 0, 0, 0}
    
    cout << arr2[0] << " " << arr3[2] << endl;
    
    return 0;
}`,
        expectedOutput: '1 3',
        explanation: [
          '数组大小必须是编译时常量',
          '部分初始化时，未指定的元素自动为0',
          'C++11可以用{}初始化',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '用变量做数组大小',
        why: '标准C++数组大小必须是常量',
        correctWay: '用常量或const，或用vector'
      },
    ],
    quiz: {
      question: 'int arr[5] = {1, 2}，arr[4]的值是？',
      options: ['未定义', '0', '2', '错误'],
      answer: 1,
      explanation: '部分初始化时，未指定的元素自动初始化为0。'
    },
    prerequisites: [27],
    recommendedProblems: [30, 31, 32],
    readTime: 20,
  },
  {
    id: 29,
    slug: 'array-access',
    title: '数组访问',
    icon: '🔍',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '学习如何访问数组元素',
    description: '通过下标可以访问和修改数组中的元素。',
    content: [
      '下标访问：arr[i]',
      '下标的范围：0到size-1',
      '越界访问的危险',
      '遍历数组的常见方法',
      '用变量作为下标',
    ],
    kidFriendly: {
      analogy: '访问数组就像打开储物柜。你告诉电脑"打开3号柜"，它就给你看里面的东西。但注意，电脑从0开始数，所以第一个柜子是0号。',
      visualization: '🔍 访问示意：\narr[0] → 第1个\narr[1] → 第2个\n...\narr[n-1] → 第n个',
      whyLearn: '正确访问数组元素是使用数组的核心技能。'
    },
    codeExamples: [
      {
        title: '数组访问示例',
        description: '读写数组元素',
        code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    
    // 读取元素
    cout << "arr[0] = " << arr[0] << endl;
    
    // 用变量作为下标
    int i = 2;
    cout << "arr[" << i << "] = " << arr[i] << endl;
    
    // 修改元素
    arr[0] = 100;
    cout << "修改后 arr[0] = " << arr[0] << endl;
    
    // 遍历所有元素
    for (int j = 0; j < 5; j++) {
        cout << arr[j] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: 'arr[0] = 10\narr[2] = 30\n修改后 arr[0] = 100\n100 20 30 40 50',
        explanation: [
          '下标可以是变量或表达式',
          '修改元素直接赋值即可',
          '遍历时注意下标范围',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '下标越界',
        why: '访问不存在的元素，可能导致程序崩溃',
        correctWay: '确保下标在有效范围内'
      },
    ],
    quiz: {
      question: 'arr[10]访问了数组arr的第几个元素？',
      options: ['第10个', '第11个', '第9个', '不确定'],
      answer: 1,
      explanation: '下标从0开始，arr[10]是第11个元素。'
    },
    prerequisites: [27, 28],
    recommendedProblems: [30, 31, 32],
    readTime: 15,
  },
  {
    id: 30,
    slug: 'array-ops',
    title: '数组操作',
    icon: '🛠️',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '学习数组的常见操作',
    description: '对数组进行查找、插入、删除等操作。',
    content: [
      '查找元素：线性查找',
      '插入元素',
      '删除元素',
      '数组反转',
      '数组复制',
    ],
    kidFriendly: {
      analogy: '数组操作就像整理书架。查找是找某本书在哪，插入是把新书放进去，删除是把书拿出来，反转是把书倒着摆。',
      visualization: '🛠️ 常见操作：\n查找：从前往后一个个看\n插入：后面的往后移，腾位置\n删除：后面的往前移，填空位\n反转：首尾交换',
      whyLearn: '数组操作是最基础的编程技能，很多算法都建立在这些操作之上。'
    },
    codeExamples: [
      {
        title: '数组操作示例',
        description: '查找、删除、反转',
        code: `#include <iostream>
using namespace std;

int main() {
    int arr[10] = {1, 3, 5, 7, 9, 2, 4, 6, 8, 10};
    int n = 10;
    
    // 查找元素5的位置
    int pos = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == 5) {
            pos = i;
            break;
        }
    }
    cout << "5的位置：" << pos << endl;
    
    // 删除位置2的元素
    for (int i = 2; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    n--;
    
    // 反转数组
    for (int i = 0; i < n / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = temp;
    }
    
    // 输出
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '5的位置：2\n10 8 6 4 2 9 7 3 1',
        explanation: [
          '查找：遍历比较',
          '删除：后面元素前移',
          '反转：首尾交换',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '删除后忘记更新长度',
        why: '访问到无效数据',
        correctWay: '用一个变量记录实际元素个数'
      },
    ],
    quiz: {
      question: '长度为n的数组，反转需要交换几次？',
      options: ['n次', 'n/2次', 'n-1次', '2n次'],
      answer: 1,
      explanation: '首尾配对交换，总共n/2对。'
    },
    prerequisites: [27, 28, 29],
    recommendedProblems: [30, 31, 44],
    readTime: 25,
  },
  {
    id: 31,
    slug: 'array-search',
    title: '数组查找',
    icon: '🔎',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '在数组中查找元素',
    description: '学习如何在数组中查找特定的元素。',
    content: [
      '线性查找：从头到尾找',
      '查找第一个匹配的位置',
      '查找所有匹配的位置',
      '查找最大值和最小值',
      '统计元素出现次数',
    ],
    kidFriendly: {
      analogy: '查找就像在一堆书中找特定的书。线性查找是从第一本开始一本本翻，找到为止。虽然笨，但是可靠。',
      visualization: '🔎 线性查找：\n[3, 1, 4, 1, 5]\n ↓  ↓  ✓\n找4：比较3次找到',
      whyLearn: '查找是最常用的操作之一，几乎每个程序都会用到。'
    },
    codeExamples: [
      {
        title: '数组查找示例',
        description: '各种查找操作',
        code: `#include <iostream>
using namespace std;

int main() {
    int arr[8] = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = 8;
    
    // 查找第一个5的位置
    int pos = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == 5) {
            pos = i;
            break;
        }
    }
    cout << "5的位置：" << pos << endl;
    
    // 找最大值
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    cout << "最大值：" << maxVal << endl;
    
    // 统计1出现几次
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == 1) count++;
    }
    cout << "1出现" << count << "次" << endl;
    
    return 0;
}`,
        expectedOutput: '5的位置：4\n最大值：9\n1出现2次',
        explanation: [
          '查找用循环遍历',
          '找最大值：假设第一个最大，逐个比较',
          '计数：满足条件就加1',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '找最大值时初始值设为0',
        why: '如果所有元素都是负数，结果错误',
        correctWay: '初始值设为数组第一个元素'
      },
    ],
    quiz: {
      question: '在[1,3,5,7,9]中用线性查找找3，比较几次？',
      options: ['1次', '2次', '3次', '5次'],
      answer: 1,
      explanation: '第一次比较1，第二次比较3，找到。共2次。'
    },
    prerequisites: [27, 30],
    recommendedProblems: [30, 31, 49],
    readTime: 20,
  },
  {
    id: 32,
    slug: 'array-stats',
    title: '统计应用',
    icon: '📊',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '用数组进行统计',
    description: '数组常用于统计和计数场景。',
    content: [
      '统计各数字出现次数',
      '桶排序的思想',
      '统计字符出现频率',
      '频数统计',
      '直方图输出',
    ],
    kidFriendly: {
      analogy: '统计就像投票。每个候选人有一个箱子，投给谁就在谁的箱子里放一张票。最后数每个箱子有多少票。',
      visualization: '📊 统计数组：\n输入：[1,2,2,3,3,3]\n统计：count[1]=1, count[2]=2, count[3]=3',
      whyLearn: '统计是非常实用的技能，数据分析、投票系统都用得到。'
    },
    codeExamples: [
      {
        title: '统计数字出现次数',
        description: '使用数组计数',
        code: `#include <iostream>
using namespace std;

int main() {
    // 统计0-9每个数字出现的次数
    int count[10] = {0};  // 初始化为0
    
    int n;
    cin >> n;  // 输入数字个数
    
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        count[x]++;  // 对应计数加1
    }
    
    // 输出结果
    for (int i = 0; i < 10; i++) {
        if (count[i] > 0) {
            cout << i << "出现" << count[i] << "次" << endl;
        }
    }
    
    return 0;
}`,
        input: '6\n1 2 2 3 3 3',
        expectedOutput: '1出现1次\n2出现2次\n3出现3次',
        explanation: [
          '用数组的下标表示数字',
          '数组元素存储出现次数',
          '这种方法也叫"桶计数"',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记初始化计数数组',
        why: '结果可能不准确',
        correctWay: 'int count[10] = {0}; 初始化为0'
      },
    ],
    quiz: {
      question: '统计小写字母出现次数，数组大小应该至少是？',
      options: ['26', '52', '128', '256'],
      answer: 0,
      explanation: '小写字母有26个，所以数组大小至少26。'
    },
    prerequisites: [27, 30],
    recommendedProblems: [30, 31, 38],
    readTime: 20,
  },
  {
    id: 33,
    slug: '2d-array',
    title: '二维数组概念',
    icon: '🔠',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '理解二维数组的结构',
    description: '二维数组是"数组的数组"，可以看作一个表格或矩阵。',
    content: [
      '什么是二维数组？',
      '二维数组的声明',
      '行和列的概念',
      '二维数组的初始化',
      '访问二维数组元素',
    ],
    kidFriendly: {
      analogy: '二维数组就像教室的座位表。有行和列，比如"第3排第4列"就能确定一个位置。arr[3][4]就是这个意思。',
      visualization: '🔠 二维数组：\n     列0 列1 列2\n行0 [ 1 ][ 2 ][ 3 ]\n行1 [ 4 ][ 5 ][ 6 ]\n行2 [ 7 ][ 8 ][ 9 ]',
      whyLearn: '处理表格数据、图像、游戏地图都需要二维数组。'
    },
    codeExamples: [
      {
        title: '二维数组基础',
        description: '声明、初始化、访问',
        code: `#include <iostream>
using namespace std;

int main() {
    // 声明3行4列的二维数组
    int arr[3][4];
    
    // 初始化
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    
    // 访问元素
    cout << "第0行第1列：" << matrix[0][1] << endl;
    
    // 修改元素
    matrix[1][2] = 100;
    
    // 遍历二维数组
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    
    return 0;
}`,
        expectedOutput: '第0行第1列：2\n1 2 3\n4 5 100',
        explanation: [
          'arr[行][列]，先写行再写列',
          '遍历用双重循环，外层行内层列',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '行列下标搞反',
        why: '访问到错误的元素',
        correctWay: '第一个下标是行，第二个是列'
      },
    ],
    quiz: {
      question: 'int arr[3][4]有几个元素？',
      options: ['7个', '12个', '3个', '4个'],
      answer: 1,
      explanation: '3行×4列=12个元素。'
    },
    prerequisites: [27],
    recommendedProblems: [32, 70, 71],
    readTime: 25,
  },
  {
    id: 34,
    slug: '2d-traverse',
    title: '二维数组遍历',
    icon: '🔄',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '学习如何遍历二维数组',
    description: '二维数组需要双重循环来遍历，外层循环行，内层循环列。',
    content: [
      '按行遍历',
      '按列遍历',
      '对角线遍历',
      '边界遍历',
      '特殊遍历方式',
    ],
    kidFriendly: {
      analogy: '遍历二维数组就像扫地。你可以横着扫（按行），也可以竖着扫（按列），或者沿着边缘扫。',
      visualization: '🔄 遍历方式：\n按行：→→→→ 换行\n按列：↓↓↓↓ 换列\n对角线：\↘\↘',
      whyLearn: '处理图像、矩阵运算、游戏地图都需要正确遍历二维数组。'
    },
    codeExamples: [
      {
        title: '各种遍历方式',
        description: '行列对角线',
        code: `#include <iostream>
using namespace std;

int main() {
    int arr[3][3] = {{1,2,3}, {4,5,6}, {7,8,9}};
    
    // 按行遍历
    cout << "按行：" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
    
    // 按列遍历
    cout << "按列：" << endl;
    for (int j = 0; j < 3; j++) {
        for (int i = 0; i < 3; i++) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
    
    // 主对角线
    cout << "主对角线：";
    for (int i = 0; i < 3; i++) {
        cout << arr[i][i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '按行：\n1 2 3\n4 5 6\n7 8 9\n按列：\n1 4 7\n2 5 8\n3 6 9\n主对角线：1 5 9',
        explanation: [
          '按行遍历：外层i控制行',
          '按列遍历：外层j控制列',
          '主对角线：行号等于列号',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '遍历时行列范围搞错',
        why: '越界或遗漏元素',
        correctWay: '确保i<行数，j<列数'
      },
    ],
    quiz: {
      question: '3x3数组副对角线（右上到左下）的元素满足？',
      options: ['i=j', 'i+j=2', 'i<j', 'i>j'],
      answer: 1,
      explanation: '副对角线：arr[0][2], arr[1][1], arr[2][0]，i+j=2。'
    },
    prerequisites: [33],
    recommendedProblems: [32, 70, 71],
    readTime: 20,
  },
  // ==================== 函数 ====================
  {
    id: 35,
    slug: 'function-intro',
    title: '函数概念',
    icon: '📦',
    category: 'basics',
    difficulty: 'basic',
    brief: '把代码打包成可复用的模块',
    description: '函数是一段完成特定任务的代码，可以重复使用，让程序更清晰。',
    content: [
      '什么是函数？一段有名字的代码',
      '函数的作用：代码复用、模块化',
      '函数的定义和调用',
      '参数和返回值',
      '函数的命名规范',
    ],
    kidFriendly: {
      analogy: '函数就像魔法卷轴。你把一段咒语（代码）写在卷轴上，给它起个名字。以后只要念这个名字，那段咒语就会执行。',
      visualization: '📦 函数结构：\n返回类型 函数名(参数) {\n    函数体\n    return 返回值;\n}',
      whyLearn: '没有函数，所有代码都要写在一起，既乱又难改。函数让程序像搭积木一样清晰。'
    },
    codeExamples: [
      {
        title: '定义和调用函数',
        description: '简单的函数示例',
        code: `#include <iostream>
using namespace std;

// 定义一个打招呼的函数
void sayHello() {
    cout << "你好！" << endl;
}

// 定义一个计算两数之和的函数
int add(int a, int b) {
    return a + b;
}

int main() {
    // 调用函数
    sayHello();
    sayHello();  // 可以多次调用
    
    int result = add(3, 5);
    cout << "3 + 5 = " << result << endl;
    
    return 0;
}`,
        expectedOutput: '你好！\n你好！\n3 + 5 = 8',
        explanation: [
          'void表示没有返回值',
          'int表示返回整数',
          'return返回结果',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记写返回类型',
        why: '语法错误',
        correctWay: '即使是void也要写返回类型'
      },
    ],
    quiz: {
      question: 'void类型的函数表示？',
      options: ['返回整数', '没有返回值', '返回字符', '语法错误'],
      answer: 1,
      explanation: 'void表示"无"，即没有返回值。'
    },
    prerequisites: [4, 5, 19],
    recommendedProblems: [2, 3, 47],
    readTime: 25,
  },
  {
    id: 36,
    slug: 'function-define',
    title: '函数定义',
    icon: '📝',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习如何定义函数',
    description: '函数定义包括返回类型、函数名、参数列表和函数体。',
    content: [
      '返回类型的指定',
      '参数列表的写法',
      '函数体的编写',
      'return语句',
      '函数声明和定义分离',
    ],
    kidFriendly: {
      analogy: '定义函数就像写菜谱。菜谱有菜名（函数名）、材料（参数）、步骤（函数体）、成品（返回值）。',
      visualization: '📝 定义格式：\nint add(int a, int b) {\n  ↑     ↑       ↑\n返回  名字   参数\n}',
      whyLearn: '正确写函数定义是使用函数的基础。'
    },
    codeExamples: [
      {
        title: '函数定义示例',
        description: '多种类型函数',
        code: `#include <iostream>
using namespace std;

// 无参数无返回值
void greet() {
    cout << "欢迎！" << endl;
}

// 有参数无返回值
void printSum(int a, int b) {
    cout << a << "+" << b << "=" << a+b << endl;
}

// 有参数有返回值
int max(int a, int b) {
    if (a > b) return a;
    return b;
}

// 多参数
double average(double a, double b, double c) {
    return (a + b + c) / 3;
}

int main() {
    greet();
    printSum(3, 5);
    cout << "较大的数：" << max(7, 4) << endl;
    cout << "平均值：" << average(1, 2, 3) << endl;
    return 0;
}`,
        expectedOutput: '欢迎！\n3+5=8\n较大的数：7\n平均值：2',
        explanation: [
          'void函数不需要return',
          '非void函数必须有return',
          '参数可以有多个',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '参数列表中参数写错',
        why: '每个参数都要单独写类型',
        correctWay: 'int max(int a, int b) 不是 int max(int a, b)'
      },
    ],
    quiz: {
      question: 'int add(int a, int b)中，int b可以写成b吗？',
      options: ['可以', '不可以', '看情况', '只有第一个可以'],
      answer: 1,
      explanation: '每个参数都要写类型，不能省略。'
    },
    prerequisites: [35],
    recommendedProblems: [2, 3, 47],
    readTime: 20,
  },
  {
    id: 37,
    slug: 'function-call',
    title: '函数调用',
    icon: '📞',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习如何调用函数',
    description: '函数定义后，可以在任何地方调用它执行。',
    content: [
      '函数调用的语法',
      '传递参数',
      '接收返回值',
      '函数调用的执行过程',
      '嵌套调用',
    ],
    kidFriendly: {
      analogy: '调用函数就像按遥控器上的按钮。按钮就是函数名，按一下就执行对应的功能。',
      visualization: '📞 调用过程：\nmain() {\n  ↓ 调用\n  add(3, 5)\n  ↓ 返回\n  得到8\n}',
      whyLearn: '函数只有被调用才会执行，学会正确调用才能使用函数。'
    },
    codeExamples: [
      {
        title: '函数调用示例',
        description: '各种调用方式',
        code: `#include <iostream>
using namespace std;

int square(int n) {
    return n * n;
}

int add(int a, int b) {
    return a + b;
}

int main() {
    // 基本调用
    int result = square(5);
    cout << "5的平方：" << result << endl;
    
    // 直接输出
    cout << "3的平方：" << square(3) << endl;
    
    // 作为参数
    cout << "两个平方的和：" << add(square(2), square(3)) << endl;
    
    // 连续调用
    cout << "(2+3)的平方：" << square(add(2, 3)) << endl;
    
    return 0;
}`,
        expectedOutput: '5的平方：25\n3的平方：9\n两个平方的和：13\n(2+3)的平方：25',
        explanation: [
          '返回值可以存到变量或直接使用',
          '函数调用可以作为其他函数的参数',
          '先算内层，再算外层',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '参数数量不对',
        why: '必须和定义时的参数数量一致',
        correctWay: 'add(1,2)不是add(1)'
      },
    ],
    quiz: {
      question: 'add(square(2), 3)的执行顺序是？',
      options: ['先add后square', '先square后add', '同时执行', '不确定'],
      answer: 1,
      explanation: '先计算square(2)=4，再计算add(4,3)=7。'
    },
    prerequisites: [35, 36],
    recommendedProblems: [2, 3, 47],
    readTime: 20,
  },
  // ==================== 排序算法 ====================
  {
    id: 38,
    slug: 'sort-intro',
    title: '排序概念',
    icon: '📊',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '什么是排序？为什么重要？',
    description: '排序是将一组数据按照特定顺序排列的过程。',
    content: [
      '什么是排序？',
      '升序和降序',
      '排序的应用场景',
      '排序算法的分类',
      '稳定排序和不稳定排序',
    ],
    kidFriendly: {
      analogy: '排序就像整理书架。你可以按书名排序，让书按字母顺序排列；或者按高度排序，让书从矮到高排列。',
      visualization: '📊 排序示例：\n原始：[3, 1, 4, 1, 5]\n升序：[1, 1, 3, 4, 5]\n降序：[5, 4, 3, 1, 1]',
      whyLearn: '排序是最常用的算法之一。很多问题都需要先排序才能解决。'
    },
    codeExamples: [
      {
        title: '使用STL排序',
        description: '最简单的排序方法',
        code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int arr[5] = {3, 1, 4, 1, 5};
    
    // 升序排序
    sort(arr, arr + 5);
    
    cout << "升序：";
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    // 降序排序
    sort(arr, arr + 5, greater<int>());
    
    cout << "降序：";
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '升序：1 1 3 4 5\n降序：5 4 3 1 1',
        explanation: [
          'sort(起始, 结束) 默认升序',
          'greater<int>() 可以降序',
          '实际编程中优先使用STL',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'sort的范围写错',
        why: 'sort(arr, arr+n)，n是元素个数',
        correctWay: '记住是[开始, 结束)，不包括结束位置'
      },
    ],
    quiz: {
      question: '将[5,2,8,1]升序排序结果是？',
      options: ['[5,2,8,1]', '[1,2,5,8]', '[8,5,2,1]', '[1,8,2,5]'],
      answer: 1,
      explanation: '升序就是从小到大。'
    },
    prerequisites: [27],
    recommendedProblems: [30, 44, 45],
    readTime: 20,
  },
  {
    id: 39,
    slug: 'bubble-sort',
    title: '冒泡排序',
    icon: '🫧',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '最简单的排序算法',
    description: '冒泡排序通过重复交换相邻元素，让大元素逐渐"浮"到后面。',
    content: [
      '冒泡排序的原理',
      '相邻元素比较和交换',
      '一趟排序的效果',
      '时间复杂度：O(n²)',
      '优化：提前退出',
    ],
    kidFriendly: {
      analogy: '冒泡排序就像水底的气泡往上冒。每次比较相邻两个，大的往后换，一趟下来最大的就到最后了。',
      visualization: '🫧 过程示例：\n[3,1,4,2] → [1,3,4,2] → [1,3,2,4]\n一趟后，4到了最后',
      whyLearn: '虽然慢，但是最简单，是学习排序的起点。'
    },
    codeExamples: [
      {
        title: '冒泡排序实现',
        description: '经典写法',
        code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {5, 3, 8, 1, 2};
    int n = 5;
    
    // 冒泡排序
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    // 输出
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '1 2 3 5 8',
        explanation: [
          '外层循环控制趟数',
          '内层循环比较相邻元素',
          '每趟把最大的冒泡到最后',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '内层循环范围写错',
        why: 'j要和j+1比较，所以j<n-1-i',
        correctWay: '注意边界条件'
      },
    ],
    quiz: {
      question: '冒泡排序对n个元素需要比较几次？',
      options: ['n次', 'n²次', '约n²/2次', 'n-1次'],
      answer: 2,
      explanation: '第1趟n-1次，第2趟n-2次...总共约n²/2次。'
    },
    prerequisites: [38, 27, 25],
    recommendedProblems: [44, 45, 30],
    readTime: 25,
  },
  {
    id: 40,
    slug: 'stl-sort',
    title: 'STL sort函数',
    icon: '⚡',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '高效便捷的排序函数',
    description: 'C++的STL提供了高效的sort函数，时间复杂度O(n log n)。',
    content: [
      'sort函数的基本用法',
      'sort的范围参数',
      '自定义比较函数',
      'lambda表达式',
      '排序结构体',
    ],
    kidFriendly: {
      analogy: 'STL sort就像一个高级机器，你把数据放进去，它就自动排好。比手动排序快多了！',
      visualization: '⚡ 用法：\nsort(arr, arr+n)  // 排序前n个元素\nsort(v.begin(), v.end())  // 排序vector',
      whyLearn: '实际编程中几乎都用STL sort，又快又方便。'
    },
    codeExamples: [
      {
        title: 'STL sort各种用法',
        description: '基础和进阶',
        code: `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

bool cmp(int a, int b) {
    return a > b;  // 降序
}

int main() {
    // 数组排序
    int arr[5] = {3, 1, 4, 1, 5};
    sort(arr, arr + 5);
    
    // vector排序
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end());
    
    // 降序
    sort(arr, arr + 5, greater<int>());
    
    // 自定义比较
    sort(arr, arr + 5, cmp);
    
    // lambda表达式
    sort(arr, arr + 5, [](int a, int b) {
        return a > b;
    });
    
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '5 4 3 1 1',
        explanation: [
          'sort(起始指针, 结束指针)',
          '默认升序，可用比较函数改',
          'vector用begin()和end()',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记#include <algorithm>',
        why: '编译错误',
        correctWay: '使用sort需要包含algorithm头文件'
      },
    ],
    quiz: {
      question: 'sort(arr, arr+5)排序的范围是？',
      options: ['arr[0]到arr[4]', 'arr[1]到arr[5]', 'arr[0]到arr[5]', '不确定'],
      answer: 0,
      explanation: 'sort是左闭右开区间，arr到arr+5包含arr[0]到arr[4]。'
    },
    prerequisites: [38],
    recommendedProblems: [44, 45, 30],
    readTime: 20,
  },
  // ==================== 基础算法 ====================
  {
    id: 41,
    slug: 'simulation-intro',
    title: '模拟算法概念',
    icon: '🎭',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '按步骤模拟过程',
    description: '模拟算法就是按照题目描述的过程一步步执行，不需要复杂的优化。',
    content: [
      '什么是模拟？',
      '模拟的思路：理解题意，按步骤写代码',
      '模拟的关键：细节处理',
      '常见模拟题型',
      '模拟的注意事项',
    ],
    kidFriendly: {
      analogy: '模拟就像照着菜谱做菜。菜谱说"先切菜，再炒"，你就一步一步做。虽然简单，但要细心。',
      visualization: '🎭 模拟过程：\n题目描述 → 理解步骤 → 写代码实现 → 输出结果',
      whyLearn: '很多题目就是纯模拟，理解题意最重要。'
    },
    codeExamples: [
      {
        title: '模拟示例',
        description: '模拟时钟',
        code: `#include <iostream>
using namespace std;

int main() {
    int h, m, s, add;
    cin >> h >> m >> s >> add;  // 当前时间和增加的秒数
    
    s += add;
    
    // 处理进位
    m += s / 60;
    s %= 60;
    
    h += m / 60;
    m %= 60;
    
    h %= 24;
    
    cout << h << ":" << m << ":" << s << endl;
    
    return 0;
}`,
        input: '23 59 50 20',
        expectedOutput: '0:0:10',
        explanation: [
          '按时间进位规则模拟',
          '秒超过60进位到分',
          '分超过60进位到时',
          '时超过24归0',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '没有考虑边界情况',
        why: '模拟题细节多，容易漏',
        correctWay: '仔细审题，考虑所有情况'
      },
    ],
    quiz: {
      question: '模拟算法的核心是什么？',
      options: ['优化时间', '正确理解题意', '减少代码量', '使用复杂算法'],
      answer: 1,
      explanation: '模拟就是照题目说的做，关键是理解清楚。'
    },
    prerequisites: [19, 13],
    recommendedProblems: [29, 70, 72],
    readTime: 20,
  },
  {
    id: 42,
    slug: 'enumeration',
    title: '枚举思想',
    icon: '🔍',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '尝试所有可能的情况',
    description: '枚举就是列举所有可能的情况，找出满足条件的解。',
    content: [
      '什么是枚举？',
      '枚举的基本思路',
      '确定枚举范围',
      '如何优化枚举',
      '枚举的典型题目',
    ],
    kidFriendly: {
      analogy: '枚举就像试密码。如果你不知道密码，就一个一个试：0000、0001、0002...直到试对为止。虽然笨，但有效。',
      visualization: '🔍 枚举过程：\nfor 所有可能的情况 {\n    if 满足条件 {\n        记录答案\n    }\n}',
      whyLearn: '枚举是最直接的解题方法，很多题目都能用枚举解决。'
    },
    codeExamples: [
      {
        title: '枚举示例',
        description: '找出100以内能被7整除的数',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "100以内能被7整除的数：" << endl;
    
    for (int i = 1; i <= 100; i++) {
        if (i % 7 == 0) {
            cout << i << " ";
        }
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '100以内能被7整除的数：\n7 14 21 28 35 42 49 56 63 70 77 84 91 98',
        explanation: [
          '从1到100逐个检查',
          '满足条件的输出',
          '这就是最简单的枚举',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '枚举范围太大导致超时',
        why: '枚举效率低',
        correctWay: '尽量缩小枚举范围'
      },
    ],
    quiz: {
      question: '枚举的本质是什么？',
      options: ['只检查部分情况', '尝试所有情况', '随机猜测', '贪心选择'],
      answer: 1,
      explanation: '枚举就是把所有可能都试一遍。'
    },
    prerequisites: [19, 13],
    recommendedProblems: [29, 72, 38],
    readTime: 20,
  },
  {
    id: 43,
    slug: 'binary-search',
    title: '二分查找',
    icon: '🎯',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '在有序数组中快速查找',
    description: '二分查找每次排除一半元素，时间复杂度O(log n)。',
    content: [
      '二分查找的原理',
      '前提条件：有序数组',
      '中间元素和比较',
      '区间更新规则',
      '二分查找的实现',
    ],
    kidFriendly: {
      analogy: '二分查找就像猜数字游戏。你说1-100，我每次猜中间的数，你告诉我大了还是小了，这样最多7次就能猜到。',
      visualization: '🎯 二分过程：\n[1,3,5,7,9,11,13]找7\n第1次：中间是7，找到了！\n如果找5：\n第1次：中间7，比5大\n第2次：左半边，中间3，比5小\n第3次：右半边，找到5',
      whyLearn: '二分查找是最快的基础查找算法，数据量大时必须用。'
    },
    codeExamples: [
      {
        title: '二分查找实现',
        description: '在有序数组中查找',
        code: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;  // 找到了
        } else if (arr[mid] < target) {
            left = mid + 1;  // 在右半边
        } else {
            right = mid - 1;  // 在左半边
        }
    }
    
    return -1;  // 没找到
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    int pos = binarySearch(arr, n, 7);
    cout << "7的位置：" << pos << endl;
    
    pos = binarySearch(arr, n, 4);
    cout << "4的位置：" << pos << endl;
    
    return 0;
}`,
        expectedOutput: '7的位置：3\n4的位置：-1',
        explanation: [
          'mid = left + (right-left)/2 防止溢出',
          '相等就返回，不等就缩小范围',
          '找不到返回-1',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '循环条件写成left < right',
        why: '可能漏掉最后一个元素',
        correctWay: '应该是left <= right'
      },
      {
        mistake: 'mid计算溢出',
        why: '(left+right)/2可能溢出',
        correctWay: '用left + (right-left)/2'
      },
    ],
    quiz: {
      question: '在100个有序元素中二分查找，最多比较几次？',
      options: ['100次', '50次', '7次', '10次'],
      answer: 2,
      explanation: '2^7=128>100，所以最多7次。'
    },
    prerequisites: [27, 22],
    recommendedProblems: [49, 50, 51],
    readTime: 30,
  },
  // ==================== 字符串处理 ====================
  {
    id: 44,
    slug: 'string-intro',
    title: '字符串概念',
    icon: '📝',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '学习字符串的基本概念',
    description: '字符串是由字符组成的序列，用于存储和处理文本。',
    content: [
      '什么是字符串？',
      'C风格的字符数组',
      'C++的string类',
      '字符串的输入输出',
      '字符串的长度',
    ],
    kidFriendly: {
      analogy: '字符串就像一串珍珠。每颗珍珠是一个字符，串起来就是字符串。"Hello"就是5颗珍珠串在一起。',
      visualization: '📝 字符串结构：\n"Hello"\n┌───┬───┬───┬───┬───┬───┐\n│ H │ e │ l │ l │ o │\\0│\n└───┴───┴───┴───┴───┴───┘\n \\0是结束标记',
      whyLearn: '几乎所有程序都需要处理文本，字符串是最常用的数据类型之一。'
    },
    codeExamples: [
      {
        title: '字符串基本操作',
        description: 'C风格和C++风格',
        code: `#include <iostream>
#include <cstring>  // C风格字符串函数
#include <string>   // C++ string类
using namespace std;

int main() {
    // C风格字符串
    char str1[20] = "Hello";
    cout << "C风格：" << str1 << endl;
    cout << "长度：" << strlen(str1) << endl;
    
    // C++ string
    string str2 = "World";
    cout << "C++ string：" << str2 << endl;
    cout << "长度：" << str2.length() << endl;
    
    // 拼接
    string str3 = str1 + string(" ") + str2;
    cout << "拼接：" << str3 << endl;
    
    return 0;
}`,
        expectedOutput: 'C风格：Hello\n长度：5\nC++ string：World\n长度：5\n拼接：Hello World',
        explanation: [
          'C风格用字符数组，以\\0结束',
          'C++的string更方便，推荐使用',
          'string可以直接用+拼接',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '字符数组太小，忘记\\0',
        why: '存储空间不足',
        correctWay: '数组长度要至少比字符串长度+1'
      },
    ],
    quiz: {
      question: '"Hello"的C风格字符串需要多少空间？',
      options: ['5个字符', '6个字符', '4个字符', '不确定'],
      answer: 1,
      explanation: '5个字母加1个\\0，共6个。'
    },
    prerequisites: [4, 27],
    recommendedProblems: [35, 36, 37],
    readTime: 25,
  },
  {
    id: 45,
    slug: 'string-ops',
    title: '字符串操作',
    icon: '🔧',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '学习常用的字符串操作',
    description: '字符串的拼接、查找、截取等操作。',
    content: [
      '字符串拼接',
      '字符串比较',
      '子串查找',
      '字符串截取',
      '字符串转换',
    ],
    kidFriendly: {
      analogy: '字符串操作就像搭积木。拼接是把积木连起来，截取是取一部分，查找是在积木里找特定形状。',
      visualization: '🔧 常用操作：\n拼接：s1 + s2\n比较：s1 == s2\n查找：s.find("ab")\n截取：s.substr(0, 3)',
      whyLearn: '字符串操作是文本处理的基础，几乎所有程序都会用到。'
    },
    codeExamples: [
      {
        title: 'string常用操作',
        description: '拼接、查找、截取',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    
    // 长度
    cout << "长度：" << s.length() << endl;
    
    // 查找
    int pos = s.find("World");
    cout << "World的位置：" << pos << endl;
    
    // 截取子串
    string sub = s.substr(0, 5);  // 从位置0开始，取5个字符
    cout << "子串：" << sub << endl;
    
    // 插入
    s.insert(5, " Beautiful");
    cout << "插入后：" << s << endl;
    
    // 删除
    s.erase(5, 10);  // 从位置5开始，删除10个字符
    cout << "删除后：" << s << endl;
    
    return 0;
}`,
        expectedOutput: '长度：11\nWorld的位置：6\n子串：Hello\n插入后：Hello Beautiful World\n删除后：Hello World',
        explanation: [
          'find返回子串位置，找不到返回-1',
          'substr(起点, 长度) 截取子串',
          'insert(位置, 字符串) 插入',
          'erase(位置, 长度) 删除',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'substr参数搞反',
        why: 'substr(起点, 长度)，不是substr(起点, 终点)',
        correctWay: '记住是起点和长度'
      },
    ],
    quiz: {
      question: '"Hello World".substr(6, 5)的结果是？',
      options: ['Hello', 'World', ' Worl', '或rld'],
      answer: 1,
      explanation: '从位置6开始，取5个字符，是World。'
    },
    prerequisites: [44],
    recommendedProblems: [35, 36, 37],
    readTime: 20,
  },
  {
    id: 46,
    slug: 'string-traverse',
    title: '字符串遍历',
    icon: '🔄',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '学习如何遍历字符串',
    description: '遍历字符串的每个字符进行操作。',
    content: [
      '用下标遍历',
      '用范围for遍历',
      '字符的判断和转换',
      '统计字符',
      '修改字符',
    ],
    kidFriendly: {
      analogy: '遍历字符串就像数珠子。你一颗一颗数过去，可以数有多少颗、数某种颜色有多少颗、或者把某些珠子换个颜色。',
      visualization: '🔄 遍历方式：\n下标：for (int i=0; i<s.length(); i++)\n范围for：for (char c : s)',
      whyLearn: '处理字符串时，经常需要逐个字符操作。'
    },
    codeExamples: [
      {
        title: '字符串遍历示例',
        description: '统计和修改',
        code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string s = "Hello World";
    
    // 统计字母个数
    int letterCount = 0;
    for (int i = 0; i < s.length(); i++) {
        if (isalpha(s[i])) {
            letterCount++;
        }
    }
    cout << "字母个数：" << letterCount << endl;
    
    // 统计小写字母
    int lowerCount = 0;
    for (char c : s) {
        if (islower(c)) {
            lowerCount++;
        }
    }
    cout << "小写字母个数：" << lowerCount << endl;
    
    // 转换为大写
    for (int i = 0; i < s.length(); i++) {
        s[i] = toupper(s[i]);
    }
    cout << "转大写：" << s << endl;
    
    return 0;
}`,
        expectedOutput: '字母个数：10\n小写字母个数：8\n转大写：HELLO WORLD',
        explanation: [
          'isalpha判断是否字母',
          'islower/isupper判断大小写',
          'toupper/tolower转换大小写',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '遍历时用int i<s.length()',
        why: 'length()返回unsigned，可能有问题',
        correctWay: '用int len=s.length()或(i=s.length())-1判断'
      },
    ],
    quiz: {
      question: '"AbC".转小写后的结果是？',
      options: ['abc', 'ABC', 'AbC', 'Abc'],
      answer: 0,
      explanation: '每个字符都转小写。'
    },
    prerequisites: [44, 19],
    recommendedProblems: [35, 36, 37],
    readTime: 20,
  },
  // ==================== 递归 ====================
  {
    id: 47,
    slug: 'recursion-intro',
    title: '递归概念',
    icon: '🔄',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '函数调用自己',
    description: '递归是函数直接或间接调用自身，是解决复杂问题的重要方法。',
    content: [
      '什么是递归？函数调用自己',
      '递归的两个关键：终止条件和递推公式',
      '递归的执行过程',
      '递归和循环的关系',
      '递归的优缺点',
    ],
    kidFriendly: {
      analogy: '递归就像俄罗斯套娃。打开一个大娃娃，里面有个小娃娃；打开小娃娃，里面还有更小的...直到最小的那个打不开了，就结束了。',
      visualization: '🔄 递归结构：\nint f(n) {\n  if (终止条件) return 值;  // 最小的娃娃\n  return f(更小的n);  // 打开娃娃\n}',
      whyLearn: '很多问题用递归思考更自然，比如计算阶乘、遍历树结构。'
    },
    codeExamples: [
      {
        title: '递归计算阶乘',
        description: 'n! = n * (n-1)!',
        code: `#include <iostream>
using namespace std;

int factorial(int n) {
    // 终止条件
    if (n <= 1) {
        return 1;
    }
    // 递推公式
    return n * factorial(n - 1);
}

int main() {
    cout << "5! = " << factorial(5) << endl;
    cout << "10! = " << factorial(10) << endl;
    return 0;
}`,
        expectedOutput: '5! = 120\n10! = 3628800',
        explanation: [
          'f(5) = 5 * f(4)',
          'f(4) = 4 * f(3)',
          '...',
          'f(1) = 1 (终止条件)',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记终止条件',
        why: '无限递归，栈溢出',
        correctWay: '必须有明确的终止条件'
      },
    ],
    quiz: {
      question: '递归函数必须有终止条件，为什么？',
      options: ['语法要求', '否则无限调用导致栈溢出', '提高效率', '不清楚'],
      answer: 1,
      explanation: '没有终止条件，函数会一直调用自己，直到内存耗尽。'
    },
    prerequisites: [35, 36],
    recommendedProblems: [47, 52, 53],
    readTime: 30,
  },
  {
    id: 48,
    slug: 'recursion-examples',
    title: '递归经典案例',
    icon: '📚',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '学习递归的经典应用',
    description: '通过经典案例理解递归的威力。',
    content: [
      '斐波那契数列',
      '汉诺塔问题',
      '二分查找的递归实现',
      '计算组合数',
      '递归遍历',
    ],
    kidFriendly: {
      analogy: '这些经典案例就像递归的"杀手锏"。理解了它们，递归就算入门了。',
      visualization: '📚 经典案例：\n斐波那契：f(n)=f(n-1)+f(n-2)\n汉诺塔：把n-1个移走，移最大的，再把n-1个移过来',
      whyLearn: '这些案例帮助深入理解递归思想。'
    },
    codeExamples: [
      {
        title: '斐波那契数列',
        description: '第n个斐波那契数',
        code: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 2) return 1;  // f(1)=f(2)=1
    return fib(n-1) + fib(n-2);
}

int main() {
    for (int i = 1; i <= 10; i++) {
        cout << "fib(" << i << ") = " << fib(i) << endl;
    }
    return 0;
}`,
        expectedOutput: 'fib(1) = 1\nfib(2) = 1\nfib(3) = 2\n...\nfib(10) = 55',
        explanation: [
          'f(n) = f(n-1) + f(n-2)',
          '这是最简单的递归例子',
          '但效率很低，可以用记忆化优化',
        ]
      },
      {
        title: '汉诺塔',
        description: '移动n个盘子',
        code: `#include <iostream>
using namespace std;

void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << "移动盘子1从" << from << "到" << to << endl;
        return;
    }
    hanoi(n-1, from, aux, to);
    cout << "移动盘子" << n << "从" << from << "到" << to << endl;
    hanoi(n-1, aux, to, from);
}

int main() {
    hanoi(3, 'A', 'C', 'B');
    return 0;
}`,
        expectedOutput: '移动盘子1从A到C\n移动盘子2从A到B\n...',
        explanation: [
          '把n-1个盘子从A移到B（借助C）',
          '把最大的盘子从A移到C',
          '把n-1个盘子从B移到C（借助A）',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '斐波那契递归效率低',
        why: '重复计算太多',
        correctWay: '用记忆化或迭代'
      },
    ],
    quiz: {
      question: '汉诺塔移动n个盘子需要几次？',
      options: ['n次', '2n次', '2^n - 1次', 'n²次'],
      answer: 2,
      explanation: '移动次数公式：2^n - 1。'
    },
    prerequisites: [47],
    recommendedProblems: [52, 53, 54],
    readTime: 30,
  },
  // ==================== 动态规划入门 ====================
  {
    id: 49,
    slug: 'dp-intro',
    title: '动态规划概念',
    icon: '📊',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '用空间换时间的优化技巧',
    description: '动态规划通过存储子问题的解，避免重复计算，是一种重要的优化方法。',
    content: [
      '什么是动态规划？',
      '重叠子问题',
      '最优子结构',
      '状态和状态转移',
      '自底向上的计算',
    ],
    kidFriendly: {
      analogy: '动态规划就像记账本。你把每次算的结果记下来，下次需要时直接查，不用重算。省时但费纸（空间）。',
      visualization: '📊 DP思路：\n1. 定义状态：dp[i]表示什么\n2. 找转移：dp[i]怎么由前面推出\n3. 定边界：dp[0]等于什么\n4. 算答案：结果是dp[n]',
      whyLearn: '动态规划是解决复杂问题的利器，NOIP必考内容。'
    },
    codeExamples: [
      {
        title: '斐波那契数列DP版',
        description: '用DP优化递归',
        code: `#include <iostream>
using namespace std;

int main() {
    int n = 10;
    int dp[100];
    
    // 边界
    dp[1] = 1;
    dp[2] = 1;
    
    // 递推
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    cout << "fib(" << n << ") = " << dp[n] << endl;
    
    return 0;
}`,
        expectedOutput: 'fib(10) = 55',
        explanation: [
          'dp[i]存第i个斐波那契数',
          'dp[i] = dp[i-1] + dp[i-2]',
          '从3到n逐个计算',
          '时间复杂度从O(2^n)降到O(n)',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记初始化边界',
        why: '递推无法开始',
        correctWay: '仔细设置初始状态'
      },
    ],
    quiz: {
      question: 'DP的核心思想是什么？',
      options: ['递归求解', '用空间换时间', '贪心选择', '分治'],
      answer: 1,
      explanation: 'DP通过存储结果避免重复计算。'
    },
    prerequisites: [47, 48],
    recommendedProblems: [52, 53, 54],
    readTime: 30,
  },
  {
    id: 50,
    slug: 'dp-climbing-stairs',
    title: '爬楼梯问题',
    icon: '🪜',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '最简单的DP入门题',
    description: '每次可以爬1或2个台阶，问爬到第n阶有多少种方法。',
    content: [
      '问题分析',
      '状态定义',
      '状态转移方程',
      '边界条件',
      '代码实现',
    ],
    kidFriendly: {
      analogy: '爬楼梯就像走路。你可以一次走1步或2步。问走到第n阶有多少种走法？',
      visualization: '🪜 分析：\n到第3阶：可以从第2阶走1步，或从第1阶走2步\n所以：dp[3] = dp[2] + dp[1]',
      whyLearn: '这是最经典的DP入门题，理解了它就理解了DP的基本思路。'
    },
    codeExamples: [
      {
        title: '爬楼梯',
        description: 'DP解法',
        code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int dp[100];
    
    // 边界
    dp[1] = 1;  // 1阶：1种走法
    dp[2] = 2;  // 2阶：2种走法(1+1或2)
    
    // 递推
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    cout << "走法数：" << dp[n] << endl;
    
    return 0;
}`,
        input: '5',
        expectedOutput: '走法数：8',
        explanation: [
          'dp[i] = 到第i阶的走法数',
          'dp[i] = dp[i-1] + dp[i-2]',
          '从第i-1阶走1步，或从第i-2阶走2步',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'dp[2]初始化错误',
        why: '2阶有2种走法，不是1种',
        correctWay: '仔细分析边界情况'
      },
    ],
    quiz: {
      question: '爬到第5阶有多少种走法？',
      options: ['3种', '5种', '8种', '13种'],
      answer: 2,
      explanation: 'dp序列：1,2,3,5,8...，第5项是8。'
    },
    prerequisites: [49],
    recommendedProblems: [52, 53, 54],
    readTime: 25,
  },
  {
    id: 51,
    slug: 'dp-knapsack',
    title: '背包问题入门',
    icon: '🎒',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '经典的0/1背包问题',
    description: '在容量有限的背包中装物品，使总价值最大。',
    content: [
      '问题描述',
      '状态定义',
      '状态转移方程',
      '空间优化',
      '典型应用',
    ],
    kidFriendly: {
      analogy: '背包问题就像出去旅游。你的包只能装一定重量的东西，你要选择带哪些物品，让带的物品最有价值。',
      visualization: '🎒 问题：\n容量：10\n物品：\n  重量 价值\n  A: 3   4\n  B: 4   5\n  C: 5   6\n如何选使价值最大？',
      whyLearn: '背包问题是最经典的DP问题之一，很多问题都能转化为背包问题。'
    },
    codeExamples: [
      {
        title: '0/1背包',
        description: '基础版本',
        code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n = 3, W = 10;  // 物品数量和背包容量
    int w[] = {0, 3, 4, 5};  // 重量
    int v[] = {0, 4, 5, 6};  // 价值
    
    int dp[100][100];  // dp[i][j] = 前i个物品，容量j的最大价值
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            // 不选第i个物品
            dp[i][j] = dp[i-1][j];
            
            // 选第i个物品
            if (j >= w[i]) {
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
            }
        }
    }
    
    cout << "最大价值：" << dp[n][W] << endl;
    
    return 0;
}`,
        expectedOutput: '最大价值：11',
        explanation: [
          'dp[i][j]表示前i个物品，容量为j的最大价值',
          '每个物品可选或不选',
          '选：dp[i-1][j-w[i]] + v[i]',
          '不选：dp[i-1][j]',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '状态转移方程写错',
        why: '选或不选的逻辑混淆',
        correctWay: '仔细理解状态转移'
      },
    ],
    quiz: {
      question: '背包容量不够装第i个物品时，dp[i][j]等于？',
      options: ['0', 'dp[i-1][j]', 'dp[i][j-1]', 'v[i]'],
      answer: 1,
      explanation: '装不下只能不选，等于前i-1个物品的结果。'
    },
    prerequisites: [49, 50],
    recommendedProblems: [54, 55, 56],
    readTime: 35,
  },
  // ==================== 图论基础 ====================
  {
    id: 52,
    slug: 'graph-intro',
    title: '图的概念',
    icon: '🕸️',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '学习图的基本概念',
    description: '图是由顶点和边组成的数据结构，用于表示事物之间的关系。',
    content: [
      '什么是图？顶点和边的集合',
      '有向图和无向图',
      '图的表示方法',
      '度数的概念',
      '图的应用场景',
    ],
    kidFriendly: {
      analogy: '图就像地图上的城市和道路。城市是顶点，道路是边。有的路是单行道（有向图），有的是双向的（无向图）。',
      visualization: '🕸️ 图示例：\n    A --- B\n    |     |\n    C --- D\n顶点：A,B,C,D\n边：AB, AC, BD, CD',
      whyLearn: '社交网络、地图导航、网络路由都用图来表示。'
    },
    codeExamples: [
      {
        title: '图的邻接矩阵表示',
        description: '用二维数组存储',
        code: `#include <iostream>
using namespace std;

int main() {
    // 邻接矩阵
    int graph[4][4] = {
        {0, 1, 1, 0},  // A连接B和C
        {1, 0, 0, 1},  // B连接A和D
        {1, 0, 0, 1},  // C连接A和D
        {0, 1, 1, 0}   // D连接B和C
    };
    
    cout << "邻接矩阵：" << endl;
    cout << "  A B C D" << endl;
    for (int i = 0; i < 4; i++) {
        cout << (char)('A' + i) << " ";
        for (int j = 0; j < 4; j++) {
            cout << graph[i][j] << " ";
        }
        cout << endl;
    }
    
    return 0;
}`,
        expectedOutput: '邻接矩阵：\n  A B C D\nA 0 1 1 0\nB 1 0 0 1\n...',
        explanation: [
          'graph[i][j]=1表示i和j之间有边',
          '无向图的邻接矩阵是对称的',
          '对角线是0（没有自环）',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '混淆无向图和有向图',
        why: '边的方向性不同',
        correctWay: '根据问题确定图的类型'
      },
    ],
    quiz: {
      question: '一个顶点有3条边相连，它的度数是？',
      options: ['2', '3', '4', '6'],
      answer: 1,
      explanation: '度数就是相连的边数。'
    },
    prerequisites: [33, 27],
    recommendedProblems: [57, 58, 59],
    readTime: 25,
  },
  {
    id: 53,
    slug: 'bfs',
    title: '广度优先搜索',
    icon: '🌊',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '一层一层地遍历图',
    description: 'BFS从起点开始，先访问所有邻居，再访问邻居的邻居，像波浪一样扩散。',
    content: [
      'BFS的基本思想',
      '队列的作用',
      'BFS的实现步骤',
      'BFS的应用',
      '时间复杂度',
    ],
    kidFriendly: {
      analogy: 'BFS就像扔石头到水里的波纹。先到最近的水面，然后一圈圈扩散开。搜索时先搜最近的，再搜更远的。',
      visualization: '🌊 BFS过程：\n从A开始\n第1层：A\n第2层：B C（A的邻居）\n第3层：D（B和C的邻居）',
      whyLearn: '找最短路径、走迷宫、游戏AI都用BFS。'
    },
    codeExamples: [
      {
        title: 'BFS模板',
        description: '图的BFS遍历',
        code: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    // 邻接表存储图
    vector<int> graph[5] = {
        {1, 2},     // 0连接1,2
        {0, 3},     // 1连接0,3
        {0, 3, 4},  // 2连接0,3,4
        {1, 2},     // 3连接1,2
        {2}         // 4连接2
    };
    
    bool visited[5] = {false};
    queue<int> q;
    
    // 从顶点0开始BFS
    q.push(0);
    visited[0] = true;
    
    cout << "BFS顺序：";
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        cout << curr << " ";
        
        for (int next : graph[curr]) {
            if (!visited[next]) {
                visited[next] = true;
                q.push(next);
            }
        }
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: 'BFS顺序：0 1 2 3 4',
        explanation: [
          '用队列存储待访问的顶点',
          '先标记已访问再入队',
          '保证按层次顺序访问',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记标记已访问',
        why: '可能重复访问，甚至死循环',
        correctWay: '入队时就标记已访问'
      },
    ],
    quiz: {
      question: 'BFS用什么数据结构？',
      options: ['栈', '队列', '数组', '链表'],
      answer: 1,
      explanation: 'BFS用队列保证先访问的先处理。'
    },
    prerequisites: [52],
    recommendedProblems: [57, 58, 59],
    readTime: 30,
  },
  {
    id: 54,
    slug: 'dfs',
    title: '深度优先搜索',
    icon: '⛏️',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '一条路走到底',
    description: 'DFS沿着一条路径一直走，走不通了再回头，探索所有可能的路径。',
    content: [
      'DFS的基本思想',
      '递归实现',
      '回溯的概念',
      'DFS的应用',
      'DFS和BFS的比较',
    ],
    kidFriendly: {
      analogy: 'DFS就像走迷宫。你选一条路一直走，走到死胡同就回头，再试另一条路。不撞南墙不回头！',
      visualization: '⛏️ DFS过程：\n从A开始\n路径1：A→B→D\n路径2：A→C→D\n回溯：走到死胡同或终点就回头',
      whyLearn: '搜索解空间、走迷宫、八皇后问题都用DFS。'
    },
    codeExamples: [
      {
        title: 'DFS模板',
        description: '图的DFS遍历',
        code: `#include <iostream>
#include <vector>
using namespace std;

vector<int> graph[5];
bool visited[5] = {false};

void dfs(int node) {
    visited[node] = true;
    cout << node << " ";
    
    for (int next : graph[node]) {
        if (!visited[next]) {
            dfs(next);
        }
    }
}

int main() {
    graph[0] = {1, 2};
    graph[1] = {0, 3};
    graph[2] = {0, 3, 4};
    graph[3] = {1, 2};
    graph[4] = {2};
    
    cout << "DFS顺序：";
    dfs(0);
    cout << endl;
    
    return 0;
}`,
        expectedOutput: 'DFS顺序：0 1 3 2 4',
        explanation: [
          '递归实现，先访问再递归邻居',
          '标记已访问避免重复',
          '访问顺序取决于邻居的顺序',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '递归太深导致栈溢出',
        why: '图太大时递归层数太多',
        correctWay: '改用栈模拟，或限制递归深度'
      },
    ],
    quiz: {
      question: 'DFS最常用的实现方式是？',
      options: ['队列', '递归', '循环', '数组'],
      answer: 1,
      explanation: 'DFS用递归实现最直观，也可以用栈模拟。'
    },
    prerequisites: [52, 47],
    recommendedProblems: [57, 58, 59],
    readTime: 30,
  },
  // ==================== 数学基础 ====================
  {
    id: 55,
    slug: 'gcd-lcm',
    title: '最大公约数和最小公倍数',
    icon: '🔢',
    category: 'math',
    difficulty: 'basic',
    brief: '学习GCD和LCM',
    description: '最大公约数（GCD）和最小公倍数（LCM）是数论的基础。',
    content: [
      '约数和倍数的概念',
      '最大公约数的定义',
      '最小公倍数的定义',
      '辗转相除法',
      'GCD和LCM的关系',
    ],
    kidFriendly: {
      analogy: 'GCD就像找两个数的"最大共同点"。LCM就像找两个数的"最小共同倍数"。比如12和18，公约数有1,2,3,6，最大是6；公倍数有36,72...最小是36。',
      visualization: '🔢 例子：\nGCD(12,18) = 6\nLCM(12,18) = 36\n关系：GCD × LCM = 12 × 18',
      whyLearn: '约分、分数运算、周期问题都要用GCD和LCM。'
    },
    codeExamples: [
      {
        title: '辗转相除法',
        description: '计算GCD',
        code: `#include <iostream>
using namespace std;

// 递归版
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// 迭代版
int gcd2(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// 计算LCM
int lcm(int a, int b) {
    return a / gcd(a, b) * b;  // 先除后乘避免溢出
}

int main() {
    int a = 12, b = 18;
    cout << "GCD(" << a << "," << b << ") = " << gcd(a, b) << endl;
    cout << "LCM(" << a << "," << b << ") = " << lcm(a, b) << endl;
    return 0;
}`,
        expectedOutput: 'GCD(12,18) = 6\nLCM(12,18) = 36',
        explanation: [
          'gcd(a,b) = gcd(b, a%b)',
          '当b=0时，a就是GCD',
          'lcm = a * b / gcd(a,b)',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '计算LCM时先乘后除导致溢出',
        why: 'a*b可能超出int范围',
        correctWay: '先除以GCD再乘'
      },
    ],
    quiz: {
      question: 'GCD(48, 36) = ?',
      options: ['6', '12', '24', '48'],
      answer: 1,
      explanation: '48=2⁴×3, 36=2²×3², GCD=2²×3=12。'
    },
    prerequisites: [4, 47],
    recommendedProblems: [38, 39, 40],
    readTime: 25,
  },
  {
    id: 56,
    slug: 'prime',
    title: '素数和质因数分解',
    icon: '🎯',
    category: 'math',
    difficulty: 'basic',
    brief: '学习素数的判断和分解',
    description: '素数是只能被1和自身整除的数，质因数分解是将数分解为素数的乘积。',
    content: [
      '素数的定义',
      '判断素数的方法',
      '埃氏筛法',
      '质因数分解',
      '素数的应用',
    ],
    kidFriendly: {
      analogy: '素数就像"不可分割的原子"。它们不能被分解成更小的数相乘。2,3,5,7,11...都是素数。',
      visualization: '🎯 素数表：\n2,3,5,7,11,13,17,19,23,29...\n\n分解：12 = 2² × 3',
      whyLearn: '密码学、数论问题都离不开素数。'
    },
    codeExamples: [
      {
        title: '判断素数和筛法',
        description: '多种方法',
        code: `#include <iostream>
#include <cmath>
using namespace std;

// 判断单个数是否为素数
bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

// 埃氏筛法
void sieve(bool prime[], int n) {
    for (int i = 2; i <= n; i++) {
        prime[i] = true;
    }
    
    for (int i = 2; i * i <= n; i++) {
        if (prime[i]) {
            for (int j = i * i; j <= n; j += i) {
                prime[j] = false;
            }
        }
    }
}

int main() {
    cout << "100以内的素数：" << endl;
    for (int i = 2; i <= 100; i++) {
        if (isPrime(i)) cout << i << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '100以内的素数：\n2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97',
        explanation: [
          '只需检查到√n',
          '埃氏筛法适合找一定范围内的素数',
          '筛法的时间复杂度是O(n log log n)',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '判断素数时检查到n-1',
        why: '效率太低',
        correctWay: '检查到√n就够了'
      },
    ],
    quiz: {
      question: '最小的素数是？',
      options: ['1', '2', '3', '0'],
      answer: 1,
      explanation: '2是最小的素数，也是唯一的偶素数。'
    },
    prerequisites: [4, 19],
    recommendedProblems: [38, 39, 40],
    readTime: 25,
  },
  // ==================== 复杂度分析 ====================
  {
    id: 57,
    slug: 'complexity-intro',
    title: '时间复杂度概念',
    icon: '⏱️',
    category: 'advanced',
    difficulty: 'intermediate',
    brief: '衡量算法的效率',
    description: '时间复杂度用于衡量算法运行时间随输入规模增长的趋势。',
    content: [
      '什么是时间复杂度？',
      '大O表示法',
      '常见的时间复杂度',
      '如何计算时间复杂度',
      '空间复杂度简介',
    ],
    kidFriendly: {
      analogy: '时间复杂度就像预测做作业的时间。作业越多，需要多长时间？线性增长？还是爆炸式增长？',
      visualization: '⏱️ 常见复杂度：\nO(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n)\n慢 ←─────────────────────────────────→ 快',
      whyLearn: '理解复杂度才能写出高效的程序，避免超时。'
    },
    codeExamples: [
      {
        title: '不同复杂度示例',
        description: '直观感受',
        code: `#include <iostream>
using namespace std;

// O(1) - 常数时间
int first(int arr[], int n) {
    return arr[0];
}

// O(n) - 线性时间
int sum(int arr[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) {
        s += arr[i];
    }
    return s;
}

// O(n²) - 平方时间
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - 1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}

int main() {
    cout << "O(1): 访问第一个元素" << endl;
    cout << "O(n): 求和" << endl;
    cout << "O(n²): 冒泡排序" << endl;
    return 0;
}`,
        expectedOutput: 'O(1): 访问第一个元素\nO(n): 求和\nO(n²): 冒泡排序',
        explanation: [
          'O(1)：不管数据多大，都是一次操作',
          'O(n)：数据量翻倍，时间翻倍',
          'O(n²)：数据量翻倍，时间变4倍',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忽略常数因子',
        why: 'O(2n)和O(n)都是O(n)',
        correctWay: '大O只看最高次项，忽略常数'
      },
    ],
    quiz: {
      question: '嵌套两层循环，外层n次，内层n次，时间复杂度是？',
      options: ['O(n)', 'O(n²)', 'O(2n)', 'O(log n)'],
      answer: 1,
      explanation: 'n×n=n²次操作。'
    },
    prerequisites: [19, 25],
    recommendedProblems: [60, 61, 62],
    readTime: 30,
  },
  {
    id: 58,
    slug: 'space-complexity',
    title: '空间复杂度',
    icon: '💾',
    category: 'advanced',
    difficulty: 'intermediate',
    brief: '衡量算法的内存使用',
    description: '空间复杂度用于衡量算法运行所需的额外内存空间。',
    content: [
      '什么是空间复杂度？',
      '常见空间复杂度',
      '空间换时间',
      '递归的空间复杂度',
      '优化空间的方法',
    ],
    kidFriendly: {
      analogy: '空间复杂度就像做作业需要多少张纸。有的算法省纸（O(1)），有的算法很废纸（O(n)），递归最费纸（栈空间）。',
      visualization: '💾 空间复杂度：\nO(1): 只用几个变量\nO(n): 用一个数组\nO(n²): 用二维数组\nO(递归深度): 递归调用栈',
      whyLearn: '内存有限，空间复杂度太高会内存超限。'
    },
    codeExamples: [
      {
        title: '不同空间复杂度示例',
        description: '直观感受',
        code: `#include <iostream>
using namespace std;

// O(1)空间 - 只用几个变量
int sum(int arr[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) {
        s += arr[i];
    }
    return s;
}

// O(n)空间 - 用一个额外数组
void copy(int arr[], int n) {
    int temp[1000];
    for (int i = 0; i < n; i++) {
        temp[i] = arr[i];
    }
}

// O(n)递归栈空间
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    cout << "sum: " << sum(arr, 5) << endl;
    return 0;
}`,
        expectedOutput: 'sum: 15',
        explanation: [
          '只用变量：O(1)',
          '用数组：O(n)',
          '递归：O(递归深度)',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '递归太深导致栈溢出',
        why: '每层递归都要占用栈空间',
        correctWay: '限制递归深度，或改用迭代'
      },
    ],
    quiz: {
      question: '递归深度为n，空间复杂度是？',
      options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
      answer: 1,
      explanation: '每层递归占用栈空间，n层就是O(n)。'
    },
    prerequisites: [57, 47],
    recommendedProblems: [60, 61, 62],
    readTime: 25,
  },
  // ==================== 贪心算法 ====================
  {
    id: 59,
    slug: 'greedy-intro',
    title: '贪心算法概念',
    icon: '💰',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '每一步选择局部最优',
    description: '贪心算法在每一步都做出当前看起来最优的选择，期望得到全局最优解。',
    content: [
      '什么是贪心？',
      '贪心的特点',
      '贪心 vs 动态规划',
      '贪心的正确性证明',
      '典型贪心问题',
    ],
    kidFriendly: {
      analogy: '贪心就像买东西只看眼前。每次选最便宜的，希望最后总花费最少。有时候对，有时候不对。',
      visualization: '💰 贪心思路：\n每一步：选择当前最优\n期望：最终得到全局最优\n注意：不总是正确！',
      whyLearn: '很多问题用贪心可以简单快速解决，但要证明正确性。'
    },
    codeExamples: [
      {
        title: '贪心示例',
        description: '找零钱问题',
        code: `#include <iostream>
using namespace std;

int main() {
    int money;
    cin >> money;
    
    int count = 0;
    int coins[] = {100, 50, 20, 10, 5, 1};
    
    // 贪心：每次用最大的硬币
    for (int i = 0; i < 6; i++) {
        count += money / coins[i];
        money %= coins[i];
    }
    
    cout << "最少硬币数：" << count << endl;
    return 0;
}`,
        input: '186',
        expectedOutput: '最少硬币数：4',
        explanation: [
          '每次选最大的硬币',
          '186 = 100 + 50 + 20 + 10 + 5 + 1',
          '对于人民币面额，贪心是正确的',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '所有问题都用贪心',
        why: '贪心不总是能得到最优解',
        correctWay: '先思考贪心是否正确'
      },
    ],
    quiz: {
      question: '贪心算法的特点是？',
      options: ['回溯求解', '每步选当前最优', '动态规划', '分治'],
      answer: 1,
      explanation: '贪心就是每一步都做当前最好的选择。'
    },
    prerequisites: [19, 38],
    recommendedProblems: [63, 64, 65],
    readTime: 25,
  },
];

// 获取所有知识点
export function getAllKnowledgePoints(): KnowledgePoint[] {
  return knowledgePoints;
}

// 根据分类获取知识点
export function getKnowledgeByCategory(category: KnowledgePoint['category']): KnowledgePoint[] {
  return knowledgePoints.filter(k => k.category === category);
}

// 根据难度获取知识点
export function getKnowledgeByDifficulty(difficulty: KnowledgePoint['difficulty']): KnowledgePoint[] {
  return knowledgePoints.filter(k => k.difficulty === difficulty);
}

// 根据slug获取知识点
export function getKnowledgeBySlug(slug: string): KnowledgePoint | undefined {
  return knowledgePoints.find(k => k.slug === slug);
}

// 根据ID获取知识点
export function getKnowledgeById(id: number): KnowledgePoint | undefined {
  return knowledgePoints.find(k => k.id === id);
}

// 获取知识点的前置知识点
export function getPrerequisites(id: number): KnowledgePoint[] {
  const point = getKnowledgeById(id);
  if (!point || !point.prerequisites) return [];
  return point.prerequisites
    .map(pid => getKnowledgeById(pid))
    .filter((k): k is KnowledgePoint => k !== undefined);
}

// 获取知识点总数
export function getKnowledgeCount(): number {
  return knowledgePoints.length;
}

// 获取不同难度的知识点数量统计
export function getDifficultyStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  knowledgePoints.forEach(k => {
    stats[k.difficulty] = (stats[k.difficulty] || 0) + 1;
  });
  return stats;
}

// 获取不同分类的知识点数量统计
export function getCategoryStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  knowledgePoints.forEach(k => {
    stats[k.category] = (stats[k.category] || 0) + 1;
  });
  return stats;
}

// 别名函数（向后兼容）
export const getKnowledgePointBySlug = getKnowledgeBySlug;
export const getKnowledgePointById = getKnowledgeById;

// 搜索知识点
export function searchKnowledgePoints(query: string): KnowledgePoint[] {
  const lowerQuery = query.toLowerCase();
  return knowledgePoints.filter(k => 
    k.title.toLowerCase().includes(lowerQuery) ||
    k.brief.toLowerCase().includes(lowerQuery) ||
    k.description.toLowerCase().includes(lowerQuery) ||
    k.slug.toLowerCase().includes(lowerQuery)
  );
}

// 获取推荐题目
export function getRecommendedProblems(id: number): number[] {
  const point = getKnowledgeById(id);
  return point?.recommendedProblems || [];
}

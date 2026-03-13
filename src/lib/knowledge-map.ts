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
  // 新增：适合小朋友理解的详细解释
  kidFriendly?: {
    // 生活类比
    analogy: string;
    // 形象化描述
    visualization: string;
    // 为什么要学这个
    whyLearn: string;
  };
  // 新增：详细代码示例（带注释）
  codeExamples?: {
    title: string;
    description: string;
    code: string;
    explanation: string[];
  }[];
  // 新增：常见错误
  commonMistakes?: {
    mistake: string;
    why: string;
    correctWay: string;
  }[];
  // 新增：小测验
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

// 知识点数据 - 扩展版
export const knowledgePoints: KnowledgePoint[] = [
  // ==================== 基础语法 ====================
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
        code: `#include <iostream>  // 这就像打开工具箱，拿出"输入输出"工具
using namespace std;   // 使用标准命名空间

int main() {
    // cout就像电脑的嘴巴，能说话
    // << 就像把话递给电脑的嘴巴
    // endl 表示换行（按回车）
    cout << "你好，世界！" << endl;
    
    return 0;  // 程序正常结束，告诉电脑"我做完了"
}`,
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
      {
        mistake: '漏掉 #include',
        why: '没有引入工具，电脑不知道cout是什么',
        correctWay: '开头写上 #include <iostream>'
      },
    ],
    quiz: {
      question: 'C++程序从哪里开始执行？',
      options: ['从第一行开始', '从main函数开始', '从#include开始', '从return 0开始'],
      answer: 1,
      explanation: 'C++程序总是从main函数开始执行，main就是"主角"的意思。'
    },
    prerequisites: [],
    recommendedProblems: [1, 2],
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
    description: 'Hello World是所有程序员学习新语言时写的第一个程序。虽然简单，但它包含了一个程序的基本结构。',
    content: [
      '什么是Hello World程序？',
      '程序的基本结构：头文件、命名空间、主函数',
      '如何输出文字到屏幕？',
      '编译和运行程序',
      '理解每个部分的作用',
    ],
    kidFriendly: {
      analogy: '写程序就像写作文。作文有开头、中间、结尾，程序也有固定的格式。Hello World就是最简单的"作文"，虽然短，但格式完整。',
      visualization: '📝 程序结构：\n┌─────────────────────┐\n│ #include（引入工具）  │\n│ main()（开始做事）    │\n│   cout（输出内容）    │\n│ return 0（结束）      │\n└─────────────────────┘',
      whyLearn: '这是你编程旅程的第一步！学会它，你就能让电脑显示任何你想说的话。'
    },
    codeExamples: [
      {
        title: '完整的Hello World程序',
        description: '让电脑显示多行文字',
        code: `#include <iostream>
using namespace std;

int main() {
    // 第一种写法：分开写
    cout << "Hello World!" << endl;
    cout << "你好，世界！" << endl;
    
    // 第二种写法：连着写
    cout << "我是" << "小明" << endl;
    
    // 第三种写法：多行文字
    cout << "第一行" << endl
         << "第二行" << endl
         << "第三行" << endl;
    
    return 0;
}`,
        explanation: [
          'endl 和 "\\n" 效果一样，都是换行',
          '<< 可以连续使用，把多个内容连起来',
          'cout 可以输出中文、英文、数字等各种内容',
        ]
      },
      {
        title: '输出特殊字符',
        description: '如何输出引号、反斜杠等特殊符号',
        code: `#include <iostream>
using namespace std;

int main() {
    // 输出双引号要用 \\" 
    cout << "他说：\\"你好！\\"" << endl;
    
    // 输出反斜杠要用 \\\\
    cout << "文件路径：C:\\\\Users" << endl;
    
    // 输出单引号
    cout << "这是一个单引号：'" << endl;
    
    return 0;
}`,
        explanation: [
          '双引号在字符串中要用 \\" 转义',
          '反斜杠本身要用 \\\\ 表示',
          '这种"转义"的概念后面会经常用到',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '中英文符号混用',
        why: '中文的"；"和英文的";"长得很像，但电脑只认识英文符号',
        correctWay: '输入代码时用英文输入法，写注释时才用中文'
      },
      {
        mistake: 'cout 写成 Cout',
        why: 'C++区分大小写，cout和Cout是完全不同的东西',
        correctWay: '全部用小写 cout'
      },
    ],
    quiz: {
      question: '哪个代码能正确输出"Hello"并换行？',
      options: ['cout << "Hello"', 'cout << "Hello" << endl;', 'Cout << "Hello" << endl;', 'cout >> "Hello" >> endl;'],
      answer: 1,
      explanation: 'A没有分号和换行；C用了大写C；D用了错误的箭头方向（应该是<<不是>>）'
    },
    prerequisites: [1],
    recommendedProblems: [1, 19],
    readTime: 20,
  },
  {
    id: 3,
    slug: 'cin-cout',
    title: 'cin和cout',
    icon: '⌨️',
    category: 'basics',
    difficulty: 'basic',
    brief: '学会让程序和人对话：输入和输出',
    description: 'cin和cout是C++中最基本的输入输出方式。cin用来接收键盘输入，cout用来显示输出到屏幕。',
    content: [
      'cout的基本用法：输出文字和数字',
      'cin的基本用法：接收键盘输入',
      '连续输入输出的写法',
      'endl和\\n的区别',
      '常见格式化输出',
    ],
    kidFriendly: {
      analogy: 'cout就像电脑的"嘴巴"，能说话（显示内容）；cin就像电脑的"耳朵"，能听你说话（接收输入）。<<就像把东西递给嘴巴说出去，>>就像耳朵听到东西存起来。',
      visualization: '📢 输出过程：\n你的数据 → << → cout → 屏幕\n\n👂 输入过程：\n键盘 → cin → >> → 你的变量',
      whyLearn: '有了输入输出，你的程序就能和用户互动了！比如做一个计算器，用户输入数字，你算出答案显示出来。'
    },
    codeExamples: [
      {
        title: '输入一个数字并输出',
        description: '让用户输入年龄，然后程序显示出来',
        code: `#include <iostream>
using namespace std;

int main() {
    int age;  // 定义一个"盒子"装年龄
    
    cout << "请输入你的年龄：";
    cin >> age;  // 等待用户输入，存到age里
    
    cout << "你今年" << age << "岁啦！" << endl;
    
    return 0;
}`,
        explanation: [
          'int age; 声明一个整数变量（相当于准备一个盒子）',
          'cin >> age; 等待用户输入数字，存到age里',
          'cin用>>，cout用<<，箭头指向数据流动的方向',
        ]
      },
      {
        title: '输入多个数据',
        description: '让用户输入名字和年龄',
        code: `#include <iostream>
#include <string>  // 使用string类型需要这个头文件
using namespace std;

int main() {
    string name;  // 字符串类型，装名字
    int age;      // 整数类型，装年龄
    
    cout << "请输入你的名字和年龄（空格分隔）：";
    cin >> name >> age;  // 连续输入
    
    cout << "你好，" << name << "！" << endl;
    cout << "你今年" << age << "岁了。" << endl;
    
    return 0;
}`,
        explanation: [
          'string是字符串类型，可以存储文字',
          'cin >> name >> age; 可以一次输入多个值',
          '输入时用空格或回车分隔不同的值',
        ]
      },
      {
        title: '计算两数之和',
        description: '输入两个数，计算并输出和',
        code: `#include <iostream>
using namespace std;

int main() {
    int a, b;  // 定义两个整数变量
    
    cout << "请输入两个整数：";
    cin >> a >> b;
    
    int sum = a + b;  // 计算和
    
    cout << a << " + " << b << " = " << sum << endl;
    
    return 0;
}

/*
运行示例：
请输入两个整数：3 5
3 + 5 = 8
*/`,
        explanation: [
          'int a, b; 一次定义多个同类型变量',
          'int sum = a + b; 定义的同时赋值',
          '输出时可以混合输出变量和文字',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'cin和cout的方向搞反',
        why: '箭头方向表示数据流动方向',
        correctWay: 'cin >> 变量（数据流入变量）；cout << 内容（数据流出显示）'
      },
      {
        mistake: '变量没定义就用',
        why: '变量必须先定义（准备盒子），才能使用',
        correctWay: '先写 int a; 然后才能 cin >> a;'
      },
    ],
    quiz: {
      question: '用户输入"10 20"，执行cin >> a >> b;后，a和b的值分别是？',
      options: ['a=10, b=20', 'a=20, b=10', 'a=1020, b=0', 'a=10, b=10'],
      answer: 0,
      explanation: 'cin会自动识别空格，10给a，20给b'
    },
    prerequisites: [1, 2],
    recommendedProblems: [1, 19, 20],
    readTime: 25,
  },
  {
    id: 4,
    slug: 'variables',
    title: '变量的概念',
    icon: '📦',
    category: 'basics',
    difficulty: 'basic',
    brief: '理解什么是变量，学会定义和使用变量',
    description: '变量就像一个个小盒子，用来存储程序运行过程中的数据。每个盒子有自己的名字（变量名）和类型。',
    content: [
      '什么是变量？存储数据的容器',
      '变量名命名规则',
      '变量的定义和初始化',
      '变量的赋值操作',
      '变量在程序中的作用',
    ],
    kidFriendly: {
      analogy: '想象你有很多盒子，每个盒子装不同的东西。有的盒子装数字（int），有的装文字（string），有的装小数（double）。盒子外面贴着标签，那就是变量名。',
      visualization: '📦 变量示意图：\n┌─────────────┐\n│ age (标签)   │\n│ ┌─────────┐ │\n│ │   12     │ │ ← 存的值\n│ └─────────┘ │\n│ 类型: int    │\n└─────────────┘',
      whyLearn: '没有变量，程序就记不住任何东西！就像做数学题，没有纸笔记录，只能心算很困难。'
    },
    codeExamples: [
      {
        title: '定义和使用变量',
        description: '变量的定义、赋值和修改',
        code: `#include <iostream>
using namespace std;

int main() {
    // 定义变量（准备盒子）
    int score;        // 定义一个整数变量
    
    // 赋值（往盒子里放东西）
    score = 100;      // 初始分数100
    
    cout << "初始分数：" << score << endl;
    
    // 修改变量值（换个东西放盒子里）
    score = 95;
    cout << "修改后分数：" << score << endl;
    
    // 在原值基础上修改
    score = score - 10;  // 先取出值，减10，再放回去
    cout << "扣分后分数：" << score << endl;
    
    return 0;
}`,
        explanation: [
          'int score; 只是定义，盒子里还是空的（或随机值）',
          'score = 100; 是赋值，把100放进盒子里',
          'score = score - 10; 先取出score的值，减10，结果放回score',
        ]
      },
      {
        title: '变量命名规范',
        description: '好的变量名让程序更易读',
        code: `#include <iostream>
using namespace std;

int main() {
    // ✅ 好的变量名（见名知意）
    int studentAge = 12;      // 学生年龄
    double height = 1.55;     // 身高（米）
    string studentName = "小明"; // 姓名
    int mathScore = 98;       // 数学成绩
    
    // ❌ 不好的变量名（看不出是什么）
    int a = 12;      // a是什么？
    double x = 1.55; // x代表什么？
    string s = "小明"; // s太短了
    
    // 变量命名规则：
    // 1. 只能用字母、数字、下划线
    // 2. 不能以数字开头
    // 3. 不能用C++关键字（如int, if, while）
    // 4. 区分大小写（age和Age是不同的变量）
    
    // 有效的命名方式：
    int my_age;      // 下划线风格
    int myAge;       // 驼峰风格
    int MyAge;       // 大驼峰
    
    cout << studentName << "今年" << studentAge << "岁" << endl;
    
    return 0;
}`,
        explanation: [
          '变量名要有意义，看名字就知道存什么',
          '两种常见命名风格：下划线(my_age)和驼峰(myAge)',
          'C++关键字不能当变量名，如int、if、while等',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '变量名用数字开头',
        why: 'C++规定变量名不能以数字开头',
        correctWay: '把数字放后面，如 score1, age2'
      },
      {
        mistake: '使用中文变量名',
        why: '有些编译器不支持，可能导致错误',
        correctWay: '用英文或拼音命名，如 age, nianling'
      },
    ],
    quiz: {
      question: '以下哪个是有效的变量名？',
      options: ['2name', 'my-name', 'my_age', 'int'],
      answer: 2,
      explanation: 'A以数字开头；B包含减号（只能用字母数字下划线）；D是关键字；C是有效命名'
    },
    prerequisites: [1, 2, 3],
    recommendedProblems: [1, 4, 5],
    readTime: 30,
  },
  {
    id: 5,
    slug: 'data-types',
    title: '基本数据类型',
    icon: '📊',
    category: 'basics',
    difficulty: 'basic',
    brief: '了解C++中的各种数据类型及其用途',
    description: '不同的数据需要不同类型的"盒子"来存储。整数用int，小数用double，字符用char，文字用string。',
    content: [
      '整数类型：int, long long',
      '浮点类型：float, double',
      '字符类型：char',
      '字符串类型：string',
      '布尔类型：bool',
      '如何选择合适的数据类型？',
    ],
    kidFriendly: {
      analogy: '数据类型就像不同形状的盒子：\n📦 int盒子装整数（1, 2, -3, 100）\n📦 double盒子装小数（3.14, 2.5）\n📦 char盒子装单个字符（\'a\', \'B\', \'5\'）\n📦 string盒子装文字（"Hello"）\n📦 bool盒子装是/否（true/false）',
      visualization: '📊 数据类型对比：\n┌──────────┬────────────┬─────────────┐\n│   类型   │   存什么   │    举例     │\n├──────────┼────────────┼─────────────┤\n│   int    │   整数     │ 42, -7, 0   │\n│  double  │   小数     │ 3.14, 2.0   │\n│   char   │  单个字符  │ \'A\', \'?\'   │\n│  string  │   文字串   │ "Hello"    │\n│   bool   │  是/否     │ true, false│\n└──────────┴────────────┴─────────────┘',
      whyLearn: '选对数据类型很重要！就像不能把大象装进冰箱，整数不能存小数，否则会丢失精度。'
    },
    codeExamples: [
      {
        title: '各种数据类型演示',
        description: '不同类型变量的定义和使用',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // 整数类型
    int age = 12;           // 普通整数，范围约±21亿
    long long bigNumber = 1234567890123LL; // 大整数
    
    // 浮点类型（小数）
    double pi = 3.14159;    // 双精度浮点数，精度更高
    float height = 1.55f;   // 单精度浮点数
    
    // 字符类型（单个字符）
    char grade = 'A';       // 用单引号
    char symbol = '+';
    
    // 字符串类型（多个字符）
    string name = "小明";    // 用双引号
    string message = "Hello World!";
    
    // 布尔类型（真/假）
    bool isStudent = true;  // 是学生
    bool isAdult = false;   // 不是成年人
    
    // 输出
    cout << "姓名：" << name << endl;
    cout << "年龄：" << age << "岁" << endl;
    cout << "身高：" << height << "米" << endl;
    cout << "成绩等级：" << grade << endl;
    cout << "π ≈ " << pi << endl;
    
    return 0;
}`,
        explanation: [
          'int能存储的整数范围：约-21亿到+21亿',
          '需要更大的数用 long long',
          '小数用 double，比 float 精度高',
          'char 用单引号，string 用双引号',
        ]
      },
      {
        title: '类型不匹配的问题',
        description: '选错类型会有什么后果',
        code: `#include <iostream>
using namespace std;

int main() {
    // 问题1：整数存小数，小数部分丢失
    int a = 3.9;
    cout << "int存3.9 = " << a << endl;  // 输出3！
    
    // 问题2：超出范围
    // int b = 3000000000;  // 超过int范围，会溢出
    
    // 正确做法：使用合适的类型
    double c = 3.9;
    cout << "double存3.9 = " << c << endl;  // 输出3.9
    
    long long d = 3000000000LL;
    cout << "long long存大数 = " << d << endl;
    
    return 0;
}

/*
输出结果：
int存3.9 = 3
double存3.9 = 3.9
long long存大数 = 3000000000
*/`,
        explanation: [
          'int 只能存整数，3.9 变成 3',
          'int 范围有限，超过会溢出（变成负数）',
          '大数用 long long，小数用 double',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '用int存小数',
        why: 'int会丢弃小数部分',
        correctWay: '需要小数时用 double'
      },
      {
        mistake: 'char用双引号',
        why: '双引号是字符串，单引号才是字符',
        correctWay: 'char c = \'A\'; // 单引号'
      },
    ],
    quiz: {
      question: '存储学生成绩（如95.5分）应该用什么类型？',
      options: ['int', 'char', 'double', 'string'],
      answer: 2,
      explanation: '成绩可能有小数，用double最合适。int会丢失小数部分。'
    },
    prerequisites: [4],
    recommendedProblems: [4, 5, 6],
    readTime: 35,
  },
  {
    id: 6,
    slug: 'if-else',
    title: 'if-else语句',
    icon: '🔀',
    category: 'basics',
    difficulty: 'basic',
    brief: '让程序学会判断：根据条件执行不同代码',
    description: 'if-else让程序有了"思考"的能力。它可以根据条件判断，选择执行不同的代码。',
    content: [
      'if语句的基本结构',
      'else语句的使用',
      'else if多重判断',
      '条件表达式的写法',
      '代码块和缩进',
    ],
    kidFriendly: {
      analogy: 'if-else就像生活中的选择：\n"如果下雨，就带伞；否则，就戴帽子。"\n\n程序也是这样：\nif (下雨) { 带伞 } else { 戴帽子 }',
      visualization: '🔀 if-else流程图：\n        ┌─────────┐\n        │ 条件？  │\n        └────┬────┘\n         是↙   ↘否\n    ┌────────┐ ┌────────┐\n    │ 执行if │ │执行else│\n    └────────┘ └────────┘\n         ↘       ↙\n          └─────┘\n           继续',
      whyLearn: '没有判断，程序只能从头执行到尾。有了if-else，程序就能根据不同情况做不同的事！'
    },
    codeExamples: [
      {
        title: '基本if-else',
        description: '判断成绩是否及格',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "请输入成绩：";
    cin >> score;
    
    // if-else判断
    if (score >= 60) {
        // 成绩>=60时执行
        cout << "恭喜，你及格了！" << endl;
    } else {
        // 成绩<60时执行
        cout << "很遗憾，你没及格。" << endl;
    }
    
    return 0;
}

/*
运行示例1：
请输入成绩：75
恭喜，你及格了！

运行示例2：
请输入成绩：45
很遗憾，你没及格。
*/`,
        explanation: [
          'if后面的小括号里是判断条件',
          '条件为真(true)执行if里的代码',
          '条件为假(false)执行else里的代码',
          '大括号{}里的代码是一个整体',
        ]
      },
      {
        title: '多重判断',
        description: '根据成绩输出等级',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "请输入成绩：";
    cin >> score;
    
    // 多重判断（从上到下依次判断）
    if (score >= 90) {
        cout << "优秀！等级：A" << endl;
    } else if (score >= 80) {
        cout << "良好！等级：B" << endl;
    } else if (score >= 60) {
        cout << "及格。等级：C" << endl;
    } else {
        cout << "不及格。等级：D" << endl;
    }
    
    // 注意：else if会按顺序判断
    // score=85时，先判断>=90(不满足)
    // 再判断>=80(满足)，输出B
    
    return 0;
}`,
        explanation: [
          'else if 用于多重判断',
          '程序会从上到下依次判断，遇到第一个满足的条件就执行',
          '一旦某个条件满足，后面的就不再判断了',
        ]
      },
      {
        title: '嵌套if',
        description: 'if里面还可以有if',
        code: `#include <iostream>
using namespace std;

int main() {
    int age;
    bool hasTicket;
    
    cout << "请输入年龄：";
    cin >> age;
    cout << "是否有票(1是/0否)：";
    cin >> hasTicket;
    
    // 嵌套if判断
    if (age >= 18) {
        // 成年人
        if (hasTicket) {
            cout << "欢迎入场！" << endl;
        } else {
            cout << "请先买票。" << endl;
        }
    } else {
        // 未成年人
        if (hasTicket) {
            cout << "需要家长陪同。" << endl;
        } else {
            cout << "请家长来买票。" << endl;
        }
    }
    
    return 0;
}`,
        explanation: [
          'if里面可以再套if，这叫嵌套',
          '注意代码的缩进，让结构更清晰',
          '嵌套层数不宜太多，否则代码难懂',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'if后面加分号',
        why: '分号表示语句结束，if会被当成空语句',
        correctWay: 'if (条件) { ... } 不要加分号'
      },
      {
        mistake: '忘记加大括号',
        why: '没有大括号，if只能控制后面一句话',
        correctWay: '养成加大括号的习惯，即使只有一句'
      },
    ],
    quiz: {
      question: 'score=75时，以下代码输出什么？\nif (score >= 90) cout << "A";\nelse if (score >= 60) cout << "B";\nelse cout << "C";',
      options: ['A', 'B', 'C', '什么都不输出'],
      answer: 1,
      explanation: '75不满足>=90，满足>=60，所以输出B'
    },
    prerequisites: [4, 5],
    recommendedProblems: [7, 8, 9, 24, 25],
    readTime: 35,
  },
  {
    id: 7,
    slug: 'for-loop',
    title: 'for循环',
    icon: '🔄',
    category: 'basics',
    difficulty: 'basic',
    brief: '让程序重复执行：for循环详解',
    description: 'for循环是编程中最常用的循环结构，适合在知道循环次数的情况下使用。',
    content: [
      'for循环的基本语法',
      '循环变量的作用',
      '循环的执行流程',
      '循环次数的控制',
      '常见循环模式',
    ],
    kidFriendly: {
      analogy: 'for循环就像体育课跑圈：\n"绕操场跑5圈"\nfor (第1圈; 还没跑完5圈; 跑完一圈)\n{ 跑一圈 }\n\n循环变量就是"计数器"，记录跑了多少圈。',
      visualization: '🔄 for循环执行过程：\n\nfor (初始化; 条件; 更新) {\n    循环体\n}\n\n执行顺序：\n① 初始化 → ② 判断条件 → ③ 执行循环体 → ④ 更新\n                ↑                         ↓\n                └─────────────────────←────┘',
      whyLearn: '想象一下，要输出100次"你好"，没有循环要写100行代码！有了循环，3行搞定。'
    },
    codeExamples: [
      {
        title: 'for循环基础',
        description: '输出1到5',
        code: `#include <iostream>
using namespace std;

int main() {
    // 输出1到5
    // i是循环变量（计数器）
    // i从1开始，到5结束，每次加1
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    
    // 详细解释for循环的三个部分：
    // 1. int i = 1;  初始化：设置起点
    // 2. i <= 5;     条件：设置终点
    // 3. i++         更新：每圈加1
    
    // 执行过程：
    // 第1次：i=1，1<=5成立，输出1，i变成2
    // 第2次：i=2，2<=5成立，输出2，i变成3
    // ...
    // 第6次：i=6，6<=5不成立，循环结束
    
    return 0;
}

/*
输出：1 2 3 4 5
*/`,
        explanation: [
          'for (初始化; 条件; 更新) 是固定格式',
          'i++ 等价于 i = i + 1',
          '循环变量i通常从0或1开始',
        ]
      },
      {
        title: '求1到100的和',
        description: '用循环累加',
        code: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;  // 存放和，初始为0
    
    // 把1到100加起来
    for (int i = 1; i <= 100; i++) {
        sum = sum + i;  // 把i加到sum里
        // 也可以写成：sum += i;
    }
    
    cout << "1+2+...+100 = " << sum << endl;
    
    // 也可以倒着加
    sum = 0;
    for (int i = 100; i >= 1; i--) {
        sum += i;
    }
    cout << "倒着加结果一样：" << sum << endl;
    
    return 0;
}

/*
输出：
1+2+...+100 = 5050
倒着加结果一样：5050
*/`,
        explanation: [
          'sum 变量用于累加结果',
          'i-- 表示 i = i - 1，每次减1',
          'sum += i 是 sum = sum + i 的简写',
        ]
      },
      {
        title: '打印乘法表',
        description: '嵌套for循环',
        code: `#include <iostream>
using namespace std;

int main() {
    // 打印9×9乘法表
    
    // 外层循环控制行（第几行）
    for (int i = 1; i <= 9; i++) {
        
        // 内层循环控制列（每行几个）
        for (int j = 1; j <= i; j++) {
            cout << j << "×" << i << "=" << i*j << "\t";
        }
        cout << endl;  // 每行结束后换行
    }
    
    return 0;
}

/*
输出：
1×1=1
1×2=2	2×2=4
1×3=3	2×3=6	3×3=9
...
*/`,
        explanation: [
          '外层循环执行1次，内层循环执行一轮',
          '\t 是制表符，让输出对齐',
          'j <= i 保证每行的列数等于行号',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '循环条件写成 i < n（本意是<=n）',
        why: '会少循环一次',
        correctWay: '根据需求选择 < 或 <='
      },
      {
        mistake: '死循环（条件永远成立）',
        why: '循环永远不会停止',
        correctWay: '确保循环变量最终能让条件不成立'
      },
    ],
    quiz: {
      question: 'for (int i = 0; i < 5; i++) 循环执行几次？',
      options: ['4次', '5次', '6次', '无限次'],
      answer: 1,
      explanation: 'i依次为0,1,2,3,4，共5次。i=5时5<5不成立，退出循环'
    },
    prerequisites: [4, 5, 6],
    recommendedProblems: [10, 11, 12, 27, 28],
    readTime: 40,
  },
  {
    id: 8,
    slug: 'while-loop',
    title: 'while循环',
    icon: '🔁',
    category: 'basics',
    difficulty: 'basic',
    brief: '当...时重复执行：while循环',
    description: 'while循环适合在不知道具体循环次数，只知道结束条件的情况下使用。',
    content: [
      'while循环的基本语法',
      '与for循环的区别',
      '何时使用while循环',
      'do-while循环',
      '避免死循环',
    ],
    kidFriendly: {
      analogy: 'while循环就像"吃自助餐"：\n"当(还没吃饱)时 { 继续吃 }"\n\n你不知道要吃多少口，只知道吃饱了就停。这就是while循环。',
      visualization: '🔄 while循环结构：\n        ┌──────────┐\n        │ 条件？   │\n        └────┬─────┘\n        成立↙   ↘不成立\n    ┌────────┐    │\n    │循环体   │    │\n    │更新变量 │    │\n    └────┬───┘    │\n         └────────┘\n              ↓\n           继续',
      whyLearn: '有些时候我们不知道要循环多少次，只知道什么时候该停。这时候用while最合适！'
    },
    codeExamples: [
      {
        title: 'while循环基础',
        description: '猜数字游戏',
        code: `#include <iostream>
using namespace std;

int main() {
    int answer = 42;  // 正确答案
    int guess;
    
    cout << "猜一个1-100的数字" << endl;
    
    // 当猜的数不对时，继续猜
    cout << "请输入你的猜测：";
    cin >> guess;
    
    while (guess != answer) {
        // 给提示
        if (guess > answer) {
            cout << "太大了！再试：";
        } else {
            cout << "太小了！再试：";
        }
        cin >> guess;
    }
    
    cout << "恭喜你，猜对了！" << endl;
    
    return 0;
}`,
        explanation: [
          'while(条件)：条件成立就一直执行',
          '每次循环前都会检查条件',
          '必须在循环体内改变条件相关变量，否则死循环',
        ]
      },
      {
        title: '计算位数',
        description: '输入一个数，输出它有几位',
        code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "请输入一个正整数：";
    cin >> n;
    
    int count = 0;
    
    // 当n还有位数时，继续
    while (n > 0) {
        count++;      // 计数+1
        n = n / 10;   // 去掉最后一位
    }
    
    // 特殊情况：n原来是0
    if (count == 0) count = 1;
    
    cout << "这个数有 " << count << " 位" << endl;
    
    return 0;
}

/*
示例：n = 123
第1次：count=1, n=12 (123/10=12)
第2次：count=2, n=1  (12/10=1)
第3次：count=3, n=0  (1/10=0)
退出循环，count=3
*/`,
        explanation: [
          'n/10 整除，去掉最后一位数字',
          '循环次数就是数字位数',
          '这个程序展示了while循环的经典用法',
        ]
      },
      {
        title: 'do-while循环',
        description: '先执行一次再判断',
        code: `#include <iostream>
using namespace std;

int main() {
    int choice;
    
    // do-while至少执行一次
    // 适合"先做，再问要不要继续"的场景
    do {
        cout << "\\n===== 菜单 =====" << endl;
        cout << "1. 开始游戏" << endl;
        cout << "2. 设置" << endl;
        cout << "3. 退出" << endl;
        cout << "请选择：";
        cin >> choice;
        
        if (choice == 1) {
            cout << "游戏开始！" << endl;
        } else if (choice == 2) {
            cout << "设置界面" << endl;
        }
        
    } while (choice != 3);  // 选择3才退出
    
    cout << "再见！" << endl;
    
    return 0;
}`,
        explanation: [
          'do-while 先执行循环体，再检查条件',
          '至少执行一次',
          '条件后面有分号',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记在循环内更新变量',
        why: '会导致死循环',
        correctWay: '确保循环条件最终会变为false'
      },
      {
        mistake: 'do-while忘记分号',
        why: 'while(条件)后面要有分号',
        correctWay: '} while (条件); // 有分号'
      },
    ],
    quiz: {
      question: 'while和do-while的主要区别是？',
      options: ['没有区别', 'while先判断后执行，do-while先执行后判断', 'do-while更快', 'while只能用一次'],
      answer: 1,
      explanation: 'do-while至少执行一次循环体，而while可能一次都不执行'
    },
    prerequisites: [7],
    recommendedProblems: [2, 27],
    readTime: 35,
  },
  {
    id: 9,
    slug: 'array-intro',
    title: '数组概念',
    icon: '📦',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '存储多个相同类型数据的数据结构',
    description: '数组是一组相同类型数据的集合，可以用下标快速访问每个元素。',
    content: [
      '什么是数组？',
      '数组的声明和初始化',
      '数组下标从0开始',
      '访问和修改数组元素',
      '数组的常见应用',
    ],
    kidFriendly: {
      analogy: '数组就像一排储物柜，每个柜子有编号（下标），从0开始。你可以用编号快速找到对应的柜子，取出或放进东西。',
      visualization: '📦 数组结构示意：\n\nint arr[5] = {10, 20, 30, 40, 50};\n\n下标:  [0]  [1]  [2]  [3]  [4]\n     ┌────┬────┬────┬────┬────┐\n     │ 10 │ 20 │ 30 │ 40 │ 50 │\n     └────┴────┴────┴────┴────┘\n\n注意：最大下标是4，不是5！',
      whyLearn: '如果要存100个学生的成绩，定义100个变量太麻烦了！用一个数组，一个变量名就能搞定。'
    },
    codeExamples: [
      {
        title: '数组基础',
        description: '声明、初始化、访问',
        code: `#include <iostream>
using namespace std;

int main() {
    // 声明数组：int arr[大小];
    int scores[5];  // 声明一个能存5个整数的数组
    
    // 初始化方式一：逐个赋值
    scores[0] = 90;
    scores[1] = 85;
    scores[2] = 78;
    scores[3] = 92;
    scores[4] = 88;
    
    // 初始化方式二：声明时直接初始化
    int grades[5] = {90, 85, 78, 92, 88};
    
    // 访问数组元素
    cout << "第一个成绩：" << scores[0] << endl;
    cout << "第三个成绩：" << scores[2] << endl;
    
    // 修改元素
    scores[2] = 80;  // 把第三个成绩改成80
    
    // 遍历数组
    for (int i = 0; i < 5; i++) {
        cout << "第" << i+1 << "个成绩：" << scores[i] << endl;
    }
    
    return 0;
}`,
        explanation: [
          '数组下标从0开始，不是1',
          'scores[0]是第1个元素，scores[4]是第5个',
          '访问数组用 数组名[下标]',
        ]
      },
      {
        title: '数组求和与找最值',
        description: '常见的数组操作',
        code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {3, 7, 2, 9, 5, 8, 1, 6, 4};
    int n = 9;  // 数组长度
    
    // 1. 求和
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    cout << "总和：" << sum << endl;
    
    // 2. 找最大值
    int maxVal = arr[0];  // 先假设第一个最大
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    cout << "最大值：" << maxVal << endl;
    
    // 3. 找最小值的位置
    int minIdx = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] < arr[minIdx]) {
            minIdx = i;
        }
    }
    cout << "最小值是第" << minIdx + 1 << "个数：" << arr[minIdx] << endl;
    
    return 0;
}`,
        explanation: [
          '求和：把所有元素加起来',
          '找最值：用"擂台赛"思想，一个一个比',
          '找位置：记录下标而不是值',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '数组越界',
        why: '访问arr[5]但数组只有5个元素（下标0-4）',
        correctWay: '下标范围是0到n-1'
      },
      {
        mistake: '下标从1开始算',
        why: 'C++数组下标从0开始',
        correctWay: '第1个元素是arr[0]，第n个是arr[n-1]'
      },
    ],
    quiz: {
      question: 'int arr[5]; 数组的最大下标是？',
      options: ['5', '4', '0', '不确定'],
      answer: 1,
      explanation: '数组有5个元素，下标从0到4，最大下标是4'
    },
    prerequisites: [5, 7],
    recommendedProblems: [13, 14, 15, 30, 31],
    readTime: 40,
  },
  // 省略其他知识点...
  // 由于篇幅限制，这里只展示部分知识点的详细内容
  // 实际使用时应该继续添加更多知识点
];

// 根据slug获取知识点
export function getKnowledgePointBySlug(slug: string): KnowledgePoint | undefined {
  return knowledgePoints.find(p => p.slug === slug);
}

// 根据ID获取知识点
export function getKnowledgePointById(id: number): KnowledgePoint | undefined {
  return knowledgePoints.find(p => p.id === id);
}

// 搜索知识点
export function searchKnowledgePoints(query: string): KnowledgePoint[] {
  const lowerQuery = query.toLowerCase();
  return knowledgePoints.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.brief.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}

// 根据分类获取知识点
export function getKnowledgePointsByCategory(category: string): KnowledgePoint[] {
  return knowledgePoints.filter(p => p.category === category);
}

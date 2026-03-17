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
    visualizationGif?: string; // 可视化动图演示URL
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
  relatedKnowledge?: number[]; // 相关知识点（横向关联）
  videoUrl?: string; // B站视频讲解链接
  videoSections?: string[]; // 视频章节时间点
  readTime: number;
  // 复习专用内容（用于阶段复习知识点）
  reviewContent?: {
    sections: {
      day: string;
      title: string;
      keyPoints: string[];
      commonMistakes: string[];
      relatedSlug: string;
    }[];
  };
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
      visualization: `🏛️ C++程序结构详解

【程序的组成】

    ┌─────────────────────────────────────────────────────┐
    │  #include <iostream>    ◀── 引入工具包              │
    │  using namespace std;   ◀── 使用标准命名空间        │
    │                                                     │
    │  int main() {             ◀── 主函数（程序入口）    │
    │      cout << "你好";      ◀── 做事情的代码          │
    │      return 0;            ◀── 程序结束，返回成功    │
    │  }                                                 │
    └─────────────────────────────────────────────────────┘

【程序执行流程】

    ┌────────────┐     ┌────────────┐     ┌────────────┐
    │   开 始    │ ──▶ │  main()    │ ──▶ │  执行代码  │
    └────────────┘     └────────────┘     └────────────┘
                                              │
                                              ▼
    ┌────────────┐     ┌────────────┐     ┌────────────┐
    │   结 束    │ ◀── │ return 0   │ ◀── │ 显示结果   │
    └────────────┘     └────────────┘     └────────────┘

【代码各部分解释】

    #include <iostream>
    ───────────────────
    │ 意思：包含输入输出流库
    │ 作用：让程序能使用 cout、cin 等功能
    │ 比喻：就像打开工具箱，拿出需要的工具
    ───────────────────
    
    using namespace std;
    ───────────────────
    │ 意思：使用标准命名空间
    │ 作用：可以直接写 cout 而不是 std::cout
    │ 比喻：就像说"用标准的那套规则"
    ───────────────────
    
    int main() { }
    ───────────────────
    │ 意思：主函数，程序的入口
    │ 作用：程序从这里开始执行
    │ 比喻：就像房子的正门，所有客人从这里进入
    ───────────────────
    
    return 0;
    ───────────────────
    │ 意思：返回0，表示程序成功结束
    │ 作用：告诉操作系统"我正常完成了"
    │ 比喻：就像说"任务完成，一切正常"
    ───────────────────

【为什么C++强大？】

    ┌─────────────────────────────────────────────────────┐
    │                    C++ 能做什么                      │
    ├─────────────────────────────────────────────────────┤
    │  🎮 游戏开发                                         │
    │     《我的世界》《魔兽世界》等大型游戏              │
    │                                                     │
    │  💻 系统软件                                         │
    │     Windows、Linux等操作系统                        │
    │                                                     │
    │  📱 应用程序                                         │
    │     浏览器、办公软件、图像处理软件                  │
    │                                                     │
    │  🏆 编程竞赛                                         │
    │     NOIP、NOI、IOI等信息学竞赛首选语言              │
    └─────────────────────────────────────────────────────┘`,
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
    relatedKnowledge: [2, 3, 4], // Hello World、变量、数据类型
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
      visualization: `📝 Hello World 程序详解

【完整代码】

    #include <iostream>          // ① 引入输入输出库
    using namespace std;         // ② 使用标准命名空间
    
    int main() {                 // ③ 主函数开始
        cout << "Hello World!";  // ④ 输出文字
        return 0;                // ⑤ 程序结束
    }                            // ⑥ 主函数结束

【代码执行顺序】

    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    │  ① #include <iostream>                                      │
    │     │                                                       │
    │     │  把"输入输出工具"加载进来                              │
    │     ▼                                                       │
    │  ② using namespace std;                                     │
    │     │                                                       │
    │     │  告诉程序用"标准"的那套规则                            │
    │     ▼                                                       │
    │  ③ int main() {                                             │
    │     │                                                       │
    │     │  程序从这里开始执行！                                  │
    │     ▼                                                       │
    │  ④ cout << "Hello World!";                                  │
    │     │                                                       │
    │     │  把"Hello World!"显示到屏幕上                          │
    │     ▼                                                       │
    │  ⑤ return 0;                                                │
    │     │                                                       │
    │     │  程序正常结束，返回成功信号                            │
    │     ▼                                                       │
    │  ⑥ }                                                        │
    │                                                             │
    │     程序完全结束                                            │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘

【每行代码详解】

    第1行：#include <iostream>
    ┌─────────────────────────────────────────────────────────────┐
    │ #include = "包含"                                           │
    │ iostream = input/output stream = 输入输出流                 │
    │                                                             │
    │ 比喻：就像去厨房做饭，先打开工具柜，拿出锅碗瓢盆            │
    │                                                             │
    │ 没有这行？程序不知道cout是什么，会报错！                    │
    └─────────────────────────────────────────────────────────────┘
    
    第2行：using namespace std;
    ┌─────────────────────────────────────────────────────────────┐
    │ namespace = 命名空间（把东西分类放的柜子）                  │
    │ std = standard = 标准                                       │
    │                                                             │
    │ 比喻：cout在std这个柜子里，用了这行就能直接拿               │
    │                                                             │
    │ 没有这行？要写 std::cout 而不是 cout                        │
    └─────────────────────────────────────────────────────────────┘
    
    第3行：int main() {
    ┌─────────────────────────────────────────────────────────────┐
    │ main = 主要的                                               │
    │ () = 函数的标志                                             │
    │ { = 代码块开始                                              │
    │                                                             │
    │ 比喻：这是房子的正门，程序从这里进入                        │
    │                                                             │
    │ 每个C++程序必须有且只有一个main函数！                       │
    └─────────────────────────────────────────────────────────────┘
    
    第4行：cout << "Hello World!";
    ┌─────────────────────────────────────────────────────────────┐
    │ cout = console output = 控制台输出                          │
    │ << = 插入运算符（把右边的东西送到左边）                     │
    │ "Hello World!" = 要输出的文字（用双引号包围）               │
    │ ; = 语句结束标志                                            │
    │                                                             │
    │ 比喻：把"Hello World!"这张纸条贴到公告板上                  │
    │                                                             │
    │ 结果：屏幕上显示 Hello World!                               │
    └─────────────────────────────────────────────────────────────┘
    
    第5行：return 0;
    ┌─────────────────────────────────────────────────────────────┐
    │ return = 返回                                               │
    │ 0 = 成功（非0表示有问题）                                   │
    │                                                             │
    │ 比喻：告诉操作系统"任务完成，一切正常"                      │
    └─────────────────────────────────────────────────────────────┘

【输出过程可视化】

    cout << "Hello World!";
    
    ┌───────────────────┐
    │  "Hello World!"   │
    └─────────┬─────────┘
              │
              │ << (插入运算符)
              │
              ▼
    ┌───────────────────┐
    │      cout         │ ──────▶ 📺 屏幕显示
    └───────────────────┘
    
    结果：
    ┌───────────────────┐
    │ Hello World!      │
    └───────────────────┘`,
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
    relatedKnowledge: [1, 3, 4], // C++入门、变量、数据类型
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
    relatedKnowledge: [4, 5], // 数据类型、运算符
    readTime: 15,
  },
  {
    id: 4,
    slug: 'variables',
    title: '变量的概念',
    icon: '📦',
    category: 'basics',
    difficulty: 'basic',
    brief: '学习如何在程序中存储数据，这是编程最重要的基础！',
    description: '变量就像盒子，可以存放各种数据。你可以把数字、文字放进去，以后再用。学编程，先学会"装东西"！',
    content: [
      '📦 什么是变量？就是一个带名字的盒子，用来存东西',
      '🏷️ 变量名：盒子的标签，方便你找到它',
      '📦 变量值：盒子里装的东西',
      '📋 变量类型：盒子的大小和形状',
      '✏️ 赋值：往盒子里放东西',
      '🔄 修改：换个东西放进去',
    ],
    kidFriendly: {
      analogy: `想象你去超市购物，需要一个购物篮来装东西。

🧺 购物篮 = 变量（存储东西的地方）
🏷️ 贴个标签"水果篮" = 变量名（方便找到）
🍎 里面装苹果 = 变量值（存储的数据）

当你说"水果篮"，就知道是哪个篮子，打开就能看到里面的苹果。

变量也一样！你给变量起个名字，存进去一个值，以后用这个名字就能找到这个值。`,
      visualization: `📦 变量的三个要素

┌─────────────────────────────────────────┐
│           变量 = 盒子 + 标签 + 内容        │
└─────────────────────────────────────────┘

【内存模型】电脑内存就像一排储物柜：

    内存地址:   0x001   0x002   0x003   0x004
              ┌───────┬───────┬───────┬───────┐
    变量名:    │  age  │ score │ name  │ ...   │
              ├───────┼───────┼───────┼───────┤
    变量值:    │   10  │  100  │ "小明" │       │
              └───────┴───────┴───────┴───────┘

【变量操作流程】

    声明变量（申请柜子）
         │
         ▼
    ┌─────────────┐
    │ int age;    │  ──→  电脑分配一个柜子
    └─────────────┘       贴上标签"age"
         │                里面是空的（未初始化）
         ▼
    赋值（往柜子里放东西）
         │
         ▼
    ┌─────────────┐
    │ age = 10;   │  ──→  把10放进age柜子
    └─────────────┘
         │
         ▼
    使用（从柜子里拿东西）
         │
         ▼
    ┌─────────────┐
    │ cout << age │  ──→  从age柜子取出值
    └─────────────┘       显示到屏幕上

【赋值运算符 = 的含义】

    age = 10;  不是"age等于10"
    
    正确理解：把10 → 放进 → age盒子
    
    ┌───────┐        ┌───────┐
    │   10  │ ──────▶│  age  │
    └───────┘        └───────┘
    
    就像快递员把包裹放进柜子！

【变量可以重复赋值】

    age = 10;  ──→  age柜子里的值变成10
    age = 20;  ──→  age柜子里的值变成20（10被覆盖）
    
    ┌───────────────────────────────┐
    │  age柜子的变化过程：           │
    │  空 → 10 → 20 → 30 → ...      │
    │       ↑    ↑    ↑              │
    │     第一次 第二次 第三次        │
    └───────────────────────────────┘`,
      whyLearn: `为什么一定要学变量？

🎮 假如你在玩游戏：
  - 你的分数需要记下来 → 用变量存分数
  - 你的生命值需要记下来 → 用变量存生命值
  - 你的等级需要记下来 → 用变量存等级

没有变量，程序就"记不住"任何东西！
就像没有购物篮，你买的东西往哪儿放？`
    },
    codeExamples: [
      {
        title: '示例1：存储你的信息',
        description: '用变量存储个人信息',
        code: `#include <iostream>
using namespace std;

int main() {
    // 声明变量（准备盒子）
    string name;   // 姓名盒子
    int age;       // 年龄盒子
    int score;     // 分数盒子
    
    // 赋值（往盒子里放东西）
    name = "小明";   // 放名字
    age = 10;        // 放年龄
    score = 100;     // 放分数
    
    // 使用变量（从盒子里拿东西）
    cout << "姓名：" << name << endl;
    cout << "年龄：" << age << endl;
    cout << "分数：" << score << endl;
    
    return 0;
}`,
        expectedOutput: '姓名：小明\n年龄：10\n分数：100',
        explanation: [
          'string name; → 申请一个放字符串的盒子，贴标签"name"',
          'name = "小明"; → 往name盒子里放"小明"',
          'cout << name; → 从name盒子里拿出东西显示出来',
          '注意：= 不是"相等"，是"放进去"的意思！',
        ]
      },
      {
        title: '示例2：变量的修改',
        description: '变量可以随时改变里面的值',
        code: `#include <iostream>
using namespace std;

int main() {
    int score = 0;  // 初始分数是0
    
    cout << "初始分数：" << score << endl;
    
    // 得分了！加10分
    score = 10;
    cout << "第一次得分后：" << score << endl;
    
    // 又得分了！再加10分
    score = score + 10;  // 从盒子里拿出10，加上10，放回去
    cout << "第二次得分后：" << score << endl;
    
    // 可以简写成：
    score += 10;  // 等同于 score = score + 10
    cout << "第三次得分后：" << score << endl;
    
    return 0;
}`,
        expectedOutput: '初始分数：0\n第一次得分后：10\n第二次得分后：20\n第三次得分后：30',
        explanation: [
          'score = 10; 把盒子清空，放入10',
          'score = score + 10; 把盒子里的数拿出来，加10，放回去',
          'score += 10; 是简写，效果一样',
          '变量之所以叫"变量"，就是因为可以变！',
        ]
      },
      {
        title: '示例3：变量的命名技巧',
        description: '好的变量名让程序更易懂',
        code: `#include <iostream>
using namespace std;

int main() {
    // ❌ 不好的命名（看不懂是什么）
    int a = 10;
    int b = 20;
    int c = a + b;
    cout << "结果是：" << c << endl;
    
    // ✅ 好的命名（一眼就懂）
    int applePrice = 10;    // 苹果价格
    int orangePrice = 20;   // 橙子价格
    int totalPrice = applePrice + orangePrice;  // 总价
    cout << "苹果" << applePrice << "元" << endl;
    cout << "橙子" << orangePrice << "元" << endl;
    cout << "总共" << totalPrice << "元" << endl;
    
    return 0;
}`,
        expectedOutput: '结果是：30\n苹果10元\n橙子20元\n总共30元',
        explanation: [
          'a, b, c 这种名字完全看不出是什么',
          'applePrice 一看就知道是苹果价格',
          '命名技巧：用英文单词，首单词小写，后面单词首字母大写',
          '这种命名方式叫"驼峰命名法"，因为中间大写字母像驼峰',
        ]
      },
      {
        title: '示例4：变量的计算',
        description: '用变量做数学运算',
        code: `#include <iostream>
using namespace std;

int main() {
    // 定义两个数
    int a = 15;
    int b = 4;
    
    // 加减乘除
    cout << a << " + " << b << " = " << a + b << endl;
    cout << a << " - " << b << " = " << a - b << endl;
    cout << a << " × " << b << " = " << a * b << endl;
    cout << a << " ÷ " << b << " = " << a / b << endl;  // 整数除法
    cout << a << " 除以 " << b << " 余 " << a % b << endl;  // 取余数
    
    return 0;
}`,
        expectedOutput: '15 + 4 = 19\n15 - 4 = 11\n15 × 4 = 60\n15 ÷ 4 = 3\n15 除以 4 余 3',
        explanation: [
          '+ 加法，- 减法，* 乘法，/ 除法',
          '整数除法会舍去小数部分：15 / 4 = 3（不是3.75）',
          '% 取余数：15 % 4 = 3（因为 15 = 4 × 3 + 3）',
          '如果要得到小数，用 double 类型',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '使用未初始化的变量',
        why: '就像打开一个空盒子，不知道里面有什么',
        correctWay: '声明变量时最好立即给一个初始值，如 int score = 0;'
      },
      {
        mistake: '变量名用数字开头',
        why: 'C++规定变量名不能以数字开头',
        correctWay: '用字母或下划线开头，如 age, _count, score1'
      },
      {
        mistake: '变量名用中文',
        why: '虽然有些编译器支持，但容易出问题',
        correctWay: '用英文命名，如 name 而不是 姓名'
      },
      {
        mistake: '变量名用C++关键字',
        why: 'int, double, if, for 等是C++保留的词',
        correctWay: '避免用这些词，如用 myInt 而不是 int'
      },
      {
        mistake: '搞混 = 和 ==',
        why: '= 是赋值（放东西），== 是比较（判断相等）',
        correctWay: 'a = 10 是把10放进a；a == 10 是判断a是否等于10'
      }
    ],
    quiz: {
      question: '下列哪个变量名是正确的？',
      options: ['1name', 'my-name', 'myName', 'class'],
      answer: 2,
      explanation: '变量名不能以数字开头，不能含减号，不能是关键字。myName是正确的。'
    },
    prerequisites: [1, 2],
    recommendedProblems: [1, 2, 21],
    relatedKnowledge: [4, 5], // 数据类型、运算符
    readTime: 20,
  },
  {
    id: 5,
    slug: 'data-types',
    title: '基本数据类型',
    icon: '📊',
    category: 'basics',
    difficulty: 'basic',
    brief: '不同类型的数据要放在不同类型的盒子里',
    description: '整数、小数、字符、字符串...不同类型的数据需要用不同类型的变量来存储。就像大箱子装大东西，小箱子装小东西。',
    content: [
      '🔢 整数类型：int（常用）、long long（超大整数）',
      '🔵 小数类型：double（常用）、float',
      '🔤 字符类型：char（单个字符）',
      '📝 字符串类型：string（一串字符）',
      '✅ 布尔类型：bool（真或假）',
      '📏 数据范围：每种类型能存多大的数？',
    ],
    kidFriendly: {
      analogy: `想象你有不同形状的收纳盒：

📦 方形盒子（int）→ 装整数，如 1, 100, -50
🥫 圆形罐子（double）→ 装小数，如 3.14, 0.5, -2.7
🎴 小卡片盒（char）→ 装单个字符，如 'A', '中', '5'
📚 书架（string）→ 装一串文字，如 "你好", "Hello"
💡 开关（bool）→ 只有两个状态：开/关（true/false）

用错盒子会怎样？
- 小数放进整数盒 → 3.14 变成 3（丢失小数部分）
- 太大的数放进小盒子 → 溢出（装不下）`,
      visualization: `📊 数据类型详解

【类型对比表】

┌────────────┬────────────┬────────────────────────┬─────────────┐
│   类型     │   存什么   │        数值范围        │    举例     │
├────────────┼────────────┼────────────────────────┼─────────────┤
│ int        │ 整数       │ -21亿 ~ 21亿           │ 100, -50    │
│ long long  │ 大整数     │ ±9.2×10¹⁸（超大）      │ 1万亿       │
│ double     │ 小数       │ 约±1.7×10³⁰⁸，精度15位 │ 3.14, 0.5   │
│ char       │ 单字符     │ 任意一个字符           │ 'A', '好'   │
│ string     │ 字符串     │ 任意长度文字           │ "你好世界"  │
│ bool       │ 布尔值     │ 只有 true 或 false     │ true, false │
└────────────┴────────────┴────────────────────────┴─────────────┘

【内存占用对比】

    数据类型     占用空间      形象比喻
    ──────────────────────────────────────
    bool         1字节        一个开关
    char         1字节        一张便签
    int          4字节        一个小盒子
    long long    8字节        一个大盒子
    double       8字节        一个精密盒子

【整数类型的范围可视化】

    int 的范围（约21亿）：
    ├─────────────────────────────────────────┤
    │-2,147,483,648 ◀──────────────────────▶ 2,147,483,647│
    └─────────────────────────────────────────┘
    
    long long 的范围（超大）：
    ├────────────────────────────────────────────────────────────┤
    │-9,223,372,036,854,775,808 ◀───────────────────────────▶ ...│
    └────────────────────────────────────────────────────────────┘
    
    ⚠️ 如果数字超过范围 → 溢出！变成错误的数

【整数除法 vs 小数除法】

    整数 ÷ 整数 = 整数（小数部分被丢掉）
    
    ┌─────────────────────────────────────────┐
    │  7 ÷ 2 = 3         （不是3.5！）        │
    │  10 ÷ 3 = 3        （不是3.33...）      │
    │  1 ÷ 2 = 0         （不是0.5！）        │
    └─────────────────────────────────────────┘
    
    想得到小数结果？至少有一个数要是小数：
    
    ┌─────────────────────────────────────────┐
    │  7.0 ÷ 2 = 3.5     ✓ 正确               │
    │  7 ÷ 2.0 = 3.5     ✓ 正确               │
    │  (double)7 ÷ 2 = 3.5  ✓ 强制转换        │
    └─────────────────────────────────────────┘

【char 和 string 的区别】

    char（单字符）：用单引号 ''，只能放一个
    
    ┌─────┐
    │ 'A' │  ✓ 正确
    └─────┘
    ┌─────┐
    │'ABC'│  ✗ 错误！只能放一个字符
    └─────┘
    
    string（字符串）：用双引号 ""，可以放多个
    
    ┌─────────────┐
    │ "Hello"     │  ✓ 正确
    └─────────────┘
    ┌─────┐
    │ "A" │  ✓ 也正确（一个字符也是字符串）
    └─────┘

【选择数据类型的决策树】

    要存什么数据？
         │
         ├─▶ 数字？
         │      │
         │      ├─▶ 有小数？ ──▶ double
         │      │
         │      └─▶ 纯整数？
         │             │
         │             ├─▶ 可能超过21亿？ ──▶ long long
         │             │
         │             └─▶ 不会超过 ──▶ int
         │
         ├─▶ 文字？
         │      │
         │      ├─▶ 单个字符 ──▶ char
         │      │
         │      └─▶ 一串字符 ──▶ string
         │
         └─▶ 是/否？ ──▶ bool`,
      whyLearn: `为什么要区分数据类型？

💰 计算价格：3.5元，用 double
🎂 记录年龄：10岁，用 int
📝 存名字："小明"，用 string
🎮 游戏状态：是否通关，用 bool

用对类型，程序才能正确处理数据！`
    },
    codeExamples: [
      {
        title: '示例1：整数类型 int 和 long long',
        description: '存储整数',
        code: `#include <iostream>
using namespace std;

int main() {
    // int：普通整数（范围约-21亿到21亿）
    int age = 10;
    int students = 50;
    int temperature = -5;
    
    cout << "年龄：" << age << endl;
    cout << "学生人数：" << students << endl;
    cout << "温度：" << temperature << "度" << endl;
    
    // long long：超大整数
    long long worldPopulation = 8000000000;  // 80亿
    cout << "世界人口约：" << worldPopulation << endl;
    
    // 小技巧：如何判断用int还是long long？
    // 如果数字可能超过21亿，就用long long
    // NOIP竞赛中，如果题目数据范围>10^9，建议用long long
    
    return 0;
}`,
        expectedOutput: '年龄：10\n学生人数：50\n温度：-5度\n世界人口约：8000000000',
        explanation: [
          'int 最常用，能存下大多数整数',
          'long long 范围超大，约9×10^18',
          '负数也能存，直接加负号',
          '如果不确定会不会溢出，就用long long',
        ]
      },
      {
        title: '示例2：小数类型 double',
        description: '存储小数',
        code: `#include <iostream>
#include <iomanip>  // 用于控制小数位数
using namespace std;

int main() {
    // double：存储小数
    double price = 3.5;
    double pi = 3.1415926535;
    double weight = 52.5;
    
    cout << "价格：" << price << "元" << endl;
    cout << "圆周率π：" << pi << endl;
    cout << "体重：" << weight << "kg" << endl;
    
    // 小数计算
    double a = 10.0;
    double b = 3.0;
    cout << "10 ÷ 3 = " << a / b << endl;  // 小数除法
    
    // 控制输出小数位数（保留2位）
    cout << fixed << setprecision(2);
    cout << "保留2位小数：" << a / b << endl;
    
    return 0;
}`,
        expectedOutput: '价格：3.5元\n圆周率π：3.14159\n体重：52.5kg\n10 ÷ 3 = 3.33333\n保留2位小数：3.33',
        explanation: [
          'double 可以存储小数，精度够用',
          '10.0 / 3.0 = 3.333... 小数除法会保留小数',
          'fixed << setprecision(2) 可以控制保留几位小数',
          '比较：10 / 3 = 3（整数除法舍去小数）',
        ]
      },
      {
        title: '示例3：字符类型 char 和字符串 string',
        description: '存储文字',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // char：单个字符，用单引号
    char grade = 'A';
    char gender = '男';
    char symbol = '@';
    
    cout << "成绩等级：" << grade << endl;
    cout << "性别：" << gender << endl;
    cout << "符号：" << symbol << endl;
    
    // string：字符串，用双引号
    string name = "小明";
    string school = "阳光小学";
    string message = "你好，欢迎学习C++！";
    
    cout << "姓名：" << name << endl;
    cout << "学校：" << school << endl;
    cout << message << endl;
    
    // 字符串拼接
    string greeting = name + "你好！";
    cout << greeting << endl;
    
    return 0;
}`,
        expectedOutput: '成绩等级：A\n性别：男\n符号：@\n姓名：小明\n学校：阳光小学\n你好，欢迎学习C++！\n小明你好！',
        explanation: [
          'char 只能存一个字符，用单引号 \'A\'',
          'string 可以存一串字符，用双引号 "ABC"',
          '字符串可以用 + 拼接',
          '中文字符也可以存储',
        ]
      },
      {
        title: '示例4：布尔类型 bool',
        description: '存储真假',
        code: `#include <iostream>
using namespace std;

int main() {
    // bool：只有两个值 true（真）和 false（假）
    bool isStudent = true;    // 是学生
    bool hasHomework = false; // 没有作业
    bool passed = true;       // 通过了
    
    cout << "是学生吗？" << isStudent << endl;     // 输出1
    cout << "有作业吗？" << hasHomework << endl;   // 输出0
    cout << "通过了吗？" << passed << endl;        // 输出1
    
    // 在C++中，true显示为1，false显示为0
    // 但我们理解时就是"是/否"、"真/假"
    
    // 布尔值常用于判断
    int score = 60;
    bool passed2 = (score >= 60);  // 判断是否及格
    cout << "分数" << score << "是否及格：" << passed2 << endl;
    
    return 0;
}`,
        expectedOutput: '是学生吗？1\n有作业吗？0\n通过了吗？1\n分数60是否及格：1',
        explanation: [
          'bool 只有 true（真）和 false（假）两个值',
          '输出时 true 显示为 1，false 显示为 0',
          '常用于判断条件，如 是否及格、是否通关',
          'score >= 60 会返回一个 bool 值',
        ]
      },
      {
        title: '示例5：类型转换陷阱',
        description: '整数除法的坑',
        code: `#include <iostream>
using namespace std;

int main() {
    // 整数除法：结果还是整数
    int a = 7, b = 2;
    cout << "整数除法 7/2 = " << a / b << endl;  // 3，不是3.5！
    cout << "余数 7%2 = " << a % b << endl;       // 1
    
    // 小数除法：结果是小数
    double x = 7.0, y = 2.0;
    cout << "小数除法 7.0/2.0 = " << x / y << endl;  // 3.5
    
    // 混合除法
    cout << "混合 7/2.0 = " << a / y << endl;     // 3.5
    cout << "混合 7.0/2 = " << x / b << endl;     // 3.5
    
    // 强制类型转换
    cout << "强制转换 (double)7/2 = " << (double)a / b << endl;
    
    return 0;
}`,
        expectedOutput: '整数除法 7/2 = 3\n余数 7%2 = 1\n小数除法 7.0/2.0 = 3.5\n混合 7/2.0 = 3.5\n混合 7.0/2 = 3.5\n强制转换 (double)7/2 = 3.5',
        explanation: [
          '整数 / 整数 = 整数（舍去小数）',
          '想得到小数结果，至少有一个数要变成小数',
          '方法1：直接用 double 类型',
          '方法2：写成 7.0 而不是 7',
          '方法3：强制转换 (double)a',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '整数除法想得到小数',
        why: 'int / int 结果还是 int，会舍去小数',
        correctWay: '用 double 类型，或写成 7.0 / 2，或强制转换 (double)7 / 2'
      },
      {
        mistake: '数字太大用 int',
        why: 'int 范围约21亿，超过会溢出',
        correctWay: '超过10^9的数用 long long'
      },
      {
        mistake: 'char 用双引号',
        why: '双引号是字符串，char 只能存一个字符',
        correctWay: 'char c = \'A\'; // 单引号'
      },
      {
        mistake: 'string 忘记 #include <string>',
        why: 'string 是标准库类型，需要包含头文件',
        correctWay: '在开头加上 #include <string>'
      }
    ],
    quiz: {
      question: '存储3.14应该用什么类型？',
      options: ['int', 'char', 'double', 'bool'],
      answer: 2,
      explanation: '3.14是小数，应该用double类型存储。'
    },
    prerequisites: [4],
    recommendedProblems: [1, 21, 22],
    relatedKnowledge: [3, 5, 38], // 变量、运算符、排序（数据类型选择）
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
    relatedKnowledge: [3, 4, 5], // 变量、数据类型、运算符
    readTime: 15,
  },
  {
    id: 7,
    slug: 'cin-cout',
    title: '输入与输出',
    icon: '💬',
    category: 'basics',
    difficulty: 'basic',
    brief: '让程序和你"对话"：程序问你答，或程序告诉你',
    description: '程序需要和用户交互。输出是程序告诉你信息，输入是你告诉程序信息。就像聊天，有说有听。',
    content: [
      '📤 输出 cout：程序向屏幕显示信息',
      '📥 输入 cin：程序从键盘读取信息',
      '🔄 输入输出流程：程序问 → 用户答 → 程序处理',
      '📝 格式化输出：让输出更整齐好看',
      '⏎ 换行：endl 和 \\n',
      '🎯 实际应用：计算器、问答程序',
    ],
    kidFriendly: {
      analogy: `想象程序是一个机器人朋友：

🤖 机器人说话（输出）
  cout << "你好！";
  机器人说："你好！"

🤖 机器人听你说话（输入）
  cin >> name;
  机器人等你输入名字

完整的对话：
  🤖 机器人：你叫什么名字？（cout输出问题）
  👤 你：小明（cin读取输入）
  🤖 机器人：你好，小明！（cout输出结果）

这样程序就"活"起来了！`,
      visualization: `💬 输入输出详解

【数据流向图】

    ┌─────────────────────────────────────────────────────┐
    │                       程序                          │
    │                                                     │
    │   ┌─────────────┐              ┌─────────────┐     │
    │   │   变量 age  │              │   字符串    │     │
    │   │     10      │              │  "你好"     │     │
    │   └──────┬──────┘              └──────┬──────┘     │
    │          │                            │            │
    │          │ cout << age        cout << "你好" │     │
    │          │                            │            │
    │          ▼                            ▼            │
    │   ┌──────────────────────────────────────────┐    │
    │   │              输出缓冲区                   │    │
    │   └──────────────────────────────────────────┘    │
    └─────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   📺 显示屏   │
                    │   你好        │
                    │   10          │
                    └───────────────┘

【输入流程图】

    ┌───────────────┐
    │   ⌨️ 键盘     │
    │   用户输入：  │
    │   10 ↵       │
    └───────┬───────┘
            │
            │ cin >> age
            │ （等待用户输入）
            ▼
    ┌─────────────────────────────────────────────────────┐
    │                       程序                          │
    │                                                     │
    │   ┌─────────────┐                                  │
    │   │   变量 age  │  ◀── 把10存进age变量            │
    │   │     10      │                                  │
    │   └─────────────┘                                  │
    └─────────────────────────────────────────────────────┘

【箭头方向记忆法】

    cout << "你好"
         ─┬─
          │
          ▼
    "你好"被"推"向屏幕 → 输出

    cin >> age
         ─┬─
          │
          ▼
    数据被"拉"进变量 → 输入

    记忆口诀：
    - cout 用 <<（两个小于号，像两只手往外推）
    - cin 用 >>（两个大于号，像两只手往里拉）

【连续输入输出】

    cout << "A" << "B" << "C";
    
    执行过程：
    ┌─────┐   ┌─────┐   ┌─────┐
    │ "A" │ → │ "B" │ → │ "C" │ → 屏幕
    └─────┘   └─────┘   └─────┘
    
    结果：ABC

    cin >> a >> b >> c;
    
    执行过程：
    键盘输入：10 20 30
    
    ┌─────┐   ┌─────┐   ┌─────┐
    │  a  │ ← │  b  │ ← │  c  │ ← 键盘
    │ 10  │   │ 20  │   │ 30  │
    └─────┘   └─────┘   └─────┘

【换行的三种方式】

    方式1：cout << endl;
    
    ┌─────────────────────────────┐
    │  输出内容                   │
    │  ↓                         │
    │  endl 表示"到此换行"        │
    │  光标移到下一行开头         │
    └─────────────────────────────┘
    
    方式2：cout << "\\n";
    
    ┌─────────────────────────────┐
    │  \\n 是换行字符             │
    │  效果和 endl 一样           │
    │  但不刷新缓冲区             │
    └─────────────────────────────┘
    
    方式3：cout << "\\n" << flush;
    
    ┌─────────────────────────────┐
    │  等同于 endl                │
    │  换行 + 刷新缓冲区          │
    └─────────────────────────────┘

【完整的交互流程】

    ┌─────────────────────────────────────────────┐
    │                  程序执行                    │
    ├─────────────────────────────────────────────┤
    │                                             │
    │  Step 1: 程序输出提示                       │
    │  ┌─────────────────────────────────────┐   │
    │  │ cout << "请输入年龄：";              │   │
    │  └─────────────────────────────────────┘   │
    │                    │                       │
    │                    ▼                       │
    │            📺 显示：请输入年龄：            │
    │                    │                       │
    │  Step 2: 程序等待输入                       │
    │  ┌─────────────────────────────────────┐   │
    │  │ cin >> age;                         │   │
    │  │ // 程序暂停，等待用户...             │   │
    │  └─────────────────────────────────────┘   │
    │                    │                       │
    │                    ▼                       │
    │            ⌨️ 用户输入：10 ↵               │
    │                    │                       │
    │  Step 3: 程序处理并输出                    │
    │  ┌─────────────────────────────────────┐   │
    │  │ cout << "你今年" << age << "岁";     │   │
    │  └─────────────────────────────────────┘   │
    │                    │                       │
    │                    ▼                       │
    │            📺 显示：你今年10岁              │
    │                                             │
    └─────────────────────────────────────────────┘`,
      whyLearn: `为什么需要输入输出？

🎮 游戏需要你操控（输入），显示画面（输出）
📱 APP需要你点击（输入），显示结果（输出）
🧮 计算器需要你输入数字，显示答案

没有输入输出，程序就是个"哑巴"，无法和人交流！`
    },
    codeExamples: [
      {
        title: '示例1：基本输出 cout',
        description: '让程序说话',
        code: `#include <iostream>
using namespace std;

int main() {
    // 输出一句话
    cout << "你好，世界！";
    
    // 换行输出的三种方式
    cout << endl;           // 方式1：endl
    cout << "第一行\\n";     // 方式2：\\n
    cout << "第二行" << endl;
    
    // 输出多个内容
    cout << "我今年" << 10 << "岁" << endl;
    
    // 输出变量的值
    string name = "小明";
    int score = 100;
    cout << name << "的分数是" << score << "分" << endl;
    
    return 0;
}`,
        expectedOutput: '你好，世界！\n第一行\n第二行\n我今年10岁\n小明的分数是100分',
        explanation: [
          'cout << 内容：把内容输出到屏幕',
          '<< 可以连续使用，输出多个内容',
          'endl 和 \\n 都表示换行',
          '可以输出文字、数字、变量',
        ]
      },
      {
        title: '示例2：基本输入 cin',
        description: '让程序听你说',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // 输入一个整数
    int age;
    cout << "请输入你的年龄：";
    cin >> age;  // 等待用户输入
    cout << "你今年" << age << "岁" << endl;
    
    // 输入一个字符串
    string name;
    cout << "请输入你的名字：";
    cin >> name;
    cout << name << "，你好！" << endl;
    
    // 输入多个数据
    int a, b;
    cout << "请输入两个数字（用空格分隔）：";
    cin >> a >> b;
    cout << "它们的和是：" << a + b << endl;
    
    return 0;
}`,
        input: '10\n小明\n5 3',
        expectedOutput: '请输入你的年龄：你今年10岁\n请输入你的名字：小明，你好！\n请输入两个数字（用空格分隔）：它们的和是：8',
        explanation: [
          'cin >> 变量：从键盘读取输入，存到变量里',
          '>> 箭头指向变量，表示"往变量里存"',
          'cin >> a >> b 可以连续读取多个值',
          '多个输入用空格或换行分隔',
        ]
      },
      {
        title: '示例3：做一个简单计算器',
        description: '综合运用输入输出',
        code: `#include <iostream>
using namespace std;

int main() {
    // 计算器程序
    cout << "=== 简易计算器 ===" << endl;
    cout << "请输入第一个数字：";
    
    double a, b;
    cin >> a;
    
    cout << "请输入第二个数字：";
    cin >> b;
    
    // 计算并输出结果
    cout << endl << "计算结果：" << endl;
    cout << a << " + " << b << " = " << a + b << endl;
    cout << a << " - " << b << " = " << a - b << endl;
    cout << a << " × " << b << " = " << a * b << endl;
    cout << a << " ÷ " << b << " = " << a / b << endl;
    
    return 0;
}`,
        input: '15\n4',
        expectedOutput: '=== 简易计算器 ===\n请输入第一个数字：请输入第二个数字：\n计算结果：\n15 + 4 = 19\n15 - 4 = 11\n15 × 4 = 60\n15 ÷ 4 = 3.75',
        explanation: [
          '先输出提示语，让用户知道该输入什么',
          '用 double 类型支持小数计算',
          '用户输入后，程序计算并输出结果',
          '这就是一个真正能用的计算器程序！',
        ]
      },
      {
        title: '示例4：格式化输出',
        description: '让输出更整齐',
        code: `#include <iostream>
#include <iomanip>  // 格式化输出需要
using namespace std;

int main() {
    double pi = 3.14159265;
    
    // 控制小数位数
    cout << "默认输出：" << pi << endl;
    cout << "保留2位小数：" << fixed << setprecision(2) << pi << endl;
    cout << "保留4位小数：" << setprecision(4) << pi << endl;
    
    // 设置宽度
    cout << endl << "对齐输出：" << endl;
    cout << setw(10) << "语文" << setw(10) << "数学" << setw(10) << "英语" << endl;
    cout << setw(10) << 95 << setw(10) << 88 << setw(10) << 92 << endl;
    cout << setw(10) << 87 << setw(10) << 90 << setw(10) << 85 << endl;
    
    return 0;
}`,
        expectedOutput: '默认输出：3.14159\n保留2位小数：3.14\n保留4位小数：3.1416\n\n对齐输出：\n      语文      数学      英语\n        95        88        92\n        87        90        85',
        explanation: [
          'fixed << setprecision(n) 保留n位小数',
          'setw(n) 设置宽度，不足补空格',
          'setw 只对下一个输出有效',
          '需要 #include <iomanip>',
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
    title: '条件语句',
    icon: '🔀',
    category: 'basics',
    difficulty: 'basic',
    brief: '让程序学会做选择',
    description: '程序可以根据不同情况做不同的事情。就像岔路口，根据目的地选择不同的路。',
    content: [
      '❓ if 语句：如果...就...（单分支）',
      '🔄 if-else：如果...就...否则...（双分支）',
      '🔀 if-else if-else：多选一（多分支）',
      '🎯 switch：多选一的简洁写法',
      '🪺 嵌套条件：条件里套条件',
      '⚠️ 逻辑运算：组合多个条件',
    ],
    kidFriendly: {
      analogy: `条件语句就像生活中的选择：

🌟 if（如果）：单一选择
  如果下雨，就带伞

  if (下雨) {
      带伞;
  }

🌟 if-else（如果...否则）：二选一
  如果下雨，就带伞；否则，戴太阳帽

  if (下雨) {
      带伞;
  } else {
      戴太阳帽;
  }

🌟 if-else if-else（多选一）：多种选择
  如果分数>=90，优秀；
  否则如果>=80，良好；
  否则如果>=60，及格；
  否则，不及格`,
      visualization: `🔀 条件语句详解

【 if 语句 - 单分支 】

    代码：                    执行过程：
    
    if (条件) {              ┌────────────────┐
        执行代码;            │  检查条件      │
    }                        └───────┬────────┘
                                     │
                          ┌──────────┴──────────┐
                          │                     │
                     条件为真              条件为假
                    （非0/true）          （0/false）
                          │                     │
                          ▼                     ▼
                    ┌───────────┐         ┌───────────┐
                    │ 执行代码块 │         │ 直接跳过  │
                    └───────────┘         └───────────┘
                          │                     │
                          └──────────┬──────────┘
                                     ▼
                              继续执行后续代码

【 if-else 语句 - 双分支 】

    代码：                    执行过程：
    
    if (条件) {              ┌────────────────┐
        代码A;               │  检查条件      │
    } else {                 └───────┬────────┘
        代码B;                       │
    }                     ┌──────────┴──────────┐
                          │                     │
                     条件为真              条件为假
                          │                     │
                          ▼                     ▼
                    ┌───────────┐         ┌───────────┐
                    │  执行A    │         │  执行B    │
                    └───────────┘         └───────────┘
                          │                     │
                          └──────────┬──────────┘
                                     ▼
                              继续执行后续代码
    
    特点：A和B必有一个被执行，不会都执行，也不会都不执行

【 if-else if-else 语句 - 多分支 】

    代码：                              执行过程：
    
    if (条件1) {                       ┌──────────────┐
        代码A;                         │ 检查条件1    │
    } else if (条件2) {                └───────┬──────┘
        代码B;                                 │
    } else if (条件3) {              ┌─────────┴─────────┐
        代码C;                       │                   │
    } else {                    条件1为真            条件1为假
        代码D;                        │                   │
    }                                 ▼                   ▼
                                ┌──────────┐      ┌──────────────┐
                                │  执行A   │      │ 检查条件2    │
                                └──────────┘      └───────┬──────┘
                                                          │
                                              ┌───────────┴───────────┐
                                              │                       │
                                         条件2为真                条件2为假
                                              │                       │
                                              ▼                       ▼
                                        ┌──────────┐          ┌──────────────┐
                                        │  执行B   │          │ 检查条件3    │
                                        └──────────┘          └───────┬──────┘
                                                                      │
                                                          ┌───────────┴───────────┐
                                                          │                       │
                                                     条件3为真                条件3为假
                                                          │                       │
                                                          ▼                       ▼
                                                    ┌──────────┐          ┌──────────┐
                                                    │  执行C   │          │  执行D   │
                                                    └──────────┘          └──────────┘

    特点：从上到下依次判断，找到第一个为真的条件就执行，然后跳出整个结构

【成绩等级判断示例】

    输入 score = 85 的执行过程：
    
    ┌─────────────────────────────────────────────────────┐
    │  score >= 90?  ──→  85 >= 90?  ──→  假，继续       │
    │  score >= 80?  ──→  85 >= 80?  ──→  真！执行"良好"  │
    │  （后面的条件不再检查，直接跳出）                    │
    └─────────────────────────────────────────────────────┘
    
    结果：输出 "良好！😊"

【switch 语句】

    代码：                      执行过程：
    
    switch (变量) {            ┌──────────────────┐
        case 值1:              │  检查变量的值    │
            代码1;             └────────┬─────────┘
            break;                      │
        case 值2:              ┌────────┴────────┐
            代码2;              │                 │
            break;          等于值1          不等于值1
        default:                │                 │
            代码D;              ▼                 ▼
    }                      ┌──────────┐    ┌────────────────┐
                           │ 执行代码1 │    │ 检查是否等于值2 │
                           │ 遇到break │    └───────┬────────┘
                           │ 跳出switch│            │
                           └──────────┘     ┌───────┴───────┐
                                            │               │
                                        等于值2          不等于值2
                                            │               │
                                            ▼               ▼
                                      ┌──────────┐   ┌──────────┐
                                      │ 执行代码2 │   │ 执行默认 │
                                      │ 遇到break │   │ 代码D    │
                                      │ 跳出     │   └──────────┘
                                      └──────────┘
    
    ⚠️ 注意：没有 break 会继续执行下一个 case！

【条件判断顺序的重要性】

    错误写法：
    if (score >= 60) {          // 85会先满足这个条件！
        cout << "及格";
    } else if (score >= 80) {   // 永远不会执行到这里
        cout << "良好";
    } else if (score >= 90) {   // 永远不会执行到这里
        cout << "优秀";
    }
    
    正确写法：
    if (score >= 90) {          // 先检查最高的
        cout << "优秀";
    } else if (score >= 80) {   // 再检查中间的
        cout << "良好";
    } else if (score >= 60) {   // 最后检查最低的
        cout << "及格";
    }`,
      whyLearn: `为什么需要条件语句？

🎮 游戏中：
  如果生命值<=0，游戏结束
  如果有钥匙，可以开门
  如果金币>=100，可以买装备

📱 APP中：
  如果输入正确，登录成功
  如果网络断开，显示错误提示

条件让程序变得"聪明"，能根据情况做出不同反应！`
    },
    codeExamples: [
      {
        title: '示例1：if 语句（单分支）',
        description: '满足条件才执行',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "请输入你的分数：";
    cin >> score;
    
    // 如果分数>=60，显示"恭喜通过"
    if (score >= 60) {
        cout << "🎉 恭喜通过！" << endl;
    }
    
    // 如果分数==100，显示"满分！"
    if (score == 100) {
        cout << "🌟 太厉害了，满分！" << endl;
    }
    
    // 程序继续执行
    cout << "程序结束" << endl;
    
    return 0;
}`,
        input: '85',
        expectedOutput: '请输入你的分数：🎉 恭喜通过！\n程序结束',
        explanation: [
          'if (条件) { ... } 括号内为真才执行大括号内的代码',
          '条件不满足就跳过，继续执行后面的代码',
          '大括号 { } 包围要执行的代码块',
          '可以有多个独立的 if 语句',
        ]
      },
      {
        title: '示例2：if-else 语句（双分支）',
        description: '二选一',
        code: `#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "请输入你的年龄：";
    cin >> age;
    
    // 判断是否成年
    if (age >= 18) {
        cout << "你已成年，可以观看！" << endl;
    } else {
        cout << "你未成年，需要家长陪同！" << endl;
    }
    
    // 判断奇偶
    int num;
    cout << "请输入一个整数：";
    cin >> num;
    
    if (num % 2 == 0) {
        cout << num << " 是偶数" << endl;
    } else {
        cout << num << " 是奇数" << endl;
    }
    
    return 0;
}`,
        input: '15\n7',
        expectedOutput: '请输入你的年龄：你未成年，需要家长陪同！\n请输入一个整数：7 是奇数',
        explanation: [
          'if-else 是二选一，必有一个分支被执行',
          '条件为真执行 if 后的代码，为假执行 else 后的代码',
          'else 不能单独使用，必须跟在 if 后面',
          '这种结构保证了总有一个分支被执行',
        ]
      },
      {
        title: '示例3：if-else if-else 语句（多分支）',
        description: '多选一',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "请输入你的分数：";
    cin >> score;
    
    // 成绩等级判定
    if (score >= 90) {
        cout << "优秀！🌟" << endl;
    } else if (score >= 80) {
        cout << "良好！😊" << endl;
    } else if (score >= 60) {
        cout << "及格！👍" << endl;
    } else {
        cout << "不及格，继续努力！💪" << endl;
    }
    
    // 注意：条件要从高到低写！
    // 如果写成 score >= 60 在前面，那90分也会被判定为"及格"
    
    return 0;
}`,
        input: '85',
        expectedOutput: '请输入你的分数：良好！😊',
        explanation: [
          'if-else if-else 是多选一，只会执行一个分支',
          '从上到下依次判断，满足一个就执行，后面的不再判断',
          '条件要从高到低写，或者用 && 限制范围',
          '最后的 else 是"其他所有情况"的兜底',
        ]
      },
      {
        title: '示例4：switch 语句',
        description: '多选一的简洁写法',
        code: `#include <iostream>
using namespace std;

int main() {
    int day;
    cout << "请输入星期几（1-7）：";
    cin >> day;
    
    // switch 语句：根据值选择分支
    switch (day) {
        case 1:
            cout << "星期一，新的一周开始！" << endl;
            break;  // 必须有break！
        case 2:
            cout << "星期二" << endl;
            break;
        case 3:
            cout << "星期三" << endl;
            break;
        case 4:
            cout << "星期四" << endl;
            break;
        case 5:
            cout << "星期五，明天就是周末！" << endl;
            break;
        case 6:
        case 7:  // 6和7共享同一个结果
            cout << "周末愉快！" << endl;
            break;
        default:  // 其他情况
            cout << "输入错误，请输入1-7" << endl;
    }
    
    return 0;
}`,
        input: '5',
        expectedOutput: '请输入星期几（1-7）：星期五，明天就是周末！',
        explanation: [
          'switch 根据变量的值直接跳到对应的 case',
          '每个 case 后必须加 break，否则会继续执行下一个 case',
          'default 处理所有未列出的情况',
          '多个值可以有相同的处理结果（如 case 6 和 case 7）',
          'switch 只能用于整数、字符等离散值，不能用于范围判断',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'if 后面加分号',
        why: 'if (条件); { } 这样写，大括号会始终执行',
        correctWay: 'if (条件) { } 中间不要有分号'
      },
      {
        mistake: '忘记大括号',
        why: 'if 只管后面一行代码',
        correctWay: '即使只有一行代码，也建议加 { }'
      },
      {
        mistake: 'switch 忘记 break',
        why: '没有 break 会继续执行下一个 case',
        correctWay: '每个 case 后都要加 break（故意穿透除外）'
      },
      {
        mistake: '= 和 == 搞混',
        why: '= 是赋值，== 是比较',
        correctWay: 'if (a == 10) 判断相等，不是 if (a = 10)'
      }
    ],
    quiz: {
      question: 'score=75，上面的程序输出什么？',
      options: ['优秀！', '良好！', '及格', '需要加油！'],
      answer: 2,
      explanation: '75>=60但<80，所以输出"及格"。'
    },
    prerequisites: [4, 5, 7],
    recommendedProblems: [24, 25, 26],
    relatedKnowledge: [14, 15, 16], // 比较运算符、逻辑运算符、switch-case
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
    title: '循环语句',
    icon: '🔄',
    category: 'basics',
    difficulty: 'basic',
    brief: '让程序重复做事情',
    description: '需要重复执行同一段代码时，用循环。就像体育课跑圈，绕着操场跑10圈。',
    content: [
      '🔁 for 循环：知道次数时用',
      '🔄 while 循环：不知道次数时用',
      '📥 do-while 循环：先做再判断',
      '🪺 循环嵌套：循环里套循环',
      '⏹️ break 和 continue：控制循环',
      '⚠️ 死循环：永远停不下来的循环',
    ],
    kidFriendly: {
      analogy: `循环就像重复做事情：

🏃 for 循环：知道要跑几圈
  for (跑第1圈; 跑完10圈停下; 下一圈) {
      跑一圈;
  }
  
  写成代码：
  for (int i = 1; i <= 10; i++) {
      cout << "跑了第" << i << "圈" << endl;
  }

🔄 while 循环：不知道要跑几圈
  while (还有力气) {
      再跑一圈;
  }

📥 do-while 循环：先跑一圈再说
  do {
      跑一圈;
  } while (还有力气);`,
      visualization: `🔄 循环语句详解

【 for 循环执行过程 】

    代码：for (int i = 1; i <= 5; i++) { cout << i; }
    
    执行流程：
    
    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    │   Step 1: 初始化                                            │
    │   ┌─────────────────┐                                       │
    │   │ int i = 1;      │  ◀── 只执行一次                       │
    │   │ i现在的值是1    │                                       │
    │   └─────────────────┘                                       │
    │            │                                                │
    │            ▼                                                │
    │   Step 2: 判断条件                                          │
    │   ┌─────────────────┐                                       │
    │   │ i <= 5 ?        │                                       │
    │   │ 1 <= 5 ? 是！   │                                       │
    │   └─────────────────┘                                       │
    │            │ 条件为真                                        │
    │            ▼                                                │
    │   Step 3: 执行循环体                                        │
    │   ┌─────────────────┐                                       │
    │   │ cout << i;      │  ◀── 输出：1                          │
    │   └─────────────────┘                                       │
    │            │                                                │
    │            ▼                                                │
    │   Step 4: 更新                                              │
    │   ┌─────────────────┐                                       │
    │   │ i++             │  ◀── i变成2                           │
    │   └─────────────────┘                                       │
    │            │                                                │
    │            ▼                                                │
    │   ┌─────────────────┐                                       │
    │   │ 回到Step 2      │  ◀── 继续判断                         │
    │   │ i <= 5 ?        │                                       │
    │   │ 2 <= 5 ? 是！   │                                       │
    │   └─────────────────┘                                       │
    │            │                                                │
    │           ...                                               │
    │            │                                                │
    │            ▼                                                │
    │   当 i = 6 时：                                             │
    │   ┌─────────────────┐                                       │
    │   │ i <= 5 ?        │                                       │
    │   │ 6 <= 5 ? 否！   │                                       │
    │   └─────────────────┘                                       │
    │            │ 条件为假                                        │
    │            ▼                                                │
    │   ┌─────────────────┐                                       │
    │   │ 退出循环        │                                       │
    │   └─────────────────┘                                       │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘
    
    输出结果：1 2 3 4 5

【三种循环对比】

    ┌─────────────────────────────────────────────────────────────┐
    │                     for 循环                                │
    │                                                             │
    │   初始化 ──▶ 判断条件 ──▶ [真] ──▶ 循环体 ──▶ 更新 ─┐     │
    │                │                                    │       │
    │               [假] ◀───────────────────────────────┘       │
    │                │                                            │
    │                ▼                                            │
    │              退出                                           │
    └─────────────────────────────────────────────────────────────┘
    
    ┌─────────────────────────────────────────────────────────────┐
    │                    while 循环                               │
    │                                                             │
    │   判断条件 ──▶ [真] ──▶ 循环体 ──┐                         │
    │      │                          │                          │
    │     [假] ◀──────────────────────┘                          │
    │      │                                                     │
    │      ▼                                                     │
    │    退出                                                    │
    │                                                             │
    │   特点：先判断，可能一次都不执行                           │
    └─────────────────────────────────────────────────────────────┘
    
    ┌─────────────────────────────────────────────────────────────┐
    │                  do-while 循环                              │
    │                                                             │
    │   循环体 ──▶ 判断条件 ──▶ [真] ──┐                         │
    │      │                          │                          │
    │     [假] ◀──────────────────────┘                          │
    │      │                                                     │
    │      ▼                                                     │
    │    退出                                                    │
    │                                                             │
    │   特点：先执行一次，再判断，至少执行一次                   │
    └─────────────────────────────────────────────────────────────┘

【循环变量变化表】

    for (int i = 1; i <= 5; i++) 的变量变化：
    
    ┌───────┬───────────┬───────────┬───────────┬───────────┐
    │ 轮次  │   i的值   │ i <= 5 ?  │ 是否执行  │ 输出      │
    ├───────┼───────────┼───────────┼───────────┼───────────┤
    │  1    │     1     │    是     │    执行   │    1      │
    │  2    │     2     │    是     │    执行   │    2      │
    │  3    │     3     │    是     │    执行   │    3      │
    │  4    │     4     │    是     │    执行   │    4      │
    │  5    │     5     │    是     │    执行   │    5      │
    │  6    │     6     │    否     │   退出    │           │
    └───────┴───────────┴───────────┴───────────┴───────────┘

【嵌套循环执行过程】

    打印直角三角形：
    for (int i = 1; i <= 3; i++) {      // 外层：控制行数
        for (int j = 1; j <= i; j++) {  // 内层：控制每行的星号数
            cout << "*";
        }
        cout << endl;
    }
    
    执行过程：
    
    ┌─────────────────────────────────────────────────────────────┐
    │  外层 i=1                                                   │
    │    └─▶ 内层 j=1: j<=1?是 → 输出* → j++ → j=2: j<=1?否 → 换行│
    │         结果：*                                             │
    │                                                             │
    │  外层 i=2                                                   │
    │    └─▶ 内层 j=1: j<=2?是 → 输出* → j++                     │
    │         j=2: j<=2?是 → 输出* → j++ → j=3: j<=2?否 → 换行   │
    │         结果：**                                            │
    │                                                             │
    │  外层 i=3                                                   │
    │    └─▶ 内层 j=1: j<=3?是 → 输出* → j++                     │
    │         j=2: j<=3?是 → 输出* → j++                         │
    │         j=3: j<=3?是 → 输出* → j++ → j=4: j<=3?否 → 换行   │
    │         结果：***                                           │
    │                                                             │
    │  外层 i=4: i<=3?否 → 退出                                   │
    └─────────────────────────────────────────────────────────────┘
    
    最终输出：
    *
    **
    ***

【break 和 continue 的作用】

    break：立即退出整个循环
    
    ┌─────────────────────────────────────────────────────────────┐
    │  for (int i = 1; i <= 5; i++) {                            │
    │      if (i == 3) break;                                    │
    │      cout << i << " ";                                     │
    │  }                                                         │
    │                                                             │
    │  执行过程：                                                 │
    │  i=1: 输出1                                                │
    │  i=2: 输出2                                                │
    │  i=3: 遇到break，立即退出循环                              │
    │                                                             │
    │  结果：1 2                                                  │
    └─────────────────────────────────────────────────────────────┘
    
    continue：跳过本次循环，继续下一次
    
    ┌─────────────────────────────────────────────────────────────┐
    │  for (int i = 1; i <= 5; i++) {                            │
    │      if (i == 3) continue;                                 │
    │      cout << i << " ";                                     │
    │  }                                                         │
    │                                                             │
    │  执行过程：                                                 │
    │  i=1: 输出1                                                │
    │  i=2: 输出2                                                │
    │  i=3: 遇到continue，跳过本次，继续i=4                      │
    │  i=4: 输出4                                                │
    │  i=5: 输出5                                                │
    │                                                             │
    │  结果：1 2 4 5                                              │
    └─────────────────────────────────────────────────────────────┘

【选择循环的决策树】

    需要重复执行？
         │
         ├─▶ 知道具体次数？ ──▶ for循环
         │      例：跑10圈、输出1到100、处理n个数
         │
         ├─▶ 不知道次数，需要先判断？ ──▶ while循环
         │      例：猜数字、输入直到特定值
         │
         └─▶ 至少执行一次？ ──▶ do-while循环
                例：菜单选择、输入验证`,
      whyLearn: `为什么需要循环？

🎮 游戏中：
  让角色重复跑动动画
  检测每个敌人是否被击中
  显示排行榜前100名

📊 数据处理：
  计算1到100的和
  找出数组中最大的数
  统计有多少个及格的学生

没有循环，你需要写100遍相同的代码！`
    },
    codeExamples: [
      {
        title: '示例1：for 循环基础',
        description: '重复执行指定次数',
        code: `#include <iostream>
using namespace std;

int main() {
    // 输出1到10
    cout << "输出1到10：" << endl;
    for (int i = 1; i <= 10; i++) {
        cout << i << " ";
    }
    cout << endl;
    
    // 计算1到100的和
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;  // sum = sum + i
    }
    cout << "1到100的和是：" << sum << endl;
    
    // 倒着数
    cout << "倒着数10到1：" << endl;
    for (int i = 10; i >= 1; i--) {
        cout << i << " ";
    }
    cout << endl;
    
    // 只处理偶数
    cout << "1到10的偶数：" << endl;
    for (int i = 2; i <= 10; i += 2) {
        cout << i << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '输出1到10：\n1 2 3 4 5 6 7 8 9 10 \n1到100的和是：5050\n倒着数10到1：\n10 9 8 7 6 5 4 3 2 1 \n1到10的偶数：\n2 4 6 8 10 ',
        explanation: [
          'for (初始化; 条件; 更新) { 循环体 }',
          '初始化：int i = 1，只执行一次',
          '条件：i <= 10，每次循环前判断',
          '更新：i++，每次循环后执行',
          '可以递增、递减、跳跃步长',
        ]
      },
      {
        title: '示例2：while 循环',
        description: '条件满足时持续循环',
        code: `#include <iostream>
using namespace std;

int main() {
    // 输出1到5
    cout << "while循环输出1到5：" << endl;
    int i = 1;  // 初始化
    while (i <= 5) {  // 条件
        cout << i << " ";
        i++;  // 更新（别忘了！）
    }
    cout << endl;
    
    // 猜数字游戏
    int secret = 7;
    int guess;
    cout << "猜一个1到10的数字：" << endl;
    
    while (true) {  // 无限循环
        cin >> guess;
        if (guess == secret) {
            cout << "猜对了！" << endl;
            break;  // 退出循环
        } else if (guess < secret) {
            cout << "太小了，再猜：" << endl;
        } else {
            cout << "太大了，再猜：" << endl;
        }
    }
    
    return 0;
}`,
        input: '3\n5\n7',
        expectedOutput: 'while循环输出1到5：\n1 2 3 4 5 \n猜一个1到10的数字：\n太小了，再猜：\n太小了，再猜：\n猜对了！',
        explanation: [
          'while (条件) { 循环体 }',
          '先判断条件，条件为真才执行循环体',
          '循环体里必须有改变条件的代码，否则死循环',
          'while(true) 可以创建无限循环，用 break 退出',
        ]
      },
      {
        title: '示例3：循环嵌套',
        description: '循环里套循环',
        code: `#include <iostream>
using namespace std;

int main() {
    // 打印矩形
    cout << "打印5x10矩形：" << endl;
    for (int i = 1; i <= 5; i++) {      // 5行
        for (int j = 1; j <= 10; j++) {  // 每行10个星号
            cout << "*";
        }
        cout << endl;  // 每行结束换行
    }
    
    // 打印直角三角形
    cout << endl << "打印直角三角形：" << endl;
    for (int i = 1; i <= 5; i++) {        // 5行
        for (int j = 1; j <= i; j++) {    // 第i行有i个星号
            cout << "*";
        }
        cout << endl;
    }
    
    // 打印九九乘法表
    cout << endl << "九九乘法表：" << endl;
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j << "×" << i << "=" << i*j << "\\t";
        }
        cout << endl;
    }
    
    return 0;
}`,
        expectedOutput: '打印5x10矩形：\n**********\n**********\n**********\n**********\n**********\n\n打印直角三角形：\n*\n**\n***\n****\n*****\n\n九九乘法表：\n1×1=1\t\n1×2=2\t2×2=4\t\n...',
        explanation: [
          '外层循环控制行，内层循环控制每行的内容',
          '每次外层循环执行一次，内层循环完整执行一轮',
          '嵌套循环的时间复杂度是 O(n²)',
          '注意缩进，让代码结构清晰',
        ]
      },
      {
        title: '示例4：break 和 continue',
        description: '控制循环流程',
        code: `#include <iostream>
using namespace std;

int main() {
    // break：直接退出整个循环
    cout << "输出1-10，遇到5停止：" << endl;
    for (int i = 1; i <= 10; i++) {
        if (i == 5) {
            break;  // 直接退出循环
        }
        cout << i << " ";
    }
    cout << endl;
    
    // continue：跳过本次循环，继续下一次
    cout << "输出1-10，跳过5：" << endl;
    for (int i = 1; i <= 10; i++) {
        if (i == 5) {
            continue;  // 跳过5，继续下一次
        }
        cout << i << " ";
    }
    cout << endl;
    
    // 实际应用：找第一个能被7整除的数
    cout << "找第一个能被7整除的数：" << endl;
    for (int i = 1; i <= 100; i++) {
        if (i % 7 == 0) {
            cout << i << endl;
            break;  // 找到就退出
        }
    }
    
    return 0;
}`,
        expectedOutput: '输出1-10，遇到5停止：\n1 2 3 4 \n输出1-10，跳过5：\n1 2 3 4 6 7 8 9 10 \n找第一个能被7整除的数：\n7',
        explanation: [
          'break：立即退出整个循环',
          'continue：跳过本次循环，直接进入下一次',
          'break 常用于找到目标后退出',
          'continue 常用于跳过不需要处理的情况',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '死循环',
        why: '循环条件永远为真，程序停不下来',
        correctWay: '确保循环条件最终会变为假'
      },
      {
        mistake: '差一错误',
        why: 'i < 10 和 i <= 10 结果不同',
        correctWay: '明确是"<"还是"<="，画图验证边界'
      },
      {
        mistake: '忘记更新循环变量',
        why: 'i++ 写在循环体外或忘记写',
        correctWay: 'for循环在括号里更新，while在循环体里更新'
      },
      {
        mistake: '嵌套循环变量用错',
        why: '外层用i，内层也用i，会出问题',
        correctWay: '外层用i，内层用j，不同的循环用不同的变量'
      }
    ],
    quiz: {
      question: 'for (int i = 0; i < 5; i++) 循环执行几次？',
      options: ['4次', '5次', '6次', '无限次'],
      answer: 1,
      explanation: 'i从0到4，共5次。'
    },
    prerequisites: [13, 14],
    recommendedProblems: [27, 28, 29],
    relatedKnowledge: [20, 21, 26], // 循环变量、循环嵌套、一维数组
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
    relatedKnowledge: [27, 28, 29, 60, 63], // 数组声明、数组遍历、二维数组、前缀和、vector
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
  // ==================== 结构体 ====================
  {
    id: 385,
    slug: 'struct-intro',
    title: '结构体概念',
    icon: '🏗️',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '把多个相关的数据打包在一起',
    description: '结构体可以让我们把不同类型的数据组合成一个整体，就像把姓名、年龄、成绩打包成"学生"这个整体。',
    content: [
      '🏗️ 什么是结构体？自定义的数据类型',
      '📦 结构体的组成：多个成员变量',
      '✏️ 结构体的定义：struct关键字',
      '🔍 访问成员：点运算符（.）',
      '📋 结构体变量：创建和使用',
    ],
    kidFriendly: {
      analogy: `想象你要填写一张学生信息卡：

📋 学生信息卡
├── 姓名：张三
├── 年龄：12岁
├── 成绩：95分
└── 班级：六年级一班

这张卡片把多个信息打包在一起，形成一个"学生"的整体。

结构体就是这样的"信息卡"，把相关的数据打包成一个整体！`,
      visualization: `🏗️ 结构体详解

【为什么需要结构体？】

    问题：存储学生信息
    
    ❌ 不好的方法（用多个变量）：
    
    string name1 = "张三";
    int age1 = 12;
    int score1 = 95;
    
    string name2 = "李四";
    int age2 = 13;
    int score2 = 88;
    
    // 变量太多，容易混乱！
    
    ✅ 好的方法（用结构体）：
    
    Student stu1 = {"张三", 12, 95};
    Student stu2 = {"李四", 13, 88};
    
    // 一个变量包含所有信息，清晰！

【结构体的定义】

    struct 结构体名 {
        类型1 成员名1;
        类型2 成员名2;
        ...
    };
    
    示例：
    
    struct Student {
        string name;   // 姓名
        int age;       // 年龄
        int score;     // 成绩
    };  // 注意分号！

【内存结构可视化】

    struct Student {
        string name;   // 占用空间：32字节
        int age;       // 占用空间：4字节
        int score;     // 占用空间：4字节
    };
    
    内存布局：
    
    ┌────────────────────────────────────────┐
    │              Student stu1               │
    ├────────────────────────────────────────┤
    │  name: "张三"          [32字节]        │
    ├────────────────────────────────────────┤
    │  age: 12               [4字节]         │
    ├────────────────────────────────────────┤
    │  score: 95             [4字节]         │
    └────────────────────────────────────────┘

【访问成员】

    用点运算符（.）访问：
    
    stu1.name   →  "张三"
    stu1.age    →  12
    stu1.score  →  95
    
    也可以修改：
    stu1.score = 100;  // 成绩改为100`,
      whyLearn: `为什么需要结构体？

🎮 游戏中：
  一个角色有：名字、血量、攻击力、防御力...
  用结构体打包成一个"角色"整体

📱 学生管理：
  一个学生有：姓名、年龄、班级、成绩...
  用结构体打包成一个"学生"整体

📊 点坐标：
  一个点有：x坐标、y坐标
  用结构体打包成一个"点"整体

结构体让相关的数据"在一起"，程序更清晰！`
    },
    codeExamples: [
      {
        title: '示例1：定义和使用结构体',
        description: '创建学生结构体',
        code: `#include <iostream>
#include <string>
using namespace std;

// 定义学生结构体
struct Student {
    string name;   // 姓名
    int age;       // 年龄
    int score;     // 成绩
};

int main() {
    // 创建结构体变量
    Student stu1;
    
    // 给成员赋值
    stu1.name = "张三";
    stu1.age = 12;
    stu1.score = 95;
    
    // 使用成员
    cout << "姓名：" << stu1.name << endl;
    cout << "年龄：" << stu1.age << endl;
    cout << "成绩：" << stu1.score << endl;
    
    return 0;
}`,
        expectedOutput: '姓名：张三\n年龄：12\n成绩：95',
        explanation: [
          'struct Student 定义了一个新的数据类型',
          'Student stu1 创建了一个结构体变量',
          'stu1.name 用点运算符访问成员',
          '结构体成员可以是不同的数据类型',
        ]
      },
      {
        title: '示例2：结构体初始化',
        description: '多种初始化方式',
        code: `#include <iostream>
#include <string>
using namespace std;

struct Point {
    int x;
    int y;
};

int main() {
    // 方式1：定义后逐个赋值
    Point p1;
    p1.x = 3;
    p1.y = 4;
    
    // 方式2：定义时初始化（花括号）
    Point p2 = {5, 6};
    
    // 方式3：定义时指定成员名（C++11）
    Point p3 = {x: 7, y: 8};
    // 或 Point p3 = {.x = 7, .y = 8};
    
    cout << "p1: (" << p1.x << ", " << p1.y << ")" << endl;
    cout << "p2: (" << p2.x << ", " << p2.y << ")" << endl;
    cout << "p3: (" << p3.x << ", " << p3.y << ")" << endl;
    
    return 0;
}`,
        expectedOutput: 'p1: (3, 4)\np2: (5, 6)\np3: (7, 8)',
        explanation: [
          '花括号初始化按成员顺序赋值',
          'Point p2 = {5, 6} 等价于 p2.x=5, p2.y=6',
          '指定成员名初始化更清晰（推荐）',
          '初始化后仍可修改成员值',
        ]
      },
      {
        title: '示例3：结构体数组',
        description: '存储多个结构体',
        code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    // 结构体数组
    Student class1[3] = {
        {"张三", 95},
        {"李四", 88},
        {"王五", 92}
    };
    
    // 遍历输出
    cout << "班级成绩单：" << endl;
    for (int i = 0; i < 3; i++) {
        cout << class1[i].name << ": " << class1[i].score << "分" << endl;
    }
    
    // 计算平均分
    int total = 0;
    for (int i = 0; i < 3; i++) {
        total += class1[i].score;
    }
    cout << "平均分：" << total / 3 << endl;
    
    return 0;
}`,
        expectedOutput: '班级成绩单：\n张三: 95分\n李四: 88分\n王五: 92分\n平均分：91',
        explanation: [
          'Student class1[3] 定义结构体数组',
          'class1[i] 访问第i个结构体',
          'class1[i].name 访问第i个结构体的成员',
          '结构体数组可以批量处理同类型数据',
        ]
      },
      {
        title: '示例4：结构体作为函数参数',
        description: '传递结构体给函数',
        code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

// 打印学生信息
void printStudent(Student s) {
    cout << s.name << ": " << s.score << "分" << endl;
}

// 计算是否及格
bool isPassed(Student s) {
    return s.score >= 60;
}

// 提高成绩（注意：不会修改原变量）
void improveScore(Student s, int add) {
    s.score += add;  // 只修改副本
}

// 用引用修改原变量
void improveScoreRef(Student &s, int add) {
    s.score += add;  // 修改原变量
}

int main() {
    Student stu = {"小明", 70};
    
    printStudent(stu);
    
    if (isPassed(stu)) {
        cout << "及格了！" << endl;
    }
    
    improveScore(stu, 10);  // 不会修改stu
    cout << "improveScore后: " << stu.score << endl;  // 还是70
    
    improveScoreRef(stu, 10);  // 会修改stu
    cout << "improveScoreRef后: " << stu.score << endl;  // 变成80
    
    return 0;
}`,
        expectedOutput: '小明: 70分\n及格了！\nimproveScore后: 70\nimproveScoreRef后: 80',
        explanation: [
          '函数可以接收结构体作为参数',
          '值传递会复制结构体，不修改原变量',
          '引用传递（&）可以修改原变量',
          '结构体可以作返回值',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '定义结构体时忘记分号',
        why: 'struct定义末尾必须有分号',
        correctWay: 'struct Name { ... };  // 别忘了分号！'
      },
      {
        mistake: '初始化时顺序写错',
        why: '花括号初始化按定义顺序赋值',
        correctWay: '按定义顺序写，或用指定成员名初始化'
      },
      {
        mistake: '用箭头访问成员',
        why: '箭头(->)用于指针，点(.)用于变量',
        correctWay: 'stu.name 用点，ptr->name 用箭头'
      },
      {
        mistake: '结构体数组下标越界',
        why: '结构体数组也是数组，下标从0开始',
        correctWay: '确保下标在0到size-1范围内'
      }
    ],
    quiz: {
      question: '如何访问结构体变量stu的成员name？',
      options: ['stu->name', 'stu.name', 'stu[name]', 'stu::name'],
      answer: 1,
      explanation: '结构体变量用点运算符(.)访问成员。箭头运算符(->)用于指针。'
    },
    prerequisites: [27, 44],
    recommendedProblems: [75, 76, 77],
    readTime: 30,
  },
  {
    id: 386,
    slug: 'struct-advanced',
    title: '结构体进阶',
    icon: '🔧',
    category: 'data-structures',
    difficulty: 'intermediate',
    brief: '深入理解结构体的更多用法',
    description: '学习结构体的嵌套、指针、动态分配等高级用法。',
    content: [
      '🪺 结构体嵌套：结构体里包含结构体',
      '📍 结构体指针：用指针操作结构体',
      '🔄 结构体引用：作为函数参数传递',
      '⚡ 动态分配：new和delete',
      '⚖️ 结构体比较：如何判断相等',
    ],
    kidFriendly: {
      analogy: `结构体就像俄罗斯套娃：

🪺 大娃娃（结构体）里面有小娃娃（成员）
   小娃娃里面还可以有更小的娃娃（嵌套结构体）

例如：
  学生（大结构体）
  ├── 姓名（字符串）
  ├── 年龄（整数）
  └── 成绩（小结构体）
      ├── 语文
      ├── 数学
      └── 英语`,
      visualization: `🔧 结构体进阶用法

【结构体嵌套】

    struct Score {
        int chinese;
        int math;
        int english;
    };
    
    struct Student {
        string name;
        Score score;  // 嵌套结构体
    };
    
    访问方式：
    stu.score.chinese  // 先访问score，再访问chinese
    
    内存布局：
    ┌─────────────────────────────┐
    │  Student                    │
    ├─────────────────────────────┤
    │  name: "张三"               │
    ├─────────────────────────────┤
    │  Score score:               │
    │    ├── chinese: 90         │
    │    ├── math: 85            │
    │    └── english: 92         │
    └─────────────────────────────┘

【结构体指针】

    Student stu = {"张三", 12, 95};
    Student* ptr = &stu;  // 指向stu的指针
    
    访问成员：
    
    方式1：(*ptr).name
    方式2：ptr->name（推荐）
    
    ┌─────────────────────────────────────┐
    │  ptr ──▶ [stu的地址]                │
    │              │                      │
    │              ▼                      │
    │        ┌──────────┐                 │
    │        │ name     │                 │
    │        │ age      │                 │
    │        │ score    │                 │
    │        └──────────┘                 │
    └─────────────────────────────────────┘

【动态分配结构体】

    Student* p = new Student;  // 动态创建
    p->name = "李四";
    p->age = 13;
    p->score = 88;
    
    delete p;  // 记得释放！

【结构体数组排序】

    struct Student {
        string name;
        int score;
    };
    
    // 按成绩排序
    bool compare(Student a, Student b) {
        return a.score > b.score;  // 降序
    }
    
    sort(students, students + n, compare);`,
      whyLearn: `为什么要学结构体进阶？

🎮 游戏开发：
  角色包含：位置（x,y）、装备（结构体数组）、属性...
  需要嵌套结构体组织复杂数据

📊 数据处理：
  按成绩排序学生、按价格排序商品
  需要自定义比较函数

💾 动态管理：
  不知道有多少学生，运行时才创建
  需要动态分配结构体`
    },
    codeExamples: [
      {
        title: '示例1：结构体嵌套',
        description: '结构体包含结构体',
        code: `#include <iostream>
#include <string>
using namespace std;

struct Date {
    int year;
    int month;
    int day;
};

struct Student {
    string name;
    Date birthday;  // 嵌套结构体
};

int main() {
    Student stu = {
        "张三",
        {2012, 3, 15}  // 嵌套初始化
    };
    
    cout << "姓名：" << stu.name << endl;
    cout << "生日：" << stu.birthday.year << "年"
         << stu.birthday.month << "月"
         << stu.birthday.day << "日" << endl;
    
    return 0;
}`,
        expectedOutput: '姓名：张三\n生日：2012年3月15日',
        explanation: [
          'Date结构体作为Student的成员',
          '嵌套结构体的初始化用嵌套花括号',
          '访问时逐层访问：stu.birthday.year',
          '嵌套可以是多层',
        ]
      },
      {
        title: '示例2：结构体排序',
        description: '自定义排序规则',
        code: `#include <iostream>
#include <string>
#include <algorithm>  // for sort
using namespace std;

struct Student {
    string name;
    int score;
};

// 比较函数：按成绩降序
bool compareByScore(Student a, Student b) {
    return a.score > b.score;
}

// 比较函数：按姓名升序
bool compareByName(Student a, Student b) {
    return a.name < b.name;
}

int main() {
    Student students[5] = {
        {"张三", 85},
        {"李四", 92},
        {"王五", 78},
        {"赵六", 95},
        {"钱七", 88}
    };
    
    // 按成绩排序
    sort(students, students + 5, compareByScore);
    
    cout << "按成绩排名：" << endl;
    for (int i = 0; i < 5; i++) {
        cout << i+1 << ". " << students[i].name 
             << ": " << students[i].score << "分" << endl;
    }
    
    return 0;
}`,
        expectedOutput: '按成绩排名：\n1. 赵六: 95分\n2. 李四: 92分\n3. 钱七: 88分\n4. 张三: 85分\n5. 王五: 78分',
        explanation: [
          'sort函数需要比较函数',
          '比较函数返回true表示a应该在b前面',
          'a.score > b.score 表示降序（大的在前）',
          'a.name < b.name 表示升序（字典序）',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记释放动态分配的结构体',
        why: '会导致内存泄漏',
        correctWay: 'new和delete成对使用'
      },
      {
        mistake: '比较函数写反',
        why: '排序结果与预期相反',
        correctWay: '想要升序用<，想要降序用>'
      }
    ],
    quiz: {
      question: '结构体指针ptr访问成员name，正确写法是？',
      options: ['*ptr.name', 'ptr.name', 'ptr->name', '&ptr->name'],
      answer: 2,
      explanation: '结构体指针用箭头运算符(->)访问成员，等价于(*ptr).name。'
    },
    prerequisites: [385],
    recommendedProblems: [78, 79, 80],
    readTime: 25,
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
    relatedKnowledge: [35, 36, 37, 47], // 函数概念、函数定义、函数调用、递归
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
    relatedKnowledge: [35, 37], // 函数概念、函数调用
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
    relatedKnowledge: [35, 36, 37], // 函数概念、函数定义、函数调用
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
    relatedKnowledge: [39, 40, 69], // 冒泡排序、选择排序、自定义比较
    readTime: 20,
    videoUrl: 'https://www.bilibili.com/video/BV1xW411Y7X3',
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
    relatedKnowledge: [38, 40, 68], // 排序概念、STL sort、插入排序
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
    relatedKnowledge: [38, 39, 40, 68, 69], // 排序概念、冒泡排序、选择排序、插入排序、自定义比较
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
    relatedKnowledge: [42, 43, 44], // 枚举、数组遍历、字符串处理
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
    relatedKnowledge: [41, 43, 19], // 模拟、二分查找、循环
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
    relatedKnowledge: [67, 47], // 二分答案、递归
    readTime: 30,
    videoUrl: 'https://www.bilibili.com/video/BV1fA41167nY',
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
    relatedKnowledge: [44, 45, 46], // 字符串概念、字符串操作、字符数组
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
    relatedKnowledge: [48, 49, 54], // 递归案例、动态规划、DFS
    readTime: 30,
    videoUrl: 'https://www.bilibili.com/video/BV1Nx411D712?t=3',
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
    relatedKnowledge: [47, 48, 50, 51], // 递归概念、递归案例、爬楼梯、背包问题
    readTime: 30,
    videoUrl: 'https://www.bilibili.com/video/BV1AB4y1w7eT',
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
    relatedKnowledge: [54, 65, 66], // DFS、栈、队列
    readTime: 30,
    videoUrl: 'https://www.bilibili.com/video/BV1Ks411g7aL',
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
    relatedKnowledge: [53, 47, 65], // BFS、递归、栈
    readTime: 30,
    videoUrl: 'https://www.bilibili.com/video/BV1Ks411g7aL',
  },
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
    relatedKnowledge: [56, 57, 62], // 素数、素数判定、快速幂
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
    relatedKnowledge: [49, 67], // 动态规划、二分答案
    videoUrl: 'https://www.bilibili.com/video/BV12gu3zmEc3',
    readTime: 25,
  },
  // ==================== Day 15-35 基础算法扩展知识点 ====================
  {
    id: 60,
    slug: 'prefix-sum',
    title: '前缀和',
    icon: '📊',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '快速计算区间和的技巧',
    description: '前缀和是一种预处理技巧，可以在O(1)时间内求出任意区间的和。',
    content: [
      '什么是前缀和？',
      '前缀和的预处理',
      '区间和的计算公式',
      '前缀和的时间复杂度',
      '前缀和的应用场景',
    ],
    kidFriendly: {
      analogy: `前缀和就像记账。你把每天花的钱记下来，然后算出"到某天为止总共花了多少钱"。

比如：
- 第1天花了5元，累计5元
- 第2天花了3元，累计8元
- 第3天花了2元，累计10元

想知道第2天到第3天花了多少？直接用累计数算：10 - 5 = 5元！`,
      visualization: `📊 前缀和示意图：

原数组：    [3,  1,  4,  1,  5]
前缀和：[0, 3,  4,  8,  9,  14]
          ↑  ↑   ↑   ↑   ↑   ↑
          0  a₁ a₁+a₂ ...

求区间 [2,4] 的和：
sum = 前缀和[4] - 前缀和[1] = 9 - 3 = 6

公式：sum[l,r] = prefix[r] - prefix[l-1]`,
      whyLearn: '很多题目需要频繁查询区间和，前缀和可以把每次查询从O(n)变成O(1)。'
    },
    codeExamples: [
      {
        title: '前缀和基础',
        description: '计算数组区间和',
        code: `#include <iostream>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;  // 数组长度和查询次数
    
    int a[105], prefix[105] = {0};
    
    // 读取数组并计算前缀和
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        prefix[i] = prefix[i-1] + a[i];
    }
    
    // 处理查询
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << prefix[r] - prefix[l-1] << endl;
    }
    
    return 0;
}`,
        input: '5 3\n1 2 3 4 5\n1 5\n2 4\n3 3',
        expectedOutput: '15\n9\n3',
        explanation: [
          'prefix[i] 存储前i个元素的和',
          '预处理时间O(n)',
          '每次查询时间O(1)',
          '注意：prefix[0] = 0，从1开始存储'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '下标从0开始导致边界错误',
        why: 'prefix[l-1]会访问到负下标',
        correctWay: '建议下标从1开始，prefix[0]=0'
      },
      {
        mistake: '忘记long long导致溢出',
        why: '累加可能超过int范围',
        correctWay: '数据大时用long long'
      },
    ],
    quiz: {
      question: '前缀和求区间[l,r]和的公式是？',
      options: ['prefix[r] - prefix[l]', 'prefix[r] - prefix[l-1]', 'prefix[r-1] - prefix[l]', 'prefix[l] + prefix[r]'],
      answer: 1,
      explanation: '区间和 = 右端点前缀和 - 左端点前一位的前缀和'
    },
    prerequisites: [26, 19],
    recommendedProblems: [55, 56],
    relatedKnowledge: [61, 27, 67], // 差分、一维数组、二分答案
    readTime: 20,
  },
  {
    id: 61,
    slug: 'difference',
    title: '差分',
    icon: '📐',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '高效的区间修改技巧',
    description: '差分是前缀和的逆运算，可以在O(1)时间内完成区间修改。',
    content: [
      '什么是差分？',
      '差分数组的构造',
      '区间修改操作',
      '差分与前缀和的关系',
      '差分的应用场景',
    ],
    kidFriendly: {
      analogy: `差分就像记账的变化。

假设你每天记账：
原数组（累计花费）：[100, 105, 103, 110, 108]
差分（每天变化）：  [100, +5, -2, +7, -2]

差分告诉你"今天比昨天多了多少"。

如果你第2天到第4天每笔都多花3元：
只需要改差分：diff[2] += 3, diff[5] -= 3
再还原回去就行了！`,
      visualization: `📐 差分与原数组的关系：

原数组 a：    [1,  3,  6,  10, 15]
差分 d：      [1,  2,  3,  4,  5]

关系：
d[i] = a[i] - a[i-1]
a[i] = d[1] + d[2] + ... + d[i]

区间 [l,r] 加 k：
d[l] += k
d[r+1] -= k

然后对 d 求前缀和得到修改后的 a`,
      whyLearn: '多次区间修改、最后统一查询时，差分可以把O(n)的修改变成O(1)。'
    },
    codeExamples: [
      {
        title: '差分区间修改',
        description: '多次区间加值',
        code: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    int a[105], diff[105] = {0};
    
    // 读取原数组
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        diff[i] = a[i] - a[i-1];  // 构造差分
    }
    
    // 区间修改
    while (m--) {
        int l, r, k;
        cin >> l >> r >> k;
        diff[l] += k;
        diff[r+1] -= k;
    }
    
    // 还原数组并输出
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += diff[i];
        cout << sum << " ";
    }
    cout << endl;
    
    return 0;
}`,
        input: '5 2\n1 2 3 4 5\n1 3 2\n2 4 1',
        expectedOutput: '3 5 6 6 5',
        explanation: [
          '差分是前缀和的逆运算',
          '区间[l,r]加k：diff[l]+=k, diff[r+1]-=k',
          '最后对差分数组求前缀和得到原数组',
          '原数组：[1,2,3,4,5] → [3,5,6,6,5]'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记还原差分数组',
        why: '差分数组本身不是最终结果',
        correctWay: '最后要再求一次前缀和'
      },
      {
        mistake: 'r+1越界',
        why: '当r=n时，r+1会越界',
        correctWay: '数组开大一点，或判断r<n才减'
      },
    ],
    quiz: {
      question: '差分数组diff，区间[2,4]都加3，应该如何操作？',
      options: ['diff[2]+=3', 'diff[2]+=3, diff[5]-=3', 'diff[1]+=3, diff[4]-=3', '每个位置都加3'],
      answer: 1,
      explanation: '区间修改只需改两个端点：左端点加，右端点后一位减'
    },
    prerequisites: [60, 26],
    recommendedProblems: [56, 57],
    relatedKnowledge: [60, 27], // 前缀和、一维数组
    readTime: 20,
  },
  {
    id: 62,
    slug: 'fast-power',
    title: '快速幂',
    icon: '⚡',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '高效计算a的n次方',
    description: '快速幂利用二进制分解，将O(n)的幂运算优化到O(log n)。',
    content: [
      '为什么需要快速幂？',
      '快速幂的原理',
      '二进制分解思想',
      '快速幂的实现',
      '取模运算',
    ],
    kidFriendly: {
      analogy: `计算 2^10，普通方法是乘10次：2×2×2×2×2×2×2×2×2×2

快速幂的思路：
2^10 = (2^2)^5 = 4^5
4^5 = 4 × 4^4 = 4 × 16^2
16^2 = 256^1
256^1 = 256 × 1^0 = 256

只算了3次乘法！`,
      visualization: `⚡ 快速幂原理：

计算 a^n：
n 写成二进制，比如 13 = 1101
a^13 = a^8 × a^4 × a^1

过程：
result = 1
while (n > 0) {
    if (n是奇数) result *= a
    a = a * a    // a², a⁴, a⁸, ...
    n /= 2
}

时间复杂度：O(log n)`,
      whyLearn: '当n很大（如10^18）时，普通方法根本算不完，快速幂只需几十次运算。'
    },
    codeExamples: [
      {
        title: '快速幂实现',
        description: '计算 a^n mod m',
        code: `#include <iostream>
using namespace std;

// 快速幂取模
long long fastPower(long long a, long long n, long long m) {
    long long result = 1;
    a %= m;  // 先取模防止溢出
    
    while (n > 0) {
        if (n % 2 == 1) {  // n是奇数
            result = result * a % m;
        }
        a = a * a % m;
        n /= 2;
    }
    
    return result;
}

int main() {
    long long a, n, m;
    cin >> a >> n >> m;
    cout << fastPower(a, n, m) << endl;
    return 0;
}`,
        input: '2 10 1000000007',
        expectedOutput: '1024',
        explanation: [
          '每次把n除以2，把a平方',
          '如果n是奇数，把当前a乘到结果里',
          '全程取模防止溢出',
          '时间复杂度O(log n)'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '没有用long long',
        why: '中间结果可能溢出int',
        correctWay: '全程使用long long'
      },
      {
        mistake: '忘记取模',
        why: '结果可能超出数据范围',
        correctWay: '每次乘法后都取模'
      },
    ],
    quiz: {
      question: '快速幂计算a^n的时间复杂度是？',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      answer: 1,
      explanation: '每次n减半，所以是O(log n)'
    },
    prerequisites: [3, 4],
    recommendedProblems: [43, 58],
    relatedKnowledge: [55, 56, 57], // GCD/LCM、素数、素数判定
    readTime: 25,
  },
  {
    id: 63,
    slug: 'vector-intro',
    title: 'vector容器',
    icon: '📦',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '动态数组的使用',
    description: 'vector是C++ STL中的动态数组，可以自动扩容，使用方便。',
    content: [
      '什么是vector？',
      'vector的声明和初始化',
      'vector的基本操作',
      'vector与数组的区别',
      'vector的常见应用',
    ],
    kidFriendly: {
      analogy: `vector就像一个会自动变长的数组。

普通数组：开多大就是多大，浪费空间或不够用。
vector：需要多少就放多少，自动扩容。

就像一个魔法袋子，装多少东西都行！`,
      visualization: `📦 vector基本操作：

声明：vector<int> v;        // 空vector
      vector<int> v(10);      // 10个0
      vector<int> v(10, 5);   // 10个5

添加：v.push_back(3);       // 末尾添加
删除：v.pop_back();         // 删除末尾
访问：v[0], v[1], ...       // 像数组一样
大小：v.size()              // 元素个数

遍历：
for (int i = 0; i < v.size(); i++) cout << v[i];
for (int x : v) cout << x;  // 范围for`,
      whyLearn: '很多时候不知道需要多大的数组，vector可以动态调整，更安全方便。'
    },
    codeExamples: [
      {
        title: 'vector基础',
        description: '动态数组操作',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;  // 空vector
    
    // 添加元素
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    
    cout << "大小：" << v.size() << endl;
    
    // 遍历
    cout << "元素：";
    for (int i = 0; i < v.size(); i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    
    // 范围for遍历
    cout << "再次遍历：";
    for (int x : v) {
        cout << x << " ";
    }
    cout << endl;
    
    // 删除末尾
    v.pop_back();
    cout << "删除后大小：" << v.size() << endl;
    
    return 0;
}`,
        expectedOutput: '大小：3\n元素：10 20 30\n再次遍历：10 20 30\n删除后大小：2',
        explanation: [
          'push_back()在末尾添加元素',
          'pop_back()删除末尾元素',
          'size()返回元素个数',
          '可以用[]或范围for遍历'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '用[]访问空vector',
        why: 'vector为空时访问会越界',
        correctWay: '先检查size()或用at()'
      },
      {
        mistake: '遍历时修改vector',
        why: '可能导致迭代器失效',
        correctWay: '遍历和修改分开进行'
      },
    ],
    quiz: {
      question: 'vector和数组的主要区别是？',
      options: ['vector不能随机访问', 'vector可以动态扩容', 'vector更快', '数组更安全'],
      answer: 1,
      explanation: 'vector可以自动扩容，大小可变；数组大小固定'
    },
    prerequisites: [26, 32],
    recommendedProblems: [30, 60],
    relatedKnowledge: [27, 64, 69], // 一维数组、pair、自定义比较
    readTime: 20,
  },
  {
    id: 64,
    slug: 'pair-intro',
    title: 'pair类型',
    icon: '👥',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '存储两个值的组合',
    description: 'pair可以存储两个不同类型的值，常用于坐标、键值对等场景。',
    content: [
      '什么是pair？',
      'pair的创建和访问',
      'pair的应用场景',
      'pair与vector配合',
      '自定义排序',
    ],
    kidFriendly: {
      analogy: `pair就像一个小盒子，里面放两个东西。

比如：
- 坐标：(x, y) 是一个pair
- 学生的姓名和分数：(name, score)
- 商品的编号和价格：(id, price)

一个pair只能放两个东西，但可以嵌套使用。`,
      visualization: `👥 pair基本操作：

声明：pair<int, string> p;          // int和string
      pair<int, int> p(3, 4);       // 坐标(3,4)
      make_pair(1, "hello");        // 自动推断类型

访问：p.first   // 第一个值
      p.second  // 第二个值

常用场景：
- 坐标：pair<int, int>
- 带下标的排序：pair<值, 下标>
- map的元素：pair<key, value>`,
      whyLearn: '很多STL容器（如map）内部用pair存储，理解pair很重要。'
    },
    codeExamples: [
      {
        title: 'pair基础',
        description: '坐标和带索引排序',
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 坐标
    pair<int, int> point(3, 4);
    cout << "坐标：(" << point.first << ", " << point.second << ")" << endl;
    
    // 带索引排序
    vector<pair<int, int>> v;
    v.push_back({50, 1});  // 值50，原索引1
    v.push_back({30, 2});  // 值30，原索引2
    v.push_back({40, 3});  // 值40，原索引3
    
    // 按值排序（默认按first排序）
    sort(v.begin(), v.end());
    
    cout << "排序后的值和原索引：" << endl;
    for (auto& p : v) {
        cout << "值=" << p.first << " 原索引=" << p.second << endl;
    }
    
    return 0;
}`,
        expectedOutput: '坐标：(3, 4)\n排序后的值和原索引：\n值=30 原索引=2\n值=40 原索引=3\n值=50 原索引=1',
        explanation: [
          'pair.first访问第一个值，second访问第二个',
          'pair默认按first排序',
          '常用于记录原位置',
          'auto& 自动推断类型'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记pair的访问方式',
        why: '容易写成p[0], p[1]',
        correctWay: '用p.first和p.second访问'
      },
      {
        mistake: '排序方向搞错',
        why: '默认是升序',
        correctWay: '需要降序时自定义比较函数'
      },
    ],
    quiz: {
      question: '访问pair p的两个元素用？',
      options: ['p[0] 和 p[1]', 'p.first 和 p.second', 'p.a 和 p.b', 'p.get(0) 和 p.get(1)'],
      answer: 1,
      explanation: 'pair用.first和.second访问两个元素'
    },
    prerequisites: [63],
    recommendedProblems: [45, 59],
    relatedKnowledge: [63, 38, 69], // vector、排序概念、自定义比较
    readTime: 15,
  },
  {
    id: 65,
    slug: 'stack-intro',
    title: '栈',
    icon: '📚',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '后进先出的数据结构',
    description: '栈是一种只能在一端进行插入和删除的数据结构，遵循"后进先出"(LIFO)原则。',
    content: [
      '什么是栈？',
      '栈的基本操作',
      '栈的特性：LIFO',
      'STL stack的使用',
      '栈的应用场景',
    ],
    kidFriendly: {
      analogy: `栈就像一摞盘子。

你只能：
- 在最上面放盘子（push）
- 从最上面拿盘子（pop）
- 看最上面是什么（top）

想拿下面的盘子？必须先把上面的都拿走！

这就是"后进先出"：最后放上去的盘子，最先被拿走。`,
      visualization: `📚 栈的操作示意：

    ┌───┐
    │ 3 │ ← top（栈顶）
    ├───┤
    │ 2 │
    ├───┤
    │ 1 │
    └───┘
      ↑
    栈底

操作：
push(4)：放入元素
    ┌───┐
    │ 4 │ ← 新的top
    ├───┤
    │ 3 │
    └───┘

pop()：弹出栈顶
    取出4，3变成新的top`,
      whyLearn: '栈在括号匹配、表达式求值、函数调用等场景都有应用。'
    },
    codeExamples: [
      {
        title: 'STL stack使用',
        description: '括号匹配',
        code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    stack<char> st;
    bool valid = true;
    
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);  // 左括号入栈
        } else {
            if (st.empty()) {
                valid = false;
                break;
            }
            char top = st.top();
            st.pop();
            // 检查匹配
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                valid = false;
                break;
            }
        }
    }
    
    if (valid && st.empty()) {
        cout << "括号匹配！" << endl;
    } else {
        cout << "括号不匹配！" << endl;
    }
    
    return 0;
}`,
        input: '{[()]}',
        expectedOutput: '括号匹配！',
        explanation: [
          '遇到左括号入栈',
          '遇到右括号检查栈顶是否匹配',
          '最后栈为空才匹配',
          '这是栈的经典应用'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '对空栈进行top或pop',
        why: '会导致运行时错误',
        correctWay: '操作前用empty()检查'
      },
      {
        mistake: '混淆栈和队列',
        why: '栈是后进先出，队列是先进先出',
        correctWay: '记住栈像一摞盘子'
      },
    ],
    quiz: {
      question: '栈的特点是？',
      options: ['先进先出', '后进先出', '随机访问', '只能存数字'],
      answer: 1,
      explanation: '栈是LIFO（Last In First Out），最后放入的最先取出'
    },
    prerequisites: [63, 19],
    recommendedProblems: [61, 62],
    relatedKnowledge: [66, 53, 54], // 队列、BFS、DFS
    readTime: 20,
    videoUrl: 'https://www.bilibili.com/video/BV1jW411d7xY',
  },
  {
    id: 66,
    slug: 'queue-intro',
    title: '队列',
    icon: '🚶',
    category: 'data-structures',
    difficulty: 'basic',
    brief: '先进先出的数据结构',
    description: '队列是一种在一端插入、另一端删除的数据结构，遵循"先进先出"(FIFO)原则。',
    content: [
      '什么是队列？',
      '队列的基本操作',
      '队列的特性：FIFO',
      'STL queue的使用',
      '队列的应用场景',
    ],
    kidFriendly: {
      analogy: `队列就像排队买票。

先来的人排在前面，先买票离开。
后来的人排在后面，等前面的人买完。

这就是"先进先出"：先排队的人，先买到票离开。

公平！就像生活中的排队一样。`,
      visualization: `🚶 队列的操作示意：

    ┌───┬───┬───┬───┐
    │ 1 │ 2 │ 3 │ 4 │
    └───┴───┴───┴───┘
      ↑           ↑
    front        back
    (队首)       (队尾)

操作：
push(5)：从队尾加入
    ┌───┬───┬───┬───┬───┐
    │ 1 │ 2 │ 3 │ 4 │ 5 │
    └───┴───┴───┴───┴───┘

pop()：从队首移除
    ┌───┬───┬───┬───┐
    │ 2 │ 3 │ 4 │ 5 │
    └───┴───┴───┴───┘`,
      whyLearn: '队列在BFS广度优先搜索、任务调度等场景非常重要。'
    },
    codeExamples: [
      {
        title: 'STL queue使用',
        description: '模拟排队',
        code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    // 入队
    q.push(1);
    q.push(2);
    q.push(3);
    
    cout << "队首：" << q.front() << endl;
    cout << "队尾：" << q.back() << endl;
    cout << "大小：" << q.size() << endl;
    
    // 出队
    cout << "出队顺序：";
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;
    
    return 0;
}`,
        expectedOutput: '队首：1\n队尾：3\n大小：3\n出队顺序：1 2 3',
        explanation: [
          'push()从队尾加入',
          'pop()从队首移除',
          'front()访问队首',
          'back()访问队尾'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '用[]访问队列',
        why: '队列不支持随机访问',
        correctWay: '只能访问front和back'
      },
      {
        mistake: '对空队列操作',
        why: '会导致运行时错误',
        correctWay: '操作前用empty()检查'
      },
    ],
    quiz: {
      question: '队列的特点是？',
      options: ['后进先出', '先进先出', '随机访问', '只能存数字'],
      answer: 1,
      explanation: '队列是FIFO（First In First Out），先进入队列的先出来'
    },
    prerequisites: [65, 19],
    recommendedProblems: [62, 63],
    relatedKnowledge: [65, 53], // 栈、BFS
    readTime: 20,
    videoUrl: 'https://www.bilibili.com/video/BV1jW411d7xY',
  },
  {
    id: 67,
    slug: 'binary-answer',
    title: '二分答案',
    icon: '🎯',
    category: 'algorithms',
    difficulty: 'intermediate',
    brief: '对答案进行二分枚举',
    description: '二分答案是一种重要的思想：当答案满足单调性时，可以对答案进行二分，每次检验是否可行。',
    content: [
      '什么是二分答案？',
      '二分答案的前提条件',
      '检验函数的设计',
      '二分答案的实现',
      '经典例题分析',
    ],
    kidFriendly: {
      analogy: `猜数字游戏：我心里想一个1到100的数字，你来猜。

普通方法：1、2、3、4...最多猜100次。

聪明方法（二分）：
- 50？太大了！范围变成1-49
- 25？太大了！范围变成1-24
- 12？太小了！范围变成13-24
- ...

最多猜7次就能猜对！

这就是二分答案：答案在某个范围内，我们可以不断缩小范围。`,
      visualization: `🎯 二分答案流程：

问题：求满足条件的最小值

答案范围：[L, R]

while (L < R) {
    mid = (L + R) / 2
    
    if (check(mid) 满足条件) {
        R = mid  // 答案可能在左半边
    } else {
        L = mid + 1  // 答案一定在右半边
    }
}

关键：设计check函数判断mid是否满足条件`,
      whyLearn: '很多问题的答案很难直接计算，但可以"猜"并检验。二分答案让猜测效率大大提高。'
    },
    codeExamples: [
      {
        title: '二分答案示例',
        description: '木材切割问题',
        code: `#include <iostream>
#include <algorithm>
using namespace std;

int n, k;
int a[100005];

// 检验：每段长度为len时，能否切出至少k段
bool check(int len) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        count += a[i] / len;
    }
    return count >= k;
}

int main() {
    cin >> n >> k;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    // 二分答案
    int L = 1, R = *max_element(a, a + n);
    int ans = 0;
    
    while (L <= R) {
        int mid = (L + R) / 2;
        if (check(mid)) {
            ans = mid;     // 记录答案
            L = mid + 1;   // 尝试更长的段
        } else {
            R = mid - 1;   // 太长了，缩短
        }
    }
    
    cout << ans << endl;
    return 0;
}`,
        input: '3 7\n10 15 20',
        expectedOutput: '6',
        explanation: [
          '每段长度mid，能切出多少段',
          '二分答案范围[1, 最长木材]',
          'check函数检验是否可行',
          '找最大的可行长度'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '二分边界写错',
        why: '容易漏掉答案或死循环',
        correctWay: '根据题目确定用L<=R还是L<R'
      },
      {
        mistake: 'check函数写反',
        why: '判断条件搞反会得到错误答案',
        correctWay: '先明确要求的答案方向'
      },
    ],
    quiz: {
      question: '二分答案的前提是答案满足？',
      options: ['随机性', '单调性', '周期性', '对称性'],
      answer: 1,
      explanation: '答案必须单调（有序），才能二分'
    },
    prerequisites: [44, 38],
    recommendedProblems: [50, 51],
    relatedKnowledge: [43, 59], // 二分查找、贪心
    readTime: 25,
  },
  {
    id: 68,
    slug: 'insertion-sort',
    title: '插入排序',
    icon: '📥',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '将元素插入到已排序序列中',
    description: '插入排序通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。',
    content: [
      '插入排序的思想',
      '插入排序的过程',
      '插入排序的实现',
      '时间复杂度分析',
      '插入排序 vs 冒泡排序',
    ],
    kidFriendly: {
      analogy: `插入排序就像整理手牌。

你手里有几张牌已经排好序了，现在拿起一张新牌。

从右往左找：
- 这张牌比新牌大？往右移
- 这张牌比新牌小？新牌放它右边

一张一张插进去，最后全部排好序！`,
      visualization: `📥 插入排序过程：

原数组：[5, 2, 4, 1, 3]

第1步：[5 | 2, 4, 1, 3]  ← 5已排序
第2步：[2, 5 | 4, 1, 3]  ← 插入2
第3步：[2, 4, 5 | 1, 3]  ← 插入4
第4步：[1, 2, 4, 5 | 3]  ← 插入1
第5步：[1, 2, 3, 4, 5]   ← 插入3

每次把一个元素插入到正确位置`,
      whyLearn: '插入排序虽然效率不如快排，但对小规模或基本有序的数据效果很好。'
    },
    codeExamples: [
      {
        title: '插入排序实现',
        description: '从小到大排序',
        code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[105];
    
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    // 插入排序
    for (int i = 1; i < n; i++) {
        int key = a[i];  // 要插入的元素
        int j = i - 1;
        
        // 把比key大的元素往右移
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        
        // 插入key
        a[j + 1] = key;
    }
    
    // 输出
    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        input: '5\n5 2 4 1 3',
        expectedOutput: '1 2 3 4 5',
        explanation: [
          '从第2个元素开始，逐个插入',
          '在已排序部分找正确位置',
          '边比较边移动',
          '时间复杂度O(n²)'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'j的范围写错',
        why: 'j >= 0 容易漏掉',
        correctWay: '注意边界条件'
      },
      {
        mistake: '移动方向搞反',
        why: '应该把大的往右移',
        correctWay: '画图理解移动过程'
      },
    ],
    quiz: {
      question: '插入排序的时间复杂度是？',
      options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'],
      answer: 1,
      explanation: '最坏情况下每个元素都要和前面所有元素比较，是O(n²)'
    },
    prerequisites: [38, 19],
    recommendedProblems: [44, 45],
    relatedKnowledge: [38, 39, 40, 69], // 排序概念、冒泡排序、选择排序、自定义比较
    readTime: 20,
  },
  {
    id: 69,
    slug: 'custom-compare',
    title: '自定义比较',
    icon: '⚖️',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '自定义排序规则',
    description: '学习如何自定义排序规则，包括比较函数和lambda表达式。',
    content: [
      '为什么要自定义比较？',
      '比较函数的写法',
      'sort的第三个参数',
      'lambda表达式',
      '结构体排序',
    ],
    kidFriendly: {
      analogy: `排序默认是"从小到大"。但有时候我们想要：
- 从大到小
- 按学生成绩排序
- 按字符串长度排序

就像老师排座位，可以按身高排，也可以按成绩排。

自定义比较就是告诉程序"谁应该排在前面"。`,
      visualization: `⚖️ 自定义比较：

// 方法1：比较函数
bool cmp(int a, int b) {
    return a > b;  // 从大到小
}
sort(v.begin(), v.end(), cmp);

// 方法2：lambda表达式
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;
});

// 结构体排序
struct Student {
    string name;
    int score;
};

bool cmp(Student a, Student b) {
    return a.score > b.score;  // 按分数降序
}`,
      whyLearn: '实际问题中的排序往往有特殊要求，自定义比较是必备技能。'
    },
    codeExamples: [
      {
        title: '自定义比较示例',
        description: '多种排序方式',
        code: `#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

// 按分数降序，分数相同按名字升序
bool cmp(Student a, Student b) {
    if (a.score != b.score) {
        return a.score > b.score;
    }
    return a.name < b.name;
}

int main() {
    vector<Student> students = {
        {"Alice", 90},
        {"Bob", 85},
        {"Charlie", 90},
        {"David", 95}
    };
    
    sort(students.begin(), students.end(), cmp);
    
    cout << "排名：" << endl;
    for (int i = 0; i < students.size(); i++) {
        cout << i + 1 << ". " << students[i].name 
             << " " << students[i].score << endl;
    }
    
    return 0;
}`,
        expectedOutput: '排名：\n1. David 95\n2. Alice 90\n3. Charlie 90\n4. Bob 85',
        explanation: [
          '比较函数返回true表示a应该排在b前面',
          '分数不同按分数排',
          '分数相同按名字排',
          '自定义规则灵活应用'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '比较函数返回>=',
        why: '可能导致相等元素被认为是严格小于',
        correctWay: '用>或<，不要用>=或<='
      },
      {
        mistake: '排序规则不一致',
        why: '可能导致排序结果不确定',
        correctWay: '确保比较函数是严格弱序'
      },
    ],
    quiz: {
      question: 'sort的比较函数返回true表示？',
      options: ['a等于b', 'a应该排在b前面', 'a大于b', 'a小于b'],
      answer: 1,
      explanation: '返回true表示第一个参数应该排在第二个参数前面'
    },
    prerequisites: [38, 35],
    recommendedProblems: [44, 45],
    relatedKnowledge: [38, 63, 64], // 排序概念、vector、pair
    readTime: 20,
  },
  {
    id: 70,
    slug: 'basic-algo-review',
    title: '基础算法复习',
    icon: '📚',
    category: 'algorithms',
    difficulty: 'basic',
    brief: '汇总 Day 15-34 重点难点，巩固基础算法知识',
    description: '系统回顾模拟、枚举、排序、递归、二分、贪心、前缀和、数论、STL等基础算法知识。',
    content: [
      '🎯 Day 15-16：模拟与枚举',
      '📊 Day 17-18：排序算法',
      '🔄 Day 19-21：函数与递归',
      '🔍 Day 22-23：二分查找与二分答案',
      '💰 Day 24-25：贪心算法',
      '📈 Day 26-27：前缀和与差分',
      '🔢 Day 28-30：数论基础',
      '📦 Day 31-34：STL容器',
    ],
    kidFriendly: {
      analogy: `基础算法阶段完成！你已经学会了很多"招式"：

• 模拟：照着题目做，细心最重要
• 枚举：一个一个试，但要聪明地试
• 排序：排好顺序好办事
• 递归：自己调用自己
• 二分：猜答案，快速缩小范围
• 贪心：每一步选当前最好的
• 前缀和/差分：快速处理区间
• 数论：数学知识在编程中的应用
• STL：现成的工具箱

现在，让我们把这些招式串起来！`,
      visualization: `📚 基础算法知识体系

┌─────────────────────────────────────────────────────┐
│                   基础算法体系                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│   基础思想          数据结构          数论工具       │
│   ┌─────┐          ┌─────┐          ┌─────┐       │
│   │模拟 │          │vector│         │ GCD │       │
│   │枚举 │          │stack│          │ LCM │       │
│   │递归 │          │queue│          │素数 │       │
│   │二分 │          │pair │          │快速幂│       │
│   │贪心 │          └─────┘          └─────┘       │
│   └─────┘                                          │
│                                                     │
│   优化技巧                                          │
│   ┌──────────┐                                     │
│   │ 前缀和   │  区间查询 O(1)                      │
│   │ 差分     │  区间修改 O(1)                      │
│   │ 二分答案 │  问题转化                            │
│   └──────────┘                                     │
│                                                     │
└─────────────────────────────────────────────────────┘`,
      whyLearn: '复习是学习的重要环节，温故而知新，巩固基础才能进阶提高。'
    },
    reviewContent: {
      sections: [
        {
          day: 'Day 15-16',
          title: '模拟与枚举',
          keyPoints: ['模拟：按题目描述实现过程', '枚举：尝试所有可能的情况', '枚举优化：缩小范围、减少重复', '注意边界条件和特殊情况'],
          commonMistakes: ['漏掉边界情况', '枚举范围过大超时', '题意理解错误'],
          relatedSlug: 'simulation-intro'
        },
        {
          day: 'Day 17-18',
          title: '排序算法',
          keyPoints: ['冒泡排序：相邻元素交换', '选择排序：选最小的放前面', '插入排序：插入到正确位置', 'STL sort：高效便捷'],
          commonMistakes: ['数组下标错误', '比较函数写错', '忘记包含头文件'],
          relatedSlug: 'sort-intro'
        },
        {
          day: 'Day 19-21',
          title: '函数与递归',
          keyPoints: ['函数定义与调用', '参数传递（值传递）', '递归思想：自己调用自己', '递归终止条件必不可少'],
          commonMistakes: ['没有终止条件导致无限递归', '参数传递错误', '返回值遗漏'],
          relatedSlug: 'function-intro'
        },
        {
          day: 'Day 22-23',
          title: '二分查找与答案',
          keyPoints: ['二分查找前提：有序数组', '二分答案前提：答案单调', '边界处理：L<=R 还是 L<R', '检验函数的设计'],
          commonMistakes: ['边界条件错误', '死循环', '检验函数逻辑错误'],
          relatedSlug: 'binary-search'
        },
        {
          day: 'Day 24-25',
          title: '贪心算法',
          keyPoints: ['贪心思想：每步选最优', '贪心正确性需要验证', '经典问题：区间调度、找零钱', '贪心不是万能的'],
          commonMistakes: ['贪心后没有验证正确性', '局部最优≠全局最优'],
          relatedSlug: 'greedy-intro'
        },
        {
          day: 'Day 26-27',
          title: '前缀和与差分',
          keyPoints: ['前缀和：预处理后O(1)区间查询', '差分：O(1)区间修改', '差分是前缀和的逆运算', '下标从1开始更方便'],
          commonMistakes: ['下标从0开始导致边界问题', '忘记还原差分数组', '数据溢出'],
          relatedSlug: 'prefix-sum'
        },
        {
          day: 'Day 28-30',
          title: '数论基础',
          keyPoints: ['GCD/LCM：辗转相除法', '素数判定：试除法', '埃氏筛法：批量求素数', '快速幂：O(log n)幂运算'],
          commonMistakes: ['忘记取模导致溢出', '筛法下标错误', '边界值处理'],
          relatedSlug: 'gcd-lcm'
        },
        {
          day: 'Day 31-34',
          title: 'STL容器',
          keyPoints: ['vector：动态数组', 'stack：后进先出', 'queue：先进先出', 'pair：存储两个值'],
          commonMistakes: ['空容器访问top/front', '下标越界', '忘记包含头文件'],
          relatedSlug: 'vector-intro'
        },
      ],
    },
    codeExamples: [
      {
        title: '综合示例：结构体+排序+前缀和',
        description: '学生成绩统计',
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

bool cmp(Student a, Student b) {
    return a.score > b.score;
}

int main() {
    int n;
    cin >> n;
    
    vector<Student> stu(n);
    for (int i = 0; i < n; i++) {
        cin >> stu[i].name >> stu[i].score;
    }
    
    // 排序
    sort(stu.begin(), stu.end(), cmp);
    
    // 计算前缀和
    vector<int> prefix(n + 1, 0);
    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + stu[i].score;
    }
    
    // 输出
    cout << "排名榜：" << endl;
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << stu[i].name 
             << " " << stu[i].score << endl;
    }
    cout << "总分：" << prefix[n] << endl;
    cout << "前三名总分：" << prefix[3] << endl;
    
    return 0;
}`,
        input: '5\nAlice 90\nBob 85\nCharlie 95\nDavid 80\nEve 88',
        expectedOutput: '排名榜：\n1. Charlie 95\n2. Alice 90\n3. Eve 88\n4. Bob 85\n5. David 80\n总分：438\n前三名总分：273',
        explanation: [
          '结构体存储学生信息',
          '自定义比较函数排序',
          '前缀和快速求区间和',
          '综合运用多种技术'
        ]
      }
    ],
    prerequisites: [41, 42, 38, 44, 59, 60, 61, 62, 63, 65, 66],
    recommendedProblems: [29, 44, 50, 55, 61],
    readTime: 40,
  },
  // ==================== 阶段复习 ====================
  {
    id: 100,
    slug: 'foundation-review',
    title: '基础入门复习',
    icon: '📚',
    category: 'basics',
    difficulty: 'basic',
    brief: '汇总 Day 1-13 重点难点，巩固基础入门知识',
    description: '系统回顾 C++ 基础语法、数据类型、流程控制、数组、结构体和字符串等核心知识点。',
    content: [
      '🎯 Day 1-2：C++入门与变量',
      '➕ Day 3-4：运算符与表达式',
      '🔀 Day 5-6：选择结构',
      '🔄 Day 7-9：循环结构',
      '📊 Day 10：一维数组',
      '📋 Day 11：二维数组',
      '🏗️ Day 12：结构体',
      '📝 Day 13：字符串',
    ],
    kidFriendly: {
      analogy: `复习就像把散落的拼图块整理成一幅完整的画。

想象你学了很多技能：
• Day 1-2：学会了认识工具（C++入门、变量）
• Day 3-4：学会了基本操作（运算符）
• Day 5-6：学会了做选择（if-else）
• Day 7-9：学会了重复做事（循环）
• Day 10-11：学会了收纳整理（数组）
• Day 12：学会了打包组合（结构体）
• Day 13：学会了处理文字（字符串）

现在，我们需要把这些技能串联起来，形成完整的编程能力！`,
      visualization: `📚 基础入门知识图谱

┌─────────────────────────────────────────────────────────────────┐
│                     基础入门知识体系                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                  │
│  │ C++入门  │───▶│  变量    │───▶│ 运算符   │                  │
│  │  (Day1)  │    │  (Day2)  │    │  (Day4)  │                  │
│  └──────────┘    └──────────┘    └──────────┘                  │
│        │                               │                        │
│        ▼                               ▼                        │
│  ┌──────────┐                   ┌──────────┐                   │
│  │ 选择结构 │◀──────────────────│ 循环结构 │                   │
│  │  (Day5)  │                   │  (Day7)  │                   │
│  └──────────┘                   └──────────┘                   │
│        │                               │                        │
│        └───────────────┬───────────────┘                        │
│                        ▼                                        │
│                  ┌──────────┐                                   │
│                  │   数组   │                                   │
│                  │  (Day10) │                                   │
│                  └──────────┘                                   │
│                        │                                        │
│          ┌─────────────┼─────────────┐                          │
│          ▼             ▼             ▼                          │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│    │ 二维数组 │  │  结构体  │  │  字符串  │                    │
│    │  (Day11) │  │  (Day12) │  │  (Day13) │                    │
│    └──────────┘  └──────────┘  └──────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

🔗 知识点关联：
  • 变量是所有数据存储的基础
  • 运算符用于处理变量
  • 选择和循环控制程序流程
  • 数组存储多个同类型变量
  • 结构体组合多个相关变量
  • 字符串处理文本数据`,
      whyLearn: `为什么需要系统复习？

🎮 就像游戏通关：
  每个知识点是一个关卡，复习就是"通关回顾"
  确保你没有遗漏任何重要的技能

📚 就像搭积木：
  每个知识点是一块积木
  复习让你看到整个城堡的结构
  发现哪些地方不够牢固

🚀 为进阶做准备：
  基础不牢，地动山摇
  只有把基础打扎实，才能学好后面的算法`
    },
    codeExamples: [
      {
        title: '基础语法综合示例',
        description: '串联 Day 1-13 的核心知识点',
        code: `#include <iostream>
#include <string>
using namespace std;

// 结构体（Day 12）
struct Student {
    string name;      // 字符串（Day 13）
    int scores[5];    // 数组（Day 10）
    int scoreCount;
};

int main() {
    // 输入输出（Day 1）
    cout << "=== 学生成绩管理系统 ===" << endl;
    
    // 变量（Day 2）
    int n;
    cout << "请输入学生人数：";
    cin >> n;
    
    // 结构体数组
    Student students[100];
    
    // 循环（Day 7-9）
    for (int i = 0; i < n; i++) {
        cout << "\\n第" << i + 1 << "个学生" << endl;
        cout << "姓名：";
        cin >> students[i].name;
        
        cout << "请输入5门成绩：";
        students[i].scoreCount = 5;
        
        int sum = 0;
        // 循环输入成绩
        for (int j = 0; j < 5; j++) {
            cin >> students[i].scores[j];
            sum += students[i].scores[j];  // 运算符（Day 3-4）
        }
        
        // 选择结构（Day 5-6）
        double avg = sum / 5.0;
        cout << "平均分：" << avg << " ";
        
        if (avg >= 90) {
            cout << "等级：优秀" << endl;
        } else if (avg >= 80) {
            cout << "等级：良好" << endl;
        } else if (avg >= 60) {
            cout << "等级：及格" << endl;
        } else {
            cout << "等级：不及格" << endl;
        }
    }
    
    // 找出最高平均分的学生
    int maxIdx = 0;
    double maxAvg = 0;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = 0; j < students[i].scoreCount; j++) {
            sum += students[i].scores[j];
        }
        double avg = sum / 5.0;
        if (avg > maxAvg) {
            maxAvg = avg;
            maxIdx = i;
        }
    }
    
    cout << "\\n成绩最好的学生：" << students[maxIdx].name << endl;
    
    return 0;
}`,
        expectedOutput: '=== 学生成绩管理系统 ===\n请输入学生人数：2\n\n第1个学生\n姓名：张三\n请输入5门成绩：90 85 92 88 95\n平均分：90 等级：优秀\n\n第2个学生\n姓名：李四\n请输入5门成绩：75 80 82 78 85\n平均分：80 等级：良好\n\n成绩最好的学生：张三',
        explanation: [
          '这个程序串联了基础入门的所有核心知识点',
          '结构体组合了字符串和数组',
          '循环和选择结构控制程序流程',
          '变量和运算符处理数据',
          '输入输出与用户交互',
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: '忘记变量初始化',
        why: '未初始化的变量包含随机值',
        correctWay: '声明变量时就赋初值，如 int sum = 0;'
      },
      {
        mistake: '数组越界访问',
        why: '访问不存在的下标会导致错误',
        correctWay: '确保下标在 0 到 length-1 范围内'
      },
      {
        mistake: '循环边界错误',
        why: '多循环或少循环一次',
        correctWay: '明确是用 < 还是 <=，画图验证'
      },
      {
        mistake: '结构体定义漏分号',
        why: 'struct 定义末尾必须有分号',
        correctWay: 'struct Name { ... };  // 别忘了分号'
      },
      {
        mistake: '字符串输入问题',
        why: 'cin >> 遇到空格会停止',
        correctWay: '用 getline(cin, s) 读取含空格的字符串'
      },
    ],
    quiz: {
      question: '以下哪个说法正确？',
      options: [
        '数组下标从1开始',
        '结构体可以包含不同类型的成员',
        '循环只能用for实现',
        '字符串不能用==比较'
      ],
      answer: 1,
      explanation: '结构体的优势就是可以组合不同类型的成员变量。数组下标从0开始，循环可以用for/while/do-while，字符串可以用==比较。'
    },
    prerequisites: [1, 2, 15, 19, 27, 33, 385, 44],
    recommendedProblems: [1, 15, 24, 30, 75],
    readTime: 40,
    // 复习专用内容
    reviewContent: {
      sections: [
        {
          day: 'Day 1-2',
          title: 'C++入门与变量',
          keyPoints: ['C++程序结构（头文件、main函数）', 'cout输出、cin输入', '变量命名规则', '基本数据类型（int、double、char、bool、string）'],
          commonMistakes: ['忘记分号', '变量未初始化就使用', '数据类型选择不当导致精度丢失'],
          relatedSlug: 'intro-cpp'
        },
        {
          day: 'Day 3-4',
          title: '运算符与表达式',
          keyPoints: ['算术运算符（+、-、*、/、%）', '自增自减（++、--）', '复合赋值运算符（+=、-=）', '类型转换与精度问题'],
          commonMistakes: ['整数除法丢失小数部分', '自增自减的前置后置混淆', '运算符优先级错误'],
          relatedSlug: 'operators'
        },
        {
          day: 'Day 5-6',
          title: '选择结构',
          keyPoints: ['if-else语句', 'else if多分支', 'switch-case语句', '逻辑运算符（&&、||、！）', '三元运算符'],
          commonMistakes: ['条件判断写成赋值（= vs ==）', '忘记else分支', 'switch缺少break'],
          relatedSlug: 'if-else'
        },
        {
          day: 'Day 7-9',
          title: '循环结构',
          keyPoints: ['for循环（计数循环）', 'while循环（条件循环）', 'do-while循环', '循环嵌套', 'break和continue'],
          commonMistakes: ['循环边界错误（< vs <=）', '死循环', '嵌套循环变量混淆'],
          relatedSlug: 'for-loop'
        },
        {
          day: 'Day 10',
          title: '一维数组',
          keyPoints: ['数组声明与初始化', '数组下标从0开始', '数组遍历', '数组越界问题'],
          commonMistakes: ['下标越界', '数组未初始化', '混淆数组长度和最大下标'],
          relatedSlug: 'array-intro'
        },
        {
          day: 'Day 11',
          title: '二维数组',
          keyPoints: ['二维数组声明', '行列遍历', '矩阵操作', '对角线访问'],
          commonMistakes: ['行列索引混淆', '二维数组初始化格式错误'],
          relatedSlug: '2d-array'
        },
        {
          day: 'Day 12',
          title: '结构体',
          keyPoints: ['结构体定义', '成员访问（.运算符）', '结构体初始化', '结构体数组', '结构体排序'],
          commonMistakes: ['定义后忘记分号', '初始化顺序错误', '值传递vs引用传递'],
          relatedSlug: 'struct-intro'
        },
        {
          day: 'Day 13',
          title: '字符串',
          keyPoints: ['string类型', '字符串输入（cin、getline）', '常用操作（length、substr、find）', '字符数组'],
          commonMistakes: ['cin遇到空格停止', '字符串比较用==而非strcmp', '忘记字符串以\\0结尾'],
          relatedSlug: 'string-intro'
        },
      ],
    },
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

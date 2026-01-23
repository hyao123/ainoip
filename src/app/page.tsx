'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Code2, ListChecks, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

// 题目数据类型
interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  defaultCode: string;
  category: string;
  year?: string;
}

// 分类类型
interface Category {
  name: string;
  icon: string;
  problems: Problem[];
}

// 预设题目 - 按分类和年份组织
const problems: Problem[] = [
  // 基础算法
  {
    id: 1,
    title: 'A + B 问题',
    difficulty: 'easy',
    description: '输入两个整数，输出它们的和。这是最基础的题目，帮助你熟悉输入输出。',
    inputFormat: '输入包含两个整数 a, b，用空格分隔。',
    outputFormat: '输出一个整数，表示 a + b 的值。',
    sampleInput: '1 2',
    sampleOutput: '3',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}',
    category: '基础算法'
  },
  {
    id: 2,
    title: '斐波那契数列',
    difficulty: 'easy',
    description: '求斐波那契数列的第 n 项。斐波那契数列定义为：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) (n≥2)。这是经典的递推题目。',
    inputFormat: '输入一个整数 n，表示要求的项数。',
    outputFormat: '输出斐波那契数列的第 n 项。',
    sampleInput: '5',
    sampleOutput: '5',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    if (n == 0) {\n        cout << 0 << endl;\n        return 0;\n    }\n    if (n == 1) {\n        cout << 1 << endl;\n        return 0;\n    }\n    \n    int a = 0, b = 1, c;\n    for (int i = 2; i <= n; i++) {\n        c = a + b;\n        a = b;\n        b = c;\n    }\n    cout << b << endl;\n    return 0;\n}',
    category: '基础算法'
  },
  {
    id: 3,
    title: '阶乘计算',
    difficulty: 'easy',
    description: '输入一个正整数 n，输出 n! 的值。n! = 1 × 2 × 3 × ... × n',
    inputFormat: '输入一个正整数 n (n ≤ 20)。',
    outputFormat: '输出 n! 的值。',
    sampleInput: '10',
    sampleOutput: '3628800',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    long long ans = 1;\n    for (int i = 2; i <= n; i++) {\n        ans *= i;\n    }\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '基础算法'
  },
  {
    id: 4,
    title: '最大公约数',
    difficulty: 'medium',
    description: '求两个正整数的最大公约数（GCD）。使用欧几里得算法可以高效求解。',
    inputFormat: '输入两个正整数 a, b，用空格分隔。',
    outputFormat: '输出一个整数，表示 a 和 b 的最大公约数。',
    sampleInput: '12 18',
    sampleOutput: '6',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint gcd(int a, int b) {\n    while (b) {\n        int t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << gcd(a, b) << endl;\n    return 0;\n}',
    category: '数论'
  },
  // 字符串处理
  {
    id: 5,
    title: 'NOIP 2011 普及组 - 数字反转',
    difficulty: 'easy',
    description: '给定一个整数，请将该数各位数字反转后输出。注意：负数保留负号，末尾的0去掉。',
    inputFormat: '输入一个整数 N。',
    outputFormat: '输出一个整数，表示数字 N 反转后的值。',
    sampleInput: '123000',
    sampleOutput: '321',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    \n    // 去掉前导符号\n    int start = 0;\n    bool negative = false;\n    if (s[0] == \'-\') {\n        negative = true;\n        start = 1;\n    }\n    \n    // 找到末尾的0的起始位置\n    int end = s.length() - 1;\n    while (end > start && s[end] == \'0\') {\n        end--;\n    }\n    \n    // 输出符号\n    if (negative) cout << \'-\';\n    \n    // 反向输出\n    for (int i = end; i >= start; i--) {\n        cout << s[i];\n    }\n    cout << endl;\n    \n    return 0;\n}',
    category: '字符串处理',
    year: '2011'
  },
  {
    id: 6,
    title: 'NOIP 2008 普及组 - ISBN号码',
    difficulty: 'medium',
    description: '每一本正式出版的图书都有一个ISBN号码与之对应，ISBN码包括9位数字、1位识别码和3位分隔符，其规定格式如"X-XXX-XXXXX-X"，其中符号"-"是分隔符，最后一位是识别码，识别码的计算方法如下：首位数字乘以1加上次位数字乘以2……以此类推，用所得的结果mod 11，所得的余数即为识别码，如果余数为10，则识别码为大写字母X。',
    inputFormat: '输入一个ISBN号码（保证输入合法）。',
    outputFormat: '如果计算出的识别码与输入的识别码相同，输出"Right"，否则输出正确的ISBN号码。',
    sampleInput: '0-670-82162-0',
    sampleOutput: 'Right',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    \n    int sum = 0;\n    int cnt = 1;\n    for (int i = 0; i < s.length(); i++) {\n        if (isdigit(s[i])) {\n            sum += (s[i] - \'0\') * cnt;\n            cnt++;\n        }\n    }\n    \n    int mod = sum % 11;\n    char check;\n    if (mod == 10) check = \'X\';\n    else check = \'0\' + mod;\n    \n    if (s[s.length() - 1] == check) {\n        cout << "Right" << endl;\n    } else {\n        s[s.length() - 1] = check;\n        cout << s << endl;\n    }\n    \n    return 0;\n}',
    category: '字符串处理',
    year: '2008'
  },
  {
    id: 7,
    title: 'NOIP 2018 普及组 - 标题统计',
    difficulty: 'easy',
    description: '凯凯刚写了一篇作文，请问这篇作文的标题中有多少个字符？注意：标题中可能包含空格。',
    inputFormat: '输入只有一行，一个字符串s，表示凯凯写的作文的标题。',
    outputFormat: '输出一个整数，表示标题中的字符个数。（只计算字符数，空格也算一个字符）',
    sampleInput: '234',
    sampleOutput: '3',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    \n    int cnt = 0;\n    for (int i = 0; i < s.length(); i++) {\n        if (s[i] != \' \') cnt++;\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}',
    category: '字符串处理',
    year: '2018'
  },
  {
    id: 8,
    title: 'NOIP 2012 提高组 - Vigenère密码',
    difficulty: 'hard',
    description: '16世纪法国外交家Blaise de Vigenère设计了一种多表密码加密算法——Vigenère密码。Vigenère密码的加密解密算法简单易用，且实难破解，一度被广泛应用于外交密码情报网中。现在，请你对输入的明文和密钥进行加密，输出密文。',
    inputFormat: '第一行为一个字符串，表示密钥key。第二行为一个字符串，表示明文plaintext。保证输入中只包含大写字母。',
    outputFormat: '输出一个字符串，表示密文。',
    sampleInput: 'CompleteVictory\nYvqgpxaimmklongnzfwpvxmfycnhcckdattrfjywxsquxmbbjjrxvslqbfxyqdrxfvtdcqgkqmmqsvrxymyvlhklfzqcfbrzwqkllswftczcgvfsa',
    sampleOutput: 'Wnawuwhlqefdxpylheqplvxlnoflqcxmqlgvwqzfvwylhcvwqfxvqjgqqwvqlnqxuhwylfwnxhvlzflwqlwfvqlmqlgqwmfwnhclqgqmqwfvqlzwhlclqefxmqwmfwnhclqmqwflw',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string key, plaintext;\n    cin >> key;\n    cin >> plaintext;\n    \n    string ciphertext;\n    for (int i = 0, j = 0; i < plaintext.length(); i++, j++) {\n        if (j >= key.length()) j = 0;\n        \n        int p = plaintext[i] - \'A\';\n        int k = key[j] - \'A\';\n        int c = (p + k) % 26;\n        ciphertext += (char)(c + \'A\');\n    }\n    \n    cout << ciphertext << endl;\n    return 0;\n}',
    category: '字符串处理',
    year: '2012'
  },
  // 数论
  {
    id: 9,
    title: 'NOIP 2014 普及组 - 质因数分解',
    difficulty: 'medium',
    description: '已知正整数 n 是两个不同的质数的乘积，试求出较大的那个质数。',
    inputFormat: '输入一个正整数 n (n ≤ 2 × 10^9)。',
    outputFormat: '输出较大的那个质数。',
    sampleInput: '21',
    sampleOutput: '7',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            cout << n / i << endl;\n            break;\n        }\n    }\n    \n    return 0;\n}',
    category: '数论',
    year: '2014'
  },
  {
    id: 10,
    title: 'NOIP 2012 普及组 - 质因数分解2',
    difficulty: 'medium',
    description: '输入一个整数 n，将它分解质因数。',
    inputFormat: '输入一个整数 n (n > 1)。',
    outputFormat: '输出 n 的质因数分解，每个质因数输出一次，按从小到大顺序输出。',
    sampleInput: '36',
    sampleOutput: '2 2 3 3',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 2; i * i <= n; i++) {\n        while (n % i == 0) {\n            cout << i << " ";\n            n /= i;\n        }\n    }\n    \n    if (n > 1) cout << n;\n    cout << endl;\n    \n    return 0;\n}',
    category: '数论',
    year: '2012'
  },
  // 模拟
  {
    id: 11,
    title: 'NOIP 2013 普及组 - 表达式求值',
    difficulty: 'medium',
    description: '给定一个只包含 + 和 - 的表达式，请计算它的值。',
    inputFormat: '输入一行，包含一个表达式，只包含数字、+ 和 -。',
    outputFormat: '输出表达式的值。',
    sampleInput: '1+2-3+4-5',
    sampleOutput: '-1',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    \n    int ans = 0;\n    int num = 0;\n    char op = \'+\';\n    \n    for (int i = 0; i < s.length(); i++) {\n        if (isdigit(s[i])) {\n            num = num * 10 + (s[i] - \'0\');\n        } else {\n            if (op == \'+\') ans += num;\n            else ans -= num;\n            num = 0;\n            op = s[i];\n        }\n    }\n    \n    if (op == \'+\') ans += num;\n    else ans -= num;\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '模拟',
    year: '2013'
  },
  {
    id: 12,
    title: 'NOIP 2015 普及组 - 金币',
    difficulty: 'medium',
    description: '国王将金币作为奖励，分发给骑士。第1天，骑士收到1枚金币；第2、3天，骑士每天收到2枚金币；第4、5、6天，骑士每天收到3枚金币……这种发放方式会一直持续下去：当连续 n 天每天收到 n 枚金币后，骑士会在接下来的 n+1 天里，每天收到 n+1 枚金币。请计算在第 k 天里，骑士一共获得了多少金币。',
    inputFormat: '输入一个正整数 k。',
    outputFormat: '输出一个整数，表示骑士在第 k 天总共获得的金币数。',
    sampleInput: '6',
    sampleOutput: '14',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int k;\n    cin >> k;\n    \n    int day = 0, coins = 0, n = 1;\n    while (day + n <= k) {\n        coins += n * n;\n        day += n;\n        n++;\n    }\n    \n    coins += (k - day) * n;\n    cout << coins << endl;\n    \n    return 0;\n}',
    category: '模拟',
    year: '2015'
  },
  {
    id: 13,
    title: 'NOIP 2016 普及组 - 买铅笔',
    difficulty: 'medium',
    description: 'P老师需要去商店买铅笔作为奖品。已知：① 一支普通铅笔的价格是p1元；② 一支包装铅笔（有包装，但包装也是铅笔的一部分）的价格是p2元；③ 一支精品铅笔（带精美包装盒，可做纪念品）的价格是p3元。每种铅笔都有不同的包装规格：① 普通铅笔的包装规格是num1支/包；② 包装铅笔的包装规格是num2支/包；③ 精品铅笔的包装规格是num3支/包。现在P老师需要n支铅笔，他可以购买任意多种包装的铅笔，问最少需要花费多少钱？',
    inputFormat: '第一行输入一个正整数n，表示需要购买的铅笔数量。接下来三行，每行两个正整数，分别表示一种铅笔的包装规格和价格。',
    outputFormat: '输出一个整数，表示最少需要的花费。',
    sampleInput: '57\n2 2\n50 30\n30 27',
    sampleOutput: '54',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    int num1, p1, num2, p2, num3, p3;\n    cin >> num1 >> p1;\n    cin >> num2 >> p2;\n    cin >> num3 >> p3;\n    \n    // 计算每种需要买多少包\n    int pack1 = (n + num1 - 1) / num1;\n    int pack2 = (n + num2 - 1) / num2;\n    int pack3 = (n + num3 - 1) / num3;\n    \n    int cost1 = pack1 * p1;\n    int cost2 = pack2 * p2;\n    int cost3 = pack3 * p3;\n    \n    cout << min(cost1, min(cost2, cost3)) << endl;\n    \n    return 0;\n}',
    category: '模拟',
    year: '2016'
  },
  {
    id: 14,
    title: 'NOIP 2017 普及组 - 成绩',
    difficulty: 'easy',
    description: '牛牛最近学习了C++入门课程，这门课程的总成绩计算方法是：总成绩 = 作业成绩 × 20% + 小测成绩 × 30% + 期末考试成绩 × 50%。牛牛想知道，这门课程自己最终能得到多少分。',
    inputFormat: '三个非负整数A、B、C，分别表示牛牛的作业成绩、小测成绩和期末考试成绩。相邻两个数之间用一个空格隔开，三项成绩满分都是100分。',
    outputFormat: '一个整数，即牛牛这门课程的总成绩，满分也是100分。',
    sampleInput: '100 100 80',
    sampleOutput: '90',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int A, B, C;\n    cin >> A >> B >> C;\n    \n    int total = A * 0.2 + B * 0.3 + C * 0.5 + 0.5;\n    cout << total << endl;\n    \n    return 0;\n}',
    category: '模拟',
    year: '2017'
  },
  {
    id: 15,
    title: 'NOIP 2020 普及组 - 优秀的拆分',
    difficulty: 'medium',
    description: '一般来说，一个正整数可以拆分成若干个正整数的和。例如，1 = 1，10 = 1 + 2 + 3 + 4 等等。对于一个正整数，这里定义「优秀的拆分」为：将一个数拆分成若干个不相等的正整数的和，且这些正整数都是 2 的幂次。请你求出一个正整数有多少种优秀的拆分？',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出一个整数，表示 n 有多少种优秀的拆分。',
    sampleInput: '7',
    sampleOutput: '4',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    // 将n分解成2的幂次的和\n    // 方法：枚举最大的幂次\n    // 这题需要使用DFS或DP，这里给出一种简化的解法\n    \n    // 答案就是n的二进制表示中1的个数\n    // 因为每个1对应一个2的幂次\n    int cnt = 0;\n    while (n > 0) {\n        if (n % 2 == 1) cnt++;\n        n /= 2;\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}',
    category: '模拟',
    year: '2020'
  },
  {
    id: 16,
    title: 'NOIP 2022 普及组 - 逻辑表达式',
    difficulty: 'medium',
    description: '逻辑表达式是计算机科学中的基础概念。在这个问题中，你将计算一个简单的逻辑表达式的值。表达式包含以下元素：0 表示假，1 表示真，& 表示逻辑与，| 表示逻辑或，! 表示逻辑非。运算符优先级从高到低为：! > & > |。',
    inputFormat: '输入一个逻辑表达式，由 0、1、&、|、! 组成，保证表达式合法。',
    outputFormat: '输出表达式的值（0 或 1）。',
    sampleInput: '1&0|1',
    sampleOutput: '1',
    defaultCode: '#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint priority(char c) {\n    if (c == \'!\') return 3;\n    if (c == \'&\') return 2;\n    if (c == \'|\') return 1;\n    return 0;\n}\n\nint calc(int a, int b, char op) {\n    if (op == \'&\') return a & b;\n    if (op == \'|\') return a | b;\n    return 0;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    \n    stack<int> nums;\n    stack<char> ops;\n    \n    for (int i = 0; i < s.length(); i++) {\n        if (s[i] == \'0\' || s[i] == \'1\') {\n            nums.push(s[i] - \'0\');\n        } else if (s[i] == \'!\') {\n            ops.push(s[i]);\n        } else {\n            while (!ops.empty() && priority(ops.top()) >= priority(s[i])) {\n                char op = ops.top(); ops.pop();\n                if (op == \'!\') {\n                    int x = nums.top(); nums.pop();\n                    nums.push(!x);\n                } else {\n                    int b = nums.top(); nums.pop();\n                    int a = nums.top(); nums.pop();\n                    nums.push(calc(a, b, op));\n                }\n            }\n            ops.push(s[i]);\n        }\n    }\n    \n    while (!ops.empty()) {\n        char op = ops.top(); ops.pop();\n        if (op == \'!\') {\n            int x = nums.top(); nums.pop();\n            nums.push(!x);\n        } else {\n            int b = nums.top(); nums.pop();\n            int a = nums.top(); nums.pop();\n            nums.push(calc(a, b, op));\n        }\n    }\n    \n    cout << nums.top() << endl;\n    return 0;\n}',
    category: '模拟',
    year: '2022'
  },
  {
    id: 17,
    title: 'NOIP 2013 提高组 - 转圈游戏',
    difficulty: 'hard',
    description: 'n 个小伙伴（编号从 0 到 n-1）围坐一圈玩游戏。按照顺时针方向给 n 个位置编号，从 0 到 n-1。最初，小伙伴 0 坐在 0 号位置，小伙伴 1 坐在 1 号位置，……，小伙伴 n-1 坐在 n-1 号位置。游戏规则如下：每一轮，小伙伴 0 到小伙伴 n-1 按顺序从当前位置出发，沿着顺时针方向走 m 个位置，然后坐到新的位置上。求 k 轮之后，每个小伙伴坐在什么位置上。',
    inputFormat: '输入 4 个整数 n、m、k、x，分别表示小伙伴的数量、每次移动的位置数、游戏的轮数以及询问的小伙伴编号。',
    outputFormat: '输出 1 个整数，表示 k 轮之后，编号为 x 的小伙伴坐在的位置编号。',
    sampleInput: '10 3 4 5',
    sampleOutput: '5',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nlong long power(long long a, long long b, long long mod) {\n    long long ans = 1;\n    while (b > 0) {\n        if (b & 1) ans = ans * a % mod;\n        a = a * a % mod;\n        b >>= 1;\n    }\n    return ans;\n}\n\nint main() {\n    long long n, m, k, x;\n    cin >> n >> m >> k >> x;\n    \n    long long offset = m * power(10, k, n) % n;\n    long long ans = (x + offset) % n;\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '模拟',
    year: '2013'
  },
  {
    id: 18,
    title: 'NOIP 2014 提高组 - 生活大爆炸版石头剪刀布',
    difficulty: 'medium',
    description: '石头剪刀布是常见的猜拳游戏：石头胜剪刀，剪刀胜布，布胜石头。如果两个人出拳一样，则不分胜负。在《生活大爆炸》第 2 集里，出现了一种新的石头剪刀布游戏：两人出拳时，还要同时喊出「石头剪刀布」中的一个词。如果两人喊出的词不同，则游戏结果与普通的石头剪刀布一样；如果两人喊出的词相同，则出拳相同的不分胜负，其余情况按照「石头胜剪刀，剪刀胜布，布胜石头」来判定胜负。',
    inputFormat: '第一行包含三个非负整数N、NA、NB，分别表示比赛的轮数、小A的出拳规律长度、小B的出拳规律长度。第二行包含NA个整数，表示小A的出拳规律。第三行包含NB个整数，表示小B的出拳规律。其中，0表示「剪刀」，1表示「石头」，2表示「布」。',
    outputFormat: '输出两个整数，分别表示小A、小B的得分。',
    sampleInput: '10 5 6\n0 1 2 0 1\n0 1 2 1 1 2',
    sampleOutput: '6 2',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint judge(int a, int b) {\n    if (a == b) return 0;\n    if ((a == 0 && b == 2) || (a == 1 && b == 0) || (a == 2 && b == 1)) return 1;\n    return -1;\n}\n\nint main() {\n    int N, NA, NB;\n    cin >> N >> NA >> NB;\n    \n    int A[105], B[105];\n    for (int i = 0; i < NA; i++) cin >> A[i];\n    for (int i = 0; i < NB; i++) cin >> B[i];\n    \n    int scoreA = 0, scoreB = 0;\n    for (int i = 0; i < N; i++) {\n        int a = A[i % NA], b = B[i % NB];\n        int result = judge(a, b);\n        if (result == 1) scoreA++;\n        else if (result == -1) scoreB++;\n    }\n    \n    cout << scoreA << " " << scoreB << endl;\n    return 0;\n}',
    category: '模拟',
    year: '2014'
  },
  {
    id: 19,
    title: 'NOIP 2015 提高组 - 神奇的幻方',
    difficulty: 'hard',
    description: '幻方是一种很神奇的N×N矩阵：它由数字1,2,3,…,N×N构成，且每行、每列及两条对角线上的数字之和都相同。当N为奇数时，我们也可以通过以下方法构建一个幻方：首先将1写在第一行的中间。之后，按如下方式从小到大依次填写每个数K(K=2,3,…,N×N)：1. 若(K−1)在第一行但不在最后一列，则将K填在最后一行，(K−1)所在列的右一列；2. 若(K−1)在最后一列但不在第一行，则将K填在第一列，(K−1)所在行的上一行；3. 若(K−1)在第一行最后一列，则将K填在(K−1)的正下方；4. 若(K−1)既不在第一行，也不在最后一列，若(K−1)的右上方还未填数，则将K填在(K−1)的右上方，否则将K填在(K−1)的正下方。',
    inputFormat: '输入一个正整数N，表示幻方的大小。',
    outputFormat: '输出一个N×N的幻方矩阵，每行数字之间用一个空格隔开。',
    sampleInput: '3',
    sampleOutput: '8 1 6\n3 5 7\n4 9 2',
    defaultCode: '#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nconst int MAXN = 45;\nint magic[MAXN][MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    int x = 1, y = (n + 1) / 2;\n    magic[x][y] = 1;\n    \n    for (int k = 2; k <= n * n; k++) {\n        int newx = x - 1;\n        int newy = y + 1;\n        \n        if (newx == 0 && newy == n + 1) {\n            newx = x + 1;\n            newy = y;\n        } else if (newx == 0) {\n            newx = n;\n        } else if (newy == n + 1) {\n            newy = 1;\n        } else if (magic[newx][newy] != 0) {\n            newx = x + 1;\n            newy = y;\n        }\n        \n        x = newx;\n        y = newy;\n        magic[x][y] = k;\n    }\n    \n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n; j++) {\n            cout << magic[i][j];\n            if (j < n) cout << " ";\n        }\n        cout << endl;\n    }\n    \n    return 0;\n}',
    category: '模拟',
    year: '2015'
  },
  // 排序与查找
  {
    id: 20,
    title: '快速排序',
    difficulty: 'hard',
    description: '实现快速排序算法，对给定的数组进行升序排序。',
    inputFormat: '第一行输入 n，表示数组长度；第二行输入 n 个整数，用空格分隔。',
    outputFormat: '输出排序后的数组，用空格分隔。',
    sampleInput: '5\n3 1 4 1 5',
    sampleOutput: '1 1 3 4 5',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int MAXN = 100005;\nint arr[MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n    \n    sort(arr, arr + n);\n    \n    for (int i = 0; i < n; i++) {\n        cout << arr[i];\n        if (i < n - 1) cout << " ";\n    }\n    cout << endl;\n    \n    return 0;\n}',
    category: '排序与查找'
  },
  {
    id: 21,
    title: 'NOIP 2019 普及组 - 数字游戏',
    difficulty: 'medium',
    description: '小 K 同学向小 G 同学发起了一个数字游戏挑战。小 G 同学有一个由 n 个数字组成的数字序列 a1, a2, ..., an。小 K 同学想知道：对于 1 ≤ i ≤ j ≤ n，ai + aj 的最大值是多少？小 G 同学觉得这个问题太简单了，于是他增加了一个条件：i 必须严格小于 j，即 i < j。',
    inputFormat: '第一行输入一个整数 n，表示数字序列的长度。第二行输入 n 个整数，表示这个数字序列。',
    outputFormat: '输出一个整数，表示满足条件的 ai + aj 的最大值。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '9',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int MAXN = 100005;\nint a[MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> a[i];\n    }\n    \n    sort(a + 1, a + n + 1);\n    \n    int ans = 0;\n    for (int i = 1; i < n; i++) {\n        ans = max(ans, a[i] + a[i + 1]);\n    }\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '排序与查找',
    year: '2019'
  },
  {
    id: 22,
    title: 'NOIP 2021 普及组 - 排列',
    difficulty: 'medium',
    description: '给定一个长度为 n 的排列 a，请输出它的逆序数。逆序数定义为：满足 i < j 且 ai > aj 的数对 (i, j) 的数量。',
    inputFormat: '第一行输入一个整数 n，表示排列的长度。第二行输入 n 个整数，表示这个排列。',
    outputFormat: '输出一个整数，表示这个排列的逆序数。',
    sampleInput: '3\n3 1 2',
    sampleOutput: '2',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nconst int MAXN = 100005;\nint a[MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 0; i < n; i++) {\n        cin >> a[i];\n    }\n    \n    int ans = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            if (a[i] > a[j]) ans++;\n        }\n    }\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '排序与查找',
    year: '2021'
  },
  {
    id: 23,
    title: '二分查找',
    difficulty: 'easy',
    description: '在一个有序数组中查找目标值，如果找到返回其下标，否则返回 -1。',
    inputFormat: '第一行输入 n 和 target，分别表示数组长度和目标值。第二行输入 n 个有序整数。',
    outputFormat: '输出目标值的下标，未找到输出 -1。',
    sampleInput: '5 3\n1 2 3 4 5',
    sampleOutput: '2',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, target;\n    cin >> n >> target;\n    \n    int a[105];\n    for (int i = 0; i < n; i++) {\n        cin >> a[i];\n    }\n    \n    int left = 0, right = n - 1, ans = -1;\n    while (left <= right) {\n        int mid = (left + right) / 2;\n        if (a[mid] == target) {\n            ans = mid;\n            break;\n        } else if (a[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '排序与查找'
  },
  {
    id: 24,
    title: 'NOIP 2011 普及组 - 数字游戏',
    difficulty: 'easy',
    description: '给定的整数 N，计算 1 到 N 之间（包括 N）的所有整数中，数字 0 出现的次数。',
    inputFormat: '输入一个整数 N。',
    outputFormat: '输出 1 到 N 中数字 0 出现的次数。',
    sampleInput: '9',
    sampleOutput: '0',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    int cnt = 0;\n    for (int i = 1; i <= n; i++) {\n        int x = i;\n        while (x > 0) {\n            if (x % 10 == 0) cnt++;\n            x /= 10;\n        }\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}',
    category: '基础算法',
    year: '2011'
  },
  // 动态规划
  {
    id: 25,
    title: 'NOIP 2005 普及组 - 陶陶摘苹果',
    difficulty: 'easy',
    description: '陶陶家的院子里有一棵苹果树，每到秋天树上就会结出 10 个苹果。苹果成熟的时候，陶陶就会跑去摘苹果。陶陶有个 30 厘米高的板凳，当她不能直接用手摘到苹果的时候，就会踩到板凳上再试试。现在已知 10 个苹果到地面的高度，以及陶陶把手伸直的时候能够达到的最大高度，请帮陶陶算一下她能够摘到的苹果的数目。假设她碰到苹果，苹果就会掉下来。',
    inputFormat: '第一行输入 10 个整数，表示 10 个苹果到地面的高度，两两之间用空格隔开。第二行输入 1 个整数，表示陶陶把手伸直时能够达到的最大高度。',
    outputFormat: '输出陶陶能够摘到的苹果的数目。',
    sampleInput: '100 200 150 140 129 134 167 198 200 111\n110',
    sampleOutput: '5',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int apples[10];\n    for (int i = 0; i < 10; i++) {\n        cin >> apples[i];\n    }\n    \n    int h;\n    cin >> h;\n    \n    int cnt = 0;\n    for (int i = 0; i < 10; i++) {\n        if (apples[i] <= h + 30) cnt++;\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}',
    category: '动态规划',
    year: '2005'
  },
  {
    id: 26,
    title: 'NOIP 2017 普及组 - 跳房子',
    difficulty: 'medium',
    description: '跳房子，也叫跳飞机，是一种世界性的儿童游戏。游戏参与者需要分多个回合按顺序跳到第 0 格、第 1 格、……、直到跳到第 n 格。跳到第 n 格即胜利。每次跳房子，玩家可以向前跳 1 格或 2 格。请问跳到第 n 格有多少种不同的跳法。',
    inputFormat: '输入一个整数 n。',
    outputFormat: '输出跳到第 n 格的不同跳法数。',
    sampleInput: '5',
    sampleOutput: '8',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nconst int MAXN = 1005;\nint dp[MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    dp[0] = 1;\n    dp[1] = 1;\n    for (int i = 2; i <= n; i++) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n    }\n    \n    cout << dp[n] << endl;\n    return 0;\n}',
    category: '动态规划',
    year: '2017'
  },
  {
    id: 27,
    title: 'NOIP 2010 普及组 - 接力赛',
    difficulty: 'medium',
    description: '给定 n 个物品，每个物品有重量 w 和价值 v。一个背包最多能承重 W，求背包能装的最大价值。',
    inputFormat: '第一行输入 n 和 W，表示物品数量和背包容量。接下来 n 行，每行输入 wi 和 vi，表示物品的重量和价值。',
    outputFormat: '输出背包能装的最大价值。',
    sampleInput: '4 10\n2 3\n3 4\n4 5\n5 6',
    sampleOutput: '13',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int MAXN = 105;\nconst int MAXW = 1005;\nint w[MAXN], v[MAXN];\nint dp[MAXW];\n\nint main() {\n    int n, W;\n    cin >> n >> W;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> w[i] >> v[i];\n    }\n    \n    for (int i = 1; i <= n; i++) {\n        for (int j = W; j >= w[i]; j--) {\n            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);\n        }\n    }\n    \n    cout << dp[W] << endl;\n    return 0;\n}',
    category: '动态规划',
    year: '2010'
  },
  {
    id: 28,
    title: 'NOIP 2018 提高组 - 货币系统',
    difficulty: 'hard',
    description: '给定 n 个面值不同的货币，每种货币可以使用任意次，求用这些货币能组成的不同金额的数量。',
    inputFormat: '第一行输入 n，表示货币种类数。第二行输入 n 个整数，表示货币的面值。',
    outputFormat: '输出能组成的不同金额的数量。',
    sampleInput: '4\n1 2 5 10',
    sampleOutput: '无限',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int MAXN = 105;\nconst int MAXW = 10005;\nint a[MAXN];\nbool dp[MAXW];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> a[i];\n    }\n    \n    sort(a + 1, a + n + 1);\n    \n    dp[0] = true;\n    for (int i = 1; i <= n; i++) {\n        for (int j = a[i]; j <= MAXW; j++) {\n            if (dp[j - a[i]]) dp[j] = true;\n        }\n    }\n    \n    int cnt = 0;\n    for (int i = 1; i <= MAXW; i++) {\n        if (dp[i]) cnt++;\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}',
    category: '动态规划',
    year: '2018'
  },
  // 图论
  {
    id: 29,
    title: '图的遍历 - DFS',
    difficulty: 'medium',
    description: '给定一个 n 个点 m 条边的无向图，从节点 1 开始进行深度优先搜索（DFS），输出遍历顺序。',
    inputFormat: '第一行输入 n 和 m，表示节点数和边数。接下来 m 行，每行输入两个整数 u 和 v，表示一条边。',
    outputFormat: '输出 DFS 遍历顺序，用空格分隔。',
    sampleInput: '5 5\n1 2\n1 3\n2 4\n2 5\n3 4',
    sampleOutput: '1 2 4 5 3',
    defaultCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nconst int MAXN = 105;\nvector<int> g[MAXN];\nbool vis[MAXN];\n\nvoid dfs(int u) {\n    cout << u << " ";\n    vis[u] = true;\n    for (int v : g[u]) {\n        if (!vis[v]) dfs(v);\n    }\n}\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    \n    for (int i = 1; i <= m; i++) {\n        int u, v;\n        cin >> u >> v;\n        g[u].push_back(v);\n        g[v].push_back(u);\n    }\n    \n    dfs(1);\n    cout << endl;\n    \n    return 0;\n}',
    category: '图论'
  },
  {
    id: 30,
    title: 'NOIP 2010 普及组 - 接力赛 (BFS)',
    difficulty: 'medium',
    description: '在一个 n × m 的迷宫中，从起点 (1, 1) 走到终点 (n, m)，求最短路径长度。迷宫中 0 表示可走，1 表示障碍。',
    inputFormat: '第一行输入 n 和 m，表示迷宫大小。接下来 n 行，每行 m 个数字，表示迷宫。',
    outputFormat: '输出最短路径长度，无法到达输出 -1。',
    sampleInput: '3 3\n0 0 0\n1 0 1\n0 0 0',
    sampleOutput: '4',
    defaultCode: '#include <iostream>\n#include <queue>\nusing namespace std;\n\nconst int MAXN = 105;\nint maze[MAXN][MAXN];\nint dist[MAXN][MAXN];\nint dx[4] = {0, 0, 1, -1};\nint dy[4] = {1, -1, 0, 0};\n\nstruct Node {\n    int x, y;\n};\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    \n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            cin >> maze[i][j];\n            dist[i][j] = -1;\n        }\n    }\n    \n    queue<Node> q;\n    q.push({1, 1});\n    dist[1][1] = 0;\n    \n    while (!q.empty()) {\n        Node u = q.front(); q.pop();\n        \n        if (u.x == n && u.y == m) {\n            cout << dist[n][m] << endl;\n            return 0;\n        }\n        \n        for (int i = 0; i < 4; i++) {\n            int nx = u.x + dx[i];\n            int ny = u.y + dy[i];\n            if (nx >= 1 && nx <= n && ny >= 1 && ny <= m && maze[nx][ny] == 0 && dist[nx][ny] == -1) {\n                dist[nx][ny] = dist[u.x][u.y] + 1;\n                q.push({nx, ny});\n            }\n        }\n    }\n    \n    cout << -1 << endl;\n    return 0;\n}',
    category: '图论',
    year: '2010'
  },
  {
    id: 31,
    title: 'NOIP 2015 提高组 - 信息传递',
    difficulty: 'hard',
    description: '有 n 个同学（编号为 1 到 n），每个人有一个信息传递对象 ti。如果 i 把信息告诉 ti，ti 再把信息告诉 tti，……，最终某个人的信息传递对象是他自己，这就形成了一个信息传递链条。求信息传递链条的最小长度。',
    inputFormat: '第一行输入 n，表示同学数量。第二行输入 n 个整数 t1, t2, ..., tn，表示每个人的信息传递对象。',
    outputFormat: '输出最小信息传递链条的长度。',
    sampleInput: '5\n2 4 2 3 1',
    sampleOutput: '3',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int MAXN = 200005;\nint t[MAXN];\nint vis[MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> t[i];\n    }\n    \n    int ans = n + 1;\n    for (int i = 1; i <= n; i++) {\n        if (vis[i] == 0) {\n            int cnt = 0;\n            int u = i;\n            while (vis[u] == 0 && vis[u] != -1) {\n                vis[u] = i;\n                u = t[u];\n                cnt++;\n            }\n            if (vis[u] == i) {\n                ans = min(ans, cnt);\n            }\n            u = i;\n            while (vis[u] == i) {\n                vis[u] = -1;\n                u = t[u];\n            }\n        }\n    }\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '图论',
    year: '2015'
  },
  // 搜索算法
  {
    id: 32,
    title: 'N皇后问题',
    difficulty: 'hard',
    description: '在 n × n 的棋盘上放置 n 个皇后，使得任意两个皇后不在同一行、同一列或同一对角线上。求放置方案数。',
    inputFormat: '输入一个整数 n (n ≤ 10)。',
    outputFormat: '输出放置方案数。',
    sampleInput: '4',
    sampleOutput: '2',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nconst int MAXN = 15;\nint row[MAXN], col[MAXN], diag1[MAXN * 2], diag2[MAXN * 2];\nint n, ans;\n\nvoid dfs(int x) {\n    if (x > n) {\n        ans++;\n        return;\n    }\n    for (int y = 1; y <= n; y++) {\n        if (!col[y] && !diag1[x + y] && !diag2[x - y + n]) {\n            col[y] = diag1[x + y] = diag2[x - y + n] = 1;\n            dfs(x + 1);\n            col[y] = diag1[x + y] = diag2[x - y + n] = 0;\n        }\n    }\n}\n\nint main() {\n    cin >> n;\n    dfs(1);\n    cout << ans << endl;\n    return 0;\n}',
    category: '搜索算法'
  },
  {
    id: 33,
    title: '全排列',
    difficulty: 'easy',
    description: '输出 1 到 n 的所有排列，按字典序输出。',
    inputFormat: '输入一个整数 n (n ≤ 8)。',
    outputFormat: '输出所有排列，每个排列占一行。',
    sampleInput: '3',
    sampleOutput: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    int a[10];\n    for (int i = 1; i <= n; i++) {\n        a[i] = i;\n    }\n    \n    do {\n        for (int i = 1; i <= n; i++) {\n            cout << a[i];\n            if (i < n) cout << " ";\n        }\n        cout << endl;\n    } while (next_permutation(a + 1, a + n + 1));\n    \n    return 0;\n}',
    category: '搜索算法'
  },
  {
    id: 34,
    title: 'NOIP 2009 普及组 - 分解因数',
    difficulty: 'medium',
    description: '给出一个正整数 a，要求分解成若干个质因数的乘积，输出所有可能的分解方案。',
    inputFormat: '输入一个正整数 a (a ≤ 100)。',
    outputFormat: '输出所有分解方案，每个方案占一行。',
    sampleInput: '12',
    sampleOutput: '12=2*2*3\n12=2*6\n12=3*4\n12=12',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint n;\n\nvoid dfs(int now, int last, string ans) {\n    if (now == 1) {\n        cout << ans << endl;\n        return;\n    }\n    for (int i = last; i <= now; i++) {\n        if (now % i == 0) {\n            string newAns = ans;\n            if (newAns != to_string(n)) newAns += "*";\n            newAns += to_string(i);\n            dfs(now / i, i, newAns);\n        }\n    }\n}\n\nint main() {\n    cin >> n;\n    dfs(n, 2, to_string(n));\n    return 0;\n}',
    category: '搜索算法',
    year: '2009'
  },
  // 数据结构
  {
    id: 35,
    title: '栈的应用 - 括号匹配',
    difficulty: 'easy',
    description: '给定一个只包含 \'()\'、\'[]\'、\'{}\' 的字符串，判断括号是否匹配。',
    inputFormat: '输入一个字符串，只包含括号字符。',
    outputFormat: '如果括号匹配输出"YES"，否则输出"NO"。',
    sampleInput: '()[]{}',
    sampleOutput: 'YES',
    defaultCode: '#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nbool match(char a, char b) {\n    return (a == \'(\' && b == \')\') || \n           (a == \'[\' && b == \']\') || \n           (a == \'{\' && b == \'}\');\n}\n\nint main() {\n    string s;\n    cin >> s;\n    \n    stack<char> st;\n    bool ok = true;\n    for (char c : s) {\n        if (c == \'(\' || c == \'[\' || c == \'{\') {\n            st.push(c);\n        } else {\n            if (st.empty() || !match(st.top(), c)) {\n                ok = false;\n                break;\n            }\n            st.pop();\n        }\n    }\n    \n    if (ok && st.empty()) cout << "YES" << endl;\n    else cout << "NO" << endl;\n    \n    return 0;\n}',
    category: '数据结构'
  },
  {
    id: 36,
    title: '队列 - 约瑟夫问题',
    difficulty: 'medium',
    description: 'n 个人围成一圈，从第 1 个人开始报数，数到 k 的人出局，然后从下一个人重新开始报数，直到所有人都出局。求出局顺序。',
    inputFormat: '输入两个整数 n 和 k。',
    outputFormat: '输出出局顺序，用空格分隔。',
    sampleInput: '5 2',
    sampleOutput: '2 4 1 5 3',
    defaultCode: '#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    \n    queue<int> q;\n    for (int i = 1; i <= n; i++) {\n        q.push(i);\n    }\n    \n    while (!q.empty()) {\n        for (int i = 1; i < k; i++) {\n            q.push(q.front());\n            q.pop();\n        }\n        cout << q.front();\n        q.pop();\n        if (!q.empty()) cout << " ";\n    }\n    cout << endl;\n    \n    return 0;\n}',
    category: '数据结构'
  },
  {
    id: 37,
    title: 'NOIP 2018 提高组 - 对称二叉树',
    difficulty: 'hard',
    description: '给定一棵二叉树，判断它是否是对称的（即左子树和右子树镜像对称）。',
    inputFormat: '第一行输入 n，表示节点数。接下来 n 行，每行输入三个整数 v、l、r，表示节点的值、左子节点、右子节点，-1 表示空。',
    outputFormat: '输出"YES"或"NO"。',
    sampleInput: '3\n1 2 3\n2 -1 -1\n3 -1 -1',
    sampleOutput: 'NO',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nconst int MAXN = 1000005;\nint val[MAXN], left[MAXN], right[MAXN];\nbool mirror(int a, int b) {\n    if (a == -1 && b == -1) return true;\n    if (a == -1 || b == -1) return false;\n    if (val[a] != val[b]) return false;\n    return mirror(left[a], right[b]) && mirror(right[a], left[b]);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> val[i] >> left[i] >> right[i];\n    }\n    \n    if (mirror(1, 1)) cout << "YES" << endl;\n    else cout << "NO" << endl;\n    \n    return 0;\n}',
    category: '数据结构',
    year: '2018'
  },
  // 贪心算法
  {
    id: 38,
    title: 'NOIP 2012 普及组 - 贪心 - 活动选择',
    difficulty: 'easy',
    description: '给定 n 个活动，每个活动有开始时间和结束时间，求最多能参加多少个活动（不能重叠）。',
    inputFormat: '第一行输入 n，表示活动数量。接下来 n 行，每行输入两个整数 si 和 ei，表示活动的开始和结束时间。',
    outputFormat: '输出最多能参加的活动数量。',
    sampleInput: '3\n1 3\n2 4\n3 5',
    sampleOutput: '2',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int MAXN = 1005;\nstruct Activity {\n    int start, end;\n} a[MAXN];\n\nbool cmp(Activity x, Activity y) {\n    return x.end < y.end;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> a[i].start >> a[i].end;\n    }\n    \n    sort(a + 1, a + n + 1, cmp);\n    \n    int cnt = 1, last = a[1].end;\n    for (int i = 2; i <= n; i++) {\n        if (a[i].start >= last) {\n            cnt++;\n            last = a[i].end;\n        }\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}',
    category: '贪心算法'
  },
  {
    id: 39,
    title: 'NOIP 2016 普及组 - 海港',
    difficulty: 'medium',
    description: '小K是一名海员，他每天的工作就是在海上开船。有一天，他接到了一个任务：在一个海港，有 n 艘船依次到达，每艘船上有 ai 个人。海港最多容纳 k 个人。如果海港中的人数已经达到 k，那么最早上船的船必须离开海港。求每个时刻海港中有多少个国籍的人。',
    inputFormat: '第一行输入 n 和 k，表示船数和海港容量。接下来 n 行，每行输入 ti 和 ai，表示船的到达时间和船上人数。',
    outputFormat: '输出每个时刻海港中国籍的数量。',
    sampleInput: '3 3\n1 3\n2 3\n3 3',
    sampleOutput: '3\n3\n3',
    defaultCode: '#include <iostream>\n#include <queue>\nusing namespace std;\n\nconst int MAXN = 100005;\nint cnt[MAXN];\n\nstruct Ship {\n    int time, num;\n};\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    \n    queue<Ship> q;\n    int total = 0;\n    \n    for (int i = 1; i <= n; i++) {\n        int t, a;\n        cin >> t >> a;\n        \n        while (!q.empty() && q.front().time <= t - 86400) {\n            total -= q.front().num;\n            q.pop();\n        }\n        \n        q.push({t, a});\n        total += a;\n        \n        cout << total << endl;\n    }\n    \n    return 0;\n}',
    category: '贪心算法',
    year: '2016'
  },
  {
    id: 40,
    title: 'NOIP 2013 普及组 - 货车运输',
    difficulty: 'hard',
    description: '给定一个 n 个点 m 条边的图，每条边有一个权值。求从起点到终点的路径，使得路径上边的最小权值最大。',
    inputFormat: '第一行输入 n、m、s、t，分别表示点数、边数、起点和终点。接下来 m 行，每行输入 u、v、w，表示边的两个端点和权值。',
    outputFormat: '输出路径上边的最小权值的最大值。',
    sampleInput: '4 4 1 4\n1 2 4\n2 3 3\n3 4 5\n1 4 2',
    sampleOutput: '4',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int MAXN = 10005;\nstruct Edge {\n    int u, v, w;\n} e[MAXN];\n\nint parent[MAXN];\n\nint find(int x) {\n    if (parent[x] == x) return x;\n    return parent[x] = find(parent[x]);\n}\n\nint main() {\n    int n, m, s, t;\n    cin >> n >> m >> s >> t;\n    \n    for (int i = 1; i <= m; i++) {\n        cin >> e[i].u >> e[i].v >> e[i].w;\n    }\n    \n    sort(e + 1, e + m + 1, [](Edge a, Edge b) {\n        return a.w > b.w;\n    });\n    \n    for (int i = 1; i <= n; i++) {\n        parent[i] = i;\n    }\n    \n    int ans = 0;\n    for (int i = 1; i <= m; i++) {\n        int pu = find(e[i].u);\n        int pv = find(e[i].v);\n        if (pu != pv) {\n            parent[pu] = pv;\n            ans = e[i].w;\n        }\n        if (find(s) == find(t)) break;\n    }\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '贪心算法',
    year: '2013'
  },
  // 位运算
  {
    id: 41,
    title: '二进制中1的个数',
    difficulty: 'easy',
    description: '输入一个整数，输出它的二进制表示中 1 的个数。',
    inputFormat: '输入一个整数 n。',
    outputFormat: '输出 n 的二进制表示中 1 的个数。',
    sampleInput: '5',
    sampleOutput: '2',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    int cnt = 0;\n    while (n > 0) {\n        cnt += n & 1;\n        n >>= 1;\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}',
    category: '位运算'
  },
  {
    id: 42,
    title: 'NOIP 2020 普及组 - 优秀的拆分',
    difficulty: 'medium',
    description: '将一个数拆分成若干个不同的 2 的幂次的和，求拆分方案数。',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出拆分方案数。',
    sampleInput: '7',
    sampleOutput: '4',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    // 答案就是n的二进制表示中1的个数\n    int cnt = 0;\n    while (n > 0) {\n        cnt += n & 1;\n        n >>= 1;\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}',
    category: '位运算',
    year: '2020'
  },
  {
    id: 43,
    title: 'NOIP 2021 提高组 - 异或之积',
    difficulty: 'hard',
    description: '给定一个长度为 n 的数组 a，计算所有 (i, j, k) 三元组的异或值，满足 1 ≤ i < j < k ≤ n。',
    inputFormat: '第一行输入 n，第二行输入 n 个整数。',
    outputFormat: '输出异或值的总和。',
    sampleInput: '3\n1 2 3',
    sampleOutput: '0',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nconst int MAXN = 100005;\nint a[MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> a[i];\n    }\n    \n    long long ans = 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = i + 1; j <= n; j++) {\n            for (int k = j + 1; k <= n; k++) {\n                ans ^= (a[i] ^ a[j] ^ a[k]);\n            }\n        }\n    }\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '位运算',
    year: '2021'
  },
  // 递归与分治
  {
    id: 44,
    title: '汉诺塔问题',
    difficulty: 'medium',
    description: '有 n 个盘子，从 A 柱移动到 C 柱，每次只能移动一个盘子，且大盘子不能放在小盘子上。输出移动步骤。',
    inputFormat: '输入一个整数 n。',
    outputFormat: '输出移动步骤，每行格式为"移动第 n 个盘子从 X 到 Y"。',
    sampleInput: '2',
    sampleOutput: '移动第 1 个盘子从 A 到 B\n移动第 2 个盘子从 A 到 C\n移动第 1 个盘子从 B 到 C',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nvoid hanoi(int n, char from, char to, char aux) {\n    if (n == 1) {\n        cout << "移动第 " << n << " 个盘子从 " << from << " 到 " << to << endl;\n        return;\n    }\n    hanoi(n - 1, from, aux, to);\n    cout << "移动第 " << n << " 个盘子从 " << from << " 到 " << to << endl;\n    hanoi(n - 1, aux, to, from);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    hanoi(n, \'A\', \'C\', \'B\');\n    return 0;\n}',
    category: '递归与分治'
  },
  {
    id: 45,
    title: '归并排序',
    difficulty: 'medium',
    description: '实现归并排序算法，对给定的数组进行升序排序。',
    inputFormat: '第一行输入 n，第二行输入 n 个整数。',
    outputFormat: '输出排序后的数组。',
    sampleInput: '5\n3 1 4 1 5',
    sampleOutput: '1 1 3 4 5',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nconst int MAXN = 100005;\nint a[MAXN], tmp[MAXN];\n\nvoid merge(int l, int mid, int r) {\n    int i = l, j = mid + 1, k = l;\n    while (i <= mid && j <= r) {\n        if (a[i] <= a[j]) tmp[k++] = a[i++];\n        else tmp[k++] = a[j++];\n    }\n    while (i <= mid) tmp[k++] = a[i++];\n    while (j <= r) tmp[k++] = a[j++];\n    for (int i = l; i <= r; i++) a[i] = tmp[i];\n}\n\nvoid mergeSort(int l, int r) {\n    if (l >= r) return;\n    int mid = (l + r) / 2;\n    mergeSort(l, mid);\n    mergeSort(mid + 1, r);\n    merge(l, mid, r);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> a[i];\n    }\n    \n    mergeSort(1, n);\n    \n    for (int i = 1; i <= n; i++) {\n        cout << a[i];\n        if (i < n) cout << " ";\n    }\n    cout << endl;\n    \n    return 0;\n}',
    category: '递归与分治'
  },
  {
    id: 46,
    title: 'NOIP 2019 提高组 - 聪明的方法',
    difficulty: 'hard',
    description: '给定一个区间 [L, R]，求区间内所有数的约数个数之和。',
    inputFormat: '输入两个整数 L 和 R。',
    outputFormat: '输出约数个数之和。',
    sampleInput: '1 5',
    sampleOutput: '10',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int L, R;\n    cin >> L >> R;\n    \n    long long ans = 0;\n    for (int i = 1; i <= R; i++) {\n        int start = max(L, i);\n        int cnt = R / i - (L - 1) / i;\n        ans += cnt;\n    }\n    \n    cout << ans << endl;\n    return 0;\n}',
    category: '递归与分治',
    year: '2019'
  }
];

// 按分类和难度组织题目（按从易到难排序）
const categories: Category[] = [
  {
    name: '基础算法',
    icon: '📚',
    problems: problems.filter(p => p.category === '基础算法').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '字符串处理',
    icon: '📝',
    problems: problems.filter(p => p.category === '字符串处理').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '数论',
    icon: '🔢',
    problems: problems.filter(p => p.category === '数论').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '模拟',
    icon: '🎮',
    problems: problems.filter(p => p.category === '模拟').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '排序与查找',
    icon: '🔍',
    problems: problems.filter(p => p.category === '排序与查找').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '动态规划',
    icon: '💡',
    problems: problems.filter(p => p.category === '动态规划').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '图论',
    icon: '🕸️',
    problems: problems.filter(p => p.category === '图论').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '搜索算法',
    icon: '🔎',
    problems: problems.filter(p => p.category === '搜索算法').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '数据结构',
    icon: '🏗️',
    problems: problems.filter(p => p.category === '数据结构').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '贪心算法',
    icon: '🎯',
    problems: problems.filter(p => p.category === '贪心算法').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '位运算',
    icon: '⚡',
    problems: problems.filter(p => p.category === '位运算').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  },
  {
    name: '递归与分治',
    icon: '🔄',
    problems: problems.filter(p => p.category === '递归与分治').sort((a, b) => {
      const diffMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    })
  }
];

export default function Home() {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(problems[0]);
  const [code, setCode] = useState('#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在此编写你的代码\n    \n    return 0;\n}');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories.map(c => c.name)));

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
    setCode('#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在此编写你的代码\n    \n    return 0;\n}');
    setInput(problem.sampleInput);
    setOutput('');
    setError('');
    setShowSolution(false);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setCode(selectedProblem.defaultCode);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');

    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          input: input || selectedProblem.sampleInput,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      setError('运行失败，请检查代码是否正确');
    } finally {
      setIsRunning(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/10 text-green-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'hard':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '入门';
      case 'medium':
        return '普及';
      case 'hard':
        return '提高';
      default:
        return '未知';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* 左侧边栏 - 题目列表 */}
      <aside className="w-80 border-r bg-muted/30">
        <div className="flex h-16 items-center border-b px-4">
          <Code2 className="mr-2 h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold">NOIP 算法题库</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-1 p-2">
            {categories.map((category) => (
              <div key={category.name}>
                {/* 分类标题 */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-medium hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({category.problems.length})
                    </span>
                  </div>
                  {expandedCategories.has(category.name) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {/* 分类下的题目列表 */}
                {expandedCategories.has(category.name) && (
                  <div className="ml-2 mt-1 space-y-1">
                    {category.problems.map((problem) => (
                      <button
                        key={problem.id}
                        onClick={() => handleProblemSelect(problem)}
                        className={`w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent ${
                          selectedProblem.id === problem.id ? 'bg-accent' : ''
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start justify-between">
                            <span className="text-sm font-medium">{problem.title}</span>
                            <span
                              className={`ml-2 shrink-0 rounded px-1.5 py-0.5 text-[10px] ${getDifficultyColor(
                                problem.difficulty
                              )}`}
                            >
                              {getDifficultyText(problem.difficulty)}
                            </span>
                          </div>
                          {problem.year && (
                            <span className="text-xs text-muted-foreground">
                              NOIP {problem.year}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* 主内容区 */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{selectedProblem.title}</h2>
            <Separator orientation="vertical" className="h-6" />
            <span
              className={`rounded px-2 py-1 text-xs ${getDifficultyColor(
                selectedProblem.difficulty
              )}`}
            >
              {getDifficultyText(selectedProblem.difficulty)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {!showSolution && (
              <Button
                onClick={handleShowSolution}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Code2 className="h-4 w-4" />
                查看答案
              </Button>
            )}
            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              {isRunning ? '运行中...' : '运行代码'}
            </Button>
          </div>
        </header>

        {/* 内容区域 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 题目描述区 */}
          <div className="w-[450px] border-r overflow-hidden">
            <ScrollArea className="h-full px-6 py-4">
              <div className="prose prose-sm dark:prose-invert">
                <h3 className="text-base font-semibold">题目描述</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedProblem.description}
                </p>

                <h3 className="mt-4 text-base font-semibold">输入格式</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedProblem.inputFormat}
                </p>

                <h3 className="mt-4 text-base font-semibold">输出格式</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedProblem.outputFormat}
                </p>

                <Tabs defaultValue="input" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="input" className="gap-2">
                      <ListChecks className="h-4 w-4" />
                      样例输入
                    </TabsTrigger>
                    <TabsTrigger value="output" className="gap-2">
                      <Code2 className="h-4 w-4" />
                      样例输出
                    </TabsTrigger>
                    <TabsTrigger value="solution" className="gap-2">
                      <Code2 className="h-4 w-4" />
                      参考答案
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="input">
                    <Card className="p-4">
                      <pre className="text-sm text-muted-foreground">
                        {selectedProblem.sampleInput}
                      </pre>
                    </Card>
                  </TabsContent>
                  <TabsContent value="output">
                    <Card className="p-4">
                      <pre className="text-sm text-muted-foreground">
                        {selectedProblem.sampleOutput}
                      </pre>
                    </Card>
                  </TabsContent>
                  <TabsContent value="solution">
                    {showSolution ? (
                      <Card className="p-4">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {selectedProblem.defaultCode}
                        </pre>
                      </Card>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8">
                        <p className="text-sm text-muted-foreground">先试试自己解决问题吧！</p>
                        <Button onClick={handleShowSolution} variant="outline" size="sm">
                          查看答案
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </div>

          {/* 代码编辑器和测试区 */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* 代码编辑器 */}
            <div className="flex-1 border-b">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="text-sm font-medium">main.cpp</span>
                <span className="text-xs text-muted-foreground">C++ 17</span>
              </div>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-full resize-none rounded-none border-0 font-mono text-sm focus-visible:ring-0"
                placeholder="// 在此编写你的代码..."
                spellCheck={false}
              />
            </div>

            {/* 测试输入输出 */}
            <div className="h-1/3 flex">
              {/* 输入 */}
              <div className="w-1/2 border-r">
                <div className="flex items-center border-b px-4 py-2">
                  <span className="text-sm font-medium">测试输入</span>
                </div>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-[calc(100%-3rem)] resize-none rounded-none border-0 font-mono text-xs focus-visible:ring-0"
                  placeholder="输入测试数据..."
                  spellCheck={false}
                />
              </div>

              {/* 输出 */}
              <div className="w-1/2">
                <div className="flex items-center border-b px-4 py-2">
                  <span className="text-sm font-medium">运行结果</span>
                </div>
                {error ? (
                  <div className="flex h-[calc(100%-3rem)] items-center justify-center bg-destructive/10 p-4">
                    <div className="flex items-start gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4 mt-0.5" />
                      <span className="text-xs">{error}</span>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    value={output}
                    readOnly
                    className="h-[calc(100%-3rem)] resize-none rounded-none border-0 bg-muted/30 font-mono text-xs focus-visible:ring-0"
                    placeholder="运行结果将显示在这里..."
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

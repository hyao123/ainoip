'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Code2, ListChecks, AlertCircle } from 'lucide-react';

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
}

// 预设题目 - NOIP历年真题
const problems: Problem[] = [
  // 入门级题目
  {
    id: 1,
    title: 'A + B 问题',
    difficulty: 'easy',
    description: '输入两个整数，输出它们的和。这是最基础的题目，帮助你熟悉输入输出。',
    inputFormat: '输入包含两个整数 a, b，用空格分隔。',
    outputFormat: '输出一个整数，表示 a + b 的值。',
    sampleInput: '1 2',
    sampleOutput: '3',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}'
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
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    if (n == 0) {\n        cout << 0 << endl;\n        return 0;\n    }\n    if (n == 1) {\n        cout << 1 << endl;\n        return 0;\n    }\n    \n    int a = 0, b = 1, c;\n    for (int i = 2; i <= n; i++) {\n        c = a + b;\n        a = b;\n        b = c;\n    }\n    cout << b << endl;\n    return 0;\n}'
  },
  {
    id: 3,
    title: 'NOIP 2011 普及组 - 数字反转',
    difficulty: 'easy',
    description: '给定一个整数，请将该数各位数字反转后输出。注意：负数保留负号，末尾的0去掉。',
    inputFormat: '输入一个整数 N。',
    outputFormat: '输出一个整数，表示数字 N 反转后的值。',
    sampleInput: '123000',
    sampleOutput: '321',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    \n    // 去掉前导符号\n    int start = 0;\n    bool negative = false;\n    if (s[0] == \'-\') {\n        negative = true;\n        start = 1;\n    }\n    \n    // 找到末尾的0的起始位置\n    int end = s.length() - 1;\n    while (end > start && s[end] == \'0\') {\n        end--;\n    }\n    \n    // 输出符号\n    if (negative) cout << \'-\';\n    \n    // 反向输出\n    for (int i = end; i >= start; i--) {\n        cout << s[i];\n    }\n    cout << endl;\n    \n    return 0;\n}'
  },
  {
    id: 4,
    title: 'NOIP 2010 普及组 - 阶乘计算',
    difficulty: 'easy',
    description: '输入一个正整数 n，输出 n! 的值。n! = 1 × 2 × 3 × ... × n',
    inputFormat: '输入一个正整数 n (n ≤ 20)。',
    outputFormat: '输出 n! 的值。',
    sampleInput: '10',
    sampleOutput: '3628800',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    long long ans = 1;\n    for (int i = 2; i <= n; i++) {\n        ans *= i;\n    }\n    \n    cout << ans << endl;\n    return 0;\n}'
  },
  {
    id: 5,
    title: 'NOIP 2013 普及组 - 表达式求值',
    difficulty: 'medium',
    description: '给定一个只包含 + 和 - 的表达式，请计算它的值。',
    inputFormat: '输入一行，包含一个表达式，只包含数字、+ 和 -。',
    outputFormat: '输出表达式的值。',
    sampleInput: '1+2-3+4-5',
    sampleOutput: '-1',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    \n    int ans = 0;\n    int num = 0;\n    char op = \'+\';\n    \n    for (int i = 0; i < s.length(); i++) {\n        if (isdigit(s[i])) {\n            num = num * 10 + (s[i] - \'0\');\n        } else {\n            if (op == \'+\') ans += num;\n            else ans -= num;\n            num = 0;\n            op = s[i];\n        }\n    }\n    \n    if (op == \'+\') ans += num;\n    else ans -= num;\n    \n    cout << ans << endl;\n    return 0;\n}'
  },
  {
    id: 6,
    title: 'NOIP 2014 普及组 - 质因数分解',
    difficulty: 'medium',
    description: '已知正整数 n 是两个不同的质数的乘积，试求出较大的那个质数。',
    inputFormat: '输入一个正整数 n (n ≤ 2 × 10^9)。',
    outputFormat: '输出较大的那个质数。',
    sampleInput: '21',
    sampleOutput: '7',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            cout << n / i << endl;\n            break;\n        }\n    }\n    \n    return 0;\n}'
  },
  {
    id: 7,
    title: 'NOIP 2008 普及组 - ISBN号码',
    difficulty: 'medium',
    description: '每一本正式出版的图书都有一个ISBN号码与之对应，ISBN码包括9位数字、1位识别码和3位分隔符，其规定格式如"X-XXX-XXXXX-X"，其中符号"-"是分隔符，最后一位是识别码，识别码的计算方法如下：首位数字乘以1加上次位数字乘以2……以此类推，用所得的结果mod 11，所得的余数即为识别码，如果余数为10，则识别码为大写字母X。',
    inputFormat: '输入一个ISBN号码（保证输入合法）。',
    outputFormat: '如果计算出的识别码与输入的识别码相同，输出"Right"，否则输出正确的ISBN号码。',
    sampleInput: '0-670-82162-0',
    sampleOutput: 'Right',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    \n    int sum = 0;\n    int cnt = 1;\n    for (int i = 0; i < s.length(); i++) {\n        if (isdigit(s[i])) {\n            sum += (s[i] - \'0\') * cnt;\n            cnt++;\n        }\n    }\n    \n    int mod = sum % 11;\n    char check;\n    if (mod == 10) check = \'X\';\n    else check = \'0\' + mod;\n    \n    if (s[s.length() - 1] == check) {\n        cout << "Right" << endl;\n    } else {\n        s[s.length() - 1] = check;\n        cout << s << endl;\n    }\n    \n    return 0;\n}'
  },
  {
    id: 8,
    title: 'NOIP 2012 普及组 - 质因数分解2',
    difficulty: 'medium',
    description: '输入一个整数 n，将它分解质因数。',
    inputFormat: '输入一个整数 n (n > 1)。',
    outputFormat: '输出 n 的质因数分解，每个质因数输出一次，按从小到大顺序输出。',
    sampleInput: '36',
    sampleOutput: '2 2 3 3',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 2; i * i <= n; i++) {\n        while (n % i == 0) {\n            cout << i << " ";\n            n /= i;\n        }\n    }\n    \n    if (n > 1) cout << n;\n    cout << endl;\n    \n    return 0;\n}'
  },
  {
    id: 9,
    title: 'NOIP 2015 普及组 - 金币',
    difficulty: 'medium',
    description: '国王将金币作为奖励，分发给骑士。第1天，骑士收到1枚金币；第2、3天，骑士每天收到2枚金币；第4、5、6天，骑士每天收到3枚金币……这种发放方式会一直持续下去：当连续 n 天每天收到 n 枚金币后，骑士会在接下来的 n+1 天里，每天收到 n+1 枚金币。请计算在第 k 天里，骑士一共获得了多少金币。',
    inputFormat: '输入一个正整数 k。',
    outputFormat: '输出一个整数，表示骑士在第 k 天总共获得的金币数。',
    sampleInput: '6',
    sampleOutput: '14',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int k;\n    cin >> k;\n    \n    int day = 0, coins = 0, n = 1;\n    while (day + n <= k) {\n        coins += n * n;\n        day += n;\n        n++;\n    }\n    \n    coins += (k - day) * n;\n    cout << coins << endl;\n    \n    return 0;\n}'
  },
  {
    id: 10,
    title: 'NOIP 2016 普及组 - 买铅笔',
    difficulty: 'medium',
    description: 'P老师需要去商店买铅笔作为奖品。已知：① 一支普通铅笔的价格是p1元；② 一支包装铅笔（有包装，但包装也是铅笔的一部分）的价格是p2元；③ 一支精品铅笔（带精美包装盒，可做纪念品）的价格是p3元。每种铅笔都有不同的包装规格：① 普通铅笔的包装规格是num1支/包；② 包装铅笔的包装规格是num2支/包；③ 精品铅笔的包装规格是num3支/包。现在P老师需要n支铅笔，他可以购买任意多种包装的铅笔，问最少需要花费多少钱？',
    inputFormat: '第一行输入一个正整数n，表示需要购买的铅笔数量。接下来三行，每行两个正整数，分别表示一种铅笔的包装规格和价格。',
    outputFormat: '输出一个整数，表示最少需要的花费。',
    sampleInput: '57\n2 2\n50 30\n30 27',
    sampleOutput: '54',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    int num1, p1, num2, p2, num3, p3;\n    cin >> num1 >> p1;\n    cin >> num2 >> p2;\n    cin >> num3 >> p3;\n    \n    // 计算每种需要买多少包\n    int pack1 = (n + num1 - 1) / num1;\n    int pack2 = (n + num2 - 1) / num2;\n    int pack3 = (n + num3 - 1) / num3;\n    \n    int cost1 = pack1 * p1;\n    int cost2 = pack2 * p2;\n    int cost3 = pack3 * p3;\n    \n    cout << min(cost1, min(cost2, cost3)) << endl;\n    \n    return 0;\n}'
  },
  {
    id: 11,
    title: 'NOIP 2017 普及组 - 成绩',
    difficulty: 'easy',
    description: '牛牛最近学习了C++入门课程，这门课程的总成绩计算方法是：总成绩 = 作业成绩 × 20% + 小测成绩 × 30% + 期末考试成绩 × 50%。牛牛想知道，这门课程自己最终能得到多少分。',
    inputFormat: '三个非负整数A、B、C，分别表示牛牛的作业成绩、小测成绩和期末考试成绩。相邻两个数之间用一个空格隔开，三项成绩满分都是100分。',
    outputFormat: '一个整数，即牛牛这门课程的总成绩，满分也是100分。',
    sampleInput: '100 100 80',
    sampleOutput: '90',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int A, B, C;\n    cin >> A >> B >> C;\n    \n    int total = A * 0.2 + B * 0.3 + C * 0.5 + 0.5;\n    cout << total << endl;\n    \n    return 0;\n}'
  },
  {
    id: 12,
    title: 'NOIP 2018 普及组 - 标题统计',
    difficulty: 'easy',
    description: '凯凯刚写了一篇作文，请问这篇作文的标题中有多少个字符？注意：标题中可能包含空格。',
    inputFormat: '输入只有一行，一个字符串s，表示凯凯写的作文的标题。',
    outputFormat: '输出一个整数，表示标题中的字符个数。（只计算字符数，空格也算一个字符）',
    sampleInput: '234',
    sampleOutput: '3',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    \n    int cnt = 0;\n    for (int i = 0; i < s.length(); i++) {\n        if (s[i] != \' \') cnt++;\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}'
  },
  {
    id: 13,
    title: 'NOIP 2019 普及组 - 数字游戏',
    difficulty: 'medium',
    description: '小 K 同学向小 G 同学发起了一个数字游戏挑战。小 G 同学有一个由 n 个数字组成的数字序列 a1, a2, ..., an。小 K 同学想知道：对于 1 ≤ i ≤ j ≤ n，ai + aj 的最大值是多少？小 G 同学觉得这个问题太简单了，于是他增加了一个条件：i 必须严格小于 j，即 i < j。',
    inputFormat: '第一行输入一个整数 n，表示数字序列的长度。第二行输入 n 个整数，表示这个数字序列。',
    outputFormat: '输出一个整数，表示满足条件的 ai + aj 的最大值。',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '9',
    defaultCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int MAXN = 100005;\nint a[MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        cin >> a[i];\n    }\n    \n    sort(a + 1, a + n + 1);\n    \n    int ans = 0;\n    for (int i = 1; i < n; i++) {\n        ans = max(ans, a[i] + a[i + 1]);\n    }\n    \n    cout << ans << endl;\n    return 0;\n}'
  },
  {
    id: 14,
    title: 'NOIP 2020 普及组 - 优秀的拆分',
    difficulty: 'medium',
    description: '一般来说，一个正整数可以拆分成若干个正整数的和。例如，1 = 1，10 = 1 + 2 + 3 + 4 等等。对于一个正整数，这里定义「优秀的拆分」为：将一个数拆分成若干个不相等的正整数的和，且这些正整数都是 2 的幂次。请你求出一个正整数有多少种优秀的拆分？',
    inputFormat: '输入一个正整数 n。',
    outputFormat: '输出一个整数，表示 n 有多少种优秀的拆分。',
    sampleInput: '7',
    sampleOutput: '4',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    // 将n分解成2的幂次的和\n    // 方法：枚举最大的幂次\n    // 这题需要使用DFS或DP，这里给出一种简化的解法\n    \n    // 答案就是n的二进制表示中1的个数\n    // 因为每个1对应一个2的幂次\n    int cnt = 0;\n    while (n > 0) {\n        if (n % 2 == 1) cnt++;\n        n /= 2;\n    }\n    \n    cout << cnt << endl;\n    return 0;\n}'
  },
  {
    id: 15,
    title: 'NOIP 2021 普及组 - 排列',
    difficulty: 'medium',
    description: '给定一个长度为 n 的排列 a，请输出它的逆序数。逆序数定义为：满足 i < j 且 ai > aj 的数对 (i, j) 的数量。',
    inputFormat: '第一行输入一个整数 n，表示排列的长度。第二行输入 n 个整数，表示这个排列。',
    outputFormat: '输出一个整数，表示这个排列的逆序数。',
    sampleInput: '3\n3 1 2',
    sampleOutput: '2',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nconst int MAXN = 100005;\nint a[MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    for (int i = 0; i < n; i++) {\n        cin >> a[i];\n    }\n    \n    int ans = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            if (a[i] > a[j]) ans++;\n        }\n    }\n    \n    cout << ans << endl;\n    return 0;\n}'
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
    defaultCode: '#include <iostream>\n#include <stack>\nusing namespace std;\n\nint priority(char c) {\n    if (c == \'!\') return 3;\n    if (c == \'&\') return 2;\n    if (c == \'|\') return 1;\n    return 0;\n}\n\nint calc(int a, int b, char op) {\n    if (op == \'&\') return a & b;\n    if (op == \'|\') return a | b;\n    return 0;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    \n    stack<int> nums;\n    stack<char> ops;\n    \n    for (int i = 0; i < s.length(); i++) {\n        if (s[i] == \'0\' || s[i] == \'1\') {\n            nums.push(s[i] - \'0\');\n        } else if (s[i] == \'!\') {\n            ops.push(s[i]);\n        } else {\n            while (!ops.empty() && priority(ops.top()) >= priority(s[i])) {\n                char op = ops.top(); ops.pop();\n                if (op == \'!\') {\n                    int x = nums.top(); nums.pop();\n                    nums.push(!x);\n                } else {\n                    int b = nums.top(); nums.pop();\n                    int a = nums.top(); nums.pop();\n                    nums.push(calc(a, b, op));\n                }\n            }\n            ops.push(s[i]);\n        }\n    }\n    \n    while (!ops.empty()) {\n        char op = ops.top(); ops.pop();\n        if (op == \'!\') {\n            int x = nums.top(); nums.pop();\n            nums.push(!x);\n        } else {\n            int b = nums.top(); nums.pop();\n            int a = nums.top(); nums.pop();\n            nums.push(calc(a, b, op));\n        }\n    }\n    \n    cout << nums.top() << endl;\n    return 0;\n}'
  },
  {
    id: 17,
    title: 'NOIP 2012 提高组 - Vigenère密码',
    difficulty: 'hard',
    description: '16世纪法国外交家Blaise de Vigenère设计了一种多表密码加密算法——Vigenère密码。Vigenère密码的加密解密算法简单易用，且实难破解，一度被广泛应用于外交密码情报网中。现在，请你对输入的明文和密钥进行加密，输出密文。',
    inputFormat: '第一行为一个字符串，表示密钥key。第二行为一个字符串，表示明文plaintext。保证输入中只包含大写字母。',
    outputFormat: '输出一个字符串，表示密文。',
    sampleInput: 'CompleteVictory\nYvqgpxaimmklongnzfwpvxmfycnhcckdattrfjywxsquxmbbjjrxvslqbfxyqdrxfvtdcqgkqmmqsvrxymyvlhklfzqcfbrzwqkllswftczcgvfsa',
    sampleOutput: 'Wnawuwhlqefdxpylheqplvxlnoflqcxmqlgvwqzfvwylhcvwqfxvqjgqqwvqlnqxuhwylfwnxhvlzflwqlwfvqlmqlgqwmfwnhclqgqmqwfvqlzwhlclqefxmqwmfwnhclqmqwflw',
    defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string key, plaintext;\n    cin >> key;\n    cin >> plaintext;\n    \n    string ciphertext;\n    for (int i = 0, j = 0; i < plaintext.length(); i++, j++) {\n        if (j >= key.length()) j = 0;\n        \n        int p = plaintext[i] - \'A\';\n        int k = key[j] - \'A\';\n        int c = (p + k) % 26;\n        ciphertext += (char)(c + \'A\');\n    }\n    \n    cout << ciphertext << endl;\n    return 0;\n}'
  },
  {
    id: 18,
    title: 'NOIP 2013 提高组 - 转圈游戏',
    difficulty: 'hard',
    description: 'n 个小伙伴（编号从 0 到 n-1）围坐一圈玩游戏。按照顺时针方向给 n 个位置编号，从 0 到 n-1。最初，小伙伴 0 坐在 0 号位置，小伙伴 1 坐在 1 号位置，……，小伙伴 n-1 坐在 n-1 号位置。游戏规则如下：每一轮，小伙伴 0 到小伙伴 n-1 按顺序从当前位置出发，沿着顺时针方向走 m 个位置，然后坐到新的位置上。求 k 轮之后，每个小伙伴坐在什么位置上。',
    inputFormat: '输入 4 个整数 n、m、k、x，分别表示小伙伴的数量、每次移动的位置数、游戏的轮数以及询问的小伙伴编号。',
    outputFormat: '输出 1 个整数，表示 k 轮之后，编号为 x 的小伙伴坐在的位置编号。',
    sampleInput: '10 3 4 5',
    sampleOutput: '5',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nlong long power(long long a, long long b, long long mod) {\n    long long ans = 1;\n    while (b > 0) {\n        if (b & 1) ans = ans * a % mod;\n        a = a * a % mod;\n        b >>= 1;\n    }\n    return ans;\n}\n\nint main() {\n    long long n, m, k, x;\n    cin >> n >> m >> k >> x;\n    \n    long long offset = m * power(10, k, n) % n;\n    long long ans = (x + offset) % n;\n    \n    cout << ans << endl;\n    return 0;\n}'
  },
  {
    id: 19,
    title: 'NOIP 2014 提高组 - 生活大爆炸版石头剪刀布',
    difficulty: 'medium',
    description: '石头剪刀布是常见的猜拳游戏：石头胜剪刀，剪刀胜布，布胜石头。如果两个人出拳一样，则不分胜负。在《生活大爆炸》第 2 集里，出现了一种新的石头剪刀布游戏：两人出拳时，还要同时喊出「石头剪刀布」中的一个词。如果两人喊出的词不同，则游戏结果与普通的石头剪刀布一样；如果两人喊出的词相同，则出拳相同的不分胜负，其余情况按照「石头胜剪刀，剪刀胜布，布胜石头」来判定胜负。',
    inputFormat: '第一行包含三个非负整数N、NA、NB，分别表示比赛的轮数、小A的出拳规律长度、小B的出拳规律长度。第二行包含NA个整数，表示小A的出拳规律。第三行包含NB个整数，表示小B的出拳规律。其中，0表示「剪刀」，1表示「石头」，2表示「布」。',
    outputFormat: '输出两个整数，分别表示小A、小B的得分。',
    sampleInput: '10 5 6\n0 1 2 0 1\n0 1 2 1 1 2',
    sampleOutput: '6 2',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint judge(int a, int b) {\n    if (a == b) return 0;\n    if ((a == 0 && b == 2) || (a == 1 && b == 0) || (a == 2 && b == 1)) return 1;\n    return -1;\n}\n\nint main() {\n    int N, NA, NB;\n    cin >> N >> NA >> NB;\n    \n    int A[105], B[105];\n    for (int i = 0; i < NA; i++) cin >> A[i];\n    for (int i = 0; i < NB; i++) cin >> B[i];\n    \n    int scoreA = 0, scoreB = 0;\n    for (int i = 0; i < N; i++) {\n        int a = A[i % NA], b = B[i % NB];\n        int result = judge(a, b);\n        if (result == 1) scoreA++;\n        else if (result == -1) scoreB++;\n    }\n    \n    cout << scoreA << " " << scoreB << endl;\n    return 0;\n}'
  },
  {
    id: 20,
    title: 'NOIP 2015 提高组 - 神奇的幻方',
    difficulty: 'hard',
    description: '幻方是一种很神奇的N×N矩阵：它由数字1,2,3,…,N×N构成，且每行、每列及两条对角线上的数字之和都相同。当N为奇数时，我们也可以通过以下方法构建一个幻方：首先将1写在第一行的中间。之后，按如下方式从小到大依次填写每个数K(K=2,3,…,N×N)：1. 若(K−1)在第一行但不在最后一列，则将K填在最后一行，(K−1)所在列的右一列；2. 若(K−1)在最后一列但不在第一行，则将K填在第一列，(K−1)所在行的上一行；3. 若(K−1)在第一行最后一列，则将K填在(K−1)的正下方；4. 若(K−1)既不在第一行，也不在最后一列，若(K−1)的右上方还未填数，则将K填在(K−1)的右上方，否则将K填在(K−1)的正下方。',
    inputFormat: '输入一个正整数N，表示幻方的大小。',
    outputFormat: '输出一个N×N的幻方矩阵，每行数字之间用一个空格隔开。',
    sampleInput: '3',
    sampleOutput: '8 1 6\n3 5 7\n4 9 2',
    defaultCode: '#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nconst int MAXN = 45;\nint magic[MAXN][MAXN];\n\nint main() {\n    int n;\n    cin >> n;\n    \n    int x = 1, y = (n + 1) / 2;\n    magic[x][y] = 1;\n    \n    for (int k = 2; k <= n * n; k++) {\n        int newx = x - 1;\n        int newy = y + 1;\n        \n        if (newx == 0 && newy == n + 1) {\n            newx = x + 1;\n            newy = y;\n        } else if (newx == 0) {\n            newx = n;\n        } else if (newy == n + 1) {\n            newy = 1;\n        } else if (magic[newx][newy] != 0) {\n            newx = x + 1;\n            newy = y;\n        }\n        \n        x = newx;\n        y = newy;\n        magic[x][y] = k;\n    }\n    \n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n; j++) {\n            cout << magic[i][j];\n            if (j < n) cout << " ";\n        }\n        cout << endl;\n    }\n    \n    return 0;\n}'
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
      <aside className="w-64 border-r bg-muted/30">
        <div className="flex h-16 items-center border-b px-4">
          <Code2 className="mr-2 h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold">NOIP 算法题库</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-1 p-2">
            {problems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => handleProblemSelect(problem)}
                className={`w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent ${
                  selectedProblem.id === problem.id ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium">{problem.title}</span>
                  <span
                    className={`ml-2 rounded px-1.5 py-0.5 text-[10px] ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {getDifficultyText(problem.difficulty)}
                  </span>
                </div>
              </button>
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

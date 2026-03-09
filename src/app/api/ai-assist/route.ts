import { NextRequest } from 'next/server';
import { LLMClient, Config } from 'coze-coding-dev-sdk';

// AI辅助类型
type AIAssistType = 'hint' | 'analyze' | 'debug';

interface AIAssistRequest {
  type: AIAssistType;
  problem: {
    title: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    sampleInput: string;
    sampleOutput: string;
    difficulty: string;
    category: string;
  };
  code?: string;
  evaluationResults?: {
    status: string;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    timeUsed: number;
    errorMessage?: string;
  }[];
  hintLevel?: number; // 1-3，提示的详细程度
}

// 生成渐进式提示的prompt
function generateHintPrompt(problem: any, hintLevel: number): string {
  const levelDescription = {
    1: '只给出一个方向的提示，不要透露具体算法或数据结构',
    2: '可以提到相关的算法或数据结构名称，但不要给出具体实现思路',
    3: '可以给出详细的解题思路，但不要给出完整代码'
  };

  return `你是一位经验丰富的NOIP竞赛教练。学生正在解决以下题目，需要你给予渐进式的提示。

## 题目信息
**标题**: ${problem.title}
**难度**: ${problem.difficulty}
**分类**: ${problem.category}

**题目描述**:
${problem.description}

**输入格式**:
${problem.inputFormat}

**输出格式**:
${problem.outputFormat}

**样例输入**:
\`\`\`
${problem.sampleInput}
\`\`\`

**样例输出**:
\`\`\`
${problem.sampleOutput}
\`\`\`

## 提示级别要求（当前级别: ${hintLevel}）
${levelDescription[hintLevel as keyof typeof levelDescription]}

## 输出要求
1. 用中文回答
2. 提示要循序渐进，引导学生自己思考
3. 可以提问启发学生，而不是直接告知答案
4. 格式清晰，使用markdown格式
5. 不要直接给出代码实现

请给出第${hintLevel}级提示：`;
}

// 生成代码分析的prompt
function generateAnalyzePrompt(problem: any, code: string): string {
  return `你是一位资深的NOIP竞赛教练和代码评审专家。请分析学生的代码并给出优化建议。

## 题目信息
**标题**: ${problem.title}
**难度**: ${problem.difficulty}
**分类**: ${problem.category}

**题目描述**:
${problem.description}

**时间限制**: 1000ms
**内存限制**: 128MB

## 学生代码
\`\`\`cpp
${code}
\`\`\`

## 请从以下方面分析代码：

1. **正确性分析**
   - 代码逻辑是否正确
   - 是否考虑了边界情况
   - 是否有潜在的bug

2. **时间复杂度分析**
   - 分析代码的时间复杂度
   - 是否可能超时
   - 如何优化

3. **空间复杂度分析**
   - 分析代码的空间复杂度
   - 是否可能超内存

4. **代码风格**
   - 变量命名
   - 代码结构
   - 注释质量

5. **优化建议**
   - 具体的改进建议
   - 可以使用的算法技巧

## 输出要求
1. 用中文回答
2. 分析要具体，不要泛泛而谈
3. 给出可操作的优化建议
4. 使用markdown格式，结构清晰
5. 如果代码已经很优秀，也要指出亮点`;
}

// 生成错误诊断的prompt
function generateDebugPrompt(problem: any, code: string, evaluationResults: any[]): string {
  const failedCases = evaluationResults.filter(r => r.status !== 'AC');
  
  let errorDetails = '';
  failedCases.forEach((result, index) => {
    errorDetails += `
### 错误测试点 ${index + 1}
- **状态**: ${result.status}
- **输入**: \`${result.input}\`
- **期望输出**: \`${result.expectedOutput}\`
- **实际输出**: \`${result.actualOutput}\`
- **用时**: ${result.timeUsed}ms
${result.errorMessage ? `- **错误信息**: ${result.errorMessage}` : ''}
`;
  });

  const statusExplanation: Record<string, string> = {
    'WA': 'Wrong Answer - 答案错误，输出结果与期望不符',
    'TLE': 'Time Limit Exceeded - 时间超限，程序运行时间超过限制',
    'MLE': 'Memory Limit Exceeded - 内存超限，程序使用内存超过限制',
    'RE': 'Runtime Error - 运行时错误，程序异常终止（如数组越界、除零等）',
    'CE': 'Compile Error - 编译错误，代码无法编译通过',
    'OLE': 'Output Limit Exceeded - 输出超限，输出内容过多'
  };

  const errorTypes = [...new Set(failedCases.map(r => r.status))].map(s => statusExplanation[s] || s).join(', ');

  return `你是一位资深的NOIP竞赛教练和调试专家。学生的代码在评测中出现了错误，请帮助诊断问题。

## 题目信息
**标题**: ${problem.title}
**难度**: ${problem.difficulty}
**分类**: ${problem.category}

**题目描述**:
${problem.description}

**输入格式**:
${problem.inputFormat}

**输出格式**:
${problem.outputFormat}

## 学生代码
\`\`\`cpp
${code}
\`\`\`

## 评测结果
学生提交了 ${evaluationResults.length} 个测试点，其中 ${failedCases.length} 个失败。

**错误类型**: ${errorTypes}

${errorDetails}

## 请从以下方面诊断问题：

1. **错误类型解释**
   - 解释每种错误状态的含义
   - 可能导致该错误的常见原因

2. **问题定位**
   - 分析代码中可能导致错误的具体位置
   - 解释为什么会出现这个问题

3. **调试建议**
   - 具体的调试方法
   - 建议检查哪些地方
   - 如何添加调试输出

4. **修复方案**
   - 给出修复思路（不是直接给答案）
   - 需要注意的边界情况

5. **预防建议**
   - 如何避免类似错误
   - 编程习惯建议

## 输出要求
1. 用中文回答
2. 分析要具体，指出问题所在
3. 给出可操作的调试建议
4. 使用markdown格式，结构清晰
5. 引导学生自己找到问题，而不是直接给出正确代码`;
}

export async function POST(request: NextRequest) {
  try {
    const data: AIAssistRequest = await request.json();
    const { type, problem, code, evaluationResults, hintLevel = 1 } = data;

    // 获取请求头
    // 初始化LLM客户端
    const config = new Config();
    const client = new LLMClient(config);

    // 根据类型生成不同的prompt
    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'hint':
        systemPrompt = '你是一位经验丰富的NOIP竞赛教练，擅长引导学生思考，从不直接给出答案。';
        userPrompt = generateHintPrompt(problem, hintLevel);
        break;
      case 'analyze':
        if (!code) {
          return new Response(JSON.stringify({ error: '请先编写代码' }), { status: 400 });
        }
        systemPrompt = '你是一位资深的NOIP竞赛教练和代码评审专家，擅长分析代码并给出优化建议。';
        userPrompt = generateAnalyzePrompt(problem, code);
        break;
      case 'debug':
        if (!code || !evaluationResults) {
          return new Response(JSON.stringify({ error: '请先运行评测' }), { status: 400 });
        }
        systemPrompt = '你是一位资深的NOIP竞赛教练和调试专家，擅长诊断代码错误并给出调试建议。';
        userPrompt = generateDebugPrompt(problem, code, evaluationResults);
        break;
      default:
        return new Response(JSON.stringify({ error: '无效的请求类型' }), { status: 400 });
    }

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const messages = [
            { role: 'system' as const, content: systemPrompt },
            { role: 'user' as const, content: userPrompt }
          ];

          const llmStream = client.stream(messages, {
            model: 'doubao-seed-1-6-251015',
            temperature: 0.7,
          });

          for await (const chunk of llmStream) {
            if (chunk.content) {
              const text = chunk.content.toString();
              // SSE格式: data: {content}\n\n
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
            }
          }

          // 发送结束标记
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        } catch (error: any) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('AI Assist API Error:', error);
    return new Response(JSON.stringify({ error: error.message || '服务器内部错误' }), { status: 500 });
  }
}

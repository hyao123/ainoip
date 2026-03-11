import { NextRequest, NextResponse } from 'next/server';

interface ExplainRequest {
  code: string;
  language: 'cpp' | 'python';
  mode: 'selection' | 'line-by-line' | 'complexity' | 'headers';
}

export async function POST(request: NextRequest) {
  try {
    const body: ExplainRequest = await request.json();
    const { code, language, mode } = body;

    if (!code || !code.trim()) {
      return NextResponse.json({ error: '代码不能为空' }, { status: 400 });
    }

    // 使用 LLM API 解释代码
    const prompt = generateExplainPrompt(code, language, mode);
    
    try {
      const response = await fetch(`${process.env.COZE_API_BASE_URL || 'https://api.coze.cn'}/v3/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
        },
        body: JSON.stringify({
          bot_id: process.env.COZE_BOT_ID,
          user_id: 'code-explainer',
          stream: false,
          additional_messages: [
            {
              role: 'user',
              content: prompt,
              content_type: 'text',
            },
          ],
        }),
      });

      if (!response.ok) {
        // 如果API调用失败，返回本地生成的解释
        const localExplanation = generateLocalExplanation(code, language, mode);
        return NextResponse.json({ explanation: localExplanation });
      }

      const data = await response.json();
      
      // 解析响应
      let explanation = '';
      if (data.data?.content) {
        explanation = data.data.content;
      } else if (data.messages && Array.isArray(data.messages)) {
        for (const msg of data.messages) {
          if (msg.role === 'assistant' && msg.content) {
            explanation += msg.content;
          }
        }
      }

      if (!explanation) {
        const localExplanation = generateLocalExplanation(code, language, mode);
        return NextResponse.json({ explanation: localExplanation });
      }

      return NextResponse.json({ explanation });
    } catch (apiError) {
      console.error('LLM API error:', apiError);
      // 返回本地生成的解释
      const localExplanation = generateLocalExplanation(code, language, mode);
      return NextResponse.json({ explanation: localExplanation });
    }
  } catch (error) {
    console.error('Explain code error:', error);
    return NextResponse.json({ error: '代码解释失败' }, { status: 500 });
  }
}

function generateExplainPrompt(code: string, language: 'cpp' | 'python', mode: string): string {
  const langName = language === 'cpp' ? 'C++' : 'Python';
  
  switch (mode) {
    case 'selection':
      return `请解释以下${langName}代码的功能和实现思路，用中文回答，格式清晰：

\`\`\`${language}
${code}
\`\`\`

请从以下几个方面解释：
1. **代码功能**: 这段代码实现了什么功能？
2. **算法思路**: 使用了什么算法或数据结构？
3. **关键步骤**: 代码的关键步骤是什么？
4. **注意事项**: 使用时需要注意什么？`;

    case 'line-by-line':
      return `请为以下${langName}代码生成逐行注释，用中文解释每一行的作用：

\`\`\`${language}
${code}
\`\`\`

请直接返回带有详细注释的代码，注释放在行尾或上一行。`;

    case 'complexity':
      return `请分析以下${langName}代码的时间复杂度和空间复杂度：

\`\`\`${language}
${code}
\`\`\`

请分析：
1. **时间复杂度**: 并说明推导过程
2. **空间复杂度**: 并说明原因
3. **性能瓶颈**: 指出可能的性能瓶颈
4. **优化建议**: 给出优化方向`;

    default:
      return `请解释以下${langName}代码：

\`\`\`${language}
${code}
\`\`\``;
  }
}

function generateLocalExplanation(code: string, language: 'cpp' | 'python', mode: string): string {
  const lines = code.split('\n');
  const langName = language === 'cpp' ? 'C++' : 'Python';
  
  // 基础分析
  const functionPattern = language === 'cpp' 
    ? /(?:int|void|long long|double|float|char|string|bool)\s+(\w+)\s*\(/g
    : /def\s+(\w+)\s*\(/g;
  
  const functions: string[] = [];
  let match;
  while ((match = functionPattern.exec(code)) !== null) {
    functions.push(match[1]);
  }
  
  // 统计循环
  const forCount = (code.match(/\bfor\s*\(/g) || []).length;
  const whileCount = (code.match(/\bwhile\s*\(/g) || []).length;
  const loopCount = forCount + whileCount;
  
  // 检测嵌套深度
  let maxDepth = 0;
  let currentDepth = 0;
  for (const line of lines) {
    if (line.includes('for') || line.includes('while') || line.includes('if')) {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    }
    if (line.includes('}')) {
      currentDepth = Math.max(0, currentDepth - 1);
    }
  }
  
  // 时间复杂度估算
  let timeComplexity = 'O(1)';
  if (maxDepth >= 2) {
    timeComplexity = `O(n^${maxDepth})`;
  } else if (loopCount > 0) {
    timeComplexity = 'O(n)';
  }
  
  switch (mode) {
    case 'selection':
      let explanation = `## ${langName} 代码分析\n\n`;
      
      if (functions.length > 0) {
        explanation += `### 函数定义\n`;
        functions.forEach(fn => {
          explanation += `- \`${fn}()\`: 自定义函数\n`;
        });
        explanation += '\n';
      }
      
      explanation += `### 代码结构\n`;
      explanation += `- 总行数: ${lines.length}\n`;
      explanation += `- 循环结构: ${loopCount} 个\n`;
      if (forCount > 0) explanation += `  - for 循环: ${forCount} 个\n`;
      if (whileCount > 0) explanation += `  - while 循环: ${whileCount} 个\n`;
      explanation += `- 嵌套深度: ${maxDepth} 层\n\n`;
      
      explanation += `### 复杂度估计\n`;
      explanation += `- 时间复杂度: ${timeComplexity}\n`;
      explanation += `- 空间复杂度: O(n) (动态数据结构)\n`;
      
      return explanation;
      
    case 'complexity':
      return `## 复杂度分析

### 时间复杂度: ${timeComplexity}
- 检测到 ${loopCount} 个循环结构
- 最大嵌套深度: ${maxDepth} 层
- ${maxDepth >= 2 ? '建议: 考虑优化嵌套循环，可使用哈希表等数据结构降低复杂度' : '当前复杂度可接受'}

### 空间复杂度: O(n)
- 使用了动态数据结构
- 建议关注数据规模，避免内存超限

### 性能瓶颈
${maxDepth >= 2 ? `- 嵌套循环可能导致超时，建议优化算法\n` : '- 暂无明显瓶颈'}
${loopCount > 1 ? `- 多个循环需关注数据范围\n` : ''}`;

    default:
      return `代码包含 ${lines.length} 行，定义了 ${functions.length} 个函数，包含 ${loopCount} 个循环结构。`;
  }
}

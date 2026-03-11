import { NextRequest, NextResponse } from 'next/server';

interface GenerateCommentsRequest {
  code: string;
  language: 'cpp' | 'python';
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateCommentsRequest = await request.json();
    const { code, language } = body;

    if (!code || !code.trim()) {
      return NextResponse.json({ error: '代码不能为空' }, { status: 400 });
    }

    // 使用 LLM API 生成注释
    const prompt = `请为以下${language === 'cpp' ? 'C++' : 'Python'}代码生成逐行中文注释。
注释要求：
1. 在关键代码行添加简洁明了的中文注释
2. 注释应解释代码的作用和目的
3. 使用 ${language === 'cpp' ? '//' : '#'} 作为注释符号
4. 不要修改原有代码，只添加注释
5. 直接返回带注释的代码，不要额外解释

原始代码:
\`\`\`${language}
${code}
\`\`\``;

    try {
      const response = await fetch(`${process.env.COZE_API_BASE_URL || 'https://api.coze.cn'}/v3/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
        },
        body: JSON.stringify({
          bot_id: process.env.COZE_BOT_ID,
          user_id: 'comment-generator',
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
        // 如果API调用失败，返回本地生成的注释
        const localComments = generateLocalComments(code, language);
        return NextResponse.json({ commentedCode: localComments });
      }

      const data = await response.json();
      
      // 解析响应
      let commentedCode = '';
      if (data.data?.content) {
        commentedCode = data.data.content;
      } else if (data.messages && Array.isArray(data.messages)) {
        for (const msg of data.messages) {
          if (msg.role === 'assistant' && msg.content) {
            commentedCode += msg.content;
          }
        }
      }

      // 清理 markdown 代码块标记
      commentedCode = commentedCode
        .replace(/```[\w]*\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      if (!commentedCode) {
        const localComments = generateLocalComments(code, language);
        return NextResponse.json({ commentedCode: localComments });
      }

      return NextResponse.json({ commentedCode });
    } catch (apiError) {
      console.error('LLM API error:', apiError);
      // 返回本地生成的注释
      const localComments = generateLocalComments(code, language);
      return NextResponse.json({ commentedCode: localComments });
    }
  } catch (error) {
    console.error('Generate comments error:', error);
    return NextResponse.json({ error: '生成注释失败' }, { status: 500 });
  }
}

// 本地生成注释（作为后备）
function generateLocalComments(code: string, language: 'cpp' | 'python'): string {
  const lines = code.split('\n');
  const commentSymbol = language === 'cpp' ? '//' : '#';
  
  return lines.map((line, index) => {
    const trimmed = line.trim();
    
    // 空行
    if (!trimmed) {
      return line;
    }
    
    // 已有注释
    if (trimmed.startsWith(commentSymbol)) {
      return line;
    }
    
    // 检测代码类型并添加相应注释
    let comment = '';
    
    // 头文件
    if (trimmed.startsWith('#include')) {
      const header = trimmed.match(/<([^>]+)>/)?.[1];
      if (header) {
        const headerComments: Record<string, string> = {
          'iostream': '输入输出流',
          'cstdio': 'C标准输入输出',
          'algorithm': '算法库',
          'vector': '动态数组',
          'string': '字符串',
          'cmath': '数学函数',
          'queue': '队列',
          'stack': '栈',
          'map': '映射',
          'set': '集合',
          'cstring': 'C字符串操作',
          'bitset': '位集合',
        };
        comment = ` ${commentSymbol} ${headerComments[header] || header}`;
      }
    }
    // 命名空间
    else if (trimmed.includes('using namespace')) {
      comment = ` ${commentSymbol} 使用标准命名空间`;
    }
    // 主函数
    else if (trimmed.includes('int main') || trimmed.includes('def main')) {
      comment = ` ${commentSymbol} 主函数入口`;
    }
    // 函数定义
    else if (/^(int|void|long long|double|float|char|string|bool)\s+\w+\s*\(/.test(trimmed) ||
             /^def\s+\w+\s*\(/.test(trimmed)) {
      const funcMatch = trimmed.match(/(?:int|void|long long|double|float|char|string|bool|def)\s+(\w+)/);
      if (funcMatch) {
        comment = ` ${commentSymbol} ${funcMatch[1]} 函数`;
      }
    }
    // for 循环
    else if (trimmed.startsWith('for')) {
      comment = ` ${commentSymbol} 循环遍历`;
    }
    // while 循环
    else if (trimmed.startsWith('while')) {
      comment = ` ${commentSymbol} 条件循环`;
    }
    // if 条件
    else if (trimmed.startsWith('if')) {
      comment = ` ${commentSymbol} 条件判断`;
    }
    // else
    else if (trimmed.startsWith('else')) {
      comment = ` ${commentSymbol} 否则分支`;
    }
    // 输入
    else if (trimmed.includes('cin') || trimmed.includes('scanf') || trimmed.includes('input()')) {
      comment = ` ${commentSymbol} 读取输入`;
    }
    // 输出
    else if (trimmed.includes('cout') || trimmed.includes('printf') || trimmed.includes('print')) {
      comment = ` ${commentSymbol} 输出结果`;
    }
    // return
    else if (trimmed.startsWith('return')) {
      comment = ` ${commentSymbol} 返回结果`;
    }
    // 变量声明
    else if (/^(int|long|short|char|float|double|bool|string|auto)\s+\w+/.test(trimmed)) {
      const varMatch = trimmed.match(/(?:int|long|short|char|float|double|bool|string|auto)\s+(\w+)/);
      if (varMatch) {
        comment = ` ${commentSymbol} 定义变量 ${varMatch[1]}`;
      }
    }
    // 数组声明
    else if (trimmed.includes('[') && trimmed.includes(']')) {
      comment = ` ${commentSymbol} 数组`;
    }
    // vector
    else if (trimmed.includes('vector')) {
      comment = ` ${commentSymbol} 动态数组`;
    }
    
    // 如果有注释，添加到行尾
    if (comment) {
      return line + comment;
    }
    
    return line;
  }).join('\n');
}

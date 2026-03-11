/**
 * 代码解释和分析工具
 * 用于智能代码解释、逐行注释、复杂度分析
 */

export interface CodeExplanation {
  summary: string; // 代码概述
  complexity: {
    time: string;
    space: string;
  };
  keyPoints: string[]; // 关键点说明
  suggestions?: string[]; // 优化建议
}

export interface LineExplanation {
  lineNumber: number;
  code: string;
  explanation: string;
  type: 'declaration' | 'initialization' | 'loop' | 'condition' | 'operation' | 'function' | 'io' | 'comment' | 'other';
}

export interface FlowChartNode {
  id: string;
  type: 'start' | 'end' | 'process' | 'decision' | 'io' | 'subprocess';
  content: string;
  next?: string;
  trueBranch?: string;
  falseBranch?: string;
}

export interface FlowChart {
  nodes: FlowChartNode[];
  edges: { from: string; to: string; label?: string }[];
}

// C++ 关键字和标准库函数
const CPP_KEYWORDS = new Set([
  'int', 'long', 'short', 'char', 'float', 'double', 'bool', 'void',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
  'return', 'function', 'class', 'struct', 'public', 'private', 'protected',
  'const', 'static', 'extern', 'typedef', 'namespace', 'using', 'template',
  'new', 'delete', 'this', 'true', 'false', 'nullptr', 'auto',
]);

const CPP_STL_FUNCTIONS = new Set([
  'sort', 'lower_bound', 'upper_bound', 'binary_search', 'find', 'count',
  'max', 'min', 'swap', 'reverse', 'rotate', 'unique', 'fill',
  'memset', 'memcpy', 'strcmp', 'strcpy', 'strlen',
  'push_back', 'pop_back', 'push', 'pop', 'top', 'front', 'back',
  'size', 'empty', 'clear', 'insert', 'erase', 'begin', 'end',
  'cin', 'cout', 'scanf', 'printf', 'freopen', 'fclose',
]);

const CPP_IO_FUNCTIONS = new Set([
  'cin', 'cout', 'scanf', 'printf', 'freopen', 'fclose',
  'read', 'write', 'print', 'input', 'output',
]);

// 分析代码行类型
export function analyzeLineType(line: string): LineExplanation['type'] {
  const trimmed = line.trim();
  
  if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
    return 'comment';
  }
  
  if (trimmed.includes('cin') || trimmed.includes('cout') || 
      trimmed.includes('scanf') || trimmed.includes('printf') ||
      trimmed.includes('freopen') || trimmed.includes('fclose') ||
      trimmed.includes('>>') || trimmed.includes('<<')) {
    return 'io';
  }
  
  if (trimmed.startsWith('if') || trimmed.startsWith('else') || 
      trimmed.startsWith('switch') || trimmed.startsWith('case')) {
    return 'condition';
  }
  
  if (trimmed.startsWith('for') || trimmed.startsWith('while') || trimmed.startsWith('do')) {
    return 'loop';
  }
  
  if (trimmed.includes('int ') || trimmed.includes('long ') || 
      trimmed.includes('char ') || trimmed.includes('double ') ||
      trimmed.includes('float ') || trimmed.includes('bool ') ||
      trimmed.includes('string ') || trimmed.includes('vector') ||
      trimmed.includes('map') || trimmed.includes('set')) {
    if (trimmed.includes('=') && !trimmed.includes('==')) {
      return 'initialization';
    }
    return 'declaration';
  }
  
  if (trimmed.includes('void ') || trimmed.includes('int main') || /int\s+\w+\s*\(/.test(trimmed)) {
    return 'function';
  }
  
  return 'operation';
}

// 生成代码行的简要说明
export function generateLineExplanation(line: string, lineType: LineExplanation['type']): string {
  const trimmed = line.trim();
  
  switch (lineType) {
    case 'comment':
      return '注释说明';
    case 'declaration':
      if (trimmed.includes('const')) {
        return '声明常量';
      }
      return '声明变量';
    case 'initialization':
      if (trimmed.includes('vector')) {
        return '初始化动态数组';
      }
      if (trimmed.includes('string')) {
        return '初始化字符串';
      }
      return '初始化变量';
    case 'loop':
      if (trimmed.startsWith('for')) {
        const match = trimmed.match(/for\s*\(([^)]+)\)/);
        if (match) {
          return `循环: ${match[1]}`;
        }
        return 'for循环';
      }
      if (trimmed.startsWith('while')) {
        return 'while循环';
      }
      return '循环结构';
    case 'condition':
      if (trimmed.startsWith('if')) {
        const match = trimmed.match(/if\s*\(([^)]+)\)/);
        if (match) {
          return `条件判断: ${match[1]}`;
        }
        return '条件分支';
      }
      if (trimmed.startsWith('else')) {
        return '否则分支';
      }
      return '条件判断';
    case 'io':
      if (trimmed.includes('cin')) {
        return '从标准输入读取数据';
      }
      if (trimmed.includes('cout')) {
        return '向标准输出写入数据';
      }
      if (trimmed.includes('scanf')) {
        return '格式化输入';
      }
      if (trimmed.includes('printf')) {
        return '格式化输出';
      }
      if (trimmed.includes('freopen')) {
        return '重定向文件输入输出';
      }
      return '输入输出操作';
    case 'function':
      if (trimmed.includes('main')) {
        return '程序入口函数';
      }
      const funcMatch = trimmed.match(/(\w+)\s*\(/);
      if (funcMatch) {
        return `函数定义: ${funcMatch[1]}`;
      }
      return '函数定义';
    default:
      if (trimmed.includes('return')) {
        return '返回结果';
      }
      if (trimmed.includes('sort')) {
        return '排序操作';
      }
      if (trimmed.includes('push_back') || trimmed.includes('push')) {
        return '添加元素';
      }
      if (trimmed.includes('pop_back') || trimmed.includes('pop')) {
        return '移除元素';
      }
      return '执行操作';
  }
}

// 分析代码的时间复杂度
export function analyzeComplexity(code: string): { time: string; space: string; bottlenecks: string[] } {
  const lines = code.split('\n');
  const bottlenecks: string[] = [];
  
  let maxDepth = 0;
  let currentDepth = 0;
  let hasRecursive = false;
  let recursiveDepth = '';
  
  // 检测循环嵌套深度
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('for') || line.startsWith('while')) {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
      
      // 检测循环变量范围
      const forMatch = line.match(/for\s*\([^;]*;\s*([^;]+);/);
      if (forMatch) {
        bottlenecks.push(`第${i + 1}行: 循环 - ${forMatch[1]}`);
      }
    }
    
    if (line.includes('}') && currentDepth > 0) {
      currentDepth--;
    }
    
    // 检测递归
    const funcMatch = line.match(/(\w+)\s*\([^)]*\)\s*\{/);
    if (funcMatch) {
      const funcName = funcMatch[1];
      // 检查后续代码是否调用自己
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].includes(funcName + '(') && !lines[j].includes(funcMatch[0])) {
          hasRecursive = true;
          recursiveDepth = funcName;
          bottlenecks.push(`递归调用: ${funcName}`);
          break;
        }
      }
    }
    
    // 检测 STL 算法
    if (line.includes('sort(')) {
      bottlenecks.push(`第${i + 1}行: sort 排序 - O(n log n)`);
    }
    if (line.includes('lower_bound') || line.includes('upper_bound')) {
      bottlenecks.push(`第${i + 1}行: 二分查找 - O(log n)`);
    }
  }
  
  // 计算复杂度
  let timeComplexity = 'O(1)';
  if (hasRecursive) {
    timeComplexity = '递归复杂度需进一步分析';
  } else if (maxDepth >= 3) {
    timeComplexity = `O(n^${maxDepth}) 或更高`;
  } else if (maxDepth === 2) {
    timeComplexity = 'O(n²)';
  } else if (maxDepth === 1) {
    timeComplexity = 'O(n)';
  }
  
  // 检测空间复杂度
  let spaceComplexity = 'O(1)';
  const arrayMatch = code.match(/(\w+)\s*\[\s*(\d+)\s*\]/g);
  if (arrayMatch) {
    const sizes = arrayMatch.map(m => {
      const num = m.match(/\d+/);
      return num ? parseInt(num[0]) : 0;
    });
    const maxSize = Math.max(...sizes);
    if (maxSize > 1000000) {
      spaceComplexity = 'O(n) - 大数组';
    } else if (maxSize > 100000) {
      spaceComplexity = 'O(n)';
    }
  }
  
  if (code.includes('vector') || code.includes('map') || code.includes('set')) {
    spaceComplexity = 'O(n) - 动态容器';
  }
  
  return { time: timeComplexity, space: spaceComplexity, bottlenecks };
}

// 分析代码结构并提取关键信息
export function analyzeCodeStructure(code: string): {
  functions: string[];
  loops: { type: string; line: number }[];
  conditions: { type: string; line: number }[];
  variables: string[];
} {
  const lines = code.split('\n');
  const functions: string[] = [];
  const loops: { type: string; line: number }[] = [];
  const conditions: { type: string; line: number }[] = [];
  const variables: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 检测函数
    const funcMatch = line.match(/(?:int|void|long long|double|float|char|string)\s+(\w+)\s*\(/);
    if (funcMatch && !CPP_KEYWORDS.has(funcMatch[1])) {
      functions.push(funcMatch[1]);
    }
    
    // 检测循环
    if (line.startsWith('for')) {
      loops.push({ type: 'for', line: i + 1 });
    } else if (line.startsWith('while')) {
      loops.push({ type: 'while', line: i + 1 });
    } else if (line.startsWith('do')) {
      loops.push({ type: 'do-while', line: i + 1 });
    }
    
    // 检测条件
    if (line.startsWith('if')) {
      conditions.push({ type: 'if', line: i + 1 });
    } else if (line.startsWith('else if')) {
      conditions.push({ type: 'else if', line: i + 1 });
    } else if (line.startsWith('switch')) {
      conditions.push({ type: 'switch', line: i + 1 });
    }
    
    // 检测变量声明
    const varMatch = line.match(/(?:int|long long|double|float|char|string|bool)\s+(\w+)/);
    if (varMatch && !CPP_KEYWORDS.has(varMatch[1])) {
      variables.push(varMatch[1]);
    }
  }
  
  return { functions, loops, conditions, variables };
}

// 生成代码的逐行解释
export function generateLineExplanations(code: string): LineExplanation[] {
  const lines = code.split('\n');
  const explanations: LineExplanation[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineType = analyzeLineType(line);
    const explanation = generateLineExplanation(line, lineType);
    
    explanations.push({
      lineNumber: i + 1,
      code: line,
      explanation,
      type: lineType,
    });
  }
  
  return explanations;
}

// 简单的流程图生成（基于代码结构）
export function generateFlowChart(code: string): FlowChart {
  const nodes: FlowChartNode[] = [];
  const edges: { from: string; to: string; label?: string }[] = [];
  
  const lines = code.split('\n');
  let nodeId = 0;
  
  // 添加开始节点
  nodes.push({ id: 'start', type: 'start', content: '开始' });
  let prevId = 'start';
  
  // 简化处理：遍历代码，生成主要节点
  let depth = 0;
  const stack: string[] = ['start'];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === '{' || line === '}') continue;
    
    const lineType = analyzeLineType(line);
    const id = `node_${nodeId++}`;
    
    if (lineType === 'condition') {
      nodes.push({
        id,
        type: 'decision',
        content: line.replace(/[{}]/g, '').trim(),
      });
      edges.push({ from: stack[stack.length - 1], to: id });
      stack.push(id);
    } else if (lineType === 'loop') {
      nodes.push({
        id,
        type: 'decision',
        content: line.replace(/[{}]/g, '').trim(),
      });
      edges.push({ from: stack[stack.length - 1], to: id });
      stack.push(id);
    } else if (lineType === 'io') {
      nodes.push({
        id,
        type: 'io',
        content: line.replace(/[{};]/g, '').trim(),
      });
      edges.push({ from: stack[stack.length - 1], to: id });
      stack[stack.length - 1] = id;
    } else if (lineType === 'function' && line.includes('main')) {
      nodes.push({
        id,
        type: 'subprocess',
        content: '主程序',
      });
      edges.push({ from: stack[stack.length - 1], to: id });
      stack[stack.length - 1] = id;
    } else if (lineType === 'operation') {
      const content = line.replace(/[{};]/g, '').trim();
      if (content.length > 50) {
        nodes.push({
          id,
          type: 'process',
          content: content.substring(0, 47) + '...',
        });
      } else if (content) {
        nodes.push({
          id,
          type: 'process',
          content,
        });
      }
      if (content) {
        edges.push({ from: stack[stack.length - 1], to: id });
        stack[stack.length - 1] = id;
      }
    }
  }
  
  // 添加结束节点
  const endId = 'end';
  nodes.push({ id: endId, type: 'end', content: '结束' });
  edges.push({ from: stack[stack.length - 1], to: endId });
  
  return { nodes, edges };
}

// 检测需要的头文件
export function detectRequiredHeaders(code: string): string[] {
  const headers: string[] = [];
  
  if (code.includes('cin') || code.includes('cout')) {
    headers.push('#include <iostream>');
  }
  if (code.includes('scanf') || code.includes('printf') || code.includes('freopen')) {
    headers.push('#include <cstdio>');
  }
  if (code.includes('sort') || code.includes('lower_bound') || code.includes('upper_bound') ||
      code.includes('min') || code.includes('max') || code.includes('swap') ||
      code.includes('reverse') || code.includes('unique')) {
    headers.push('#include <algorithm>');
  }
  if (code.includes('vector')) {
    headers.push('#include <vector>');
  }
  if (code.includes('string') && !code.includes('cstring')) {
    headers.push('#include <string>');
  }
  if (code.includes('queue') || code.includes('priority_queue')) {
    headers.push('#include <queue>');
  }
  if (code.includes('stack')) {
    headers.push('#include <stack>');
  }
  if (code.includes('map') && !code.includes('unordered_map')) {
    headers.push('#include <map>');
  }
  if (code.includes('set') && !code.includes('unordered_set')) {
    headers.push('#include <set>');
  }
  if (code.includes('unordered_map')) {
    headers.push('#include <unordered_map>');
  }
  if (code.includes('unordered_set')) {
    headers.push('#include <unordered_set>');
  }
  if (code.includes('memset') || code.includes('memcpy') || code.includes('strlen')) {
    headers.push('#include <cstring>');
  }
  if (code.includes('sqrt') || code.includes('pow') || code.includes('abs') ||
      code.includes('sin') || code.includes('cos') || code.includes('tan')) {
    headers.push('#include <cmath>');
  }
  if (code.includes('bitset')) {
    headers.push('#include <bitset>');
  }
  
  return headers;
}

// 检测可能缺失的头文件
export function detectMissingHeaders(code: string): { required: string[]; missing: string[] } {
  const required = detectRequiredHeaders(code);
  const existingHeaders = new Set<string>();
  
  const includePattern = /#include\s*[<"]([^>"]+)[>"]/g;
  let match;
  while ((match = includePattern.exec(code)) !== null) {
    existingHeaders.add(`#include <${match[1]}>`);
  }
  
  const missing = required.filter(h => !existingHeaders.has(h));
  
  return { required, missing };
}

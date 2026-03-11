/**
 * 智能错误诊断系统
 * 分析代码错误，提供具体调试方向
 */

// 错误类型枚举
export type ErrorType = 
  | 'WA'        // 答案错误
  | 'TLE'       // 超时
  | 'MLE'       // 超内存
  | 'RE'        // 运行时错误
  | 'CE'        // 编译错误
  | 'PE';       // 格式错误

// 输出差异
export interface OutputDiff {
  line: number;           // 差异所在行
  column: number;         // 差异所在列
  expected: string;       // 期望内容
  actual: string;         // 实际内容
  type: 'char' | 'line' | 'extra' | 'missing';
  message: string;        // 差异描述
}

// 错误模式
export interface ErrorPattern {
  type: string;           // 错误类型
  name: string;           // 错误名称
  description: string;    // 错误描述
  possibleCauses: string[];  // 可能原因
  suggestions: string[];  // 修复建议
  severity: 'high' | 'medium' | 'low';
  icon: string;
}

// 时间复杂度分析
export interface ComplexityAnalysis {
  estimatedComplexity: string;  // 估算的时间复杂度
  expectedComplexity: string;   // 期望的时间复杂度
  operations: number;           // 预估操作次数
  bottleneck: string;           // 瓶颈描述
  suggestions: string[];        // 优化建议
}

// 错误诊断结果
export interface ErrorDiagnosis {
  errorType: ErrorType;
  summary: string;              // 错误摘要
  diffs?: OutputDiff[];         // 输出差异
  patterns?: ErrorPattern[];    // 检测到的错误模式
  complexity?: ComplexityAnalysis;  // 时间复杂度分析
  debugSteps: string[];         // 调试步骤
  relatedConcepts: string[];    // 相关知识点
}

// ================== 输出对比功能 ==================

/**
 * 对比期望输出和实际输出，找出差异
 */
export function compareOutputs(
  expected: string,
  actual: string
): OutputDiff[] {
  const diffs: OutputDiff[] = [];
  
  // 标准化换行符
  const expectedLines = expected.replace(/\r\n/g, '\n').split('\n');
  const actualLines = actual.replace(/\r\n/g, '\n').split('\n');
  
  const maxLines = Math.max(expectedLines.length, actualLines.length);
  
  // 检查行数差异
  if (expectedLines.length !== actualLines.length) {
    diffs.push({
      line: Math.min(expectedLines.length, actualLines.length) + 1,
      column: 1,
      expected: expectedLines.length > actualLines.length ? '...' : '',
      actual: actualLines.length > expectedLines.length ? '...' : '',
      type: expectedLines.length > actualLines.length ? 'missing' : 'extra',
      message: expectedLines.length > actualLines.length 
        ? `缺少 ${expectedLines.length - actualLines.length} 行输出`
        : `多出 ${actualLines.length - expectedLines.length} 行输出`,
    });
  }
  
  // 逐行对比
  for (let i = 0; i < Math.min(expectedLines.length, actualLines.length); i++) {
    const expectedLine = expectedLines[i];
    const actualLine = actualLines[i];
    
    if (expectedLine !== actualLine) {
      // 找出第一个差异字符
      const diffCol = findFirstDiff(expectedLine, actualLine);
      
      diffs.push({
        line: i + 1,
        column: diffCol + 1,
        expected: expectedLine.substring(diffCol, diffCol + 20),
        actual: actualLine.substring(diffCol, diffCol + 20),
        type: 'char',
        message: `第 ${i + 1} 行，第 ${diffCol + 1} 列处内容不匹配`,
      });
    }
  }
  
  return diffs;
}

/**
 * 找出两个字符串第一个不同的位置
 */
function findFirstDiff(a: string, b: string): number {
  const minLen = Math.min(a.length, b.length);
  for (let i = 0; i < minLen; i++) {
    if (a[i] !== b[i]) return i;
  }
  return minLen;
}

/**
 * 检查格式错误（多余空格、换行等）
 */
export function checkFormatErrors(
  expected: string,
  actual: string
): ErrorPattern[] {
  const patterns: ErrorPattern[] = [];
  
  // 检查尾随空格
  const expectedLines = expected.trimEnd().split('\n');
  const actualLines = actual.split('\n');
  
  for (let i = 0; i < actualLines.length; i++) {
    const line = actualLines[i];
    const trimmedLine = line.trimEnd();
    if (line !== trimmedLine && i < expectedLines.length) {
      patterns.push({
        type: 'trailing-space',
        name: '尾随空格',
        description: `第 ${i + 1} 行末尾有多余的空格`,
        possibleCauses: ['输出时添加了额外空格', '字符串拼接问题'],
        suggestions: ['检查输出语句末尾是否有多余空格', '使用 trim() 或精确控制输出格式'],
        severity: 'low',
        icon: '⚠️',
      });
      break;
    }
  }
  
  // 检查末尾换行
  if (!actual.endsWith('\n') && expected.endsWith('\n')) {
    patterns.push({
      type: 'missing-newline',
      name: '缺少末尾换行',
      description: '输出末尾缺少换行符',
      possibleCauses: ['最后一行输出后没有换行'],
      suggestions: ['确保每行输出后都有换行符', '使用 endl 或 "\\n"'],
      severity: 'low',
      icon: '📝',
    });
  }
  
  if (actual.endsWith('\n\n') && !expected.endsWith('\n\n')) {
    patterns.push({
      type: 'extra-newline',
      name: '多余换行',
      description: '输出末尾有多余的空行',
      possibleCauses: ['循环输出多了一次', '条件判断错误'],
      suggestions: ['检查循环终止条件', '确保只输出必要的内容'],
      severity: 'low',
      icon: '📝',
    });
  }
  
  return patterns;
}

// ================== 常见错误模式检测 ==================

/**
 * 根据代码和输出检测常见错误模式
 */
export function detectErrorPatterns(
  code: string,
  errorType: ErrorType,
  actualOutput?: string,
  expectedOutput?: string,
  testInput?: string
): ErrorPattern[] {
  const patterns: ErrorPattern[] = [];
  
  // WA 相关模式
  if (errorType === 'WA') {
    // 检测可能的数组越界
    if (code.includes('[') && code.includes(']')) {
      const arrayAccess = code.match(/(\w+)\s*\[\s*(\w+|\d+)\s*\]/g);
      if (arrayAccess && (code.includes('n-1') || code.includes('n+1'))) {
        patterns.push({
          type: 'potential-array-overflow',
          name: '可能的数组越界',
          description: '检测到可能存在数组访问越界的风险',
          possibleCauses: [
            '数组下标从 0 开始，但循环从 1 开始',
            '访问了 a[n] 而应该是 a[n-1]',
            '没有正确处理边界情况',
          ],
          suggestions: [
            '检查所有数组访问，确保下标在有效范围内',
            '数组开大一些（比如多开10个元素）',
            '特别注意循环的边界条件',
          ],
          severity: 'high',
          icon: '🔴',
        });
      }
    }
    
    // 检测整数溢出
    if (code.includes('int ') && !code.includes('long long')) {
      const hasLargeNumber = code.match(/\d{10,}/) || 
        (code.includes('*') && code.includes('*'));
      if (hasLargeNumber) {
        patterns.push({
          type: 'integer-overflow',
          name: '可能的整数溢出',
          description: '使用 int 类型存储可能超出范围的数值',
          possibleCauses: [
            'int 范围约为 2.1×10^9，超过会溢出',
            '大数相乘结果超出 int 范围',
            '累加结果超出 int 范围',
          ],
          suggestions: [
            '使用 long long 代替 int',
            '注意中间计算结果也可能溢出',
            '取模运算时注意溢出问题',
          ],
          severity: 'high',
          icon: '🔴',
        });
      }
    }
    
    // 检测边界条件问题
    if (testInput) {
      const inputLines = testInput.trim().split('\n');
      const hasZeroOrOne = inputLines.some(line => 
        line.trim() === '0' || line.trim() === '1'
      );
      if (hasZeroOrOne) {
        patterns.push({
          type: 'boundary-condition',
          name: '边界条件问题',
          description: '输入包含 0 或 1 等边界值，可能未正确处理',
          possibleCauses: [
            '循环条件 i <= n 改为 i < n',
            '忘记处理 n=0 或 n=1 的特殊情况',
            '数组下标从 1 开始时访问了 a[0]',
          ],
          suggestions: [
            '添加对 n=0, n=1 的特殊处理',
            '检查所有循环边界',
            '确保数组下标正确',
          ],
          severity: 'medium',
          icon: '🟡',
        });
      }
    }
    
    // 检测变量初始化问题
    if (code.includes('int ') && !code.includes('= 0') && !code.includes('=0')) {
      const uninitializedVars = code.match(/int\s+(\w+)\s*;/g);
      if (uninitializedVars) {
        patterns.push({
          type: 'uninitialized-variable',
          name: '未初始化变量',
          description: '检测到可能未初始化的变量',
          possibleCauses: [
            '局部变量默认值不确定',
            '忘记给累加器、计数器赋初值',
            '数组未清零',
          ],
          suggestions: [
            '所有变量声明时赋初值',
            '使用 memset 清零数组',
            '全局变量会自动初始化为 0',
          ],
          severity: 'medium',
          icon: '🟡',
        });
      }
    }
  }
  
  // TLE 相关模式
  if (errorType === 'TLE') {
    // 检测递归
    if (code.includes('return') && code.match(/\w+\s*\([^)]*\)/)) {
      patterns.push({
        type: 'inefficient-recursion',
        name: '低效递归',
        description: '检测到递归调用，可能导致超时',
        possibleCauses: [
          '递归没有记忆化，大量重复计算',
          '递归深度过大导致栈溢出',
          '递归效率远低于迭代',
        ],
        suggestions: [
          '添加记忆化（缓存已计算结果）',
          '改用迭代方式实现',
          '使用动态规划优化',
        ],
        severity: 'high',
        icon: '⏱️',
      });
    }
    
    // 检测嵌套循环
    const loopCount = (code.match(/for\s*\(/g) || []).length + 
                       (code.match(/while\s*\(/g) || []).length;
    if (loopCount >= 2) {
      patterns.push({
        type: 'nested-loops',
        name: '嵌套循环',
        description: `检测到 ${loopCount} 层循环嵌套，可能导致超时`,
        possibleCauses: [
          '时间复杂度过高（如 O(n²)、O(n³)）',
          '内层循环范围过大',
          '可以使用更高效的算法或数据结构',
        ],
        suggestions: [
          '优化算法，降低时间复杂度',
          '考虑使用二分查找、前缀和等技巧',
          '使用 set、map 等高效数据结构',
        ],
        severity: 'high',
        icon: '⏱️',
      });
    }
    
    // 检测 cin/cout 效率问题
    if (code.includes('cin') || code.includes('cout')) {
      if (!code.includes('ios::sync_with_stdio')) {
        patterns.push({
          type: 'slow-io',
          name: 'IO效率问题',
          description: '使用 cin/cout 但未关闭同步，可能导致超时',
          possibleCauses: [
            'cin/cout 默认与 stdio 同步，效率较低',
            '大量数据输入输出时成为瓶颈',
          ],
          suggestions: [
            '添加 ios::sync_with_stdio(false); cin.tie(0);',
            '或者改用 scanf/printf',
            '大规模数据时考虑快读',
          ],
          severity: 'medium',
          icon: '⏱️',
        });
      }
    }
  }
  
  // RE 相关模式
  if (errorType === 'RE') {
    patterns.push({
      type: 'runtime-error',
      name: '运行时错误',
      description: '程序运行时崩溃',
      possibleCauses: [
        '数组越界访问',
        '除以零',
        '空指针访问',
        '递归栈溢出',
        '内存分配失败',
      ],
      suggestions: [
        '检查所有数组访问是否越界',
        '确保除法运算的除数不为零',
        '增大数组大小',
        '检查递归深度',
      ],
      severity: 'high',
      icon: '💥',
    });
  }
  
  // MLE 相关模式
  if (errorType === 'MLE') {
    patterns.push({
      type: 'memory-exceeded',
      name: '内存超限',
      description: '程序使用了过多内存',
      possibleCauses: [
        '数组开得太大',
        '动态分配的内存未释放',
        '递归层数过深',
        '存储了不必要的数据',
      ],
      suggestions: [
        '减小数组大小，只开必要的空间',
        '使用滚动数组优化空间',
        '及时释放不再使用的内存',
        '使用更节省空间的数据结构',
      ],
      severity: 'high',
      icon: '💾',
    });
  }
  
  // CE 相关模式
  if (errorType === 'CE') {
    patterns.push({
      type: 'compile-error',
      name: '编译错误',
      description: '代码无法通过编译',
      possibleCauses: [
        '语法错误（缺少分号、括号不匹配等）',
        '变量/函数未定义',
        '类型不匹配',
        '头文件缺失',
      ],
      suggestions: [
        '仔细阅读编译器的错误提示',
        '检查错误行附近的代码',
        '确保所有变量都已声明',
        '添加必要的头文件',
      ],
      severity: 'high',
      icon: '❌',
    });
  }
  
  return patterns;
}

// ================== 时间复杂度分析 ==================

/**
 * 估算代码的时间复杂度
 */
export function estimateComplexity(
  code: string,
  inputSize: number
): ComplexityAnalysis {
  // 统计循环层数
  const forLoops = (code.match(/for\s*\(/g) || []).length;
  const whileLoops = (code.match(/while\s*\(/g) || []).length;
  const totalLoops = forLoops + whileLoops;
  
  // 检测递归
  const hasRecursion = /(\w+)\s*\([^)]*\w+[^)]*\)/.test(code) && 
                       code.includes('return');
  
  // 检测二分查找
  const hasBinarySearch = code.includes('>> 1') || code.includes('/2');
  
  // 检测排序
  const hasSort = code.includes('sort(') || code.includes('qsort(');
  
  let estimatedComplexity = 'O(1)';
  let operations = 1;
  let bottleneck = '无循环';
  
  if (hasRecursion) {
    // 递归复杂度估算
    if (code.includes('fib') || code.split('return').length > 3) {
      estimatedComplexity = 'O(2^n)';
      operations = Math.pow(2, Math.min(inputSize, 20));
      bottleneck = '指数级递归（无记忆化）';
    } else {
      estimatedComplexity = 'O(n)';
      operations = inputSize;
      bottleneck = '线性递归';
    }
  } else if (totalLoops >= 3) {
    estimatedComplexity = 'O(n³)';
    operations = Math.pow(inputSize, 3);
    bottleneck = '三重嵌套循环';
  } else if (totalLoops >= 2) {
    if (hasBinarySearch) {
      estimatedComplexity = 'O(n log n)';
      operations = inputSize * Math.log2(inputSize);
      bottleneck = '嵌套循环 + 二分';
    } else {
      estimatedComplexity = 'O(n²)';
      operations = inputSize * inputSize;
      bottleneck = '双重嵌套循环';
    }
  } else if (totalLoops === 1) {
    if (hasBinarySearch) {
      estimatedComplexity = 'O(log n)';
      operations = Math.log2(inputSize);
      bottleneck = '二分查找';
    } else if (hasSort) {
      estimatedComplexity = 'O(n log n)';
      operations = inputSize * Math.log2(inputSize);
      bottleneck = '排序';
    } else {
      estimatedComplexity = 'O(n)';
      operations = inputSize;
      bottleneck = '单层循环';
    }
  }
  
  // 根据数据规模判断期望复杂度
  let expectedComplexity = 'O(n)';
  if (inputSize >= 1000000) {
    expectedComplexity = 'O(n) 或 O(n log n)';
  } else if (inputSize >= 10000) {
    expectedComplexity = 'O(n log n) 或 O(n²)';
  } else if (inputSize >= 100) {
    expectedComplexity = 'O(n²) 或 O(n³)';
  }
  
  // 生成优化建议
  const suggestions: string[] = [];
  
  if (operations > 1e8) {
    suggestions.push('当前复杂度可能导致超时，需要优化算法');
    suggestions.push('考虑使用更高效的数据结构（set、map）');
    suggestions.push('尝试降低一维循环复杂度');
  }
  
  if (hasRecursion && estimatedComplexity.includes('2^n')) {
    suggestions.push('递归效率低下，添加记忆化或改用迭代');
  }
  
  if (totalLoops >= 2 && !hasBinarySearch) {
    suggestions.push('嵌套循环可能导致超时，尝试优化');
    suggestions.push('考虑前缀和、差分等优化技巧');
  }
  
  return {
    estimatedComplexity,
    expectedComplexity,
    operations: Math.round(operations),
    bottleneck,
    suggestions,
  };
}

// ================== 综合诊断 ==================

/**
 * 生成完整的错误诊断报告
 */
export function diagnoseError(
  errorType: ErrorType,
  code: string,
  actualOutput?: string,
  expectedOutput?: string,
  testInput?: string,
  inputSize?: number
): ErrorDiagnosis {
  const patterns = detectErrorPatterns(
    code,
    errorType,
    actualOutput,
    expectedOutput,
    testInput
  );
  
  let diffs: OutputDiff[] | undefined;
  let complexity: ComplexityAnalysis | undefined;
  let summary = '';
  const debugSteps: string[] = [];
  const relatedConcepts: string[] = [];
  
  switch (errorType) {
    case 'WA':
      if (actualOutput && expectedOutput) {
        diffs = compareOutputs(expectedOutput, actualOutput);
        const formatErrors = checkFormatErrors(expectedOutput, actualOutput);
        patterns.push(...formatErrors);
        
        if (diffs.length > 0) {
          summary = `答案错误：发现 ${diffs.length} 处输出差异`;
        } else {
          summary = '答案错误：输出与期望不匹配';
        }
      }
      debugSteps.push(
        '1. 对比期望输出和实际输出的第一处差异',
        '2. 追踪代码逻辑，找出产生该输出的位置',
        '3. 检查边界条件是否正确处理',
        '4. 验证算法逻辑是否符合题目要求'
      );
      relatedConcepts.push('调试技巧', '边界条件', '输出格式');
      break;
      
    case 'TLE':
      complexity = estimateComplexity(code, inputSize || 1000);
      summary = `超时：预估操作次数 ${complexity.operations.toLocaleString()}，瓶颈在 ${complexity.bottleneck}`;
      debugSteps.push(
        '1. 分析时间复杂度是否满足要求',
        '2. 检查是否存在不必要的重复计算',
        '3. 考虑使用更高效的算法或数据结构',
        '4. 优化 I/O 效率（关闭同步或使用快读）'
      );
      relatedConcepts.push('时间复杂度', '算法优化', '数据结构');
      break;
      
    case 'MLE':
      summary = '内存超限：程序使用了过多内存';
      debugSteps.push(
        '1. 检查数组大小是否合理',
        '2. 考虑使用滚动数组优化空间',
        '3. 释放不再使用的内存',
        '4. 使用更节省空间的数据表示'
      );
      relatedConcepts.push('空间复杂度', '内存管理', '数据结构');
      break;
      
    case 'RE':
      summary = '运行时错误：程序异常终止';
      debugSteps.push(
        '1. 检查数组访问是否越界',
        '2. 确保除法运算的除数不为零',
        '3. 检查递归深度是否过大',
        '4. 验证所有指针操作的安全性'
      );
      relatedConcepts.push('数组越界', '异常处理', '调试技巧');
      break;
      
    case 'CE':
      summary = '编译错误：代码无法通过编译';
      debugSteps.push(
        '1. 查看编译器的详细错误信息',
        '2. 检查错误行附近的语法',
        '3. 确保所有变量都已正确声明',
        '4. 检查头文件是否完整'
      );
      relatedConcepts.push('语法基础', '编译原理');
      break;
      
    case 'PE':
      summary = '格式错误：输出格式不符合要求';
      if (actualOutput && expectedOutput) {
        const formatErrors = checkFormatErrors(expectedOutput, actualOutput);
        patterns.push(...formatErrors);
      }
      debugSteps.push(
        '1. 检查是否有额外的空格或换行',
        '2. 确保输出格式与题目要求完全一致',
        '3. 注意特殊字符和空白字符',
        '4. 使用文本对比工具辅助检查'
      );
      relatedConcepts.push('输出格式', '字符串处理');
      break;
  }
  
  return {
    errorType,
    summary,
    diffs,
    patterns,
    complexity,
    debugSteps,
    relatedConcepts,
  };
}

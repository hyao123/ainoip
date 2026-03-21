// 问题分析与推荐系统

import { problems, type Problem, type DifficultyLevel } from './problems';

// 用户水平评估
export interface UserLevel {
  overall: number; // 1-10级
  categories: Record<string, number>; // 各分类水平
  solvedCount: number;
  accuracy: number;
  streak: number;
  weakAreas: string[];
  strongAreas: string[];
}

// 推荐题目
export interface RecommendedProblem {
  problem: Problem;
  reason: string;
  priority: number; // 1-10 推荐优先级
  type: 'practice' | 'challenge' | 'review' | 'learn';
  estimatedDifficulty: string; // 对用户的预估难度
}

// 题目分析结果
export interface ProblemAnalysis {
  problemId: number;
  difficulty: {
    overall: number; // 1-10
    algorithmComplexity: number; // 算法复杂度
    implementationComplexity: number; // 实现复杂度
    edgeCases: number; // 边界情况复杂度
  };
  requiredSkills: string[];
  relatedConcepts: string[];
  timeEstimate: number; // 预估解题时间(分钟)
  prerequisites: number[]; // 前置题目ID
  nextProblems: number[]; // 后续推荐题目ID
}

// 分类难度配置
const CATEGORY_DIFFICULTY: Record<string, number> = {
  '基础算法': 1,
  '字符串处理': 2,
  '模拟': 2,
  '排序与查找': 2,
  '数论': 3,
  '递归与分治': 3,
  '贪心算法': 3,
  '搜索': 4,
  '数据结构': 4,
  '动态规划': 5,
  '图论': 5,
  '位运算': 3,
};

// 难度映射
const DIFFICULTY_MAP: Record<DifficultyLevel, number> = {
  beginner: 2,
  intermediate: 5,
  advanced: 7,
  expert: 9,
};

// 分析单个题目
export function analyzeProblem(problem: Problem): ProblemAnalysis {
  const baseDifficulty = DIFFICULTY_MAP[problem.difficulty];
  const categoryDifficulty = CATEGORY_DIFFICULTY[problem.category] || 3;
  
  // 根据标签和分类推断所需技能
  const requiredSkills = inferRequiredSkills(problem);
  const relatedConcepts = inferRelatedConcepts(problem);
  
  // 计算各维度难度
  const algorithmComplexity = baseDifficulty + (categoryDifficulty - 3) * 0.5;
  const implementationComplexity = inferImplementationComplexity(problem);
  const edgeCases = inferEdgeCaseComplexity(problem);
  
  // 计算整体难度
  const overall = Math.round((algorithmComplexity + implementationComplexity + edgeCases) / 3);
  
  // 预估解题时间
  const timeEstimate = estimateSolveTime(problem, overall);
  
  // 推断前置和后续题目
  const prerequisites = findPrerequisites(problem);
  const nextProblems = findNextProblems(problem);

  return {
    problemId: problem.id,
    difficulty: {
      overall: Math.min(10, Math.max(1, overall)),
      algorithmComplexity: Math.min(10, Math.max(1, Math.round(algorithmComplexity))),
      implementationComplexity: Math.min(10, Math.max(1, Math.round(implementationComplexity))),
      edgeCases: Math.min(10, Math.max(1, Math.round(edgeCases))),
    },
    requiredSkills,
    relatedConcepts,
    timeEstimate,
    prerequisites,
    nextProblems,
  };
}

// 推断所需技能
function inferRequiredSkills(problem: Problem): string[] {
  const skills: string[] = [];
  const tags = problem.tags;
  const category = problem.category;
  
  // 基于标签
  if (tags.includes('输入输出')) skills.push('标准输入输出', '文件输入输出');
  if (tags.includes('变量')) skills.push('变量声明', '数据类型');
  if (tags.includes('循环')) skills.push('for循环', 'while循环');
  if (tags.includes('数组')) skills.push('数组声明', '数组遍历');
  if (tags.includes('字符串')) skills.push('字符串处理', '字符操作');
  if (tags.includes('递归')) skills.push('递归思维', '边界条件');
  if (tags.includes('排序')) skills.push('排序算法', '比较函数');
  if (tags.includes('二分查找')) skills.push('二分思想', '边界处理');
  if (tags.includes('动态规划')) skills.push('状态定义', '转移方程');
  if (tags.includes('搜索-DFS')) skills.push('深度优先搜索', '回溯');
  if (tags.includes('搜索-BFS')) skills.push('广度优先搜索', '队列');
  if (tags.includes('图论-最短路')) skills.push('图存储', '最短路算法');
  if (tags.includes('数论-GCD')) skills.push('欧几里得算法', '数论基础');
  
  // 基于分类
  if (!skills.length) {
    switch (category) {
      case '基础算法':
        skills.push('基础编程', '逻辑思维');
        break;
      case '模拟':
        skills.push('模拟思维', '细节处理');
        break;
      case '动态规划':
        skills.push('状态定义', '转移方程', '边界条件');
        break;
      case '图论':
        skills.push('图存储', '图遍历', '最短路/生成树');
        break;
      default:
        skills.push('问题分析', '代码实现');
    }
  }
  
  return [...new Set(skills)];
}

// 推断相关概念
function inferRelatedConcepts(problem: Problem): string[] {
  const concepts: string[] = [problem.category];
  
  // 添加标签作为概念
  concepts.push(...problem.tags);
  
  // 根据分类添加相关概念
  switch (problem.category) {
    case '动态规划':
      concepts.push('状态压缩', '区间DP', '树形DP');
      break;
    case '图论':
      concepts.push('连通性', '最短路', '生成树');
      break;
    case '数论':
      concepts.push('质数', '同余', '快速幂');
      break;
  }
  
  return [...new Set(concepts)];
}

// 推断实现复杂度
function inferImplementationComplexity(problem: Problem): number {
  let complexity = DIFFICULTY_MAP[problem.difficulty];
  
  // 根据代码模板长度判断
  const codeLength = problem.defaultCode.length;
  if (codeLength > 1000) complexity += 1;
  if (codeLength > 2000) complexity += 1;
  
  // 根据标签判断
  if (problem.tags.includes('位运算')) complexity += 0.5;
  if (problem.tags.includes('递归')) complexity += 0.5;
  
  return Math.min(10, complexity);
}

// 推断边界情况复杂度
function inferEdgeCaseComplexity(problem: Problem): number {
  let complexity = DIFFICULTY_MAP[problem.difficulty];
  
  // 根据标签判断
  if (problem.tags.includes('数组')) complexity += 0.5; // 数组越界风险
  if (problem.tags.includes('二分查找')) complexity += 1; // 边界问题
  if (problem.tags.includes('动态规划')) complexity += 0.5; // 初始化问题
  
  return Math.min(10, complexity);
}

// 预估解题时间
function estimateSolveTime(problem: Problem, difficulty: number): number {
  // 基础时间(分钟)
  const baseTime: Record<DifficultyLevel, number> = {
    beginner: 10,
    intermediate: 25,
    advanced: 45,
    expert: 90,
  };
  
  let time = baseTime[problem.difficulty];
  
  // 根据难度调整
  time *= (0.8 + difficulty * 0.04);
  
  return Math.round(time);
}

// 找前置题目
function findPrerequisites(problem: Problem): number[] {
  const prerequisites: number[] = [];
  
  // 同分类中更简单的题目
  const sameCategory = problems.filter(
    p => p.category === problem.category && DIFFICULTY_MAP[p.difficulty] < DIFFICULTY_MAP[problem.difficulty]
  );
  
  if (sameCategory.length > 0) {
    // 取最接近的两个
    const sorted = sameCategory.sort(
      (a, b) => DIFFICULTY_MAP[b.difficulty] - DIFFICULTY_MAP[a.difficulty]
    );
    prerequisites.push(...sorted.slice(0, 2).map(p => p.id));
  }
  
  // 检查标签相关的前置
  if (problem.tags.includes('动态规划') && !problem.tags.includes('递归')) {
    const recursionProblems = problems.filter(p => p.tags.includes('递归'));
    if (recursionProblems.length > 0) {
      prerequisites.push(recursionProblems[0].id);
    }
  }
  
  return [...new Set(prerequisites)];
}

// 找后续题目
function findNextProblems(problem: Problem): number[] {
  const nextProblems: number[] = [];
  
  // 同分类中更难的题目
  const sameCategory = problems.filter(
    p => p.category === problem.category && DIFFICULTY_MAP[p.difficulty] > DIFFICULTY_MAP[problem.difficulty]
  );
  
  if (sameCategory.length > 0) {
    const sorted = sameCategory.sort(
      (a, b) => DIFFICULTY_MAP[a.difficulty] - DIFFICULTY_MAP[b.difficulty]
    );
    nextProblems.push(...sorted.slice(0, 2).map(p => p.id));
  }
  
  // 相关分类的题目
  const relatedCategories = getRelatedCategories(problem.category);
  for (const cat of relatedCategories) {
    const relatedProblems = problems.filter(
      p => p.category === cat && DIFFICULTY_MAP[p.difficulty] >= DIFFICULTY_MAP[problem.difficulty]
    );
    if (relatedProblems.length > 0) {
      nextProblems.push(relatedProblems[0].id);
    }
  }
  
  return [...new Set(nextProblems)].slice(0, 4);
}

// 获取相关分类
function getRelatedCategories(category: string): string[] {
  const relations: Record<string, string[]> = {
    '基础算法': ['排序与查找', '模拟', '递归与分治'],
    '递归与分治': ['动态规划', '搜索'],
    '搜索': ['图论', '动态规划'],
    '数据结构': ['图论', '动态规划'],
    '数论': ['动态规划', '基础算法'],
    '动态规划': ['图论', '数论'],
    '图论': ['动态规划', '数据结构'],
    '字符串处理': ['动态规划', '基础算法'],
  };
  
  return relations[category] || [];
}

// 计算用户水平
export function calculateUserLevel(
  solvedProblems: Set<number>,
  submissions: Array<{ problemId: number; result: string; category: string; difficulty: string }>,
  streak: number,
  accuracy: number
): UserLevel {
  // 计算各分类水平
  const categoryStats: Record<string, { solved: number; attempted: number; totalDifficulty: number }> = {};
  
  submissions.forEach(sub => {
    if (!categoryStats[sub.category]) {
      categoryStats[sub.category] = { solved: 0, attempted: 0, totalDifficulty: 0 };
    }
    categoryStats[sub.category].attempted++;
    categoryStats[sub.category].totalDifficulty += DIFFICULTY_MAP[sub.difficulty as DifficultyLevel] || 3;
    if (sub.result === 'AC') {
      categoryStats[sub.category].solved++;
    }
  });
  
  const categories: Record<string, number> = {};
  const weakAreas: string[] = [];
  const strongAreas: string[] = [];
  
  Object.entries(categoryStats).forEach(([cat, stats]) => {
    if (stats.attempted >= 3) {
      const level = Math.round(
        (stats.solved / stats.attempted) * 5 + 
        (stats.totalDifficulty / stats.attempted) * 0.5
      );
      categories[cat] = Math.min(10, Math.max(1, level));
      
      if (level <= 3) weakAreas.push(cat);
      if (level >= 7) strongAreas.push(cat);
    }
  });
  
  // 计算整体水平
  const categoryLevels = Object.values(categories);
  const avgCategoryLevel = categoryLevels.length > 0
    ? categoryLevels.reduce((a, b) => a + b, 0) / categoryLevels.length
    : 1;
  
  const solvedBonus = Math.min(2, solvedProblems.size / 50); // 解题数量加成
  const streakBonus = Math.min(1, streak / 30); // 连续学习加成
  const accuracyBonus = accuracy >= 0.8 ? 1 : accuracy >= 0.6 ? 0.5 : 0;
  
  const overall = Math.round(avgCategoryLevel + solvedBonus + streakBonus + accuracyBonus);
  
  return {
    overall: Math.min(10, Math.max(1, overall)),
    categories,
    solvedCount: solvedProblems.size,
    accuracy,
    streak,
    weakAreas,
    strongAreas,
  };
}

// 推荐题目
export function recommendProblems(
  userLevel: UserLevel,
  solvedProblems: Set<number>,
  wrongProblems: Set<number>,
  limit: number = 10
): RecommendedProblem[] {
  const recommendations: RecommendedProblem[] = [];
  
  // 1. 复习错题 (高优先级)
  for (const problemId of wrongProblems) {
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      recommendations.push({
        problem,
        reason: '错题复习：这道题你之前做错过，建议重新练习巩固',
        priority: 10,
        type: 'review',
        estimatedDifficulty: '适中',
      });
    }
  }
  
  // 2. 练习薄弱领域
  for (const weakArea of userLevel.weakAreas) {
    const areaProblems = problems.filter(
      p => p.category === weakArea && !solvedProblems.has(p.id) && !wrongProblems.has(p.id)
    );
    
    // 选择适合用户水平的题目
    const suitableProblems = areaProblems.filter(
      p => DIFFICULTY_MAP[p.difficulty] <= userLevel.overall + 2
    );
    
    if (suitableProblems.length > 0) {
      const problem = suitableProblems[0];
      recommendations.push({
        problem,
        reason: `薄弱领域强化：${weakArea}是你的薄弱项，建议加强练习`,
        priority: 9,
        type: 'practice',
        estimatedDifficulty: DIFFICULTY_MAP[problem.difficulty] <= userLevel.overall ? '适中' : '有挑战',
      });
    }
  }
  
  // 3. 学习新知识 (中等优先级)
  const unsolvedProblems = problems.filter(
    p => !solvedProblems.has(p.id) && !wrongProblems.has(p.id)
  );
  
  // 找适合用户水平的新题目
  const suitableNewProblems = unsolvedProblems.filter(
    p => Math.abs(DIFFICULTY_MAP[p.difficulty] - userLevel.overall) <= 2
  );
  
  if (suitableNewProblems.length > 0) {
    // 优先选择未涉足的分类
    const unexploredCategories = Object.keys(CATEGORY_DIFFICULTY).filter(
      cat => !userLevel.categories[cat]
    );
    
    for (const cat of unexploredCategories.slice(0, 2)) {
      const catProblems = suitableNewProblems.filter(p => p.category === cat);
      if (catProblems.length > 0) {
        const problem = catProblems[0];
        recommendations.push({
          problem,
          reason: `新知识学习：尝试${cat}类题目，拓展知识面`,
          priority: 7,
          type: 'learn',
          estimatedDifficulty: '推荐',
        });
      }
    }
  }
  
  // 4. 挑战题目 (低优先级)
  const challengeProblems = unsolvedProblems.filter(
    p => DIFFICULTY_MAP[p.difficulty] === userLevel.overall + 2
  );
  
  if (challengeProblems.length > 0) {
    const problem = challengeProblems[Math.floor(Math.random() * challengeProblems.length)];
    recommendations.push({
      problem,
      reason: '挑战自我：试试更难的题目，突破自己的极限',
      priority: 5,
      type: 'challenge',
      estimatedDifficulty: '有挑战',
    });
  }
  
  // 5. 发挥优势领域
  for (const strongArea of userLevel.strongAreas) {
    const harderProblems = problems.filter(
      p => p.category === strongArea && 
           !solvedProblems.has(p.id) && 
           DIFFICULTY_MAP[p.difficulty] > userLevel.categories[strongArea]
    );
    
    if (harderProblems.length > 0) {
      const problem = harderProblems[0];
      recommendations.push({
        problem,
        reason: `发挥优势：${strongArea}是你的强项，挑战更难题目`,
        priority: 6,
        type: 'challenge',
        estimatedDifficulty: '有挑战',
      });
    }
  }
  
  // 去重并排序
  const seen = new Set<number>();
  const uniqueRecommendations = recommendations.filter(r => {
    if (seen.has(r.problem.id)) return false;
    seen.add(r.problem.id);
    return true;
  });
  
  return uniqueRecommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

// 获取每日推荐
export function getDailyRecommendations(
  userLevel: UserLevel,
  solvedProblems: Set<number>,
  wrongProblems: Set<number>
): {
  daily: RecommendedProblem[];
  weekly: RecommendedProblem[];
} {
  const all = recommendProblems(userLevel, solvedProblems, wrongProblems, 15);
  
  return {
    daily: all.slice(0, 3),
    weekly: all.slice(3, 10),
  };
}

// 获取题目学习路径
export function getProblemLearningPath(
  targetProblemId: number,
  solvedProblems: Set<number>
): {
  path: Problem[];
  missingPrerequisites: Problem[];
} {
  const targetProblem = problems.find(p => p.id === targetProblemId);
  if (!targetProblem) {
    return { path: [], missingPrerequisites: [] };
  }
  
  const analysis = analyzeProblem(targetProblem);
  const path: Problem[] = [];
  const missingPrerequisites: Problem[] = [];
  
  // 检查前置题目
  for (const preId of analysis.prerequisites) {
    const preProblem = problems.find(p => p.id === preId);
    if (preProblem) {
      if (!solvedProblems.has(preId)) {
        missingPrerequisites.push(preProblem);
      }
      path.push(preProblem);
    }
  }
  
  path.push(targetProblem);
  
  // 添加后续题目
  for (const nextId of analysis.nextProblems.slice(0, 2)) {
    const nextProblem = problems.find(p => p.id === nextId);
    if (nextProblem) {
      path.push(nextProblem);
    }
  }
  
  return { path, missingPrerequisites };
}

// 批量分析题目
export function analyzeAllProblems(): Map<number, ProblemAnalysis> {
  const analyses = new Map<number, ProblemAnalysis>();
  
  problems.forEach(problem => {
    analyses.set(problem.id, analyzeProblem(problem));
  });
  
  return analyses;
}

// 获取分类统计
export function getCategoryStats(solvedProblems: Set<number>): Record<string, {
  total: number;
  solved: number;
  percentage: number;
}> {
  const stats: Record<string, { total: number; solved: number; percentage: number }> = {};
  
  problems.forEach(problem => {
    if (!stats[problem.category]) {
      stats[problem.category] = { total: 0, solved: 0, percentage: 0 };
    }
    stats[problem.category].total++;
    if (solvedProblems.has(problem.id)) {
      stats[problem.category].solved++;
    }
  });
  
  Object.keys(stats).forEach(cat => {
    stats[cat].percentage = Math.round((stats[cat].solved / stats[cat].total) * 100);
  });
  
  return stats;
}

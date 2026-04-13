/**
 * 学习数据分析模块
 * 提供能力雷达图、学习曲线、时间热力图、薄弱点分析等功能
 */

import type { SubmissionRecord, WrongProblemRecord } from './user-learning-data';
import type { DifficultyLevel } from './problems';

// 分类能力数据
export interface CategoryAbility {
  category: string;
  ability: number; // 0-100
  totalProblems: number;
  solvedProblems: number;
  accuracy: number;
  averageTime: number; // 分钟
}

// 学习曲线数据点
export interface LearningCurvePoint {
  date: string;
  cumulativeSolved: number;
  dailySolved: number;
  accuracy: number;
}

// 时间热力图数据
export interface HeatmapData {
  date: string;
  hour: number;
  intensity: number; // 0-4 强度等级
}

// 薄弱点分析
export interface WeakPointAnalysis {
  category: string;
  difficulty: DifficultyLevel;
  problemCount: number;
  wrongRate: number;
  trend: 'improving' | 'stable' | 'declining';
  recommendedPractice: number;
}

// 能力雷达图数据
export interface RadarChartData {
  categories: string[];
  abilities: number[];
  maxValues: number[];
}

// 学习数据统计摘要
export interface LearningSummary {
  totalProblems: number;
  solvedProblems: number;
  accuracy: number;
  totalTime: number;
  averageTimePerProblem: number;
  strongestCategory: string;
  weakestCategory: string;
  improvementRate: number; // 最近7天 vs 前7天
  streakDays: number;
}

/**
 * 计算各分类能力值
 */
export function calculateCategoryAbilities(
  submissions: SubmissionRecord[]
): CategoryAbility[] {
  const categoryMap = new Map<string, {
    total: number;
    solved: number;
    wrong: number;
    totalTime: number;
    timeCount: number;
  }>();

  // 按分类统计
  submissions.forEach(sub => {
    const stats = categoryMap.get(sub.category) || {
      total: 0,
      solved: 0,
      wrong: 0,
      totalTime: 0,
      timeCount: 0,
    };
    stats.total++;
    if (sub.result === 'AC') {
      stats.solved++;
    } else {
      stats.wrong++;
    }
    if (sub.executionTime) {
      stats.totalTime += sub.executionTime / 1000 / 60; // 转换为分钟
      stats.timeCount++;
    }
    categoryMap.set(sub.category, stats);
  });

  // 计算能力值（综合正确率和完成度）
  const abilities: CategoryAbility[] = [];
  categoryMap.forEach((stats, category) => {
    const accuracy = stats.total > 0 ? (stats.solved / stats.total) * 100 : 0;
    const completionRate = Math.min(stats.solved / 5, 1) * 100; // 假设每类5题为基准
    const ability = accuracy * 0.7 + completionRate * 0.3;

    abilities.push({
      category,
      ability: Math.round(ability),
      totalProblems: stats.total,
      solvedProblems: stats.solved,
      accuracy: Math.round(accuracy * 10) / 10,
      averageTime: stats.timeCount > 0 
        ? Math.round(stats.totalTime / stats.timeCount * 10) / 10 
        : 0,
    });
  });

  return abilities.sort((a, b) => b.ability - a.ability);
}

/**
 * 计算学习曲线
 */
export function calculateLearningCurve(
  submissions: SubmissionRecord[],
  days: number = 30
): LearningCurvePoint[] {
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  const startDate = new Date(now - days * msPerDay);
  
  // 按日期分组
  const dailyData = new Map<string, {
    solved: number;
    total: number;
    cumulative: number;
  }>();

  // 初始化所有日期
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate.getTime() + i * msPerDay);
    const dateStr = date.toISOString().split('T')[0];
    dailyData.set(dateStr, { solved: 0, total: 0, cumulative: 0 });
  }

  // 填充数据
  let cumulativeSolved = 0;
  submissions
    .filter(sub => sub.timestamp >= startDate.getTime())
    .sort((a, b) => a.timestamp - b.timestamp)
    .forEach(sub => {
      const dateStr = new Date(sub.timestamp).toISOString().split('T')[0];
      const dayData = dailyData.get(dateStr);
      if (dayData) {
        dayData.total++;
        if (sub.result === 'AC') {
          dayData.solved++;
          cumulativeSolved++;
        }
        dayData.cumulative = cumulativeSolved;
      }
    });

  // 转换为曲线数据
  const curve: LearningCurvePoint[] = [];
  dailyData.forEach((data, date) => {
    curve.push({
      date,
      cumulativeSolved: data.cumulative,
      dailySolved: data.solved,
      accuracy: data.total > 0 ? (data.solved / data.total) * 100 : 0,
    });
  });

  return curve;
}

/**
 * 生成时间热力图数据
 */
export function generateHeatmapData(
  submissions: SubmissionRecord[],
  days: number = 90
): HeatmapData[] {
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  const startDate = now - days * msPerDay;

  // 初始化热力图数据（日期 x 小时）
  const heatmap = new Map<string, Map<number, number>>();

  submissions
    .filter(sub => sub.timestamp >= startDate)
    .forEach(sub => {
      const date = new Date(sub.timestamp);
      const dateStr = date.toISOString().split('T')[0];
      const hour = date.getHours();
      const intensity = sub.result === 'AC' ? 2 : 1;

      if (!heatmap.has(dateStr)) {
        heatmap.set(dateStr, new Map());
      }
      const hourMap = heatmap.get(dateStr)!;
      hourMap.set(hour, (hourMap.get(hour) || 0) + intensity);
    });

  // 转换为数组格式
  const result: HeatmapData[] = [];
  heatmap.forEach((hourMap, date) => {
    hourMap.forEach((intensity, hour) => {
      result.push({
        date,
        hour,
        intensity: Math.min(Math.floor(intensity / 3), 4), // 0-4 强度
      });
    });
  });

  return result;
}

/**
 * 分析薄弱点
 */
export function analyzeWeakPoints(
  wrongProblems: WrongProblemRecord[],
  submissions: SubmissionRecord[],
  threshold: number = 0.4 // 40%错误率视为薄弱点
): WeakPointAnalysis[] {
  // 按分类和难度分组
  const groupStats = new Map<string, {
    total: number;
    wrong: number;
    recentWrong: number; // 最近7天
    olderWrong: number; // 7-14天前
  }>();

  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;

  wrongProblems.forEach(wp => {
    const key = `${wp.category}_${wp.difficulty}`;
    const stats = groupStats.get(key) || {
      total: 0,
      wrong: 0,
      recentWrong: 0,
      olderWrong: 0,
    };
    stats.total++;
    stats.wrong += wp.wrongCount;

    const daysAgo = (now - wp.lastWrongTime) / msPerDay;
    if (daysAgo <= 7) {
      stats.recentWrong += wp.wrongCount;
    } else if (daysAgo <= 14) {
      stats.olderWrong += wp.wrongCount;
    }

    groupStats.set(key, stats);
  });

  const weakPoints: WeakPointAnalysis[] = [];
  groupStats.forEach((stats, key) => {
    const wrongRate = stats.total > 0 ? stats.wrong / stats.total : 0;
    if (wrongRate >= threshold) {
      const [category, difficulty] = key.split('_');
      let trend: 'improving' | 'stable' | 'declining' = 'stable';
      if (stats.recentWrong < stats.olderWrong * 0.8) {
        trend = 'improving';
      } else if (stats.recentWrong > stats.olderWrong * 1.2) {
        trend = 'declining';
      }

      weakPoints.push({
        category,
        difficulty: difficulty as DifficultyLevel,
        problemCount: stats.total,
        wrongRate: Math.round(wrongRate * 100),
        trend,
        recommendedPractice: Math.ceil(stats.total * 0.3), // 建议练习30%
      });
    }
  });

  return weakPoints.sort((a, b) => b.wrongRate - a.wrongRate);
}

/**
 * 生成雷达图数据
 */
export function generateRadarChartData(
  submissions: SubmissionRecord[]
): RadarChartData {
  const abilities = calculateCategoryAbilities(submissions);
  
  // 定义主要分类（确保雷达图维度固定）
  const mainCategories = [
    '基础算法',
    '数据结构',
    '搜索',
    '动态规划',
    '字符串处理',
    '图论',
    '数论',
  ];

  const categoryAbilityMap = new Map(abilities.map(a => [a.category, a.ability]));
  
  return {
    categories: mainCategories,
    abilities: mainCategories.map(cat => categoryAbilityMap.get(cat) || 0),
    maxValues: mainCategories.map(() => 100),
  };
}

/**
 * 计算学习摘要
 */
export function calculateLearningSummary(
  submissions: SubmissionRecord[],
  streakDays: number
): LearningSummary {
  const solvedSet = new Set<string>();
  let totalTime = 0;
  
  submissions.forEach(sub => {
    if (sub.result === 'AC') {
      solvedSet.add(`${sub.problemId}`);
    }
    if (sub.executionTime) {
      totalTime += sub.executionTime;
    }
  });

  const abilities = calculateCategoryAbilities(submissions);
  const sortedByAbility = [...abilities].sort((a, b) => b.ability - a.ability);

  // 计算改进率
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  const recentSubmissions = submissions.filter(s => s.timestamp > now - 7 * msPerDay);
  const olderSubmissions = submissions.filter(s => 
    s.timestamp > now - 14 * msPerDay && s.timestamp <= now - 7 * msPerDay
  );

  const recentAccuracy = recentSubmissions.length > 0
    ? recentSubmissions.filter(s => s.result === 'AC').length / recentSubmissions.length
    : 0;
  const olderAccuracy = olderSubmissions.length > 0
    ? olderSubmissions.filter(s => s.result === 'AC').length / olderSubmissions.length
    : 0;
  const improvementRate = olderAccuracy > 0 
    ? (recentAccuracy - olderAccuracy) * 100 
    : 0;

  return {
    totalProblems: submissions.length,
    solvedProblems: solvedSet.size,
    accuracy: submissions.length > 0
      ? Math.round((solvedSet.size / submissions.length) * 100 * 10) / 10
      : 0,
    totalTime: Math.round(totalTime / 1000 / 60), // 转换为分钟
    averageTimePerProblem: solvedSet.size > 0
      ? Math.round(totalTime / solvedSet.size / 1000 / 60 * 10) / 10
      : 0,
    strongestCategory: sortedByAbility[0]?.category || '-',
    weakestCategory: sortedByAbility[sortedByAbility.length - 1]?.category || '-',
    improvementRate: Math.round(improvementRate * 10) / 10,
    streakDays,
  };
}

/**
 * 生成周报数据
 */
export function generateWeeklyReport(
  submissions: SubmissionRecord[]
): {
  week: string;
  summary: {
    solved: number;
    accuracy: number;
    timeSpent: number;
    newCategories: string[];
    difficulties: Record<DifficultyLevel, number>;
  };
  comparedToLastWeek: {
    solvedChange: number;
    accuracyChange: number;
    timeChange: number;
  };
} {
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  
  // 本周数据
  const thisWeekSubs = submissions.filter(s => 
    s.timestamp > now - 7 * msPerDay
  );
  // 上周数据
  const lastWeekSubs = submissions.filter(s => 
    s.timestamp > now - 14 * msPerDay && s.timestamp <= now - 7 * msPerDay
  );

  const weekStart = new Date(now - 6 * msPerDay).toISOString().split('T')[0];
  const weekEnd = new Date(now).toISOString().split('T')[0];

  // 本周统计
  const solvedSet = new Set<string>();
  let totalTime = 0;
  const categories = new Set<string>();
  const difficulties: Record<string, number> = { beginner: 0, intermediate: 0, advanced: 0 };

  thisWeekSubs.forEach(sub => {
    if (sub.result === 'AC') {
      solvedSet.add(`${sub.problemId}`);
    }
    if (sub.executionTime) totalTime += sub.executionTime;
    categories.add(sub.category);
    difficulties[sub.difficulty] = (difficulties[sub.difficulty] || 0) + 1;
  });

  const thisWeekSolved = solvedSet.size;
  const thisWeekAccuracy = thisWeekSubs.length > 0
    ? (thisWeekSubs.filter(s => s.result === 'AC').length / thisWeekSubs.length) * 100
    : 0;

  // 上周统计
  const lastWeekSolvedSet = new Set<string>();
  lastWeekSubs.forEach(sub => {
    if (sub.result === 'AC') {
      lastWeekSolvedSet.add(`${sub.problemId}`);
    }
  });
  const lastWeekSolved = lastWeekSolvedSet.size;
  const lastWeekAccuracy = lastWeekSubs.length > 0
    ? (lastWeekSubs.filter(s => s.result === 'AC').length / lastWeekSubs.length) * 100
    : 0;

  return {
    week: `${weekStart} ~ ${weekEnd}`,
    summary: {
      solved: thisWeekSolved,
      accuracy: Math.round(thisWeekAccuracy * 10) / 10,
      timeSpent: Math.round(totalTime / 1000 / 60),
      newCategories: Array.from(categories),
      difficulties: difficulties as Record<DifficultyLevel, number>,
    },
    comparedToLastWeek: {
      solvedChange: thisWeekSolved - lastWeekSolved,
      accuracyChange: Math.round((thisWeekAccuracy - lastWeekAccuracy) * 10) / 10,
      timeChange: 0, // 需要历史数据计算
    },
  };
}

// 练习会话追踪系统

// 会话状态
export interface PracticeSession {
  id: string;
  startTime: number;
  endTime?: number;
  problems: SessionProblem[];
  goals: SessionGoal[];
  stats: SessionStats;
  notes: string;
}

// 会话中的题目
export interface SessionProblem {
  problemId: number;
  problemTitle: string;
  startTime: number;
  endTime?: number;
  attempts: number;
  result: 'pending' | 'AC' | 'WA' | 'skipped';
  hintsUsed: number[];
  code?: string;
  notes?: string;
}

// 会话目标
export interface SessionGoal {
  id: string;
  description: string;
  target: number;
  current: number;
  type: 'problems' | 'time' | 'accuracy' | 'category';
  completed: boolean;
}

// 会话统计
export interface SessionStats {
  totalProblems: number;
  solvedProblems: number;
  skippedProblems: number;
  totalTime: number; // 分钟
  averageTimePerProblem: number;
  accuracy: number;
  pointsEarned: number;
  hintsUsed: number;
}

// 预设会话模板
export interface SessionTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: number; // 分钟，0表示不限时
  goals: Omit<SessionGoal, 'current' | 'completed'>[];
  problemFilter?: {
    categories?: string[];
    difficulties?: string[];
    tags?: string[];
  };
}

// 预设模板
export const SESSION_TEMPLATES: SessionTemplate[] = [
  {
    id: 'quick-practice',
    name: '快速练习',
    description: '在15分钟内完成3道题目',
    icon: '⚡',
    duration: 15,
    goals: [
      { id: 'g1', description: '完成3道题目', target: 3, type: 'problems' },
    ],
  },
  {
    id: 'daily-challenge',
    name: '每日挑战',
    description: '完成5道题目，正确率达到80%',
    icon: '🎯',
    duration: 0,
    goals: [
      { id: 'g1', description: '完成5道题目', target: 5, type: 'problems' },
      { id: 'g2', description: '正确率达到80%', target: 80, type: 'accuracy' },
    ],
  },
  {
    id: 'category-mastery',
    name: '分类突破',
    description: '选择一个分类，完成该分类的5道题目',
    icon: '📚',
    duration: 0,
    goals: [
      { id: 'g1', description: '完成指定分类5道题', target: 5, type: 'category' },
    ],
  },
  {
    id: 'endurance',
    name: '持久战',
    description: '60分钟内尽可能多地解题',
    icon: '💪',
    duration: 60,
    goals: [
      { id: 'g1', description: '尽可能多解题', target: 10, type: 'problems' },
    ],
  },
  {
    id: 'perfect-run',
    name: '完美通关',
    description: '连续正确解答5道题目',
    icon: '✨',
    duration: 0,
    goals: [
      { id: 'g1', description: '连续答对5题', target: 5, type: 'accuracy' },
    ],
  },
  {
    id: 'weak-area',
    name: '弱项强化',
    description: '针对薄弱领域进行专项练习',
    icon: '🔧',
    duration: 30,
    goals: [
      { id: 'g1', description: '完成薄弱分类3道题', target: 3, type: 'category' },
    ],
  },
];

const STORAGE_KEY = 'practice_sessions';

// 获取所有会话
export function getSessions(): PracticeSession[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// 保存会话
function saveSessions(sessions: PracticeSession[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

// 创建新会话
export function createSession(template?: SessionTemplate): PracticeSession {
  const session: PracticeSession = {
    id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    startTime: Date.now(),
    problems: [],
    goals: template?.goals.map(g => ({
      ...g,
      current: 0,
      completed: false,
    })) || [],
    stats: {
      totalProblems: 0,
      solvedProblems: 0,
      skippedProblems: 0,
      totalTime: 0,
      averageTimePerProblem: 0,
      accuracy: 0,
      pointsEarned: 0,
      hintsUsed: 0,
    },
    notes: '',
  };
  
  return session;
}

// 开始解题
export function startProblem(
  session: PracticeSession,
  problemId: number,
  problemTitle: string
): PracticeSession {
  const existingIndex = session.problems.findIndex(p => p.problemId === problemId);
  
  if (existingIndex === -1) {
    session.problems.push({
      problemId,
      problemTitle,
      startTime: Date.now(),
      attempts: 0,
      result: 'pending',
      hintsUsed: [],
    });
    session.stats.totalProblems++;
  } else {
    // 重新开始未完成的题目
    if (session.problems[existingIndex].result === 'pending') {
      session.problems[existingIndex].startTime = Date.now();
    }
  }
  
  return session;
}

// 提交代码
export function submitProblem(
  session: PracticeSession,
  problemId: number,
  result: 'AC' | 'WA',
  code?: string
): PracticeSession {
  const problem = session.problems.find(p => p.problemId === problemId);
  if (!problem) return session;
  
  problem.attempts++;
  problem.code = code;
  
  if (result === 'AC') {
    problem.result = 'AC';
    problem.endTime = Date.now();
    session.stats.solvedProblems++;
    session.stats.pointsEarned += calculateProblemPoints(problem);
  }
  
  // 更新目标进度
  updateGoalProgress(session);
  
  return session;
}

// 跳过题目
export function skipProblem(
  session: PracticeSession,
  problemId: number,
  reason?: string
): PracticeSession {
  const problem = session.problems.find(p => p.problemId === problemId);
  if (!problem) return session;
  
  problem.result = 'skipped';
  problem.endTime = Date.now();
  problem.notes = reason;
  session.stats.skippedProblems++;
  
  return session;
}

// 使用提示
export function useHintInSession(
  session: PracticeSession,
  problemId: number,
  hintLevel: number
): PracticeSession {
  const problem = session.problems.find(p => p.problemId === problemId);
  if (!problem) return session;
  
  if (!problem.hintsUsed.includes(hintLevel)) {
    problem.hintsUsed.push(hintLevel);
    session.stats.hintsUsed++;
  }
  
  return session;
}

// 结束会话
export function endSession(session: PracticeSession): PracticeSession {
  session.endTime = Date.now();
  
  // 计算最终统计
  const totalProblems = session.problems.length;
  const solvedProblems = session.problems.filter(p => p.result === 'AC').length;
  
  session.stats.totalTime = Math.round((session.endTime - session.startTime) / 60000);
  session.stats.accuracy = totalProblems > 0 
    ? Math.round((solvedProblems / totalProblems) * 100)
    : 0;
  session.stats.averageTimePerProblem = totalProblems > 0
    ? Math.round(session.stats.totalTime / totalProblems)
    : 0;
  
  // 标记完成的目标
  session.goals.forEach(goal => {
    goal.completed = checkGoalCompletion(goal, session);
  });
  
  // 保存会话
  const sessions = getSessions();
  sessions.push(session);
  saveSessions(sessions);
  
  return session;
}

// 更新目标进度
function updateGoalProgress(session: PracticeSession): void {
  session.goals.forEach(goal => {
    switch (goal.type) {
      case 'problems':
        goal.current = session.stats.solvedProblems;
        break;
      case 'accuracy':
        goal.current = session.stats.accuracy;
        break;
      case 'category':
        // 需要外部传入分类信息
        break;
      case 'time':
        goal.current = session.stats.totalTime;
        break;
    }
    
    goal.completed = goal.current >= goal.target;
  });
}

// 检查目标是否完成
function checkGoalCompletion(goal: SessionGoal, session: PracticeSession): boolean {
  switch (goal.type) {
    case 'problems':
      return session.stats.solvedProblems >= goal.target;
    case 'accuracy':
      return session.stats.accuracy >= goal.target;
    case 'time':
      return session.stats.totalTime >= goal.target;
    default:
      return false;
  }
}

// 计算题目得分
function calculateProblemPoints(problem: SessionProblem): number {
  let points = 100;
  
  // 根据尝试次数调整
  points -= Math.min(50, (problem.attempts - 1) * 10);
  
  // 根据提示使用调整
  points -= problem.hintsUsed.length * 15;
  
  // 根据用时调整
  const timeMinutes = problem.endTime 
    ? (problem.endTime - problem.startTime) / 60000
    : 0;
  if (timeMinutes < 5) points += 20; // 快速完成奖励
  if (timeMinutes > 30) points -= 10; // 时间过长扣分
  
  return Math.max(10, points);
}

// 获取会话统计
export function getSessionStats(days: number = 7): {
  totalSessions: number;
  totalProblems: number;
  totalSolved: number;
  averageAccuracy: number;
  totalTime: number;
  streakDays: number;
  bestDay: { date: string; solved: number } | null;
} {
  const sessions = getSessions();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  
  const recentSessions = sessions.filter(s => s.startTime >= cutoff);
  
  let totalProblems = 0;
  let totalSolved = 0;
  let totalTime = 0;
  let bestDay: { date: string; solved: number } | null = null;
  
  const dailyStats: Record<string, number> = {};
  
  recentSessions.forEach(session => {
    totalProblems += session.stats.totalProblems;
    totalSolved += session.stats.solvedProblems;
    totalTime += session.stats.totalTime;
    
    const date = new Date(session.startTime).toISOString().split('T')[0];
    dailyStats[date] = (dailyStats[date] || 0) + session.stats.solvedProblems;
  });
  
  // 找最佳日
  Object.entries(dailyStats).forEach(([date, solved]) => {
    if (!bestDay || solved > bestDay.solved) {
      bestDay = { date, solved };
    }
  });
  
  // 计算连续天数
  let streakDays = 0;
  const today = new Date().toISOString().split('T')[0];
  let checkDate = today;
  
  while (dailyStats[checkDate] !== undefined) {
    streakDays++;
    const prev = new Date(checkDate);
    prev.setDate(prev.getDate() - 1);
    checkDate = prev.toISOString().split('T')[0];
  }
  
  return {
    totalSessions: recentSessions.length,
    totalProblems,
    totalSolved,
    averageAccuracy: totalProblems > 0 
      ? Math.round((totalSolved / totalProblems) * 100)
      : 0,
    totalTime,
    streakDays,
    bestDay,
  };
}

// 获取练习热力图数据
export function getHeatmapData(year: number = new Date().getFullYear()): Array<{
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}> {
  const sessions = getSessions();
  const dailyStats: Record<string, number> = {};
  
  sessions.forEach(session => {
    const date = new Date(session.startTime).toISOString().split('T')[0];
    if (date.startsWith(year.toString())) {
      dailyStats[date] = (dailyStats[date] || 0) + session.stats.solvedProblems;
    }
  });
  
  const maxCount = Math.max(...Object.values(dailyStats), 1);
  
  return Object.entries(dailyStats).map(([date, count]) => {
    const ratio = count / maxCount;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (ratio > 0.75) level = 4;
    else if (ratio > 0.5) level = 3;
    else if (ratio > 0.25) level = 2;
    else if (ratio > 0) level = 1;
    
    return { date, count, level };
  });
}

// 清除所有会话
export function clearAllSessions(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

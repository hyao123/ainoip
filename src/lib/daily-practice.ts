/**
 * 每日一练数据管理模块
 */

import { problems, type Problem, type DifficultyLevel } from './problems';

// 每日练习记录
export interface DailyPracticeRecord {
  date: string; // YYYY-MM-DD
  problemId: number;
  problemTitle: string;
  difficulty: DifficultyLevel;
  category: string;
  completed: boolean;
  completedAt?: number;
  attempts: number;
  bestResult?: 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE' | 'PE' | 'SE';
  streakDay: number; // 第几天连续打卡
}

// 每日一练数据
export interface DailyPracticeData {
  records: DailyPracticeRecord[];
  currentStreak: number;
  maxStreak: number;
  lastPracticeDate: string | null;
  totalCompleted: number;
}

const STORAGE_KEY = 'noip_daily_practice';

// 获取默认数据
function getDefaultData(): DailyPracticeData {
  return {
    records: [],
    currentStreak: 0,
    maxStreak: 0,
    lastPracticeDate: null,
    totalCompleted: 0,
  };
}

// 获取每日一练数据
export function getDailyPracticeData(): DailyPracticeData {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...getDefaultData(), ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load daily practice data:', e);
  }
  
  return getDefaultData();
}

// 保存每日一练数据
export function saveDailyPracticeData(data: DailyPracticeData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save daily practice data:', e);
  }
}

// 获取今天的日期字符串
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// 根据用户水平推荐题目
export function recommendDailyProblem(
  solvedProblemIds: number[],
  wrongProblemIds: number[],
  currentStreak: number
): Problem {
  // 确定难度范围
  const solvedCount = solvedProblemIds.length;
  let targetDifficulty: DifficultyLevel[] = ['beginner'];
  
  if (solvedCount >= 50) {
    targetDifficulty = ['intermediate', 'advanced', 'expert'];
  } else if (solvedCount >= 20) {
    targetDifficulty = ['beginner', 'intermediate'];
  }
  
  // 优先选择错题
  const wrongProblems = problems.filter(
    p => wrongProblemIds.includes(p.id) && targetDifficulty.includes(p.difficulty)
  );
  
  if (wrongProblems.length > 0) {
    return wrongProblems[Math.floor(Math.random() * wrongProblems.length)];
  }
  
  // 选择未做过的题目
  const unsolvedProblems = problems.filter(
    p => !solvedProblemIds.includes(p.id) && targetDifficulty.includes(p.difficulty)
  );
  
  if (unsolvedProblems.length > 0) {
    return unsolvedProblems[Math.floor(Math.random() * unsolvedProblems.length)];
  }
  
  // 所有题目都做过了，随机选择
  const targetProblems = problems.filter(p => targetDifficulty.includes(p.difficulty));
  return targetProblems[Math.floor(Math.random() * targetProblems.length)];
}

// 获取今日每日一练
export function getTodayDailyPractice(): DailyPracticeRecord | null {
  const data = getDailyPracticeData();
  const today = getTodayString();
  return data.records.find(r => r.date === today) || null;
}

// 生成今日每日一练
export function generateTodayDailyPractice(
  solvedProblemIds: number[],
  wrongProblemIds: number[]
): DailyPracticeRecord {
  const data = getDailyPracticeData();
  const today = getTodayString();
  
  // 检查今天是否已有记录
  const existing = data.records.find(r => r.date === today);
  if (existing) {
    return existing;
  }
  
  // 计算连续天数
  let newStreak = 1;
  if (data.lastPracticeDate) {
    const lastDate = new Date(data.lastPracticeDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      newStreak = data.currentStreak + 1;
    } else if (diffDays === 0) {
      newStreak = data.currentStreak;
    }
  }
  
  // 推荐题目
  const problem = recommendDailyProblem(solvedProblemIds, wrongProblemIds, newStreak);
  
  // 创建新记录
  const record: DailyPracticeRecord = {
    date: today,
    problemId: problem.id,
    problemTitle: problem.title,
    difficulty: problem.difficulty,
    category: problem.category,
    completed: false,
    attempts: 0,
    streakDay: newStreak,
  };
  
  // 保存
  data.records.push(record);
  data.currentStreak = newStreak;
  data.maxStreak = Math.max(data.maxStreak, newStreak);
  data.lastPracticeDate = today;
  saveDailyPracticeData(data);
  
  return record;
}

// 更新每日一练记录
export function updateDailyPracticeRecord(
  date: string,
  updates: Partial<DailyPracticeRecord>
): void {
  const data = getDailyPracticeData();
  const index = data.records.findIndex(r => r.date === date);
  
  if (index !== -1) {
    const oldRecord = data.records[index];
    const newRecord = { ...oldRecord, ...updates };
    
    // 如果是首次完成，更新统计
    if (!oldRecord.completed && updates.completed) {
      data.totalCompleted += 1;
    }
    
    data.records[index] = newRecord;
    saveDailyPracticeData(data);
  }
}

// 获取连续打卡天数
export function getStreakInfo(): { current: number; max: number } {
  const data = getDailyPracticeData();
  return {
    current: data.currentStreak,
    max: data.maxStreak,
  };
}

// 获取最近的每日一练历史
export function getRecentDailyPractices(limit: number = 7): DailyPracticeRecord[] {
  const data = getDailyPracticeData();
  return data.records
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

// 获取每日一练统计
export function getDailyPracticeStats(): {
  totalDays: number;
  completedDays: number;
  completionRate: number;
  currentStreak: number;
  maxStreak: number;
  difficultyBreakdown: Record<DifficultyLevel, number>;
} {
  const data = getDailyPracticeData();
  
  const completedDays = data.totalCompleted;
  const totalDays = data.records.length;
  
  const difficultyBreakdown: Record<DifficultyLevel, number> = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    expert: 0,
  };
  
  data.records.filter(r => r.completed).forEach(r => {
    difficultyBreakdown[r.difficulty] += 1;
  });
  
  return {
    totalDays,
    completedDays,
    completionRate: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
    currentStreak: data.currentStreak,
    maxStreak: data.maxStreak,
    difficultyBreakdown,
  };
}

// 获取本周打卡日历
export function getWeeklyCalendar(): Array<{
  date: string;
  dayOfWeek: number;
  dayName: string;
  hasRecord: boolean;
  completed: boolean;
}> {
  const data = getDailyPracticeData();
  const today = new Date();
  const result = [];
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const record = data.records.find(r => r.date === dateStr);
    
    result.push({
      date: dateStr,
      dayOfWeek: date.getDay(),
      dayName: dayNames[date.getDay()],
      hasRecord: !!record,
      completed: record?.completed || false,
    });
  }
  
  return result;
}

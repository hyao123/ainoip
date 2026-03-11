/**
 * 用户学习数据存储模块
 * 使用localStorage持久化存储用户的学习数据
 */

// 题目提交记录
export interface SubmissionRecord {
  id: string;
  problemId: number;
  problemTitle: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  code: string;
  language: 'cpp' | 'python';
  timestamp: number;
  result: 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE' | 'PE' | 'SE';
  executionTime?: number;
  memoryUsed?: number;
  testCasesPassed: number;
  totalTestCases: number;
  passedCount: number;
  totalCount: number;
}

// 错题记录
export interface WrongProblemRecord {
  problemId: number;
  problemTitle: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  wrongCount: number;
  lastWrongTime: number;
  lastSubmission?: SubmissionRecord;
  reviewed: boolean;
  reviewedCount: number;
}

// 收藏的题目
export interface FavoriteProblem {
  problemId: number;
  problemTitle: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  addedAt: number;
  note?: string;
}

// 学习记录统计
export interface LearningStats {
  totalSubmissions: number;
  acceptedSubmissions: number;
  totalProblems: number;
  solvedProblems: number;
  streak: number;
  maxStreak: number;
  lastPracticeDate: string | null;
  dailyGoal: number;
  dailyCompleted: number;
  weeklyData: DailyStats[];
}

export interface DailyStats {
  date: string;
  submissions: number;
  accepted: number;
  timeSpent: number; // 分钟
}

// 成就定义
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'problems' | 'accuracy' | 'time' | 'special';
  requirement: number;
  progress: number;
  unlocked: boolean;
  unlockedAt?: number;
}

// 用户学习数据
export interface UserLearningData {
  submissions: SubmissionRecord[];
  wrongProblems: WrongProblemRecord[];
  favoriteProblems: FavoriteProblem[];
  stats: LearningStats;
  achievements: Achievement[];
  knowledgeProgress: Record<string, { completed: boolean; completedAt?: number }>;
  // 积分系统
  points: number;
  // 提示系统
  hintsUsedToday: number;
  lastHintResetDate: string;
  // 题目的提示使用记录
  problemHintUsage: Record<number, number[]>; // problemId -> levels used
}

// 成就定义列表
export const ACHIEVEMENTS: Omit<Achievement, 'progress' | 'unlocked' | 'unlockedAt'>[] = [
  // 连续学习成就
  { id: 'streak_3', name: '初露锋芒', description: '连续学习3天', icon: '🔥', category: 'streak', requirement: 3 },
  { id: 'streak_7', name: '坚持不懈', description: '连续学习7天', icon: '💪', category: 'streak', requirement: 7 },
  { id: 'streak_14', name: '习惯养成', description: '连续学习14天', icon: '⭐', category: 'streak', requirement: 14 },
  { id: 'streak_30', name: '月度冠军', description: '连续学习30天', icon: '🏆', category: 'streak', requirement: 30 },
  { id: 'streak_100', name: '百日达人', description: '连续学习100天', icon: '👑', category: 'streak', requirement: 100 },
  
  // 解题成就
  { id: 'problems_10', name: '新手入门', description: '解决10道题目', icon: '🌱', category: 'problems', requirement: 10 },
  { id: 'problems_50', name: '小有成就', description: '解决50道题目', icon: '🎯', category: 'problems', requirement: 50 },
  { id: 'problems_100', name: '题海战术', description: '解决100道题目', icon: '📚', category: 'problems', requirement: 100 },
  { id: 'problems_200', name: '刷题达人', description: '解决200道题目', icon: '🌟', category: 'problems', requirement: 200 },
  { id: 'problems_500', name: '算法大师', description: '解决500道题目', icon: '💎', category: 'problems', requirement: 500 },
  
  // 正确率成就
  { id: 'accuracy_80', name: '精准射手', description: '总体正确率达到80%', icon: '🎯', category: 'accuracy', requirement: 80 },
  { id: 'accuracy_90', name: '神枪手', description: '总体正确率达到90%', icon: '🎖️', category: 'accuracy', requirement: 90 },
  { id: 'accuracy_95', name: '完美主义者', description: '总体正确率达到95%', icon: '🏆', category: 'accuracy', requirement: 95 },
  
  // 特殊成就
  { id: 'first_ac', name: '初战告捷', description: '首次AC', icon: '🎉', category: 'special', requirement: 1 },
  { id: 'first_wa', name: '失败是成功之母', description: '首次WA（别灰心！）', icon: '💪', category: 'special', requirement: 1 },
  { id: 'hard_first', name: '挑战自我', description: '首次解决困难题目', icon: '⚔️', category: 'special', requirement: 1 },
  { id: 'perfect_day', name: '完美一天', description: '单日正确率100%且解题≥5道', icon: '✨', category: 'special', requirement: 1 },
  { id: 'night_owl', name: '夜猫子', description: '在深夜（00:00-06:00）提交代码', icon: '🦉', category: 'special', requirement: 1 },
  { id: 'early_bird', name: '早起鸟', description: '在清晨（06:00-08:00）提交代码', icon: '🐦', category: 'special', requirement: 1 },
  { id: 'review_master', name: '错题克星', description: '复习并解决10道错题', icon: '📖', category: 'special', requirement: 10 },
];

const STORAGE_KEY = 'noip_learning_data';

// 获取默认数据
function getDefaultData(): UserLearningData {
  return {
    submissions: [],
    wrongProblems: [],
    favoriteProblems: [],
    stats: {
      totalSubmissions: 0,
      acceptedSubmissions: 0,
      totalProblems: 0,
      solvedProblems: 0,
      streak: 0,
      maxStreak: 0,
      lastPracticeDate: null,
      dailyGoal: 5,
      dailyCompleted: 0,
      weeklyData: [],
    },
    achievements: ACHIEVEMENTS.map(a => ({
      ...a,
      progress: 0,
      unlocked: false,
    })),
    knowledgeProgress: {},
    points: 100,
    hintsUsedToday: 0,
    lastHintResetDate: new Date().toISOString().split('T')[0],
    problemHintUsage: {},
  };
}

// 获取用户学习数据
export function getUserLearningData(): UserLearningData {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as UserLearningData;
      // 确保所有字段存在
      return {
        ...getDefaultData(),
        ...data,
        stats: { ...getDefaultData().stats, ...data.stats },
        achievements: getDefaultData().achievements.map(a => {
          const existing = data.achievements?.find(e => e.id === a.id);
          return existing ? { ...a, ...existing } : a;
        }),
      };
    }
  } catch (e) {
    console.error('Failed to load learning data:', e);
  }
  
  return getDefaultData();
}

// 保存用户学习数据
export function saveUserLearningData(data: UserLearningData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save learning data:', e);
  }
}

// 添加提交记录
export function addSubmission(
  problemId: number,
  problemTitle: string,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard',
  code: string,
  language: 'cpp' | 'python',
  result: SubmissionRecord['result'],
  testCasesPassed: number,
  totalTestCases: number,
  executionTime?: number,
  memoryUsed?: number
): { newAchievements: Achievement[]; streakUpdated: boolean } {
  const data = getUserLearningData();
  
  // 创建提交记录
  const submission: SubmissionRecord = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    problemId,
    problemTitle,
    category,
    difficulty,
    code,
    language,
    timestamp: Date.now(),
    result,
    executionTime,
    memoryUsed,
    testCasesPassed,
    totalTestCases,
    passedCount: testCasesPassed,
    totalCount: totalTestCases,
  };
  
  data.submissions.push(submission);
  
  // 更新统计
  data.stats.totalSubmissions++;
  if (result === 'AC') {
    data.stats.acceptedSubmissions++;
    
    // 检查是否是新解决的题目
    const wasSolved = data.submissions.some(
      s => s.problemId === problemId && s.result === 'AC' && s.id !== submission.id
    );
    if (!wasSolved) {
      data.stats.solvedProblems++;
    }
    
    // 从错题本移除（如果存在）
    const wrongIndex = data.wrongProblems.findIndex(w => w.problemId === problemId);
    if (wrongIndex !== -1) {
      data.wrongProblems.splice(wrongIndex, 1);
    }
  } else {
    // 添加到错题本
    addWrongProblem(data, problemId, problemTitle, category, difficulty, submission);
  }
  
  // 更新连续学习天数
  const today = new Date().toISOString().split('T')[0];
  const streakUpdated = updateStreak(data, today);
  
  // 更新每日统计
  updateDailyStats(data, today, result === 'AC', executionTime || 0);
  
  // 检查成就
  const newAchievements = checkAchievements(data, submission, difficulty);
  
  saveUserLearningData(data);
  
  return { newAchievements, streakUpdated };
}

// 添加错题
function addWrongProblem(
  data: UserLearningData,
  problemId: number,
  problemTitle: string,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard',
  submission: SubmissionRecord
): void {
  const existing = data.wrongProblems.find(w => w.problemId === problemId);
  
  if (existing) {
    existing.wrongCount++;
    existing.lastWrongTime = Date.now();
    existing.lastSubmission = submission;
    existing.reviewed = false;
  } else {
    data.wrongProblems.push({
      problemId,
      problemTitle,
      category,
      difficulty,
      wrongCount: 1,
      lastWrongTime: Date.now(),
      lastSubmission: submission,
      reviewed: false,
      reviewedCount: 0,
    });
  }
}

// 更新连续学习天数
function updateStreak(data: UserLearningData, today: string): boolean {
  if (data.stats.lastPracticeDate === today) {
    return false;
  }
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (data.stats.lastPracticeDate === yesterday) {
    data.stats.streak++;
  } else if (data.stats.lastPracticeDate !== today) {
    data.stats.streak = 1;
  }
  
  data.stats.maxStreak = Math.max(data.stats.maxStreak, data.stats.streak);
  data.stats.lastPracticeDate = today;
  data.stats.dailyCompleted = 1;
  
  return true;
}

// 更新每日统计
function updateDailyStats(data: UserLearningData, date: string, accepted: boolean, timeSpent: number): void {
  let dailyStats = data.stats.weeklyData.find(d => d.date === date);
  
  if (!dailyStats) {
    dailyStats = { date, submissions: 0, accepted: 0, timeSpent: 0 };
    data.stats.weeklyData.push(dailyStats);
    
    // 只保留最近30天
    if (data.stats.weeklyData.length > 30) {
      data.stats.weeklyData = data.stats.weeklyData.slice(-30);
    }
  }
  
  dailyStats.submissions++;
  if (accepted) dailyStats.accepted++;
  dailyStats.timeSpent += Math.ceil(timeSpent / 60000); // 转换为分钟
}

// 检查成就
function checkAchievements(
  data: UserLearningData,
  submission: SubmissionRecord,
  difficulty: 'easy' | 'medium' | 'hard'
): Achievement[] {
  const newAchievements: Achievement[] = [];
  
  data.achievements.forEach(achievement => {
    if (achievement.unlocked) return;
    
    let progress = 0;
    
    switch (achievement.id) {
      // 连续学习
      case 'streak_3':
      case 'streak_7':
      case 'streak_14':
      case 'streak_30':
      case 'streak_100':
        progress = data.stats.streak;
        break;
      
      // 解题数量
      case 'problems_10':
      case 'problems_50':
      case 'problems_100':
      case 'problems_200':
      case 'problems_500':
        progress = data.stats.solvedProblems;
        break;
      
      // 正确率
      case 'accuracy_80':
      case 'accuracy_90':
      case 'accuracy_95':
        if (data.stats.totalSubmissions >= 10) {
          progress = Math.round((data.stats.acceptedSubmissions / data.stats.totalSubmissions) * 100);
        }
        break;
      
      // 特殊成就
      case 'first_ac':
        progress = submission.result === 'AC' ? 1 : 0;
        break;
      case 'first_wa':
        progress = submission.result === 'WA' ? 1 : 0;
        break;
      case 'hard_first':
        progress = submission.result === 'AC' && difficulty === 'hard' ? 1 : 0;
        break;
      case 'night_owl':
        const hour = new Date().getHours();
        progress = hour >= 0 && hour < 6 ? 1 : 0;
        break;
      case 'early_bird':
        const hour2 = new Date().getHours();
        progress = hour2 >= 6 && hour2 < 8 ? 1 : 0;
        break;
    }
    
    achievement.progress = progress;
    
    if (progress >= achievement.requirement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
      newAchievements.push(achievement);
    }
  });
  
  return newAchievements;
}

// 收藏/取消收藏题目
export function toggleFavorite(
  problemId: number,
  problemTitle: string,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard'
): boolean {
  const data = getUserLearningData();
  
  const index = data.favoriteProblems.findIndex(f => f.problemId === problemId);
  
  if (index !== -1) {
    data.favoriteProblems.splice(index, 1);
    saveUserLearningData(data);
    return false;
  } else {
    data.favoriteProblems.push({
      problemId,
      problemTitle,
      category,
      difficulty,
      addedAt: Date.now(),
    });
    saveUserLearningData(data);
    return true;
  }
}

// 检查是否已收藏
export function isFavorited(problemId: number): boolean {
  const data = getUserLearningData();
  return data.favoriteProblems.some(f => f.problemId === problemId);
}

// 标记错题已复习
export function markWrongProblemReviewed(problemId: number): void {
  const data = getUserLearningData();
  const wrong = data.wrongProblems.find(w => w.problemId === problemId);
  
  if (wrong) {
    wrong.reviewed = true;
    wrong.reviewedCount++;
    saveUserLearningData(data);
  }
}

// 更新知识点进度
export function updateKnowledgeProgress(nodeId: string, completed: boolean): void {
  const data = getUserLearningData();
  
  data.knowledgeProgress[nodeId] = {
    completed,
    completedAt: completed ? Date.now() : undefined,
  };
  
  saveUserLearningData(data);
}

// 获取已解决题目ID列表
export function getSolvedProblemIds(): Set<number> {
  const data = getUserLearningData();
  const solved = new Set<number>();
  
  data.submissions.forEach(s => {
    if (s.result === 'AC') {
      solved.add(s.problemId);
    }
  });
  
  return solved;
}

// 获取题目提交历史
export function getProblemSubmissions(problemId: number): SubmissionRecord[] {
  const data = getUserLearningData();
  return data.submissions
    .filter(s => s.problemId === problemId)
    .sort((a, b) => b.timestamp - a.timestamp);
}

// 清除所有数据
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// ================== 提示系统相关函数 ==================

// 检查并重置每日提示次数
export function checkAndResetDailyHints(data: UserLearningData): UserLearningData {
  const today = new Date().toISOString().split('T')[0];
  if (data.lastHintResetDate !== today) {
    return {
      ...data,
      hintsUsedToday: 0,
      lastHintResetDate: today,
    };
  }
  return data;
}

// 获取用户积分和提示信息
export function getUserPointsAndHints(): {
  points: number;
  hintsUsedToday: number;
  dailyHintsRemaining: number;
} {
  const data = getUserLearningData();
  const checkedData = checkAndResetDailyHints(data);
  
  if (checkedData !== data) {
    saveUserLearningData(checkedData);
  }
  
  return {
    points: checkedData.points,
    hintsUsedToday: checkedData.hintsUsedToday,
    dailyHintsRemaining: Math.max(0, 5 - checkedData.hintsUsedToday), // 每日5次免费提示
  };
}

// 使用提示
export function useHint(problemId: number, level: 1 | 2 | 3, cost: number): {
  success: boolean;
  message: string;
  points: number;
  hintsUsedToday: number;
} {
  const data = getUserLearningData();
  const checkedData = checkAndResetDailyHints(data);
  
  // 检查积分
  if (checkedData.points < cost) {
    return {
      success: false,
      message: '积分不足',
      points: checkedData.points,
      hintsUsedToday: checkedData.hintsUsedToday,
    };
  }
  
  // 检查每日次数
  if (checkedData.hintsUsedToday >= 5) {
    return {
      success: false,
      message: '今日提示次数已用完',
      points: checkedData.points,
      hintsUsedToday: checkedData.hintsUsedToday,
    };
  }
  
  // 检查是否已经使用过该级提示
  const usedLevels = checkedData.problemHintUsage[problemId] || [];
  if (usedLevels.includes(level)) {
    return {
      success: false,
      message: '已经查看过该提示',
      points: checkedData.points,
      hintsUsedToday: checkedData.hintsUsedToday,
    };
  }
  
  // 检查是否按顺序使用（必须先使用1级才能用2级）
  if (level > 1 && !usedLevels.includes((level - 1) as 1 | 2)) {
    return {
      success: false,
      message: '请先查看上一级提示',
      points: checkedData.points,
      hintsUsedToday: checkedData.hintsUsedToday,
    };
  }
  
  // 更新数据
  const newData: UserLearningData = {
    ...checkedData,
    points: checkedData.points - cost,
    hintsUsedToday: checkedData.hintsUsedToday + 1,
    problemHintUsage: {
      ...checkedData.problemHintUsage,
      [problemId]: [...usedLevels, level],
    },
  };
  
  saveUserLearningData(newData);
  
  return {
    success: true,
    message: '提示已解锁',
    points: newData.points,
    hintsUsedToday: newData.hintsUsedToday,
  };
}

// 获取题目的提示使用记录
export function getProblemHintUsage(problemId: number): number[] {
  const data = getUserLearningData();
  return data.problemHintUsage[problemId] || [];
}

// 获得积分奖励
export function addPoints(amount: number, reason: string): number {
  const data = getUserLearningData();
  const newPoints = data.points + amount;
  saveUserLearningData({
    ...data,
    points: newPoints,
  });
  return newPoints;
}

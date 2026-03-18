// 错题本数据管理

// 错题记录类型
export interface WrongAnswerRecord {
  id: string;           // 唯一ID
  problemId: number;    // 题目ID
  userCode: string;     // 用户提交的错误代码
  errorMessage?: string; // 错误信息
  submittedAt: string;  // 提交时间
  reviewedAt?: string;  // 复习时间
  status: 'wrong' | 'reviewing' | 'mastered'; // 状态
  reviewCount: number;  // 复习次数
  notes?: string;       // 用户笔记
}

// 错题统计数据
export interface WrongAnswerStats {
  totalWrong: number;       // 总错题数
  reviewing: number;        // 待复习数
  mastered: number;         // 已掌握数
  byCategory: Record<string, number>;  // 按分类统计
  byTag: Record<string, number>;       // 按标签统计
  recentWrong: WrongAnswerRecord[];    // 最近错题
}

const STORAGE_KEY = 'noip_wrong_answers';
const STATS_KEY = 'noip_wrong_stats';

// 生成唯一ID
function generateId(): string {
  return `wa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 获取所有错题
export function getAllWrongAnswers(): WrongAnswerRecord[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 保存所有错题
function saveWrongAnswers(records: WrongAnswerRecord[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// 添加错题
export function addWrongAnswer(
  problemId: number,
  userCode: string,
  errorMessage?: string
): WrongAnswerRecord {
  const records = getAllWrongAnswers();
  
  // 检查是否已存在该题目的错题记录
  const existingIndex = records.findIndex(r => r.problemId === problemId);
  
  if (existingIndex >= 0) {
    // 更新现有记录
    const existing = records[existingIndex];
    existing.userCode = userCode;
    existing.errorMessage = errorMessage;
    existing.submittedAt = new Date().toISOString();
    existing.status = 'wrong';
    existing.reviewCount = 0;
    saveWrongAnswers(records);
    return existing;
  }
  
  // 创建新记录
  const newRecord: WrongAnswerRecord = {
    id: generateId(),
    problemId,
    userCode,
    errorMessage,
    submittedAt: new Date().toISOString(),
    status: 'wrong',
    reviewCount: 0,
  };
  
  records.unshift(newRecord);
  saveWrongAnswers(records);
  return newRecord;
}

// 删除错题
export function deleteWrongAnswer(id: string): boolean {
  const records = getAllWrongAnswers();
  const index = records.findIndex(r => r.id === id);
  if (index >= 0) {
    records.splice(index, 1);
    saveWrongAnswers(records);
    return true;
  }
  return false;
}

// 更新错题状态
export function updateWrongAnswerStatus(
  id: string,
  status: 'wrong' | 'reviewing' | 'mastered',
  notes?: string
): WrongAnswerRecord | null {
  const records = getAllWrongAnswers();
  const record = records.find(r => r.id === id);
  
  if (record) {
    record.status = status;
    if (status === 'reviewing' || status === 'mastered') {
      record.reviewedAt = new Date().toISOString();
      record.reviewCount++;
    }
    if (notes !== undefined) {
      record.notes = notes;
    }
    saveWrongAnswers(records);
    return record;
  }
  return null;
}

// 更新错题笔记
export function updateWrongAnswerNotes(id: string, notes: string): WrongAnswerRecord | null {
  const records = getAllWrongAnswers();
  const record = records.find(r => r.id === id);
  
  if (record) {
    record.notes = notes;
    saveWrongAnswers(records);
    return record;
  }
  return null;
}

// 获取错题统计
export function getWrongAnswerStats(): WrongAnswerStats {
  const records = getAllWrongAnswers();
  
  const stats: WrongAnswerStats = {
    totalWrong: records.length,
    reviewing: records.filter(r => r.status === 'reviewing').length,
    mastered: records.filter(r => r.status === 'mastered').length,
    byCategory: {},
    byTag: {},
    recentWrong: records.slice(0, 10),
  };
  
  return stats;
}

// 获取待复习的错题
export function getReviewingWrongAnswers(): WrongAnswerRecord[] {
  const records = getAllWrongAnswers();
  return records.filter(r => r.status === 'wrong' || r.status === 'reviewing');
}

// 获取已掌握的错题
export function getMasteredWrongAnswers(): WrongAnswerRecord[] {
  const records = getAllWrongAnswers();
  return records.filter(r => r.status === 'mastered');
}

// 检查题目是否在错题本中
export function isProblemInWrongAnswers(problemId: number): boolean {
  const records = getAllWrongAnswers();
  return records.some(r => r.problemId === problemId);
}

// 获取题目的错题记录
export function getWrongAnswerByProblemId(problemId: number): WrongAnswerRecord | undefined {
  const records = getAllWrongAnswers();
  return records.find(r => r.problemId === problemId);
}

// 清除所有错题
export function clearAllWrongAnswers(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// 清除已掌握的错题
export function clearMasteredWrongAnswers(): number {
  const records = getAllWrongAnswers();
  const remaining = records.filter(r => r.status !== 'mastered');
  const removed = records.length - remaining.length;
  saveWrongAnswers(remaining);
  return removed;
}

// 导出错题本
export function exportWrongAnswers(): string {
  const records = getAllWrongAnswers();
  return JSON.stringify(records, null, 2);
}

// 导入错题本
export function importWrongAnswers(jsonData: string): { success: boolean; count: number; error?: string } {
  try {
    const imported = JSON.parse(jsonData) as WrongAnswerRecord[];
    if (!Array.isArray(imported)) {
      return { success: false, count: 0, error: '数据格式错误' };
    }
    
    const existing = getAllWrongAnswers();
    const existingIds = new Set(existing.map(r => r.id));
    
    let addedCount = 0;
    for (const record of imported) {
      if (!existingIds.has(record.id)) {
        existing.push(record);
        addedCount++;
      }
    }
    
    saveWrongAnswers(existing);
    return { success: true, count: addedCount };
  } catch (e) {
    return { success: false, count: 0, error: 'JSON解析错误' };
  }
}

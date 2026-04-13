/**
 * 智能推荐模块
 * 提供基于错题、遗忘曲线、目标路径的个性化推荐
 */

import type { WrongProblemRecord, SubmissionRecord } from './user-learning-data';
import type { Problem, DifficultyLevel } from './problems';
import { problems } from './problems';

// 推荐类型
export type RecommendationType = 
  | 'wrong_problem_review'  // 错题复习
  | 'forgetting_curve'      // 遗忘曲线提醒
  | 'next_level'           // 下一难度挑战
  | 'similar_problem'      // 相似题目
  | 'weakness_training'    // 薄弱点训练
  | 'daily_practice'       // 每日练习
  | 'target_path';        // 目标路径

// 推荐结果
export interface Recommendation {
  id: string;
  type: RecommendationType;
  priority: number; // 1-10, 越高越优先
  title: string;
  description: string;
  problemId?: number;
  problemTitle?: string;
  category?: string;
  difficulty?: DifficultyLevel;
  reason: string;
  estimatedTime: number; // 分钟
  benefits: string[];
}

// 遗忘曲线间隔（艾宾浩斯遗忘曲线）
const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60]; // 天数

/**
 * 基于遗忘曲线的复习推荐
 */
export function getReviewRecommendations(
  wrongProblems: WrongProblemRecord[],
  submissions: SubmissionRecord[]
): Recommendation[] {
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  const recommendations: Recommendation[] = [];

  wrongProblems.forEach(wp => {
    const daysSinceLastWrong = (now - wp.lastWrongTime) / msPerDay;
    const reviewIndex = Math.min(
      Math.floor(wp.reviewedCount),
      REVIEW_INTERVALS.length - 1
    );
    const nextReviewDay = REVIEW_INTERVALS[reviewIndex] || 30;

    // 如果到了复习时间
    if (daysSinceLastWrong >= nextReviewDay * 0.8) {
      const urgency = daysSinceLastWrong > nextReviewDay ? 'high' : 'normal';
      recommendations.push({
        id: `review_${wp.problemId}`,
        type: 'forgetting_curve',
        priority: urgency === 'high' ? 9 : 7,
        title: `复习: ${wp.problemTitle}`,
        description: `该题目已 ${Math.floor(daysSinceLastWrong)} 天未复习，建议重新练习`,
        problemId: wp.problemId,
        problemTitle: wp.problemTitle,
        category: wp.category,
        difficulty: wp.difficulty,
        reason: `遗忘曲线提醒：上次复习已过 ${Math.floor(daysSinceLastWrong)} 天`,
        estimatedTime: 15,
        benefits: [
          '巩固记忆，减少遗忘',
          '加深对知识点的理解',
          '提升长期学习效果',
        ],
      });
    }
  });

  return recommendations.sort((a, b) => b.priority - a.priority);
}

/**
 * 基于错题的专项训练推荐
 */
export function getWrongProblemRecommendations(
  wrongProblems: WrongProblemRecord[],
  limit: number = 5
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // 按错误次数和最近错误时间排序
  const sortedWrongProblems = [...wrongProblems]
    .filter(wp => !wp.reviewed || wp.reviewedCount < 3)
    .sort((a, b) => {
      // 综合考虑错误次数和最近时间
      const scoreA = a.wrongCount * 10 - (Date.now() - a.lastWrongTime) / 1000000;
      const scoreB = b.wrongCount * 10 - (Date.now() - b.lastWrongTime) / 1000000;
      return scoreB - scoreA;
    })
    .slice(0, limit);

  sortedWrongProblems.forEach((wp, index) => {
    recommendations.push({
      id: `wrong_${wp.problemId}`,
      type: 'wrong_problem_review',
      priority: 10 - index, // 优先级递减
      title: `专项训练: ${wp.problemTitle}`,
      description: `该题目已错误 ${wp.wrongCount} 次，需要加强练习`,
      problemId: wp.problemId,
      problemTitle: wp.problemTitle,
      category: wp.category,
      difficulty: wp.difficulty,
      reason: `高频错题：累计错误 ${wp.wrongCount} 次`,
      estimatedTime: 20,
      benefits: [
        '针对性突破薄弱环节',
        '加深对易错点的理解',
        '避免同类题目重复犯错',
      ],
    });
  });

  return recommendations;
}

/**
 * 基于已解决题目推荐下一难度
 */
export function getNextLevelRecommendations(
  submissions: SubmissionRecord[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // 找出已解决的问题
  const solvedProblems = new Set(
    submissions
      .filter(s => s.result === 'AC')
      .map(s => s.problemId)
  );

  // 按分类和难度分组已解决题目
  const categoryDifficultyMap = new Map<string, Set<number>>();
  submissions
    .filter(s => s.result === 'AC')
    .forEach(s => {
      const key = s.category;
      if (!categoryDifficultyMap.has(key)) {
        categoryDifficultyMap.set(key, new Set());
      }
      categoryDifficultyMap.get(key)!.add(s.problemId);
    });

  // 为每个已解决的beginner题目推荐intermediate
  submissions
    .filter(s => s.result === 'AC' && s.difficulty === 'beginner')
    .forEach(s => {
      const key = s.category;
      // 查找同类intermediate题目
      const similarIntermediate = problems.find(
        p => p.category === key && 
        p.difficulty === 'intermediate' && 
        !solvedProblems.has(p.id)
      );

      if (similarIntermediate) {
        recommendations.push({
          id: `next_${similarIntermediate.id}`,
          type: 'next_level',
          priority: 6,
          title: `进阶挑战: ${similarIntermediate.title}`,
          description: `完成 ${s.problemTitle} 后，推荐挑战此题目`,
          problemId: similarIntermediate.id,
          problemTitle: similarIntermediate.title,
          category: similarIntermediate.category,
          difficulty: similarIntermediate.difficulty,
          reason: `${key} 分类进阶：从初级到中级`,
          estimatedTime: 25,
          benefits: [
            '巩固基础知识',
            '逐步提升难度',
            '系统性学习',
          ],
        });
      }
    });

  return recommendations.slice(0, 5);
}

/**
 * 相似题目推荐
 */
export function getSimilarProblemRecommendations(
  problemId: number,
  limit: number = 3
): Recommendation[] {
  const problem = problems.find(p => p.id === problemId);
  if (!problem) return [];

  const recommendations: Recommendation[] = [];

  // 从相似题目列表获取
  if (problem.similarProblems) {
    problem.similarProblems.slice(0, limit).forEach(similarId => {
      const similar = problems.find(p => p.id === similarId);
      if (similar) {
        recommendations.push({
          id: `similar_${similar.id}`,
          type: 'similar_problem',
          priority: 5,
          title: `相似题目: ${similar.title}`,
          description: `与 ${problem.title} 属于同类题型`,
          problemId: similar.id,
          problemTitle: similar.title,
          category: similar.category,
          difficulty: similar.difficulty,
          reason: `题型相似：强化解题技巧`,
          estimatedTime: 15,
          benefits: [
            '巩固同类题型',
            '扩展解题思路',
            '提高刷题效率',
          ],
        });
      }
    });
  }

  // 从同分类中补充
  const sameCategory = problems
    .filter(p => p.category === problem.category && p.id !== problemId)
    .slice(0, limit - recommendations.length);

  sameCategory.forEach(p => {
    recommendations.push({
      id: `similar_${p.id}`,
      type: 'similar_problem',
      priority: 4,
      title: `同类推荐: ${p.title}`,
      description: `同属 ${problem.category} 分类`,
      problemId: p.id,
      problemTitle: p.title,
      category: p.category,
      difficulty: p.difficulty,
      reason: `同分类练习：${problem.category}`,
      estimatedTime: 15,
      benefits: [
        '加强分类理解',
        '构建知识体系',
      ],
    });
  });

  return recommendations;
}

/**
 * 薄弱点训练推荐
 */
export function getWeaknessTrainingRecommendations(
  submissions: SubmissionRecord[],
  wrongProblems: WrongProblemRecord[],
  limit: number = 5
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // 分析薄弱分类
  const categoryStats = new Map<string, {
    total: number;
    wrong: number;
  }>();

  submissions.forEach(s => {
    const stats = categoryStats.get(s.category) || { total: 0, wrong: 0 };
    stats.total++;
    if (s.result !== 'AC') stats.wrong++;
    categoryStats.set(s.category, stats);
  });

  // 找出错误率高的分类
  const weakCategories = Array.from(categoryStats.entries())
    .filter(([_, stats]) => stats.total >= 3 && stats.wrong / stats.total > 0.3)
    .sort((a, b) => (b[1].wrong / b[1].total) - (a[1].wrong / a[1].total))
    .slice(0, 3);

  weakCategories.forEach(([category]) => {
    // 找出该分类中未解决的题目
    const unsolvedInCategory = problems
      .filter(p => p.category === category)
      .filter(p => !submissions.some(s => s.problemId === p.id && s.result === 'AC'))
      .slice(0, 2);

    unsolvedInCategory.forEach(p => {
      recommendations.push({
        id: `weakness_${p.id}`,
        type: 'weakness_training',
        priority: 7,
        title: `薄弱点训练: ${p.title}`,
        description: `${category} 分类错误率较高，建议加强练习`,
        problemId: p.id,
        problemTitle: p.title,
        category: p.category,
        difficulty: p.difficulty,
        reason: `薄弱分类：${category} 需要重点突破`,
        estimatedTime: 20,
        benefits: [
          '针对性提升薄弱环节',
          '建立自信心',
          '完善知识体系',
        ],
      });
    });
  });

  return recommendations.slice(0, limit);
}

/**
 * 每日练习推荐
 */
export function getDailyPracticeRecommendations(): Recommendation[] {
  const today = new Date().getDay();
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  // 根据星期推荐不同类型
  const dailyPlan: Record<number, { difficulty: DifficultyLevel; topic: string }> = {
    0: { difficulty: 'beginner', topic: '基础巩固' },     // 周日
    1: { difficulty: 'beginner', topic: '新知识学习' },   // 周一
    2: { difficulty: 'intermediate', topic: '巩固练习' }, // 周二
    3: { difficulty: 'intermediate', topic: '综合应用' }, // 周三
    4: { difficulty: 'advanced', topic: '能力提升' },    // 周四
    5: { difficulty: 'intermediate', topic: '周末冲刺' }, // 周五
    6: { difficulty: 'advanced', topic: '挑战自我' },    // 周六
  };

  const plan = dailyPlan[today];

  // 获取推荐题目
  const recommendedProblems = problems
    .filter(p => p.difficulty === plan.difficulty)
    .slice(0, 3);

  const recommendations: Recommendation[] = recommendedProblems.map((p, index) => ({
    id: `daily_${p.id}`,
    type: 'daily_practice' as RecommendationType,
    priority: 8 - index,
    title: `今日推荐: ${p.title}`,
    description: `${dayNames[today]} - ${plan.topic} - ${plan.difficulty === 'beginner' ? '初级' : plan.difficulty === 'intermediate' ? '中级' : '高级'}`,
    problemId: p.id,
    problemTitle: p.title,
    category: p.category,
    difficulty: p.difficulty,
    reason: `${dayNames[today]}推荐：${plan.topic}`,
    estimatedTime: 30,
    benefits: [
      '保持学习节奏',
      '循序渐进提升',
      '形成良好习惯',
    ],
  }));

  return recommendations;
}

/**
 * 目标路径规划推荐
 */
export function getTargetPathRecommendations(
  targetType: 'interview' | 'competition' | 'skill',
  currentLevel: number = 0
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (targetType === 'interview') {
    // 面试准备路径
    const interviewTopics = [
      { name: '数组与字符串', priority: 10 },
      { name: '链表', priority: 9 },
      { name: '哈希表', priority: 9 },
      { name: '二叉树', priority: 8 },
      { name: '动态规划', priority: 7 },
      { name: '回溯算法', priority: 7 },
      { name: '图论基础', priority: 6 },
    ];

    interviewTopics.slice(currentLevel, currentLevel + 3).forEach((topic, index) => {
      const topicProblems = problems.filter(p => 
        p.tags.some(t => t.includes(topic.name)) || 
        p.category.includes(topic.name)
      ).slice(0, 2);

      topicProblems.forEach(p => {
        recommendations.push({
          id: `target_interview_${p.id}`,
          type: 'target_path',
          priority: 10 - index,
          title: `面试必备: ${p.title}`,
          description: `目标路线：掌握 ${topic.name}`,
          problemId: p.id,
          problemTitle: p.title,
          category: p.category,
          difficulty: p.difficulty,
          reason: `面试高频考点：${topic.name}`,
          estimatedTime: 25,
          benefits: [
            '覆盖面试常考题型',
            '提升面试通过率',
            '构建完整知识体系',
          ],
        });
      });
    });
  } else if (targetType === 'competition') {
    // 竞赛准备路径
    const competitionTopics = [
      { name: '基础算法', difficulty: 'beginner' as DifficultyLevel },
      { name: '搜索', difficulty: 'intermediate' as DifficultyLevel },
      { name: '动态规划', difficulty: 'intermediate' as DifficultyLevel },
      { name: '图论', difficulty: 'advanced' as DifficultyLevel },
      { name: '数论', difficulty: 'advanced' as DifficultyLevel },
    ];

    competitionTopics.slice(currentLevel, currentLevel + 2).forEach((topic, index) => {
      const topicProblems = problems.filter(p => 
        p.category.includes(topic.name)
      ).slice(0, 2);

      topicProblems.forEach(p => {
        recommendations.push({
          id: `target_comp_${p.id}`,
          type: 'target_path',
          priority: 9 - index,
          title: `竞赛训练: ${p.title}`,
          description: `竞赛路线：攻克 ${topic.name}`,
          problemId: p.id,
          problemTitle: p.title,
          category: p.category,
          difficulty: p.difficulty,
          reason: `竞赛重点：${topic.name}`,
          estimatedTime: 30,
          benefits: [
            '提升竞赛能力',
            '锻炼解题速度',
            '积累竞赛经验',
          ],
        });
      });
    });
  }

  return recommendations.slice(0, 6);
}

/**
 * 获取综合推荐（混合多种类型）
 */
export function getComprehensiveRecommendations(
  submissions: SubmissionRecord[],
  wrongProblems: WrongProblemRecord[],
  options: {
    targetType?: 'interview' | 'competition' | 'skill';
    dailyEnabled?: boolean;
    wrongEnabled?: boolean;
    weaknessEnabled?: boolean;
  } = {}
): Recommendation[] {
  const allRecommendations: Recommendation[] = [];

  // 每日推荐
  if (options.dailyEnabled !== false) {
    allRecommendations.push(...getDailyPracticeRecommendations());
  }

  // 错题复习
  if (options.wrongEnabled !== false) {
    allRecommendations.push(...getWrongProblemRecommendations(wrongProblems, 3));
    allRecommendations.push(...getReviewRecommendations(wrongProblems, submissions));
  }

  // 薄弱点训练
  if (options.weaknessEnabled !== false) {
    allRecommendations.push(...getWeaknessTrainingRecommendations(submissions, wrongProblems, 3));
  }

  // 目标路径
  if (options.targetType) {
    allRecommendations.push(...getTargetPathRecommendations(options.targetType));
  }

  // 去重并按优先级排序
  const uniqueRecommendations = Array.from(
    new Map(allRecommendations.map(r => [r.problemId || r.id, r])).values()
  );

  return uniqueRecommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 10);
}

// 修真段位成就系统

// 段位定义（参考修真体系）
export interface CultivationRealm {
  id: string;
  name: string;
  title: string;
  minExp: number;
  maxExp: number;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  benefits: string[];
}

// 修真段位列表
export const cultivationRealms: CultivationRealm[] = [
  {
    id: 'mortal',
    name: '凡人',
    title: '编程小白',
    minExp: 0,
    maxExp: 99,
    icon: '👤',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    description: '刚刚接触编程的世界，一切都是新的开始',
    benefits: ['基础题目解锁'],
  },
  {
    id: 'qi-refining-1',
    name: '练气初期',
    title: '入门学徒',
    minExp: 100,
    maxExp: 299,
    icon: '🌟',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: '开始感受到代码的灵气，踏入编程之路',
    benefits: ['每日一题功能', '基础教程解锁'],
  },
  {
    id: 'qi-refining-2',
    name: '练气中期',
    title: '初级程序员',
    minExp: 300,
    maxExp: 599,
    icon: '✨',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: '代码灵气渐盛，开始理解程序的奥妙',
    benefits: ['智能提示功能', '错题本解锁'],
  },
  {
    id: 'qi-refining-3',
    name: '练气后期',
    title: '代码学徒',
    minExp: 600,
    maxExp: 999,
    icon: '💫',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: '灵气充沛，能够独立完成简单算法',
    benefits: ['算法动画解锁', '收藏功能解锁'],
  },
  {
    id: 'foundation-1',
    name: '筑基初期',
    title: '算法弟子',
    minExp: 1000,
    maxExp: 1499,
    icon: '🔥',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: '筑基已成，开始系统学习算法',
    benefits: ['进阶教程解锁', '题解社区解锁'],
  },
  {
    id: 'foundation-2',
    name: '筑基中期',
    title: '算法修士',
    minExp: 1500,
    maxExp: 2199,
    icon: '💎',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: '根基稳固，掌握了多种算法思想',
    benefits: ['代码对比功能', '自定义模板'],
  },
  {
    id: 'foundation-3',
    name: '筑基后期',
    title: '高级修士',
    minExp: 2200,
    maxExp: 2999,
    icon: '🏆',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: '筑基圆满，准备冲击更高境界',
    benefits: ['高级数据结构教程', '真题训练解锁'],
  },
  {
    id: 'golden-core-1',
    name: '金丹初期',
    title: '算法大师',
    minExp: 3000,
    maxExp: 3999,
    icon: '⭐',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    description: '凝结金丹，算法造诣已非同寻常',
    benefits: ['高级算法解锁', '专属标识'],
  },
  {
    id: 'golden-core-2',
    name: '金丹中期',
    title: '算法宗师',
    minExp: 4000,
    maxExp: 5499,
    icon: '🌟',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    description: '金丹渐成，开始在比赛中崭露头角',
    benefits: ['比赛模拟功能', '优先客服支持'],
  },
  {
    id: 'golden-core-3',
    name: '金丹后期',
    title: '算法长老',
    minExp: 5500,
    maxExp: 6999,
    icon: '💫',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    description: '金丹圆满，成为他人仰望的存在',
    benefits: ['出题权限', '题解精选标识'],
  },
  {
    id: 'nascent-soul-1',
    name: '元婴初期',
    title: '算法真君',
    minExp: 7000,
    maxExp: 8999,
    icon: '👑',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: '元婴初成，达到了NOIP提高组水平',
    benefits: ['元婴专属皮肤', '高级数据统计'],
  },
  {
    id: 'nascent-soul-2',
    name: '元婴中期',
    title: '算法道君',
    minExp: 9000,
    maxExp: 11499,
    icon: '🎖️',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: '元婴稳固，向着省选发起冲击',
    benefits: ['专属训练计划', '一对一指导机会'],
  },
  {
    id: 'nascent-soul-3',
    name: '元婴后期',
    title: '算法尊者',
    minExp: 11500,
    maxExp: 13999,
    icon: '🏅',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: '元婴圆满，已是省选级别的强者',
    benefits: ['省选专项训练', '历史数据分析'],
  },
  {
    id: 'spirit-severing',
    name: '化神',
    title: '算法圣者',
    minExp: 14000,
    maxExp: 17999,
    icon: '🌈',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    description: '化神境界，开始触碰NOI的门槛',
    benefits: ['NOI专项训练', '专属荣誉展示'],
  },
  {
    id: 'void-refining',
    name: '炼虚',
    title: '算法仙人',
    minExp: 18000,
    maxExp: 22999,
    icon: '🦋',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    description: '炼虚境界，已是NOI银牌水平',
    benefits: ['金牌训练计划', '国际赛入门'],
  },
  {
    id: 'mahayana',
    name: '大乘',
    title: '算法神人',
    minExp: 23000,
    maxExp: 28999,
    icon: '🐉',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    description: '大乘境界，NOI金牌指日可待',
    benefits: ['国集训练计划', '顶级赛事通道'],
  },
  {
    id: 'tribulation',
    name: '渡劫',
    title: '算法至尊',
    minExp: 29000,
    maxExp: 35999,
    icon: '⚡',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    description: '渡劫境界，冲击IOI国际金牌',
    benefits: ['IOI专项训练', '国家队选拔通道'],
  },
  {
    id: 'immortal',
    name: '飞升',
    title: '算法真仙',
    minExp: 36000,
    maxExp: Infinity,
    icon: '🎊',
    color: 'text-rose-600',
    bgColor: 'bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100',
    description: '飞升成仙，已入编程最高殿堂',
    benefits: ['传奇称号', '永久荣誉', '终身会员'],
  },
];

// 根据经验值获取当前段位
export function getRealmByExp(exp: number): CultivationRealm {
  for (let i = cultivationRealms.length - 1; i >= 0; i--) {
    if (exp >= cultivationRealms[i].minExp) {
      return cultivationRealms[i];
    }
  }
  return cultivationRealms[0];
}

// 获取下一个段位
export function getNextRealm(currentRealmId: string): CultivationRealm | null {
  const index = cultivationRealms.findIndex(r => r.id === currentRealmId);
  if (index < cultivationRealms.length - 1) {
    return cultivationRealms[index + 1];
  }
  return null;
}

// 计算当前段位进度
export function getRealmProgress(exp: number, realm: CultivationRealm): number {
  if (realm.maxExp === Infinity) return 100;
  const progress = (exp - realm.minExp) / (realm.maxExp - realm.minExp) * 100;
  return Math.min(100, Math.max(0, progress));
}

// 成就定义
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'practice' | 'challenge' | 'social' | 'special';
  condition: string;
  reward: number; // 经验值奖励
  unlockedAt?: string;
}

// 成就列表
export const achievements: Achievement[] = [
  // 学习类成就
  {
    id: 'first-step',
    name: '初入仙门',
    description: '完成第一天学习',
    icon: '🌱',
    category: 'learning',
    condition: '完成Day 1',
    reward: 50,
  },
  {
    id: 'week-streak',
    name: '七日筑基',
    description: '连续学习7天',
    icon: '🔥',
    category: 'learning',
    condition: '连续打卡7天',
    reward: 200,
  },
  {
    id: 'month-streak',
    name: '月度金丹',
    description: '连续学习30天',
    icon: '💎',
    category: 'learning',
    condition: '连续打卡30天',
    reward: 1000,
  },
  {
    id: 'hundred-day',
    name: '百日飞升',
    description: '累计学习100天',
    icon: '🦋',
    category: 'learning',
    condition: '累计打卡100天',
    reward: 3000,
  },
  {
    id: 'complete-foundation',
    name: '基础圆满',
    description: '完成基础入门阶段',
    icon: '🌿',
    category: 'learning',
    condition: '完成Day 1-14',
    reward: 300,
  },
  {
    id: 'complete-basic',
    name: '算法入门',
    description: '完成基础算法阶段',
    icon: '🌳',
    category: 'learning',
    condition: '完成Day 15-35',
    reward: 500,
  },
  {
    id: 'complete-intermediate',
    name: '进阶大成',
    description: '完成进阶提升阶段',
    icon: '🏔️',
    category: 'learning',
    condition: '完成Day 36-70',
    reward: 1000,
  },
  {
    id: 'complete-advanced',
    name: '高级圆满',
    description: '完成高级算法阶段',
    icon: '⭐',
    category: 'learning',
    condition: '完成Day 71-100',
    reward: 2000,
  },
  {
    id: 'complete-competition',
    name: '竞赛冲刺',
    description: '完成竞赛冲刺阶段',
    icon: '🏆',
    category: 'learning',
    condition: '完成Day 101-120',
    reward: 5000,
  },

  // 练习类成就
  {
    id: 'first-code',
    name: '初试身手',
    description: '完成第一道题目',
    icon: '⚡',
    category: 'practice',
    condition: '完成1道题',
    reward: 30,
  },
  {
    id: 'ten-problems',
    name: '小试牛刀',
    description: '完成10道题目',
    icon: '🎯',
    category: 'practice',
    condition: '完成10道题',
    reward: 100,
  },
  {
    id: 'fifty-problems',
    name: '勤学苦练',
    description: '完成50道题目',
    icon: '📚',
    category: 'practice',
    condition: '完成50道题',
    reward: 300,
  },
  {
    id: 'hundred-problems',
    name: '百题斩将',
    description: '完成100道题目',
    icon: '⚔️',
    category: 'practice',
    condition: '完成100道题',
    reward: 500,
  },
  {
    id: 'two-hundred-problems',
    name: '双百战神',
    description: '完成200道题目',
    icon: '🗡️',
    category: 'practice',
    condition: '完成200道题',
    reward: 1000,
  },
  {
    id: 'five-hundred-problems',
    name: '千题道君',
    description: '完成500道题目',
    icon: '👑',
    category: 'practice',
    condition: '完成500道题',
    reward: 3000,
  },

  // 挑战类成就
  {
    id: 'perfect-score',
    name: '完美答卷',
    description: '单次评测全部通过',
    icon: '💯',
    category: 'challenge',
    condition: '评测全部AC',
    reward: 100,
  },
  {
    id: 'speed-demon',
    name: '闪电手',
    description: '5分钟内完成一道中等难度题',
    icon: '⚡',
    category: 'challenge',
    condition: '快速AC中等题',
    reward: 150,
  },
  {
    id: 'hard-conqueror',
    name: '困难征服者',
    description: '完成第一道困难题目',
    icon: '🏔️',
    category: 'challenge',
    condition: 'AC困难题',
    reward: 200,
  },
  {
    id: 'challenge-master',
    name: '挑战大师',
    description: '完成所有每日挑战题',
    icon: '🏆',
    category: 'challenge',
    condition: '完成所有挑战题',
    reward: 1000,
  },
  {
    id: 'no-hint-hero',
    name: '独立思考',
    description: '不使用提示完成10道中等以上题目',
    icon: '🧠',
    category: 'challenge',
    condition: '无提示AC 10题',
    reward: 500,
  },

  // 社交类成就
  {
    id: 'first-solution',
    name: '布道传法',
    description: '发布第一篇题解',
    icon: '📝',
    category: 'social',
    condition: '发布1篇题解',
    reward: 100,
  },
  {
    id: 'popular-author',
    name: '受人敬仰',
    description: '题解获得100个赞',
    icon: '❤️',
    category: 'social',
    condition: '题解获赞100',
    reward: 300,
  },
  {
    id: 'master-author',
    name: '一代宗师',
    description: '发布10篇精选题解',
    icon: '📖',
    category: 'social',
    condition: '10篇精选题解',
    reward: 1000,
  },

  // 特殊成就
  {
    id: 'early-bird',
    name: '早起修炼',
    description: '在早上6点前完成学习',
    icon: '🌅',
    category: 'special',
    condition: '早于6点学习',
    reward: 50,
  },
  {
    id: 'night-owl',
    name: '夜深悟道',
    description: '在深夜12点后完成学习',
    icon: '🌙',
    category: 'special',
    condition: '晚于24点学习',
    reward: 50,
  },
  {
    id: 'weekend-warrior',
    name: '周末苦修',
    description: '连续4个周末都学习',
    icon: '📅',
    category: 'special',
    condition: '连续4周末学习',
    reward: 200,
  },
  {
    id: 'perfectionist',
    name: '完美主义',
    description: '单日所有练习题全部AC',
    icon: '✨',
    category: 'special',
    condition: '单日全部AC',
    reward: 150,
  },
  {
    id: 'knowledge-seeker',
    name: '求知若渴',
    description: '观看100个视频教程',
    icon: '🎓',
    category: 'special',
    condition: '观看100个视频',
    reward: 500,
  },
  {
    id: 'animation-fan',
    name: '动画爱好者',
    description: '观看所有算法动画演示',
    icon: '🎬',
    category: 'special',
    condition: '观看所有动画',
    reward: 300,
  },
];

// 根据天数获取当天解锁的成就
export function getAchievementsForDay(day: number): Achievement[] {
  const dayAchievements: Achievement[] = [];
  
  // 阶段完成成就
  if (day === 14) {
    dayAchievements.push(achievements.find(a => a.id === 'complete-foundation')!);
  }
  if (day === 35) {
    dayAchievements.push(achievements.find(a => a.id === 'complete-basic')!);
  }
  if (day === 70) {
    dayAchievements.push(achievements.find(a => a.id === 'complete-intermediate')!);
  }
  if (day === 100) {
    dayAchievements.push(achievements.find(a => a.id === 'complete-advanced')!);
  }
  if (day === 120) {
    dayAchievements.push(achievements.find(a => a.id === 'complete-competition')!);
  }
  
  // 连续天数成就
  if (day === 7) {
    dayAchievements.push(achievements.find(a => a.id === 'week-streak')!);
  }
  if (day === 30) {
    dayAchievements.push(achievements.find(a => a.id === 'month-streak')!);
  }
  if (day === 100) {
    dayAchievements.push(achievements.find(a => a.id === 'hundred-day')!);
  }
  
  return dayAchievements;
}

// 获取用户成就列表
export function getUserAchievements(unlockedIds: string[]): (Achievement & { unlocked: boolean })[] {
  return achievements.map(a => ({
    ...a,
    unlocked: unlockedIds.includes(a.id),
  }));
}

// 计算总经验值
export function calculateTotalExp(
  completedDays: number,
  completedProblems: number,
  streakDays: number,
  achievementRewards: number
): number {
  const dayExp = completedDays * 20; // 每天完成20经验
  const problemExp = completedProblems * 10; // 每道题10经验
  const streakBonus = Math.floor(streakDays / 7) * 50; // 每连续7天额外50经验
  return dayExp + problemExp + streakBonus + achievementRewards;
}

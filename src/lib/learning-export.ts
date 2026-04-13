/**
 * 数据导出模块
 * 提供学习报告PDF、技能清单、面试准备清单导出功能
 */

import type { SubmissionRecord, WrongProblemRecord, LearningStats } from './user-learning-data';
import type { Recommendation } from './learning-recommendations';
import type { LearningSummary, CategoryAbility } from './learning-analytics';

// 导出格式
export type ExportFormat = 'pdf' | 'markdown' | 'json';

// 学习报告数据
export interface LearningReportData {
  userName?: string;
  generatedAt: string;
  summary: LearningSummary;
  categoryAbilities: CategoryAbility[];
  weeklyStats: {
    solved: number;
    accuracy: number;
    timeSpent: number;
  };
  achievements: {
    name: string;
    description: string;
    icon: string;
    unlockedAt?: number;
  }[];
  recentActivity: {
    date: string;
    action: string;
    problem?: string;
  }[];
  recommendations: Recommendation[];
}

// 技能清单数据
export interface Skill清单Data {
  categories: {
    name: string;
    level: '掌握' | '熟悉' | '了解';
    problems: number;
    accuracy: number;
  }[];
  totalProblems: number;
  totalAccuracy: number;
  strongestSkill: string;
  weakestSkill: string;
}

// 面试准备清单数据
export interface InterviewChecklistData {
  highFrequency: {
    topic: string;
    importance: '必考' | '高频' | '一般';
    status: 'ready' | 'learning' | 'not_started';
    recommendedProblems: string[];
  }[];
  companyTags: {
    company: string;
    problemCount: number;
    completedCount: number;
  }[];
  preparationPlan: {
    week: number;
    focus: string;
    targetProblems: number;
  }[];
}

/**
 * 生成 Markdown 格式的学习报告
 */
export function generateMarkdownReport(data: LearningReportData): string {
  const { summary, categoryAbilities, weeklyStats, achievements, recentActivity, recommendations } = data;

  let markdown = `# 📊 学习报告\n\n`;
  markdown += `**生成时间**: ${new Date(data.generatedAt).toLocaleString('zh-CN')}\n\n`;

  // 学习概览
  markdown += `## 📈 学习概览\n\n`;
  markdown += `| 指标 | 数值 |\n`;
  markdown += `|------|------|\n`;
  markdown += `| 总解题数 | ${summary.totalProblems} |\n`;
  markdown += `| 已解决 | ${summary.solvedProblems} |\n`;
  markdown += `| 正确率 | ${summary.accuracy}% |\n`;
  markdown += `| 学习时长 | ${summary.totalTime} 分钟 |\n`;
  markdown += `| 最强分类 | ${summary.strongestCategory} |\n`;
  markdown += `| 薄弱分类 | ${summary.weakestCategory} |\n`;
  markdown += `| 连续学习 | ${summary.streakDays} 天 |\n\n`;

  // 分类能力
  markdown += `## 🎯 分类能力\n\n`;
  categoryAbilities.forEach(cat => {
    const bar = '█'.repeat(Math.round(cat.ability / 10)) + '░'.repeat(10 - Math.round(cat.ability / 10));
    markdown += `### ${cat.category}\n`;
    markdown += `| 能力值 | 正确率 | 已解题/总题 |\n`;
    markdown += `|--------|--------|------------|\n`;
    markdown += `| ${bar} ${cat.ability}% | ${cat.accuracy}% | ${cat.solvedProblems}/${cat.totalProblems} |\n\n`;
  });

  // 本周统计
  markdown += `## 📅 本周统计\n\n`;
  markdown += `- 解决题目: ${weeklyStats.solved} 道\n`;
  markdown += `- 正确率: ${weeklyStats.accuracy}%\n`;
  markdown += `- 学习时长: ${weeklyStats.timeSpent} 分钟\n\n`;

  // 成就
  if (achievements.length > 0) {
    markdown += `## 🏆 已获成就\n\n`;
    achievements.forEach(a => {
      markdown += `- ${a.icon} ${a.name}: ${a.description}\n`;
    });
    markdown += `\n`;
  }

  // 最近活动
  if (recentActivity.length > 0) {
    markdown += `## 📝 最近活动\n\n`;
    recentActivity.slice(0, 10).forEach(activity => {
      markdown += `- ${activity.date}: ${activity.action}${activity.problem ? ` - ${activity.problem}` : ''}\n`;
    });
    markdown += `\n`;
  }

  // 推荐下一题
  if (recommendations.length > 0) {
    markdown += `## 📌 推荐练习\n\n`;
    recommendations.slice(0, 5).forEach((rec, index) => {
      markdown += `${index + 1}. **${rec.title}**\n`;
      markdown += `   - ${rec.description}\n`;
      markdown += `   - 预计用时: ${rec.estimatedTime} 分钟\n`;
    });
    markdown += `\n`;
  }

  markdown += `---\n`;
  markdown += `*由 NOIP 学习平台自动生成*\n`;

  return markdown;
}

/**
 * 生成技能清单
 */
export function generateSkillList(data: Skill清单Data): string {
  let markdown = `# 💼 技能清单\n\n`;
  markdown += `**生成时间**: ${new Date().toLocaleString('zh-CN')}\n\n`;

  // 总体统计
  markdown += `## 📊 总体统计\n\n`;
  markdown += `- 总解题数: ${data.totalProblems}\n`;
  markdown += `- 总正确率: ${data.totalAccuracy}%\n`;
  markdown += `- 最强技能: ${data.strongestSkill}\n`;
  markdown += `- 待提升: ${data.weakestSkill}\n\n`;

  // 技能列表
  markdown += `## 📚 技能详情\n\n`;
  markdown += `| 技能分类 | 掌握程度 | 解题数 | 正确率 |\n`;
  markdown += `|----------|----------|--------|--------|\n`;
  data.categories.forEach(cat => {
    markdown += `| ${cat.name} | ${cat.level} | ${cat.problems} | ${cat.accuracy}% |\n`;
  });
  markdown += `\n`;

  // 简历描述
  markdown += "## 📄 简历技能描述\n\n";
  markdown += "```\n";
  const masteredCategories = data.categories.filter(c => c.level === '掌握');
  const familiarCategories = data.categories.filter(c => c.level === '熟悉');
  
  if (masteredCategories.length > 0) {
    markdown += `• 熟练掌握: ${masteredCategories.map(c => c.name).join('、')}\n`;
  }
  if (familiarCategories.length > 0) {
    markdown += `• 熟悉了解: ${familiarCategories.map(c => c.name).join('、')}\n`;
  }
  markdown += "\n";
  markdown += `• 累计解题 ${data.totalProblems} 道，正确率 ${data.totalAccuracy}%\n`;
  markdown += "```\n\n";

  markdown += `---\n`;
  markdown += `*可复制上方简历描述到个人简历中*\n`;

  return markdown;
}

/**
 * 生成面试准备清单
 */
export function generateInterviewChecklist(data: InterviewChecklistData): string {
  let markdown = `# 🎯 面试准备清单\n\n`;
  markdown += `**生成时间**: ${new Date().toLocaleString('zh-CN')}\n\n`;

  // 高频考点
  markdown += `## 📌 高频考点\n\n`;
  markdown += `| 考点 | 重要程度 | 状态 | 推荐题目 |\n`;
  markdown += `|------|----------|------|----------|\n`;
  data.highFrequency.forEach(item => {
    const statusEmoji = item.status === 'ready' ? '✅' : item.status === 'learning' ? '🔄' : '❌';
    markdown += `| ${item.topic} | ${item.importance} | ${statusEmoji} | ${item.recommendedProblems.slice(0, 2).join(', ')} |\n`;
  });
  markdown += `\n`;

  // 公司标签
  if (data.companyTags.length > 0) {
    markdown += `## 🏢 公司标签\n\n`;
    markdown += `| 公司 | 推荐题目 | 已完成 |\n`;
    markdown += `|------|----------|--------|\n`;
    data.companyTags.forEach(tag => {
      const progress = `${tag.completedCount}/${tag.problemCount}`;
      markdown += `| ${tag.company} | ${tag.problemCount} | ${progress} |\n`;
    });
    markdown += `\n`;
  }

  // 准备计划
  markdown += `## 📅 准备计划\n\n`;
  data.preparationPlan.forEach(week => {
    markdown += `### 第${week.week}周\n`;
    markdown += `- 重点: ${week.focus}\n`;
    markdown += `- 目标: 完成 ${week.targetProblems} 道题目\n\n`;
  });

  // 清单表格
  markdown += `## ✅ 自检清单\n\n`;
  markdown += `- [ ] 数组与字符串基础\n`;
  markdown += `- [ ] 链表操作\n`;
  markdown += `- [ ] 二叉树遍历\n`;
  markdown += `- [ ] 哈希表应用\n`;
  markdown += `- [ ] 动态规划入门\n`;
  markdown += `- [ ] 回溯算法\n`;
  markdown += `- [ ] 排序算法\n`;
  markdown += `- [ ] 栈与队列\n`;
  markdown += `- [ ] 图论基础\n`;
  markdown += `- [ ] 并查集\n\n`;

  markdown += `---\n`;
  markdown += `*建议每天完成 2-3 道高频面试题*\n`;

  return markdown;
}

/**
 * 下载文件
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 导出学习报告
 */
export function exportLearningReport(data: LearningReportData, format: ExportFormat = 'markdown'): void {
  const timestamp = new Date().toISOString().split('T')[0];
  
  if (format === 'markdown') {
    const content = generateMarkdownReport(data);
    downloadFile(content, `学习报告_${timestamp}.md`, 'text/markdown');
  } else if (format === 'json') {
    const content = JSON.stringify(data, null, 2);
    downloadFile(content, `学习报告_${timestamp}.json`, 'application/json');
  }
}

/**
 * 导出技能清单
 */
export function exportSkillList(data: Skill清单Data, format: ExportFormat = 'markdown'): void {
  if (format === 'markdown') {
    const content = generateSkillList(data);
    downloadFile(content, '技能清单.md', 'text/markdown');
  } else if (format === 'json') {
    const content = JSON.stringify(data, null, 2);
    downloadFile(content, '技能清单.json', 'application/json');
  }
}

/**
 * 导出面试准备清单
 */
export function exportInterviewChecklist(data: InterviewChecklistData): void {
  const content = generateInterviewChecklist(data);
  downloadFile(content, '面试准备清单.md', 'text/markdown');
}

/**
 * 生成 PDF 报告（使用浏览器打印功能）
 */
export function exportPDFReport(htmlContent: string, title: string): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('请允许弹出窗口以生成PDF');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; }
        h1 { color: #333; border-bottom: 2px solid #666; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

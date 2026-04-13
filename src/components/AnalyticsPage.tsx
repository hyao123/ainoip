'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadarChart } from '@/components/charts/RadarChart';
import { LearningCurveChart } from '@/components/charts/LearningCurveChart';
import { HeatmapChart } from '@/components/charts/HeatmapChart';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  BookOpen,
  Download,
  FileText,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Zap,
  Brain,
  Calendar,
  Flame
} from 'lucide-react';
import {
  calculateCategoryAbilities,
  calculateLearningCurve,
  generateHeatmapData,
  analyzeWeakPoints,
  generateRadarChartData,
  calculateLearningSummary,
  type CategoryAbility,
  type LearningCurvePoint,
  type WeakPointAnalysis,
} from '@/lib/learning-analytics';
import {
  getComprehensiveRecommendations,
  getReviewRecommendations,
  type Recommendation,
} from '@/lib/learning-recommendations';
import {
  exportLearningReport,
  exportSkillList,
  exportInterviewChecklist,
  type LearningReportData,
  type Skill清单Data,
  type InterviewChecklistData,
} from '@/lib/learning-export';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { UserLearningData } from '@/lib/user-learning-data';

export function AnalyticsPage() {
  const [userData] = useLocalStorage<UserLearningData | null>('noip_learning_data', null);
  const [activeTab, setActiveTab] = useState('overview');

  // 计算分析数据
  const categoryAbilities = useMemo(() => 
    calculateCategoryAbilities(userData?.submissions || []),
    [userData?.submissions]
  );

  const learningCurve = useMemo(() => 
    calculateLearningCurve(userData?.submissions || [], 30),
    [userData?.submissions]
  );

  const heatmapData = useMemo(() => 
    generateHeatmapData(userData?.submissions || [], 90),
    [userData?.submissions]
  );

  const weakPoints = useMemo(() => 
    analyzeWeakPoints(userData?.wrongProblems || [], userData?.submissions || []),
    [userData?.wrongProblems, userData?.submissions]
  );

  const radarData = useMemo(() => 
    generateRadarChartData(userData?.submissions || []),
    [userData?.submissions]
  );

  const summary = useMemo(() => 
    calculateLearningSummary(userData?.submissions || [], userData?.stats?.streak || 0),
    [userData?.submissions, userData?.stats?.streak]
  );

  const recommendations = useMemo(() => 
    getComprehensiveRecommendations(userData?.submissions || [], userData?.wrongProblems || []),
    [userData?.submissions, userData?.wrongProblems]
  );

  // 导出学习报告
  const handleExportReport = () => {
    const reportData: LearningReportData = {
      generatedAt: new Date().toISOString(),
      summary,
      categoryAbilities,
      weeklyStats: {
        solved: learningCurve.slice(-7).reduce((sum, d) => sum + d.dailySolved, 0),
        accuracy: learningCurve.slice(-7).length > 0
          ? learningCurve.slice(-7).reduce((sum, d) => sum + d.accuracy, 0) / 7
          : 0,
        timeSpent: userData?.stats?.weeklyData?.reduce((sum, d) => sum + d.timeSpent, 0) || 0,
      },
      achievements: userData?.achievements?.filter(a => a.unlocked)?.map(a => ({
        name: a.name,
        description: a.description,
        icon: a.icon,
        unlockedAt: a.unlockedAt,
      })) || [],
      recentActivity: userData?.submissions?.slice(-10).map(s => ({
        date: new Date(s.timestamp).toLocaleDateString('zh-CN'),
        action: s.result === 'AC' ? '解题成功' : '尝试解题',
        problem: s.problemTitle,
      })) || [],
      recommendations,
    };
    exportLearningReport(reportData);
  };

  // 导出技能清单
  const handleExportSkills = () => {
    const skillData: Skill清单Data = {
      categories: categoryAbilities.map(c => ({
        name: c.category,
        level: c.ability >= 70 ? '掌握' : c.ability >= 40 ? '熟悉' : '了解',
        problems: c.totalProblems,
        accuracy: c.accuracy,
      })),
      totalProblems: summary.solvedProblems,
      totalAccuracy: summary.accuracy,
      strongestSkill: summary.strongestCategory,
      weakestSkill: summary.weakestCategory,
    };
    exportSkillList(skillData);
  };

  // 导出面试清单
  const handleExportInterview = () => {
    const interviewData: InterviewChecklistData = {
      highFrequency: [
        { topic: '两数之和', importance: '必考', status: 'ready', recommendedProblems: ['LeetCode 1'] },
        { topic: '合并两个有序链表', importance: '高频', status: 'learning', recommendedProblems: ['LeetCode 21'] },
        { topic: '二叉树遍历', importance: '必考', status: 'not_started', recommendedProblems: ['LeetCode 94'] },
        { topic: 'LRU 缓存', importance: '高频', status: 'not_started', recommendedProblems: ['LeetCode 146'] },
        { topic: '最长公共子序列', importance: '高频', status: 'not_started', recommendedProblems: ['LeetCode 1143'] },
      ],
      companyTags: [
        { company: '字节跳动', problemCount: 50, completedCount: 15 },
        { company: '阿里巴巴', problemCount: 40, completedCount: 10 },
        { company: '腾讯', problemCount: 45, completedCount: 8 },
        { company: '百度', problemCount: 35, completedCount: 12 },
      ],
      preparationPlan: [
        { week: 1, focus: '数组与字符串', targetProblems: 15 },
        { week: 2, focus: '链表与树', targetProblems: 15 },
        { week: 3, focus: '动态规划', targetProblems: 12 },
        { week: 4, focus: '图论与搜索', targetProblems: 10 },
      ],
    };
    exportInterviewChecklist(interviewData);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            学习数据分析
          </h1>
          <p className="text-muted-foreground mt-1">全面了解你的学习进度和能力分布</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
          <Button variant="outline" onClick={handleExportSkills}>
            <Briefcase className="h-4 w-4 mr-2" />
            导出技能清单
          </Button>
        </div>
      </div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="已解决题目"
          value={summary.solvedProblems}
          subtitle={`正确率 ${summary.accuracy}%`}
          icon={<Target className="h-5 w-5" />}
          trend={summary.improvementRate > 0 ? `+${summary.improvementRate}%` : undefined}
        />
        <StatCard
          title="连续学习"
          value={`${summary.streakDays}天`}
          subtitle="保持学习节奏"
          icon={<Flame className="h-5 w-5" />}
        />
        <StatCard
          title="总学习时长"
          value={`${summary.totalTime}分钟`}
          subtitle={`平均 ${summary.averageTimePerProblem} 分钟/题`}
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          title="掌握分类"
          value={categoryAbilities.filter(c => c.ability >= 70).length}
          subtitle={`共 ${categoryAbilities.length} 个分类`}
          icon={<Award className="h-5 w-5" />}
        />
      </div>

      {/* 标签页 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">学习画像</TabsTrigger>
          <TabsTrigger value="weakness">薄弱点分析</TabsTrigger>
          <TabsTrigger value="recommendations">智能推荐</TabsTrigger>
          <TabsTrigger value="export">数据导出</TabsTrigger>
        </TabsList>

        {/* 学习画像 */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 能力雷达图 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  能力雷达图
                </CardTitle>
                <CardDescription>各分类能力分布</CardDescription>
              </CardHeader>
              <CardContent>
                <RadarChart
                  categories={radarData.categories}
                  values={radarData.abilities}
                />
              </CardContent>
            </Card>

            {/* 学习曲线 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  学习曲线
                </CardTitle>
                <CardDescription>30天累计解题趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <LearningCurveChart data={learningCurve} />
              </CardContent>
            </Card>
          </div>

          {/* 时间热力图 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                学习时间分布
              </CardTitle>
              <CardDescription>90天学习活动时间热力图</CardDescription>
            </CardHeader>
            <CardContent>
              <HeatmapChart data={heatmapData} />
            </CardContent>
          </Card>

          {/* 分类能力详情 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                分类能力详情
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryAbilities.map((cat, index) => (
                  <div key={cat.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{cat.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {cat.solvedProblems}/{cat.totalProblems} 题 | 正确率 {cat.accuracy}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={cat.ability} className="h-2" />
                      <Badge variant={cat.ability >= 70 ? 'default' : cat.ability >= 40 ? 'secondary' : 'outline'}>
                        {cat.ability}%
                      </Badge>
                    </div>
                    {index < categoryAbilities.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 薄弱点分析 */}
        <TabsContent value="weakness" className="space-y-6">
          {weakPoints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weakPoints.map((wp, index) => (
                <Card key={`${wp.category}_${wp.difficulty}`} className="border-l-4 border-l-orange-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{wp.category}</CardTitle>
                    <CardDescription>
                      难度: {wp.difficulty === 'beginner' ? '初级' : wp.difficulty === 'intermediate' ? '中级' : '高级'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">错误率</span>
                        <Badge variant="destructive">{wp.wrongRate}%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">问题数</span>
                        <span className="font-medium">{wp.problemCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">趋势</span>
                        <Badge variant={wp.trend === 'improving' ? 'default' : wp.trend === 'declining' ? 'destructive' : 'secondary'}>
                          {wp.trend === 'improving' ? '↑ 进步中' : wp.trend === 'declining' ? '↓ 需加强' : '→ 稳定'}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="text-sm text-muted-foreground">
                        建议练习: <span className="font-medium text-foreground">{wp.recommendedPractice}</span> 道
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-medium">暂无薄弱点</h3>
                <p className="text-muted-foreground">继续保持良好的学习状态！</p>
              </CardContent>
            </Card>
          )}

          {/* 复习提醒 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                遗忘曲线复习提醒
              </CardTitle>
              <CardDescription>根据艾宾浩斯遗忘曲线推荐的复习题目</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {getReviewRecommendations(userData?.wrongProblems || [], userData?.submissions || [])
                    .slice(0, 10)
                    .map(rec => (
                      <div key={rec.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{rec.title}</p>
                          <p className="text-sm text-muted-foreground">{rec.reason}</p>
                        </div>
                        <Badge variant="outline">{rec.estimatedTime}分钟</Badge>
                      </div>
                    ))}
                  {getReviewRecommendations(userData?.wrongProblems || [], userData?.submissions || []).length === 0 && (
                    <p className="text-center text-muted-foreground py-8">暂无需要复习的题目</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 智能推荐 */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map(rec => (
              <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={
                        rec.type === 'wrong_problem_review' ? 'destructive' :
                        rec.type === 'daily_practice' ? 'default' :
                        rec.type === 'target_path' ? 'secondary' : 'outline'
                      }>
                        {rec.type === 'wrong_problem_review' ? '错题复习' :
                         rec.type === 'forgetting_curve' ? '遗忘提醒' :
                         rec.type === 'daily_practice' ? '每日推荐' :
                         rec.type === 'target_path' ? '目标路径' :
                         rec.type === 'weakness_training' ? '薄弱训练' : '相似题目'}
                      </Badge>
                      <CardTitle className="mt-2">{rec.title}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{rec.priority}</div>
                      <div className="text-xs text-muted-foreground">优先级</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <p className="text-sm mb-3">
                    <span className="font-medium">推荐理由：</span>{rec.reason}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {rec.benefits.map((benefit, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">预计用时: {rec.estimatedTime} 分钟</span>
                    {rec.problemId && (
                      <Button size="sm">开始练习</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 数据导出 */}
        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 学习报告 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  学习报告
                </CardTitle>
                <CardDescription>生成完整的学习数据分析报告</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>包含内容：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>学习概览与统计</li>
                    <li>分类能力分析</li>
                    <li>周报数据对比</li>
                    <li>成就一览</li>
                    <li>近期活动记录</li>
                    <li>个性化推荐</li>
                  </ul>
                </div>
                <Button className="w-full" onClick={handleExportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  导出 Markdown
                </Button>
              </CardContent>
            </Card>

            {/* 技能清单 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  简历技能清单
                </CardTitle>
                <CardDescription>可用于简历的技能描述</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>包含内容：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>技能分类详情</li>
                    <li>掌握程度评级</li>
                    <li>解题数据统计</li>
                    <li>简历描述文本</li>
                  </ul>
                </div>
                <Button className="w-full" variant="outline" onClick={handleExportSkills}>
                  <Download className="h-4 w-4 mr-2" />
                  导出技能清单
                </Button>
              </CardContent>
            </Card>

            {/* 面试准备清单 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  面试准备清单
                </CardTitle>
                <CardDescription>系统化的面试备考计划</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>包含内容：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>高频考点清单</li>
                    <li>公司标签题目</li>
                    <li>四周备考计划</li>
                    <li>自检清单表格</li>
                  </ul>
                </div>
                <Button className="w-full" variant="outline" onClick={handleExportInterview}>
                  <Download className="h-4 w-4 mr-2" />
                  导出面试清单
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 面试公司标签 */}
          <Card>
            <CardHeader>
              <CardTitle>公司标签</CardTitle>
              <CardDescription>各大公司面试高频题目统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: '字节跳动', problems: 50, color: 'bg-blue-500' },
                  { name: '阿里巴巴', problems: 40, color: 'bg-orange-500' },
                  { name: '腾讯', problems: 45, color: 'bg-green-500' },
                  { name: '百度', problems: 35, color: 'bg-red-500' },
                  { name: '美团', problems: 30, color: 'bg-yellow-500' },
                ].map(company => {
                  const completed = Math.floor(company.problems * 0.3);
                  return (
                    <div key={company.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{company.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {completed}/{company.problems}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${company.color} transition-all`}
                          style={{ width: `${(completed / company.problems) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 统计卡片组件
function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend 
}: { 
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          {subtitle}
          {trend && (
            <Badge variant="default" className="text-xs">
              {trend}
            </Badge>
          )}
        </p>
      </CardContent>
    </Card>
  );
}

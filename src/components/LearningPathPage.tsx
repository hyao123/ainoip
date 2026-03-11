'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  learningPaths,
  knowledgeTree,
  getRecommendedNodes,
  type LearningPath,
  type LearningGoal,
  type KnowledgeNode,
} from '@/lib/learning-path';
import { getKnowledgeLesson, type KnowledgeLesson } from '@/lib/knowledge-lessons';
import { getProblemById } from '@/lib/problems';
import { ProgressRadar } from '@/components/RadarChart';
import { KnowledgeRoadmap } from '@/components/KnowledgeRoadmap';
import { LearningPathPlanner } from '@/components/LearningPathPlanner';
import { KnowledgeLessonPanel } from '@/components/KnowledgeLessonPanel';
import {
  Target,
  Clock,
  CheckCircle2,
  Circle,
  BookOpen,
  Trophy,
  Zap,
  TrendingUp,
  Star,
  Rocket,
  Award,
  BarChart3,
  Play,
  ChevronRight,
  Map,
  Route,
  PieChart,
  Flame,
  Target as TargetIcon,
} from 'lucide-react';

interface LearningPathPageProps {
  onStartProblem?: (problemId: number) => void;
}

// 目标配置
const goalConfig: Record<LearningGoal, { label: string; color: string; bgColor: string; icon: React.ReactNode; description: string }> = {
  popularity: { 
    label: '普及组', 
    color: 'text-green-600', 
    bgColor: 'bg-green-50 border-green-200 hover:bg-green-100',
    icon: <Star className="h-4 w-4" />,
    description: 'NOIP普及组水平，适合初学者'
  },
  improvement: { 
    label: '提高组', 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    icon: <Award className="h-4 w-4" />,
    description: 'NOIP提高组水平，进阶学习'
  },
  provincial: { 
    label: '省选', 
    color: 'text-purple-600', 
    bgColor: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    icon: <Trophy className="h-4 w-4" />,
    description: '省选水平，冲击省队'
  },
  national: { 
    label: '国赛', 
    color: 'text-red-600', 
    bgColor: 'bg-red-50 border-red-200 hover:bg-red-100',
    icon: <Rocket className="h-4 w-4" />,
    description: 'NOI国赛水平，最高目标'
  },
};

// 难度配置
const difficultyConfig = {
  beginner: { label: '入门', color: 'bg-green-100 text-green-800 border-green-200' },
  intermediate: { label: '进阶', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  advanced: { label: '高级', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  expert: { label: '专家', color: 'bg-red-100 text-red-800 border-red-200' },
};

export function LearningPathPage({ onStartProblem }: LearningPathPageProps) {
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>('popularity');
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set(['basics-io', 'basics-variables']));
  const [learningNodes, setLearningNodes] = useState<Set<string>>(new Set(['basics-operators']));
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'path' | 'stats'>('roadmap');
  const [viewingLesson, setViewingLesson] = useState<KnowledgeLesson | null>(null);

  // 获取当前学习路径
  const currentPath = useMemo(() => {
    return learningPaths.find(p => p.goal === selectedGoal);
  }, [selectedGoal]);

  // 获取推荐学习的知识点
  const recommendedNodes = useMemo(() => {
    return getRecommendedNodes(completedNodes).slice(0, 4);
  }, [completedNodes]);

  // 计算各类别进度
  const categoryProgress = useMemo(() => {
    const progress: Record<string, { completed: number; total: number }> = {};

    knowledgeTree.forEach(node => {
      if (!progress[node.category]) {
        progress[node.category] = { completed: 0, total: 0 };
      }
      progress[node.category].total++;
      if (completedNodes.has(node.id)) {
        progress[node.category].completed++;
      }
    });

    return Object.entries(progress).map(([category, data]) => ({
      category,
      completed: data.completed,
      total: data.total,
    }));
  }, [completedNodes]);

  // 计算路径完成进度
  const pathProgress = useMemo(() => {
    if (!currentPath) return { currentStage: 0, totalStages: 0, progress: 0 };

    let completedStages = 0;
    currentPath.stages.forEach(stage => {
      const allNodesCompleted = stage.knowledgeNodes.every(id => completedNodes.has(id));
      if (allNodesCompleted) completedStages++;
    });

    return {
      currentStage: completedStages + 1,
      totalStages: currentPath.stages.length,
      progress: Math.round((completedStages / currentPath.stages.length) * 100),
    };
  }, [currentPath, completedNodes]);

  // 计算总学习时长
  const totalLearnedHours = useMemo(() => {
    return Math.round(
      knowledgeTree
        .filter(n => completedNodes.has(n.id))
        .reduce((sum, n) => sum + n.estimatedHours, 0)
    );
  }, [completedNodes]);

  // 开始学习 - 打开讲解面板
  const startLearning = (nodeId: string) => {
    const node = knowledgeTree.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setLearningNodes(prev => new Set([...prev, nodeId]));
      const lesson = getKnowledgeLesson(nodeId);
      if (lesson) {
        setViewingLesson(lesson);
      }
    }
  };

  // 标记已掌握
  const markAsCompleted = (nodeId: string) => {
    setCompletedNodes(prev => new Set([...prev, nodeId]));
    setLearningNodes(prev => {
      const newSet = new Set(prev);
      newSet.delete(nodeId);
      return newSet;
    });
  };

  // 关闭讲解面板
  const closeLessonAndReturn = () => {
    setViewingLesson(null);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* 顶部状态栏 - 紧凑 */}
      <div className="px-6 py-3 border-b bg-white/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between">
          {/* 左侧：标题和统计 */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-lg font-bold">学习路径</span>
            </div>
            
            {/* 快速统计 */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-semibold text-orange-600">{completedNodes.size}</span>
                <span className="text-muted-foreground">已学</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="font-semibold text-blue-600">{totalLearnedHours}h</span>
                <span className="text-muted-foreground">时长</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-semibold text-green-600">{pathProgress.progress}%</span>
                <span className="text-muted-foreground">进度</span>
              </div>
            </div>
          </div>

          {/* 右侧：目标选择 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">学习目标：</span>
            <div className="flex gap-1">
              {Object.entries(goalConfig).map(([goal, config]) => (
                <Button
                  key={goal}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGoal(goal as LearningGoal)}
                  className={`h-8 px-3 ${selectedGoal === goal ? config.bgColor + ' border' : ''}`}
                >
                  <span className={selectedGoal === goal ? config.color : ''}>{config.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {viewingLesson && selectedNode ? (
          /* 知识点讲解面板 - 全屏 */
          <KnowledgeLessonPanel
            lesson={viewingLesson}
            knowledgeNode={selectedNode}
            isCompleted={completedNodes.has(selectedNode.id)}
            onClose={closeLessonAndReturn}
            onMarkCompleted={() => markAsCompleted(selectedNode.id)}
            onStartProblem={(problemId) => {
              const id = parseInt(problemId, 10);
              if (!isNaN(id) && onStartProblem) {
                onStartProblem(id);
              }
            }}
            getProblemTitle={(id) => {
              const numId = parseInt(id, 10);
              if (!isNaN(numId)) {
                const problem = getProblemById(numId);
                if (problem) return problem.title;
              }
              return `题目 #${id}`;
            }}
            getProblemDifficulty={(id) => {
              const numId = parseInt(id, 10);
              if (!isNaN(numId)) {
                const problem = getProblemById(numId);
                if (problem) {
                  const diffMap: Record<string, 'easy' | 'medium' | 'hard'> = {
                    'beginner': 'easy',
                    'intermediate': 'medium',
                    'advanced': 'hard',
                    'expert': 'hard',
                  };
                  return diffMap[problem.difficulty] || 'medium';
                }
              }
              return 'medium';
            }}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="h-full flex flex-col">
            {/* Tab导航 */}
            <div className="px-6 pt-4 pb-2 border-b bg-white/50 shrink-0">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="roadmap" className="gap-2 px-4">
                  <Map className="h-4 w-4" />
                  知识地图
                </TabsTrigger>
                <TabsTrigger value="path" className="gap-2 px-4">
                  <Route className="h-4 w-4" />
                  学习路径
                </TabsTrigger>
                <TabsTrigger value="stats" className="gap-2 px-4">
                  <PieChart className="h-4 w-4" />
                  学习统计
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab内容 */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {/* 知识地图 */}
              <TabsContent value="roadmap" className="m-0 h-full flex">
                {/* 左侧：知识地图 */}
                <div className="w-[420px] border-r bg-white flex-shrink-0 h-full">
                  <KnowledgeRoadmap
                    completedNodes={completedNodes}
                    learningNodes={learningNodes}
                    onNodeSelect={setSelectedNode}
                    onViewLesson={(nodeId) => {
                      const node = knowledgeTree.find(n => n.id === nodeId);
                      if (node) {
                        setSelectedNode(node);
                        const lesson = getKnowledgeLesson(nodeId);
                        if (lesson) setViewingLesson(lesson);
                      }
                    }}
                    selectedNodeId={selectedNode?.id}
                  />
                </div>

                {/* 右侧：知识点详情或推荐 */}
                <div className="flex-1 h-full overflow-hidden">
                  {selectedNode ? (
                    <ScrollArea className="h-full">
                      <div className="p-6 max-w-3xl">
                        {/* 知识点头部 */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="text-2xl font-bold">{selectedNode.name}</h2>
                              <Badge className={difficultyConfig[selectedNode.difficulty].color}>
                                {difficultyConfig[selectedNode.difficulty].label}
                              </Badge>
                              {completedNodes.has(selectedNode.id) && (
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  已掌握
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{selectedNode.category}</p>
                          </div>
                        </div>

                        {/* 描述卡片 */}
                        <Card className="p-5 mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="h-4 w-4 text-blue-500" />
                            <h3 className="font-semibold">知识点描述</h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{selectedNode.description}</p>
                        </Card>

                        {/* 数据卡片 */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                            <Clock className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-blue-600">{selectedNode.estimatedHours}h</div>
                            <div className="text-sm text-muted-foreground">预计时长</div>
                          </Card>
                          <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
                            <TrendingUp className="h-5 w-5 text-orange-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-orange-600">{selectedNode.importance}/5</div>
                            <div className="text-sm text-muted-foreground">重要程度</div>
                          </Card>
                          <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                            <Zap className="h-5 w-5 text-purple-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-purple-600">{selectedNode.problems.length}</div>
                            <div className="text-sm text-muted-foreground">相关题目</div>
                          </Card>
                        </div>

                        {/* 标签 */}
                        {selectedNode.tags.length > 0 && (
                          <Card className="p-4 mb-6">
                            <h3 className="font-semibold mb-3">相关标签</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedNode.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                              ))}
                            </div>
                          </Card>
                        )}

                        {/* 前置知识点 */}
                        {selectedNode.prerequisites.length > 0 && (
                          <Card className="p-4 mb-6">
                            <h3 className="font-semibold mb-3">前置知识点</h3>
                            <div className="space-y-2">
                              {selectedNode.prerequisites.map(preId => {
                                const preNode = knowledgeTree.find(n => n.id === preId);
                                const isCompleted = completedNodes.has(preId);
                                return preNode ? (
                                  <div
                                    key={preId}
                                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                                    onClick={() => setSelectedNode(preNode)}
                                  >
                                    <div className="flex items-center gap-2">
                                      {isCompleted ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Circle className="h-4 w-4 text-muted-foreground" />
                                      )}
                                      <span className="text-sm">{preNode.name}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </Card>
                        )}

                        {/* 开始学习按钮 */}
                        <Button
                          className="w-full h-12 text-base"
                          size="lg"
                          onClick={() => startLearning(selectedNode.id)}
                        >
                          <Play className="h-5 w-5 mr-2" />
                          开始学习
                        </Button>
                      </div>
                    </ScrollArea>
                  ) : (
                    /* 推荐学习 */
                    <ScrollArea className="h-full">
                      <div className="p-6">
                        {/* 欢迎区域 */}
                        <div className="text-center py-8 mb-8">
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 mb-4 shadow-lg">
                            <Target className="h-10 w-10 text-white" />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">选择知识点开始学习</h2>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            从左侧知识地图中选择知识点，或从下方推荐开始你的学习之旅
                          </p>
                        </div>

                        {/* 推荐学习卡片 */}
                        <div className="mb-8">
                          <div className="flex items-center gap-2 mb-4">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            <h3 className="font-semibold text-lg">推荐学习</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {recommendedNodes.map(node => (
                              <Card
                                key={node.id}
                                className="p-5 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all group"
                                onClick={() => setSelectedNode(node)}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <span className="font-semibold text-lg group-hover:text-primary transition-colors">{node.name}</span>
                                  <Badge variant="outline">{node.estimatedHours}h</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{node.description}</p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="secondary">{node.category}</Badge>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {/* 学习提示 */}
                        <Card className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">学习建议</h4>
                              <p className="text-sm text-muted-foreground">
                                {recommendedNodes.length > 0 ? (
                                  <>
                                    建议下一步学习 <strong className="text-foreground">{recommendedNodes[0].name}</strong>，
                                    预计需要 {recommendedNodes[0].estimatedHours} 小时。掌握此知识点对后续学习非常重要。
                                  </>
                                ) : (
                                  <>太棒了！你已经完成了所有基础知识点的学习。建议继续挑战更高难度的知识点。</>
                                )}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </TabsContent>

              {/* 学习路径 */}
              <TabsContent value="path" className="m-0 h-full">
                <LearningPathPlanner
                  selectedGoal={selectedGoal}
                  completedNodes={completedNodes}
                  onGoalSelect={setSelectedGoal}
                  onNodeSelect={(node) => {
                    setSelectedNode(node);
                    const lesson = getKnowledgeLesson(node.id);
                    if (lesson) setViewingLesson(lesson);
                  }}
                />
              </TabsContent>

              {/* 学习统计 */}
              <TabsContent value="stats" className="m-0 h-full overflow-auto">
                <div className="p-6 max-w-4xl mx-auto">
                  {/* 统计卡片 */}
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    <Card className="p-5 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{completedNodes.size}</div>
                      <div className="text-sm text-muted-foreground">已学知识点</div>
                    </Card>
                    <Card className="p-5 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-1">{knowledgeTree.length - completedNodes.size}</div>
                      <div className="text-sm text-muted-foreground">待学知识点</div>
                    </Card>
                    <Card className="p-5 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{pathProgress.progress}%</div>
                      <div className="text-sm text-muted-foreground">路径完成度</div>
                    </Card>
                    <Card className="p-5 text-center bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <div className="text-3xl font-bold text-orange-600 mb-1">{totalLearnedHours}h</div>
                      <div className="text-sm text-muted-foreground">已学习时长</div>
                    </Card>
                  </div>

                  {/* 能力雷达图 */}
                  <Card className="p-6 mb-8">
                    <div className="flex items-center gap-2 mb-6">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-lg">能力雷达图</h3>
                    </div>
                    <div className="flex justify-center">
                      <ProgressRadar data={categoryProgress} />
                    </div>
                  </Card>

                  {/* 分类进度 */}
                  <Card className="p-6 mb-8">
                    <h3 className="font-semibold text-lg mb-6">各分类进度</h3>
                    <div className="space-y-4">
                      {categoryProgress.map(item => {
                        const percentage = item.total > 0 ? (item.completed / item.total) * 100 : 0;
                        return (
                          <div key={item.category}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{item.category}</span>
                              <span className="text-sm text-muted-foreground">{item.completed}/{item.total}</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* 学习建议 */}
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">学习建议</h4>
                        <p className="text-muted-foreground">
                          {recommendedNodes.length > 0 ? (
                            <>
                              建议下一步学习 <strong className="text-foreground">{recommendedNodes[0].name}</strong>，
                              预计需要 {recommendedNodes[0].estimatedHours} 小时。
                            </>
                          ) : (
                            <>太棒了！你已经完成了所有基础知识点的学习。建议继续挑战更高难度。</>
                          )}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
}

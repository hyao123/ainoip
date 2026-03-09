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
import { ProgressRadar } from '@/components/RadarChart';
import {
  KnowledgeRoadmap,
  KnowledgeNodeCard,
} from '@/components/KnowledgeRoadmap';
import {
  Target,
  Clock,
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  Trophy,
  Zap,
  TrendingUp,
  Users,
  Calendar,
  ChevronRight,
  Star,
  Rocket,
  Award,
} from 'lucide-react';

// 目标配置
const goalConfig: Record<LearningGoal, { label: string; color: string; icon: React.ReactNode }> = {
  popularity: { label: '普及组', color: 'text-green-600', icon: <Star className="h-4 w-4" /> },
  improvement: { label: '提高组', color: 'text-blue-600', icon: <Award className="h-4 w-4" /> },
  provincial: { label: '省选', color: 'text-purple-600', icon: <Trophy className="h-4 w-4" /> },
  national: { label: '国赛', color: 'text-red-600', icon: <Rocket className="h-4 w-4" /> },
};

export function LearningPathPage() {
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>('popularity');
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set(['basics-io', 'basics-variables']));
  const [learningNodes, setLearningNodes] = useState<Set<string>>(new Set(['basics-operators']));
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'path' | 'stats'>('roadmap');

  // 获取当前学习路径
  const currentPath = useMemo(() => {
    return learningPaths.find(p => p.goal === selectedGoal);
  }, [selectedGoal]);

  // 获取推荐学习的知识点
  const recommendedNodes = useMemo(() => {
    return getRecommendedNodes(completedNodes).slice(0, 5);
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

  // 标记知识点为已完成
  const markAsCompleted = (nodeId: string) => {
    setCompletedNodes(prev => new Set([...prev, nodeId]));
    setLearningNodes(prev => {
      const newSet = new Set(prev);
      newSet.delete(nodeId);
      return newSet;
    });
  };

  // 开始学习知识点
  const startLearning = (nodeId: string) => {
    setLearningNodes(prev => new Set([...prev, nodeId]));
    setSelectedNode(knowledgeTree.find(n => n.id === nodeId) || null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* 顶部标题栏 */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">学习路径规划</h1>
              <p className="text-sm text-gray-500">个性化学习计划，助你高效提升</p>
            </div>
          </div>

          {/* 目标选择 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">目标：</span>
            <div className="flex gap-1">
              {Object.entries(goalConfig).map(([goal, config]) => (
                <Button
                  key={goal}
                  variant={selectedGoal === goal ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedGoal(goal as LearningGoal)}
                  className="gap-1"
                >
                  {config.icon}
                  {config.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex min-h-0">
        {/* 左侧：知识点树 */}
        <div className="w-80 border-r bg-white">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <div className="px-4 pt-3 border-b">
              <TabsList className="w-full">
                <TabsTrigger value="roadmap" className="flex-1 text-xs">
                  知识地图
                </TabsTrigger>
                <TabsTrigger value="path" className="flex-1 text-xs">
                  学习路径
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex-1 text-xs">
                  能力分析
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="roadmap" className="m-0 h-[calc(100%-40px)]">
              <KnowledgeRoadmap
                completedNodes={completedNodes}
                learningNodes={learningNodes}
                onNodeSelect={setSelectedNode}
                selectedNodeId={selectedNode?.id}
              />
            </TabsContent>

            <TabsContent value="path" className="m-0 h-[calc(100%-40px)] overflow-auto">
              {currentPath && (
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">{currentPath.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{currentPath.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {currentPath.targetAudience}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {currentPath.duration}
                      </div>
                    </div>
                  </div>

                  {/* 阶段列表 */}
                  <div className="space-y-3">
                    {currentPath.stages.map((stage, index) => {
                      const isCompleted = stage.knowledgeNodes.every(id => completedNodes.has(id));
                      const isCurrent = !isCompleted && (index === 0 || currentPath.stages[index - 1].knowledgeNodes.every(id => completedNodes.has(id)));

                      return (
                        <Card
                          key={stage.id}
                          className={`p-3 ${
                            isCompleted ? 'border-green-300 bg-green-50' :
                            isCurrent ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : isCurrent ? (
                                <Circle className="h-5 w-5 text-blue-500 fill-blue-100" />
                              ) : (
                                <Lock className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">阶段{stage.order}: {stage.name}</span>
                                {isCompleted && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                    已完成
                                  </Badge>
                                )}
                                {isCurrent && (
                                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                                    进行中
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{stage.description}</p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <span>{stage.knowledgeNodes.length}个知识点</span>
                                <span>{stage.requiredProblems}道题目</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="stats" className="m-0 h-[calc(100%-40px)] overflow-auto">
              <div className="p-4">
                <h3 className="font-semibold mb-4">能力雷达图</h3>
                <div className="flex justify-center mb-4">
                  <ProgressRadar data={categoryProgress} />
                </div>

                {/* 分类详情 */}
                <div className="space-y-2">
                  {categoryProgress.map(item => (
                    <div key={item.category} className="flex items-center justify-between text-sm">
                      <span>{item.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${item.total > 0 ? (item.completed / item.total) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-gray-500 w-12 text-right">
                          {item.completed}/{item.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 右侧：详情和推荐 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 选中知识点详情 */}
          {selectedNode ? (
            <div className="p-4 border-b">
              <KnowledgeNodeCard
                node={selectedNode}
                onStartLearning={() => startLearning(selectedNode.id)}
                onPractice={() => {/* 跳转到练习页面 */}}
              />
            </div>
          ) : (
            /* 推荐学习 */
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold">推荐学习</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {recommendedNodes.map(node => (
                  <Card
                    key={node.id}
                    className="p-3 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{node.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {node.estimatedHours}h
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{node.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">{node.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <TrendingUp className="h-3 w-3" />
                        重要度 {node.importance}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 学习统计概览 */}
          <div className="p-4 flex-1 overflow-auto">
            <h3 className="font-semibold mb-4">学习统计</h3>
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{completedNodes.size}</div>
                <div className="text-sm text-gray-500 mt-1">已学知识点</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {knowledgeTree.length - completedNodes.size}
                </div>
                <div className="text-sm text-gray-500 mt-1">待学知识点</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">{pathProgress.progress}%</div>
                <div className="text-sm text-gray-500 mt-1">路径完成度</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.round(knowledgeTree.filter(n => completedNodes.has(n.id)).reduce((sum, n) => sum + n.estimatedHours, 0))}
                </div>
                <div className="text-sm text-gray-500 mt-1">已学习时长(h)</div>
              </Card>
            </div>

            {/* 学习建议 */}
            <Card className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">学习建议</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {recommendedNodes.length > 0 ? (
                      <>
                        建议下一步学习 <strong>{recommendedNodes[0].name}</strong>，
                        预计需要 {recommendedNodes[0].estimatedHours} 小时。
                        该知识点属于{recommendedNodes[0].category}，重要程度为 {recommendedNodes[0].importance}/5。
                      </>
                    ) : (
                      <>
                        太棒了！你已经完成了所有基础知识点的学习。建议继续挑战更高难度的题目，
                        或者切换到更高的学习目标继续提升。
                      </>
                    )}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

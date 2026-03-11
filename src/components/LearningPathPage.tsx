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
import { getProblemById, type Problem, difficultyConfig as bankDifficultyConfig } from '@/lib/problems';
import { ProgressRadar } from '@/components/RadarChart';
import { KnowledgeRoadmap } from '@/components/KnowledgeRoadmap';
import { LearningPathPlanner } from '@/components/LearningPathPlanner';
import { KnowledgeLessonPanel } from '@/components/KnowledgeLessonPanel';
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
  Star,
  Rocket,
  Award,
  BarChart3,
  ArrowLeft,
  Play,
} from 'lucide-react';

interface LearningPathPageProps {
  onStartProblem?: (problemId: number) => void;
}

// 目标配置
const goalConfig: Record<LearningGoal, { label: string; color: string; icon: React.ReactNode }> = {
  popularity: { label: '普及组', color: 'text-green-600', icon: <Star className="h-4 w-4" /> },
  improvement: { label: '提高组', color: 'text-blue-600', icon: <Award className="h-4 w-4" /> },
  provincial: { label: '省选', color: 'text-purple-600', icon: <Trophy className="h-4 w-4" /> },
  national: { label: '国赛', color: 'text-red-600', icon: <Rocket className="h-4 w-4" /> },
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

  // 开始学习 - 打开讲解面板
  const startLearning = (nodeId: string) => {
    const node = knowledgeTree.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setLearningNodes(prev => new Set([...prev, nodeId]));
      // 自动打开讲解面板
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

  // 关闭讲解面板，返回知识点列表
  const closeLessonAndReturn = () => {
    setViewingLesson(null);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
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
        <div className="w-80 border-r bg-white flex-shrink-0">
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
                  统计分析
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="roadmap" className="m-0 h-[calc(100%-40px)]">
              <KnowledgeRoadmap
                completedNodes={completedNodes}
                learningNodes={learningNodes}
                onNodeSelect={setSelectedNode}
                onViewLesson={(nodeId) => {
                  const lesson = getKnowledgeLesson(nodeId);
                  if (lesson) {
                    setViewingLesson(lesson);
                  }
                }}
                selectedNodeId={selectedNode?.id}
              />
            </TabsContent>

            <TabsContent value="path" className="m-0 h-[calc(100%-40px)]">
              <LearningPathPlanner
                selectedGoal={selectedGoal}
                completedNodes={completedNodes}
                onGoalSelect={setSelectedGoal}
                onNodeSelect={(node) => {
                  setSelectedNode(node);
                  const lesson = getKnowledgeLesson(node.id);
                  if (lesson) {
                    setViewingLesson(lesson);
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="stats" className="m-0 h-[calc(100%-40px)] overflow-auto">
              <div className="p-4 space-y-4">
                {/* 学习统计卡片 */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{completedNodes.size}</div>
                    <div className="text-xs text-gray-600 mt-1">已学知识点</div>
                  </Card>
                  <Card className="p-3 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {knowledgeTree.length - completedNodes.size}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">待学知识点</div>
                  </Card>
                  <Card className="p-3 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{pathProgress.progress}%</div>
                    <div className="text-xs text-gray-600 mt-1">路径完成度</div>
                  </Card>
                  <Card className="p-3 text-center bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(knowledgeTree.filter(n => completedNodes.has(n.id)).reduce((sum, n) => sum + n.estimatedHours, 0))}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">已学习时长(h)</div>
                  </Card>
                </div>

                <Separator />

                {/* 能力雷达图 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <h3 className="font-semibold text-sm">能力雷达图</h3>
                  </div>
                  <div className="flex justify-center">
                    <ProgressRadar data={categoryProgress} />
                  </div>
                </div>

                <Separator />

                {/* 分类进度 */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">各分类进度</h3>
                  <div className="space-y-2">
                    {categoryProgress.map(item => (
                      <div key={item.category} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${item.total > 0 ? (item.completed / item.total) * 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-gray-500 w-12 text-right text-xs">
                            {item.completed}/{item.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 学习建议 */}
                <Card className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">学习建议</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {recommendedNodes.length > 0 ? (
                          <>
                            建议下一步学习 <strong>{recommendedNodes[0].name}</strong>，
                            预计需要 {recommendedNodes[0].estimatedHours} 小时。
                          </>
                        ) : (
                          <>
                            太棒了！你已经完成了所有基础知识点的学习。建议继续挑战更高难度。
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 右侧：知识点详情卡片 */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {viewingLesson && selectedNode ? (
            /* 知识点讲解面板 */
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
                  if (problem) {
                    return problem.title;
                  }
                }
                return `题目 #${id}`;
              }}
              getProblemDifficulty={(id) => {
                const numId = parseInt(id, 10);
                if (!isNaN(numId)) {
                  const problem = getProblemById(numId);
                  if (problem) {
                    // 映射难度到旧格式
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
          ) : selectedNode ? (
            /* 选中知识点详情 - 简化版，只有开始学习按钮 */
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {/* 知识点标题和基本信息 */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-800">{selectedNode.name}</h2>
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
                    <p className="text-gray-500">{selectedNode.category}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedNode(null)}
                  >
                    返回
                  </Button>
                </div>

                {/* 描述 */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    知识点描述
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedNode.description}</p>
                </Card>

                {/* 学习信息 */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <Clock className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-800">{selectedNode.estimatedHours}h</div>
                    <div className="text-sm text-gray-500">预计时长</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <TrendingUp className="h-5 w-5 text-orange-500 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-800">{selectedNode.importance}/5</div>
                    <div className="text-sm text-gray-500">重要程度</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <Zap className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-800">{selectedNode.problems.length}</div>
                    <div className="text-sm text-gray-500">相关题目</div>
                  </Card>
                </div>

                {/* 标签 */}
                {selectedNode.tags.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedNode.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}

                {/* 前置知识点 */}
                {selectedNode.prerequisites.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">前置知识点</h3>
                    <div className="space-y-2">
                      {selectedNode.prerequisites.map(preId => {
                        const preNode = knowledgeTree.find(n => n.id === preId);
                        const isCompleted = completedNodes.has(preId);
                        return preNode ? (
                          <div 
                            key={preId}
                            className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setSelectedNode(preNode)}
                          >
                            <div className="flex items-center gap-2">
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Circle className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="text-sm">{preNode.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">{preNode.category}</Badge>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </Card>
                )}

                {/* 唯一入口：开始学习按钮 */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    className="flex-1 h-14 text-lg"
                    size="lg"
                    onClick={() => startLearning(selectedNode.id)}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    开始学习
                  </Button>
                </div>

                {/* 学习提示 */}
                {getKnowledgeLesson(selectedNode.id) && (
                  <p className="text-center text-sm text-gray-500">
                    点击"开始学习"将打开知识点讲解，包含理论知识和练习题目
                  </p>
                )}
              </div>
            </ScrollArea>
          ) : (
            /* 默认：推荐学习 */
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {/* 欢迎信息 */}
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">选择一个知识点开始学习</h2>
                  <p className="text-gray-500 max-w-md mx-auto">
                    从左侧知识地图中选择一个知识点，或者从下方推荐开始你的学习之旅
                  </p>
                </div>

                {/* 推荐学习 */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-semibold text-lg">推荐学习</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {recommendedNodes.map(node => (
                      <Card
                        key={node.id}
                        className="p-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                        onClick={() => setSelectedNode(node)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-lg">{node.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {node.estimatedHours}h
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{node.description}</p>
                        <div className="flex items-center justify-between">
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

                {/* 快速入口 */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 text-center cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                    onClick={() => setActiveTab('roadmap')}>
                    <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="font-medium">浏览知识地图</div>
                    <div className="text-xs text-gray-500 mt-1">查看完整知识点结构</div>
                  </Card>
                  <Card className="p-4 text-center cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                    onClick={() => setActiveTab('path')}>
                    <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="font-medium">学习路径</div>
                    <div className="text-xs text-gray-500 mt-1">按计划系统学习</div>
                  </Card>
                  <Card className="p-4 text-center cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                    onClick={() => setActiveTab('stats')}>
                    <BarChart3 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="font-medium">学习统计</div>
                    <div className="text-xs text-gray-500 mt-1">查看学习进度</div>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}

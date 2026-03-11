'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  learningPaths,
  knowledgeTree,
  type LearningPath,
  type LearningStage,
  type KnowledgeNode,
  type LearningGoal,
} from '@/lib/learning-path';
import {
  Target,
  Clock,
  Users,
  ChevronRight,
  CheckCircle,
  Circle,
  Lock,
  Play,
  Trophy,
  Map,
  Milestone,
  BookOpen,
  Star,
} from 'lucide-react';

interface LearningPathPlannerProps {
  selectedGoal?: LearningGoal;
  completedNodes?: Set<string>;
  onGoalSelect?: (goal: LearningGoal) => void;
  onStageSelect?: (stage: LearningStage, path: LearningPath) => void;
  onNodeSelect?: (node: KnowledgeNode) => void;
}

const goalConfig: Record<LearningGoal, { 
  label: string; 
  icon: React.ReactNode; 
  color: string;
  description: string;
}> = {
  popularity: {
    label: '普及组',
    icon: <Star className="h-5 w-5" />,
    color: 'text-blue-500',
    description: 'NOIP普及组，适合初学者',
  },
  improvement: {
    label: '提高组',
    icon: <Trophy className="h-5 w-5" />,
    color: 'text-purple-500',
    description: 'NOIP提高组，深入算法学习',
  },
  provincial: {
    label: '省选',
    icon: <Target className="h-5 w-5" />,
    color: 'text-orange-500',
    description: '省选级别，高级算法',
  },
  national: {
    label: '国赛',
    icon: <Trophy className="h-5 w-5 fill-yellow-400 text-yellow-400" />,
    color: 'text-yellow-500',
    description: 'NOI国赛，顶尖水平',
  },
};

export function LearningPathPlanner({
  selectedGoal = 'popularity',
  completedNodes = new Set(),
  onGoalSelect,
  onStageSelect,
  onNodeSelect,
}: LearningPathPlannerProps) {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<LearningStage | null>(null);

  // 计算每条路径的进度
  const getPathProgress = (path: LearningPath) => {
    const allNodes = path.stages.flatMap(s => s.knowledgeNodes);
    const completedCount = allNodes.filter(id => completedNodes.has(id)).length;
    return {
      completed: completedCount,
      total: allNodes.length,
      percentage: Math.round((completedCount / allNodes.length) * 100),
    };
  };

  // 计算阶段进度
  const getStageProgress = (stage: LearningStage) => {
    const completedCount = stage.knowledgeNodes.filter(id => completedNodes.has(id)).length;
    return {
      completed: completedCount,
      total: stage.knowledgeNodes.length,
      percentage: Math.round((completedCount / stage.knowledgeNodes.length) * 100),
    };
  };

  // 获取阶段状态
  const getStageStatus = (stage: LearningStage, path: LearningPath, stageIndex: number) => {
    const progress = getStageProgress(stage);
    
    if (progress.percentage === 100) return 'completed';
    
    // 检查前置阶段是否完成
    if (stageIndex > 0) {
      const prevStage = path.stages[stageIndex - 1];
      const prevProgress = getStageProgress(prevStage);
      if (prevProgress.percentage < 80) return 'locked';
    }
    
    if (progress.percentage > 0) return 'learning';
    return 'available';
  };

  // 获取知识点节点
  const getNode = (nodeId: string) => knowledgeTree.find(n => n.id === nodeId);

  const handleStageClick = (stage: LearningStage, path: LearningPath) => {
    setSelectedStage(stage);
    onStageSelect?.(stage, path);
  };

  const currentPath = useMemo(() => {
    return learningPaths.find(p => p.goal === selectedGoal);
  }, [selectedGoal]);

  return (
    <div className="flex flex-col h-full">
      {/* 顶部目标选择 */}
      <div className="px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2 mb-3">
          <Map className="h-5 w-5 text-primary" />
          <span className="font-semibold">学习目标</span>
        </div>
        <div className="flex gap-2">
          {Object.entries(goalConfig).map(([goal, config]) => {
            const path = learningPaths.find(p => p.goal === goal);
            if (!path) return null;
            
            const progress = getPathProgress(path);
            const isSelected = selectedGoal === goal;
            
            return (
              <Button
                key={goal}
                variant={isSelected ? 'default' : 'outline'}
                className={`flex-1 h-auto py-2 flex-col gap-1 ${isSelected ? '' : 'hover:bg-muted'}`}
                onClick={() => onGoalSelect?.(goal as LearningGoal)}
              >
                <div className={`flex items-center gap-1 ${config.color}`}>
                  {config.icon}
                  <span className="font-medium">{config.label}</span>
                </div>
                <div className="flex items-center gap-1 text-xs opacity-80">
                  <span>{progress.percentage}%</span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* 当前路径详情 */}
      {currentPath && (
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* 路径概述 */}
            <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {goalConfig[currentPath.goal].icon}
                    {currentPath.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentPath.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{currentPath.targetAudience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{currentPath.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {getPathProgress(currentPath).percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getPathProgress(currentPath).completed}/{getPathProgress(currentPath).total} 知识点
                  </div>
                </div>
              </div>
            </Card>

            {/* 学习阶段时间线 */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Milestone className="h-4 w-4 text-primary" />
                学习阶段
              </h4>
              
              <div className="relative">
                {/* 时间线 */}
                <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-border" />
                
                <div className="space-y-4">
                  {currentPath.stages.map((stage, index) => {
                    const status = getStageStatus(stage, currentPath, index);
                    const progress = getStageProgress(stage);
                    
                    const statusIcons = {
                      completed: <CheckCircle className="h-5 w-5 text-green-500" />,
                      learning: <Play className="h-5 w-5 text-yellow-500" />,
                      available: <Circle className="h-5 w-5 text-blue-500" />,
                      locked: <Lock className="h-5 w-5 text-gray-400" />,
                    };

                    return (
                      <Card
                        key={stage.id}
                        className={`
                          relative ml-10 p-4 cursor-pointer transition-all
                          ${status === 'locked' ? 'opacity-60' : 'hover:shadow-md hover:border-primary/50'}
                        `}
                        onClick={() => status !== 'locked' && handleStageClick(stage, currentPath)}
                      >
                        {/* 时间线节点 */}
                        <div className="absolute -left-10 top-4 w-8 h-8 rounded-full bg-background border-2 flex items-center justify-center">
                          {statusIcons[status]}
                        </div>

                        {/* 阶段标题 */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium">{stage.name}</h5>
                              <Badge variant={status === 'completed' ? 'default' : 'outline'} className="text-xs">
                                第{stage.order}阶段
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {stage.description}
                            </p>
                          </div>
                          {status !== 'locked' && (
                            <div className="text-right">
                              <div className="text-sm font-medium">{progress.percentage}%</div>
                              <Progress value={progress.percentage} className="w-16 h-1.5 mt-1" />
                            </div>
                          )}
                        </div>

                        {/* 阶段信息 */}
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span>{stage.knowledgeNodes.length} 个知识点</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Target className="h-4 w-4" />
                            <span>完成 {stage.requiredProblems} 道题</span>
                          </div>
                        </div>

                        {/* 学习提示 */}
                        {stage.tips.length > 0 && (
                          <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
                            <span className="font-medium">学习提示: </span>
                            {stage.tips[0]}
                          </div>
                        )}

                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}

      {/* 阶段详情对话框 */}
      <Dialog open={!!selectedStage} onOpenChange={() => setSelectedStage(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          {selectedStage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedStage.name}</DialogTitle>
                <DialogDescription>{selectedStage.description}</DialogDescription>
              </DialogHeader>

              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4 mt-4">
                  {/* 知识点列表 */}
                  <div>
                    <h4 className="font-medium mb-3">知识点</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedStage.knowledgeNodes.map(nodeId => {
                        const node = getNode(nodeId);
                        if (!node) return null;
                        
                        const isCompleted = completedNodes.has(nodeId);
                        
                        return (
                          <Card
                            key={nodeId}
                            className={`p-3 cursor-pointer hover:border-primary/50 transition-colors ${
                              isCompleted ? 'border-green-400 bg-green-50/50' : ''
                            }`}
                            onClick={() => {
                              onNodeSelect?.(node);
                              setSelectedStage(null);
                            }}
                          >
                            <div className="flex items-start gap-2">
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <h5 className="font-medium text-sm">{node.name}</h5>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {node.description}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-[10px]">
                                    {node.estimatedHours}h
                                  </Badge>
                                  <Badge variant="outline" className="text-[10px]">
                                    {node.problems.length} 题
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* 学习提示 */}
                  {selectedStage.tips.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">学习提示</h4>
                      <ul className="space-y-1">
                        {selectedStage.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <Button variant="outline" onClick={() => setSelectedStage(null)}>
                  关闭
                </Button>
                <Button onClick={() => {
                  // 开始学习第一个可用的知识点
                  const availableNode = selectedStage.knowledgeNodes
                    .map(id => getNode(id))
                    .find(n => n && !completedNodes.has(n.id));
                  if (availableNode) {
                    onNodeSelect?.(availableNode);
                    setSelectedStage(null);
                  }
                }}>
                  继续学习
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
  knowledgeTree,
  getCategoryStats,
  calculateNodeStatus,
  type KnowledgeNode,
} from '@/lib/learning-path';
import {
  Lock,
  Play,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  ChevronRight,
  Circle,
  ArrowRight,
  Star,
  TrendingUp,
} from 'lucide-react';

interface KnowledgeRoadmapProps {
  completedNodes?: Set<string>;
  learningNodes?: Set<string>;
  onNodeSelect?: (node: KnowledgeNode) => void;
  onViewLesson?: (nodeId: string) => void;
  selectedNodeId?: string;
}

const difficultyConfig = {
  beginner: { label: '入门', color: 'bg-green-500', textColor: 'text-green-500' },
  intermediate: { label: '进阶', color: 'bg-blue-500', textColor: 'text-blue-500' },
  advanced: { label: '高级', color: 'bg-orange-500', textColor: 'text-orange-500' },
  expert: { label: '专家', color: 'bg-red-500', textColor: 'text-red-500' },
};

const statusConfig = {
  locked: {
    label: '未解锁',
    icon: Lock,
    color: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600',
    textColor: 'text-gray-400',
    borderColor: 'border-gray-300 dark:border-gray-600',
  },
  available: {
    label: '可学习',
    icon: Play,
    color: 'bg-blue-50 dark:bg-blue-950 border-blue-400',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-400',
  },
  learning: {
    label: '学习中',
    icon: Circle,
    color: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-400',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    borderColor: 'border-yellow-400',
  },
  completed: {
    label: '已完成',
    icon: CheckCircle,
    color: 'bg-green-50 dark:bg-green-950 border-green-400',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-400',
  },
};

export function KnowledgeRoadmap({
  completedNodes = new Set(),
  learningNodes = new Set(),
  onNodeSelect,
  onViewLesson,
  selectedNodeId,
}: KnowledgeRoadmapProps) {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const categoryStats = useMemo(() => getCategoryStats(), []);

  // 计算每个知识点的状态
  const getNodeStatus = (nodeId: string) => {
    if (completedNodes.has(nodeId)) return 'completed';
    if (learningNodes.has(nodeId)) return 'learning';
    return calculateNodeStatus(nodeId, completedNodes);
  };

  // 计算总体进度
  const overallProgress = useMemo(() => {
    const total = knowledgeTree.length;
    const completed = completedNodes.size;
    return Math.round((completed / total) * 100);
  }, [completedNodes]);

  // 获取前置知识点
  const getPrerequisites = (nodeId: string) => {
    const node = knowledgeTree.find(n => n.id === nodeId);
    if (!node) return [];
    return node.prerequisites.map(pid => knowledgeTree.find(n => n.id === pid)).filter(Boolean) as KnowledgeNode[];
  };

  // 获取后续知识点
  const getDependents = (nodeId: string) => {
    return knowledgeTree.filter(n => n.prerequisites.includes(nodeId));
  };

  const handleNodeClick = (node: KnowledgeNode) => {
    setSelectedNode(node);
    onNodeSelect?.(node);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部统计栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-semibold">知识图谱</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={overallProgress} className="w-24 h-2" />
            <span className="text-sm text-muted-foreground">{overallProgress}%</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>已完成 {completedNodes.size}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>学习中 {learningNodes.size}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>可学习</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span>未解锁</span>
          </div>
        </div>
      </div>

      {/* 知识图谱主体 */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {categoryStats.map((category) => {
            // 计算该分类的进度
            const categoryCompleted = category.nodes.filter((n: KnowledgeNode) => completedNodes.has(n.id)).length;
            const categoryProgress = Math.round((categoryCompleted / category.nodes.length) * 100);

            return (
              <div key={category.name} className="space-y-3">
                {/* 分类标题 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {categoryCompleted}/{category.nodes.length}
                    </Badge>
                  </div>
                  <Progress value={categoryProgress} className="w-20 h-1.5" />
                </div>

                {/* 知识点卡片网格 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {category.nodes.map((node: KnowledgeNode) => {
                    const status = getNodeStatus(node.id);
                    const config = statusConfig[status];
                    const diffConfig = difficultyConfig[node.difficulty];
                    const isSelected = selectedNodeId === node.id;
                    const isHovered = hoveredNode === node.id;
                    const StatusIcon = config.icon;

                    return (
                      <Card
                        key={node.id}
                        className={`
                          relative p-3 cursor-pointer transition-all duration-200
                          border-2 ${config.borderColor} ${config.color}
                          hover:shadow-md hover:scale-[1.02]
                          ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
                          ${status === 'locked' ? 'opacity-60' : ''}
                        `}
                        onClick={() => status !== 'locked' && handleNodeClick(node)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {/* 状态图标 */}
                        <div className="absolute top-2 right-2">
                          <StatusIcon className={`h-4 w-4 ${config.textColor}`} />
                        </div>

                        {/* 知识点名称 */}
                        <h4 className="font-medium text-sm pr-6">{node.name}</h4>

                        {/* 难度和时长 */}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-[10px] ${diffConfig.textColor}`}
                          >
                            {diffConfig.label}
                          </Badge>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {node.estimatedHours}h
                          </div>
                        </div>

                        {/* 重要程度 */}
                        <div className="flex items-center gap-1 mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < node.importance
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>

                        {/* 悬浮显示前置依赖 */}
                        {isHovered && node.prerequisites.length > 0 && (
                          <div className="absolute -top-8 left-0 right-0 bg-popover border rounded px-2 py-1 text-xs shadow-lg z-10">
                            <span className="text-muted-foreground">前置: </span>
                            {node.prerequisites.map((pid: string, i: number) => {
                              const prereq = knowledgeTree.find(n => n.id === pid);
                              return (
                                <span key={pid} className={completedNodes.has(pid) ? 'text-green-500' : 'text-red-500'}>
                                  {prereq?.name}{i < node.prerequisites.length - 1 ? ', ' : ''}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* 知识点详情对话框 */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="max-w-lg">
          {selectedNode && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedNode.name}
                  <Badge className={difficultyConfig[selectedNode.difficulty].color}>
                    {difficultyConfig[selectedNode.difficulty].label}
                  </Badge>
                </DialogTitle>
                <DialogDescription>{selectedNode.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* 基本信息 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">预计时长: {selectedNode.estimatedHours} 小时</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">相关题目: {selectedNode.problems.length} 道</span>
                  </div>
                </div>

                {/* 重要程度 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">重要程度:</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < selectedNode.importance
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* 前置知识点 */}
                {selectedNode.prerequisites.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">前置知识点</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNode.prerequisites.map(pid => {
                        const prereq = knowledgeTree.find(n => n.id === pid);
                        const isCompleted = completedNodes.has(pid);
                        return prereq ? (
                          <Badge
                            key={pid}
                            variant={isCompleted ? 'default' : 'outline'}
                            className="gap-1"
                          >
                            {isCompleted && <CheckCircle className="h-3 w-3" />}
                            {prereq.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* 后续知识点 */}
                {getDependents(selectedNode.id).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">解锁知识点</h4>
                    <div className="flex flex-wrap gap-2">
                      {getDependents(selectedNode.id).map(node => (
                        <Badge key={node.id} variant="secondary" className="gap-1">
                          <ArrowRight className="h-3 w-3" />
                          {node.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* 标签 */}
                <div>
                  <h4 className="text-sm font-medium mb-2">标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tags.map(tag => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedNode(null)}>
                    关闭
                  </Button>
                  <Button onClick={() => {
                    setSelectedNode(null);
                    if (onViewLesson) {
                      onViewLesson(selectedNode.id);
                    } else {
                      onNodeSelect?.(selectedNode);
                    }
                  }}>
                    开始学习
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

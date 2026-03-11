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
  Zap,
  Award,
  Sparkles,
  Flame,
  Layers,
} from 'lucide-react';

interface KnowledgeRoadmapProps {
  completedNodes?: Set<string>;
  learningNodes?: Set<string>;
  onNodeSelect?: (node: KnowledgeNode) => void;
  onViewLesson?: (nodeId: string) => void;
  selectedNodeId?: string;
}

const difficultyConfig = {
  beginner: { label: '入门', color: 'bg-emerald-500', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-300' },
  intermediate: { label: '进阶', color: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-300' },
  advanced: { label: '高级', color: 'bg-orange-500', textColor: 'text-orange-600', bgLight: 'bg-orange-50', border: 'border-orange-300' },
  expert: { label: '专家', color: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-50', border: 'border-red-300' },
};

const statusConfig = {
  locked: {
    label: '未解锁',
    icon: Lock,
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    textColor: 'text-slate-400',
    dotColor: 'bg-slate-300',
    glowColor: '',
  },
  available: {
    label: '可学习',
    icon: Sparkles,
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-600',
    dotColor: 'bg-blue-500',
    glowColor: 'shadow-blue-200/50',
  },
  learning: {
    label: '学习中',
    icon: Zap,
    bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-600',
    dotColor: 'bg-amber-500',
    glowColor: 'shadow-amber-200/50',
  },
  completed: {
    label: '已完成',
    icon: CheckCircle,
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    glowColor: 'shadow-emerald-200/50',
  },
};

// 分类图标和颜色映射
const categoryIcons: Record<string, { icon: React.ReactNode; color: string; gradient: string }> = {
  '基础语法': { icon: <Layers className="h-4 w-4" />, color: 'text-blue-600', gradient: 'from-blue-500 to-cyan-500' },
  '数据结构': { icon: <BookOpen className="h-4 w-4" />, color: 'text-purple-600', gradient: 'from-purple-500 to-pink-500' },
  '算法基础': { icon: <Target className="h-4 w-4" />, color: 'text-emerald-600', gradient: 'from-emerald-500 to-teal-500' },
  '高级算法': { icon: <Award className="h-4 w-4" />, color: 'text-orange-600', gradient: 'from-orange-500 to-red-500' },
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

  // 计算各状态数量
  const statusCounts = useMemo(() => {
    let locked = 0, available = 0, learning = 0, completed = 0;
    knowledgeTree.forEach(node => {
      const status = getNodeStatus(node.id);
      if (status === 'locked') locked++;
      else if (status === 'available') available++;
      else if (status === 'learning') learning++;
      else completed++;
    });
    return { locked, available, learning, completed };
  }, [completedNodes, learningNodes]);

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
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50/50 to-white">
      {/* 顶部统计栏 - 精致设计 */}
      <div className="px-5 py-4 border-b bg-white/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between mb-4">
          {/* 标题和进度 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-200">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base">知识图谱</h3>
                <p className="text-xs text-muted-foreground">系统化学习路径</p>
              </div>
            </div>
          </div>

          {/* 进度环 */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-muted/20"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${overallProgress * 1.51} 151`}
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">{overallProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 状态统计条 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-700">已完成 {statusCounts.completed}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-medium text-amber-700">学习中 {statusCounts.learning}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="text-xs font-medium text-blue-700">可学习 {statusCounts.available}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
            <Lock className="w-3 h-3 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">未解锁 {statusCounts.locked}</span>
          </div>
        </div>
      </div>

      {/* 知识图谱主体 */}
      <ScrollArea className="flex-1 p-5">
        <div className="space-y-8">
          {categoryStats.map((category, categoryIndex) => {
            // 计算该分类的进度
            const categoryCompleted = category.nodes.filter((n: KnowledgeNode) => completedNodes.has(n.id)).length;
            const categoryProgress = Math.round((categoryCompleted / category.nodes.length) * 100);
            const categoryConfig = categoryIcons[category.name] || { icon: <BookOpen className="h-4 w-4" />, color: 'text-gray-600', gradient: 'from-gray-500 to-gray-600' };

            return (
              <div key={category.name} className="space-y-4">
                {/* 分类标题 - 精致设计 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryConfig.gradient} shadow-md`}>
                    <div className="text-white">{categoryConfig.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-base">{category.name}</span>
                      <Badge variant="outline" className="text-xs font-medium">
                        {categoryCompleted}/{category.nodes.length}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Progress value={categoryProgress} className="flex-1 h-1.5" />
                      <span className="text-xs font-medium text-muted-foreground">{categoryProgress}%</span>
                    </div>
                  </div>
                </div>

                {/* 知识点卡片网格 - 精致设计 */}
                <div className="grid grid-cols-2 gap-3">
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
                          relative overflow-hidden cursor-pointer transition-all duration-300
                          border-2 ${config.borderColor} ${config.bgColor}
                          hover:shadow-lg hover:${config.glowColor} hover:-translate-y-0.5
                          ${isSelected ? 'ring-2 ring-violet-500 ring-offset-2 shadow-lg' : ''}
                          ${status === 'locked' ? 'opacity-50 grayscale-[30%]' : ''}
                          group
                        `}
                        onClick={() => status !== 'locked' && handleNodeClick(node)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {/* 顶部装饰条 */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${diffConfig.color}`} />

                        {/* 内容区域 */}
                        <div className="p-4 pt-5">
                          {/* 状态角标 */}
                          <div className="absolute top-3 right-3">
                            <div className={`
                              p-1.5 rounded-full ${status === 'completed' ? 'bg-emerald-500' : status === 'learning' ? 'bg-amber-500' : status === 'available' ? 'bg-blue-500' : 'bg-slate-300'}
                              ${status !== 'locked' ? 'shadow-md' : ''} transition-transform group-hover:scale-110
                            `}>
                              <StatusIcon className={`h-3.5 w-3.5 text-white`} />
                            </div>
                          </div>

                          {/* 知识点名称 */}
                          <h4 className="font-semibold text-sm mb-2 pr-8 group-hover:text-purple-700 transition-colors">
                            {node.name}
                          </h4>

                          {/* 标签行 */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge 
                              variant="secondary" 
                              className={`text-[10px] px-2 py-0.5 ${diffConfig.bgLight} ${diffConfig.textColor} ${diffConfig.border} border`}
                            >
                              {diffConfig.label}
                            </Badge>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {node.estimatedHours}h
                            </div>
                          </div>

                          {/* 重要程度 - 星级 */}
                          <div className="flex items-center gap-0.5 mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 transition-all ${
                                  i < node.importance
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>

                          {/* 悬浮显示前置依赖 */}
                          {isHovered && status !== 'locked' && node.prerequisites.length > 0 && (
                            <div className="absolute left-0 right-0 -bottom-1 translate-y-full bg-popover border rounded-lg px-3 py-2 text-xs shadow-xl z-20">
                              <div className="flex items-center gap-1.5 mb-1">
                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground font-medium">前置知识点</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {node.prerequisites.map((pid: string) => {
                                  const prereq = knowledgeTree.find(n => n.id === pid);
                                  const isCompleted = completedNodes.has(pid);
                                  return prereq ? (
                                    <Badge 
                                      key={pid} 
                                      variant="outline"
                                      className={`text-[10px] ${isCompleted ? 'border-emerald-300 text-emerald-600' : 'border-red-300 text-red-500'}`}
                                    >
                                      {isCompleted && <CheckCircle className="h-2.5 w-2.5 mr-1" />}
                                      {prereq.name}
                                    </Badge>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* 知识点详情对话框 - 精致设计 */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          {selectedNode && (
            <>
              {/* 头部渐变区域 */}
              <div className={`bg-gradient-to-r ${difficultyConfig[selectedNode.difficulty].color} p-6 text-white`}>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl text-white">{selectedNode.name}</DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-white/20 text-white border-white/30 text-xs">
                          {difficultyConfig[selectedNode.difficulty].label}
                        </Badge>
                        <span className="text-white/80 text-xs">{selectedNode.category}</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              {/* 内容区域 */}
              <div className="p-6 space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedNode.description}</p>

                {/* 统计卡片 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <Clock className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-lg font-bold text-blue-600">{selectedNode.estimatedHours}h</span>
                    <span className="text-xs text-muted-foreground">预计时长</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-purple-50 border border-purple-100">
                    <Target className="h-5 w-5 text-purple-500 mb-1" />
                    <span className="text-lg font-bold text-purple-600">{selectedNode.problems.length}</span>
                    <span className="text-xs text-muted-foreground">相关题目</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <Star className="h-5 w-5 text-amber-500 mb-1" />
                    <span className="text-lg font-bold text-amber-600">{selectedNode.importance}/5</span>
                    <span className="text-xs text-muted-foreground">重要程度</span>
                  </div>
                </div>

                {/* 前置知识点 */}
                {selectedNode.prerequisites.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      前置知识点
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNode.prerequisites.map(pid => {
                        const prereq = knowledgeTree.find(n => n.id === pid);
                        const isCompleted = completedNodes.has(pid);
                        return prereq ? (
                          <Badge
                            key={pid}
                            variant={isCompleted ? 'default' : 'outline'}
                            className={`gap-1 ${isCompleted ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
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
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      解锁知识点
                    </h4>
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
                {selectedNode.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">相关标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNode.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedNode(null)}>
                    关闭
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                    onClick={() => {
                      setSelectedNode(null);
                      if (onViewLesson) {
                        onViewLesson(selectedNode.id);
                      } else {
                        onNodeSelect?.(selectedNode);
                      }
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    开始学习
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

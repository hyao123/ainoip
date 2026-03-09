'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  knowledgeTree,
  type KnowledgeNode,
  type UserProgress,
  calculateNodeStatus,
} from '@/lib/learning-path';
import { getKnowledgeLesson } from '@/lib/knowledge-lessons';
import {
  Lock,
  CheckCircle2,
  Circle,
  PlayCircle,
  ChevronRight,
  ChevronDown,
  Clock,
  Target,
  Lightbulb,
  BookOpen,
} from 'lucide-react';

interface KnowledgeRoadmapProps {
  completedNodes: Set<string>;
  learningNodes: Set<string>;
  onNodeSelect?: (node: KnowledgeNode) => void;
  onViewLesson?: (nodeId: string) => void;
  selectedNodeId?: string;
}

// 难度配置
const difficultyConfig = {
  beginner: { label: '入门', color: 'bg-green-100 text-green-800 border-green-200' },
  intermediate: { label: '进阶', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  advanced: { label: '高级', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  expert: { label: '专家', color: 'bg-red-100 text-red-800 border-red-200' },
};

// 按分类组织知识点
function organizeByCategory(nodes: KnowledgeNode[]) {
  const categoryMap = new Map<string, KnowledgeNode[]>();
  nodes.forEach(node => {
    if (!categoryMap.has(node.category)) {
      categoryMap.set(node.category, []);
    }
    categoryMap.get(node.category)!.push(node);
  });
  return categoryMap;
}

export function KnowledgeRoadmap({
  completedNodes,
  learningNodes,
  onNodeSelect,
  onViewLesson,
  selectedNodeId,
}: KnowledgeRoadmapProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(knowledgeTree.map(n => n.category))
  );
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const categoryMap = organizeByCategory(knowledgeTree);

  // 切换分类展开状态
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // 获取状态图标
  const getStatusIcon = (nodeId: string) => {
    const status = calculateNodeStatus(nodeId, completedNodes);

    if (completedNodes.has(nodeId)) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
    if (learningNodes.has(nodeId)) {
      return <PlayCircle className="h-5 w-5 text-blue-500" />;
    }
    if (status === 'locked') {
      return <Lock className="h-5 w-5 text-gray-400" />;
    }
    return <Circle className="h-5 w-5 text-gray-300" />;
  };

  // 获取状态样式
  const getStatusStyle = (nodeId: string) => {
    const status = calculateNodeStatus(nodeId, completedNodes);

    if (completedNodes.has(nodeId)) {
      return 'border-green-300 bg-green-50';
    }
    if (learningNodes.has(nodeId)) {
      return 'border-blue-300 bg-blue-50';
    }
    if (status === 'locked') {
      return 'border-gray-200 bg-gray-50 opacity-60';
    }
    return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
  };

  // 统计数据
  const totalNodes = knowledgeTree.length;
  const completedCount = completedNodes.size;
  const progressPercent = Math.round((completedCount / totalNodes) * 100);

  return (
    <div className="flex flex-col h-full">
      {/* 总体进度 */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-800">学习进度</span>
          <span className="text-sm text-gray-600">
            {completedCount} / {totalNodes} 知识点
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">{progressPercent}% 完成</div>
      </div>

      {/* 知识点列表 */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {Array.from(categoryMap.entries()).map(([category, nodes]) => {
            const isExpanded = expandedCategories.has(category);
            const categoryCompleted = nodes.filter(n => completedNodes.has(n.id)).length;

            return (
              <div key={category} className="mb-4">
                {/* 分类标题 */}
                <div
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="font-medium">{category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {categoryCompleted}/{nodes.length}
                    </Badge>
                  </div>
                </div>

                {/* 知识点列表 */}
                {isExpanded && (
                  <div className="mt-2 space-y-2 pl-4">
                    {nodes.map(node => {
                      const status = calculateNodeStatus(node.id, completedNodes);
                      const isLocked = status === 'locked';
                      const isSelected = selectedNodeId === node.id;

                      return (
                        <Card
                          key={node.id}
                          className={`p-3 transition-all ${getStatusStyle(node.id)} ${
                            isSelected ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => {
                            if (!isLocked && onNodeSelect) {
                              onNodeSelect(node);
                            }
                          }}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          <div className="flex items-start gap-3">
                            {/* 状态图标 */}
                            <div className="mt-0.5">{getStatusIcon(node.id)}</div>

                            {/* 内容 */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm truncate">
                                  {node.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    difficultyConfig[node.difficulty].color
                                  }`}
                                >
                                  {difficultyConfig[node.difficulty].label}
                                </Badge>
                              </div>

                              {/* 详细信息（悬停显示） */}
                              {hoveredNode === node.id && (
                                <div className="mt-2 space-y-2 text-xs text-gray-600">
                                  <p>{node.description}</p>
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>{node.estimatedHours}小时</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Target className="h-3.5 w-3.5" />
                                      <span>
                                        {node.importance}/5 重要度
                                      </span>
                                    </div>
                                    {node.problems.length > 0 && (
                                      <div className="flex items-center gap-1">
                                        <Lightbulb className="h-3.5 w-3.5" />
                                        <span>{node.problems.length}道题目</span>
                                      </div>
                                    )}
                                  </div>
                                  {node.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {node.tags.map(tag => (
                                        <Badge
                                          key={tag}
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                  {/* 查看讲解按钮 */}
                                  {getKnowledgeLesson(node.id) && onViewLesson && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="w-full mt-2 h-7 text-xs bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onViewLesson(node.id);
                                      }}
                                    >
                                      <BookOpen className="h-3 w-3 mr-1" />
                                      查看知识点讲解
                                    </Button>
                                  )}
                                </div>
                              )}

                              {/* 前置知识点提示 */}
                              {isLocked && node.prerequisites.length > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  需要先完成：
                                  {node.prerequisites
                                    .map(
                                      p =>
                                        knowledgeTree.find(n => n.id === p)?.name
                                    )
                                    .filter(Boolean)
                                    .join('、')}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

// 知识点详情卡片
interface KnowledgeNodeCardProps {
  node: KnowledgeNode;
  progress?: UserProgress;
  onStartLearning?: () => void;
  onPractice?: () => void;
}

export function KnowledgeNodeCard({
  node,
  progress,
  onStartLearning,
  onPractice,
}: KnowledgeNodeCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{node.name}</h3>
          <p className="text-sm text-gray-500">{node.category}</p>
        </div>
        <Badge className={difficultyConfig[node.difficulty].color}>
          {difficultyConfig[node.difficulty].label}
        </Badge>
      </div>

      <p className="text-sm text-gray-600 mb-4">{node.description}</p>

      {/* 元信息 */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{node.estimatedHours}小时</span>
        </div>
        <div className="flex items-center gap-1">
          <Target className="h-4 w-4" />
          <span>重要度 {node.importance}/5</span>
        </div>
      </div>

      {/* 标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {node.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* 进度 */}
      {progress && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>掌握程度</span>
            <span>{progress.masteryLevel}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${progress.masteryLevel}%` }}
            />
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onStartLearning}>
          开始学习
        </Button>
        {node.problems.length > 0 && (
          <Button className="flex-1" onClick={onPractice}>
            练习题目 ({node.problems.length})
          </Button>
        )}
      </div>
    </Card>
  );
}

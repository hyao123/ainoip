'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  Search,
  ThumbsUp,
  MessageCircle,
  Eye,
  Clock,
  Star,
  Code,
  Send,
  Award,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Filter,
  PenLine,
} from 'lucide-react';
import {
  solutions,
  getFeaturedSolutions,
  searchSolutions,
  likeSolution,
  addComment,
  type Solution,
} from '@/lib/solutions';

interface SolutionCommunityProps {
  problemId?: number;
  onViewProblem?: (problemId: number) => void;
}

export function SolutionCommunity({ problemId, onViewProblem }: SolutionCommunityProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [showSolutionDialog, setShowSolutionDialog] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');

  // 获取题解列表
  const displaySolutions = searchQuery
    ? searchSolutions(searchQuery)
    : activeTab === 'featured'
    ? getFeaturedSolutions()
    : solutions;

  // 查看题解详情
  const handleViewSolution = (solution: Solution) => {
    setSelectedSolution(solution);
    setShowSolutionDialog(true);
  };

  // 点赞
  const handleLike = (solutionId: string) => {
    likeSolution(solutionId);
    if (selectedSolution?.id === solutionId) {
      setSelectedSolution({ ...selectedSolution, likes: selectedSolution.likes + 1 });
    }
  };

  // 提交评论
  const handleSubmitComment = () => {
    if (!newComment.trim() || !selectedSolution) return;
    
    addComment(selectedSolution.id, '当前用户', newComment);
    setSelectedSolution({
      ...selectedSolution,
      comments: [
        ...selectedSolution.comments,
        {
          id: `c${Date.now()}`,
          authorId: 'currentUser',
          authorName: '当前用户',
          content: newComment,
          createdAt: new Date().toISOString().split('T')[0],
          likes: 0,
        },
      ],
    });
    setNewComment('');
  };

  // 获取等级配置
  const getLevelConfig = (level: string) => {
    const configs = {
      beginner: { label: '入门', color: 'text-green-600', bgColor: 'bg-green-50' },
      intermediate: { label: '进阶', color: 'text-blue-600', bgColor: 'bg-blue-50' },
      advanced: { label: '高级', color: 'text-orange-600', bgColor: 'bg-orange-50' },
      expert: { label: '专家', color: 'text-red-600', bgColor: 'bg-red-50' },
    };
    return configs[level as keyof typeof configs] || configs.beginner;
  };

  return (
    <div className="h-full flex flex-col">
      {/* 搜索和筛选 */}
      <div className="p-3 border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索题解..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'featured' | 'all')}>
          <TabsList className="w-full grid grid-cols-2 h-8">
            <TabsTrigger value="featured" className="text-xs">
              <Star className="h-3 w-3 mr-1" />
              精选题解
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              全部题解
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 题解列表 */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {displaySolutions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>暂无题解</p>
            </div>
          ) : (
            displaySolutions.map((solution) => {
              const levelConfig = getLevelConfig(solution.author.level);
              
              return (
                <Card 
                  key={solution.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewSolution(solution)}
                >
                  <CardContent className="p-3 space-y-2">
                    {/* 标题和标签 */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {solution.isOfficial && (
                            <Badge variant="default" className="text-[10px] h-5">
                              官方
                            </Badge>
                          )}
                          {solution.isFeatured && (
                            <Badge variant="outline" className="text-[10px] h-5 text-yellow-600 border-yellow-300">
                              <Star className="h-3 w-3 mr-0.5" />
                              精选
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-sm mt-1 line-clamp-1">{solution.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">{solution.problemTitle}</p>
                      </div>
                    </div>
                    
                    {/* 作者信息 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${levelConfig.bgColor} flex items-center justify-center`}>
                          <span className="text-xs font-bold">{solution.author.name[0]}</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium">{solution.author.name}</span>
                          <Badge variant="outline" className={`text-[10px] h-4 ml-1 ${levelConfig.color}`}>
                            {levelConfig.label}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {solution.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {solution.comments.length}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {solution.views}
                        </span>
                      </div>
                    </div>
                    
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1">
                      {solution.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px] h-5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* 题解详情对话框 */}
      <Dialog open={showSolutionDialog} onOpenChange={setShowSolutionDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {selectedSolution?.isOfficial && (
                <Badge variant="default" className="text-xs">官方</Badge>
              )}
              {selectedSolution?.isFeatured && (
                <Badge variant="outline" className="text-xs text-yellow-600">
                  <Star className="h-3 w-3 mr-1" />
                  精选
                </Badge>
              )}
            </div>
            <DialogTitle className="text-lg">{selectedSolution?.title}</DialogTitle>
            <DialogDescription>
              {selectedSolution?.problemTitle}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSolution && (
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {/* 作者信息 */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${getLevelConfig(selectedSolution.author.level).bgColor} flex items-center justify-center`}>
                      <span className="text-lg font-bold">{selectedSolution.author.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{selectedSolution.author.name}</p>
                      <p className="text-xs text-muted-foreground">Rating: {selectedSolution.author.rating}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {selectedSolution.createdAt}
                    </span>
                  </div>
                </div>
                
                {/* 题解内容 */}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: selectedSolution.content.replace(/\n/g, '<br/>').replace(/##\s*(.+)/g, '<h3>$1</h3>').replace(/`{3}(\w+)?\n([\s\S]*?)`{3}/g, '<pre><code>$2</code></pre>') }} />
                </div>
                
                {/* 代码 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span className="text-sm font-medium">参考代码 ({selectedSolution.language === 'cpp' ? 'C++' : 'Python'})</span>
                  </div>
                  <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-sm">
                    <code>{selectedSolution.code}</code>
                  </pre>
                </div>
                
                {/* 复杂度 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">时间复杂度</p>
                    <p className="font-mono font-medium">{selectedSolution.timeComplexity}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">空间复杂度</p>
                    <p className="font-mono font-medium">{selectedSolution.spaceComplexity}</p>
                  </div>
                </div>
                
                <Separator />
                
                {/* 评论区 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">评论 ({selectedSolution.comments.length})</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLike(selectedSolution.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      点赞 ({selectedSolution.likes})
                    </Button>
                  </div>
                  
                  {/* 评论输入 */}
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="写下你的评论..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[60px]"
                    />
                    <Button size="sm" onClick={handleSubmitComment}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* 评论列表 */}
                  <div className="space-y-2">
                    {selectedSolution.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{comment.authorName}</span>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                      </div>
                    ))}
                    {selectedSolution.comments.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        暂无评论，快来抢沙发吧！
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  Play,
  Search,
  Clock,
  Eye,
  ThumbsUp,
  Filter,
  ChevronRight,
  BookOpen,
  Star,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  videoTutorials,
  videoCategories,
  getVideosByCategory,
  searchVideos,
  type VideoTutorial,
  type VideoCategory,
} from '@/lib/video-tutorials';

interface VideoTutorialsPanelProps {
  onVideoSelect?: (video: VideoTutorial) => void;
}

export function VideoTutorialsPanel({ onVideoSelect }: VideoTutorialsPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  const [showVideoDialog, setShowVideoDialog] = useState(false);

  // 获取过滤后的视频
  const filteredVideos = searchQuery
    ? searchVideos(searchQuery)
    : selectedCategory === 'all'
    ? videoTutorials
    : getVideosByCategory(selectedCategory);

  // 播放视频
  const handlePlayVideo = (video: VideoTutorial) => {
    setSelectedVideo(video);
    setShowVideoDialog(true);
    onVideoSelect?.(video);
  };

  // 格式化时长
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}分钟`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
  };

  // 格式化播放量
  const formatViews = (views: number): string => {
    if (views >= 10000) return `${(views / 10000).toFixed(1)}万`;
    return views.toString();
  };

  // 获取难度配置
  const difficultyConfig = {
    beginner: { label: '入门', color: 'bg-green-100 text-green-800' },
    intermediate: { label: '进阶', color: 'bg-blue-100 text-blue-800' },
    advanced: { label: '高级', color: 'bg-orange-100 text-orange-800' },
  };

  return (
    <div className="h-full flex flex-col">
      {/* 搜索和筛选 */}
      <div className="p-3 border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索视频教程..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {/* 分类标签 */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              className="shrink-0"
              onClick={() => setSelectedCategory('all')}
            >
              全部
            </Button>
            {videoCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                className="shrink-0"
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 视频列表 */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>没有找到相关视频</p>
            </div>
          ) : (
            filteredVideos.map((video) => (
              <Card 
                key={video.id} 
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePlayVideo(video)}
              >
                <div className="flex">
                  {/* 缩略图 */}
                  <div className="w-40 h-24 bg-muted flex-shrink-0 relative group">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                      <Play className="h-10 w-10 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {formatDuration(video.duration)}
                    </div>
                  </div>
                  
                  {/* 信息 */}
                  <div className="flex-1 p-3 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{video.description}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {formatViews(video.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {formatViews(video.likes)}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-[10px] h-5 ${difficultyConfig[video.difficulty].color}`}
                      >
                        {difficultyConfig[video.difficulty].label}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* 知识点标签 */}
                <div className="px-3 pb-3 flex flex-wrap gap-1">
                  {video.knowledgePoints.slice(0, 3).map((kp, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px] h-5">
                      {kp}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* 视频播放对话框 */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              {selectedVideo?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedVideo?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedVideo && (
            <div className="space-y-4">
              {/* 视频播放器（嵌入B站） */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://player.bilibili.com/player.html?bvid=${selectedVideo.videoId}&high_quality=1&danmaku=0`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              
              {/* 视频信息 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(selectedVideo.duration)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {formatViews(selectedVideo.views)} 播放
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {formatViews(selectedVideo.likes)} 点赞
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://www.bilibili.com/video/${selectedVideo.videoId}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  在B站打开
                </Button>
              </div>
              
              {/* 知识点 */}
              <div className="space-y-2">
                <span className="text-sm font-medium">相关知识点</span>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.knowledgePoints.map((kp, i) => (
                    <Badge key={i} variant="secondary">
                      {kp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 精选视频推荐组件
export function FeaturedVideos() {
  const featuredVideos = videoTutorials.slice(0, 6);
  
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          精选视频教程
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {featuredVideos.map((video) => (
            <div 
              key={video.id}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-muted rounded-md relative overflow-hidden mb-2">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <Play className="h-8 w-8 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded">
                  {video.duration}分钟
                </div>
              </div>
              <h5 className="text-xs font-medium line-clamp-2">{video.title}</h5>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

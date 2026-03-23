'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  cheatSheetCategories,
  cheatSheetItems,
  getCheatSheetByCategory,
  searchCheatSheet,
  type CheatSheetItem,
  type CheatSheetCategory,
} from '@/lib/algorithm-cheatsheet';
import {
  Search,
  Clock,
  Database,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertTriangle,
  Zap,
  ArrowRight,
  BookOpen,
  Video,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheatSheetPageProps {
  onSelectProblem?: (problemId: string) => void;
}

export function CheatSheetPage({ onSelectProblem }: CheatSheetPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // 过滤算法
  const filteredItems = useMemo(() => {
    if (searchQuery) {
      return searchCheatSheet(searchQuery);
    }
    if (selectedCategory) {
      return getCheatSheetByCategory(selectedCategory);
    }
    return cheatSheetItems;
  }, [searchQuery, selectedCategory]);

  // 切换展开状态
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 获取分类颜色
  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      sort: 'bg-blue-100 text-blue-800 border-blue-200',
      search: 'bg-green-100 text-green-800 border-green-200',
      dp: 'bg-purple-100 text-purple-800 border-purple-200',
      graph: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'number-theory': 'bg-orange-100 text-orange-800 border-orange-200',
      'data-structure': 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[categoryId] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 头部 */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-blue-50 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">算法速查表</h1>
              <p className="text-sm text-gray-500">快速复习核心算法知识点</p>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            共 {cheatSheetItems.length} 个算法
          </Badge>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索算法名称或关键词..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCategory(null);
            }}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* 分类标签 */}
      <div className="px-6 py-3 border-b flex-shrink-0 bg-white">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="text-xs"
          >
            全部
          </Button>
          {cheatSheetCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.id);
                setSearchQuery('');
              }}
              className="text-xs"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* 内容列表 */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {filteredItems.map((item) => (
            <CheatSheetCard
              key={item.id}
              item={item}
              isExpanded={expandedItems.has(item.id)}
              onToggle={() => toggleExpand(item.id)}
              categoryColor={getCategoryColor(item.category)}
            />
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>没有找到匹配的算法</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// 单个算法卡片
interface CheatSheetCardProps {
  item: CheatSheetItem;
  isExpanded: boolean;
  onToggle: () => void;
  categoryColor: string;
}

function CheatSheetCard({ item, isExpanded, onToggle, categoryColor }: CheatSheetCardProps) {
  const category = cheatSheetCategories.find(c => c.id === item.category);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      isExpanded && "ring-2 ring-primary/20"
    )}>
      {/* 卡片头部 */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <Badge className={categoryColor}>
                {category?.icon} {category?.name}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-2">{item.summary}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {item.timeComplexity}
              </span>
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" />
                {item.spaceComplexity}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="ml-2">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* 展开内容 */}
      {isExpanded && (
        <CardContent className="pt-0 border-t">
          {/* 核心代码 */}
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              核心代码模板
            </h4>
            <div className="overflow-hidden rounded-lg">
              <SyntaxHighlighter
                language="cpp"
                style={oneDark}
                PreTag="div"
                className="text-sm m-0"
              >
                {item.formula}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 关键要点 */}
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2 text-blue-800">
                <Lightbulb className="h-4 w-4" />
                关键要点
              </h4>
              <ul className="space-y-1">
                {item.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* 适用场景 */}
            <div className="bg-green-50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2 text-green-800">
                <Zap className="h-4 w-4" />
                适用场景
              </h4>
              <ul className="space-y-1">
                {item.whenToUse.map((use, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            {/* 常见陷阱 */}
            <div className="bg-orange-50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-4 w-4" />
                常见陷阱
              </h4>
              <ul className="space-y-1">
                {item.pitfalls.map((pitfall, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-orange-500">⚠</span>
                    {pitfall}
                  </li>
                ))}
              </ul>
            </div>

            {/* 典型例题 */}
            <div className="bg-purple-50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2 text-purple-800">
                <BookOpen className="h-4 w-4" />
                典型例题
              </h4>
              <div className="text-sm text-gray-700 mb-2">{item.example.problem}</div>
              <div className="text-xs text-gray-500 italic">{item.example.solution}</div>
            </div>
          </div>

          {/* 视频教程链接 */}
          {item.videoLinks?.bilibili && (
            <div className="mt-4 pt-4 border-t">
              <a
                href={`https://www.bilibili.com/video/${item.videoLinks.bilibili}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg hover:from-pink-600 hover:to-orange-500 transition-all text-sm font-medium"
              >
                <Video className="h-4 w-4" />
                观看视频教程
                <ExternalLink className="h-3 w-3" />
              </a>
              {item.videoLinks.title && (
                <span className="ml-3 text-sm text-gray-500">
                  {item.videoLinks.title}
                </span>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default CheatSheetPage;

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
  mistakeCategories,
  commonMistakes,
  getMistakesByCategory,
  getMistakesByDifficulty,
  getFrequentMistakes,
  searchMistakes,
  type CommonMistake,
} from '@/lib/common-mistakes';
import {
  Search,
  AlertTriangle,
  Lightbulb,
  Eye,
  Shield,
  ChevronDown,
  ChevronUp,
  XCircle,
  CheckCircle,
  Sparkles,
  BookOpen,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommonMistakesPageProps {
  onSelectTopic?: (topic: string) => void;
}

export function CommonMistakesPage({ onSelectTopic }: CommonMistakesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showFrequentOnly, setShowFrequentOnly] = useState(false);

  // 过滤错误
  const filteredItems = useMemo(() => {
    let items = commonMistakes;

    if (showFrequentOnly) {
      items = getFrequentMistakes(4);
    }

    if (searchQuery) {
      return searchMistakes(searchQuery).filter(i => items.includes(i));
    }

    if (selectedCategory) {
      items = getMistakesByCategory(selectedCategory);
    }

    if (selectedDifficulty) {
      items = items.filter(m => m.difficulty === selectedDifficulty);
    }

    return items;
  }, [searchQuery, selectedCategory, selectedDifficulty, showFrequentOnly]);

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

  // 获取难度配置
  const getDifficultyConfig = (difficulty: string) => {
    const configs: Record<string, { label: string; color: string }> = {
      beginner: { label: '入门', color: 'bg-green-100 text-green-800 border-green-200' },
      intermediate: { label: '进阶', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      advanced: { label: '高级', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    };
    return configs[difficulty] || configs.beginner;
  };

  // 获取分类颜色
  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      syntax: 'bg-red-100 text-red-800',
      logic: 'bg-purple-100 text-purple-800',
      overflow: 'bg-orange-100 text-orange-800',
      boundary: 'bg-cyan-100 text-cyan-800',
      algorithm: 'bg-blue-100 text-blue-800',
      efficiency: 'bg-yellow-100 text-yellow-800',
    };
    return colors[categoryId] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 头部 */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-red-50 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">常见错误库</h1>
              <p className="text-sm text-gray-500">学习他人的错误，避免自己踩坑</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showFrequentOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFrequentOnly(!showFrequentOnly)}
              className="gap-2"
            >
              <Flame className="h-4 w-4" />
              高频错误
            </Button>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索错误名称、关键词或相关知识点..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCategory(null);
              setSelectedDifficulty(null);
            }}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* 分类和难度筛选 */}
      <div className="px-6 py-3 border-b flex-shrink-0 bg-white space-y-2">
        {/* 分类标签 */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="text-xs"
          >
            全部分类
          </Button>
          {mistakeCategories.map((category) => (
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

        {/* 难度筛选 */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 py-1">难度：</span>
          {['beginner', 'intermediate', 'advanced'].map((diff) => {
            const config = getDifficultyConfig(diff);
            return (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                className="text-xs"
              >
                {config.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* 内容列表 */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {filteredItems.map((item) => (
            <MistakeCard
              key={item.id}
              item={item}
              isExpanded={expandedItems.has(item.id)}
              onToggle={() => toggleExpand(item.id)}
              categoryColor={getCategoryColor(item.category)}
              difficultyConfig={getDifficultyConfig(item.difficulty)}
            />
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>没有找到匹配的错误</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// 单个错误卡片
interface MistakeCardProps {
  item: CommonMistake;
  isExpanded: boolean;
  onToggle: () => void;
  categoryColor: string;
  difficultyConfig: { label: string; color: string };
}

function MistakeCard({ item, isExpanded, onToggle, categoryColor, difficultyConfig }: MistakeCardProps) {
  const category = mistakeCategories.find(c => c.id === item.category);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      isExpanded && "ring-2 ring-orange-200"
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
              <Badge className={difficultyConfig.color}>
                {difficultyConfig.label}
              </Badge>
              {item.frequency >= 4 && (
                <Badge className="bg-red-100 text-red-800">
                  <Flame className="h-3 w-3 mr-1" />
                  高频
                </Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm">{item.explanation}</p>
          </div>
          <Button variant="ghost" size="sm" className="ml-2">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* 展开内容 */}
      {isExpanded && (
        <CardContent className="pt-0 border-t space-y-4">
          {/* 小朋友友好解释 */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="font-medium text-purple-800">简单理解</span>
            </div>
            <p className="text-gray-700 text-sm">{item.kidFriendly}</p>
          </div>

          {/* 错误代码 vs 正确代码 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 错误代码 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="font-medium text-red-700">❌ 错误代码</span>
              </div>
              <div className="overflow-hidden rounded-lg border-2 border-red-200">
                <SyntaxHighlighter
                  language="cpp"
                  style={oneDark}
                  PreTag="div"
                  className="text-sm m-0"
                >
                  {item.wrongCode}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* 正确代码 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-700">✅ 正确代码</span>
              </div>
              <div className="overflow-hidden rounded-lg border-2 border-green-200">
                <SyntaxHighlighter
                  language="cpp"
                  style={oneDark}
                  PreTag="div"
                  className="text-sm m-0"
                >
                  {item.correctCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* 如何发现 */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">🔍 如何发现</span>
            </div>
            <p className="text-gray-700 text-sm">{item.howToFind}</p>
          </div>

          {/* 如何预防 */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">🛡️ 如何预防</span>
            </div>
            <p className="text-gray-700 text-sm">{item.prevention}</p>
          </div>

          {/* 相关知识点 */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">相关知识点：</span>
            {item.relatedTopics.map((topic, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default CommonMistakesPage;

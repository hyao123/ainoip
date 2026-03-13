'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  knowledgePoints,
  categories,
  getKnowledgePointBySlug,
  getKnowledgePointById,
  type KnowledgePoint,
} from '@/lib/knowledge-map';
import {
  getVisualizationResource,
  getBilibiliEmbedUrl,
  type VisualizationResource,
} from '@/lib/visualization-resources';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
  Play,
  Lightbulb,
  FileText,
  Code,
  ExternalLink,
  Video,
  Image as ImageIcon,
  MonitorPlay,
} from 'lucide-react';
import { RunnableCodeBlock } from '@/components/RunnableCodeBlock';

// 难度配置
const difficultyConfig: Record<string, { color: string; bgColor: string; label: string }> = {
  basic: { color: 'text-green-600', bgColor: 'bg-green-50', label: '基础' },
  intermediate: { color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: '进阶' },
  advanced: { color: 'text-orange-600', bgColor: 'bg-orange-50', label: '高级' },
  competition: { color: 'text-red-600', bgColor: 'bg-red-50', label: '竞赛' },
};

// 相关知识点（同分类或前置/后置）
function getRelatedPoints(point: KnowledgePoint): KnowledgePoint[] {
  const related: KnowledgePoint[] = [];
  
  // 添加前置知识
  point.prerequisites.forEach(id => {
    const pre = getKnowledgePointById(id);
    if (pre) related.push(pre);
  });
  
  // 添加同分类的其他知识点
  const sameCategory = knowledgePoints.filter(
    p => p.category === point.category && p.id !== point.id
  ).slice(0, 3);
  
  sameCategory.forEach(p => {
    if (!related.find(r => r.id === p.id)) {
      related.push(p);
    }
  });
  
  return related.slice(0, 5);
}

export default function KnowledgeDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const slug = params.slug as string;
  const from = searchParams.get('from'); // 'map' | 'learning'
  const day = searchParams.get('day'); // 如果从学习路径来
  
  const [point, setPoint] = useState<KnowledgePoint | null>(null);
  const [viewedPoints, setViewedPoints] = useState<Set<number>>(new Set());
  const [bookmarkedPoints, setBookmarkedPoints] = useState<Set<number>>(new Set());
  const [expandedSection, setExpandedSection] = useState<string>('content');
  const [visualResource, setVisualResource] = useState<VisualizationResource | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // 加载知识点
  useEffect(() => {
    const found = getKnowledgePointBySlug(slug);
    if (found) {
      setPoint(found);
      // 标记为已读
      setViewedPoints(prev => new Set([...prev, found.id]));
      // 加载可视化资源
      const resource = getVisualizationResource(found.id);
      if (resource) {
        setVisualResource(resource);
      }
    }
  }, [slug]);

  // 切换收藏
  const toggleBookmark = (id: number) => {
    setBookmarkedPoints(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // 返回上一页
  const goBack = () => {
    if (from === 'learning') {
      router.push('/?view=learning');
    } else {
      router.push('/?view=map');
    }
  };

  if (!point) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-muted-foreground">知识点未找到</p>
          <Button variant="outline" className="mt-4" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === point.category);
  const relatedPoints = getRelatedPoints(point);
  const isBookmarked = bookmarkedPoints.has(point.id);

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              {from === 'learning' ? '返回学习路径' : '返回知识地图'}
            </Button>
            {day && (
              <Badge variant="outline" className="text-xs">
                Day {day}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleBookmark(point.id)}
            >
              {isBookmarked ? '已收藏 ⭐' : '收藏'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/?view=practice')}
            >
              去练习
            </Button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 标题区 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{point.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold">{point.title}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge className={`${difficultyConfig[point.difficulty].bgColor} ${difficultyConfig[point.difficulty].color} border-0`}>
                      {difficultyConfig[point.difficulty].label}
                    </Badge>
                    {category && (
                      <Badge variant="outline">
                        {category.icon} {category.name}
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {point.readTime}分钟
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {point.brief}
              </p>
            </div>

            <Separator />

            {/* 适合小朋友理解的模块 */}
            {point.kidFriendly && (
              <div className="space-y-4">
                {/* 生活类比 */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-blue-800">
                    <span className="text-2xl">💡</span>
                    想象一下
                  </h3>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                    {point.kidFriendly.analogy}
                  </p>
                </div>

                {/* 形象化描述 */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 via-teal-50 to-cyan-50 border border-green-100">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-800">
                    <span className="text-2xl">🎨</span>
                    可视化理解
                  </h3>
                  <pre className="text-slate-700 leading-relaxed whitespace-pre-wrap font-mono bg-white/70 p-4 rounded-xl text-sm">
                    {point.kidFriendly.visualization}
                  </pre>
                </div>

                {/* 为什么要学 */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border border-yellow-100">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-yellow-800">
                    <span className="text-2xl">🎯</span>
                    为什么学这个？
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {point.kidFriendly.whyLearn}
                  </p>
                </div>
              </div>
            )}

            {/* 可视化资源展示 */}
            {visualResource && (
              <>
                <Separator />
                <section className="space-y-6">
                  {/* 动图演示 */}
                  {visualResource.gifUrl && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-red-50 border border-pink-100">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-pink-800">
                        <ImageIcon className="h-5 w-5" />
                        <span className="text-2xl">🎬</span>
                        动画演示
                      </h3>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <img 
                          src={visualResource.gifUrl} 
                          alt={`${point.title}动画演示`}
                          className="w-full max-w-md mx-auto rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 text-center">
                        观察动画，理解算法执行过程
                      </p>
                    </div>
                  )}

                  {/* 可视化工具链接 */}
                  {visualResource.visualizerUrl && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-50 via-sky-50 to-blue-50 border border-cyan-100">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-cyan-800">
                        <MonitorPlay className="h-5 w-5" />
                        <span className="text-2xl">🖥️</span>
                        交互式可视化
                      </h3>
                      <p className="text-slate-600 mb-4">
                        点击下方链接，打开可视化工具，亲自操作体验算法执行过程：
                      </p>
                      <a
                        href={visualResource.visualizerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        打开可视化工具
                      </a>
                    </div>
                  )}

                  {/* 视频讲解 */}
                  {visualResource.bilibiliUrl && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 border border-purple-100">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-purple-800">
                        <Video className="h-5 w-5" />
                        <span className="text-2xl">📺</span>
                        视频讲解
                      </h3>
                      
                      {/* 视频信息 */}
                      <div className="mb-4 p-4 bg-white rounded-xl">
                        <div className="font-medium text-slate-800 mb-1">
                          {visualResource.videoTitle || `${point.title}讲解`}
                        </div>
                        {visualResource.videoAuthor && (
                          <div className="text-sm text-muted-foreground">
                            UP主：{visualResource.videoAuthor}
                          </div>
                        )}
                      </div>

                      {/* 视频章节 */}
                      {visualResource.videoSections && visualResource.videoSections.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm font-medium text-slate-700 mb-2">📑 视频章节：</div>
                          <div className="grid grid-cols-2 gap-2">
                            {visualResource.videoSections.map((section, idx) => (
                              <a
                                key={idx}
                                href={`${visualResource.bilibiliUrl}&t=${section.time.replace(':', 'm')}s`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors text-sm"
                              >
                                <Play className="h-3 w-3 text-purple-500" />
                                <span className="text-muted-foreground font-mono text-xs">{section.time}</span>
                                <span className="text-slate-700 truncate">{section.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 嵌入播放器或链接按钮 */}
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowVideoPlayer(!showVideoPlayer)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium"
                        >
                          <Play className="h-4 w-4" />
                          {showVideoPlayer ? '收起播放器' : '在页内播放'}
                        </button>
                        <a
                          href={visualResource.bilibiliUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 border border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 transition-colors font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          在B站打开
                        </a>
                      </div>

                      {/* 嵌入播放器 */}
                      {showVideoPlayer && visualResource.bvNumber && (
                        <div className="mt-4 bg-white rounded-xl overflow-hidden shadow-lg">
                          <div className="relative" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                              src={getBilibiliEmbedUrl(visualResource.bvNumber)}
                              className="absolute top-0 left-0 w-full h-full"
                              allowFullScreen
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </>
            )}

            <Separator />

            {/* 核心内容 */}
            <section>
              <button
                onClick={() => setExpandedSection(expandedSection === 'content' ? '' : 'content')}
                className="flex items-center gap-2 w-full text-left"
              >
                <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === 'content' ? '' : '-rotate-90'}`} />
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  核心内容
                </h2>
              </button>
              
              {expandedSection === 'content' && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {point.content.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <Separator />

            {/* 详细代码示例 */}
            {point.codeExamples && point.codeExamples.length > 0 && (
              <section>
                <button
                  onClick={() => setExpandedSection(expandedSection === 'code' ? '' : 'code')}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === 'code' ? '' : '-rotate-90'}`} />
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-500" />
                    代码示例
                  </h2>
                  <span className="text-sm text-muted-foreground font-normal">
                    （点击运行按钮执行代码）
                  </span>
                </button>
                
                {expandedSection === 'code' && (
                  <div className="mt-4 space-y-6">
                    {point.codeExamples.map((example, index) => (
                      <div key={index}>
                        <RunnableCodeBlock
                          code={example.code}
                          title={example.title}
                          description={example.description}
                          input={example.input}
                          expectedOutput={example.expectedOutput}
                        />
                        {example.explanation && example.explanation.length > 0 && (
                          <div className="mt-3 bg-slate-50 px-4 py-4 rounded-xl border border-slate-100">
                            <div className="text-sm font-medium text-slate-600 mb-3">💡 代码解释：</div>
                            <ul className="space-y-2">
                              {example.explanation.map((exp, i) => (
                                <li key={i} className="text-sm text-slate-600 flex items-start gap-3">
                                  <span className="text-blue-500 mt-0.5">•</span>
                                  {exp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 兼容旧版单个代码示例 */}
            {!point.codeExamples && point.codeExample && (
              <section>
                <button
                  onClick={() => setExpandedSection(expandedSection === 'code' ? '' : 'code')}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === 'code' ? '' : '-rotate-90'}`} />
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-500" />
                    代码示例
                  </h2>
                </button>
                
                {expandedSection === 'code' && (
                  <div className="mt-4">
                    <RunnableCodeBlock code={point.codeExample} />
                  </div>
                )}
              </section>
            )}

            <Separator />

            {/* 常见错误 */}
            {point.commonMistakes && point.commonMistakes.length > 0 && (
              <section>
                <button
                  onClick={() => setExpandedSection(expandedSection === 'mistakes' ? '' : 'mistakes')}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === 'mistakes' ? '' : '-rotate-90'}`} />
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-red-600">
                    <span className="text-xl">⚠️</span>
                    常见错误
                  </h2>
                </button>
                
                {expandedSection === 'mistakes' && (
                  <div className="mt-4 space-y-4">
                    {point.commonMistakes.map((mistake, index) => (
                      <div key={index} className="p-4 rounded-xl bg-red-50 border border-red-100">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-red-500">❌</span>
                          <div className="font-medium text-red-800">{mistake.mistake}</div>
                        </div>
                        <div className="text-sm text-red-600 mb-3 ml-8">
                          <strong>原因：</strong>{mistake.why}
                        </div>
                        <div className="flex items-start gap-3 ml-8 p-3 bg-green-50 rounded-lg">
                          <span className="text-green-600">✅</span>
                          <span className="text-sm text-green-700">{mistake.correctWay}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            <Separator />

            {/* 小测验 */}
            {point.quiz && (
              <section>
                <button
                  onClick={() => setExpandedSection(expandedSection === 'quiz' ? '' : 'quiz')}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === 'quiz' ? '' : '-rotate-90'}`} />
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-700">
                    <span className="text-xl">📝</span>
                    小测验
                  </h2>
                </button>
                
                {expandedSection === 'quiz' && (
                  <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100">
                    <p className="text-lg text-slate-800 mb-4">{point.quiz.question}</p>
                    <div className="space-y-2">
                      {point.quiz.options.map((option, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-medium mr-3 text-indigo-600">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </div>
                      ))}
                    </div>
                    <details className="mt-4">
                      <summary className="text-sm text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium">
                        🔍 查看答案
                      </summary>
                      <div className="mt-3 p-4 bg-white rounded-xl">
                        <div className="font-medium text-green-600 mb-2 text-lg">
                          正确答案：{String.fromCharCode(65 + point.quiz.answer)}
                        </div>
                        <div className="text-slate-600">{point.quiz.explanation}</div>
                      </div>
                    </details>
                  </div>
                )}
              </section>
            )}

            {/* 底部导航 */}
            <div className="flex items-center justify-between pt-8">
              <Button variant="outline" onClick={goBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {from === 'learning' ? '返回学习路径' : '返回知识地图'}
              </Button>
              
              {point.recommendedProblems.length > 0 && (
                <Button onClick={() => router.push('/?view=practice')}>
                  开始练习
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* 右侧边栏 */}
          <aside className="lg:col-span-1 space-y-6">
            {/* 进度卡片 */}
            <div className="sticky top-20 space-y-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-sm font-medium text-muted-foreground mb-2">学习进度</div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-medium">已阅读</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {viewedPoints.size} / {knowledgePoints.length} 个知识点
                </p>
              </div>

              {/* 前置知识 */}
              {point.prerequisites.length > 0 && (
                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-500" />
                    前置知识
                  </h4>
                  <div className="space-y-2">
                    {point.prerequisites.map(preId => {
                      const prePoint = getKnowledgePointById(preId);
                      if (!prePoint) return null;
                      return (
                        <button
                          key={preId}
                          onClick={() => router.push(`/knowledge/${prePoint.slug}?from=${from}`)}
                          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-left text-sm"
                        >
                          <span>{prePoint.icon}</span>
                          <span className="truncate">{prePoint.title}</span>
                          <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 相关知识点 */}
              {relatedPoints.length > 0 && (
                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    相关知识点
                  </h4>
                  <div className="space-y-2">
                    {relatedPoints.map(relatedPoint => (
                      <button
                        key={relatedPoint.id}
                        onClick={() => router.push(`/knowledge/${relatedPoint.slug}?from=${from}`)}
                        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-left text-sm"
                      >
                        <span>{relatedPoint.icon}</span>
                        <span className="truncate">{relatedPoint.title}</span>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 推荐练习 */}
              {point.recommendedProblems.length > 0 && (
                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    推荐练习
                  </h4>
                  <div className="space-y-2">
                    {point.recommendedProblems.slice(0, 3).map(problemId => (
                      <button
                        key={problemId}
                        onClick={() => router.push(`/?view=practice&problem=${problemId}`)}
                        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-left text-sm"
                      >
                        <Play className="h-3 w-3 text-blue-500" />
                        <span>题目 #{problemId}</span>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

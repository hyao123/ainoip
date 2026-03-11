'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getUserLearningData,
  type SubmissionRecord,
} from '@/lib/user-learning-data';
import {
  History,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  Flame,
  BarChart3,
  Code,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface LearningRecordProps {
  onSelectProblem?: (problemId: number) => void;
}

const resultConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  AC: { label: '通过', color: 'text-green-600', bgColor: 'bg-green-100' },
  WA: { label: '答案错误', color: 'text-red-600', bgColor: 'bg-red-100' },
  TLE: { label: '超时', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  MLE: { label: '超内存', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  RE: { label: '运行错误', color: 'text-red-600', bgColor: 'bg-red-100' },
  CE: { label: '编译错误', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  PE: { label: '格式错误', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  SE: { label: '系统错误', color: 'text-gray-600', bgColor: 'bg-gray-100' },
};

export function LearningRecord({ onSelectProblem }: LearningRecordProps) {
  const [data, setData] = useState(getUserLearningData);
  const [activeTab, setActiveTab] = useState<'stats' | 'history'>('stats');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'AC' | 'WA'>('all');
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);

  // 计算统计信息
  const stats = useMemo(() => {
    const { stats: s } = data;
    const accuracy = s.totalSubmissions > 0 
      ? Math.round((s.acceptedSubmissions / s.totalSubmissions) * 100) 
      : 0;
    
    // 最近7天数据
    const last7Days = s.weeklyData.slice(-7);
    const weeklySubmissions = last7Days.reduce((sum, d) => sum + d.submissions, 0);
    const weeklyAccepted = last7Days.reduce((sum, d) => sum + d.accepted, 0);
    const weeklyTime = last7Days.reduce((sum, d) => sum + d.timeSpent, 0);

    // 本周目标进度
    const dailyGoalProgress = Math.min(100, Math.round((s.dailyCompleted / s.dailyGoal) * 100));

    return {
      ...s,
      accuracy,
      weeklySubmissions,
      weeklyAccepted,
      weeklyTime,
      dailyGoalProgress,
      last7Days,
    };
  }, [data]);

  // 过滤历史记录
  const filteredHistory = useMemo(() => {
    let records = [...data.submissions].sort((a, b) => b.timestamp - a.timestamp);
    
    if (historyFilter === 'AC') {
      records = records.filter(r => r.result === 'AC');
    } else if (historyFilter === 'WA') {
      records = records.filter(r => r.result === 'WA');
    }
    
    return records.slice(0, 100); // 限制显示最近100条
  }, [data.submissions, historyFilter]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const refreshData = () => {
    setData(getUserLearningData());
  };

  // 获取星期几
  const getWeekday = (dateStr: string) => {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const date = new Date(dateStr);
    return `周${days[date.getDay()]}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部标题栏 */}
      <div className="px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <span className="font-semibold">学习记录</span>
          </div>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="px-4 pt-3 border-b">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList>
            <TabsTrigger value="stats" className="gap-1">
              <BarChart3 className="h-4 w-4" />
              学习统计
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1">
              <History className="h-4 w-4" />
              提交记录
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 内容区 */}
      {activeTab === 'stats' ? (
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* 连续学习天数 */}
            <Card className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">连续学习</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {stats.streak} 天
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">最长记录</div>
                  <div className="text-lg font-semibold">{stats.maxStreak} 天</div>
                </div>
              </div>
            </Card>

            {/* 核心指标 */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-primary">{stats.solvedProblems}</div>
                <div className="text-xs text-muted-foreground">已解决题目</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.accuracy}%</div>
                <div className="text-xs text-muted-foreground">正确率</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalSubmissions}</div>
                <div className="text-xs text-muted-foreground">总提交次数</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.acceptedSubmissions}</div>
                <div className="text-xs text-muted-foreground">通过次数</div>
              </Card>
            </div>

            {/* 每日目标 */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium">今日目标</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {stats.dailyCompleted} / {stats.dailyGoal} 题
                </span>
              </div>
              <Progress value={stats.dailyGoalProgress} className="h-2" />
            </Card>

            {/* 本周统计 */}
            <Card className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                本周学习
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">{stats.weeklySubmissions}</div>
                  <div className="text-xs text-muted-foreground">提交次数</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{stats.weeklyAccepted}</div>
                  <div className="text-xs text-muted-foreground">通过次数</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{stats.weeklyTime}</div>
                  <div className="text-xs text-muted-foreground">学习时长(分)</div>
                </div>
              </div>
            </Card>

            {/* 最近7天活动图 */}
            <Card className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                最近7天活动
              </h4>
              <div className="flex justify-between gap-1">
                {stats.last7Days.map((day, i) => (
                  <div key={day.date} className="flex-1 text-center">
                    <div className="text-[10px] text-muted-foreground mb-1">
                      {getWeekday(day.date)}
                    </div>
                    <div 
                      className={`h-16 rounded relative ${day.submissions > 0 ? 'bg-primary/20' : 'bg-muted'}`}
                      style={{
                        background: `linear-gradient(to top, hsl(var(--primary)) ${Math.min(100, (day.submissions / 10) * 100)}%, transparent ${Math.min(100, (day.submissions / 10) * 100)}%)`,
                      }}
                    >
                      {day.submissions > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary-foreground">
                            {day.submissions}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] mt-1 text-muted-foreground">
                      {day.accepted}✓
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ScrollArea>
      ) : (
        <>
          {/* 历史记录过滤 */}
          <div className="px-4 py-2 border-b">
            <Select value={historyFilter} onValueChange={(v) => setHistoryFilter(v as typeof historyFilter)}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue placeholder="筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部记录</SelectItem>
                <SelectItem value="AC">仅通过</SelectItem>
                <SelectItem value="WA">仅错误</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 历史记录列表 */}
          <ScrollArea className="flex-1 p-4">
            {filteredHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Code className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">暂无提交记录</h3>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  开始做题，记录你的学习历程
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredHistory.map(record => (
                  <Card
                    key={record.id}
                    className="p-3 cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setExpandedSubmission(
                      expandedSubmission === record.id ? null : record.id
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded ${resultConfig[record.result]?.bgColor}`}>
                          {record.result === 'AC' ? (
                            <CheckCircle className={`h-4 w-4 ${resultConfig[record.result]?.color}`} />
                          ) : (
                            <XCircle className={`h-4 w-4 ${resultConfig[record.result]?.color}`} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{record.problemTitle}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{record.language.toUpperCase()}</span>
                            <span>·</span>
                            <span>{record.testCasesPassed}/{record.totalTestCases} 通过</span>
                            {record.executionTime && (
                              <>
                                <span>·</span>
                                <span>{record.executionTime}ms</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={resultConfig[record.result]?.bgColor}>
                          {resultConfig[record.result]?.label}
                        </Badge>
                        {expandedSubmission === record.id ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* 展开的代码详情 */}
                    {expandedSubmission === record.id && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(record.timestamp)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProblem?.(record.problemId);
                            }}
                          >
                            重新练习
                          </Button>
                        </div>
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto max-h-40">
                          {record.code}
                        </pre>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </>
      )}
    </div>
  );
}

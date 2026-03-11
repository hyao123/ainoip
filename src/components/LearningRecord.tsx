'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Zap,
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
    
    const last7Days = s.weeklyData.slice(-7);
    const weeklySubmissions = last7Days.reduce((sum, d) => sum + d.submissions, 0);
    const weeklyAccepted = last7Days.reduce((sum, d) => sum + d.accepted, 0);
    const weeklyTime = last7Days.reduce((sum, d) => sum + d.timeSpent, 0);
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
    
    return records.slice(0, 100);
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

  const getWeekday = (dateStr: string) => {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const date = new Date(dateStr);
    return `周${days[date.getDay()]}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部工具栏 - 极简 */}
      <div className="px-4 py-2 border-b bg-muted/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <Button
              variant={activeTab === 'stats' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('stats')}
              className="h-7 text-xs"
            >
              统计
            </Button>
            <Button
              variant={activeTab === 'history' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('history')}
              className="h-7 text-xs"
            >
              记录
            </Button>
          </div>

          {activeTab === 'history' && (
            <Select value={historyFilter} onValueChange={(v) => setHistoryFilter(v as typeof historyFilter)}>
              <SelectTrigger className="w-20 h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="AC">通过</SelectItem>
                <SelectItem value="WA">错误</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={refreshData} className="h-7 w-7 p-0">
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* 内容区 */}
      {activeTab === 'stats' ? (
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-3">
            {/* 连续学习天数 - 大卡片 */}
            <Card className="col-span-2 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">连续学习</div>
                    <div className="text-2xl font-bold text-orange-600">{stats.streak} 天</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">最长记录</div>
                  <div className="text-lg font-semibold">{stats.maxStreak} 天</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">今日目标</div>
                  <div className="text-lg font-semibold">{stats.dailyCompleted}/{stats.dailyGoal}</div>
                  <Progress value={stats.dailyGoalProgress} className="w-16 h-1.5 mt-1" />
                </div>
              </div>
            </Card>

            {/* 核心指标 */}
            <Card className="p-3 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">{stats.solvedProblems}</div>
                <div className="text-xs text-muted-foreground">已解决</div>
              </div>
            </Card>
            <Card className="p-3 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">{stats.accuracy}%</div>
                <div className="text-xs text-muted-foreground">正确率</div>
              </div>
            </Card>
            <Card className="p-3 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">{stats.totalSubmissions}</div>
                <div className="text-xs text-muted-foreground">总提交</div>
              </div>
            </Card>
            <Card className="p-3 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Zap className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-xl font-bold text-emerald-600">{stats.acceptedSubmissions}</div>
                <div className="text-xs text-muted-foreground">通过次数</div>
              </div>
            </Card>

            {/* 最近7天活动图 - 横向 */}
            <Card className="col-span-2 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  最近7天活动
                </h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>提交 {stats.weeklySubmissions}</span>
                  <span>通过 {stats.weeklyAccepted}</span>
                  <span>时长 {stats.weeklyTime}分</span>
                </div>
              </div>
              <div className="flex justify-between gap-2">
                {stats.last7Days.map((day, i) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-md relative transition-all ${day.submissions > 0 ? 'bg-primary/10' : 'bg-muted'}`}
                      style={{
                        height: '48px',
                        background: day.submissions > 0 
                          ? `linear-gradient(to top, hsl(var(--primary)) ${Math.min(100, (day.submissions / 8) * 100)}%, transparent ${Math.min(100, (day.submissions / 8) * 100)}%)`
                          : undefined,
                      }}
                    >
                      {day.submissions > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{day.submissions}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1.5">
                      {getWeekday(day.date)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ScrollArea>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">暂无提交记录</p>
              </div>
            ) : (
              filteredHistory.map(record => {
                const config = resultConfig[record.result] || resultConfig.SE;
                const isExpanded = expandedSubmission === record.id;
                
                return (
                  <Card
                    key={record.id}
                    className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedSubmission(isExpanded ? null : record.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Badge className={`${config.bgColor} ${config.color} text-xs shrink-0`}>
                          {record.result}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{record.problemTitle}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{record.category}</span>
                            <span>•</span>
                            <span>{formatDate(record.timestamp)}</span>
                            <span>•</span>
                            <span>{record.language}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right text-xs">
                          <div className="font-medium">{record.passedCount}/{record.totalCount}</div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t">
                        <pre className="text-xs bg-muted/50 p-3 rounded-lg overflow-x-auto max-h-48">
                          {record.code}
                        </pre>
                        {onSelectProblem && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProblem(record.problemId);
                            }}
                          >
                            重新练习
                          </Button>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

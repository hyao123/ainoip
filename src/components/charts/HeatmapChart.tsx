'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { HeatmapData } from '@/lib/learning-analytics';

interface HeatmapChartProps {
  data: HeatmapData[];
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export function HeatmapChart({ data }: HeatmapChartProps) {
  const heatmapGrid = useMemo(() => {
    // 获取最近几周的数据
    const now = new Date();
    const weeks = 12;
    const grid: { date: string; dayOfWeek: number; hours: Map<number, number> }[] = [];

    for (let w = weeks - 1; w >= 0; w--) {
      for (let d = 0; d < 7; d++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (w * 7 + (6 - d)));
        const dateStr = date.toISOString().split('T')[0];
        
        const dayData = data.filter(item => item.date === dateStr);
        const hourMap = new Map<number, number>();
        dayData.forEach(item => {
          hourMap.set(item.hour, (hourMap.get(item.hour) || 0) + item.intensity);
        });

        grid.push({
          date: dateStr,
          dayOfWeek: d,
          hours: hourMap,
        });
      }
    }

    return grid;
  }, [data]);

  // 获取颜色
  const getColor = (intensity: number): string => {
    switch (intensity) {
      case 0: return 'bg-muted';
      case 1: return 'bg-primary/20';
      case 2: return 'bg-primary/40';
      case 3: return 'bg-primary/60';
      case 4: return 'bg-primary/80';
      default: return 'bg-primary';
    }
  };

  // 按小时统计
  const hourlyStats = useMemo(() => {
    const stats = new Map<number, number>();
    data.forEach(item => {
      const hour = item.hour;
      stats.set(hour, (stats.get(hour) || 0) + 1);
    });
    return stats;
  }, [data]);

  // 找出最活跃的时间段
  const peakHours = useMemo(() => {
    const sorted = Array.from(hourlyStats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour]) => hour);
    return sorted;
  }, [hourlyStats]);

  if (data.length === 0) {
    return (
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 py-8 text-center text-muted-foreground">
          暂无学习时间数据
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        {/* 热力图 */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* 时间标签 */}
            <div className="flex mb-1 pl-12">
              {Array.from({ length: 24 }, (_, i) => (
                <div 
                  key={i} 
                  className="flex-1 text-[10px] text-muted-foreground text-center"
                  style={{ minWidth: '20px' }}
                >
                  {i % 3 === 0 ? `${i}:00` : ''}
                </div>
              ))}
            </div>

            {/* 热力图网格 */}
            <div className="space-y-1">
              {DAYS.map((day, dayIndex) => (
                <div key={day} className="flex items-center gap-1">
                  {/* 星期标签 */}
                  <div className="w-10 text-xs text-muted-foreground text-right pr-2">
                    {day}
                  </div>
                  
                  {/* 24小时格子 */}
                  <div className="flex gap-[2px] flex-1">
                    {HOURS.map(hour => {
                      // 找到对应日期和小时的数据
                      const cellData = heatmapGrid.find(
                        g => g.dayOfWeek === dayIndex && g.hours.has(hour)
                      );
                      const intensity = cellData 
                        ? Math.min(Math.floor((cellData.hours.get(hour) || 0) / 2), 4)
                        : 0;
                      
                      return (
                        <div
                          key={hour}
                          className={`flex-1 h-4 rounded-sm ${getColor(intensity)} transition-colors cursor-pointer hover:ring-1 hover:ring-primary`}
                          title={`${day} ${hour}:00 - 活跃度: ${intensity}`}
                          style={{ minWidth: '20px' }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* 图例 */}
            <div className="flex items-center justify-end mt-4 gap-2">
              <span className="text-xs text-muted-foreground">低</span>
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-4 h-4 rounded-sm ${getColor(level)}`}
                />
              ))}
              <span className="text-xs text-muted-foreground">高</span>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">
              {peakHours.length > 0 ? `${peakHours[0]}:00` : '-'}
            </div>
            <div className="text-sm text-muted-foreground">最活跃时间段</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">
              {peakHours.length > 0 && peakHours[1] !== undefined ? `${peakHours[1]}:00` : '-'}
            </div>
            <div className="text-sm text-muted-foreground">次活跃时间段</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">
              {new Set(data.map(d => d.date)).size}
            </div>
            <div className="text-sm text-muted-foreground">学习天数</div>
          </div>
        </div>

        {/* 学习时段建议 */}
        <div className="mt-4 p-4 border rounded-lg">
          <div className="text-sm font-medium mb-2">学习时段分析</div>
          <div className="text-sm text-muted-foreground">
            {peakHours.length > 0 ? (
              <>
                你的学习高峰主要集中在{' '}
                <span className="font-medium text-foreground">
                  {peakHours.map(h => `${h}:00`).join('、')}
                </span>
                {' '}时段。建议在这些时间段安排需要深度思考的算法题目练习。
              </>
            ) : (
              '暂无足够的学习数据来分析你的学习时段模式。'
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

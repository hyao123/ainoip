'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { LearningCurvePoint } from '@/lib/learning-analytics';

interface LearningCurveChartProps {
  data: LearningCurvePoint[];
}

export function LearningCurveChart({ data }: LearningCurveChartProps) {
  const { pathD, areaPath, maxValue, labels } = useMemo(() => {
    if (data.length === 0) {
      return { pathD: '', areaPath: '', maxValue: 100, labels: [] };
    }

    const width = 500;
    const height = 200;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const max = Math.max(...data.map(d => d.cumulativeSolved), 10);
    const xStep = chartWidth / (data.length - 1 || 1);

    // 生成曲线点
    const points = data.map((d, i) => ({
      x: padding.left + i * xStep,
      y: padding.top + chartHeight - (d.cumulativeSolved / max) * chartHeight,
    }));

    // 生成路径
    const linePath = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`)
      .join(' ');

    // 生成区域填充路径
    const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0},${padding.top + chartHeight} L ${padding.left},${padding.top + chartHeight} Z`;

    // 生成标签（只显示部分日期）
    const labelIndices = [0, Math.floor(data.length / 2), data.length - 1];
    const generatedLabels = labelIndices.map(i => ({
      x: padding.left + i * xStep,
      label: data[i]?.date?.slice(5) || '',
    }));

    return { 
      pathD: linePath, 
      areaPath, 
      maxValue: max, 
      labels: generatedLabels 
    };
  }, [data]);

  if (data.length === 0) {
    return (
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 py-8 text-center text-muted-foreground">
          暂无学习数据
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <svg viewBox="0 0 500 240" className="w-full h-auto">
          {/* 背景网格 */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <line
                x1="50"
                y1={20 + (1 - ratio) * 180}
                x2="480"
                y2={20 + (1 - ratio) * 180}
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="1"
              />
              <text
                x="45"
                y={24 + (1 - ratio) * 180}
                textAnchor="end"
                className="text-xs fill-muted-foreground"
              >
                {Math.round(maxValue * ratio)}
              </text>
            </g>
          ))}

          {/* Y轴 */}
          <line
            x1="50"
            y1="20"
            x2="50"
            y2="200"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1"
          />

          {/* X轴 */}
          <line
            x1="50"
            y1="200"
            x2="480"
            y2="200"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1"
          />

          {/* 渐变区域 */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 区域填充 */}
          <path
            d={areaPath}
            fill="url(#areaGradient)"
          />

          {/* 曲线 */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 数据点 */}
          {data.map((d, i) => {
            const width = 500;
            const height = 200;
            const padding = { top: 20, right: 20, bottom: 40, left: 50 };
            const chartWidth = width - padding.left - padding.right;
            const chartHeight = height - padding.top - padding.bottom;
            const xStep = chartWidth / (data.length - 1 || 1);
            const x = padding.left + i * xStep;
            const y = padding.top + chartHeight - (d.cumulativeSolved / maxValue) * chartHeight;
            
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="white"
                  stroke="var(--primary)"
                  strokeWidth="2"
                />
                {/* 显示最后一个点数值 */}
                {i === data.length - 1 && (
                  <text
                    x={x + 8}
                    y={y + 4}
                    className="text-xs fill-primary font-medium"
                  >
                    {d.cumulativeSolved}
                  </text>
                )}
              </g>
            );
          })}

          {/* X轴标签 */}
          {labels.map((label, i) => (
            <text
              key={i}
              x={label.x}
              y="220"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              {label.label}
            </text>
          ))}

          {/* Y轴标签 */}
          <text
            x="15"
            y="110"
            textAnchor="middle"
            transform="rotate(-90, 15, 110)"
            className="text-xs fill-muted-foreground"
          >
            累计解题数
          </text>
        </svg>

        {/* 统计信息 */}
        <div className="flex justify-around mt-4 text-center">
          <div>
            <div className="text-lg font-bold">
              {data[data.length - 1]?.cumulativeSolved || 0}
            </div>
            <div className="text-xs text-muted-foreground">累计解题</div>
          </div>
          <div>
            <div className="text-lg font-bold">
              {data.slice(-7).reduce((sum, d) => sum + d.dailySolved, 0)}
            </div>
            <div className="text-xs text-muted-foreground">本周解题</div>
          </div>
          <div>
            <div className="text-lg font-bold">
              {data.slice(-7).length > 0
                ? Math.round(data.slice(-7).reduce((sum, d) => sum + d.accuracy, 0) / 7)
                : 0}%
            </div>
            <div className="text-xs text-muted-foreground">平均正确率</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

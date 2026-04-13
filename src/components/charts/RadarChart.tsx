'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface RadarChartProps {
  categories: string[];
  values: number[];
}

export function RadarChart({ categories, values }: RadarChartProps) {
  const { points, maxValue } = useMemo(() => {
    const max = Math.max(...values, 100);
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    const calculatedPoints = categories.map((_, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const value = values[index] || 0;
      const normalizedValue = (value / max) * radius;
      return {
        x: centerX + Math.cos(angle) * normalizedValue,
        y: centerY + Math.sin(angle) * normalizedValue,
      };
    });

    return { points: calculatedPoints, maxValue: max };
  }, [categories, values]);

  const gridPoints = useMemo(() => {
    const levels = [0.25, 0.5, 0.75, 1];
    return levels.map(level => {
      const centerX = 150;
      const centerY = 150;
      const radius = 120 * level;
      return categories.map((_, index) => {
        const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
        return {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
        };
      });
    });
  }, [categories]);

  const axisPoints = useMemo(() => {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    return categories.map((_, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });
  }, [categories]);

  const polygonPath = points.length > 0
    ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`
    : '';

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <svg viewBox="0 0 300 320" className="w-full h-auto">
          {/* 背景 */}
          <rect width="300" height="320" fill="transparent" />
          
          {/* 网格线 */}
          {gridPoints.map((level, levelIndex) => (
            <polygon
              key={levelIndex}
              points={level.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          ))}
          
          {/* 轴线 */}
          {axisPoints.map((point, index) => (
            <line
              key={index}
              x1="150"
              y1="150"
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          ))}
          
          {/* 数据区域 */}
          {points.length > 0 && (
            <polygon
              points={points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="var(--primary)"
              fillOpacity="0.3"
              stroke="var(--primary)"
              strokeWidth="2"
            />
          )}
          
          {/* 数据点 */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="var(--primary)"
              stroke="white"
              strokeWidth="2"
            />
          ))}
          
          {/* 标签 */}
          {categories.map((category, index) => {
            const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
            const labelRadius = 145;
            const x = 150 + Math.cos(angle) * labelRadius;
            const y = 150 + Math.sin(angle) * labelRadius;
            
            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-foreground"
                style={{ fontSize: '11px' }}
              >
                {category.length > 4 ? category.slice(0, 4) + '...' : category}
              </text>
            );
          })}
          
          {/* 数值 */}
          {points.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y={point.y - 10}
              textAnchor="middle"
              className="text-xs fill-primary font-medium"
              style={{ fontSize: '10px' }}
            >
              {values[index]}
            </text>
          ))}
        </svg>
        
        {/* 图例 */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/30 border-2 border-primary" />
            <span className="text-xs text-muted-foreground">能力值</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-muted" />
            <span className="text-xs text-muted-foreground">网格线</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

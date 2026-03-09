'use client';

import { useMemo } from 'react';

interface RadarChartProps {
  data: {
    category: string;
    value: number; // 0-100
    maxValue?: number;
  }[];
  size?: number;
  showLabels?: boolean;
  showValues?: boolean;
}

export function RadarChart({
  data,
  size = 300,
  showLabels = true,
  showValues = true,
}: RadarChartProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size / 2) - 50;
  const levels = 5; // 同心圆层数

  // 计算每个类别的角度
  const angleStep = (2 * Math.PI) / data.length;
  const startAngle = -Math.PI / 2; // 从顶部开始

  // 计算点的位置
  const points = useMemo(() => {
    return data.map((item, index) => {
      const angle = startAngle + index * angleStep;
      const value = item.maxValue || 100;
      const r = (item.value / value) * radius;
      return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
        angle,
        label: item.category,
        value: item.value,
      };
    });
  }, [data, centerX, centerY, radius, angleStep, startAngle]);

  // 生成路径字符串
  const radarPath = useMemo(() => {
    const pathPoints = points.map(p => `${p.x},${p.y}`).join(' ');
    return `M ${pathPoints} Z`;
  }, [points]);

  // 生成标签位置
  const labelPositions = useMemo(() => {
    return data.map((item, index) => {
      const angle = startAngle + index * angleStep;
      const labelRadius = radius + 30;
      const textAnchor: 'middle' | 'start' | 'end' = Math.abs(angle) < 0.1 || Math.abs(angle - Math.PI) < 0.1
        ? 'middle'
        : angle > 0 && angle < Math.PI
          ? 'start'
          : 'end';
      return {
        x: centerX + labelRadius * Math.cos(angle),
        y: centerY + labelRadius * Math.sin(angle),
        label: item.category,
        value: item.value,
        textAnchor,
      };
    });
  }, [data, centerX, radius, angleStep, startAngle]);

  // 生成同心圆和射线
  const levelCircles = useMemo(() => {
    return Array.from({ length: levels }, (_, i) => {
      const r = ((i + 1) / levels) * radius;
      return {
        r,
        stroke: '#e5e7eb',
        strokeWidth: 1,
      };
    });
  }, [radius, levels]);

  const axisLines = useMemo(() => {
    return data.map((_, index) => {
      const angle = startAngle + index * angleStep;
      return {
        x2: centerX + radius * Math.cos(angle),
        y2: centerY + radius * Math.sin(angle),
      };
    });
  }, [data, centerX, centerY, radius, angleStep, startAngle]);

  // 获取颜色
  const getColor = (value: number) => {
    if (value >= 80) return '#22c55e'; // green
    if (value >= 60) return '#3b82f6'; // blue
    if (value >= 40) return '#f59e0b'; // yellow
    if (value >= 20) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 同心圆 */}
      {levelCircles.map((circle, i) => (
        <circle
          key={i}
          cx={centerX}
          cy={centerY}
          r={circle.r}
          fill="none"
          stroke={circle.stroke}
          strokeWidth={circle.strokeWidth}
          strokeDasharray={i === levels - 1 ? 'none' : '2,2'}
        />
      ))}

      {/* 坐标轴 */}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={centerX}
          y1={centerY}
          x2={line.x2}
          y2={line.y2}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      ))}

      {/* 数据区域 */}
      <path
        d={radarPath}
        fill="rgba(59, 130, 246, 0.2)"
        stroke="#3b82f6"
        strokeWidth={2}
      />

      {/* 数据点 */}
      {points.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={5}
          fill={getColor(point.value)}
          stroke="white"
          strokeWidth={2}
        />
      ))}

      {/* 标签 */}
      {showLabels && labelPositions.map((pos, i) => (
        <g key={i}>
          <text
            x={pos.x}
            y={pos.y}
            textAnchor={pos.textAnchor}
            dominantBaseline="middle"
            className="text-xs font-medium fill-gray-700"
          >
            {pos.label}
          </text>
          {showValues && (
            <text
              x={pos.x}
              y={pos.y + 14}
              textAnchor={pos.textAnchor}
              dominantBaseline="middle"
              className="text-xs fill-gray-500"
            >
              {pos.value}%
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

// 简化的进度条雷达图
interface ProgressRadarProps {
  data: {
    category: string;
    completed: number;
    total: number;
  }[];
}

export function ProgressRadar({ data }: ProgressRadarProps) {
  const radarData = data.map(item => ({
    category: item.category,
    value: item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0,
  }));

  return (
    <div className="flex flex-col items-center">
      <RadarChart data={radarData} size={320} />
    </div>
  );
}

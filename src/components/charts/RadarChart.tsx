'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RadarChartProps {
  categories: string[];
  values: number[];
  maxValue?: number;
  showGrid?: boolean;
  interactive?: boolean;
  animated?: boolean;
}

export function RadarChart({ 
  categories, 
  values, 
  maxValue = 100,
  showGrid = true,
  interactive = true,
  animated = true 
}: RadarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { points, gridLevels, axisPoints } = useMemo(() => {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    // 计算每个分类的点位置
    const calculatedPoints = categories.map((_, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const value = values[index] || 0;
      const normalizedValue = (value / maxValue) * radius;
      return {
        x: centerX + Math.cos(angle) * normalizedValue,
        y: centerY + Math.sin(angle) * normalizedValue,
        angle,
      };
    });

    // 网格层级（25%, 50%, 75%, 100%）
    const levels = [0.25, 0.5, 0.75, 1];
    const calculatedGridLevels = levels.map(level => {
      const r = radius * level;
      return categories.map((_, index) => {
        const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
        return {
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r,
        };
      });
    });

    // 轴线端点
    const calculatedAxisPoints = categories.map((_, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });

    return { 
      points: calculatedPoints, 
      gridLevels: calculatedGridLevels, 
      axisPoints: calculatedAxisPoints 
    };
  }, [categories, values, maxValue]);

  // 计算面积和中心点
  const { area, centerX, centerY } = useMemo(() => {
    if (points.length < 3) return { area: 0, centerX: 150, centerY: 150 };
    
    let area = 0;
    let cx = 0, cy = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
      cx += points[i].x;
      cy += points[i].y;
    }
    area = Math.abs(area) / 2;
    cx /= points.length;
    cy /= points.length;
    
    return { area, centerX: cx, centerY: cy };
  }, [points]);

  // 计算平均分
  const averageScore = values.length > 0 
    ? Math.round(values.reduce((sum, v) => sum + v, 0) / values.length) 
    : 0;

  // 获取能力等级
  const getAbilityLevel = (score: number) => {
    if (score >= 80) return { label: '优秀', color: 'text-green-600', bg: 'bg-green-500' };
    if (score >= 60) return { label: '良好', color: 'text-blue-600', bg: 'bg-blue-500' };
    if (score >= 40) return { label: '一般', color: 'text-yellow-600', bg: 'bg-yellow-500' };
    return { label: '待提升', color: 'text-red-600', bg: 'bg-red-500' };
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <TooltipProvider>
          <div className="relative">
            <svg viewBox="0 0 320 360" className="w-full h-auto">
              {/* 标题 */}
              <text x="160" y="15" textAnchor="middle" className="text-sm fill-foreground font-medium">
                能力分布
              </text>
              
              {/* 背景圆 */}
              <circle
                cx="160"
                cy="170"
                r="130"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.05"
                strokeWidth="1"
              />

              {/* 网格线 */}
              {showGrid && gridLevels.map((level, levelIndex) => (
                <motion.polygon
                  key={levelIndex}
                  initial={animated ? { opacity: 0, scale: 0 } : {}}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: levelIndex * 0.1, duration: 0.5 }}
                  points={level.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.1 + (1 - levelIndex * 0.2)}
                  strokeWidth="1"
                />
              ))}
              
              {/* 网格标签 */}
              {gridLevels.map((level, levelIndex) => (
                <text
                  key={`label-${levelIndex}`}
                  x="160"
                  y={170 - 120 * (levelIndex + 1) * 0.25 + 5}
                  textAnchor="end"
                  className="text-[10px] fill-muted-foreground"
                >
                  {Math.round(maxValue * (levelIndex + 1) * 0.25)}
                </text>
              ))}
              
              {/* 轴线 */}
              {axisPoints.map((point, index) => (
                <line
                  key={index}
                  x1="160"
                  y1="170"
                  x2={point.x}
                  y2={point.y}
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
              ))}
              
              {/* 数据区域 */}
              {points.length >= 3 && (
                <motion.polygon
                  initial={animated ? { opacity: 0 } : {}}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  points={points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="var(--primary)"
                  fillOpacity="0.2"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />
              )}
              
              {/* 数据点和标签 */}
              {points.map((point, index) => {
                const value = values[index] || 0;
                const level = getAbilityLevel(value);
                const isHovered = hoveredIndex === index;
                
                return (
                  <motion.g
                    key={index}
                    initial={animated ? { opacity: 0, scale: 0 } : {}}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    {/* 外圈 */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHovered ? 10 : 6}
                      fill="white"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    {/* 内圈 */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHovered ? 5 : 3}
                      fill="var(--primary)"
                      className="transition-all duration-200"
                    />
                    
                    {/* 标签位置计算 */}
                    {(() => {
                      const labelRadius = 145;
                      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
                      const labelX = 160 + Math.cos(angle) * labelRadius;
                      const labelY = 170 + Math.sin(angle) * labelRadius;
                      
                      // 文本对齐调整
                      let textAnchor: 'start' | 'end' | 'middle' = 'middle';
                      if (Math.cos(angle) > 0.3) textAnchor = 'start';
                      if (Math.cos(angle) < -0.3) textAnchor = 'end';
                      
                      return (
                        <>
                          {/* 分类名 */}
                          <text
                            x={labelX}
                            y={labelY}
                            textAnchor={textAnchor}
                            dominantBaseline="middle"
                            className={`text-xs fill-foreground transition-all duration-200 ${
                              isHovered ? 'font-bold' : ''
                            }`}
                          >
                            {categories[index].length > 4 
                              ? categories[index].slice(0, 4) + '...' 
                              : categories[index]}
                          </text>
                          
                          {/* 数值 */}
                          <text
                            x={point.x}
                            y={point.y - 18}
                            textAnchor="middle"
                            className={`text-xs font-medium transition-all duration-200 ${
                              isHovered ? 'fill-primary' : 'fill-muted-foreground'
                            }`}
                          >
                            {value}
                          </text>
                        </>
                      );
                    })()}
                  </motion.g>
                );
              })}
              
              {/* 中心统计 */}
              <text
                x={centerX}
                y={centerY - 5}
                textAnchor="middle"
                className="text-2xl font-bold fill-foreground"
              >
                {averageScore}
              </text>
              <text
                x={centerX}
                y={centerY + 12}
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
              >
                平均能力值
              </text>
            </svg>
            
            {/* 悬停信息卡片 */}
            {hoveredIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-0 right-0 bg-background border rounded-lg shadow-lg p-3 min-w-[140px]"
              >
                <p className="font-medium text-sm">{categories[hoveredIndex]}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{values[hoveredIndex]}</span>
                  <Badge className={`${getAbilityLevel(values[hoveredIndex]).bg} text-white`}>
                    {getAbilityLevel(values[hoveredIndex]).label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  最高: {Math.max(...values)} | 排名: {values.filter(v => v > values[hoveredIndex]).length + 1}/{values.length}
                </p>
              </motion.div>
            )}
          </div>
        </TooltipProvider>
        
        {/* 图例 */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t">
          {categories.map((cat, index) => {
            const level = getAbilityLevel(values[index]);
            return (
              <Tooltip key={cat}>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <div 
                      className={`w-3 h-3 rounded-full ${level.bg}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {cat}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{cat}: {values[index]}</p>
                  <p className="text-xs text-muted-foreground">{level.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* 能力等级说明 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 pt-4 border-t text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">优秀 (80-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">良好 (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-muted-foreground">一般 (40-59)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-muted-foreground">待提升 (0-39)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

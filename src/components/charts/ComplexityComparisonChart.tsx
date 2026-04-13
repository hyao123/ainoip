'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// 复杂度数据
interface ComplexityData {
  name: string;
  complexity: string;
  time: number; // 相对时间（n=100时的操作数）
  space: number; // 相对空间
  category: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}

const complexityData: ComplexityData[] = [
  { name: '常数 O(1)', complexity: 'O(1)', time: 1, space: 1, category: 'excellent', description: '与输入规模无关' },
  { name: '对数 O(log n)', complexity: 'O(log n)', time: 7, space: 1, category: 'excellent', description: '二分查找' },
  { name: '线性 O(n)', complexity: 'O(n)', time: 100, space: 1, category: 'good', description: '遍历数组' },
  { name: '线性对数 O(n log n)', complexity: 'O(n log n)', time: 665, space: 1, category: 'good', description: '快速/归并排序' },
  { name: '平方 O(n²)', complexity: 'O(n²)', time: 10000, space: 1, category: 'fair', description: '冒泡/选择排序' },
  { name: '立方 O(n³)', complexity: 'O(n³)', time: 1000000, space: 1, category: 'poor', description: '矩阵乘法' },
  { name: '指数 O(2ⁿ)', complexity: 'O(2^n)', time: 1267650600228229401496703205376, space: 1, category: 'poor', description: '递归斐波那契' },
  { name: '阶乘 O(n!)', complexity: 'O(n!)', time: Infinity, space: 1, category: 'poor', description: '全排列' },
];

// 不同n值下的时间对比
const nValues = [10, 50, 100, 500, 1000];

function calculateTime(complexity: string, n: number): number {
  switch (complexity) {
    case 'O(1)': return 1;
    case 'O(log n)': return Math.log2(n);
    case 'O(n)': return n;
    case 'O(n log n)': return n * Math.log2(n);
    case 'O(n²)': return n * n;
    case 'O(n³)': return n * n * n;
    case 'O(2^n)': return Math.pow(2, n);
    case 'O(n!)': return Infinity;
    default: return n;
  }
}

function formatNumber(n: number): string {
  if (n === Infinity) return '∞';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return Math.round(n).toString();
}

// 分类颜色
const categoryColors = {
  excellent: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-500' },
  good: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-500' },
  fair: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-500' },
  poor: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-500' },
};

export function ComplexityComparisonChart() {
  const [selectedN, setSelectedN] = useState(100);
  const [viewMode, setViewMode] = useState<'bar' | 'table'>('bar');

  const chartData = useMemo(() => {
    return complexityData.map(item => ({
      ...item,
      currentTime: calculateTime(item.complexity, selectedN),
      normalizedTime: Math.min(calculateTime(item.complexity, selectedN) / calculateTime('O(n²)', selectedN), 1),
    }));
  }, [selectedN]);

  const maxTime = useMemo(() => {
    return Math.max(...chartData.filter(d => d.currentTime !== Infinity).map(d => d.currentTime));
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
          算法复杂度对比
        </CardTitle>
        <CardDescription>
          直观对比不同算法复杂度在输入规模增长时的性能差异
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* N值选择器 */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">输入规模 n =</span>
          <div className="flex gap-2">
            {nValues.map(n => (
              <button
                key={n}
                onClick={() => setSelectedN(n)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedN === n
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <Badge variant="outline">
            操作数: {formatNumber(calculateTime('O(n²)', selectedN))}
          </Badge>
        </div>

        {/* 视图切换 */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'bar' | 'table')}>
          <TabsList>
            <TabsTrigger value="bar">图表视图</TabsTrigger>
            <TabsTrigger value="table">表格视图</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="space-y-6">
            {/* 条形图 */}
            <div className="space-y-3">
              {chartData.filter(d => d.currentTime !== Infinity).map((item) => (
                <div key={item.complexity} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.complexity}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${categoryColors[item.category].text}`}
                      >
                        {item.category === 'excellent' ? '优秀' : 
                         item.category === 'good' ? '良好' : 
                         item.category === 'fair' ? '一般' : '较差'}
                      </Badge>
                    </div>
                    <span className="text-muted-foreground">
                      {formatNumber(item.currentTime)} ops
                    </span>
                  </div>
                  <div className="h-6 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${categoryColors[item.category].bg} transition-all duration-500 rounded-full flex items-center justify-end pr-2`}
                      style={{ width: `${(item.currentTime / maxTime) * 100}%` }}
                    >
                      {item.currentTime / maxTime > 0.1 && (
                        <span className="text-xs text-white font-medium">
                          {(item.normalizedTime * 100).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 图例 */}
            <div className="flex flex-wrap gap-4 pt-4 border-t">
              {Object.entries(categoryColors).map(([key, colors]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
                  <span className="text-xs text-muted-foreground">
                    {key === 'excellent' ? '优秀' : 
                     key === 'good' ? '良好' : 
                     key === 'fair' ? '一般' : '较差'}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table">
            {/* 详细表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">复杂度</th>
                    <th className="text-left py-2 px-3">名称</th>
                    <th className="text-right py-2 px-3">n={selectedN}时</th>
                    <th className="text-center py-2 px-3">评级</th>
                    <th className="text-left py-2 px-3">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item) => (
                    <tr key={item.complexity} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-3 font-mono font-medium">
                        {item.complexity}
                      </td>
                      <td className="py-2 px-3">{item.name}</td>
                      <td className="py-2 px-3 text-right font-mono">
                        {item.currentTime === Infinity ? '∞' : formatNumber(item.currentTime)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <Badge 
                          className={`${categoryColors[item.category].bg} text-white`}
                        >
                          {item.category === 'excellent' ? '⭐⭐⭐' : 
                           item.category === 'good' ? '⭐⭐' : 
                           item.category === 'fair' ? '⭐' : '⚠️'}
                        </Badge>
                      </td>
                      <td className="py-2 px-3 text-muted-foreground">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        {/* 增长趋势对比 */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-4">增长趋势对比（n 从 10 到 1000）</h4>
          <div className="h-48 relative">
            <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* 网格线 */}
              {[0, 1, 2, 3, 4].map(i => (
                <g key={i}>
                  <line
                    x1="40"
                    y1={20 + i * 35}
                    x2="390"
                    y2={20 + i * 35}
                    stroke="currentColor"
                    strokeOpacity="0.1"
                  />
                  <text x="35" y={24 + i * 35} textAnchor="end" className="text-xs fill-muted-foreground">
                    {i === 0 ? '10' : i === 4 ? '1000' : ''}
                  </text>
                </g>
              ))}

              {/* X轴标签 */}
              <text x="60" y="175" className="text-xs fill-muted-foreground">O(1)</text>
              <text x="110" y="175" className="text-xs fill-muted-foreground">O(log n)</text>
              <text x="170" y="175" className="text-xs fill-muted-foreground">O(n)</text>
              <text x="230" y="175" className="text-xs fill-muted-foreground">O(n log n)</text>
              <text x="300" y="175" className="text-xs fill-muted-foreground">O(n²)</text>

              {/* 柱状条 */}
              {[
                { x: 50, height: 5, color: categoryColors.excellent.bg },
                { x: 100, height: 25, color: categoryColors.excellent.bg },
                { x: 160, height: 50, color: categoryColors.good.bg },
                { x: 220, height: 75, color: categoryColors.good.bg },
                { x: 290, height: 150, color: categoryColors.fair.bg },
              ].map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x}
                  y={160 - bar.height}
                  width="40"
                  height={bar.height}
                  fill={bar.color}
                  rx="4"
                  className="opacity-80"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* 实用建议 */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">💡 实用建议</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• O(n log n) 是排序算法的最优平均复杂度</li>
            <li>• 如果算法是 O(n²)，尝试优化到 O(n log n) 或更好</li>
            <li>• 递归算法注意栈溢出风险，考虑使用迭代版本</li>
            <li>• 大数据场景优先考虑时间复杂度，小数据可权衡空间复杂度</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Minus, Plus, Equal } from 'lucide-react';

interface DiffLine {
  lineNumber: number;
  type: 'expected' | 'actual' | 'both';
  expectedContent?: string;
  actualContent?: string;
  isDifferent: boolean;
}

interface DiffViewerProps {
  expected: string;
  actual: string;
  maxLines?: number;
}

/**
 * 简单的行差异比较算法
 * 对比期望输出和实际输出的每一行
 */
function computeDiff(expected: string, actual: string): DiffLine[] {
  const expectedLines = expected.split('\n');
  const actualLines = actual.split('\n');
  const maxLen = Math.max(expectedLines.length, actualLines.length);
  const diffLines: DiffLine[] = [];

  for (let i = 0; i < maxLen; i++) {
    const expectedLine = expectedLines[i] ?? '';
    const actualLine = actualLines[i] ?? '';
    
    // 如果两边都有内容
    if (i < expectedLines.length && i < actualLines.length) {
      const isDifferent = expectedLine !== actualLine;
      
      if (isDifferent) {
        // 两边都有但内容不同，分别显示
        diffLines.push({
          lineNumber: i + 1,
          type: 'expected',
          expectedContent: expectedLine,
          isDifferent: true,
        });
        diffLines.push({
          lineNumber: i + 1,
          type: 'actual',
          actualContent: actualLine,
          isDifferent: true,
        });
      } else {
        // 两边相同
        diffLines.push({
          lineNumber: i + 1,
          type: 'both',
          expectedContent: expectedLine,
          actualContent: actualLine,
          isDifferent: false,
        });
      }
    } else if (i < expectedLines.length) {
      // 期望有但实际没有（缺少的行）
      diffLines.push({
        lineNumber: i + 1,
        type: 'expected',
        expectedContent: expectedLine,
        isDifferent: true,
      });
    } else {
      // 实际有但期望没有（多余的行）
      diffLines.push({
        lineNumber: i + 1,
        type: 'actual',
        actualContent: actualLine,
        isDifferent: true,
      });
    }
  }

  return diffLines;
}

/**
 * 字符级别的差异高亮
 * 找出同一行中的具体差异字符
 */
function highlightCharDiff(expected: string, actual: string): {
  expectedHighlighted: React.ReactNode;
  actualHighlighted: React.ReactNode;
} {
  if (expected === actual) {
    return {
      expectedHighlighted: expected,
      actualHighlighted: actual,
    };
  }

  // 找到公共前缀
  let prefixLen = 0;
  while (prefixLen < expected.length && prefixLen < actual.length && expected[prefixLen] === actual[prefixLen]) {
    prefixLen++;
  }

  // 找到公共后缀
  let suffixLen = 0;
  while (
    suffixLen < expected.length - prefixLen &&
    suffixLen < actual.length - prefixLen &&
    expected[expected.length - 1 - suffixLen] === actual[actual.length - 1 - suffixLen]
  ) {
    suffixLen++;
  }

  const prefix = expected.slice(0, prefixLen);
  const expectedDiff = expected.slice(prefixLen, expected.length - suffixLen || expected.length);
  const actualDiff = actual.slice(prefixLen, actual.length - suffixLen || actual.length);
  const suffix = expected.slice(expected.length - suffixLen);

  return {
    expectedHighlighted: (
      <>
        <span>{prefix}</span>
        {expectedDiff && (
          <span className="bg-red-200 dark:bg-red-800/50 text-red-700 dark:text-red-300 px-0.5 rounded">
            {expectedDiff}
          </span>
        )}
        <span>{suffix}</span>
      </>
    ),
    actualHighlighted: (
      <>
        <span>{prefix}</span>
        {actualDiff && (
          <span className="bg-green-200 dark:bg-green-800/50 text-green-700 dark:text-green-300 px-0.5 rounded">
            {actualDiff}
          </span>
        )}
        <span>{suffix}</span>
      </>
    ),
  };
}

export function DiffViewer({ expected, actual, maxLines = 100 }: DiffViewerProps) {
  const diffLines = useMemo(() => computeDiff(expected, actual), [expected, actual]);

  // 限制显示行数
  const displayLines = diffLines.length > maxLines 
    ? [...diffLines.slice(0, maxLines / 2), null, ...diffLines.slice(-maxLines / 2)]
    : diffLines;

  // 统计差异
  const stats = useMemo(() => {
    let same = 0;
    let added = 0;
    let removed = 0;
    
    diffLines.forEach(line => {
      if (!line.isDifferent) {
        same++;
      } else if (line.type === 'expected') {
        removed++;
      } else if (line.type === 'actual') {
        added++;
      }
    });

    return { same, added, removed };
  }, [diffLines]);

  if (expected === actual) {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
        <Equal className="h-4 w-4" />
        <span className="text-sm">输出完全相同</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* 差异统计 */}
      <div className="flex items-center gap-3 text-xs">
        <Badge variant="outline" className="gap-1">
          <Minus className="h-3 w-3 text-red-500" />
          期望 {stats.removed} 行差异
        </Badge>
        <Badge variant="outline" className="gap-1">
          <Plus className="h-3 w-3 text-green-500" />
          实际 {stats.added} 行差异
        </Badge>
        <Badge variant="outline" className="gap-1">
          <Equal className="h-3 w-3 text-gray-500" />
          {stats.same} 行相同
        </Badge>
      </div>

      {/* 差异视图 */}
      <ScrollArea className="max-h-[300px]">
        <div className="font-mono text-sm">
          {displayLines.map((line, index) => {
            if (line === null) {
              return (
                <div key={`ellipsis-${index}`} className="py-1 text-center text-muted-foreground text-xs">
                  ... 省略 {diffLines.length - maxLines} 行 ...
                </div>
              );
            }

            // 相同的行
            if (!line.isDifferent) {
              return (
                <div 
                  key={`${line.lineNumber}-same`} 
                  className="flex items-start gap-2 py-0.5 px-2 hover:bg-muted/30"
                >
                  <span className="w-8 text-right text-muted-foreground text-xs select-none flex-shrink-0">
                    {line.lineNumber}
                  </span>
                  <span className="text-muted-foreground">  {line.expectedContent || ' '}</span>
                </div>
              );
            }

            // 期望的行（缺少的行）
            if (line.type === 'expected') {
              const actualLine = diffLines.find(
                l => l.lineNumber === line.lineNumber && l.type === 'actual'
              );
              
              // 如果同一行也有实际内容，显示对比
              if (actualLine) {
                const { expectedHighlighted, actualHighlighted } = highlightCharDiff(
                  line.expectedContent || '',
                  actualLine.actualContent || ''
                );
                
                return (
                  <React.Fragment key={`${line.lineNumber}-diff`}>
                    {/* 期望输出 */}
                    <div className="flex items-start gap-2 py-0.5 px-2 bg-red-50 dark:bg-red-950/30 border-l-2 border-red-400">
                      <span className="w-8 text-right text-red-500 text-xs select-none flex-shrink-0">
                        {line.lineNumber}
                      </span>
                      <Minus className="h-3 w-3 text-red-500 flex-shrink-0 mt-1" />
                      <span className="text-red-700 dark:text-red-300 break-all">
                        {expectedHighlighted}
                      </span>
                    </div>
                    {/* 实际输出 */}
                    <div className="flex items-start gap-2 py-0.5 px-2 bg-green-50 dark:bg-green-950/30 border-l-2 border-green-400">
                      <span className="w-8 text-right text-green-500 text-xs select-none flex-shrink-0">
                        {line.lineNumber}
                      </span>
                      <Plus className="h-3 w-3 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-green-700 dark:text-green-300 break-all">
                        {actualHighlighted}
                      </span>
                    </div>
                  </React.Fragment>
                );
              }

              // 纯期望行（实际缺少）
              return (
                <div 
                  key={`${line.lineNumber}-expected`}
                  className="flex items-start gap-2 py-0.5 px-2 bg-red-50 dark:bg-red-950/30 border-l-2 border-red-400"
                >
                  <span className="w-8 text-right text-red-500 text-xs select-none flex-shrink-0">
                    {line.lineNumber}
                  </span>
                  <Minus className="h-3 w-3 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-red-700 dark:text-red-300 break-all">
                    {line.expectedContent || ' '}
                  </span>
                </div>
              );
            }

            // 实际的行（多余的行）
            if (line.type === 'actual') {
              // 检查是否已经在上面的对比中处理过
              const expectedLine = diffLines.find(
                l => l.lineNumber === line.lineNumber && l.type === 'expected'
              );
              
              if (expectedLine) {
                // 已经在对比中处理过，跳过
                return null;
              }

              return (
                <div 
                  key={`${line.lineNumber}-actual`}
                  className="flex items-start gap-2 py-0.5 px-2 bg-green-50 dark:bg-green-950/30 border-l-2 border-green-400"
                >
                  <span className="w-8 text-right text-green-500 text-xs select-none flex-shrink-0">
                    {line.lineNumber}
                  </span>
                  <Plus className="h-3 w-3 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-green-700 dark:text-green-300 break-all">
                    {line.actualContent || ' '}
                  </span>
                </div>
              );
            }

            return null;
          })}
        </div>
      </ScrollArea>

      {/* 图例 */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-200 dark:bg-red-800 rounded-sm" />
          <span>期望输出</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-200 dark:bg-green-800 rounded-sm" />
          <span>实际输出</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-200 dark:bg-orange-800 rounded-sm" />
          <span>字符差异</span>
        </div>
      </div>
    </div>
  );
}

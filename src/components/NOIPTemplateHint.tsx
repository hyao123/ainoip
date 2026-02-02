'use client';

import { Card } from '@/components/ui/card';
import { FileText, AlertTriangle } from 'lucide-react';

export function NOIPTemplateHint() {
  return (
    <Card className="p-4 border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              NOIP 标准输入输出模板
            </h4>
          </div>
          <div className="space-y-2 text-xs text-amber-800 dark:text-amber-200">
            <p>
              NOIP 竞赛要求使用文件输入输出，标准模板如下：
            </p>
            <pre className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded text-xs font-mono overflow-x-auto">
{`#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    freopen("题目名.in", "r", stdin);
    freopen("题目名.out", "w", stdout);
    
    // 你的代码
    
    fclose(stdin);
    fclose(stdout);
    return 0;
}`}
            </pre>
            <p className="font-medium">
              注意：在线练习时可以直接使用 cin/cout，但竞赛时必须使用文件输入输出！
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

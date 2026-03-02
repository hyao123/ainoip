'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, Plus, Trash2, Save, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';

interface TestCase {
  id: number;
  name: string;
  input: string;
  expectedOutput: string;
}

interface TestCasesPanelProps {
  sampleInput: string;
  sampleOutput: string;
  onRunTest: (input: string, expectedOutput: string) => void;
}

export function TestCasesPanel({ sampleInput, sampleOutput, onRunTest }: TestCasesPanelProps) {
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, name: '样例测试', input: sampleInput, expectedOutput: sampleOutput }
  ]);
  const [expandedId, setExpandedId] = useState<number>(1);
  const [newTestName, setNewTestName] = useState('');

  const addTestCase = () => {
    const newId = Math.max(...testCases.map(t => t.id), 0) + 1;
    setTestCases([...testCases, {
      id: newId,
      name: `测试用例 ${newId}`,
      input: '',
      expectedOutput: ''
    }]);
    setExpandedId(newId);
  };

  const removeTestCase = (id: number) => {
    if (testCases.length <= 1) return;
    setTestCases(testCases.filter(t => t.id !== id));
    if (expandedId === id) {
      setExpandedId(testCases[0].id);
    }
  };

  const updateTestCase = (id: number, field: keyof TestCase, value: string) => {
    setTestCases(testCases.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/50">
      {/* 标题栏 */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-slate-100 dark:bg-slate-800/50">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">测试用例</span>
        <div className="flex items-center gap-2">
          <Button
            onClick={addTestCase}
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            新增
          </Button>
          <Button
            onClick={() => {
              const activeTest = testCases.find(t => t.id === expandedId);
              if (activeTest) {
                onRunTest(activeTest.input, activeTest.expectedOutput);
              }
            }}
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
          >
            <Play className="h-3 w-3 mr-1" />
            运行当前
          </Button>
        </div>
      </div>

      {/* 测试用例列表 */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {testCases.map((testCase) => (
          <Card
            key={testCase.id}
            className="border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* 测试用例标题 */}
            <button
              onClick={() => setExpandedId(testCase.id)}
              className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {expandedId === testCase.id ? (
                  <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                )}
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                  {testCase.name}
                </span>
              </div>
              {testCases.length > 1 && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTestCase(testCase.id);
                  }}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </button>

            {/* 测试用例内容 */}
            {expandedId === testCase.id && (
              <div className="px-3 pb-3 space-y-2">
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">测试名称</label>
                  <input
                    type="text"
                    value={testCase.name}
                    onChange={(e) => updateTestCase(testCase.id, 'name', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入测试名称..."
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">输入数据</label>
                  <Textarea
                    value={testCase.input}
                    onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                    className="min-h-[60px] text-xs font-mono resize-none"
                    placeholder="输入测试数据..."
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">期望输出</label>
                  <Textarea
                    value={testCase.expectedOutput}
                    onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                    className="min-h-[60px] text-xs font-mono resize-none"
                    placeholder="输入期望的输出..."
                  />
                </div>
                <Button
                  onClick={() => onRunTest(testCase.input, testCase.expectedOutput)}
                  className="w-full"
                  size="sm"
                >
                  <Play className="h-3 w-3 mr-1" />
                  运行测试
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

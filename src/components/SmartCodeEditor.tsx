'use client';

import { useState, useRef, useCallback } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Monitor,
  Moon,
  Sun,
  Code2,
  FileCode,
  ChevronDown,
  Search,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Lightbulb,
  Zap,
  FilePlus,
  Braces,
  Settings,
  Play,
} from 'lucide-react';
import {
  codeTemplates,
  templateCategories,
  searchTemplates,
  type CodeTemplate,
} from '@/lib/code-templates';
import { getSnippetsForLanguage, type CodeSnippet } from '@/lib/code-snippets';
import { CodeExplanationPanel } from '@/components/CodeExplanationPanel';
import { detectMissingHeaders } from '@/lib/code-explainer';

export type EditorTheme = 'vs-dark' | 'vs-light' | 'hc-black';
export type EditorLanguage = 'cpp' | 'python';

export interface EditorSettings {
  theme: EditorTheme;
  language: EditorLanguage;
  fontSize: number;
}

interface SmartCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  language?: EditorLanguage;
  theme?: EditorTheme;
  className?: string;
  onRunCode?: () => void;
  onSettingsChange?: (settings: EditorSettings) => void;
  showExplanationPanel?: boolean;
}

const languageConfig: Record<EditorLanguage, { label: string; icon: string }> = {
  cpp: { label: 'C++ 17', icon: '⚙️' },
  python: { label: 'Python 3', icon: '🐍' },
};

const themeConfig: Record<EditorTheme, { label: string; icon: React.ReactNode }> = {
  'vs-dark': { label: '暗色', icon: <Moon className="h-4 w-4" /> },
  'vs-light': { label: '亮色', icon: <Sun className="h-4 w-4" /> },
  'hc-black': { label: '高对比', icon: <Monitor className="h-4 w-4" /> },
};

export function SmartCodeEditor({
  value,
  onChange,
  language = 'cpp',
  theme = 'vs-dark',
  className = '',
  onRunCode,
  onSettingsChange,
  showExplanationPanel = true,
}: SmartCodeEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const [currentLanguage, setCurrentLanguage] = useState<EditorLanguage>(language);
  const [currentTheme, setCurrentTheme] = useState<EditorTheme>(theme);
  const [fontSize, setFontSize] = useState(14);
  const [templateSearch, setTemplateSearch] = useState('');
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [headerWarning, setHeaderWarning] = useState<string[]>([]);

  const filteredTemplates = templateSearch 
    ? searchTemplates(templateSearch)
    : codeTemplates;

  // 检测缺失的头文件
  const checkHeaders = useCallback((code: string) => {
    if (currentLanguage === 'cpp') {
      const result = detectMissingHeaders(code);
      setHeaderWarning(result.missing);
    }
  }, [currentLanguage]);

  // 注册智能补全
  const registerSmartCompletion = (monaco: any, language: string) => {
    const snippets = getSnippetsForLanguage(language);
    
    monaco.languages.registerCompletionItemProvider(language, {
      triggerCharacters: ['.', '<', ' ', '#'],
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const lineContent = model.getLineContent(position.lineNumber);
        const textBeforeCursor = lineContent.substring(0, position.column - 1);
        
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        // 上下文感知补全
        const suggestions: any[] = [];

        // 检测是否在写 #include
        if (textBeforeCursor.trim() === '#' || textBeforeCursor.trim().endsWith('#')) {
          // 提供头文件补全
          const headerSnippets = snippets.filter(s => s.label.startsWith('#include'));
          headerSnippets.forEach((snippet, index) => {
            suggestions.push({
              label: {
                label: snippet.label,
                description: snippet.detail,
              },
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: snippet.insertText,
              documentation: snippet.documentation,
              range: range,
              sortText: '0' + String(index).padStart(4, '0'),
            });
          });
        }
        
        // 检测是否在写 for 循环
        if (textBeforeCursor.trim().startsWith('for')) {
          const forSnippet = snippets.find(s => s.label === 'fori');
          if (forSnippet) {
            suggestions.push({
              label: {
                label: 'fori - for循环',
                description: '标准for循环模板',
              },
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'for (int i = 0; i < ${1:n}; i++) {\n\t${2}\n}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              sortText: '0',
            });
          }
        }

        // 添加所有代码片段
        snippets.forEach((snippet, index) => {
          suggestions.push({
            label: {
              label: snippet.label,
              description: snippet.detail || '',
            },
            kind: monaco.languages.CompletionItemKind[
              snippet.kind === 'function' ? 'Function' :
              snippet.kind === 'snippet' ? 'Snippet' :
              snippet.kind === 'keyword' ? 'Keyword' : 'Constant'
            ],
            insertText: snippet.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: snippet.documentation,
            range: range,
            sortText: String(index + 1).padStart(4, '0'),
            detail: snippet.detail,
          });
        });

        return { suggestions };
      },
    });
  };

  // 注册右键菜单
  const registerContextMenu = (monaco: any, editor: any) => {
    editor.addAction({
      id: 'explain-selection',
      label: '🤖 解释选中代码',
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => {
        const selection = editor.getSelection();
        if (selection) {
          const selectedText = editor.getModel().getValueInRange(selection);
          if (selectedText) {
            setSelectedCode(selectedText);
            setShowExplanation(true);
          }
        }
      },
    });

    editor.addAction({
      id: 'add-comments',
      label: '📝 添加注释',
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 2,
      run: () => {
        const selection = editor.getSelection();
        if (selection) {
          const selectedText = editor.getModel().getValueInRange(selection);
          if (selectedText) {
            // 在选中行前添加注释
            const lines = selectedText.split('\n');
            const commentedLines = lines.map((line: string) => '// ' + line);
            const commentedText = commentedLines.join('\n');
            
            editor.executeEdits('add-comments', [{
              range: selection,
              text: commentedText,
            }]);
          }
        }
      },
    });

    editor.addAction({
      id: 'analyze-complexity',
      label: '⚡ 分析复杂度',
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 3,
      run: () => {
        setSelectedCode('');
        setShowExplanation(true);
      },
    });
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // 添加快捷键
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => {
        onRunCode?.();
      }
    );

    // Ctrl+Shift+E 打开解释面板
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyE,
      () => {
        const selection = editor.getSelection();
        const model = editor.getModel();
        if (selection && model) {
          const selectedText = model.getValueInRange(selection);
          setSelectedCode(selectedText);
        }
        setShowExplanation(true);
      }
    );

    // 注册智能补全
    registerSmartCompletion(monaco, 'cpp');
    registerSmartCompletion(monaco, 'python');

    // 注册右键菜单
    registerContextMenu(monaco, editor);

    // 监听选择变化
    editor.onDidChangeCursorSelection(() => {
      const selection = editor.getSelection();
      const model = editor.getModel();
      if (selection && !selection.isEmpty() && model) {
        const selectedText = model.getValueInRange(selection);
        setSelectedCode(selectedText);
      }
    });

    // 监听内容变化，检测头文件
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      checkHeaders(code);
    });

    // 初始检测头文件
    checkHeaders(value);
  };

  const handleEditorChange: OnChange = (value) => {
    onChange(value || '');
  };

  const handleLanguageChange = (lang: EditorLanguage) => {
    setCurrentLanguage(lang);
    onSettingsChange?.({ theme: currentTheme, language: lang, fontSize });
  };

  const handleThemeChange = (newTheme: EditorTheme) => {
    setCurrentTheme(newTheme);
    onSettingsChange?.({ theme: newTheme, language: currentLanguage, fontSize });
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    onSettingsChange?.({ theme: currentTheme, language: currentLanguage, fontSize: size });
  };

  const insertTemplate = (template: CodeTemplate) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const position = editor.getPosition();
      
      if (position) {
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        };
        editor.executeEdits('template', [{
          range: range,
          text: template.code,
        }]);
        editor.focus();
      } else {
        onChange(value + '\n' + template.code);
      }
    } else {
      onChange(value + '\n' + template.code);
    }
    setShowTemplates(false);
  };

  const copyTemplate = async (template: CodeTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(template.code);
      setCopiedTemplateId(template.id);
      setTimeout(() => setCopiedTemplateId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // 插入缺失的头文件
  const insertMissingHeaders = () => {
    if (editorRef.current && headerWarning.length > 0) {
      const editor = editorRef.current;
      const model = editor.getModel();
      
      // 找到 #include 区域
      const content = model.getValue();
      const lines = content.split('\n');
      let lastIncludeLine = 0;
      
      lines.forEach((line: string, index: number) => {
        if (line.trim().startsWith('#include')) {
          lastIncludeLine = index + 1;
        }
      });
      
      // 在最后一个 #include 后插入新头文件
      const headersToInsert = headerWarning.join('\n');
      const insertPosition = { lineNumber: lastIncludeLine + 1, column: 1 };
      
      editor.executeEdits('insert-headers', [{
        range: {
          startLineNumber: insertPosition.lineNumber,
          startColumn: 1,
          endLineNumber: insertPosition.lineNumber,
          endColumn: 1,
        },
        text: headersToInsert + '\n',
      }]);
      
      setHeaderWarning([]);
    }
  };

  const getMonacoLanguage = (lang: EditorLanguage): string => {
    const mapping: Record<EditorLanguage, string> = {
      cpp: 'cpp',
      python: 'python',
    };
    return mapping[lang] || 'cpp';
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* 工具栏 */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          {/* 语言选择 */}
          <Select value={currentLanguage} onValueChange={(v) => handleLanguageChange(v as EditorLanguage)}>
            <SelectTrigger className="w-28 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languageConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <span>{config.icon}</span>
                    <span>{config.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 主题选择 */}
          <Select value={currentTheme} onValueChange={(v) => handleThemeChange(v as EditorTheme)}>
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(themeConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    {config.icon}
                    <span>{config.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 字体大小 */}
          <Select value={fontSize.toString()} onValueChange={(v) => handleFontSizeChange(parseInt(v))}>
            <SelectTrigger className="w-20 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[12, 13, 14, 15, 16, 18, 20].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="w-px h-6 bg-border" />

          {/* 代码模板 */}
          <DropdownMenu open={showTemplates} onOpenChange={setShowTemplates}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <FileCode className="h-4 w-4" />
                <span className="text-xs">模板库</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-96 p-0">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索模板..."
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                    className="pl-9 h-8"
                  />
                </div>
              </div>
              <ScrollArea className="h-80">
                {templateCategories.map((category) => {
                  const categoryTemplates = filteredTemplates.filter(t => t.category === category.id);
                  if (categoryTemplates.length === 0) return null;
                  
                  return (
                    <div key={category.id} className="p-2">
                      <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                        <span className="text-muted-foreground/50">({categoryTemplates.length})</span>
                      </div>
                      {categoryTemplates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => insertTemplate(template)}
                          className="group flex items-start justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{template.name}</span>
                              <Badge variant="outline" className="text-[10px] h-4">
                                {template.difficulty === 'beginner' ? '入门' : 
                                 template.difficulty === 'intermediate' ? '进阶' : '高级'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {template.description}
                            </p>
                            <div className="flex gap-1 mt-1">
                              {template.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-[10px] h-4 px-1">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100"
                            onClick={(e) => copyTemplate(template, e)}
                          >
                            {copiedTemplateId === template.id ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 智能功能 */}
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">代码解释</span>
          </Button>
        </div>

        {/* 右侧提示 */}
        <div className="flex items-center gap-3">
          {/* 头文件警告 */}
          {headerWarning.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-orange-500">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span className="text-xs">缺少 {headerWarning.length} 个头文件</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel className="text-xs">可能缺失的头文件</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {headerWarning.map((header, i) => (
                  <DropdownMenuItem key={i} className="font-mono text-xs">
                    {header}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={insertMissingHeaders} className="text-xs">
                  <FilePlus className="h-3.5 w-3.5 mr-2" />
                  自动添加所有缺失头文件
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">Enter</kbd>
            <span>运行</span>
            <span className="mx-1">|</span>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">Shift</kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">E</kbd>
            <span>解释</span>
          </div>
        </div>
      </div>

      {/* 头文件警告条 */}
      {headerWarning.length > 0 && (
        <div className="px-3 py-1.5 bg-orange-500/10 border-b border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>检测到可能缺失的头文件: {headerWarning.slice(0, 2).join(', ')}{headerWarning.length > 2 ? '...' : ''}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs"
            onClick={insertMissingHeaders}
          >
            一键添加
          </Button>
        </div>
      )}

      {/* 编辑器主体 */}
      <div className="flex-1 flex min-h-0">
        {/* Monaco Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={getMonacoLanguage(currentLanguage)}
            theme={currentTheme}
            value={value}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
            options={{
              fontSize: fontSize,
              fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", "Monaco", "Courier New", monospace',
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              tabSize: 4,
              insertSpaces: true,
              wordWrap: 'off',
              automaticLayout: true,
              suggestOnTriggerCharacters: true,
              quickSuggestions: {
                other: true,
                comments: false,
                strings: false,
              },
              acceptSuggestionOnEnter: 'on',
              formatOnPaste: true,
              formatOnType: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              smoothScrolling: true,
              padding: { top: 10 },
              bracketPairColorization: { enabled: true },
              matchBrackets: 'always',
              autoClosingBrackets: 'always',
              autoClosingQuotes: 'always',
              autoIndent: 'advanced',
            }}
            loading={
              <div className="flex items-center justify-center h-full bg-slate-900">
                <div className="flex items-center gap-2 text-slate-400">
                  <Code2 className="h-5 w-5 animate-pulse" />
                  <span>加载编辑器...</span>
                </div>
              </div>
            }
          />
        </div>

        {/* 代码解释面板 */}
        {showExplanation && showExplanationPanel && (
          <div className="w-80 border-l border-border bg-background">
            <CodeExplanationPanel
              code={value}
              selectedCode={selectedCode}
              language={currentLanguage}
              onClose={() => setShowExplanation(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useRef } from 'react';
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
} from 'lucide-react';
import {
  codeTemplates,
  templateCategories,
  searchTemplates,
  type CodeTemplate,
} from '@/lib/code-templates';

export type EditorTheme = 'vs-dark' | 'vs-light' | 'hc-black';
export type EditorLanguage = 'cpp' | 'java' | 'python' | 'pascal';

export interface EditorSettings {
  theme: EditorTheme;
  language: EditorLanguage;
  fontSize: number;
}

interface MonacoCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  language?: EditorLanguage;
  theme?: EditorTheme;
  className?: string;
  onRunCode?: () => void;
  onSettingsChange?: (settings: EditorSettings) => void;
}

const languageConfig: Record<EditorLanguage, { label: string; icon: string }> = {
  cpp: { label: 'C++ 17', icon: '⚙️' },
  java: { label: 'Java', icon: '☕' },
  python: { label: 'Python 3', icon: '🐍' },
  pascal: { label: 'Pascal', icon: '📜' },
};

const themeConfig: Record<EditorTheme, { label: string; icon: React.ReactNode }> = {
  'vs-dark': { label: '暗色', icon: <Moon className="h-4 w-4" /> },
  'vs-light': { label: '亮色', icon: <Sun className="h-4 w-4" /> },
  'hc-black': { label: '高对比', icon: <Monitor className="h-4 w-4" /> },
};

export function MonacoCodeEditor({
  value,
  onChange,
  language = 'cpp',
  theme = 'vs-dark',
  className = '',
  onRunCode,
  onSettingsChange,
}: MonacoCodeEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [currentLanguage, setCurrentLanguage] = useState<EditorLanguage>(language);
  const [currentTheme, setCurrentTheme] = useState<EditorTheme>(theme);
  const [fontSize, setFontSize] = useState(14);
  const [templateSearch, setTemplateSearch] = useState('');
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const filteredTemplates = templateSearch 
    ? searchTemplates(templateSearch)
    : codeTemplates;

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // 添加快捷键 Ctrl+Enter 运行
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => {
        onRunCode?.();
      }
    );
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
      const selection = editor.getSelection();
      const position = editor.getPosition();
      
      if (position) {
        // 在光标位置插入代码
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
        // 如果没有光标位置，追加到末尾
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

  // Monaco 语言映射
  const getMonacoLanguage = (lang: EditorLanguage): string => {
    const mapping: Record<EditorLanguage, string> = {
      cpp: 'cpp',
      java: 'java',
      python: 'python',
      pascal: 'pascal',
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
        </div>

        {/* 右侧提示 */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">Enter</kbd>
          <span>运行</span>
        </div>
      </div>

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
            quickSuggestions: true,
            acceptSuggestionOnEnter: 'on',
            formatOnPaste: true,
            formatOnType: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 10 },
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
    </div>
  );
}

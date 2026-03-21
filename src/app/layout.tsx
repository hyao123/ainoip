import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NOIP 算法开发平台',
    template: '%s | NOIP 算法开发平台',
  },
  description:
    '在线NOIP算法练习平台，提供丰富的算法题目库和实时代码运行环境。支持C++语言，包含入门、普及、提高等不同难度的题目，助你提升算法能力。',
  keywords: [
    'NOIP',
    '信息学奥赛',
    '算法练习',
    'C++',
    '在线编程',
    '代码运行',
    '算法题库',
    '信息学竞赛',
  ],
  authors: [{ name: 'NOIP Team' }],
  generator: 'Next.js',
  openGraph: {
    title: 'NOIP 算法开发平台 | 在线算法练习',
    description:
      '在线NOIP算法练习平台，提供丰富的算法题目库和实时代码运行环境。',
    url: 'https://noip.dev',
    siteName: 'NOIP 算法开发平台',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isDev && <Inspector />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

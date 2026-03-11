'use client';

import { motion } from 'framer-motion';

export function AILogo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const dimensions = {
    small: { logo: 'h-6 w-6', dot: 'w-1 h-1', gap: 'gap-2' },
    default: { logo: 'h-8 w-8', dot: 'w-1.5 h-1.5', gap: 'gap-2.5' },
    large: { logo: 'h-10 w-10', dot: 'w-2 h-2', gap: 'gap-3' },
  };

  const config = dimensions[size];

  return (
    <motion.div 
      className={`relative ${config.logo} flex items-center justify-center`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 背景光晕 */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-cyan-500/20 rounded-lg blur-md" />
      
      {/* 主体容器 */}
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg border border-white/10 overflow-hidden">
        {/* 内部光效 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-transparent to-cyan-600/30" />
        
        {/* 神经网络节点布局 */}
        <div className="absolute inset-0 flex items-center justify-center p-1.5">
          <div className="relative w-full h-full">
            {/* 中心节点 */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 shadow-lg shadow-violet-500/50"
              animate={{ 
                boxShadow: [
                  '0 0 4px rgba(139, 92, 246, 0.5)',
                  '0 0 8px rgba(139, 92, 246, 0.8)',
                  '0 0 4px rgba(139, 92, 246, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* 周围节点 - 左上 */}
            <motion.div 
              className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-cyan-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            
            {/* 周围节点 - 右上 */}
            <motion.div 
              className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-violet-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            
            {/* 周围节点 - 左下 */}
            <motion.div 
              className="absolute bottom-0.5 left-0.5 w-1 h-1 rounded-full bg-blue-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
            
            {/* 周围节点 - 右下 */}
            <motion.div 
              className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-pink-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
            />
            
            {/* 连接线 SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 24">
              <motion.line 
                x1="4" y1="4" x2="12" y2="12" 
                stroke="url(#lineGradient)" 
                strokeWidth="0.5" 
                strokeOpacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              />
              <motion.line 
                x1="20" y1="4" x2="12" y2="12" 
                stroke="url(#lineGradient)" 
                strokeWidth="0.5" 
                strokeOpacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.2 }}
              />
              <motion.line 
                x1="4" y1="20" x2="12" y2="12" 
                stroke="url(#lineGradient)" 
                strokeWidth="0.5" 
                strokeOpacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.4 }}
              />
              <motion.line 
                x1="20" y1="20" x2="12" y2="12" 
                stroke="url(#lineGradient)" 
                strokeWidth="0.5" 
                strokeOpacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.6 }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* 扫描线效果 */}
        <motion.div 
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

// 带文字的完整Logo
export function AILogoWithText({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const textSizes = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base',
  };

  const gaps = {
    small: 'gap-2',
    default: 'gap-2.5',
    large: 'gap-3',
  };

  return (
    <div className={`flex items-center ${gaps[size]}`}>
      <AILogo size={size} />
      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
          NOIP
        </span>
        <span className={`text-[10px] text-muted-foreground leading-none`}>
          AI 算法题库
        </span>
      </div>
    </div>
  );
}

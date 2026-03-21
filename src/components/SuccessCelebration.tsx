'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Sparkles, Star, Trophy, Zap } from 'lucide-react';

interface SuccessCelebrationProps {
  show: boolean;
  onComplete?: () => void;
  message?: string;
}

// 随机位置生成
const randomPositions = Array.from({ length: 20 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  rotate: Math.random() * 360,
  scale: 0.5 + Math.random() * 0.5,
}));

// 装饰星星
const decorativeStars = [
  { x: 15, y: 20, delay: 0.3, size: 16 },
  { x: 85, y: 25, delay: 0.4, size: 14 },
  { x: 10, y: 70, delay: 0.5, size: 12 },
  { x: 90, y: 65, delay: 0.35, size: 18 },
  { x: 25, y: 85, delay: 0.45, size: 14 },
  { x: 75, y: 80, delay: 0.55, size: 16 },
];

export function SuccessCelebration({ 
  show, 
  onComplete,
  message = '太棒了！题目通过！'
}: SuccessCelebrationProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // 自动关闭
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        >
          {/* 彩带效果 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {randomPositions.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  y: [0, 100 + Math.random() * 200],
                  x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                  scale: [0, pos.scale, pos.scale, 0],
                  rotate: [0, pos.rotate],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: '-20px',
                }}
              >
                {i % 3 === 0 ? (
                  <Star className="w-4 h-4 text-yellow-400" />
                ) : i % 3 === 1 ? (
                  <Sparkles className="w-3 h-3 text-pink-400" />
                ) : (
                  <div className="w-2 h-4 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
                )}
              </motion.div>
            ))}
          </div>

          {/* 装饰星星 */}
          {decorativeStars.map((star, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0.8],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                delay: star.delay,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute pointer-events-none"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              <Star 
                className="text-yellow-400 fill-yellow-400" 
                style={{ width: star.size, height: star.size }} 
              />
            </motion.div>
          ))}

          {/* 主内容 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            className="relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 p-1 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl px-8 py-6 text-center">
              {/* 图标 */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <PartyPopper className="w-8 h-8 text-white" />
              </motion.div>

              {/* 消息 */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-slate-800 dark:text-white mb-2"
              >
                {message}
              </motion.h2>

              {/* 副标题 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-500 dark:text-slate-400"
              >
                继续加油，攻克下一题！
              </motion.p>

              {/* 按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
                >
                  继续挑战
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

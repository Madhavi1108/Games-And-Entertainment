import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';

const LevelEndModal = () => {
  const { gameStatus, score, targetScore, level, nextLevel, retryLevel } = useGameStore();

  const isVisible = gameStatus === 'won' || gameStatus === 'lost';
  const isWin = gameStatus === 'won';

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative bg-[var(--bg-deep)] border border-[var(--border)] p-8 rounded-[2rem] shadow-[0_0_50px_rgba(139,92,246,0.3)] flex flex-col items-center max-w-sm w-full text-center overflow-hidden"
          >
            {/* Decorative background glow */}
            <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full blur-[80px] opacity-50 ${isWin ? 'bg-[var(--candy-green)]' : 'bg-[var(--candy-red)]'}`} />
            
            <h2 className={`text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${isWin ? 'from-[var(--candy-green)] to-[var(--candy-blue)]' : 'from-[var(--candy-red)] to-[var(--candy-orange)]'}`}>
              {isWin ? 'Level Complete!' : 'Out of Moves!'}
            </h2>
            
            <p className="text-[var(--text-muted)] mb-6 text-sm">
              {isWin ? `You beat Level ${level}!` : `Level ${level} Failed`}
            </p>
            
            <div className="bg-[var(--bg-mid)] w-full rounded-2xl p-4 mb-8 border border-white/5">
              <div className="flex justify-between text-sm mb-2 text-[var(--text-muted)]">
                <span>Target</span>
                <span>{targetScore}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm text-[var(--text-muted)]">Score</span>
                <span className={`text-4xl font-black drop-shadow-lg ${isWin ? 'text-[var(--candy-green)]' : 'text-white'}`}>
                  {score}
                </span>
              </div>
            </div>

            <button 
              onClick={isWin ? nextLevel : retryLevel}
              className={`w-full py-4 rounded-2xl font-black text-lg text-white shadow-lg transition-all active:scale-95 ${
                isWin 
                  ? 'bg-gradient-to-r from-[var(--candy-green)] to-[var(--candy-blue)] shadow-[0_0_20px_rgba(46,196,182,0.4)] hover:from-teal-400 hover:to-blue-400' 
                  : 'bg-gradient-to-r from-[var(--candy-red)] to-[var(--candy-pink)] shadow-[0_0_20px_rgba(255,77,109,0.4)] hover:from-rose-500 hover:to-pink-500'
              }`}
            >
              {isWin ? 'Play Next Level' : 'Retry Level'}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LevelEndModal;

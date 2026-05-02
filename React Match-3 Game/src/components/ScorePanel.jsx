import React from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';

const ScorePanel = () => {
  const { score, targetScore, moves, combo, level, initGame } = useGameStore();
  const progress = Math.min((score / targetScore) * 100, 100);

  return (
    <div className="w-full max-w-md mx-auto mb-6 bg-[var(--panel-bg)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl flex flex-col gap-4">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--bg-mid)] text-white px-3 py-1 rounded-full border border-purple-500/50 font-black text-sm">
            LVL {level}
          </div>
          <div className="text-sm font-semibold text-[var(--text-muted)] flex flex-col">
            <span>Target: {targetScore}</span>
          </div>
        </div>

        <button 
          onClick={() => initGame(level)}
          className="bg-[var(--bg-light)] hover:bg-purple-900/60 text-xs text-[var(--text-muted)] font-bold py-1.5 px-3 rounded-full border border-[var(--border)] transition-all"
        >
          Restart
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[var(--candy-blue)] to-[var(--candy-pink)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Stats */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Score</span>
          <div className="flex items-baseline gap-2">
            <motion.span 
              key={score}
              initial={{ scale: 1.2, color: 'var(--candy-yellow)' }}
              animate={{ scale: 1, color: 'var(--text-main)' }}
              className="text-3xl sm:text-4xl font-black drop-shadow-md"
            >
              {score}
            </motion.span>
            <AnimateCombo combo={combo} />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Moves</span>
          <motion.span 
            key={moves}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className={`text-3xl sm:text-4xl font-black drop-shadow-md ${moves <= 5 ? 'text-[var(--candy-red)]' : 'text-[var(--candy-green)]'}`}
          >
            {moves}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

const AnimateCombo = ({ combo }) => {
  if (combo <= 1) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[var(--candy-orange)] font-black text-sm drop-shadow-[0_0_5px_rgba(247,127,0,0.8)]"
    >
      x{combo}
    </motion.div>
  );
};

export default ScorePanel;

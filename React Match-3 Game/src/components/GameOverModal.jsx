import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';

const GameOverModal = () => {
  const { gameOver, score, initGame } = useGameStore();

  return (
    <AnimatePresence>
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative bg-[var(--bg-mid)] border border-[var(--border)] p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full text-center"
          >
            <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--candy-pink)] to-[var(--candy-purple)]">
              Out of Moves!
            </h2>
            <p className="text-[var(--text-muted)] mb-6">You scored</p>
            
            <div className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,190,11,0.5)] mb-8">
              {score}
            </div>

            <button 
              onClick={initGame}
              className="w-full py-4 bg-gradient-to-r from-[var(--candy-blue)] to-[var(--candy-purple)] hover:from-blue-500 hover:to-purple-500 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(67,97,238,0.4)] transition-all active:scale-95"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GameOverModal;

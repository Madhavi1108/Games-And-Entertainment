import React, { useEffect } from 'react';
import useGameStore from '../store/gameStore';
import CandyTile from './CandyTile';

const GameBoard = () => {
  const { grid, initGame } = useGameStore();

  useEffect(() => {
    initGame();
  }, [initGame]);

  if (!grid || grid.length === 0) return null;

  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-[var(--panel-bg)] border border-[var(--border)] rounded-2xl backdrop-blur-md shadow-2xl shadow-purple-900/50" />
      
      {/* Grid */}
      <div className="absolute inset-0 p-2 sm:p-4 grid grid-cols-8 grid-rows-8 gap-0 sm:gap-1">
        {grid.map((row, r) => (
          row.map((candy, c) => (
            <div 
              key={`${r}-${c}`} 
              className="w-full h-full bg-black/10 rounded-lg sm:rounded-xl overflow-visible flex items-center justify-center relative"
            >
              <CandyTile candy={candy} r={r} c={c} />
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCandyIcon } from './CandyIcons';
import useGameStore from '../store/gameStore';

const CandyTile = ({ candy, r, c }) => {
  const { selectedCandy, selectCandy, handleDragSwap, gameStatus, isProcessing } = useGameStore();

  if (!candy) {
    return <div className="w-full h-full" />;
  }

  const isSelected = selectedCandy?.r === r && selectedCandy?.c === c;
  const isMatched = candy.isMatched;
  const isInteractive = gameStatus === 'playing' && !isProcessing;

  const onDragEnd = (event, info) => {
    if (!isInteractive) return;

    const threshold = 20; // Minimum drag distance to count as a swap
    const { x, y } = info.offset;

    if (Math.abs(x) > Math.abs(y)) {
      if (x > threshold) handleDragSwap(r, c, 'right');
      else if (x < -threshold) handleDragSwap(r, c, 'left');
    } else {
      if (y > threshold) handleDragSwap(r, c, 'down');
      else if (y < -threshold) handleDragSwap(r, c, 'up');
    }
  };

  return (
    <AnimatePresence>
      {!isMatched && (
        <motion.div
          layout
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: isSelected ? 1.15 : 1
          }}
          exit={{ 
            scale: 0, 
            opacity: 0,
            rotate: 90,
            transition: { duration: 0.3 }
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25,
            mass: 0.8
          }}
          drag={isInteractive}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          className={`w-full h-full p-1 sm:p-2 cursor-pointer flex items-center justify-center relative ${
            isSelected ? 'z-20' : 'z-10'
          }`}
          onClick={() => selectCandy(r, c)}
          whileHover={isInteractive ? { scale: 1.08 } : {}}
          whileTap={isInteractive ? { scale: 0.9 } : {}}
        >
          {isSelected && (
            <motion.div 
              layoutId="highlight"
              className="absolute inset-0 bg-white rounded-xl sm:rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
          {getCandyIcon(candy.type)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CandyTile;

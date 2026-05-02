import { create } from 'zustand';
import { getLevelConfig } from '../utils/constants';
import { createInitialGrid, checkForMatches, applyGravity, isAdjacent } from '../utils/gameLogic';

const useGameStore = create((set, get) => ({
  grid: [],
  score: 0,
  moves: 0,
  targetScore: 0,
  level: 1,
  gameStatus: 'idle', // 'idle', 'playing', 'won', 'lost'
  isProcessing: false,
  selectedCandy: null,
  combo: 1,

  initGame: (startLevel = 1) => {
    const config = getLevelConfig(startLevel);
    set({
      grid: createInitialGrid(),
      score: 0,
      moves: config.moves,
      targetScore: config.targetScore,
      level: startLevel,
      gameStatus: 'playing',
      isProcessing: false,
      selectedCandy: null,
      combo: 1,
    });
  },

  nextLevel: () => {
    const currentLevel = get().level;
    get().initGame(currentLevel + 1);
  },

  retryLevel: () => {
    const currentLevel = get().level;
    get().initGame(currentLevel);
  },

  selectCandy: (r, c) => {
    const state = get();
    if (state.gameStatus !== 'playing' || state.isProcessing) return;

    if (!state.selectedCandy) {
      set({ selectedCandy: { r, c } });
      return;
    }

    const pos1 = state.selectedCandy;
    const pos2 = { r, c };

    if (pos1.r === r && pos1.c === c) {
      set({ selectedCandy: null });
      return;
    }

    if (isAdjacent(pos1, pos2)) {
      set({ isProcessing: true, selectedCandy: null });
      get().attemptSwap(pos1, pos2);
    } else {
      set({ selectedCandy: { r, c } });
    }
  },

  // Added for drag-to-swap support
  handleDragSwap: (startR, startC, direction) => {
    const state = get();
    if (state.gameStatus !== 'playing' || state.isProcessing) return;

    const pos1 = { r: startR, c: startC };
    let pos2 = { r: startR, c: startC };

    if (direction === 'up' && startR > 0) pos2.r -= 1;
    else if (direction === 'down' && startR < 7) pos2.r += 1;
    else if (direction === 'left' && startC > 0) pos2.c -= 1;
    else if (direction === 'right' && startC < 7) pos2.c += 1;
    else return; // Invalid drag direction or edge of board

    set({ isProcessing: true, selectedCandy: null });
    get().attemptSwap(pos1, pos2);
  },

  attemptSwap: async (pos1, pos2) => {
    const { grid, moves } = get();
    
    const newGrid = grid.map(row => [...row]);
    const temp = newGrid[pos1.r][pos1.c];
    newGrid[pos1.r][pos1.c] = newGrid[pos2.r][pos2.c];
    newGrid[pos2.r][pos2.c] = temp;

    const matchResult = checkForMatches(newGrid);

    if (matchResult.hasMatches) {
      set({ grid: newGrid, moves: moves - 1, combo: 1 });
      await new Promise(resolve => setTimeout(resolve, 300));
      get().processMatches(newGrid, matchResult);
    } else {
      set({ grid: newGrid });
      await new Promise(resolve => setTimeout(resolve, 300));
      set({ grid, isProcessing: false });
    }
  },

  processMatches: async (currentGrid, matchResult) => {
    const { score, combo, moves, targetScore } = get();
    
    const pointsEarned = matchResult.matchCount * 10 * combo;
    const newScore = score + pointsEarned;
    set({ score: newScore });

    const gridWithMatchedState = currentGrid.map((row, r) => 
      row.map((cell, c) => {
        if (matchResult.matchedPositions.some(pos => pos.r === r && pos.c === c)) {
          return { ...cell, isMatched: true };
        }
        return cell;
      })
    );
    set({ grid: gridWithMatchedState });
    
    await new Promise(resolve => setTimeout(resolve, 350)); 

    const newGrid = applyGravity(currentGrid, matchResult.matchedPositions);
    set({ grid: newGrid });
    
    await new Promise(resolve => setTimeout(resolve, 350));

    const newMatchResult = checkForMatches(newGrid);
    if (newMatchResult.hasMatches) {
      set({ combo: combo + 1 });
      get().processMatches(newGrid, newMatchResult);
    } else {
      let status = 'playing';
      // Game logic evaluation
      if (newScore >= targetScore) {
        status = 'won';
      } else if (moves <= 0) {
        status = 'lost';
      }

      set({ 
        isProcessing: false, 
        combo: 1,
        gameStatus: status
      });
    }
  }
}));

export default useGameStore;

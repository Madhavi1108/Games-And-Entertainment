import { GRID_SIZE, CANDY_TYPES } from './constants';

// Helper to get a random candy
export const getRandomCandy = () => {
  const randomIndex = Math.floor(Math.random() * CANDY_TYPES.length);
  return CANDY_TYPES[randomIndex];
};

// Create initial grid (ensure no initial matches of 3 or more)
export const createInitialGrid = () => {
  const grid = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const row = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      let candy;
      let isMatch;
      do {
        candy = getRandomCandy();
        isMatch = false;
        // Check left for horizontal match
        if (c >= 2 && row[c - 1]?.type === candy && row[c - 2]?.type === candy) {
          isMatch = true;
        }
        // Check up for vertical match
        if (r >= 2 && grid[r - 1][c]?.type === candy && grid[r - 2][c]?.type === candy) {
          isMatch = true;
        }
      } while (isMatch);
      row.push({ id: `${r}-${c}-${Math.random()}`, type: candy });
    }
    grid.push(row);
  }
  return grid;
};

// Check for all matches in the grid
export const checkForMatches = (grid) => {
  const matchedPositions = new Set();
  let scoreMultiplier = 0;

  // Check horizontal matches
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE - 2; c++) {
      const type1 = grid[r][c]?.type;
      const type2 = grid[r][c + 1]?.type;
      const type3 = grid[r][c + 2]?.type;

      if (type1 && type1 === type2 && type1 === type3) {
        matchedPositions.add(`${r},${c}`);
        matchedPositions.add(`${r},${c + 1}`);
        matchedPositions.add(`${r},${c + 2}`);
        
        // Extend match length horizontally
        let ext = c + 3;
        while (ext < GRID_SIZE && grid[r][ext]?.type === type1) {
          matchedPositions.add(`${r},${ext}`);
          ext++;
        }
        scoreMultiplier++;
      }
    }
  }

  // Check vertical matches
  for (let c = 0; c < GRID_SIZE; c++) {
    for (let r = 0; r < GRID_SIZE - 2; r++) {
      const type1 = grid[r][c]?.type;
      const type2 = grid[r + 1][c]?.type;
      const type3 = grid[r + 2][c]?.type;

      if (type1 && type1 === type2 && type1 === type3) {
        matchedPositions.add(`${r},${c}`);
        matchedPositions.add(`${r + 1},${c}`);
        matchedPositions.add(`${r + 2},${c}`);
        
        // Extend match length vertically
        let ext = r + 3;
        while (ext < GRID_SIZE && grid[ext][c]?.type === type1) {
          matchedPositions.add(`${ext},${c}`);
          ext++;
        }
        scoreMultiplier++;
      }
    }
  }

  return {
    hasMatches: matchedPositions.size > 0,
    matchedPositions: Array.from(matchedPositions).map(pos => {
      const [r, c] = pos.split(',').map(Number);
      return { r, c };
    }),
    matchCount: matchedPositions.size,
    scoreMultiplier
  };
};

// Remove matches and apply gravity
export const applyGravity = (grid, matchedPositions) => {
  const newGrid = grid.map(row => [...row]);
  
  // Mark matched as null
  matchedPositions.forEach(({ r, c }) => {
    newGrid[r][c] = null;
  });

  // Gravity: shift non-nulls down and fill top with new candies
  for (let c = 0; c < GRID_SIZE; c++) {
    let emptySlots = 0;
    // Iterate from bottom to top
    for (let r = GRID_SIZE - 1; r >= 0; r--) {
      if (newGrid[r][c] === null) {
        emptySlots++;
      } else if (emptySlots > 0) {
        // Move candy down
        newGrid[r + emptySlots][c] = newGrid[r][c];
        newGrid[r][c] = null;
      }
    }
    
    // Fill empty slots at the top with new candies
    for (let i = 0; i < emptySlots; i++) {
      newGrid[i][c] = {
        id: `new-${c}-${Date.now()}-${Math.random()}`,
        type: getRandomCandy()
      };
    }
  }

  return newGrid;
};

// Check if two candies are adjacent
export const isAdjacent = (pos1, pos2) => {
  const rDiff = Math.abs(pos1.r - pos2.r);
  const cDiff = Math.abs(pos1.c - pos2.c);
  return (rDiff === 1 && cDiff === 0) || (rDiff === 0 && cDiff === 1);
};

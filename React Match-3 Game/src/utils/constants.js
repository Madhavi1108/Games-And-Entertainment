export const GRID_SIZE = 8;
export const BASE_MOVES = 20;
export const BASE_TARGET_SCORE = 1500;

export const CANDY_TYPES = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Purple',
  'Orange'
];

export const CANDY_COLORS = {
  Red: 'var(--candy-red)',
  Blue: 'var(--candy-blue)',
  Green: 'var(--candy-green)',
  Yellow: 'var(--candy-yellow)',
  Purple: 'var(--candy-purple)',
  Orange: 'var(--candy-orange)',
};

// Helper to calculate level requirements
export const getLevelConfig = (level) => ({
  moves: BASE_MOVES + Math.floor(level / 3) * 5, // Slightly increase moves occasionally
  targetScore: BASE_TARGET_SCORE + (level - 1) * 800 // Increase target score per level
});

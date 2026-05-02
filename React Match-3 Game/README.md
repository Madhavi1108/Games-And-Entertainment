# React Match-3 Game

A modern, production-quality Match-3 puzzle game (similar to Candy Crush) built entirely with React and modern web technologies. It features a responsive 8x8 grid, smooth drag-and-drop mechanics, cascading gravity, and dynamic animations.

## ✨ Features

- **Core Match-3 Mechanics:** Swap adjacent items to create matches of 3 or more.
- **Cascading Gravity:** When items are matched and removed, new ones fall from the top to fill the empty spaces.
- **Score System:** Real-time scoring based on match combos and consecutive cascades.
- **Fluid Animations:** Powered by Framer Motion, featuring smooth tile swapping, matching effects, and falling animations.
- **Responsive Design:** Fully responsive grid built with Tailwind CSS, working seamlessly on both desktop and mobile devices.
- **State Management:** Highly performant global state management using Zustand to handle complex game logic without unnecessary re-renders.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)

## 🚀 Getting Started

Follow these steps to run the game locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository (if applicable) and navigate to the project directory:
   ```bash
   cd your-project-directory
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or yarn install / pnpm install / bun install
   ```

### Running the Development Server

Start the Vite development server:
```bash
npm run dev
# or yarn dev / pnpm dev / bun run dev
```

Open your browser and navigate to `http://localhost:5173` to play the game!

## 🎮 How to Play

1. **Select an Item:** Click or tap on an item you want to move.
2. **Swap:** Click or drag it to an adjacent position (up, down, left, or right) to swap.
3. **Make a Match:** The swap must result in a vertical or horizontal line of 3 or more identical items. If it doesn't, the items will swap back.
4. **Score Points:** Clearing items adds to your score. Longer matches yield higher points!

## 📁 Project Structure

- `src/components/` - Reusable UI components (Grid, Tile, ScorePanel, LevelEndModal, etc.)
- `src/store/` - Zustand store containing the core game logic and state.
- `src/App.jsx` - Main application entry point.
- `index.css` - Global styles and Tailwind configuration.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

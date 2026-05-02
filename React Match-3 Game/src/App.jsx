import React from 'react';
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import LevelEndModal from './components/LevelEndModal';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGQwMjIxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWEwNTMzIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')]">
      
      {/* Ambient glowing orbs behind the board */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[var(--candy-purple)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[var(--candy-blue)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />

      <div className="z-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--candy-pink)] via-[var(--candy-purple)] to-[var(--candy-blue)] mb-6 sm:mb-8 drop-shadow-sm text-center">
          Sweet Crush
        </h1>
        
        <ScorePanel />
        <GameBoard />
      </div>

      <LevelEndModal />
    </div>
  );
}

export default App;

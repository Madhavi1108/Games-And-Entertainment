import React from 'react';
import { CANDY_COLORS } from '../utils/constants';

export const RedHeart = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <path
      d="M50 88C50 88 15 62 15 35C15 20 28 10 40 10C46 10 50 15 50 15C50 15 54 10 60 10C72 10 85 20 85 35C85 62 50 88 50 88Z"
      fill={CANDY_COLORS.Red}
    />
    <path d="M30 25 C35 20 45 25 40 35" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
);

export const BlueCircle = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <circle cx="50" cy="50" r="40" fill={CANDY_COLORS.Blue} />
    <path d="M30 30 A 20 20 0 0 1 50 20" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
);

export const GreenSquare = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <rect x="15" y="15" width="70" height="70" rx="20" fill={CANDY_COLORS.Green} />
    <path d="M25 35 V 25 H 35" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const YellowStar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <polygon
      points="50,10 61,38 90,38 66,55 75,85 50,68 25,85 34,55 10,38 39,38"
      fill={CANDY_COLORS.Yellow}
    />
  </svg>
);

export const PurpleHexagon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <polygon
      points="50,10 85,30 85,70 50,90 15,70 15,30"
      fill={CANDY_COLORS.Purple}
    />
    <path d="M30 30 L 40 25" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
);

export const OrangeTriangle = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <polygon
      points="50,15 90,85 10,85"
      fill={CANDY_COLORS.Orange}
      strokeLinejoin="round"
      strokeWidth="10"
      stroke={CANDY_COLORS.Orange}
    />
    <path d="M45 35 L 55 35" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
);

export const getCandyIcon = (type) => {
  switch (type) {
    case 'Red': return <RedHeart />;
    case 'Blue': return <BlueCircle />;
    case 'Green': return <GreenSquare />;
    case 'Yellow': return <YellowStar />;
    case 'Purple': return <PurpleHexagon />;
    case 'Orange': return <OrangeTriangle />;
    default: return null;
  }
};

import React from 'react';

/* Hand-drawn SVG accents — the "made by a human" touch. currentColor inherits. */

export const Squiggle = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 12" fill="none" className={className} aria-hidden="true">
    <path
      d="M2 8C20 2 30 2 48 8s28 5 46-1 28-4 46 1 24 3 12 1"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const Arrow = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 90 60" fill="none" className={className} aria-hidden="true">
    <path
      d="M6 8c22 30 44 40 74 38M80 46c1-8 2-16 0-24M80 46c-7 0-14 1-20-2"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CircleScribble = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 160 70" fill="none" className={className} aria-hidden="true">
    <path
      d="M80 6C40 4 8 18 8 35s34 30 74 29 70-13 70-29S120 8 82 6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Star = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

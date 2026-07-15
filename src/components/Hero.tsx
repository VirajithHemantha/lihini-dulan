import React from 'react';
import { motion } from 'motion/react';
import { FloatingPetals } from './FloatingPetals';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-auto sm:h-screen flex items-center justify-center overflow-hidden bg-brand-ivory">
      <img
        src="/ChatGPT Image Jul 15, 2026, 11_28_01 PM.png"
        alt="Hero Image"
        className="w-full h-auto sm:h-full sm:object-contain"
      />
      
      {/* Persistent subtle falling petals in background */}
      <div className="absolute inset-0 z-[5] opacity-60 pointer-events-none">
        <FloatingPetals />
      </div>

    </div>
  );
};

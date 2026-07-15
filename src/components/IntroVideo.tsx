import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setHasStarted(true);
    // Use a small timeout to ensure the video element is rendered before playing
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false; // Unmute since user interacted
        videoRef.current.play().catch(err => {
          console.error("Video play failed:", err);
          // Fallback: try muted play if unmuted fails
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-[#1A281E] via-[#3D5A47] to-[#2C4234] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-10 cursor-pointer bg-brand-ivory flex items-center justify-center"
            onClick={handleStart}
          >
            <img
              src="/ChatGPT Image Jul 16, 2026, 12_05_14 AM.png"
              alt="Welcome to our Wedding"
              className="w-full h-auto sm:h-full sm:object-contain"
            />
            {/* Subtle pulse hint to click anywhere */}
            <div className="absolute inset-0 bg-white/5 animate-pulse pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div 
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative w-full h-full bg-black"
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              preload="auto"
              onEnded={onComplete}
              onError={(e) => {
                console.error("Video error event:", e);
                setTimeout(onComplete, 1000);
              }}
            >
              <source src="/Video Project 7.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-60" />
      </div>
    </div>
  );
};

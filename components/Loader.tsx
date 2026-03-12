import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Speeding up: 10ms interval * 100 steps = 1000ms (1 second) total duration
    const intervalTime = 10; 
    
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          // Reduced post-load delay from 500ms to 200ms for snappier feel
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-between px-8 md:px-20 bg-dark text-accent h-screen w-screen"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="font-mono text-sm md:text-base opacity-50">
        INITIALIZING SYSTEM...
      </div>
      <div className="text-6xl md:text-9xl font-bold font-sans tabular-nums tracking-tighter">
        {count}%
      </div>
    </motion.div>
  );
};

export default Loader;
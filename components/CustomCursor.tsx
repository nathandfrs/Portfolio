import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

interface CustomCursorProps {
  variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover';
}

const CustomCursor: React.FC<CustomCursorProps> = ({ variant: propVariant }) => {
  // 1. MOVEMENT - INSTANT (No Lag)
  // We use useMotionValue directly for instant 1:1 tracking without spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // 2. GENERIC HOVER DETECTION
  // This state tracks if we are over a generic clickable element (button, a, etc.)
  // regardless of whether the parent component explicitly set a variant.
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Check if the target is interactive
        const isInteractive = 
            target.closest('a') || 
            target.closest('button') || 
            target.closest('input') || 
            target.closest('.interactive-element') ||
            window.getComputedStyle(target).cursor === 'pointer';

        setIsHoveringInteractive(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver); // Use generic listener for auto-detection

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // 3. STATE RESOLUTION
  // Explicit props (project, text) take precedence over generic hover detection.
  // If prop is 'default' but we detect a button, we switch to 'hover' (Ring).
  const effectiveVariant = propVariant !== 'default' ? propVariant : (isHoveringInteractive ? 'hover' : 'default');

  // 4. VISUAL VARIANTS
  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "rgba(187, 187, 187, 0.8)", // #BBBBBB at 0.8 opacity
      borderColor: "rgba(187, 187, 187, 0.4)",
      borderWidth: 1,
      mixBlendMode: "normal" as const, 
    },
    hover: {
      height: 50,
      width: 50,
      backgroundColor: "rgba(187, 187, 187, 0)", // Transparent center
      borderColor: "rgba(187, 187, 187, 1)", // Solid Grey Border
      borderWidth: 1,
      mixBlendMode: "normal" as const,
    },
    project: {
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0)", // Transparent center
      borderColor: "rgba(255, 255, 255, 1)", // White border for projects
      borderWidth: 1,
      mixBlendMode: "difference" as const, // Keep difference for 'View' text readability
    },
    text: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(187, 187, 187, 0)",
      borderColor: "rgba(187, 187, 187, 1)",
      borderWidth: 1,
      mixBlendMode: "normal" as const,
    },
    white: {
      height: 16,
      width: 16,
      backgroundColor: "#ffffff",
      borderColor: "rgba(255, 255, 255, 0.5)",
      borderWidth: 1,
      mixBlendMode: "normal" as const,
    },
    "text-white": {
      height: 60,
      width: 60,
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderColor: "#ffffff",
      borderWidth: 1,
      mixBlendMode: "normal" as const,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%", // Centers the cursor
        translateY: "-50%",
      }}
    >
        {/* Inner element handles shape and color transitions */}
        <motion.div 
            className="flex items-center justify-center rounded-full backdrop-blur-[1px]"
            variants={variants}
            animate={effectiveVariant}
            transition={{ 
                type: "tween", 
                ease: "backOut", 
                duration: 0.2 // Slightly faster visual transition since movement is now instant
            }} 
        >
            {/* Optional: 'VIEW' Text for Project variant */}
            <AnimatePresence>
                {effectiveVariant === 'project' && (
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="text-[10px] font-mono font-bold text-white uppercase tracking-widest"
                    >
                        View
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
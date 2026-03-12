import React from 'react';
import { motion } from 'framer-motion';

interface HeaderLine {
  text: string;
  style: 'solid'; // Enforcing solid only
  indent?: boolean; // Indents the line for visual rhythm
  accent?: boolean; // Adds the blinking dot
}

interface SectionHeaderProps {
  number: string;
  label: string;
  lines: HeaderLine[];
  inverse?: boolean; // Adapts colors for light/dark backgrounds (True = Dark Bg/Light Text)
  className?: string; // Allows custom margins/positioning
  setCursorVariant?: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
  cursorType?: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover';
  accentClass?: string; // Allows overriding the accent color
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  number, 
  label, 
  lines, 
  inverse = false,
  className = "mb-16 md:mb-24",
  setCursorVariant,
  cursorType,
  accentClass = "text-accent"
}) => {
  // Determine text colors based on context
  const solidColor = inverse ? 'text-light' : 'text-dark';
  // Default label colors
  const defaultLabelColor = inverse ? 'text-gray-600' : 'text-gray-400';
  // If a custom accent class is provided, use it for the label (inherit) otherwise use default
  const labelClassName = accentClass === "text-accent" ? defaultLabelColor : "text-inherit opacity-80";

  return (
    <div className={`flex flex-col gap-6 relative z-10 ${className}`}>
      {/* 1. The Anchor Block (Eyebrow) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }} // Reverses animation when scrolling out
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-4 font-mono text-xs md:text-sm tracking-[0.2em] uppercase ${accentClass}`}
      >
        <span className="text-[10px] opacity-80">■</span>
        <span>({number})</span>
        {/* Horizontal Line Decorator - Uses currentColor */}
        <span className="w-12 h-[1px] bg-current opacity-30 inline-block"></span>
        <span className={labelClassName}>{label}</span>
      </motion.div>

      {/* 2. The Kinetic Typography (H2 System) - Standard Animation */}
      <div 
        className="flex flex-col leading-[0.85] w-fit"
        onMouseEnter={() => setCursorVariant && setCursorVariant(cursorType || 'text')}
        onMouseLeave={() => setCursorVariant && setCursorVariant('default')}
      >
        {lines.map((line, index) => {
          return (
            <motion.h2
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }} // Reverses animation, margin avoids flicker at edges
                transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1, 
                    ease: [0.25, 0.1, 0.25, 1.0] 
                }}
                className={`
                relative text-[9vw] md:text-[7vw] font-black uppercase tracking-tighter
                ${line.indent ? 'ml-[2vw] md:ml-[4vw]' : ''}
                ${solidColor}
                `}
            >
                {line.text}
                
                {/* Optional Blinking Accent Dot */}
                {line.accent && (
                <span className="inline-block w-[1.2vw] h-[1.2vw] rounded-full bg-current ml-2 mb-[1vw] animate-pulse" />
                )}
            </motion.h2>
          );
        })}
      </div>
    </div>
  );
};

export default SectionHeader;
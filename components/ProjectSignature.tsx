import React from 'react';
import { motion } from 'framer-motion';

const ProjectSignature: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed right-6 md:right-12 bottom-12 z-40 hidden md:flex flex-col items-end pointer-events-none mix-blend-difference text-white"
    >
      <div className="writing-vertical-rl text-xs font-mono tracking-widest uppercase opacity-50">
        Nathan Desforges — Portfolio 2025
      </div>
    </motion.div>
  );
};

export default ProjectSignature;

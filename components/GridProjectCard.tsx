import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface GridProjectCardProps {
  project: Project;
  index: number;
  setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
  onClick: () => void;
}

const GridProjectCard: React.FC<GridProjectCardProps> = ({ project, index, setCursorVariant, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-4 cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorVariant('project');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorVariant('default');
      }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-white/5 relative">
        <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        
        {/* Overlay / Hover Effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* ID Tag */}
        <div className="absolute top-4 left-4 font-mono text-xs uppercase tracking-widest bg-white/90 dark:bg-black/90 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            0{project.id}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
                {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-accent" />
        </div>
        
        <div className="flex justify-between items-center border-t border-black/10 dark:border-white/10 pt-2 mt-2">
            <span className="font-mono text-xs uppercase tracking-widest opacity-60">
                {project.category}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest opacity-60">
                {project.year}
            </span>
        </div>
      </div>
    </motion.div>
  );
};

export default GridProjectCard;

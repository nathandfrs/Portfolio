import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, setCursorVariant, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  
  // Use mouse position tracking for the fixed image
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (isHovered) {
            // Offset the image slightly from the cursor so it doesn't block text
            mouseX.set(e.clientX + 20);
            mouseY.set(e.clientY - 150);
        }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, mouseX, mouseY]);

  return (
    <>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false, amount: 0.4 }} // Reverses when scrolling up
            onMouseEnter={() => {
                setIsHovered(true);
                setCursorVariant('project');
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setCursorVariant('default');
            }}
            onClick={onClick}
            className="group relative w-full border-b border-black/10 dark:border-white/10 py-12 md:py-20 cursor-none flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500 px-4 md:px-0"
        >
            <div className="flex items-center gap-8 md:gap-16 w-full">
                {/* ID / Anchor Block - Strictly Mono/Tiny */}
                <div className="w-16 md:w-20 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors duration-300">
                    <span>0{project.id}</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">■</span>
                </div>
                
                {/* Main Title - Reduced font size for harmony */}
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-dark dark:text-light transition-all duration-300 group-hover:translate-x-4">
                    {project.title}
                </h3>
            </div>

            {/* Meta Data - Strictly Mono/Tiny to create contrast */}
            <div className="flex items-center gap-8 w-full md:w-64 justify-between md:justify-start mt-4 md:mt-0 pl-24 md:pl-0">
                <div className="flex flex-col md:items-start">
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 group-hover:text-dark dark:group-hover:text-light transition-colors">
                        {project.category}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs text-accent mt-1 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.year}
                    </span>
                 </div>
            </div>

            {/* Mobile Link Icon */}
            <div className="md:hidden absolute right-4 top-12 opacity-50">
                <ArrowUpRight className="text-accent w-5 h-5" />
            </div>
        </motion.div>

        {/* Floating Portal Image - Fixed Position relative to viewport */}
        <motion.div 
            style={{ 
                x: mouseX, 
                y: mouseY,
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
            }}
            className="hidden md:block fixed top-0 left-0 w-[400px] h-[300px] z-50 pointer-events-none overflow-hidden rounded-lg shadow-2xl mix-blend-difference editable-image-container"
        >
            <img 
                id={`project-card-${project.id}`}
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale contrast-125 editable-image"
            />
        </motion.div>
    </>
  );
};

export default ProjectCard;
import React, { useState, useMemo } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { ArrowLeft, Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
  import { allProjects, ExtendedProject } from '../data/projects';
  
  interface AllProjectsProps {
    onBack: () => void;
    onProjectClick: (id: number) => void;
    setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
  }
  
  const AllProjects: React.FC<AllProjectsProps> = ({ onBack, onProjectClick, setCursorVariant }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState<'Newest' | 'Oldest' | 'Featured'>('Newest');
  
    const filters = ['All', 'UX', 'Branding', 'AR', 'Web', 'Strategy'];
  
    const filteredAndSortedProjects = useMemo(() => {
      let result = [...allProjects];
  
      // Filter by category
      if (activeFilter !== 'All') {
        result = result.filter(p => 
          p.category.toLowerCase().includes(activeFilter.toLowerCase()) || 
          p.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase())
        );
      }
  
      // Search
      if (searchQuery) {
        result = result.filter(p => 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      // Sort
      if (sortBy === 'Newest') {
        result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      } else if (sortBy === 'Oldest') {
        result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
      }
      // Featured is default order
  
      return result;
    }, [activeFilter, searchQuery, sortBy]);
  
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light pt-32 pb-24 px-6 md:px-12"
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-16">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent mb-8 hover:translate-x-[-4px] transition-transform"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            Archive<span className="text-accent">.</span>
          </h1>
          <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">
            A complete list of selected works and experiments.
          </p>
        </div>
  
        {/* Controls */}
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center border-y border-black/10 dark:border-white/10 py-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${
                  activeFilter === filter 
                    ? 'bg-dark text-light dark:bg-light dark:text-dark border-transparent' 
                    : 'border-black/10 dark:border-white/10 hover:border-accent'
                }`}
                onMouseEnter={() => setCursorVariant('text')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {filter}
              </button>
            ))}
          </div>
  
          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border border-black/10 dark:border-white/10 px-10 py-2 font-mono text-xs uppercase tracking-widest focus:outline-none focus:border-accent w-full sm:w-64 transition-all"
              />
            </div>
  
            {/* Sort */}
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <SlidersHorizontal size={16} className="text-gray-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none focus:outline-none cursor-pointer text-accent"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Featured">Featured</option>
              </select>
            </div>
          </div>
        </div>
  
        {/* Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => onProjectClick(project.id)}
                onMouseEnter={() => setCursorVariant('project')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-gray-100 dark:bg-white/5">
                  <img 
                    id={`archive-project-${project.id}`}
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 editable-image"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 p-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={20} className="text-accent" />
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-gray-500">{project.year}</span>
                </div>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-black/5 dark:border-white/5 opacity-60">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
  
        {filteredAndSortedProjects.length === 0 && (
          <div className="max-w-7xl mx-auto py-32 text-center">
            <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">No projects found matching your criteria.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
              className="mt-4 text-accent font-mono text-xs uppercase tracking-widest underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </motion.div>
    );
  };
  
  export default AllProjects;
  

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Moon, Sun, ArrowDown, Linkedin, Instagram, ArrowUpRight, ArrowUp } from 'lucide-react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ProjectCard';
import SectionHeader from './components/SectionHeader';
import ProjectDetail from './components/ProjectDetail';
import AboutSection from './components/AboutSection';
import AllProjects from './components/AllProjects';
import AdminPanel from './components/AdminPanel';
import { Project } from './types';
import { allProjects } from './data/projects';

const projects: Project[] = allProjects.slice(0, 4);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover'>('default');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // -- VIEW STATE MANAGEMENT --
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [view, setView] = useState<'home' | 'project' | 'all-projects'>('home');

  // -- PARALLAX LOGIC --
  const { scrollY } = useScroll();
  
  // Hero Parallax
  const heroX1 = useTransform(scrollY, [0, 500], [0, -100]); // Moves Left
  const heroX2 = useTransform(scrollY, [0, 500], [0, 100]);  // Moves Right
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]); // Fades out

  useEffect(() => {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (view !== 'home') {
        setView('home');
        setActiveProjectId(null);
        // Small timeout to allow view transition before scrolling
        setTimeout(() => {
             const element = document.getElementById(id);
             if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    } else {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProject = (id: number) => {
      // Transition to Project View
      setActiveProjectId(id);
      setView('project');
      setCursorVariant('default');
  }

  const navigateHome = () => {
      setView('home');
      setActiveProjectId(null);
  }

  const navigateToAllProjects = () => {
      setView('all-projects');
      setActiveProjectId(null);
      window.scrollTo(0, 0);
  }

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
    exit: { opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen cursor-none selection:bg-accent selection:text-black">
          <CustomCursor variant={cursorVariant} />

          {/* Navigation - Unified across all views */}
          <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference text-white">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl font-bold font-sans tracking-tighter cursor-pointer"
                onMouseEnter={() => setCursorVariant('text')}
                onMouseLeave={() => setCursorVariant('default')}
                onClick={navigateHome}
            >
              NATHAN<span className="text-accent">.</span>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-8"
            >
              <button 
                onClick={toggleTheme} 
                className="hover:text-accent transition-colors"
                onMouseEnter={() => setCursorVariant('text')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              
              <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="hover:text-accent transition-colors"
                  onMouseEnter={() => setCursorVariant('text')}
                  onMouseLeave={() => setCursorVariant('default')}
              >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </nav>

          {/* Full Screen Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 bg-accent z-40 flex flex-col justify-center items-center gap-8 text-black"
              >
                {['Work', 'About', 'Career', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item.toLowerCase())}
                    className="group relative overflow-hidden"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <span className="block text-5xl md:text-8xl font-black uppercase tracking-tighter text-black transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      {item}
                    </span>
                    <span className="absolute inset-0 block text-5xl md:text-8xl font-black uppercase tracking-tighter text-white translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                      {item}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* PAGE CONTENT SWITCHER */}
          <AnimatePresence mode="wait">
            {view === 'home' ? (
                <motion.main 
                    key="home"
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="relative z-10 bg-light dark:bg-dark"
                >
                    
                    {/* Hero Section */}
                    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 relative overflow-hidden">
                    <div className="flex flex-col z-10">
                        {/* Parallax Title 1 */}
                        <motion.div 
                            style={{ x: heroX1 }} // Moves LEFT
                            className="will-change-transform"
                        >
                            <motion.h1 
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                            className="text-[11vw] md:text-[10.5vw] leading-[0.85] font-bold tracking-tighter uppercase text-dark dark:text-light"
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('default')}
                            >
                            NATHAN
                            </motion.h1>
                        </motion.div>

                        {/* Parallax Title 2 */}
                        <motion.div 
                            style={{ x: heroX2 }} // Moves RIGHT
                            className="flex flex-col md:flex-row items-start md:items-center will-change-transform"
                        >
                            <motion.h1 
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.65, ease: [0.25, 0.1, 0.25, 1.0] }}
                                className="text-[11vw] md:text-[10.5vw] leading-[0.85] font-bold tracking-tighter uppercase text-dark dark:text-light mr-4 sm:mr-12"
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                DESFORGES
                            </motion.h1>
                            
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-4 md:mt-0 flex flex-col font-mono text-sm md:text-base text-gray-500 max-w-sm"
                            >
                                <p className="font-bold text-accent mb-1 uppercase">Communication & Digital</p>
                                <p>Designer from France.</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div 
                        style={{ opacity: heroOpacity }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 font-mono text-xs md:text-sm text-gray-400"
                    >
                        <ArrowDown className="animate-bounce text-accent" />
                        SCROLL TO EXPLORE
                    </motion.div>
                    </section>

                    {/* Work Section */}
                    <section id="work" className="px-6 md:px-12 py-32 bg-light dark:bg-dark border-t border-gray-300 dark:border-white/10 relative z-20">
                        <SectionHeader 
                            number="01" 
                            label="Portfolio"
                            inverse={darkMode}
                            setCursorVariant={setCursorVariant}
                            lines={[
                                { text: "Selected", style: 'solid' },
                                { text: "Works", style: 'solid', indent: true }
                            ]}
                        />
                    
                        <div className="flex flex-col border-t border-black/20 dark:border-white/20">
                            {projects.map((project, index) => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                index={index}
                                setCursorVariant={setCursorVariant}
                                onClick={() => navigateToProject(project.id)} // Pass ID
                            />
                            ))}
                        </div>

                        {/* VIEW ALL PROJECTS CTA */}
                        <div className="mt-24 flex justify-center">
                            <motion.button 
                                onClick={navigateToAllProjects}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative px-12 py-6 border border-black/10 dark:border-white/10 overflow-hidden"
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <span className="relative z-10 font-mono text-sm uppercase tracking-[0.3em] font-bold group-hover:text-light dark:group-hover:text-dark transition-colors duration-500">
                                    View all projects
                                </span>
                                <div className="absolute inset-0 bg-dark dark:bg-light translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                            </motion.button>
                        </div>
                    </section>

                    {/* About / Info Section */}
                    <AboutSection darkMode={darkMode} setCursorVariant={setCursorVariant} />

                    {/* Career Section */}
                    <section id="career" className="px-6 md:px-12 py-32 bg-light dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/5 relative z-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                            <div className="col-span-1 lg:col-span-5">
                                <SectionHeader 
                                    number="03" 
                                    label="Experience"
                                    inverse={darkMode}
                                    className="mb-0"
                                    setCursorVariant={setCursorVariant}
                                    lines={[
                                        { text: "Career", style: 'solid' },
                                        { text: "Timeline", style: 'solid', indent: true }
                                    ]}
                                />
                            </div>

                            <div className="col-span-1 lg:col-span-7 flex flex-col gap-8 pt-0 lg:pt-24 pl-0 lg:pl-4">
                                {/* Item 1 */}
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.3 }} // REVERSIBLE
                                    className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 border-b border-gray-300 dark:border-white/10 pb-8 hover:border-accent transition-colors duration-500"
                                >
                                    <span className="font-mono text-accent min-w-[120px] text-xs uppercase tracking-widest">2025 – NOW</span>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-dark dark:text-light mb-1 group-hover:text-accent transition-colors">Communication Manager</h3>
                                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">So’Link Conseil (Apprenticeship)</p>
                                    </div>
                                </motion.div>
                                {/* Item 2 */}
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.3 }} // REVERSIBLE
                                    transition={{ delay: 0.1 }}
                                    className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 border-b border-gray-300 dark:border-white/10 pb-8 hover:border-accent transition-colors duration-500"
                                >
                                    <span className="font-mono text-accent min-w-[120px] text-xs uppercase tracking-widest">2025</span>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-dark dark:text-light mb-1 group-hover:text-accent transition-colors">Communication & Digital Designer</h3>
                                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Just’Lock Conciergerie (Internship)</p>
                                    </div>
                                </motion.div>
                                {/* Item 3 */}
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.3 }} // REVERSIBLE
                                    transition={{ delay: 0.2 }}
                                    className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 border-b border-gray-300 dark:border-white/10 pb-8 hover:border-accent transition-colors duration-500"
                                >
                                    <span className="font-mono text-accent min-w-[120px] text-xs uppercase tracking-widest">2023 – NOW</span>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-dark dark:text-light mb-1 group-hover:text-accent transition-colors">BUT MMI Student</h3>
                                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Multimedia & Digital Communication</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                
                    {/* REDESIGNED FOOTER */}
                    <footer id="contact" className="relative w-full bg-accent text-dark dark:bg-[#050505] dark:text-light z-0 pt-24 md:pt-32 pb-12 overflow-hidden transition-colors duration-500">
                        <div className="px-6 md:px-12 w-full flex flex-col gap-16 md:gap-24">
                            
                            {/* 1. Header & Call to Action */}
                            <div className="flex flex-col gap-8 md:gap-12">
                                <SectionHeader 
                                    number="04" 
                                    label="Contact"
                                    inverse={darkMode} // Dynamic: Dark Text in Light Mode, Light Text in Dark Mode
                                    setCursorVariant={setCursorVariant}
                                    lines={[
                                        { text: "Let's", style: 'solid' },
                                        { text: "Talk", style: 'solid', indent: true }
                                    ]}
                                />
                                
                                {/* Massive Animated Email Link */}
                                <div className="relative group overflow-hidden">
                                    <a 
                                        href="mailto:nathan.desforges24@gmail.com"
                                        className="block"
                                        onMouseEnter={() => setCursorVariant('project')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    >
                                        <motion.h2 
                                            initial={{ y: "100%" }}
                                            whileInView={{ y: 0 }}
                                            viewport={{ once: false, margin: "-10%" }} // Reversible
                                            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                                            className="text-[6vw] md:text-[5vw] font-black uppercase tracking-tighter leading-[0.9] border-b-2 border-dark/20 group-hover:border-dark dark:border-white/20 dark:group-hover:border-white transition-colors duration-300 pb-4 break-words"
                                        >
                                            nathan.desforges24<br className="md:hidden"/>@gmail.com
                                        </motion.h2>
                                    </a>
                                    {/* Animated Arrow that appears on hover */}
                                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none transform translate-y-4 group-hover:translate-y-0 text-dark dark:text-light">
                                        <ArrowUpRight size={80} strokeWidth={1.5} />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Brutalist Grid Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-black/10 dark:border-white/10 transition-colors duration-500">
                                
                                {/* Column 1: Socials */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: 0.1 }}
                                    className="p-8 md:pl-0 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 flex flex-col gap-6"
                                >
                                    <span className="font-mono text-xs uppercase tracking-widest opacity-60">Socials</span>
                                    <div className="flex flex-col gap-4">
                                        <a href="https://www.instagram.com/nath_dfrs/" className="flex items-center gap-3 font-bold hover:opacity-60 transition-opacity w-fit text-lg">
                                            <Instagram size={20} /> Instagram
                                        </a>
                                        <a href="#" className="flex items-center gap-3 font-bold hover:opacity-60 transition-opacity w-fit text-lg">
                                            <Linkedin size={20} /> LinkedIn
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Column 2: Quick Actions */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: 0.2 }}
                                    className="p-8 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 flex flex-col justify-between items-start"
                                >
                                    <span className="font-mono text-xs uppercase tracking-widest opacity-60">Downloads</span>
                                    <a 
                                        href="./assets/cv.pdf"
                                        download
                                        className="w-full flex justify-between items-center group"
                                        onMouseEnter={() => setCursorVariant('project')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    >
                                        <span className="text-xl font-bold">Curriculum Vitae</span>
                                        <span className="bg-black text-accent dark:bg-white dark:text-black p-2 rounded-full transform group-hover:rotate-45 transition-transform duration-300">
                                            <ArrowDown size={20} />
                                        </span>
                                    </a>
                                </motion.div>

                                {/* Column 3: Location / Back to Top */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: 0.3 }}
                                    className="p-8 md:pr-0 flex flex-col justify-between items-start"
                                >
                                    <div className="flex flex-col gap-1">
                                        <span className="font-mono text-xs uppercase tracking-widest opacity-60">Location</span>
                                        <span className="text-lg font-bold">Orléans, France</span>
                                        <span className="font-mono text-xs opacity-60 mt-1">Local Time: {new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>

                                    <button 
                                        onClick={scrollToTop}
                                        className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-60 transition-opacity"
                                    >
                                        Back to Top <ArrowUp size={14} />
                                    </button>
                                </motion.div>
                            </div>

                            {/* 3. Bottom Signature */}
                            <div className="w-full flex justify-between items-end border-t border-black/10 dark:border-white/10 pt-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
                                <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter opacity-10 select-none pointer-events-none absolute bottom-[-2vw] left-0 w-full text-center mix-blend-overlay dark:mix-blend-normal dark:text-white/5">
                                    NATHAN
                                </h1>
                                <div className="z-10 w-full flex justify-between font-mono text-[10px] md:text-xs uppercase">
                                    <span>© 2026 All Rights Reserved</span>
                                    <span>Designed & Built by N.D</span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </motion.main>
            ) : view === 'project' ? (
                <motion.div 
                    key="project"
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    <ProjectDetail 
                        projectId={activeProjectId!}
                        onBack={navigateHome} 
                        onNavigate={navigateToProject}
                        setCursorVariant={setCursorVariant}
                    />
                </motion.div>
            ) : (
                <motion.div 
                    key="all-projects"
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    <AllProjects 
                        onBack={navigateHome}
                        onProjectClick={navigateToProject}
                        setCursorVariant={setCursorVariant}
                    />
                </motion.div>
            )}
          </AnimatePresence>
          <AdminPanel />
        </div>
      )}
    </>
  );
};

export default App;
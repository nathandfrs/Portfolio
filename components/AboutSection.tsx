import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from './SectionHeader';

interface AboutSectionProps {
  darkMode: boolean;
  setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ darkMode, setCursorVariant }) => {
  const aboutRef = useRef<HTMLElement>(null);

  return (
    <section 
      id="about" 
      ref={aboutRef} 
      className="relative px-6 md:px-12 py-32 bg-[#cd93ff] dark:bg-[#050505] text-black dark:text-white overflow-hidden z-20 transition-colors duration-500"
      onMouseEnter={() => !darkMode && setCursorVariant('white')}
      onMouseLeave={() => setCursorVariant('default')}
    >
        {/* Profile Image Placeholder - Top Right */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute -top-12 -right-12 md:top-20 md:right-20 w-48 h-64 md:w-80 md:h-[450px] z-0 pointer-events-none"
        >
            <div className="w-full h-full relative">
                <img 
                    id="profile-image"
                    src="/images/Nathan_desforges.png" 
                    alt="Nathan Desforges" 
                    className="w-50% h-50% object-cover grayscale  editable-image"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-[1px] border-black/10 dark:border-white/20 m-4" />
            </div>
        </motion.div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col">
            <SectionHeader 
                number="02" 
                label="About Me" 
                inverse={darkMode} // Dynamic: Dark mode = Light text, Light mode = Dark text
                accentClass={darkMode ? "text-accent" : "text-white"} // White accents on Violet, Standard accent on Black
                setCursorVariant={setCursorVariant}
                cursorType={darkMode ? 'text' : 'text-white'} // Use normal text cursor in dark mode
                lines={[
                    { text: "Building", style: 'solid' },
                    { text: "Strong", style: 'solid', indent: true },
                    { text: "Identities", style: 'solid', accent: true }
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-12 border-t border-black/10 dark:border-white/10">
                {/* Left: Mission Statement */}
                <div className="flex flex-col gap-8">
                    <motion.h3 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        className="text-[8vw] md:text-[5vw] leading-[0.9] font-black uppercase tracking-tighter text-black dark:text-white"
                    >
                        Strategy <span className="text-white dark:text-accent">First.</span><br/>
                        Design <span className="text-white dark:text-accent">Second.</span>
                    </motion.h3>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="text-lg md:text-xl font-medium leading-relaxed max-w-lg opacity-80"
                    >
                        My approach focuses on clarity, storytelling, and user experience to deliver visuals and messages that make sense and leave a real impact.
                    </motion.p>
                </div>

                {/* Right: Details List */}
                <div className="flex flex-col justify-end">
                      <div className="flex flex-col border-t border-black/10 dark:border-white/10">
                        {/* Location */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.3 }}
                            className="py-6 border-b border-black/10 dark:border-white/10 flex flex-col gap-2"
                        >
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60">Based In</span>
                            <span className="text-2xl font-bold tracking-tight">Orléans, France</span>
                        </motion.div>
                        
                        {/* Education */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.4 }}
                            className="py-6 border-b border-black/10 dark:border-white/10 flex flex-col gap-2"
                        >
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60">Education</span>
                            <span className="text-2xl font-bold tracking-tight">BUT MMI (3rd Year)</span>
                        </motion.div>

                        {/* Expertise */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.5 }}
                            className="py-6 flex flex-col gap-4"
                        >
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60">Expertise</span>
                            <div className="flex flex-wrap gap-2">
                                {['Branding', 'Social Media', 'Web Design', 'Strategy', 'Art Direction'].map((skill, i) => (
                                    <span 
                                        key={i} 
                                        className="px-3 py-1 border border-black/20 dark:border-white/20 rounded-full font-mono text-xs uppercase tracking-wide bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 cursor-default"
                                        onMouseEnter={() => setCursorVariant(darkMode ? 'text' : 'text-white')}
                                        onMouseLeave={() => setCursorVariant(darkMode ? 'default' : 'white')}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                      </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default AboutSection;

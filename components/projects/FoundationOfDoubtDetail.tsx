import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface FoundationOfDoubtDetailProps {
  onBack: () => void;
  onNavigate: (id: number) => void;
  setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
}

const FoundationOfDoubtDetail: React.FC<FoundationOfDoubtDetailProps> = ({ onBack, onNavigate, setCursorVariant }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] } }
  };

  return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-light dark:bg-dark min-h-screen relative z-20 text-dark dark:text-light selection:bg-accent selection:text-black"
    >
        {/* HERO SECTION */}
        <header className="px-6 md:px-12 pt-32 md:pt-48 pb-12 flex flex-col gap-6 md:gap-12">
            <div className="flex flex-col">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="text-[10vw] leading-[0.85] font-black uppercase tracking-tighter ml-[0.03em]"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    FOUNDATION<br/>OF DOUBT
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mt-8 md:mt-12 gap-8"
                >
                    <h2 className="text-xl md:text-3xl font-medium max-w-2xl leading-tight">
                        Interactive museum companion app
                    </h2>
                    <div className="flex flex-col items-end">
                        <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-right">
                            UX Design · Cultural Mediation · Interaction Design · Mobile Experience
                        </p>
                        <span className="font-mono text-xl text-accent font-bold mt-2">2025</span>
                    </div>
                </motion.div>
            </div>
        </header>

        {/* HERO IMAGE */}
        <div ref={ref} className="w-full h-[60vh] md:h-[100vh] overflow-hidden relative">
            <motion.div style={{ y: yParallax }} className="w-full h-[120%] relative -top-[10%]">
                <img 
                    id="fdd-hero"
                    src="/assets/fdd/hero.jpg" 
                    onError={(e) => e.currentTarget.src = "https://picsum.photos/1920/1080?grayscale&random=30"}
                    alt="Foundation of Doubt Hero" 
                    className="w-full h-full object-cover editable-image"
                />
            </motion.div>
        </div>

        <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
            
            {/* EXECUTIVE STATEMENT */}
            <section className="py-24 md:py-40">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2 className="text-sm font-mono uppercase tracking-widest mb-8 text-accent">Executive Statement</h2>
                    <p className="text-2xl md:text-5xl font-sans font-bold leading-[1.2] tracking-tight">
                        This project explores how a mobile interface can help visitors understand contemporary art without simplifying it. <br/><br/>
                        The goal was not to explain artworks, but to guide interpretation and curiosity.
                    </p>
                </motion.div>
            </section>

            {/* CONTEXT & DESIGN CHALLENGE */}
            <section className="py-12 border-t border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                    <h2 className="text-3xl font-bold uppercase mb-2">Context</h2>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-lg leading-relaxed mb-6">The Fondation du Doute presents conceptual artworks that often require mediation to be accessible. Traditional museum tools create passive consumption.</p>
                    </div>
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Design Challenge</h3>
                        <p className="text-xl font-bold leading-relaxed border-l-2 border-accent pl-4">
                            How can an app encourage exploration instead of explanation?
                        </p>
                    </div>
                    </div>
            </section>

            {/* DESIGN QUESTION */}
            <section className="py-24 md:py-40 flex flex-col items-center text-center">
                <h2 className="font-mono text-sm uppercase tracking-widest mb-8 text-accent">Design Question</h2>
                <p className="text-3xl md:text-6xl font-black uppercase leading-tight max-w-4xl">
                    How can a digital interface become a companion to curiosity rather than a source of answers?
                </p>
            </section>

            {/* CONCEPT */}
            <section className="py-12 border-t border-black/10 dark:border-white/10">
                <h2 className="text-3xl font-bold uppercase mb-12">Concept</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                            <p className="text-xl mb-8">The app works as an interpretation tool:</p>
                            <ul className="space-y-6 text-xl font-bold">
                            <li className="flex items-center gap-4"><ArrowUpRight className="text-accent" /> Suggests paths instead of instructions</li>
                            <li className="flex items-center gap-4"><ArrowUpRight className="text-accent" /> Asks questions instead of giving explanations</li>
                            <li className="flex items-center gap-4"><ArrowUpRight className="text-accent" /> Reveals progressively instead of describing immediately</li>
                            </ul>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-8 md:p-12">
                        <img 
                            id="fdd-app-overview"
                            src="/assets/fdd/app-overview.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/800/1000?random=31"}
                            alt="App Overview" 
                            className="w-full h-auto shadow-2xl editable-image"
                        />
                    </div>
                </div>
            </section>

            {/* UX STRUCTURE */}
            <section className="py-24 md:py-40">
                    <h2 className="text-3xl font-bold uppercase mb-16">User Experience Structure</h2>
                    <div className="w-full mb-12">
                        <img 
                        id="fdd-user-flow"
                        src="/assets/fdd/user-flow.png" 
                        onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/600?text=User+Flow+Diagram&random=32"}
                        alt="User Flow"
                        className="w-full editable-image"
                        />
                    </div>
                    <div className="flex flex-wrap justify-between gap-4 font-mono text-xs md:text-sm uppercase tracking-widest border-t border-black/10 dark:border-white/10 pt-6">
                    <span>Arrival</span>
                    <span>→</span>
                    <span>Orientation</span>
                    <span>→</span>
                    <span>Exploration</span>
                    <span>→</span>
                    <span>Interaction</span>
                    <span>→</span>
                    <span>Reflection</span>
                    </div>
            </section>

            {/* FEATURES */}
            <section className="py-12 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 -mx-6 md:-mx-12 px-6 md:px-12">
                <h2 className="text-4xl font-black uppercase mb-24 pt-12">Key Features</h2>
                
                {/* Feature 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32 items-center">
                    <div className="order-2 md:order-1">
                            <img 
                            id="fdd-artwork-screen"
                            src="/assets/fdd/artwork-screen.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/600/1000?text=Artwork+UI&random=33"}
                            alt="Artwork Contextualization"
                            className="w-3/4 mx-auto shadow-2xl editable-image"
                            />
                    </div>
                    <div className="order-1 md:order-2">
                            <h3 className="text-3xl font-bold uppercase mb-6">Artwork Contextualization</h3>
                            <p className="text-lg opacity-80 leading-relaxed">
                            Provides layers of depth. Users can scan an artwork to unlock curator notes, artist quotes, and thematic tags, allowing them to dive deeper at their own pace.
                            </p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32 items-center">
                    <div>
                            <h3 className="text-3xl font-bold uppercase mb-6">Interactive Guidance</h3>
                            <p className="text-lg opacity-80 leading-relaxed">
                            A dynamic map that doesn't just show locations, but suggests thematic routes based on the visitor's interests and available time.
                            </p>
                    </div>
                    <div>
                            <img 
                            id="fdd-interaction-screen"
                            src="/assets/fdd/interaction-screen.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/600/1000?text=Map+UI&random=34"}
                            alt="Interactive Guidance"
                            className="w-3/4 mx-auto shadow-2xl editable-image"
                            />
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pb-12 items-center">
                    <div className="order-2 md:order-1">
                            <img 
                            id="fdd-reflection-screen"
                            src="/assets/fdd/reflection-screen.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/600/1000?text=Reflection+UI&random=35"}
                            alt="Visitor Reflection Tools"
                            className="w-3/4 mx-auto shadow-2xl editable-image"
                            />
                    </div>
                    <div className="order-1 md:order-2">
                            <h3 className="text-3xl font-bold uppercase mb-6">Visitor Reflection Tools</h3>
                            <p className="text-lg opacity-80 leading-relaxed">
                            Encourages users to save artworks, add personal notes, and answer prompt questions to build a personalized souvenir of their visit.
                            </p>
                    </div>
                </div>
            </section>

            {/* DESIGN PROCESS */}
            <section className="py-24 md:py-40">
                    <h2 className="text-3xl font-bold uppercase mb-16">Design Process</h2>
                    <div className="mb-12">
                    <img 
                        id="fdd-wireframes"
                        src="/assets/fdd/wireframes.png" 
                        onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/800?text=Wireframes&grayscale&random=36"}
                        alt="Wireframes"
                        className="w-full border border-black/10 dark:border-white/10 editable-image"
                    />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Navigation Clarity</h4>
                        <p className="opacity-80">Simplified the menu structure to ensure visitors spend less time looking at the screen and more time looking at art.</p>
                    </div>
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Information Density</h4>
                        <p className="opacity-80">Adopted a "progressive disclosure" strategy to prevent cognitive overload during the museum walk.</p>
                    </div>
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Cognitive Load</h4>
                        <p className="opacity-80">Designed high-contrast, large typography interfaces to be readable while walking and in varying light conditions.</p>
                    </div>
                    </div>
            </section>

            {/* WHAT WORKED */}
            <section className="py-12 border-t border-black/10 dark:border-white/10">
                    <h2 className="text-3xl font-bold uppercase mb-12">What Worked</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 border border-black/10 dark:border-white/10 hover:bg-accent hover:text-dark transition-colors duration-300">
                            <span className="text-4xl font-bold mb-4 block">01</span>
                            <p className="font-bold">Visitors navigate autonomously</p>
                    </div>
                    <div className="p-8 border border-black/10 dark:border-white/10 hover:bg-accent hover:text-dark transition-colors duration-300">
                            <span className="text-4xl font-bold mb-4 block">02</span>
                            <p className="font-bold">Reduces intimidation toward conceptual art</p>
                    </div>
                    <div className="p-8 border border-black/10 dark:border-white/10 hover:bg-accent hover:text-dark transition-colors duration-300">
                            <span className="text-4xl font-bold mb-4 block">03</span>
                            <p className="font-bold">Encourages observation before interpretation</p>
                    </div>
                    </div>
            </section>

            {/* FUTURE IMPROVEMENTS */}
            <section className="py-24 md:py-40">
                    <h2 className="text-3xl font-bold uppercase mb-12">Future Improvements</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg font-mono uppercase tracking-widest opacity-80">
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Real-time location guidance</li>
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Personal visit journal</li>
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Multi-visitor interaction</li>
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Adaptive content depending on visit duration</li>
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Accessibility modes (audio / dyslexia)</li>
                    </ul>
            </section>

            {/* REFLECTION & CONCLUSION */}
            <section className="py-12 border-t border-black/10 dark:border-white/10 bg-[#f0f0f0] dark:bg-[#111] -mx-6 md:-mx-12 px-6 md:px-12 flex flex-col items-center text-center">
                <div className="max-w-4xl py-24">
                    <h2 className="font-mono text-sm uppercase tracking-widest mb-8 text-accent">Reflection</h2>
                    <p className="text-2xl md:text-4xl font-serif italic mb-16 leading-relaxed">
                        "This project taught me that digital tools in physical spaces should remain invisible until needed. The best interface is the one that sends you back to reality."
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold uppercase mb-4">Conclusion</h3>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto">
                        This project demonstrates my ability to design mediation tools where engagement matters more than efficiency.
                    </p>
                </div>
            </section>

                {/* NEXT PROJECT NAV */}
                <section 
                className="h-[50vh] md:h-[70vh] bg-accent flex flex-col justify-center items-center relative overflow-hidden group cursor-pointer text-dark mt-24"
                onMouseEnter={() => setCursorVariant('project')}
                onMouseLeave={() => setCursorVariant('default')}
                onClick={() => {
                    onNavigate(3);
                }}
                >
                <span className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Next Project</span>
                <h2 className="text-[7vw] md:text-[5vw] font-black uppercase tracking-tighter relative z-10 group-hover:scale-110 transition-transform duration-500 text-center">
                    AALIYA
                </h2>
                <div className="absolute bottom-12 flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Case <ArrowUpRight size={16} />
                </div>
            </section>
        </div>
    </motion.div>
  );
};

export default FoundationOfDoubtDetail;

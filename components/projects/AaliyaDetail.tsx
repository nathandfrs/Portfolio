import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface AaliyaDetailProps {
  onBack: () => void;
  onNavigate: (id: number) => void;
  setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
}

const AaliyaDetail: React.FC<AaliyaDetailProps> = ({ onBack, onNavigate, setCursorVariant }) => {
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
                    className="text-[14vw] leading-[0.85] font-black uppercase tracking-tighter ml-[0.03em]"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    AALIYA
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mt-8 md:mt-12 gap-8"
                >
                    <h2 className="text-xl md:text-3xl font-medium max-w-2xl leading-tight">
                        From fragrance product to identity experience
                    </h2>
                    <div className="flex flex-col items-end">
                        <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-right">
                            Brand Strategy · Sensory Design · Visual Identity · Communication System
                        </p>
                        <span className="font-mono text-xl text-accent font-bold mt-2">2024</span>
                    </div>
                </motion.div>
            </div>
        </header>

        {/* HERO IMAGE */}
        <div ref={ref} className="w-full h-[60vh] md:h-[100vh] overflow-hidden relative">
            <motion.div style={{ y: yParallax }} className="w-full h-[120%] relative -top-[10%]">
                <img 
                    id="aaliya-hero"
                    src="/assets/aaliya/hero.jpg" 
                    onError={(e) => e.currentTarget.src = "https://picsum.photos/1920/1080?grayscale&random=40"}
                    alt="Aaliya Hero" 
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
                        Aaliya explores how a perfume brand can move beyond scent to become a personal ritual. <br/><br/>
                        Instead of designing a fragrance, the project designs a relationship between identity, memory, and self-expression. <br/><br/>
                        <span className="opacity-50">The objective was to rethink perfumery as an experience system rather than a finished product.</span>
                    </p>
                </motion.div>
            </section>

            {/* CONTEXT */}
            <section className="py-12 border-t border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                    <h2 className="text-3xl font-bold uppercase mb-2">Context</h2>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-lg leading-relaxed mb-6">Traditional perfume brands impose a finished identity. Users choose a perfume → users adapt to it. Here the logic is reversed.</p>
                    </div>
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Design Challenge</h3>
                        <p className="text-xl font-bold leading-relaxed border-l-2 border-accent pl-4">
                            How can a perfume become something the user constructs rather than consumes?
                        </p>
                    </div>
                    </div>
            </section>

            {/* DESIGN THESIS */}
            <section className="py-24 md:py-40 flex flex-col items-center text-center">
                <h2 className="font-mono text-sm uppercase tracking-widest mb-8 text-accent">Design Thesis</h2>
                <div className="flex flex-col gap-6">
                        <p className="text-3xl md:text-5xl font-black uppercase leading-tight max-w-4xl">
                        How can customization transform perfume from a product into a personal narrative?
                        </p>
                        <p className="text-2xl md:text-4xl opacity-60 font-serif italic">
                        How can branding express intimacy instead of status?
                        </p>
                </div>
            </section>

            {/* CONCEPT */}
            <section className="py-12 border-t border-black/10 dark:border-white/10">
                <h2 className="text-3xl font-bold uppercase mb-12">Concept — The Personal Perfume System</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                            <p className="text-xl mb-8 font-bold">Aaliya is built as a modular experience:</p>
                            <div className="text-2xl md:text-3xl font-mono mb-8 border border-black/10 dark:border-white/10 p-6 inline-block">
                            Neutral base + essential oils = unique composition
                            </div>
                            <p className="text-lg opacity-80 mb-4">The brand does not sell a fragrance. It enables creation.</p>
                            <p className="text-lg opacity-80">This shifts the role of the brand: <br/> <strong className="text-accent">from author → to facilitator</strong></p>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-8 md:p-12">
                        <img 
                            id="aaliya-system-diagram"
                            src="/assets/aaliya/system-diagram.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/800/800?random=41"}
                            alt="System Diagram" 
                            className="w-full h-auto mix-blend-multiply dark:mix-blend-normal editable-image"
                        />
                    </div>
                </div>
            </section>

            {/* BRAND POSITIONING */}
            <section className="py-24 md:py-40">
                    <h2 className="text-3xl font-bold uppercase mb-16">Brand Positioning</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                        <ul className="text-2xl md:text-4xl font-bold space-y-4">
                            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent rounded-full"></span> Ethical luxury perfumery</li>
                            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent rounded-full"></span> Alcohol-free</li>
                            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent rounded-full"></span> Skin-friendly</li>
                            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent rounded-full"></span> Gender-neutral</li>
                            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent rounded-full"></span> Personal</li>
                        </ul>
                        </div>
                        <div className="flex items-center">
                            <p className="text-xl leading-relaxed border-l-4 border-accent pl-8 italic">
                                "Luxury here is defined by meaning and ritual rather than prestige. It is about the time taken to understand oneself."
                            </p>
                        </div>
                    </div>
            </section>

            {/* VISUAL IDENTITY */}
            <section className="py-12 border-t border-black/10 dark:border-white/10">
                <h2 className="text-3xl font-bold uppercase mb-12">Visual Identity</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 opacity-60">Aesthetic Choices</h3>
                            <ul className="grid grid-cols-2 gap-4 mb-8">
                            <li className="p-4 border border-black/10 dark:border-white/10 text-center uppercase text-xs font-bold tracking-widest">Minimal Typography</li>
                            <li className="p-4 border border-black/10 dark:border-white/10 text-center uppercase text-xs font-bold tracking-widest">Warm Neutral Palette</li>
                            <li className="p-4 border border-black/10 dark:border-white/10 text-center uppercase text-xs font-bold tracking-widest">Soft Contrasts</li>
                            <li className="p-4 border border-black/10 dark:border-white/10 text-center uppercase text-xs font-bold tracking-widest">Calm Compositions</li>
                            </ul>
                            <p className="text-xl font-bold">Goal: Create sensory silence to let the user project themselves.</p>
                    </div>
                    <div className="bg-[#f5f5f5] dark:bg-[#111] p-12 flex items-center justify-center">
                            <img 
                            id="aaliya-logo-construction"
                            src="/assets/aaliya/logo-construction.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/600/400?text=Logo+Grid&random=42"}
                            alt="Logo Construction"
                            className="w-full mix-blend-multiply dark:mix-blend-normal editable-image"
                            />
                    </div>
                </div>

                <div className="w-full">
                    <img 
                        id="aaliya-packaging"
                        src="/assets/aaliya/packaging.jpg" 
                        onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/800?text=Packaging&random=43"}
                        alt="Packaging Design"
                        className="w-full h-auto editable-image"
                    />
                </div>
            </section>

            {/* SCENT STORYTELLING */}
            <section className="py-24 md:py-40">
                    <h2 className="text-3xl font-bold uppercase mb-12">Scent Storytelling</h2>
                    <p className="text-xl mb-12 max-w-2xl">Each perfume is associated with memory archetypes. The brand communicates emotions, not notes.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                        <div className="aspect-square bg-gray-100 dark:bg-white/5 p-6 flex flex-col justify-between group hover:bg-accent transition-colors duration-300">
                            <span className="text-4xl font-serif italic">Fresh</span>
                            <span className="font-mono text-xs uppercase tracking-widest">Childhood / Mornings</span>
                        </div>
                        <div className="aspect-square bg-gray-100 dark:bg-white/5 p-6 flex flex-col justify-between group hover:bg-accent transition-colors duration-300">
                            <span className="text-4xl font-serif italic">Floral</span>
                            <span className="font-mono text-xs uppercase tracking-widest">Escape / Contemplation</span>
                        </div>
                        <div className="aspect-square bg-gray-100 dark:bg-white/5 p-6 flex flex-col justify-between group hover:bg-accent transition-colors duration-300">
                            <span className="text-4xl font-serif italic">Gourmand</span>
                            <span className="font-mono text-xs uppercase tracking-widest">Comfort / Intimacy</span>
                        </div>
                        <div className="aspect-square bg-gray-100 dark:bg-white/5 p-6 flex flex-col justify-between group hover:bg-accent transition-colors duration-300">
                            <span className="text-4xl font-serif italic">Oriental</span>
                            <span className="font-mono text-xs uppercase tracking-widest">Mystery / Heritage</span>
                        </div>
                    </div>

                    <div className="w-full h-64 md:h-96 overflow-hidden">
                    <img 
                        id="aaliya-fragrance-grid"
                        src="/assets/aaliya/fragrance-grid.jpg" 
                        onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/600?text=Sensory+Mood&random=44"}
                        alt="Fragrance Mood Grid"
                        className="w-full h-full object-cover editable-image"
                    />
                    </div>
            </section>

            {/* COMMUNICATION ECOSYSTEM */}
            <section className="py-12 border-t border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <img 
                        id="aaliya-socials"
                        src="/assets/aaliya/socials.jpg" 
                        onError={(e) => e.currentTarget.src = "https://picsum.photos/800/1000?text=Social+Media&random=45"}
                        alt="Social Media Mockups"
                        className="w-3/4 mx-auto shadow-2xl editable-image"
                    />
                </div>
                <div className="order-1 md:order-2">
                    <h2 className="text-3xl font-bold uppercase mb-8">Communication Ecosystem</h2>
                    <p className="text-lg opacity-80 mb-8">The project builds a transmedia narrative where the brand exists through interaction, not advertising.</p>
                    <ul className="space-y-4 font-mono uppercase tracking-widest text-sm">
                        <li className="flex justify-between border-b border-black/10 dark:border-white/10 py-2">
                            <span>Social Media</span> <span>Discovery</span>
                        </li>
                        <li className="flex justify-between border-b border-black/10 dark:border-white/10 py-2">
                            <span>Workshops</span> <span>Participation</span>
                        </li>
                        <li className="flex justify-between border-b border-black/10 dark:border-white/10 py-2">
                            <span>Stories</span> <span>Emotional Engagement</span>
                        </li>
                        <li className="flex justify-between border-b border-black/10 dark:border-white/10 py-2">
                            <span>User Creation</span> <span>Identity Building</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* WHAT WORKED */}
            <section className="py-24 md:py-40">
                    <h2 className="text-3xl font-bold uppercase mb-12">What Worked</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 border border-black/10 dark:border-white/10">
                            <h4 className="font-bold text-xl mb-2">Strong Emotional Positioning</h4>
                            <p className="opacity-60 text-sm">Successfully moved away from commodity to ritual.</p>
                    </div>
                    <div className="p-8 border border-black/10 dark:border-white/10">
                            <h4 className="font-bold text-xl mb-2">Clear Differentiation</h4>
                            <p className="opacity-60 text-sm">Stands out in a saturated commercial market.</p>
                    </div>
                    <div className="p-8 border border-black/10 dark:border-white/10">
                            <h4 className="font-bold text-xl mb-2">Consistent Sensory Identity</h4>
                            <p className="opacity-60 text-sm">Visuals perfectly match the olfactory promise.</p>
                    </div>
                    <div className="p-8 border border-black/10 dark:border-white/10">
                            <h4 className="font-bold text-xl mb-2">Participative Logic</h4>
                            <p className="opacity-60 text-sm">Users feel ownership over the final product.</p>
                    </div>
                    </div>
            </section>

            {/* FUTURE IMPROVEMENTS */}
            <section className="py-12 border-t border-black/10 dark:border-white/10">
                    <h2 className="text-3xl font-bold uppercase mb-12">Future Evolutions</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg font-mono uppercase tracking-widest opacity-80">
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Digital fragrance builder interface</li>
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Personal scent archive</li>
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Community scent sharing</li>
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> Material sustainability tracking</li>
                    <li className="flex items-center gap-4"><span className="w-2 h-2 bg-accent"></span> In-store sensory experience</li>
                    </ul>
            </section>

            {/* REFLECTION & CONCLUSION */}
            <section className="py-24 md:py-40 bg-[#f0f0f0] dark:bg-[#111] -mx-6 md:-mx-12 px-6 md:px-12 flex flex-col items-center text-center">
                <div className="max-w-4xl">
                    <h2 className="font-mono text-sm uppercase tracking-widest mb-8 text-accent">Reflection</h2>
                    <p className="text-2xl md:text-4xl font-serif italic mb-16 leading-relaxed">
                        "This project explores branding as a personal construction tool rather than a persuasion tool. Meaning precedes aesthetics."
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold uppercase mb-4">Conclusion</h3>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto">
                        Aaliya demonstrates my ability to design identity systems where the user is the final author.
                    </p>
                </div>
            </section>

                {/* NEXT PROJECT NAV */}
                <section 
                className="h-[50vh] md:h-[70vh] bg-accent flex flex-col justify-center items-center relative overflow-hidden group cursor-pointer text-dark mt-0"
                onMouseEnter={() => setCursorVariant('project')}
                onMouseLeave={() => setCursorVariant('default')}
                onClick={() => {
                    onNavigate(4);
                }}
                >
                <span className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Next Project</span>
                <h2 className="text-[7vw] md:text-[5vw] font-black uppercase tracking-tighter relative z-10 group-hover:scale-110 transition-transform duration-500 text-center">
                    Web Experience
                </h2>
                <div className="absolute bottom-12 flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Case <ArrowUpRight size={16} />
                </div>
            </section>
        </div>
    </motion.div>
  );
};

export default AaliyaDetail;

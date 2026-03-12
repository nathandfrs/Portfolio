import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface EquatorDetailProps {
  onBack: () => void;
  onNavigate: (id: number) => void;
  setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
}

const EquatorDetail: React.FC<EquatorDetailProps> = ({ onBack, onNavigate, setCursorVariant }) => {
  const ref = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const climatesSequenceRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeClimateImage, setActiveClimateImage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: sequenceProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: climatesProgress } = useScroll({
    target: climatesSequenceRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const updateImage = (v: number) => {
      if (v < 0.33) setActiveImage(0);
      else if (v < 0.66) setActiveImage(1);
      else setActiveImage(2);
    };

    const updateClimateImage = (v: number) => {
      if (v < 0.33) setActiveClimateImage(0);
      else if (v < 0.66) setActiveClimateImage(1);
      else setActiveClimateImage(2);
    };

    // Handle different framer-motion versions
    // @ts-ignore
    if (sequenceProgress.on) {
      // @ts-ignore
      const unsub1 = sequenceProgress.on("change", updateImage);
      // @ts-ignore
      const unsub2 = climatesProgress.on("change", updateClimateImage);
      return () => { unsub1(); unsub2(); };
    } else {
      // @ts-ignore
      const unsub1 = sequenceProgress.onChange(updateImage);
      // @ts-ignore
      const unsub2 = climatesProgress.onChange(updateClimateImage);
      return () => { unsub1(); unsub2(); };
    }
  }, [sequenceProgress, climatesProgress]);
  
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
        {/* ------------------------------------------------------------
           PAGE HERO (full width)
           ------------------------------------------------------------ */}
        <header className="px-6 md:px-12 pt-32 md:pt-48 pb-12 flex flex-col gap-6 md:gap-12">
            <div className="flex flex-col">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="text-[14vw] leading-[0.8] font-black uppercase tracking-tighter ml-[0.03em]"
                >
                    EQUATOR
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mt-8 md:mt-12 gap-8"
                >
                    <h2 className="text-xl md:text-3xl font-medium max-w-2xl leading-tight">
                        A climate-driven design system for Patagonia
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-widest opacity-60 max-w-sm text-right">
                        Capsule Concept · Climate-driven UX · Brand Strategy · Cultural Storytelling
                    </p>
                </motion.div>
            </div>
        </header>

        <div ref={ref} className="w-full h-[60vh] md:h-[100vh] overflow-hidden relative">
            <motion.div style={{ y: yParallax }} className="w-full h-[120%] relative -top-[10%]">
                <img 
                    id="equator-hero"
                    src="/images/dsfsfsd.png" 
                    onError={(e) => e.currentTarget.src = "https://picsum.photos/1920/1080?random=20"}
                    alt="Equator — Patagonia capsule concept hero visual" 
                    className="w-full h-full object-cover editable-image"
                />
            </motion.div>
        </div>
        <div className="px-6 md:px-12 pt-4">
            <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-right">
                De los Andes al Ecuador — an experience structured around three climatic ecosystems.
            </p>
        </div>

        <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
            
            {/* ------------------------------------------------------------
               SECTION 01 — The Given Brief vs. My Design Reframing
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40 border-b border-black/10 dark:border-white/10">
                {/* SECTION TITLE */}
                <h2 className="text-3xl font-bold uppercase mb-24 md:mb-32">01. From the brief to a thesis</h2>
                
                {/* SUBSECTION 1 — GIVEN CONTEXT */}
                <div className="mb-32 md:mb-48">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                        <div className="md:col-span-4">
                            <h3 className="font-mono text-xs uppercase tracking-widest opacity-60">Given brief (course requirement)</h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
                                The initial requirement was to choose a country located on the equator and design a Patagonia capsule website aligned with Patagonia’s ecosystem — including an explicit ethical dimension consistent with the brand’s values.
                            </p>
                        </div>
                    </div>
                    
                    <div className="md:ml-[33.33%] max-w-3xl">
                        <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-white/5 mb-4">
                            <img 
                                id="equator-brief"
                                src="/images/map--countries-along-the-equator.png" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/1200/675?random=21"}
                                alt="Course brief reference and initial constraints for the Equator capsule" 
                                className="w-full h-full object-cover editable-image"
                            />
                        </div>
                        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60">Starting point — a Patagonia capsule inspired by an equatorial country.</p>
                    </div>
                </div>

                {/* SUBSECTION 2 — DESIGN SHIFT */}
                <div className="mb-32 md:mb-48">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
                        <div className="md:col-span-4">
                            <h3 className="font-mono text-xs uppercase tracking-widest opacity-60">My reframing (design decision)</h3>
                        </div>
                        <div className="md:col-span-8 space-y-12">
                            <p className="text-xl md:text-2xl leading-relaxed font-medium">
                                Rather than treating the equator as a purely geographic constraint, I treated it as a design opportunity: a line that crosses ecosystems, cultures, and ways of living. I wanted the capsule to feel less like a themed collection and more like a coherent system anchored in real conditions.
                            </p>
                            <p className="text-xl md:text-2xl leading-relaxed font-medium">
                                This is where I introduced my own direction: climate as the structural logic of the experience. Not as a visual theme — but as a framework able to organize narrative, interface, product meaning, and ethics.
                            </p>
                        </div>
                    </div>

                    <div className="py-12 md:py-24 border-y border-black/10 dark:border-white/10">
                        <blockquote className="text-3xl md:text-6xl font-serif italic text-center max-w-5xl mx-auto leading-tight">
                            “Instead of choosing a country for its aesthetics, I asked: What if a collection was structured by climate instead of style?”
                        </blockquote>
                    </div>
                </div>

                {/* SUBSECTION 3 — TERRITORIAL JUSTIFICATION */}
                <div className="w-full mb-12">
                    <img 
                        id="equator-map"
                        src="/images/map.png" 
                        onError={(e) => e.currentTarget.src = "https://picsum.photos/1200/800?random=22"}
                        alt="Colombia silhouette map used to introduce the territorial thesis" 
                        className="w-full h-auto editable-image"
                    />
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60 text-center mt-4">Colombia — a single country, multiple vertical climates.</p>
                </div>
                
                <div className="max-w-2xl text-center mx-auto">
                    <p className="text-lg md:text-xl leading-relaxed opacity-80">
                        Colombia became the ideal terrain — a country where climate creates radically different worlds within a single territory. This is where the project shifted: from product design to territorial storytelling.
                    </p>
                </div>
            </section>

            {/* ------------------------------------------------------------
               SECTION 02 — Moodboard & Directional Research
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40 border-b border-black/10 dark:border-white/10">
                <h2 className="text-3xl font-bold uppercase mb-12">02. Research as a foundation</h2>
                <p className="text-lg leading-relaxed max-w-3xl mb-12">
                    Before designing screens, I built a moodboard to define the emotional register of the experience: territorial, editorial, minimal, and immersive — avoiding touristic clichés. The goal was to translate Colombia through textures, climates, light, and materiality.
                </p>
                <div className="max-w-5xl mx-auto mb-4">
                    <img 
                        id="equator-moodboard"
                        src="/images/moodboard.png" 
                        onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/900?random=23"}
                        alt="Equator moodboard exploring Colombia, climates, textures and editorial direction" 
                        className="w-full h-auto object-cover editable-image"
                    />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-center max-w-5xl mx-auto">Research moodboard — translating territory through material, light, and rhythm.</p>
            </section>

            {/* ------------------------------------------------------------
               SECTION 03 — Executive Statement
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40">
                <h2 className="text-sm font-mono uppercase tracking-widest mb-8 text-accent">03. Executive Statement</h2>
                <div className="max-w-5xl">
                    <p className="text-2xl md:text-5xl font-sans font-bold leading-[1.2] tracking-tight mb-8">
                        Equator is a conceptual capsule that explores how climate and culture can become the foundation of a design system.
                    </p>
                    <p className="text-2xl md:text-5xl font-sans font-bold leading-[1.2] tracking-tight mb-12">
                        Rather than using geography as a visual reference, I approached Colombia as a living structure — where climate shapes lifestyles, materials, movement, and identity.
                    </p>
                    <p className="text-xl md:text-2xl font-medium opacity-60">
                        This project is not about fashion. It is about translating territory into meaning through design.
                    </p>
                </div>
            </section>

            {/* ------------------------------------------------------------
               SECTION 04 — Two Problems: The Course Question & The Project Thesis
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40">
                <h2 className="text-3xl font-bold uppercase mb-16">04. Two design questions</h2>
                
                <div className="flex flex-col gap-24">
                    {/* BLOCK A */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-4">
                            <h3 className="font-mono text-xs uppercase tracking-widest opacity-60">Course question (starting point)</h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-2xl md:text-3xl font-medium leading-tight">
                                How can a Patagonia capsule site embody the brand’s ecosystem and ethical DNA while being inspired by a country on the equator?
                            </p>
                        </div>
                    </div>

                    {/* BLOCK B */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-4">
                            <h3 className="font-mono text-xs uppercase tracking-widest opacity-60">My thesis (after reframing)</h3>
                        </div>
                        <div className="md:col-span-8 flex flex-col gap-8">
                            <p className="text-2xl md:text-3xl font-medium leading-tight">
                                How can a fashion capsule be experienced as a climatic journey rather than a commercial collection?
                            </p>
                            <div className="flex flex-col gap-4 border-l-2 border-accent pl-6">
                                <p className="text-xl">How can climate become a narrative structure?</p>
                                <p className="text-xl">How can it become a visual logic?</p>
                                <p className="text-xl">How can it become an emotional experience?</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div 
                    id="climate-scroll-sequence" 
                    ref={sequenceRef}
                    className={isReducedMotion ? "mt-24" : "relative h-[300vh] mt-24"}
                >
                    <div className={isReducedMotion ? "" : "sticky top-0 h-screen flex flex-col justify-center"}>
                        <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-black/5 dark:bg-white/5">
                            <img 
                                id="equator-ux-sequence-1"
                                src="/images/paramo.png" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/900?random=24"}
                                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 editable-image ${activeImage === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                alt="Climate-driven navigation architecture - State 1"
                            />
                            <img 
                                id="equator-ux-sequence-2"
                                src="/images/caliente.png" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/900?random=25"}
                                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 editable-image ${activeImage === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                alt="Climate-driven navigation architecture - State 2"
                            />
                            <img 
                                id="equator-ux-sequence-3"
                                src="/images/fria.png" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/900?random=33"}
                                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 editable-image ${activeImage === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                alt="Climate-driven navigation architecture - State 3"
                            />
                        </div>
                        <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-right mt-4">
                            Climate-driven UX — the interface is structured around three distinct ecosystems.
                        </p>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------
               SECTION 05 — Concept: A Tri-Climatic System
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10">
                <h2 className="text-3xl font-bold uppercase mb-12">05. Concept: A Tri-Climatic System</h2>
                <p className="text-lg leading-relaxed max-w-3xl mb-16">
                    I created a system based on three climatic ecosystems. Each climate defines conditions and an essence, guiding visual language, storytelling, and product meaning.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/10 dark:border-white/10 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10 mb-16">
                    {/* CARD 1 */}
                    <div className="p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <h3 className="text-2xl font-black uppercase mb-2">Páramo</h3>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-6">High Andes</span>
                        <div className="space-y-6">
                            <div><span className="block text-sm font-bold mb-1">Conditions</span><p className="opacity-80">Cold, altitude, isolation</p></div>
                            <div><span className="block text-sm font-bold mb-1">Essence</span><p className="opacity-80">Protection, minimalism</p></div>
                        </div>
                    </div>
                    {/* CARD 2 */}
                    <div className="p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <h3 className="text-2xl font-black uppercase mb-2">Tierra Fría</h3>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-6">Valleys</span>
                        <div className="space-y-6">
                            <div><span className="block text-sm font-bold mb-1">Conditions</span><p className="opacity-80">Balance, agriculture</p></div>
                            <div><span className="block text-sm font-bold mb-1">Essence</span><p className="opacity-80">Stability, rhythm</p></div>
                        </div>
                    </div>
                    {/* CARD 3 */}
                    <div className="p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <h3 className="text-2xl font-black uppercase mb-2">Tierra Caliente</h3>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-6">Coasts</span>
                        <div className="space-y-6">
                            <div><span className="block text-sm font-bold mb-1">Conditions</span><p className="opacity-80">Heat, humidity, movement</p></div>
                            <div><span className="block text-sm font-bold mb-1">Essence</span><p className="opacity-80">Fluidity, light</p></div>
                        </div>
                    </div>
                </div>

                <div 
                    id="climates-scroll-sequence" 
                    ref={climatesSequenceRef}
                    className={isReducedMotion ? "mb-4" : "relative h-[300vh] mb-4"}
                >
                    <div className={isReducedMotion ? "" : "sticky top-0 h-screen flex flex-col justify-center"}>
                        <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-black/5 dark:bg-white/5">
                            {/* Image 1 - Base */}
                            <img 
                                id="equator-climate-sequence-1"
                                src="/images/menu (1).png" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/600?random=25"}
                                className="absolute inset-0 w-full h-full object-cover object-top editable-image"
                                alt="Climate System - Páramo"
                            />
                            
                            {/* Image 2 - Wipe Reveal */}
                            <div 
                                className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out overflow-hidden z-10"
                                style={{ 
                                    clipPath: activeClimateImage >= 1 ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)'
                                }}
                            >
                                <img 
                                    id="equator-climate-sequence-2"
                                    src="/images/menu (2).png" 
                                    onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/600?random=33"}
                                    className="absolute inset-0 w-full h-full object-cover object-top editable-image"
                                    alt="Climate System - Tierra Fría"
                                />
                            </div>

                            {/* Image 3 - Wipe Reveal */}
                            <div 
                                className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out overflow-hidden z-20"
                                style={{ 
                                    clipPath: activeClimateImage >= 2 ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)'
                                }}
                            >
                                <img 
                                    id="equator-climate-sequence-3"
                                    src="/images/menu (3).png" 
                                    onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/600?random=24"}
                                    className="absolute inset-0 w-full h-full object-cover object-top editable-image"
                                    alt="Climate System - Tierra Caliente"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-mono text-xs uppercase tracking-widest opacity-60">Three climates — one coherent system.</p>
                    <p className="font-bold text-lg">The collection becomes a system, not a style.</p>
                </div>
            </section>

            {/* ------------------------------------------------------------
               SECTION 06 — Design Process & Iterations
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40 bg-black/5 dark:bg-white/5 -mx-6 md:-mx-12 px-6 md:px-12">
                <h2 className="text-3xl font-bold uppercase mb-8">06. Design Process & Iterations</h2>
                <p className="text-lg leading-relaxed max-w-3xl mb-16">
                    To reach the final balance between emotion and structure, I iterated multiple homepage entries. The goal was to design an experience that feels like travel first — and becomes understandable as a system second.
                </p>

                <h3 className="font-mono text-sm uppercase tracking-widest mb-8 text-accent">Homepage Explorations</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* COLUMN 1 */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white dark:bg-black aspect-[9/16] overflow-hidden border border-black/10 dark:border-white/10 scroll-preview-container">
                            <img 
                                id="equator-home-v1"
                                src="/images/v1.svg" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/400/800?text=V1&random=26"}
                                className="w-full object-cover opacity-80 editable-image scroll-preview" 
                                alt="Homepage iteration V1 — informational entry" 
                            />
                        </div>
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-1">V1</span>
                            <span className="font-bold block mb-1">Version 1 — Informational entry</span>
                            <p className="text-sm opacity-60">Clear but too didactic, lacking emotional immersion.</p>
                        </div>
                    </div>
                    {/* COLUMN 2 */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white dark:bg-black aspect-[9/16] overflow-hidden border border-black/10 dark:border-white/10 scroll-preview-container">
                            <img 
                                id="equator-home-v2"
                                src="/images/v2.svg" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/400/800?text=V2&random=27"}
                                className="w-full object-cover opacity-80 editable-image scroll-preview" 
                                alt="Homepage iteration V2 — editorial immersion" 
                            />
                        </div>
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-1">V2</span>
                            <span className="font-bold block mb-1">Version 2 — Editorial immersion</span>
                            <p className="text-sm opacity-60">More engaging but weakened climatic logic.</p>
                        </div>
                    </div>
                    {/* COLUMN 3 */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white dark:bg-black aspect-[9/16] overflow-hidden border-2 border-accent shadow-2xl scroll-preview-container">
                            <img 
                                id="equator-home-final"
                                src="/images/v3.svg" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/400/800?text=Final&random=28"}
                                className="w-full object-cover editable-image scroll-preview" 
                                alt="Final homepage — territorial immersion balanced with system logic" 
                            />
                        </div>
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-1">Final</span>
                            <span className="font-bold block mb-1 text-accent">Final Version — Territorial immersion</span>
                            <p className="text-sm opacity-60">Balances emotion and system understanding.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-2xl md:text-3xl font-serif italic">"First feel the territory, then understand it."</p>
                </div>
            </section>

            {/* ------------------------------------------------------------
               SECTION 07 — Identity Exploration (Logo Decision)
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40">
                <h2 className="text-3xl font-bold uppercase mb-12">07. Identity Exploration</h2>
                <p className="text-lg leading-relaxed max-w-3xl mb-16">
                    I explored an independent identity inspired by the Andean condor — a powerful Colombian symbol — reinterpreted through Patagonia’s visual language. The intention was to express local belonging and territorial pride.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
                    {/* LEFT */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-gray-100 dark:bg-white/5 p-12 flex items-center justify-center aspect-square">
                            <img 
                                id="equator-logo-condor"
                                src="/images/logo-condor.jpg" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/400/400?text=Condor+Logo&random=29"}
                                alt="Rejected logo exploration — Andean condor remixed in Patagonia visual language" 
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal editable-image"
                            />
                        </div>
                        <p className="font-mono text-xs uppercase tracking-widest opacity-60">Exploration — Andean condor identity (not retained).</p>
                    </div>
                    {/* RIGHT */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-gray-100 dark:bg-white/5 p-12 flex items-center justify-center aspect-square border-2 border-accent">
                            <img 
                                id="equator-logo-patagonia"
                                src="/images/logo-patagonia.jpg" 
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/400/400?text=Patagonia+Logo&random=30"}
                                alt="Patagonia logo retained for the Equator capsule concept" 
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal editable-image"
                            />
                        </div>
                        <p className="font-mono text-xs uppercase tracking-widest opacity-60">Decision — Patagonia identity retained.</p>
                    </div>
                </div>

                <div className="max-w-3xl space-y-6">
                    <p className="text-lg leading-relaxed">Creating a new brand shifted the focus from territory to branding.</p>
                    <p className="text-lg leading-relaxed">Keeping Patagonia preserved legitimacy and narrative coherence.</p>
                    <p className="text-lg leading-relaxed">I also chose Patagonia’s more recent logo to reinforce modernity and align the capsule with the brand’s contemporary visual presence.</p>
                </div>
            </section>

            {/* ------------------------------------------------------------
               SECTION 08 — Language as Design (Spanish Immersion)
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10">
                <h2 className="text-3xl font-bold uppercase mb-12">08. Language as Design</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed">The entire experience is written in Spanish.</p>
                        <p className="text-lg leading-relaxed">
                            This was a deliberate design choice:<br/>
                            to increase cultural immersion<br/>
                            to align with the real Colombian audience<br/>
                            to transform browsing into a linguistic experience
                        </p>
                        <p className="text-2xl font-bold">Here, language is not content — it is interface.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img 
                            id="equator-spanish-typo"
                            src="/images/spanish-typography.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/800/600?text=Spanish+UI&random=31"}
                            alt="Spanish interface typography demonstrating immersion and local resonance" 
                            className="w-full h-auto shadow-xl editable-image"
                        />
                        <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-right">Spanish as an immersion layer — belonging through language.</p>
                    </div>
                </div>
                <p className="text-lg leading-relaxed mt-12 max-w-3xl">
                    Writing in Spanish was also a way to create a sense of belonging even as a non-Colombian designer — designing with respect, not from outside.
                </p>
            </section>

            {/* ------------------------------------------------------------
               SECTION 09 — Ethics as a Design Constraint
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40">
                <h2 className="text-3xl font-bold uppercase mb-16">09. Ethics as a Design Constraint</h2>
                <p className="text-lg leading-relaxed max-w-3xl mb-12">
                    Patagonia’s ecosystem implies ethical responsibility. For Equator, ethics could not be a slogan — it had to shape the experience and the product logic.
                </p>

                <blockquote className="text-4xl md:text-6xl font-black leading-none mb-16">
                    “Ethics should shape the experience, not decorate it.”
                </blockquote>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
                    <div>
                        <ul className="space-y-8">
                            <li className="flex gap-4">
                                <span className="text-accent text-xl">●</span>
                                <div>
                                    <strong className="block text-xl mb-2">Territory-first storytelling</strong>
                                    <p className="opacity-80">Every garment is tied to a real ecosystem and a specific way of living.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-accent text-xl">●</span>
                                <div>
                                    <strong className="block text-xl mb-2">Local-first mindset</strong>
                                    <p className="opacity-80">Framed as “Designed in Colombia, for Colombia”, prioritizing local resources and knowledge.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-accent text-xl">●</span>
                                <div>
                                    <strong className="block text-xl mb-2">Durability as value</strong>
                                    <p className="opacity-80">Emphasizing longevity over consumption-driven persuasion.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img 
                            id="equator-values"
                            src="/images/values.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/800/600?text=Values&random=32"}
                            alt="Equator values and sustainability section — local production, durability, biodiversity respect" 
                            className="w-full h-auto editable-image"
                        />
                        <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-right">Ethics embedded into the narrative, not appended.</p>
                    </div>
                </div>

                <div className="bg-[#f0f0f0] dark:bg-[#111] p-12 md:p-16 text-center">
                    <h3 className="font-mono text-xs uppercase tracking-widest mb-8 opacity-60">Project Ethos (In-Product Copy)</h3>
                    <div className="space-y-6 text-xl md:text-3xl font-serif italic">
                        <p>“Respeto por la biodiversidad y los recursos naturales”</p>
                        <p>“Apoyo a territorios, saberes y producción local”</p>
                        <p>“Consumir menos, pero mejor”</p>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------
               SECTION 10 — Product Focus (Evidence of System)
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10">
                <h2 className="text-3xl font-bold uppercase mb-16">10. Product Focus: PÁRAMO</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-4xl md:text-5xl font-black uppercase">Aislamiento Alpino</h3>
                        <p className="text-xl leading-relaxed">A technical jacket designed for high-altitude cold and intense radiation.</p>
                        <p className="text-xl leading-relaxed font-bold text-accent">The garment becomes a functional fragment of the landscape.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <img 
                            id="equator-paramo"
                            src="/images/paramo-product.png" 
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/800/1000?text=Paramo+Product&random=33"}
                            alt="Páramo product page showing Aislamiento Alpino jacket and its climate-driven storytelling" 
                            className="w-full h-auto shadow-2xl editable-image"
                        />
                        <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-right">Páramo — protection translated into product narrative.</p>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------
               FINAL SECTION — What This Project Shows
               ------------------------------------------------------------ */}
            <section className="py-24 md:py-40 text-center">
                <h2 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-6">What This Project Shows</h2>
                <h3 className="text-4xl md:text-6xl font-black uppercase leading-none mb-4">Equator is not a capsule.</h3>
                <p className="text-2xl md:text-3xl text-accent font-medium mb-12">It is a framework for territorial fashion.</p>
                
                <ul className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 font-mono text-sm uppercase tracking-widest opacity-80">
                    <li>Reframing a brief into a design thesis</li>
                    <li>Building a scalable conceptual system</li>
                    <li>Designing immersion through language</li>
                    <li>Embedding ethics as a constraint</li>
                </ul>
            </section>

            {/* NEXT PROJECT NAV */}
            <section 
                className="h-[50vh] md:h-[70vh] bg-accent flex flex-col justify-center items-center relative overflow-hidden group cursor-pointer text-dark mt-24"
                onMouseEnter={() => setCursorVariant('project')}
                onMouseLeave={() => setCursorVariant('default')}
                onClick={() => {
                    onNavigate(2);
                }}
            >
                <span className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Next Project</span>
                <h2 className="text-[7vw] md:text-[5vw] font-black uppercase tracking-tighter relative z-10 group-hover:scale-110 transition-transform duration-500 text-center">
                    Foundation of Doubt
                </h2>
                <div className="absolute bottom-12 flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Case <ArrowUpRight size={16} />
                </div>
            </section>
        </div>
    </motion.div>
  );
};

export default EquatorDetail;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowDown } from 'lucide-react';

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
            {/* 1 — HERO */}
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
                        FOUNDATION<br />OF DOUBT
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex flex-col md:flex-row md:items-end justify-between mt-8 md:mt-12 gap-8"
                    >
                        <h2 className="text-xl md:text-3xl font-medium max-w-2xl leading-tight">
                            Interactive museum companion
                        </h2>
                        <div className="flex flex-col items-end">
                            <p className="font-mono text-xs uppercase tracking-widest opacity-60 text-right">
                                UX Design · Cultural mediation · Interaction design
                            </p>
                            <span className="font-mono text-xl text-accent font-bold mt-2">2025</span>
                        </div>
                    </motion.div>
                </div>
            </header>

            <div ref={ref} className="w-full h-[60vh] md:h-[100vh] overflow-hidden relative">
                <motion.div style={{ y: yParallax }} className="w-full h-[120%] relative -top-[10%]">
                    <img
                        id="fdd-hero"
                        src="/images/deavntfondation.jpg"
                        onError={(e) => e.currentTarget.src = "https://picsum.photos/1920/1080?grayscale&random=30"}
                        alt="Foundation of Doubt Museum and App Mockup"
                        className="w-full h-full object-cover editable-image"
                    />
                </motion.div>
            </div>

            <div className="px-6 md:px-12 max-w-[1600px] mx-auto">

                {/* 1 — PROJECT OVERVIEW */}
                <section className="py-24 md:py-40 border-b border-black/10 dark:border-white/10">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold uppercase mb-16">01. Project Overview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                            <div className="md:col-span-4">
                                <h3 className="font-mono text-xs uppercase tracking-widest opacity-60">Executive Statement</h3>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-2xl md:text-4xl font-sans font-bold leading-[1.2] tracking-tight mb-8">
                                    This project transforms the city of Blois into an open-air museum using Augmented and Virtual Reality.
                                </p>
                                <p className="text-xl md:text-2xl leading-relaxed opacity-80">
                                    The application invites users to explore the city streets, find hidden QR codes, and scan them to reveal conceptual artworks from the Fondation du Doute in immersive AR/VR directly within the urban landscape.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black/10 dark:border-white/10 pt-12">
                            <div>
                                <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Role</h4>
                                <p className="text-lg font-bold">UX Design / Interaction Design</p>
                            </div>
                            <div>
                                <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Context</h4>
                                <p className="text-lg font-bold">University project — Cultural mediation</p>
                            </div>
                            <div>
                                <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">Type</h4>
                                <p className="text-lg font-bold">AR/VR Urban game</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 2 — CONTEXT */}
                <section className="py-24 md:py-40">
                    <h2 className="text-3xl font-bold uppercase mb-12">02. Context</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                        <div className="space-y-6">
                            <p className="text-lg md:text-xl leading-relaxed">
                                The Fondation du Doute in Blois is a unique center for contemporary art, heavily influenced by the Fluxus movement.
                            </p>
                            <p className="text-lg md:text-xl leading-relaxed">
                                However, conceptual art can sometimes feel confined within museum walls, disconnected from the vibrant daily life of the city outside.
                            </p>
                            <p className="text-lg md:text-xl leading-relaxed font-medium">
                                To bridge this gap, the goal was to create a digital experience that brings the museum's collection directly into the public space, engaging both art lovers and casual pedestrians.
                            </p>
                        </div>
                        <div className="bg-black/5 dark:bg-white/5 aspect-[4/3]">
                            <img
                                id="fdd-context-museum"
                                src="/images/interieur.jpg"
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/800/600?grayscale&random=31"}
                                alt="Museum Context - Conceptual Art"
                                className="w-full h-full object-cover editable-image"
                            />
                        </div>
                    </div>
                </section>

                {/* 3 — PROBLEM */}
                <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 -mx-6 md:-mx-12 px-6 md:px-12">
                    <h2 className="text-3xl font-bold uppercase mb-16">03. Problem</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 border border-black/10 dark:border-white/10">
                            <span className="text-4xl font-black text-accent block mb-4">01</span>
                            <p className="text-xl font-bold">Museum walls create a physical and mental barrier for new audiences.</p>
                        </div>
                        <div className="p-8 border border-black/10 dark:border-white/10">
                            <span className="text-4xl font-black text-accent block mb-4">02</span>
                            <p className="text-xl font-bold">Conceptual art is rarely experienced in the context of everyday urban life.</p>
                        </div>
                        <div className="p-8 border border-black/10 dark:border-white/10">
                            <span className="text-4xl font-black text-accent block mb-4">03</span>
                            <p className="text-xl font-bold">City exploration apps often lack meaningful or surprising cultural interactivity.</p>
                        </div>
                    </div>
                </section>

                {/* 4 — DESIGN QUESTION */}
                <section className="py-32 md:py-48 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold uppercase mb-16">04. Core Question</h2>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight max-w-5xl">
                        How can we use AR and VR to bring the Fondation du Doute's artworks directly into the streets of Blois?
                    </p>
                </section>

                {/* 5 — RESEARCH */}
                <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10">
                    <h2 className="text-3xl font-bold uppercase mb-16">05. Research</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                        <div className="bg-black/5 dark:bg-white/5 aspect-square">
                            <img
                                id="fdd-research"
                                src="/images/scan.jpg"
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/800/800?grayscale&random=32"}
                                alt="Research Notes and Interviews"
                                className="w-full h-full object-cover editable-image"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 opacity-60">Urban Behavior</h3>
                            <p className="text-lg md:text-xl mb-8">Studying pedestrian flows in Blois revealed that:</p>
                            <ul className="space-y-4 text-lg md:text-xl font-medium border-l-2 border-accent pl-6">
                                <li>• People are highly receptive to gamified urban exploration.</li>
                                <li>• Historical spots in Blois are popular, but contemporary art is less visible.</li>
                                <li>• Users are comfortable scanning QR codes in public spaces.</li>
                                <li>• AR provides an immediate "wow" factor that drives engagement.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-accent text-dark p-12 md:p-24 text-center">
                        <h3 className="font-mono text-sm uppercase tracking-widest mb-6 opacity-80">Key Insight</h3>
                        <p className="text-3xl md:text-5xl font-black uppercase leading-tight">
                            The city itself is the best exhibition canvas.
                        </p>
                    </div>
                </section>

                {/* 6 — DESIGN PRINCIPLES */}
                <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10">
                    <h2 className="text-3xl font-bold uppercase mb-16">06. Design Principles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10">
                        <div className="py-8 md:py-0 md:pr-8">
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-4">Principle 1</span>
                            <h3 className="text-2xl md:text-3xl font-black">Urban Gamification</h3>
                        </div>
                        <div className="py-8 md:py-0 md:px-8">
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-4">Principle 2</span>
                            <h3 className="text-2xl md:text-3xl font-black">Seamless AR Transitions</h3>
                        </div>
                        <div className="py-8 md:py-0 md:pl-8">
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-4">Principle 3</span>
                            <h3 className="text-2xl md:text-3xl font-black">Contextual Surprises</h3>
                        </div>
                    </div>
                </section>

                {/* 7 — CONCEPT */}
                <section className="py-24 md:py-40 bg-black/5 dark:bg-white/5 -mx-6 md:-mx-12 px-6 md:px-12">
                    <h2 className="text-3xl font-bold uppercase mb-16">07. Concept</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                                A mobile application that turns Blois into a massive art scavenger hunt.
                            </p>
                            <p className="text-lg md:text-xl opacity-80 mb-6">
                                Users explore the city streets relying on an in-app map to discover hidden QR codes. Scanning these markers triggers immersive experiences:
                            </p>
                            <ul className="space-y-6 text-xl font-bold">
                                <li className="flex items-center gap-4"><ArrowUpRight className="text-accent min-w-[24px]" /> 3D artworks appearing in AR</li>
                                <li className="flex items-center gap-4"><ArrowUpRight className="text-accent min-w-[24px]" /> immersive VR environments</li>
                                <li className="flex items-center gap-4"><ArrowUpRight className="text-accent min-w-[24px]" /> contextual audio from artists</li>
                            </ul>
                        </div>
                        <div className="flex justify-center items-center gap-4 md:gap-6 py-8">
                            <img
                                id="fdd-concept-mockup-1"
                                src="/images/Animation.png"
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/400/850?text=1&random=33"}
                                alt="App Concept 1"
                                className="w-1/3 object-cover shadow-2xl editable-image bg-black/5 dark:bg-white/5"
                            />
                            <img
                                id="fdd-concept-mockup-2"
                                src="/images/Scan (1).png"
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/400/850?text=2&random=34"}
                                alt="App Concept 2"
                                className="w-1/3 object-cover shadow-2xl editable-image bg-black/5 dark:bg-white/5 translate-y-6 md:translate-y-12"
                            />
                            <img
                                id="fdd-concept-mockup-3"
                                src="/images/Accueil 1 (1).png"
                                onError={(e) => e.currentTarget.src = "https://picsum.photos/400/850?text=3&random=35"}
                                alt="App Concept 3"
                                className="w-1/3 object-cover shadow-2xl editable-image bg-black/5 dark:bg-white/5"
                            />
                        </div>
                    </div>
                </section>

                {/* 8 & 9 — USER JOURNEY & STRUCTURE */}
                <section className="py-24 md:py-40">
                    <h2 className="text-3xl font-bold uppercase mb-16">08. UX Structure & Journey</h2>

                    <div className="w-full mb-16 bg-black/5 dark:bg-white/5 p-8">
                        <img
                            id="fdd-user-journey"
                            src="/images/croquis.png"
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/600?text=User+Journey+Diagram&random=34"}
                            alt="User Journey Diagram"
                            className="w-full editable-image"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-8">High-Level Journey</h3>
                            <div className="flex flex-col gap-4 font-black text-2xl md:text-3xl uppercase tracking-tighter text-black/20 dark:text-white/20">
                                <span className="text-black dark:text-white">City Walk</span>
                                <span>↓</span>
                                <span className="text-black dark:text-white">Map Location</span>
                                <span>↓</span>
                                <span className="text-black dark:text-white">QR Discovery</span>
                                <span>↓</span>
                                <span className="text-black dark:text-white">AR Scanning</span>
                                <span>↓</span>
                                <span className="text-black dark:text-white">VR Experience</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-8">Detailed flow</h3>
                            <div className="flex flex-col gap-4 text-xl font-medium border-l-2 border-accent pl-6">
                                <span>User opens app in Blois</span>
                                <ArrowDown size={16} className="text-accent/50 ml-2" />
                                <span>Checks the city map for hints</span>
                                <ArrowDown size={16} className="text-accent/50 ml-2" />
                                <span>Walks to a specific location</span>
                                <ArrowDown size={16} className="text-accent/50 ml-2" />
                                <span>Finds the physical QR code</span>
                                <ArrowDown size={16} className="text-accent/50 ml-2" />
                                <span>Scans code with the camera</span>
                                <ArrowDown size={16} className="text-accent/50 ml-2" />
                                <span>Views 3D artwork in AR/VR</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 09 — KEY FEATURES */}
                <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10">
                    <h2 className="text-3xl font-bold uppercase mb-24">09. Key Features</h2>

                    {/* Feature 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32 items-center">
                        <div className="order-2 md:order-1">
                            <video
                                id="fdd-feat-1"
                                src="/images/map.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-3/4 mx-auto shadow-2xl"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h3 className="text-3xl font-bold uppercase mb-6">Interactive City Map</h3>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">A custom map of Blois guides users toward hidden artworks:</p>
                            <ul className="space-y-2 text-lg font-bold mb-6">
                                <li>• GPS tracking and orientation</li>
                                <li>• distance indicators to next QR code</li>
                                <li>• visual hints without giving exact locations</li>
                            </ul>
                            <p className="text-lg text-accent font-medium">Encourages active exploration rather than turn-by-turn navigation.</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32 items-center">
                        <div>
                            <h3 className="text-3xl font-bold uppercase mb-6">AR / VR Scanner</h3>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">The core mechanic of the app relies on the camera:</p>
                            <ul className="space-y-2 text-lg font-bold">
                                <li>• instant QR code recognition</li>
                                <li>• smooth transition to AR tracking</li>
                                <li>• 3D models anchored to the real world</li>
                            </ul>
                        </div>
                        <div>
                            <video
                                id="fdd-feat-2"
                                src="/images/vr.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-3/4 mx-auto shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="order-2 md:order-1">
                            <video
                                id="fdd-feat-3"
                                src="/images/video.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-3/4 mx-auto shadow-2xl"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h3 className="text-3xl font-bold uppercase mb-6">Digital Collection</h3>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">Visitors build a unique digital gallery:</p>
                            <ul className="space-y-2 text-lg font-bold mb-6">
                                <li>• keeps unlocked artworks accessible</li>
                                <li>• detailed contextual info available post-scan</li>
                                <li>• achievements for finding rare pieces</li>
                            </ul>
                            <p className="text-lg text-accent font-medium">Gamifying the cultural experience.</p>
                        </div>
                    </div>
                </section>

                {/* 10 — DESIGN PROCESS */}
                <section className="py-24 md:py-40 bg-black/5 dark:bg-white/5 -mx-6 md:-mx-12 px-6 md:px-12">
                    <h2 className="text-3xl font-bold uppercase mb-16">10. Design Process</h2>

                    <div className="max-w-3xl mb-16">
                        <p className="text-xl md:text-2xl leading-relaxed">
                            The design process focused on <span className="font-bold">outdoor usability</span> and seamless camera integration.
                        </p>
                    </div>

                    <div className="mb-16">
                        <img
                            id="fdd-wireframes"
                            src="/images/wire.png"
                            onError={(e) => e.currentTarget.src = "https://picsum.photos/1600/800?text=Outdoor+Wireframes&grayscale&random=38"}
                            alt="Wireframes"
                            className="w-full border border-black/10 dark:border-white/10 editable-image"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 border-t-2 border-accent">
                            <h4 className="font-bold text-xl uppercase mb-4">High Contrast</h4>
                            <p className="opacity-80">UI elements were designed to be readable under direct sunlight in the streets.</p>
                        </div>
                        <div className="p-8 border-t-2 border-accent">
                            <h4 className="font-bold text-xl uppercase mb-4">Camera First</h4>
                            <p className="opacity-80">The scanner interface is always one tap away to ensure users don't miss an opportunity.</p>
                        </div>
                        <div className="p-8 border-t-2 border-accent">
                            <h4 className="font-bold text-xl uppercase mb-4">Battery Efficiency</h4>
                            <p className="opacity-80">Dark mode and optimized AR assets help preserve battery life during the urban walk.</p>
                        </div>
                    </div>
                </section>

                {/* 11 — PROTOTYPE */}
                <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10">
                    <h2 className="text-3xl font-bold uppercase mb-16">11. Prototype</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-24 max-w-4xl mx-auto px-4 md:px-0">
                        <div>
                            <video
                                id="fdd-proto-1"
                                src="/images/didact.mp4"
                                controls
                                playsInline
                                className="w-full aspect-[9/19] object-cover shadow-2xl rounded-[1.5rem] md:rounded-[2rem] border-4 md:border-8 border-black/10 dark:border-white/10 editable-image bg-black/5 dark:bg-white/5 mb-6"
                            />
                            <p className="font-mono text-xs uppercase tracking-widest text-center opacity-60">Didacticiel</p>
                        </div>
                        <div>
                            <video
                                id="fdd-proto-2"
                                src="/images/clasique.mp4"
                                controls
                                playsInline
                                className="w-full aspect-[9/19] object-cover shadow-2xl rounded-[1.5rem] md:rounded-[2rem] border-4 md:border-8 border-black/10 dark:border-white/10 editable-image bg-black/5 dark:bg-white/5 mb-6"
                            />
                            <p className="font-mono text-xs uppercase tracking-widest text-center opacity-60">Navigation</p>
                        </div>
                    </div>
                </section>

                {/* 12 — WHAT WORKED */}
                <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10">
                    <h2 className="text-3xl font-bold uppercase mb-16">12. What Worked</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 border border-black/10 dark:border-white/10 hover:bg-accent hover:text-dark transition-colors duration-300">
                            <span className="text-4xl font-bold mb-4 block">1</span>
                            <p className="font-bold text-xl leading-tight">Gamification drives engagement effectively</p>
                        </div>
                        <div className="p-8 border border-black/10 dark:border-white/10 hover:bg-accent hover:text-dark transition-colors duration-300">
                            <span className="text-4xl font-bold mb-4 block">2</span>
                            <p className="font-bold text-xl leading-tight">Breaks the barrier of the museum walls</p>
                        </div>
                        <div className="p-8 border border-black/10 dark:border-white/10 hover:bg-accent hover:text-dark transition-colors duration-300">
                            <span className="text-4xl font-bold mb-4 block">3</span>
                            <p className="font-bold text-xl leading-tight">AR creates memorable "wow" moments</p>
                        </div>
                    </div>
                </section>

                {/* 13 — FUTURE IMPROVEMENTS */}
                <section className="py-24 md:py-40 border-t border-black/10 dark:border-white/10 bg-[#fafafa] dark:bg-[#0f0f0f] -mx-6 md:-mx-12 px-6 md:px-12">
                    <h2 className="text-3xl font-bold uppercase mb-16">13. Future Improvements</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg md:text-xl font-bold">
                        <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent"></span> Location-based AR without QR codes (VPS)</li>
                        <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent"></span> Multiplayer mode for group exploration</li>
                        <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent"></span> Community-created QR hiding spots</li>
                        <li className="flex items-center gap-4"><span className="w-3 h-3 bg-accent"></span> Integration with local city tourism APIs</li>
                    </ul>
                </section>

                {/* 14 & 15 — REFLECTION & CONCLUSION */}
                <section className="py-32 md:py-48 flex flex-col items-center text-center">
                    <div className="max-w-4xl">
                        <h2 className="font-mono text-sm uppercase tracking-widest mb-12 text-accent">14. Reflection</h2>
                        <p className="text-3xl md:text-5xl font-serif italic mb-24 leading-relaxed">
                            “By taking art out of the museum and into the streets, the city of Blois itself becomes the canvas.
                            <br /><br />
                            AR is at its best when it augments reality, not when it replaces it.”
                        </p>

                        <div className="border-t border-black/10 dark:border-white/10 pt-16 mt-8">
                            <h3 className="font-mono text-sm uppercase tracking-widest mb-8 opacity-60">15. Conclusion</h3>
                            <p className="text-xl md:text-3xl font-bold max-w-3xl mx-auto leading-relaxed">
                                This project demonstrates my ability to merge physical navigation with digital AR experiences, creating a unique and engaging cultural journey.
                            </p>
                        </div>
                    </div>
                </section>

                {/* NEXT PROJECT NAV */}
                <section
                    className="h-[50vh] md:h-[70vh] bg-accent flex flex-col justify-center items-center relative overflow-hidden group cursor-pointer text-dark mt-12 mb-24"
                    onMouseEnter={() => setCursorVariant('project')}
                    onMouseLeave={() => setCursorVariant('default')}
                    onClick={() => {
                        onNavigate(3);
                        window.scrollTo(0, 0);
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

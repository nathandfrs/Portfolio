import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Droplet, Leaf, Heart, Infinity, Instagram, Smartphone, MonitorPlay, ExternalLink, Focus, Calendar } from 'lucide-react';

interface AaliyaDetailProps {
    onBack: () => void;
    onNavigate: (id: number) => void;
    setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
}

const AaliyaDetail: React.FC<AaliyaDetailProps> = ({ onBack, onNavigate, setCursorVariant }) => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
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
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-light dark:bg-dark min-h-screen relative z-20 text-dark dark:text-light selection:bg-accent selection:text-black overflow-hidden"
        >
            {/* === HEADER === */}
            <header className="px-6 md:px-12 pt-32 md:pt-40 pb-12">
                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="font-mono text-sm uppercase tracking-widest mb-6 opacity-60 flex items-center gap-4"
                >
                    <button onClick={onBack} onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')} className="hover:text-accent transition-colors">&larr; BACK TO WORK</button>
                    <span className="hidden md:inline">| Brand design · Art direction · Communication strategy · Packaging</span>
                </motion.p>
                <motion.h1
                    initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="text-[12vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    AALIYA
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mt-6 gap-8"
                >
                    <h2 className="text-2xl md:text-3xl font-medium font-sans max-w-3xl leading-tight">
                        Ethical customizable perfume brand.
                    </h2>
                    <div className="font-mono text-2xl font-bold text-accent">2024</div>
                </motion.div>
            </header>

            {/* 00. DESIGN PROBLEM & OPENING HERO */}
            <section className="px-6 md:px-12 py-16 md:py-24 border-t border-black/10 dark:border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-[1600px] mx-auto">
                    <div className="md:col-span-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">00 — Design Problem</h3>
                        <h2 className="text-3xl font-bold uppercase tracking-tight">Challenge</h2>
                    </div>
                    <div className="md:col-span-8 flex flex-col gap-8 text-xl font-medium opacity-90 leading-relaxed">
                        <p className="text-2xl font-bold leading-tight">How can a contemporary brand be designed to answer emerging expectations around personalization, well-being, ethics and emotional connection, while building a complete and desirable visual universe?</p>
                        <p>This project was developed in response to a broader creative brief focused on brand creation. The goal was to imagine a coherent brand system from strategy to visual identity, by designing a concept capable of connecting with contemporary users through meaning, aesthetics and experience.</p>
                    </div>
                </div>
            </section>

            {/* OPENING HERO VISUAL */}
            <div ref={heroRef} className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative">
                <motion.div style={{ y: yParallax }} className="w-full h-[120%] relative -top-[10%]">
                    <img
                        src="/images/CHARTE GRAPHIQUE AALIYA.png"
                        onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1590736969955-71cb948439ac?q=80&w=2000&auto=format&fit=crop"}
                        alt="Aaliya Opening Visual"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>

            <div className="max-w-[1600px] mx-auto">

                {/* 01. INTRODUCTION & 02. THE ESSENCE */}
                <section className="py-24 md:py-32 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start border-b border-black/10 dark:border-white/10">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">01 — Introduction</h3>
                        <p className="text-xl md:text-2xl font-bold leading-relaxed mb-6">Aaliya was born from the vision of four students passionate about beauty and ethics.</p>
                        <p className="opacity-80 text-lg leading-relaxed mb-12">Confronted with skin sensitivity issues and unable to find products adapted to those concerns, we decided to create our own brand. This first section introduces the origin of the project in a narrative and editorial way, exactly like the opening of the PDF.</p>

                        <div className="w-full aspect-[4/3] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden flex items-center justify-center p-8 group hover:border-accent transition-colors">
                            <img src="/images/logooo.png" alt="Aaliya Logo" className="w-[80%] h-auto object-contain transition-all duration-500 scale-100 group-hover:scale-105" />
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 md:p-12">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6 border-b border-black/10 dark:border-white/10 pb-4">02 — The Essence of Aaliya</h3>
                        <p className="text-xl leading-relaxed mb-6 font-medium">Aaliya is a customizable fragrance brand offering alcohol-free compositions enriched with essential oils, with the ambition of reinventing the fragrance experience in a more ethical and sustainable way.</p>
                        <p className="opacity-80 text-lg leading-relaxed mb-6">The concept is based on personalization. Aaliya offers a kit composed of a neutral base and essential oils, allowing each person to customize their fragrance and create a scent that truly reflects them.</p>
                        <p className="opacity-80 text-lg leading-relaxed">The brand is designed for everyone, with a refined visual identity and a digital strategy built around personalization, well-being and respect for the environment.</p>
                    </motion.div>
                </section>

                {/* 03. WHO WE ARE & ORIGIN */}
                <section className="py-24 px-6 md:px-12 bg-accent text-black relative z-10 selection:bg-black selection:text-accent">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 font-bold">03 — Who We Are</h3>
                            <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 mix-blend-multiply">The Story of the Brand</h4>
                            <p className="text-xl font-medium leading-relaxed mb-12">Aaliya was created by four students passionate about beauty, communication and wellness rituals, with the ambition of challenging the codes of traditional products through creations that are better for the skin and designed for everyone.</p>

                            <h4 className="text-xl font-bold uppercase tracking-tight mb-4 border-l-4 border-black pl-4">The Origin of the Name</h4>
                            <p className="text-lg font-medium leading-relaxed">The name Aaliya evokes purity, elevation and freedom. It gives the brand a soft, elegant and memorable identity.</p>
                        </div>
                        <div className="w-full aspect-[4/3] bg-black/10 overflow-hidden shadow-2xl skew-y-3 transform-gpu">
                            <img src="images/4students.png" alt="Team Brand Story" className="w-full h-full object-cover mix-blend-multiply opacity-100" />
                        </div>
                    </div>
                </section>

                {/* 04. MISSION & 05. VISION */}
                <section className="py-32 px-6 md:px-12 border-b border-black/10 dark:border-white/10 relative overflow-hidden bg-black/5 dark:bg-white/5">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-16 text-center">04 & 05 — Strategy</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">
                        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border-t border-black/10 dark:border-white/10 pt-8 mt-12 md:mt-0">
                            <h4 className="text-[5vw] md:text-[4vw] font-black uppercase tracking-tighter text-black/10 dark:text-white/10 leading-none mb-[-2rem] relative z-0">Mission</h4>
                            <div className="relative z-10 p-8 border border-black/10 dark:border-white/10 bg-light dark:bg-dark shadow-xl hover:border-accent transition-colors">
                                <p className="text-xl font-bold leading-relaxed mb-6">Our mission is to reinvent the user experience by offering customizable, alcohol-free products enriched with essential oils.</p>
                                <p className="text-lg opacity-80 leading-relaxed">We want to give people the possibility to create something that reflects who they are, while emphasizing practices that are respectful of both the environment and the skin.</p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border-t border-black/10 dark:border-white/10 pt-8">
                            <h4 className="text-[5vw] md:text-[4vw] font-black uppercase tracking-tighter text-black/10 dark:text-white/10 leading-none mb-[-2rem] relative z-0">Vision</h4>
                            <div className="relative z-10 p-8 border border-black/10 dark:border-white/10 bg-light dark:bg-dark shadow-xl hover:border-accent transition-colors">
                                <p className="text-xl font-bold leading-relaxed mb-6">Aaliya aspires to become a reference brand in the field of personalized creations, highlighting ethics and innovation.</p>
                                <p className="text-lg opacity-80 leading-relaxed">We want to build a loyal community that values quality, personalization and environmental respect. In the long term, we aim to be recognized for contributing to a more conscious and sustainable beauty culture.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 06. MESSAGE */}
                <section className="py-32 px-6 md:px-12 bg-black text-white dark:bg-[#050505] text-center border-b border-white/10">
                    <div className="max-w-5xl mx-auto">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-12">06 — Message</h3>
                        <p className="text-3xl md:text-5xl font-bold leading-tight mb-12">
                            Aaliya was born from the passion of four students for beauty and ethics. In response to our own needs, we created a brand offering customizable, alcohol-free products enriched with essential oils and designed for everyone.
                        </p>
                        <p className="text-xl md:text-2xl opacity-80 leading-relaxed mb-16">
                            Aaliya seeks to reinvent the experience by allowing each person to create their own unique and authentic essence. Each creation becomes a unique expression of personality.
                        </p>
                        <div className="inline-block px-12 py-6 border-2 border-accent text-accent font-black uppercase text-2xl tracking-tight">
                            With Aaliya, discover something that truly reflects who you are.
                        </div>
                    </div>
                </section>

                {/* 07. TARGET & 08. MOTIVATIONS */}
                <section className="py-24 px-6 md:px-12 border-b border-black/10 dark:border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 max-w-[1600px] mx-auto">

                        {/* Targeting Details Sidebar */}
                        <div className="md:col-span-4 flex flex-col gap-12">
                            <div>
                                <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">07 — Target Audience</h3>
                                <h4 className="text-2xl font-bold uppercase tracking-tight mb-4 flex items-center gap-3"><Heart className="text-accent" /> Audience</h4>
                                <p className="text-lg font-medium opacity-80 leading-relaxed">Aaliya is aimed at people looking for refined sensory creations made with exceptional essential oils, combining elegance, skin respect and a strong, personal identity.</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold uppercase tracking-tight mb-4 flex items-center gap-3"><Focus className="text-accent" /> Barriers</h4>
                                <p className="text-lg font-medium opacity-80 leading-relaxed mb-4">Sensitive users are often worried about allergic reactions and highly demanding when it comes to composition, often because of previous experiences. They are looking for natural, hypoallergenic and healthy formulas, with full transparency on ingredients and craftsmanship.</p>
                                <p className="text-lg font-medium opacity-80 leading-relaxed">Those who value personalization are also searching for a luxurious, rare and eco-conscious product shaped in their own image.</p>
                            </div>
                        </div>

                        {/* Needs / Motivations Grid */}
                        <div className="md:col-span-8 bg-black/5 dark:bg-white/5 p-8 md:p-16 border border-black/10 dark:border-white/10">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-12">08 — Motivations and Needs</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-6 pb-4 border-b border-black/10 dark:border-white/10 flex items-center gap-3"><Leaf className="text-accent" /> Motivations</h4>
                                    <p className="text-lg font-medium opacity-80 leading-relaxed">Customers are attracted by the possibility of a personalized and natural product enriched with essential oils, offering both a sensory and soothing experience. Essential oils bring a care dimension and answer the desires of people looking for something authentic, skin-friendly and beneficial to well-being.</p>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-6 pb-4 border-b border-black/10 dark:border-white/10 flex items-center gap-3"><Droplet className="text-accent" /> Needs</h4>
                                    <p className="text-lg font-medium opacity-80 leading-relaxed mb-6">Users need safe, hypoallergenic products made with high-quality essential oils that guarantee softness and skin respect. They also want full ingredient transparency.</p>
                                    <p className="text-lg font-medium opacity-80 leading-relaxed">Those seeking personalization need reassurance, satisfaction guarantees and a simple process to create something unique aligned with their preferences and values.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 09. POSITIONING & 10. CORE VALUES */}
                <section className="py-24 md:py-32 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center border-b border-black/10 dark:border-white/10">
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">09 — Positioning</h3>
                        <p className="text-2xl md:text-3xl font-bold leading-tight mb-8 border-l-4 border-accent pl-6 py-2">
                            Aaliya positions itself as an ethical luxury brand using high-quality essential oils to create unique, natural and long-lasting compositions.
                        </p>
                        <p className="text-xl opacity-80 leading-relaxed mb-6 font-medium">We offer a high level of personalization, allowing each client to design an experience that feels like them, while remaining faithful to a commitment to inclusivity through unisex creations accessible to all.</p>
                        <p className="text-xl opacity-80 leading-relaxed font-medium">Our approach prioritizes skin-friendly ingredients, ensuring products that are not only pleasant to use, but also soft and safe for the skin. Each creation is imagined to combine elegance, skin respect and daily well-being.</p>
                    </div>

                    <div className="relative group border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 shadow-2xl overflow-hidden flex flex-col">
                        <div className="p-8 md:p-12 relative z-10 flex-1">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-12">10 — Core Values</h3>
                            <div className="grid grid-cols-2 gap-12 font-bold uppercase tracking-tight text-xl">
                                <div className="border-b border-black/20 dark:border-white/20 pb-4 group-hover:text-accent transition-colors">
                                    Personalization
                                    <span className="block mt-2 font-sans font-medium text-sm normal-case opacity-60 text-dark dark:text-light">Something intimate, unique and adaptable.</span>
                                </div>
                                <div className="border-b border-black/20 dark:border-white/20 pb-4 group-hover:text-accent transition-colors">
                                    Ethics
                                    <span className="block mt-2 font-sans font-medium text-sm normal-case opacity-60 text-dark dark:text-light">A more responsible and respectful approach.</span>
                                </div>
                                <div className="border-b border-black/20 dark:border-white/20 pb-4 group-hover:text-accent transition-colors">
                                    Unisex
                                    <span className="block mt-2 font-sans font-medium text-sm normal-case opacity-60 text-dark dark:text-light">Designed for everyone, beyond gender codes.</span>
                                </div>
                                <div className="border-b border-black/20 dark:border-white/20 pb-4 group-hover:text-accent transition-colors">
                                    Exclusivity
                                    <span className="block mt-2 font-sans font-medium text-sm normal-case opacity-60 text-dark dark:text-light">A premium, distinctive experience.</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-64 md:h-80 overflow-hidden relative border-t border-black/10 dark:border-white/10">
                            <img src="images/valeur.png" onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"} alt="Core Values Universe" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" />
                        </div>
                    </div>
                </section>

                {/* 11 & 12. FRAGRANCE PERSONALITIES */}
                <section className="py-32 px-6 md:px-12 bg-black text-white dark:bg-[#0a0a0a]">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-16 text-center">11 & 12 — Fragrance Personality</h3>

                    <div className="flex flex-col gap-12 max-w-[1600px] mx-auto">
                        {[
                            { name: 'RIVIERA', desc: 'A citrus fragrance built around bergamot and yuzu, inspired by summer mornings spent gathering citrus fruits. Riviera embodies sparkling freshness, childhood memories and a joyful sense of simplicity.', img: 'images/riviera.png', accent: 'border-yellow-500' },
                            { name: 'SERENITÀ', desc: 'A floral fragrance with iris and musk, evoking blooming gardens and the escapism of travel stories. Serenità creates a soft, powdery and dreamlike atmosphere.', img: 'images/serenita.png', accent: 'border-rose-400' },
                            { name: 'DOLCEZZA', desc: 'A gourmand fragrance with vanilla and cacao, recalling warm moments in the kitchen. Dolcezza captures the softness and intensity of memories shared around homemade desserts.', img: 'images/Dolcezza.png', accent: 'border-amber-600' },
                            { name: 'PASSIONE', desc: 'An oriental fragrance with patchouli and incense, inspired by ceremonies and ancient objects. Passione is mysterious, elegant and filled with distant memories.', img: 'images/Passione.png', accent: 'border-stone-500' },
                        ].map((frag, idx) => (
                            <div key={idx} className={`flex flex-col md:flex-row bg-[#111] border ${frag.accent} shadow-2xl overflow-hidden group`}>
                                <div className="w-full md:w-5/12 aspect-[4/3] md:aspect-auto overflow-hidden relative">
                                    <img src={frag.img} alt={frag.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                                </div>
                                <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center border-l border-white/10">
                                    <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">{frag.name}</h4>
                                    <p className="text-xl font-medium opacity-90 leading-relaxed max-w-xl">{frag.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 13. PRICING */}
                <section className="py-32 px-6 md:px-12 border-b border-black/10 dark:border-white/10 text-center bg-black/5 dark:bg-white/5">
                    <div className="max-w-4xl mx-auto border border-black/10 dark:border-white/10 p-16 shadow-xl bg-light dark:bg-dark">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-8">13 — Pricing</h3>
                        <div className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter mb-8 leading-none">
                            65 <span className="text-accent">EUROS</span>
                        </div>
                        <p className="text-xl font-medium opacity-80 leading-relaxed mb-6">The pricing reflects the exceptional quality of the natural ingredients and the personalization service. Each creation is imagined with artisanal care and expert know-how, guaranteeing a unique experience.</p>
                        <p className="text-lg font-medium opacity-80 leading-relaxed">Elegant and durable packaging reinforces this premium dimension while remaining aligned with ethical and responsible practices.</p>
                    </div>
                </section>

                {/* 14 & 15. COMMUNICATION STRATEGY & LOGIC */}
                <section className="py-24 px-6 md:px-12 border-b border-black/10 dark:border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-[1600px] mx-auto">

                        <div className="lg:col-span-12 text-center mb-8">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">14 & 15 — Communication Strategy</h3>
                            <p className="text-2xl font-bold leading-relaxed max-w-4xl mx-auto">To reinforce Aaliya’s visibility and engagement, Instagram, TikTok and Facebook were chosen as the main communication channels. Through their dynamic and vertical formats, these platforms make it possible to directly reach the target audience with content aligned with current digital habits.</p>
                        </div>

                        <div className="lg:col-span-6 p-12 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-accent transition-colors h-full">
                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-8">Plurimedia Logic</h4>
                            <p className="text-lg font-medium opacity-80 leading-relaxed">Several complementary communication channels are used — Instagram, TikTok, Facebook and website — in order to reach a broad audience while adapting the message to each platform. This multiplies touchpoints while maintaining visual and narrative continuity.</p>
                        </div>

                        <div className="lg:col-span-6 p-12 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-accent transition-colors h-full">
                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-8">Transmedia Logic</h4>
                            <p className="text-lg font-medium opacity-80 leading-relaxed mb-6">The project goes beyond simple content distribution. Each platform becomes an extension of the same story.</p>
                            <p className="text-lg font-medium opacity-80 leading-relaxed">For example, perfume creation workshops are teased on social media, shared live through Instagram and Facebook stories, then summarized in TikTok recap videos. This builds a more immersive brand universe in which each action connects back to the same narrative.</p>
                        </div>

                    </div>
                </section>

                {/* 16, 17, 18. CONTENT CALENDAR */}
                <section className="py-32 px-6 md:px-12 border-b border-black/10 dark:border-white/10">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-16 text-center">16, 17, 18 — Content Calendar</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
                        {/* Column 1 */}
                        <div className="border border-black/10 dark:border-white/10 bg-light dark:bg-dark p-8 group hover:border-accent transition-colors">
                            <h4 className="font-bold uppercase tracking-tight text-2xl mb-8 flex items-center gap-3"><Infinity size={24} className="text-accent" /> Weekly & Daily</h4>
                            <div className="space-y-6">
                                <div>
                                    <h5 className="font-bold text-lg mb-2 border-b-2 border-accent inline-block">Weekly</h5>
                                    <p className="opacity-80 font-medium text-sm leading-relaxed">Every Thursday, one post dedicated to fragrances with captivating visuals on IG and TikTok. A complementary story highlights the products via polls and discoveries.</p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-lg mb-2 mt-4 border-b-2 border-accent inline-block">Daily</h5>
                                    <p className="opacity-80 font-medium text-sm leading-relaxed">IG stories build interest around the website and reveal fragments of visual identity. 2 IG posts/week centered on creations. TikTok short creative videos aligned with trends.</p>
                                </div>
                            </div>
                        </div>
                        {/* Column 2 */}
                        <div className="border border-black/10 dark:border-white/10 bg-light dark:bg-dark p-8 group hover:border-accent transition-colors">
                            <h4 className="font-bold uppercase tracking-tight text-2xl mb-8 flex items-center gap-3"><Calendar size={24} className="text-accent" /> Monthly & Bi-Monthly</h4>
                            <div className="space-y-6">
                                <div>
                                    <h5 className="font-bold text-lg mb-2 border-b-2 border-accent inline-block">Monthly</h5>
                                    <p className="opacity-80 font-medium text-sm leading-relaxed">A monthly article on the website around an olfactory theme or benefits of essential oils, relayed via stories. Facebook post redirects to the article to reinforce engagement.</p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-lg mb-2 mt-4 border-b-2 border-accent inline-block">Bi-Monthly</h5>
                                    <p className="opacity-80 font-medium text-sm leading-relaxed">Influencer collaborations on TikTok and Instagram to share product experience, helping reach new audiences and generate trust.</p>
                                </div>
                            </div>
                        </div>
                        {/* Column 3 */}
                        <div className="border border-black/10 dark:border-white/10 bg-light dark:bg-dark p-8 group hover:border-accent transition-colors">
                            <h4 className="font-bold uppercase tracking-tight text-2xl mb-8 flex items-center gap-3"><ExternalLink size={24} className="text-accent" /> Events & Promos</h4>
                            <div className="space-y-6">
                                <div>
                                    <h5 className="font-bold text-lg mb-2 border-b-2 border-accent inline-block">Quarterly</h5>
                                    <p className="opacity-80 font-medium text-sm leading-relaxed">Instagram contest to win an 86€ kit. Promo code valid for 20 days on IG and FB. Dedicated photoshoot to create fresh visual content.</p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-lg mb-2 mt-4 border-b-2 border-accent inline-block">Biannual</h5>
                                    <p className="opacity-80 font-medium text-sm leading-relaxed">Discovery workshop inviting participants to create their own perfume. Shared via IG/FB stories and TikTok recap videos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 19. VIDEO SERIES */}
                <section className="relative h-[80vh] flex items-center justify-center border-b border-black/10 dark:border-white/10 bg-black overflow-hidden group">
                    <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1543432029-450f3b4d455d?q=80&w=2000&auto=format&fit=crop" alt="Video Series" className="w-full h-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="relative z-10 text-center px-6 text-white max-w-5xl bg-black/40 p-12 md:p-16 backdrop-blur-sm border border-white/10">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6 font-bold">19 — Video Series</h3>
                        <MonitorPlay size={48} className="mx-auto mb-8 text-accent" />
                        <p className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
                            “My Perfume, My Story”
                        </p>
                        <p className="text-xl font-medium opacity-90 leading-relaxed mb-6">The storytelling begins with a video series in which Aaliya’s creators share the origin of each fragrance, the emotions attached to them and the memories linked to the products.</p>
                        <p className="text-lg font-medium opacity-80 leading-relaxed">This project embodies a personal and intimate vision of the brand. Transmedia broadcast on TikTok and Instagram, this series captures the essence of Aaliya and strengthens community engagement, opening the format for influencers to adopt later.</p>
                    </div>
                </section>

                {/* 20. COMMUNICATION VISUALS */}
                <section className="py-32 px-6 md:px-12 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-16 text-center">20 — Communication Visuals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto">
                        {[
                            { title: 'Instagram', desc: 'Contest mechanics and audience engagement.', icon: <Instagram className="text-accent" />, img: 'images/insta5.webp' },
                            { title: 'TikTok', desc: 'Short-form content aligned with trend visibility.', icon: <Smartphone className="text-accent" />, img: 'images/tiktok.webp' },
                            { title: 'Facebook', desc: 'Visibility, engagement and content redirection.', icon: <MonitorPlay className="text-accent" />, img: 'images/facebook.webp' },
                            { title: 'Invitation', desc: 'Experiential event support extending the brand universe.', icon: <ExternalLink className="text-accent" />, img: 'images/invit.webp' }
                        ].map((mock, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <div className="w-full aspect-[9/16] bg-black dark:bg-white p-2 md:p-4 overflow-hidden mb-6 relative border border-black/10 dark:border-white/10 group-hover:border-accent transition-colors">
                                    <div className="absolute top-6 left-6 z-10 drop-shadow-md p-2 bg-black/50 dark:bg-white/90 backdrop-blur-md rounded-full shadow-xl">{mock.icon}</div>
                                    <img src={mock.img} alt={mock.title} className="w-full h-full object-cover transition-all duration-500" />
                                </div>
                                <span className="font-black text-2xl uppercase tracking-tighter mb-2">{mock.title}</span>
                                <span className="font-sans text-sm font-medium opacity-60 text-center px-4">{mock.desc}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 21. BRAND GUIDELINES (22, 23, 24, 25) */}
                <section className="py-32 px-6 md:px-12 border-b border-black/10 dark:border-white/10">
                    <div className="text-center mb-24 max-w-4xl mx-auto">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">21, 22, 23, 24, 25 — Identity</h3>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">Brand Guidelines</h2>
                        <p className="font-medium opacity-80 text-xl leading-relaxed">The second part of the project formalizes Aaliya through a complete graphic charter. It translates the strategic and narrative foundations of the brand into a coherent visual identity system that ensures consistency across all future applications.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1600px] mx-auto items-start">

                        {/* Logotype & Typography */}
                        <div className="bg-black/5 dark:bg-white/5 p-12 border border-black/10 dark:border-white/10 h-full">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-12">Logotype & Typography</h4>

                            <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-12">
                                <span className="font-bold text-xl uppercase tracking-tight mb-6 block">Logotype</span>
                                <p className="opacity-80 font-medium mb-8">The logo system is presented as a central identity element. The logotype gives Aaliya a refined, elegant and elevated visual presence. Its script style reinforces the sensory and premium character of the brand.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 border border-black/10 dark:border-white/10 p-4 aspect-video flex items-center justify-center group/img overflow-hidden">
                                        <img src="images/logotype1.png" alt="Logotype 1" className="w-full h-full object-contain transition-all duration-500 scale-90 group-hover/img:scale-100" />
                                    </div>
                                    <div className="bg-white/5 border border-black/10 dark:border-white/10 p-4 aspect-video flex items-center justify-center group/img overflow-hidden">
                                        <img src="images/logotype2.png" alt="Logotype 2" className="w-full h-full object-contain transition-all duration-500 scale-90 group-hover/img:scale-100" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-12 text-[#585242] dark:text-light">
                                <span className="font-bold text-xl uppercase tracking-tight mb-6 block">Logo</span>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="aspect-square bg-white/5 border border-black/10 dark:border-white/10 p-4 flex items-center justify-center group/img overflow-hidden">
                                        <img src="images/logo01.png" alt="Logo 01" className="w-full h-full object-contain transition-all duration-500" />
                                    </div>
                                    <div className="aspect-square bg-white/5 border border-black/10 dark:border-white/10 p-4 flex items-center justify-center group/img overflow-hidden">
                                        <img src="images/logo02.png" alt="Logo 02" className="w-full h-full object-contain transition-all duration-500" />
                                    </div>
                                    <div className="aspect-square bg-white/5 border border-black/10 dark:border-white/10 p-4 flex items-center justify-center group/img overflow-hidden">
                                        <img src="images/logo03.png" alt="Logo 03" className="w-full h-full object-contain transition-all duration-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-12">
                                <span className="font-bold text-xl uppercase tracking-tight mb-4 block">Parfumerie Script</span>
                                <div className="text-4xl font-serif italic mb-4 opacity-80">Aa Bb Cc Dd Ee Ff Gg</div>
                                <p className="opacity-80 font-medium text-sm">Used for the signature dimension of the brand, conveying elegance, fluidity and sensuality.</p>
                            </div>

                            <div>
                                <span className="font-bold text-xl uppercase tracking-tight mb-4 block">Poppins</span>
                                <div className="text-4xl font-sans font-black uppercase tracking-tighter mb-4">AA BB CC DD EE</div>
                                <p className="opacity-80 font-medium text-sm">Used as a complementary typeface to ensure readability, hierarchy and modern balance within the visual system.</p>
                            </div>
                        </div>

                        {/* Color Palette */}
                        <div className="p-12 border border-black/10 dark:border-white/10 h-full flex flex-col">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-12">Color Palette</h4>
                            <div className="grid grid-cols-2 gap-6 mb-12 flex-1">
                                <div className="aspect-square bg-[#DBD6CB] p-6 flex flex-col justify-end text-[#585242] shadow-sm transform hover:scale-105 transition-transform border border-black/10">
                                    <span className="font-black uppercase text-2xl tracking-tight">Bone</span><span className="font-mono text-xs font-bold opacity-60">#DBD6CB</span>
                                </div>
                                <div className="aspect-square bg-[#C1B5A2] p-6 flex flex-col justify-end text-[#585242] shadow-sm transform hover:scale-105 transition-transform border border-black/10">
                                    <span className="font-black uppercase text-2xl tracking-tight">Taupe</span><span className="font-mono text-xs font-bold opacity-60">#C1B5A2</span>
                                </div>
                                <div className="aspect-square bg-[#835A42] p-6 flex flex-col justify-end text-white shadow-sm transform hover:scale-105 transition-transform border border-black/10">
                                    <span className="font-black uppercase text-2xl tracking-tight">Sand</span><span className="font-mono text-xs font-bold opacity-60">#835A42</span>
                                </div>
                                <div className="aspect-square bg-[#585242] p-6 flex flex-col justify-end text-white shadow-sm transform hover:scale-105 transition-transform border border-black/10">
                                    <span className="font-black uppercase text-2xl tracking-tight">Dark Wood</span><span className="font-mono text-xs font-bold opacity-60">#585242</span>
                                </div>
                            </div>
                            <p className="text-xl font-bold opacity-90 leading-relaxed text-center">These colors create a soft, premium and sensory atmosphere aligned with the world imagined for Aaliya.</p>
                        </div>
                    </div>
                </section>

                {/* 26, 27, 28. PHYSICAL IDENTITY & BRAND EXPERIENCE */}
                <section className="py-32 px-6 md:px-12 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                    <div className="text-center mb-24 max-w-4xl mx-auto">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">26, 27, 28 — Application</h3>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">Physical Identity</h2>
                        <p className="font-medium opacity-80 text-xl leading-relaxed">The Aaliya experience extends through refined physical touchpoints. From the delicate invitation envelope to the textured shopping bag and the architectural presence of our boutiques, every element is designed to embody the brand's commitment to elegance, ethics, and sensory excellence.</p>
                    </div>

                    <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Row 1 */}
                        <div className="md:col-span-8 bg-light dark:bg-dark p-6 border border-black/10 dark:border-white/10 shadow-xl group">
                            <div className="w-full aspect-video md:aspect-[2/1] overflow-hidden mb-6 relative">
                                <img src="images/enveloppe.webp" alt="Invitation Envelope" className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105" />
                            </div>
                            <h4 className="font-black text-2xl uppercase tracking-tighter">Event Invitation</h4>
                            <p className="font-sans text-sm font-medium opacity-60">Invitation Envelope Details</p>
                        </div>
                        <div className="md:col-span-4 bg-light dark:bg-dark p-6 border border-black/10 dark:border-white/10 shadow-xl group">
                            <div className="w-full aspect-square overflow-hidden mb-6 relative">
                                <img src="images/shoppingbag.png" alt="Shopping Bag" className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105" />
                            </div>
                            <h4 className="font-black text-2xl uppercase tracking-tighter">Shopping Bag</h4>
                            <p className="font-sans text-sm font-medium opacity-60">Craft Packaging</p>
                        </div>

                        {/* Row 2 */}
                        <div className="md:col-span-4 bg-light dark:bg-dark p-6 border border-black/10 dark:border-white/10 shadow-xl group">
                            <div className="w-full aspect-square overflow-hidden mb-6 relative">
                                <img src="images/box.png" alt="Perfume Box" className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105" />
                            </div>
                            <h4 className="font-black text-2xl uppercase tracking-tighter">The Box</h4>
                            <p className="font-sans text-sm font-medium opacity-60">Perfume Packaging</p>
                        </div>
                        <div className="md:col-span-4 bg-light dark:bg-dark p-6 border border-black/10 dark:border-white/10 shadow-xl group">
                            <div className="w-full aspect-square overflow-hidden mb-6 relative bg-black/5 dark:bg-white/5 p-4">
                                <img src="images/magasin1.png" alt="Boutique 1" className="w-full h-full object-contain transition-all duration-500 scale-100 group-hover:scale-105" />
                            </div>
                            <h4 className="font-black text-2xl uppercase tracking-tighter">Pop-up Store</h4>
                            <p className="font-sans text-sm font-medium opacity-60">Ephemeral Concept</p>
                        </div>
                        <div className="md:col-span-4 bg-light dark:bg-dark p-6 border border-black/10 dark:border-white/10 shadow-xl group">
                            <div className="w-full aspect-square overflow-hidden mb-6 relative">
                                <img src="images/magasin2.png" alt="Boutique 2" className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105" />
                            </div>
                            <h4 className="font-black text-2xl uppercase tracking-tighter">Signature Boutique</h4>
                            <p className="font-sans text-sm font-medium opacity-60">Architectural Elements</p>
                        </div>
                    </div>
                </section>

                {/* 28. FRAGRANCE VARIATIONS DETAILS */}
                <div className="max-w-[1600px] mx-auto border-t border-black/10 dark:border-white/10 pt-16 mt-16 pb-48">
                    <div className="text-center mb-32 max-w-4xl mx-auto">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">28 — Fragrance Variations</h3>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">The Collection</h2>
                        <p className="font-medium opacity-80 text-xl leading-relaxed">Four unique interpretations, one common soul. Each fragrance under the Aaliya brand represents a distinct sensory journey, crafted with the finest essential oils to deliver a long-lasting, alcohol-free experience.</p>
                    </div>

                    <div className="space-y-48">
                        {/* NO.1 Riviera */}
                        <div className="group">
                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                <span className="text-accent text-sm font-mono tracking-widest">01</span>
                                Aaliya Riviera
                            </h4>
                            <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden mb-12 border border-black/10 dark:border-white/10 shadow-2xl relative bg-black/5 dark:bg-white/5 p-8 md:p-12">
                                <img src="images/riv.png" alt="Aaliya Riviera" className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-medium">
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Top notes</span>
                                    <p className="text-xl opacity-90">Bergamot, Yuzu</p>
                                </div>
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Heart notes</span>
                                    <p className="text-xl opacity-90">Orange blossom, Jasmine</p>
                                </div>
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Base notes</span>
                                    <p className="text-xl opacity-90">Vetiver, White musk</p>
                                </div>
                            </div>
                        </div>

                        {/* NO.2 Serenità */}
                        <div className="group">
                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                <span className="text-accent text-sm font-mono tracking-widest">02</span>
                                Aaliya Serenità
                            </h4>
                            <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden mb-12 border border-black/10 dark:border-white/10 shadow-2xl relative bg-black/5 dark:bg-white/5 p-8 md:p-12">
                                <img src="images/ser.png" alt="Aaliya Serenità" className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-medium">
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Top notes</span>
                                    <p className="text-xl opacity-90">Bergamot, Pink pepper</p>
                                </div>
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Heart notes</span>
                                    <p className="text-xl opacity-90">Iris, Violet</p>
                                </div>
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Base notes</span>
                                    <p className="text-xl opacity-90">White musk, Vanilla</p>
                                </div>
                            </div>
                        </div>

                        {/* NO.3 Dolcezza */}
                        <div className="group">
                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                <span className="text-accent text-sm font-mono tracking-widest">03</span>
                                Aaliya Dolcezza
                            </h4>
                            <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden mb-12 border border-black/10 dark:border-white/10 shadow-2xl relative bg-black/5 dark:bg-white/5 p-8 md:p-12">
                                <img src="images/dol.png" alt="Aaliya Dolcezza" className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-medium">
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Top notes</span>
                                    <p className="text-xl opacity-90">Caramel, Almond</p>
                                </div>
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Heart notes</span>
                                    <p className="text-xl opacity-90">Vanilla, Cacao</p>
                                </div>
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Base notes</span>
                                    <p className="text-xl opacity-90">Patchouli, Amber</p>
                                </div>
                            </div>
                        </div>

                        {/* NO.4 Passione */}
                        <div className="group">
                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                <span className="text-accent text-sm font-mono tracking-widest">04</span>
                                Aaliya Passione
                            </h4>
                            <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden mb-12 border border-black/10 dark:border-white/10 shadow-2xl relative bg-black/5 dark:bg-white/5 p-8 md:p-12">
                                <img src="images/pas.png" alt="Aaliya Passione" className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-medium">
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Top notes</span>
                                    <p className="text-xl opacity-90">Bergamot, Saffron</p>
                                </div>
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Heart notes</span>
                                    <p className="text-xl opacity-90">Patchouli, Incense</p>
                                </div>
                                <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                    <span className="font-bold block text-accent text-xs uppercase tracking-widest mb-4">Base notes</span>
                                    <p className="text-xl opacity-90">Amber, Vanilla</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 29. CONCLUSION */}
                <section className="py-48 px-6 md:px-12 bg-black/5 dark:bg-white/5 border-y border-black/10 dark:border-white/10">
                    <div className="max-w-5xl mx-auto text-center">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-12">29 — Conclusion</h3>

                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-12 leading-[0.9]">
                            A Vision of <span className="text-accent italic">Authentic</span> Luxury.
                        </h2>

                        <p className="font-medium opacity-80 text-xl md:text-2xl leading-relaxed mb-16 max-w-4xl mx-auto">
                            The Aaliya project is built on a premium and distinctive vision, embodied through personalized alcohol-free creations made with high-quality essential oils. We aim to combine luxury, ethics and inclusivity, reflecting this strong identity through elegant and engaging communication.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {['Naturalness', 'Quality', 'Personalization', 'Well-being'].map((value) => (
                                <span key={value} className="px-8 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full font-black uppercase text-sm tracking-widest text-accent shadow-sm hover:bg-accent hover:text-black transition-all cursor-default">
                                    {value}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* NEXT PROJECT NAV */}
                <section
                    className="h-[50vh] md:h-[70vh] bg-accent flex flex-col justify-center items-center relative overflow-hidden group cursor-pointer text-black mt-0"
                    onMouseEnter={() => setCursorVariant('project')}
                    onMouseLeave={() => setCursorVariant('default')}
                    onClick={() => onNavigate(1)}
                >
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="font-mono text-xs uppercase tracking-widest mb-4 opacity-80 font-bold">Next Project</span>
                    <h2 className="text-[7vw] md:text-[5vw] font-black uppercase tracking-tighter relative z-10 group-hover:scale-110 transition-transform duration-700 text-center">
                        Return to Start
                    </h2>
                    <div className="absolute bottom-12 flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold border-b-2 border-black pb-1">
                        View Case <ArrowUpRight size={16} />
                    </div>
                </section>

            </div>
        </motion.div>
    );
};

export default AaliyaDetail;

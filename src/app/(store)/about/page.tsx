"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// --- DATA CONSTANTS ---

const CAPABILITIES = [
  "Increase sales",
  "Reach customers online 24/7",
  "Accept secure online payments",
  "Reduce manual processes",
  "Improve customer experience",
  "Build customer loyalty",
  "Generate repeat business",
  "Scale efficiently",
];

const CORE_VALUES = [
  { title: "Innovation", text: "We continuously develop creative technology solutions that solve real business problems." },
  { title: "Integrity", text: "We build long-term relationships through honesty, transparency, and professionalism." },
  { title: "Customer Success", text: "Our success is measured by the growth and success of our clients." },
  { title: "Excellence", text: "Every project is executed with attention to detail and commitment to quality." },
  { title: "Growth", text: "We are passionate about helping businesses grow through technology and innovation." },
  { title: "Continuous Improvement", text: "Technology evolves daily, and so do we — we constantly improve our systems and processes." },
];

const INDUSTRIES = [
  "Phones", "Electronics", "Furniture", "Foodstuff", "Fashion",
  "Beauty Products", "Cars", "Real Estate", "Professional Services",
];

const STORY_LOG = [
  {
    tag: "INIT",
    title: "One simple mission",
    text: "Visibyl Technologies was founded to help businesses grow through technology.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
  },
  {
    tag: "OBSERVE",
    title: "The problem",
    text: "Many businesses invested heavily in physical stores, rent, and inventory, yet struggled to attract customers and generate consistent sales.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
  },
  {
    tag: "DIAGNOSE",
    title: "The gap",
    text: "Most owners relied solely on walk-in customers or social media, without a sales system that worked around the clock.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
  {
    tag: "BUILD",
    title: "The solution",
    text: "We built systems that let businesses sell online 24 hours a day, receive payments securely, automate customer journeys, and offer flexible payment options that increase conversions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    tag: "TODAY",
    title: "Beyond websites",
    text: "Today we specialize in sales automation, e-commerce, Buy Now Pay Later, Save-to-Buy, subscription automation, affiliate marketing, digital marketing, and business consulting — all built toward one objective: helping businesses generate more revenue.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  },
];

// --- ANIMATION VARIANTS ---

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full overflow-hidden bg-slate-50">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[80vh] flex items-center pt-20 pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--v-blue)]/10 rounded-full blur-[100px] pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--v-green)]/10 rounded-full blur-[100px] pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-left"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-full mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--v-green)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--v-green)]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700 font-mono">ABOUT VISIBYL</span>
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 font-display tracking-tight leading-[1.05] mb-6">
              Building the digital infrastructure for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--v-blue)] to-blue-600">
                Africa&apos;s future.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
              We are an innovative technology agency dedicated to equipping individuals and businesses with the tools, systems, and platforms they need to thrive in the modern economy.
            </motion.p>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative"
          >
            <motion.div
              variants={fadeUpVariant}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/40 aspect-[4/5]"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Team collaborating on digital solutions"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </motion.div>

            {/* Floating stat chip overlapping the image */}
            <motion.div
              variants={fadeUpVariant}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 hidden sm:flex flex-col items-center text-center"
            >
              <span className="text-2xl font-extrabold text-slate-900 font-display mb-1">24/7</span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Support</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION & VISION SECTION ================= */}
      <section className="py-24 bg-white relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Vision Card */}
            <motion.div
              variants={fadeUpVariant}
              className="bg-white rounded-[2.5rem] p-10 sm:p-14 border border-slate-200/60 shadow-xl shadow-slate-200/30 relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] group-hover:bg-blue-100 transition-colors pointer-events-none" />
              <div className="w-16 h-16 bg-blue-50 text-[var(--v-blue)] rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-blue-100">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold font-display text-slate-900 mb-6 relative z-10">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg relative z-10">
                To become Africa&apos;s leading business technology company, empowering millions of businesses with innovative digital solutions that simplify operations, increase sales, and create sustainable growth.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={fadeUpVariant}
              className="bg-white rounded-[2.5rem] p-10 sm:p-14 border border-slate-200/60 shadow-xl shadow-slate-200/30 relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[80px] group-hover:bg-emerald-100 transition-colors pointer-events-none" />
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-emerald-100">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.671zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold font-display text-slate-900 mb-6 relative z-10">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg relative z-10">
                To help businesses leverage technology to reach more customers, automate sales, improve customer experience, and maximize profitability through innovative, affordable, and scalable digital solutions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR STORY (TIMELINE) ================= */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center sm:text-left"
          >
            <span className="text-xs font-mono font-bold text-[var(--v-blue)] tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
              How the system came together
            </h2>
          </motion.div>

          <div ref={storyRef} className="relative pl-6 sm:pl-10">
            {/* Background Line */}
            <div className="absolute left-[11px] sm:left-[23px] top-4 bottom-4 w-[2px] bg-slate-200 rounded-full overflow-hidden">
              {/* Animated Progress Line */}
              <motion.div 
                className="w-full bg-gradient-to-b from-[var(--v-blue)] to-[var(--v-green)]"
                style={{ height: lineHeight }}
              />
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-16"
            >
              {STORY_LOG.map((entry) => (
                <motion.div key={entry.tag} variants={fadeUpVariant} className="relative">
                  {/* Timeline Dot */}
                  <span className="absolute -left-9 sm:-left-11 top-1.5 h-5 w-5 rounded-full bg-white border-[4px] border-[var(--v-blue)] shadow-sm z-10" />
                  
                  <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={entry.image}
                        alt={entry.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-[10px] sm:text-xs font-mono font-bold text-slate-600 tracking-wider rounded-lg mb-3">
                      {entry.tag}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-3">{entry.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{entry.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CAPABILITIES (DARK SECTION) ================= */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--v-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
              System Capabilities
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 tracking-tight">
              Built to help businesses
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 font-mono text-sm sm:text-base max-w-4xl mx-auto"
          >
            {CAPABILITIES.map((item) => (
              <motion.div
                key={item}
                variants={fadeUpVariant}
                className="flex items-center gap-4 py-4 border-b border-slate-800"
              >
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-xs font-mono font-bold text-[var(--v-blue)] tracking-widest uppercase">
              Core Values
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
              What runs underneath everything we build
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {CORE_VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUpVariant}
                className="group relative rounded-3xl border border-slate-100 bg-slate-50/50 p-8 sm:p-10 transition-all duration-300 hover:bg-white hover:border-[var(--v-blue)]/30 hover:shadow-xl hover:shadow-[var(--v-blue)]/5 hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  <span className="h-3 w-3 rounded-full bg-[var(--v-blue)] group-hover:scale-150 transition-transform duration-300" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= INDUSTRIES MARQUEE ================= */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center">
          <span className="text-xs font-mono font-bold text-[var(--v-blue)] tracking-widest uppercase">
            Who We Serve
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mt-4 tracking-tight">
            Technology tailored to your business
          </h2>
        </div>

        {/* Marquee Wrapper with Fade Edges */}
        <div className="relative w-full [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-4 mb-4 w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((item, i) => (
              <div key={`row1-${i}`} className="flex-shrink-0 px-6 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <div className="flex gap-4 w-max animate-[marqueeRev_35s_linear_infinite] hover:[animation-play-state:paused]">
            {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].reverse().map((item, i) => (
              <div key={`row2-${i}`} className="flex-shrink-0 px-6 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
          @keyframes marqueeRev { from { transform: translateX(-33.33%); } to { transform: translateX(0); } }
        `}</style>
      </section>

    </div>
  );
}
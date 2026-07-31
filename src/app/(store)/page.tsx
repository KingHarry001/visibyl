"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// --- Hero Slideshow Data ---
const HERO_SLIDES = [
  {
    tag: "Sales Automation",
    title: "Grow Your Business With",
    highlight: "Powerful Sales Automation",
    description: "We build websites, sales automation systems, e-commerce platforms, and digital solutions that help businesses sell more and operate more efficiently.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
  },
  {
    tag: "E-Commerce",
    title: "Launch a Store That",
    highlight: "Sells While You Sleep",
    description: "Custom, high-converting online stores optimized for speed, SEO, and effortless inventory management — built to convert visitors into customers 24/7.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80",
  },
  {
    tag: "Buy Now Pay Later",
    title: "Lower Buying Barriers With",
    highlight: "Flexible Payment Options",
    description: "Integrate flexible payment infrastructures like Buy Now Pay Later to reduce cart abandonment and skyrocket your conversion rates.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
  },
  {
    tag: "Digital Marketing",
    title: "Reach More Customers With",
    highlight: "Data-Driven Marketing",
    description: "From video advertising to social media management, we run data-driven campaigns that increase your visibility, traffic, and overall ROI.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1600&q=80",
  },
  {
    tag: "Business Consulting",
    title: "Scale Smarter With",
    highlight: "Strategic Consulting",
    description: "Get strategic guidance to refine your operations, adopt the right tech stack, and scale your profits with confidence.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
  },
];

// --- Service Data & Content ---
const SERVICES = [
  {
    title: "Static Websites",
    description: "Fast, secure, and ultra-responsive websites designed to establish a powerful online presence.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: "Sales Automation",
    description: "Streamline your sales pipeline and close deals automatically with intelligent, triggers-based workflows.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Buy Now Pay Later",
    description: "Integrate flexible payment infrastructures to lower buying barriers and skyrocket conversion rates.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    title: "Save to Buy Automation",
    description: "Empower your customers to save up for high-ticket items directly within your ecosystem.",
    image: "https://images.unsplash.com/photo-1628282928695-29aaa1536c11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlnZ3liYW5rfGVufDB8fDB8fHww?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: "E-Commerce",
    description: "Custom, high-converting online stores optimized for speed, SEO, and effortless inventory management.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    title: "Business Consulting",
    description: "Strategic guidance to refine your operations, adopt the right tech stack, and scale your profits.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Social Media Management",
    description: "Build an authoritative brand voice and engage your target audience consistently across all platforms.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "CAC Registration",
    description: "Fast, hassle-free Corporate Affairs Commission business registration and compliance management.",
    image: "/cac.jpeg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Video Advertising",
    description: "High-converting video creatives that capture immediate attention and drive actionable results.",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 6.75v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Digital Marketing",
    description: "Data-driven advertising campaigns to increase your visibility, traffic, and overall ROI.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M1200 13.5l-3 3m0 0l-3-3m3 3V10.5m0 10.5H7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.671z" />
      </svg>
    ),
  },
];

// --- Animation Variants ---
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) => setActive(index);
  const goPrev = () => setActive((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const goNext = () => setActive((prev) => (prev + 1) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[active];

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Image Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.tag}
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--v-blue)]/20 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2 z-10" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--v-green)]/10 rounded-full blur-[120px] pointer-events-none transform translate-y-1/4 z-10" 
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center py-20">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--v-green)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--v-green)]"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/90 font-mono">Visibyl Technologies</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-[var(--v-green)] font-mono">
              {slide.tag}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white font-display tracking-tight leading-[1.1] mb-8">
              {slide.title} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--v-blue)] to-blue-400">
                {slide.highlight}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/2349055977663?text=Hello%20Visibyl%20Technologies,%20I%20would%20like%20to%20get%20started."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[var(--v-blue)] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-[var(--v-blue)]/25 hover:-translate-y-1"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="https://wa.me/2349055977663?text=Hello%20Visibyl%20Technologies,%20I%20need%20to%20talk%20to%20an%20expert."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 font-semibold px-8 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
          >
            Talk to an Expert
          </a>
        </motion.div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white items-center justify-center hover:bg-white/20 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white items-center justify-center hover:bg-white/20 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.tag}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.tag}`}
            className="group relative py-2"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === active ? "w-8 h-2 bg-[var(--v-blue)]" : "w-2 h-2 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<"smartpay" | "academy" | null>(null);

  // Lock body scroll when modal is open
  if (typeof window !== "undefined") {
    document.body.style.overflow = activeModal ? "hidden" : "unset";
  }

  return (
    <div className="w-full overflow-hidden">
      
      {/* ================= HERO SLIDESHOW ================= */}
      <HeroSlideshow />

      {/* ================= OUR SERVICES SECTION ================= */}
      <section className="py-24 bg-white relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <h2 className="text-xs font-bold text-[var(--v-blue)] uppercase tracking-widest font-mono mb-4">Our Services</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-display tracking-tight">
              Everything you need to scale
            </h3>
            <p className="mt-5 text-lg text-slate-500">
              From initial company registration to fully automated checkout flows, we provide end-to-end digital infrastructure for modern businesses.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {SERVICES.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeUpVariant}
                className="group relative bg-slate-50/60 rounded-3xl border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 cursor-default overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                </div>

                <div className="absolute inset-0 top-44 bg-gradient-to-br from-[var(--v-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 p-8 pt-0">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 text-[var(--v-blue)] flex items-center justify-center mb-6 -mt-7 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[var(--v-blue)] group-hover:text-white">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 font-display">
                    {service.title}
                  </h4>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= EXPLORE OUR ECOSYSTEM SECTION ================= */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-200/60 overflow-hidden">
        {/* Subtle Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--v-blue)]/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--v-green)]/5 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-xs font-bold text-[var(--v-blue)] uppercase tracking-widest font-mono mb-4">Explore Our Ecosystem</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight">
              Products of Visibyl Technologies
            </h3>
            <p className="mt-5 text-slate-500">
              We are expanding our ecosystem with specialized platforms built to empower individuals and businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visibyl SmartPay Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-[var(--v-blue)]/10 transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Branded SmartPay Banner (custom graphic, not stock photo) */}
              <div className="relative w-full h-48 bg-gradient-to-br from-[var(--v-blue)] via-blue-700 to-slate-900 overflow-hidden">
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[var(--v-green)]/20 blur-2xl" />

                <div className="absolute right-6 bottom-6 w-28 h-18 sm:w-32 sm:h-20 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm rotate-6 group-hover:rotate-3 transition-transform duration-500">
                  <div className="w-8 h-6 rounded-md bg-white/20 m-3" />
                  <div className="w-16 h-1.5 rounded-full bg-white/25 mx-3 mb-1.5" />
                  <div className="w-10 h-1.5 rounded-full bg-white/20 mx-3" />
                </div>

                <div className="absolute left-6 bottom-7 w-28 h-18 sm:w-32 sm:h-20 rounded-xl bg-white/90 shadow-lg -rotate-6 group-hover:-rotate-3 transition-transform duration-500">
                  <div className="w-8 h-6 rounded-md bg-[var(--v-blue)]/80 m-3" />
                  <div className="w-16 h-1.5 rounded-full bg-slate-200 mx-3 mb-1.5" />
                  <div className="w-10 h-1.5 rounded-full bg-slate-200 mx-3" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center pl-8 pr-40 sm:pr-48">
                  <span className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest mb-1">Introducing</span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                    Visibyl<br />SmartPay
                  </h4>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-slate-900 font-display mb-4">Visibyl SmartPay</h4>
                <p className="text-slate-500 leading-relaxed flex-grow mb-10">
                  A modern online marketplace that allows customers to shop with flexible payment options. Users will be able to Buy Now, Pay Later, Save-to-Buy, join digital Osusu groups, and shop from multiple vendors—all in one place.
                </p>
                <button 
                  onClick={() => setActiveModal("smartpay")}
                  className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 hover:bg-[var(--v-blue)] group-hover:-translate-y-1"
                >
                  Explore SmartPay
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>

            {/* Visibyl Tech Academy Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-[var(--v-green)]/10 transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80"
                  alt="Visibyl Tech Academy online learning"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
              <div className="p-8 sm:p-10 pt-6 flex flex-col flex-grow">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 -mt-16 relative z-10 border-4 border-white shadow-sm">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 font-display mb-4">Visibyl Tech Academy</h4>
                <p className="text-slate-500 leading-relaxed flex-grow mb-10">
                  An online learning platform where students can acquire practical digital and technology skills through structured courses, hands-on projects, and professional training.
                </p>
                <button 
                  onClick={() => setActiveModal("academy")}
                  className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 hover:bg-emerald-600 group-hover:-translate-y-1"
                >
                  Join the Academy
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= COMING SOON MODAL (FULL SCREEN) ================= */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md cursor-pointer"
              onClick={() => setActiveModal(null)}
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-8 sm:p-12 text-center overflow-hidden"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {activeModal === "smartpay" ? (
                <>
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 text-[var(--v-blue)] flex items-center justify-center mb-8">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 font-display mb-4">Launching Soon</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Visibyl SmartPay is almost here. We're building a smarter way to shop online with flexible payment options, digital savings, and marketplace features designed for individuals and businesses.
                  </p>
                  <p className="text-sm font-bold text-[var(--v-blue)] uppercase tracking-widest font-mono">
                    Stay tuned for our official launch.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 font-display mb-4">Launching Soon</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Visibyl Tech Academy is almost ready. Learn in-demand technology and digital skills from anywhere through our online learning platform.
                  </p>
                  <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest font-mono">
                    Registration will open soon.
                  </p>
                </>
              )}
              
              <div className={`absolute bottom-0 left-0 w-full h-2 ${activeModal === "smartpay" ? "bg-[var(--v-blue)]" : "bg-emerald-500"}`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
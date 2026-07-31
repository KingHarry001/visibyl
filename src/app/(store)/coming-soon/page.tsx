"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ComingSoonPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-slate-50 px-4 py-20">
      
      {/* Abstract Background Elements */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--v-blue)]/5 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--v-green)]/5 rounded-full blur-3xl pointer-events-none transform translate-y-1/4" 
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        
        {/* Animated Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="w-24 h-24 mx-auto rounded-[2rem] bg-white border border-slate-200/60 shadow-xl shadow-slate-200 flex items-center justify-center mb-8"
        >
          <svg className="w-10 h-10 text-[var(--v-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </motion.div>

        {/* Content */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 font-display tracking-tight mb-6"
        >
          Something big is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--v-blue)] to-blue-600">coming soon.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-600 mb-10 leading-relaxed"
        >
          We are working hard behind the scenes to bring you a revolutionary new platform. Stay tuned for our official launch!
        </motion.p>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-[var(--v-blue)] hover:shadow-lg hover:shadow-[var(--v-blue)]/25 hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Return to Homepage
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
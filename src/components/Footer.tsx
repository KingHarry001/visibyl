"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

// --- Animation Variants ---
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden mt-20 sm:mt-32 border-t border-slate-800">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--v-blue)]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--v-green)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10"
        >
          {/* Brand Column */}
          <motion.div
            variants={fadeUpVariant}
            className="md:col-span-4 flex flex-col items-start"
          >
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="relative w-auto transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Visibyl Technologies"
                  width={220}
                  height={220}
                  className="h-auto sm:h-auto w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-8">
              Transforming businesses globally through cutting-edge technology,
              hyper-efficient automation, and robust enterprise innovation.
            </p>

            <a
              href="https://wa.me/2349055977663?text=Hello%20Visibyl%20Technologies,%20I%20would%20like%20to%20get%20started."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-white/5 border border-white/10 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 hover:bg-[var(--v-blue)] hover:border-transparent hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--v-blue)]/25"
            >
              <span>Get started today</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </motion.div>

          {/* Navigation Columns */}
          <motion.div
            variants={fadeUpVariant}
            className="md:col-span-5 grid grid-cols-2 gap-8"
          >
            <FooterColumn
              title="Ecosystem"
              links={[
                { label: "Visibyl SmartPay", href: "/coming-soon" },
                { label: "Tech Academy", href: "/coming-soon" },
              ]}
            />
            <FooterColumn
              title="Company"
              links={[
                { label: "About Us", href: "/about" },
                { label: "Contact Support", href: "/contact" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ]}
            />
          </motion.div>

          {/* Contact Information Column with Icons */}
          <motion.div variants={fadeUpVariant} className="md:col-span-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--v-green)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--v-green)]"></span>
              </span>
              Direct Contact
            </h3>
            <ul className="space-y-5 text-sm text-slate-400 font-mono">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--v-blue)] group-hover:bg-[var(--v-blue)] group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href="mailto:contact@visibyl.biz"
                  className="hover:text-white transition-colors duration-300"
                >
                  contact@visibyl.biz
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--v-blue)] group-hover:bg-[var(--v-blue)] group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a
                  href="tel:+2348082480505"
                  className="hover:text-white transition-colors duration-300"
                >
                  +234 808 248 0505
                </a>
              </li>

              {/* Official WhatsApp Icon */}
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.299 1.262.478 1.694.611.712.22 1.36.189 1.871.114.576-.084 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <a
                  href="https://wa.me/2349055977663?text=Hello%20Visibyl%20Technologies,%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                >
                  <span>+234 905 597 7663</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-0.5">
                    Available on WhatsApp
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono"
        >
          <p>
            © {new Date().getFullYear()} Visibyl Technologies Ltd. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

// --- Helper Component ---
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-6">
        {title}
      </h3>
      <ul className="space-y-4 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group relative text-slate-400 hover:text-white transition-colors duration-300 inline-block"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--v-blue)] transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

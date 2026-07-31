"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Added an `isDesktopOnly` flag to cleanly hide the text versions from the mobile menu
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/coming-soon", label: "Shop on our marketplace", badge: "New", isDesktopOnly: true },
  { href: "/coming-soon", label: "Join our academy", isDesktopOnly: true },
];

export default function Navbar() {
  const router = useRouter();
  
  // UI States
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Auth States
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  // Handle Scroll styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus on navigation
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Outside click handler
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (mobileOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
      if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mobileOpen, userMenuOpen]);

  // Escape key handler
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false);
          toggleRef.current?.focus();
        }
        if (userMenuOpen) {
          setUserMenuOpen(false);
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, userMenuOpen]);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    router.refresh();
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/coming-soon") return false; // Prevent coming soon links from being "active"
    return pathname === href || (pathname?.startsWith(href + "/") && href !== "/");
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3"
          : "bg-white border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-9 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Visibyl Technologies"
              width={220}
              height={70}
              className="h-9 sm:h-10 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active
                    ? "text-slate-900 bg-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {link.label}
                {link.badge && !active && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-[var(--v-blue)] text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mobile Marketplace Icon Button (Hidden on Desktop) */}
          <Link
            href="/coming-soon"
            className="md:hidden relative p-2 rounded-xl border border-slate-200/80 bg-white hover:bg-[var(--v-blue)]/5 text-slate-700 hover:text-[var(--v-blue)] transition-all duration-200 group shadow-2xs"
            aria-label="Shop on our Marketplace"
            title="Shop on our Marketplace"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
            </svg>
          </Link>

          {/* Mobile Academy Icon Button (Hidden on Desktop) */}
          <Link
            href="/coming-soon"
            className="md:hidden relative p-2 rounded-xl border border-slate-200/80 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 transition-all duration-200 group shadow-2xs"
            aria-label="Join our Academy"
            title="Join our Academy"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </Link>

          {/* Desktop Auth State */}
          <div className="hidden sm:flex items-center gap-3">
            {authLoading ? (
              <div className="w-20 h-10 bg-slate-100 animate-pulse rounded-xl" />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden transition-all duration-200 origin-top-right ${
                    userMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-xs font-semibold text-slate-900 truncate">Account</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-mono">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left mt-1"
                    >
                      <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/staff-login"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2.5 rounded-xl transition-colors"
                >
                  Staff Login
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:bg-[var(--v-blue)] hover:shadow-lg hover:shadow-[var(--v-blue)]/25"
                >
                  Log In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={toggleRef}
            type="button"
            id="mobile-menu-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center gap-1.5 text-slate-800 transition-colors hover:bg-slate-100"
          >
            <span
              className="block h-0.5 w-5 bg-slate-800 rounded-full transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "translateY(4px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-0.5 w-5 bg-slate-800 rounded-full transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "translateY(-4px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      <div
        id="mobile-menu-panel"
        role="menu"
        aria-hidden={!mobileOpen}
        aria-labelledby="mobile-menu-toggle"
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-3">
          {NAV_LINKS.filter((link) => !link.isDesktopOnly).map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              ref={i === 0 ? firstMobileLinkRef : undefined}
              role="menuitem"
              tabIndex={mobileOpen ? 0 : -1}
              className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between ${
                isActive(link.href)
                  ? "bg-[var(--v-blue)]/10 text-[var(--v-blue)]"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{link.label}</span>
            </Link>
          ))}
          
          <div className="pt-4 mt-2 border-t border-slate-100">
            {authLoading ? (
              <div className="w-full h-12 bg-slate-100 animate-pulse rounded-xl" />
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-900">Signed in as</p>
                    <p className="text-xs text-slate-500 font-mono truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold bg-red-50 text-red-600 px-4 py-3.5 rounded-xl text-center"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  role="menuitem"
                  tabIndex={mobileOpen ? 0 : -1}
                  className="w-full inline-flex items-center justify-center text-sm font-semibold bg-slate-900 text-white px-4 py-3.5 rounded-xl text-center shadow-md shadow-slate-900/10"
                >
                  Log In
                </Link>
                <Link
                  href="/staff-login"
                  role="menuitem"
                  tabIndex={mobileOpen ? 0 : -1}
                  className="w-full inline-flex items-center justify-center text-sm font-medium text-slate-500 px-4 py-3 rounded-xl text-center hover:bg-slate-50 hover:text-slate-800"
                >
                  Staff Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  // Close sidebar on mobile when navigating
  useEffect(() => setSidebarOpen(false), [pathname]);

  // Fetch admin email for the bottom of the sidebar
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email ?? null);
    });
  }, [supabase]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--v-blue)] flex items-center justify-center text-white font-bold text-sm font-display shadow-lg shadow-[var(--v-blue)]/20">
              V
            </div>
            <span className="font-bold text-lg text-white font-display tracking-tight">Admin<span className="text-[var(--v-blue)]">Panel</span></span>
          </Link>
        </div>

        <nav className="p-4 space-y-1.5">
          <SidebarItem href="/admin" label="Dashboard" active={pathname === "/admin"} />
          <SidebarItem href="/admin/products" label="Products" active={pathname.includes("/admin/products")} />
          <SidebarItem href="/admin/orders" label="Orders" active={pathname.includes("/admin/orders")} />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              U
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{userEmail || "Loading..."}</p>
              <p className="text-xs text-slate-500 font-mono">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex-1 flex justify-end items-center gap-4">
            <Link href="/" className="text-sm font-medium text-[var(--v-blue)] hover:underline">
              Exit to Store &rarr;
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
        active 
          ? "bg-[var(--v-blue)] text-white shadow-md shadow-[var(--v-blue)]/20" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
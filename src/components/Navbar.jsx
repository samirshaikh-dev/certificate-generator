import React from "react";
import Link from "next/link";
import { Award, ShieldCheck, LayoutDashboard, PlusCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="no-print sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1e3a5f] to-[#0f172a] flex items-center justify-center text-amber-300 shadow-sm group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="font-cinzel font-bold text-slate-900 text-sm tracking-wider uppercase block">
              Apex Academy
            </span>
            <span className="text-[10px] text-amber-700 font-semibold tracking-widest uppercase block -mt-1">
              Credential System
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/verify"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verify Credential</span>
          </Link>

          <Link
            href="/admin/certificates"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Admin</span> Dashboard
          </Link>

        </nav>
      </div>
    </header>
  );
}

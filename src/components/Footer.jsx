import React from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="no-print relative bg-slate-950 text-slate-400 border-t border-slate-800/80 overflow-hidden">
      {/* Subtle top gold accent glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/60">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5 font-bold" />
              </div>
              <div>
                <span className="font-cinzel font-bold text-white text-base tracking-wider uppercase block">
                  Apex Academy
                </span>
                <span className="text-[10px] text-amber-400 font-semibold tracking-widest uppercase block -mt-0.5">
                  Credential Engine
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Distinguished credential infrastructure providing cryptographically verifiable certificates of completion with high-resolution cloud asset storage and instant validation.
            </p>

            {/* Operational Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-emerald-400 text-[11px] font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Credential Network: Operational</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-cinzel font-bold text-white text-xs uppercase tracking-widest mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/verify"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Verify Credential</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/certificates"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Admin Dashboard</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/certificates/create"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Issue New Certificate</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Live Showcase</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* System Architecture */}
          <div>
            <h3 className="font-cinzel font-bold text-white text-xs uppercase tracking-widest mb-4">
              Architecture
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Next.js 16 App Router</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>MongoDB Persistence</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Cloudinary Asset CDN</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Vector-Grade PDF Output</span>
              </li>
            </ul>
          </div>

          {/* Security & Verification */}
          <div>
            <h3 className="font-cinzel font-bold text-white text-xs uppercase tracking-widest mb-4">
              Trust & Integrity
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Unique Certificate IDs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Instant Public Lookup</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
                <span>High-Fidelity Watermarks</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>A4 Standard Geometry</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Apex Academy Credential Engine. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Secured with 256-bit hash validation</span>
            <span className="h-3 w-px bg-slate-800" />
            <span className="text-amber-400/90 font-medium">Apex Academy Enterprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

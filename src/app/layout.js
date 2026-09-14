import "./globals.css";
import Link from "next/link";
import { Award, ShieldCheck, PlusCircle, LayoutDashboard } from "lucide-react";
import { Cinzel, Playfair_Display, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontCinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const fontSignature = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

export const metadata = {
  title: "Apex Certificates | Verification & Generation Platform",
  description: "Enterprise certificate generation and public verification system powered by Next.js, MongoDB, and Cloudinary.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${fontSans.variable} ${fontCinzel.variable} ${fontPlayfair.variable} ${fontSignature.variable}`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {/* Navigation Bar (hidden on print) */}
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

              <Link
                href="/admin/certificates/create"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1e3a5f] hover:bg-[#152a45] text-white text-xs font-semibold transition-all shadow-xs active:scale-98"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Issue Certificate</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Footer (hidden on print) */}
        <footer className="no-print bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Apex Academy Credential Engine. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/verify" className="hover:text-slate-800 transition-colors">
                Verification Portal
              </Link>
              <Link href="/admin/certificates" className="hover:text-slate-800 transition-colors">
                Admin Console
              </Link>
              <Link href="/admin/certificates/create" className="hover:text-slate-800 transition-colors">
                Issue Certificate
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

import React from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Printer,
  Sparkles,
  ArrowRight,
  Database,
  Cloud,
  FileCheck,
} from "lucide-react";
import CertificateTemplate from "@/components/CertificateTemplate";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-blue-100/40 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Next.js 16 • MongoDB • Cloudinary</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-cinzel text-slate-950 max-w-4xl mx-auto leading-tight">
            Distinguished Certificate Generation & Verification
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
            Issue cryptographically verifiable, high-resolution certificates of completion with dynamic fields, cloud asset integration, and instant PDF downloads.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/admin/certificates/create"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1e3a5f] hover:bg-[#152a45] text-white font-medium text-sm transition-all shadow-lg active:scale-98"
            >
              <span>Issue New Certificate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/verify"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm transition-all shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verify a Certificate</span>
            </Link>

            <Link
              href="/admin/certificates"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-all"
            >
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Live Certificate Demo Showcase */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Authentic Certificate Showcase Preview
            </span>
          </div>

          <div className="bg-slate-900/5 rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl overflow-x-auto flex justify-center">
            <div className="transform scale-[0.6] sm:scale-[0.8] lg:scale-95 origin-top transition-all duration-300 my-[-80px] sm:my-[-30px] lg:my-0">
              <CertificateTemplate
                id="homepage-demo-certificate"
                studentName="Sarah Jenkins"
                courseName="Advanced Full-Stack Engineering & Next.js Systems"
                completionDate="2026-09-14"
                certificateId="UC-c12fca53-ef2a-493b-8431-a8d501dd73a0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-cinzel text-slate-900">
              Enterprise-Grade Certificate Engine
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Engineered with clean architectural separation and reliable cloud storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-cinzel mb-2">
                MongoDB Persistence
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unique auto-generated Certificate IDs, student records, timestamps, and course details are securely indexed and stored in MongoDB.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-cinzel mb-2">
                Cloudinary Asset Integration
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Seamlessly host high-resolution organizational seals, instructor signatures, watermarks, and background textures on Cloudinary.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-cinzel mb-2">
                Print & Vector-Grade PDF
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Single-click client-side PDF export and dedicated print stylesheet tailored precisely to standard A4 landscape proportions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#1e3a5f] to-[#0f172a] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
              Public Credential Authenticator
            </span>
            <h3 className="text-2xl font-bold font-cinzel mt-1">
              Have a certificate to authenticate?
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-md">
              Employers and institutions can immediately verify any credential issued by this platform.
            </p>
          </div>
          <Link
            href="/verify"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm transition-all shadow-md active:scale-98"
          >
            Verify Credential Now
          </Link>
        </div>
      </section>
    </div>
  );
}

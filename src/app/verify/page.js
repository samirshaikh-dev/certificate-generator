"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Search, ArrowRight, Award } from "lucide-react";
import Link from "next/link";

export default function VerifySearchPage() {
  const [certId, setCertId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = (e) => {
    e.preventDefault();
    const trimmed = certId.trim();
    if (!trimmed) {
      setError("Please enter a valid certificate ID");
      return;
    }
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Header Icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#1e3a5f] to-[#0f172a] text-amber-300 flex items-center justify-center mx-auto shadow-xl border border-amber-300/30">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Credential Authenticator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-cinzel mt-4">
            Verify Certificate
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto">
            Enter the unique Certificate ID located at the bottom of the document to authenticate credentials.
          </p>
        </div>

        {/* Verification Input Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label
                htmlFor="certificateId"
                className="block text-left text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Certificate ID
              </label>
              <div className="relative">
                <input
                  id="certificateId"
                  type="text"
                  value={certId}
                  onChange={(e) => {
                    setCertId(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g. UC-c12fca53-ef2a-493b-8431-a8d501dd73a0"
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] text-slate-800 placeholder-slate-400 font-mono text-xs sm:text-sm shadow-inner transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-[#1e3a5f] hover:bg-[#152a45] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-600 mt-2 text-left">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#1e3a5f] to-[#0f172a] hover:from-[#152a45] hover:to-[#09101d] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Authenticate Credential</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Secured via cryptographic hash and database verification</span>
          </div>
        </div>

        <div>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

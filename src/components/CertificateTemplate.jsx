"use client";

import React from "react";
import {
  ACADEMY_INFO,
  SIGNATORY_INFO,
  CERTIFICATE_DEFAULTS,
} from "@/constants/certificate-constant";
import { formatDate } from "@/utils/date";

export default function CertificateTemplate({
  studentName = CERTIFICATE_DEFAULTS.defaultStudentName,
  courseName = CERTIFICATE_DEFAULTS.defaultCourseName,
  completionDate = new Date(),
  certificateId = CERTIFICATE_DEFAULTS.defaultCertificateId,
  assets = {},
  id = "certificate-to-print",
}) {
  const formattedDate = formatDate(completionDate, {
    fallback: "September 14, 2026",
  });

  return (
    <div className="w-full flex justify-center items-center py-2 overflow-x-auto">
      {/* Outer Certificate Frame Container (fixed 1000px x 707px aspect-ratio for standard A4 landscape 1.414:1) */}
      <div
        id={id}
        className="relative w-[1000px] h-[707px] min-w-[1000px] min-h-[707px] bg-[#fcfbf9] text-[#1e293b] p-8 select-none shadow-2xl rounded-sm border border-amber-200/60 overflow-hidden flex flex-col justify-between"
        style={{
          boxSizing: "border-box",
          backgroundImage: assets?.backgroundUrl
            ? `url(${assets.backgroundUrl})`
            : "radial-gradient(#e5e7eb 0.75px, transparent 0.75px), radial-gradient(#e5e7eb 0.75px, #fcfbf9 0.75px)",
          backgroundSize: assets?.backgroundUrl ? "cover" : "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      >
        {/* Intricate Decorative Multi-Border */}
        <div className="absolute inset-3 border-2 border-[#1e3a5f] pointer-events-none" />
        <div className="absolute inset-4 border border-[#c59b27] pointer-events-none" />
        <div className="absolute inset-5 border-2 border-[#1e3a5f]/20 pointer-events-none" />

        {/* Ornamental Vintage Corner Accents (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#c59b27] pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#c59b27] pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#c59b27] pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#c59b27] pointer-events-none" />

        {/* Inner Content Area */}
        <div className="relative z-10 flex flex-col h-full justify-between items-center text-center px-12 py-4">
          {/* Header Section: Logo & Academy Monogram */}
          <div className="flex flex-col items-center mt-2">
            {assets?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={assets.logoUrl}
                alt="Academy Logo"
                className="h-16 w-auto object-contain mb-2"
              />
            ) : (
              <div className="flex flex-col items-center mb-1 text-center">
                <span className="block font-cinzel font-bold text-[#1e3a5f] text-sm tracking-[0.25em] uppercase">
                  {ACADEMY_INFO.name}
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-amber-700 font-semibold uppercase">
                  {ACADEMY_INFO.tagline}
                </span>
              </div>
            )}

            {/* Certificate Title */}
            <div className="mt-4">
              <h1 className="font-cinzel text-4xl font-extrabold tracking-[0.18em] text-[#0f172a] uppercase drop-shadow-xs">
                {CERTIFICATE_DEFAULTS.title}
              </h1>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-[1.5px] w-24 bg-gradient-to-r from-transparent via-[#c59b27] to-[#c59b27]" />
                <span className="text-[#c59b27] text-xs">◆</span>
                <div className="h-[1.5px] w-24 bg-gradient-to-l from-transparent via-[#c59b27] to-[#c59b27]" />
              </div>
            </div>
          </div>

          {/* Body Section: Recipient & Course Details */}
          <div className="my-auto py-2 w-full max-w-2xl flex flex-col items-center">
            <p className="font-playfair italic text-lg text-slate-600 mb-2">
              This certificate is proudly awarded to
            </p>

            {/* Student Name */}
            <div className="w-full relative px-6 py-1">
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold tracking-wider text-[#1e3a5f] border-b border-[#c59b27]/80 pb-2 inline-block max-w-full truncate">
                {studentName || "Recipient Name"}
              </h2>
            </div>

            <p className="font-playfair italic text-slate-600 mt-4 mb-2">
              for successfully completing the specialized training curriculum in
            </p>

            {/* Course Name */}
            <div className="px-6 py-1">
              <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0f172a] tracking-wide">
                {courseName || "Course Name"}
              </h3>
            </div>
          </div>

          {/* Footer Section: Signatures, Seal, Date, and ID */}
          <div className="w-full pt-4 border-t border-slate-200/80 flex items-end justify-between px-4">
            {/* Left: Date & Certificate ID */}
            <div className="text-left flex flex-col justify-end w-64">
              <div className="mb-3">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                  Completion Date
                </span>
                <span className="font-playfair font-semibold text-sm text-slate-800">
                  {formattedDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                  Certificate ID
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 select-all tracking-tight bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 inline-block">
                  {certificateId}
                </span>
              </div>
            </div>

            {/* Center: Optional Official Seal Image */}
            {assets?.sealUrl && (
              <div className="flex flex-col items-center justify-center -mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assets.sealUrl}
                  alt="Official Seal"
                  className="w-24 h-24 object-contain"
                />
              </div>
            )}

            {/* Right: Signature Line & Verification Note */}
            <div className="text-right flex flex-col items-end justify-end w-64">
              <div className="w-48 flex flex-col items-center">
                {assets?.signatureUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={assets.signatureUrl}
                    alt="Instructor Signature"
                    className="h-10 w-auto object-contain mb-1"
                  />
                ) : (
                  <div className="font-signature text-3xl text-[#1e3a5f] h-10 flex items-center select-none">
                    {SIGNATORY_INFO.signatureText}
                  </div>
                )}
                <div className="w-full border-t border-slate-700 my-1" />
                <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase font-cinzel">
                  {SIGNATORY_INFO.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {SIGNATORY_INFO.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

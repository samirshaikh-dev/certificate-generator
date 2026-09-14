"use client";

import React from "react";
import CertificateTemplate from "./CertificateTemplate";

export default function CertificatePreview({
  studentName,
  courseName,
  completionDate,
  certificateId = "UC-PREVIEW-DEMO-0000",
  assets = {},
}) {
  return (
    <div className="w-full bg-slate-900/5 rounded-xl border border-slate-200 p-4 overflow-hidden flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Real-Time Certificate Preview
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Template: Standard A4 Landscape
        </span>
      </div>

      {/* Render certificate inside a horizontally scrollable / scaled container */}
      <div className="w-full overflow-x-auto flex justify-center py-2">
        <div className="transform scale-[0.65] md:scale-[0.85] lg:scale-100 origin-top transition-transform duration-200 my-[-60px] md:my-[-30px] lg:my-0">
          <CertificateTemplate
            id="preview-certificate-canvas"
            studentName={studentName}
            courseName={courseName}
            completionDate={completionDate}
            certificateId={certificateId}
            assets={assets}
          />
        </div>
      </div>
    </div>
  );
}

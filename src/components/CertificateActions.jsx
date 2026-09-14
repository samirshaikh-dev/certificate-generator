"use client";

import React, { useState } from "react";
import { Printer, Download, Share2, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CertificateActions({
  certificateId,
  studentName = "Student",
  targetElementId = "certificate-to-print",
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined"
        ? `${window.location.origin}/certificate/${certificateId}`
        : `/certificate/${certificateId}`;
      
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setErrorMessage("Could not copy link to clipboard.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      setErrorMessage("");

      // Dynamic import to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById(targetElementId);
      if (!element) {
        throw new Error("Certificate element not found.");
      }

      // Render element onto high-DPI canvas
      const canvas = await html2canvas(element, {
        scale: 2, // 2x scale for sharp text and borders in PDF
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // Standard A4 landscape dimensions in mm: 297 x 210
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Fit image onto PDF page
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

      const sanitizedName = studentName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      pdf.save(`Certificate_${sanitizedName}_${certificateId}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setErrorMessage("Failed to generate PDF. You can also use the Print button to Save as PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="no-print w-full flex flex-col items-center gap-3 my-6">
      {errorMessage && (
        <div className="text-xs bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Print Button */}
        <button
          onClick={handlePrint}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          Print Certificate
        </button>

        {/* Download PDF Button */}
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1e3a5f] text-white font-medium text-sm hover:bg-[#162c47] transition-all shadow-sm active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Generating PDF..." : "Download PDF"}
        </button>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 font-medium text-sm hover:bg-amber-100 transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-amber-700" />
              <span>Copy Certificate Link</span>
            </>
          )}
        </button>

        {/* Verify Certificate Link */}
        <Link
          href={`/verify/${certificateId}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 font-medium text-sm hover:bg-emerald-100 transition-all shadow-xs"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verify Credential</span>
        </Link>
      </div>

      <p className="text-xs text-slate-500">
        PDF output is sized for A4 landscape and high-resolution printing & digital sharing.
      </p>
    </div>
  );
}

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Download,
  Printer,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Check,
  Share2,
  ArrowLeft,
  Award,
  Loader2,
} from "lucide-react";
import CertificateTemplate from "@/components/CertificateTemplate";
import { API_ENDPOINTS } from "@/constants/api-constant";
import { APP_ROUTES } from "@/constants/routes-constant";

function CertificatePreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idParam = searchParams.get("id") || searchParams.get("certificateId") || "";
  const studentNameParam = searchParams.get("studentName") || "";
  const courseNameParam = searchParams.get("courseName") || "";
  const completionDateParam = searchParams.get("completionDate") || "";

  const [loading, setLoading] = useState(Boolean(idParam));
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scale, setScale] = useState(0.85);

  const [certificateData, setCertificateData] = useState({
    certificateId: idParam || "UC-PREVIEW-DRAFT",
    studentName: studentNameParam || "Alex Morgan",
    courseName: courseNameParam || "Next.js Masterclass",
    completionDate: completionDateParam || new Date().toISOString().split("T")[0],
    assets: {},
  });

  // If an ID is provided, fetch latest certificate data from MongoDB API
  useEffect(() => {
    if (!idParam) {
      return;
    }

    let isMounted = true;
    async function fetchCert() {
      try {
        setLoading(true);
        const res = await fetch(API_ENDPOINTS.CERTIFICATE_BY_ID(idParam));
        const data = await res.json();
        if (data.success && isMounted) {
          setCertificateData({
            certificateId: data.certificateId,
            studentName: data.studentName,
            courseName: data.courseName,
            completionDate: data.completionDate,
            assets: data.assets || {},
          });
        }
      } catch (err) {
        console.error("Failed to load certificate:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCert();

    return () => {
      isMounted = false;
    };
  }, [idParam]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      const publicUrl = `${window.location.origin}/certificate/${certificateData.certificateId}`;
      await navigator.clipboard.writeText(publicUrl);
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

      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("certificate-preview-canvas");
      if (!element) {
        throw new Error("Certificate element not found.");
      }

      // Capture at 2x scale for crisp print resolution
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // A4 landscape dimensions: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

      const safeName = (certificateData.studentName || "Student")
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      pdf.save(`Certificate_${safeName}_${certificateData.certificateId}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setErrorMessage("PDF generation encountered an error. You can also use Print to Save as PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Build Edit URL to navigate back to creation form with fields prefilled
  const editUrl = APP_ROUTES.ADMIN.CREATE_WITH_QUERY({
    id: certificateData.certificateId,
    studentName: certificateData.studentName || "",
    courseName: certificateData.courseName || "",
    completionDate: typeof certificateData.completionDate === "string" 
      ? certificateData.completionDate.split("T")[0]
      : new Date(certificateData.completionDate).toISOString().split("T")[0],
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#1e3a5f] animate-spin" />
          <p className="text-sm font-medium text-slate-600">Loading certificate preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 py-8 px-3 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-6">
        {/* Top Control Bar */}
        <div className="no-print bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <Link
              href="/admin/certificates"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1e3a5f] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Certificates List
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-cinzel">
                Certificate Preview
              </span>
            </div>
          </div>

          {/* Action Buttons: Edit Details, Download Certificate, Print, Share */}
          <div className="flex flex-wrap items-center justify-end gap-2.5 w-full md:w-auto">
            {/* Edit Details Button */}
            <Link
              href={editUrl}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm transition-all shadow-2xs active:scale-98"
            >
              <Edit3 className="w-4 h-4 text-slate-500" />
              <span>Edit Details</span>
            </Link>

            {/* Download Certificate PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#162c47] text-white font-medium text-xs sm:text-sm transition-all shadow-sm active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Generating PDF..." : "Download Certificate"}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm transition-all shadow-2xs cursor-pointer"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium text-xs sm:text-sm transition-all shadow-2xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>

            {/* Public Certificate Page Link */}
            {idParam && (
              <Link
                href={`/certificate/${certificateData.certificateId}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs sm:text-sm font-medium transition-colors"
                title="Open Public Certificate in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden md:inline">Public Page</span>
              </Link>
            )}
          </div>
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div className="no-print p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Certificate Display Area: Visually Centered with Preserved Aspect Ratio */}
        <div className="w-full flex flex-col items-center justify-center space-y-3">
          {/* Zoom and Scale Controls */}
          <div className="no-print flex items-center gap-2 self-end text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="font-medium text-slate-400">Scale:</span>
            <button
              type="button"
              onClick={() => setScale(0.6)}
              className={`px-2 py-0.5 rounded cursor-pointer ${scale === 0.6 ? "bg-[#1e3a5f] text-white font-bold" : "hover:bg-slate-100"}`}
            >
              60%
            </button>
            <button
              type="button"
              onClick={() => setScale(0.8)}
              className={`px-2 py-0.5 rounded cursor-pointer ${scale === 0.8 ? "bg-[#1e3a5f] text-white font-bold" : "hover:bg-slate-100"}`}
            >
              80%
            </button>
            <button
              type="button"
              onClick={() => setScale(1.0)}
              className={`px-2 py-0.5 rounded cursor-pointer ${scale === 1.0 ? "bg-[#1e3a5f] text-white font-bold" : "hover:bg-slate-100"}`}
            >
              100%
            </button>
          </div>

          <div className="w-full bg-white/50 backdrop-blur-xs p-2 sm:p-6 lg:p-8 rounded-3xl border border-slate-200/80 shadow-md flex justify-center items-center overflow-x-auto min-h-[500px]">
            {/* Maintain fixed A4 landscape 1.414:1 ratio scaled smoothly */}
            <div
              className="flex justify-center items-center transition-transform duration-200 origin-center"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
              }}
            >
              <CertificateTemplate
                id="certificate-preview-canvas"
                studentName={certificateData.studentName}
                courseName={certificateData.courseName}
                completionDate={certificateData.completionDate}
                certificateId={certificateData.certificateId}
                assets={certificateData.assets}
              />
            </div>
          </div>
        </div>

        {/* Bottom Details Summary Card */}
        <div className="no-print bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 font-cinzel text-sm sm:text-base">
                  Credential Summary
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  ID: {certificateData.certificateId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={editUrl}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Modify Details
              </Link>
              <Link
                href={`/verify/${certificateData.certificateId}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verify Credential
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-semibold block mb-0.5">
                Recipient Name
              </span>
              <span className="font-bold text-slate-800 text-sm">
                {certificateData.studentName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold block mb-0.5">
                Course Completed
              </span>
              <span className="font-medium text-slate-800 text-sm">
                {certificateData.courseName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold block mb-0.5">
                Completion Date
              </span>
              <span className="font-medium text-slate-800 text-sm">
                {typeof certificateData.completionDate === "string"
                  ? certificateData.completionDate.split("T")[0]
                  : new Date(certificateData.completionDate).toISOString().split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificatePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[#1e3a5f] animate-spin" />
            <p className="text-sm font-medium text-slate-600">Loading preview...</p>
          </div>
        </div>
      }
    >
      <CertificatePreviewContent />
    </Suspense>
  );
}

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import CertificateTemplate from "@/components/CertificateTemplate";
import CertificateActions from "@/components/CertificateActions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { certificateId } = await params;
  return {
    title: `Certificate ${certificateId} | Verified Credential`,
    description: `Public verified certificate of completion ID ${certificateId}`,
  };
}

async function fetchCertificate(certificateId) {
  try {
    await connectToDatabase();
    const cert = await Certificate.findOne({ certificateId }).lean();
    if (!cert) return null;
    return JSON.parse(JSON.stringify(cert));
  } catch (err) {
    console.error("Error loading certificate:", err);
    return null;
  }
}

export default async function CertificatePage({ params }) {
  const { certificateId } = await params;
  const certificate = await fetchCertificate(certificateId);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 border border-red-200 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-cinzel text-slate-800 mb-2">
            Certificate Not Found
          </h1>
          <p className="text-sm text-slate-500 mb-4">
            We could not find an authentic certificate registered with ID:
          </p>
          <p className="font-mono text-xs bg-slate-100 p-2 rounded border border-slate-200 text-slate-700 break-all mb-6">
            {certificateId}
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/verify"
              className="w-full py-2.5 px-4 rounded-xl bg-[#1e3a5f] text-white text-sm font-medium hover:bg-[#152a45] transition-colors"
            >
              Search Verification Registry
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-6">
        {/* Top bar with back link & verification badge */}
        <div className="no-print flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/admin/certificates"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1e3a5f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Admin Dashboard
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-medium shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authentic & Verified Credential</span>
          </div>
        </div>

        {/* Certificate Display Area (Scalable on smaller screens) */}
        <div className="w-full bg-white/40 p-2 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex justify-center overflow-x-auto">
          <CertificateTemplate
            id="certificate-to-print"
            studentName={certificate.studentName}
            courseName={certificate.courseName}
            completionDate={certificate.completionDate}
            certificateId={certificate.certificateId}
            assets={certificate.assets}
          />
        </div>

        {/* Print, Download, and Share Actions */}
        <CertificateActions
          certificateId={certificate.certificateId}
          studentName={certificate.studentName}
          targetElementId="certificate-to-print"
        />
      </div>
    </div>
  );
}

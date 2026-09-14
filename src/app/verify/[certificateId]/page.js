import React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowLeft, ExternalLink, Award, Calendar, Hash, User } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { certificateId } = await params;
  return {
    title: `Verify Certificate ${certificateId} | Credential Registry`,
    description: `Official verification record for certificate ${certificateId}`,
  };
}

async function getCertificate(certificateId) {
  try {
    await connectToDatabase();
    const cert = await Certificate.findOne({ certificateId }).lean();
    if (!cert) return null;
    return JSON.parse(JSON.stringify(cert));
  } catch (err) {
    console.error("Verification lookup failed:", err);
    return null;
  }
}

export default async function VerifyCertificatePage({ params }) {
  const { certificateId } = await params;
  const certificate = await getCertificate(certificateId);

  const formatDate = (dateInput) => {
    if (!dateInput) return "—";
    try {
      const d = new Date(dateInput);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return String(dateInput);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        {/* Navigation link */}
        <div className="flex items-center justify-between">
          <Link
            href="/verify"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1e3a5f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Lookup another certificate
          </Link>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Official Credential Verification
          </span>
        </div>

        {certificate ? (
          /* Valid Certificate View */
          <div className="bg-white rounded-3xl border-2 border-emerald-500/40 shadow-xl overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-8 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-100" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-cinzel tracking-wider">
                ✓ Certificate Verified
              </h1>
              <p className="text-emerald-100 text-sm mt-1">
                This credential is authentic and registered in the official database.
              </p>
            </div>

            {/* Verification Details Table / Cards */}
            <div className="p-8 space-y-5">
              <div className="space-y-4">
                {/* Student Name */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Student Name
                    </span>
                    <span className="text-lg font-bold text-slate-900 font-cinzel">
                      {certificate.studentName}
                    </span>
                  </div>
                </div>

                {/* Course Name */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Course
                    </span>
                    <span className="text-base font-semibold text-slate-800">
                      {certificate.courseName}
                    </span>
                  </div>
                </div>

                {/* Completion Date */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Completion Date
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      {formatDate(certificate.completionDate)}
                    </span>
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
                    <Hash className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Certificate ID
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#1e3a5f] select-all break-all">
                      {certificate.certificateId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Link to Full Certificate */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/certificate/${certificate.certificateId}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#1e3a5f] hover:bg-[#152a45] text-white font-medium text-sm transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Original Certificate
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Invalid Certificate View */
          <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 border border-red-200 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-800 mb-2">
              Certificate Not Found
            </h1>
            <p className="text-slate-600 text-sm max-w-sm mx-auto mb-4">
              The certificate ID you entered is invalid or does not exist.
            </p>

            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs font-mono text-red-700 break-all mb-6">
              {certificateId}
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/verify"
                className="w-full py-2.5 px-4 rounded-xl bg-[#1e3a5f] text-white text-sm font-medium hover:bg-[#152a45] transition-colors"
              >
                Try Another Certificate ID
              </Link>
              <Link
                href="/"
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

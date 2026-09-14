import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CertificateForm from "@/components/CertificateForm";

export const metadata = {
  title: "Create Certificate | Admin Portal",
  description: "Issue a new verified certificate of completion",
};

export default function CreateCertificatePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/certificates"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#1e3a5f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Certificates List
          </Link>
          <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Admin Console
          </span>
        </div>

        {/* Certificate Form */}
        <CertificateForm />
      </div>
    </div>
  );
}

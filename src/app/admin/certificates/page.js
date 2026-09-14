import React from "react";
import Link from "next/link";
import { PlusCircle, Search, ExternalLink, ShieldCheck, Award, Eye } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import { formatDate } from "@/utils/date";
import Certificate from "@/models/Certificate";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Certificates Dashboard | Admin",
  description: "Manage issued certificates and view analytics",
};

async function getCertificates() {
  try {
    await connectToDatabase();
    const certificates = await Certificate.find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    return JSON.parse(JSON.stringify(certificates));
  } catch (error) {
    console.error("Error fetching certificates in admin page:", error);
    return [];
  }
}

export default async function AdminCertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Administration
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-cinzel">
              Issued Certificates
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              View, manage, and verify all credentials generated across the platform.
            </p>
          </div>

          <Link
            href="/admin/certificates/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#152a45] text-white font-medium text-sm transition-all shadow-md active:scale-98"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            Issue New Certificate
          </Link>
        </div>

        {/* Certificate List or Empty State */}
        {certificates.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 font-cinzel mb-2">
              No Certificates Issued Yet
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Generate your first official certificate of completion with dynamic student name, course title, and unique verification ID.
            </p>
            <Link
              href="/admin/certificates/create"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1e3a5f] text-white font-medium text-sm hover:bg-[#162c47] transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Generate Certificate
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <h2 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">
                Total Issued: {certificates.length}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Certificate ID</th>
                    <th className="px-6 py-3.5">Student Name</th>
                    <th className="px-6 py-3.5">Course Name</th>
                    <th className="px-6 py-3.5">Completion Date</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {certificates.map((cert) => {
                    const formattedDate = formatDate(cert.completionDate, {
                      monthStyle: "short",
                    });

                    return (
                      <tr key={cert.certificateId} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs font-bold text-[#1e3a5f]">
                          {cert.certificateId}
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-900">
                          {cert.studentName}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {cert.courseName}
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/certificates/preview?id=${cert.certificateId}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
                              title="Preview Certificate"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-500" />
                              Preview
                            </Link>
                            <Link
                              href={`/certificate/${cert.certificateId}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
                              title="View Public Certificate"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Public
                            </Link>
                            <Link
                              href={`/verify/${cert.certificateId}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-xs font-medium text-emerald-800 transition-colors"
                              title="Verify Certificate"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Verify
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

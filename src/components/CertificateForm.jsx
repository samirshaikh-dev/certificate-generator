"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Eye,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Award,
  Loader2,
} from "lucide-react";

function CertificateFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const idParam = searchParams.get("id") || "";
  const initialStudentName = searchParams.get("studentName") || "";
  const initialCourseName = searchParams.get("courseName") || "";
  const initialCompletionDate =
    searchParams.get("completionDate") || new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    studentName: initialStudentName,
    courseName: initialCourseName,
    completionDate: initialCompletionDate,
    logoUrl: "",
    signatureUrl: "",
    sealUrl: "",
  });

  const [isEditing, setIsEditing] = useState(Boolean(idParam));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync with searchParams if navigated back with "Edit Details"
  useEffect(() => {
    if (initialStudentName || initialCourseName || idParam) {
      setFormData((prev) => ({
        ...prev,
        studentName: initialStudentName || prev.studentName,
        courseName: initialCourseName || prev.courseName,
        completionDate: initialCompletionDate || prev.completionDate,
      }));
      if (idParam) setIsEditing(true);
    }
  }, [initialStudentName, initialCourseName, initialCompletionDate, idParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.studentName.trim() || !formData.courseName.trim() || !formData.completionDate) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const endpoint = isEditing && idParam
        ? `/api/certificates/${encodeURIComponent(idParam)}`
        : "/api/certificates";
      
      const method = isEditing && idParam ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: formData.studentName.trim(),
          courseName: formData.courseName.trim(),
          completionDate: formData.completionDate,
          assets: {
            logoUrl: formData.logoUrl.trim(),
            signatureUrl: formData.signatureUrl.trim(),
            sealUrl: formData.sealUrl.trim(),
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process certificate.");
      }

      const finalId = data.certificateId || idParam;

      // Redirect user to the dedicated Certificate Preview Page
      router.push(`/admin/certificates/preview?id=${encodeURIComponent(finalId)}`);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  // Allow instant preview as a draft without saving yet if desired
  const handleQuickPreview = (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.courseName.trim()) {
      setErrorMessage("Please enter at least recipient name and course name to preview.");
      return;
    }

    const query = new URLSearchParams({
      studentName: formData.studentName.trim(),
      courseName: formData.courseName.trim(),
      completionDate: formData.completionDate,
      ...(idParam ? { id: idParam } : {}),
    });

    router.push(`/admin/certificates/preview?${query.toString()}`);
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-10">
        <div className="mb-8 pb-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                {isEditing ? "Modify Certificate" : "Certificate Builder"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel">
              {isEditing ? "Edit Certificate Details" : "Generate Certificate"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter the student credentials. After submitting, you will be redirected to the dedicated preview page.
            </p>
          </div>

          {isEditing && (
            <span className="text-xs bg-amber-50 border border-amber-200 text-amber-800 font-mono font-semibold px-3 py-1.5 rounded-xl">
              Editing: {idParam}
            </span>
          )}
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipient / Student Name */}
            <div>
              <label
                htmlFor="studentName"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Recipient / Student Name <span className="text-red-500">*</span>
              </label>
              <input
                id="studentName"
                type="text"
                name="studentName"
                required
                value={formData.studentName}
                onChange={handleChange}
                placeholder="e.g. Alexandra Chen"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent text-slate-800 placeholder-slate-400 text-sm transition-all"
              />
            </div>

            {/* Course Name */}
            <div>
              <label
                htmlFor="courseName"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Course Name <span className="text-red-500">*</span>
              </label>
              <input
                id="courseName"
                type="text"
                name="courseName"
                required
                value={formData.courseName}
                onChange={handleChange}
                placeholder="e.g. Next.js Masterclass"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent text-slate-800 placeholder-slate-400 text-sm transition-all"
              />
            </div>

            {/* Completion Date */}
            <div>
              <label
                htmlFor="completionDate"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Completion Date <span className="text-red-500">*</span>
              </label>
              <input
                id="completionDate"
                type="date"
                name="completionDate"
                required
                value={formData.completionDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent text-slate-800 text-sm transition-all"
              />
            </div>

            {/* Auto Certificate ID Info */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Certificate ID
              </label>
              <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm flex items-center justify-between">
                <span className="font-mono text-xs text-slate-600 truncate">
                  {idParam || "UC-c12fca53-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono shrink-0">
                  {idParam ? "Existing" : "Auto-generated"}
                </span>
              </div>
            </div>
          </div>

          {/* Optional Cloudinary / Custom Asset Section */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-5 py-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-semibold text-slate-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                Optional Custom Media Assets (Cloudinary Logo, Signature, Seal)
              </span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {showAdvanced && (
              <div className="p-5 space-y-4 bg-white border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  You can specify custom Cloudinary URLs for assets. If left empty, default high-resolution vector assets are rendered.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleChange}
                      placeholder="https://res.cloudinary.com/.../logo.png"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Signature URL
                    </label>
                    <input
                      type="url"
                      name="signatureUrl"
                      value={formData.signatureUrl}
                      onChange={handleChange}
                      placeholder="https://res.cloudinary.com/.../signature.png"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Seal URL
                    </label>
                    <input
                      type="url"
                      name="sealUrl"
                      value={formData.sealUrl}
                      onChange={handleChange}
                      placeholder="https://res.cloudinary.com/.../seal.png"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Submit & Preview Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handleQuickPreview}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              Preview Draft
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#1e3a5f] hover:bg-[#152a45] text-white font-medium text-sm transition-all shadow-md active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isEditing ? "Save & View Preview" : "Generate & Preview Certificate"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CertificateForm() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1e3a5f]" />
          <span>Loading form...</span>
        </div>
      }
    >
      <CertificateFormContent />
    </Suspense>
  );
}

import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: [true, "Certificate ID is required"],
      unique: true,
      trim: true,
      index: true,
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    courseName: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    completionDate: {
      type: Date,
      required: [true, "Completion date is required"],
    },
    templateId: {
      type: String,
      default: "default",
      trim: true,
    },
    // Optional Cloudinary media asset links (logo, background, signature, seal)
    assets: {
      logoUrl: { type: String, default: "" },
      backgroundUrl: { type: String, default: "" },
      signatureUrl: { type: String, default: "" },
      sealUrl: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development hot reloading
const Certificate =
  mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);

export default Certificate;

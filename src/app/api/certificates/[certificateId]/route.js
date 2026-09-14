import connectToDatabase from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { certificateId } = resolvedParams;

    if (!certificateId) {
      return Response.json(
        { success: false, error: "Certificate ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const certificate = await Certificate.findOne({ certificateId }).lean();

    if (!certificate) {
      return Response.json(
        {
          success: false,
          error: "Certificate not found. The certificate ID is invalid or does not exist.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      certificateId: certificate.certificateId,
      studentName: certificate.studentName,
      courseName: certificate.courseName,
      completionDate: certificate.completionDate,
      templateId: certificate.templateId || "default",
      assets: certificate.assets || {},
      createdAt: certificate.createdAt,
    });
  } catch (error) {
    console.error("Error fetching single certificate:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Internal server error fetching certificate",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const { certificateId } = resolvedParams;

    if (!certificateId) {
      return Response.json(
        { success: false, error: "Certificate ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const body = await request.json();
    const { studentName, courseName, completionDate, templateId, assets } = body;

    const updateData = {};
    if (studentName) updateData.studentName = studentName.trim();
    if (courseName) updateData.courseName = courseName.trim();
    if (completionDate) updateData.completionDate = new Date(completionDate);
    if (templateId) updateData.templateId = templateId;
    if (assets) updateData.assets = assets;

    const updated = await Certificate.findOneAndUpdate(
      { certificateId },
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return Response.json(
        { success: false, error: "Certificate not found to update." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      certificateId: updated.certificateId,
      message: "Certificate updated successfully.",
    });
  } catch (error) {
    console.error("Error updating certificate:", error);
    return Response.json(
      { success: false, error: error.message || "Failed to update certificate" },
      { status: 500 }
    );
  }
}

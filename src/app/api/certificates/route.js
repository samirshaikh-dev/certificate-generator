import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const search = searchParams.get("search") || "";

    const query = {};
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: "i" } },
        { courseName: { $regex: search, $options: "i" } },
        { certificateId: { $regex: search, $options: "i" } },
      ];
    }

    const certificates = await Certificate.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return Response.json({
      success: true,
      certificates,
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch certificates",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { studentName, courseName, completionDate, templateId, assets } = body;

    if (!studentName || !courseName || !completionDate) {
      return Response.json(
        {
          success: false,
          error: "Student name, course name, and completion date are required.",
        },
        { status: 400 }
      );
    }

    const parsedDate = new Date(completionDate);
    if (isNaN(parsedDate.getTime())) {
      return Response.json(
        {
          success: false,
          error: "Invalid completion date format.",
        },
        { status: 400 }
      );
    }

    // Generate unique Certificate ID format: UC-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    const certificateId = `UC-${uuidv4()}`;

    const newCertificate = await Certificate.create({
      certificateId,
      studentName: studentName.trim(),
      courseName: courseName.trim(),
      completionDate: parsedDate,
      templateId: templateId || "default",
      assets: assets || {},
    });

    return Response.json(
      {
        success: true,
        certificateId: newCertificate.certificateId,
        message: "Certificate generated successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating certificate:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to create certificate",
      },
      { status: 500 }
    );
  }
}

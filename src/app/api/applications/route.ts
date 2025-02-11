import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET /api/applications
 * Fetch all applications or filter by jobId
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    try {
        const applications = await prisma.application.findMany({
            where: jobId ? { jobId: Number(jobId) } : {},
            include: { Job: true }, // Include related job details
            orderBy: { id: "desc" }, // Newest first
        });

        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
}

/**
 * POST /api/applications
 * Submit a job application
 */
export async function POST(req: Request) {
    try {
        const { jobId, name, email, resume, coverLetter } = await req.json();

        // Validate required fields
        if (!jobId || !name || !email || !resume) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const application = await prisma.application.create({
            data: { jobId, name, email, resume, coverLetter },
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}

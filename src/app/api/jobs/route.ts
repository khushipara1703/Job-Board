import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() { 
    // File: app/api/jobs/route.ts


    try {
        console.log("🟢 Fetching jobs from database...");
        const jobs = await prisma.job.findMany();
        console.log("✅ Jobs fetched successfully:", jobs.length);
        return NextResponse.json(jobs);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("🔴 Error fetching jobs:", errorMessage);
        return NextResponse.json({ error: "Failed to fetch jobs", details: errorMessage }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        console.log("🟢 Received a POST request to /api/jobs");

        if (!req.headers.get("content-type")?.includes("application/json")) {
            return NextResponse.json({ error: "Invalid Content-Type" }, { status: 400 });
        }

        let data;
        try {
            data = await req.json();
        } catch (error) {
            console.error("🔴 Failed to parse JSON:", error);
            return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
        }

        console.log("🟢 Parsed Request Body:", data);

        const { title, description, category, location, salary } = data;

        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
        }

        const parsedSalary = salary && !isNaN(Number(salary)) ? Number(salary) : null;

        console.log("🟢 Creating job in database...");
        const job = await prisma.job.create({
            data: { title, description, category, location, salary: parsedSalary },
        });

        console.log("✅ Job created successfully:", job);
        return NextResponse.json({ success: true, job }, { status: 201 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("🔴 Error creating job:", errorMessage);
        return NextResponse.json(
            { error: "Failed to create job", details: errorMessage },
            { status: 500 }
        );
    }
}

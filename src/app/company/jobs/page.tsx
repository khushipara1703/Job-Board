import Link from "next/link";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

// Fetch company job listings
async function fetchJobs() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return await res.json();
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
}

export default async function CompanyJobs() {
    const jobs = await fetchJobs();

    return (
        <div className="container max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Your Posted Jobs</h1>
                <Button>
                    <Link href="/company/jobs/new" className="block w-full h-full">
                        Post Job
                    </Link>
                </Button>
            </div>

            {/* Job List */}
            {jobs.length === 0 ? (
                <p className="text-gray-500">No jobs posted yet.</p>
            ) : (
                jobs.map((job: any) => (
                    <Card key={job.id} className="mb-3">
                        <h2 className="text-lg font-semibold">{job.title}</h2>
                        <p className="text-gray-600">{job.category} - {job.location || "Remote"}</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-500">
                                {job.applications?.length || 0} applications
                            </p>
                            <Button className="border border-gray-300 text-gray-700 hover:bg-gray-200">
                                <Link href={`/company/jobs/${job.id}/applications`}>
                                    View Applications
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}

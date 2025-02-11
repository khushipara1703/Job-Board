import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";

// Fetch job details from API
async function fetchJob(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${id}`);
    if (!res.ok) return null;
    return res.json();
}

export default async function JobDetails({ params }: { params: { id: string } }) {
    const job = await fetchJob(params.id);

    if (!job) return notFound();

    return (
        <div className="container max-w-3xl mx-auto p-6">
            <Card className="shadow-lg">
                <CardContent className="p-6">
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <p className="text-gray-600 mt-2">{job.description}</p>

                    <div className="mt-4">
                        <p><b>Category:</b> {job.category || "Not specified"}</p>
                        <p><b>Location:</b> {job.location || "Remote"}</p>
                        <p><b>Salary:</b> {job.salary ? `$${job.salary}` : "Not disclosed"}</p>
                    </div>

                    <div className="mt-6">
                        <Button>
                            <Link href={`/candidate/apply/${job.id}`}>Apply Now</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

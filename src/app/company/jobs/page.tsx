import Link from "next/link";
import { Button } from "@/components/button";
import { Card } from "@/components/card";


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
        <div className="relative min-h-screen w-full">
            
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.hdqwalls.com/wallpapers/bthumb/windows-12-blue-jb.jpg')" }}
            />

            
            <div className="relative z-10 flex flex-col items-center justify-start min-h-screen p-6">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-3xl w-full mt-6">
                    
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">Your Posted Jobs</h1>
                        <Button>
                            <Link href="/company/jobs/new" className="block w-full h-full">
                                Post Job
                            </Link>
                        </Button>
                    </div>

                    
                    {jobs.length === 0 ? (
                        <p className="text-gray-300">No jobs posted yet.</p>
                    ) : (
                        jobs.map((job: any) => (
                            <Card key={job.id} className="mb-3 p-4 border border-gray-400 rounded-lg bg-white/10 backdrop-blur-md text-white">
                                <h2 className="text-lg font-semibold">{job.title}</h2>
                                <p className="text-gray-300">{job.category} - {job.location || "Remote"}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <Button className="border border-gray-300 text-white hover:bg-gray-200 hover:text-black">
                                        <Link href={`/company/jobs/${job.id}/applications`}>
                                            View Applications
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

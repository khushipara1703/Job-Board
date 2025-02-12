"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";

async function fetchJobs(search = "", category = "") {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/jobs?search=${search}&category=${category}`);

    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
}

export default function JobListings() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        fetchJobs(search, category).then(setJobs).catch(console.error);
    }, [search, category]);

    return (
        <div className="relative min-h-screen w-full">
            {/* Full Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.hdqwalls.com/wallpapers/bthumb/windows-12-blue-jb.jpg')" }}
            />

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center min-h-screen p-6">
                <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4 text-white text-center">Available Jobs</h1>

                    {/* Search & Filter */}
                    <div className="flex gap-2 mb-4">
                        <Input
                            placeholder="Search jobs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Select
                            options={[
                                { value: "", label: "All Categories" },
                                { value: "engineering", label: "Engineering" },
                                { value: "marketing", label: "Marketing" },
                                { value: "design", label: "Design" },
                            ]}
                            onChange={setCategory}
                            placeholder="Category"
                        />
                    </div>

                    {/* Job Listings */}
                    <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 pr-2">
                        {jobs.length === 0 ? (
                            <p className="text-gray-300 text-center">No jobs found.</p>
                        ) : (
                            jobs.map((job: any) => (
                                <Card key={job.id} className="p-4 mb-3 border border-gray-500 rounded-lg shadow-md bg-white/10 backdrop-blur-md text-white">
                                    <CardContent className="p-6">
                                        <h1 className="text-2xl font-bold">{job.title}</h1>

                                        <div className="mt-2">
                                            <p><b>Description: </b>{job.description}</p>
                                            <p><b>Category: </b> {job.category || "Not specified"}</p>
                                            <p><b>Location: </b> {job.location || "Remote"}</p>
                                            <p><b>Salary: </b> {job.salary ? `${job.salary}` : "Not disclosed"}</p>
                                        </div>

                                        <div className="mt-6">
                                            <Link href={`/candidate/apply/${job.id}`}>
                                                <Button>Apply Now</Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

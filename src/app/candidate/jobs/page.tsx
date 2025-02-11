"use client";  

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Card } from "@/components/card";
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
        <div className="container max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>

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

            {/* Job List */}
            {jobs.length === 0 ? (
                <p className="text-gray-500">No jobs found.</p>
            ) : (
                jobs.map((job: any) => (
                    <Card key={job.id} className="mb-3">
                        <h2 className="text-lg font-semibold">{job.title}</h2>
                        <p className="text-gray-600">{job.category} - {job.location || "Remote"}</p>
                        <div className="flex justify-between items-center mt-2">
                            <Button className="border border-gray-300 text-gray-700 hover:bg-gray-200">
                                <Link href={`/candidate/jobs/${job.id}`}>
                                    View Details
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}

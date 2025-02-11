"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input }  from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";

export default function ApplyJob({ params }: { params: { jobId: string } }) {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", resume: "", coverLetter: "" });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await fetch("/api/applications", {
            method: "POST",
            body: JSON.stringify({ ...formData, jobId: Number(params.jobId) }),
            headers: { "Content-Type": "application/json" },
        });
        router.push("/candidate/jobs");
    }

    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Apply for Job</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <Input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <Input placeholder="Resume Link" onChange={(e) => setFormData({ ...formData, resume: e.target.value })} />
                <Textarea placeholder="Cover Letter" onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })} />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

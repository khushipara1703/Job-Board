"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/input";
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
        <div 
            className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-6"
            style={{ backgroundImage: "url('https://images.hdqwalls.com/wallpapers/bthumb/windows-12-blue-jb.jpg')" }}
        >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-white text-center">Apply for Job</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        placeholder="Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        className="bg-gray-800 text-white border-gray-600"
                    />
                    <Input 
                        placeholder="Email" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        className="bg-gray-800 text-white border-gray-600"
                    />
                    <Input 
                        placeholder="Resume Link" 
                        value={formData.resume}
                        onChange={(e) => setFormData({ ...formData, resume: e.target.value })} 
                        className="bg-gray-800 text-white border-gray-600"
                    />
                    <Textarea 
                        placeholder="Cover Letter" 
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })} 
                        className="bg-gray-800 text-white border-gray-600"
                    />
                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </div>
        </div>
    );
}

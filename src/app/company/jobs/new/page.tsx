"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Select } from "@/components/select";
import { Button } from "@/components/button";

export default function PostJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    salary: "",
  });

  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const jobData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        location: formData.location,
        salary: formData.salary ? Number(formData.salary) : null,
    };

    console.log("🟢 Submitting Job Data:", jobData); // ✅ Debugging

    try {
        const res = await fetch("/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jobData),
        });

        console.log("🟢 Raw Response:", res);

        // ✅ Handle Empty Response Properly
        const text = await res.text();
        console.log("🟢 Response Text:", text);

        if (!text) {
            throw new Error("🔴 Empty response from API");
        }

        const result = JSON.parse(text);
        console.log("🟢 Server Response (Parsed):", result);

        if (!res.ok) {
            console.error("🔴 Server Error:", result);
        } else {
            router.push("/company/jobs");
        }
    } catch (error) {
        console.error("🔴 Fetch error:", error);
    }
}

  return (
    <div className="container max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
          <Input
            type="text"
            placeholder="Enter job title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Category</label>
          <Select
            options={[
              { value: "engineering", label: "Engineering" },
              { value: "marketing", label: "Marketing" },
              { value: "design", label: "Design" },
            ]}
            onChange={(value) => setFormData({ ...formData, category: value })}
            placeholder="Select a category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <Input
            type="text"
            placeholder="Enter location (or leave blank for Remote)"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Salary (optional)</label>
          <Input
            type="number"
            placeholder="Enter salary (optional)"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <Textarea
            placeholder="Enter job description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full">
          Post Job
        </Button>
      </form>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/button";

export default function HomePage() {
    return (
        <div className="container mx-auto max-w-3xl p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to JobBoard</h1>
            <p className="text-gray-600 mb-6">
                Find your dream job or post a job today! Start your journey with us.
            </p>

            <div className="flex justify-center gap-4">
                <Button>
                    <Link href="/candidate/jobs">Browse Jobs</Link>
                </Button>
                <Button >
                    <Link href="/company/jobs">Company Dashboard</Link>
                </Button>
            </div>
        </div>
    );
}

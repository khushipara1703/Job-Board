import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149020364.jpg?semt=ais_hybrid')" }}>
            <div className="container mx-auto max-w-3xl p-6 text-center bg-opacity-50 min-h-screen flex flex-col justify-center items-center text-white">
                <h1 className="text-6xl font-bold mb-4">Welcome to JobBoard</h1>
                <p className="text-gray-300 text-2xl mb-6">
                    Find your dream job or post a job today! Start your journey with us.
                </p>

                {/* Fixed Button Issues */}
                <div className="flex justify-center gap-4">
                    <Link href="/candidate/jobs">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition">
                            Browse Jobs
                        </button>
                    </Link>
                    <Link href="/company/jobs">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition">
                            Company Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

async function fetchApplications(jobId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications?jobId=${jobId}`);
    if (!res.ok) return [];
    return res.json();
}

export default async function Applications({ params }: { params: { id: string } }) {
    const applications = await fetchApplications(params.id);

    return (
        <div className="relative min-h-screen w-full">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.hdqwalls.com/wallpapers/bthumb/windows-12-blue-jb.jpg')" }}
            />

            {/* Content Wrapper */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-3xl w-full">
                    <h1 className="text-2xl font-bold mb-4 text-white text-center">Job Applications</h1>

                    {applications.length === 0 ? (
                        <p className="text-gray-300 text-center">No applications yet.</p>
                    ) : (
                        applications.map((app: any) => (
                            <div key={app.id} className="border border-gray-400 p-4 mb-3 rounded-lg shadow-md bg-white/10 backdrop-blur-md text-white">
                                <h2 className="font-semibold text-lg">{app.name} ({app.email})</h2>
                                <p className="text-sm text-gray-300">
                                    <b>Resume:</b> <a href={app.resume} className="text-blue-400 underline" target="_blank">View</a>
                                </p>
                                <p className="text-gray-200 mt-2">{app.coverLetter}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

async function fetchApplications(jobId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications?jobId=${jobId}`);
    if (!res.ok) return [];
    return res.json();
}

export default async function Applications({ params }: { params: { id: string } }) {
    const applications = await fetchApplications(params.id);

    return (
        <div className="container max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Job Applications</h1>

            {applications.length === 0 ? (
                <p className="text-gray-500">No applications yet.</p>
            ) : (
                applications.map((app: any) => (
                    <div key={app.id} className="border p-4 mb-3 rounded-lg shadow-md">
                        <h2 className="font-semibold text-lg">{app.name} ({app.email})</h2>
                        <p className="text-sm text-gray-600"><b>Resume:</b> <a href={app.resume} className="text-blue-500" target="_blank">View</a></p>
                        <p className="text-gray-700 mt-2">{app.coverLetter}</p>
                    </div>
                ))
            )}
        </div>
    );
}

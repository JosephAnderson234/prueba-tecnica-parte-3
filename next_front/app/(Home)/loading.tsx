export default function HomeLoading() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <div className="h-10 w-72 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4" />
                    <div className="h-5 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
                    <div className="mt-6 h-1 w-24 bg-gray-200 mx-auto rounded-full animate-pulse" />
                </div>

                <div className="my-5">
                    <div className="h-11 w-44 bg-gray-200 rounded-lg animate-pulse" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-lg rounded-2xl border border-gray-200 p-5 animate-pulse"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2">
                                    <div className="h-6 w-40 bg-gray-200 rounded" />
                                    <div className="h-4 w-24 bg-gray-200 rounded" />
                                </div>
                                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="h-4 w-full bg-gray-200 rounded" />
                                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="h-9 w-24 bg-gray-200 rounded" />
                                <div className="h-9 w-28 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex justify-center">
                    <div className="flex items-center gap-3 text-base-primary">
                        <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-semibold">Cargando casos...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
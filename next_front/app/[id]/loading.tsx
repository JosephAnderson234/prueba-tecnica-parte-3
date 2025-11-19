export default function LoadingCasePage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Botón volver skeleton */}
                <div className="mb-6">
                    <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                {/* Card principal skeleton */}
                <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                    {/* Header skeleton */}
                    <div className="bg-linear-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-9 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>

                    {/* Contenido skeleton */}
                    <div className="px-8 py-6 space-y-6">
                        {/* Campo 1 */}
                        <div>
                            <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
                            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Campo 2 (textarea) */}
                        <div>
                            <div className="h-5 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                            <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Campo 3 (select) */}
                        <div>
                            <div className="h-5 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
                            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Loading indicator */}
                <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-3 text-base-primary">
                        <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-semibold">Cargando caso...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

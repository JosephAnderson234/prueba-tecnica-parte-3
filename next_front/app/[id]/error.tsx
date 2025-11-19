"use client";

import { useRouter } from "next/navigation";

export default function ErrorCasePage({ 
    error, 
    reset 
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 border-2 border-red-200 text-center">
                    {/* Icono de error */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                        <svg 
                            className="w-10 h-10 text-red-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                            />
                        </svg>
                    </div>

                    {/* Título */}
                    <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
                        ¡Algo salió mal!
                    </h1>

                    {/* Mensaje de error */}
                    <p className="text-gray-600 text-lg mb-2">
                        No pudimos cargar el caso solicitado
                    </p>
                    
                    {error.message && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mt-4">
                            <p className="text-sm text-red-700 font-mono wrap-break-word">
                                {error.message}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button
                            onClick={() => reset()}
                            className="px-8 py-3 bg-base-primary hover:bg-base-secondary text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            Reintentar
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="px-8 py-3 border-2 border-gray-300 text-text hover:bg-gray-50 font-semibold rounded-lg transition-colors"
                        >
                            Volver al inicio
                        </button>
                    </div>

                    {error.digest && (
                        <p className="text-xs text-gray-400 mt-6">
                            ID de error: <span className="font-mono">{error.digest}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
import Link from "next/link";

export default function NotFoundCase() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 border-2 border-blue-200 text-center">
                    {/* Icono de búsqueda */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                        <svg 
                            className="w-10 h-10 text-blue-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                    </div>

                    {/* Título */}
                    <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                        Caso no encontrado
                    </h2>

                    {/* Mensaje */}
                    <p className="text-gray-600 text-lg mb-8">
                        El caso que buscas no existe o ha sido eliminado
                    </p>

                    {/* Botón de acción */}
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-base-primary hover:bg-base-secondary text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        Ver todos los casos
                    </Link>
                </div>
            </div>
        </div>
    );
}

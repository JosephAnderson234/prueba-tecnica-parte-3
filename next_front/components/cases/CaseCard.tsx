"use client";

import { Case } from "@/interfaces/cases";
import { useRouter } from "next/navigation";

export default function CaseCard({data}: {data: Case}) {
    const router = useRouter();

    const estadoConfig = {
        abierto: { 
            bg: "bg-gradient-to-br from-blue-50 to-blue-100", 
            text: "text-blue-700", 
            border: "border-blue-300", 
            dot: "bg-blue-500",
            label: "Abierto",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        en_progreso: { 
            bg: "bg-gradient-to-br from-amber-50 to-amber-100", 
            text: "text-amber-700", 
            border: "border-amber-300", 
            dot: "bg-amber-500",
            label: "En Progreso",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        cerrado: { 
            bg: "bg-gradient-to-br from-green-50 to-green-100", 
            text: "text-green-700", 
            border: "border-green-300", 
            dot: "bg-green-500",
            label: "Cerrado",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
    };

    const config = estadoConfig[data.estado as keyof typeof estadoConfig] || estadoConfig.abierto;

    return (
        <div 
            onClick={() => router.push(`/${data.id}`)}
            className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:border-base-primary transition-all duration-300 cursor-pointer overflow-hidden"
        >
            {/* Decoración de fondo en hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-base-primary opacity-0 group-hover:opacity-5 rounded-full -mr-16 -mt-16 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-full border-2 ${config.bg} ${config.text} ${config.border} shadow-sm`}>
                        {config.icon}
                        {config.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full group-hover:bg-base-primary group-hover:text-white transition-all duration-300">
                        #{data.id}
                    </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-text group-hover:text-base-primary transition-colors line-clamp-2 leading-tight">
                    {data.nombre}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5 min-h-[3.75rem]">
                    {data.descripcion}
                </p>
                
                <div className="pt-4 border-t border-gray-100 group-hover:border-base-primary/30 transition-colors">
                    <div className="flex items-center justify-between text-base-primary font-bold text-sm">
                        <span className="group-hover:translate-x-1 transition-transform">Ver detalles</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

import { Case } from "@/interfaces/cases";

export default function CaseCard({data}: {data: Case}) {
    return (
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h3 className="text-xl font-semibold mb-2 text-text">{data.nombre}</h3>
            <p className="text-gray-600 mb-4">{data.descripcion}</p>
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                data.estado === "abierto" ? "bg-green-100 text-green-800" :
                data.estado === "en_progreso" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
            }`}>
                {data.estado.replace("_", " ").toUpperCase()}
            </span>
        </div>
    );
}
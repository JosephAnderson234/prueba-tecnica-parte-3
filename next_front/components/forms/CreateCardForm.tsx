"use client";

import { CaseCreateRequest } from "@/interfaces/cases";
import { useForm } from "react-hook-form";
import { createCase } from "@/services/case/create";
import { useState } from "react";

export default function CreateCardForm({onClose}: {onClose: () => void}) {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CaseCreateRequest>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: CaseCreateRequest) => {
        setErrorMessage(null);
        
        const result = await createCase(data);
        
        if (result.status === "error") {
            setErrorMessage(result.message || "Error al crear el caso");
            return;
        }
        
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-text mb-2">
                    Nombre del Caso
                </label>
                <input 
                    type="text" 
                    id="nombre"
                    {...register("nombre", { required: "El nombre es obligatorio" })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-primary focus:border-transparent transition-all text-text"
                    placeholder="Ej: Caso de prueba"
                />
                {errors.nombre && (
                    <p className="text-sm text-red-600 mt-1">{errors.nombre.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="descripcion" className="block text-sm font-semibold text-text mb-2">
                    Descripción
                </label>
                <textarea 
                    id="descripcion"
                    rows={4}
                    {...register("descripcion", { required: "La descripción es obligatoria" })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-primary focus:border-transparent transition-all text-text resize-none"
                    placeholder="Describe el caso..."
                />
                {errors.descripcion && (
                    <p className="text-sm text-red-600 mt-1">{errors.descripcion.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="estado" className="block text-sm font-semibold text-text mb-2">
                    Estado
                </label>
                <select 
                    id="estado"
                    {...register("estado", { required: "El estado es obligatorio" })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-primary focus:border-transparent transition-all text-text"
                >
                    <option value="">Selecciona un estado</option>
                    <option value="abierto">Abierto</option>
                    <option value="en_progreso">En Progreso</option>
                    <option value="cerrado">Cerrado</option>
                </select>
                {errors.estado && (
                    <p className="text-sm text-red-600 mt-1">{errors.estado.message}</p>
                )}
            </div>

            {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
            )}

            <div className="flex gap-3 justify-end pt-4">
                <button 
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-6 py-3 border border-gray-300 text-text rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-base-primary hover:bg-base-secondary text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                    {isSubmitting ? "Creando..." : "Crear Caso"}
                </button>
            </div>
        </form>
    )
}
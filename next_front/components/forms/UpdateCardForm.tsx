"use client";

import { CaseUpdateRequest, Case } from "@/interfaces/cases";
import { useForm } from "react-hook-form";
import { updateCase } from "@/services/case/update";
import { useState } from "react";
import { ModeForm } from "@/interfaces/components/forms";
import { useRouter } from "next/navigation";
import { useHandleUnauthorized } from "@/utils/useHandleUnauthorized";

export const UpdateCardForm = ({ initialData }: { initialData: Case }) => {
    const [mode, setMode] = useState<ModeForm>('view');
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CaseUpdateRequest>({
        defaultValues: {
            nombre: initialData.nombre,
            descripcion: initialData.descripcion,
            estado: initialData.estado,
        }
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [responseStatus, setResponseStatus] = useState<"success" | "error" | "unauthorized">();
    const router = useRouter();

    useHandleUnauthorized(responseStatus);

    const onSubmit = async (data: CaseUpdateRequest) => {
        setErrorMessage(null);

        const result = await updateCase(initialData.id, data);
        setResponseStatus(result.status);

        if (result.status === "error") {
            setErrorMessage(result.message || "Error al actualizar el caso");
            return;
        }

        if (result.status === "success") {
            setMode('view');
            router.refresh();
        }
    };

    const handlerCancelEdit = () => {
        // Resetear formulario a valores iniciales
        reset({
            nombre: initialData.nombre,
            descripcion: initialData.descripcion,
            estado: initialData.estado,
        });
        setErrorMessage(null);
        setMode('view');
    }

    const estadoConfig = {
        abierto: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "Abierto" },
        en_progreso: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "En Progreso" },
        cerrado: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "Cerrado" },
    };

    const config = estadoConfig[initialData.estado as keyof typeof estadoConfig] || estadoConfig.abierto;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header con botón volver */}
            <div className="mb-6">
                <button 
                    onClick={() => router.back()} 
                    className="inline-flex items-center gap-2 px-4 py-2 text-base-primary hover:text-base-secondary font-semibold transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver
                </button>
            </div>

            {/* Card principal */}
            <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                {/* Header del card con info del caso */}
                <div className="bg-linear-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-text">
                                    {mode === 'view' ? initialData.nombre : 'Editando Caso'}
                                </h1>
                                {mode === 'view' && (
                                    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text} ${config.border} border`}>
                                        {config.label}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">ID: #{initialData.id}</p>
                        </div>
                        {mode === 'view' && (
                            <button
                                onClick={() => setMode('edit')}
                                className="px-6 py-3 bg-base-primary hover:bg-base-secondary text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                Editar Caso
                            </button>
                        )}
                    </div>
                </div>

                {/* Contenido del formulario */}
                <div className="px-8 py-6">
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
                        disabled={mode === 'view'}
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
                        disabled={mode === 'view'}
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
                        disabled={mode === 'view'}
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

                        {mode === 'edit' && (
                            <div className="flex gap-3 justify-end pt-6 border-t border-gray-200 mt-6">
                                <button
                                    type="button"
                                    onClick={handlerCancelEdit}
                                    disabled={isSubmitting}
                                    className="px-6 py-3 border-2 border-gray-300 text-text rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-base-primary hover:bg-base-secondary text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                >
                                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
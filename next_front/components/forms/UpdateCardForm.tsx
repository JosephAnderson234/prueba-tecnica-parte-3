"use client";

import { CaseUpdateRequest, Case } from "@/interfaces/cases";
import { useForm } from "react-hook-form";
import { updateCase } from "@/services/case/update";
import { useState } from "react";
import { ModeForm } from "@/interfaces/components/forms";
import { useRouter } from "next/navigation";

export const UpdateCardForm = ({ initialData }: { initialData: Case }) => {
    const [mode, setMode] = useState<ModeForm>('view');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CaseUpdateRequest>({
        defaultValues: {
            nombre: initialData.nombre,
            descripcion: initialData.descripcion,
            estado: initialData.estado,
        }
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const onSubmit = async (data: CaseUpdateRequest) => {
        setErrorMessage(null);

        const result = await updateCase(initialData.id, data);

        if (result.status === "error") {
            setErrorMessage(result.message || "Error al actualizar el caso");
            return;
        }

        router.refresh();
    };

    const handlerCancelEdit = () => {
        setMode('view');
        // Reset form values to initial data
        register("nombre").onChange({ target: { value: initialData.nombre } });
        register("descripcion").onChange({ target: { value: initialData.descripcion } });
        register("estado").onChange({ target: { value: initialData.estado } });
    }

    return (
        <>
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

                <div className="flex gap-3 justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || mode === 'view'}
                        className="px-6 py-3 bg-base-primary hover:bg-base-secondary text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                        {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>

            <div>
                {mode === 'view' ? (
                    <button
                        onClick={() => setMode('edit')}
                        className="mt-4 px-6 py-3 bg-base-primary hover:bg-base-secondary text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        Editar Caso
                    </button>
                ) : (
                    <button
                        onClick={() => setMode('view')}
                        className="mt-4 px-6 py-3 border border-gray-300 text-text rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                        Cancelar Edición
                    </button>
                )}
                {mode === 'edit' && (
                    <button
                        onClick={handlerCancelEdit}
                        className="mt-4 ml-4 px-6 py-3 border border-gray-300 text-text rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                        Cancelar Edición
                    </button>
                )}
            </div>
        </>

    );
}
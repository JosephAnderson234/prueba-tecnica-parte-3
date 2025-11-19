"use server";

import { Case } from "@/interfaces/cases";
import BackendFailResponse from "@/interfaces/common/backendFailResponse";
import { ServerResponse } from "@/interfaces/common/serverResponse";
import loaderEnv from "@/utils/loaderEnv";
import { getTokenServerAction } from "@/utils/token";

const API_URL = loaderEnv('NEXT_PUBLIC_API_URL');

export const getCaseById = async (id: number): Promise<ServerResponse<Case>> => {
    try {
        const token = await getTokenServerAction();
        if (!token) {
            throw new Error('No se encontró token de autenticación');
        }

        const response = await fetch(`${API_URL}/casos/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Si es 404, mensaje específico
            if (response.status === 404) {
                return {
                    status: 'error',
                    message: 'Caso no encontrado',
                };
            }

            // Intentar parsear respuesta JSON del backend
            try {
                const contentType = response.headers.get('content-type');
                if (contentType?.includes('application/json')) {
                    const res = await response.json() as BackendFailResponse;
                    throw new Error(res.msg || `Error del servidor: ${response.status}`);
                } else {
                    // Si no es JSON, es un error del servidor (HTML, etc)
                    throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
                }
            } catch (parseError) {
                throw new Error(`Error al procesar respuesta del servidor: ${response.status}`);
            }
        }

        // Validar que la respuesta sea JSON
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            throw new Error('Respuesta del servidor no es JSON válido');
        }

        const oneCase = await response.json() as Case;
        return {
            status: 'success',
            data: oneCase,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

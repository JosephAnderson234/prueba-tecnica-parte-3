"use server";

import BackendFailResponse from "@/interfaces/common/backendFailResponse";
import { ServerResponse } from "@/interfaces/common/serverResponse";
import loaderEnv from "@/utils/loaderEnv";
import { getTokenServerAction } from "@/utils/token";

const API_URL = loaderEnv('NEXT_PUBLIC_API_URL');

export const deleteCase = async (id: number): Promise<ServerResponse<null>> => {
    try {
        const token = await getTokenServerAction();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/casos/${id}` , {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            try {
                const contentType = response.headers.get('content-type');
                if (contentType?.includes('application/json')) {
                    const res = await response.json() as BackendFailResponse;
                    throw new Error(res.msg || `Error al eliminar caso: ${response.status}`);
                } else {
                    throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
                }
            } catch (parseError) {
                throw new Error(`Error al procesar respuesta del servidor: ${response.status}`);
            }
        }

        return {
            status: 'success',
            data: null,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

"use server";

import { Case, CaseUpdateRequest } from "@/interfaces/cases";
import BackendFailResponse from "@/interfaces/common/backendFailResponse";
import { ServerResponse } from "@/interfaces/common/serverResponse";
import loaderEnv from "@/utils/loaderEnv";
import { getTokenServerAction } from "@/utils/token";

const API_URL = loaderEnv('NEXT_PUBLIC_API_URL');

export const updateCase = async (id: number, updateData: CaseUpdateRequest): Promise<ServerResponse<Case>> => {
    try {
        const token = await getTokenServerAction();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/casos/${id}` , {
            method: 'PATCH', // Usamos PATCH para cambios parciales
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            const res = await response.json() as BackendFailResponse;
            throw new Error(res.msg || 'Error updating case');
        }

        const updatedCase = await response.json() as Case;
        return {
            status: 'success',
            data: updatedCase,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

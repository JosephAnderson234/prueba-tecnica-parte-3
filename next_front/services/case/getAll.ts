"use server";

import { Case } from "@/interfaces/cases";
import BackendFailResponse from "@/interfaces/common/backendFailResponse";
import { ServerResponse } from "@/interfaces/common/serverResponse";
import loaderEnv from "@/utils/loaderEnv";
import { getTokenServerAction } from "@/utils/token";



const API_URL = loaderEnv('NEXT_PUBLIC_API_URL');

export const getAllCases = async (): Promise<ServerResponse<Case[]>> => {
    try {
        const token = await getTokenServerAction();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/casos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const res = await response.json()  as BackendFailResponse;
            throw new Error(res.msg || 'Error fetching cases');
        }

        const cases = await response.json() as Case[];
        return {
            status: 'success',
            data: cases,
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            status: 'error',
            message: errorMessage,
        };
    }

}
"use server";

import { Case, CaseCreateRequest } from "@/interfaces/cases";
import BackendFailResponse from "@/interfaces/common/backendFailResponse";
import { ServerResponse } from "@/interfaces/common/serverResponse";
import loaderEnv from "@/utils/loaderEnv";
import { getTokenServerAction } from "@/utils/token";

const API_URL = loaderEnv('NEXT_PUBLIC_API_URL');

export const createCase = async (caseData: CaseCreateRequest): Promise<ServerResponse<Case>> => {

    try {

        const token = await getTokenServerAction();

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/casos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(caseData),
        });

        if (!response.ok) {
            const res = await response.json() as BackendFailResponse;
            throw new Error(res.msg || 'Error creating case');
        }

        const createdCase = await response.json() as Case;
        return {
            status: 'success',
            data: createdCase,
        };


    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            status: 'error',
            message: errorMessage,
        };
    }



}
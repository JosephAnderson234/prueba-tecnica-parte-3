import { LoginRequest } from "@/interfaces/auth/login";
import { AuthResponse } from "@/interfaces/auth/response";
import BackendFailResponse from "@/interfaces/common/backendFailResponse";
import { ServerResponse } from "@/interfaces/common/serverResponse";
import loaderEnv from "@/utils/loaderEnv";


const API_URL = loaderEnv("NEXT_PUBLIC_API_URL");


export const login = async (credentials: LoginRequest): Promise<ServerResponse<AuthResponse>> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json() as BackendFailResponse;
            throw new Error(errorData.msg || 'Error en la autenticación');
        }

        const data = await response.json() as AuthResponse;
        return {
            status: "success",
            data: data,
        };

    } catch (error) {
        return {
            status: "success",
            message: (error as Error).message,
        };
    }


}
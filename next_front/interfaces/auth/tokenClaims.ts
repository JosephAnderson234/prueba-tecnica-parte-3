export interface JwtPayload {
    jti?: string;
    type?: 'access' | 'refresh';
    fresh?: boolean;
    iat?: number;
    nbf?: number;
    exp?: number;
    sub?: string; // identidad (username)
    csrf?: string;
    // Claims adicionales añadidos por la aplicación
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
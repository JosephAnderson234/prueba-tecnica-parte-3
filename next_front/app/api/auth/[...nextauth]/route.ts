import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginRequest } from '@/interfaces/auth/login';
import { jwtDecode } from "jwt-decode";
import { login } from "@/services/auth";
import { JwtPayload } from "@/interfaces/auth/tokenClaims";



const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials: LoginRequest | undefined) {
                try {
                    if (!credentials) return null;
                    const response = await login({
                        username: credentials.username,
                        password: credentials.password
                    })
                    const token = response.data?.access_token;
                    //como solo tenemos el username dentro del token, y no se ha implementado un /me en el backend, solo decodificamos el token para obtener el username
                    const claims = token ? jwtDecode<JwtPayload>(token) : null;
                    if (!token) return null;
                    
                    //we have just one admin, and this is not in the database, so we hardcode the id, but it should be fetched from the database in a real and more complex app
                    return {
                        id: "adminId",
                        username: claims?.sub || "unknown",
                        accessToken: token,
                    };
                } catch (error) {
                    console.error('Error en autenticación:', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({ session, token }) {
            try {
                let username;
                if (token?.accessToken && typeof token.accessToken === 'string') {
                    const parts = token.accessToken.split('.')
                    if (parts.length === 3) {
                        // jwtDecode puede lanzar si el token está mal formado, así que lo envolvemos
                        const decoded = jwtDecode(token.accessToken) as Record<string, unknown>
                        // admitir tanto `rol` como `role` en el payload
                        username = decoded['sub']
                    }
                }

                // Asignamos los campos de usuario de forma segura
                session.user = {
                    username: username as string || "unknown",
                };
                session.accessToken = (token.accessToken as string) || ""
            } catch (err) {
                // No queremos que una excepción aquí rompa la respuesta del endpoint
                console.error('Error en session callback next-auth:', err)
                // mantener session por defecto si ocurre un error
            }

            return session
        },
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 60*60*24, 
        updateAge: 60 * 60 * 24 * 30,
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
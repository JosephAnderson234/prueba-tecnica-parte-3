"use client";
import { LoginRequest } from "@/interfaces/auth/login";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import LogoImg from "@/public/logo.png"
import Image from "next/image";

export default function LoginForm() {

    const params = useSearchParams();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>()
    const credentialErros = useSearchParams().get("error") === "CredentialsSignin";
    const onSubmit = (data: LoginRequest) => {
        signIn("credentials", {
            username: data.username,
            password: data.password,
            callbackUrl: params.get("callbackUrl") || "/"
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-2xl rounded-2xl px-8 pt-8 pb-10 border border-gray-100">
                    <div className="flex justify-center mb-8">
                        <div className="relative w-32 h-32">
                            <Image src={LogoImg} alt="Logo" className="object-contain" fill />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center text-text mb-8">Iniciar Sesión</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-text mb-2">
                                Usuario
                            </label>
                            <input 
                                type="text" 
                                id="username"
                                {...register("username", { required: true })} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-primary focus:border-transparent transition-all text-text placeholder:text-gray-400"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-text mb-2">
                                Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                {...register("password", { required: true, minLength: 6 })} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-primary focus:border-transparent transition-all text-text"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    
                    {(errors.username || errors.password || credentialErros) && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            {errors.username && <p className="text-sm text-red-600">El usuario es obligatorio</p>}
                            {errors.password && <p className="text-sm text-red-600">La contraseña debe tener al menos 6 caracteres</p>}
                            {credentialErros && <p className="text-sm text-red-600">Credenciales incorrectas</p>}
                        </div>
                    )}
                    
                    <div className="mt-8">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-base-primary hover:bg-base-secondary text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            {isSubmitting ? "Iniciando..." : "Iniciar sesión"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

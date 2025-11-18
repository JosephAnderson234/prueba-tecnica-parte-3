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

    const onSubmit = (data: LoginRequest) => {
        signIn("credentials", {
            email: data.username,
            password: data.password,
            callbackUrl: params.get("callbackUrl") || "/"
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Image src={LogoImg} alt="Logo" />
            </div>
            <div>
                <div>
                    <label htmlFor="username">Usuario:</label>
                    <input type="email" {...register("username", { required: true })} />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" {...register("password", { required: true, minLength: 6 })} />
                </div>
            </div>
            <div>
                {errors.username && <span>El usuario es obligatorio</span>}
                {errors.password && <span>La contraseña es obligatoria</span>}
            </div>
            <div>
                <button type="submit" disabled={isSubmitting}>Iniciar sesión</button>
            </div>
        </form>
    )
}

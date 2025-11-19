"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header () {

    const pathname = usePathname();

    const { data: session } = useSession();
    
    if (pathname === '/login') {
        return null;
    }
    
    return (
        <header className="w-full bg-base-primary text-white px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Administración de Casos</Link>
            {session?.user && (
                <div>
                    Bienvenido, {session.user.username}
                </div>
            )}
        </header>
    );
}
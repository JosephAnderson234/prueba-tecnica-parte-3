"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useHandleUnauthorized(status?: "success" | "error" | "unauthorized") {
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthorized") {
            signOut({ callbackUrl: "/login" });
        }
    }, [status, router]);
}

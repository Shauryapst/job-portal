"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
    const handleSignOut = async () => {
        await signOut();
    };

    useEffect(() => {
        handleSignOut();
    }, []);

    // Return null since there's no UI to render
    return null;
}

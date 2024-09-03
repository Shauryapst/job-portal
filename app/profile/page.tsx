"use server";
import { auth } from "@/auth";
import ProfileForm from "./profileForm";
import { Suspense } from "react";
import prisma from "@/prisma/prismaClient";


export default async function ProfilePage() {
    const session = await auth();
    const email = session?.user?.email;
    await prisma.$connect();
    const existingUser = await prisma.user.findUnique({
        where: { email: email || "" },
    });

    return (
        <div className="w-full h-full justify-center flex items-center">
            <div className="w-6/12 text-white flex flex-col items-center">
                <Suspense>
                    <ProfileForm user={existingUser} />
                </Suspense>
            </div>
        </div>
    );
}

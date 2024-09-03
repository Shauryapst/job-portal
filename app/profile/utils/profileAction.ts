import prisma from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export const updateProfile = async (data: any) => {
    try {
       
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== undefined)
        );
        const { email } = data;
        await prisma.$connect();
        await prisma.user.findUnique({
            where: { email: email || "" },
        });
        await prisma.user.update({
            where: { email: email || "" },
            data: filteredData,
        });
        
        revalidatePath("/profile");
    } catch (error) {
        console.error("Error updating profile:", error);
        throw new Error("Failed to update profile");
    }
};
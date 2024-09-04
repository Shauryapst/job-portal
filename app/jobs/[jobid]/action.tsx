"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/prismaClient";

export async function getJobData(jobId: string) {
    try {
        await prisma.$connect();

        const jobData = await prisma.jobReferral.findUnique({
            where: {
                id: jobId,
            },
            include: {
                createdBy: {
                    select: {
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        return jobData;
    } catch (error) {
        console.error("Error fetching job data:", error);
        return null;
    }
}

export async function getLoggedInUser() {
    const session = await auth();
    return session?.user;
}

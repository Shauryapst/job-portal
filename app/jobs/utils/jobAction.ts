import { auth } from "@/auth";
import prisma from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export async function createEditJob(data: any) {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) {
            throw new Error("User ID is not defined.");
        }

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== undefined)
        );

        const jobData = {
            ...filteredData,
            createdById: userId
        };

        const jobReferral = await prisma.jobReferral.create({
            data: jobData,
        });

        revalidatePath("/jobs");

        return jobReferral;
    } catch (err) {
        console.error("Error in createEditJob:", err);
        throw new Error("Failed to create job");
    }
};

export async function fetchJobs(page: number, limit: number) {
    await prisma.$connect();
    const jobList = await prisma.jobReferral.findMany({
        include: {
            createdBy: {
                select: {
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    return jobList;
}

"use server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongoose";
import JobReferral from "@/models/job";

export async function getJobData(jobId: string) {
    try {
        
        await connectDB();
        const jobData = await JobReferral.findById(jobId)
            .populate("createdBy", "email phone")
            .lean();
       

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

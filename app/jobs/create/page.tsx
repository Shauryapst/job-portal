"use server"
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongoose";
import JobForm from "./JobForm";
import JobReferral from "@/models/job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function createEditJob(data: any) {
    try {
     
        const session = await auth();
        const userId = session?.user?.id;
        // console.log(userId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== undefined)
        );
        // console.log(filteredData);
        const jobData = {
            ...filteredData,
            createdBy: userObjectId,
        };
        // console.log(jobData);

        
        await connectDB();
        const jobReferral = await JobReferral.create(jobData);
        // console.log(jobReferral);
        revalidatePath("/jobs");
    } catch (err) {
        console.error("Error in createEditJob:", err);
        throw new Error("Failed to create job");
    }
}

export default async function CreateJobPage() {
    return (
        <div className="m-5 flex items-center justify-center">
            <JobForm />
        </div>
    );
}

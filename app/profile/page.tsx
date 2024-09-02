"use server";
import { auth } from "@/auth";
import User from "@/models/user";
import { revalidatePath } from "next/cache"; // To refresh the page after update
import ProfileForm from "./profileForm";
import { connectDB } from "@/lib/mongoose";
import { Suspense } from "react";

export const updateProfile = async (data: any) => {
    try {
        // Extract user email from session and form data
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== undefined)
        );
        const { email } = data;
        
        await connectDB();
        await User.findOneAndUpdate(
            { email: email },
            { ...filteredData }
        );

        revalidatePath("/profile"); // This revalidates the profile page after updating
    } catch (error) {
        console.error("Error updating profile:", error);
        throw new Error("Failed to update profile");
    }
};

export default async function ProfilePage() {
    const session = await auth();
    const email = session?.user?.email;
    await connectDB();
    const existingUser = await User.findOne({ email });

    return (
      
        <div className="w-full h-full justify-center flex items-center">
            <div className="w-6/12 text-white flex flex-col items-center">
            <Suspense>
                <ProfileForm
                    user={existingUser}
                />
                </Suspense>
            </div>
        </div>
      
    );
}

import mongoose, { Document, model, Schema } from "mongoose";
import { UserDocument } from "./user";

// Define the interface for the Job Referral document
export interface IJobReferral extends Document {
    referrerEmail: string;
    referrerPhoneNumber: string;
    organization: string;
    description: string;
    designation: string;
    tech_tag: string[];
    experience: number[];
    salary: number[];
    jobUrl: string;
    createdBy: mongoose.Types.ObjectId | UserDocument; // Can be ObjectId or populated UserDocument
}

// Define the schema
const jobReferralSchema: Schema = new Schema({
    referrerEmail: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    referrerPhoneNumber: {
        type: String,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    organization: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    tech_tag: [
        {
            type: String,
            required: true,
        },
    ],
    experience: [
        {
            type: Number,
        },
    ],
    salary: [
        {
            type: Number,
        },
    ],
    jobUrl: {
        type: String,
        match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

// Create the model using the schema and interface
const JobReferral =
    mongoose.models?.JobReferral ||
    model<IJobReferral>("JobReferral", jobReferralSchema);


export default JobReferral;

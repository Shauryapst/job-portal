import mongoose, { Schema, model, Document } from "mongoose";

// Interface to define the structure of a User document
export interface UserDocument extends Document {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    location: string;
    phone: string;
    image: string;
    linkedin: string;
    github: string,
    joinedAt: Date;
}

// Mongoose schema to define the structure of a User collection
const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    linkedin: {
        type: String,
        required: false,
    },
    github : {
        type: String,
        required : false
    },
    joinedAt: {
        type: Date,
        default: Date.now, 
    },
});
const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);
export default User;

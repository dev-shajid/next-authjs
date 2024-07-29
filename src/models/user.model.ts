import mongoose, {Schema, Document} from "mongoose";
import { messageSchema, MessageType } from "./message.model";

export interface UserType extends Document {
    username: string
    email: string;
    password: string
    verifyCode: string
    veifiyCodeExpiry: Date
    isVerified: boolean
    isAcceptingMessage: boolean
    messages: MessageType[];
    createdAt: Date;
}

const userSchema:Schema<UserType> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: true,
    },
    veifiyCodeExpiry: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [messageSchema],
})



const User = mongoose.models.users as mongoose.Model<UserType>  || mongoose.model("users", userSchema);

export default User;
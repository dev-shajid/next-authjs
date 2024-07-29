import mongoose, {Schema, Document} from "mongoose";

export interface MessageType extends Document {
    message: string;
    createdAt: Date;
}

export const messageSchema:Schema<MessageType> = new Schema({
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Message;
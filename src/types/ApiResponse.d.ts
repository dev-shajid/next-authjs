import {MessageType} from '../models/message.model';

interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean;
    messages?: MessageType[];
}
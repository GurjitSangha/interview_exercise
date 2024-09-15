import { Context } from './../models/ContextSchema.dto';
import { Product } from '../models/ContextSchema.dto';
export declare class DirectChatConversationDto {
    product: Product;
    context: Context[];
    userToConverseWith: string;
    currentUserId: string;
}

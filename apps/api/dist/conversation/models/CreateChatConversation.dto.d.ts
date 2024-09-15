import { Permission } from './Permission.dto';
import { Product, Context } from './ContextSchema.dto';
export declare enum TagType {
    subTopic = "subTopic"
}
export declare class Tag {
    id: string;
    type: TagType;
}
export declare class CreateChatConversationDto {
    product: Product;
    context: Context[];
    permissions?: Permission[];
    tags?: Tag[];
    memberIds?: string[];
    blockedMemberIds?: string[];
}

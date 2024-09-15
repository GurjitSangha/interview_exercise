import { ConversationLogic } from './../conversation/conversation.logic';
import { UserBlocksLogic } from '../user-blocks/user-blocks.logic';
import { IAuthenticatedUser } from '../authentication/jwt.strategy';
import { ChatConversationModel } from '../conversation/models/conversation.model';
import { ChatMessageModel } from '../message/models/message.model';
export declare class AbilityFactory {
    private userBlocksLogic;
    private conversationLogic;
    constructor(userBlocksLogic: UserBlocksLogic, conversationLogic: ConversationLogic);
    private isBlockedOnDirectConversation;
    factory(user: IAuthenticatedUser, conversation: ChatConversationModel, message?: ChatMessageModel): Promise<any>;
}

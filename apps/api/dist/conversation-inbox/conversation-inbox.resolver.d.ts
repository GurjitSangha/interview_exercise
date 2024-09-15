import { IAuthenticatedUser } from '../authentication/jwt.strategy';
import { ConversationLogic } from '../conversation/conversation.logic';
import { ChatConversation } from '../conversation/models/ChatConversation.entity';
import { ConversationInbox } from './models/conversation-inbox.entity';
export declare class ConversationInboxResolver {
    private conversationLogic;
    constructor(conversationLogic: ConversationLogic);
    conversations(user: IAuthenticatedUser, conversationInbox: ConversationInbox): Promise<ChatConversation[]>;
    /**
     * This method is here so that the schema picks up the ConversationInbox type
     * Without it, we do not get the auto generated types in the schema file
     *
     * @deprecated
     */
    conversationInboxDoNotUse(): ConversationInbox[];
}

import { ContextType } from '../utils/req.utils';
import { IAuthenticatedUser } from '../authentication/jwt.strategy';
import { ConversationDTO, ConversationLogic } from './conversation.logic';
import { ChatConversation } from './models/ChatConversation.entity';
import { MarkReadMessageDTO } from './models/markReadMessage.input';
import { LastRead } from './models/LastRead.entity';
import { ChatMessage } from '../message/models/message.entity';
import { pinMessageDTO, unpinMessageDTO } from './models/pinnedMessages.dto';
import { ChatMessageDataLoader } from '../message/message.dataloader';
declare type ConversationReference = {
    __typename: string;
    id: string;
};
export declare class ConversationResolver {
    private conversationLogic;
    private chatMessageDataLoader;
    constructor(conversationLogic: ConversationLogic, chatMessageDataLoader: ChatMessageDataLoader);
    /**
     * Note: GqlAuthGuardForReference patches a bug emerging from @nestjs/graphql
     * wherein the GqlExecutionContext receives just 3 arguments instead of
     * 4 after the context passes from ResolveReference.
     * The sequence of root, context, arg, info has changed into
     * root, arg, context, info. Hence it is essential to put that
     * _arg before the context as the set of arguments in the resolveReference
     **/
    resolveReference(reference: ConversationReference, _args: any, // Dont remove this. Read function docs
    ctx: ContextType): Promise<ChatConversation>;
    getChatConversation(id: string, authenticatedUser: IAuthenticatedUser): Promise<ChatConversation>;
    unreadMessageCount(conversation: ChatConversation, authenticatedUser: IAuthenticatedUser): Promise<number>;
    lastMessage(conversation: ConversationDTO): Promise<ChatMessage | undefined>;
    recordLastMessageReadByUser(markReadMessageDto: MarkReadMessageDTO, authenticatedUser: IAuthenticatedUser): Promise<LastRead>;
    pinMessageInConversation(pinMessageDTO: pinMessageDTO, authenticatedUser: IAuthenticatedUser): Promise<ChatConversation>;
    unpinMessageInConversation(unpinMessageDTO: unpinMessageDTO, authenticatedUser: IAuthenticatedUser): Promise<ChatConversation>;
    pinnedMessages(conversation: ConversationDTO): Promise<ChatMessage[]>;
    pinnedMessagesCount(conversation: ConversationDTO): Promise<number>;
}
export {};

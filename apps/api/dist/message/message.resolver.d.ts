import { ObjectId } from 'mongodb';
import { ChatMessage, PaginatedChatMessages, Poll, RichMessageContent } from './models/message.entity';
import { MessageDto, GetMessageDto, DeleteMessageDto, LikeMessageDto, ResolveMessageDto, ReactionDto, TagsDto } from './models/message.dto';
import { MessageLogic } from './message.logic';
import { IAuthenticatedUser } from '../authentication/jwt.strategy';
import { SafeguardingService } from '../safeguarding/safeguarding.service';
import { ChatMessageDataLoader } from './message.dataloader';
declare type ChatMessageReference = {
    __typename: string;
    id: ObjectId;
};
export declare class MessageResolver {
    private messageLogic;
    private safeguardingService;
    private chatMessageDataLoader;
    constructor(messageLogic: MessageLogic, safeguardingService: SafeguardingService, chatMessageDataLoader: ChatMessageDataLoader);
    resolveReference(reference: ChatMessageReference): Promise<ChatMessage>;
    sendConversationMessage(messageDto: MessageDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    getMessagesForChatConversation(getMessageDto: GetMessageDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage[]>;
    getChatConversationMessages(getMessageDto: GetMessageDto, authenticatedUser: IAuthenticatedUser): Promise<PaginatedChatMessages>;
    deleteConversationMessage(deleteMessageDto: DeleteMessageDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    resolveConversationMessage(resolveMessageDto: ResolveMessageDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    unresolveConversationMessage(resolveMessageDto: ResolveMessageDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    likeConversationMessage(likeMessageDto: LikeMessageDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    unlikeConversationMessage(likeMessageDto: LikeMessageDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    addReactionToMessage(reactionDto: ReactionDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    removeReactionFromMessage(reactionDto: ReactionDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    updateTagsOfMessage(tagsDto: TagsDto, authenticatedUser: IAuthenticatedUser): Promise<ChatMessage>;
    text(message: ChatMessage): string;
}
export declare class RichMessageContentResolver {
    private chatMessageDataLoader;
    private messageLogic;
    constructor(chatMessageDataLoader: ChatMessageDataLoader, messageLogic: MessageLogic);
    getReplyMessage(richMessageContent: RichMessageContent): Promise<ChatMessage | undefined>;
    addVote(chatMessageId: ObjectId, option: string, authenticatedUser: IAuthenticatedUser): Promise<Poll | undefined>;
    removeVote(chatMessageId: ObjectId, option: string, authenticatedUser: IAuthenticatedUser): Promise<Poll | undefined>;
}
export {};

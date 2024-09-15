import { ILoader, Loader } from '../utils/loader';
import { MessageLogic } from './message.logic';
import { ChatMessage } from './models/message.entity';
export interface IChatMessageDataLoader extends ILoader<ChatMessage> {
}
export declare class ChatMessageDataLoader extends Loader<ChatMessage> implements IChatMessageDataLoader {
    constructor(messageLogic: MessageLogic);
}

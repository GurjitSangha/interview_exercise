import { IAuthenticatedUser } from '../authentication/jwt.strategy';
import { ConversationData } from '../conversation/conversation.data';
import { MessageData } from '../message/message.data';
import { AbilityFactory } from './ability-factory';
import { Action } from './models/permissions.model';
export declare class PermissionsService {
    private conversationData;
    private messageData;
    private abilityFactory;
    constructor(conversationData: ConversationData, messageData: MessageData, abilityFactory: AbilityFactory);
    private stringifyUser;
    conversationPermissions({ user, conversationId, action, }: {
        user: IAuthenticatedUser;
        conversationId: string;
        action: Action;
    }): Promise<boolean>;
    messagePermissions({ user, messageId, action, }: {
        user: IAuthenticatedUser;
        messageId: string;
        action: Action;
    }): Promise<boolean>;
}

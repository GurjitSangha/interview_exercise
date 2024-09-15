import { ConversationLogic } from '../conversation/conversation.logic';
import { BlockUserRequestDTO } from './dtos/blockUserRequest.dto';
import { UserBlocksLogic } from './user-blocks.logic';
export declare class UserBlocksController {
    private userBlocksLogic;
    private conversationLogic;
    constructor(userBlocksLogic: UserBlocksLogic, conversationLogic: ConversationLogic);
    toggleUserBlock(blockUserDTO: BlockUserRequestDTO): Promise<void>;
}

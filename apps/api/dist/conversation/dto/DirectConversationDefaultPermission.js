"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectConversationDefaultPermissions = void 0;
const permissions_model_1 = require("./../../permissions/models/permissions.model");
exports.DirectConversationDefaultPermissions = [
    {
        action: permissions_model_1.Action.readConversation,
        subject: permissions_model_1.Subject.user,
        conditions: {
            userId: {
                $in: 'conversation.memberIds',
                $nin: 'conversation.blockedMemberIds',
            },
        },
    },
    {
        action: permissions_model_1.Action.sendMessage,
        subject: permissions_model_1.Subject.user,
        conditions: {
            userId: {
                $in: 'conversation.memberIds',
                $nin: 'conversation.blockedMemberIds',
            },
        },
    },
    {
        action: permissions_model_1.Action.updateMessage,
        subject: permissions_model_1.Subject.user,
        conditions: {
            userId: {
                $eq: 'message.senderId',
                $nin: 'conversation.blockedMemberIds',
            },
        },
    },
    {
        action: permissions_model_1.Action.deleteMessage,
        subject: permissions_model_1.Subject.user,
        conditions: {
            userId: {
                $eq: 'message.senderId',
                $nin: 'conversation.blockedMemberIds',
            },
        },
    },
    {
        action: permissions_model_1.Action.pinMessage,
        subject: permissions_model_1.Subject.user,
        conditions: {
            universityId: { $in: 'conversation.universityIds' },
        },
    },
];
//# sourceMappingURL=DirectConversationDefaultPermission.js.map
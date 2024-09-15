export declare enum Subject {
    user = "User",
    all = "all"
}
export declare enum Action {
    manage = "manage",
    readConversation = "readConversation",
    sendMessage = "sendMessage",
    updateMessage = "updateMessage",
    deleteMessage = "deleteMessage",
    resolveMessage = "resolveMessage",
    pinMessage = "pinMessage",
    createPoll = "createPoll"
}
export declare enum AccountRole {
    applicant = "applicant",
    mentor = "mentor",
    staff = "staff",
    university = "university",
    admin = "admin"
}
export declare enum ConditionField {
    messageSenderId = "message.senderId",
    conversationMemberIds = "conversation.memberIds",
    conversationBlockedMemberIds = "conversation.blockedMemberIds",
    conversationUniversityIds = "conversation.universityIds"
}
export declare class Conditions {
    userId?: any;
    universityId?: any;
    accountRole?: AccountRole;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageDataForTest = void 0;
/**
 * Helper function that creates x {count} messages for the purposes of
 * this test suite. It stores the ids in an array and we can then
 * configure the correct message id to set as the offset.
 */
async function createMessageDataForTest(conversationId, messageArray, count, messageData, senderId) {
    let i = 0;
    for (i; i < count; i++) {
        const message = await messageData.create({ conversationId, text: `Message ${i + 1}` }, senderId);
        messageArray.push(message.id);
    }
    return messageArray;
}
exports.createMessageDataForTest = createMessageDataForTest;
//# sourceMappingURL=message.test-utils.js.map
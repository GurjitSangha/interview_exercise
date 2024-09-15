import { ObjectID } from 'mongodb';
import { MessageData } from '../message.data';
/**
 * Helper function that creates x {count} messages for the purposes of
 * this test suite. It stores the ids in an array and we can then
 * configure the correct message id to set as the offset.
 */
export declare function createMessageDataForTest(conversationId: ObjectID, messageArray: ObjectID[], count: number, messageData: MessageData, senderId: ObjectID): Promise<ObjectID[]>;

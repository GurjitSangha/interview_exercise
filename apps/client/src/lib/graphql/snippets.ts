import { gql } from 'graphql-request';

export const getChatConversationMessages = gql`
  query ($getMessageDto: GetMessageDto!) {
    getChatConversationMessages(getMessageDto: $getMessageDto) {
      messages {
        id
        created
        text
        sender {
          id
        }
        deleted
        isSenderBlocked
      }
      hasMore
    }
  }
`;

export const sendConversationMessageMutation = gql`
  mutation ($messageDto: MessageDto!) {
    sendConversationMessage(messageDto: $messageDto) {
      id
      text
      created
      resolved
      sender {
        id
      }
      deleted
    }
  }
`;

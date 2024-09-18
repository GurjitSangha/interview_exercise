import React from 'react';
import { Message } from './message';

export interface IMessageProps {
  text: string;
  id: string;
  sender: {
    id: string;
  };
  created: string;
}

interface IMessageListProps {
  messages: IMessageProps[];
}

export const MessageList = ({ messages }: IMessageListProps) => {
  return (
    <div className="flex flex-col items-end h-screen gap-2 mt-10 overflow-y-auto w-80">
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

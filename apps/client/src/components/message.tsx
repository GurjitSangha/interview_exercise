import React from 'react';

interface IMessageProps {
  message: {
    text: string;
    id: string;
    sender: {
      id: string;
    };
    created: string;
  };
}

export const Message = ({ message }: IMessageProps) => {
  return (
    <div className="p-4 text-black bg-green-200 rounded">
      <p>{message.text}</p>
    </div>
  );
};

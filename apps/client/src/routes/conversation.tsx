import { Form, Link, useActionData, useLoaderData } from 'react-router-dom';
import { MessageList } from '../components/messageList';
import { createClient } from '../lib/graphql/client';
import {
  getChatConversationMessages,
  sendConversationMessageMutation,
} from '../lib/graphql/snippets';
import { generateObjectId } from '../lib/utils';

interface IConversationData {
  id: string;
  messages: string[];
}

export async function loader({ params }): Promise<IConversationData> {
  const client = await createClient();
  const result = await client.request(getChatConversationMessages, {
    getMessageDto: {
      conversationId: params.id,
      offsetId: generateObjectId(),
    },
  });

  return {
    id: params.id,
    messages: result?.getChatConversationMessages?.messages,
  };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const message = formData.get('message');
  const client = await createClient();
  const result = await client.request(sendConversationMessageMutation, {
    messageDto: {
      conversationId: params.id,
      text: message,
      richContent: null,
    },
  });

  return { message: result?.sendConversationMessage?.message };
}

const Conversation = () => {
  const data = useLoaderData();
  const actionResult = useActionData();
  console.log({ data, actionResult });

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-white bg-slate-700">
      {!data && <span>Loading...</span>}
      {data?.messages?.length === 0 ? (
        <span>No messages yet</span>
      ) : (
        <MessageList messages={data.messages} />
      )}

      <Form method="POST" className="flex items-center gap-4 my-4">
        <input
          type="text"
          name="message"
          placeholder="Enter message..."
          className="px-4 py-2 text-black border border-blue-400 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 border border-blue-400 rounded"
        >
          Send
        </button>
      </Form>
      <p>Conversation ID: {data.id}</p>
      <Link to="/" className="underline">
        Back to Homepage
      </Link>
    </div>
  );
};

export default Conversation;

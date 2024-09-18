import { Form, redirect } from 'react-router-dom';
import { generateObjectId } from '../lib/utils';

export async function action() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/conversation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({
      product: 'community',
      context: [
        {
          id: generateObjectId(),
          type: 'university',
        },
      ],
      permissions: [
        {
          action: 'manage',
          subject: 'all',
        },
      ],
    }),
  });

  if (response.ok) {
    const json = await response.json();
    return redirect(`/conversation/${json.id}`);
  }
  return null;
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-white bg-slate-700">
      <Form method="POST">
        <button
          type="submit"
          className="px-4 py-2 border border-blue-400 rounded"
        >
          New One Way Conversation
        </button>
      </Form>
    </div>
  );
}

export default Home;

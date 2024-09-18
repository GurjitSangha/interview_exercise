import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Conversation, {
  loader as conversationLoader,
  action as messageAction,
} from './routes/conversation.tsx';
import Home, { action as newConversation } from './routes/root.tsx';
import ErrorPage from './errorPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    action: newConversation,
  },
  {
    path: '/conversation/:id',
    element: <Conversation />,
    loader: conversationLoader,
    errorElement: <ErrorPage />,
    action: messageAction,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

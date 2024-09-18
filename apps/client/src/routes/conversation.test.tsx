import React from 'react';
import '@testing-library/jest-dom';
import { test, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Conversation, { loader } from './conversation';
import ErrorPage from '../errorPage';

vi.mock('graphql-request', () => {
  return {
    GraphQLClient: vi.fn(() => ({
      request: vi.fn((query, variables) => {
        if (variables.getMessageDto.conversationId === '0') {
          return {
            getChatConversationMessages: {
              messages: [],
            },
          };
        } else {
          return {
            getChatConversationMessages: {
              messages: [{ id: 123, text: 'Hello' }],
            },
          };
        }
      }),
      setHeader: vi.fn(),
    })),
    gql: vi.fn(),
  };
});

describe('conversation page', () => {
  const routes = [
    {
      path: '/conversation/:id',
      element: <Conversation />,
      loader,
      errorElement: <ErrorPage />,
    },
  ];

  const emptyRouter = createMemoryRouter(routes, {
    initialEntries: ['/conversation/0'],
    initialIndex: 0,
  });
  test('displays the no messages yet message when there are no messages', async () => {
    render(<RouterProvider router={emptyRouter} />);
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
  });

  const messagesRouter = createMemoryRouter(routes, {
    initialEntries: ['/conversation/1'],
    initialIndex: 0,
  });
  test('displays the messages when there are messages', async () => {
    render(<RouterProvider router={messagesRouter} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});

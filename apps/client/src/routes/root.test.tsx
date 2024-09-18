import React from 'react';
import '@testing-library/jest-dom';
import { test, expect, describe, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { createMemoryRouter, Route, RouterProvider } from 'react-router-dom';
import Home, { action } from './root';

global.fetch = vi.fn();
function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe('homepage', () => {
  const routes = [
    {
      path: '/',
      element: <Home />,
      action,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });

  test('displays the new conversation button', async () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(
      'New One Way Conversation',
    );
  });

  test('calls the form action on button click', () => {
    const data = { id: 1234 };
    fetch.mockResolvedValue(createFetchResponse(data));

    render(<RouterProvider router={router} />);

    act(() => {
      screen.getByRole('button').click();
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_API_URL}/conversation`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-api-key': process.env.VITE_API_KEY,
        },
      }),
    );
  });
});

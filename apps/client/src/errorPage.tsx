import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 text-white bg-slate-700">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button className="px-3 py-1 border rounded" onClick={() => navigate(0)}>
        Reload Page
      </button>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}

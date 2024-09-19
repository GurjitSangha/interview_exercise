## Unibuddy Exercise

Ensure the docker containers are running with

```bash
$ docker compose up -d
```

Install turborepo in the root directory with

```bash
$ npm install
```

This should also install the dependencies for the two applications

To run the client and API applications use, also in the root directory

```bash
$ turbo start:dev
```

You will need to copy the contents of `apps/client/env/.env.test` into `apps/client/env/.env.local` to run the app.
As it is a client side application, this does expose the env vars to the browser, which is not ideal and given time
a server rendered approach would be considered.

The API is the provided NestJS application and runs on http://localhost:3000

The frontend client is a Vite React application and runs on http://localhost:5173

The tests can be run in the root directory using

```bash
$ turbo test
```

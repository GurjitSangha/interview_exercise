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

The API is the provided NestJS application and runs on http://localhost:3000

The frontend client is a Vite React application and runs on http://localhost:5173

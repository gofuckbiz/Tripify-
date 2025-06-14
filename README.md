# Tripify

Minimal MVP skeleton for a vacation destination picker.

## Backend

Located in the `server` directory. It uses Express and provides a few sample API
endpoints. To run it:

```bash
cd server
npm install
npm start
```

This starts the server on port `3001` with a couple of example places and review
endpoints.

## Frontend

The React application is in the `client` directory. To start it:

```bash
cd client
npm install
npm run dev
```

The frontend expects the backend to run on `localhost:3001` and will display the
list of demo places on the home page.

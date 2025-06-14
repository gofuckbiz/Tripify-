# Tripify

Vacation destination picker MVP with sample search and login.

## Backend

Located in the `server` directory. It uses Express and provides sample API
endpoints including registration and login. To run it:

```bash
cd server
npm install
npm start
```

This starts the server on port `3001` with example places and review endpoints.

## Frontend

The React application is in the `client` directory. To start it:

```bash
cd client
npm install
npm run dev
```

The frontend expects the backend to run on `localhost:3001`. It provides a
simple search form with filters and an interactive map. Users can register and
log in; authentication is stored in memory for demo purposes.
The place details page attempts to fetch weather data from Open-Meteo, which may
require network access.

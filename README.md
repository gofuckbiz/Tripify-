# Tripify

This is a minimal backend MVP for the Tripify vacation destination selector.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start on port 3000.

## API Endpoints

- `GET /api/places` – list of places. Supports `type` and `budget` query parameters.
- `GET /api/places/:id` – details for a single place including reviews.
- `POST /api/reviews` – add a review (requires Authorization header with JWT).
- `POST /api/auth/login` – authenticate and receive a token.

This backend uses in-memory data for demonstration purposes and does not
persist changes between runs.

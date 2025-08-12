# CampusConnect – Backend (Node.js + Express)

This is a simple backend for the CampusConnect project. It uses an in-memory JavaScript array as the data store (data resets when the server restarts). Swagger UI is included for interactive API documentation.

## Requirements
- Node.js (v14+ recommended)
- npm

## Setup
1. Open terminal and navigate to this `backend` folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Start server (development):
   ```
   npx nodemon server.js
   ```
   or in production:
   ```
   npm start
   ```

Server will run at `http://localhost:5000`.
API base path is `http://localhost:5000/api`.
Swagger UI (interactive docs): `http://localhost:5000/api-docs`

## Endpoints
- `GET /api/events` — list events
- `POST /api/events` — create event
- `GET /api/events/:id` — get single event
- `PUT /api/events/:id` — update event
- `DELETE /api/events/:id` — delete event

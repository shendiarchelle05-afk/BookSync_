# BookSync — MERN Stack Book Club

BookSync is a no-authentication, event-driven book club web app built with **MongoDB, Express, React, and Node.js (MERN)**. Socket.IO broadcasts live in-app notifications when discussions, chapter milestones, or meetings are created or updated.

## What's included

- React + Vite frontend
- Express REST API and Mongoose models
- MongoDB connection preconfigured for `mongodb://127.0.0.1:27017/booksync`
- Seed script with sample discussions, milestones, upcoming meetings, and notifications
- Socket.IO real-time notifications
- CRUD for discussions, milestones, and meetings; discussion search; notification read/delete endpoints
- Docker Compose file to start MongoDB without installing it separately

## Requirements

- Node.js 18 or newer
- Docker Desktop **or** MongoDB Community Server
- [OpenRouter](https://openrouter.ai/) API key for the AI assistant

## First-time setup (Windows / VS Code)

1. Extract this folder and open `booksync` in VS Code.
2. Start MongoDB using Docker Desktop, then run in the project terminal:

   ```bash
   docker compose up -d mongodb
   ```

   If you already installed MongoDB Community Server and it is running locally, you can skip this step.

3. Install dependencies:

   ```bash
   npm install
   npm run install:all
   ```

4. Create `server/.env` by copying `server/.env.example`. Keep the MongoDB URI as provided for local Docker development, and add your OpenRouter API key as described below.
5. Insert demo data:

   ```bash
   npm run seed
   ```

   **Note:** Seeding clears the existing BookSync collections before inserting the demo records. Do not run it if you need to keep your current data.

6. Start frontend and backend together:

   ```bash
   npm run dev
   ```

7. Open **http://localhost:5173**.

## Set up the AI Book Discussion Assistant (OpenRouter)

1. Create an account at [OpenRouter](https://openrouter.ai/) and create an API key from your [API keys page](https://openrouter.ai/keys). You can start with a free model route; free model availability and rate limits can change.
2. Create your backend environment file by copying the example:

   ```powershell
   Copy-Item server/.env.example server/.env
   ```

3. Open `server/.env` and replace `your_openrouter_api_key_here` with your real key. Keep the key in this backend file only; never put it in React's `client/.env` or commit it to GitHub.

   ```env
   OPENROUTER_API_KEY=sk-or-v1-your-real-key-here
   OPENROUTER_MODEL=openrouter/free
   ```

   `openrouter/free` routes requests to an available free model. Free models can be rate-limited or temporarily unavailable. To use a specific model instead, copy its exact model ID from [OpenRouter's model catalogue](https://openrouter.ai/models) into `OPENROUTER_MODEL`; paid models may require account credits.

4. Install dependencies if you have not already:

   ```powershell
   npm install
   npm run install:all
   ```

5. Start MongoDB, then run the project from its root folder:

   ```powershell
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173), choose **AI Assistant**, and try **Generate questions** or send a book-related question.
7. Check [http://localhost:5000/api/ai/status](http://localhost:5000/api/ai/status). It confirms whether the API key is configured; it does not send a paid model request.

The assistant provides **Ask a question**, **Generate questions**, and **Explain a passage** modes. The Express backend sends requests to OpenRouter's `POST https://openrouter.ai/api/v1/chat/completions` endpoint. The API key is read only by the backend. Chat history is held in browser state and is not saved to MongoDB. Since OpenRouter routes prompts to external model providers, avoid sending sensitive personal information.

## Connection details

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000/api/health`
- MongoDB: `mongodb://127.0.0.1:27017/booksync`
- Socket.IO: `http://localhost:5000`

The server only starts listening after the MongoDB connection succeeds. If MongoDB is unavailable, the server prints a connection error instead of silently running disconnected.

## API endpoints

- `GET /api/health`, `GET /api/dashboard`
- `GET /api/ai/status`, `POST /api/ai/chat` (OpenRouter AI assistant)
- `GET /api/discussions`, `/api/discussions/:id`, `/api/discussions/search?q=term`
- `POST`, `PUT /api/discussions/:id`, `DELETE /api/discussions/:id`
- `GET /api/milestones`, `/api/milestones/:id`; corresponding POST/PUT/DELETE
- `GET /api/meetings`, `/api/meetings/:id`; corresponding POST/PUT/DELETE
- `GET /api/notifications`, `/api/notifications/unread`, `/api/notifications/:id`
- `PATCH /api/notifications/:id/read`, `DELETE /api/notifications/:id`

## Notes

- Authentication is intentionally not included for this coursework checkpoint. Do not expose the unauthenticated app to the public internet with real user data.
- In-app notifications are event-driven. The meeting `reminderMinutes` field is saved; timed reminders that fire automatically before a meeting require a scheduler and are not the same as immediate event notifications.
- For MongoDB Atlas, replace `MONGO_URI` in `server/.env` with your Atlas connection string and ensure your network access/database user are configured.

# BookSync Backend API

Express + MongoDB + Socket.IO backend. Authentication is intentionally disabled for the checkpoint.

## Setup

1. Install Node.js and MongoDB (local MongoDB or MongoDB Atlas).
2. From the `server` directory run `npm install`.
3. Copy `.env.example` to `.env`, set `MONGO_URI` if needed, and add your OpenRouter API key as `OPENROUTER_API_KEY`. Keep the key on the backend only.
4. The default model is `openrouter/free`. You can change `OPENROUTER_MODEL` to a model ID from https://openrouter.ai/models.
5. Run `npm run dev`.

Default API URL: `http://localhost:5000`

## AI endpoints

- `GET /api/ai/status` — checks whether the OpenRouter API key is configured
- `POST /api/ai/chat` — sends the book question, mode, and limited conversation context to OpenRouter

## GET endpoints

- `GET /api/health` — server health check
- `GET /api/dashboard` — dashboard counts and latest records
- `GET /api/discussions` — all discussions; optional search with `?q=keyword`
- `GET /api/discussions/search?q=keyword` — search discussions by title, book, content, author, or tags
- `GET /api/discussions/:id` — one discussion
- `GET /api/milestones` — all milestones
- `GET /api/milestones/:id` — one milestone
- `GET /api/meetings` — all meetings
- `GET /api/meetings/:id` — one meeting
- `GET /api/notifications` — latest notifications
- `GET /api/notifications/unread` — unread notifications
- `GET /api/notifications/:id` — one notification

## Other CRUD endpoints

- Discussions: `POST /api/discussions`, `PUT /api/discussions/:id`, `DELETE /api/discussions/:id`
- Milestones: `POST /api/milestones`, `PUT /api/milestones/:id`, `DELETE /api/milestones/:id`
- Meetings: `POST /api/meetings`, `PUT /api/meetings/:id`, `DELETE /api/meetings/:id`
- Notifications: `PATCH /api/notifications/:id/read`, `DELETE /api/notifications/:id`

New discussion, milestone, and meeting actions emit Socket.IO notification events. Meeting reminder scheduling is not included yet; `reminderMinutes` is stored as data only.

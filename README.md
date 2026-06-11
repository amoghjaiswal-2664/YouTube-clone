# YouTube Clone

A simple YouTube-style web application built with a Bun-powered React frontend and an Express + Prisma backend.

## Repository Structure

- `backend/` - Express API, Prisma database access, authentication, and Cloudflare R2 video upload integration.
- `frontend/` - Bun + React application with client-side routing and UI for browsing, signing in, signing up, uploading videos, and viewing video pages.

## Features

- User signup and signin with JWT authentication.
- Video upload metadata storage using Prisma and PostgreSQL.
- Cloudflare R2 presigned URL upload flow for video files.
- Browse videos, view video details, and view channel uploads.
- Bun-based development experience for both frontend and backend.

## Requirements

- Bun
- PostgreSQL database
- Cloudflare R2 credentials for file uploads

## Environment Variables

### Backend

Create a `.env` file in `backend/` or set these in your environment:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret used to sign JWT session tokens
- `R2_ACCESS_KEY_ID` - Cloudflare R2 access key ID
- `R2_ACCESS_SECRET` - Cloudflare R2 secret access key

Example:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/youtube
JWT_SECRET=supersecretkey
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_ACCESS_SECRET=your-r2-secret-access-key
```

> The backend code currently uses a fixed R2 bucket and endpoint inside `backend/index.ts`.

## Setup

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:

```bash
cd backend
bun install
```

3. Generate Prisma client and run migrations:

```bash
cd backend
bun --bun run prisma generate
bun --bun run prisma migrate dev --name init
```

4. Start the backend server:

```bash
bun run index.ts
```

The backend listens on `http://localhost:3000`.

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:

```bash
cd frontend
bun install
```

3. Start development server:

```bash
bun dev
```

The frontend server starts on `http://localhost:3001` by default.

## Build

Build the frontend for production:

```bash
cd frontend
bun build ./src/index.html --outdir=dist --sourcemap --target=browser --minify --define:process.env.NODE_ENV='"production"' --env='BUN_PUBLIC_*'
```

Run the frontend in production mode:

```bash
cd frontend
bun start
```

## API Endpoints

### Auth

- `POST /api/signup` - Register a new user
- `POST /api/signin` - Authenticate existing user

### Videos

- `GET /api/videos` - List all videos
- `GET /api/videos/:id` - Get details for a specific video
- `POST /api/videos` - Create a new video metadata record (requires Bearer JWT auth)
- `POST /getPresignedUrl` - Generate a Cloudflare R2 presigned upload URL

### Channels

- `GET /channel/:username` - Get channel details and uploads by username

## Database Schema

The backend uses Prisma with the following models:

- `User`
  - `id`, `username`, `password`, `gender`, `channelName`, `banner`, `profilePicture`, `subscriberCount`, `description`
- `Uploads`
  - `id`, `title`, `videoUrl`, `thumbnail`, `userId`, `createdAt`
- `Gender` enum with values `Male`, `Female`, and `Other`

## Notes

- The backend is configured for Bun and Prisma.
- The frontend uses React Router v7 and Bun's hot reload.
- The presigned upload endpoint uses Cloudflare R2 and expects a `video/mp4` file upload.

## Troubleshooting

- If Prisma cannot connect, verify `DATABASE_URL` and PostgreSQL availability.
- If auth fails, check `JWT_SECRET` is set and consistent across backend restarts.
- If uploads fail, confirm `R2_ACCESS_KEY_ID`, `R2_ACCESS_SECRET`, and the R2 endpoint are correct.

## License

This repository does not specify a license.

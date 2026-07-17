# Saral — AI Legal Assistant

AI-powered legal assistance for every Indian citizen — no lawyer required.

## Project Structure

```
saral/
├── artifacts/
│   ├── nyay-ai/          # React + Vite frontend
│   └── api-server/       # Express backend (Node.js)
├── lib/
│   ├── db/               # Database schema (Drizzle ORM + PostgreSQL)
│   ├── api-zod/          # Shared API types/validation
│   ├── api-client-react/ # Generated API client
│   └── api-spec/         # OpenAPI spec
├── package.json          # Root workspace config
├── pnpm-workspace.yaml   # pnpm monorepo config
└── pnpm-lock.yaml        # Lockfile
```

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Wouter (routing)
- **Backend:** Express 5, TypeScript, Pino (logging)
- **Database:** PostgreSQL via Drizzle ORM
- **AI:** LLaMA 3.3 70B via Groq API

---

## Local Development

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)
- PostgreSQL database

### Setup

```bash
# Install dependencies
pnpm install

# Set environment variables (see below)
cp .env.example .env

# Push database schema
cd lib/db && pnpm db:push

# Start backend (port 8080)
pnpm --filter @workspace/api-server run dev

# Start frontend (port 3000) — in a separate terminal
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/nyay-ai run dev
```

---

## Deployment

The app has two parts to deploy: the **backend API** and the **frontend**.

### 1. Deploy the Backend → Railway (recommended)

1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub repo
2. Select **`artifacts/api-server`** as the root directory (or set it in Railway settings)
3. Railway will detect Node.js automatically
4. Add a **PostgreSQL** plugin inside Railway (free tier available)
5. Set these environment variables in Railway:

| Variable | Value |
|---|---|
| `PORT` | `8080` (Railway sets this automatically) |
| `DATABASE_URL` | Auto-filled by Railway's PostgreSQL plugin |
| `OPENAI_API_KEY` | Your Groq API key (starts with `gsk_...`) |
| `NODE_ENV` | `production` |

6. Set the **start command** to:
   ```
   node --enable-source-maps ./dist/index.mjs
   ```
7. Set the **build command** to:
   ```
   npm install -g pnpm && pnpm install && node ./build.mjs
   ```
8. After deploy, copy the Railway URL (e.g. `https://saral-api.railway.app`)

> **Run DB migrations** once after first deploy:
> In Railway's shell or via CLI: `pnpm --filter @workspace/db db:push`

---

### 2. Deploy the Frontend → Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
2. Set **Root Directory** to `artifacts/nyay-ai`
3. Vercel will detect Vite automatically. Override these settings:

| Setting | Value |
|---|---|
| **Build Command** | `cd ../.. && pnpm install && pnpm --filter @workspace/nyay-ai run build` |
| **Output Directory** | `dist/public` |
| **Install Command** | *(leave blank — handled by build command)* |

4. Add these environment variables in Vercel:

| Variable | Value |
|---|---|
| `BASE_PATH` | `/` |
| `NODE_ENV` | `production` |

5. Add a **`vercel.json`** in the repo root (already included below) to proxy `/api/*` calls to your Railway backend.

---

## Environment Variables Reference

### Backend (`artifacts/api-server`)
| Variable | Description |
|---|---|
| `PORT` | Port to listen on (set by host) |
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENAI_API_KEY` | Groq API key (`gsk_...`) |
| `NODE_ENV` | `development` or `production` |
| `SESSION_SECRET` | Secret for session signing |

### Frontend (`artifacts/nyay-ai`)
| Variable | Description |
|---|---|
| `PORT` | Dev server port |
| `BASE_PATH` | Base URL path (use `/` for root) |
| `VITE_API_URL` | Backend URL (if not using proxy) |

---

## Database Schema

Three tables managed by Drizzle ORM in `lib/db/src/schema/`:
- `conversations` — chat conversation sessions
- `messages` — individual chat messages
- `legal_documents` — created/saved legal documents

To push schema changes:
```bash
pnpm --filter @workspace/db db:push
```

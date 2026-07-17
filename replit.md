# NyayAI — Indian Legal Assistant

AI-powered legal assistant that helps ordinary Indians understand their rights, explain legal documents, and create legal paperwork — without needing a lawyer.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/nyay-ai run dev` — run the frontend (port 20613)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Required env: `OPENAI_API_KEY` — OpenAI API key for AI features

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui (Wouter routing)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- AI: OpenAI GPT-4o-mini (chat, document explanation, document generation)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/` — DB schema (conversations, messages, legal_documents)
- `artifacts/api-server/src/routes/conversations.ts` — Chat conversation endpoints
- `artifacts/api-server/src/routes/legal.ts` — Legal document types, explain, create, stats
- `artifacts/nyay-ai/src/` — React frontend

## Architecture decisions

- OpenAI GPT-4o-mini used for all AI features (chat, explain, create) — cost-effective and fast
- SSE streaming for all AI responses — conversations, document explanation, document creation
- Indian law system prompt baked into the server — covers Constitution, IPC/BNS, CPC, RTI, Consumer Protection, etc.
- 6 document templates: Affidavit, Legal Notice, Rent Agreement, Consumer Complaint, NOC, Power of Attorney
- Documents saved to DB after generation so users can revisit them

## Product

- **Legal Chat** — multi-turn AI conversations about Indian law, with persistent history
- **Document Explainer** — paste any legal document, get a plain-language explanation (supports En/Hi/Ta/Bn/Te/Mr)
- **Document Creator** — step-based form to generate legal documents (affidavit, notice, rent agreement, etc.)
- **Document Library** — browse and download all previously created documents

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- SSE streaming endpoints (sendMessage, explainDocument, createDocument) must be consumed with `fetch` + `ReadableStream`, NOT the generated React Query hooks
- Always use `import.meta.env.BASE_URL` prefix for API calls in the frontend
- After OpenAPI spec changes, run `pnpm --filter @workspace/api-spec run codegen` before anything else

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

# Only Used Tesla — Support Chat (Demo)

Minimal Next.js + Vercel AI SDK chatbot for quick demos.

## Local setup

1. Install deps:
   ```bash
   npm i
   # or pnpm i / yarn
   ```

2. Add env:
   Create `.env.local` at the repo root:
   ```
   OPENAI_API_KEY=sk-...
   ```

3. Run dev:
   ```bash
   npm run dev
   # open http://localhost:3000
   ```

## Deploy

1. Push to GitHub.
2. In Vercel, **Import Project** → select this repo.
3. Add **Environment Variable**: `OPENAI_API_KEY`.
4. Deploy.

## Notes
- Server route: `app/api/chat/route.ts` (Edge runtime).
- UI uses `ai/react`’s `useChat` hook and streams responses.
- System prompt keeps answers on-brand and safe.
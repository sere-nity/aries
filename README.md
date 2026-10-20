# Aries

Live: [aries-phi.vercel.app](https://aries-phi.vercel.app)

Ask a question about the news. An LLM turns it into GNews keywords and the matching articles are listed. Click an article to see a summary and sentiment (positive, neutral or negative). Analyses are cached in Postgres by article id, so each article is only sent to the LLM once.

## Stack

Next.js (Pages Router), React, Neon Postgres (`pg`), OpenAI `gpt-4.1-nano` with Zod, GNews, Vercel.

## API

- `POST /api/search`: `{ question }` → `{ q, articles }`
- `POST /api/articles/:id/analysis`: `{ title, description, content, url }` → `{ summary, sentiment }` (200 if cached, 201 if new)

## Run locally

```bash
npm install
cp .env.example .env.local   # add OPENAI_API_KEY, GNEWS_API_KEY, DATABASE_URL
psql "$DATABASE_URL" -f db/schema.sql
npm run dev
```

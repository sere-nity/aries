CREATE TABLE IF NOT EXISTS article_analysis (
    article_id TEXT PRIMARY KEY,
    url        TEXT NOT NULL,
    title      TEXT NOT NULL,
    summary    TEXT NOT NULL,
    sentiment  TEXT NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

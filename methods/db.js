import { Pool } from "pg";


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// output = { summary: "...", sentiment: "positive" } or null
export const getAnalysis = async (articleId) => {

    const result = await pool.query(
        "SELECT summary, sentiment FROM article_analysis WHERE article_id = $1",
        [articleId]
    );

    return result.rows[0] ?? null
};

export const saveAnalysis = async ({ articleId, url, title, summary, sentiment }) => {

    await pool.query(
        `INSERT INTO article_analysis (article_id, url, title, summary, sentiment)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (article_id) DO NOTHING`,
        [articleId, url, title, summary, sentiment]
    );
};

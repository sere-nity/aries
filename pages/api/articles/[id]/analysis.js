import { analyseArticle } from "@/methods/llmMethods";
import { getAnalysis, saveAnalysis } from "@/methods/db";

// POST /api/articles/:id/analysis
// { title, description, content, url } → { summary, sentiment }
async function createArticleAnalysis(req, res) {
    const { id } = req.query;
    const article = req.body;

    try {
        const existing = await getAnalysis(id);

        if (existing) {
            return res.status(200).json(existing);
        }

        const { summary, sentiment } = await analyseArticle(article);

        await saveAnalysis({
            articleId: id,
            url: article.url,
            title: article.title,
            summary,
            sentiment,
        });

        res.status(201).json({
            summary,
            sentiment,
        });
    } catch (error) {
        console.error(error);
        res.status(502).json({
            error: "Unable to analyse the article.",
        });
    }
}

export default createArticleAnalysis;

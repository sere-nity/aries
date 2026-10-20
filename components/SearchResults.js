import { useState } from "react";
import SidePanel from "@/components/SidePanel";

const OPERATORS = ["AND", "OR", "NOT"];

// "\"artificial intelligence\" AND (animation OR animators)" → ["\"artificial intelligence\"", "animation", "animators"]
function getKeywords(q) {
    const tokens = q.match(/"[^"]+"|[^\s()]+/g) ?? [];
    return tokens.filter((token) => !OPERATORS.includes(token));
}

export default function SearchResults({ results }) {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [analyses, setAnalyses] = useState({});
    const [analysisError, setAnalysisError] = useState("");

    const keywords = getKeywords(results.q);
    const analysis = selectedArticle ? analyses[selectedArticle.id] : null;
    const isAnalysing = Boolean(selectedArticle && !analysis && !analysisError);

    async function handleSelect(article) {
        setSelectedArticle(article);
        setAnalysisError("");

        if (analyses[article.id]) {
            return;
        }

        try {
            const response = await fetch(`/api/articles/${article.id}/analysis`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: article.title,
                    description: article.description,
                    content: article.content,
                    url: article.url,
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            setAnalyses((prev) => ({
                ...prev,
                [article.id]: data,
            }));
        } catch (error) {
            setAnalysisError(error.message);
        }
    }

    function handleClose() {
        setSelectedArticle(null);
    }

    return (
        <section className="flex w-full max-w-xl flex-col gap-6">
            <div className="flex flex-row flex-wrap gap-2">
                {keywords.map((keyword) => (
                    <span
                        key={keyword}
                        className="rounded-md border border-black bg-[repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_1px,transparent_6px)] p-1 text-sm"
                    >
                        <span className="bg-white px-1">
                            {keyword}
                        </span>
                    </span>
                ))}
            </div>

            {results.articles.length === 0 ? (
                <p className="text-sm text-zinc-500">
                    No articles found. Try a broader question.
                </p>
            ) : (
                <ul className="flex flex-col gap-3">
                    {results.articles.map((article) => (
                        <li
                            key={article.id}
                            className="flex flex-row items-baseline justify-between gap-4"
                        >
                            <button
                                type="button"
                                onClick={() => handleSelect(article)}
                                className="text-left underline underline-offset-4 hover:bg-zinc-100"
                            >
                                {article.title}
                            </button>
                            <time
                                dateTime={article.publishedAt}
                                className="shrink-0 text-sm text-zinc-500"
                            >
                                {new Date(article.publishedAt).toLocaleDateString()}
                            </time>
                        </li>
                    ))}
                </ul>
            )}

            {selectedArticle && (
                <SidePanel
                    article={selectedArticle}
                    analysis={analysis}
                    isAnalysing={isAnalysing}
                    error={analysisError}
                    onClose={handleClose}
                />
            )}
        </section>
    );
}

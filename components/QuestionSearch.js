import { useState } from "react";

const EXAMPLE_QUESTIONS = [
    "How is AI affecting the animation industry?",
    "What's happening with electric vehicle sales?",
    "How are interest rates affecting house prices?",
    "What's new in renewable energy?",
    "How are video game studios handling layoffs?",
]

export default function QuestionSearch({ onResults, hasResults }) {

    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(event) {
        event.preventDefault();

        if (isLoading || !query.trim()) {
            return 
        }

        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/search", {
                method: "POST", 
                headers: {
                    "Content-Type":  "application/json",
                }, 
                body: JSON.stringify({
                    question: query,
                }), 
            }) 
            const data = await response.json() 
            if (!response.ok) throw new Error(data.error);
            onResults(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <section className="flex w-full max-w-xl flex-col items-center gap-6">
            {!hasResults && (
                <h1 className="text-2xl font-medium text-black">
                    What are you curious about?
                </h1>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-3 rounded-md border border-black bg-white p-3"
            >
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Ask a question about the news…"
                    className="w-full bg-white text-base text-black outline-none placeholder:text-zinc-400"
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || !query.trim()}
                        className="rounded-md border border-black bg-white px-3 py-1 text-sm text-black hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-white"
                    >
                        {isLoading ? "Searching…" : "Search"}
                    </button>
                </div>
            </form>

            {!hasResults && (
                <div className="flex flex-wrap justify-center gap-2">
                    {EXAMPLE_QUESTIONS.map((example) => (
                        <button
                            key={example}
                            type="button"
                            onClick={() => setQuery(example)}
                            className="rounded-md border border-black bg-white px-2 py-1 text-sm text-black hover:bg-zinc-100"
                        >
                            {example}
                        </button>
                    ))}
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </section>
    );
  


}

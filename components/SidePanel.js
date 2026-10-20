export default function SidePanel({ article, analysis, isAnalysing, error, onClose }) {
    return (
        <aside className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col gap-4 overflow-y-auto border-l border-black bg-white p-6">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="rounded-md border border-black px-2 py-1 text-sm hover:bg-zinc-100"
                >
                    Close
                </button>
            </div>

            {article.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={article.image}
                    alt=""
                    className="w-full rounded-md border border-black"
                />
            )}

            <h2 className="text-xl font-medium">
                {article.title}
            </h2>

            <p className="text-sm text-zinc-500">
                {article.source.name} · {new Date(article.publishedAt).toLocaleDateString()}
            </p>

            <div className="flex flex-col gap-2 border-t border-black pt-4">
                {isAnalysing && (
                    <p className="text-sm text-zinc-500">
                        Analysing…
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                {analysis && (
                    <>
                        <span className="w-fit rounded-md border border-black bg-[repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_1px,transparent_6px)] p-1 text-sm capitalize">
                            <span className="bg-white px-1">
                                {analysis.sentiment}
                            </span>
                        </span>
                        <p className="leading-7">
                            {analysis.summary}
                        </p>
                    </>
                )}
            </div>

            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto rounded-md border border-black px-3 py-2 text-center text-sm hover:bg-zinc-100"
            >
                Read on {article.source.name} ↗
            </a>
        </aside>
    );
}

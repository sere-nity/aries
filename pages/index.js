import { Geist, Geist_Mono } from "next/font/google";
import QuestionSearch from "@/components/QuestionSearch";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Home() {
    const [results, setResults] = useState(null)
    console.log(results)

    return (
        <main className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col items-center gap-6 bg-white px-6 font-sans text-black ${results ? "justify-start py-16" : "justify-center"}`}>
            <QuestionSearch onResults={setResults} hasResults={!!results}/>
            {results && <SearchResults results={results} />}
        </main>
    );

}


import OpenAI from "openai"; 
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";


const client = new OpenAI();


const instructions = `
Turn the user's question into a short GNews search query.
Preserve the main subjects and any explicitly requested angle.
Use AND between essential concepts, OR for synonyms, and
double quotes for exact phrases when useful.
Do not answer the question or introduce additional topics.
`;

const SearchQuerySchema = z.object({
    q: z.string().min(1).max(200),
});

// output = { q: "\"artificial intelligence\" AND (animation OR animators)"}
export const interpretQuestion = async (question) => {

    const response = await client.responses.parse({
        model: "gpt-4.1-nano", 
        instructions, 
        input: question, 
        text: {
            format: zodTextFormat(SearchQuerySchema, "search_query"),
        },
    })

    if (!response.output_parsed) {
        throw new Error("Unable to interpret the question.");
    }
    return response.output_parsed
}; 



const analysisInstructions = `
Summarise the news article in 2-3 sentences.
Rate its overall sentiment as positive, neutral or negative.
Use only the information given.
`;

const ArticleAnalysisSchema = z.object({
    summary: z.string().min(1),
    sentiment: z.enum(["positive", "neutral", "negative"]),
});

// output = { summary: "Astra Studios and VerSe launched...", sentiment: "positive" }
export const analyseArticle = async ({ title, description, content }) => {

    const response = await client.responses.parse({
        model: "gpt-4.1-nano",
        instructions: analysisInstructions,
        input: `Title: ${title}\nDescription: ${description}\nContent: ${content}`,
        text: {
            format: zodTextFormat(ArticleAnalysisSchema, "article_analysis"),
        },
    })

    if (!response.output_parsed) {
        throw new Error("Unable to analyse the article.");
    }
    return response.output_parsed
}; 
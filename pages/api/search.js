import { z } from "zod";
import { interpretQuestion } from "@/methods/llmMethods";
import { searchNews } from "@/methods/searchNews";


// { question: "How is AI affecting the animation industry?"}
async function createSearchQuery(req, res) {
    const data = req.body; 

    try {
        const { q } = await interpretQuestion(data.question)
        const result = await searchNews({q})
        res.status(200).json({ q, ...result });
    } catch (error) {
        console.error(error);
        res.status(502).json({
            error: "Unable to fetch articles"
        }); 
    }

}

export default createSearchQuery;

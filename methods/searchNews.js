


export const searchNews = async ({q, lang = "en", max = 10,}) => {

    const params = new URLSearchParams({
        q,
        lang,
        max: String(max),
        sortby: "publishedAt",
        apikey: process.env.GNEWS_API_KEY
    });

    const response = await fetch(`https://gnews.io/api/v4/search?${params}`); 

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    return data

}
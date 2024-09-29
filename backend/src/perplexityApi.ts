import * as dotenv from "dotenv";
dotenv.config()

const perplexityApiKey : string = process.env.PERPLEXITY_API_KEY || "";

export const perplexityQuery = async (perplexityQuery : string) => {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${perplexityApiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-large-128k-online",
        messages: [
          {
            role: "system",
            content: "Be precise and concise."
          },
          {
            role: "user",
            content: perplexityQuery
          }
        ],
        temperature:0.2,
        top_p:0.9,
        return_citations:false,
        search_domain_filter:["perplexity.ai"],
        return_images:false,
        return_related_questions: false,
        search_recency_filter:"month",
        top_k:0,
        stream:false,
        presence_penalty:0,
        frequency_penalty:1
      })
    });

    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      throw new Error(`Error: ${response.status}`);
    }

    const body = await response.json(); // Convert response to JSON
    return body;
  } catch (error : any) {
    console.error('Fetch error:', error.message);
  }
};



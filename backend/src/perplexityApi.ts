import * as dotenv from "dotenv";
dotenv.config();

const PERPLEXITY_API_KEY: string = process.env.PERPLEXITY_API_KEY || "";

export const perplexityQuery = async (
  question: string,
  context: string,
  resultType: string,
  company: string,
  title: string
) => {
  console.log(resultType);

  const COVER_LETTER_PROMPT = `
    As an experienced cover letter writer, create a compelling cover letter based on the following information:
    
    The company name is ${company} and the job title is: ${title}
    
    ${context}
    
    Write a professional and engaging cover letter that highlights the candidate's relevant skills and experiences. The cover letter should be no more than 300 words and include:
    1. An attention-grabbing opening paragraph
    2. 1-2 paragraphs showcasing relevant experiences and skills
    3. A closing paragraph expressing enthusiasm for the position
    
    Ensure the tone is professional yet personable, and tailor the content to the specific job and company mentioned in the query.
  `;

  const ESSAY_PROMPT = `
    As an expert essay writer, craft a well-structured essay based on the following topic:
    
    {query}
    
    Write a coherent and insightful essay of approximately 500 words that includes:
    1. An engaging introduction with a clear thesis statement
    2. 2-3 body paragraphs with supporting evidence and analysis
    3. A conclusion that summarizes the main points and provides a final thought
    
    Ensure the essay is well-organized, uses appropriate transitions, and maintains a consistent academic tone throughout.
  `;

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-huge-128k-online",
        messages: [
          {
            role: "system",
            content: "Be precise and concise.",
          },
          {
            role: "user",
            content:
              resultType == "COVER_LETTER" ? COVER_LETTER_PROMPT : ESSAY_PROMPT,
          },
        ],
        temperature: 0.2,
        top_p: 0.9,
        return_citations: false,
        search_domain_filter: ["perplexity.ai"],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month",
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      throw new Error(`Error: ${response.status}`);
    }

    const body = await response.json(); // Convert response to JSON
    return body;
  } catch (error: any) {
    console.error("Fetch error:", error.message);
  }
};

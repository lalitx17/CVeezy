"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perplexityQuery = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "";
const perplexityQuery = (question, context, resultType, company, title) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield fetch("https://api.perplexity.ai/chat/completions", {
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
                        content: resultType == "COVER_LETTER" ? COVER_LETTER_PROMPT : ESSAY_PROMPT,
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
            const result = yield response.json();
            console.log(result);
            throw new Error(`Error: ${response.status}`);
        }
        const body = yield response.json(); // Convert response to JSON
        return body;
    }
    catch (error) {
        console.error("Fetch error:", error.message);
    }
});
exports.perplexityQuery = perplexityQuery;

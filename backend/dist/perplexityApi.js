"use strict";
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
const perplexityQuery = (apiKey, perplexityQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
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
                frequency_penalty: 1
            })
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
        console.error('Fetch error:', error.message);
    }
});
exports.perplexityQuery = perplexityQuery;

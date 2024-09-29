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
const perplexityApiKey = process.env.PERPLEXITY_API_KEY || "";
const perplexityQuery = (perplexityQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://api.perplexity.ai/chat/completions', {
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

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import { perplexityQuery } from "./perplexityApi.ts"
// import { readJsonFile, fetchJobs } from "./jobsApi.ts"
const vectorConnector_1 = __importDefault(require("./vectorConnector"));
const app = (0, express_1.default)();
dotenv.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
const jobsApiKey = process.env.API_KEY || "";
const perplexityApiKey = process.env.PERPLEXITY_API_KEY || "";
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "everything works fine" });
}));
app.use(vectorConnector_1.default);
// app.post('/register', async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   const existingUser = await client.db('users').collection('users').findOne({ username });
//   if (existingUser) {
//     return res.status(400).json({ message: 'Username already exists' });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   await client.db('users').collection('users').insertOne({
//     username,
//     password: hashedPassword
//   });
//   res.status(201).json({ message: 'User registered successfully' });
// });
// app.post('/login', async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   const user = await client.db('users').collection('users').findOne({ username });
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid username or password' });
//   }
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(400).json({ message: 'Invalid username or password' });
//   }
//   res.json({ message: 'Login successful' });
// });
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

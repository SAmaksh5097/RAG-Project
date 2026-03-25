import cors from 'cors';
import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection.js";
import setupAI from './ai_service.js';
import Ingest from './controllers/Ingest.js';
import Ask from './controllers/Ask.js';
import Reset from './controllers/Reset.js';
import router from './routes/Route.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));
app.use(express.json());

// connecting to MONGODB and getting collection reference to use in the vector store
const collection = await connectDB();

// 1. Setup AI Model
const {embeddings, model, vectorStore } = await setupAI(collection);

// Endpoint to Ingest Knowledge
router.post('/ingest',async (req,res)=>{
  await Ingest(req,res,collection, vectorStore);
});

// Endpoint to Ask Questions
router.post('/ask',async (req,res)=>{
  await Ask(req,res,vectorStore, model);
})

// Endpoint to reset the knowledge base by deleting all documents in the collection
router.post('/reset-knowledge',async (req,res)=>{
  await Reset(req,res,collection);
})

app.use('/api', router);

app.listen(PORT, () => console.log("🚀 RAG Backend running on http://localhost:" + PORT));
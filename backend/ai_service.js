import { OllamaEmbeddings } from "@langchain/ollama";
import {MongoDBAtlasVectorSearch} from "@langchain/mongodb";
import dotenv from "dotenv";
import {ChatGroq} from "@langchain/groq";

dotenv.config();

// 1. Setup Local AI Models

async function setupAI(collection){
    try{
        const embeddings = new OllamaEmbeddings({
          model: "nomic-embed-text",
          baseUrl: "http://localhost:11434",
        });

        const model = new ChatGroq({
          apiKey: process.env.GROQ_API_KEY,
          model: process.env.AI_MODEL_NAME,
          temperature: 0.0
        });

        const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
            collection: collection,
            indexName: "vector_index",
            textKey: "text",
            embeddingKey: "embedding",
        });

        return {embeddings, model, vectorStore};
    } catch(error){
        console.log("Error in setting up AI model "+error);
    }
}

export default setupAI;


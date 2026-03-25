import {MongoDBAtlasVectorSearch} from "@langchain/mongodb";
import dotenv from "dotenv";
import {ChatGroq} from "@langchain/groq";
import {CohereEmbeddings} from "@langchain/cohere";
dotenv.config();

// 1. Setup Local AI Models

async function setupAI(collection){
    try{
        const embeddings = new CohereEmbeddings({
            apiKey: process.env.COHERE_API_KEY,
        //   model: "nomic-embed-text",
        //   baseUrl: "http://localhost:11434",
        model:"embed-english-v3.0",
        inputType: "search-document"
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


import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
async function Ingest(req,res,collection, vectorStore){
    try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text is required for ingestion.' });
    }

    const existing = await collection.findOne({text: text});
    if (existing) {
      return res.status(400).json({ error: 'This text has already been ingested.' });
    }
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    
    const docs = await splitter.createDocuments([text]);
    
    // Using .addDocuments() allows you to keep adding info 
    // without wiping out what you already taught it!
    await vectorStore.addDocuments(docs);

    res.json({ message: "Knowledge base updated!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default Ingest;
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
async function Ingest(req, res, collection, vectorStore) {
  try {
    const { text, userId } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text is required for ingestion.' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Check if this exact text already exists for this user
    const existing = await collection.findOne({ text: text, userId: userId });
    if (existing) {
      return res.status(400).json({ error: 'This text has already been ingested.' });
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const docs = await splitter.createDocuments([text], [{ userId: userId }]);

    // Add documents with userId metadata
    await vectorStore.addDocuments(docs);

    res.json({ message: 'Knowledge base updated!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default Ingest;
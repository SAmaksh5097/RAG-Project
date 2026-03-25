async function Ask(req, res, vectorStore, model) {
  try {
    const { question, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // 1. Log what we are looking for
    console.log(`Querying for: ${question} (User: ${userId})`);

    // 2. Perform search with a higher 'k' to ensure we capture relevant info
    const allResults = await vectorStore.similaritySearch(question, 10);
    
    // 3. Filter results by userId from metadata
    const searchResults = allResults.filter((doc) => doc.metadata && doc.metadata.userId === userId);
    console.log(`Docs found: ${searchResults.length}`);
    // DEBUG: See what is actually going to the LLM
    // console.log("Context being sent:", searchResults.map(r => r.pageContent));

    if (!searchResults.length) {
      return res.json({ answer: "My search didn't find that in the database. Try being more specific?" });
    }

    const context = searchResults.map(d => d.pageContent).join("\n---\n");

    const prompt = `
              <start_of_turn>user
              You are a logical reasoning assistant. Use the provided context chunks to solve the user's question. 

              ### Rules:
1. Use ONLY the facts from the context that directly answer the question.
2. **IGNORE** any background information or "other things" that are not relevant to the specific twist in the question.
3. If the context contains conflicting info, prioritize the most specific details.
4. Don not summarize the entire context and just give the answer.


              ### Context:
              ${context}

              ### Question: 
              ${question}<end_of_turn>
              <start_of_turn>model
              `;


    const response = await model.invoke(prompt)

    res.json({ answer: response.content });

  } catch (error) {
    console.error("Ask Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default Ask;
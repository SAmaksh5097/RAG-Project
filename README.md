<h1>PersonalRAG: High-Performance RAG System</h1>
This is a full-stack Retrieval-Augmented Generation (RAG) application that enables users to "chat with their data" with near-instant latency. By combining the speed of Groq Cloud's LPU inference with the scalability of MongoDB Atlas Vector Search, this project provides a private and efficient way to query personal knowledge bases.
<h1>🚀 Key Features</h1>
<ul>
  <li>Ultra-Fast Inference: Integrated with Groq Cloud (Llama 3.3 70B / 3.1 8B) for sub-second response times.</li>
  <li>Vectorized Search: Uses MongoDB Atlas Vector Search to perform semantic similarity lookups rather than simple keyword matching.</li>
  <li>Local Embeddings: Utilizes Ollama (nomic-embed-text) to generate high-dimensional vector representations of text.</li>
  <li>Persistent Knowledge Base: Documents are chunked using RecursiveCharacterTextSplitter to maintain context and stored permanently in the cloud.</li>
  <li>Smart Math Logic: Optimized prompts designed to help the LLM handle financial transactions and logical reasoning with "Chain of Thought" techniques.</li>
</ul>
<h1>🛠️ Tech Stack</h1>
<div class="tech-stack-container" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
  
  <table style="width: 100%; border-collapse: collapse; text-align: left; background-color: white;">
    <thead>
      <tr style="background-color: #fafafa;">
        <th style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #666; font-weight: 600;">Layer</th>
        <th style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #666; font-weight: 600;">Technology</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #444; font-weight: 500;">Frontend</td>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #007bff;">React.js (Vite) + Tailwind CSS</td>
      </tr>
      <tr>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #444; font-weight: 500;">Backend</td>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #007bff;">Node.js & Express (ESM)</td>
      </tr>
      <tr>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #444; font-weight: 500;">Database</td>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #007bff;">MongoDB Atlas (Vector Search)</td>
      </tr>
      <tr>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #444; font-weight: 500;">AI Orchestration</td>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #007bff;">LangChain.js</td>
      </tr>
      <tr>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #444; font-weight: 500;">Inference Engine</td>
        <td style="padding: 12px 20px; border-bottom: 1px solid #eee; color: #007bff;">Groq Cloud (Llama 3.3/3.1)</td>
      </tr>
      <tr>
        <td style="padding: 12px 20px; color: #444; font-weight: 500;">Embeddings</td>
        <td style="padding: 12px 20px; color: #007bff;">Ollama (nomic-embed-text)</td>
      </tr>
    </tbody>
  </table>
</div>

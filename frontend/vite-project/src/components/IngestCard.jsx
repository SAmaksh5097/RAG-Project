import React from 'react'
import { useState, useMemo } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'
const IngestCard = () => {
    const [knowledgeText, setKnowledgeText] = useState('')
    const [statusMessage, setStatusMessage] = useState('')
    const [error, setError] = useState('')
    const [isIngesting, setIsIngesting] = useState(false)
    const [answer, setAnswer] = useState('')
    const readyToIngest = useMemo(() => knowledgeText.trim().length > 0, [knowledgeText])
    const handleIngest = async (event) => {
    event.preventDefault()
    setError('')
    setStatusMessage('')
    setAnswer('')

    

    if (!readyToIngest) {
      setError('Add some text before ingesting.')
      return
    }

    try {
      setIsIngesting(true)
      const response = await fetch(`${API_BASE}/api/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: knowledgeText }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to ingest text.')
      }

      setStatusMessage(data.message ?? 'Knowledge base updated.')
      setKnowledgeText('')
    } catch (ingestError) {
      setError(ingestError.message)
    } finally {
      setIsIngesting(false)
    }
  }
  return (
    <div>
        <article className="card">
          <h2>1. Ingest Context</h2>
          <p className="card-copy">
            Paste source material. The backend chunks it and stores vectors in MongoDB.
          </p>
          <form onSubmit={handleIngest} className="form-block">
            <label htmlFor="knowledge-text">Knowledge text</label>
            <textarea
              id="knowledge-text"
              placeholder="Paste notes, docs, release logs, support runbooks..."
              value={knowledgeText}
              onChange={(event) => setKnowledgeText(event.target.value)}
              rows={10}
            />
            <button type="submit" disabled={!readyToIngest || isIngesting}>
              {isIngesting ? 'Ingesting...' : 'Ingest into knowledge base'}
            </button>
          </form>
            <button onClick={handleReset} style={{marginTop: '10px', width: '100%'}}>Reset Knowledge Base🧹</button>
        </article>
      
    </div>
  )
}

export default IngestCard

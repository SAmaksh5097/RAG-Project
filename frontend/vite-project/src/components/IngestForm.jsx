import { useState, useMemo } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const IngestForm = ({ onSuccess, onError }) => {
  const [knowledgeText, setKnowledgeText] = useState('')
  const [isIngesting, setIsIngesting] = useState(false)

  const readyToIngest = useMemo(() => knowledgeText.trim().length > 0, [knowledgeText])

  const handleIngest = async (event) => {
    event.preventDefault()
    setIsIngesting(true)

    if (!readyToIngest) {
      onError('Add some text before ingesting.')
      setIsIngesting(false)
      return
    }

    try {
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

      onSuccess(data.message ?? 'Knowledge base updated.')
      setKnowledgeText('')
    } catch (ingestError) {
      onError(ingestError.message)
    } finally {
      setIsIngesting(false)
    }
  }

  return (
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
    </article>
  )
}

export default IngestForm

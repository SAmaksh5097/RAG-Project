import { useState, useMemo } from 'react'
import { useAuth } from '@clerk/react'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const IngestForm = ({ onSuccess, onError }) => {
  const { userId } = useAuth()
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

    if (!userId) {
      alert('Please login first!')
      setIsIngesting(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: knowledgeText, userId }),
      })

      const data = await response.json()
      if (!response.ok) {
        alert('Failed to ingest text. Please try again.')
        throw new Error(data.error ?? 'Failed to ingest text.')
      }

      alert(data.message ?? 'Knowledge base updated.')
      onSuccess(data.message ?? alert('Knowledge base updated.'))
      setKnowledgeText('')
    } catch (ingestError) {
      onError(ingestError.message)
    } finally {
      setIsIngesting(false)
    }
  }

  return (
    <article className="rounded-2xl border border-[#cdbfae] bg-black p-4 text-white shadow-[0_18px_30px_rgba(22,21,18,0.09)] md:rounded-[20px] md:p-[22px]">
      <h2 className="mb-1 text-[clamp(1.2rem,2vw,1.55rem)] font-semibold leading-[1.2]">1. Ingest Context</h2>
      <p className="mb-4 text-[#595047]">
        Paste source material. The backend chunks it and stores vectors in MongoDB.
      </p>
      <form onSubmit={handleIngest} className="grid gap-[10px]">
        <label htmlFor="knowledge-text" className="text-[0.85rem] uppercase tracking-[0.08em] text-[#3d3127]">Knowledge text</label>
        <textarea
          id="knowledge-text"
          placeholder="Paste notes, docs, release logs, support runbooks..."
          value={knowledgeText}
          onChange={(event) => setKnowledgeText(event.target.value)}
          rows={10}
          className="min-h-[120px] w-full resize-y rounded-xl border border-[#cfc5b8] bg-[#fffefc] px-3 py-[11px] text-[0.96rem] leading-[1.45] text-[#1e1a16] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#d67a41]"
        />
        <button
          type="submit"
          disabled={!readyToIngest || isIngesting}
          className="rounded-full bg-gradient-to-r from-[#d36135] to-[#bf4e27] px-4 py-[11px] text-[0.95rem] font-bold text-white transition hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(191,78,39,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isIngesting ? 'Ingesting...' : 'Ingest into knowledge base'}
        </button>
      </form>
    </article>
  )
}

export default IngestForm

import { useState, useMemo, useRef, useEffect } from 'react'
import MessageCard from './MessageCard'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const AskForm = ({ onError, onAnswer }) => {
  const [question, setQuestion] = useState('')
  const [isAsking, setIsAsking] = useState(false)
  const [conversation, setConversation] = useState([])
  const messagesEndRef = useRef(null)

  const readyToAsk = useMemo(() => question.trim().length > 0, [question])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const handleAsk = async (event) => {
    event.preventDefault()
    setIsAsking(true)

    if (!readyToAsk) {
      onError('Enter a question first.')
      setIsAsking(false)
      return
    }

    // Add user question to conversation
    const userMessage = { type: 'question', text: question }
    setConversation((prev) => [...prev, userMessage])

    try {
      const response = await fetch(`${API_BASE}/api/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to fetch an answer.')
      }

      const answerText = data.answer ?? 'No answer returned.'
      
      // Add bot answer to conversation
      const botMessage = { type: 'answer', text: answerText }
      setConversation((prev) => [...prev, botMessage])
      
      onAnswer(answerText)
      setQuestion('')
    } catch (askError) {
      onError(askError.message)
      // Remove the question if there was an error
      setConversation((prev) => prev.slice(0, -1))
    } finally {
      setIsAsking(false)
    }
  }

  return (
    <article className="rounded-2xl border border-[#cdbfae] bg-black p-4 text-white shadow-[0_18px_30px_rgba(22,21,18,0.09)] md:rounded-[20px] md:p-[22px]">
      <h2 className="mb-1 text-[clamp(1.2rem,2vw,1.55rem)] font-semibold leading-[1.2]">2. Ask Questions</h2>
      <p className="mb-4 text-[#595047]">
        Ask a question and get an answer generated from the most relevant chunk.
      </p>

      <div className="mb-5 flex max-h-[400px] flex-col gap-3 overflow-y-auto rounded-xl border border-[#ddd] bg-[#f5f5f5] p-4">
        {conversation.length === 0 ? (
          <p className="italic text-[#999]">No messages yet. Start asking questions!</p>
        ) : (
          conversation.map((msg, index) => (
            <MessageCard key={index} message={msg.text} type={msg.type} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleAsk} className="grid gap-[10px]">
        <label htmlFor="question" className="text-[0.85rem] uppercase tracking-[0.08em] text-[#3d3127]">Question</label>
        <textarea
          id="question"
          placeholder="What does the support policy say about weekend on-call?"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={5}
          className="min-h-[120px] w-full resize-y rounded-xl border border-[#cfc5b8] bg-[#fffefc] px-3 py-[11px] text-[0.96rem] leading-[1.45] text-[#1e1a16] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#d67a41]"
        />
        <button
          type="submit"
          disabled={!readyToAsk || isAsking}
          className="rounded-full bg-gradient-to-r from-[#d36135] to-[#bf4e27] px-4 py-[11px] text-[0.95rem] font-bold text-white transition hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(191,78,39,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAsking ? 'Thinking...' : 'Ask backend'}
        </button>
      </form>
    </article>
  )
}

export default AskForm

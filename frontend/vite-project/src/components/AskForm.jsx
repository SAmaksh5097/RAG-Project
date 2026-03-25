import { useState, useMemo, useRef, useEffect } from 'react'
import MessageCard from './MessageCard'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const AskForm = ({ onSuccess, onError, onAnswer }) => {
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
    <article className="card">
      <h2>2. Ask Questions</h2>
      <p className="card-copy">
        Ask a question and get an answer generated from the most relevant chunk.
      </p>

      <div className="conversation-container" style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
        {conversation.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic' }}>No messages yet. Start asking questions!</p>
        ) : (
          conversation.map((msg, index) => (
            <MessageCard key={index} message={msg.text} type={msg.type} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleAsk} className="form-block">
        <label htmlFor="question">Question</label>
        <textarea
          id="question"
          placeholder="What does the support policy say about weekend on-call?"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={5}
        />
        <button type="submit" disabled={!readyToAsk || isAsking}>
          {isAsking ? 'Thinking...' : 'Ask backend'}
        </button>
      </form>
    </article>
  )
}

export default AskForm

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const ResetButton = ({ onSuccess, onError }) => {
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset the knowledge base? This action cannot be undone.')) {
      try {
        const response = await fetch(`${API_BASE}/api/reset-knowledge`, {
          method: 'POST',
        })
        const data = await response.json()
        onSuccess(data.message ?? 'Knowledge base reset successfully.')
      } catch (error) {
        onError('Failed to reset knowledge base.')
      }
    }
  }

  return (
    <button onClick={handleReset} style={{ marginTop: '10px', width: '100%' }}>
      Reset Knowledge Base 🧹
    </button>
  )
}

export default ResetButton

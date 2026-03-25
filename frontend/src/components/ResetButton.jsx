import { useAuth } from '@clerk/react'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const ResetButton = ({ onSuccess, onError }) => {
  const { userId } = useAuth()

  const handleReset = async () => {
    if (!userId) {
      onError('Please sign in to reset knowledge base.')
      return
    }

    if (window.confirm('Are you sure you want to reset the knowledge base? This action cannot be undone.')) {
      try {
        const response = await fetch(`${API_BASE}/api/reset-knowledge`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })
        const data = await response.json()
        onSuccess(data.message ?? 'Knowledge base reset successfully.')
      } catch (error) {
        onError('Failed to reset knowledge base.')
      }
    }
  }

  return (
    <button
      onClick={handleReset}
      className="mt-[10px] w-full rounded-full bg-gradient-to-r from-[#d36135] to-[#bf4e27] px-4 py-[11px] text-[0.95rem] font-bold text-white transition hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(191,78,39,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={!userId}
    >
      Reset Knowledge Base 🧹
    </button>
  )
}

export default ResetButton

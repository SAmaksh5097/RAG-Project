const ResultPanel = ({ statusMessage, error, answer }) => {
  if (!statusMessage && !error && !answer) {
    return null
  }

  return (
    <section className="result-panel" aria-live="polite">
      {statusMessage && <p className="status success">{statusMessage}</p>}
      {error && <p className="status error">{error}</p>}
      {answer && (
        <div className="answer-wrap">
          <h3>Answer</h3>
          <p>{answer}</p>
        </div>
      )}
    </section>
  )
}

export default ResultPanel

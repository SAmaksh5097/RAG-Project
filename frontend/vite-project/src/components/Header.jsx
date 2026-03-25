const Header = () => {
  return (
    <div>
        <header className="hero">
        <p className="eyebrow">Local RAG Control Panel</p>
        <h1>Teach your model, then interrogate it.</h1>
        <p className="hero-copy">
          This React UI connects directly to your Express + Ollama backend and wraps
          your ingestion and retrieval flow into one workspace.
        </p>
      </header>
    </div>
  )
}

export default Header

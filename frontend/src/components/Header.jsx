const Header = () => {
  return (
    <header className="rounded-2xl border border-[#cdbfae] bg-gradient-to-br from-[#213c56]/90 to-[#0c1a28]/90 p-4 text-left text-[#f5fbff] md:rounded-3xl md:p-7">
      <h1 className="text-4xl underline cursor-default">PersonalRAG</h1>
      <h1 className="my-2 text-[clamp(1.9rem,3vw,3rem)] font-bold leading-[1.1]">Teach the model, then interrogate it.</h1>
      <p className="max-w-[64ch] text-[#f5fbff]/90">
        This React UI connects directly to Express + Ollama backend and wraps
        your ingestion and retrieval flow into one workspace.
      </p>
    </header>
  )
}

export default Header

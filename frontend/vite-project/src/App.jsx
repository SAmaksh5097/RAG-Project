import './App.css'
import Header from './components/Header'
import IngestForm from './components/IngestForm'
import AskForm from './components/AskForm'
import ResetButton from './components/ResetButton'

function App() {
  const handleIngestSuccess = (message) => {
    // Ingest success handled
  }

  const handleError = (errorMessage) => {
    // Error handled
  }

  const handleAskSuccess = (result) => {
    // Ask success handled
  }

  const handleResetSuccess = (message) => {
    // Reset success handled
  }

  return (
    <main className="page-shell">
      <Header />

      <section className="grid">
        <div>
          <IngestForm onSuccess={handleIngestSuccess} onError={handleError} />
          <ResetButton onSuccess={handleResetSuccess} onError={handleError} />
        </div>
        <AskForm onSuccess={handleAskSuccess} onError={handleError} onAnswer={handleAskSuccess} />
      </section>
    </main>
  )
}

export default App

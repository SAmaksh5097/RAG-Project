import Header from './components/Header'
import IngestForm from './components/IngestForm'
import AskForm from './components/AskForm'
import ResetButton from './components/ResetButton'
import Footer from './components/Footer'

function App() {
  const handleIngestSuccess = () => {}
  const handleError = () => {}
  const handleAskSuccess = () => {}
  const handleResetSuccess = () => {}

  return (
    <main className="mx-auto min-h-svh w-full max-w-[1060px] px-4 pb-6 pt-6 md:px-7 md:pb-9 md:pt-12">
      <Header />

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[18px]">
        <div className="space-y-3">
          <IngestForm onSuccess={handleIngestSuccess} onError={handleError} />
          <ResetButton onSuccess={handleResetSuccess} onError={handleError} />
        </div>
        <AskForm onError={handleError} onAnswer={handleAskSuccess} />
      </section>
      <section>
        <Footer/>
      </section>
    </main>
  )
}

export default App

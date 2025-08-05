import './globals.css'
import { Header } from './components/Header'
import { Approutes } from './routes/Approutes'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Approutes />
      </main>
      <Footer />
    </>
  )
}

export default App

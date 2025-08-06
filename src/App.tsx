import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header'
import { Approutes } from './routes/Approutes'
import { Footer } from './components/Footer'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Header />
      <main>
        <Approutes />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark"
      />
    </>
  )
}

export default App

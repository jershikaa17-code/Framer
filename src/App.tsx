import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { WhispersPage } from './pages/WhispersPage'
import { WhisperArticlePage } from './pages/WhisperArticlePage'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/whispers" element={<WhispersPage />} />
        <Route path="/whispers/:slug" element={<WhisperArticlePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

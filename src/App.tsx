import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BookCall } from './components/BookCall'
import { Newsletter } from './components/Newsletter'
import { CustomCursor } from './components/CustomCursor'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { WorkPage } from './pages/WorkPage'
import { StudioPage } from './pages/StudioPage'
import { ContactPage } from './pages/ContactPage'
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
        <Route path="/work" element={<WorkPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/whispers" element={<WhispersPage />} />
        <Route path="/whispers/:slug" element={<WhisperArticlePage />} />
      </Routes>
      <BookCall />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/global.css'

// No StrictMode: its dev-only double mount/unmount races with Motion's
// `whileInView`/`once` viewport tracking and can permanently strand
// scroll-reveal elements (RevealText, Counter, etc.) in their hidden state.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
)

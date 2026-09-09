import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'

// No StrictMode: its dev-only double mount/unmount races with Motion's
// `whileInView`/`once` viewport tracking and can permanently strand
// scroll-reveal elements (RevealText, Counter, etc.) in their hidden state.
createRoot(document.getElementById('root')!).render(<App />)

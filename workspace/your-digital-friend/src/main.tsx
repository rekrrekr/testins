import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-full bg-[radial-gradient(1200px_600px_at_0%_0%,#a78bfa1a,transparent),radial-gradient(1000px_500px_at_100%_0%,#10b9811a,transparent)]">
      <App />
    </div>
  </StrictMode>,
)

"use client"
import { useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function sendMagic() {
    // TODO integrate Supabase
    setSent(true)
  }

  return (
    <div className="container pt-28 pb-16 max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      {!sent ? (
        <div className="space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded-[var(--radius-sm)] glass-surface" />
          <button onClick={sendMagic} className="px-4 py-2 rounded-[var(--radius-sm)] bg-primary text-primary-foreground">Send magic link</button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Check your email for a sign-in link.</p>
      )}
    </div>
  )
}
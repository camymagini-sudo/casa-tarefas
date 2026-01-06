'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://casa-tarefas.vercel.app/app'
      }
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>

      {sent ? (
        <p>Te enviamos um link por email ✉️</p>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit">Entrar</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  )
}

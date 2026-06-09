'use client'

import { useState } from 'react'
import { login } from './actions'

export default function LoginPageClient({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [password, setPassword] = useState('')
  const [shaking, setShaking] = useState(false)
  const error = searchParams.error === '1'
  const from = (searchParams.from as string) || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    form.set('password', password)
    form.set('from', from)

    const msgBuffer = new TextEncoder().encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    if (hashHex !== '2beb6b5fe3d7bdf658da84d6ce4252d853f7d4865e025f6b3970e39a3777fd4f') {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }

    login(form)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>
      <div className={`relative w-full max-w-sm mx-4 ${shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4 shadow-lg shadow-orange-500/25">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Costa del Sol 2026</h2>
            <p className="text-sm text-white/50 mt-1">Area riservata — inserisci la password</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 ${
                  error ? 'border-red-500/50' : 'border-white/10'
                }`}
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 text-center animate-pulse">Password errata</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}

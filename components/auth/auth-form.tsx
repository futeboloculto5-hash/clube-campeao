'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const form = new FormData(event.currentTarget)
    const result = isSignUp
      ? await authClient.signUp.email({ name: String(form.get('name')), email: String(form.get('email')), password: String(form.get('password')) })
      : await authClient.signIn.email({ email: String(form.get('email')), password: String(form.get('password')) })
    if (result.error) setError('Não foi possível concluir. Verifique os dados e tente novamente.')
    else { router.push('/'); router.refresh() }
    setPending(false)
  }

  return <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-white/10 bg-[#101b2b] p-6 text-white shadow-2xl">
    <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Clube Campeão World</p><h1 className="mt-2 text-2xl font-semibold">{isSignUp ? 'Criar acesso' : 'Entrar na carreira'}</h1><p className="mt-2 text-sm text-slate-400">Sua carreira será salva por usuário. Dados iniciais continuam marcados como demonstração.</p></div>
    {isSignUp && <label className="grid gap-2 text-sm">Nome<input name="name" required className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-cyan-400" /></label>}
    <label className="grid gap-2 text-sm">E-mail<input name="email" type="email" required className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-cyan-400" /></label>
    <label className="grid gap-2 text-sm">Senha<input name="password" type="password" minLength={8} required className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-cyan-400" /></label>
    {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
    <button disabled={pending} className="rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:opacity-60">{pending ? 'Aguarde...' : isSignUp ? 'Criar acesso' : 'Entrar'}</button>
  </form>
}

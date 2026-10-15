import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignUpPage() {
  return <main className="flex min-h-screen items-center justify-center bg-[#07101c] px-4 py-10"><div className="w-full"><AuthForm mode="sign-up" /><p className="mx-auto mt-4 max-w-md text-center text-sm text-slate-400">Já tem acesso? <Link className="text-cyan-300 hover:underline" href="/sign-in">Entrar</Link></p></div></main>
}

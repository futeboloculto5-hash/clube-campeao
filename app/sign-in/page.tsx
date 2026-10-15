import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignInPage() {
  return <main className="flex min-h-screen items-center justify-center bg-[#07101c] px-4 py-10"><div className="w-full"><AuthForm mode="sign-in" /><p className="mx-auto mt-4 max-w-md text-center text-sm text-slate-400">Ainda não tem acesso? <Link className="text-cyan-300 hover:underline" href="/sign-up">Criar conta</Link></p></div></main>
}

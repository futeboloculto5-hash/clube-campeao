import Link from 'next/link'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { AuthForm } from '@/components/auth/auth-form'

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const params = await searchParams
  const session = await auth.api.getSession({ headers: await headers() })
  const destination = params.next?.startsWith('/') && !params.next.startsWith('//') ? params.next : '/'
  if (session?.user) redirect(destination)
  return <main className="flex min-h-screen items-center justify-center bg-[#07101c] px-4 py-10"><div className="w-full"><AuthForm mode="sign-up" nextPath={params.next} /><p className="mx-auto mt-4 max-w-md text-center text-sm text-slate-400">Já tem acesso? <Link className="text-cyan-300 hover:underline" href={params.next ? `/sign-in?next=${encodeURIComponent(params.next)}` : '/sign-in'}>Entrar</Link></p></div></main>
}

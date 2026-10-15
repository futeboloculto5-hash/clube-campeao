import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getCareerFinance } from '@/app/actions/finances'
import { FinanceCenter } from '@/components/game/finance-center'
import { PageHeading } from '@/components/game/page-heading'

export const dynamic = 'force-dynamic'

export default async function FinancesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in?next=%2Ffinancas')

  let entries: Awaited<ReturnType<typeof getCareerFinance>> = []
  let loadError = ''
  try {
    entries = await getCareerFinance()
  } catch (error) {
    loadError = error instanceof Error ? error.message : 'Não foi possível carregar as finanças.'
  }

  return <main className="space-y-6"><PageHeading eyebrow="Negócios" title="Finanças">Controle o caixa da carreira sem misturar números internos com fatos financeiros publicados.</PageHeading>{loadError ? <div role="alert" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">{loadError}</div> : <FinanceCenter initialEntries={entries.map((entry) => ({ ...entry, amount: String(entry.amount), occurredOn: String(entry.occurredOn) }))} />}</main>
}

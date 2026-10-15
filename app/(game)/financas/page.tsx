import { redirect } from 'next/navigation'
import { getCareerFinance } from '@/app/actions/finances'
import { FinanceCenter } from '@/components/game/finance-center'
import { PageHeading } from '@/components/game/page-heading'

export const dynamic = 'force-dynamic'

export default async function FinancesPage() {
  try {
    const entries = await getCareerFinance()
    return <main className="space-y-6"><PageHeading eyebrow="Negócios" title="Finanças">Controle o caixa da carreira sem misturar números internos com fatos financeiros publicados.</PageHeading><FinanceCenter initialEntries={entries.map((entry) => ({ ...entry, amount: String(entry.amount), occurredOn: String(entry.occurredOn) }))} /></main>
  } catch {
    redirect('/sign-in?next=/financas')
  }
}

import Link from 'next/link'
import { CalendarClock } from 'lucide-react'
import { debts, formatMoney } from '@/lib/game-data'
import { Panel } from '../panel'
import { Meter } from '../indicators'

export function DebtOverview() {
  const paidPct = Math.round((debts.paid / debts.original) * 100)

  return (
    <Panel title="Dívidas" eyebrow="Endividamento total" index={7} className="xl:col-span-4">
      <div className="flex flex-col gap-1">
        <span className="font-display text-4xl font-semibold leading-none text-foreground tabular">{formatMoney(debts.total)}</span>
        <span className="text-xs text-muted-foreground">
          de {formatMoney(debts.original)} contratados
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-muted-foreground">Amortizado</span>
          <span className="font-medium text-positive tabular">{paidPct}%</span>
        </div>
        <Meter value={paidPct} label="Percentual da dívida já amortizado" tone="positive" />
      </div>

      <ul className="mt-6 flex flex-col">
        {debts.items.map((d) => (
          <li key={d.label} className="flex items-center justify-between gap-3 border-t border-border py-3 first:border-t-0 first:pt-0">
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm text-foreground">{d.label}</span>
              <span className="text-xs text-muted-foreground">{d.rate}</span>
            </div>
            <span className="shrink-0 text-sm font-medium text-foreground tabular">{formatMoney(d.amount)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-4 pt-4">
        <div className="flex items-start gap-3 rounded-xl bg-background/60 p-3.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
            <CalendarClock className="size-4" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              Próxima parcela: <span className="tabular">{formatMoney(debts.nextInstallment.amount)}</span>
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Vence em {debts.nextInstallment.dueIn} · {debts.nextInstallment.creditor}
            </span>
          </div>
        </div>
        <Link
          href="/financas"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground ring-1 ring-border transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary"
        >
          Gerenciar dívidas
        </Link>
      </div>
    </Panel>
  )
}

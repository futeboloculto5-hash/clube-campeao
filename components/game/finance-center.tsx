'use client'

import { useMemo, useState, useTransition } from 'react'
import { ArrowDownLeft, ArrowUpRight, Plus, WalletCards } from 'lucide-react'
import { createCareerFinancialEntry, deleteCareerFinancialEntry } from '@/app/actions/finances'
import { Button } from '@/components/ui/button'
import { Panel } from './panel'

export type FinanceEntry = {
  id: string
  entryType: string
  category: string
  description: string
  amount: string
  currency: string
  occurredOn: string
  status: string
}

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })

export function FinanceCenter({ initialEntries }: { initialEntries: FinanceEntry[] }) {
  const [entries, setEntries] = useState(initialEntries)
  const [showForm, setShowForm] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const totals = useMemo(() => entries.reduce((acc, entry) => {
    const amount = Number(entry.amount)
    if (entry.entryType === 'income') acc.income += amount
    else acc.expense += amount
    return acc
  }, { income: 0, expense: 0 }), [entries])

  function submit(formData: FormData) {
    const input = {
      entryType: formData.get('entryType') as 'income' | 'expense',
      category: String(formData.get('category') || ''),
      description: String(formData.get('description') || ''),
      amount: Number(formData.get('amount')),
      occurredOn: String(formData.get('occurredOn') || ''),
    }
    startTransition(async () => {
      try {
        await createCareerFinancialEntry(input)
        setMessage('Lançamento salvo na carreira.')
        window.location.reload()
      } catch (error) {
        setMessage(error instanceof Error ? error.message : 'Não foi possível salvar.')
      }
    })
  }

  function remove(id: string) {
    startTransition(async () => {
      await deleteCareerFinancialEntry(id)
      setEntries((current) => current.filter((entry) => entry.id !== id))
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi label="Receitas da carreira" value={money.format(totals.income)} tone="positive" />
        <Kpi label="Despesas da carreira" value={money.format(totals.expense)} tone="default" />
        <Kpi label="Saldo operacional" value={money.format(totals.income - totals.expense)} tone={totals.income >= totals.expense ? 'positive' : 'negative'} />
      </div>

      <Panel title="Livro-caixa da carreira" eyebrow="Dados internos do simulador" action={{ label: showForm ? 'Fechar' : 'Novo lançamento', href: '#novo-lancamento' }}>
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl bg-primary/5 p-4 ring-1 ring-primary/15">
          <div className="flex items-start gap-3"><WalletCards className="mt-0.5 size-5 text-primary" /><p className="text-sm text-muted-foreground">Estes valores pertencem à carreira salva e não representam demonstrações financeiras reais.</p></div>
          <Button type="button" size="sm" onClick={() => setShowForm((value) => !value)}><Plus className="size-4" />Lançar</Button>
        </div>
        {showForm ? <form id="novo-lancamento" action={submit} className="mb-6 grid gap-3 rounded-xl bg-muted/30 p-4 sm:grid-cols-2">
          <select name="entryType" defaultValue="expense" className="h-10 rounded-md border border-input bg-background px-3 text-sm"><option value="income">Receita</option><option value="expense">Despesa</option></select>
          <input name="category" placeholder="Categoria (ex.: salários)" required className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
          <input name="description" placeholder="Descrição" required className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
          <input name="amount" type="number" min="0.01" step="0.01" placeholder="Valor em CC$" required className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
          <input name="occurredOn" type="date" required className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
          <Button disabled={isPending} type="submit" className="sm:col-span-2">{isPending ? 'Salvando…' : 'Salvar lançamento'}</Button>
          {message ? <p className="text-sm text-muted-foreground sm:col-span-2" role="status">{message}</p> : null}
        </form> : null}
        <div className="space-y-2">
          {entries.length === 0 ? <p className="py-8 text-center text-sm text-muted-foreground">Nenhum lançamento registrado nesta carreira.</p> : entries.map((entry) => <div key={entry.id} className="flex items-center gap-3 rounded-xl px-2 py-3 ring-1 ring-border/60"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">{entry.entryType === 'income' ? <ArrowDownLeft className="size-4 text-positive" /> : <ArrowUpRight className="size-4 text-muted-foreground" />}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{entry.description}</p><p className="text-xs text-muted-foreground">{entry.category} · {entry.occurredOn}</p></div><span className={`text-sm font-semibold tabular ${entry.entryType === 'income' ? 'text-positive' : 'text-foreground'}`}>{entry.entryType === 'income' ? '+' : '-'}{money.format(Number(entry.amount))}</span><Button variant="ghost" size="sm" onClick={() => remove(entry.id)} disabled={isPending}>Excluir</Button></div>)}
        </div>
      </Panel>
    </div>
  )
}

function Kpi({ label, value, tone }: { label: string; value: string; tone: 'positive' | 'negative' | 'default' }) {
  return <div className="rounded-2xl bg-card p-5 ring-1 ring-border"><p className="text-xs text-muted-foreground">{label}</p><p className={`mt-2 font-display text-xl font-semibold tabular ${tone === 'positive' ? 'text-positive' : tone === 'negative' ? 'text-destructive' : 'text-foreground'}`}>{value}</p></div>
}

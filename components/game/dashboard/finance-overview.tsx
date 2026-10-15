'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { finances, formatMoney } from '@/lib/game-data'
import { Panel } from '../panel'
import { Meter, Trend } from '../indicators'

const chartConfig = {
  receitas: { label: 'Receitas', color: 'var(--chart-1)' },
  despesas: { label: 'Despesas', color: 'var(--chart-2)' },
} satisfies ChartConfig

const mixTones = ['bg-primary', 'bg-primary/60', 'bg-muted-foreground/60', 'bg-muted-foreground/30']

export function FinanceOverview() {
  const net = finances.monthlyRevenue - finances.monthlyExpenses
  const wageUsage = Math.round((finances.wageBill / finances.wageBudget) * 100)

  return (
    <Panel title="Resumo financeiro" eyebrow="Valores em milhões · Outubro" action={{ label: 'Abrir finanças', href: '/financas' }} index={6} className="xl:col-span-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
        <Kpi label="Caixa disponível" value={formatMoney(finances.balance)} trend={<Trend value={finances.balanceChange} suffix=" mi no mês" />} />
        <Kpi label="Receita mensal" value={formatMoney(finances.monthlyRevenue)} trend={<Trend value={5.4} suffix="%" />} />
        <Kpi
          label="Despesa mensal"
          value={formatMoney(finances.monthlyExpenses)}
          trend={<span className="text-xs text-muted-foreground">Resultado <span className="text-positive">+{net.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi</span></span>}
        />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Folha salarial</span>
          <span className="font-display text-xl font-semibold leading-tight text-foreground tabular md:text-2xl">
            {formatMoney(finances.wageBill)}
          </span>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <Meter value={wageUsage} label="Uso do teto salarial" />
            <span className="text-xs text-muted-foreground tabular">{wageUsage}% do teto</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded-full bg-chart-1" aria-hidden="true" />Receitas</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded-full bg-chart-2" aria-hidden="true" />Despesas</span>
      </div>
      <ChartContainer config={chartConfig} className="mt-2 aspect-auto h-52 w-full md:h-60">
        <AreaChart data={finances.history} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="fillReceitas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-receitas)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-receitas)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 5" stroke="var(--border)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={6} width={28} domain={[10, 30]} ticks={[10, 15, 20, 25, 30]} />
          <ChartTooltip
            cursor={{ stroke: 'var(--border)' }}
            content={<ChartTooltipContent indicator="line" formatter={(value, name) => (
              <div className="flex w-full items-center justify-between gap-4">
                <span className="text-muted-foreground">{chartConfig[name as keyof typeof chartConfig]?.label}</span>
                <span className="font-medium text-foreground tabular">{formatMoney(Number(value))}</span>
              </div>
            )} />}
          />
          <Area dataKey="despesas" type="monotone" stroke="var(--color-despesas)" strokeWidth={1.75} strokeDasharray="4 4" fill="transparent" />
          <Area dataKey="receitas" type="monotone" stroke="var(--color-receitas)" strokeWidth={2.25} fill="url(#fillReceitas)" />
        </AreaChart>
      </ChartContainer>

      <div className="mt-6 flex flex-col gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Origem das receitas</span>
        <div className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full" role="img" aria-label={finances.revenueMix.map((m) => `${m.label} ${m.value}%`).join(', ')}>
          {finances.revenueMix.map((m, i) => (
            <div key={m.label} className={`h-full ${mixTones[i]}`} style={{ width: `${m.value}%` }} />
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
          {finances.revenueMix.map((m, i) => (
            <li key={m.label} className="flex items-center gap-2 text-xs">
              <span className={`size-2 shrink-0 rounded-sm ${mixTones[i]}`} aria-hidden="true" />
              <span className="text-muted-foreground">{m.label}</span>
              <span className="ml-auto font-medium text-foreground tabular md:ml-0">{m.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

function Kpi({ label, value, trend }: { label: string; value: string; trend: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-display text-xl font-semibold leading-tight text-foreground tabular md:text-2xl">{value}</span>
      {trend}
    </div>
  )
}

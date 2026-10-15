'use client'

import { Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { board, club, leagueTable, positionHistory, season } from '@/lib/game-data'
import { ClubCrest } from '../club-crest'
import { Meter, Trend } from '../indicators'

const chartConfig = {
  position: { label: 'Posição', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function ClubHero() {
  const row = leagueTable.find((r) => r.isUser)!
  const stats = [
    { label: 'Posição', value: `${row.position}º`, trend: <Trend value={row.movement} suffix=" pos." /> },
    { label: 'Pontos', value: row.points, trend: <span className="text-xs text-muted-foreground">em {row.played} jogos</span> },
    { label: 'Saldo de gols', value: `+${row.goalDiff}`, trend: <span className="text-xs text-muted-foreground">3º melhor ataque</span> },
    { label: 'Aproveitamento', value: `${Math.round((row.points / (row.played * 3)) * 100)}%`, trend: <Trend value={8} suffix=" p.p." /> },
  ]

  return (
    <section
      aria-label="Resumo do clube"
      className="rise-in relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-surface-raised shadow-[inset_0_1px_0_0_oklch(1_0_0/0.06)] ring-1 ring-border"
    >
      <div className="relative flex flex-1 flex-col justify-between gap-8 p-5 md:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-5">
            <ClubCrest club={club} size="xl" />
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Seu clube · Desde {club.founded}
              </span>
              <h1 className="text-balance font-display text-3xl font-bold leading-none tracking-tight text-foreground md:text-4xl">
                {club.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {club.city} · {club.stadium} ({club.capacity.toLocaleString('pt-BR')} lugares)
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-1 md:w-64 xl:w-72">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Evolução na tabela
              </span>
              <span className="text-xs text-muted-foreground tabular">R1–R{season.round}</span>
            </div>
            <ChartContainer config={chartConfig} className="aspect-auto h-24 w-full md:h-32">
              <LineChart data={positionHistory} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
                <XAxis dataKey="round" hide />
                <YAxis reversed domain={[1, 10]} hide />
                <ReferenceLine y={4} stroke="var(--border)" strokeDasharray="3 4" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator formatter={(v) => `${v}º lugar`} />} />
                <Line
                  dataKey="position"
                  type="monotone"
                  stroke="var(--color-position)"
                  strokeWidth={2.25}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold leading-none text-foreground tabular xl:text-4xl">{s.value}</dd>
              <dd>{s.trend}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-4 rounded-xl bg-background/50 p-4 md:grid-cols-[1.4fr_1fr_1fr] md:items-center md:gap-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Meta da diretoria
            </span>
            <span className="text-sm font-medium text-foreground">{board.objective}</span>
          </div>
          <MeterRow label="Confiança da diretoria" value={board.confidence} />
          <MeterRow label="Humor da torcida" value={board.fanMood} positive />
        </div>
      </div>
    </section>
  )
}

function MeterRow({ label, value, positive }: { label: string; value: number; positive?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground tabular">{value}%</span>
      </div>
      <Meter value={value} label={label} tone={positive ? 'positive' : 'primary'} />
    </div>
  )
}

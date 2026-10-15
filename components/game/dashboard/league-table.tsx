import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { leagueTable, season } from '@/lib/game-data'
import { ClubCrest } from '../club-crest'
import { Panel } from '../panel'

export function LeagueTable() {
  return (
    <Panel
      title="Classificação"
      eyebrow={`${season.competition} · Rodada ${season.round}`}
      action={{ label: 'Tabela completa', href: '/classificacao' }}
      index={8}
      className="md:col-span-2 xl:col-span-4"
      bodyClassName="px-2 md:px-3"
    >
      <table className="w-full text-sm">
        <caption className="sr-only">Seis primeiros colocados da liga</caption>
        <thead>
          <tr className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <th scope="col" className="w-10 pb-2 pl-3 text-left font-medium">#</th>
            <th scope="col" className="pb-2 text-left font-medium">Clube</th>
            <th scope="col" className="w-9 pb-2 text-center font-medium"><abbr title="Jogos" className="no-underline">J</abbr></th>
            <th scope="col" className="w-10 pb-2 text-center font-medium"><abbr title="Saldo de gols" className="no-underline">SG</abbr></th>
            <th scope="col" className="w-10 pb-2 pr-3 text-right font-medium"><abbr title="Pontos" className="no-underline">P</abbr></th>
          </tr>
        </thead>
        <tbody>
          {leagueTable.map((row) => (
            <tr
              key={row.team.id}
              aria-current={row.isUser ? 'true' : undefined}
              className={cn('tabular', row.isUser ? 'bg-primary/12' : 'hover:bg-accent/40')}
            >
              <td className="rounded-l-lg py-2.5 pl-3">
                <span className="flex items-center gap-2">
                  <span
                    className={cn('h-4 w-0.5 rounded-full', row.position <= 4 ? 'bg-primary' : 'bg-transparent')}
                    aria-hidden="true"
                  />
                  <span className={cn('font-display font-semibold', row.isUser ? 'text-foreground' : 'text-muted-foreground')}>
                    {row.position}
                  </span>
                </span>
              </td>
              <td className="py-2.5">
                <span className="flex items-center gap-2.5">
                  <ClubCrest club={row.team} size="xs" decorative />
                  <span className={cn('truncate', row.isUser ? 'font-semibold text-foreground' : 'text-foreground/90')}>
                    {row.team.shortName}
                  </span>
                  <Movement value={row.movement} />
                </span>
              </td>
              <td className="py-2.5 text-center text-muted-foreground">{row.played}</td>
              <td className="py-2.5 text-center text-muted-foreground">{row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}</td>
              <td className="rounded-r-lg py-2.5 pr-3 text-right font-display font-semibold text-foreground">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 flex items-center gap-2 px-3 text-xs text-muted-foreground">
        <span className="h-3 w-0.5 rounded-full bg-primary" aria-hidden="true" />
        Vaga no torneio continental
      </p>
      <div className="mx-3 mt-auto flex items-center justify-between gap-3 rounded-xl bg-background/60 px-3.5 py-3 text-xs">
        <span className="text-muted-foreground">Distância para o líder</span>
        <span className="font-display text-sm font-semibold text-foreground tabular">
          {leagueTable[0].points - (leagueTable.find((r) => r.isUser)?.points ?? 0)} pontos
        </span>
      </div>
    </Panel>
  )
}

function Movement({ value }: { value: number }) {
  if (value === 0) return null
  const up = value > 0
  const Icon = up ? ChevronUp : ChevronDown
  return (
    <span className={cn('flex items-center text-[11px]', up ? 'text-positive' : 'text-muted-foreground')}>
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="sr-only">{up ? 'Subiu' : 'Caiu'}</span>
      {Math.abs(value)}
    </span>
  )
}

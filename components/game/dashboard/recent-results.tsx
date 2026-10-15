import { recentResults } from '@/lib/game-data'
import { ClubCrest } from '../club-crest'
import { FormStrip, ResultBadge } from '../indicators'
import { Panel } from '../panel'

export function RecentResults() {
  const record = recentResults.reduce(
    (acc, r) => ({ ...acc, [r.result]: acc[r.result] + 1 }),
    { V: 0, E: 0, D: 0 },
  )
  const goalsFor = recentResults.reduce((sum, r) => sum + r.score[0], 0)
  const goalsAgainst = recentResults.reduce((sum, r) => sum + r.score[1], 0)
  const cleanSheets = recentResults.filter((r) => r.score[1] === 0).length

  return (
    <Panel title="Últimos resultados" eyebrow={`${record.V}V · ${record.E}E · ${record.D}D`} action={{ label: 'Calendário', href: '/calendario' }} index={9} className="xl:col-span-4">
      <FormStrip results={recentResults.map((r) => r.result).reverse()} className="mb-4" />
      <ul className="flex flex-col">
        {recentResults.map((r, i) => (
          <li key={i} className="flex items-center gap-3 border-t border-border py-3 first:border-t-0 first:pt-0 last:pb-0">
            <ClubCrest club={r.opponent} size="sm" decorative />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm text-foreground">{r.opponent.shortName}</span>
              <span className="text-xs text-muted-foreground">{r.venue} · {r.competition}</span>
            </div>
            <span className="font-display text-base font-semibold text-foreground tabular">
              {r.score[0]}<span className="px-0.5 text-muted-foreground">–</span>{r.score[1]}
            </span>
            <ResultBadge result={r.result} />
          </li>
        ))}
      </ul>
      <dl className="mt-auto grid grid-cols-3 gap-2 pt-5">
        {[
          { label: 'Gols pró', value: goalsFor },
          { label: 'Gols contra', value: goalsAgainst },
          { label: 'Sem sofrer', value: cleanSheets },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5 rounded-xl bg-background/60 px-3 py-2.5">
            <dt className="text-[11px] text-muted-foreground">{s.label}</dt>
            <dd className="font-display text-xl font-semibold text-foreground tabular">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  )
}

import Link from 'next/link'
import { CalendarClock, MapPin, Users } from 'lucide-react'
import { nextMatch } from '@/lib/game-data'
import { ClubCrest } from '../club-crest'
import { FormStrip } from '../indicators'

export function NextMatch() {
  const { home, away, winProbability: p } = nextMatch

  return (
    <section
      aria-label="Próxima partida"
      style={{ '--i': 1 } as React.CSSProperties}
      className="rise-in flex flex-col rounded-2xl bg-card shadow-[inset_0_1px_0_0_oklch(1_0_0/0.05)] ring-1 ring-border"
    >
      <header className="flex items-center justify-between px-5 pt-5 md:px-6">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Próxima partida</span>
        <span className="rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-semibold text-primary tabular">
          Em {nextMatch.daysUntil} dias
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-6 px-5 pb-5 pt-5 md:px-6 md:pb-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
          <TeamSide club={home} caption="Mandante · 3º" />
          <div className="flex flex-col items-center gap-1 pt-5">
            <span className="font-display text-2xl font-bold text-foreground tabular">{nextMatch.time}</span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{nextMatch.date.split(',')[0]}</span>
          </div>
          <TeamSide club={away} caption={`Visitante · ${nextMatch.opponentPosition}º`} />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Probabilidade estimada</span>
          </div>
          <div className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full" role="img" aria-label={`Vitória ${p.home}%, empate ${p.draw}%, derrota ${p.away}%`}>
            <div className="h-full rounded-l-full bg-primary" style={{ width: `${p.home}%` }} />
            <div className="h-full bg-muted-foreground/40" style={{ width: `${p.draw}%` }} />
            <div className="h-full rounded-r-full bg-foreground/80" style={{ width: `${p.away}%` }} />
          </div>
          <div className="flex justify-between text-xs tabular">
            <span className="font-medium text-foreground">Vitória {p.home}%</span>
            <span className="text-muted-foreground">Empate {p.draw}%</span>
            <span className="text-muted-foreground">Derrota {p.away}%</span>
          </div>
        </div>

        <ul className="flex flex-col gap-2.5 text-sm">
          <li className="flex items-center gap-2.5 text-muted-foreground">
            <CalendarClock className="size-4 shrink-0" aria-hidden="true" />
            <span className="text-foreground">{nextMatch.date}</span> · {nextMatch.competition.split(' · ')[1]}
          </li>
          <li className="flex items-center gap-2.5 text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {nextMatch.venue}
          </li>
          <li className="flex items-center gap-2.5 text-muted-foreground">
            <Users className="size-4 shrink-0" aria-hidden="true" />
            Público previsto <span className="text-foreground tabular">{nextMatch.expectedAttendance.toLocaleString('pt-BR')}</span>
          </li>
        </ul>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">Forma do rival</span>
          <FormStrip results={nextMatch.opponentForm} />
        </div>

        <Link
          href="/calendario"
          className="mt-auto inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-[filter,transform] hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Preparar partida
        </Link>
      </div>
    </section>
  )
}

function TeamSide({ club, caption }: { club: typeof nextMatch.home; caption: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center">
      <ClubCrest club={club} size="lg" />
      <div className="flex flex-col gap-0.5">
        <span className="text-balance font-display text-sm font-semibold leading-tight text-foreground">{club.shortName}</span>
        <span className="text-[11px] text-muted-foreground">{caption}</span>
      </div>
    </div>
  )
}

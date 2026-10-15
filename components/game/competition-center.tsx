'use client'

import { useState } from 'react'
import { CalendarDays, CircleAlert, Play, Trophy } from 'lucide-react'
import { simulateMatch } from '@/lib/simulation'

const demoMatches = [
  { id: 'demo-match-1', round: 1, home: 'Clube mandante não verificado', away: 'Adversário não verificado', homeRating: null, awayRating: null, status: 'Calendário indisponível' },
]

export function CompetitionCenter() {
  const [result, setResult] = useState<{ homeGoals: number; awayGoals: number } | null>(null)
  return <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
    <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div><span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">Motor de competição</span><h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">Competições</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Calendários e regulamentos só aparecem como oficiais quando possuem fonte revisada. Partidas futuras são sempre identificadas como simulação do jogo.</p></div>
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300"><CircleAlert className="size-3.5" /> Dados oficiais pendentes</span>
    </header>
    <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-2xl bg-surface-raised p-5 ring-1 ring-border"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Trophy className="size-5" /></span><div><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Competição</p><h2 className="mt-1 text-lg font-semibold text-foreground">Temporada ainda não verificada</h2></div></div><span className="rounded-full bg-muted px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Indisponível</span></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><Info label="Formato" value="Não informado" /><Info label="Participantes" value="Não importados" /><Info label="Regulamento" value="Fonte pendente" /></div></div>
      <div className="rounded-2xl bg-primary p-5 text-primary-foreground"><p className="text-[11px] uppercase tracking-[0.16em] opacity-70">Próxima ação</p><h2 className="mt-2 text-lg font-semibold">Simular partida de demonstração</h2><p className="mt-2 text-sm leading-relaxed opacity-75">Usa força neutra quando nenhum atributo verificado foi importado. Não é previsão nem resultado real.</p><button type="button" onClick={() => setResult(simulateMatch({ seed: 'demo-match-1' }))} className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-primary-foreground px-4 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"><Play className="size-4" /> Simular agora</button>{result && <p className="mt-4 text-sm font-semibold">Resultado do jogo: {result.homeGoals} × {result.awayGoals}</p>}</div>
    </section>
    <section className="rounded-2xl bg-surface-raised p-5 ring-1 ring-border"><div className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /><h2 className="text-sm font-semibold text-foreground">Calendário e rodadas</h2></div><div className="mt-4 overflow-hidden rounded-xl ring-1 ring-border"><div className="grid grid-cols-[72px_1fr_1fr_140px] gap-3 bg-background px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground"><span>Rodada</span><span>Mandante</span><span>Visitante</span><span>Status</span></div>{demoMatches.map((match) => <div key={match.id} className="grid grid-cols-[72px_1fr_1fr_140px] items-center gap-3 border-t border-border px-4 py-4 text-sm"><span className="text-muted-foreground">R{match.round}</span><span className="text-foreground">{match.home}</span><span className="text-foreground">{match.away}</span><span className="text-xs text-amber-300">{match.status}</span></div>)}</div></section>
    <p className="text-xs leading-relaxed text-muted-foreground">Método da simulação: rating opcional + vantagem de mando + semente estável. Quando clubes, participantes, calendário ou atributos não forem confirmados por fonte oficial, o campo permanece indisponível.</p>
  </main>
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-background p-3 ring-1 ring-border"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1 text-sm font-medium text-foreground">{value}</p></div> }

'use client'

import Link from 'next/link'
import { Search, ShieldCheck, SlidersHorizontal, UserRound, UsersRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { Panel } from '@/components/game/panel'

type RegistryItem = { id: string; name: string; country?: string; status: string; href: string }

const officialSources = [
  { name: 'CBF', detail: 'Clubes, atletas e competições nacionais', url: 'https://www.cbf.com.br' },
  { name: 'Federações estaduais', detail: 'Registros sob responsabilidade estadual', url: 'https://www.cbf.com.br/futebol-brasileiro' },
  { name: 'FIFA', detail: 'Regulamentos e competições internacionais', url: 'https://www.fifa.com' },
]

export function DataRegistry({ clubs, players }: { clubs: RegistryItem[]; players: RegistryItem[] }) {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<'all' | 'clubs' | 'players'>('all')
  const filteredClubs = useMemo(() => clubs.filter((item) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [clubs, query])
  const filteredPlayers = useMemo(() => players.filter((item) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [players, query])

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
      <header className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">Base de dados</span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">Cadastro oficial</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Pesquisa de clubes e jogadores com status de verificação, temporada e origem preservados.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"><ShieldCheck className="size-3.5" /> Sem dados inventados</span>
      </header>

      <section className="flex flex-col gap-3 rounded-2xl bg-surface-raised p-4 ring-1 ring-border md:flex-row md:items-center">
        <label className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Pesquisar clubes ou jogadores</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar por nome..." className="h-11 w-full rounded-xl bg-background pl-10 pr-4 text-sm text-foreground outline-none ring-1 ring-border placeholder:text-muted-foreground focus:ring-primary" /></label>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><SlidersHorizontal className="size-4" /><select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)} className="h-10 rounded-lg bg-background px-3 text-foreground ring-1 ring-border"><option value="all">Todos os registros</option><option value="clubs">Clubes</option><option value="players">Jogadores</option></select></div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        {(kind === 'all' || kind === 'clubs') && <RegistryPanel title="Clubes" icon={<UsersRound className="size-4" />} items={filteredClubs} empty="Nenhum clube confirmado importado." />}
        {(kind === 'all' || kind === 'players') && <RegistryPanel title="Jogadores" icon={<UserRound className="size-4" />} items={filteredPlayers} empty="Nenhum jogador confirmado importado." />}
      </div>

      <Panel title="Fontes prioritárias" eyebrow="Governança de dados" index={3}>
        <div className="grid gap-3 md:grid-cols-3">{officialSources.map((source) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="rounded-xl bg-background p-4 ring-1 ring-border transition-colors hover:bg-accent"><p className="text-sm font-semibold text-foreground">{source.name}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{source.detail}</p><p className="mt-3 text-[11px] font-medium text-primary">Abrir fonte oficial</p></a>)}</div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Importações automáticas não são presumidas. Cada registro deverá informar URL, entidade responsável, data de consulta, temporada e data de referência antes de ser exibido como confirmado.</p>
      </Panel>
    </div>
  )
}

function RegistryPanel({ title, icon, items, empty }: { title: string; icon: ReactNode; items: RegistryItem[]; empty: string }) {
  return <Panel title={title} eyebrow="Registros confirmados" index={1}>{items.length ? <div className="flex flex-col gap-2">{items.map((item) => <Link key={item.id} href={item.href} className="flex items-center justify-between rounded-xl bg-background p-3 ring-1 ring-border hover:bg-accent"><span className="flex items-center gap-3">{icon}<span><span className="block text-sm font-medium text-foreground">{item.name}</span><span className="block text-xs text-muted-foreground">{item.country ?? 'Origem não informada'}</span></span></span><span className="text-[10px] uppercase tracking-wider text-emerald-400">{item.status}</span></Link>)}</div> : <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center"><p className="text-sm text-muted-foreground">{empty}</p><p className="mt-2 text-xs text-muted-foreground">Os dados só aparecem após revisão de fonte oficial.</p></div>}</Panel>
}

export type { RegistryItem }


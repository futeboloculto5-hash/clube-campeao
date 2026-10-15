import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { Panel } from '@/components/game/panel'
import { db } from '@/lib/db'
import { canonicalClub } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export default async function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [club] = await db.select().from(canonicalClub).where(eq(canonicalClub.id, id)).limit(1)
  if (!club) notFound()
  return <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5"><Link href="/cadastro" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Voltar ao cadastro</Link><header><span className="text-[11px] uppercase tracking-[0.18em] text-primary">Clube · registro canônico</span><h1 className="mt-2 font-display text-3xl font-bold text-foreground">{club.name}</h1></header><Panel title="Identificação" eyebrow="Status do registro" index={1}><div className="grid gap-4 sm:grid-cols-2"><Info label="País" value={club.country} /><Info label="Federação" value={club.federation ?? 'Indisponível'} /><Info label="Chave canônica" value={club.canonicalKey} /><Info label="Status" value={club.status} /></div></Panel><Panel title="Dados auditáveis" eyebrow="Sem campos presumidos" index={2}><p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />Informações de elenco, competição e vínculos só serão exibidas quando houver um registro de fonte revisado para este clube.</p></Panel></div>
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-background p-4 ring-1 ring-border"><p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 break-words text-sm font-medium text-foreground">{value}</p></div> }

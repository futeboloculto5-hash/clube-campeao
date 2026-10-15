import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { Panel } from '@/components/game/panel'
import { db } from '@/lib/db'
import { canonicalPlayer } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export default async function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [player] = await db.select().from(canonicalPlayer).where(eq(canonicalPlayer.id, id)).limit(1)
  if (!player) notFound()
  return <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5"><Link href="/cadastro" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Voltar ao cadastro</Link><header><span className="text-[11px] uppercase tracking-[0.18em] text-primary">Jogador · registro canônico</span><h1 className="mt-2 font-display text-3xl font-bold text-foreground">{player.fullName}</h1></header><Panel title="Identificação" eyebrow="Status do registro" index={1}><div className="grid gap-4 sm:grid-cols-2"><Info label="Data de nascimento" value={player.birthDate ?? 'Indisponível'} /><Info label="Nacionalidade" value={player.nationality ?? 'Indisponível'} /><Info label="Chave canônica" value={player.canonicalKey} /><Info label="Status" value={player.status} /></div></Panel><Panel title="Dados auditáveis" eyebrow="Sem campos presumidos" index={2}><p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />Clube atual, posição, contrato e histórico só serão exibidos quando houver uma fonte oficial revisada e vinculada.</p></Panel></div>
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-background p-4 ring-1 ring-border"><p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 break-words text-sm font-medium text-foreground">{value}</p></div> }

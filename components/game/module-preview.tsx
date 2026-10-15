import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import type { NavItem } from '@/lib/navigation'
import { PageHeading } from './page-heading'
import { Panel } from './panel'
import { NotifyButton } from './notify-button'

const plannedFeatures: Record<string, string[]> = {
  elenco: ['Lista do elenco com atributos e posições', 'Contratos, salários e cláusulas', 'Moral, forma e condição física', 'Planejamento de renovações'],
  'categorias-de-base': ['Ranking de promessas da academia', 'Promoção ao elenco principal', 'Investimento em infraestrutura', 'Rede de observadores regionais'],
  estadio: ['Ocupação e preço de ingressos', 'Planos de expansão e reformas', 'Custos de manutenção', 'Experiência do torcedor'],
  transferencias: ['Lista de observação e relatórios', 'Propostas recebidas e enviadas', 'Negociação de valores e bônus', 'Empréstimos e cláusulas de recompra'],
  financas: ['Fluxo de caixa detalhado por mês', 'Orçamentos de salários e contratações', 'Renegociação de dívidas', 'Projeção de fim de temporada'],
  patrocinios: ['Patrocínio máster e de mangas', 'Naming rights do estádio', 'Metas e bônus por desempenho', 'Negociação de renovações'],
  calendario: ['Agenda de jogos e viagens', 'Preparação e preleção', 'Escalação e tática', 'Simulação da partida'],
  classificacao: ['Tabela completa da liga', 'Artilharia e assistências', 'Comparativo entre clubes', 'Histórico de rodadas'],
  noticias: ['Feed completo de notícias', 'Coletivas de imprensa', 'Reação da torcida', 'Comunicados oficiais da diretoria'],
}

export function ModulePreview({ item }: { item: NavItem }) {
  const Icon = item.icon
  const features = plannedFeatures[item.slug] ?? []

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
      <PageHeading eyebrow={item.group} title={item.label} />

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <section className="rise-in relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-surface-raised p-6 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.06)] ring-1 ring-border md:p-8">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)]">
            <Icon className="size-7" aria-hidden="true" />
          </span>
          <div className="flex max-w-lg flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">Módulo em desenvolvimento</span>
            <h2 className="text-balance font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">
              {item.label} chega nas próximas etapas
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
          <div className="mt-auto flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground ring-1 ring-border transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar ao painel
            </Link>
            <NotifyButton feature={item.label} />
          </div>
        </section>

        <Panel title="O que estará disponível" eyebrow="Escopo planejado" index={1}>
          <ul className="flex flex-col">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 border-t border-border py-3.5 text-sm text-foreground first:border-t-0 first:pt-0">
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-primary/12 text-primary">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

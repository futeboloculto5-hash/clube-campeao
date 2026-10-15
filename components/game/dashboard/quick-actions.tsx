import Link from 'next/link'
import { ArrowRight, ArrowLeftRight, Handshake, Shirt, Wallet } from 'lucide-react'

const actions = [
  { href: '/elenco', label: 'Elenco', meta: '27 jogadores', detail: '2 no departamento médico', icon: Shirt },
  { href: '/transferencias', label: 'Transferências', meta: '3 propostas', detail: 'Aguardando sua resposta', icon: ArrowLeftRight },
  { href: '/financas', label: 'Finanças', meta: 'CC$ 18,0 mi', detail: 'Orçamento de contratações', icon: Wallet },
  { href: '/patrocinios', label: 'Patrocínios', meta: '1 renovação', detail: 'Contrato de camisa vence em mar', icon: Handshake },
]

export function QuickActions() {
  return (
    <nav aria-label="Atalhos de gestão" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {actions.map((a, i) => {
        const Icon = a.icon
        return (
          <Link
            key={a.href}
            href={a.href}
            style={{ '--i': i + 2 } as React.CSSProperties}
            className="rise-in group flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.05)] ring-1 ring-border transition-[background-color,box-shadow] hover:bg-surface-raised hover:ring-primary/40 focus-visible:outline-2 focus-visible:outline-primary md:p-5"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-muted-foreground">{a.label}</span>
              <span className="font-display text-lg font-semibold leading-tight text-foreground tabular md:text-xl">{a.meta}</span>
              <span className="line-clamp-2 text-xs leading-snug md:line-clamp-1 text-muted-foreground">{a.detail}</span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

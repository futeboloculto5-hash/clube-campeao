import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PanelProps = {
  title: string
  eyebrow?: string
  action?: { label: string; href: string }
  children: React.ReactNode
  className?: string
  bodyClassName?: string
  index?: number
}

export function Panel({ title, eyebrow, action, children, className, bodyClassName, index = 0 }: PanelProps) {
  return (
    <section
      aria-label={title}
      style={{ '--i': index } as React.CSSProperties}
      className={cn(
        'rise-in flex flex-col rounded-2xl bg-card shadow-[inset_0_1px_0_0_oklch(1_0_0/0.05)] ring-1 ring-border',
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4 px-5 pt-5 md:px-6">
        <div className="flex flex-col gap-1">
          {eyebrow ? (
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="font-display text-lg font-semibold leading-tight text-foreground">{title}</h2>
        </div>
        {action ? (
          <Link
            href={action.href}
            className="group -mr-2 inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
          >
            {action.label}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        ) : null}
      </header>
      <div className={cn('flex flex-1 flex-col px-5 pb-5 pt-4 md:px-6 md:pb-6', bodyClassName)}>{children}</div>
    </section>
  )
}

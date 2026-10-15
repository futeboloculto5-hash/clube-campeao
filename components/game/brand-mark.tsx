import Link from 'next/link'
import { cn } from '@/lib/utils'

export function BrandMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Clube Campeão World — ir para o painel"
      className={cn('group flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-primary', className)}
    >
      <span className="relative grid size-9 shrink-0 place-items-center rounded-[10px] bg-primary shadow-[0_6px_20px_-6px_var(--primary)]">
        <svg viewBox="0 0 24 24" className="size-5 text-primary-foreground" aria-hidden="true">
          <path d="M12 3 19 6v5.6c0 4.5-3 7.6-7 9.4-4-1.8-7-4.9-7-9.4V6l7-3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m12 8.2 1.2 2.5 2.7.3-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.3L12 8.2Z" fill="currentColor" />
        </svg>
      </span>
      {compact ? null : (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold uppercase tracking-[0.06em] text-foreground">
            Clube Campeão
          </span>
          <span className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[0.42em] text-primary">
            World
          </span>
        </span>
      )}
    </Link>
  )
}

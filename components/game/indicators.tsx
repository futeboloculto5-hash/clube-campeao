import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchResult } from '@/lib/game-data'

const resultLabel: Record<MatchResult, string> = { V: 'Vitória', E: 'Empate', D: 'Derrota' }

export function ResultBadge({ result, className }: { result: MatchResult; className?: string }) {
  return (
    <span
      title={resultLabel[result]}
      className={cn(
        'inline-grid size-6 shrink-0 place-items-center rounded-md font-display text-[11px] font-bold',
        result === 'V' && 'bg-positive/15 text-positive',
        result === 'E' && 'bg-muted text-muted-foreground',
        result === 'D' && 'bg-destructive/15 text-destructive',
        className,
      )}
    >
      <span aria-hidden="true">{result}</span>
      <span className="sr-only">{resultLabel[result]}</span>
    </span>
  )
}

export function FormStrip({ results, className }: { results: MatchResult[]; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1', className)} aria-label="Sequência recente">
      {results.map((r, i) => (
        <ResultBadge key={i} result={r} />
      ))}
    </div>
  )
}

export function Trend({ value, suffix = '', invert = false }: { value: number; suffix?: string; invert?: boolean }) {
  const positive = invert ? value < 0 : value > 0
  const Icon = value === 0 ? Minus : value > 0 ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 text-xs font-medium tabular',
        value === 0 ? 'text-muted-foreground' : positive ? 'text-positive' : 'text-muted-foreground',
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {value > 0 ? '+' : ''}
      {value.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}

export function Meter({
  value,
  label,
  className,
  tone = 'primary',
}: {
  value: number
  label: string
  className?: string
  tone?: 'primary' | 'positive' | 'muted'
}) {
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-muted', className)}
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-700',
          tone === 'primary' && 'bg-primary',
          tone === 'positive' && 'bg-positive',
          tone === 'muted' && 'bg-muted-foreground/60',
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export function DemoTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
      Dados fictícios de exemplo
    </span>
  )
}

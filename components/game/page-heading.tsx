import { DemoTag } from './indicators'

export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 py-4 md:flex-row md:items-end md:justify-between md:py-6">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</span>
        <h1 className="text-balance font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        <DemoTag />
      </div>
    </div>
  )
}

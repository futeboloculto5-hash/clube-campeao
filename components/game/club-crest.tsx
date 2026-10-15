import { cn } from '@/lib/utils'
import type { ClubIdentity } from '@/lib/game-data'

type ClubCrestProps = {
  club: Pick<ClubIdentity, 'initials' | 'primary' | 'secondary' | 'name'>
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  decorative?: boolean
}

const sizes = {
  xs: 'size-5 text-[7px]',
  sm: 'size-7 text-[9px]',
  md: 'size-10 text-xs',
  lg: 'size-16 text-lg',
  xl: 'size-24 text-2xl md:size-28 md:text-3xl',
}

export function ClubCrest({ club, size = 'md', className, decorative = false }: ClubCrestProps) {
  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : `Escudo de ${club.name}`}
      aria-hidden={decorative || undefined}
      className={cn('relative inline-grid shrink-0 place-items-center', sizes[size], className)}
    >
      <svg viewBox="0 0 40 46" className="absolute inset-0 size-full" aria-hidden="true">
        <path
          d="M20 1.5 37.5 7v15.5C37.5 33 30 40.5 20 44.5 10 40.5 2.5 33 2.5 22.5V7L20 1.5Z"
          fill={club.primary}
        />
        <path
          d="M20 1.5 37.5 7v15.5C37.5 33 30 40.5 20 44.5Z"
          fill="black"
          fillOpacity="0.14"
        />
        <path
          d="M20 4.6 34.6 9.2v13.3c0 8.9-6.2 15.3-14.6 18.9-8.4-3.6-14.6-10-14.6-18.9V9.2L20 4.6Z"
          fill="none"
          stroke={club.secondary}
          strokeOpacity="0.55"
          strokeWidth="1.1"
        />
      </svg>
      <span
        className="relative -mt-[8%] font-display font-extrabold tracking-tight"
        style={{ color: club.secondary }}
      >
        {club.initials}
      </span>
    </span>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { navGroups, navItems } from '@/lib/navigation'
import { club, finances, formatMoney } from '@/lib/game-data'
import { BrandMark } from './brand-mark'
import { ClubCrest } from './club-crest'

export function AppSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-sidebar lg:flex">
      <div className="flex h-18 items-center px-5">
        <BrandMark />
      </div>

      <nav aria-label="Navegação principal" className="scrollbar-none flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group} className="flex flex-col gap-1">
            <span className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
              {group}
            </span>
            <ul className="flex flex-col gap-0.5">
              {navItems
                .filter((item) => item.group === group)
                .map((item) => {
                  const active = mounted && (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary',
                          active
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_1px_0_0_oklch(1_0_0/0.05)]'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                        )}
                      >
                        <Icon
                          className={cn(
                            'size-[18px] transition-colors',
                            active ? 'text-primary' : 'text-muted-foreground group-hover:text-sidebar-accent-foreground',
                          )}
                          aria-hidden="true"
                        />
                        {item.label}
                        {active ? <span className="ml-auto size-1.5 rounded-full bg-primary" aria-hidden="true" /> : null}
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-3">
        <Link
          href="/financas"
          className="flex items-center gap-3 rounded-xl bg-sidebar-accent/70 p-3 transition-colors hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-primary"
        >
          <ClubCrest club={club} size="sm" decorative />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">{club.shortName}</span>
            <span className="text-xs text-muted-foreground tabular">
              Caixa {formatMoney(finances.balance)}
            </span>
          </span>
        </Link>
      </div>
    </aside>
  )
}

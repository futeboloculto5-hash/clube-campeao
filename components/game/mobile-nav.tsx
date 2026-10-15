'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Ellipsis } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

export function MobileNav() {
  const pathname = usePathname()
  const primary = navItems.filter((item) => item.mobilePrimary)
  const secondary = navItems.filter((item) => !item.mobilePrimary)
  const secondaryActive = secondary.some((item) => isActive(pathname, item.href))

  const tabClass = (active: boolean) =>
    cn(
      'flex flex-1 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary',
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
    )

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 bg-sidebar/90 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-1px_0_0_var(--border)] backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch gap-1">
        {primary.map((item) => {
          const active = isActive(pathname, item.href)
          const Icon = item.icon
          return (
            <li key={item.href} className="flex flex-1">
              <Link href={item.href} aria-current={active ? 'page' : undefined} className={tabClass(active)}>
                <span className={cn('grid h-7 w-12 place-items-center rounded-full transition-colors', active && 'bg-primary/15')}>
                  <Icon className={cn('size-5', active && 'text-primary')} aria-hidden="true" />
                </span>
                {item.label}
              </Link>
            </li>
          )
        })}
        <li className="flex flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger className={tabClass(secondaryActive)} aria-label="Mais seções">
              <span className={cn('grid h-7 w-12 place-items-center rounded-full', secondaryActive && 'bg-primary/15')}>
                <Ellipsis className={cn('size-5', secondaryActive && 'text-primary')} aria-hidden="true" />
              </span>
              Mais
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" sideOffset={10} className="w-60 p-1.5">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Outras seções</DropdownMenuLabel>
                {secondary.map((item) => {
                  const Icon = item.icon
                  return (
                    <DropdownMenuItem
                      key={item.href}
                      render={<Link href={item.href} />}
                      className={cn('h-10 gap-3 px-2.5', isActive(pathname, item.href) && 'bg-accent')}
                    >
                      <Icon className="text-muted-foreground" aria-hidden="true" />
                      {item.label}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  )
}

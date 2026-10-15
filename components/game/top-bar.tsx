'use client'

import Link from 'next/link'
import { Bell, ChevronDown, CircleUserRound, FastForward, LogOut, Settings, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { club, news, president, season } from '@/lib/game-data'
import { demoAction } from '@/lib/demo'
import { ClubCrest } from './club-crest'
import { BrandMark } from './brand-mark'

export function TopBar() {
  const unread = news.slice(0, 3)

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 md:h-18 md:px-6 lg:px-8">
        <BrandMark compact className="lg:hidden" />

        <div className="flex min-w-0 items-center gap-3">
          <ClubCrest club={club} size="md" className="hidden sm:inline-grid" decorative />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-display text-base font-semibold leading-tight text-foreground md:text-lg">
              {club.name}
            </span>
            <span className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
              <Trophy className="size-3 shrink-0 text-primary" aria-hidden="true" />
              <span className="truncate">{season.competition}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{season.label}</span>
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 md:gap-2">
          <div className="mr-2 hidden flex-col items-end leading-tight xl:flex">
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Data no jogo</span>
            <span className="font-display text-sm font-semibold text-foreground tabular">{season.date}</span>
          </div>

          <Button
            onClick={() => demoAction('Avançar para o próximo dia')}
            className="hidden h-9 gap-2 rounded-lg px-4 font-semibold shadow-[0_8px_24px_-10px_var(--primary)] md:inline-flex"
          >
            Continuar
            <FastForward className="size-4" aria-hidden="true" />
          </Button>
          <Button
            size="icon"
            onClick={() => demoAction('Avançar para o próximo dia')}
            aria-label="Continuar para o próximo dia"
            className="size-9 rounded-lg md:hidden"
          >
            <FastForward className="size-4" aria-hidden="true" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={`Notificações, ${unread.length} novas`}
              className="relative grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary data-popup-open:bg-accent"
            >
              <Bell className="size-[18px]" aria-hidden="true" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-80 p-1.5">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Caixa de entrada</DropdownMenuLabel>
                {unread.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    render={<Link href="/noticias" />}
                    className="flex-col items-start gap-0.5 px-2.5 py-2"
                  >
                    <span className="text-[11px] text-primary">{item.category} · {item.time}</span>
                    <span className="line-clamp-2 text-sm text-foreground">{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-lg p-1 pr-2 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary data-popup-open:bg-accent">
              <span className="grid size-8 place-items-center rounded-full bg-surface-raised font-display text-xs font-bold text-foreground ring-1 ring-border">
                {president.initials}
              </span>
              <span className="hidden flex-col items-start leading-tight md:flex">
                <span className="text-sm font-medium text-foreground">{president.name}</span>
                <span className="text-[11px] text-muted-foreground">{president.role}</span>
              </span>
              <ChevronDown className="hidden size-4 text-muted-foreground md:block" aria-hidden="true" />
              <span className="sr-only">Abrir menu do presidente</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-60 p-1.5">
              <div className="flex flex-col gap-0.5 px-2.5 py-2">
                <span className="text-sm font-medium text-foreground">{president.name}</span>
                <span className="text-xs text-muted-foreground">
                  Reputação: {president.reputation} · Mandato: {president.mandateEndsIn}
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="h-9 gap-2.5 px-2.5" onClick={() => demoAction('Perfil do presidente')}>
                <CircleUserRound aria-hidden="true" />
                Perfil do presidente
              </DropdownMenuItem>
              <DropdownMenuItem className="h-9 gap-2.5 px-2.5" onClick={() => demoAction('Configurações do jogo')}>
                <Settings aria-hidden="true" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="h-9 gap-2.5 px-2.5" onClick={() => demoAction('Salvar e sair')}>
                <LogOut aria-hidden="true" />
                Salvar e sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

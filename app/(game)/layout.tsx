import { AppSidebar } from '@/components/game/app-sidebar'
import { MobileNav } from '@/components/game/mobile-nav'
import { TopBar } from '@/components/game/top-bar'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <div className="hidden shrink-0 bg-sidebar lg:block">
        <AppSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 pb-28 pt-2 md:px-6 lg:px-8 lg:pb-10">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}

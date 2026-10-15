import { ClubHero } from '@/components/game/dashboard/club-hero'
import { DebtOverview } from '@/components/game/dashboard/debt-overview'
import { FinanceOverview } from '@/components/game/dashboard/finance-overview'
import { LeagueTable } from '@/components/game/dashboard/league-table'
import { NewsFeed } from '@/components/game/dashboard/news-feed'
import { NextMatch } from '@/components/game/dashboard/next-match'
import { QuickActions } from '@/components/game/dashboard/quick-actions'
import { RecentResults } from '@/components/game/dashboard/recent-results'
import { PageHeading } from '@/components/game/page-heading'
import { president, season } from '@/lib/game-data'

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 md:gap-5">
      <PageHeading
        eyebrow={`Rodada ${season.round} de ${season.totalRounds} · ${season.date}`}
        title={`Bem-vindo de volta, presidente ${president.name.split(' ')[1]}`}
      />

      <div className="grid gap-4 md:gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ClubHero />
        </div>
        <div className="xl:col-span-4">
          <NextMatch />
        </div>
      </div>

      <QuickActions />

      <div className="grid gap-4 md:gap-5 xl:grid-cols-12">
        <FinanceOverview />
        <DebtOverview />
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-12">
        <LeagueTable />
        <RecentResults />
        <NewsFeed />
      </div>
    </div>
  )
}

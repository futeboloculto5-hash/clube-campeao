import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { listSponsors } from '@/app/actions/sponsorships'
import { SponsorshipCenter } from '@/components/game/sponsorship-center'

export const dynamic = 'force-dynamic'

export default async function PatrociniosPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const sponsors = await listSponsors()
  return <SponsorshipCenter sponsors={sponsors} careerSaveId={session?.user ? '' : undefined} />
}

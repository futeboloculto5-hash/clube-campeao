import { DataRegistry, type RegistryItem } from '@/components/game/data-registry'
import { db } from '@/lib/db'
import { canonicalClub, canonicalPlayer } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function CadastroPage() {
  let clubs: RegistryItem[] = []
  let players: RegistryItem[] = []

  try {
    const [clubRows, playerRows] = await Promise.all([
      db.select({ id: canonicalClub.id, name: canonicalClub.name, country: canonicalClub.country, status: canonicalClub.status }).from(canonicalClub).limit(100),
      db.select({ id: canonicalPlayer.id, name: canonicalPlayer.fullName, status: canonicalPlayer.status }).from(canonicalPlayer).limit(100),
    ])
    clubs = clubRows.map((item) => ({ ...item, href: `/cadastro/clubes/${item.id}` }))
    players = playerRows.map((item) => ({ ...item, href: `/cadastro/jogadores/${item.id}` }))
  } catch {
    // A base indisponível não deve transformar ausência de dados em dados fictícios.
  }

  return <DataRegistry clubs={clubs} players={players} />
}

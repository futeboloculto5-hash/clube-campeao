import { NextResponse } from 'next/server'
import { worldPlayers, worldClubs } from '@/lib/data/world-football'

export async function GET() {
  const clubById = new Map(worldClubs.map((club) => [club.id, club]))
  const players = worldPlayers.map((player) => {
    const club = clubById.get(player.clubId)
    return {
      id: player.id,
      name: player.name,
      age: player.age,
      position: player.pos,
      nationality: 'Não disponível',
      club: club?.name ?? 'Não disponível',
      clubId: player.clubId,
      league: club?.league ?? 'Não disponível',
      country: club?.country ?? 'Não disponível',
      value: player.value,
      salary: 'Simulação da carreira',
      contractEnd: 'Não disponível',
      status: 'disponível',
      dataStatus: 'referência de jogo — não é retorno da API',
    }
  })
  return NextResponse.json({ players, clubs: worldClubs.length, source: 'Catálogo interno de referência', verifiedAt: new Date().toISOString(), note: 'A API-Football é consultada separadamente por busca; este catálogo não é apresentado como dado oficial.' }, { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=900' } })
}

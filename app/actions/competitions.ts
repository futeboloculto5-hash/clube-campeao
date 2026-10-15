'use server'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { simulateMatch } from '@/lib/simulation'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Não autenticado')
  return session.user.id
}

export async function simulateCareerMatch(input: { matchId: string; homeClubId: string; awayClubId: string; homeRating?: number; awayRating?: number }) {
  const userId = await getUserId()
  if (!userId || input.homeClubId === input.awayClubId) throw new Error('Partida indisponível')
  const result = simulateMatch({ homeRating: input.homeRating, awayRating: input.awayRating, seed: input.matchId })
  return { ...result, status: 'simulado', dataStatus: 'simulação do jogo' }
}

export type SimulationInput = { homeRating?: number | null; awayRating?: number | null; seed: string }

function seeded(seed: string) {
  let value = 0
  for (const char of seed) value = (value * 31 + char.charCodeAt(0)) % 2147483647
  return () => ((value = (value * 48271) % 2147483647) / 2147483647)
}

export function simulateMatch({ homeRating, awayRating, seed }: SimulationInput) {
  const random = seeded(seed)
  const home = homeRating ?? 50
  const away = awayRating ?? 50
  const homeChance = Math.max(0.12, Math.min(0.78, 0.38 + (home - away) / 250 + 0.07))
  const awayChance = Math.max(0.12, Math.min(0.68, 0.28 + (away - home) / 250))
  const homeGoals = Math.min(8, Math.floor(random() * (1.25 + homeChance * 2.1)))
  const awayGoals = Math.min(8, Math.floor(random() * (1.1 + awayChance * 2.1)))
  return { homeGoals, awayGoals, isSimulation: true, method: 'rating_optional_home_advantage_v1' }
}

export function calculateTable(matches: Array<{ homeClubId: string; awayClubId: string; homeScore: number; awayScore: number }>, clubNames: Record<string, string>) {
  const rows = new Map<string, { clubId: string; clubName: string; played: number; wins: number; draws: number; losses: number; goalsFor: number; goalsAgainst: number; points: number }>()
  const get = (id: string) => rows.get(id) ?? { clubId: id, clubName: clubNames[id] ?? 'Clube não identificado', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
  for (const match of matches) {
    const home = get(match.homeClubId); const away = get(match.awayClubId)
    home.played++; away.played++; home.goalsFor += match.homeScore; home.goalsAgainst += match.awayScore; away.goalsFor += match.awayScore; away.goalsAgainst += match.homeScore
    if (match.homeScore > match.awayScore) { home.wins++; home.points += 3; away.losses++ } else if (match.homeScore < match.awayScore) { away.wins++; away.points += 3; home.losses++ } else { home.draws++; away.draws++; home.points++; away.points++ }
    rows.set(home.clubId, home); rows.set(away.clubId, away)
  }
  return [...rows.values()].sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) || b.goalsFor - a.goalsFor)
}

export function assertNoDuplicateMatch(keys: string[]) {
  return new Set(keys).size === keys.length
}

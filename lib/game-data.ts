// Todos os dados abaixo são FICTÍCIOS e servem apenas para demonstração visual.

export type ClubIdentity = {
  id: string
  name: string
  shortName: string
  initials: string
  primary: string
  secondary: string
}

export type MatchResult = 'V' | 'E' | 'D'

export const club: ClubIdentity & {
  founded: number
  stadium: string
  capacity: number
  city: string
} = {
  id: 'vale-celeste',
  name: 'S.E. Vale Celeste',
  shortName: 'Vale Celeste',
  initials: 'VC',
  primary: 'oklch(0.66 0.2 256)',
  secondary: 'oklch(0.97 0.006 250)',
  founded: 1924,
  stadium: 'Arena Horizonte',
  capacity: 42500,
  city: 'Porto Celeste',
}

export const season = {
  label: 'Temporada 2026/27',
  competition: 'Liga Nacional · Série A',
  round: 14,
  totalRounds: 38,
  date: '18 out 2026',
}

export const president = {
  name: 'Rafael Monteiro',
  role: 'Presidente',
  initials: 'RM',
  reputation: 'Respeitado',
  mandateEndsIn: '2 temporadas',
}

export const board = {
  objective: 'Terminar entre os 4 primeiros',
  confidence: 74,
  fanMood: 81,
}

const opponents: Record<string, ClubIdentity> = {
  serra: { id: 'serra', name: 'Real Serra Alta', shortName: 'Serra Alta', initials: 'RS', primary: 'oklch(0.62 0.17 25)', secondary: 'oklch(0.97 0 0)' },
  ferro: { id: 'ferro', name: 'União Ferroviária', shortName: 'Ferroviária', initials: 'UF', primary: 'oklch(0.55 0.02 260)', secondary: 'oklch(0.85 0.12 90)' },
  litoral: { id: 'litoral', name: 'E.C. Litoral Norte', shortName: 'Litoral Norte', initials: 'LN', primary: 'oklch(0.7 0.12 200)', secondary: 'oklch(0.2 0.03 260)' },
  planalto: { id: 'planalto', name: 'Grêmio Planalto', shortName: 'Planalto', initials: 'GP', primary: 'oklch(0.55 0.14 150)', secondary: 'oklch(0.97 0 0)' },
  aurora: { id: 'aurora', name: 'Atlético Aurora', shortName: 'Aurora', initials: 'AA', primary: 'oklch(0.75 0.15 70)', secondary: 'oklch(0.2 0.03 260)' },
  vulcan: { id: 'vulcan', name: 'Vulcano F.C.', shortName: 'Vulcano', initials: 'VF', primary: 'oklch(0.35 0.04 260)', secondary: 'oklch(0.7 0.18 40)' },
  bosque: { id: 'bosque', name: 'Bosque Verde S.C.', shortName: 'Bosque Verde', initials: 'BV', primary: 'oklch(0.45 0.1 150)', secondary: 'oklch(0.9 0.05 120)' },
  capital: { id: 'capital', name: 'Capital Esporte', shortName: 'Capital', initials: 'CE', primary: 'oklch(0.5 0.15 300)', secondary: 'oklch(0.97 0 0)' },
}

export const nextMatch = {
  home: club as ClubIdentity,
  away: opponents.serra,
  competition: 'Liga Nacional · Rodada 15',
  date: 'Sábado, 24 out',
  time: '16:00',
  venue: club.stadium,
  daysUntil: 6,
  expectedAttendance: 39800,
  opponentPosition: 2,
  opponentForm: ['V', 'V', 'E', 'V', 'D'] as MatchResult[],
  winProbability: { home: 41, draw: 27, away: 32 },
}

export const recentResults: {
  opponent: ClubIdentity
  venue: 'Casa' | 'Fora'
  score: [number, number]
  result: MatchResult
  competition: string
}[] = [
  { opponent: opponents.litoral, venue: 'Fora', score: [2, 1], result: 'V', competition: 'Liga · R14' },
  { opponent: opponents.planalto, venue: 'Casa', score: [3, 0], result: 'V', competition: 'Liga · R13' },
  { opponent: opponents.aurora, venue: 'Fora', score: [1, 1], result: 'E', competition: 'Liga · R12' },
  { opponent: opponents.capital, venue: 'Casa', score: [0, 2], result: 'D', competition: 'Copa · Oitavas' },
  { opponent: opponents.vulcan, venue: 'Casa', score: [2, 0], result: 'V', competition: 'Liga · R11' },
]

export type TableRow = {
  position: number
  team: ClubIdentity
  played: number
  goalDiff: number
  points: number
  movement: number
  isUser?: boolean
}

export const leagueTable: TableRow[] = [
  { position: 1, team: opponents.capital, played: 14, goalDiff: 17, points: 32, movement: 0 },
  { position: 2, team: opponents.serra, played: 14, goalDiff: 12, points: 29, movement: 1 },
  { position: 3, team: club, played: 14, goalDiff: 11, points: 27, movement: 2, isUser: true },
  { position: 4, team: opponents.aurora, played: 14, goalDiff: 6, points: 25, movement: -2 },
  { position: 5, team: opponents.ferro, played: 14, goalDiff: 4, points: 23, movement: -1 },
  { position: 6, team: opponents.litoral, played: 14, goalDiff: 1, points: 21, movement: 0 },
]

export const positionHistory = [
  { round: 'R1', position: 9 },
  { round: 'R2', position: 7 },
  { round: 'R3', position: 8 },
  { round: 'R4', position: 6 },
  { round: 'R5', position: 6 },
  { round: 'R6', position: 4 },
  { round: 'R7', position: 5 },
  { round: 'R8', position: 5 },
  { round: 'R9', position: 7 },
  { round: 'R10', position: 6 },
  { round: 'R11', position: 5 },
  { round: 'R12', position: 5 },
  { round: 'R13', position: 4 },
  { round: 'R14', position: 3 },
]

// Valores em milhões (moeda fictícia "CC$")
export const finances = {
  balance: 48.6,
  balanceChange: 6.2,
  monthlyRevenue: 21.4,
  monthlyExpenses: 17.9,
  wageBill: 11.2,
  wageBudget: 12.5,
  transferBudget: 18.0,
  history: [
    { month: 'Mai', receitas: 16.2, despesas: 17.1 },
    { month: 'Jun', receitas: 14.8, despesas: 16.4 },
    { month: 'Jul', receitas: 24.5, despesas: 22.9 },
    { month: 'Ago', receitas: 19.6, despesas: 18.2 },
    { month: 'Set', receitas: 20.3, despesas: 17.6 },
    { month: 'Out', receitas: 21.4, despesas: 17.9 },
  ],
  revenueMix: [
    { label: 'Direitos de TV', value: 38 },
    { label: 'Patrocínios', value: 24 },
    { label: 'Bilheteria', value: 21 },
    { label: 'Produtos', value: 17 },
  ],
}

export const debts = {
  total: 92.4,
  paid: 37.8,
  original: 130.2,
  nextInstallment: { amount: 3.1, dueIn: '12 dias', creditor: 'Banco Meridiano (fictício)' },
  items: [
    { label: 'Financiamento do estádio', amount: 58.0, rate: '4,2% a.a.' },
    { label: 'Empréstimo bancário', amount: 22.6, rate: '7,8% a.a.' },
    { label: 'Parcelas de transferências', amount: 11.8, rate: 'Sem juros' },
  ],
}

export type NewsItem = {
  id: string
  category: 'Elenco' | 'Diretoria' | 'Mercado' | 'Torcida' | 'Partida'
  title: string
  summary: string
  time: string
  important?: boolean
}

export const news: NewsItem[] = [
  {
    id: 'n1',
    category: 'Partida',
    title: 'Virada no litoral coloca o Vale Celeste no G4',
    summary: 'Dois gols no segundo tempo garantiram a terceira vitória nos últimos quatro jogos.',
    time: 'Há 2 h',
    important: true,
  },
  {
    id: 'n2',
    category: 'Mercado',
    title: 'Clube estrangeiro sonda o meia Davi Arantes',
    summary: 'Proposta preliminar de CC$ 14 mi deve chegar até o fim da semana.',
    time: 'Há 5 h',
  },
  {
    id: 'n3',
    category: 'Elenco',
    title: 'Zagueiro Tomás Reis volta aos treinos',
    summary: 'Departamento médico libera o capitão após três semanas de recuperação.',
    time: 'Ontem',
  },
  {
    id: 'n4',
    category: 'Diretoria',
    title: 'Conselho aprova renegociação da dívida bancária',
    summary: 'Novo acordo reduz os juros anuais e alivia o fluxo de caixa no segundo turno.',
    time: '2 dias',
  },
]

export const formatMoney = (millions: number) =>
  `CC$ ${millions.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mi`

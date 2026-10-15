export type VerificationStatus = 'confirmed' | 'published_estimate' | 'outdated' | 'unavailable'

export type VerifiedClub = {
  name: string
  country: string
  federation: string
  season: string
  status: VerificationStatus
  source: {
    name: string
    url: string
    consultedAt: string
    referenceDate: string
    methodology: string
  }
}

const cbfSource = {
  name: 'Confederação Brasileira de Futebol (CBF)',
  url: 'https://www.cbf.com.br/futebol-brasileiro/times/campeonato-brasileiro/serie-a/2026',
  consultedAt: '2026-10-15',
  referenceDate: '2026-01-01',
  methodology: 'Lista de clubes indicada na página oficial da competição; requer revisão manual antes de qualquer importação de atletas.',
}

export const verifiedSerieA2026Clubs: VerifiedClub[] = [
  'Athletico Paranaense', 'Atlético Mineiro', 'Bahia', 'Botafogo', 'Chapecoense', 'Corinthians',
  'Coritiba SAF', 'Cruzeiro', 'Flamengo', 'Fluminense', 'Grêmio', 'Internacional', 'Mirassol',
  'Palmeiras', 'Red Bull Bragantino', 'Remo', 'Santos FC', 'São Paulo', 'Vasco da Gama SAF', 'Vitória',
].map((name) => ({ name, country: 'Brasil', federation: 'CBF', season: '2026', status: 'confirmed', source: cbfSource }))

export const unavailablePlayerFields = [
  'Nome do atleta', 'Posição', 'Nacionalidade', 'Data de nascimento', 'Vínculo',
] as const

export const catalogNotes = {
  imported: '20 clubes da Série A 2026, conforme a fonte oficial consultada.',
  pending: 'Atletas, posições, nacionalidades, datas de nascimento, vínculos, treinadores e comissões técnicas ainda não foram importados: a confirmação individual exige consulta e revisão da fonte oficial por clube/competição.',
  policy: 'Nenhum valor ausente é preenchido por inferência. Dados de terceiros não são tratados como oficiais.',
}

export function filterVerifiedClubs(query: string) {
  const normalized = query.trim().toLocaleLowerCase('pt-BR')
  if (!normalized) return verifiedSerieA2026Clubs
  return verifiedSerieA2026Clubs.filter((club) => club.name.toLocaleLowerCase('pt-BR').includes(normalized))
}

export function getVerifiedClub(name: string) {
  return verifiedSerieA2026Clubs.find((club) => club.name === name)
}

export function getOfficialSourceUrl() {
  return cbfSource.url
}

export type VerifiedPlayerRecord = {
  fullName: string | null
  position: string | null
  nationality: string | null
  birthDate: string | null
  registration: string | null
  status: 'unavailable'
  note: string
}

export function getUnavailablePlayerRecord(): VerifiedPlayerRecord {
  return { fullName: null, position: null, nationality: null, birthDate: null, registration: null, status: 'unavailable', note: 'Não importado: aguardando confirmação individual em fonte oficial.' }
}

export const sourceUsageNotice = 'A CBF é a entidade responsável pela competição. O projeto registra URL, entidade, período consultado e metodologia; não copia conteúdo protegido além dos dados mínimos necessários.'

export const officialDataSources = [
  { name: 'CBF — clubes Série A 2026', url: cbfSource.url, entity: 'CBF', access: 'Consulta manual; sem raspagem automática autorizada.' },
  { name: 'CBF — atletas Série A 2026', url: 'https://www.cbf.com.br/futebol-brasileiro/atletas/campeonato-brasileiro/serie-a/2026', entity: 'CBF', access: 'Pendente de revisão manual e confirmação de termos.' },
]

export const clubCatalogLastReviewed = '15 de outubro de 2026'

export const clubCatalogStatusLabel: Record<VerificationStatus, string> = {
  confirmed: 'Confirmado pela fonte',
  published_estimate: 'Estimativa publicada',
  outdated: 'Desatualizado',
  unavailable: 'Indisponível',
}

export const clubCatalogStatusDescription: Record<VerificationStatus, string> = {
  confirmed: 'Registro encontrado na fonte oficial consultada para a temporada indicada.',
  published_estimate: 'Número publicado por fonte identificada, mas não é dado oficial.',
  outdated: 'Registro existe, mas sua data de referência não representa a temporada atual.',
  unavailable: 'Não foi possível confirmar este campo; ele permanece vazio.',
}

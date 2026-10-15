import { pgTable, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const careers = pgTable('careers', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  clubId: text('clubId').notNull(),
  clubName: text('clubName').notNull(),
  season: text('season').notNull(),
  currentDate: timestamp('currentDate').notNull(),
  balance: integer('balance').notNull().default(0),
  transferBudget: integer('transferBudget').notNull().default(0),
  data: jsonb('data'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export type Career = typeof careers.$inferSelect
export type NewCareer = typeof careers.$inferInsert

export const clubs = [
  { id: 'flamengo', name: 'Flamengo', short: 'FLA', city: 'Rio de Janeiro', league: 'Série A', rating: 84, stadium: 'Maracanã', capacity: 78838, color: '#d51f2e' },
  { id: 'palmeiras', name: 'Palmeiras', short: 'PAL', city: 'São Paulo', league: 'Série A', rating: 86, stadium: 'Allianz Parque', capacity: 43713, color: '#16864a' },
  { id: 'corinthians', name: 'Corinthians', short: 'COR', city: 'São Paulo', league: 'Série A', rating: 78, stadium: 'Neo Química Arena', capacity: 49205, color: '#eeeeee' },
  { id: 'gremio', name: 'Grêmio', short: 'GRE', city: 'Porto Alegre', league: 'Série A', rating: 77, stadium: 'Arena do Grêmio', capacity: 55662, color: '#45a6d8' },
  { id: 'bahia', name: 'Bahia', short: 'BAH', city: 'Salvador', league: 'Série A', rating: 75, stadium: 'Arena Fonte Nova', capacity: 47907, color: '#2d79c7' },
  { id: 'santos', name: 'Santos', short: 'SAN', city: 'Santos', league: 'Série A', rating: 74, stadium: 'Vila Belmiro', capacity: 20120, color: '#f3f3f3' },
  { id: 'fortaleza', name: 'Fortaleza', short: 'FOR', city: 'Fortaleza', league: 'Série A', rating: 76, stadium: 'Castelão', capacity: 63903, color: '#df2939' },
  { id: 'atletico-mg', name: 'Atlético-MG', short: 'CAM', city: 'Belo Horizonte', league: 'Série A', rating: 81, stadium: 'Arena MRV', capacity: 46000, color: '#333333' },
] as const

export const seedPlayers = [
  ['Rossi', 'GOL', 82],
  ['Wesley', 'LD', 78],
  ['Léo Pereira', 'ZAG', 81],
  ['Gerson', 'MC', 84],
  ['Arrascaeta', 'MEI', 87],
  ['Pedro', 'ATA', 86],
  ['Everton', 'PE', 80],
  ['João Gomes', 'MC', 79],
] as const

export const navItems = [
  'Visão geral',
  'Elenco',
  'Tática e escalação',
  'Calendário',
  'Competições',
  'Mercado de transferências',
  'Contratos',
  'Finanças',
  'Dívidas',
  'Patrocínios',
  'Diretoria',
  'Comissão técnica',
  'Estádio e infraestrutura',
  'Torcida',
  'Notícias',
  'Estatísticas',
  'Histórico e conquistas',
  'Configurações',
]

export const dbSchemaReady = true

export const schema = { user, session, account, verification, careers }
export default schema

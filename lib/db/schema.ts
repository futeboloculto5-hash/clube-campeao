import { boolean, date, numeric, pgTable, text, timestamp, uuid, unique } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull(),
})

export const careerSave = pgTable('career_save', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  clubName: text('club_name').notNull(),
  clubShortName: text('club_short_name').notNull(),
  season: text('season').notNull(),
  competition: text('competition').notNull(),
  dataStatus: text('data_status').notNull().default('demo'),
  dataSource: text('data_source').notNull().default('user-created'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [unique('career_save_user_unique').on(table.userId)])

export const dataSource = pgTable('data_source', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  entityType: text('entity_type').notNull(),
  url: text('url').notNull(),
  responsibleEntity: text('responsible_entity').notNull(),
  methodology: text('methodology'),
  termsUrl: text('terms_url'),
  accessMethod: text('access_method').notNull().default('manual_review'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [unique('data_source_entity_url_unique').on(table.entityType, table.url)])

export const canonicalClub = pgTable('canonical_club', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  country: text('country').notNull(),
  federation: text('federation'),
  canonicalKey: text('canonical_key').notNull().unique(),
  status: text('status').notNull().default('unverified'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const canonicalPlayer = pgTable('canonical_player', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  birthDate: date('birth_date'),
  nationality: text('nationality'),
  canonicalKey: text('canonical_key').notNull().unique(),
  status: text('status').notNull().default('unverified'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const dataRecord = pgTable('data_record', {
  id: uuid('id').defaultRandom().primaryKey(),
  entityType: text('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  fieldName: text('field_name').notNull(),
  valueText: text('value_text'),
  valueNumeric: numeric('value_numeric'),
  valueDate: date('value_date'),
  status: text('status').notNull().default('unavailable'),
  sourceId: uuid('source_id').references(() => dataSource.id),
  sourcePublishedAt: timestamp('source_published_at', { withTimezone: true }),
  consultedAt: timestamp('consulted_at', { withTimezone: true }).notNull().defaultNow(),
  referenceDate: date('reference_date'),
  season: text('season'),
  methodologyNote: text('methodology_note'),
  supersedesId: uuid('supersedes_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [unique('data_record_version_unique').on(table.entityType, table.entityId, table.fieldName, table.consultedAt)])

export const importBatch = pgTable('import_batch', {
  id: uuid('id').defaultRandom().primaryKey(),
  sourceId: uuid('source_id').notNull().references(() => dataSource.id),
  entityType: text('entity_type').notNull(),
  status: text('status').notNull().default('pending_review'),
  importedAt: timestamp('imported_at', { withTimezone: true }).notNull().defaultNow(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: uuid('reviewed_by'),
  notes: text('notes'),
})

export const session = pgTable('session', {
  id: uuid('id').primaryKey(), expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(), token: text('token').notNull().unique(), createdAt: timestamp('createdAt', { withTimezone: true }).notNull(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull(), ipAddress: text('ipAddress'), userAgent: text('userAgent'), userId: uuid('userId').notNull(),
})
export const account = pgTable('account', {
  id: uuid('id').primaryKey(), accountId: text('accountId').notNull(), providerId: text('providerId').notNull(), userId: uuid('userId').notNull(), password: text('password'), accessToken: text('accessToken'), refreshToken: text('refreshToken'), idToken: text('idToken'), accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { withTimezone: true }), refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { withTimezone: true }), scope: text('scope'), createdAt: timestamp('createdAt', { withTimezone: true }).notNull(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull(),
})
export const verification = pgTable('verification', {
  id: uuid('id').primaryKey(), identifier: text('identifier').notNull(), value: text('value').notNull(), expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(), createdAt: timestamp('createdAt', { withTimezone: true }).notNull(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull(),
})

export const competition = pgTable('competition', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  season: text('season').notNull(),
  format: text('format').notNull(),
  pointsForWin: numeric('points_for_win').notNull().default('3'),
  pointsForDraw: numeric('points_for_draw').notNull().default('1'),
  pointsForLoss: numeric('points_for_loss').notNull().default('0'),
  tiebreakers: text('tiebreakers').notNull().default('points,goal_difference,goals_for,wins'),
  dataStatus: text('data_status').notNull().default('unavailable'),
  sourceId: uuid('source_id').references(() => dataSource.id),
  referenceDate: date('reference_date'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [unique('competition_name_season_unique').on(table.name, table.season)])

export const competitionTeam = pgTable('competition_team', {
  id: uuid('id').defaultRandom().primaryKey(),
  competitionId: uuid('competition_id').notNull().references(() => competition.id),
  clubId: uuid('club_id').notNull().references(() => canonicalClub.id),
  groupName: text('group_name'),
  seed: numeric('seed'),
  simulationRating: numeric('simulation_rating'),
  dataStatus: text('data_status').notNull().default('unavailable'),
  sourceId: uuid('source_id').references(() => dataSource.id),
}, (table) => [unique('competition_team_unique').on(table.competitionId, table.clubId)])

export const competitionMatch = pgTable('competition_match', {
  id: uuid('id').defaultRandom().primaryKey(),
  competitionId: uuid('competition_id').notNull().references(() => competition.id),
  round: numeric('round').notNull(),
  phase: text('phase').notNull().default('league'),
  homeClubId: uuid('home_club_id').notNull().references(() => canonicalClub.id),
  awayClubId: uuid('away_club_id').notNull().references(() => canonicalClub.id),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
  status: text('status').notNull().default('scheduled'),
  homeScore: numeric('home_score'),
  awayScore: numeric('away_score'),
  isSimulation: boolean('is_simulation').notNull().default(false),
  simulatedAt: timestamp('simulated_at', { withTimezone: true }),
}, (table) => [unique('competition_match_unique').on(table.competitionId, table.round, table.homeClubId, table.awayClubId)])

export const competitionStanding = pgTable('competition_standing', {
  id: uuid('id').defaultRandom().primaryKey(),
  competitionId: uuid('competition_id').notNull().references(() => competition.id),
  clubId: uuid('club_id').notNull().references(() => canonicalClub.id),
  played: numeric('played').notNull().default('0'),
  wins: numeric('wins').notNull().default('0'),
  draws: numeric('draws').notNull().default('0'),
  losses: numeric('losses').notNull().default('0'),
  goalsFor: numeric('goals_for').notNull().default('0'),
  goalsAgainst: numeric('goals_against').notNull().default('0'),
  points: numeric('points').notNull().default('0'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [unique('competition_standing_unique').on(table.competitionId, table.clubId)])

export const transferMarketPlayer = pgTable('transfer_market_player', {
  id: uuid('id').defaultRandom().primaryKey(),
  canonicalPlayerId: uuid('canonical_player_id').notNull().references(() => canonicalPlayer.id),
  currentClubId: uuid('current_club_id').references(() => canonicalClub.id),
  availability: text('availability').notNull().default('indisponivel'),
  contractStatus: text('contract_status').notNull().default('indisponivel'),
  sourceId: uuid('source_id').references(() => dataSource.id),
  referenceDate: date('reference_date'),
  season: text('season'),
  dataStatus: text('data_status').notNull().default('unavailable'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [unique('transfer_market_player_season_unique').on(table.canonicalPlayerId, table.season)])

export const transferProposal = pgTable('transfer_proposal', {
  id: uuid('id').defaultRandom().primaryKey(),
  careerSaveId: uuid('career_save_id').notNull().references(() => careerSave.id),
  marketPlayerId: uuid('market_player_id').references(() => transferMarketPlayer.id),
  playerId: uuid('player_id').notNull().references(() => canonicalPlayer.id),
  originClubId: uuid('origin_club_id').references(() => canonicalClub.id),
  destinationClubId: uuid('destination_club_id').references(() => canonicalClub.id),
  proposalType: text('proposal_type').notNull(),
  status: text('status').notNull().default('draft'),
  feeAmount: numeric('fee_amount'),
  feeDisclosed: boolean('fee_disclosed').notNull().default(false),
  wageAmount: numeric('wage_amount'),
  wageDisclosed: boolean('wage_disclosed').notNull().default(false),
  contractYears: numeric('contract_years'),
  loanEndDate: date('loan_end_date'),
  userNote: text('user_note'),
  isSimulation: boolean('is_simulation').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const financialFact = pgTable('financial_fact', {
  id: uuid('id').defaultRandom().primaryKey(),
  clubId: uuid('club_id').references(() => canonicalClub.id),
  metric: text('metric').notNull(),
  amount: numeric('amount'),
  currency: text('currency').notNull().default('BRL'),
  fiscalYear: text('fiscal_year').notNull(),
  referenceDate: date('reference_date'),
  methodology: text('methodology'),
  perimeter: text('perimeter'),
  status: text('status').notNull().default('unavailable'),
  sourceId: uuid('source_id').references(() => dataSource.id),
  sourcePublishedAt: timestamp('source_published_at', { withTimezone: true }),
  consultedAt: timestamp('consulted_at', { withTimezone: true }).notNull().defaultNow(),
  supersedesId: uuid('supersedes_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const careerFinancialEntry = pgTable('career_financial_entry', {
  id: uuid('id').defaultRandom().primaryKey(),
  careerSaveId: uuid('career_save_id').notNull().references(() => careerSave.id),
  entryType: text('entry_type').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  amount: numeric('amount').notNull(),
  currency: text('currency').notNull().default('CC$'),
  occurredOn: date('occurred_on').notNull(),
  dueOn: date('due_on'),
  status: text('status').notNull().default('posted'),
  relatedTransferProposalId: uuid('related_transfer_proposal_id').references(() => transferProposal.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const schema = { user, session, account, verification, careerSave, dataSource, canonicalClub, canonicalPlayer, dataRecord, importBatch, competition, competitionTeam, competitionMatch, competitionStanding, transferMarketPlayer, transferProposal, financialFact, careerFinancialEntry }
export type CareerSave = typeof careerSave.$inferSelect
export type DataSource = typeof dataSource.$inferSelect
export type DataRecord = typeof dataRecord.$inferSelect
export type ImportBatch = typeof importBatch.$inferSelect
export type NewCareerSave = typeof careerSave.$inferInsert
export type NewDataRecord = typeof dataRecord.$inferInsert
export type NewImportBatch = typeof importBatch.$inferInsert


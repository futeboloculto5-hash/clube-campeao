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

export const schema = { user, session, account, verification, careerSave, dataSource, canonicalClub, canonicalPlayer, dataRecord, importBatch }
export type CareerSave = typeof careerSave.$inferSelect
export type DataSource = typeof dataSource.$inferSelect
export type DataRecord = typeof dataRecord.$inferSelect
export type ImportBatch = typeof importBatch.$inferSelect
export type NewCareerSave = typeof careerSave.$inferInsert
export type NewDataRecord = typeof dataRecord.$inferInsert
export type NewImportBatch = typeof importBatch.$inferInsert


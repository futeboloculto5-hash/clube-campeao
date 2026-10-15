import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool, { schema })

export { schema }

// A carreira sempre é consultada com o userId da sessão no servidor.
export async function closeDatabase() {
  await pool.end()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = typeof db

export const _schemaReference = schema as any

export const databaseReady = Boolean(process.env.DATABASE_URL)

export const poolConfig = {
  max: 10,
  idleTimeoutMillis: 30000,
}

export const dbHealth = async () => {
  await pool.query('select 1')
  return true
}

export const configuredDatabaseUrl = process.env.DATABASE_URL ? 'configured' : 'missing'

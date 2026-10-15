'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { careers } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type CareerState = {
  version: 1
  clubId: string
  clubName: string
  season: string
  currentDate: string
  balance: number
  transferBudget: number
  roster: unknown[]
  events: unknown[]
  results: unknown[]
  standings: unknown[]
}

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) throw new Error('Unauthorized')
  return session.user.id
}

function normalizeState(input: Partial<CareerState>, fallback: CareerState): CareerState {
  return {
    version: 1,
    clubId: input.clubId ?? fallback.clubId,
    clubName: input.clubName ?? fallback.clubName,
    season: input.season ?? fallback.season,
    currentDate: input.currentDate ?? fallback.currentDate,
    balance: Number.isFinite(input.balance) ? Number(input.balance) : fallback.balance,
    transferBudget: Number.isFinite(input.transferBudget) ? Number(input.transferBudget) : fallback.transferBudget,
    roster: Array.isArray(input.roster) ? input.roster : fallback.roster,
    events: Array.isArray(input.events) ? input.events : fallback.events,
    results: Array.isArray(input.results) ? input.results : fallback.results,
    standings: Array.isArray(input.standings) ? input.standings : fallback.standings,
  }
}

export async function listCareers() {
  const userId = await getUserId()
  return db.select().from(careers).where(eq(careers.userId, userId)).orderBy(desc(careers.updatedAt))
}

export async function getCareer(id: string) {
  const userId = await getUserId()
  const [career] = await db.select().from(careers).where(and(eq(careers.id, id), eq(careers.userId, userId))).limit(1)
  return career ?? null
}

export async function createCareer(input: { clubId: string; clubName: string; season?: string; balance?: number; transferBudget?: number; data?: Partial<CareerState> }) {
  const userId = await getUserId()
  const now = new Date()
  const fallback: CareerState = {
    version: 1,
    clubId: input.clubId,
    clubName: input.clubName,
    season: input.season ?? '2025',
    currentDate: now.toISOString(),
    balance: input.balance ?? 42800000,
    transferBudget: input.transferBudget ?? 12000000,
    roster: [],
    events: [],
    results: [],
    standings: [],
  }
  const state = normalizeState(input.data ?? {}, fallback)
  const id = crypto.randomUUID()
  const [career] = await db.insert(careers).values({ id, userId, clubId: state.clubId, clubName: state.clubName, season: state.season, currentDate: new Date(state.currentDate), balance: state.balance, transferBudget: state.transferBudget, data: state }).returning()
  revalidatePath('/')
  return career
}

export async function saveCareer(id: string, input: Partial<CareerState>) {
  const userId = await getUserId()
  const [current] = await db.select().from(careers).where(and(eq(careers.id, id), eq(careers.userId, userId))).limit(1)
  if (!current) throw new Error('Career not found')
  const fallback = normalizeState((current.data ?? {}) as Partial<CareerState>, { version: 1, clubId: current.clubId, clubName: current.clubName, season: current.season, currentDate: current.currentDate.toISOString(), balance: current.balance, transferBudget: current.transferBudget, roster: [], events: [], results: [], standings: [] })
  const state = normalizeState(input, fallback)
  const [career] = await db.update(careers).set({ clubId: state.clubId, clubName: state.clubName, season: state.season, currentDate: new Date(state.currentDate), balance: state.balance, transferBudget: state.transferBudget, data: state, updatedAt: new Date() }).where(and(eq(careers.id, id), eq(careers.userId, userId))).returning()
  revalidatePath('/')
  return career
}

export async function advanceCareerDay(id: string) {
  const career = await getCareer(id)
  if (!career) throw new Error('Career not found')
  const current = normalizeState((career.data ?? {}) as Partial<CareerState>, { version: 1, clubId: career.clubId, clubName: career.clubName, season: career.season, currentDate: career.currentDate.toISOString(), balance: career.balance, transferBudget: career.transferBudget, roster: [], events: [], results: [], standings: [] })
  const nextDate = new Date(current.currentDate)
  nextDate.setUTCDate(nextDate.getUTCDate() + 1)
  return saveCareer(id, { currentDate: nextDate.toISOString(), events: [...current.events, { type: 'day_advanced', date: nextDate.toISOString() }] })
}

export async function deleteCareer(id: string) {
  const userId = await getUserId()
  await db.delete(careers).where(and(eq(careers.id, id), eq(careers.userId, userId)))
  revalidatePath('/')
}

export const careerActions = { listCareers, getCareer, createCareer, saveCareer, advanceCareerDay, deleteCareer }

export default careerActions


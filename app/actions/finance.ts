'use server'

import { and, desc, eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { careerFinancialEntry, careerSave } from '@/lib/db/schema'

async function getCareer() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Não autenticado')
  const [career] = await db.select({ id: careerSave.id }).from(careerSave).where(eq(careerSave.userId, session.user.id)).limit(1)
  if (!career) throw new Error('Crie uma carreira antes de lançar movimentos')
  return career
}

export async function listCareerFinances() {
  const career = await getCareer()
  const entries = await db.select().from(careerFinancialEntry).where(eq(careerFinancialEntry.careerSaveId, career.id)).orderBy(desc(careerFinancialEntry.occurredOn), desc(careerFinancialEntry.createdAt))
  const [summary] = await db.select({ revenue: sql<string>`coalesce(sum(case when ${careerFinancialEntry.entryType} = 'receita' then ${careerFinancialEntry.amount} else 0 end), 0)`, expenses: sql<string>`coalesce(sum(case when ${careerFinancialEntry.entryType} = 'despesa' then ${careerFinancialEntry.amount} else 0 end), 0)` }).from(careerFinancialEntry).where(and(eq(careerFinancialEntry.careerSaveId, career.id), eq(careerFinancialEntry.status, 'posted')))
  return { entries, revenue: Number(summary?.revenue ?? 0), expenses: Number(summary?.expenses ?? 0) }
}

export async function createCareerFinancialEntry(input: { entryType: 'receita' | 'despesa'; category: string; description: string; amount: number; occurredOn: string; dueOn?: string }) {
  const career = await getCareer()
  if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error('O valor deve ser maior que zero')
  if (!input.description.trim() || !input.category.trim()) throw new Error('Preencha a descrição e a categoria')
  return db.insert(careerFinancialEntry).values({ careerSaveId: career.id, entryType: input.entryType, category: input.category.trim(), description: input.description.trim(), amount: input.amount.toFixed(2), occurredOn: input.occurredOn, dueOn: input.dueOn || null, status: 'posted' }).returning()
}

export type CareerFinances = Awaited<ReturnType<typeof listCareerFinances>>

export async function createCareerFinanceEntry(input: Parameters<typeof createCareerFinancialEntry>[0]) {
  return createCareerFinancialEntry(input)
}

export async function getCareerFinanceSummary() {
  const result = await listCareerFinances()
  return { revenue: result.revenue, expenses: result.expenses, balance: result.revenue - result.expenses }
}

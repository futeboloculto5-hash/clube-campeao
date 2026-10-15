'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { careerFinancialEntry, careerSave } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getCareer() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Não autenticado')
  const save = await db.select({ id: careerSave.id }).from(careerSave).where(eq(careerSave.userId, session.user.id)).limit(1)
  if (!save[0]) throw new Error('Crie uma carreira antes de registrar lançamentos')
  return save[0].id
}

export async function getCareerFinance() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Não autenticado')
  const [save] = await db.select({ id: careerSave.id }).from(careerSave).where(eq(careerSave.userId, session.user.id)).limit(1)
  if (!save) return []
  return db.select().from(careerFinancialEntry).where(eq(careerFinancialEntry.careerSaveId, save.id)).orderBy(desc(careerFinancialEntry.occurredOn), desc(careerFinancialEntry.createdAt))
}

export async function createCareerFinancialEntry(input: {
  entryType: 'income' | 'expense'
  category: string
  description: string
  amount: number
  occurredOn: string
  dueOn?: string
}) {
  const careerSaveId = await getCareer()
  const amount = Number(input.amount)
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('Informe um valor positivo')
  if (!input.category.trim() || !input.description.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(input.occurredOn)) throw new Error('Preencha os campos obrigatórios')
  await db.insert(careerFinancialEntry).values({
    careerSaveId,
    entryType: input.entryType,
    category: input.category.trim(),
    description: input.description.trim(),
    amount: amount.toFixed(2),
    occurredOn: input.occurredOn,
    dueOn: input.dueOn || null,
    status: 'posted',
  })
  revalidatePath('/financas')
  return { ok: true }
}

export async function deleteCareerFinancialEntry(id: string) {
  const careerSaveId = await getCareer()
  await db.delete(careerFinancialEntry).where(and(eq(careerFinancialEntry.id, id), eq(careerFinancialEntry.careerSaveId, careerSaveId)))
  revalidatePath('/financas')
  return { ok: true, careerSaveId }
}

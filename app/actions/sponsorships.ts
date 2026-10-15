'use server'

import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { careerFinancialEntry, careerSave, sponsorCatalog, sponsorshipContract, sponsorshipPayment } from '@/lib/db/schema'

async function getCareerForUser(careerSaveId: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Sessão necessária')
  const [career] = await db.select({ id: careerSave.id }).from(careerSave).where(and(eq(careerSave.id, careerSaveId), eq(careerSave.userId, session.user.id))).limit(1)
  if (!career) throw new Error('Carreira não encontrada')
  return career.id
}

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Sessão necessária')
  return session.user.id
}

export async function listSponsors(query = '', sector = 'todos') {
  const rows = await db.select().from(sponsorCatalog).orderBy(sponsorCatalog.name).limit(100)
  const normalized = query.trim().toLowerCase()
  return rows.filter((row) => (!normalized || `${row.name} ${row.sector}`.toLowerCase().includes(normalized)) && (sector === 'todos' || row.sector === sector))
}

export async function listSponsorshipContracts(careerSaveId: string) {
  await getCareerForUser(careerSaveId)
  return db.select({ contract: sponsorshipContract, sponsor: sponsorCatalog }).from(sponsorshipContract).innerJoin(sponsorCatalog, eq(sponsorCatalog.id, sponsorshipContract.sponsorId)).where(eq(sponsorshipContract.careerSaveId, careerSaveId)).orderBy(desc(sponsorshipContract.createdAt))
}

export async function createSponsorshipContract(input: { careerSaveId: string; sponsorId: string; contractType: string; feeAmount: number; durationMonths: number; startsOn: string }) {
  await getCareerForUser(input.careerSaveId)
  if (!input.contractType.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(input.startsOn)) throw new Error('Informe tipo e data válidos.')
  if (!Number.isFinite(input.feeAmount) || input.feeAmount <= 0 || !Number.isInteger(input.durationMonths) || input.durationMonths <= 0 || input.durationMonths > 120) throw new Error('Informe valor e duração válidos.')
  const [sponsor] = await db.select({ id: sponsorCatalog.id }).from(sponsorCatalog).where(eq(sponsorCatalog.id, input.sponsorId)).limit(1)
  if (!sponsor) throw new Error('Empresa não encontrada no catálogo verificado.')
  const contract = await db.transaction(async (tx) => {
    const [created] = await tx.insert(sponsorshipContract).values({ careerSaveId: input.careerSaveId, sponsorId: input.sponsorId, contractType: input.contractType.trim(), isSimulation: true, status: 'active', feeAmount: String(input.feeAmount), durationMonths: String(input.durationMonths), startsOn: input.startsOn }).returning()
    const monthlyAmount = input.feeAmount / input.durationMonths
    const entries = Array.from({ length: input.durationMonths }, (_, index) => {
      const date = new Date(`${input.startsOn}T12:00:00Z`)
      date.setUTCMonth(date.getUTCMonth() + index)
      const dueOn = date.toISOString().slice(0, 10)
      return { careerSaveId: input.careerSaveId, entryType: 'income' as const, category: 'patrocínio', description: `Parcela simulada de patrocínio · ${created.id}`, amount: monthlyAmount.toFixed(2), currency: 'CC$', occurredOn: dueOn, dueOn, status: 'scheduled' }
    })
    const insertedEntries = await tx.insert(careerFinancialEntry).values(entries).returning({ id: careerFinancialEntry.id, amount: careerFinancialEntry.amount, dueOn: careerFinancialEntry.dueOn })
    await tx.insert(sponsorshipPayment).values(insertedEntries.map((entry) => ({ contractId: created.id, financialEntryId: entry.id, amount: entry.amount, dueOn: entry.dueOn! })))
    return created
  })
  revalidatePath('/patrocinios')
  revalidatePath('/financas')
  return contract
}

export async function updateSponsorshipStatus(id: string, careerSaveId: string, status: 'active' | 'rejected' | 'ended' | 'renewal') {
  await getUserId()
  const [updated] = await db.update(sponsorshipContract).set({ status, updatedAt: new Date() }).where(and(eq(sponsorshipContract.id, id), eq(sponsorshipContract.careerSaveId, careerSaveId))).returning()
  if (!updated) throw new Error('Contrato não encontrado.')
  revalidatePath('/patrocinios')
  return updated
}

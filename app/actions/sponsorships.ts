'use server'

import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { careerFinancialEntry, sponsorCatalog, sponsorshipContract } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Sessão necessária')
  return session.user.id
}

export async function listSponsors(query = '', sector = 'todos') {
  const rows = await db.select().from(sponsorCatalog).orderBy(sponsorCatalog.name)
  const normalized = query.trim().toLowerCase()
  return rows.filter((row) => (!normalized || `${row.name} ${row.sector}`.toLowerCase().includes(normalized)) && (sector === 'todos' || row.sector === sector))
}

export async function listSponsorshipContracts(careerSaveId: string) {
  const userId = await getUserId()
  return db.select({ contract: sponsorshipContract, sponsor: sponsorCatalog }).from(sponsorshipContract).innerJoin(sponsorCatalog, eq(sponsorCatalog.id, sponsorshipContract.sponsorId)).where(eq(sponsorshipContract.careerSaveId, careerSaveId)).orderBy(desc(sponsorshipContract.createdAt))
}

export async function createSponsorshipContract(input: { careerSaveId: string; sponsorId: string; contractType: string; feeAmount: number; durationMonths: number; startsOn: string }) {
  await getUserId()
  if (!Number.isFinite(input.feeAmount) || input.feeAmount <= 0 || !Number.isInteger(input.durationMonths) || input.durationMonths <= 0 || input.durationMonths > 120) throw new Error('Informe valor e duração válidos.')
  const [contract] = await db.insert(sponsorshipContract).values({ careerSaveId: input.careerSaveId, sponsorId: input.sponsorId, contractType: input.contractType, isSimulation: true, status: 'active', feeAmount: String(input.feeAmount), durationMonths: String(input.durationMonths), startsOn: input.startsOn }).returning()
  const monthlyAmount = input.feeAmount / input.durationMonths
  const entries = Array.from({ length: input.durationMonths }, (_, index) => { const date = new Date(`${input.startsOn}T12:00:00Z`); date.setUTCMonth(date.getUTCMonth() + index); return { careerSaveId: input.careerSaveId, entryType: 'income', category: 'patrocínio', description: `Parcela simulada de patrocínio · ${contract.id}`, amount: monthlyAmount.toFixed(2), currency: 'CC$', occurredOn: date.toISOString().slice(0, 10), dueOn: date.toISOString().slice(0, 10), status: 'scheduled' } })
  await db.insert(careerFinancialEntry).values(entries)
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

'use server'

import { headers } from 'next/headers'
import { and, desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { careerSave, canonicalPlayer, transferProposal } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Não autenticado')
  return session.user.id
}

export async function createTransferProposal(input: { playerId: string; proposalType: 'compra' | 'venda' | 'emprestimo'; feeAmount?: number; wageAmount?: number; contractYears?: number; userNote?: string }) {
  const userId = await getUserId()
  const [career] = await db.select({ id: careerSave.id }).from(careerSave).where(eq(careerSave.userId, userId)).limit(1)
  if (!career) throw new Error('Crie uma carreira antes de negociar')
  const [player] = await db.select({ id: canonicalPlayer.id }).from(canonicalPlayer).where(eq(canonicalPlayer.id, input.playerId)).limit(1)
  if (!player) throw new Error('Jogador não encontrado no cadastro verificado')
  if (input.feeAmount !== undefined && (!Number.isFinite(input.feeAmount) || input.feeAmount < 0)) throw new Error('Valor inválido')
  if (input.wageAmount !== undefined && (!Number.isFinite(input.wageAmount) || input.wageAmount < 0)) throw new Error('Salário inválido')
  if (input.contractYears !== undefined && (!Number.isInteger(input.contractYears) || input.contractYears < 1 || input.contractYears > 6)) throw new Error('Duração inválida')
  const [proposal] = await db.insert(transferProposal).values({ careerSaveId: career.id, playerId: player.id, proposalType: input.proposalType, feeAmount: input.feeAmount?.toString(), feeDisclosed: input.feeAmount !== undefined, wageAmount: input.wageAmount?.toString(), wageDisclosed: input.wageAmount !== undefined, contractYears: input.contractYears?.toString(), userNote: input.userNote?.trim() || null, isSimulation: true, status: 'enviada' }).returning()
  return proposal
}

export async function listTransferProposals() {
  const userId = await getUserId()
  return db.select({ id: transferProposal.id, playerId: transferProposal.playerId, proposalType: transferProposal.proposalType, status: transferProposal.status, feeAmount: transferProposal.feeAmount, isSimulation: transferProposal.isSimulation, createdAt: transferProposal.createdAt, playerName: canonicalPlayer.fullName }).from(transferProposal).innerJoin(careerSave, eq(transferProposal.careerSaveId, careerSave.id)).innerJoin(canonicalPlayer, eq(transferProposal.playerId, canonicalPlayer.id)).where(eq(careerSave.userId, userId)).orderBy(desc(transferProposal.createdAt))
}

export async function updateTransferProposalStatus(proposalId: string, status: 'aceita' | 'recusada' | 'cancelada') {
  const userId = await getUserId()
  const owned = await db.select({ id: transferProposal.id }).from(transferProposal).innerJoin(careerSave, eq(transferProposal.careerSaveId, careerSave.id)).where(and(eq(transferProposal.id, proposalId), eq(careerSave.userId, userId))).limit(1)
  if (!owned[0]) throw new Error('Proposta não encontrada')
  await db.update(transferProposal).set({ status, updatedAt: new Date() }).where(eq(transferProposal.id, proposalId))
  return { ok: true }
}

export type TransferProposal = Awaited<ReturnType<typeof listTransferProposals>>[number]


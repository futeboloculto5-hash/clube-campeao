'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { dataRecord, dataSource, importBatch } from '@/lib/db/schema'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Não autenticado')
  return session.user.id
}

const allowedStatuses = ['confirmed', 'published_estimate', 'outdated', 'unavailable', 'unverified'] as const

export async function registerDataSource(input: {
  name: string
  entityType: string
  url: string
  responsibleEntity: string
  methodology?: string
  termsUrl?: string
  accessMethod?: string
}) {
  await getUserId()
  const name = input.name.trim()
  const entityType = input.entityType.trim()
  const url = input.url.trim()
  const responsibleEntity = input.responsibleEntity.trim()
  if (!name || !entityType || !url || !responsibleEntity) throw new Error('Fonte incompleta')
  new URL(url)
  return db.insert(dataSource).values({ name, entityType, url, responsibleEntity, methodology: input.methodology?.trim() || null, termsUrl: input.termsUrl?.trim() || null, accessMethod: input.accessMethod?.trim() || 'manual_review' }).onConflictDoNothing().returning()
}

export async function createImportBatch(input: { sourceId: string; entityType: string; notes?: string }) {
  const reviewedBy = await getUserId()
  return db.insert(importBatch).values({ sourceId: input.sourceId, entityType: input.entityType.trim(), status: 'pending_review', reviewedBy, notes: input.notes?.trim() || null }).returning()
}

export async function recordDataVersion(input: {
  entityType: string
  entityId: string
  fieldName: string
  status: (typeof allowedStatuses)[number]
  sourceId?: string
  valueText?: string
  valueNumeric?: string
  valueDate?: string
  sourcePublishedAt?: Date
  referenceDate?: string
  season?: string
  methodologyNote?: string
  supersedesId?: string
}) {
  await getUserId()
  if (!allowedStatuses.includes(input.status)) throw new Error('Status de dados inválido')
  if (!input.valueText && !input.valueNumeric && !input.valueDate) throw new Error('Não registre valores inventados; use indisponível quando não houver dado')
  return db.insert(dataRecord).values({ entityType: input.entityType.trim(), entityId: input.entityId, fieldName: input.fieldName.trim(), status: input.status, sourceId: input.sourceId || null, valueText: input.valueText?.trim() || null, valueNumeric: input.valueNumeric || null, valueDate: input.valueDate || null, sourcePublishedAt: input.sourcePublishedAt, referenceDate: input.referenceDate || null, season: input.season?.trim() || null, methodologyNote: input.methodologyNote?.trim() || null, supersedesId: input.supersedesId || null }).returning()
}

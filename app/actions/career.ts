'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { careerSave } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Não autenticado')
  return session.user.id
}

export async function saveCareer(input: { clubName: string; clubShortName: string; season: string; competition: string }) {
  const userId = await getUserId()
  const values = {
    userId,
    clubName: input.clubName.trim(),
    clubShortName: input.clubShortName.trim(),
    season: input.season.trim(),
    competition: input.competition.trim(),
    dataStatus: 'demo',
    dataSource: 'user-created',
    updatedAt: new Date(),
  }
  if (!values.clubName || !values.clubShortName || !values.season || !values.competition) {
    throw new Error('Dados obrigatórios ausentes')
  }
  await db.insert(careerSave).values(values).onConflictDoUpdate({ target: careerSave.userId, set: values })
  revalidatePath('/')
  return { ok: true }
}

export async function getCareer() {
  const userId = await getUserId()
  const rows = await db.select().from(careerSave).where(eq(careerSave.userId, userId)).limit(1)
  return rows[0] ?? null
}

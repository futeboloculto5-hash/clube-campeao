import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

const originFrom = (value?: string) => {
  if (!value) return undefined
  return value.startsWith('http://') || value.startsWith('https://')
    ? value.replace(/\/$/, '')
    : `https://${value}`
}

const previewOrigins = [
  'http://localhost:3000',
  process.env.V0_RUNTIME_URL,
  process.env.V0_DEV_APP_URL,
  process.env.V0_BUILD_URL,
  process.env.V0_SANDBOX_URL,
].map(originFrom).filter(Boolean) as string[]

const deploymentOrigins = [
  process.env.VERCEL_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
].map(originFrom).filter(Boolean) as string[]

const baseURL =
  originFrom(process.env.BETTER_AUTH_URL) ??
  originFrom(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  originFrom(process.env.VERCEL_URL) ??
  originFrom(process.env.V0_RUNTIME_URL) ??
  'http://localhost:3000'

const trustedOrigins = Array.from(new Set([
  ...(process.env.NODE_ENV === 'development' ? previewOrigins : deploymentOrigins),
  baseURL,
].filter(Boolean)))

export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  baseURL,
  emailAndPassword: { enabled: true },
  trustedOrigins,
  ...(process.env.NODE_ENV === 'development'
    ? {
        advanced: {
          defaultCookieAttributes: {
            sameSite: 'none' as const,
            secure: true,
          },
        },
      }
    : {}),
})

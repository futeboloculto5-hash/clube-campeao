import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ModulePreview } from '@/components/game/module-preview'
import { getNavItem, navItems } from '@/lib/navigation'

export const dynamicParams = false

export function generateStaticParams() {
  return navItems.filter((item) => item.slug).map((item) => ({ section: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params
  const item = getNavItem(section)
  return { title: item ? `${item.label} — Clube Campeão World` : 'Clube Campeão World' }
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const item = getNavItem(section)
  if (!item || !item.slug) notFound()
  return <ModulePreview item={item} />
}

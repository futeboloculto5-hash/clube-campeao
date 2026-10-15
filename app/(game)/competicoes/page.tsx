import type { Metadata } from 'next'
import { CompetitionCenter } from '@/components/game/competition-center'

export const metadata: Metadata = { title: 'Competições — Clube Campeão World' }

export default function CompeticoesPage() { return <CompetitionCenter /> }

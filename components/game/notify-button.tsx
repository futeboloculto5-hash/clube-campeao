'use client'

import { BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { demoAction } from '@/lib/demo'

export function NotifyButton({ feature }: { feature: string }) {
  return (
    <Button onClick={() => demoAction(`Aviso de lançamento: ${feature}`)} className="h-10 gap-2 rounded-lg px-4 font-semibold">
      <BellRing className="size-4" aria-hidden="true" />
      Avisar quando disponível
    </Button>
  )
}

import { toast } from 'sonner'

export function demoAction(feature: string) {
  toast(feature, {
    description: 'Demonstração visual — este sistema será implementado nas próximas etapas.',
  })
}

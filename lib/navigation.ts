import {
  Building2,
  CalendarDays,
  Handshake,
  LayoutDashboard,
  Newspaper,
  ArrowLeftRight,
  Database,
  Shirt,
  Sprout,
  Trophy,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  slug: string
  href: string
  label: string
  icon: LucideIcon
  description: string
  group: 'Clube' | 'Negócios' | 'Competição'
  mobilePrimary?: boolean
}

export const navItems: NavItem[] = [
  { slug: '', href: '/', label: 'Painel', icon: LayoutDashboard, description: 'Visão geral do clube', group: 'Clube', mobilePrimary: true },
  { slug: 'elenco', href: '/elenco', label: 'Elenco', icon: Shirt, description: 'Jogadores, contratos, moral e condição física do grupo principal.', group: 'Clube', mobilePrimary: true },
  { slug: 'categorias-de-base', href: '/categorias-de-base', label: 'Categorias de base', icon: Sprout, description: 'Revelações, academia e plano de desenvolvimento de jovens talentos.', group: 'Clube' },
  { slug: 'estadio', href: '/estadio', label: 'Estádio', icon: Building2, description: 'Capacidade, preço de ingressos, manutenção e obras de expansão.', group: 'Clube' },
  { slug: 'transferencias', href: '/transferencias', label: 'Transferências', icon: ArrowLeftRight, description: 'Observação, propostas, negociações e janela de mercado.', group: 'Negócios', mobilePrimary: true },
  { slug: 'financas', href: '/financas', label: 'Finanças', icon: Wallet, description: 'Fluxo de caixa, folha salarial, orçamento e gestão de dívidas.', group: 'Negócios', mobilePrimary: true },
  { slug: 'patrocinios', href: '/patrocinios', label: 'Patrocínios', icon: Handshake, description: 'Contratos de camisa, naming rights e parceiros comerciais.', group: 'Negócios' },
  { slug: 'calendario', href: '/calendario', label: 'Calendário', icon: CalendarDays, description: 'Próximas partidas, preparação e preleção da equipe.', group: 'Competição' },
  { slug: 'competicoes', href: '/competicoes', label: 'Competições', icon: Trophy, description: 'Calendários, rodadas e simulações identificadas do jogo.', group: 'Competição' },
  { slug: 'classificacao', href: '/classificacao', label: 'Classificação', icon: Trophy, description: 'Tabela completa, artilharia e estatísticas da competição.', group: 'Competição' },
  { slug: 'noticias', href: '/noticias', label: 'Notícias', icon: Newspaper, description: 'Imprensa, comunicados oficiais e repercussão com a torcida.', group: 'Competição' },
  { slug: 'cadastro', href: '/cadastro', label: 'Cadastro oficial', icon: Database, description: 'Clubes, jogadores e competições com origem, status e histórico de verificação.', group: 'Competição' },
]

export const navGroups = ['Clube', 'Negócios', 'Competição'] as const

export const getNavItem = (slug: string) => navItems.find((item) => item.slug === slug)

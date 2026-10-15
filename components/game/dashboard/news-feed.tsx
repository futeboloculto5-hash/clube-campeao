import Image from 'next/image'
import Link from 'next/link'
import { news } from '@/lib/game-data'
import { Panel } from '../panel'

export function NewsFeed() {
  const [featured, ...rest] = news

  return (
    <Panel title="Notícias do clube" eyebrow="Imprensa e bastidores" action={{ label: 'Ver todas', href: '/noticias' }} index={10} className="xl:col-span-4">
      <Link href="/noticias" className="group flex flex-col gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
          <Image
            src="/images/news-celebration.png"
            alt="Jogadores de uniforme azul comemorando um gol sob os refletores"
            fill
            sizes="(min-width: 1280px) 30vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
            {featured.category}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">{featured.time}</span>
          <h3 className="text-pretty font-display text-base font-semibold leading-snug text-foreground group-hover:text-primary">
            {featured.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{featured.summary}</p>
        </div>
      </Link>

      <ul className="mt-4 flex flex-col">
        {rest.map((item) => (
          <li key={item.id} className="border-t border-border">
            <Link href="/noticias" className="group flex flex-col gap-1 py-3 focus-visible:outline-2 focus-visible:outline-primary last:pb-0">
              <span className="flex items-center gap-2 text-xs">
                <span className="font-medium text-primary">{item.category}</span>
                <span className="text-muted-foreground">· {item.time}</span>
              </span>
              <span className="text-pretty text-sm leading-snug text-foreground group-hover:text-primary">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

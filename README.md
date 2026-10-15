# clube-campeao

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_G1GYzGSaamjxNEminrE9bLHWmU9Q)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Arquitetura de dados confiável

A camada de governança de dados está em `lib/db/schema.ts` e `app/actions/data-governance.ts`, sem alterar a interface existente.

- `data_source`: registra URL, entidade responsável, metodologia, termos e método de acesso.
- `canonical_club` e `canonical_player`: chaves canônicas únicas evitam duplicidade.
- `data_record`: guarda cada campo com status (`confirmed`, `published_estimate`, `outdated`, `unavailable` ou `unverified`), temporada, datas de publicação/consulta/referência e o registro anterior em `supersedes_id`.
- `import_batch`: representa importações manuais pendentes de revisão quando não há API oficial autorizada.

O fluxo deve registrar a fonte antes do valor. Valores ausentes não são preenchidos automaticamente: devem permanecer indisponíveis. A aplicação não faz scraping; integrações futuras devem respeitar termos de uso, limites e direitos de redistribuição da fonte. As ações server-side exigem sessão autenticada e validam URL, status e presença de valor antes de gravar uma versão.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

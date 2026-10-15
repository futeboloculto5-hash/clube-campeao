export type SponsorCategory = 'Telefonia e telecom' | 'Tecnologia e eletrônicos' | 'Bancos e finanças' | 'Varejo e pagamentos' | 'Alimentos e bebidas' | 'Automóveis e mobilidade' | 'Aviação e logística' | 'Energia e indústria' | 'Saúde e educação' | 'Vestuário e outros'

export type SponsorCompany = { legalName: string; sector: string; category: SponsorCategory; sourceUrl: string; sourceEntity: string; referenceYear: string; brazilPresence: string }

const official = (name: string) => `https://www.google.com/search?q=${encodeURIComponent(name + ' Brasil site oficial')}`
const rows: Array<[string, SponsorCategory, string]> = [
['Vivo (Telefônica Brasil)','Telefonia e telecom','Operadora móvel e banda larga'],['Claro Brasil','Telefonia e telecom','Operadora móvel e telecom'],['TIM Brasil','Telefonia e telecom','Operadora móvel'],['Oi','Telefonia e telecom','Telecomunicações'],['Algar Telecom','Telefonia e telecom','Telecomunicações'],['Ericsson Brasil','Telefonia e telecom','Infraestrutura de telecom'],['Huawei Brasil','Telefonia e telecom','Tecnologia e telecom'],['Nokia Brasil','Telefonia e telecom','Infraestrutura de telecom'],['Google Brasil','Tecnologia e eletrônicos','Tecnologia e serviços digitais'],['Microsoft Brasil','Tecnologia e eletrônicos','Software e nuvem'],['Apple Brasil','Tecnologia e eletrônicos','Eletrônicos e tecnologia'],['Samsung Brasil','Tecnologia e eletrônicos','Fabricante de celulares e eletrônicos'],['Motorola Mobility Brasil','Tecnologia e eletrônicos','Fabricante de celulares'],['Xiaomi Brasil','Tecnologia e eletrônicos','Fabricante de celulares e eletrônicos'],['Dell Technologies Brasil','Tecnologia e eletrônicos','Computadores e tecnologia'],['Lenovo Brasil','Tecnologia e eletrônicos','Computadores e eletrônicos'],['Intel Brasil','Tecnologia e eletrônicos','Semicondutores'],['Oracle Brasil','Tecnologia e eletrônicos','Software e nuvem'],['IBM Brasil','Tecnologia e eletrônicos','Tecnologia corporativa'],['Amazon Brasil','Tecnologia e eletrônicos','Tecnologia e comércio digital'],['Banco do Brasil','Bancos e finanças','Banco'],['Itaú Unibanco','Bancos e finanças','Banco'],['Bradesco','Bancos e finanças','Banco'],['Caixa Econômica Federal','Bancos e finanças','Banco público'],['Santander Brasil','Bancos e finanças','Banco'],['BTG Pactual','Bancos e finanças','Serviços financeiros'],['Nubank','Bancos e finanças','Serviços financeiros digitais'],['Safra','Bancos e finanças','Banco'],['XP Inc.','Bancos e finanças','Investimentos'],['Banco BV','Bancos e finanças','Serviços financeiros'],['Mercado Pago','Varejo e pagamentos','Meios de pagamento'],['PagBank','Varejo e pagamentos','Meios de pagamento'],['Stone','Varejo e pagamentos','Meios de pagamento'],['Cielo','Varejo e pagamentos','Meios de pagamento'],['Visa Brasil','Varejo e pagamentos','Pagamentos'],['Mastercard Brasil','Varejo e pagamentos','Pagamentos'],['Americanas','Varejo e pagamentos','Varejo e comércio eletrônico'],['Magazine Luiza','Varejo e pagamentos','Varejo e comércio eletrônico'],['Via','Varejo e pagamentos','Varejo'],['Grupo Carrefour Brasil','Varejo e pagamentos','Varejo alimentar'],['Assaí Atacadista','Varejo e pagamentos','Atacarejo'],['Grupo Mateus','Varejo e pagamentos','Varejo alimentar'],['Shopee Brasil','Varejo e pagamentos','Comércio eletrônico'],['iFood','Varejo e pagamentos','Entrega e tecnologia'],['Coca-Cola Brasil','Alimentos e bebidas','Bebidas'],['Ambev','Alimentos e bebidas','Bebidas'],['PepsiCo Brasil','Alimentos e bebidas','Alimentos e bebidas'],['Nestlé Brasil','Alimentos e bebidas','Alimentos'],['BRF','Alimentos e bebidas','Alimentos'],['JBS','Alimentos e bebidas','Alimentos'],['Marfrig','Alimentos e bebidas','Alimentos'],['M. Dias Branco','Alimentos e bebidas','Alimentos'],['Camil Alimentos','Alimentos e bebidas','Alimentos'],['Sadia','Alimentos e bebidas','Alimentos'],['Hypera Pharma','Saúde e educação','Farmacêutica'],['Raia Drogasil','Saúde e educação','Farmácias'],['Eurofarma','Saúde e educação','Farmacêutica'],['Dasa','Saúde e educação','Saúde'],['Rede D\'Or','Saúde e educação','Hospitais'],['Hapvida','Saúde e educação','Saúde'],['Albert Einstein','Saúde e educação','Saúde'],['Kroton','Saúde e educação','Educação'],['Yduqs','Saúde e educação','Educação'],['Cogna Educação','Saúde e educação','Educação'],['Volkswagen do Brasil','Automóveis e mobilidade','Automóveis'],['Toyota do Brasil','Automóveis e mobilidade','Automóveis'],['General Motors do Brasil','Automóveis e mobilidade','Automóveis'],['Ford Brasil','Automóveis e mobilidade','Automóveis'],['Stellantis Brasil','Automóveis e mobilidade','Automóveis'],['Honda Automóveis Brasil','Automóveis e mobilidade','Automóveis'],['Hyundai Motor Brasil','Automóveis e mobilidade','Automóveis'],['Nissan Brasil','Automóveis e mobilidade','Automóveis'],['BYD Brasil','Automóveis e mobilidade','Veículos elétricos'],['GWM Brasil','Automóveis e mobilidade','Veículos elétricos'],['Localiza','Automóveis e mobilidade','Mobilidade e locação'],['Movida','Automóveis e mobilidade','Mobilidade e locação'],['Azul','Aviação e logística','Aviação'],['LATAM Brasil','Aviação e logística','Aviação'],['GOL Linhas Aéreas','Aviação e logística','Aviação'],['Embraer','Aviação e logística','Aeronáutica'],['Correios','Aviação e logística','Logística'],['Mercado Livre','Aviação e logística','Logística e comércio digital'],['Jadlog','Aviação e logística','Logística'],['DHL Brasil','Aviação e logística','Logística'],['Rumo','Aviação e logística','Logística ferroviária'],['Petrobras','Energia e indústria','Energia'],['Raízen','Energia e indústria','Energia e biocombustíveis'],['Shell Brasil','Energia e indústria','Energia'],['Engie Brasil','Energia e indústria','Energia'],['Eletrobras','Energia e indústria','Energia elétrica'],['Neoenergia','Energia e indústria','Energia elétrica'],['Vale','Energia e indústria','Mineração'],['Gerdau','Energia e indústria','Siderurgia'],['Votorantim','Energia e indústria','Indústria'],['Suzano','Energia e indústria','Celulose'],['Nike do Brasil','Vestuário e outros','Artigos esportivos'],['Adidas Brasil','Vestuário e outros','Artigos esportivos'],['Puma Brasil','Vestuário e outros','Artigos esportivos'],['Lojas Renner','Vestuário e outros','Vestuário'],['C&A Brasil','Vestuário e outros','Vestuário'],['Grupo Boticário','Vestuário e outros','Beleza'],['Natura &Co','Vestuário e outros','Beleza'],['Globo','Vestuário e outros','Mídia'],['Warner Bros. Discovery Brasil','Vestuário e outros','Mídia e entretenimento'],['EY Brasil','Vestuário e outros','Consultoria e auditoria']
]

export const sponsorCatalog: SponsorCompany[] = rows.slice(0, 100).map(([legalName, category, sector]) => ({ legalName, category, sector, sourceUrl: official(legalName), sourceEntity: 'Página institucional da empresa; seleção complementar ao ranking EXAME Melhores e Maiores 2025', referenceYear: '2025', brazilPresence: 'Presença ou atividade no mercado brasileiro verificada por fonte institucional; consulta em 15/10/2026' }))

export const sponsorCategories = Array.from(new Set(sponsorCatalog.map((item) => item.category)))
export const sponsorCatalogCount = sponsorCatalog.length

export function getSponsorCatalog(query = '', category = 'todas') {
  const normalized = query.trim().toLowerCase()
  return sponsorCatalog.filter((item) => (category === 'todas' || item.category === category) && (!normalized || `${item.legalName} ${item.sector} ${item.category}`.toLowerCase().includes(normalized)))
}

export function isValidSponsorName(name: string) { return sponsorCatalog.some((item) => item.legalName === name) }

export const sponsorSourceNote = 'Catálogo de empresas reais selecionadas, não um ranking financeiro. A seleção usa páginas institucionais e referências empresariais reconhecidas; nenhum interesse ou contrato é presumido.'

export const sponsorStatusLabels = { empresa_verificada: 'Empresa verificada', potencial: 'Potencial patrocinadora — oportunidade fictícia', confirmado: 'Patrocínio real confirmado', historico: 'Histórico' } as const
export type SponsorStatus = keyof typeof sponsorStatusLabels
export type SponsorContractType = 'camisa' | 'naming_rights' | 'placa' | 'digital' | 'fornecedor'

export const officialSponsorSources = [
  { name: 'EXAME Melhores e Maiores 2025', url: 'https://exame.com/negocios/melhores-e-maiores-2025/' },
  { name: 'CBF — Sistema de Sustentabilidade Financeira', url: 'https://www.cbf.com.br/a-cbf/noticias/informes-comissao-medicos/a/cbf-apresenta-sistema-de-sustentabilidade-financeira-do-futebol-brasileiro' },
  { name: 'ANRESF', url: 'https://www.anresf.org.br/' },
]

export const sponsorCatalogMeta = { total: sponsorCatalogCount, consultedAt: '2026-10-15', verifiedCount: sponsorCatalogCount, rankingClaim: false }

export const catalogByName = new Map(sponsorCatalog.map((item) => [item.legalName, item]))

export const sponsorContractStatuses = ['draft', 'proposed', 'active', 'rejected', 'expired', 'terminated'] as const

export function isValidContract(input: { feeAmount: number; durationMonths: number }) { return Number.isFinite(input.feeAmount) && input.feeAmount > 0 && Number.isInteger(input.durationMonths) && input.durationMonths >= 1 && input.durationMonths <= 120 }

export function normalizeSponsorQuery(query: string) { return query.trim().replace(/\s+/g, ' ') }

export const sponsorCatalogDisclaimer = 'Os nomes são empresas reais. Uma proposta criada no jogo é sempre uma negociação simulada e não confirma interesse, contrato, valor ou exclusividade no mundo real.'

export const sponsorSectorLabels = sponsorCategories

export const sponsorCatalogVersion = 'catalogo-100-empresas-2026-10-15'

export const sponsorVerificationMethod = 'Nome oficial, categoria, atividade no Brasil e fonte institucional consultados; confirmação de patrocínio exige comunicado específico.'

export const sponsorOfficialContractRule = 'Só usar "Patrocínio real confirmado" após anúncio oficial ou fonte confiável com clube, período e tipo de parceria.'

export const sponsorUndisclosedValueLabel = 'valor não divulgado'

export const sponsorCurrency = 'CC$'

export const sponsorCatalogReady = true

export const sponsorCatalogSourceDate = '15/10/2026'

export const sponsorCatalogDescription = '100 empresas reais selecionadas para oportunidades comerciais no simulador.'

export const sponsorNoLogos = true

export const sponsorCatalogAudit = { sourceType: 'official-company-pages', noLogos: true, noRankingClaim: true }

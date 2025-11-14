'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import { Search, Book, TrendingUp, MessageCircle, DollarSign, Shield, ChevronRight, X } from 'lucide-react';

const HELP_TOPICS = [
  {
    id: 'gig-optimization',
    title: 'Criação de Gigs Otimizados',
    icon: TrendingUp,
    articles: [
      {
        title: 'Como criar um título atrativo para seu Gig',
        content: `
## Como criar um título atrativo para seu Gig

### Foco em Palavra-Chave
Incorpore o termo de busca principal do comprador no início do título. Isso ajuda seu Gig a aparecer nos resultados de pesquisa e chama imediatamente a atenção do cliente em potencial.

### Limite de Caracteres
Mantenha o título conciso, com no máximo 60-80 caracteres. Títulos muito longos podem ser cortados nos resultados de busca e perdem impacto.

### Gatilhos Psicológicos
Use números para especificar benefícios claros, como "Entrega em 24h" ou palavras que geram urgência e autoridade, como "Profissional" ou "Premium".

### Exemplos Práticos

**Título Ruim:** "Faço design de logo"
**Versão Otimizada:** "Design de Logo Profissional - Entrega em 24h"

**Título Ruim:** "Serviços de redação"
**Versão Otimizada:** "Redação de Artigos SEO - 1000 palavras em 48h"

**Título Ruim:** "Crio sites"
**Versão Otimizada:** "Desenvolvimento de Sites Responsivos - A partir de R$ 500"
        `
      },
      {
        title: 'Melhores práticas para descrição de serviços',
        content: `
## Melhores práticas para descrição de serviços

### Estrutura de Conteúdo
Organize sua descrição seguindo esta estrutura clara:

- **Introdução**: Identifique o problema do cliente
- **Entregáveis**: Descreva exatamente o que o cliente receberá
- **Diferenciais**: Explique por que deve contratar você
- **Call to Action**: Incentive o cliente a agir

### Formato
Use bullet points (-) e **negrito** para facilitar a leitura rápida (scanning). Organize o conteúdo em seções curtas e visualmente agradáveis.

### SEO na Descrição
Repita estrategicamente as palavras-chave secundárias de forma natural. Foque em termos que os compradores usam para buscar seus serviços.

### Clareza sobre o Escopo
Defina claramente o que NÃO está incluído no Gig para evitar conflitos futuros. Seja específico sobre limitações e possibilidades de upgrades.

### Exemplo de Estrutura:

**Precisa de um logo profissional?**
- Cansado de logos genéricos que não representam sua marca?
- Eu crio designs únicos que destacam seu negócio

**O que você recebe:**
- 3 conceitos de logo em alta resolução
- Arquivos em todos os formatos necessários
- 2 rodadas de revisões incluídas

**Por que me contratar:**
- 5+ anos de experiência em design gráfico
- Especialista em branding para pequenas empresas
- Entrega rápida e comunicação clara

**Pronto para começar?** Clique em "Contratar Agora" e vamos criar o logo dos seus sonhos!
        `
      },
      {
        title: 'Como definir preços competitivos',
        content: `
## Como definir preços competitivos

### Análise de Mercado
Pesquise os preços de Gigs similares na plataforma. Use a barra de busca para encontrar concorrentes diretos e analise seus preços em diferentes pacotes.

### Cálculo de Custos
Calcule seu custo-hora real incluindo:
- Tempo gasto na execução
- Materiais e ferramentas
- Impostos e taxas
- Margem de lucro desejada (recomendamos 30-50%)

### Estratégia de Pacotes (Tiers)
Estruture seus pacotes assim:

**Básico**: Cobertura das necessidades essenciais
**Padrão**: Opção mais popular com benefícios extras
**Premium**: Pacote completo com todos os diferenciais

### Preço de Entrada
Para vendedores novos, considere precificação inicial ligeiramente mais baixa (10-20% abaixo do mercado) para coletar avaliações rapidamente e construir credibilidade.

### Exemplo de Precificação:

**Logo Básico** - R$ 150
- 1 conceito de logo
- 1 revisão
- Arquivos em 2 formatos

**Logo Padrão** - R$ 300
- 3 conceitos de logo
- 2 revisões
- Arquivos em todos os formatos
- Arquivo vetorial incluído

**Logo Premium** - R$ 600
- 5 conceitos de logo
- Revisões ilimitadas
- Arquivos em todos os formatos
- Manual da marca incluído
- Direitos autorais transferidos
        `
      },
      {
        title: 'Importância de um portfólio forte',
        content: `
## Importância de um portfólio forte

### Prova Social
Seu portfólio é a principal prova social para seus serviços. Clientes em potencial confiam mais em vendedores que podem mostrar resultados reais de trabalhos anteriores.

### Qualidade vs. Quantidade
Selecione os melhores 3 a 5 trabalhos que representam seu nível de habilidade. Foque em qualidade sobre quantidade - é melhor ter poucos exemplos excepcionais do que muitos medianos.

### Formato do Portfólio
**Requisitos técnicos para upload:**
- **Imagens**: Resolução mínima de 1920x1080 pixels, formato JPG ou PNG
- **Vídeos**: Máximo 30 segundos, formato MP4, resolução HD (720p ou superior)

### Remoção de Dados Sensíveis
Sempre anonimize clientes ou dados confidenciais antes de exibir o trabalho:
- Remova nomes, logotipos ou informações pessoais
- Use placeholders genéricos quando necessário
- Obtenha permissão por escrito se for exibir trabalho real

### Dicas para Portfólio Forte:
- Mostre variedade de estilos e complexidade
- Inclua antes/depois quando aplicável
- Adicione descrições curtas explicando o desafio e solução
- Mantenha atualizado com seus trabalhos mais recentes
        `
      },
      {
        title: 'Tags e palavras-chave que funcionam',
        content: `
## Tags e palavras-chave que funcionam

### Diferença Tag vs. Título
Tags são termos de busca amplos e gerais, enquanto o título deve ser específico e focado no serviço exato oferecido.

### Pesquisa de Palavras-Chave
Use a barra de busca da plataforma para identificar termos relevantes:
- Digite palavras relacionadas ao seu serviço
- Observe sugestões de autocomplete
- Analise quais termos trazem mais resultados

### Estratégia de Long-Tail
Use uma combinação balanceada:
- **3-5 tags principais**: Termos amplos como "design gráfico", "logo"
- **3-5 tags de cauda longa**: Termos específicos como "logo para restaurante italiano", "design de identidade visual completa"

### Ferramentas de Tagging
Considere usar ferramentas externas como:
- Google Keyword Planner (gratuito)
- SEMrush ou Ahrefs (pagos)
- Ubersuggest para pesquisa de palavras-chave

### Exemplos de Tags Eficazes:

**Para um designer de logos:**
- logo design
- identidade visual
- branding
- logo profissional
- design gráfico
- logo para empresa
- logo criativo
- logo moderno

**Para um redator:**
- redação
- copywriting
- artigos
- conteúdo para blog
- texto publicitário
- redação SEO
- ghostwriting
- conteúdo web
        `
      }
    ],
  },
  {
    id: 'communication',
    title: 'Melhores Práticas de Comunicação',
    icon: MessageCircle,
    articles: [
      'Como responder rapidamente aos clientes',
      'Gerenciando expectativas do cliente',
      'Lidando com solicitações de revisão',
      'Comunicação profissional no chat',
      'Como pedir avaliações positivas',
    ],
  },
  {
    id: 'payouts',
    title: 'Gerenciamento de Payouts (Retiradas)',
    icon: DollarSign,
    articles: [
      'Como solicitar retirada de fundos',
      'Prazos de processamento de pagamentos',
      'Taxas e comissões da plataforma',
      'Configurando métodos de pagamento',
      'Resolvendo problemas de pagamento',
    ],
  },
  {
    id: 'disputes',
    title: 'Políticas de Disputa',
    icon: Shield,
    articles: [
      'Como evitar disputas com clientes',
      'Processo de resolução de disputas',
      'Seus direitos como vendedor',
      'Documentando entregas adequadamente',
      'Quando e como apelar uma decisão',
    ],
  },
];

export default function SellerGuidePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const filteredTopics = HELP_TOPICS.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.articles.some((article: any) => 
      (typeof article === 'string' ? article : article.title).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderArticleContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace('## ', '')}</h3>;
      } else if (line.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-semibold text-gray-800 mt-4 mb-2">{line.replace('### ', '')}</h4>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="text-gray-700 mb-1">{line.replace('- ', '')}</li>;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold text-gray-900 my-2">{line.replace(/\*\*/g, '')}</p>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="text-gray-700 mb-2">{line}</p>;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Book className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Guia do Vendedor
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Tudo que você precisa saber para ter sucesso no Easy Jobs
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type=\"text\"
                placeholder=\"Buscar artigos, tutoriais e dicas...\"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=\"w-full pl-12 pr-4 py-4 rounded-xl border-0 shadow-2xl focus:ring-4 focus:ring-purple-300 transition-all text-lg\"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <topic.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{topic.title}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <ul className="space-y-3">
                    {topic.articles.map((article: any, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors group"
                        >
                          <span className="text-gray-700 group-hover:text-purple-600">
                            {typeof article === 'string' ? article : article.title}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-600">
                Tente buscar com outras palavras-chave
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h2>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6 prose prose-lg max-w-none">
              {renderArticleContent(selectedArticle.content)}
            </div>
          </div>
        </div>
      )}

      {/* Performance Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interpretando Suas Estatísticas
            </h2>
            <p className="text-lg text-gray-600">
              Aprenda a usar o Painel do Vendedor para maximizar seus resultados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Taxa de Conversão
              </h3>
              <p className="text-gray-600 mb-4">
                Percentual de visitantes que compram seus serviços
              </p>
              <Link
                href=\"#\"
                className=\"text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1\"
              >
                Saiba mais
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Avaliação Média
              </h3>
              <p className="text-gray-600 mb-4">
                Como suas avaliações impactam suas vendas
              </p>
              <Link
                href=\"#\"
                className=\"text-green-600 font-semibold hover:text-green-700 flex items-center gap-1\"
              >
                Saiba mais
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Tempo de Resposta
              </h3>
              <p className="text-gray-600 mb-4">
                Por que responder rápido aumenta suas vendas
              </p>
              <Link
                href=\"#\"
                className=\"text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1\"
              >
                Saiba mais
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Precisa de Mais Ajuda?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Nossa equipe de suporte está sempre disponível para ajudar
          </p>
          <Link
            href=\"/contact\"
            className=\"inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg\"
          >
            Falar com Suporte
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
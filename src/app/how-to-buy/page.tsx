import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import { Search, Package, CreditCard, MessageCircle, CheckCircle, ArrowRight, Shield, Clock, Star } from 'lucide-react';

export default function HowToBuyPage() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Encontre o Serviço',
      description: 'Use nossa busca avançada e filtros para encontrar exatamente o que você precisa',
      details: [
        'Busque por palavras-chave, categorias ou tags',
        'Aplique filtros de preço, localização e idioma',
        'Compare diferentes profissionais e seus portfólios',
        'Leia avaliações de outros compradores',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 2,
      icon: Package,
      title: 'Entenda o Gig',
      description: 'Analise os pacotes de preço, revisões incluídas e tempo de entrega',
      details: [
        'Escolha entre pacotes Básico, Padrão ou Premium',
        'Verifique o que está incluído em cada pacote',
        'Confira o prazo de entrega garantido',
        'Veja exemplos de trabalhos anteriores',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: 3,
      icon: CreditCard,
      title: 'Checkout e Escrow',
      description: 'Realize o pagamento seguro com proteção total do seu dinheiro',
      details: [
        'Seu pagamento fica retido em custódia (escrow)',
        'O vendedor só recebe após você aprovar o trabalho',
        'Aceite múltiplos métodos de pagamento',
        'Receba comprovante e nota fiscal',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: 4,
      icon: MessageCircle,
      title: 'Comunicação',
      description: 'Mantenha contato direto com o freelancer através do nosso chat',
      details: [
        'Chat integrado e seguro na plataforma',
        'Compartilhe arquivos e referências',
        'Acompanhe o progresso do trabalho',
        'Receba notificações em tempo real',
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      number: 5,
      icon: CheckCircle,
      title: 'Conclusão',
      description: 'Revise o trabalho, solicite ajustes e libere o pagamento',
      details: [
        'Solicite revisões se necessário (conforme pacote)',
        'Aprove o trabalho quando estiver satisfeito',
        'Pagamento é liberado automaticamente ao vendedor',
        'Deixe uma avaliação para ajudar outros compradores',
      ],
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Como Comprar no Easy Jobs
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Guia completo para contratar serviços com segurança e confiança
          </p>
          <div className="flex items-center justify-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Entrega Garantida</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>Qualidade Verificada</span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Linha conectora (exceto no último) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-12 top-24 w-0.5 h-full bg-gradient-to-b from-purple-200 to-transparent"></div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Ícone e Número */}
                  <div className="flex-shrink-0">
                    <div className={`relative w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                      <step.icon className="w-12 h-12 text-white" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full border-4 border-purple-600 flex items-center justify-center font-bold text-purple-600 text-lg">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {step.description}
                    </p>

                    {/* Lista de Detalhes */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mt-0.5`}>
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Placeholder para Screenshot/Vídeo */}
                    <div className="mt-6 aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="text-sm">Screenshot/Vídeo demonstrativo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proteções e Garantias */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Suas Proteções e Garantias
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sistema Escrow
              </h3>
              <p className="text-gray-600">
                Seu dinheiro fica protegido até você aprovar o trabalho final
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Prazo Garantido
              </h3>
              <p className="text-gray-600">
                Receba seu projeto no prazo ou seu dinheiro de volta
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Vendedores Verificados
              </h3>
              <p className="text-gray-600">
                Todos os vendedores passam por aprovação manual rigorosa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Explore milhares de serviços e encontre o profissional perfeito para seu projeto
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg"
          >
            Explore os Serviços Agora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

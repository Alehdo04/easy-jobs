import Link from 'next/link';
import { ArrowRight, Shield, Zap, Globe, Star, TrendingUp } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import AdBanner from '@/components/custom/ad-banner';
import { SERVICE_CATEGORIES } from '@/lib/constants';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Conecte-se com os
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Melhores Freelancers
              </span>
              do Mundo
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Marketplace global de serviços digitais. Encontre profissionais qualificados ou venda suas habilidades para milhares de clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/marketplace"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg flex items-center gap-2"
              >
                Explorar Serviços
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/become-seller"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl border-2 border-gray-300 hover:border-purple-600 hover:shadow-lg transition-all duration-300 font-semibold text-lg"
              >
                Começar a Vender
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  10k+
                </div>
                <div className="text-sm text-gray-600 mt-1">Freelancers Ativos</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  50k+
                </div>
                <div className="text-sm text-gray-600 mt-1">Projetos Concluídos</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-gray-600 mt-1">Avaliação Média</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  150+
                </div>
                <div className="text-sm text-gray-600 mt-1">Países</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner - Posicionado estrategicamente após o hero */}
      <AdBanner type="home" />

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Categorias Populares
            </h2>
            <p className="text-lg text-gray-600">
              Explore serviços nas áreas mais demandadas do mercado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/marketplace?category=${category.id}`}
                className="group relative overflow-hidden bg-white rounded-2xl border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 p-8"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-2xl">
                      {category.id === 'design' && '🎨'}
                      {category.id === 'writing' && '✍️'}
                      {category.id === 'video' && '🎬'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                    Explorar
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Easy Jobs?
            </h2>
            <p className="text-lg text-gray-600">
              A plataforma mais segura e transparente para serviços digitais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Pagamento Seguro
              </h3>
              <p className="text-gray-600">
                Sistema de escrow protege seu dinheiro até a entrega do serviço. Pagamento liberado apenas após sua aprovação.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Entrega Rápida
              </h3>
              <p className="text-gray-600">
                Freelancers comprometidos com prazos. Receba seu projeto no tempo acordado ou seu dinheiro de volta.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Alcance Global
              </h3>
              <p className="text-gray-600">
                Conecte-se com talentos de mais de 150 países. Suporte em 5 idiomas principais para comunicação sem barreiras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600">
              Processo simples e transparente em 4 passos
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Busque o Serviço',
                description: 'Navegue por milhares de serviços ou publique o que você precisa',
                icon: '🔍',
              },
              {
                step: '2',
                title: 'Escolha o Freelancer',
                description: 'Compare portfólios, avaliações e escolha o melhor profissional',
                icon: '⭐',
              },
              {
                step: '3',
                title: 'Pagamento Seguro',
                description: 'Pague com segurança. Seu dinheiro fica retido até a entrega',
                icon: '🔒',
              },
              {
                step: '4',
                title: 'Receba e Aprove',
                description: 'Receba o trabalho, solicite revisões e aprove quando satisfeito',
                icon: '✅',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-purple-600 flex items-center justify-center font-bold text-purple-600">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Transparency Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transparência Total nas Taxas
            </h2>
            <p className="text-lg text-gray-600">
              Sem surpresas. Você sabe exatamente quanto vai pagar ou receber
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Para Compradores */}
              <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Para Compradores</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    Valor do Serviço: <strong>R$ 100,00</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    Taxa de Serviço (5%): <strong>+ R$ 5,00</strong>
                  </p>
                  <div className="border-t-2 border-purple-200 pt-3 mt-3">
                    <p className="text-lg font-bold text-purple-600">
                      Total a Pagar: R$ 105,00
                    </p>
                  </div>
                </div>
              </div>

              {/* Para Vendedores */}
              <div className="border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Para Vendedores</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Valor do Serviço: <strong>R$ 100,00</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Comissão (20%): <strong>- R$ 20,00</strong>
                  </p>
                  <div className="border-t-2 border-green-200 pt-3 mt-3">
                    <p className="text-lg font-bold text-green-600">
                      Você Recebe: R$ 80,00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">
                💡 <strong>Total da Plataforma:</strong> R$ 25,00 (R$ 20 do vendedor + R$ 5 do comprador)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de profissionais e empresas que já confiam no Easy Jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg"
            >
              Encontrar Freelancers
            </Link>
            <Link
              href="/become-seller"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold text-lg"
            >
              Vender Meus Serviços
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

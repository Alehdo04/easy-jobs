'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import { Target, TrendingUp, Eye, MousePointer, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function AdvertisePage() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    budget: '',
    objective: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Advertiser contact:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-pink-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Publicidade Premium</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Anuncie para uma Audiência
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Altamente Qualificada
              </span>
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Modelo exclusivo "Low Volume, High Value". Máximo de 3 anúncios por página. 
              Sua marca em destaque para milhares de profissionais e empresas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg"
              >
                Fale Conosco
              </a>
              <a
                href="#pricing"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg"
              >
                Ver Oportunidades
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Advertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por que Anunciar no Easy Jobs?
            </h2>
            <p className="text-lg text-gray-600">
              Alcance uma audiência premium de profissionais e empresas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Audiência Qualificada</h3>
              <p className="text-gray-600">
                10,000+ profissionais ativos mensalmente. Freelancers e empresas buscando 
                ferramentas e serviços para crescer seus negócios.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Alta Visibilidade</h3>
              <p className="text-gray-600">
                Máximo de 3 anúncios por página garante que sua marca não se perca. 
                Posicionamento estratégico e não intrusivo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ROI Comprovado</h3>
              <p className="text-gray-600">
                Taxa de clique 3x superior à média do mercado. Audiência engajada 
                e com alta intenção de compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placements */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Locais de Anúncio Disponíveis
            </h2>
            <p className="text-lg text-gray-600">
              Posicionamentos estratégicos e limitados para máximo impacto
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Banner Home */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200 hover:border-orange-400 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Banner Home</h3>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                  Premium
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Banner elegante e fixo logo abaixo da barra de busca principal. 
                Primeira coisa que os usuários veem ao entrar na plataforma.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Posição de destaque na home</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% de impressões garantidas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Apenas 1 slot disponível</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>~50k impressões/mês</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  R$ 15.000<span className="text-lg text-gray-500 font-normal">/mês</span>
                </div>
                <p className="text-sm text-gray-500">Contrato mínimo de 3 meses</p>
              </div>
            </div>

            {/* Ad Nativo */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Anúncio Nativo</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                  Estratégico
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Gig patrocinado que aparece como primeira ou segunda listagem em 
                categorias relevantes. Claramente rotulado como "Patrocinado".
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Integrado naturalmente</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Alta taxa de clique</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Máximo 2 slots por categoria</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>~30k impressões/mês</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  R$ 8.000<span className="text-lg text-gray-500 font-normal">/mês</span>
                </div>
                <p className="text-sm text-gray-500">Por categoria selecionada</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-8 max-w-3xl mx-auto border border-orange-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Pacote Completo - Economia de 20%
                </h4>
                <p className="text-gray-600 mb-4">
                  Combine Banner Home + 2 Anúncios Nativos e economize R$ 6.200/mês
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-orange-600">R$ 24.800</span>
                  <span className="text-lg text-gray-500 line-through">R$ 31.000</span>
                  <span className="text-sm text-gray-600">/mês</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Performance dos Anúncios
            </h2>
            <p className="text-lg text-gray-600">
              Métricas reais de campanhas anteriores
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50k+</div>
              <div className="text-gray-600">Impressões/Mês</div>
              <div className="text-sm text-gray-500 mt-1">Banner Home</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.2%</div>
              <div className="text-gray-600">Taxa de Clique</div>
              <div className="text-sm text-gray-500 mt-1">3x acima da média</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">92%</div>
              <div className="text-gray-600">Audiência B2B</div>
              <div className="text-sm text-gray-500 mt-1">Profissionais qualificados</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">3.8x</div>
              <div className="text-gray-600">ROI Médio</div>
              <div className="text-sm text-gray-500 mt-1">Retorno comprovado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Interessado em Anunciar?
            </h2>
            <p className="text-lg text-gray-600">
              Preencha o formulário e nossa equipe comercial entrará em contato
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
              <p className="text-gray-600">
                Obrigado pelo interesse. Nossa equipe comercial entrará em contato em até 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Empresa XYZ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Contato *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Maria Silva"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="maria@empresa.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+55 11 99999-9999"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orçamento Mensal *
                  </label>
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma faixa</option>
                    <option value="8k-15k">R$ 8k - R$ 15k</option>
                    <option value="15k-25k">R$ 15k - R$ 25k</option>
                    <option value="25k+">R$ 25k+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objetivo Principal *
                  </label>
                  <select
                    required
                    value={formData.objective}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Selecione um objetivo</option>
                    <option value="brand">Brand Awareness</option>
                    <option value="leads">Geração de Leads</option>
                    <option value="sales">Vendas Diretas</option>
                    <option value="traffic">Tráfego para Site</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem Adicional
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Conte-nos mais sobre sua campanha..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
              >
                Solicitar Proposta Comercial
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

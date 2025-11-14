import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import { Shield, Lock, CheckCircle, AlertCircle, FileCheck, MessageSquare, Scale, ArrowRight } from 'lucide-react';

export default function BuyerProtectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Proteção Total ao Comprador
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Sua segurança é nossa prioridade. Conheça todos os mecanismos que protegem seu investimento.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
            <CheckCircle className="w-5 h-5" />
            100% das transações protegidas
          </div>
        </div>
      </section>

      {/* Sistema Escrow */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Sistema Escrow</h2>
                  <p className="text-white/90">Custódia segura do seu pagamento</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  O <strong>Sistema Escrow</strong> é o coração da nossa proteção ao comprador. Quando você realiza um pagamento, 
                  o valor <strong>não vai diretamente para o vendedor</strong>. Em vez disso, fica retido em uma conta de custódia 
                  segura até que você aprove o trabalho entregue.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="text-4xl mb-3">💳</div>
                    <h3 className="font-bold text-gray-900 mb-2">1. Você Paga</h3>
                    <p className="text-sm text-gray-600">
                      Pagamento vai para conta de custódia segura
                    </p>
                  </div>

                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-4xl mb-3">⏳</div>
                    <h3 className="font-bold text-gray-900 mb-2">2. Trabalho Entregue</h3>
                    <p className="text-sm text-gray-600">
                      Vendedor entrega o projeto conforme acordado
                    </p>
                  </div>

                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="font-bold text-gray-900 mb-2">3. Você Aprova</h3>
                    <p className="text-sm text-gray-600">
                      Pagamento liberado apenas após sua aprovação
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Garantia de Segurança</h4>
                      <p className="text-green-800">
                        Se o trabalho não for entregue ou não atender aos requisitos acordados, 
                        você pode solicitar reembolso total ou parcial através do nosso sistema de disputas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resolução de Disputas */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resolução de Disputas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mediação profissional e imparcial para garantir justiça em todas as transações
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Como Funciona
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <span className="text-gray-700">Abra uma disputa diretamente na plataforma</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <span className="text-gray-700">Nossa equipe analisa toda a comunicação e evidências</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <span className="text-gray-700">Decisão imparcial em até 48 horas úteis</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">4</span>
                  </div>
                  <span className="text-gray-700">Reembolso processado automaticamente se procedente</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Motivos Válidos
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Trabalho não entregue no prazo acordado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Qualidade significativamente abaixo do prometido</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Requisitos acordados não foram atendidos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Vendedor não responde às solicitações de revisão</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Mediação Profissional</h4>
                <p className="text-blue-800">
                  Nossa equipe de mediadores é treinada para analisar cada caso de forma imparcial, 
                  considerando evidências de ambas as partes. O objetivo é sempre encontrar uma solução 
                  justa que proteja os direitos do comprador sem prejudicar vendedores honestos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verificação de Vendedores */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FileCheck className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Verificação de Vendedores</h2>
                  <p className="text-white/90">Aprovação manual rigorosa</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Processo de Verificação</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Documento de identificação com foto obrigatório</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Análise manual de cada cadastro pela nossa equipe</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Verificação de portfólio e experiência profissional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Aprovação pode levar até 48 horas úteis</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Benefícios para Você</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Redução drástica de perfis falsos ou fraudulentos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Maior confiança na qualidade dos profissionais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Garantia de que vendedores são pessoas reais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Rastreabilidade completa em caso de problemas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transações na Plataforma */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-900 mb-3">
                  Importante: Todas as Transações Devem Ocorrer na Plataforma
                </h3>
                <p className="text-red-800 mb-4">
                  Para sua proteção, <strong>NUNCA</strong> realize pagamentos fora da plataforma Easy Jobs. 
                  Transações externas não são protegidas pelo nosso sistema de escrow e você perde todas as garantias.
                </p>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">❌</span>
                    <span>Não aceite solicitações de pagamento via PIX, transferência ou outros métodos externos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">❌</span>
                    <span>Não compartilhe dados bancários ou informações pessoais sensíveis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">✅</span>
                    <span>Sempre use o sistema de pagamento integrado da plataforma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">✅</span>
                    <span>Reporte imediatamente qualquer tentativa de transação externa</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links Úteis */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Recursos Adicionais
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/help-center?topic=refunds"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-purple-600"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Central de Ajuda
              </h3>
              <p className="text-gray-600 mb-4">
                Seção completa sobre reembolsos e disputas
              </p>
              <div className="flex items-center text-purple-600 font-semibold">
                Acessar
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/terms"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-purple-600"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Termos e Condições
              </h3>
              <p className="text-gray-600 mb-4">
                Leia nossos termos completos de uso
              </p>
              <div className="flex items-center text-purple-600 font-semibold">
                Acessar
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/contact"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-purple-600"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Fale Conosco
              </h3>
              <p className="text-gray-600 mb-4">
                Tire suas dúvidas com nossa equipe
              </p>
              <div className="flex items-center text-purple-600 font-semibold">
                Acessar
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Compre com Total Confiança
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Sua segurança é garantida em cada transação. Explore serviços agora!
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg"
          >
            Explorar Serviços
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

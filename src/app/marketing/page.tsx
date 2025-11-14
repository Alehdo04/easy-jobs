'use client';

import { useState } from 'react';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import { Download, Copy, Check, Sparkles } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  target: 'buyer' | 'seller';
  trigger: string;
  message: string;
  color: string;
}

const templates: Template[] = [
  {
    id: 'buyer-security',
    title: 'Segurança para Compradores',
    target: 'buyer',
    trigger: 'Segurança/Medo de Perder Dinheiro',
    message: 'Cansado de contratar freelancers e ser abandonado? No Easy Jobs, seu pagamento só é liberado após você aprovar o serviço. Qualidade, garantia e zero estresse. Encontre seu próximo projeto hoje!',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'buyer-quality',
    title: 'Qualidade Garantida',
    target: 'buyer',
    trigger: 'Qualidade/Confiança',
    message: 'Pare de arriscar com freelancers desconhecidos. No Easy Jobs, todos os profissionais são verificados e você só paga quando estiver 100% satisfeito. Proteção total do início ao fim.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'seller-revenue',
    title: 'Receita para Vendedores',
    target: 'seller',
    trigger: 'Ganho/Facilidade de Renda',
    message: 'Maximize seus ganhos com projetos de alto valor e receba com a proteção total do nosso sistema Escrow. Gerenciamento fácil, pagamentos rápidos. Seu próximo cliente está te esperando no Easy Jobs!',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'seller-protection',
    title: 'Proteção para Vendedores',
    target: 'seller',
    trigger: 'Segurança/Proteção de Pagamento',
    message: 'Chega de trabalhar de graça! No Easy Jobs, o pagamento fica retido em Escrow desde o início. Você trabalha tranquilo sabendo que vai receber. Junte-se a 10.000+ freelancers protegidos.',
    color: 'from-orange-500 to-red-500',
  },
];

export default function MarketingPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [copied, setCopied] = useState(false);
  const [bannerSize, setBannerSize] = useState<'instagram' | 'facebook' | 'linkedin' | 'twitter'>('instagram');

  const sizes = {
    instagram: { width: 1080, height: 1080, label: 'Instagram (1080x1080)' },
    facebook: { width: 1200, height: 630, label: 'Facebook (1200x630)' },
    linkedin: { width: 1200, height: 627, label: 'LinkedIn (1200x627)' },
    twitter: { width: 1200, height: 675, label: 'Twitter (1200x675)' },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTemplate.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Em produção, isso geraria uma imagem real usando canvas ou biblioteca
    alert('Funcionalidade de download será implementada com geração de imagem via canvas/API');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Marketing Outbound</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Gerador de Banners
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Templates psicológicos otimizados para capturar compradores e vendedores. 
            Gere banners profissionais em segundos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Templates List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Templates Disponíveis</h2>
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedTemplate.id === template.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-lg">
                        {template.target === 'buyer' ? '🛒' : '💼'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{template.title}</h3>
                      <p className="text-xs text-gray-500 capitalize">{template.target === 'buyer' ? 'Comprador' : 'Vendedor'}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    <strong>Gatilho:</strong> {template.trigger}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview & Controls */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              {/* Size Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tamanho do Banner
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(sizes).map(([key, size]) => (
                    <button
                      key={key}
                      onClick={() => setBannerSize(key as any)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        bannerSize === key
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {size.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Banner Preview */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preview do Banner
                </label>
                <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ aspectRatio: `${sizes[bannerSize].width}/${sizes[bannerSize].height}` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedTemplate.color} p-8 flex flex-col justify-center items-center text-center`}>
                    <div className="max-w-2xl">
                      <div className="text-white text-4xl font-bold mb-4">Easy Jobs</div>
                      <p className="text-white text-lg sm:text-xl font-medium leading-relaxed mb-6">
                        {selectedTemplate.message}
                      </p>
                      <div className="inline-block px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-lg">
                        {selectedTemplate.target === 'buyer' ? 'Encontrar Freelancers' : 'Começar a Vender'}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {sizes[bannerSize].width} x {sizes[bannerSize].height}px
                </p>
              </div>

              {/* Message Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Texto da Mensagem
                </label>
                <div className="relative">
                  <textarea
                    value={selectedTemplate.message}
                    readOnly
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 resize-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Baixar Banner
                </button>
                <button
                  onClick={handleCopy}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors font-semibold flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar Texto
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Dicas de Uso
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Compradores:</strong> Foque em segurança, garantia e proteção contra fraudes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Vendedores:</strong> Destaque ganhos, facilidade e proteção de pagamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>A/B Testing:</strong> Teste diferentes templates e meça conversão</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Call-to-Action:</strong> Sempre inclua um CTA claro e direto</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

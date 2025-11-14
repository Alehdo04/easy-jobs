'use client';

import { useState } from 'react';
import { Save, Percent, FileText } from 'lucide-react';

export default function SettingsManagement() {
  const [buyerFee, setBuyerFee] = useState('5');
  const [sellerCommission, setSellerCommission] = useState('15');
  const [termsContent, setTermsContent] = useState(
    'Termos e Condições da Plataforma Easy Jobs\n\n1. Aceitação dos Termos\nAo utilizar nossa plataforma, você concorda com estes termos...'
  );
  const [privacyContent, setPrivacyContent] = useState(
    'Política de Privacidade da Easy Jobs\n\n1. Coleta de Dados\nColetamos informações necessárias para o funcionamento da plataforma...'
  );
  const [activeTab, setActiveTab] = useState<'fees' | 'terms' | 'privacy'>('fees');
  const [saved, setSaved] = useState(false);

  const handleSaveFees = () => {
    console.log('Salvando taxas:', { buyerFee, sellerCommission });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveTerms = () => {
    console.log('Salvando termos:', termsContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSavePrivacy = () => {
    console.log('Salvando política:', privacyContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações da Plataforma</h1>
        <p className="text-gray-600 mt-2">Gerencie taxas e documentos legais</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('fees')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'fees'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Percent className="w-5 h-5" />
                <span>Taxas e Comissões</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'terms'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Termos e Condições</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'privacy'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Política de Privacidade</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Fees Tab */}
        {activeTab === 'fees' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Configuração de Taxas</h3>
              <p className="text-sm text-gray-600 mb-6">
                Ajuste as taxas cobradas dos compradores e a comissão dos vendedores
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buyer Fee */}
                <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Percent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Taxa do Comprador</h4>
                      <p className="text-sm text-gray-600">Cobrada sobre o valor do serviço</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={buyerFee}
                      onChange={(e) => setBuyerFee(e.target.value)}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full px-4 py-3 pr-12 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-600">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Exemplo: Em um serviço de R$ 100, o comprador pagará R$ {(100 + (100 * parseFloat(buyerFee || '0') / 100)).toFixed(2)}
                  </p>
                </div>

                {/* Seller Commission */}
                <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Percent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Comissão do Vendedor</h4>
                      <p className="text-sm text-gray-600">Descontada do valor recebido</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={sellerCommission}
                      onChange={(e) => setSellerCommission(e.target.value)}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full px-4 py-3 pr-12 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-600">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Exemplo: Em um serviço de R$ 100, o vendedor receberá R$ {(100 - (100 * parseFloat(sellerCommission || '0') / 100)).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Revenue Calculation */}
              <div className="mt-6 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3">Receita da Plataforma</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Cálculo baseado em um serviço de R$ 100,00
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa do Comprador:</span>
                    <span className="font-semibold text-gray-900">
                      R$ {(100 * parseFloat(buyerFee || '0') / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comissão do Vendedor:</span>
                    <span className="font-semibold text-gray-900">
                      R$ {(100 * parseFloat(sellerCommission || '0') / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-purple-300">
                    <span className="font-bold text-gray-900">Receita Total:</span>
                    <span className="font-bold text-purple-600 text-lg">
                      R$ {((100 * parseFloat(buyerFee || '0') / 100) + (100 * parseFloat(sellerCommission || '0') / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveFees}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Configurações</span>
              </button>
            </div>
          </div>
        )}

        {/* Terms Tab */}
        {activeTab === 'terms' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Termos e Condições</h3>
              <p className="text-sm text-gray-600 mb-4">
                Edite o texto dos Termos e Condições da plataforma
              </p>
              <textarea
                value={termsContent}
                onChange={(e) => setTermsContent(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveTerms}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Termos</span>
              </button>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Política de Privacidade</h3>
              <p className="text-sm text-gray-600 mb-4">
                Edite o texto da Política de Privacidade da plataforma
              </p>
              <textarea
                value={privacyContent}
                onChange={(e) => setPrivacyContent(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSavePrivacy}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Política</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Success Message */}
      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
          <Save className="w-5 h-5" />
          <span>Configurações salvas com sucesso!</span>
        </div>
      )}
    </div>
  );
}

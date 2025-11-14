'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import { User, Shield, CreditCard, Package, CheckCircle, ArrowRight, Upload, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Design Gráfico',
  'Desenvolvimento Web',
  'Redação e Tradução',
  'Marketing Digital',
  'Vídeo e Animação',
  'Música e Áudio',
  'Programação',
  'Consultoria',
  'Fotografia',
  'Outros',
];

export default function BecomeSellerPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    professionalTitle: '',
    description: '',
    categories: [] as string[],
    idDocument: null as File | null,
    pixKey: '',
    accountType: 'pix' as 'pix' | 'bank',
    bankName: '',
    accountNumber: '',
    agencyNumber: '',
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleCategoryToggle = (category: string) => {
    if (formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: formData.categories.filter(c => c !== category),
      });
    } else if (formData.categories.length < 3) {
      setFormData({
        ...formData,
        categories: [...formData.categories, category],
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, idDocument: e.target.files[0] });
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Aqui seria a lógica de envio para o backend
    alert('Cadastro enviado para aprovação! Você receberá um e-mail em até 48 horas.');
    router.push('/');
  };

  const canProceedStep1 = formData.professionalTitle && formData.description && formData.categories.length > 0;
  const canProceedStep2 = formData.idDocument && (formData.accountType === 'pix' ? formData.pixKey : (formData.bankName && formData.accountNumber && formData.agencyNumber));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Comece a Vender no Easy Jobs
          </h1>
          <p className="text-xl text-white/90">
            Transforme suas habilidades em renda. Processo simples em 3 etapas.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-600">
              Etapa {currentStep} de {totalSteps}
            </span>
            <span className="text-sm font-semibold text-purple-600">
              {Math.round(progress)}% Completo
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className={`text-center ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                <User className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold">Dados Profissionais</span>
            </div>
            <div className={`text-center ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold">Segurança e Pagamento</span>
            </div>
            <div className={`text-center ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                <Package className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold">Primeiro Gig</span>
            </div>
          </div>
        </div>

        {/* Step 1: Dados Profissionais */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dados Profissionais</h2>
                <p className="text-gray-600">Conte-nos sobre sua experiência</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título Profissional *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Designer Gráfico Especializado em Logos"
                  value={formData.professionalTitle}
                  onChange={(e) => setFormData({ ...formData, professionalTitle: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descrição Profissional *
                </label>
                <textarea
                  placeholder="Descreva sua experiência, habilidades e o que você oferece..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.description.length}/500 caracteres
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categorias de Atuação * (Máximo 3)
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      disabled={!formData.categories.includes(category) && formData.categories.length >= 3}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        formData.categories.includes(category)
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-purple-600'
                      } ${!formData.categories.includes(category) && formData.categories.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {formData.categories.length}/3 selecionadas
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    <strong>Dica:</strong> Seja específico e honesto sobre suas habilidades. 
                    Isso ajuda a atrair os clientes certos e aumenta suas chances de aprovação.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleNext}
                disabled={!canProceedStep1}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                  canProceedStep1
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Próxima Etapa
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Segurança e Pagamento */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Segurança e Pagamento</h2>
                <p className="text-gray-600">Verificação de identidade e dados de recebimento</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Upload de Documento */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Documento de Identificação * (RG, CNH ou Passaporte)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-600 transition-all">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="id-upload"
                  />
                  <label htmlFor="id-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    {formData.idDocument ? (
                      <p className="text-green-600 font-semibold">
                        ✓ {formData.idDocument.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-gray-700 font-semibold mb-1">
                          Clique para fazer upload
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG ou PDF (máx. 5MB)
                        </p>
                      </>
                    )}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  🔒 Seus dados são criptografados e usados apenas para verificação de identidade
                </p>
              </div>

              {/* Método de Pagamento */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Como deseja receber seus pagamentos? *
                </label>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => setFormData({ ...formData, accountType: 'pix' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.accountType === 'pix'
                        ? 'bg-purple-50 border-purple-600'
                        : 'bg-white border-gray-300 hover:border-purple-600'
                    }`}
                  >
                    <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">PIX</p>
                    <p className="text-xs text-gray-500">Receba em minutos</p>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, accountType: 'bank' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.accountType === 'bank'
                        ? 'bg-purple-50 border-purple-600'
                        : 'bg-white border-gray-300 hover:border-purple-600'
                    }`}
                  >
                    <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">Conta Bancária</p>
                    <p className="text-xs text-gray-500">Transferência tradicional</p>
                  </button>
                </div>

                {formData.accountType === 'pix' ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chave PIX *
                    </label>
                    <input
                      type="text"
                      placeholder="CPF, e-mail, telefone ou chave aleatória"
                      value={formData.pixKey}
                      onChange={(e) => setFormData({ ...formData, pixKey: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Banco *
                      </label>
                      <input
                        type="text"
                        placeholder="Nome do banco"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Agência *
                        </label>
                        <input
                          type="text"
                          placeholder="0000"
                          value={formData.agencyNumber}
                          onChange={(e) => setFormData({ ...formData, agencyNumber: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Conta *
                        </label>
                        <input
                          type="text"
                          placeholder="00000-0"
                          value={formData.accountNumber}
                          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Certifique-se de que todos os dados estão corretos. 
                    Informações incorretas podem atrasar seus pagamentos.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Voltar
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedStep2}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                  canProceedStep2
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Próxima Etapa
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmação */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Quase Lá!
              </h2>
              <p className="text-lg text-gray-600">
                Seu cadastro está pronto para ser enviado
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Resumo do Cadastro</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Título Profissional:</span>
                  <span className="font-semibold text-gray-900">{formData.professionalTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categorias:</span>
                  <span className="font-semibold text-gray-900">{formData.categories.length} selecionadas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documento:</span>
                  <span className="font-semibold text-gray-900">✓ Enviado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Método de Pagamento:</span>
                  <span className="font-semibold text-gray-900">{formData.accountType === 'pix' ? 'PIX' : 'Conta Bancária'}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Próximos Passos</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span>1.</span>
                      <span>Sua conta será analisada pela nossa equipe em até <strong>48 horas úteis</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>2.</span>
                      <span>Você receberá um <strong>e-mail de confirmação</strong> quando for aprovado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>3.</span>
                      <span>Após aprovação, você poderá <strong>criar e publicar seus Gigs</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-green-900 mb-2">Compromisso de Veracidade</h4>
                  <p className="text-sm text-green-800">
                    Ao enviar este cadastro, você confirma que todas as informações fornecidas são 
                    verdadeiras e precisas. Informações falsas podem resultar em recusa ou banimento permanente.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Enviar para Aprovação
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

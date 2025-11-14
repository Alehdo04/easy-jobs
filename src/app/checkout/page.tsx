'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CreditCard, QrCode, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

// Simulação de dados do serviço (em produção viria de props ou API)
const mockService = {
  id: '1',
  title: 'Logo Profissional Moderno',
  sellerName: 'Maria Designer',
  basePrice: 100.00,
};

type PaymentMethod = 'pix' | 'credit_card' | null;

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Cálculo de taxas
  const basePrice = mockService.basePrice;
  const buyerFee = basePrice * 0.05; // 5% taxa do comprador
  const totalPrice = basePrice + buyerFee;

  // Dados do cartão
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // PIX
  const [pixCode] = useState('00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000');
  const [pixQRCode] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatação automática
    let formattedValue = value;
    
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardData({ ...cardData, [name]: formattedValue });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!paymentMethod) {
        throw new Error('Selecione um método de pagamento');
      }

      if (paymentMethod === 'credit_card') {
        // Validações do cartão
        if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
          throw new Error('Preencha todos os dados do cartão');
        }

        // Simulação de processamento de cartão
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Aqui integraria com gateway de pagamento real (Stripe, Pagar.me, etc)
        console.log('Processando pagamento com cartão:', cardData);
      } else if (paymentMethod === 'pix') {
        // Simulação de verificação PIX
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Aqui verificaria o pagamento PIX via webhook do gateway
        console.log('Aguardando confirmação PIX');
      }

      setSuccess(true);
      
      // Redirecionar após sucesso
      setTimeout(() => {
        router.push('/orders/success');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    alert('Código PIX copiado!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Marketplace
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Finalizar Compra</h1>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-green-800 font-medium">Pagamento processado com sucesso!</p>
                      <p className="text-green-700 text-sm mt-1">
                        Redirecionando para seus pedidos...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Método de Pagamento</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* PIX */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-6 border-2 rounded-xl transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="w-8 h-8 text-purple-600" />
                      <div className="text-left">
                        <p className="font-bold text-gray-900">PIX</p>
                        <p className="text-sm text-gray-600">Aprovação instantânea</p>
                      </div>
                    </div>
                  </button>

                  {/* Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-6 border-2 rounded-xl transition-all ${
                      paymentMethod === 'credit_card'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-8 h-8 text-purple-600" />
                      <div className="text-left">
                        <p className="font-bold text-gray-900">Cartão de Crédito</p>
                        <p className="text-sm text-gray-600">Visa, Master, Elo</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* PIX Payment */}
              {paymentMethod === 'pix' && (
                <div className="space-y-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4 text-center">Pague com PIX</h3>
                    
                    {/* QR Code */}
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <img
                        src={pixQRCode}
                        alt="QR Code PIX"
                        className="w-48 h-48 mx-auto"
                      />
                    </div>

                    {/* PIX Code */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700 font-medium">Código PIX Copia e Cola:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={pixCode}
                          readOnly
                          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          type="button"
                          onClick={copyPixCode}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Copiar
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        ⏱️ O pagamento será confirmado automaticamente em até 10 segundos após a aprovação.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Verificando Pagamento...' : 'Já Paguei'}
                  </button>
                </div>
              )}

              {/* Credit Card Payment */}
              {paymentMethod === 'credit_card' && (
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={cardData.number}
                      onChange={handleCardChange}
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={cardData.name}
                      onChange={handleCardChange}
                      placeholder="NOME COMO NO CARTÃO"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        maxLength={5}
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        maxLength={3}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      🔒 Seus dados estão protegidos com criptografia SSL de 256 bits
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Processando...' : `Pagar R$ ${totalPrice.toFixed(2)}`}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

              {/* Service Info */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="font-medium text-gray-900 mb-2">{mockService.title}</p>
                <p className="text-sm text-gray-600">por {mockService.sellerName}</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Preço do Serviço</span>
                  <span>R$ {basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxa de Serviço (5%)</span>
                  <span>R$ {buyerFee.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Escrow Info */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-800">
                  <strong>🔒 Pagamento Seguro:</strong> Seu dinheiro fica retido até a entrega do serviço. Você só libera o pagamento após aprovar o trabalho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

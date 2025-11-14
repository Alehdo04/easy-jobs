'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Clock, RefreshCw, Shield, MessageCircle, Heart, Share2, CheckCircle } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { MOCK_SERVICES } from '@/lib/mock-data';
import { formatCurrency, calculatePriceBreakdown } from '@/lib/constants';

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const service = MOCK_SERVICES.find(s => s.id === serviceId);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Serviço não encontrado</h1>
          <Link href="/marketplace" className="text-purple-600 hover:underline">
            Voltar para o marketplace
          </Link>
        </div>
      </div>
    );
  }

  const priceBreakdown = calculatePriceBreakdown(service.basePrice);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-purple-600">Início</Link>
          <span className="mx-2">/</span>
          <Link href="/marketplace" className="hover:text-purple-600">Marketplace</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{service.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
              <div className="relative h-96 bg-gray-200">
                <img
                  src={service.images[selectedImage]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {service.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {service.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-purple-600 ring-2 ring-purple-600'
                          : 'border-gray-200 hover:border-purple-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>

              {/* Seller Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  {service.sellerAvatar && (
                    <img
                      src={service.sellerAvatar}
                      alt={service.sellerName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{service.sellerName}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {service.sellerRating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({service.reviewCount} avaliações)
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                  Ver Perfil
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Sobre este serviço</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">O que está incluído</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                    <Clock className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Entrega</p>
                      <p className="text-xs text-gray-600">{service.deliveryTime} dias</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                    <RefreshCw className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Revisões</p>
                      <p className="text-xs text-gray-600">{service.revisions} incluídas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                    <Shield className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Garantia</p>
                      <p className="text-xs text-gray-600">Pagamento seguro</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Avaliações</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold text-gray-900">{service.rating}</span>
                  <span className="text-gray-500">({service.reviewCount} avaliações)</span>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {[
                  {
                    name: 'João Silva',
                    rating: 5,
                    date: '2 dias atrás',
                    comment: 'Trabalho excepcional! Superou minhas expectativas. Entrega rápida e comunicação excelente.',
                  },
                  {
                    name: 'Maria Santos',
                    rating: 5,
                    date: '1 semana atrás',
                    comment: 'Profissional muito competente. Fez exatamente o que eu precisava e ainda deu sugestões valiosas.',
                  },
                  {
                    name: 'Pedro Costa',
                    rating: 4,
                    date: '2 semanas atrás',
                    comment: 'Bom trabalho no geral. Pequenos ajustes foram necessários mas o resultado final ficou ótimo.',
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {review.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Order Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatCurrency(priceBreakdown.buyerPays)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Valor base: {formatCurrency(service.basePrice)} + Taxa de serviço (5%)
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="bg-purple-50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Detalhamento do Preço</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor do serviço</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(priceBreakdown.basePrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxa de serviço (5%)</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(priceBreakdown.buyerFee)}
                      </span>
                    </div>
                    <div className="border-t border-purple-200 pt-2 flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-purple-600">
                        {formatCurrency(priceBreakdown.buyerPays)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg mb-3">
                  Contratar Agora
                </button>

                <button className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors font-semibold flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contatar Vendedor
                </button>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Salvar</span>
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Compartilhar</span>
                  </button>
                </div>
              </div>

              {/* Seller Earnings Info */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  O vendedor receberá
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor do serviço</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(priceBreakdown.basePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comissão (20%)</span>
                    <span className="font-semibold text-red-600">
                      - {formatCurrency(priceBreakdown.sellerFee)}
                    </span>
                  </div>
                  <div className="border-t border-green-200 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Receita líquida</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(priceBreakdown.sellerReceives)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

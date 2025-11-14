// Easy Jobs - Constantes do Sistema

import { ServiceCategory } from './types';

// Taxas da Plataforma
export const PLATFORM_FEES = {
  SELLER_FEE_PERCENT: 20, // 20% de comissão do vendedor
  BUYER_FEE_PERCENT: 5, // 5% de taxa do comprador
} as const;

// Categorias de Serviço
export const SERVICE_CATEGORIES = [
  {
    id: 'design' as ServiceCategory,
    name: 'Design Gráfico',
    icon: 'Palette',
    description: 'Logos, banners, identidade visual e mais',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'writing' as ServiceCategory,
    name: 'Redação',
    icon: 'PenTool',
    description: 'Artigos, copywriting, tradução e conteúdo',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'video' as ServiceCategory,
    name: 'Edição de Vídeo',
    icon: 'Video',
    description: 'Edição, motion graphics e animação',
    color: 'from-orange-500 to-red-500',
  },
] as const;

// Idiomas Suportados
export const SUPPORTED_LANGUAGES = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
] as const;

// Funções Utilitárias
export function calculatePriceBreakdown(basePrice: number) {
  const sellerFee = (basePrice * PLATFORM_FEES.SELLER_FEE_PERCENT) / 100;
  const buyerFee = (basePrice * PLATFORM_FEES.BUYER_FEE_PERCENT) / 100;
  const sellerReceives = basePrice - sellerFee;
  const buyerPays = basePrice + buyerFee;
  const platformEarns = sellerFee + buyerFee;

  return {
    basePrice,
    sellerFee,
    buyerFee,
    sellerReceives,
    buyerPays,
    platformEarns,
  };
}

export function formatCurrency(value: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
}

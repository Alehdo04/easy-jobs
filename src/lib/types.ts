// Easy Jobs - Tipos do Sistema

export type UserRole = 'buyer' | 'seller' | 'both';

export type ServiceCategory = 'design' | 'writing' | 'video';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

export interface Service {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  sellerRating: number;
  title: string;
  description: string;
  category: ServiceCategory;
  basePrice: number; // Valor base do serviço
  deliveryTime: number; // Em dias
  revisions: number;
  images: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  ordersInQueue: number;
  createdAt: Date;
}

export interface PriceBreakdown {
  basePrice: number;
  sellerFee: number; // Taxa do vendedor (20%)
  buyerFee: number; // Taxa do comprador (5%)
  sellerReceives: number; // Valor líquido do vendedor
  buyerPays: number; // Valor bruto que o comprador paga
  platformEarns: number; // Total de comissão da plataforma
}

export interface Order {
  id: string;
  serviceId: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'in_progress' | 'delivered' | 'completed' | 'disputed' | 'cancelled';
  priceBreakdown: PriceBreakdown;
  createdAt: Date;
  deliveredAt?: Date;
  completedAt?: Date;
}

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

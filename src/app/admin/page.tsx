'use client';

import { useEffect, useState } from 'react';
import { checkAdminAccess, AdminRole } from '@/lib/admin-auth';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalSellers: number;
  pendingApprovals: number;
  totalGigs: number;
  pendingGigs: number;
  activeGigs: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayouts: number;
  activeDisputes: number;
}

export default function AdminDashboard() {
  const [userRole, setUserRole] = useState<AdminRole | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1247,
    totalSellers: 342,
    pendingApprovals: 23,
    totalGigs: 856,
    pendingGigs: 15,
    activeGigs: 789,
    totalRevenue: 125430.50,
    monthlyRevenue: 18750.25,
    pendingPayouts: 12,
    activeDisputes: 5,
  });

  useEffect(() => {
    async function loadUserRole() {
      const { role } = await checkAdminAccess();
      setUserRole(role || null);
    }
    loadUserRole();
  }, []);

  const statCards = [
    {
      title: 'Total de Usuários',
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500',
      permission: 'view_users',
    },
    {
      title: 'Vendedores Ativos',
      value: stats.totalSellers.toLocaleString(),
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-green-500',
      permission: 'view_users',
    },
    {
      title: 'Aprovações Pendentes',
      value: stats.pendingApprovals.toLocaleString(),
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-yellow-500',
      permission: 'approve_sellers',
    },
    {
      title: 'Total de Serviços',
      value: stats.totalGigs.toLocaleString(),
      icon: <Briefcase className="w-6 h-6" />,
      color: 'bg-purple-500',
      permission: 'view_gigs',
    },
    {
      title: 'Serviços Pendentes',
      value: stats.pendingGigs.toLocaleString(),
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'bg-orange-500',
      permission: 'approve_gigs',
    },
    {
      title: 'Serviços Ativos',
      value: stats.activeGigs.toLocaleString(),
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-teal-500',
      permission: 'view_gigs',
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-emerald-500',
      permission: 'view_finance',
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${stats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-cyan-500',
      permission: 'view_finance',
    },
  ];

  const hasPermission = (permission: string) => {
    if (!userRole) return false;
    const permissions: Record<AdminRole, string[]> = {
      admin: ['view_users', 'approve_sellers', 'view_gigs', 'approve_gigs', 'view_finance'],
      moderator: ['view_users', 'view_gigs', 'approve_gigs'],
    };
    return permissions[userRole]?.includes(permission) || false;
  };

  const filteredStats = statCards.filter(card => hasPermission(card.permission));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-2">Visão geral da plataforma Easy Jobs</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {userRole === 'admin' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/users"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-gray-900">Gerenciar Usuários</p>
            </a>
            <a
              href="/admin/gigs"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
            >
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold text-gray-900">Revisar Serviços</p>
            </a>
            <a
              href="/admin/finance"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
            >
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold text-gray-900">Gestão Financeira</p>
            </a>
            <a
              href="/admin/disputes"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-center"
            >
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-semibold text-gray-900">Resolver Disputas</p>
            </a>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Novo vendedor aguardando aprovação</p>
              <p className="text-xs text-gray-500 mt-1">João Silva - há 5 minutos</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Serviço aprovado e publicado</p>
              <p className="text-xs text-gray-500 mt-1">Design de Logo Profissional - há 12 minutos</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Nova disputa aberta</p>
              <p className="text-xs text-gray-500 mt-1">Pedido #1234 - há 1 hora</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

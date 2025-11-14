'use client';

import { useState } from 'react';
import { Plus, Eye, MousePointer, DollarSign, Edit, Trash2, BarChart3 } from 'lucide-react';

interface AdSlot {
  id: string;
  type: 'banner_home' | 'native_category';
  title: string;
  advertiser: string;
  status: 'active' | 'paused' | 'expired';
  impressions: number;
  clicks: number;
  ctr: number;
  revenue: number;
  start_date: string;
  end_date: string;
  image_url?: string;
  target_url?: string;
  category?: string;
}

export default function AdminAdsPage() {
  const [ads, setAds] = useState<AdSlot[]>([
    {
      id: '1',
      type: 'banner_home',
      title: 'Banner Principal - Tech Tools',
      advertiser: 'Tech Solutions Inc.',
      status: 'active',
      impressions: 48523,
      clicks: 2038,
      ctr: 4.2,
      revenue: 15000,
      start_date: '2024-01-01',
      end_date: '2024-03-31',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=300&fit=crop',
      target_url: 'https://techsolutions.com',
    },
    {
      id: '2',
      type: 'native_category',
      title: 'Anúncio Nativo - Design',
      advertiser: 'Creative Studio',
      status: 'active',
      impressions: 28450,
      clicks: 1195,
      ctr: 4.2,
      revenue: 8000,
      start_date: '2024-01-15',
      end_date: '2024-04-15',
      category: 'Design',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalRevenue = ads.reduce((sum, ad) => sum + ad.revenue, 0);
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const avgCTR = totalClicks > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'banner_home':
        return 'Banner Home';
      case 'native_category':
        return 'Anúncio Nativo';
      default:
        return type;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Anúncios</h1>
        <p className="text-gray-600">
          Gerencie slots de anúncios premium e acompanhe performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Receita Total</span>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            R$ {totalRevenue.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-gray-500 mt-1">Este mês</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Impressões</span>
            <Eye className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totalImpressions.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-gray-500 mt-1">Total acumulado</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Cliques</span>
            <MousePointer className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totalClicks.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-gray-500 mt-1">Total acumulado</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">CTR Médio</span>
            <BarChart3 className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{avgCTR}%</div>
          <p className="text-xs text-gray-500 mt-1">Taxa de clique</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Anúncio
          </button>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="paused">Pausados</option>
            <option value="expired">Expirados</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">Todos os Tipos</option>
            <option value="banner_home">Banner Home</option>
            <option value="native_category">Anúncio Nativo</option>
          </select>
        </div>
      </div>

      {/* Ads List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anúncio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receita
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{ad.title}</div>
                      <div className="text-sm text-gray-500">{ad.advertiser}</div>
                      {ad.category && (
                        <div className="text-xs text-gray-400 mt-1">Categoria: {ad.category}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                      {getTypeLabel(ad.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${getStatusColor(ad.status)}`}>
                      {ad.status === 'active' ? 'Ativo' : ad.status === 'paused' ? 'Pausado' : 'Expirado'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span>{ad.impressions.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <MousePointer className="w-4 h-4" />
                        <span>{ad.clicks.toLocaleString('pt-BR')}</span>
                        <span className="text-xs text-gray-400">({ad.ctr}% CTR)</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      R$ {ad.revenue.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-500">por mês</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      <div>{new Date(ad.start_date).toLocaleDateString('pt-BR')}</div>
                      <div className="text-xs text-gray-400">
                        até {new Date(ad.end_date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Slots Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Banner Home</h3>
          <p className="text-sm text-gray-600 mb-4">
            Slot premium na página inicial. Apenas 1 disponível.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-600">R$ 15.000/mês</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              1 Ativo
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Anúncios Nativos</h3>
          <p className="text-sm text-gray-600 mb-4">
            Máximo 2 slots por categoria. Integração natural.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-600">R$ 8.000/mês</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              1 Ativo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

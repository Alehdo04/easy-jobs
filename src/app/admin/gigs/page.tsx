'use client';

import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Pause, Play, Eye, Edit } from 'lucide-react';

interface Gig {
  id: string;
  title: string;
  seller: string;
  category: string;
  price: number;
  status: 'pending' | 'active' | 'paused' | 'rejected';
  createdAt: string;
  orders: number;
  rating: number;
}

export default function GigsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'active' | 'paused' | 'rejected'>('all');
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [gigs] = useState<Gig[]>([
    {
      id: '1',
      title: 'Design de Logo Profissional',
      seller: 'Maria Santos',
      category: 'Design Gráfico',
      price: 250,
      status: 'pending',
      createdAt: '2024-01-20',
      orders: 0,
      rating: 0,
    },
    {
      id: '2',
      title: 'Desenvolvimento de Site Responsivo',
      seller: 'João Silva',
      category: 'Programação',
      price: 1500,
      status: 'active',
      createdAt: '2024-01-15',
      orders: 23,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'Edição de Vídeo Profissional',
      seller: 'Pedro Costa',
      category: 'Vídeo & Animação',
      price: 500,
      status: 'active',
      createdAt: '2024-01-10',
      orders: 45,
      rating: 4.9,
    },
    {
      id: '4',
      title: 'Consultoria de Marketing Digital',
      seller: 'Ana Oliveira',
      category: 'Marketing',
      price: 800,
      status: 'paused',
      createdAt: '2024-01-05',
      orders: 12,
      rating: 4.5,
    },
  ]);

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || gig.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      paused: 'bg-gray-100 text-gray-800',
      rejected: 'bg-red-100 text-red-800',
    };
    const labels = {
      active: 'Ativo',
      pending: 'Pendente',
      paused: 'Pausado',
      rejected: 'Rejeitado',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleApprove = (gigId: string) => {
    console.log('Aprovar gig:', gigId);
  };

  const handleReject = (gigId: string) => {
    console.log('Rejeitar gig:', gigId);
  };

  const handlePause = (gigId: string) => {
    console.log('Pausar gig:', gigId);
  };

  const handleActivate = (gigId: string) => {
    console.log('Ativar gig:', gigId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Serviços</h1>
        <p className="text-gray-600 mt-2">Revise, aprove e gerencie todos os serviços da plataforma</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título ou vendedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendentes</option>
              <option value="active">Ativos</option>
              <option value="paused">Pausados</option>
              <option value="rejected">Rejeitados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gigs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vendedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pedidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGigs.map((gig) => (
                <tr key={gig.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{gig.title}</div>
                    <div className="text-xs text-gray-500">
                      Criado em {new Date(gig.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {gig.seller}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {gig.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    R$ {gig.price.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(gig.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {gig.orders}
                    {gig.rating > 0 && (
                      <div className="text-xs text-yellow-600">★ {gig.rating}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedGig(gig);
                          setShowModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {gig.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(gig.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Aprovar"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(gig.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Rejeitar"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {gig.status === 'active' && (
                        <button
                          onClick={() => handlePause(gig.id)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Pausar"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      )}
                      {gig.status === 'paused' && (
                        <button
                          onClick={() => handleActivate(gig.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Ativar"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gig Details Modal */}
      {showModal && selectedGig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Detalhes do Serviço</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Título</label>
                <p className="text-gray-900">{selectedGig.title}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Vendedor</label>
                <p className="text-gray-900">{selectedGig.seller}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Categoria</label>
                <p className="text-gray-900">{selectedGig.category}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Preço</label>
                <p className="text-gray-900">R$ {selectedGig.price.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Status</label>
                <div className="mt-1">{getStatusBadge(selectedGig.status)}</div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Total de Pedidos</label>
                <p className="text-gray-900">{selectedGig.orders}</p>
              </div>
              {selectedGig.rating > 0 && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Avaliação</label>
                  <p className="text-gray-900">★ {selectedGig.rating} / 5.0</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fechar
              </button>
              {selectedGig.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedGig.id);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Aprovar
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedGig.id);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Rejeitar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

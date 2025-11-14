'use client';

import { useState } from 'react';
import { Scale, MessageSquare, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Dispute {
  id: string;
  orderId: string;
  buyer: string;
  seller: string;
  gig: string;
  amount: number;
  reason: string;
  status: 'open' | 'in_review' | 'resolved';
  createdAt: string;
  messages: { sender: string; message: string; date: string }[];
}

export default function DisputesManagement() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [resolution, setResolution] = useState<'buyer' | 'seller' | 'partial' | null>(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [notes, setNotes] = useState('');

  const [disputes] = useState<Dispute[]>([
    {
      id: '1',
      orderId: '#1234',
      buyer: 'Pedro Costa',
      seller: 'Maria Santos',
      gig: 'Design de Logo Profissional',
      amount: 250,
      reason: 'Trabalho não entregue no prazo acordado',
      status: 'open',
      createdAt: '2024-01-20',
      messages: [
        { sender: 'Pedro Costa', message: 'O trabalho não foi entregue no prazo de 5 dias como combinado.', date: '2024-01-20 10:30' },
        { sender: 'Maria Santos', message: 'Tive um problema pessoal, mas já estou finalizando o trabalho.', date: '2024-01-20 14:15' },
      ],
    },
    {
      id: '2',
      orderId: '#1235',
      buyer: 'Ana Oliveira',
      seller: 'João Silva',
      gig: 'Desenvolvimento de Site',
      amount: 1500,
      reason: 'Trabalho não corresponde ao solicitado',
      status: 'in_review',
      createdAt: '2024-01-19',
      messages: [
        { sender: 'Ana Oliveira', message: 'O site não ficou como o mockup aprovado.', date: '2024-01-19 09:00' },
        { sender: 'João Silva', message: 'Posso fazer as correções necessárias.', date: '2024-01-19 11:30' },
      ],
    },
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-red-100 text-red-800',
      in_review: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
    };
    const labels = {
      open: 'Aberta',
      in_review: 'Em Análise',
      resolved: 'Resolvida',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleResolve = () => {
    if (!resolution) {
      alert('Selecione uma resolução');
      return;
    }

    console.log('Resolução:', {
      disputeId: selectedDispute?.id,
      resolution,
      refundAmount: resolution === 'partial' ? refundAmount : null,
      notes,
    });

    setShowModal(false);
    setResolution(null);
    setRefundAmount('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resolução de Disputas</h1>
        <p className="text-gray-600 mt-2">Analise e resolva disputas entre compradores e vendedores</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Disputas Abertas</h3>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Em Análise</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Resolvidas (Mês)</h3>
          <p className="text-2xl font-bold text-gray-900">28</p>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Comprador
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vendedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {disputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{dispute.orderId}</div>
                    <div className="text-xs text-gray-500">{dispute.gig}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dispute.buyer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dispute.seller}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    R$ {dispute.amount.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(dispute.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(dispute.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => {
                        setSelectedDispute(dispute);
                        setShowModal(true);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Scale className="w-4 h-4" />
                      <span>Analisar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispute Resolution Modal */}
      {showModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Resolução de Disputa</h2>
              <p className="text-sm text-gray-600 mt-1">Pedido {selectedDispute.orderId}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Dispute Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Comprador</label>
                  <p className="text-gray-900">{selectedDispute.buyer}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Vendedor</label>
                  <p className="text-gray-900">{selectedDispute.seller}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Serviço</label>
                  <p className="text-gray-900">{selectedDispute.gig}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Valor</label>
                  <p className="text-gray-900">R$ {selectedDispute.amount.toLocaleString('pt-BR')}</p>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-sm font-semibold text-gray-600">Motivo da Disputa</label>
                <p className="text-gray-900 mt-1">{selectedDispute.reason}</p>
              </div>

              {/* Messages */}
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-3 block">Comunicação</label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedDispute.messages.map((msg, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900">{msg.sender}</span>
                        <span className="text-xs text-gray-500">{msg.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution Options */}
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-3 block">Resolução</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="resolution"
                      value="buyer"
                      checked={resolution === 'buyer'}
                      onChange={(e) => setResolution(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Reembolso Total ao Comprador</p>
                      <p className="text-sm text-gray-600">O comprador receberá 100% do valor de volta</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="resolution"
                      value="seller"
                      checked={resolution === 'seller'}
                      onChange={(e) => setResolution(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Liberar Pagamento ao Vendedor</p>
                      <p className="text-sm text-gray-600">O vendedor receberá o pagamento integral</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="resolution"
                      value="partial"
                      checked={resolution === 'partial'}
                      onChange={(e) => setResolution(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Reembolso Parcial</p>
                      <p className="text-sm text-gray-600 mb-2">Especifique o valor do reembolso</p>
                      {resolution === 'partial' && (
                        <input
                          type="number"
                          value={refundAmount}
                          onChange={(e) => setRefundAmount(e.target.value)}
                          placeholder="Valor do reembolso"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Observações da Decisão</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Explique o motivo da sua decisão..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setResolution(null);
                  setRefundAmount('');
                  setNotes('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleResolve}
                disabled={!resolution}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Resolução
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

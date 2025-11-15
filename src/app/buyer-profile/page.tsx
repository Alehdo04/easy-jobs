"use client";

import { useState } from "react";
import {
  User,
  ShoppingBag,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Edit,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Lock,
  Plus,
  Trash2,
  Check,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";

type Section =
  | "overview"
  | "purchases"
  | "personal"
  | "payment"
  | "notifications"
  | "help";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  productName: string;
  date: string;
  amount: number;
  status: OrderStatus;
}

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  lastFour: string;
  isDefault: boolean;
}

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export default function BuyerProfilePage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  // Mock data
  const [userData, setUserData] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    totalPurchases: 12,
    lastPurchase: "5 dias atrás",
  });

  // Função para gerar iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const [orders] = useState<Order[]>([
    {
      id: "1",
      productName: "Design de Logo Profissional",
      date: "2024-01-10",
      amount: 250.0,
      status: "delivered",
    },
    {
      id: "2",
      productName: "Desenvolvimento de Site WordPress",
      date: "2024-01-08",
      amount: 1200.0,
      status: "processing",
    },
    {
      id: "3",
      productName: "Edição de Vídeo para YouTube",
      date: "2024-01-05",
      amount: 450.0,
      status: "shipped",
    },
    {
      id: "4",
      productName: "Consultoria de Marketing Digital",
      date: "2023-12-28",
      amount: 800.0,
      status: "delivered",
    },
    {
      id: "5",
      productName: "Tradução de Documentos (EN-PT)",
      date: "2023-12-20",
      amount: 180.0,
      status: "cancelled",
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", type: "visa", lastFour: "4532", isDefault: true },
    { id: "2", type: "mastercard", lastFour: "8765", isDefault: false },
  ]);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Casa",
      street: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      isDefault: true,
    },
    {
      id: "2",
      label: "Trabalho",
      street: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      isDefault: false,
    },
  ]);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    reminders: true,
  });

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return <Package className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "Em processamento";
      case "shipped":
        return "Enviado";
      case "delivered":
        return "Entregue";
      case "cancelled":
        return "Cancelado";
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const menuItems = [
    { id: "overview" as Section, label: "Visão Geral", icon: User },
    { id: "purchases" as Section, label: "Minhas Compras", icon: ShoppingBag },
    { id: "personal" as Section, label: "Dados Pessoais", icon: User },
    { id: "payment" as Section, label: "Métodos de Pagamento", icon: CreditCard },
    {
      id: "notifications" as Section,
      label: "Notificações",
      icon: Bell,
    },
    { id: "help" as Section, label: "Ajuda e Suporte", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-72 min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl">
          <div className="p-6 border-b border-blue-700">
            <div className="flex items-center gap-4">
              {/* Avatar com iniciais - sem dependência de API externa */}
              <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {getInitials(userData.name)}
              </div>
              <div>
                <h2 className="font-bold text-lg">{userData.name}</h2>
                <p className="text-blue-200 text-sm">{userData.email}</p>
              </div>
            </div>
          </div>

          <nav className="p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-white text-blue-900 shadow-lg"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mt-8 text-white hover:bg-red-600 transition-all duration-200">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Visão Geral do Perfil
                  </h1>
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Edit className="w-5 h-5" />
                    Editar Perfil
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-blue-100 rounded-xl">
                        <ShoppingBag className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Total de Compras</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {userData.totalPurchases}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-green-100 rounded-xl">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Última Compra</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {userData.lastPurchase}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-purple-100 rounded-xl">
                        <CreditCard className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Métodos de Pagamento</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {paymentMethods.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Atividades Recentes
                  </h2>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon(order.status)}
                          <div>
                            <p className="font-semibold text-gray-900">
                              {order.productName}
                            </p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            R$ {order.amount.toFixed(2)}
                          </p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Purchases Section */}
            {activeSection === "purchases" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Minhas Compras</h1>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar por nome do produto..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="relative">
                      <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) =>
                          setStatusFilter(e.target.value as OrderStatus | "all")
                        }
                        className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="all">Todos os Status</option>
                        <option value="processing">Em processamento</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregue</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200"
                      >
                        <div className="flex items-start gap-4 mb-4 md:mb-0">
                          <div
                            className={`p-3 rounded-xl ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {order.productName}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              Data da compra: {order.date}
                            </p>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusText(order.status)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Valor Total</p>
                            <p className="text-2xl font-bold text-gray-900">
                              R$ {order.amount.toFixed(2)}
                            </p>
                          </div>
                          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap">
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">
                        Nenhuma compra encontrada
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Personal Data Section */}
            {activeSection === "personal" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Dados Pessoais</h1>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Informações Básicas
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Senha
                      </label>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                        <Lock className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">
                          Alterar Senha
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Endereços de Entrega
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
                      <Plus className="w-5 h-5" />
                      Adicionar Endereço
                    </button>
                  </div>

                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-gray-900">
                                  {address.label}
                                </h3>
                                {address.isDefault && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                    Padrão
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700">{address.street}</p>
                              <p className="text-gray-600">
                                {address.city}, {address.state} - {address.zipCode}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}

            {/* Payment Methods Section */}
            {activeSection === "payment" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Métodos de Pagamento
                </h1>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Cartões Salvos
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
                      <Plus className="w-5 h-5" />
                      Adicionar Cartão
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="relative p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl text-white"
                      >
                        {method.isDefault && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Padrão
                            </span>
                          </div>
                        )}

                        <div className="mb-8">
                          <p className="text-blue-200 text-sm mb-2">
                            {method.type.toUpperCase()}
                          </p>
                          <p className="text-2xl font-bold tracking-wider">
                            •••• •••• •••• {method.lastFour}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-200 text-xs">Titular</p>
                            <p className="font-medium">{userData.name}</p>
                          </div>

                          <div className="flex gap-2">
                            <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-all duration-200">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Configurações de Notificação
                </h1>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Preferências de E-mail
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Atualizações de Pedido
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Receba notificações sobre o status dos seus pedidos
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.orderUpdates}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              orderUpdates: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <Bell className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Novidades e Promoções
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Fique por dentro de ofertas especiais e novos serviços
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.promotions}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              promotions: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">Lembretes</h3>
                          <p className="text-gray-600 text-sm">
                            Receba lembretes sobre ações pendentes
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.reminders}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              reminders: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
                      Salvar Preferências
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Help Section */}
            {activeSection === "help" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Ajuda e Suporte
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="/help"
                    className="block p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-all duration-200">
                        <HelpCircle className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Central de Ajuda
                        </h3>
                        <p className="text-gray-600">
                          Encontre respostas para as perguntas mais frequentes
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/contact"
                    className="block p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-green-100 rounded-xl group-hover:bg-green-200 transition-all duration-200">
                        <Mail className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Contato com Suporte
                        </h3>
                        <p className="text-gray-600">
                          Entre em contato direto com nossa equipe
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="block p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-all duration-200">
                        <Bell className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Assistente Virtual
                        </h3>
                        <p className="text-gray-600">
                          Chat com nosso assistente inteligente 24/7
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/terms"
                    className="block p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-all duration-200">
                        <HelpCircle className="w-8 h-8 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Termos e Condições
                        </h3>
                        <p className="text-gray-600">
                          Leia nossos termos de uso e políticas
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

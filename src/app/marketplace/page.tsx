'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import { Search, SlidersHorizontal, X, Star, MapPin, Globe, DollarSign, TrendingUp, Clock, Award } from 'lucide-react';

// Mock data para demonstração
const MOCK_GIGS = [
  {
    id: 1,
    title: 'Design de Logo Profissional',
    seller: 'Maria Silva',
    rating: 4.9,
    reviews: 127,
    price: 150,
    image: '🎨',
    category: 'Design',
    location: 'São Paulo, BR',
    language: 'Português',
    deliveryTime: '3 dias',
  },
  {
    id: 2,
    title: 'Desenvolvimento de Website Responsivo',
    seller: 'João Santos',
    rating: 5.0,
    reviews: 89,
    price: 800,
    image: '💻',
    category: 'Programação',
    location: 'Rio de Janeiro, BR',
    language: 'Português',
    deliveryTime: '7 dias',
  },
  {
    id: 3,
    title: 'Redação de Artigos SEO',
    seller: 'Ana Costa',
    rating: 4.8,
    reviews: 203,
    price: 80,
    image: '✍️',
    category: 'Escrita',
    location: 'Lisboa, PT',
    language: 'Português',
    deliveryTime: '2 dias',
  },
  {
    id: 4,
    title: 'Edição de Vídeo Profissional',
    seller: 'Carlos Mendes',
    rating: 4.9,
    reviews: 156,
    price: 300,
    image: '🎬',
    category: 'Vídeo',
    location: 'Porto, PT',
    language: 'Português',
    deliveryTime: '5 dias',
  },
  {
    id: 5,
    title: 'Consultoria de Marketing Digital',
    seller: 'Paula Oliveira',
    rating: 5.0,
    reviews: 94,
    price: 500,
    image: '📊',
    category: 'Marketing',
    location: 'Belo Horizonte, BR',
    language: 'Português',
    deliveryTime: '3 dias',
  },
  {
    id: 6,
    title: 'Ilustração Digital Personalizada',
    seller: 'Rafael Lima',
    rating: 4.7,
    reviews: 178,
    price: 200,
    image: '🖌️',
    category: 'Design',
    location: 'Curitiba, BR',
    language: 'Português',
    deliveryTime: '4 dias',
  },
];

const CATEGORIES = ['Todos', 'Design', 'Programação', 'Escrita', 'Vídeo', 'Marketing'];
const PRICE_RANGES = ['Todos', 'Até R$ 100', 'R$ 100 - R$ 300', 'R$ 300 - R$ 500', 'Acima de R$ 500'];
const LANGUAGES = ['Todos', 'Português', 'Inglês', 'Espanhol'];
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'best-selling', label: 'Mais Vendidos' },
  { value: 'newest', label: 'Mais Recentes' },
  { value: 'rating', label: 'Melhor Avaliados' },
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Todos');
  const [selectedLanguage, setSelectedLanguage] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevance');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'category') setSelectedCategory(value);
    if (filterType === 'price') setSelectedPriceRange(value);
    if (filterType === 'language') setSelectedLanguage(value);

    // Atualizar breadcrumbs de filtros ativos
    const newFilters = [...activeFilters];
    const filterLabel = `${filterType}: ${value}`;
    
    if (value !== 'Todos' && !newFilters.includes(filterLabel)) {
      newFilters.push(filterLabel);
    }
    
    setActiveFilters(newFilters.filter(f => !f.startsWith(filterType) || f === filterLabel));
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
    
    // Resetar o filtro correspondente
    if (filter.startsWith('category')) setSelectedCategory('Todos');
    if (filter.startsWith('price')) setSelectedPriceRange('Todos');
    if (filter.startsWith('language')) setSelectedLanguage('Todos');
  };

  const clearAllFilters = () => {
    setSelectedCategory('Todos');
    setSelectedPriceRange('Todos');
    setSelectedLanguage('Todos');
    setActiveFilters([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section com Busca */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
            Encontre o Profissional Perfeito
          </h1>

          {/* Barra de Pesquisa */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por serviço, categoria ou palavra-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 shadow-2xl focus:ring-4 focus:ring-purple-300 transition-all text-lg"
              />
            </div>

            {/* Sugestões de Busca */}
            {searchQuery && (
              <div className="mt-2 bg-white rounded-xl shadow-2xl p-4 max-h-60 overflow-y-auto">
                <div className="space-y-2">
                  {['Logo Design', 'Website Development', 'SEO Writing', 'Video Editing'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchQuery(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Search className="w-4 h-4 inline mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Painel Lateral de Filtros */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filtros
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Limpar
                </button>
              </div>

              {/* Categoria */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categoria</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => handleFilterChange('category', category)}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Faixa de Preço */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Preço
                </h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === range}
                        onChange={() => handleFilterChange('price', range)}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Idioma */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Idioma
                </h3>
                <div className="space-y-2">
                  {LANGUAGES.map((language) => (
                    <label key={language} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        checked={selectedLanguage === language}
                        onChange={() => handleFilterChange('language', language)}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">{language}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Área Principal de Conteúdo */}
          <main className="flex-1">
            {/* Breadcrumbs de Filtros Ativos */}
            {activeFilters.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Barra de Controles */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-gray-600">
                <strong className="text-gray-900">{MOCK_GIGS.length}</strong> serviços encontrados
              </div>

              <div className="flex items-center gap-4">
                {/* Botão de Filtros Mobile */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-600 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                </button>

                {/* Ordenação */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid de Gigs */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_GIGS.map((gig) => (
                <Link
                  key={gig.id}
                  href={`/gig/${gig.id}`}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Imagem/Ícone */}
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                    {gig.image}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5">
                    {/* Vendedor */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {gig.seller.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{gig.seller}</span>
                    </div>

                    {/* Título */}
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {gig.title}
                    </h3>

                    {/* Avaliação */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{gig.rating}</span>
                      <span className="text-sm text-gray-500">({gig.reviews})</span>
                    </div>

                    {/* Metadados */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {gig.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {gig.deliveryTime}
                      </span>
                    </div>

                    {/* Preço */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-sm text-gray-600">A partir de</span>
                      <span className="text-xl font-bold text-purple-600">
                        R$ {gig.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Paginação */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
                  Anterior
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold">
                  1
                </button>
                <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
                  Próximo
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

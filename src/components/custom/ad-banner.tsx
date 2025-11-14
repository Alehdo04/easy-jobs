'use client';

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
  type?: 'home' | 'category';
  category?: string;
}

export default function AdBanner({ type = 'home', category }: AdBannerProps) {
  const [ad, setAd] = useState<any>(null);
  const [impressionTracked, setImpressionTracked] = useState(false);

  useEffect(() => {
    // Simular busca de anúncio ativo
    // Em produção, isso viria de uma API/Supabase
    const mockAd = {
      id: '1',
      title: 'Turbine sua Produtividade',
      description: 'Ferramentas profissionais para freelancers. Teste grátis por 30 dias.',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=300&fit=crop',
      target_url: 'https://exemplo.com',
      advertiser: 'Tech Solutions',
    };

    setAd(mockAd);
  }, [type, category]);

  useEffect(() => {
    // Rastrear impressão (apenas uma vez)
    if (ad && !impressionTracked) {
      // Aqui você enviaria para analytics/Supabase
      console.log('Ad impression tracked:', ad.id);
      setImpressionTracked(true);
    }
  }, [ad, impressionTracked]);

  const handleClick = () => {
    if (ad) {
      // Rastrear clique
      console.log('Ad click tracked:', ad.id);
      // Abrir link em nova aba
      window.open(ad.target_url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!ad) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative group">
        {/* Label "Patrocinado" */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-600 text-xs font-medium rounded-full border border-gray-200">
            Patrocinado
          </span>
        </div>

        {/* Banner */}
        <button
          onClick={handleClick}
          className="w-full relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]"
        >
          <div className="relative h-32 sm:h-40 md:h-48">
            <img
              src={ad.image_url}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 md:px-12">
              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {ad.title}
              </h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl">
                {ad.description}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                <span>Saiba Mais</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </button>

        {/* Advertiser Info */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          Anúncio de {ad.advertiser}
        </div>
      </div>
    </div>
  );
}

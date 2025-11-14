import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">EJ</span>
              </div>
              <span className="text-xl font-bold">Easy Jobs</span>
            </div>
            <p className="text-gray-400 text-sm">
              Marketplace global de serviços digitais conectando talentos ao redor do mundo.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Para Compradores</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Explorar Serviços</Link></li>
              <li><Link href="/how-to-buy" className="hover:text-white transition-colors">Como Comprar</Link></li>
              <li><Link href="/buyer-protection" className="hover:text-white transition-colors">Proteção ao Comprador</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Para Vendedores</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/become-seller" className="hover:text-white transition-colors">Começar a Vender</Link></li>
              <li><Link href="/seller-guide" className="hover:text-white transition-colors">Guia do Vendedor</Link></li>
              <li><Link href="/success-stories" className="hover:text-white transition-colors">Casos de Sucesso</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Parcerias</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/investors" className="hover:text-white transition-colors">Investidores</Link></li>
              <li><Link href="/advertise" className="hover:text-white transition-colors">Anuncie Conosco</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/help" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Easy Jobs. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

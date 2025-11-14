'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { checkAdminAccess, AdminRole, hasPermission, logoutAdmin } from '@/lib/admin-auth';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  DollarSign, 
  Scale, 
  Settings, 
  Tags,
  LogOut,
  Menu,
  X,
  Megaphone
} from 'lucide-react';

interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  permission: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userRole, setUserRole] = useState<AdminRole | null>(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function verifyAccess() {
      const { isAdmin, role, user } = await checkAdminAccess();
      
      if (!isAdmin) {
        router.push('/auth/login?redirect=/admin');
        return;
      }

      setIsAuthorized(true);
      setUserRole(role || null);
      setUserName(user?.full_name || '');
      setLoading(false);
    }

    verifyAccess();
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/');
  };

  const menuItems: MenuItem[] = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      permission: 'view_users',
    },
    {
      href: '/admin/users',
      label: 'Usuários',
      icon: <Users className="w-5 h-5" />,
      permission: 'view_users',
    },
    {
      href: '/admin/gigs',
      label: 'Serviços',
      icon: <Briefcase className="w-5 h-5" />,
      permission: 'view_gigs',
    },
    {
      href: '/admin/categories',
      label: 'Categorias',
      icon: <Tags className="w-5 h-5" />,
      permission: 'view_categories',
    },
    {
      href: '/admin/finance',
      label: 'Financeiro',
      icon: <DollarSign className="w-5 h-5" />,
      permission: 'view_finance',
    },
    {
      href: '/admin/disputes',
      label: 'Disputas',
      icon: <Scale className="w-5 h-5" />,
      permission: 'view_disputes',
    },
    {
      href: '/admin/ads',
      label: 'Anúncios',
      icon: <Megaphone className="w-5 h-5" />,
      permission: 'view_settings',
    },
    {
      href: '/admin/settings',
      label: 'Configurações',
      icon: <Settings className="w-5 h-5" />,
      permission: 'view_settings',
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    userRole && hasPermission(userRole, item.permission)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">Easy Jobs</h1>
            <p className="text-sm text-gray-500 mt-1">Painel Administrativo</p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {filteredMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

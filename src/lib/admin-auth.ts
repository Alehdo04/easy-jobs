// Tipos de roles do admin
export type AdminRole = 'admin' | 'moderator';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  full_name: string;
  created_at: string;
  mfa_enabled: boolean;
  mfa_secret?: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

// Lista de credenciais autorizadas (em produção, isso viria do banco de dados criptografado)
const AUTHORIZED_ADMINS: Record<string, { password: string; role: AdminRole; full_name: string }> = {
  'admin@easyjobs.com': {
    password: 'admin123',
    role: 'admin',
    full_name: 'Administrador Global',
  },
  'moderator@easyjobs.com': {
    password: 'mod123',
    role: 'moderator',
    full_name: 'Moderador',
  },
};

// Verificar credenciais
export function verifyCredentials(email: string, password: string): { isValid: boolean; role?: AdminRole; full_name?: string } {
  const admin = AUTHORIZED_ADMINS[email];
  
  if (!admin || admin.password !== password) {
    return { isValid: false };
  }

  return {
    isValid: true,
    role: admin.role,
    full_name: admin.full_name,
  };
}

// Gerar código MFA (simulado - em produção usaria TOTP real)
export function generateMFACode(email: string): string {
  // Gera um código de 6 dígitos baseado no timestamp
  const timestamp = Math.floor(Date.now() / 30000); // Muda a cada 30 segundos
  const seed = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const code = ((timestamp + seed) % 900000 + 100000).toString();
  return code;
}

// Verificar código MFA
export function verifyMFACode(email: string, code: string): boolean {
  const validCode = generateMFACode(email);
  return code === validCode;
}

// Login do admin
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string; requiresMFA?: boolean }> {
  try {
    const { isValid, role, full_name } = verifyCredentials(email, password);
    
    if (!isValid) {
      return { success: false, error: 'E-mail ou senha inválidos' };
    }

    // Salvar dados temporários para MFA
    const tempData = {
      email,
      role,
      full_name,
      timestamp: Date.now(),
    };
    
    localStorage.setItem('admin_temp', JSON.stringify(tempData));

    return {
      success: true,
      requiresMFA: true,
    };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error: 'Erro ao processar login' };
  }
}

// Verificar MFA e completar login
export async function verifyMFAAndLogin(code: string): Promise<{ success: boolean; error?: string }> {
  try {
    const tempData = localStorage.getItem('admin_temp');
    
    if (!tempData) {
      return { success: false, error: 'Sessão expirada. Faça login novamente.' };
    }

    const { email, role, full_name, timestamp } = JSON.parse(tempData);

    // Verificar se não expirou (5 minutos)
    if (Date.now() - timestamp > 5 * 60 * 1000) {
      localStorage.removeItem('admin_temp');
      return { success: false, error: 'Código expirado. Faça login novamente.' };
    }

    // Verificar código MFA
    if (!verifyMFACode(email, code)) {
      return { success: false, error: 'Código de verificação inválido' };
    }

    // Criar sessão do admin
    const user: AdminUser = {
      id: `admin_${Date.now()}`,
      email,
      role,
      full_name,
      created_at: new Date().toISOString(),
      mfa_enabled: true,
    };

    localStorage.setItem('admin_user', JSON.stringify(user));
    localStorage.removeItem('admin_temp');

    return { success: true };
  } catch (error) {
    console.error('Erro ao verificar MFA:', error);
    return { success: false, error: 'Erro ao processar verificação' };
  }
}

// Verificar acesso admin
export async function checkAdminAccess(): Promise<{ isAdmin: boolean; role?: AdminRole; user?: AdminUser }> {
  try {
    const storedAdmin = localStorage.getItem('admin_user');
    
    if (!storedAdmin) {
      return { isAdmin: false };
    }

    const adminData: AdminUser = JSON.parse(storedAdmin);
    
    // Verificar se o email ainda é autorizado
    const admin = AUTHORIZED_ADMINS[adminData.email];
    if (!admin) {
      localStorage.removeItem('admin_user');
      return { isAdmin: false };
    }

    return {
      isAdmin: true,
      role: adminData.role,
      user: adminData,
    };
  } catch (error) {
    console.error('Erro ao verificar acesso admin:', error);
    return { isAdmin: false };
  }
}

// Verificar permissões específicas
export function hasPermission(role: AdminRole, permission: string): boolean {
  const permissions: Record<AdminRole, string[]> = {
    admin: [
      'view_users',
      'manage_users',
      'ban_users',
      'approve_sellers',
      'view_gigs',
      'manage_gigs',
      'approve_gigs',
      'view_categories',
      'manage_categories',
      'view_finance',
      'manage_finance',
      'manage_payouts',
      'view_disputes',
      'resolve_disputes',
      'view_settings',
      'manage_settings',
      'view_ads',
      'manage_ads',
    ],
    moderator: [
      'view_users',
      'view_gigs',
      'manage_gigs',
      'approve_gigs',
      'view_categories',
      'manage_categories',
      'view_disputes',
      'resolve_disputes',
    ],
  };

  return permissions[role]?.includes(permission) || false;
}

// Logout do admin
export function logoutAdmin(): void {
  localStorage.removeItem('admin_user');
  localStorage.removeItem('admin_temp');
}

// Obter código MFA atual (para exibir ao usuário durante login)
export function getCurrentMFACode(email: string): string {
  return generateMFACode(email);
}

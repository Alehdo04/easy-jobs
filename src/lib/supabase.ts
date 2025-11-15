import { createClient } from '@supabase/supabase-js';

// Valores padrão para desenvolvimento (evita erro quando env vars não estão configuradas)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

// Verificar se as credenciais estão configuradas
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' &&
         supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder' &&
         supabaseUrl.startsWith('https://') &&
         supabaseAnonKey.length > 50;
};

// Criar cliente Supabase apenas se configurado corretamente
export const supabase = isSupabaseConfigured() ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Tipos para o banco de dados
export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'buyer' | 'seller' | 'both';
  created_at: string;
  updated_at: string;
};

export type SellerProfile = {
  id: string;
  user_id: string;
  professional_title: string;
  skills_description: string;
  document_id?: string;
  document_verified: boolean;
  pix_key?: string;
  bank_account?: string;
  created_at: string;
  updated_at: string;
};

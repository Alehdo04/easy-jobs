'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Shield, Key } from 'lucide-react';
import { loginAdmin, verifyMFAAndLogin, getCurrentMFACode } from '@/lib/admin-auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentCode, setCurrentCode] = useState('');

  // Atualizar código MFA a cada 30 segundos
  useEffect(() => {
    if (step === 'mfa' && email) {
      const updateCode = () => {
        setCurrentCode(getCurrentMFACode(email));
      };
      
      updateCode();
      const interval = setInterval(updateCode, 30000);
      
      return () => clearInterval(interval);
    }
  }, [step, email]);

  const handleCredentialsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginAdmin(email, password);

      if (result.success && result.requiresMFA) {
        setStep('mfa');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro ao processar login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMFASubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await verifyMFAAndLogin(mfaCode);

      if (result.success) {
        router.push('/admin');
      } else {
        setError(result.error || 'Código inválido');
      }
    } catch (err) {
      setError('Erro ao verificar código. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              {step === 'credentials' ? (
                <Lock className="w-8 h-8 text-white" />
              ) : (
                <Shield className="w-8 h-8 text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Easy Jobs Admin</h1>
            <p className="text-gray-600">
              {step === 'credentials' 
                ? 'Acesso restrito ao painel administrativo'
                : 'Autenticação de múltiplos fatores (MFA)'}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Credentials Form */}
          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail Autorizado
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@easyjobs.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verificando...' : 'Continuar'}
              </button>
            </form>
          )}

          {/* MFA Form */}
          {step === 'mfa' && (
            <form onSubmit={handleMFASubmit} className="space-y-6">
              {/* MFA Code */}
              <div>
                <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Verificação
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="mfaCode"
                    type="text"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    required
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Digite o código de 6 dígitos
                </p>
              </div>

              {/* Demo Code Display */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-900 mb-2 text-center">
                  Código de Demonstração (válido por 30s):
                </p>
                <p className="text-3xl font-mono font-bold text-blue-600 text-center tracking-widest">
                  {currentCode}
                </p>
                <p className="text-xs text-blue-700 mt-2 text-center">
                  Em produção, este código seria enviado via app autenticador
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || mfaCode.length !== 6}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setMfaCode('');
                  setError('');
                }}
                className="w-full text-gray-600 hover:text-gray-900 text-sm"
              >
                ← Voltar ao login
              </button>
            </form>
          )}

          {/* Demo Credentials */}
          {step === 'credentials' && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs font-semibold text-gray-700 mb-2">Credenciais de Demonstração:</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><strong>Admin:</strong> admin@easyjobs.com / admin123</p>
                <p><strong>Moderador:</strong> moderator@easyjobs.com / mod123</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Voltar para o site
          </a>
        </div>
      </div>
    </div>
  );
}

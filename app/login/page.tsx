'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { AuthService } from '@/lib/auth';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError('');
    setIsSubmitting(true);

    try {
      const authService = AuthService.getInstance();
      const result = await authService.login(formData.email, formData.password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Credenciais inválidas');
      }
    } catch (error) {
      setError('Erro interno do servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Lekton, monospace' }}>
            Entrar
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium mb-1">Usuário de demonstração:</p>
            <p>E-mail: <code className="bg-blue-100 px-1 rounded">demo@subtrack.com</code></p>
            <p>Senha: <code className="bg-blue-100 px-1 rounded">demo123</code></p>
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-center text-sm text-gray-600">
          <Link href="/signup" className="text-[#2563eb] hover:text-[#1e40af] font-medium">
            Criar conta
          </Link>
          <Link href="/reset" className="text-[#2563eb] hover:text-[#1e40af] font-medium">
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
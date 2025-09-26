'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { AuthService } from '@/lib/auth';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
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
      const result = await authService.signup(formData.name, formData.email, formData.password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Erro ao criar conta');
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
            Criar conta
          </h1>
          <p className="text-gray-600 mt-2">É rápido e grátis.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1"
            />
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
              minLength={8}
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white"
          >
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Já tem conta?{' '}
          <Link href="/login" className="text-[#2563eb] hover:text-[#1e40af] font-medium">
            Entrar
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
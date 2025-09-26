'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/layouts/auth-layout';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Lekton, monospace' }}>
            Recuperar senha
          </h1>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Link de recuperação enviado para seu e-mail!
            </div>
            <p className="text-gray-600">
              Verifique sua caixa de entrada e siga as instruções.
            </p>
            <Link href="/login" className="text-[#2563eb] hover:text-[#1e40af] font-medium">
              Voltar ao login
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar link'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <Link href="/login" className="text-[#2563eb] hover:text-[#1e40af] font-medium">
                Voltar ao login
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthService } from '@/lib/auth';
import type { AuthState } from '@/types';

export default function SettingsPage() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const authService = AuthService.getInstance();
    const initialState = authService.getState();
    setAuthState(initialState);
    
    if (initialState.user) {
      setProfileData({
        name: initialState.user.name,
        email: initialState.user.email,
      });
    }
    
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
    });
    
    setIsSubmitting(false);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Lekton, monospace' }}>
            Configurações
          </h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Dados da conta</h2>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#2563eb] hover:bg-[#1e40af] text-white"
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Alterar senha</h2>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Senha atual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    required
                    minLength={8}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#2563eb] hover:bg-[#1e40af] text-white"
                >
                  {isSubmitting ? 'Atualizando...' : 'Atualizar senha'}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
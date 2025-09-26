'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './header';
import { AuthService } from '@/lib/auth';
import type { AuthState } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authService = AuthService.getInstance();
    const initialState = authService.getState();
    setAuthState(initialState);
    setIsLoading(false);
    
    if (!initialState.isAuthenticated) {
      router.push('/login');
    }
    
    const unsubscribe = authService.subscribe((newState) => {
      setAuthState(newState);
      if (!newState.isAuthenticated) {
        router.push('/login');
      }
    });

    return unsubscribe;
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563eb]"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1120px] mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
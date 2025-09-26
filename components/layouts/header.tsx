'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/logo';
import { UserMenu } from '@/components/user-menu';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/lib/auth';
import type { AuthState } from '@/types';

export function Header() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const authService = AuthService.getInstance();
    setAuthState(authService.getState());
    
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1120px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        
        <div className="flex items-center gap-4">
          {authState.isAuthenticated ? (
            <UserMenu user={authState.user} />
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  Entrar
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#2563eb] hover:bg-[#1e40af] text-white">
                  Criar conta
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
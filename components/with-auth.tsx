'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {authService} from '@/lib/auth';
import {AuthState} from '@/types';

export default function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    const WithAuthComponent = (props: P) => {
        const router = useRouter();
        const [authState, setAuthState] = useState<AuthState>(authService.getState());
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const unsubscribe = authService.subscribe(setAuthState);
            // Verifica o estado inicial
            const currentState = authService.getState();
            if (!currentState.isAuthenticated) {
                router.replace('/login');
            } else {
                setIsLoading(false);
            }
            return () => unsubscribe();
        }, [router]);

        if (isLoading || !authState.isAuthenticated) {
            // Você pode renderizar um spinner de carregamento aqui
            return <div>Carregando...</div>;
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuthComponent;
}
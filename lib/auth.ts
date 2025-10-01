'use client';

import { User, AuthState } from '@/types';
import { api } from './api';

export class AuthService {
    private static instance: AuthService;
    private authState: AuthState = {
        user: null,
        isAuthenticated: false,
    };
    private listeners: Array<(state: AuthState) => void> = [];

    private constructor() {
        // No construtor, verificamos se existe um token para manter o usuário logado
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            if (token) {
                // Se houver um token, idealmente deveríamos validá-lo com a API
                // e buscar os dados do usuário. Por simplicidade, vamos apenas
                // considerar o usuário como autenticado.
                // Em uma app real: const user = await api.get('/auth/me');
                this.authState = { user: {} as User, isAuthenticated: true }; // Simula usuário logado
            }
        }
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    subscribe(listener: (state: AuthState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notify() {
        this.listeners.forEach((listener) => listener(this.authState));
    }

    async signup(
        name: string,
        email: string,
        password: string
    ): Promise<{ success: boolean; error?: string }> {
        try {
            // Usando nosso api client
            const response = await api.post('/auth/register', { name, email, password });

            if (response.user) {
                return this.login(email, password);
            } else {
                return { success: false, error: response.message || 'Erro ao criar conta.' };
            }
        } catch (error) {
            return { success: false, error: 'Não foi possível conectar ao servidor.' };
        }
    }

    async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
        try {
            // Usando nosso api client
            const response = await api.post('/auth/login', { email, password });

            if (response.token) {
                localStorage.setItem('authToken', response.token);
                // Em um app real, o token conteria dados do usuário ou faríamos outra chamada para buscá-los.
                this.authState = { user: { email } as User, isAuthenticated: true };
                this.notify();
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Credenciais inválidas' };
            }
        } catch (error) {
            return { success: false, error: 'Erro de conexão com o servidor' };
        }
    }

    async logout() {
        localStorage.removeItem('authToken');
        this.authState = {
            user: null,
            isAuthenticated: false,
        };
        this.notify();
    }

    getState(): AuthState {
        return this.authState;
    }
}

export const authService = AuthService.getInstance();
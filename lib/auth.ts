'use client';

import { User, AuthState } from '@/types';

// Mock authentication - in a real app, this would integrate with Supabase
export class AuthService {
  private static instance: AuthService;
  private authState: AuthState = {
    user: null,
    isAuthenticated: false
  };
  private listeners: Array<(state: AuthState) => void> = [];

  private constructor() {
    // Check for existing session
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auth');
      if (saved) {
        try {
          this.authState = JSON.parse(saved);
        } catch (e) {
          // Invalid saved data
        }
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
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.authState));
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(this.authState));
    }
  }

  async signup(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Date.now().toString(),
      name,
      email
    };

    this.authState = {
      user,
      isAuthenticated: true
    };
    
    this.notify();
    return { success: true };
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user credentials
    if (email === 'demo@subtrack.com' && password === 'demo123') {
      const user: User = {
        id: 'demo',
        name: 'Usuário Demo',
        email: 'demo@subtrack.com'
      };

      this.authState = {
        user,
        isAuthenticated: true
      };
      
      this.notify();
      return { success: true };
    }
    
    const user: User = {
      id: '1',
      name: 'João Silva',
      email
    };

    this.authState = {
      user,
      isAuthenticated: true
    };
    
    this.notify();
    return { success: true };
  }

  async logout() {
    this.authState = {
      user: null,
      isAuthenticated: false
    };
    
    this.notify();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
    }
  }

  getState(): AuthState {
    return this.authState;
  }
}
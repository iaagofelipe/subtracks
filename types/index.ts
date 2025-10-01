export type BillingCycle = 'mensal' | 'anual';

export interface Subscription {
    id: string;
    name: string;
    category: string;
    amount: number;
    billingCycle: BillingCycle; // Agora este tipo existe
    nextRenewal: string;
    paymentMethod: string;
    logo?: string;
}

export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export interface Metrics {
    totalMonthly: number;
    upcomingCount: number;
}
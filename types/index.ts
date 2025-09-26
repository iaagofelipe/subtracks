export interface Subscription {
  id: string;
  name: string;
  category: string;
  amount: number;
  billingCycle: 'mensal' | 'anual';
  nextRenewal: string;
  paymentMethod?: string;
  logo?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Metrics {
  totalMonthly: number;
  upcomingCount: number;
}

export type FormFieldType = 'text' | 'email' | 'password' | 'select' | 'currency' | 'date';

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  min?: number;
  options?: string[];
  currency?: string;
}
'use client';

import { Subscription, Metrics } from '@/types';

const sampleSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    category: "Streaming",
    amount: 55.9,
    billingCycle: "mensal",
    nextRenewal: "2025-02-05",
    paymentMethod: "Cartão final 1234",
    logo: "netflix"
  },
  {
    id: "2",
    name: "Adobe Creative Cloud",
    category: "Software",
    amount: 179.0,
    billingCycle: "mensal",
    nextRenewal: "2025-02-14",
    paymentMethod: "Cartão final 1234",
    logo: "adobe"
  },
  {
    id: "3",
    name: "AWS",
    category: "Infraestrutura",
    amount: 90.0,
    billingCycle: "mensal",
    nextRenewal: "2025-02-02",
    paymentMethod: "Cartão final 5678",
    logo: "aws"
  }
];

export class SubscriptionService {
  private static instance: SubscriptionService;
  private subscriptions: Subscription[] = [];
  private listeners: Array<(subscriptions: Subscription[]) => void> = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subscriptions');
      if (saved) {
        try {
          this.subscriptions = JSON.parse(saved);
        } catch (e) {
          // Use sample data if no saved data
          this.subscriptions = [...sampleSubscriptions];
        }
      } else {
        this.subscriptions = [...sampleSubscriptions];
      }
    }
  }

  static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  subscribe(listener: (subscriptions: Subscription[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.subscriptions));
    if (typeof window !== 'undefined') {
      localStorage.setItem('subscriptions', JSON.stringify(this.subscriptions));
    }
  }

  getAll(): Subscription[] {
    return this.subscriptions;
  }

  getMetrics(): Metrics {
    const totalMonthly = this.subscriptions.reduce((sum, sub) => {
      if (sub.billingCycle === 'mensal') {
        return sum + sub.amount;
      } else if (sub.billingCycle === 'anual') {
        return sum + (sub.amount / 12);
      }
      return sum;
    }, 0);

    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    const upcomingCount = this.subscriptions.filter(sub => {
      const renewalDate = new Date(sub.nextRenewal);
      return renewalDate >= now && renewalDate <= thirtyDaysFromNow;
    }).length;

    return { totalMonthly, upcomingCount };
  }

  async add(subscription: Omit<Subscription, 'id'>): Promise<Subscription> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newSubscription: Subscription = {
      ...subscription,
      id: Date.now().toString()
    };

    this.subscriptions.push(newSubscription);
    this.notify();
    return newSubscription;
  }

  async update(id: string, updates: Partial<Subscription>): Promise<Subscription | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = this.subscriptions.findIndex(sub => sub.id === id);
    if (index === -1) return null;

    this.subscriptions[index] = { ...this.subscriptions[index], ...updates };
    this.notify();
    return this.subscriptions[index];
  }

  async delete(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = this.subscriptions.findIndex(sub => sub.id === id);
    if (index === -1) return false;

    this.subscriptions.splice(index, 1);
    this.notify();
    return true;
  }
}
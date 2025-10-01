'use client';

import { Subscription, Metrics } from '@/types';
import { api } from './api';

export class SubscriptionService {
    private static instance: SubscriptionService;
    private subscriptions: Subscription[] = [];
    private listeners: Array<(subscriptions: Subscription[]) => void> = [];

    private constructor() {}

    static getInstance(): SubscriptionService {
        if (!SubscriptionService.instance) {
            SubscriptionService.instance = new SubscriptionService();
        }
        return SubscriptionService.instance;
    }

    subscribe(listener: (subscriptions: Subscription[]) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notify() {
        this.listeners.forEach((listener) => listener(this.subscriptions));
    }

    async fetchAll(): Promise<void> {
        try {
            const subscriptionsFromServer = await api.get('/subscriptions');
            // Adicionamos uma verificação para garantir que a resposta é um array
            if (Array.isArray(subscriptionsFromServer)) {
                this.subscriptions = subscriptionsFromServer;
                this.notify();
            } else {
                // Se a resposta não for o que esperamos (ex: erro de autenticação), limpa a lista.
                this.subscriptions = [];
                this.notify();
            }
        } catch (error) {
            console.error('Falha ao buscar assinaturas:', error);
            this.subscriptions = []; // Em caso de erro, limpa a lista para evitar dados incorretos.
            this.notify();
        }
    }

    getMetrics(): Metrics {
        const totalMonthly = this.subscriptions.reduce((sum, sub) => {
            if (sub.billingCycle === 'mensal') {
                return sum + sub.amount;
            } else if (sub.billingCycle === 'anual') {
                return sum + sub.amount / 12;
            }
            return sum;
        }, 0);

        const now = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(now.getDate() + 30);

        const upcomingCount = this.subscriptions.filter((sub) => {
            const renewalDate = new Date(sub.nextRenewal);
            return renewalDate >= now && renewalDate <= thirtyDaysFromNow;
        }).length;

        return { totalMonthly, upcomingCount };
    }

    async add(subscriptionData: Omit<Subscription, 'id'>): Promise<Subscription | null> {
        try {
            const newSubscription = await api.post('/subscriptions', subscriptionData);
            if (newSubscription && newSubscription.id) {
                this.subscriptions.push(newSubscription);
                this.notify();
                return newSubscription;
            }
            return null;
        } catch (error) {
            console.error('Falha ao adicionar assinatura:', error);
            return null;
        }
    }

    async update(id: string, updates: Partial<Subscription>): Promise<Subscription | null> {
        try {
            const updatedSubscription = await api.put(`/subscriptions/${id}`, updates);
            const index = this.subscriptions.findIndex((sub) => sub.id === id);
            if (index !== -1 && updatedSubscription) {
                this.subscriptions[index] = updatedSubscription;
                this.notify();
                return this.subscriptions[index];
            }
            return null;
        } catch (error) {
            console.error('Falha ao atualizar assinatura:', error);
            return null;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await api.delete(`/subscriptions/${id}`);
            const index = this.subscriptions.findIndex((sub) => sub.id === id);
            if (index !== -1) {
                this.subscriptions.splice(index, 1);
                this.notify();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Falha ao deletar assinatura:', error);
            return false;
        }
    }
}

export const subscriptionService = SubscriptionService.getInstance();
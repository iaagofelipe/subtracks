'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Inbox, Banknote, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layouts/app-layout';
import { SubscriptionCard } from '@/components/subscription-card';
import { SubscriptionService } from '@/lib/subscriptions';
import { formatCurrency } from '@/lib/currency';
import type { Subscription, Metrics } from '@/types';

export default function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ totalMonthly: 0, upcomingCount: 0 });

  useEffect(() => {
    const service = SubscriptionService.getInstance();
    
    // Initial data
    const initialSubs = service.getAll();
    setSubscriptions(initialSubs);
    setMetrics(service.getMetrics());
    
    // Subscribe to updates
    const unsubscribe = service.subscribe((newSubs) => {
      setSubscriptions(newSubs);
      setMetrics(service.getMetrics());
    });

    return unsubscribe;
  }, []);

  const handleDelete = async (id: string) => {
    const service = SubscriptionService.getInstance();
    await service.delete(id);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Lekton, monospace' }}>
            Minhas assinaturas
          </h1>
          <Link href="/add-subscription">
            <Button className="bg-[#2563eb] hover:bg-[#1e40af] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar assinatura
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total mensal</p>
                <p className="text-3xl font-bold">{formatCurrency(metrics.totalMonthly)}</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <Banknote className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-100 text-sm font-medium">Próximas renovações (30 dias)</p>
                <p className="text-3xl font-bold">{metrics.upcomingCount}</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions List */}
        <div>
          {subscriptions.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma assinatura ainda
              </h3>
              <p className="text-gray-600 mb-6">
                Adicione sua primeira assinatura para ver o total mensal.
              </p>
              <Link href="/add-subscription">
                <Button className="bg-[#2563eb] hover:bg-[#1e40af] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { subscriptionService } from '@/lib/subscriptions';
import { Subscription } from '@/types';
import withAuth from '@/components/with-auth';
import {SubscriptionCard} from '@/components/subscription-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

function DashboardPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSubscriptions = async () => {
            setIsLoading(true);
            await subscriptionService.fetchAll();
            setIsLoading(false);
        };

        loadSubscriptions();

        const unsubscribe = subscriptionService.subscribe(setSubscriptions);

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <div>Carregando assinaturas...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Suas Assinaturas</h1>
                <Button asChild>
                    <Link href="/add-subscription">
                        <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Assinatura
                    </Link>
                </Button>
            </div>

            {subscriptions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subscriptions.map((sub) => (
                        <SubscriptionCard key={sub.id} subscription={sub} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p>Você ainda não tem nenhuma assinatura.</p>
                    <p>Que tal <Link href="/add-subscription" className="text-blue-500 hover:underline">adicionar a primeira</Link>?</p>
                </div>
            )}
        </div>
    );
}

export default withAuth(DashboardPage);
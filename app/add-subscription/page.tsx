'use client';

import { useRouter } from 'next/navigation';
import { SubscriptionForm } from '@/components/forms/subscription-form';
import { subscriptionService } from '@/lib/subscriptions';
import { useToast } from '@/hooks/use-toast';
import withAuth from '@/components/with-auth';
import { Subscription } from '@/types';

function AddSubscriptionPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleAddSubscription = async (data: Omit<Subscription, 'id'>) => {
        const newSubscription = await subscriptionService.add(data);
        if (newSubscription) {
            toast({
                title: "Sucesso!",
                description: "Sua nova assinatura foi adicionada.",
            });
            router.push('/dashboard');
        } else {
            toast({
                title: "Erro",
                description: "Não foi possível adicionar a assinatura.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Adicionar Nova Assinatura</h1>
            <SubscriptionForm onSubmit={handleAddSubscription} />
        </div>
    );
}

export default withAuth(AddSubscriptionPage);
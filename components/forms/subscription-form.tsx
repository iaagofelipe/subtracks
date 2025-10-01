// components/forms/subscription-form.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type {BillingCycle, Subscription} from '@/types';

interface SubscriptionFormProps {
    subscription?: Subscription;
    onSubmit: (data: Omit<Subscription, 'id'>) => Promise<void>;
    onSuccess?: () => void;
}

// Criamos uma interface para o estado do nosso formulário
interface FormData {
    name: string;
    category: string;
    amount: string;
    billingCycle: BillingCycle;
    nextRenewal: string;
    paymentMethod: string;
}

export function SubscriptionForm({ subscription, onSubmit, onSuccess }: SubscriptionFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: subscription?.name || '',
        category: subscription?.category || '',
        amount: subscription?.amount?.toString() || '',
        billingCycle: subscription?.billingCycle || 'mensal',
        nextRenewal: subscription?.nextRenewal || '',
        paymentMethod: subscription?.paymentMethod || '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const categories = ['Streaming', 'Software', 'Infraestrutura', 'Produtividade', 'Outros'];
    const billingCycles = [
        { value: 'mensal', label: 'Mensal' },
        { value: 'anual', label: 'Anual' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const subscriptionData = {
                ...formData,
                amount: parseFloat(formData.amount),
            };

            // Chamamos a função recebida via props
            await onSubmit(subscriptionData);

        } catch (error) {
            console.error('Error saving subscription:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (onSuccess) {
            onSuccess();
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Lekton, monospace' }}>
                    {subscription ? 'Editar Assinatura' : 'Nova Assinatura'}
                </h1>
                <p className="text-gray-600 mt-2">
                    Preencha os dados básicos da assinatura.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* O restante do seu formulário (Inputs, Selects, etc.) permanece exatamente o mesmo */}
                <div>
                    <Label htmlFor="name">Nome do serviço</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Ex: Netflix"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="amount">Valor (R$)</Label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="billingCycle">Ciclo de cobrança</Label>
                    <Select value={formData.billingCycle} onValueChange={(value) => setFormData({ ...formData, billingCycle: value as BillingCycle })}>
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {billingCycles.map((cycle) => (
                                <SelectItem key={cycle.value} value={cycle.value}>
                                    {cycle.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="nextRenewal">Próxima renovação</Label>
                    <Input
                        id="nextRenewal"
                        type="date"
                        value={formData.nextRenewal}
                        onChange={(e) => setFormData({ ...formData, nextRenewal: e.target.value })}
                        required
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="paymentMethod">Forma de pagamento</Label>
                    <Input
                        id="paymentMethod"
                        type="text"
                        placeholder="Ex: Cartão final 1234"
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="mt-1"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#2563eb] hover:bg-[#1e40af] text-white flex-1"
                    >
                        {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="flex-1"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}
'use client';

import { useState } from 'react';
import { CreditCard as Edit, Trash2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/currency';
import type { Subscription } from '@/types';

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit?: (subscription: Subscription) => void;
  onDelete?: (id: string) => void;
}

export function SubscriptionCard({ subscription, onEdit, onDelete }: SubscriptionCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    await onDelete(subscription.id);
    setIsDeleting(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2563eb]/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#2563eb]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{subscription.name}</h3>
              <p className="text-sm text-gray-600">{subscription.category}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(subscription)}
                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Valor</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(subscription.amount)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ciclo</p>
              <p className="text-sm text-gray-700 capitalize">{subscription.billingCycle}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Próxima Renovação</p>
            <p className="text-sm text-gray-700">{formatDate(subscription.nextRenewal)}</p>
          </div>

          {subscription.paymentMethod && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pagamento</p>
              <p className="text-sm text-gray-700">{subscription.paymentMethod}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { AppLayout } from '@/components/layouts/app-layout';
import { SubscriptionForm } from '@/components/forms/subscription-form';

export default function AddSubscriptionPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <SubscriptionForm />
      </div>
    </AppLayout>
  );
}
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layouts/public-layout';
import { CreditCard, Calendar, Banknote } from 'lucide-react';

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h1 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            style={{ fontFamily: 'Lekton, monospace' }}
          >
            Todas as suas assinaturas, sob controle.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Veja quanto você gasta por mês e receba lembretes de renovação. 
            Simples, rápido e sem fricção.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/signup" className="flex-1">
              <Button size="lg" className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white">
                Comece agora
              </Button>
            </Link>
            <Link href="/login" className="flex-1">
              <Button size="lg" variant="outline" className="w-full">
                Entrar
              </Button>
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white p-4 rounded-xl">
                <div className="text-sm opacity-90">Total mensal</div>
                <div className="text-2xl font-bold">R$ 324,90</div>
              </div>
              <div className="bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] text-white p-4 rounded-xl">
                <div className="text-sm opacity-90">Próximas renovações</div>
                <div className="text-2xl font-bold">2</div>
              </div>
              <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white p-4 rounded-xl">
                <div className="text-sm opacity-90">Assinaturas ativas</div>
                <div className="text-2xl font-bold">3</div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {['Netflix', 'Adobe CC', 'AWS'].map((name, i) => (
                <div key={name} className="bg-gray-50 p-4 rounded-lg text-left">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 bg-[#2563eb]/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <div className="text-sm text-gray-500">Mensal</div>
                  </div>
                  <div className="font-semibold text-gray-900">{name}</div>
                  <div className="text-sm text-[#2563eb] font-medium">
                    R$ {[55.9, 179.0, 90.0][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Banknote className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Total mensal automático
              </h3>
              <p className="text-gray-600">
                Somatório das assinaturas cadastradas, sem planilhas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-[#0ea5e9]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Lembretes de renovação
              </h3>
              <p className="text-gray-600">
                Fique sabendo quando uma cobrança está chegando.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-[#22c55e]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Cadastro simples
              </h3>
              <p className="text-gray-600">
                Adicione Netflix, AWS, Adobe e qualquer outro serviço em segundos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#2563eb] to-[#1e40af]">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Lekton, monospace' }}>
            Pronto para economizar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-lg mx-auto">
            Leva menos de 2 minutos para configurar seu painel.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-[#2563eb] hover:bg-gray-100">
              Criar conta grátis
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
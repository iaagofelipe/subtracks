import { PublicLayout } from '@/components/layouts/public-layout';

export default function TermsPage() {
  return (
    <PublicLayout>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Lekton, monospace' }}>
            Termos de uso
          </h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Termos básicos do MVP. Esta é uma versão inicial que será atualizada com os termos 
                completos conforme o produto evolui.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao utilizar o SubTrack, você concorda com estes termos de uso.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Descrição do Serviço</h2>
              <p className="text-gray-600 leading-relaxed">
                O SubTrack é um serviço de gerenciamento de assinaturas que permite aos usuários 
                acompanhar seus gastos mensais e receber lembretes de renovação.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Responsabilidades do Usuário</h2>
              <p className="text-gray-600 leading-relaxed">
                O usuário é responsável por manter suas informações atualizadas e utilizar o serviço 
                de forma adequada.
              </p>
              
              <p className="text-sm text-gray-500 mt-8">
                Última atualização: Janeiro de 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
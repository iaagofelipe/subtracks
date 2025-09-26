import { PublicLayout } from '@/components/layouts/public-layout';

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Lekton, monospace' }}>
            Política de privacidade
          </h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Política de privacidade resumida para o MVP. Esta versão será expandida com 
                detalhes completos sobre coleta e uso de dados conforme o produto evolui.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Coleta de Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Coletamos apenas as informações necessárias para fornecer o serviço, incluindo 
                dados de conta e informações sobre assinaturas inseridas pelo usuário.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Uso dos Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos os dados exclusivamente para fornecer o serviço de gerenciamento de 
                assinaturas e enviar lembretes de renovação.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Proteção dos Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Implementamos medidas de segurança para proteger as informações dos usuários 
                e não compartilhamos dados com terceiros.
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
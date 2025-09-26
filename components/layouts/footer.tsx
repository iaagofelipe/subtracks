import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © SubTrack, todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Privacidade
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
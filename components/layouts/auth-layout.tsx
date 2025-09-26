import { Header } from './header';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
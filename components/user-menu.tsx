'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { AuthService } from '@/lib/auth';
import type { User as UserType } from '@/types';

interface UserMenuProps {
  user: UserType | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await AuthService.getInstance().logout();
    router.push('/');
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
      >
        <User className="w-4 h-4" />
        <span>{user.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User className="w-4 h-4" />
            Dashboard
          </Link>
          
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" />
            Configurações
          </Link>
          
          <div className="border-t border-gray-100 my-2" />
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
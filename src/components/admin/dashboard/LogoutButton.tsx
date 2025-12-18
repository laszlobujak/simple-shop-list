'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth-client';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleLogout} 
      className="font-sans gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}

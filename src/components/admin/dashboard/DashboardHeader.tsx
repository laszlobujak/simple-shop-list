'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Key } from 'lucide-react';
import { LogoutButton } from './LogoutButton';
import { ChangePasswordDialog } from './ChangePasswordDialog';

export function DashboardHeader() {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-serif text-xl font-semibold text-foreground">
              Estate &amp; Co.
            </Link>
            <Badge variant="outline" className="font-sans text-xs">Admin</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="font-sans gap-2">
                <Eye className="h-4 w-4" />
                View Site
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChangePasswordOpen(true)}
              className="font-sans gap-2"
            >
              <Key className="h-4 w-4" />
              Change Password
            </Button>
            <LogoutButton />
          </div>
        </div>
      </header>
      <ChangePasswordDialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen} />
    </>
  );
}

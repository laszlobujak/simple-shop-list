'use client';

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { useToast } from '@/hooks/use-toast';
import {
  changePasswordSchema,
  defaultChangePasswordValues,
} from '@/lib/validations/password';
import { FormField, getFieldError } from '@/components/admin/ListingDialog/FormField';

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const { toast } = useToast();

  const form = useForm({
    defaultValues: defaultChangePasswordValues,
    validators: {
      onSubmit: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await authClient.changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          revokeOtherSessions: true,
        });

        if (result.error) {
          toast({
            title: 'Error',
            description: result.error.message || 'Failed to change password',
            variant: 'destructive',
          });
          return;
        }

        // Success
        toast({
          title: 'Password changed',
          description: 'Your password has been successfully updated.',
        });

        // Reset form and close dialog
        form.reset();
        onOpenChange(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'An error occurred while changing password',
          variant: 'destructive',
        });
      }
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultChangePasswordValues);
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-serif">Change Password</DialogTitle>
          <DialogDescription className="font-sans">
            Enter your current password and choose a new password.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid gap-4 py-4">
            <form.Field name="currentPassword">
              {(field) => (
                <FormField
                  label="Current Password"
                  htmlFor={field.name}
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Input
                    id={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={form.state.isSubmitting}
                  />
                </FormField>
              )}
            </form.Field>

            <form.Field name="newPassword">
              {(field) => (
                <FormField
                  label="New Password"
                  htmlFor={field.name}
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Input
                    id={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={form.state.isSubmitting}
                  />
                </FormField>
              )}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => (
                <FormField
                  label="Confirm New Password"
                  htmlFor={field.name}
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Input
                    id={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={form.state.isSubmitting}
                  />
                </FormField>
              )}
            </form.Field>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={form.state.isSubmitting}
              className="font-sans"
            >
              Cancel
            </Button>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting} className="font-sans">
                  {isSubmitting ? 'Changing...' : 'Change Password'}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

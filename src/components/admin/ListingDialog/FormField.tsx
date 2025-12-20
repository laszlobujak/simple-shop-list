import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function FormField({ label, error, children, htmlFor }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="font-sans">
        {label}
      </Label>
      {children}
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}

export function getFieldError(errors: any[]): string | undefined {
  if (errors.length === 0) return undefined;
  return errors
    .map((e) =>
      typeof e === 'string' ? e : (e as { message?: string })?.message ?? String(e)
    )
    .join(', ');
}

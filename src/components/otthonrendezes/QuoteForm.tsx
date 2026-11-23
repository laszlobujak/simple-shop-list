'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  defaultHomePreparationValues,
  homePreparationSchema,
  homeServiceLabels,
  homeServices,
  requesterRoleLabels,
  requesterRoles,
  type HomePreparationFormValues,
} from '@/lib/validations/home-preparation';

type Errors = Partial<Record<keyof HomePreparationFormValues, string>>;

const inputClass =
  'w-full rounded-xl border border-plum/15 bg-white px-4 py-3 text-[15px] text-plum-ink shadow-[0_1px_0_rgba(0,0,0,0.02)] outline-none transition focus:border-plum/40 focus:ring-4 focus:ring-plum/10 aria-[invalid=true]:border-red-400';

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[15px] font-semibold text-plum-ink">
      {children}{' '}
      {optional ? (
        <span className="font-normal text-plum-ink/50">(nem kötelező)</span>
      ) : (
        <span className="text-bronze">*</span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const [values, setValues] = useState<HomePreparationFormValues>(defaultHomePreparationValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function update<K extends keyof HomePreparationFormValues>(
    key: K,
    value: HomePreparationFormValues[K]
  ) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleService(service: (typeof homeServices)[number]) {
    update(
      'services',
      values.services.includes(service)
        ? values.services.filter((s) => s !== service)
        : [...values.services, service]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = homePreparationSchema.safeParse(values);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof HomePreparationFormValues;
        next[key] ??= issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(`ar-${first}`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/otthonrendezes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
    } catch (err) {
      console.error('Quote request failed:', err);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-plum text-white">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-3xl text-plum-ink">Köszönjük megkeresését!</h3>
        <p className="mt-3 max-w-md text-plum-ink/70">
          Megkaptuk az üzenetét. Hamarosan felvesszük Önnel a kapcsolatot a megadott
          telefonszámon.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(defaultHomePreparationValues);
            setStatus('idle');
          }}
          className="mt-8 text-sm font-semibold text-plum underline underline-offset-4"
        >
          Új ajánlatkérés
        </button>
      </div>
    );
  }

  const err = (k: keyof HomePreparationFormValues) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `ar-${k}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="ar-name">Név</Label>
          <input
            id="ar-name"
            autoComplete="name"
            className={inputClass}
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            {...err('name')}
          />
          <FieldError id="ar-name-error" message={errors.name} />
        </div>
        <div>
          <Label htmlFor="ar-phone">Telefonszám</Label>
          <input
            id="ar-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            {...err('phone')}
          />
          <FieldError id="ar-phone-error" message={errors.phone} />
        </div>
        <div>
          <Label htmlFor="ar-email" optional>
            E-mail cím
          </Label>
          <input
            id="ar-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            {...err('email')}
          />
          <FieldError id="ar-email-error" message={errors.email} />
        </div>
        <div>
          <Label htmlFor="ar-city">Ingatlan települése</Label>
          <input
            id="ar-city"
            autoComplete="address-level2"
            className={inputClass}
            value={values.city}
            onChange={(e) => update('city', e.target.value)}
            {...err('city')}
          />
          <FieldError id="ar-city-error" message={errors.city} />
        </div>
      </div>

      <div>
        <Label htmlFor="ar-role">Milyen minőségben keresi a segítségünket?</Label>
        <div className="relative sm:max-w-[calc(50%-0.75rem)]">
          <select
            id="ar-role"
            className={cn(inputClass, 'appearance-none pr-10', !values.role && 'text-plum-ink/50')}
            value={values.role}
            onChange={(e) => update('role', e.target.value as HomePreparationFormValues['role'])}
            {...err('role')}
          >
            <option value="" disabled>
              Válasszon a lehetőségek közül
            </option>
            {requesterRoles.map((r) => (
              <option key={r} value={r} className="text-plum-ink">
                {requesterRoleLabels[r]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum-ink/50" />
        </div>
        <FieldError id="ar-role-error" message={errors.role} />
      </div>

      <fieldset aria-describedby={errors.services ? 'ar-services-error' : undefined}>
        <legend className="mb-2 block text-[15px] font-semibold text-plum-ink">
          Milyen segítségre van szüksége? <span className="text-bronze">*</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {homeServices.map((s, i) => {
            const checked = values.services.includes(s);
            return (
              <label
                key={s}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-[15px] text-plum-ink/80 transition',
                  checked ? 'border-plum/40 ring-2 ring-plum/10' : 'border-plum/15 hover:border-plum/30'
                )}
              >
                <input
                  id={i === 0 ? 'ar-services' : undefined}
                  type="checkbox"
                  className="h-4 w-4 rounded border-plum/30 accent-plum"
                  checked={checked}
                  onChange={() => toggleService(s)}
                />
                {homeServiceLabels[s]}
              </label>
            );
          })}
        </div>
        <FieldError id="ar-services-error" message={errors.services} />
      </fieldset>

      <div>
        <Label htmlFor="ar-message" optional>
          Rövid leírás
        </Label>
        <textarea
          id="ar-message"
          rows={4}
          className={cn(inputClass, 'resize-y')}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          {...err('message')}
        />
        <FieldError id="ar-message-error" message={errors.message} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-[15px] text-plum-ink/70">
          <input
            id="ar-privacyConsent"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-plum"
            checked={values.privacyConsent}
            onChange={(e) => update('privacyConsent', e.target.checked)}
            {...err('privacyConsent')}
          />
          <span>
            Elolvastam és elfogadom az{' '}
            <Link
              href="/adatvedelem"
              target="_blank"
              className="font-semibold text-plum underline underline-offset-4"
            >
              adatkezelési tájékoztatót
            </Link>
            .
          </span>
        </label>
        <FieldError id="ar-privacyConsent-error" message={errors.privacyConsent} />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Hiba történt a küldés során. Kérjük, próbálja újra, vagy hívjon minket telefonon.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-plum px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-plum-deep disabled:opacity-70"
        >
          {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
          Ajánlatot kérek
        </button>
        <p className="mt-3 text-center text-xs text-plum-ink/50">
          A *-gal jelölt mezők kitöltése kötelező.
        </p>
      </div>
    </form>
  );
}

import { z } from 'zod';

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'A név megadása kötelező (min. 2 karakter)'),
  email: z.string().email('Érvényes email címet adjon meg'),
  phone: z.string().optional(),
  subject: z.enum(['ertekbecsles', 'zalog', 'felvasarlas', 'egyeb']),
  message: z.string().min(10, 'Az üzenet legalább 10 karakter legyen'),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Az adatkezelési tájékoztató elfogadása kötelező',
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type Subject = z.infer<typeof contactFormSchema>['subject'];

// Default values for the form
export const defaultContactValues: ContactFormInput = {
  name: '',
  email: '',
  phone: '',
  subject: 'ertekbecsles',
  message: '',
  privacyConsent: false,
};

// Subject labels for display
export const subjectLabels: Record<Subject, string> = {
  ertekbecsles: 'Értékbecslés',
  zalog: 'Zálog ügyintézés',
  felvasarlas: 'Felvásárlás',
  egyeb: 'Egyéb kérdés',
};

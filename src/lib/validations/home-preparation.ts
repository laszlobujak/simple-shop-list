import { z } from 'zod';

export const requesterRoles = [
  'tulajdonos',
  'orokos',
  'berbeado',
  'kozvetito',
  'egyeb',
] as const;

export const requesterRoleLabels: Record<(typeof requesterRoles)[number], string> = {
  tulajdonos: 'Ingatlantulajdonosként',
  orokos: 'Örökösként / hozzátartozóként',
  berbeado: 'Bérbeadóként',
  kozvetito: 'Ingatlanközvetítőként / ügyvédként',
  egyeb: 'Egyéb',
};

export const homeServices = [
  'atvalogatas',
  'ertekfelmeres',
  'ertekesites',
  'kiurites',
  'takaritas',
  'festes',
  'teljes-koru',
] as const;

export const homeServiceLabels: Record<(typeof homeServices)[number], string> = {
  atvalogatas: 'Átválogatás és rendszerezés',
  ertekfelmeres: 'Értékfelmérés',
  ertekesites: 'Értékesítés segítése',
  kiurites: 'Teljes kiürítés',
  takaritas: 'Takarítás',
  festes: 'Festés és kisebb javítások',
  'teljes-koru': 'Teljes körű ügyintézés',
};

export const homePreparationSchema = z.object({
  name: z.string().trim().min(2, 'Kérjük, adja meg a nevét.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()/-]{5,}$/, 'Kérjük, érvényes telefonszámot adjon meg.'),
  email: z
    .string()
    .trim()
    .refine((v) => v === '' || z.email().safeParse(v).success, {
      message: 'Érvényes e-mail címet adjon meg, vagy hagyja üresen.',
    }),
  city: z.string().trim().min(2, 'Kérjük, adja meg az ingatlan települését.'),
  role: z.enum(requesterRoles, { message: 'Kérjük, válasszon a lehetőségek közül.' }),
  services: z
    .array(z.enum(homeServices))
    .min(1, 'Kérjük, jelöljön meg legalább egy feladatot.'),
  message: z.string().trim().max(2000, 'Legfeljebb 2000 karakter.'),
  privacyConsent: z.boolean().refine((v) => v === true, {
    message: 'Az adatkezelési tájékoztató elfogadása kötelező.',
  }),
});

export type HomePreparationInput = z.infer<typeof homePreparationSchema>;

export type HomePreparationFormValues = Omit<HomePreparationInput, 'role'> & {
  role: HomePreparationInput['role'] | '';
};

export const defaultHomePreparationValues: HomePreparationFormValues = {
  name: '',
  phone: '',
  email: '',
  city: '',
  role: '',
  services: [],
  message: '',
  privacyConsent: false,
};

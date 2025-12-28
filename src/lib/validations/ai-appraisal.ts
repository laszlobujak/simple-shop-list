import { z } from 'zod';

// Material options
export const materialSchema = z.enum(['arany', 'feherarany', 'ezust', 'platina', 'egyeb', '']);

// Karat options
export const karatSchema = z.enum(['8k', '9k', '10k', '14k', '18k', '21k', '22k', 'ismeretlen', '']);

// Hallmark options
export const hallmarkSchema = z.enum(['igen', 'nem', 'nemtudom']);

// AI Appraisal form schema - all fields required with proper defaults in defaultValues
export const aiAppraisalSchema = z.object({
  weight: z.string().min(1, 'A súly megadása kötelező'),
  material: materialSchema,
  karat: karatSchema,
  hasHallmark: hallmarkSchema,
  length: z.string(),
  width: z.string(),
  thickness: z.string(),
});

export type AIAppraisalInput = z.infer<typeof aiAppraisalSchema>;
export type Material = z.infer<typeof materialSchema>;
export type Karat = z.infer<typeof karatSchema>;
export type Hallmark = z.infer<typeof hallmarkSchema>;

// Default values for the form
export const defaultAIAppraisalValues: AIAppraisalInput = {
  weight: '',
  material: '',
  karat: '',
  hasHallmark: 'nemtudom',
  length: '',
  width: '',
  thickness: '',
};

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 6 characters long'),
});

export const patientFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().optional(),
  ssn: z.string().min(1, 'Social Security Number is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  birthDate: z.string().min(1, 'Birthdate is required'),
  triage: z.string().min(1, 'Triage description is required'),
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  status: z.string().optional(),
});

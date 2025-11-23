import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string()
});



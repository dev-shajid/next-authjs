import { z } from 'zod';

export const SigninSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6),
});
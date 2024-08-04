import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const ProfileSchema = z.object({
    name: z.optional(z.string().min(3, "Name must be at least 3 characters")),
    email: z.optional(z.string().email("Invalid email")),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
});
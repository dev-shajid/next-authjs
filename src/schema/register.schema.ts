import { z } from 'zod';

export const UsernameValidation = z
.string()
.min(3, "Username must be at least 3 characters")
.max(20, "Username must be at most 20 characters")
.regex(/^[a-zA-Z0-9_]*$/, "Username can only contain letters, numbers, and underscores");

export const RegisterSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
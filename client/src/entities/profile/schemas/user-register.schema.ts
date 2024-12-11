import { z } from 'zod';

export const userRegisterSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email format').min(1, 'Email is required'),
	password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
	role: z.enum(['user', 'admin', 'creator']).optional(),
	token: z.string().optional(),
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

import { z } from 'zod';

export const userUpdateSchema = z.object({
	name: z.string().min(1).optional(),
	email: z.string().email().optional(),
	photo: z.string().url().optional(),
	bio: z.string().optional(),
	role: z.enum(['user', 'admin', 'creator']).optional(),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

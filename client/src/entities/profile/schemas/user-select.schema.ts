import { z } from 'zod';

const objectIdSchema = z
	.string()
	.regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

export const userSelectSchema = z.object({
	_id: objectIdSchema,
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email format'),
	role: z.enum(['user', 'admin', 'creator']),
	photo: z.string().url('Invalid photo URL').optional(),
	bio: z.string().optional(),
	isVerified: z.boolean(),
	token: z.string(),
});

export type UserSelectSchema = z.infer<typeof userSelectSchema>;

import { z } from 'zod';

const objectIdSchema = z
	.string()
	.regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

export const taskSchema = z.object({
	_id: objectIdSchema,
	title: z.string().min(1, 'Please provide a title'),
	description: z.string().default('No description').optional(),
	dueDate: z
		.string()
		.default(() => new Date().toISOString())
		.optional(),
	status: z.enum(['active', 'inactive']).default('active').optional(),
	completed: z.boolean().default(false).optional(),
	priority: z.enum(['low', 'medium', 'high']).default('low').optional(),
	user: objectIdSchema,
});

export type TaskSchema = z.infer<typeof taskSchema>;

import { z } from 'zod';

export const errorScheme = z.object({
	id: z.string(),
	timestamp: z.string().datetime(),
	message: z.string(),
});

export type ErrorResponse = z.infer<typeof errorScheme>;

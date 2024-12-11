import { errorScheme } from '@shared/schemas';

export const transformErrorResponse = ({
	data: raw,
}: {
	status: number;
	data: unknown;
}) => errorScheme.safeParse(raw).data || { message: 'Unknown error' };

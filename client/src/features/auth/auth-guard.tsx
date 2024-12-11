import { useCurrentQuery } from '@entities/profile';

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
	const { isLoading } = useCurrentQuery();

	if (isLoading) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<div
					className="h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
					role="status"
					aria-label="Loading"
				></div>
			</div>
		);
	}

	return children;
};

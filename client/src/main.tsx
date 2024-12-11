import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppGuard } from '@app/guard/app-guard';
import { store } from '@app/store/store.ts';
import { AuthGuard } from '@features/auth/auth-guard';
import Auth from '@pages/auth.tsx';
import { Layout } from '@shared/components/layout.tsx';

import './index.css';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: (
			<AppGuard>
				<Auth />
			</AppGuard>
		),
	},
	{
		path: '/',
		element: (
			<AppGuard>
				<Layout />
			</AppGuard>
		),
		children: [
			{
				path: '',
				element: <div></div>,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<AuthGuard>
					<RouterProvider router={router} />
			</AuthGuard>
		</ReduxProvider>
	</StrictMode>,
);

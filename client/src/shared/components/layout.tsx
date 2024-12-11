import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { selectIsAuthenticated } from '@entities/profile';
import Sidebar from '@widgets/sidebar';

import { Container } from './container';

export const Layout = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Sidebar />
			<Container>
				<div className="flex-1 p-4">
					<Outlet />
				</div>
			</Container>
		</>
	);
};

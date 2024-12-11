import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { selectIsAuthenticated } from '@entities/profile';

export const AppGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (isAuthenticated && location.pathname === '/auth') {
			navigate('/');
		} else if (!isAuthenticated && location.pathname !== '/auth') {
			navigate('/auth');
		}
	}, [isAuthenticated, location.pathname, navigate]);

	return <>{children}</>;
};

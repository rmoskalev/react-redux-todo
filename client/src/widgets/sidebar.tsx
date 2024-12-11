import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { logout, useCurrentQuery } from '@entities/profile';

const Sidebar: React.FC = () => {
	const navigate = useNavigate();
	const { data: user, isLoading: isUserLoading } = useCurrentQuery();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			dispatch(logout());
			localStorage.removeItem('token');
			navigate('/auth');
		} catch (err) {
			console.error('Logout failed:', err);
		}
	};

	const isMobile = useMediaQuery({ maxWidth: 500 });

	return (
		<>
			{!isMobile ? (
				<div className="w-64 h-screen bg-gray-800 text-white flex flex-col items-center py-6">
					<h2 className="text-lg font-semibold mb-4">Меню</h2>
					{isUserLoading ? (
						<p>Загрузка...</p>
					) : (
						<p className="mb-6">Привет, {user?.name || 'User'}!</p>
					)}
					<button
						onClick={handleLogout}
						className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none mt-auto"
					>
						Выйти
					</button>
				</div>
			) : (
				<nav className="bg-gray-800 text-white fixed inset-x-0 top-0 z-50 p-4 flex justify-between items-center">
					<h2 className="text-lg font-semibold">Todo App</h2>
					<div className="flex items-center space-x-4">
						{isUserLoading ? (
							<p>Загрузка...</p>
						) : (
							<>
								<p>Привет, {user?.name || 'User'}!</p>
								<button
									onClick={handleLogout}
									className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
								>
									Выйти
								</button>
							</>
						)}
					</div>
				</nav>
			)}
		</>
	);
};

export default Sidebar;

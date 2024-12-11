import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Auth from '@pages/auth';
import Home from '@pages/home';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Auth />} />

				<Route path="/todo" element={<Home />} />
			</Routes>
		</Router>
	);
};

export default App;

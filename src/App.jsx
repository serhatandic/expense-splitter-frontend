import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Navbar from './Components/Navbar';

function App() {
	const { user, loginWithRedirect, isLoading, isAuthenticated, logout } =
		useAuth0();

	return (
		<Box>
			<Navbar
				isAuthenticated={isAuthenticated}
				user={user}
				isLoading={isLoading}
				loginWithRedirect={loginWithRedirect}
				logout={logout}
			/>
		</Box>
	);
}

export default App;

import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import CreateExpenseGroup from './Components/CreateExpenseGroup';
import Overview from './Components/Overview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	const { user, loginWithRedirect, isLoading, isAuthenticated, logout } =
		useAuth0();

	const [currentExpenseGroup, setCurrentExpenseGroup] = useState('');
	const [expenseGroups, setExpenseGroups] = useState([]);

	useEffect(() => {
		const userEmail = user?.email;
		const fetchExpenseGroups = async () => {
			const response = await fetch(
				`http://localhost:3000/api/expense_groups/${userEmail}`
			);
			const data = await response.json();
			setExpenseGroups(data);
		};
		if (isAuthenticated) {
			fetchExpenseGroups();
		}
	}, [isAuthenticated, user]);

	const handleChange = async (e) => {
		setCurrentExpenseGroup(e.target.value);
	};
	return (
		<BrowserRouter>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Navbar
					isAuthenticated={isAuthenticated}
					user={user}
					isLoading={isLoading}
					loginWithRedirect={loginWithRedirect}
					logout={logout}
					currentExpenseGroup={currentExpenseGroup}
					expenseGroups={expenseGroups}
					handleChange={handleChange}
				/>

				<Routes>
					<Route path='/' element={<Overview />}></Route>
					<Route
						path='/create/expensegroup'
						element={
							<CreateExpenseGroup
								isAuthenticated={isAuthenticated}
							/>
						}
					></Route>
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;

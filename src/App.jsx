import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import CreateExpenseGroup from './Components/CreateExpenseGroup';
import Overview from './Components/Overview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddNewExpense from './Components/AddNewExpense';

const EXPENSE_GROUP_SERVICE_URL = import.meta.env
	.VITE_EXPENSE_GROUP_SERVICE_URL;

function App() {
	const { user, loginWithRedirect, isLoading, isAuthenticated, logout } =
		useAuth0();

	const [currentExpenseGroup, setCurrentExpenseGroup] = useState('');
	const [expenseGroups, setExpenseGroups] = useState([]);

	useEffect(() => {
		const userEmail = user?.email;
		const fetchExpenseGroups = async () => {
			const response = await fetch(
				`${EXPENSE_GROUP_SERVICE_URL}/expense_groups/${userEmail}`
			);
			const data = await response.json();
			setExpenseGroups(data);
			setCurrentExpenseGroup(data[data.length - 1].name);
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
					<Route
						path='/'
						element={
							<Overview
								currentExpenseGroup={currentExpenseGroup}
							/>
						}
					></Route>
					<Route
						path='/create/expensegroup'
						element={
							<CreateExpenseGroup
								user={user}
								isAuthenticated={isAuthenticated}
							/>
						}
					></Route>
					<Route
						path='/create/expense/:expenseGroupName'
						element={<AddNewExpense />}
					></Route>
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;

/* eslint-disable react/prop-types */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, Route, Routes } from 'react-router-dom';

export default function Navbar({
	isAuthenticated,
	user,
	isLoading,
	loginWithRedirect,
	logout,
	currentExpenseGroup,
	handleChange,
	expenseGroups,
}) {
	return (
		<AppBar sx={{ height: '7vh' }}>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Button
					onClick={() => {
						window.location.href = '/';
					}}
					sx={{
						color: 'white',
					}}
				>
					E-Splitter
				</Button>
				<Routes>
					<Route
						path='/'
						element={
							<>
								{isAuthenticated ? (
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											marginBottom: '5px',
											gap: '10px',
										}}
									>
										<FormControl
											sx={{
												width: '200px',
												color: 'inherit',
											}}
											size='small'
										>
											<InputLabel
												sx={{
													color: 'white',
												}}
												id='expense-group'
											>
												Expense Group
											</InputLabel>
											<Select
												sx={{ color: 'white' }}
												labelId='expense-group'
												id='expense-group-select'
												value={currentExpenseGroup}
												label='Expense Group'
												onChange={handleChange}
											>
												{expenseGroups.map((group) => (
													<MenuItem
														key={group.name}
														value={group.name}
													>
														{group.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<Link to={'/create/expensegroup'}>
											<Button
												sx={{
													width: '100%',
													color: 'white',
												}}
											>
												Create
											</Button>
										</Link>
									</Box>
								) : null}
							</>
						}
					></Route>
				</Routes>

				<Box>
					{!isLoading && isAuthenticated && (
						<>
							<Button
								sx={{
									color: 'white',
								}}
								endIcon={
									<img
										src={user.picture}
										alt={user.name}
										style={{
											borderRadius: '50%',
											width: '30px',
											height: '30px',
										}}
									/>
								}
							>
								{user.profile}
							</Button>
						</>
					)}
					{!isAuthenticated && (
						<Button
							onClick={() => {
								loginWithRedirect();
							}}
							sx={{
								color: 'white',
							}}
						>
							Login
						</Button>
					)}
					{isAuthenticated && (
						<Button
							onClick={() => {
								logout();
							}}
							sx={{
								color: 'white',
							}}
						>
							Log out
						</Button>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}

/* eslint-disable react/prop-types */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Navbar({
	isAuthenticated,
	user,
	isLoading,
	loginWithRedirect,
	logout,
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
					sx={{
						color: 'white',
					}}
				>
					E-Splitter
				</Button>

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

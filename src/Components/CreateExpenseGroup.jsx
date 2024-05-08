/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Button,
	FormControl,
	IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const EXPENSE_GROUP_SERVICE_URL = import.meta.env
	.VITE_EXPENSE_GROUP_SERVICE_URL;

const CreateExpenseGroup = ({ isAuthenticated, user }) => {
	const [groupName, setGroupName] = useState('');
	const [creationDate, setCreationDate] = useState('');
	const [participants, setParticipants] = useState([
		{ name: user?.nickname, email: user?.email },
	]);
	useEffect(() => {
		if (!user) {
			return;
		}
		setParticipants([{ name: user.nickname, email: user.email }]);
	}, [user]);

	const handleCreateGroup = async (event) => {
		event.preventDefault();

		await fetch(`${EXPENSE_GROUP_SERVICE_URL}/expense_group`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				owner_mail: user.email,
				name: groupName,
				creation_date: creationDate,
				participants,
			}),
		});

		window.location.href = '/';
	};

	const handleParticipantChange = (index, event, type) => {
		const newParticipants = participants.map((participant, idx) => {
			if (idx === index) {
				return { ...participant, [type]: event.target.value };
			}
			return participant;
		});
		setParticipants(newParticipants);
	};

	const handleAddParticipant = () => {
		setParticipants([...participants, { name: '' }]);
	};

	const handleRemoveParticipant = (index) => {
		setParticipants(participants.filter((_, idx) => idx !== index));
	};
	if (!user) {
		return null;
	}
	return (
		<Box
			sx={{
				marginTop: '10vh',
				height: 'auto',
				width: '80%',
				padding: '20px',
				border: '1px solid black',
				borderRadius: '10px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{isAuthenticated ? (
				<FormControl
					component='form'
					onSubmit={handleCreateGroup}
					sx={{ width: '100%' }}
				>
					<Typography variant='h5' sx={{ mb: 2 }}>
						Create New Expense Group
					</Typography>
					<TextField
						label='Group Name'
						variant='outlined'
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						required
						fullWidth
						sx={{ mb: 2 }}
					/>
					<TextField
						label='Creation Date'
						type='date'
						value={creationDate}
						onChange={(e) => setCreationDate(e.target.value)}
						required
						fullWidth
						sx={{ mb: 2 }}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					{participants.map((participant, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex',
								alignItems: 'center',
								mb: 1,
							}}
						>
							<TextField
								label='Participant Name'
								variant='outlined'
								value={participant.name}
								disabled={participant.email === user.email}
								onChange={(e) =>
									handleParticipantChange(index, e, 'name')
								}
								required
								fullWidth
								sx={{ mr: 1 }}
							/>
							<TextField
								label='Email'
								variant='outlined'
								value={participant.email}
								disabled={participant.email === user.email}
								onChange={(e) =>
									handleParticipantChange(index, e, 'email')
								}
								required
								fullWidth
								sx={{ mr: 1 }}
							/>
							<IconButton
								onClick={() => handleRemoveParticipant(index)}
								disabled={participant.email === user.email}
							>
								<RemoveCircleOutlineIcon />
							</IconButton>
						</Box>
					))}
					<Button
						startIcon={<AddCircleOutlineIcon />}
						onClick={handleAddParticipant}
						sx={{ mb: 2 }}
					>
						Add Participant
					</Button>
					<Button type='submit' variant='contained' color='primary'>
						Create Group
					</Button>
				</FormControl>
			) : (
				<Typography>Authentication required</Typography>
			)}
		</Box>
	);
};

export default CreateExpenseGroup;

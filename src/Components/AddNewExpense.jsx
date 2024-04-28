import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Box,
	TextField,
	Button,
	Typography,
	MenuItem,
	FormControl,
} from '@mui/material';

const EXPENSE_MANAGEMENT_SERVICE_URL = import.meta.env
	.VITE_EXPENSE_MANAGEMENT_SERVICE_URL;

const EXPENSE_GROUP_SERVICE_URL = import.meta.env
	.VITE_EXPENSE_GROUP_SERVICE_URL;

const AddNewExpense = () => {
	const { expenseGroupName } = useParams();
	const [expenseGroupDetails, setExpenseGroupDetails] = useState(null);
	const [expenseName, setExpenseName] = useState('');
	const [amount, setAmount] = useState('');
	const [payer, setPayer] = useState('');
	const [date, setDate] = useState('');

	useEffect(() => {
		const fetchExpenseGroupDetails = async () => {
			const response = await fetch(
				`${EXPENSE_GROUP_SERVICE_URL}/expense_group/${expenseGroupName}`
			);
			const data = await response.json();
			setExpenseGroupDetails(data[0]);
		};
		fetchExpenseGroupDetails();
	}, [expenseGroupName]);

	const handleAddExpense = async (event) => {
		event.preventDefault();
		const newExpense = {
			expense_group: expenseGroupName,
			expense: expenseName,
			price: amount,
			group_owner: expenseGroupDetails.creator,
			paid_by: payer,
			date,
		};

		await fetch(`${EXPENSE_MANAGEMENT_SERVICE_URL}/expense`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newExpense),
		});

		setExpenseName('');
		setAmount('');
		setPayer('');
		setDate('');
		window.location.href = '/';
	};

	return (
		<>
			{expenseGroupDetails ? (
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
					<Typography variant='h5' sx={{ mb: 2 }}>
						Add New Expense
					</Typography>
					<FormControl
						component='form'
						onSubmit={handleAddExpense}
						sx={{ width: '100%' }}
					>
						<TextField
							label='Expense Name'
							variant='outlined'
							value={expenseName}
							onChange={(e) => setExpenseName(e.target.value)}
							required
							fullWidth
							sx={{ mb: 2 }}
						/>
						<TextField
							label='Amount'
							type='number'
							variant='outlined'
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							required
							fullWidth
							sx={{ mb: 2 }}
						/>
						<TextField
							select
							label='Payer'
							value={payer}
							onChange={(e) => setPayer(e.target.value)}
							required
							fullWidth
							sx={{ mb: 2 }}
						>
							{expenseGroupDetails.participants.map(
								(participant) => (
									<MenuItem
										key={participant.name}
										value={participant.name}
									>
										{participant.name}
									</MenuItem>
								)
							)}
						</TextField>
						<TextField
							label='Date'
							type='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
							fullWidth
							sx={{ mb: 2 }}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<Button
							type='submit'
							variant='contained'
							color='primary'
						>
							Add Expense
						</Button>
					</FormControl>
				</Box>
			) : (
				<Typography sx={{ mt: 5 }}>
					No Expense Group Selected
				</Typography>
			)}
		</>
	);
};

export default AddNewExpense;

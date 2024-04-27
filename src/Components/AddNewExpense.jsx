import { useState } from 'react';
import {
	Box,
	TextField,
	Button,
	Typography,
	MenuItem,
	FormControl,
} from '@mui/material';
const expenseGroup = {
	id: 1,
	name: 'Trip to the Beach',
	participants: [
		{ id: 1, name: 'Alice' },
		{ id: 2, name: 'Bob' },
		{ id: 3, name: 'Charlie' },
	],
	expenses: [
		{
			id: 1,
			name: 'Gas',
			amount: 50,
			payer: 1,
			date: '2021-10-01',
		},
		{
			id: 2,
			name: 'Lunch',
			amount: 30,
			payer: 2,
			date: '2021-10-02',
		},
	],
};

const AddNewExpense = () => {
	const [expenseName, setExpenseName] = useState('');
	const [amount, setAmount] = useState('');
	const [payer, setPayer] = useState('');
	const [date, setDate] = useState('');

	const handleAddExpense = (event) => {
		event.preventDefault();
		const newExpense = {
			name: expenseName,
			amount,
			payer,
			date,
		};
		console.log('Adding New Expense:', newExpense);
		// Here you would typically send this to your backend or state management
		setExpenseName('');
		setAmount('');
		setPayer('');
		setDate('');
	};

	return (
		<>
			{expenseGroup ? (
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
							{expenseGroup.participants.map((participant) => (
								<MenuItem
									key={participant.id}
									value={participant.id}
								>
									{participant.name}
								</MenuItem>
							))}
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

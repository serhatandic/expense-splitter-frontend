import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
} from '@mui/material';

const expenseGroup = {
	name: 'Trip to Paris',
	participants: [
		{ name: 'Alice' },
		{ name: 'Bob' },
		{ name: 'Charlie' },
		{ name: 'David' },
	],
	expenses: [
		{ payer: 'Alice', amount: 100 },
		{ payer: 'Bob', amount: 150 },
		{ payer: 'Charlie', amount: 200 },
		{ payer: 'David', amount: 250 },
	],
};

const Overview = () => {
	if (!expenseGroup) {
		return (
			<Typography sx={{ mt: 5 }}>No Expense Group Selected</Typography>
		);
	}

	// Calculate the total expenses
	const totalExpenses = expenseGroup.expenses.reduce(
		(total, expense) => total + expense.amount,
		0
	);

	// Function to calculate balances
	const calculateBalances = () => {
		let balances = expenseGroup.participants.map((participant) => ({
			name: participant.name,
			paid: 0,
			owes: 0,
		}));

		expenseGroup.expenses.forEach((expense) => {
			const payer = balances.find((b) => b.name === expense.payer);
			payer.paid += expense.amount;

			const splitAmount =
				expense.amount / expenseGroup.participants.length;
			expenseGroup.participants.forEach((participant) => {
				if (participant.name !== expense.payer) {
					const participantBalance = balances.find(
						(b) => b.name === participant.name
					);
					participantBalance.owes += splitAmount;
				}
			});
		});

		balances.forEach((b) => {
			b.net = b.paid - b.owes;
		});

		return balances;
	};

	const balances = calculateBalances();

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
			<Typography variant='h5' sx={{ mb: 2 }}>
				Expense Group Overview: {expenseGroup.name}
			</Typography>
			<Typography sx={{ mb: 2 }}>
				Total Expenses: {totalExpenses.toFixed(2)}
			</Typography>

			<Divider sx={{ width: '100%', my: 2 }} />

			<Typography variant='h6'>Balances:</Typography>
			<List>
				{balances.map((balance, index) => (
					<ListItem key={index}>
						<ListItemText
							primary={`${balance.name}`}
							secondary={`Paid: ${balance.paid.toFixed(
								2
							)}, Owes: ${balance.owes.toFixed(
								2
							)}, Net: ${balance.net.toFixed(2)}`}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Overview;

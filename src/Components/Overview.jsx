/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
	Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EXPENSE_GROUP_SERVICE_URL = import.meta.env
	.VITE_EXPENSE_GROUP_SERVICE_URL;

const EXPENSE_MANAGEMENT_SERVICE_URL = import.meta.env
	.VITE_EXPENSE_MANAGEMENT_SERVICE_URL;

const Overview = ({ currentExpenseGroup }) => {
	const [expenseGroupDetails, setExpenseGroupDetails] = useState([]);
	const [expensesForGroup, setExpensesForGroup] = useState([]);
	const [balances, setBalances] = useState({});

	useEffect(() => {
		if (!currentExpenseGroup) {
			return;
		}
		const fetchExpenseGroupDetails = async () => {
			const participants = await fetch(
				`${EXPENSE_GROUP_SERVICE_URL}/expense_group/${currentExpenseGroup}`
			);
			const data = await participants.json();
			setExpenseGroupDetails(data[0]);
		};

		const fetchExpensesForGroup = async () => {
			const expenses = await fetch(
				`${EXPENSE_MANAGEMENT_SERVICE_URL}/expenses/expense_group/${currentExpenseGroup}`
			);
			const data = await expenses.json();
			setExpensesForGroup(data);
		};

		fetchExpenseGroupDetails();
		fetchExpensesForGroup();
	}, [currentExpenseGroup]);

	useEffect(() => {
		if (!expenseGroupDetails.participants) {
			return;
		}
		const balances = {};
		const totalExpenses = expensesForGroup.reduce(
			(total, expense) => total + expense.price,
			0
		);

		const paymentPerParticipant =
			totalExpenses / expenseGroupDetails.participants.length;

		expenseGroupDetails.participants.forEach((participant) => {
			// calculate how much the participant paid and how much they should have paid
			const paid = expensesForGroup
				.filter((expense) => expense.paid_by === participant.name)
				.reduce((total, expense) => total + expense.price, 0);
			const shouldHavePaid = paymentPerParticipant;
			balances[participant.name] = paid - shouldHavePaid;
		});

		setBalances(balances);
	}, [expensesForGroup, expenseGroupDetails]);

	if (!currentExpenseGroup) {
		return (
			<Typography sx={{ mt: '10vh' }}>
				No Expense Group Selected
			</Typography>
		);
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
			<Typography variant='h5' sx={{ mb: 2 }}>
				Expense Group Overview: {expenseGroupDetails.name}
			</Typography>
			<Typography sx={{ mb: 2 }}>
				Total Expenses:{' '}
				{expensesForGroup.reduce(
					(total, expense) => total + expense.price,
					0
				)}
				₺
			</Typography>

			<Divider sx={{ width: '100%', my: 2 }} />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					width: '60%',
				}}
			>
				<Box>
					<Typography variant='h6'>Expenses:</Typography>
					<List>
						{expensesForGroup.map((expense, index) => (
							<ListItem key={index}>
								<ListItemText
									primary={`${expense.expense}`}
									secondary={`${
										expense.paid_by
									} Paid: ${expense.price.toFixed(2)} ₺`}
								/>
							</ListItem>
						))}
					</List>
				</Box>
				<Box>
					<Typography variant='h6'>Debt status:</Typography>
					<List>
						{Object.entries(balances).map(
							([participant, balance]) => (
								<ListItem key={participant}>
									<ListItemText
										primary={
											participant +
											': ' +
											expenseGroupDetails.participants.find(
												(p) => p.name === participant
											)?.email
										}
										secondary={
											balance.toFixed(2) < 0
												? `Owes: ${-balance.toFixed(
														2
												  )} ₺`
												: `Is Owed: ${balance.toFixed(
														2
												  )} ₺`
										}
									/>
								</ListItem>
							)
						)}
					</List>
				</Box>
			</Box>
			<Link to={`/create/expense/${currentExpenseGroup}`}>
				<Button>Add New Expense</Button>
			</Link>
		</Box>
	);
};

export default Overview;

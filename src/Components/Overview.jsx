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

const BALANCE_CALCULATION_SERVICE_URL = import.meta.env
	.VITE_BALANCE_CALCULATION_SERVICE_URL;

const Overview = ({ currentExpenseGroup }) => {
	const [expenseGroupDetails, setExpenseGroupDetails] = useState([]);
	const [expensesForGroup, setExpensesForGroup] = useState([]);
	const [balances, setBalances] = useState({});
	const [transactions, setTransactions] = useState([]);

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
		const fetchBalances = async () => {
			const response = await fetch(
				`${BALANCE_CALCULATION_SERVICE_URL}/calculate_balances`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						expenseGroupDetails,
						expensesForGroup,
					}),
				}
			);
			const data = await response.json();
			setBalances(data.balances);
			setTransactions(JSON.parse(data.transactions));
		};

		fetchBalances();
		// eslint-disable-next-line
	}, [expenseGroupDetails, expensesForGroup]);

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
					<List
						sx={{
							padding: 0,
						}}
					>
						{expensesForGroup.map((expense, index) => (
							<ListItem
								sx={{
									padding: 0,
								}}
								key={index}
							>
								<ListItemText
									primary={`${expense.expense}`}
									secondary={`${
										expense.paid_by
									} Paid: ${expense.price.toFixed(2)} ₺ at ${
										expense.date
									}`}
								/>
							</ListItem>
						))}
					</List>
				</Box>
				<Box>
					<Typography variant='h6'>Debt status:</Typography>
					<List
						sx={{
							padding: 0,
						}}
					>
						{Object.entries(balances).map(
							([participant, balance]) => (
								<ListItem
									sx={{
										padding: 0,
									}}
									key={participant}
								>
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
			<Divider sx={{ width: '100%', my: 2 }} />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: '60%',
				}}
			>
				{/*
					transaction format is "[{"from":"a","to":"bcdg","amount":500}]"
				*/}
				<Typography variant='h6'>How to settle all debts:</Typography>
				<List
					sx={{
						padding: 0,
					}}
				>
					{transactions.map((transaction, index) => (
						<ListItem
							sx={{
								padding: 0,
							}}
							key={index}
						>
							<ListItemText
								secondary={`${transaction.from} gives ${
									transaction.to
								} ${transaction.amount.toFixed(2)} ₺`}
							/>
						</ListItem>
					))}
				</List>
			</Box>
			<Link to={`/create/expense/${currentExpenseGroup}`}>
				<Button>Add New Expense</Button>
			</Link>
		</Box>
	);
};

export default Overview;

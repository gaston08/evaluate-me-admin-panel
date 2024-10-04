import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { apiGetAllTransactionsResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';

export default function Transactions() {
	const [loading, setLoading] = useState<boolean>(false);
	const [transactions, setTransactions] = useState(() => {
		const arr = localStorage.getItem('transactions');
		return arr === null ? [] : JSON.parse(arr);
	});

	async function getAllTransactions() {
		setLoading(true);
		const result: apigetAllTransactionsResponse = await axiosGet(
			'api/admin/transactions',
		);
		if (result.ok) {
			console.log(result.data.transactions[0]);
			setTransactions(result.data.transactions);
			localStorage.setItem(
				'transactions',
				JSON.stringify(result.data.transactions),
			);
			setLoading(false);
		} else {
			setLoading(false);
		}
	}

	const refreshData = () => {
		getAllTransactions().then().catch(console.error);
	};

	return (
		<Box>
			<Box>
				<Button variant="contained" onClick={refreshData} disabled={loading}>
					Refresh
				</Button>
			</Box>
			<Box>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>_id</TableCell>
								<TableCell>email</TableCell>
								<TableCell>cafecitos</TableCell>
								<TableCell>premios</TableCell>
								<TableCell>fecha</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{transactions.map((transaction) => (
								<TableRow
									key={transaction._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{transaction._id}
									</TableCell>
									<TableCell>{transaction.email}</TableCell>
									<TableCell>{`Compró ${transaction.coffees} y tiene ${transaction.user_id.coffees}`}</TableCell>
									<TableCell>
										{transaction.user_id.received_invitations.toString()}
									</TableCell>
									<TableCell>{transaction.updatedAt}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
}

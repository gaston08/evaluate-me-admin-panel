import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Scrollbar from 'app/components/ScrollBar';
import TableNoData from './components/TableNoData';
import UserTableRow from './components/UserTableRow';
import UserTableHead from './components/UserTableHead';
import TableEmptyRows from './components/TableEmptyRows';
import UserTableToolbar from './components/UserTableToolbar';
import { emptyRows, applyFilter, getComparator } from './utils';
import { UserType } from 'app/shared/interfaces/user';
import { apiGetAllUsersResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';

export default function UsersPage() {
	const [page, setPage] = React.useState<number>(0);
	const [order, setOrder] = React.useState<string>('asc');
	const [selected, setSelected] = React.useState([]);
	const [orderBy, setOrderBy] = React.useState<string>('name');
	const [filterName, setFilterName] = React.useState<string>('');
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [users, setUsers] = React.useState<Array<UserType>>([]);

	React.useEffect(() => {
		async function getAllUsers() {
			setLoading(true);
			const result: apiGetAllUsersResponse = await axiosGet('api/admin/user');
			if (result.ok) {
				const newArrUsers = result.data.users.map((usr) => {
					return {
						_id: usr._id,
						role: usr.role,
						firstName: usr.firstName,
						lastName: usr.lastName,
						email: usr.email,
						name: usr.firstName + ' ' + usr.lastName,
					};
				});
				setUsers(newArrUsers);
				console.log(loading);
				setLoading(false);
			} else {
				setLoading(false);
				/*setError(result.error);
				setOpen(true);
				if (result.errors) {
					result.errors.forEach((err: expressError): void => {
						setError(err.msg);
						setOpen(true);
					});
				}*/
			}
		}

		getAllUsers().then().catch(console.error);
	}, []);

	const handleSort = (event: React.MouseEvent<HTMLElement>, _id: string) => {
		const isAsc = orderBy === _id && order === 'asc';
		if (_id !== '') {
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(_id);
		}
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = users.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (
		event: React.ChangeEvent<HTMLInputElement>,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPage(0);
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPage(0);
		setFilterName(event.target.value);
	};

	const dataFiltered = applyFilter({
		inputData: users,
		comparator: getComparator(order, orderBy),
		filterName,
	});

	const notFound = !dataFiltered.length && !!filterName;

	return (
		<Container>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				mb={5}
			>
				<Typography variant="h4">Users</Typography>

				<Button
					variant="contained"
					color="inherit"
					startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
				>
					New User
				</Button>
			</Stack>

			<Card>
				<UserTableToolbar
					numSelected={selected.length}
					filterName={filterName}
					onFilterName={handleFilterByName}
				/>

				<Scrollbar>
					<TableContainer sx={{ overflow: 'unset' }}>
						<Table sx={{ minWidth: 800 }}>
							<UserTableHead
								order={order}
								orderBy={orderBy}
								rowCount={users.length}
								numSelected={selected.length}
								onRequestSort={handleSort}
								onSelectAllClick={handleSelectAllClick}
								headLabel={[
									{ id: 'name', label: 'Nombre' },
									{ id: 'email', label: 'Email' },
									{ id: 'role', label: 'Rol' },
									{ id: 'status', label: 'Estado' },
									{ id: '' },
								]}
							/>
							<TableBody>
								{dataFiltered
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => (
										<UserTableRow
											user={row}
											key={row._id}
											selected={selected.includes(row.name)}
											handleClick={(event: React.MouseEvent<HTMLElement>) => {
												handleClick(event, row.name);
											}}
										/>
									))}

								<TableEmptyRows
									height={77}
									emptyRows={emptyRows(page, rowsPerPage, users.length)}
								/>

								{notFound && <TableNoData query={filterName} />}
							</TableBody>
						</Table>
					</TableContainer>
				</Scrollbar>

				<TablePagination
					page={page}
					component="div"
					count={users.length}
					rowsPerPage={rowsPerPage}
					onPageChange={handleChangePage}
					rowsPerPageOptions={[5, 10, 25]}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Card>
		</Container>
	);
}

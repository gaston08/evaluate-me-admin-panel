import * as React from 'react';
import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
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

const users: Array<UserType> = Array(24)
	.fill(undefined)
	.map((_, index) => ({
		id: faker.string.uuid(),
		avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
		name: faker.person.fullName(),
		company: faker.company.name(),
		isVerified: faker.datatype.boolean(),
		status: sample(['active', 'banned']),
		role: sample([
			'Leader',
			'Hr Manager',
			'UI Designer',
			'UX Designer',
			'UI/UX Designer',
			'Project Manager',
			'Backend Developer',
			'Full Stack Designer',
			'Front End Developer',
			'Full Stack Developer',
		]),
	}));

export default function UsersPage() {
	const [page, setPage] = React.useState<number>(0);
	const [order, setOrder] = React.useState<string>('asc');
	const [selected, setSelected] = React.useState([]);
	const [orderBy, setOrderBy] = React.useState<string>('name');
	const [filterName, setFilterName] = React.useState<string>('');
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

	const handleSort = (event: React.MouseEvent<HTMLElement>, id: string) => {
		const isAsc = orderBy === id && order === 'asc';
		if (id !== '') {
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(id);
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
									{ id: 'name', label: 'Name' },
									{ id: 'company', label: 'Company' },
									{ id: 'role', label: 'Role' },
									{ id: 'isVerified', label: 'Verified', align: 'center' },
									{ id: 'status', label: 'Status' },
									{ id: '' },
								]}
							/>
							<TableBody>
								{dataFiltered
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => (
										<UserTableRow
											user={row}
											key={row.id}
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

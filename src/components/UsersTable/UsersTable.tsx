import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { UserType } from '../../types';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading';
import './index.scss';
import { useTranslation } from 'react-i18next';

interface Data {
	phone: string;
	email: string;
	name: string;
	zipcode: string;
	id: number;
}

function createData(
	name: string,
	email: string,
	phone: string,
	zipcode: string,
	id: number,
): Data {
	return {
		name,
		email,
		phone,
		zipcode,
		id,
	};
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number,
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data,
	) => void;
	order: Order;
	orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;
	const { t } = useTranslation();
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	const headCells: readonly HeadCell[] = [
		{
			id: 'name',
			numeric: false,
			disablePadding: true,
			label: t('users.name'),
		},
		{
			id: 'email',
			numeric: true,
			disablePadding: false,
			label: t('users.email'),
		},
		{
			id: 'phone',
			numeric: true,
			disablePadding: false,
			label: t('users.phone'),
		},
		{
			id: 'zipcode',
			numeric: true,
			disablePadding: false,
			label: t('users.zipcode'),
		},
		{
			id: 'id',
			numeric: true,
			disablePadding: false,
			label: 'ID',
		},
	];

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'></TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export function UsersTable() {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = React.useState<Data[]>([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);
		fetch('https://fakestoreapi.com/users')
			.then((res) => res.json())
			.then((json) =>
				setRows(
					json.map((e: UserType) =>
						createData(
							e.name.firstname + ' ' + e.name.lastname,
							e.email,
							e.phone,
							e.address.zipcode,
							e.id,
						),
					),
				),
			)
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Box sx={{ width: '100%' }}>
				<Paper sx={{ width: '100%', mb: 2 }}>
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby='tableTitle'
							size={'medium'}>
							<EnhancedTableHead
								order={order}
								orderBy={orderBy}
								onRequestSort={handleRequestSort}
							/>
							<TableBody>
								{stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												role='checkbox'
												tabIndex={-1}
												key={row.name}>
												<TableCell padding='checkbox'></TableCell>
												<th className='table__header' id={labelId} scope='row'>
													<Link className='table__link' to={`${row.id}`}>
														{row.name}
													</Link>
												</th>
												<td className='table__data'>
													<Link className='table__link' to={`${row.id}`}>
														{row.email}
													</Link>
												</td>
												<td className='table__data'>
													<Link className='table__link' to={`${row.id}`}>
														{row.phone}
													</Link>
												</td>
												<td className='table__data'>
													<Link className='table__link' to={`${row.id}`}>
														{row.zipcode}
													</Link>
												</td>
												<td className='table__data'>
													<Link className='table__link' to={`${row.id}`}>
														{row.id}
													</Link>
												</td>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height: 53 * emptyRows,
										}}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
		);
	}
}

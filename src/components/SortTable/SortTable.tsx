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
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.scss';
import { Loading } from '../Loading';

interface Data {
	calories: number;
	carbs: number;
	fat: number;
	name: string;
	protein: number;
}

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
): Data {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
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
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data,
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;
	const { t } = useTranslation();

	const headCells: readonly HeadCell[] = [
		{
			id: 'name',
			numeric: false,
			disablePadding: true,
			label: t('table.productName'),
		},
		{
			id: 'fat',
			numeric: true,
			disablePadding: false,
			label: t('table.price'),
		},
		{
			id: 'carbs',
			numeric: true,
			disablePadding: false,
			label: t('table.ratingCount'),
		},
		{
			id: 'protein',
			numeric: true,
			disablePadding: false,
			label: t('table.rate'),
		},
		{
			id: 'calories',
			numeric: true,
			disablePadding: false,
			label: 'ID',
		},
	];

	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

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

type DataType = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};

interface IProps {
	url: string;
}

export function EnhancedTable({ url }: IProps) {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = React.useState<any[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				setRows(
					json.map((e: DataType) =>
						createData(e.title, e.id, e.price, e.rating.count, e.rating.rate),
					),
				);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [url]);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.name);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
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
						<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={rows.length}
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
												<th id={labelId} scope='row' className='table-name'>
													<span>
														<Link
															className='row-header'
															to={`/products/${row.calories}`}>
															{row.name}
														</Link>
													</span>
												</th>
												<td className='row__item'>
													<Link
														className='row-link'
														to={`/products/${row.calories}`}>
														{row.fat}
													</Link>
												</td>
												<td className='row__item'>
													<Link
														className='row-link'
														to={`/products/${row.calories}`}>
														{row.carbs}
													</Link>
												</td>
												<td className='row__item'>
													<Link
														className='row-link'
														to={`/products/${row.calories}`}>
														{row.protein}
													</Link>
												</td>
												<td className='row__item'>
													<Link
														className='row-link'
														to={`/products/${row.calories}`}>
														{row.calories}
													</Link>
												</td>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow>
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

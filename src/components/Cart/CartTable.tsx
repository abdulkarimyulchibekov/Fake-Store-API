import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CartType } from '../../types';
import { CartItem } from '../';
import { List } from './CartTable.styles';

export const CartTable = () => {
	const [data, setData] = useState<CartType[]>();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch('https://fakestoreapi.com/carts')
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);
	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}>
				<CircularProgress />
			</Box>
		);
	} else {
		return (
			<List>
				{data?.map((e) => (
					<CartItem key={e.id} id={e.id} time={e.date} />
				))}
			</List>
		);
	}
};

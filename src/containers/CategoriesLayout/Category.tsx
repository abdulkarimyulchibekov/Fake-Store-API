import React from 'react';
import { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { MainList } from './Category.styles';
import { CategoryItem } from '../../components';

export const Category = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<string[]>([]);
	useEffect(() => {
		setLoading(true);
		fetch('https://fakestoreapi.com/products/categories')
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);
	if (loading === true) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<CircularProgress />
			</Box>
		);
	} else {
		return (
			<MainList>
				{data.map((e) => (
					<CategoryItem key={e} title={e} />
				))}
			</MainList>
		);
	}
};

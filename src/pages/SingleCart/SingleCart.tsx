import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from './SingleCart.styles';
import { Box, CircularProgress } from '@mui/material';
import { CartProductType, CartType, DataType, UserType } from '../../types';

export const SingleCart = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<CartType>();
	const [name, setName] = useState('');
	const [products, setProducts] = useState<CartProductType[]>();
	const [productName, setProductName] = useState<string[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch(`https://fakestoreapi.com/carts/${id}`)
			.then((res) => res.json())
			.then((json) => {
				setData(json);
				setProducts(json.products);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		fetch(`https://fakestoreapi.com/users/${data?.userId}`)
			.then((res) => res.json())
			.then((json: UserType) =>
				setName(json?.name?.lastname + ' ' + json?.name?.firstname),
			)
			.catch((err) => console.log(err));
	}, [data]);

	useEffect(() => {
		if (products) {
			products.forEach((e) => {
				fetch(`https://fakestoreapi.com/products/${e.productId}`)
					.then((res) => res.json())
					.then((json: DataType) => {
						console.log(json.title);
						setProductName([...productName, json.title]);
					})
					.catch((err) => console.log(err));
			});
		}
	}, []);

	console.log(productName);

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
		return <MainLayout>fda</MainLayout>;
	}
};

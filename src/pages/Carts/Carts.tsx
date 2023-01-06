import { CartItem, Loading } from '../../components';
import { List, MainLayout } from './Carts.styles';
import { useEffect, useState } from 'react';
import { CartType } from '../../types';

export const Carts = () => {
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
			<MainLayout>
				<Loading />
			</MainLayout>
		);
	} else {
		return (
			<MainLayout>
				<List>
					{data?.map((e) => (
						<CartItem key={e.id} id={e.id} time={e.date} />
					))}
				</List>
			</MainLayout>
		);
	}
};

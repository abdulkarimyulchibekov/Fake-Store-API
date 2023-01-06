import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from './SingleCart.styles';
import { CartType } from '../../types';
import { Loading, ProductSection, UserSection } from '../../components';

export const SingleCart = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<CartType>();

	useEffect(() => {
		setLoading(true);
		fetch(`https://fakestoreapi.com/carts/${id}`)
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [id]);

	console.log(data);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<MainLayout>
				{data ? <UserSection userId={data?.userId} /> : <></>}
				{data?.products.length && (
					<ul className='list'>
						{data.products.map((e) => (
							<ProductSection productId={e.productId} />
						))}
					</ul>
				)}
			</MainLayout>
		);
	}
};

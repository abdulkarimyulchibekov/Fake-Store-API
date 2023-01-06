import { Link, useParams } from 'react-router-dom';
import { MainProductLayout } from './SingleProduct.styles';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { ProductType } from '../../types';
import { Loading } from '../../components';

export const SingleProduct = () => {
	const { id } = useParams();
	const [data, setData] = useState<ProductType>();
	const [loading, setLoading] = useState<boolean>();

	useEffect(() => {
		setLoading(true);
		fetch(`https://fakestoreapi.com/products/${id}`)
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<MainProductLayout>
				<div className='product__content'>
					<img
						className='product__image'
						width={'35%'}
						src={data?.image}
						alt={data?.title}
					/>
					<div className='product__main'>
						<h2 className='product__header'>{data?.title}</h2>
						<p className='product__text'>{data?.description}</p>
						<div className='product__rating'>
							<p className='product__price'>Price: {data?.price} $</p>
							<p className='product__rate'>
								<span>Rating: {data?.rating.rate}</span>
								<StarIcon color='error' />
							</p>
							<p className='product__text'>Count: {data?.rating.count}</p>
						</div>
						<Link
							to={`/categories/${data?.category}`}
							className='product__category'>
							Category: <span>{data?.category}</span>
						</Link>
					</div>
				</div>
			</MainProductLayout>
		);
	}
};

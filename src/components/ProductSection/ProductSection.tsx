import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types';
import { Loading } from '../Loading';
import { Item } from './ProductSection.styles';

interface IProps {
	productId: number;
}

export const ProductSection = ({ productId }: IProps) => {
	const [data, setData] = useState<ProductType>();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch(`https://fakestoreapi.com/products/${productId}`)
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [productId]);
	if (loading) {
		return <Loading />;
	} else {
		return (
			<Item>
				<img
					className='item__image'
					height={400}
					src={data?.image}
					alt={data?.title}
				/>
				<div className='content'>
					<h3>{data?.title}</h3>
					<p className='content__desc'>{data?.description}</p>
					<p>{data?.price} $</p>
					<Link className='product__link' to={`/products/${productId}`}>
						See More
					</Link>
				</div>
			</Item>
		);
	}
};

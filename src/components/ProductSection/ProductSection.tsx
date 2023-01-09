import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types';
import { Loading } from '../Loading';
import { Item } from './ProductSection.styles';

interface IProps {
	productId: number;
	quantity: number;
}

export const ProductSection = ({ productId, quantity }: IProps) => {
	const [data, setData] = useState<ProductType>();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();

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
				<div className='content'>
					<img
						className='item__image'
						height={400}
						src={data?.image}
						alt={data?.title}
					/>
					<div className=''>
						<h3>{data?.title}</h3>
						<p className='content__desc'>{data?.description}</p>
						<p>{data?.price} $</p>
						<Link className='product__link' to={`/products/${productId}`}>
							{t('carts.see')}
						</Link>
					</div>
				</div>
				<h2
					style={{
						marginRight: 40,
					}}>
					X{quantity}
				</h2>
			</Item>
		);
	}
};

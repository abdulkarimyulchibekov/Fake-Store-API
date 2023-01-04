import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from './CategoryItem.styles';

interface IProps {
	title: string;
}

export const CategoryItem = ({ title }: IProps) => {
	return (
		<Item>
			<Link className='item__link' to={`${title}`}>
				{title}
			</Link>
		</Item>
	);
};

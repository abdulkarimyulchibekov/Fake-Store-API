import React from 'react';

interface IProps {
	productId: number;
}

export const ProductSection = ({ productId }: IProps) => {
	return <li>{productId}</li>;
};

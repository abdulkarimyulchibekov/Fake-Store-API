import React from 'react';
import { ProductsTable } from '../../components';
import { ProductsMainLayout } from './Products.styles';

export const Products = () => {
	return (
		<ProductsMainLayout>
			<ProductsTable />
		</ProductsMainLayout>
	);
};

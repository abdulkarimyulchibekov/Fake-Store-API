import React from 'react';
import { EnhancedTable } from '../../components';
import { ProductsMainLayout } from './Products.styles';

export const Products = () => {
	return (
		<ProductsMainLayout>
			<EnhancedTable />
		</ProductsMainLayout>
	);
};

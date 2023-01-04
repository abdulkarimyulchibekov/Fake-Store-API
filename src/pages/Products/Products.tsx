import { EnhancedTable } from '../../components';
import { ProductsMainLayout } from './Products.styles';

export const Products = () => {
	return (
		<ProductsMainLayout>
			<EnhancedTable url='https://fakestoreapi.com/products' />
		</ProductsMainLayout>
	);
};

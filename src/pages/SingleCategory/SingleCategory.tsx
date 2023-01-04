import { useParams } from 'react-router-dom';
import { MainLayout, Title } from './SingleCategory.styles';
import { EnhancedTable } from '../../components';

export const SingleCategory = () => {
	const { title } = useParams();

	return (
		<>
			<Title>{title}</Title>
			<MainLayout>
				<EnhancedTable
					url={`https://fakestoreapi.com/products/category/${title}`}
				/>
			</MainLayout>
		</>
	);
};

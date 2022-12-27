import { Menu } from './components';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './Private.styles';
import { Carts, Categories, Dashboard, Products, Users } from './pages';

export const Private = () => {
	return (
		<MainLayout>
			<Menu />
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/products' element={<Products />} />
				<Route path='/categories' element={<Categories />} />
				<Route path='/carts' element={<Carts />} />
				<Route path='/users' element={<Users />} />
			</Routes>
		</MainLayout>
	);
};

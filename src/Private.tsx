import { Header, Menu } from './components';
import { Routes, Route } from 'react-router-dom';
import { MainLayout, SecondaryLayout } from './Private.styles';
import {
	Account,
	Carts,
	Categories,
	Dashboard,
	Products,
	SingleProduct,
	Users,
} from './pages';

export const Private = () => {
	return (
		<MainLayout>
			<Menu />
			<SecondaryLayout>
				<Header />
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/products' element={<Products />} />
					<Route path='/categories' element={<Categories />} />
					<Route path='/carts' element={<Carts />} />
					<Route path='/users' element={<Users />} />
					<Route path='/account' element={<Account />} />
					<Route path='/products/:id' element={<SingleProduct />} />
				</Routes>
			</SecondaryLayout>
		</MainLayout>
	);
};

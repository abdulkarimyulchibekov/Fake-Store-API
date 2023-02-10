import { MenuMainLayout } from './Menu.styles';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Menu = () => {
	const { t } = useTranslation();
	return (
		<MenuMainLayout>
			<li className='list__item'>
				<NavLink
					data-test='home-link'
					to={'/'}
					className={({ isActive }) => (isActive ? 'active link' : 'link')}>
					{t('menu.dashboard')}
				</NavLink>
			</li>

			<li className='list__item'>
				<NavLink
					data-test='products-link'
					to={'/products'}
					className={({ isActive }) => (isActive ? 'active link' : 'link')}>
					{t('menu.products')}
				</NavLink>
			</li>

			<li className='list__item'>
				<NavLink
					data-test='categories-link'
					to={'/categories'}
					className={({ isActive }) => (isActive ? 'active link' : 'link')}>
					{t('menu.categories')}
				</NavLink>
			</li>

			<li className='list__item'>
				<NavLink
					to={'/carts'}
					data-test='carts-link'
					className={({ isActive }) => (isActive ? 'active link' : 'link')}>
					{t('menu.carts')}
				</NavLink>
			</li>

			<li className='list__item'>
				<NavLink
					data-test='users-link'
					to={'/users'}
					className={({ isActive }) => (isActive ? 'active link' : 'link')}>
					{t('menu.users')}
				</NavLink>
			</li>
		</MenuMainLayout>
	);
};

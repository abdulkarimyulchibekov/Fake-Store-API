import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAccountStore } from '../../store';
import { Nav } from '../PublicHeader/Header.styles';
import { HeaderMainLayout } from './Header.styles';

export const Header = () => {
	const { t } = useTranslation();
	const { name, roll } = useAccountStore((state) => state);
	const changeToUz = () => changeLanguage('uz');
	const changeToRu = () => changeLanguage('ru');

	return (
		<HeaderMainLayout>
			<Nav>
				<button
					onClick={changeToRu}
					className={
						t('language') === 'ru' ? 'active__btn btn' : 'btn passive__btn'
					}>
					Py
				</button>
				<button
					onClick={changeToUz}
					className={
						t('language') === 'ru' ? 'passive__btn btn' : 'btn active__btn'
					}>
					Uz
				</button>
			</Nav>
			<div className='account'>
				<Link className='account__link' to='/account'>
					<img
						className='account__image'
						width={36}
						height={36}
						src={'https://picsum.photos/id/119/36/36'}
						alt={`${name} images`}
					/>
					<div>
						<p className='account__name'>{name}</p>
						<p className='account__roll'>{roll}</p>
					</div>
				</Link>
			</div>
		</HeaderMainLayout>
	);
};

import { changeLanguage } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MainHeader, Nav } from './Header.styles';

export const PublicHeader = () => {
	const { t } = useTranslation();
	const changeToUz = () => changeLanguage('uz');
	const changeToRu = () => changeLanguage('ru');

	return (
		<MainHeader>
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
		</MainHeader>
	);
};

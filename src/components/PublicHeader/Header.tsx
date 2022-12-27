import React from 'react';
import { Nav } from './Header.styles';

export const Header = () => {
	return (
		<header>
			<Nav>
				<button className='header__btn'>Py</button>
				<button className='header__btn'>Uz</button>
			</Nav>
		</header>
	);
};

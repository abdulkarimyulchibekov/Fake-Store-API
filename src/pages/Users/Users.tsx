import React from 'react';
import { UsersTable } from '../../components';
import { MainLayout } from './Users.styles';

export const Users = () => {
	return (
		<MainLayout>
			<UsersTable />
		</MainLayout>
	);
};

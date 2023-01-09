import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserType } from '../../types';
import { Loading } from '../Loading';
import { MainLayout } from './UserSection.styles';

interface IProps {
	userId: number;
}

export const UserSection = ({ userId }: IProps) => {
	const { t } = useTranslation();

	const [data, setData] = useState<UserType>();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch(`https://fakestoreapi.com/users/${userId}`)
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [userId]);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<MainLayout>
				<h2 className='user__name'>
					{t('carts.name') + ' '}
					<Link to={`/users/${userId}`}>
						<code>{data?.name.firstname + ' ' + data?.name.lastname}</code>
					</Link>
				</h2>
			</MainLayout>
		);
	}
};

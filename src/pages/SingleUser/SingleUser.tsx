import { useEffect, useState, useRef, FormEvent } from 'react';
import { MainLayout } from './SingleUser.styles';
import { useParams } from 'react-router-dom';
import { UserType } from '../../types';
import { Loading } from '../../components';
import { useTranslation } from 'react-i18next';
import CallIcon from '@mui/icons-material/Call';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const SingleUser = () => {
	const { id } = useParams();
	const [data, setData] = useState<UserType>();
	const [loading, setLoading] = useState(false);
	const [eye, setEye] = useState(false);
	const inputRef = useRef<any>();
	const { t } = useTranslation();

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
	};

	const handleClick = () => {
		setEye(!eye);
		inputRef.current.type === 'text'
			? (inputRef.current.type = 'password')
			: (inputRef.current.type = 'text');
	};

	useEffect(() => {
		setLoading(true);
		fetch(`https://fakestoreapi.com/users/${id}`)
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<MainLayout>
				<h2 className='user__header'>
					{data?.name.firstname + ' ' + data?.name.lastname}
				</h2>
				<div className='layout'>
					<div className='layout__content'>
						<div className='address'>
							<p className='address__location'>{t('user.location')}</p>
							<div className='address__content'>
								<p className='address__address'>
									{t('user.address')}: {data?.address.city}{' '}
									{data?.address.street} {data?.address.number}
								</p>
								<p>
									{t('user.zipcode')}: {data?.address.zipcode}
								</p>
							</div>
						</div>
						<a className='user__call' href={`tel:${data?.phone}`}>
							<CallIcon color='primary' sx={{ marginRight: 2 }} />
							{data?.phone}
						</a>
					</div>
					<form onSubmit={handleSubmit} className='layout__form form'>
						<label className='label'>
							<span className='form__label'>{t('user.email')}</span>
							<input
								className='form__input'
								readOnly
								value={data?.email}
								type='email'
							/>
						</label>
						<label className='label'>
							<span className='form__label'>{t('user.name')}</span>
							<input
								className='form__input'
								readOnly
								value={data?.username}
								type='text'
							/>
						</label>
						<label>
							<span className='form__label'>{t('user.password')}</span>
							<input
								ref={inputRef}
								className='form__input'
								readOnly
								value={data?.password}
								type='password'
							/>
						</label>
						<button className='form__btn' onClick={handleClick}>
							{eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
						</button>
					</form>
				</div>
			</MainLayout>
		);
	}
};

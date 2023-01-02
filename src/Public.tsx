import { MainForm, PrivateLayout } from './Public.styles';
import { useTranslation } from 'react-i18next';
import { FormEvent, useState, useEffect } from 'react';
import { useAuthStore } from './store/AuthStore';
import { useAccountStore } from './store/AccountStore';
import { PublicHeader } from './components/PublicHeader/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

type DataType = {
	name: string;
	phone: string;
	email: string;
};

export const Public = () => {
	const { t } = useTranslation();
	const setToken = useAuthStore((state) => state.setToken);
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(true);
	const setName = useAccountStore((state) => state.setName);
	const setEmail = useAccountStore((state) => state.setEmail);
	const setPhone = useAccountStore((state) => state.setPhone);

	const [data, setData] = useState<DataType>({
		name: '',
		phone: '',
		email: '',
	});

	useEffect(() => {
		if (data.email && data.phone && data.name) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [data]);

	const handleSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		setLoading(true);
		fetch('https://fakestoreapi.com/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				username: 'johnd',
				password: 'm38rmF$',
			}),
		})
			.then((res) => res.json())
			.then((data) => {})
			.catch((err) => {})
			.finally(() => {
				setToken('eyJhbGciOiJIUzI1NiIsInR');
				setLoading(false);
				setName(data.name);
				setPhone(data.phone);
				setEmail(data.email);
			});

		navigate('/');
	};

	return (
		<>
			<PublicHeader />
			<PrivateLayout>
				<MainForm autoComplete='off' onSubmit={handleSubmit}>
					<h2 className='form__header'>{t('auth.login')}</h2>
					<input
						className='form__input'
						name='name'
						required
						type='text'
						placeholder={`${t('auth.formName')}`}
						onChange={(evt) => {
							evt.target.value
								? setData({ ...data, name: evt.target.value })
								: setData({ ...data, name: '' });
						}}
						aria-label='Enter your full name'
					/>
					<input
						aria-label='Enter your email'
						className='form__input'
						required
						name='email'
						onChange={(evt) => {
							if (
								evt.target.value
									.toLowerCase()
									.match(
										/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									)
							) {
								evt.target.classList.remove('invalid');
								setData({ ...data, email: evt.target.value });
							} else {
								evt.target.classList.add('invalid');
								setData({ ...data, email: '' });
							}
						}}
						type='email'
						placeholder={`${t('auth.formEmail')}`}
					/>
					<input
						aria-label='Enter your phone number'
						className='form__input'
						onChange={(evt) => {
							if (
								evt.target.value.match(/[ ]/) ||
								evt.target.value.match(/[a-z]/) ||
								evt.target.value.match(/[-!$%^&*()_|~=`{}[\]:";'<>?,./]/)
							) {
								evt.target.classList.add('invalid');
								evt.target.classList.remove('valid');
								setData({ ...data, phone: '' });
							} else {
								evt.target.classList.add('valid');
								setData({ ...data, phone: evt.target.value });
								evt.target.classList.remove('invalid');
							}
						}}
						type='text'
						name='phone_number'
						required
						placeholder={`${t('auth.formNumber')}`}
					/>
					<Button disabled={disabled} onClick={handleSubmit} loading={loading}>
						{t('auth.submit')}
					</Button>
				</MainForm>
			</PrivateLayout>
		</>
	);
};

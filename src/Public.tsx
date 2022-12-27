import { MainForm, PrivateLayout } from './Public.styles';
import { useTranslation } from 'react-i18next';
import { FormEvent, useState } from 'react';
import { useAuthStore } from './store/AuthStore';
import { Header } from './components/PublicHeader/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export const Public = () => {
	const { t } = useTranslation();
	const setToken = useAuthStore((state) => state.setToken);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

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
			});

		navigate('/');
	};

	return (
		<>
			<Header />
			<PrivateLayout>
				<MainForm onSubmit={handleSubmit}>
					<h2 className='form__header'>{t('auth.login')}</h2>
					<input
						className='form__input'
						required
						type='text'
						placeholder={`${t('auth.formName')}`}
						aria-label='Enter your full name'
					/>
					<input
						aria-label='Enter your email'
						className='form__input'
						required
						type='email'
						placeholder={`${t('auth.formEmail')}`}
					/>
					<input
						aria-label='Enter your phone number'
						className='form__input'
						type='text'
						required
						placeholder={`${t('auth.formNumber')}`}
						defaultValue='+998'
					/>
					<Button onClick={handleSubmit} loading={loading}>
						{t('auth.submit')}
					</Button>
				</MainForm>
			</PrivateLayout>
		</>
	);
};

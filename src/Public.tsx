import { MainForm, PrivateLayout } from './Public.styles';
import { useTranslation } from 'react-i18next';
import { FormEvent, useState, useRef, useEffect, useMemo } from 'react';
import { useAuthStore } from './store/AuthStore';
import { PublicHeader } from './components/PublicHeader/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export const Public = () => {
	const { t } = useTranslation();
	const setToken = useAuthStore((state) => state.setToken);
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(true);

	const [canSubmit, setCanSubmit] = useState({
		name: false,
		phone: false,
		email: false,
	});

	useEffect(() => {
		console.log('Aloo');

		console.log(canSubmit);

		if (canSubmit.email && canSubmit.phone && canSubmit.name) {
			setDisabled(false);
			console.log('btn ishlashi kk');
		} else {
			console.log('btn ishlashi kkmas');
			setDisabled(true);
		}
	}, [canSubmit]);

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
								? setCanSubmit({ ...canSubmit, name: true })
								: setCanSubmit({ ...canSubmit, name: false });
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
								setCanSubmit({ ...canSubmit, email: true });
							} else {
								evt.target.classList.add('invalid');
								setCanSubmit({ ...canSubmit, email: false });
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
								setCanSubmit({ ...canSubmit, phone: false });
							} else {
								console.log('else ishlavotti');
								evt.target.classList.add('valid');
								setCanSubmit({ ...canSubmit, phone: true });
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

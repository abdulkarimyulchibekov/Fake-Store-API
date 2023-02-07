import { useEffect, useState } from 'react';
import { MainForm, PrivateLayout } from './Public.styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PublicHeader } from './components';
import { useAccountStore } from './store';
import { FieldValues, useForm } from 'react-hook-form';
import { useAuthStore } from './store';
import { useIMask } from 'react-imask';
import { Button } from 'antd';

export const Public = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [opts] = useState({ mask: '+{998}(00)000-00-00' });
	const setToken = useAuthStore((state) => state.setToken);
	const { ref, value } = useIMask(opts);
	const [loading, setLoading] = useState<boolean>(false);
	const setAll = useAccountStore((state) => state.setAll);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<>
			<PublicHeader />
			<PrivateLayout>
				<MainForm
					autoComplete='off'
					onSubmit={handleSubmit((data_: FieldValues, evt: any) => {
						setLoading(true);
						setTimeout(() => {
							setLoading(false);
							setToken('something5+656566f');
							navigate('/');
						}, 1000);
						evt?.preventDefault();
						setAll({ ...data_, phone: value });
						navigate('/');
					})}>
					<label>
						<p className='text'>{t('auth.formName')}</p>
						<input
							placeholder={`${t('auth.formName')}`}
							{...register('name', {
								required: `${t('auth.required')}`,
							})}
							className={errors.name ? 'form__input invalid' : 'form__input'}
							type='text'
						/>
						{errors.name && <span>{`${errors.name.message}`}</span>}
					</label>
					<label>
						<p className='text'>{t('auth.formNumber')}</p>
						<input
							className={value.length < 13 ? 'form__input invalid' : 'valid'}
							placeholder={`${t('auth.formNumber')}`}
							{...register('phone')}
							ref={ref}
						/>
						{value.length < 13 && <span>{`${t('auth.phone')}`}</span>}
					</label>
					<label>
						<p className='text'>{t('auth.formEmail')}</p>
						<input
							placeholder={`${t('auth.formEmail')}`}
							{...register('email', {
								required: `${t('auth.required')}`,
							})}
							className={errors.name ? 'form__input invalid' : 'form__input'}
							type='email'
						/>
						{errors.email && <span>{`${errors.email.message}`}</span>}
					</label>
					<label>
						<p className='text'>{t('auth.formName')}</p>
						<input
							type='number'
							placeholder={`${t('auth.formAge')}`}
							{...register('age', {
								required: `${t('auth.required')}`,
							})}
							className={errors.age ? 'form__input invalid' : 'form__input'}
						/>
						{errors.age && <span>{`${errors.age.message}`}</span>}
					</label>
					<Button htmlType='submit' loading={loading}>
						{t('auth.submit')}
					</Button>
				</MainForm>
			</PrivateLayout>
		</>
	);
};

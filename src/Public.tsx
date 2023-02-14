import { MainForm, PrivateLayout } from './Public.styles';
import { useAccountStore, useAuthStore } from './store';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PublicHeader } from './components';
import { useIMask } from 'react-imask';
import { useState } from 'react';
import { Regex } from './types';
import { Button } from 'antd';

export const Public = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const setToken = useAuthStore((state) => state.setToken);
	const { ref, value } = useIMask({ mask: '+{998}(00)000-00-00' });
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
						console.log(value);
						console.log(ref.current?.value);
						if (ref.current?.value && ref.current?.value.length < 17) {
							ref.current?.focus();
							ref.current?.classList.add('invalid');
							console.log('if');
						} else {
							console.log('else');
							setLoading(true);
							evt?.preventDefault();
							console.log(data_);
							setTimeout(() => {
								setLoading(false);
								setToken('something5+656566f');
								navigate('/');
							}, 1000);
							setAll({ ...data_, phone: value });
							navigate('/');
						}
					})}>
					<label>
						<p className='text'>{t('auth.formName')}</p>
						<input
							data-test='input-name'
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
							data-test='input-phone'
							className={
								ref.current?.value && ref.current?.value.length < 17
									? 'form__input invalid'
									: 'form__input'
							}
							placeholder={`${t('auth.formNumber')}`}
							{...register('phone')}
							required
							ref={ref}
						/>
						{ref.current?.value && ref.current?.value.length < 17 && (
							<span>{`${t('auth.phone')}`}</span>
						)}
					</label>
					<label>
						<p className='text'>{t('auth.formEmail')}</p>
						<input
							data-test='input-email'
							placeholder={`${t('auth.formEmail')}`}
							{...register('email', {
								required: `${t('auth.required')}`,
								pattern: {
									value: Regex,
									message: `${t('auth.email')}`,
								},
							})}
							className={errors.email ? 'form__input invalid' : 'form__input'}
							type='email'
						/>
						{errors.email && <span>{`${errors.email.message}`}</span>}
					</label>
					<label>
						<p className='text'>{t('auth.formAge')}</p>
						<input
							data-test='input-age'
							type='number'
							placeholder={`${t('auth.formAge')}`}
							{...register('age', {
								required: `${t('auth.required')}`,
								pattern: {
									value: /^[1-9]\d*$/,
									message: `${'account.ageError'}`,
								},
							})}
							className={errors.age ? 'form__input invalid' : 'form__input'}
						/>
						{errors.age && <span>{`${errors.age.message}`}</span>}
					</label>
					<label>
						<p className='text'>{t('auth.formText')}</p>
						<textarea className='textarea' {...register('desc')}></textarea>
					</label>
					<Button data-test='submit-btn' htmlType='submit' loading={loading}>
						{t('auth.submit')}
					</Button>
				</MainForm>
			</PrivateLayout>
		</>
	);
};

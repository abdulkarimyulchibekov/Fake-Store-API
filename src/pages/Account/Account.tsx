import { AccountMainLayout } from './Account.styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAccountStore } from '../../store';
import { FieldValues, useForm } from 'react-hook-form';
import { useIMask } from 'react-imask';
import { useState } from 'react';
import { Regex } from './regex';

export const Account = () => {
	const State = useAccountStore((state) => state);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [opts] = useState({ mask: '+{998}(00)000-00-00' });
	const { ref, value = State.phone } = useIMask(opts);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	return (
		<AccountMainLayout>
			<img
				className='form__image'
				height={600}
				width={500}
				src='https://picsum.photos/id/119/500/600'
				alt='user logo'
			/>
			<form
				className='form'
				autoComplete='off'
				onSubmit={handleSubmit((data_: FieldValues, evt: any) => {
					if (ref.current?.value && ref.current?.value.length < 17) {
						ref.current?.focus();
						ref.current?.classList.add('invalid');
					} else {
						evt?.preventDefault();
						State.setAll({ ...data_, phone: value });
						navigate('/');
					}
				})}>
				<label className='form__label'>
					<span>{t('account.name')}</span>
					<input
						data-test='account-name'
						{...register('name', {
							required: `${t('auth.required')}`,
						})}
						type='text'
						defaultValue={State.name}
						className={errors.name ? 'form__input invalid' : 'form__input'}
					/>
					{errors.name?.message && <span>{`${errors.name.message}`}</span>}
				</label>

				<label className='form__label'>
					<span>{t('account.age')}</span>
					<input
						data-test='account-age'
						{...register('age', {
							required: 'Required',
							pattern: {
								value: /^[1-9]\d*$/,
								message: `${t('account.ageError')}`,
							},
						})}
						defaultValue={State.age}
						type='number'
						className={errors.age ? 'form__input invalid' : 'form__input'}
					/>
					{errors.age?.message && <span>{`${errors.age.message}`}</span>}
				</label>

				<label className='form__label'>
					<span>{t('account.email')}</span>
					<input
						data-test='account-email'
						{...register('email', {
							required: 'Required',
							pattern: {
								value: Regex,
								message: 'Email',
							},
						})}
						type='email'
						defaultValue={State.email}
						className={errors.email ? 'form__input invalid' : 'form__input'}
					/>
					{errors.email?.message && <span>{`${errors.email.message}`}</span>}
				</label>

				<label className='form__label'>
					<span>{t('account.phoneNumber')}</span>
					<input
						data-test='account-phone'
						className={
							ref.current?.value && ref.current?.value.length < 17
								? 'form__input invalid'
								: 'form__input'
						}
						placeholder={`${t('auth.formNumber')}`}
						{...register('phone')}
						required
						ref={ref}
						defaultValue={State.phone}
					/>
					{ref.current?.value && ref.current?.value.length < 17 && (
						<span>{`${t('auth.phone')}`}</span>
					)}
				</label>

				<label className='form__label'>
					<span>{t('account.bio')}</span>
					<textarea
						data-test='account-bio'
						{...register('description')}
						defaultValue={State.description}
						className='form__input textarea'></textarea>
				</label>

				<button data-test='account-submit' type='submit' className='form__btn'>
					{t('account.submit')}
				</button>
			</form>
		</AccountMainLayout>
	);
};

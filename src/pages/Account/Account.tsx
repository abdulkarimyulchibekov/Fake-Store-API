import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../store';
import { AccountMainLayout } from './Account.styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Account = () => {
	const State = useAccountStore((state) => state);

	const navigate = useNavigate();

	const { t } = useTranslation();

	const [canSubmit, setCanSubmit] = useState({
		age: State.age,
		name: State.name,
		bio: State.description,
		email: State.email,
		phone: State.phone,
	});

	const handleSubmit = (evt: any) => {
		evt.preventDefault();

		if (canSubmit.age && canSubmit.name) {
			State.setName(canSubmit.name);
			State.setAge(canSubmit.age);
			State.setDesc(canSubmit.bio);
			State.setEmail(canSubmit.email);
			State.setPhone(canSubmit.phone);
			navigate(-1);
		} else {
			console.log('Else');
		}
	};

	return (
		<AccountMainLayout>
			<form autoComplete='off' onSubmit={handleSubmit} className='form'>
				<img
					className='form__image'
					height={600}
					width={500}
					src='https://picsum.photos/id/119/500/600'
					alt='user logo'
				/>
				<div className='form__main'>
					<label className='form__label'>
						<span>{t('account.name')}</span>
						<input
							name='name'
							defaultValue={canSubmit.name}
							required
							className='form__input'
							type='text'
							onChange={(evt) => {
								if (evt.target.value) {
									setCanSubmit({
										...canSubmit,
										name: evt.target.value,
									});
									evt.target.classList.remove('invalid');
									evt.target.classList.add('valid');
								} else {
									setCanSubmit({
										...canSubmit,
										name: '',
									});
									evt.target.classList.remove('valid');
									evt.target.classList.add('invalid');
								}
							}}
						/>
					</label>
					<label className='form__label'>
						<span>{t('account.age')}</span>
						<input
							name='age'
							required
							defaultValue={canSubmit.age ? canSubmit.age : ''}
							className='form__input'
							type='text'
							onChange={(evt) => {
								if (evt.target.value.match(/[^1-9]/g)) {
									evt.target.classList.add('invalid');
								} else {
									evt.target.classList.remove('invalid');
									setCanSubmit({ ...canSubmit, age: evt.target.value });
								}
							}}
						/>
					</label>
					<label className='form__label'>
						<span>{t('account.email')}</span>
						<input
							name='email'
							defaultValue={canSubmit.email ? canSubmit.email : ''}
							required
							className='form__input'
							onChange={(evt) => {
								if (evt.target.value) {
									setCanSubmit({
										...canSubmit,
										email: evt.target.value,
									});
								}
							}}
							type='email'
						/>
					</label>
					<label className='form__label'>
						<span>{t('account.phoneNumber')}</span>
						<input
							name='phone'
							defaultValue={canSubmit.phone ? canSubmit.phone : ''}
							onChange={(evt) => {
								if (
									evt.target.value.match(/[ ]/) ||
									evt.target.value.match(/[a-z]/) ||
									evt.target.value.match(/[-!$%^&*()_|~=`{}[\]:";'<>?,./]/)
								) {
									evt.target.classList.add('invalid');
									evt.target.classList.remove('valid');
								} else {
									evt.target.classList.add('valid');
									evt.target.classList.remove('invalid');
									setCanSubmit({ ...canSubmit, phone: evt.target.value });
								}
							}}
							required
							className='form__input'
							type='text'
						/>
					</label>
					<label className='form__label'>
						<span>{t('account.bio')}</span>
						<textarea
							defaultValue={State.description}
							rows={10}
							onChange={(evt) => {
								if (evt.target.value) {
									setCanSubmit({ ...canSubmit, bio: evt.target.value });
								}
							}}
							name='description'
							className='form__text'></textarea>
					</label>
					<button type='submit' className='form__btn'>
						{t('account.submit')}
					</button>
				</div>
			</form>
		</AccountMainLayout>
	);
};

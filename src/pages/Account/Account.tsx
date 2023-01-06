import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../store/AccountStore';
import { AccountMainLayout } from './Account.styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Account = () => {
	const setName = useAccountStore((state) => state.setName);
	const setAge = useAccountStore((state) => state.setAge);
	const setDesc = useAccountStore((state) => state.setDesc);
	const setEmail = useAccountStore((state) => state.setEmail);
	const setPhone = useAccountStore((state) => state.setPhone);

	const navigate = useNavigate();

	const { t } = useTranslation();

	const name = useAccountStore((state) => state.name);
	const age = useAccountStore((state) => state.age);
	const description = useAccountStore((state) => state.description);
	const email = useAccountStore((state) => state.email);
	const phone = useAccountStore((state) => state.phone);

	const [canSubmit, setCanSubmit] = useState({
		age: age,
		name: name,
		bio: description,
		email: email,
		phone: phone,
	});

	const handleSubmit = (evt: any) => {
		evt.preventDefault();

		if (canSubmit.age && canSubmit.name) {
			setName(canSubmit.name);
			setAge(canSubmit.age);
			setDesc(canSubmit.bio);
			setEmail(canSubmit.email);
			setPhone(canSubmit.phone);
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
							defaultValue={name}
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
							defaultValue={email ? email : ''}
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
							defaultValue={phone ? phone : ''}
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
							defaultValue={description}
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
						Submit
					</button>
				</div>
			</form>
		</AccountMainLayout>
	);
};

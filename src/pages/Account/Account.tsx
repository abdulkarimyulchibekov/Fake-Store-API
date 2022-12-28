import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../store/AccountStore';
import { AccountMainLayout } from './Account.styles';
import { useRef, useState } from 'react';

export const Account = () => {
	const setName = useAccountStore((state) => state.setName);
	const setAge = useAccountStore((state) => state.setAge);
	const setDesc = useAccountStore((state) => state.setDesc);
	const navigate = useNavigate();

	const name = useAccountStore((state) => state.name);
	const age = useAccountStore((state) => state.age);
	const description = useAccountStore((state) => state.description);

	const [canSubmit, setCanSubmit] = useState({
		age: age,
		name: name,
		bio: description,
	});

	const handleSubmit = (evt: any) => {
		evt.preventDefault();

		if (canSubmit.age && canSubmit.name) {
			setName(canSubmit.name);
			setAge(canSubmit.age);
			setDesc(canSubmit.bio);
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
						<span>Change your name</span>
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
						<span>Change your age</span>
						<input
							name='age'
							required
							defaultValue={age}
							className='form__input'
							type='text'
							onChange={(evt) => {
								const age = evt.target.value;
								if (age.match(/[^1-9]/g)) {
									evt.target.classList.add('invalid');
								} else {
									evt.target.classList.add('valid');
								}
							}}
						/>
					</label>
					<label className='form__label'>
						<span>Change your bio</span>
						<textarea
							defaultValue={description}
							rows={10}
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

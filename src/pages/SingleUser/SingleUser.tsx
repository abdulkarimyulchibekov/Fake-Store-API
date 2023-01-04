import { Box } from '@mui/system';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from '../../types';
import { MainLayout } from './SingleUser.styles';
import { CircularProgress } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const SingleUser = () => {
	const { id } = useParams();
	const [data, setData] = useState<UserType>();
	const [loading, setLoading] = useState(false);
	const [eye, setEye] = useState(false);
	const inputRef = useRef<any>();

	useEffect(() => {
		setLoading(true);
		fetch(`https://fakestoreapi.com/users/${id}`)
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);
	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<CircularProgress />
			</Box>
		);
	} else {
		return (
			<MainLayout>
				<h2 className='user__header'>
					{data?.name.firstname + ' ' + data?.name.lastname}
				</h2>
				<div className='layout'>
					<div className='layout__content'>
						<div className='address'>
							<p className='address__location'>Location Information</p>
							<div className='address__content'>
								<p className='address__address'>
									Address: {'  '}
									{data?.address.city} {data?.address.street}{' '}
									{data?.address.number}
								</p>
								<p> Zip code: {data?.address.zipcode}</p>
							</div>
						</div>
						<a className='user__call' href={`tel:${data?.phone}`}>
							<CallIcon color='primary' sx={{ marginRight: 2 }} />
							{data?.phone}
						</a>
					</div>
					<form
						onSubmit={(evt) => {
							evt.preventDefault();
						}}
						className='layout__form form'>
						<label className='label'>
							<span className='form__label'>User Email</span>
							<input
								className='form__input'
								readOnly
								value={data?.email}
								type='email'
							/>
						</label>
						<label className='label'>
							<span className='form__label'>User User Name</span>
							<input
								className='form__input'
								readOnly
								value={data?.username}
								type='text'
							/>
						</label>
						<label>
							<span className='form__label'>User Password</span>
							<input
								ref={inputRef}
								className='form__input'
								readOnly
								value={data?.password}
								type='password'
							/>
						</label>
						<button
							className='form__btn'
							onClick={() => {
								setEye(!eye);
								inputRef.current.type === 'text'
									? (inputRef.current.type = 'password')
									: (inputRef.current.type = 'text');
							}}>
							{eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
						</button>
					</form>
				</div>
			</MainLayout>
		);
	}
};

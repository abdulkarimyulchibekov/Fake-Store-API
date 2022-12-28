import styled from 'styled-components';

export const PrivateLayout = styled.div`
	width: 100%;
	height: 91.5vh;
	background-color: #f0f0f0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const MainForm = styled.form`
	width: 400px;
	height: 300px;
	background-color: #fff;
	padding: 20px;
	text-align: center;

	.form__header {
		margin-top: 0;
	}

	.form__input {
		width: 100%;
		margin-bottom: 20px;
		padding-top: 5px;
		padding-bottom: 5px;
		padding-left: 7px;
		border-radius: 8px;
	}

	.form__btn {
		background-color: #777777;
		color: #fff;
		width: 100%;
		border: 1.4px solid transparent;
		border-radius: 12px;
		padding-top: 7px;
		padding-bottom: 7px;
		transition: all 0.3s ease;

		&:hover {
			border-color: #777777;
			color: #777777;
			background-color: #fff;
		}
	}
`;

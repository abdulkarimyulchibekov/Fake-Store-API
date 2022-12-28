import styled from 'styled-components';

export const AccountMainLayout = styled.div`
	background-color: #fff;
	padding: 20px;
	margin: 20px;

	.form {
		justify-content: space-between;
		display: flex;
	}

	.form__image {
		margin-right: 30px;
	}

	.form__main {
		display: flex;
		flex-direction: column;
		width: 50vw;
		height: 50vh;
	}

	.form__input {
		width: 400px;
		margin-bottom: 20px;
		padding-top: 5px;
		padding-bottom: 5px;
		padding-left: 7px;
		border-radius: 8px;
	}

	.form__input.invalid {
		border-color: red;
	}

	.form__btn {
		width: 400px;
		background-color: #f0f0f0;
		border: 1.4px solid #333;
		border-radius: 4px;
		padding-top: 4px;
		padding-bottom: 4px;
		cursor: pointer;
	}

	.form__label {
		display: flex;
		flex-direction: column;

		& > span {
			margin-bottom: 7px;
		}
	}

	.form__text {
		resize: none;
		padding: 10px;
		margin-bottom: 15px;
		width: 400px;
		border-radius: 4px;
	}
`;

import styled from 'styled-components';

export const MainLayout = styled.div`
	background-color: #fff;
	padding: 20px;
	margin: 20px;

	.layout {
		display: flex;
	}

	.layout__content {
		width: 50%;
		padding: 10px;
	}

	.user__header {
		text-transform: capitalize;
		text-align: center;
		margin-right: 60px;
	}

	.user__call {
		display: flex;
		align-items: center;
	}

	.address__address {
		text-transform: capitalize;
	}

	.address__location {
		font-size: 20px;
		font-weight: 600;
	}

	.address__content {
		background-color: #f0f0f0;
		padding: 20px;
		margin: 20px;
		border-radius: 8px;
		width: 400px;
	}

	.layout__form {
		background-color: #f0f0f0;
		width: 50%;
		padding: 10px;
		border-radius: 8px;
		position: relative;
	}

	.form__input {
		width: 100%;
		padding: 5px;
		border-radius: 8px;
		padding-left: 10px;
	}

	.form__label {
		margin-bottom: 10px;
		display: block;
	}

	.label {
		display: block;
		margin-bottom: 20px;
	}

	.form__btn {
		background-color: transparent;
		border: 0;
		cursor: pointer;
		position: absolute;
		bottom: 19px;
		right: 15px;
	}
`;

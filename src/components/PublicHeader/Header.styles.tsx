import styled from 'styled-components';

export const MainHeader = styled.header`
	background-color: #f0f0f0;
`;

export const Nav = styled.nav`
	margin-left: auto;
	width: 130px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;

	.btn {
		transition: all 0.3s ease;
	}

	.active__btn {
		background-color: #333;
		border-radius: 50%;
		padding: 9px 10px;
		color: #f0f0f0;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.passive__btn {
		background-color: #f0f0f0;
		border-radius: 50%;
		transition: all 0.3s ease;
		padding: 9px 10px;
		color: #333;
		border-color: #333;
		cursor: pointer;
	}
`;

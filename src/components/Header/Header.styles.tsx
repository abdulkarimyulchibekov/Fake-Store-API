import styled from 'styled-components';

export const HeaderMainLayout = styled.header`
	box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
	display: flex;
	align-items: center;
	margin: 20px;
	padding: 20px;

	.account {
		margin-left: 50px;
	}

	.account__link {
		color: #333;
		text-decoration: none;
		display: flex;
		align-items: center;
	}

	.account__image {
		border-radius: 50%;
		margin-right: 10px;
	}

	.account__name {
		margin: 0;
		margin-bottom: 3px;
	}

	.account__roll {
		color: #7777;
		margin: 0;
	}
`;

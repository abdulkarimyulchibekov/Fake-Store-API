import styled from 'styled-components';

export const MainProductLayout = styled.div`
	background-color: #fff;
	padding: 20px;
	margin: 20px;

	.product__image {
		margin-right: 60px;
	}

	.product__main {
		width: 400px;
	}

	.product__header {
		font-weight: 700;
		font-size: 32px;
	}

	.product__content {
		display: flex;
	}

	.product__text {
		font-size: 20px;
	}

	.product__rating {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.product__price {
		font-size: 20px;
		margin-right: 25px;
	}

	.product__rate {
		font-size: 20px;
		display: flex;
		align-items: center;

		& > span {
			margin-right: 5px;
		}
	}

	.product__category {
		font-size: 20px;
		color: #333;
		text-decoration: none;
		text-transform: capitalize;

		& > span {
			color: #0e0ec9;
		}
	}
`;

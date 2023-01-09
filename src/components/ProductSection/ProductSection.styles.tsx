import styled from 'styled-components';

export const Item = styled.li`
	display: flex;
	align-items: center;
	margin-bottom: 40px;
	height: 400px;

	.item__image {
		width: auto;
		height: 100%;
		margin-right: 50px;
	}

	.content {
		background-color: #f0f0f0;
		height: 400px;
		display: flex;
		align-items: center;
		padding: 20px 70px;
		margin-right: 70px;
	}

	.product__link {
		margin-top: 15px;
		background-color: #2c0c9ddb;
		padding: 10px 13px;
		color: #fff;
		display: block;
		width: 150px;
		text-align: center;
		text-decoration: none;
		border-radius: 8px;
		transition: all 0.3s ease;

		.quantity {
			margin-right: 40px;
			display: block;
		}

		&:hover {
			background-color: #372b62db;
		}
	}
`;

import styled from 'styled-components';

export const Item = styled.li`
	display: flex;
	align-items: center;
	background-color: #f0f0f0;
	margin-bottom: 40px;
	height: 400px;
	padding: 20px 70px;

	.item__image {
		width: auto;
		height: 100%;
		margin-right: 50px;
	}

	.content {
	}

	.product__link {
		margin-top: 15px;
		background-color: #2c0c9ddb;
		padding: 10px 13px;
		color: #fff;
		display: block;
		width: 95px;
		text-decoration: none;
		border-radius: 8px;
		transition: all 0.3s ease;

		&:hover {
			background-color: #372b62db;
		}
	}
`;

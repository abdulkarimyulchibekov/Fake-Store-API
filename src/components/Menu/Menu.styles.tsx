import styled from 'styled-components';

export const MenuMainLayout = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
	background-color: #777777;
	padding-top: 20px;
	padding-left: 20px;
	padding-bottom: 20px;
	padding-right: 20px;
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	position: fixed;
	width: 200px;
	top: 0;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;

	.list__item {
		width: 100%;
		text-align: center;
		transition: all 0.3s ease;
		border-radius: 8px;

		&:first-child {
			margin-top: 30px;
		}

		&:hover {
			background-color: #888888;
		}
	}

	.list__item + .list__item {
		margin-top: 40px;
	}

	.link {
		padding: 10px 20px;
		display: block;
		color: #fff;
		text-decoration: none;
		text-align: center;
	}

	.active {
		padding: 10px 20px;
		color: #777777;
		text-decoration: none;
		background-color: #f0f0f0;
		border-radius: 8px;
	}
`;

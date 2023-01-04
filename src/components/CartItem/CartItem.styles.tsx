import styled from 'styled-components';

export const Item = styled.li`
	background-color: #fff;
	width: 27%;
	margin-bottom: 50px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
		rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
	transition: all 0.3s ease;

	&:hover {
		background-color: #f9f9f9;
	}

	.item__link {
		display: block;
		padding-top: 50px;
		padding-bottom: 50px;
		text-align: center;
		color: #333;
		text-decoration: none;
	}
`;

import styled from 'styled-components';

export const Item = styled.li`
	background-color: #f0f0f0;
	margin: 20px;
	width: 45%;
	text-align: center;
	padding-top: 40px;
	padding-bottom: 40px;
	font-size: 30px;
	transition: all 0.3s ease;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
		rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

	&:hover {
		background-color: #fff;
	}

	.item__link {
		color: #333;
		text-decoration: none;
		width: 100%;
		display: block;
		transition: all 0.3s ease;

		&:hover {
			color: #0037ff;
		}
	}
`;

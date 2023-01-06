import styled from 'styled-components';

export const MainLayout = styled.div`
	.user__name {
		text-transform: capitalize;
		text-align: center;
		margin-bottom: 20px;

		& > code {
			text-transform: capitalize;
			color: #333;
		}
	}
`;

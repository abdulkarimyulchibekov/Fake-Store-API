import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 20,
			}}>
			<CircularProgress />
		</Box>
	);
};

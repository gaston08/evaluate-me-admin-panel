import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function Links() {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				flexDirection: 'column',
				rowGap: 2,
			}}
		>
			<Box>
				<Button
					variant="contained"
					component={RouterLink}
					to="/admin/transactions"
				>
					transactions
				</Button>
			</Box>
			<Box>
				<Button
					variant="contained"
					component={RouterLink}
					to="/temp/exam/create"
				>
					create exam
				</Button>
			</Box>
			<Box>
				<Button
					variant="contained"
					component={RouterLink}
					to="/admin/users/update/coffees"
				>
					update coffees
				</Button>
			</Box>
		</Box>
	);
}

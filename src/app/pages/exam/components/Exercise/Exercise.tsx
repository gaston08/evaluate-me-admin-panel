import * as React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import Option from './components/Option';

export default function Exerise(props) {
	const { exercise, sx } = props;
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const theme = useTheme();

	const handleListItemClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		index: number
	) => {
		setSelectedIndex(index);
	};

	console.log(theme.palette.background);

	return (
		<Box sx={{ width: '100%', mb: 4 }}>
			<Paper
				elevation={0}
				sx={{ p: 2, bgColor: theme.palette.background.light }}
			>
				<Typography variant="h6" gutterBottom>
					{exercise.question}
				</Typography>
			</Paper>
			<List component="nav" sx={{ pt: 0 }}>
				{exercise.options.map((option) => {
					return (
						<Option
							key={option.id}
							exerciseId={exercise.id}
							id={option.id}
							title={option.title}
						/>
					);
				})}
			</List>
		</Box>
	);
}

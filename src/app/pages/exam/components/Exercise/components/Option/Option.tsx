import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';

interface OptionProps {
	title: string;
}

export default function Option(props: OptionProps) {
	const { title } = props;
	const theme = useTheme();

	return (
		<ListItemButton
			sx={{
				'&:hover, &.Mui-selected, &.Mui-selected:hover': {
					backgroundColor: theme.custom.background.main,
				},
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<div dangerouslySetInnerHTML={{ __html: title }}></div>
		</ListItemButton>
	);
}

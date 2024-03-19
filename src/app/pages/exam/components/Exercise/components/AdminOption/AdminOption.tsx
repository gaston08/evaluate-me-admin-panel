import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import EditOPtionGroup from 'app/pages/exam/components/EditOptionGroup';

interface OptionProps {
	id: number;
	title: string;
	exerciseId: string;
}

export default function AdminOption(props: OptionProps) {
	const { title, id } = props;
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
			<EditOPtionGroup id={id} />
		</ListItemButton>
	);
}

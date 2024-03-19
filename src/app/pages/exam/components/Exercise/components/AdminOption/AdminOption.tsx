import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import EditOPtionGroup from 'app/pages/exam/components/EditOptionGroup';
import { exerciseType } from 'app/shared/interfaces/exercise';

interface OptionProps {
	id: number;
	title: string;
	exercise: exerciseType;
}

export default function AdminOption(props: OptionProps) {
	const { title, id, exercise } = props;
	const theme = useTheme();

	return (
		<ListItemButton
			sx={{
				'&, &:hover, &.Mui-selected, &.Mui-selected:hover': {
					backgroundColor: exercise.correctOptions.includes(id)
						? theme.palette.primary.light
						: '',
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

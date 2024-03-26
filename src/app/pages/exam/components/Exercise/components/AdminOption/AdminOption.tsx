import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import EditOPtionGroup from 'app/pages/exam/components/EditOptionGroup';
import { exerciseType, optionType } from 'app/shared/interfaces/exercise';

interface OptionProps {
	option: optionType;
	exercise: exerciseType;
}

export default function AdminOption(props: OptionProps) {
	const { option, exercise } = props;
	const theme = useTheme();

	return (
		<ListItemButton
			sx={{
				'&, &:hover, &.Mui-selected, &.Mui-selected:hover': {
					backgroundColor: exercise.correctOptions.includes(option.id)
						? theme.palette.primary.light
						: '',
				},
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<div dangerouslySetInnerHTML={{ __html: option.title }}></div>
			<EditOPtionGroup option={option} />
		</ListItemButton>
	);
}

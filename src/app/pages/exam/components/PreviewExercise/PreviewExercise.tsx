import { useContext } from 'react';
import { ExerciseContext } from 'app/contexts/Exercise';
import Exercise from 'app/pages/exam/components/Exercise';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PreviewExercise() {
	const { currentExercise } = useContext(ExerciseContext);
	return (
		<Box>
			<Exercise exercise={currentExercise} canSelect={false} canEdit={true} />
			<Box sx={{ mt: 3 }}>
				<Typography color="green">{currentExercise.argument}</Typography>
			</Box>
		</Box>
	);
}

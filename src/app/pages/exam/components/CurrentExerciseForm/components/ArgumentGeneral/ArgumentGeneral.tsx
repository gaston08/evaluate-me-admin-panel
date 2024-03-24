import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';

export default function ArgumentGeneral() {
	const { setCurrentExercise, currentExercise } = useContext(ExerciseContext);
	const setArgument = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentExercise((prev: exerciseType) => {
			return {
				...prev,
				argument: e.target.value,
			};
		});
	};
	return (
		<TextField
			multiline
			rows={4}
			sx={{ mt: 0, width: '100%' }}
			value={currentExercise.argument}
			onChange={setArgument}
		/>
	);
}

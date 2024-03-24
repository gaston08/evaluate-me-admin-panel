import { useContext } from 'react';
import { ExerciseContext } from 'app/contexts/Exercise';
import Exercise from 'app/pages/exam/components/Exercise';

export default function PreviewExercise() {
	const { currentExercise } = useContext(ExerciseContext);
	return (
		<Exercise exercise={currentExercise} canSelect={false} canEdit={true} />
	);
}

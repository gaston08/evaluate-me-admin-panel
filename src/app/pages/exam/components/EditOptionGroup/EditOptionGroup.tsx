import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import {
	faTrash,
	faSquareCheck,
	faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contextExercise } from 'app/shared/interfaces/exercise';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';

export default function EditOptionGroup({ id }) {
	const myContextExercise: contextExercise = useContext(ExerciseContext);
	const setCurrentExercise: React.Dispatch<React.SetStateAction<exerciseType>> =
		myContextExercise.setCurrentExercise;

	const deleteOption = () => {
		setCurrentExercise((prev: exerciseType) => {
			const optArr = prev.options.filter((obj) => {
				return obj.id !== id;
			});
			return {
				...prev,
				options: optArr,
			};
		});
	};

	const setAsCorrectOption = () => {
		console.log('correct');
	};

	return (
		<div>
			<IconButton>
				<FontAwesomeIcon icon={faBars} id="dragOrder" />
			</IconButton>
			<IconButton onClick={setAsCorrectOption}>
				<FontAwesomeIcon icon={faSquareCheck} id="correctOptionIcon" />
			</IconButton>
			<IconButton onClick={deleteOption}>
				<FontAwesomeIcon icon={faTrash} id="deleteIcon" />
			</IconButton>
		</div>
	);
}

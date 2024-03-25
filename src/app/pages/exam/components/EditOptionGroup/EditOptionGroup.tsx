import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import { faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contextExercise } from 'app/shared/interfaces/exercise';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';

interface EditOptionGroupProps {
	id: string;
}

export default function EditOptionGroup(props: EditOptionGroupProps) {
	const id: string = props.id;
	const myContextExercise: contextExercise = useContext(ExerciseContext);
	const setCurrentExercise: React.Dispatch<React.SetStateAction<exerciseType>> =
		myContextExercise.setCurrentExercise;

	const deleteOption = () => {
		setCurrentExercise((prev: exerciseType) => {
			const newOptions = prev.options.map((optArr) => {
				return optArr.filter((obj) => {
					return obj.id !== id;
				});
			});
			const newCorrectOptions: Array<string> = prev.correctOptions.filter(
				(prevOpt) => prevOpt !== id,
			);
			return {
				...prev,
				options: newOptions,
				correctOptions: newCorrectOptions,
			};
		});
	};

	const toggleCorrectOption = () => {
		setCurrentExercise((prev: exerciseType): exerciseType => {
			if (prev.correctOptions.includes(id)) {
				// delete option
				const newCorrectOptions: Array<string> = prev.correctOptions.filter(
					(prevOpt) => prevOpt !== id,
				);
				return {
					...prev,
					correctOptions: newCorrectOptions,
				};
			} else {
				// add option
				return {
					...prev,
					correctOptions: [...prev.correctOptions, id],
				};
			}
		});
	};

	return (
		<div>
			<IconButton onClick={toggleCorrectOption}>
				<FontAwesomeIcon icon={faSquareCheck} id="correctOptionIcon" />
			</IconButton>
			<IconButton onClick={deleteOption}>
				<FontAwesomeIcon icon={faTrash} id="deleteIcon" />
			</IconButton>
		</div>
	);
}

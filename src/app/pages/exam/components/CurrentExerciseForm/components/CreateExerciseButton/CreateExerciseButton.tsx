import * as React from 'react';
import { useContext } from 'react';
import { ExerciseContext } from 'app/contexts/Exercise';
import { ExamContext } from 'app/contexts/Exam';
import { examType, createExam } from 'app/shared/interfaces/exam';
import Button from '@mui/material/Button';

export default function CreateExerciseButton({
	setError,
	setOpen,
}: {
	setError: () => void;
	setOpen: () => void;
}) {
	const { setExam } = React.useContext<createExam>(ExamContext);
	const { setCurrentExercise, currentExercise } = useContext(ExerciseContext);
	const addToExam = () => {
		if (currentExercise.question.length < 10) {
			setError('La consigna es obligatoria.');
			setOpen(true);
		} else if (currentExercise.options.length < 2) {
			setError('Añade al menos dos opciones.');
			setOpen(true);
		} else if (currentExercise.correctOptions.length === 0) {
			setError('Añade al menos una respuesta correcta');
			setOpen(true);
		} else {
			setExam((prev: examType) => {
				return {
					...prev,
					exercises: [...prev.exercises, currentExercise],
				};
			});
			setCurrentExercise({
				id: window.self.crypto.randomUUID(),
				question: '<p></p>',
				correctOptions: [],
				options: [],
				argument: '',
			});
		}
	};
	return (
		<Button variant="contained" onClick={addToExam} sx={{ mt: 3 }}>
			Crear Ejercicio
		</Button>
	);
}

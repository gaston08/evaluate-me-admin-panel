import * as React from 'react';
import { useContext } from 'react';
import { ExerciseContext } from 'app/contexts/Exercise';
import { ExamContext } from 'app/contexts/Exam';
import { ExercisesContext } from 'app/contexts/Exercises';
import { examType, createExam } from 'app/shared/interfaces/exam';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { contextExercises, exerciseType } from 'app/shared/interfaces/exercise';

export default function GroupButtons({
	setError,
	setOpen,
}: {
	setError: () => void;
	setOpen: () => void;
}) {
	const { setExam } = React.useContext<createExam>(ExamContext);
	const { setCurrentExercise, currentExercise } = useContext(ExerciseContext);
	const { exercises, setExercises } =
		useContext<contextExercises>(ExercisesContext);

	const addToExam = () => {
		if (
			currentExercise.question[currentExercise.question.length - 1].length < 10
		) {
			setError('La consigna es obligatoria.');
			setOpen(true);
		} else if (
			currentExercise.options[currentExercise.options.length - 1].length < 2
		) {
			setError('Añade al menos dos opciones.');
			setOpen(true);
		} else if (!checkCorrectOptions()) {
			setError('Añade al menos una respuesta correcta para cada ejercicio.');
			setOpen(true);
		} else if (currentExercise.pts === '' || isNaN(currentExercise.pts)) {
			setError('Añade los puntos del ejercicio.');
			setOpen(true);
		} else {
			const argument = `<p>${currentExercise.argument.replaceAll(
				/\n/g,
				'<br>',
			)}</p>`;

			setExam((prev: examType) => {
				return {
					...prev,
					exercises: [...prev.exercises, { ...currentExercise, argument }],
					totalPts: prev.totalPts + Number(currentExercise.pts),
				};
			});
			if (exercises.length !== 0) {
				setExercises((prev: Array<exerciseType>) => {
					return prev.slice(1);
				});
			} else {
				resetExercise();
			}
		}
	};

	const resetExercise = () => {
		setCurrentExercise({
			id: window.self.crypto.randomUUID(),
			question: ['<p></p>'],
			correctOptions: [],
			options: [[]],
			argument: '',
			pts: '',
		});
	};

	const checkCorrectOptions = (): boolean => {
		if (
			currentExercise.correctOptions.length !== currentExercise.options.length
		)
			return false;

		for (let i = 0; i < currentExercise.correctOptions.length; i++) {
			if (currentExercise.correctOptions[i].length === 0) {
				return false;
			}
		}

		return true;
	};

	const addExercise = () => {
		if (
			currentExercise.question[currentExercise.question.length - 1].length < 10
		) {
			setError('La consigna es obligatoria.');
			setOpen(true);
		} else if (
			currentExercise.options[currentExercise.options.length - 1].length < 2
		) {
			setError('Añade al menos dos opciones.');
			setOpen(true);
		} else {
			setCurrentExercise((prev) => {
				const newExercise = {
					...prev,
					question: [...prev.question, '<p></p>'],
					options: [...prev.options, []],
				};
				return newExercise;
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentExercise((prev: exerciseType) => {
			return {
				...prev,
				pts: e.target.value,
			};
		});
	};

	return (
		<Box sx={{ mt: 1 }}>
			<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
				<TextField
					sx={{ width: 120 }}
					value={currentExercise.pts}
					onChange={handleChange}
					placeholder="Pts"
				/>
				<Button color="secondary" variant="contained" onClick={addToExam}>
					Crear
				</Button>
				<Button color="secondary" variant="outlined" onClick={addExercise}>
					Agregar
				</Button>
				<Button color="error" variant="contained" onClick={resetExercise}>
					Vaciar
				</Button>
			</Box>
		</Box>
	);
}
